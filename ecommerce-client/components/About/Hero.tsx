import Image from "next/image";
import { useTranslations } from "next-intl";
export default function Hero() {
  const t = useTranslations("about");
  return (
    <section className="relative h-[420px] w-full">
      <Image
        src="/images/about/about-banner.png"
        alt="About ShopEase"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/55" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="mb-5 text-5xl font-bold">{t("heroTitle")}</h1>

          <p className="mx-auto max-w-2xl text-lg">{t("heroDescription")}</p>
        </div>
      </div>
    </section>
  );
}
