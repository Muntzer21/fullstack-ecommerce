import { ShoppingCart } from "lucide-react";
import { useTranslations } from "next-intl";

export default function EmptyCart() {
    const t = useTranslations("cartPage");
  return (
    <div className="flex h-72 flex-col items-center justify-center rounded-xl border">
      <ShoppingCart size={60} className="text-gray-400" />

      <h2 className="mt-4 text-2xl font-bold">{t("empty")}</h2>
    </div>
  );
}
