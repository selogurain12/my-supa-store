"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RefreshSponsoredButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRefresh = async () => {
    setLoading(true);
    const response = await fetch("/api/revalidate-sponsor", {
      method: "POST",
    });
    setLoading(false);

    if (response.ok) {
      router.refresh();
    } else {
      console.error("Impossible de revalider le cache sponsorisé");
    }
  };

  return (
    <button
      type="button"
      onClick={handleRefresh}
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-full border border-sky-600 bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {loading ? "Actualisation…" : "Actualiser"}
    </button>
  );
}
