"use client";

import { useTranslations } from "next-intl";
import DashboardCard from "@/components/dashboard/DashboardCard";

export default function DashboardPage() {
  const t = useTranslations("dashboard");

  return (
    <>
      <h1 className="mb-8 text-4xl font-bold">{t("title")}</h1>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard title={t("dashboardCards.products")} value="120" />

        <DashboardCard title={t("dashboardCards.categories")} value="12" />

        <DashboardCard title={t("dashboardCards.orders")} value="35" />

        <DashboardCard title={t("dashboardCards.reviews")} value="290" />
      </div>
    </>
  );
}
