import Link from "next/link";
import CartSummary from "./CartSummary";

export default function Navbar() {
  return (
    <nav className="p-4 border-b justify-between flex items-center bg-white/80 backdrop-blur-sm dark:bg-zinc-950/90">
      <h1 className="text-xl font-bold">My Supa Store</h1>
      <ul className="flex gap-4 text-sm font-medium items-center">
        <li>
          <Link href="/" className="transition hover:text-sky-600 dark:hover:text-sky-400">
            Accueil
          </Link>
        </li>
        <li>
          <Link href="/products" className="transition hover:text-sky-600 dark:hover:text-sky-400">
            Produits
          </Link>
        </li>
        <li>
          <Link href="/about" className="transition hover:text-sky-600 dark:hover:text-sky-400">
            À propos
          </Link>
        </li>
        <li>
          <Link href="/contact" className="transition hover:text-sky-600 dark:hover:text-sky-400">
            Contact
          </Link>
        </li>
        <li className="ml-4 pl-4 border-l">
          <CartSummary />
        </li>
      </ul>
    </nav>
  );
}
