"use client";

import { useTranslations } from "next-intl";

export default function CustomerForm() {
  const t = useTranslations("checkoutPage");

  return (
    <section className="rounded-xl border p-6">
      <h2 className="mb-6 text-2xl font-semibold">{t("customerInfo")}</h2>

      <div className="grid gap-4">
        <input placeholder={t("fullName")} className="rounded-lg border p-3" />

        <input placeholder={t("phone")} className="rounded-lg border p-3" />
      </div>
    </section>
  );
}
