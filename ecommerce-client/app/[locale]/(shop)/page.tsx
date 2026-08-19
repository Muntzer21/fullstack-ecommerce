import Categories from "@/components/Home/Categories";
import Hero from "../../../components/Home/Hero";
import { getCategories } from "@/services/category.service";
import { getFeaturedProducts } from "@/services/product.service";
import FeaturedProducts from "@/components/Home/FeaturedProducts";

export default async function Home() {
  const categories = await getCategories();
  const products = await getFeaturedProducts();

  return (
    <main>
      <Hero />

      <Categories categories={categories} />

      <FeaturedProducts products={products} />
    </main>
  );
}
