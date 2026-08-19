"use client";

import { useTranslations } from "next-intl";

interface Props {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  const t = useTranslations("system");
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="max-w-md text-center">
          <h1 className="text-5xl font-bold text-red-600">{t("errorTitle")}</h1>

          <p className="mt-4 text-gray-600">{t("errorDescription")}</p>

          <p className="mt-2 text-sm text-gray-500">{error.message}</p>

          <button
            onClick={reset}
            className="mt-8 rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
          >
            {t("tryAgain")}
          </button>
        </div>
      </main>
    );
}
