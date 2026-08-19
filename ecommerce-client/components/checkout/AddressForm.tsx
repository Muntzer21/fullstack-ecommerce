"use client";

import { useTranslations } from "next-intl";

export default function AddressForm() {
  const t = useTranslations("checkoutPage");

  return (
    <section className="rounded-xl border p-6">
      <h2 className="mb-6 text-2xl font-semibold">{t("deliveryAddress")}</h2>

      <div className="grid gap-4">
        <input
          placeholder={t("governorate")}
          className="rounded-lg border p-3"
        />

        <input placeholder={t("city")} className="rounded-lg border p-3" />

        <input placeholder={t("street")} className="rounded-lg border p-3" />

        <textarea
          placeholder={t("landmark")}
          className="rounded-lg border p-3"
          rows={4}
        />
      </div>
    </section>
  );
}
