import { buildSystemPrompt } from "@/lib/build-system-prompt";

const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;
const MISTRAL_API_URL = "https://api.mistral.ai/v1/chat/completions";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "Messages invalides" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!MISTRAL_API_KEY) {
      return new Response(
        JSON.stringify({ error: "Clé API Mistral non configurée" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
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

    const response = await fetch(MISTRAL_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MISTRAL_API_KEY}`,
      },
      body: JSON.stringify(mistralBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Mistral API error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: `Erreur API: ${response.status}` }),
        { status: response.status, headers: { "Content-Type": "application/json" } }
      );
    }

    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        const decoder = new TextDecoder();
        const encoder = new TextEncoder();

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split("\n").filter((line) => line.startsWith("data: "));

            for (const line of lines) {
              const data = line.slice(6);
              if (data === "[DONE]") continue;

              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices?.[0]?.delta?.content || "";
                if (content) {
                  controller.enqueue(encoder.encode(content));
                }
              } catch {
                // skip malformed JSON
              }
            }
          }
        } catch (err) {
          console.error("Stream error:", err);
        } finally {
          reader.releaseLock();
          controller.close();
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
    return new Response(
      JSON.stringify({ error: "Erreur interne du serveur" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
