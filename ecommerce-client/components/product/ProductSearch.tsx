"use client";

import { Search } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ProductSearch() {
     const t = useTranslations("productsPage");
  return (
    <div className="mb-10">
      <div className="relative">
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder={t("search")}
          className="h-12 w-full rounded-xl border border-gray-300 pl-12 pr-4 outline-none transition focus:border-blue-500"
        />
      </div>
    </div>
  );
}
