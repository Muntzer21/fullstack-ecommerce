"use client";

import { routing } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("header");

  const router = useRouter();
  const pathname = usePathname();

  function changeLocale(newLocale: string) {
    const segments = pathname.split("/");

    if (routing.locales.includes(segments[1] as "en" | "ar")) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }

    router.push(segments.join("/"));
  }

  return (
    <select
      value={locale}
      onChange={(e) => changeLocale(e.target.value)}
      className="bg-transparent outline-none cursor-pointer"
    >
      <option value="en">{t("english")}</option>
      <option value="ar">{t("arabic")}</option>
    </select>
  );
}
