"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface AddToCartButtonProps {
  id: number | string;
  name: string;
  price: number;
  image?: string;
}

export default function AddToCartButton({ id, name, price, image }: AddToCartButtonProps) {
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);

    const response = await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: Number(id),
        quantity: 1,
        action: "add",
      }),
    });

    setIsAdding(false);

    if (response.ok) {
      router.refresh();
    } else {
      console.error("Impossible d'ajouter le produit au panier");
    }
  };

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      disabled={isAdding}
      className="w-full px-4 py-2 bg-sky-600 text-white rounded-lg font-medium hover:bg-sky-700 transition disabled:cursor-not-allowed disabled:opacity-70"
    >
      {isAdding ? "Ajout en cours…" : "Ajouter au panier"}
    </button>
  );
}
