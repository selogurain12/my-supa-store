import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { delay } from "@/lib/delay";
import AddToCartButton from "./AddToCartButton";
import ProductTabs from "./ProductTabs";
import SimilarProducts from "./SimilarProducts";
import { Suspense } from "react";

type SelectedProduct = {
  id: number;
  slug: string;
  name: string;
  price: string;
  category: string;
  description: string;
  image: string;
};

type ProductDetailsProps = {
  productPromise: Promise<SelectedProduct | null>;
  similarPromise: Promise<SimilarProduct[]>;
};

type SimilarProduct = {
  slug: string;
  name: string;
  price: string;
  image: string;
  shortDescription: string;
};

function SimilarProductsFallback() {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="h-6 w-1/3 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800" />
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div key={item} className="space-y-3 rounded-3xl border border-zinc-200 bg-zinc-100 p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <div className="h-32 rounded-3xl bg-zinc-200 dark:bg-zinc-800" />
            <div className="space-y-2">
              <div className="h-4 w-3/4 rounded-full bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-3 w-1/2 rounded-full bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-4 w-1/3 rounded-full bg-sky-200 dark:bg-sky-800" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function ProductDetails({ productPromise, similarPromise }: ProductDetailsProps) {
  const product = await productPromise;

  if (!product) {
    notFound();
  }

  await delay(300);

  const cleanPrice = Number(
    product.price.replace("€", "").replace(/\s/g, "").replace(",", ".")
  );

  return (
    <>
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
            <p className="text-sm uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
              Catégorie : {product.category}
            </p>
            <p className="text-2xl font-semibold text-sky-600 dark:text-sky-400">{product.price}</p>
          </div>
          <ProductTabs
            description={product.description}
            specifications={{
              "Matériau": "Coton bio",
              "Taille": "S, M, L, XL",
              "Couleur": "Noir, Blanc, Bleu",
              "Entretien": "Lavage à 30°C",
              "Origine": "Fabriqué en France",
            }}
          />
          <div className="space-y-3">
            <AddToCartButton
              id={product.id}
              name={product.name}
              price={cleanPrice}
              image={product.image}
            />
            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="flex-1 rounded-full border border-zinc-300 px-5 py-3 text-sm font-medium transition hover:border-sky-600 hover:text-sky-600 dark:border-zinc-700 dark:hover:border-sky-400 dark:hover:text-sky-400 text-center"
              >
                Retour à l’accueil
              </Link>
              <Link
                href="/products"
                className="flex-1 rounded-full bg-sky-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-sky-500 text-center"
              >
                Voir tous les produits
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Suspense fallback={<SimilarProductsFallback />}>
        <SimilarProducts productsPromise={similarPromise} category={product.category} />
      </Suspense>
    </>
  );
}
