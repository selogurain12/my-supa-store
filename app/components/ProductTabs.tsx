"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";

interface ProductTabsProps {
  description: string;
  specifications: Record<string, string>;
}

export default function ProductTabs({ description, specifications }: ProductTabsProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeTab = searchParams.get("tab") || "description";

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const setActiveTab = (tab: string) => {
    router.push(pathname + "?" + createQueryString("tab", tab), { scroll: false });
  };

  return (
    <div className="space-y-4">
      {/* Onglets */}
      <div className="border-b border-zinc-200 dark:border-zinc-700">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab("description")}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition ${
              activeTab === "description"
                ? "border-sky-600 text-sky-600 dark:border-sky-400 dark:text-sky-400"
                : "border-transparent text-zinc-500 hover:text-zinc-700 hover:border-zinc-300 dark:text-zinc-400 dark:hover:text-zinc-300"
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab("specifications")}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition ${
              activeTab === "specifications"
                ? "border-sky-600 text-sky-600 dark:border-sky-400 dark:text-sky-400"
                : "border-transparent text-zinc-500 hover:text-zinc-700 hover:border-zinc-300 dark:text-zinc-400 dark:hover:text-zinc-300"
            }`}
          >
            Spécifications
          </button>
        </nav>
      </div>

      {/* Contenu des onglets */}
      <div className="min-h-[200px]">
        {activeTab === "description" && (
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-300">
              {description}
            </p>
          </div>
        )}

        {activeTab === "specifications" && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Caractéristiques techniques
            </h3>
            <dl className="space-y-3">
              {Object.entries(specifications).map(([key, value]) => (
                <div key={key} className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-zinc-100 dark:border-zinc-800 last:border-b-0">
                  <dt className="font-medium text-zinc-900 dark:text-zinc-100 sm:w-1/3">
                    {key}
                  </dt>
                  <dd className="text-zinc-600 dark:text-zinc-400 sm:w-2/3 sm:text-right">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
    </div>
  );
}