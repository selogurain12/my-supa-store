"use client";

import type { Product } from "@prisma/client";

type UpdateProductFormProps = {
  product: Product;
  action: (formData: FormData) => Promise<void>;
};

export default function UpdateProductForm({ product, action }: UpdateProductFormProps) {
  return (
    <form action={action} className="space-y-6 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <input type="hidden" name="id" value={product.id} />

      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">
            Nom
          </label>
          <input
            id="name"
            name="name"
            defaultValue={product.name ?? ""}
            required
            className="mt-2 w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">
            Slug
          </label>
          <input
            id="slug"
            name="slug"
            defaultValue={product.slug}
            required
            className="mt-2 w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
          />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">
            Prix affiché
          </label>
          <input
            id="price"
            name="price"
            defaultValue={product.price}
            required
            className="mt-2 w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="priceCents" className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">
            Prix en centimes
          </label>
          <input
            id="priceCents"
            name="priceCents"
            type="number"
            defaultValue={product.priceCents}
            required
            min={0}
            className="mt-2 w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
          />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">
            Catégorie
          </label>
          <input
            id="category"
            name="category"
            defaultValue={product.category}
            required
            className="mt-2 w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">
            Image
          </label>
          <input
            id="image"
            name="image"
            defaultValue={product.image}
            required
            className="mt-2 w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
          />
        </div>
      </div>

      <div>
        <label htmlFor="shortDescription" className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">
          Description courte
        </label>
        <textarea
          id="shortDescription"
          name="shortDescription"
          defaultValue={product.shortDescription}
          required
          rows={3}
          className="mt-2 w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">
          Description complète
        </label>
        <textarea
          id="description"
          name="description"
          defaultValue={product.description}
          required
          rows={6}
          className="mt-2 w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-2xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-500"
      >
        Enregistrer les modifications
      </button>
    </form>
  );
}
