import OrdersList from "@/components/orders/OrdersList";
import { getTranslations } from "next-intl/server";

export default async function OrdersPage() {
  const t = await getTranslations("ordersPage");

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-8 text-4xl font-bold">{t("title")}</h1>

      <OrdersList />
    </main>
  );
}
