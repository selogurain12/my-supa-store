"use client";

import { useState } from "react";
import Link from "next/link";

export default function TestPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [shouldError, setShouldError] = useState(false);

  const handleLoadingTest = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsLoading(false);
  };

  const handleErrorTest = () => {
    setShouldError(true);
    throw new Error("Erreur de test déclenchée manuellement");
  };

  if (shouldError) {
    throw new Error("Erreur de test déclenchée manuellement");
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-black dark:text-zinc-50 py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Page de Test</h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Testez les composants de chargement et d&apos;erreur
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 shadow-sm border border-zinc-200 dark:border-zinc-800">
            <h2 className="text-xl font-semibold mb-4">Test du Loading</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              Cliquez sur le bouton pour simuler un chargement de 3 secondes.
            </p>
            <button
              onClick={handleLoadingTest}
              disabled={isLoading}
              className="w-full px-4 py-2 bg-sky-600 text-white rounded-lg font-medium hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {isLoading ? "Chargement..." : "Tester le Loading"}
            </button>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 shadow-sm border border-zinc-200 dark:border-zinc-800">
            <h2 className="text-xl font-semibold mb-4 text-red-600 dark:text-red-400">Test de l&apos;Erreur</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              Cliquez sur le bouton pour déclencher une erreur et voir la page d&apos;erreur personnalisée.
            </p>
            <button
              onClick={handleErrorTest}
              className="w-full px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
            >
              Déclencher une Erreur
            </button>
          </div>
          <Link
            href="/test/ab"
            className="bg-white dark:bg-zinc-900 rounded-lg p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between hover:shadow-md transition"
          >
            <div>
              <h2 className="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-400">🧪 Test A/B</h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                Testez le système de test A/B avec cookies. Voir les variants et forcer des valeurs.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 font-medium">
              Accéder au test →
            </span>
          </Link>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 shadow-sm border border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl font-semibold mb-4">Test de la page 404</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            Cliquez sur le lien ci-dessous pour accéder à une page qui n&apos;existe pas.
          </p>
          <a
            href="/page-qui-nexiste-pas"
            className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
          >
            Page inexistante →
          </a>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 shadow-sm border border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl font-semibold mb-4">Test de l&apos;API</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            L&apos;API des produits est disponible à l&apos;adresse suivante :
          </p>
          <a
            href="/api/products"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition"
          >
            GET /api/products →
          </a>
        </div>
      </div>
    </div>
  );
}