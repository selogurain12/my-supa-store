"use client";

import { useEffect, useState } from "react";

export default function SiteNameDemo() {
  const publicName = process.env.NEXT_PUBLIC_SITE_NAME ?? "—";
  const [serverName, setServerName] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/site-name")
      .then((r) => r.json())
      .then((data) => setServerName(data.siteName ?? null))
      .catch(() => setServerName(null));
  }, []);

  return (
    <div className="w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 text-sm p-3">
      <span className="font-semibold">Public env:</span> {publicName}
      <span className="mx-2">·</span>
      <span className="font-semibold">Server env (via API):</span> {serverName ?? "(loading...)"}
    </div>
  );
}
