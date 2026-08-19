"use client";

import { useAuthStore } from "@/lib/store/auth.store";
import { useTranslations } from "next-intl";

export default function SettingsPage() {
  const user = useAuthStore((state) => state.user);
  const t = useTranslations("dashboard.settings");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">{t("title")}</h1>

        <p className="mt-2 text-gray-500">{t("description")}</p>
      </div>

      {/* Profile */}
      <section className="rounded-xl border bg-white p-8">
        <h2 className="text-xl font-semibold">{t("profile.title")}</h2>

        <p className="mt-1 text-sm text-gray-500">{t("profile.description")}</p>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">
              {t("profile.name")}
            </label>

            <input
              type="text"
              value={user?.name ?? ""}
              disabled
              className="w-full rounded-lg border bg-gray-50 px-4 py-3 text-gray-600"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              {t("profile.email")}
            </label>

            <input
              type="email"
              value={user?.email ?? ""}
              disabled
              className="w-full rounded-lg border bg-gray-50 px-4 py-3 text-gray-600"
            />
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="rounded-xl border bg-white p-8">
        <h2 className="text-xl font-semibold">{t("security.title")}</h2>

        <p className="mt-1 text-sm text-gray-500">
          {t("security.description")}
        </p>

        <form className="mt-6 max-w-xl space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">
              {t("security.currentPassword")}
            </label>

            <input
              type="password"
              placeholder={t("security.currentPlaceholder")}
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              {t("security.newPassword")}
            </label>

            <input
              type="password"
              placeholder={t("security.newPlaceholder")}
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              {t("security.confirmPassword")}
            </label>

            <input
              type="password"
              placeholder={t("security.confirmPlaceholder")}
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
            />
          </div>

          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
          >
            {t("security.changePassword")}
          </button>
        </form>
      </section>

      {/* Store */}
      <section className="rounded-xl border bg-white p-8">
        <h2 className="text-xl font-semibold">{t("store.title")}</h2>

        <p className="mt-1 text-sm text-gray-500">{t("store.description")}</p>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">
              {t("store.name")}
            </label>

            <input
              type="text"
              value={t("store.nameValue")}
              disabled
              className="w-full rounded-lg border bg-gray-50 px-4 py-3 text-gray-600"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              {t("store.currency")}
            </label>

            <input
              type="text"
              value={t("store.currencyValue")}
              disabled
              className="w-full rounded-lg border bg-gray-50 px-4 py-3 text-gray-600"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
