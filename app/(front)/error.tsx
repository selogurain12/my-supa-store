"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-black dark:text-zinc-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-red-600 dark:text-red-400">Oops!</h1>
          <h2 className="text-2xl font-semibold">Une erreur est survenue</h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Désolé, quelque chose s&apos;est mal passé. Veuillez réessayer.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-sky-600 text-white rounded-lg font-medium hover:bg-sky-700 transition"
          >
            Réessayer
          </button>
          <Link
            href="/"
            className="px-6 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition text-center"
          >
            Retour à l&apos;accueil
          </Link>
        </div>

        {process.env.NODE_ENV === "development" && (
          <details className="mt-6 text-left">
            <summary className="cursor-pointer text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300">
              Détails de l&apos;erreur (développement)
            </summary>
            <pre className="mt-2 p-3 bg-zinc-100 dark:bg-zinc-900 rounded text-xs overflow-auto">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}