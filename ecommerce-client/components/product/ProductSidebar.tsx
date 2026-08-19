
import { Link } from "@/i18n/navigation";
import { Category } from "@/types/category";
import {  useLocale, useTranslations } from "next-intl";




interface ProductSidebarProps {
  categories: Category[];
  selectedCategory?: number;
}

export default function ProductSidebar({
  categories,
  selectedCategory,
}: ProductSidebarProps) {
  const t = useTranslations("productsPage");
    const locale = useLocale();
  return (
    <aside className="rounded-xl border bg-white p-6">
      <h2 className="mb-6 text-xl font-semibold"> {t("categories")}</h2>

      <div className="space-y-3">
        <Link
          href="/products"
          className={`block rounded-lg px-3 py-2 transition ${
            !selectedCategory
              ? "bg-blue-600 text-white"
              : "hover:bg-blue-50 hover:text-blue-600"
          }`}
        >
          {t("allProducts")}
        </Link>

        {categories.map((category) => (
          <Link
            key={category.id}
            href={{
              pathname: "/products",
              query: {
                category: category.id,
              },
            }}
            className={`block rounded-lg px-3 py-2 transition ${
              selectedCategory === category.id
                ? "bg-blue-600 text-white"
                : "hover:bg-blue-50 hover:text-blue-600"
            }`}
          >
            {locale === "ar" ? category.nameAr : category.nameEn}
          </Link>
        ))}
      </div>
    </aside>
  );
}
