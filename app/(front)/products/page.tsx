import Image from "next/image";
import Link from "next/link";
import { prisma } from "../../../lib/prisma";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-black dark:text-zinc-50">
      <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-6 py-10 sm:px-8">
        <section className="space-y-4">
          <p className="text-sm uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">Produits</p>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
            Tous les produits disponibles.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-300">
            Retrouvez le même catalogue que sur la page d’accueil, avec un accès direct à chaque fiche produit.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          {products.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="group overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-950"
            >
              <div className="relative h-72 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>
              <div className="space-y-3 p-6">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-xl font-semibold text-zinc-950 dark:text-white">{product.name}</h2>
                  <span className="text-lg font-semibold text-sky-600 dark:text-sky-400">{product.price}</span>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400">{product.shortDescription}</p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-sky-600 transition group-hover:translate-x-1 dark:text-sky-400">
                  Voir le produit →
                </span>
              </div>
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
}
