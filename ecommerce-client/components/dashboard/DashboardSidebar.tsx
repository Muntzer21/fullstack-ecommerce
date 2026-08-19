"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

import {
  LayoutDashboard,
  Package,
  Folder,
  ShoppingCart,
  Star,
  Settings,
  ShieldCheck,
} from "lucide-react";

const links = [
  {
    href: "/dashboard",
    key: "dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/dashboard/products",
    key: "products",
    icon: Package,
  },
  {
    href: "/dashboard/categories",
    key: "categories",
    icon: Folder,
  },
  {
    href: "/dashboard/orders",
    key: "orders",
    icon: ShoppingCart,
  },
  {
    href: "/dashboard/reviews",
    key: "reviews",
    icon: Star,
  },
  {
    href: "/dashboard/admins",
    key: "admins",
    icon: ShieldCheck,
  },
  {
    href: "/dashboard/settings",
    key: "settings",
    icon: Settings,
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const t = useTranslations("dashboard.sidebar");

  return (
    <aside className="w-64 border-r bg-white">
      <nav className="flex flex-col p-6">
        {links.map((link) => {
          const Icon = link.icon;

          const active =
            pathname === link.href || pathname.startsWith(`${link.href}/`);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`mb-2 flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                active ? "bg-blue-600 text-white" : "hover:bg-gray-100"
              }`}
            >
              <Icon size={20} />
              {t(link.key)}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
