import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import ProductDetails from "@/components/ProductDetails";

export const dynamic = "force-dynamic";
export const dynamicParams = false;
export const revalidate = 60;

type Params = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    select: {
      name: true,
      description: true,
      shortDescription: true,
      image: true,
      category: true,
    },
  });

  if (!product) {
    return {
      title: "Produit introuvable | MySupaStore",
      description: "Ce produit est introuvable.",
      robots: { index: false, follow: false },
    };
  }

  const title = `${product.name} — MySupaStore`;
  const description = product.description || product.shortDescription || "Découvrez ce produit sur MySupaStore.";
  const keywords = [product.name, product.category].filter(Boolean) as string[];
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const productUrl = `${base.replace(/\/$/, "")}/products/${slug}`;

  return {
    title,
    description,
    keywords,
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: productUrl,
      images: product.image ? [product.image] : [],
      type: "website",
    },
  };
}

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const products = await prisma.product.findMany({ select: { slug: true } });
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;

  const productPromise = prisma.product.findUnique({
    where: { slug },
    select: {
      id: true,
      slug: true,
      name: true,
      price: true,
      category: true,
      description: true,
      image: true,
    },
  });

  const similarProductsPromise = productPromise.then(async (product) => {
    if (!product) {
      return [];
    }

    const sameCategory = await prisma.product.findMany({
      where: {
        category: product.category,
        slug: { not: product.slug },
      },
      take: 3,
      select: {
        slug: true,
        name: true,
        price: true,
        image: true,
        shortDescription: true,
      },
    });

    if (sameCategory.length > 0) {
      return sameCategory;
    }

    return prisma.product.findMany({
      where: {
        slug: { not: product.slug },
      },
      take: 3,
      select: {
        slug: true,
        name: true,
        price: true,
        image: true,
        shortDescription: true,
      },
    });
  });

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-black dark:text-zinc-50">
      <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-6 py-10 sm:px-8">
        <Suspense
          fallback={
            <div className="rounded-3xl border border-zinc-200 bg-white/80 p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/80">
              <div className="h-8 w-2/3 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800" />
              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <div className="h-[420px] rounded-[2rem] bg-zinc-200 dark:bg-zinc-800" />
                <div className="space-y-4">
                  <div className="h-6 w-1/4 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                  <div className="h-10 w-3/4 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                  <div className="h-6 w-1/2 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                  <div className="h-12 rounded-3xl bg-zinc-200 dark:bg-zinc-800" />
                </div>
              </div>
            </div>
          }
        >
          <ProductDetails productPromise={productPromise} similarPromise={similarProductsPromise} />
        </Suspense>
      </main>
    </div>
  );
}
