"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { useRouter } from "@/i18n/navigation";

import { createCategory } from "@/services/category.service";

export default function CreateCategoryPage() {
  const t = useTranslations("dashboard.categories");

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [nameEn, setNameEn] = useState("");
  const [nameAr, setNameAr] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await createCategory({
        nameEn,
        nameAr,
      });

      router.push("/dashboard/categories");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(t("createError"));
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{t("createCategory")}</h1>

        <p className="mt-2 text-gray-500">{t("createDescription")}</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-xl border bg-white p-8 shadow-sm"
      >
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        <div>
          <label className="mb-2 block font-medium">{t("englishName")}</label>

          <input
            type="text"
            value={nameEn}
            onChange={(e) => setNameEn(e.target.value)}
            required
            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
            placeholder={t("englishPlaceholder")}
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">{t("arabicName")}</label>

          <input
            type="text"
            value={nameAr}
            onChange={(e) => setNameAr(e.target.value)}
            required
            dir="rtl"
            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
            placeholder={t("arabicPlaceholder")}
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? t("creating") : t("createCategory")}
          </button>

          <button
            type="button"
            onClick={() => router.push("/dashboard/categories")}
            className="rounded-lg border px-6 py-3 hover:bg-gray-50"
          >
            {t("cancel")}
          </button>
        </div>
      </form>
    </div>
  );
}
