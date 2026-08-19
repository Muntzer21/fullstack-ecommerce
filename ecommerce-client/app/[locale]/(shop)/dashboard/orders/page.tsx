import { getTranslations } from "next-intl/server";

import OrdersTable from "@/components/dashboard/orders/OrdersTable";

export default async function OrdersPage() {
  const t = await getTranslations("dashboard.orders");

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{t("title")}</h1>

        <p className="mt-2 text-gray-500">{t("description")}</p>
      </div>

      <OrdersTable />
    </div>
  );
}
