import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ContactInfo() {
  const t = useTranslations("contact.info");

  return (
    <div>
      <h2 className="mb-8 text-4xl font-bold">{t("title")}</h2>

      <div className="space-y-8">
        <div className="flex gap-5">
          <MapPin className="text-blue-600" size={30} />

          <div>
            <h3 className="font-semibold">{t("address")}</h3>

            <p className="text-gray-600">{t("addressValue")}</p>
          </div>
        </div>

        <div className="flex gap-5">
          <Phone className="text-blue-600" size={30} />

          <div>
            <h3 className="font-semibold">{t("phone")}</h3>

            <p className="text-gray-600">+964 770 000 0000</p>
          </div>
        </div>

        <div className="flex gap-5">
          <Mail className="text-blue-600" size={30} />

          <div>
            <h3 className="font-semibold">{t("email")}</h3>

            <p className="text-gray-600">support@shopease.com</p>
          </div>
        </div>

        <div className="flex gap-5">
          <Clock className="text-blue-600" size={30} />

          <div>
            <h3 className="font-semibold">{t("workingHours")}</h3>

            <p className="text-gray-600">{t("workingDays")}</p>

            <p className="text-gray-600">{t("workingTime")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
