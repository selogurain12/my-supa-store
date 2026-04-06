import type { CartItem, Product } from "@prisma/client";
import { prisma } from "./prisma";

export type CartItemWithProduct = CartItem & {
  product: Product;
};

export function formatCurrency(cents: number) {
  return (cents / 100).toFixed(2);
}

export async function getCartItems(): Promise<CartItemWithProduct[]> {
  return prisma.cartItem.findMany({
    include: { product: true },
    orderBy: { updatedAt: "desc" },
  });
}

export async function getCartSummary() {
  const items = await getCartItems();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalCents = items.reduce((sum, item) => sum + item.quantity * item.product.priceCents, 0);

  return {
    itemCount,
    totalCents,
    items,
  };
}
