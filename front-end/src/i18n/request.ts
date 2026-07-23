import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import enMessages from "../messages/en.json";
import arMessages from "../messages/ar.json";

const locales = ["en", "ar"] as const;
type Locale = (typeof locales)[number];

const messages: Record<Locale, any> = {
  en: enMessages,
  ar: arMessages,
};

export default getRequestConfig(async ({ locale }: { locale?: string }) => {
  if (!locale || !locales.includes(locale as Locale)) {
    notFound();
  }

  return {
    locale,
    messages: messages[locale as Locale],
  };
});
