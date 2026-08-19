"use client";

import { useEffect, useState } from "react";
import { useRouter } from "@/i18n/navigation";

import {
  createProduct,
  getProduct,
  updateProduct,
  uploadImage,
} from "@/services/product.service";

import { getCategories } from "@/services/category.service";
import { Category } from "@/types/category";
import { useTranslations } from "next-intl";

interface Props {
  productId?: number;
}

export default function ProductForm({ productId }: Props) {
  const router = useRouter();
const t = useTranslations("dashboard.products");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [categories, setCategories] = useState<Category[]>([]);

  const [form, setForm] = useState({
    nameEn: "",
    nameAr: "",
    descriptionEn: "",
    descriptionAr: "",
    price: "",
    stock: "",
    imageUrl: "",
    categoryId: "",
  });

  useEffect(() => {
    async function load() {
      try {
        const cats = await getCategories();
        setCategories(cats);

        if (productId) {
          const product = await getProduct(productId);

          setForm({
            nameEn: product.nameEn,
            nameAr: product.nameAr,
            descriptionEn: product.descriptionEn,
            descriptionAr: product.descriptionAr,
            price: product.price.toString(),
            stock: product.stock.toString(),
            imageUrl: product.imageUrl,
            categoryId: product.category.id.toString(),
          });
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to load product.");
        }
      }
    }

    load();
  }, [productId]);

  function change(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const data = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      categoryId: Number(form.categoryId),
    };

    try {
      if (productId) {
        await updateProduct(productId, data);
      } else {
        await createProduct(data);
      }

      router.push("/dashboard/products");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    setLoading(true);
    setError("");

    try {
      const result = await uploadImage(file);

      setForm((prev) => ({
        ...prev,
        imageUrl: result.url,
      }));
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to upload image.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      className="space-y-6 rounded-xl bg-white p-8 shadow"
    >
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* English Name */}
      <div>
        <label className="mb-2 block font-medium">{t("englishName")}</label>

        <input
          name="nameEn"
          value={form.nameEn}
          onChange={change}
          required
          className="w-full rounded border p-3"
        />
      </div>

      {/* Arabic Name */}
      <div>
        <label className="mb-2 block font-medium">{t("arabicName")}</label>

        <input
          name="nameAr"
          value={form.nameAr}
          onChange={change}
          required
          dir="rtl"
          className="w-full rounded border p-3"
        />
      </div>

      {/* English Description */}
      <div>
        <label className="mb-2 block font-medium">
          {t("englishDescription")}
        </label>

        <textarea
          name="descriptionEn"
          value={form.descriptionEn}
          onChange={change}
          required
          rows={4}
          className="w-full rounded border p-3"
        />
      </div>

      {/* Arabic Description */}
      <div>
        <label className="mb-2 block font-medium">
          {t("arabicDescription")}
        </label>

        <textarea
          name="descriptionAr"
          value={form.descriptionAr}
          onChange={change}
          required
          dir="rtl"
          rows={4}
          className="w-full rounded border p-3"
        />
      </div>

      {/* Price */}
      <div>
        <label className="mb-2 block font-medium">{t("price")}</label>

        <input
          type="number"
          name="price"
          value={form.price}
          onChange={change}
          required
          min="0"
          step="0.01"
          className="w-full rounded border p-3"
        />
      </div>

      {/* Stock */}
      <div>
        <label className="mb-2 block font-medium">{t("stock")}</label>

        <input
          type="number"
          name="stock"
          value={form.stock}
          onChange={change}
          required
          min="0"
          className="w-full rounded border p-3"
        />
      </div>

      {/* Current Image */}
      {productId && form.imageUrl && (
        <div>
          <label className="mb-3 block font-medium">
            Current Product Image
          </label>

          <div className="rounded-lg border p-4">
            <img
              src={form.imageUrl}
              alt={form.nameEn}
              className="h-40 w-40 rounded-lg object-cover"
            />

            <p className="mt-3 break-all text-sm text-gray-500">
              {form.imageUrl}
            </p>
          </div>
        </div>
      )}

      {/* New Image */}
      <div>
        <label className="mb-2 block font-medium">
          {productId ? t("changeImage") : t("productImage")}
        </label>

        <input
          required={!productId}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full rounded-lg border px-4 py-3"
        />

        {form.imageUrl && (
          <p className="mt-2 text-sm text-green-600">
            {productId ? t("changeImage") : t("productImage")}
          </p>
        )}
      </div>

      {/* Category */}
      <div>
        <label className="mb-2 block font-medium"> {t("category")}</label>

        <select
          name="categoryId"
          value={form.categoryId}
          onChange={change}
          required
          className="w-full rounded border p-3"
        >
          <option value=""> {t("selectCategory")}</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.nameEn}
            </option>
          ))}
        </select>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-blue-600 px-6 py-3 text-white disabled:opacity-60"
      >
        {loading
          ? t("saving")
          : productId
            ? t("updateProduct")
            : t("createProduct")}
      </button>
    </form>
  );
}
