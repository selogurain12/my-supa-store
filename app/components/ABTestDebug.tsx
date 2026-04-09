"use client";

import { useState } from "react";

export function ABTestDisplay() {
  const [variant] = useState<"A" | "B" | null>(() => {
    if (typeof document === "undefined") return null;

    const cookies = document.cookie.split(";").map((c) => c.trim());
    const cookie = cookies.find((c) => c.startsWith("ab_variant="));

    return cookie ? (cookie.replace("ab_variant=", "") as "A" | "B") : null;
  });

  const [isLoaded] = useState(() => typeof window !== "undefined");

  const handleForceVariant = (forcedVariant: "A" | "B") => {
    const params = new URLSearchParams();
    params.set("ab_prefetch", forcedVariant);
    window.location.href = `${window.location.pathname}?${params.toString()}`;
  };

  const handleResetCookie = () => {
    document.cookie =
      "ab_variant=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
  };

  if (!isLoaded) return null;

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-blue-50 border-2 border-blue-300 rounded-lg shadow-lg max-w-xs">
      <div className="text-sm font-semibold text-blue-900 mb-2">🧪 A/B Test Debug</div>
      <div className="text-sm text-blue-800 mb-3">
        Current Variant:{" "}
        <span className="font-bold text-lg text-blue-600">
          {variant || "None"}
        </span>
      </div>

      <div className="flex gap-2 mb-2">
        <button
          onClick={() => handleForceVariant("A")}
          className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
        >
          Force A
        </button>
        <button
          onClick={() => handleForceVariant("B")}
          className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
        >
          Force B
        </button>
      </div>

      <button
        onClick={handleResetCookie}
        className="w-full px-2 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600"
      >
        Reset & Random
      </button>

      <div className="mt-3 text-xs text-blue-600">
        <p className="font-semibold">Instructions:</p>
        <ul className="list-disc list-inside">
          <li>Check DevTools → Application → Cookies</li>
          <li>Look for &quot;ab_variant&quot;</li>
          <li>Use buttons to test variants</li>
        </ul>
      </div>
    </div>
  );
}
