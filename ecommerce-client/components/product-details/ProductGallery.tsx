"use client";

import { Product } from "@/types/product";
import Image from "next/image";

interface ProductGalleryProps {
  product: Product;
}

export default function ProductGallery({ product }: ProductGalleryProps) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-white">
      <div className="relative aspect-square w-full">
        <Image
          src={product.imageUrl}
          alt={product.nameAr}
          fill
          sizes="(max-width:1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}
