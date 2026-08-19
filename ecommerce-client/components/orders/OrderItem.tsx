import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

interface Props {
  item: any;
}

export default function OrderItem({ item }: Props) {
    const t = useTranslations("ordersPage");
    const locale = useLocale();
  return (
    <div className="flex items-center gap-5">
      <Image
        src={item.product.imageUrl}
        alt={locale === "ar" ? item.product.nameAr : item.product.nameEn}
        width={90}
        height={90}
        className="rounded-lg object-cover"
      />

      <div className="flex-1">
        <h3 className="text-lg font-semibold">
          {locale === "ar" ? item.product.nameAr : item.product.nameEn}
        </h3>

        <p className="text-gray-500">
          {t("quantity")}: {item.quantity}
        </p>
      </div>

      <p className="font-bold">${item.price}</p>
    </div>
  );
}
