"use client";

import { useEffect, useState } from "react";

import { AdminUser, getUsers, updateUserRole } from "@/services/user.service";
import { useTranslations } from "next-intl";

export default function AdminsTable() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const t = useTranslations("dashboard.admins");

  useEffect(() => {
    let cancelled = false;

    getUsers()
      .then((data) => {
        if (!cancelled) {
          setUsers(data);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load users");
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  async function changeRole(user: AdminUser, role: "USER" | "ADMIN") {
    try {
      await updateUserRole(user.id, role);

      setUsers((prev) =>
        prev.map((item) => (item.id === user.id ? { ...item, role } : item)),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update role");
    }
  }

  if (loading) {
    return <div className="rounded-xl border bg-white p-8">{t("loading")}</div>;
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left">{t("id")}</th>

              <th className="px-6 py-4 text-left">{t("name")}</th>

              <th className="px-6 py-4 text-left">{t("email")}</th>

              <th className="px-6 py-4 text-left">{t("role")}</th>

              <th className="px-6 py-4 text-left">{t("action")}</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b last:border-0">
                <td className="px-6 py-5">{user.id}</td>

                <td className="px-6 py-5 font-medium">{user.name}</td>

                <td className="px-6 py-5 text-gray-600">{user.email}</td>

                <td className="px-6 py-5">
                  <span
                    className={
                      user.role === "ADMIN"
                        ? "rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700"
                        : "rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                    }
                  >
                    {user.role === "ADMIN" ? t("admin") : t("user")}
                  </span>
                </td>

                <td className="px-6 py-5">
                  {user.role === "USER" ? (
                    <button
                      onClick={() => changeRole(user, "ADMIN")}
                      className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                      {t("makeAdmin")}
                    </button>
                  ) : (
                    <button
                      onClick={() => changeRole(user, "USER")}
                      className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                    >
                      {t("removeAdmin")}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
