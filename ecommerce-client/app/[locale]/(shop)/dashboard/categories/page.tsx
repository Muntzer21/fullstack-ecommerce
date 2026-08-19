"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

import { getCategories, deleteCategory } from "@/services/category.service";

import { Category } from "@/types/category";

export default function CategoriesPage() {
  const t = useTranslations("dashboard.categories");

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadCategories() {
    try {
      setLoading(true);
      setError("");

      const data = await getCategories();

      setCategories(data);
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

  useEffect(() => {
    loadCategories();
  }, []);

  async function handleDelete(id: number) {
    const confirmed = window.confirm(t("deleteConfirm"));

    if (!confirmed) return;

    try {
      await deleteCategory(id);

      setCategories((prev) => prev.filter((category) => category.id !== id));
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(t("deleteError"));
      }
    }
  }

  if (loading) {
    return <div>{t("loading")}</div>;
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t("title")}</h1>

        <Link
          href="/dashboard/categories/create"
          className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          {t("createCategory")}
        </Link>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {categories.length === 0 ? (
        <div className="rounded-xl border bg-white p-10 text-center">
          <h2 className="text-xl font-semibold">{t("emptyTitle")}</h2>

          <p className="mt-2 text-gray-500">{t("emptyDescription")}</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border bg-white">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50 text-left">
                <th className="px-6 py-4">{t("id")}</th>

                <th className="px-6 py-4">{t("englishName")}</th>

                <th className="px-6 py-4">{t("arabicName")}</th>

                <th className="px-6 py-4">{t("actions")}</th>
              </tr>
            </thead>

            <tbody>
              {categories.map((category) => (
                <tr key={category.id} className="border-b last:border-b-0">
                  <td className="px-6 py-4">{category.id}</td>

                  <td className="px-6 py-4 font-medium">{category.nameEn}</td>

                  <td className="px-6 py-4" dir="rtl">
                    {category.nameAr}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <Link
                        href={`/dashboard/categories/${category.id}`}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                      >
                        {t("edit")}
                      </Link>

                      <button
                        onClick={() => handleDelete(category.id)}
                        className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
                      >
                        {t("delete")}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
