import { getProduct, getRelatedProducts } from "@/services/product.service";

import ProductGallery from "@/components/product-details/ProductGallery";
import ProductInfo from "@/components/product-details/ProductInfo";
import ProductDescription from "@/components/product-details/ProductDescription";
import ProductReviews from "@/components/product-details/ProductReviews";
import RelatedProducts from "@/components/product-details/RelatedProducts";
import ProductActions from "@/components/product-details/ProductActions";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetailsPage({ params }: Props) {
  const { id } = await params;

  const product = await getProduct(Number(id));

  const relatedProducts = await getRelatedProducts(
    product.category.id,
    product.id,
    4,
  );

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <section className="grid gap-10 lg:grid-cols-2">
        <ProductGallery product={product} />

        <ProductInfo product={product} />

        <ProductActions product={product} />
      </section>

      <ProductDescription product={product} />

      <ProductReviews productId={product.id} />

      <RelatedProducts products={relatedProducts} />
    </main>
  );
}
