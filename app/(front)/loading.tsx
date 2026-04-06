export default function Loading() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-black dark:text-zinc-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-sky-200 dark:border-sky-800 rounded-full animate-spin"></div>
          <div className="absolute top-0 left-0 w-12 h-12 border-4 border-sky-600 dark:border-sky-400 rounded-full animate-spin border-t-transparent"></div>
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 animate-pulse">
          Chargement...
        </p>
      </div>
    </div>
  );
}