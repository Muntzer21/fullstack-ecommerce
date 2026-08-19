"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getOrder } from "@/services/order.service";
import OrderDetails from "@/components/orders/OrderDetails";
import { Order } from "@/types/order";

export default function OrderDetailsPage() {
  const params = useParams();

  const id = Number(params.id);

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    async function loadOrder() {
      try {
        setLoading(true);
        setError("");

        const data = await getOrder(id);

        setOrder(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to load order.");
        }
      } finally {
        setLoading(false);
      }
    }

    loadOrder();
  }, [id]);

  if (loading) {
    return <div className="mx-auto max-w-7xl px-6 py-12">Loading order...</div>;
  }

  if (error || !order) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="text-2xl font-bold">Order Not Found</h1>

        <p className="mt-2 text-gray-500">
          {error || "This order does not exist."}
        </p>
      </div>
    );
  }

  return <OrderDetails order={order} />;
}
