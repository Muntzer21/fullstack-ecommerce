"use client";

import { Product } from "@/types/product";
import ProductCard from "../product/ProductCard";
import { useLocale } from "next-intl";

interface RelatedProductsProps {
  products: Product[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
    const locale = useLocale();
  return (
    <section className="mt-12">
      <h2 className="mb-8 text-3xl font-bold">
    
        {locale === "ar" ? "منتجات ذو صلة" : "Products Related"}
      </h2>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
