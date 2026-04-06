"use client";

import { useCart } from "@/app/context/CartContext";

interface AddToCartButtonProps {
  id: number | string;
  name: string;
  price: number;
  image?: string;
}

export default function AddToCartButton({ id, name, price, image }: AddToCartButtonProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({ id: String(id), name, price: Number(price), image });
  };

  return (
    <button
      onClick={handleAddToCart}
      className="w-full px-4 py-2 bg-sky-600 text-white rounded-lg font-medium hover:bg-sky-700 transition"
    >
      Ajouter au panier
    </button>
  );
}
