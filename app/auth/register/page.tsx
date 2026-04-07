import Link from "next/link";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-4xl flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 space-y-3 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-sky-600">Inscription</p>
        <h1 className="text-3xl font-semibold text-zinc-950 dark:text-white">Créer un compte</h1>
        <p className="mx-auto max-w-xl text-sm text-zinc-600 dark:text-zinc-400">
          Inscrivez-vous pour accéder à votre page de profil protégée et bénéficier des fonctionnalités réservées aux utilisateurs authentifiés.
        </p>
      </div>

      <RegisterForm />

      <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
        Vous avez déjà un compte ?{' '}
        <Link href="/auth/login" className="font-semibold text-sky-600 hover:text-sky-500">
          Connectez-vous
        </Link>
      </p>
    </section>
  );
}
