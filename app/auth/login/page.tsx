import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-4xl flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 space-y-3 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-sky-600">Connexion</p>
        <h1 className="text-3xl font-semibold text-zinc-950 dark:text-white">Se connecter</h1>
        <p className="mx-auto max-w-xl text-sm text-zinc-600 dark:text-zinc-400">
          Connectez-vous pour accéder à votre page protégée et voir le menu admin si vous avez le rôle admin.
        </p>
      </div>

      <LoginForm />

      <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
        Pas encore de compte ?{' '}
        <Link href="/auth/register" className="font-semibold text-sky-600 hover:text-sky-500">
          Inscrivez-vous
        </Link>
      </p>
    </section>
  );
}
