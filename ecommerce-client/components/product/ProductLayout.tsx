import ProductSearch from "./ProductSearch";
import ProductSidebar from "./ProductSidebar";
import ProductGrid from "./ProductGrid";

import { Product } from "@/types/product";
import { Category } from "@/types/category";

interface ProductLayoutProps {
  products: Product[];
  categories: Category[];
  selectedCategory?: number;
}

export default function ProductLayout({
  products,
  categories,
  selectedCategory,
}: ProductLayoutProps) {
  return (
    <div className="space-y-8">
      <ProductSearch />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
        <ProductSidebar
          categories={categories}
          selectedCategory={selectedCategory}
        />

        <ProductGrid products={products} />
      </div>
    </div>
  );
}
