import { z } from "zod";
import { buildSystemPrompt } from "@/lib/build-system-prompt";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

const MISTRAL_API_URL = "https://api.mistral.ai/v1/chat/completions";

const MAX_BODY_BYTES = 32_000;
const MAX_MESSAGES = 20;
const MAX_MESSAGE_CHARS = 2_000;
const MAX_TOTAL_CHARS = 12_000;
const MAX_TOKENS = 800;
const UPSTREAM_TIMEOUT_MS = 30_000;
const RATE_LIMIT_REQUESTS = 15;
const RATE_LIMIT_WINDOW_MS = 60_000;

const chatRequestSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().trim().min(1).max(MAX_MESSAGE_CHARS),
      })
    )
    .min(1)
    .max(MAX_MESSAGES)
    .refine(
      (messages) =>
        messages.reduce((total, m) => total + m.content.length, 0) <= MAX_TOTAL_CHARS,
      { message: "Conversation trop longue" }
    ),
});

function jsonError(status: number, error: string, headers: HeadersInit = {}) {
  return new Response(JSON.stringify({ error }), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });
}

function allowedOrigins(): string[] {
  return (process.env.ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function isSameSiteRequest(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true;

  if (allowedOrigins().includes(origin)) return true;

  try {
    return new URL(origin).host === new URL(req.url).host;
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  try {
    if (!isSameSiteRequest(req)) {
      return jsonError(403, "Origine non autorisée");
    }

    const contentLength = Number(req.headers.get("content-length") ?? 0);
    if (contentLength > MAX_BODY_BYTES) {
      return jsonError(413, "Requête trop volumineuse");
    }

    const { allowed, retryAfterSeconds } = checkRateLimit(
      getClientIp(req),
      RATE_LIMIT_REQUESTS,
      RATE_LIMIT_WINDOW_MS
    );
    if (!allowed) {
      return jsonError(429, "Trop de requêtes, veuillez patienter", {
        "Retry-After": String(retryAfterSeconds),
      });
    }

    const rawBody = await req.text();
    if (rawBody.length > MAX_BODY_BYTES) {
      return jsonError(413, "Requête trop volumineuse");
    }

    let parsedBody: unknown;
    try {
      parsedBody = JSON.parse(rawBody);
    } catch {
      return jsonError(400, "Corps de requête invalide");
    }

    const result = chatRequestSchema.safeParse(parsedBody);
    if (!result.success) {
      return jsonError(400, "Messages invalides");
    }
    const { messages } = result.data;

    const apiKey = process.env.MISTRAL_API_KEY;
    if (!apiKey) {
      console.error("MISTRAL_API_KEY is not configured");
      return jsonError(503, "Service temporairement indisponible");
    }

    const mistralBody = {
      model: "mistral-tiny",
      stream: true,
      max_tokens: MAX_TOKENS,
      messages: [{ role: "system", content: buildSystemPrompt() }, ...messages],
    };

    const response = await fetch(MISTRAL_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(mistralBody),
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });

    if (!response.ok) {
      console.error("Mistral API error:", response.status);
      const status = response.status === 429 ? 429 : 502;
      return jsonError(status, "Service temporairement indisponible");
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
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (err) {
    console.error("Chat API error:", err);
    return jsonError(500, "Erreur interne du serveur");
  }
}
