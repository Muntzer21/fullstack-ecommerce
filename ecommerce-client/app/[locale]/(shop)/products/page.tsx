import ProductLayout from "@/components/product/ProductLayout";

import { getProducts } from "@/services/product.service";
import { getCategories } from "@/services/category.service";
import { getTranslations } from "next-intl/server";

interface ProductsPageProps {
  searchParams: Promise<{
    page?: string;
    category?: string;
    search?: string;
  }>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
 const params = await searchParams;

 const selectedCategory = params.category ? Number(params.category) : undefined;

 const result = await getProducts({
   page: Number(params.page) || 1,
   limit: 12,
   category: selectedCategory,
   search: params.search,
 });

 const categories = await getCategories();
 const t = await getTranslations("productsPage");

 return (
   <main className="mx-auto max-w-7xl px-6 py-12">
     <div className="mb-10">
       <h1 className="text-4xl font-bold">{t("title")}</h1>

       <p className="mt-2 text-gray-500">{t("description")}</p>
     </div>

     <ProductLayout
       products={result.data}
       categories={categories}
       selectedCategory={selectedCategory}
     />
   </main>
 );
}
