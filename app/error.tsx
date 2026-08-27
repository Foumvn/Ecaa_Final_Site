"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Erreur de rendu:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-6 text-center">
      <h1 className="text-3xl font-medium tracking-tight text-foreground">
        Une erreur est survenue
      </h1>
      <p className="max-w-md text-muted-foreground">
        Le contenu n&apos;a pas pu être affiché. Vous pouvez réessayer ou nous contacter au
        +237 6 56 49 03 21.
      </p>
      {error.digest && (
        <p className="text-xs text-muted-foreground">Référence : {error.digest}</p>
      )}
      <Button onClick={reset}>Réessayer</Button>
    </div>
  );
}
