"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslation } from "@/i18n";

const POLL_INTERVAL_MS = 2000;
const LONG_WAIT_THRESHOLD_MS = 30000;

const ServerWakeGate = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation();
  const [isReady, setIsReady] = useState(false);
  const [isLongWait, setIsLongWait] = useState(false);
  const startedAt = useRef<number>(Date.now());

  useEffect(() => {
    // Strip any trailing slash so `${baseUrl}/health` never becomes `//health`
    // (a double slash 404s on Render). RTK Query normalizes this internally;
    // our hand-built URL must do it explicitly.
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "");

    // No API URL configured (e.g. local without env) — don't block the UI.
    if (!baseUrl) {
      setIsReady(true);
      return;
    }

    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const check = async () => {
      try {
        const res = await fetch(`${baseUrl}/health`, { cache: "no-store" });
        if (!cancelled && res.ok) {
          setIsReady(true);
          return;
        }
      } catch {
        // server still asleep / unreachable — keep retrying
      }

      if (cancelled) return;

      if (Date.now() - startedAt.current >= LONG_WAIT_THRESHOLD_MS) {
        setIsLongWait(true);
      }

      timeoutId = setTimeout(check, POLL_INTERVAL_MS);
    };

    check();

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, []);

  if (isReady) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-gray-50 px-6 text-center">
      <Image
        src="/assets/logo.png"
        alt="Stockify"
        width={64}
        height={64}
        priority
      />
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
      <p className="max-w-sm text-sm text-gray-600">
        {isLongWait ? t("common.wakingUpLong") : t("common.wakingUp")}
      </p>
    </div>
  );
};

export default ServerWakeGate;
