import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-black dark:text-zinc-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-8xl font-bold text-zinc-300 dark:text-zinc-700">404</h1>
          <h2 className="text-3xl font-semibold">Page non trouvée</h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Désolé, la page que vous recherchez n&apos;existe pas ou a été déplacée.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-sky-600 text-white rounded-lg font-medium hover:bg-sky-700 transition"
          >
            Retour à l&apos;accueil
          </Link>
          <Link
            href="/products"
            className="px-6 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
          >
            Voir les produits
          </Link>
        </div>

        <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Besoin d&apos;aide ?{" "}
            <Link href="/contact" className="text-sky-600 dark:text-sky-400 hover:underline">
              Contactez-nous
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}