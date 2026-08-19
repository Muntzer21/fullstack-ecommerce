"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/lib/store/cart.store";
import { Product } from "@/types/product";
import { useLocale, useTranslations } from "next-intl";

interface CartItemType extends Product {
  quantity: number;
}

interface CartItemProps {
  item: CartItemType;
}
export default function CartItem({ item }: CartItemProps) {
  const increase = useCartStore((s) => s.increase);
  const decrease = useCartStore((s) => s.decrease);
    const remove = useCartStore((s) => s.removeFromCart);
    const t = useTranslations("cartPage");
    const locale = useLocale();

  return (
    <div className="flex items-center gap-6 rounded-xl border p-4">
      <Image src={item.imageUrl} alt={item.nameEn} width={100} height={100} />

      <div className="flex-1">
        <h3 className="text-xl font-semibold">
          {locale === "ar" ? item.nameAr : item.nameEn}
        </h3>

        <p>
          {t("price")}: ${item.price}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={() => decrease(item.id)}>
          <Minus />
        </button>

        <span>{item.quantity}</span>

        <button onClick={() => increase(item.id)}>
          <Plus />
        </button>
      </div>

      <button onClick={() => remove(item.id)}>
        <Trash2 />
      </button>
    </div>
  );
}
