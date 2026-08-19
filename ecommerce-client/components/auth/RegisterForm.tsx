"use client";

import { useState } from "react";
import { Link, useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";

import { register } from "@/services/auth.service";
import PasswordInput from "./PasswordInput";
import { useTranslations } from "next-intl";

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const searchParams = useSearchParams();

  const redirect = searchParams.get("redirect");
const t = useTranslations("auth");
  const isCheckoutRedirect = redirect === "/checkout";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);

    const data = {
      name: form.get("name") as string,
      email: form.get("email") as string,
      password: form.get("password") as string,
    };

    if (data.password.length < 8) {
     setError(t("passwordTooShort"));
      setLoading(false);
      return;
    }

   try {
     console.log("1️⃣ Register started");

     const result = await register(data);

     console.log("2️⃣ Register success:", result);

     const url = `/verify-email?email=${encodeURIComponent(data.email)}`;

     console.log("3️⃣ Navigating to:", url);

     router.push(url);

     console.log("4️⃣ router.push called");
   } catch (err) {
     console.error("❌ REGISTER ERROR:", err);

     if (err instanceof Error) {
       setError(err.message);
     } else {
       setError(t("somethingWentWrong"));
     }
   } finally {
     setLoading(false);
   }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label className="mb-2 block font-medium">{t("name")}</label>

        <input
          required
          name="name"
          className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
        />
      </div>

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

      {isCheckoutRedirect && (
        <div className="rounded-lg bg-yellow-100 p-4 text-yellow-800">
          {t("checkoutRegisterMessage")}
        </div>
      )}

      {error.toLowerCase().includes("already") && (
        <p className="mt-3 text-sm text-gray-700">
          {t("alreadyHaveAccount")}
          <Link
            href="/login"
            className="font-semibold text-blue-600 hover:underline"
          >
            {t("signIn")}
          </Link>
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700 disabled:opacity-60"
      >
        {loading ? t("creatingAccount") : t("createAccount")}
      </button>
    </form>
  );
}
