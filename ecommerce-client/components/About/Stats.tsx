import { useTranslations } from "next-intl";

const stats = [
  {
    number: "10K+",
    title: "happyCustomers",
  },
  {
    number: "500+",
    title: "products",
  },
  {
    number: "99%",
    title: "customerSatisfaction",
  },
  {
    number: "24/7",
    title: "supportShort",
  },
];

export default function Stats() {
  const t = useTranslations("about");

  return (
    <section className="py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
        {stats.map((item) => (
          <div key={item.title} className="text-center">
            <h3 className="text-5xl font-bold text-blue-600">{item.number}</h3>

            <p className="mt-4 text-lg text-gray-600">{t(item.title)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
