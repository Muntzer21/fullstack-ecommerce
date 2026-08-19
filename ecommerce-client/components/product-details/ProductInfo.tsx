"use client";

import { Product } from "@/types/product";
import { useLocale } from "next-intl";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const locale = useLocale();

  return (
    <div className="space-y-6">
      <span className="rounded bg-blue-100 px-3 py-1 text-sm font-medium text-blue-600">
        {locale === "ar" ? product.category.nameAr : product.category.nameEn}
      </span>

      <h1 className="text-4xl font-bold">
        {locale === "ar" ? product.nameAr : product.nameEn}
      </h1>

      <p className="text-4xl font-bold text-blue-600">${product.price}</p>

      <p>
        <span className="font-semibold">Stock:</span> {product.stock}
      </p>
    </div>
  );
}
