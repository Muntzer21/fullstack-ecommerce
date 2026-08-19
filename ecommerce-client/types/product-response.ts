import { Category } from "./category";
import { Product } from "./product";
// import { Product } from "./product";
export interface ProductLayoutProps {
  products: Product[];
  categories: Category[];
  selectedCategory?: number;
}
export interface ProductResponse {
  data: Product[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}