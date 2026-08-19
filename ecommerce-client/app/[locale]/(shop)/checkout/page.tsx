import CustomerForm from "@/components/checkout/CustomerForm";
import AddressForm from "@/components/checkout/AddressForm";
import PaymentMethod from "@/components/checkout/PaymentMethod";
import OrderSummary from "@/components/checkout/OrderSummary";
import { getTranslations } from "next-intl/server";

export default async function CheckoutPage() {
  const t = await getTranslations("checkoutPage");

  return (
    <main className="container mx-auto py-10">
      <h1 className="mb-8 text-4xl font-bold">{t("title")}</h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-8">
          <CustomerForm />

          <AddressForm />

          <PaymentMethod />
        </div>

        <div className="space-y-6">
          <OrderSummary />

          {/* <PlaceOrderButton /> */}
        </div>
      </div>
    </main>
  );
}
