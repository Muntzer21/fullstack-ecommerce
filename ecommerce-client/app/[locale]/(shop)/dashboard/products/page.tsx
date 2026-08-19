"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

import ProductsTable from "@/components/dashboard/products/ProductTable";

export default function ProductsPage() {
  const t = useTranslations("dashboard.products");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t("title")}</h1>

        <Link
          href="/dashboard/products/create"
          className="rounded bg-blue-600 px-3 py-2 text-white"
        >
          {t("addProduct")}
        </Link>
      </div>

      <ProductsTable />
    </div>
  );
}
