"use client";

import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import { Link, useRouter } from "@/i18n/navigation";
import { useAuthStore } from "@/lib/store/auth.store";

export default function TopBar() {
  const t = useTranslations("header");

  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  function handleLogout() {
    logout();

    router.push("/login");
  }

  return (
    <div className="border-b bg-gray-50">
      <div className="mx-auto flex h-10 max-w-7xl items-center justify-end px-6 text-sm">
        <button className="mr-8 flex items-center gap-1 hover:text-blue-600">
          <LanguageSwitcher />
        </button>

        {user ? (
          <button onClick={handleLogout} className="hover:text-red-600">
            {t("logout")}
          </button>
        ) : (
          <Link href="/login" className="hover:text-blue-600">
            {t("login")}
          </Link>
        )}
      </div>
    </div>
  );
}
