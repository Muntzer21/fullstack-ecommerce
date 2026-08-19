import { getTranslations } from "next-intl/server";

import ProductForm from "@/components/dashboard/products/ProductForm";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;

  const t = await getTranslations("dashboard.products");

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t("editProduct")}</h1>

      <ProductForm productId={Number(id)} />
    </div>
  );
}
