"use client";

import { useCart } from "@/app/context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { items, total, removeItem, updateQuantity } = useCart();
  console.log(total)

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Votre panier est vide</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Commencez vos achats dès maintenant !</p>
        <Link
          href="/products"
          className="px-6 py-3 bg-sky-600 text-white rounded-lg font-medium hover:bg-sky-700 transition"
        >
          Voir les produits
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Votre panier</h1>

        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="border-b dark:border-zinc-700">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Produit</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Prix</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Quantité</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Total</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-700 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      )}
                      <span className="font-medium">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{Number(item.price).toFixed(2)}€</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 bg-gray-200 dark:bg-zinc-600 rounded hover:bg-gray-300 dark:hover:bg-zinc-500 transition"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 bg-gray-200 dark:bg-zinc-600 rounded hover:bg-gray-300 dark:hover:bg-zinc-500 transition"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold">
                    {(Number(item.price) * item.quantity).toFixed(2)}€
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded hover:bg-red-200 dark:hover:bg-red-800 transition text-sm font-medium"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="px-6 py-4 bg-gray-50 dark:bg-zinc-700 border-t dark:border-zinc-700 flex justify-between items-center">
            <span className="text-lg font-bold">Total :</span>
            <span className="text-2xl font-bold text-sky-600">{Number(total).toFixed(2)}€</span>
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <Link
            href="/products"
            className="flex-1 px-6 py-3 bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-white rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-zinc-600 transition text-center"
          >
            Continuer les achats
          </Link>
          <button className="flex-1 px-6 py-3 bg-sky-600 text-white rounded-lg font-medium hover:bg-sky-700 transition">
            Procéder au paiement
          </button>
        </div>
      </div>
    </div>
  );
}
