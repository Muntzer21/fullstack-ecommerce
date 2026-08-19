import { useTranslations } from "next-intl";

interface Props {
  order: any;
}

export default function OrderSummary({ order }: Props) {
  const t = useTranslations("ordersPage");
    return (
      <aside className="rounded-xl border p-6">
        <h2 className="mb-6 text-2xl font-bold">{t("orderSummary")}</h2>

        <div className="mb-3 flex justify-between">
          <span>{t("status")}</span>

          <span>{order.status}</span>
        </div>

        <div className="mb-3 flex justify-between">
          <span>{t("items")}</span>

          <span>{order.items.length}</span>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between text-xl font-bold">
            <span>{t("total")}</span>

            <span>${Number(order.totalPrice).toFixed(2)}</span>
          </div>
        </div>
      </aside>
    );
}
