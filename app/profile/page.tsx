import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import SignOutButton from "@/components/SignOutButton";
import { authOptions } from "@/lib/auth";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <section className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-4xl flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.3em] text-sky-600">Espace protégé</p>
          <h1 className="mt-3 text-3xl font-semibold text-zinc-950 dark:text-white">Bienvenue sur votre page profil</h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Cette page est visible uniquement pour les utilisateurs authentifiés.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Nom</p>
            <p className="mt-2 text-lg font-semibold text-zinc-950 dark:text-white">{session.user.name ?? "Utilisateur"}</p>
          </div>
          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Email</p>
            <p className="mt-2 text-lg font-semibold text-zinc-950 dark:text-white">{session.user.email}</p>
          </div>
          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Rôle</p>
            <p className="mt-2 text-lg font-semibold text-zinc-950 dark:text-white">{session.user.role ?? "user"}</p>
          </div>
          <div className="flex items-center justify-between rounded-3xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Actions</p>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Vous pouvez vous déconnecter en toute sécurité.</p>
            </div>
            <SignOutButton />
          </div>
        </div>
      </div>
    </section>
  );
}
