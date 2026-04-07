import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import UpdateProductForm from "./UpdateProductForm";
import { updateProduct } from "./actions";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProductPage({ params }: PageProps) {
  const { id } = await params;
  const productId = Number(id);

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    notFound();
  }

  return (
    <section className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-4xl flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.3em] text-sky-600">Admin / Produit</p>
          <h1 className="mt-3 text-3xl font-semibold text-zinc-950 dark:text-white">Modifier le produit</h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Modifiez les informations du produit puis enregistrez les changements.
          </p>
        </div>

        <UpdateProductForm product={product} action={updateProduct} />
      </div>
    </section>
  );
}
