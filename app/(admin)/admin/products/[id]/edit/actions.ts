"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";
import { z } from "zod";

const productUpdateSchema = z.object({
  id: z.string().regex(/^\d+$/),
  name: z.string().min(1, "Le nom est requis."),
  slug: z.string().min(1, "Le slug est requis."),
  price: z.string().min(1, "Le prix est requis."),
  priceCents: z.preprocess((value) => Number(value), z.number().int().positive("Le prix doit être un nombre positif.")),
  category: z.string().min(1, "La catégorie est requise."),
  shortDescription: z.string().min(1, "La description courte est requise."),
  description: z.string().min(1, "La description est requise."),
  image: z.string().min(1, "L'URL de l'image est requise."),
});

export async function updateProduct(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const parsed = productUpdateSchema.safeParse(data);

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    parsed.error.issues.forEach((issue) => {
      const field = issue.path[0] as string;
      errors[field] = issue.message;
    });
    throw new Error(JSON.stringify({ success: false, errors }));
  }

  const productId = Number(parsed.data.id);

  try {
    await prisma.product.update({
      where: { id: productId },
      data: {
        name: parsed.data.name,
        slug: parsed.data.slug,
        price: parsed.data.price,
        priceCents: parsed.data.priceCents,
        category: parsed.data.category,
        shortDescription: parsed.data.shortDescription,
        description: parsed.data.description,
        image: parsed.data.image,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du produit:", error);
    throw new Error(JSON.stringify({ success: false, errors: { general: "Impossible de mettre à jour le produit. Veuillez réessayer." } }));
  }

  revalidateTag("products", "max");
  redirect("/admin/products");
}

export async function testError() {
  "use server";
  throw new Error("Ceci est une erreur de test pour vérifier l'affichage des erreurs.");
}
