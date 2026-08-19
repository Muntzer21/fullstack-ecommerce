import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Category } from "@/types/category";

interface CategoriesProps {
  categories: Category[];
}

export default function Categories({ categories }: CategoriesProps) {
  const t = useTranslations("categories");
  const locale = useLocale();
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-bold">{t("title")}</h2>

        <Link
          href="/categories"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          {t("viewAll")}
        </Link>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/products?category=${category.id}`}
            className="group rounded-xl border bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative mx-auto h-28 w-28">
              <Image
                src={category.image}
                alt={category.nameEn}
                fill
                sizes="(max-width: 640px) 50vw,
         (max-width: 768px) 33vw,
         (max-width: 1024px) 25vw,
         (max-width: 1280px) 20vw,
         16vw"
                className="object-contain transition duration-300 group-hover:scale-110"
              />
            </div>

            <h3 className="mt-5 text-center font-semibold">
              {locale === "ar" ? category.nameAr : category.nameEn}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
