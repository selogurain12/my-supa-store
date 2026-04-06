import Link from "next/link";
import { getCartSummary, formatCurrency } from "@/lib/cart";

export default async function CartSummary() {
  const { itemCount, totalCents } = await getCartSummary();

  return (
    <Link href="/cart" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-sky-100 dark:bg-sky-950 hover:bg-sky-200 dark:hover:bg-sky-900 transition">
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      <div className="flex flex-col">
        <span className="text-sm font-semibold">{itemCount}</span>
        <span className="text-xs text-gray-600 dark:text-gray-400">{formatCurrency(totalCents)}€</span>
      </div>
    </Link>
  );
}
