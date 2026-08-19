import { useTranslations } from "next-intl";
import { ReactNode } from "react";


type AuthLayoutProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export default function AuthLayout({
  title,
  description,
  children,
}: AuthLayoutProps) {

    const t = useTranslations("auth");
  return (
    <main className="flex min-h-[calc(100vh-180px)] items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold">{title}</h1>

        <p className="mt-2 text-gray-500">{description}</p>

        <div className="mt-8">{children}</div>
      </div>
    </main>
  );
}
