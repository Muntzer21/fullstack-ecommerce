"use client";

import { Product } from "@/types/product";
import { useCartStore } from "@/lib/store/cart.store";

interface ProductActionsProps {
  product: Product;
}

export default function ProductActions({ product }: ProductActionsProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  console.log(product);
  


  return (
    <button
      type="button"
      onClick={() => addToCart(product)}
      className="flex flex-1 items-center justify-center rounded-lg border py-2 transition hover:bg-blue-600 hover:text-white"
    >
      Add to Cart
    </button>
  );
}
