import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-black dark:text-zinc-50">
      <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-6 py-10 sm:px-8">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">Admin</p>
          <h1 className="text-4xl font-semibold">Tableau de bord</h1>
          <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-300">
            Bienvenue dans l&apos;interface d&apos;administration de My Supa Store. G&eacute;rez vos produits et catalogues ici.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Link
            href="/admin/products"
            className="group rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-950"
          >
            <div className="space-y-4">
              <div className="inline-flex rounded-full bg-sky-100 p-3 dark:bg-sky-900">
                <svg className="h-6 w-6 text-sky-600 dark:text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m0 0l8 4m-8-4v10l8 4m0-10l8-4m-8 4v10l8-4M9 5l2 1m4-2l2 1" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold">Produits</h2>
              <p className="text-zinc-600 dark:text-zinc-400">Gérez votre catalogue de produits, ajoutez, modifiez ou supprimez des articles.</p>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-sky-600 transition group-hover:translate-x-1 dark:text-sky-400">
                Accédez aux produits →
              </span>
            </div>
          </Link>

          <Link
            href="/"
            className="group rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-950"
          >
            <div className="space-y-4">
              <div className="inline-flex rounded-full bg-purple-100 p-3 dark:bg-purple-900">
                <svg className="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold">Retour &agrave; l&apos;accueil</h2>
              <p className="text-zinc-600 dark:text-zinc-400">Consultez votre boutique en ligne et découvrez comment elle apparaît aux clients.</p>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-purple-600 transition group-hover:translate-x-1 dark:text-purple-400">
                Visiter la boutique →
              </span>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
