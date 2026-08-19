"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

import { useAuthStore } from "@/lib/store/auth.store";
import { createReview } from "@/services/review.service";

interface Props {
  productId: number;
  onCreated: () => void;
}

export default function AddReview({ productId, onCreated }: Props) {
  const t = useTranslations("productReviews");

  const user = useAuthStore((state) => state.user);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    if (!comment.trim()) {
      setError(t("commentRequired"));
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await createReview({
        productId,
        rating,
        comment: comment.trim(),
      });

      setComment("");
      setRating(5);

      setSuccess(t("success"));

      await onCreated();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(t("error"));
      }
    } finally {
      setLoading(false);
    }
  }

  if (!user) {
    return (
      <div className="mt-8 rounded-lg border bg-gray-50 p-5">
        <p className="text-gray-600">{t("loginRequired")}</p>

        <Link
          href="/login"
          className="mt-3 inline-block rounded-lg bg-blue-600 px-5 py-2 text-white"
        >
          {t("login")}
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-8 border-t pt-8">
      <h3 className="mb-5 text-xl font-semibold">{t("addReview")}</h3>

      <form onSubmit={submit} className="space-y-5">
        {/* Rating */}
        <div>
          <label className="mb-2 block font-medium">{t("rating")}</label>

          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-3xl ${
                  star <= rating ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        {/* Comment */}
        <div>
          <label htmlFor="review-comment" className="mb-2 block font-medium">
            {t("comment")}
          </label>

          <textarea
            id="review-comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={t("commentPlaceholder")}
            rows={5}
            className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
          />
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-red-600">{error}</div>
        )}

        {success && (
          <div className="rounded-lg bg-green-50 p-3 text-green-600">
            {success}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-blue-600 px-6 py-3 text-white disabled:opacity-50"
        >
          {loading ? t("submitting") : t("submit")}
        </button>
      </form>
    </div>
  );
}
