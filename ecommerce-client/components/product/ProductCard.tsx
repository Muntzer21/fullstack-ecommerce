"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useLocale } from "next-intl";

import { useCartStore } from "@/lib/store/cart.store";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const locale = useLocale();
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="overflow-hidden rounded-xl border bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Clickable Area */}
      <Link href={`/products/${product.id}`}>
        <div className="relative h-64 w-full">
          <Image
            src={product.imageUrl}
            alt={locale === "ar" ? product.nameAr : product.nameEn}
            fill
            sizes="(max-width:768px) 50vw, (max-width:1024px) 33vw, 25vw"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        </div>

        <div className="space-y-3 p-4">
          {/* Category */}
          <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">
            {locale === "ar"
              ? product.category.nameAr
              : product.category.nameEn}
          </span>

          {/* Name */}
          <h3 className="line-clamp-2 text-lg font-semibold">
            {locale === "ar" ? product.nameAr : product.nameEn}
          </h3>

          {/* Rating */}
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

          {/* Price */}
          <p className="text-2xl font-bold text-gray-900">${product.price}</p>
        </div>
      </Link>

      {/* Actions */}
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
          className="flex items-center justify-center rounded-lg border px-4 transition hover:bg-red-500 hover:text-white"
        >
          <Heart size={20} />
        </button>
      </div>
    </div>
  );
}
