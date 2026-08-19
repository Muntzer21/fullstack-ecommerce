import { getTranslations } from "next-intl/server";

import CategoriesGrid from "../../../../components/Category/CategoriesGrid";
import { getCategories } from "@/services/category.service";

export default async function CategoriesPage() {
  const categories = await getCategories();
  const t = await getTranslations("categoriesPage");

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <section className="mb-12">
        <h1 className="text-5xl font-bold">{t("title")}</h1>

        <p className="mt-3 text-lg text-gray-500">{t("description")}</p>
      </section>

      <CategoriesGrid categories={categories} />
    </main>
  );
}
