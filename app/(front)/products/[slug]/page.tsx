import Image from "next/image";
import Link from "next/link";
import { prisma } from "../../../../lib/prisma";

type PageProps<P = unknown> = {
  params: Promise<P>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ProductPage({ params }: PageProps<{ slug: string }>) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
  });

  if (!product) {
    return (
      <div className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-black dark:text-zinc-50">
        <main className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 py-10 text-center sm:px-8">
          <p className="text-sm uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">Produit introuvable</p>
          <h1 className="mt-4 text-3xl font-semibold text-zinc-950 dark:text-white">Aucun produit ne correspond à ce slug.</h1>
          <Link href="/" className="mt-8 inline-flex rounded-full bg-sky-600 px-5 py-3 text-white transition hover:bg-sky-500">
            Retour à l’accueil
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-black dark:text-zinc-50">
      <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-6 py-10 sm:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          <div className="relative flex-1 overflow-hidden rounded-[2rem] bg-zinc-100 dark:bg-zinc-900 sm:h-[420px]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
          <div className="flex-1 space-y-6">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">Fiche produit</p>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{product.name}</h1>
              <p className="text-2xl font-semibold text-sky-600 dark:text-sky-400">{product.price}</p>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-300">{product.description}</p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="rounded-full border border-zinc-300 px-5 py-3 text-sm font-medium transition hover:border-sky-600 hover:text-sky-600 dark:border-zinc-700 dark:hover:border-sky-400 dark:hover:text-sky-400"
              >
                Retour à l’accueil
              </Link>
              <Link
                href="/products"
                className="rounded-full bg-sky-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-sky-500"
              >
                Voir tous les produits
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
