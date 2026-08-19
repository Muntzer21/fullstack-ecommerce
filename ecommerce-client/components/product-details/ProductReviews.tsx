"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import { getProductReviews, Review } from "@/services/review.service";

import AddReview from "./AddReview";

interface Props {
  productId: number;
}

export default function ProductReviews({ productId }: Props) {
  const locale = useLocale();
  const t = useTranslations("productReviews");

  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadReviews() {
    try {
      setLoading(true);
      setError("");

      const data = await getProductReviews(productId);

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

  useEffect(() => {
    loadReviews();
  }, [productId]);

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  return (
    <section className="mt-12 rounded-xl border bg-white p-8">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t("title")}</h2>

        {reviews.length > 0 && (
          <div className="text-right">
            <div className="text-xl font-bold">
              {averageRating.toFixed(1)} / 5
            </div>

            <div className="text-yellow-500">
              {"★".repeat(Math.round(averageRating))}
              {"☆".repeat(5 - Math.round(averageRating))}
            </div>
          </div>
        )}
      </div>

      {loading && <p className="text-gray-500">{t("loading")}</p>}

      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && reviews.length === 0 && (
        <p className="text-gray-500">{t("empty")}</p>
      )}

      {!loading && reviews.length > 0 && (
        <div className="divide-y">
          {reviews.map((review) => (
            <div key={review.id} className="py-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">
                  {review.user?.name || t("customer")}
                </h3>

                <span className="text-sm text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString(locale)}
                </span>
              </div>

              <div className="mt-2 text-yellow-500">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </div>

              <p className="mt-3 text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>
      )}

      <AddReview productId={productId} onCreated={loadReviews} />
    </section>
  );
}
