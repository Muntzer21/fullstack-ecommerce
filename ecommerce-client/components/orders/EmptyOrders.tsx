import { Package } from "lucide-react";
import { useTranslations } from "next-intl";

export default function EmptyOrders() {
    const t = useTranslations("ordersPage");
  return (
    <div className="py-20 text-center">
      <Package size={70} className="mx-auto text-gray-400" />

      <h2 className="mt-6 text-3xl font-bold">{t("emptyTitle")}</h2>

      <p className="mt-3 text-gray-500">{t("emptyDescription")}</p>
    </div>
  );
}
