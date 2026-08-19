"use client";

import { useState } from "react";
import { Search, ShoppingBag, ShoppingCart, Menu, X } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

import { useCartStore } from "@/lib/store/cart.store";
import { useAuthStore } from "@/lib/store/auth.store";

export default function Navbar() {
  const t = useTranslations("header");

  const [mobileOpen, setMobileOpen] = useState(false);

  const items = useCartStore((state) => state.items);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const user = useAuthStore((state) => state.user);

  function closeMobileMenu() {
    setMobileOpen(false);
  }

  return (
    <nav className="bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={closeMobileMenu}
        >
          <ShoppingBag size={30} className="text-blue-600" />

          <span className="text-3xl font-bold">ShopBasra</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden gap-10 text-[15px] font-medium lg:flex">
          <li>
            <Link href="/" className="text-blue-600">
              {t("home")}
            </Link>
          </li>

          <li>
            <Link href="/products">{t("products")}</Link>
          </li>

          <li>
            <Link href="/categories">{t("categories")}</Link>
          </li>

          <li>
            <Link href="/orders">{t("myOrders")}</Link>
          </li>

          <li>
            <Link href="/about">{t("about")}</Link>
          </li>

          <li>
            <Link href="/contact">{t("contact")}</Link>
          </li>

          {user?.role === "ADMIN" && (
            <li>
              <Link href="/dashboard">{t("dashboart")}</Link>
            </li>
          )}
        </ul>

        {/* Desktop / Mobile Right */}
        <div className="flex items-center gap-5">
          {/* Search */}
          <button type="button" aria-label="Search">
            <Search size={22} />
          </button>

          {/* Cart */}
          <Link href="/cart" className="relative" onClick={closeMobileMenu}>
            <ShoppingCart size={24} />

            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={27} /> : <Menu size={27} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t bg-white lg:hidden">
          <ul className="mx-auto max-w-7xl px-6 py-4">
            <li>
              <Link
                href="/"
                onClick={closeMobileMenu}
                className="block rounded-lg px-4 py-3 text-blue-600 hover:bg-gray-100"
              >
                {t("home")}
              </Link>
            </li>

            <li>
              <Link
                href="/products"
                onClick={closeMobileMenu}
                className="block rounded-lg px-4 py-3 hover:bg-gray-100"
              >
                {t("products")}
              </Link>
            </li>

            <li>
              <Link
                href="/categories"
                onClick={closeMobileMenu}
                className="block rounded-lg px-4 py-3 hover:bg-gray-100"
              >
                {t("categories")}
              </Link>
            </li>

            <li>
              <Link
                href="/orders"
                onClick={closeMobileMenu}
                className="block rounded-lg px-4 py-3 hover:bg-gray-100"
              >
                {t("myOrders")}
              </Link>
            </li>

            <li>
              <Link
                href="/about"
                onClick={closeMobileMenu}
                className="block rounded-lg px-4 py-3 hover:bg-gray-100"
              >
                {t("about")}
              </Link>
            </li>

            <li>
              <Link
                href="/contact"
                onClick={closeMobileMenu}
                className="block rounded-lg px-4 py-3 hover:bg-gray-100"
              >
                {t("contact")}
              </Link>
            </li>

            {user?.role === "ADMIN" && (
              <li>
                <Link
                  href="/dashboard"
                  onClick={closeMobileMenu}
                  className="block rounded-lg px-4 py-3 font-medium text-blue-600 hover:bg-gray-100"
                >
                  {t("dashboart")}
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
