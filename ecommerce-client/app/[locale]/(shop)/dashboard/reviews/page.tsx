import ReviewsTable from "@/components/dashboard/reviews/ReviewsTable";
import { useTranslations } from "next-intl";

export default function ReviewsPage() {
  const t = useTranslations("dashboard.reviews");

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{t("title")}</h1>

        <p className="mt-2 text-gray-500">{t("description")}</p>
      </div>

      <ReviewsTable />
    </div>
  );
}
