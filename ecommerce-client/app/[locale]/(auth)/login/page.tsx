import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";
import { useTranslations } from "next-intl";

export default function LoginPage() {
     const t = useTranslations("auth");
  return (
    <AuthLayout title={t("loginTitle")} description={t("loginDescription")}>
      <LoginForm />
    </AuthLayout>
  );
}
