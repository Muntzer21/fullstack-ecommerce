"use client";

import { useState } from "react";

import { Eye, EyeOff } from "lucide-react";
import { useTranslations } from "next-intl";

export default function PasswordInput() {
  const [show, setShow] = useState(false);
const t = useTranslations("auth");
  return (
    <div>
      <label className="mb-2 block font-medium">{t("password")}</label>

      <div className="relative">
        <input
          required
          type={show ? "text" : "password"}
          name="password"
          className="w-full rounded-lg border px-4 py-3 pr-12 outline-none focus:border-blue-600"
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2"
        >
          {show ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    </div>
  );
}
