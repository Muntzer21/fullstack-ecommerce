import { Truck, ShieldCheck, Headphones, BadgeCheck } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Features() {
  const t = useTranslations("about.features");

  const features = [
    {
      icon: Truck,
      title: "fastShipping.title",
      desc: "fastShipping.description",
    },
    {
      icon: ShieldCheck,
      title: "securePayment.title",
      desc: "securePayment.description",
    },
    {
      icon: BadgeCheck,
      title: "qualityProducts.title",
      desc: "qualityProducts.description",
    },
    {
      icon: Headphones,
      title: "support.title",
      desc: "support.description",
    },
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-12 text-center text-4xl font-bold">{t("title")}</h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((item) => (
            <div
              key={item.title}
              className="rounded-xl bg-white p-8 text-center shadow-sm"
            >
              <item.icon size={42} className="mx-auto mb-5 text-blue-600" />

              <h3 className="mb-3 text-xl font-semibold">{t(item.title)}</h3>

              <p className="text-gray-600">{t(item.desc)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
