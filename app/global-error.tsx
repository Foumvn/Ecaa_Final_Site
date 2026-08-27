"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Erreur globale:", error);
  }, [error]);

  return (
    <html lang="fr">
      <body>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.5rem",
            padding: "1.5rem",
            textAlign: "center",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <h1 style={{ fontSize: "1.75rem", fontWeight: 500 }}>Une erreur est survenue</h1>
          <p style={{ maxWidth: "32rem", color: "#666" }}>
            Le site n&apos;a pas pu être chargé. Veuillez réessayer ou nous contacter au
            +237 6 56 49 03 21.
          </p>
          {error.digest && (
            <p style={{ fontSize: "0.75rem", color: "#888" }}>Référence : {error.digest}</p>
          )}
          <button
            onClick={reset}
            style={{
              padding: "0.75rem 1.5rem",
              borderRadius: "0.5rem",
              border: "1px solid #ddd",
              cursor: "pointer",
            }}
          >
            Réessayer
          </button>
        </div>
      </body>
    </html>
  );
}
