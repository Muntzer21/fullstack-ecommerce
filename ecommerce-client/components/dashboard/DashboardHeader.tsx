"use client";

import { useTranslations } from "next-intl";

export default function DashboardHeader() {
  const t = useTranslations("dashboard.header");

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-8">
        <h2 className="text-2xl font-bold">{t("title")}</h2>

        <div className="flex items-center gap-4">
          <span className="text-gray-600">{t("administrator")}</span>
        </div>
      </div>
    </header>
  );
}
