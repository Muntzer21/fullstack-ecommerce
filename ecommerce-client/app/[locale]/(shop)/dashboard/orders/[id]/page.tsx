"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { getOrder } from "@/services/order.service";
import OrderDetails from "@/components/dashboard/orders/OrderDetails";
import { Order } from "@/types/order";

export default function OrderDetailsPage() {
  const t = useTranslations("dashboard.orders");

  const params = useParams();

  const id = Number(params.id);

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError("");

        const data = await getOrder(id);

        setOrder(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(t("loadError"));
        }
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  if (loading) {
    return <div>{t("loading")}</div>;
  }

  if (error || !order) {
    return (
      <div className="rounded-xl border bg-white p-8">
        <h1 className="text-2xl font-bold">{t("notFound")}</h1>

        <p className="mt-2 text-gray-500">
          {error || t("notFoundDescription")}
        </p>
      </div>
    );
  }

  return <OrderDetails order={order} />;
}
