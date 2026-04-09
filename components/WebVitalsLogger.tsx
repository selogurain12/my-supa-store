"use client";

import { useEffect } from "react";
import {
  getCLS,
  getFID,
  getLCP,
  getFCP,
  getTTFB,
  getINP,
  Metric,
} from "web-vitals";

type WebVitalMetric = Metric & {
  delta?: number;
  rating?: string;
  entries?: PerformanceEntry[];
};

function sendToServer(metric: Metric) {
  const m = metric as WebVitalMetric;
  const body = {
    name: m.name,
    value: m.value,
    delta: m.delta ?? null,
    id: m.id,
    rating: m.rating ?? null,
    entries: m.entries ?? null,
  };

  // Prefer sendBeacon when available so logging doesn't block unload
  try {
    if (typeof navigator !== "undefined" && "sendBeacon" in navigator) {
      navigator.sendBeacon("/api/observability", JSON.stringify(body));
      return;
    }
  } catch (error) {
    console.error("[observability] error", error);
  }

  fetch("/api/observability", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    keepalive: true,
  }).catch(() => {});
}

export default function WebVitalsLogger() {
  useEffect(() => {
    getCLS(sendToServer);
    getFID(sendToServer);
    getLCP(sendToServer);
    getFCP(sendToServer);
    getTTFB(sendToServer);
    if (typeof getINP === "function") getINP(sendToServer);
  }, []);

  return null;
}
