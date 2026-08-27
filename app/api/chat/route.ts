import { buildSystemPrompt } from "@/lib/build-system-prompt";

const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;
const MISTRAL_API_URL = "https://api.mistral.ai/v1/chat/completions";

function jsonError(message: string, status: number) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req: Request) {
  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch (err) {
      console.error("Chat API: corps de requête JSON invalide:", err);
      return jsonError("Corps de requête JSON invalide", 400);
    }

    const { messages } = (body ?? {}) as { messages?: unknown };

    if (!messages || !Array.isArray(messages)) {
      return jsonError("Messages invalides", 400);
    }

    if (!MISTRAL_API_KEY) {
      console.error("Chat API: MISTRAL_API_KEY absente de l'environnement");
      return jsonError("Clé API Mistral non configurée", 500);
    }

    const systemMessage = {
      role: "system",
      content: buildSystemPrompt(),
    };

    const mistralBody = {
      model: "mistral-tiny",
      stream: true,
      messages: [systemMessage, ...messages],
    };

    let response: Response;
    try {
      response = await fetch(MISTRAL_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${MISTRAL_API_KEY}`,
        },
        body: JSON.stringify(mistralBody),
      });
    } catch (err) {
      console.error("Mistral API: échec de la requête réseau:", err);
      return jsonError("Service de chat injoignable", 502);
    }

    if (!response.ok) {
      const errorText = await response.text().catch(() => "<corps illisible>");
      console.error("Mistral API error:", response.status, errorText);
      return jsonError(`Erreur API: ${response.status}`, response.status);
    }

    const upstreamBody = response.body;
    if (!upstreamBody) {
      console.error("Mistral API: réponse sans corps");
      return jsonError("Réponse vide du service de chat", 502);
    }

    const stream = new ReadableStream({
      async start(controller) {
        const reader = upstreamBody.getReader();

        const decoder = new TextDecoder();
        const encoder = new TextEncoder();

        let buffer = "";

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() ?? "";

            for (const line of lines.filter((l) => l.startsWith("data: "))) {
              const data = line.slice(6).trim();
              if (!data || data === "[DONE]") continue;

              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices?.[0]?.delta?.content || "";
                if (content) {
                  controller.enqueue(encoder.encode(content));
                }
              } catch (err) {
                console.warn("Chat API: fragment SSE illisible ignoré:", data, err);
              }
            }
          }
          controller.close();
        } catch (err) {
          console.error("Stream error:", err);
          controller.error(err instanceof Error ? err : new Error(String(err)));
        } finally {
          reader.releaseLock();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (err) {
    console.error("Chat API error:", err);
    return jsonError("Erreur interne du serveur", 500);
  }
}
