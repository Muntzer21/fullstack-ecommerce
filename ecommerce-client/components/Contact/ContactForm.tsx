import { useTranslations } from "next-intl";

export default function ContactForm() {
  const t = useTranslations("contact.form");

  return (
    <div>
      <h2 className="mb-8 text-4xl font-bold">{t("title")}</h2>

      <form className="space-y-6">
        <input
          type="text"
          placeholder={t("fullName")}
          className="w-full rounded-lg border p-4"
        />

        <input
          type="email"
          placeholder={t("email")}
          className="w-full rounded-lg border p-4"
        />

        <input
          type="text"
          placeholder={t("subject")}
          className="w-full rounded-lg border p-4"
        />

        <textarea
          rows={6}
          placeholder={t("message")}
          className="w-full rounded-lg border p-4"
        />

        <button className="rounded-lg bg-blue-600 px-8 py-4 font-semibold text-white hover:bg-blue-700">
          {t("button")}
        </button>
      </form>
    </div>
  );
}
