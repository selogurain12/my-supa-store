"use client";

import { useState } from "react";

export default function ABTestPage() {
  const [variant, setVariant] = useState<"A" | "B" | null>(() => {
    if (typeof document === "undefined") return null;

    const cookies = document.cookie.split(";").map((c) => c.trim());
    const cookie = cookies.find((c) => c.startsWith("ab_variant="));

    return cookie
      ? (cookie.replace("ab_variant=", "") as "A" | "B")
      : null;
  });

  const [isLoaded] = useState(() => typeof window !== "undefined");

  const handleForceVariant = (forcedVariant: "A" | "B") => {
    const params = new URLSearchParams();
    params.set("ab_prefetch", forcedVariant);
    window.location.href = `${window.location.pathname}?${params.toString()}`;
  };

  const handleResetCookie = () => {
    document.cookie =
      "ab_variant=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <h1 className="mb-2 text-4xl font-bold text-gray-900">🧪 A/B Test Debug</h1>
          <p className="mb-6 text-gray-600">Testez le système de test A/B avec cookies</p>

          {!isLoaded ? (
            <div className="flex items-center justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-300 border-t-blue-600"></div>
            </div>
          ) : (
            <>
              <div className="mb-8 rounded-lg bg-blue-50 p-6 border-2 border-blue-200">
                <p className="mb-2 text-sm font-semibold text-gray-600">Variant Actuel:</p>
                <p className="text-5xl font-bold text-blue-600">{variant || "Aucun"}</p>
              </div>

              <div className="mb-8 space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Actions:</h2>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleForceVariant("A")}
                    className="rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3 font-semibold text-white transition hover:from-blue-600 hover:to-blue-700"
                  >
                    Force Variant A
                  </button>
                  <button
                    onClick={() => handleForceVariant("B")}
                    className="rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-3 font-semibold text-white transition hover:from-purple-600 hover:to-purple-700"
                  >
                    Force Variant B
                  </button>
                </div>

                <button
                  onClick={handleResetCookie}
                  className="w-full rounded-lg bg-gray-400 px-6 py-3 font-semibold text-white transition hover:bg-gray-500"
                >
                  Réinitialiser & Tirage Aléatoire
                </button>
              </div>

              <div className="space-y-4 rounded-lg bg-gray-50 p-6">
                <h2 className="text-xl font-semibold text-gray-900">📋 Comment tester:</h2>
                <ol className="list-inside list-decimal space-y-2 text-gray-700">
                  <li>Voir le cookie dans DevTools → Application → Cookies</li>
                  <li>Forcer un variant via les boutons</li>
                  <li>Tester ?ab_prefetch=A ou B</li>
                  <li>Supprimer le cookie pour un tirage aléatoire</li>
                </ol>

                <div className="mt-4 border-t border-gray-200 pt-4">
                  <h3 className="font-semibold text-gray-900 mb-2">💡 Tests à faire:</h3>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>Recharger la page : le variant reste identique</li>
                    <li>Naviguer : le variant reste identique</li>
                    <li>Forcer via query param</li>
                    <li>Supprimer cookie → nouveau tirage</li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="mt-8 rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">📊 État technique:</h2>
          <pre className="overflow-auto rounded bg-gray-100 p-4 text-sm">
            {JSON.stringify(
              {
                "Variant Actuel": variant,
                "Cookie Présent": !!variant,
                URL: typeof window !== "undefined" ? window.location.href : "N/A",
                Timestamp: new Date().toISOString(),
              },
              null,
              2
            )}
          </pre>
        </div>
      </div>
    </div>
  );
}
