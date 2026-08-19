"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { Link } from "@/i18n/navigation";
import PasswordInput from "./PasswordInput";
import { login } from "@/services/auth.service";
import { useAuthStore } from "@/lib/store/auth.store";
import { useTranslations } from "next-intl";

export default function LoginForm() {
    const t = useTranslations("auth");
  const router = useRouter();
  const searchParams = useSearchParams();

  const setAuth = useAuthStore((state) => state.login);

  const redirect = searchParams.get("redirect");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);

    const data = {
      email: form.get("email") as string,
      password: form.get("password") as string,
    };

    try {
      const result = await login(data);

      setAuth(result.user, result.accessToken);

      router.push(redirect || "/");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {redirect === "/checkout" && (
        <div className="rounded-lg bg-yellow-100 p-4 text-yellow-800">
          {t("checkoutLoginMessage")}
        </div>
      )}

      {error && (
        <div className="rounded-lg bg-red-100 p-4 text-red-600">{error}</div>
      )}

      <div>
        <label className="mb-2 block font-medium">{t("email")}</label>

        <input
          required
          type="email"
          name="email"
          className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
        />
      </div>

      <PasswordInput />

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700 disabled:opacity-60"
      >
        {loading ? t("signingIn") : t("signIn")}
      </button>

      <p className="text-center text-sm text-gray-600">
        {t("dontHaveAccount")}
        <Link
          href={
            redirect
              ? `/register?redirect=${encodeURIComponent(redirect)}`
              : "/register"
          }
          className="font-semibold text-blue-600 hover:underline"
        >
          {t("createNewAccount")}
        </Link>
      </p>
    </form>
  );
}
