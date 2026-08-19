import Image from "next/image";
import { Link } from "@/i18n/navigation";

import { Category } from "@/types/category";
import { useLocale } from "next-intl";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
    const locale = useLocale();
  return (
    <Link
      href={{
        pathname: "/products",
        query: {
          category: category.id,
        },
      }}
      className="group overflow-hidden rounded-2xl border bg-white transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative h-64 w-full">
        <Image
          src={category.image}
          alt={category.nameEn}
          fill
          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 25vw"
          className="object-contain p-6 transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-5">
        <h3 className="text-center text-xl font-semibold">
          {" "}
          {locale === "ar" ? category.nameAr : category.nameEn}
        </h3>
      </div>
    </Link>
  );
}
