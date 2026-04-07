import Link from "next/link";
import { getCartItems, formatCurrency } from "@/lib/cart";
import CartItemRow from "@/components/CartItemRow";

export default async function CartPage() {
  const items = await getCartItems();
  const totalCents = items.reduce((sum, item) => sum + item.quantity * item.product.priceCents, 0);

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
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
      <div className="max-w-5xl mx-auto">
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
                <CartItemRow key={item.id} item={item} />
              ))}
            </tbody>
          </table>

          <div className="px-6 py-4 bg-gray-50 dark:bg-zinc-700 border-t dark:border-zinc-700 flex justify-between items-center">
            <span className="text-lg font-bold">Total :</span>
            <span className="text-2xl font-bold text-sky-600">{formatCurrency(totalCents)}€</span>
          </div>
        </div>

        <div className="flex gap-4 mt-8 flex-col sm:flex-row">
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
