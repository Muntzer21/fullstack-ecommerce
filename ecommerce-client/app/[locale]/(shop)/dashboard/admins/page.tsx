import AdminsTable from "@/components/dashboard/admins/AdminsTable";
import { useTranslations } from "next-intl";

export default function AdminsPage() {
  const t = useTranslations("dashboard.admins");

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{t("title")}</h1>

        <p className="mt-2 text-gray-500">{t("description")}</p>
      </div>

      <AdminsTable />
    </div>
  );
}
