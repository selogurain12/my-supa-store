import Image from "next/image";
import Link from "next/link";
import RefreshSponsoredButton from "./RefreshSponsoredButton";

type SponsoredProduct = {
  slug: string;
  name: string;
  price: string;
  shortDescription: string;
  image: string;
  category: string;
};

type MockStoreResponse = {
  success: boolean;
  products: SponsoredProduct[];
  fetchedAt: string;
  duration: string;
};

export default async function SponsoredProducts() {
  const response = await fetch("/api/mockstore", {
    cache: "force-cache",
    next: {
      tags: ["sponsored-products"],
      revalidate: 60,
    },
  });
  const data = (await response.json()) as MockStoreResponse;

  return (
    <section className="rounded-3xl border border-zinc-200 bg-white/80 p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">Produits sponsorisés</p>
          <h2 className="text-2xl font-semibold text-zinc-950 dark:text-white">Produits sponsorisés</h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Cache: <span className="font-semibold">force-cache</span>, revalidate en arrière-plan toutes les 60s.
          </p>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">
            Dernier fetch: {data.duration}ms · récupéré à {new Date(data.fetchedAt).toLocaleTimeString()}.
          </p>
        </div>
        <RefreshSponsoredButton />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {data.products.map((product) => (
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
