"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

interface Props {
  order: any;
}

export default function OrderCard({ order }: Props) {
    const t = useTranslations("ordersPage");
  return (
    <div className="rounded-xl border p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">
            {t("order")} #{order.id}
          </h2>

          <p className="text-gray-500">
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>

        <span className="rounded-full bg-yellow-100 px-3 py-1">
          {order.status}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-lg font-bold">
          ${Number(order.totalPrice).toFixed(2)}
        </p>

        <Link
          href={`/orders/${order.id}`}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          {t("viewDetails")}
        </Link>
      </div>
    </div>
  );
}
