"use client";

import { useCartStore } from "@/lib/store/cart.store";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";

export default function CartList() {
  const items = useCartStore((state) => state.items);

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="space-y-6">
      {items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  );
}
