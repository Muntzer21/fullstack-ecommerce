"use client";

import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

import { useCartStore } from "@/lib/store/cart.store";
import { createOrder } from "@/services/order.service";

export default function OrderSummary() {
  const t = useTranslations("checkoutPage");
  const router = useRouter();

  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);

  const total = items.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0,
  );

  async function handlePlaceOrder() {
    try {
      const orderItems = items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      }));

      const order = await createOrder(orderItems);

      clearCart();

      router.push(`/orders/${order.id}`);
    } catch (err) {
      console.error(err);

      alert(err instanceof Error ? err.message : "Failed to place order.");
    }
  }

  return (
    <section className="rounded-xl border p-6">
      <h2 className="mb-6 text-2xl font-bold">{t("orderSummary")}</h2>

      <div className="flex justify-between">
        <span>{t("total")}</span>

        <span>${total.toFixed(2)}</span>
      </div>

      <button
        onClick={handlePlaceOrder}
        className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700"
      >
        {t("placeOrder")}
      </button>
    </section>
  );
}
