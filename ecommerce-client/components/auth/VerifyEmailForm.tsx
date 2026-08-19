"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { verifyEmail } from "@/services/auth.service";
import { useAuthStore } from "@/lib/store/auth.store";
import { useTranslations } from "next-intl";

export default function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

    const email = searchParams.get("email") ?? "";

    const t = useTranslations("auth");

  const login = useAuthStore((state) => state.login);

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await verifyEmail({
        email,
        code,
      });

      login(data.user, data.accessToken);

      router.push("/");
    } catch (error) {
      console.error(error);
     alert(t("invalidVerificationCode"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="mb-2 block font-medium">{t("email")}</label>

        <input
          value={email}
          disabled
          className="w-full rounded-lg border bg-gray-100 px-4 py-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          {t("verificationCode")}
        </label>

        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={t("verificationPlaceholder")}
          maxLength={6}
          required
          className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-60"
      >
        {loading ? t("verifying") : t("verifyEmail")}
      </button>
    </form>
  );
}
