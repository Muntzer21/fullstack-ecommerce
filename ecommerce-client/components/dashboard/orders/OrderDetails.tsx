"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

import { Order } from "@/types/order";

interface Props {
  order: Order;
}

export default function OrderDetails({ order }: Props) {
  const t = useTranslations("dashboard.orders.details");

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {t("title")} #{order.id}
          </h1>

          <p className="mt-2 text-gray-500">
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>

        <Link href="/dashboard/orders" className="rounded-lg border px-4 py-2">
          {t("back")}
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Customer */}
        <section className="rounded-xl border bg-white p-6">
          <h2 className="mb-5 text-xl font-semibold">{t("customer")}</h2>

          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">{t("name")}</p>

              <p className="font-medium">{order.user?.name}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">{t("email")}</p>

              <p className="font-medium">{order.user?.email}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">{t("orderStatus")}</p>

              <span className="mt-1 inline-block rounded-full bg-yellow-100 px-3 py-1 text-sm">
                {order.status}
              </span>
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="rounded-xl border bg-white p-6">
          <h2 className="mb-5 text-xl font-semibold">{t("summary")}</h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span>{t("items")}</span>

              <span>{order.items.length}</span>
            </div>

            <div className="flex justify-between border-t pt-4 text-xl font-bold">
              <span>{t("total")}</span>

              <span>${Number(order.totalPrice).toFixed(2)}</span>
            </div>
          </div>
        </section>
      </div>

      {/* Products */}
      <section className="mt-6 rounded-xl border bg-white p-6">
        <h2 className="mb-6 text-xl font-semibold">{t("products")}</h2>

        <div className="divide-y">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center gap-5 py-5">
              {item.product?.imageUrl && (
                <img
                  src={item.product.imageUrl}
                  alt={item.product.nameEn}
                  className="h-20 w-20 rounded-lg object-cover"
                />
              )}

              <div className="flex-1">
                <h3 className="font-semibold">{item.product?.nameEn}</h3>

                <p className="mt-1 text-sm text-gray-500">
                  {t("quantity")}: {item.quantity}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  {t("price")}: ${Number(item.price).toFixed(2)}
                </p>
              </div>

              <p className="font-bold">
                ${(Number(item.price) * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
