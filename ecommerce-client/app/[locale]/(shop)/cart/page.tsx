import CartList from "@/components/Cart/CartList";
import CartSummary from "@/components/Cart/CartSummary";
import { getTranslations } from "next-intl/server";

export default async function CartPage() {
     const t = await getTranslations("cartPage");
  return (
    <main className="container mx-auto py-10">
          <h1 className="mb-8 text-4xl font-bold">
              {t("title")}
          </h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <CartList />
        <CartSummary />
      </div>
    </main>
  );
}
