import Image from "next/image";
import Link from "next/link";

type SimilarProduct = {
  slug: string;
  name: string;
  price: string;
  image: string;
  shortDescription: string;
};

interface SimilarProductsProps {
  products: SimilarProduct[];
  category: string;
}

export default function SimilarProducts({ products, category }: SimilarProductsProps) {
  return (
    <section className="rounded-3xl border border-zinc-200 bg-white/80 p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">Produits similaires</p>
          <h2 className="text-2xl font-semibold">Dans la même catégorie : {category}</h2>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Link
            key={product.slug}
            href={`/products/${product.slug}`}
            className="group overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-50 p-4 transition hover:-translate-y-1 hover:border-sky-300 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-sky-400 dark:hover:bg-zinc-800"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-white dark:bg-zinc-950">
              <Image src={product.image} alt={product.name} fill className="object-contain p-4" />
            </div>
            <div className="mt-4 space-y-2">
              <h3 className="text-lg font-semibold text-zinc-950 dark:text-white">{product.name}</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{product.shortDescription}</p>
              <p className="text-base font-semibold text-sky-600 dark:text-sky-400">{product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
