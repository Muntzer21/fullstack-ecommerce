"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { useCartStore } from "@/lib/store/cart.store";
import { Product } from "@/types/product";

interface FeaturedProductsProps {
  products: Product[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  const t = useTranslations("featuredProducts");
  const locale = useLocale();

  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-bold">{t("title")}</h2>

        <Link
          href="/products"
          className="font-medium text-blue-600 hover:underline"
        >
          {t("viewAll")}
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="overflow-hidden rounded-xl border bg-white transition hover:-translate-y-1 hover:shadow-xl"
          >
            <Link href={`/products/${product.id}`}>
              <div className="relative h-64 w-full">
                <Image
                  src={product.imageUrl}
                  alt={locale === "ar" ? product.nameAr : product.nameEn}
                  fill
                  sizes="300px"
                  className="object-cover"
                />
              </div>

              <div className="space-y-3 p-4">
                <span className="text-xs font-semibold text-blue-600">
                  {locale === "ar"
                    ? product.category.nameAr
                    : product.category.nameEn}
                </span>

                <h3 className="line-clamp-2 text-lg font-semibold">
                  {locale === "ar" ? product.nameAr : product.nameEn}
                </h3>

                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4].map((i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}

                  <Star size={16} className="text-gray-300" />

                  <span className="ml-1 text-sm text-gray-500">(128)</span>
                </div>

                <p className="text-2xl font-bold">${product.price}</p>
              </div>
            </Link>

            <div className="flex gap-3 p-4 pt-0">
              <button
                type="button"
                onClick={() => addToCart(product)}
                className="flex flex-1 items-center justify-center rounded-lg border py-2 transition hover:bg-blue-600 hover:text-white"
              >
                <ShoppingCart size={20} />
              </button>

              <button
                type="button"
                className="rounded-lg border px-4 transition hover:bg-red-500 hover:text-white"
              >
                <Heart size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
