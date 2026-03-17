import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="p-4 border-b justify-between flex items-center">
        <h1 className="text-xl font-bold">My Supa Store</h1>
      <ul className="flex gap-4">
        <li><Link href="/">Accueil</Link></li>
        <li><Link href="/about">À propos</Link></li>
        <li><Link href="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
}
