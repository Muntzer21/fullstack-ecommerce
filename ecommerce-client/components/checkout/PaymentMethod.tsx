"use client";

import { useTranslations } from "next-intl";

export default function PaymentMethod() {
  const t = useTranslations("checkoutPage");

  return (
    <section className="rounded-xl border p-6">
      <h2 className="mb-6 text-2xl font-semibold">{t("paymentMethod")}</h2>

      <label className="flex items-center gap-3 rounded-lg border p-4">
        <input type="radio" checked readOnly />

        <div>
          <p className="font-semibold">{t("cashOnDelivery")}</p>

          <p className="text-sm text-gray-500">{t("cashDescription")}</p>
        </div>
      </label>
    </section>
  );
}
