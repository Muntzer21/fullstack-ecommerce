"use client";

import { useTranslations } from "next-intl";

import { Order } from "@/types/order";

import OrderItem from "./OrderItem";
import OrderSummary from "./OrderSummary";

interface Props {
  order: Order;
}

export default function OrderDetails({ order }: Props) {
  const t = useTranslations("ordersPage");

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <section className="space-y-6">
        <div className="rounded-xl border p-6">
          <h1 className="text-3xl font-bold">
            {t("order")} #{order.id}
          </h1>

          <p className="mt-2 text-gray-500">
            {new Date(order.createdAt).toLocaleDateString()}
          </p>

          <span className="mt-4 inline-block rounded-full bg-yellow-100 px-4 py-1">
            {order.status}
          </span>
        </div>

        <div className="rounded-xl border p-6">
          <h2 className="mb-6 text-2xl font-semibold">{t("products")}</h2>

          <div className="space-y-5">
            {order.items.map((item) => (
              <OrderItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      <OrderSummary order={order} />
    </div>
  );
}
