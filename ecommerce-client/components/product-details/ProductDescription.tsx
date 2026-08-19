"use client";

import { Product } from "@/types/product";
import { useLocale } from "next-intl";

interface ProductDescriptionProps {
  product: Product;
}

export default function ProductDescription({
  product,
}: ProductDescriptionProps) {
  const locale = useLocale()
  return (
    <section className="mt-12 rounded-xl border bg-white p-8">
      <h2 className="mb-6 text-2xl font-bold">
        {locale === "ar" ? "الوصف" : "Description"}
      </h2>

      <p className="leading-8 text-gray-600">
        {locale === "ar" ? product.descriptionAr : product.descriptionEn}
      </p>
    </section>
  );
}
