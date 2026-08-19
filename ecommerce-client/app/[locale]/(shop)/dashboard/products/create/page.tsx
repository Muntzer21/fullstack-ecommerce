import { getTranslations } from "next-intl/server";

import ProductForm from "@/components/dashboard/products/ProductForm";

export default async function CreateProductPage() {
  const t = await getTranslations("dashboard.products");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t("createProduct")}</h1>

        <p className="mt-2 text-gray-500">{t("createDescription")}</p>
      </div>

      <ProductForm />
    </div>
  );
}
