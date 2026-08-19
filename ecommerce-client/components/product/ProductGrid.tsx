import { Product } from "@/types/product";
import ProductCard from "../product/ProductCard";
import { useTranslations } from "next-intl";
interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
   const t = useTranslations("productsPage");
  if (products.length === 0) {
    return (
      <div className="flex h-60 items-center justify-center rounded-xl border">
        <p className="text-lg text-gray-500"> {t("noProducts")}</p>
      </div>
    );
  }

  return (
    <section>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
