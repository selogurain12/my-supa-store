"use client";

import { useRouter } from "next/navigation";
import { formatCurrency, type CartItemWithProduct } from "@/lib/cart";

interface CartItemRowProps {
  item: CartItemWithProduct;
}

export default function CartItemRow({ item }: CartItemRowProps) {
  const router = useRouter();

  const updateCart = async (action: "update" | "remove", quantity?: number) => {
    const response = await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: item.productId,
        action,
        quantity,
      }),
    });

    if (response.ok) {
      router.refresh();
    } else {
      console.error("Impossible de mettre à jour le panier");
    }
  };

  return (
    <tr className="border-b dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-700 transition">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          {item.product.image && (
            <img
              src={item.product.image}
              alt={item.product.name}
              className="w-12 h-12 object-cover rounded"
            />
          )}
          <div>
            <p className="font-semibold text-zinc-950 dark:text-white">{item.product.name}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">{item.product.slug}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">{formatCurrency(item.product.priceCents)}€</td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => updateCart("update", item.quantity - 1)}
            className="px-2 py-1 bg-gray-200 dark:bg-zinc-600 rounded hover:bg-gray-300 dark:hover:bg-zinc-500 transition"
          >
            −
          </button>
          <span className="w-8 text-center font-medium">{item.quantity}</span>
          <button
            type="button"
            onClick={() => updateCart("update", item.quantity + 1)}
            className="px-2 py-1 bg-gray-200 dark:bg-zinc-600 rounded hover:bg-gray-300 dark:hover:bg-zinc-500 transition"
          >
            +
          </button>
        </div>
      </td>
      <td className="px-6 py-4 font-semibold">{formatCurrency(item.product.priceCents * item.quantity)}€</td>
      <td className="px-6 py-4">
        <button
          type="button"
          onClick={() => updateCart("remove")}
          className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded hover:bg-red-200 dark:hover:bg-red-800 transition text-sm font-medium"
        >
          Supprimer
        </button>
      </td>
    </tr>
  );
}
