"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import { deleteReview, getAllReviews, Review } from "@/services/review.service";

export default function ReviewsTable() {
  const t = useTranslations("dashboardReviews");
  const locale = useLocale();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    getAllReviews()
      .then((data) => {
        if (cancelled) return;

        setReviews(data);
      })
      .catch((err) => {
        if (cancelled) return;

        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(t("loadError"));
        }
      })
      .finally(() => {
        if (cancelled) return;

        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [t]);

  async function loadReviews() {
    try {
      setLoading(true);
      setError("");

      const data = await getAllReviews();

      setReviews(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(t("loadError"));
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    const confirmed = window.confirm(t("deleteConfirm"));

    if (!confirmed) return;

    try {
      await deleteReview(id);

      setReviews((prev) => prev.filter((review) => review.id !== id));
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(t("deleteError"));
      }
    }
  }

  if (loading) {
    return <div className="rounded-xl border bg-white p-8">{t("loading")}</div>;
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <p className="text-red-600">{error}</p>

        <button
          onClick={loadReviews}
          className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          {t("retry")}
        </button>
      </div>
    );
  }

  if (!reviews.length) {
    return (
      <div className="rounded-xl border bg-white p-8 text-gray-500">
        {t("empty")}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left">{t("customer")}</th>

              <th className="px-6 py-4 text-left">{t("product")}</th>

              <th className="px-6 py-4 text-left">{t("rating")}</th>

              <th className="px-6 py-4 text-left">{t("comment")}</th>

              <th className="px-6 py-4 text-left">{t("date")}</th>

              <th className="px-6 py-4 text-left">{t("action")}</th>
            </tr>
          </thead>

          <tbody>
            {reviews.map((review) => (
              <tr key={review.id} className="border-b last:border-0">
                <td className="px-6 py-5">
                  <p className="font-medium">
                    {review.user?.name || t("unknown")}
                  </p>
                </td>

                <td className="px-6 py-5">
                  <p className="font-medium">
                    {locale === "ar"
                      ? review.product?.nameAr
                      : review.product?.nameEn}
                  </p>
                </td>

                <td className="px-6 py-5">
                  <div className="text-yellow-500">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </div>
                </td>

                <td className="max-w-xs px-6 py-5">
                  <p className="truncate">{review.comment}</p>
                </td>

                <td className="px-6 py-5 text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString(locale)}
                </td>

                <td className="px-6 py-5">
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                  >
                    {t("delete")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
