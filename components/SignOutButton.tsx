"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  const handleSignOut = () => {
    const callbackUrl = typeof window !== "undefined" ? window.location.origin : "/";
    signOut({ callbackUrl, redirect: true });
  };

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
    >
      Déconnexion
    </button>
  );
}
