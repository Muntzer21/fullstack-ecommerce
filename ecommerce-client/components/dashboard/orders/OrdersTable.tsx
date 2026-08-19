"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

import { getAllOrders, updateOrderStatus } from "@/services/order.service";

import { Order } from "@/types/order";

const statuses = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];

export default function OrdersTable() {
  const t = useTranslations("dashboard.orders");

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);

  useEffect(() => {
    let cancelled = false;

    async function loadOrders() {
      try {
        const data = await getAllOrders(page, 10);

        if (cancelled) return;

        if (Array.isArray(data)) {
          setOrders(data);
        } else if (Array.isArray(data.orders)) {
          setOrders(data.orders);
        } else if (Array.isArray(data.data)) {
          setOrders(data.data);
        } else if (Array.isArray(data.items)) {
          setOrders(data.items);
        } else {
          setOrders([]);
          setError(t("invalidResponse"));
        }
      } catch (err) {
        if (cancelled) return;

        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(t("loadError"));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadOrders();

    return () => {
      cancelled = true;
    };
  }, [page, t]);

  async function changeStatus(id: number, status: string) {
    try {
      await updateOrderStatus(id, status);

      setOrders((prev) =>
        prev.map((order) => (order.id === id ? { ...order, status } : order)),
      );
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(t("loadError"));
      }
    }
  }

  if (loading) {
    return <div className="rounded-xl border bg-white p-8">{t("loading")}</div>;
  }

  return (
    <div>
      {error && (
        <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      <div className="overflow-hidden rounded-xl border bg-white">
        <table className="w-full">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left">{t("order")}</th>

              <th className="px-6 py-4 text-left">{t("customer")}</th>

              <th className="px-6 py-4 text-left">{t("date")}</th>

              <th className="px-6 py-4 text-left">{t("total")}</th>

              <th className="px-6 py-4 text-left">{t("status")}</th>

              <th className="px-6 py-4 text-left">{t("action")}</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b last:border-0">
                <td className="px-6 py-5 font-semibold">#{order.id}</td>

                <td className="px-6 py-5">
                  <div>
                    <p className="font-medium">{order.user?.name}</p>

                    <p className="text-sm text-gray-500">{order.user?.email}</p>
                  </div>
                </td>

                <td className="px-6 py-5 text-gray-600">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

                <td className="px-6 py-5 font-semibold">
                  ${Number(order.totalPrice).toFixed(2)}
                </td>

                <td className="px-6 py-5">
                  <select
                    value={order.status}
                    onChange={(e) => changeStatus(order.id, e.target.value)}
                    className="rounded-lg border px-3 py-2"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {t(status.toLowerCase())}
                      </option>
                    ))}
                  </select>
                </td>

                <td className="px-6 py-5">
                  <Link
                    href={`/dashboard/orders/${order.id}`}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                  >
                    {t("view")}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!orders.length && (
          <div className="p-10 text-center text-gray-500">{t("noOrders")}</div>
        )}
      </div>

      <div className="mt-5 flex justify-end gap-3">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="rounded-lg border px-4 py-2 disabled:opacity-40"
        >
          {t("previous")}
        </button>

        <span className="flex items-center px-3">
          {t("page")} {page}
        </span>

        <button
          disabled={orders.length < 10}
          onClick={() => setPage((p) => p + 1)}
          className="rounded-lg border px-4 py-2 disabled:opacity-40"
        >
          {t("next")}
        </button>
      </div>
    </div>
  );
}
