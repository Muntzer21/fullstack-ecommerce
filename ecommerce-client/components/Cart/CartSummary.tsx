"use client";

import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useCartStore } from "@/lib/store/cart.store";
import { useAuthStore } from "@/lib/store/auth.store";

export default function CartSummary() {
  const router = useRouter();

  const accessToken = useAuthStore((s) => s.accessToken);
  const items = useCartStore((s) => s.items);

  const t = useTranslations("cartPage");

  const total = items.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0,
  );

  function handleCheckout() {
    if (!accessToken) {
      router.push("/login?redirect=/checkout");
      return;
    }

    router.push("/checkout");
  }

  return (
    <div className="rounded-xl border p-8">
      <h2 className="text-3xl font-bold">{t("orderSummary")}</h2>

      <div className="mt-6 flex justify-between">
        <span>{t("total")}</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <button
        onClick={handleCheckout}
        className="mt-6 w-full rounded-lg bg-blue-600 py-3 text-white transition hover:bg-blue-700"
      >
        {t("checkout")}
      </button>
    </div>
  );
}
