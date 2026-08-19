import Image from "next/image";
import { useTranslations } from "next-intl";
export default function Story() {
  const t = useTranslations("about");
  return (
    <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 py-24 lg:grid-cols-2">
      <div>
        <h2 className="mb-6 text-4xl font-bold">{t("storyTitle")}</h2>

        <p className="mb-5 leading-8 text-gray-600">{t("storyParagraph1")}</p>

        <p className="leading-8 text-gray-600">{t("storyParagraph2")}</p>
      </div>

      <div className="relative h-[500px]">
        <Image
          src="/images/about/story.png"
          alt="Our Story"
          fill
          className="rounded-2xl object-cover"
        />
      </div>
    </section>
  );
}
