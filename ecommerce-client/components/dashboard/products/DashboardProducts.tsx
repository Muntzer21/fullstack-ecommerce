"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

import ProductTable from "./ProductTable";

export default function DashboardProducts() {
  const t = useTranslations("dashboard.products");

  return (
    <section>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">{t("title")}</h1>

          <p className="mt-2 text-gray-500">{t("description")}</p>
        </div>

        <Link
          href="/dashboard/products/create"
          className="rounded-lg bg-blue-600 px-5 py-3 text-white"
        >
          + {t("addProduct")}
        </Link>
      </div>

      <ProductTable />
    </section>
  );
}
