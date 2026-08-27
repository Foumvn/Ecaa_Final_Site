import { afterEach, describe, expect, it, vi } from "vitest";

function makeRequest(body: unknown) {
  return new Request("http://localhost/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

async function loadPost(apiKey?: string) {
  vi.resetModules();

  if (apiKey === undefined) {
    vi.stubEnv("MISTRAL_API_KEY", "");
  } else {
    vi.stubEnv("MISTRAL_API_KEY", apiKey);
  }

  return (await import("./route")).POST;
}

describe("POST /api/chat", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("rejects missing or non-array messages", async () => {
    const POST = await loadPost("test-key");

    for (const body of [{}, { messages: "hello" }]) {
      const response = await POST(makeRequest(body));

      expect(response.status).toBe(400);
      await expect(response.json()).resolves.toEqual({
        error: "Messages invalides",
      });
    }
  });

  it("reports a missing Mistral API key", async () => {
    const POST = await loadPost();
    const response = await POST(makeRequest({ messages: [] }));

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      error: "Clé API Mistral non configurée",
    });
  });

  it("sends the system prompt and conversation to Mistral", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        [
          'data: {"choices":[{"delta":{"content":"Bonjour"}}]}',
          "data: malformed",
          'data: {"choices":[{"delta":{"content":" !"}}]}',
          "data: [DONE]",
          "",
        ].join("\n"),
        { status: 200 },
      ),
    );
    vi.stubGlobal("fetch", fetchMock);
    const POST = await loadPost("test-key");
    const messages = [{ role: "user", content: "Bonjour" }];

    const response = await POST(makeRequest({ messages }));

    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe(
      "text/plain; charset=utf-8",
    );
    await expect(response.text()).resolves.toBe("Bonjour !");

    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://api.mistral.ai/v1/chat/completions");
    expect(init.method).toBe("POST");
    expect(init.headers).toEqual({
      "Content-Type": "application/json",
      Authorization: "Bearer test-key",
    });
    expect(JSON.parse(init.body as string)).toMatchObject({
      model: "mistral-tiny",
      stream: true,
      messages: [
        {
          role: "system",
          content: expect.stringContaining("ECA Technology"),
        },
        ...messages,
      ],
    });
  });

  it("passes upstream errors through without exposing the response body", async () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("sensitive", { status: 429 })),
    );
    const POST = await loadPost("test-key");

    const response = await POST(makeRequest({ messages: [] }));

    expect(response.status).toBe(429);
    await expect(response.json()).resolves.toEqual({ error: "Erreur API: 429" });
  });

  it("returns an empty stream when the upstream response has no body", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(null, { status: 200 })),
    );
    const POST = await loadPost("test-key");

    const response = await POST(makeRequest({ messages: [] }));

    await expect(response.text()).resolves.toBe("");
  });

  it("returns an internal error for malformed requests or network failures", async () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    const POST = await loadPost("test-key");
    const malformedRequest = new Request("http://localhost/api/chat", {
      method: "POST",
      body: "{",
    });

    const malformedResponse = await POST(malformedRequest);
    expect(malformedResponse.status).toBe(500);
    await expect(malformedResponse.json()).resolves.toEqual({
      error: "Erreur interne du serveur",
    });

    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    const networkResponse = await POST(makeRequest({ messages: [] }));
    expect(networkResponse.status).toBe(500);
    await expect(networkResponse.json()).resolves.toEqual({
      error: "Erreur interne du serveur",
    });
  });
});
