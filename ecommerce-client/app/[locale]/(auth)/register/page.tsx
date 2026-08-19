import AuthLayout from "@/components/auth/AuthLayout";
import RegisterForm from "@/components/auth/RegisterForm";
import { useTranslations } from "next-intl";

export default function RegisterPage() {
     const t = useTranslations("auth");
  return (
    <AuthLayout
      title={t("registerTitle")}
      description={t("registerDescription")}
    >
      <RegisterForm />
    </AuthLayout>
  );
}
