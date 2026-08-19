"use client";
import { Link } from "@/i18n/navigation";

import { useTranslations } from "next-intl";

export default function NotFound() {
    const t = useTranslations("system");
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-blue-600">404</h1>

        <h2 className="mt-6 text-3xl font-bold">{t("notFoundTitle")}</h2>

        <p className="mt-4 text-gray-500">{t("notFoundDescription")}</p>

        <Link
          href="/"
          className="mt-8 inline-block rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          {t("backHome")}
        </Link>
      </div>
    </main>
  );
}
