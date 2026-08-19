import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("contact.hero");

  return (
    <section className="relative h-[400px]">
      <Image
        src="/images/contact/contact-banner.png"
        alt="Contact"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/55" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="mb-4 text-5xl font-bold">{t("title")}</h1>

          <p className="text-lg">{t("description")}</p>
        </div>
      </div>
    </section>
  );
}
