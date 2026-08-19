"use client";

import { ReactNode, useEffect, useState } from "react";

import { useRouter } from "@/i18n/navigation";
import { useAuthStore } from "@/lib/store/auth.store";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

type Props = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    if (user.role !== "ADMIN") {
      router.replace("/");
    }
  }, [hydrated, user, router]);

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!user || user.role !== "ADMIN") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardHeader />

      <div className="mx-auto flex max-w-7xl">
        <DashboardSidebar />

        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
