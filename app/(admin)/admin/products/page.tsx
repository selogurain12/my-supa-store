import Link from "next/link";
import { prisma } from "../../../../lib/prisma";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-black dark:text-zinc-50">
      <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-6 py-10 sm:px-8">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-2">
            <p className="text-sm uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">Admin</p>
            <h1 className="text-4xl font-semibold">Produits</h1>
            <p className="text-zinc-600 dark:text-zinc-300">Gérez votre catalogue de produits</p>
          </div>
          <Link
            href="/admin/products/new"
            className="inline-flex rounded-full bg-sky-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-sky-500"
          >
            Ajouter un produit
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-8 text-center dark:border-zinc-700 dark:bg-zinc-950">
            <p className="text-zinc-600 dark:text-zinc-400">Aucun produit pour le moment.</p>
            <Link
              href="/admin/products/new"
              className="mt-4 inline-flex text-sm font-medium text-sky-600 hover:text-sky-500 dark:text-sky-400"
            >
              Créer le premier produit
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
                  <th className="px-6 py-3 text-left text-sm font-semibold">Nom</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Slug</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Prix</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Créé</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product: { id: number; name: string; slug: string; price: string; createdAt: Date }) => (
                  <tr
                    key={product.id}
                    className="border-b border-zinc-100 transition hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
                  >
                    <td className="px-6 py-4 font-medium">{product.name}</td>
                    <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">{product.slug}</td>
                    <td className="px-6 py-4 font-semibold text-sky-600 dark:text-sky-400">{product.price}</td>
                    <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">
                      {new Date(product.createdAt).toLocaleDateString("fr-FR")}
                    </td>
                    <td className="flex justify-end gap-3 px-6 py-4">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="text-sm font-medium text-sky-600 hover:text-sky-500 dark:text-sky-400"
                      >
                        Éditer
                      </Link>
                      <button className="text-sm font-medium text-red-600 hover:text-red-500 dark:text-red-400">
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
