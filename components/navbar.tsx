import Link from "next/link";
import { getServerSession } from "next-auth";
import CartSummary from "./CartSummary";
import SignOutButton from "./SignOutButton";
import { authOptions } from "@/lib/auth";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user?.role === "admin";
  console.log(session?.user.role)
  const initials = session?.user?.name
    ? session.user.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : session?.user?.email?.charAt(0).toUpperCase() ?? "U";

  return (
    <nav className="p-4 border-b justify-between flex flex-wrap items-center gap-3 bg-white/80 backdrop-blur-sm dark:bg-zinc-950/90">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold">My Supa Store</h1>
        <ul className="flex flex-wrap gap-4 text-sm font-medium items-center">
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
            <Link href="/profile" className="transition hover:text-sky-600 dark:hover:text-sky-400">
              Profil
            </Link>
          </li>
          {isAdmin && (
            <li>
              <Link href="/admin" className="transition hover:text-sky-600 dark:hover:text-sky-400">
                Admin
              </Link>
            </li>
          )}
        </ul>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
        {session ? (
          <>
            <div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-100 px-3 py-1 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-sky-600 text-xs font-semibold text-white">
                {initials}
              </span>
              <span>{session.user.name ?? session.user.email}</span>
            </div>
            <SignOutButton />
          </>
        ) : (
          <>
            <Link href="/auth/login" className="transition hover:text-sky-600 dark:hover:text-sky-400">
              Connexion
            </Link>
            <Link href="/auth/register" className="rounded-full border border-sky-600 bg-sky-600 px-3 py-1 text-white transition hover:bg-sky-500">
              Inscription
            </Link>
          </>
        )}
        <div className="ml-2 pl-2 border-l">
          <CartSummary />
        </div>
      </div>
    </nav>
  );
}
