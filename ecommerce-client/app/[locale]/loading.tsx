"use client";

import { useTranslations } from "next-intl";

export default function Loading() {
    const t = useTranslations("system");
  return (
    <main className="flex min-h-[70vh] items-center justify-center">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />

        <p className="mt-6 text-lg text-gray-500">{t("loading")}</p>
      </div>
    </main>
  );
}
