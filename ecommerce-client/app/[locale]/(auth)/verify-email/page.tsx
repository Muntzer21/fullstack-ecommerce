import AuthLayout from "@/components/auth/AuthLayout";
import VerifyEmailForm from "@/components/auth/VerifyEmailForm";
import { useTranslations } from "next-intl";

export default function VerifyEmailPage() {
    const t = useTranslations("auth");
  return (
    <AuthLayout title={t("verifyTitle")} description={t("verifyDescription")}>
      <VerifyEmailForm />
    </AuthLayout>
  );
}
