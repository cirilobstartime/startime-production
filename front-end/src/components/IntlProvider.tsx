"use client";

import { ReactNode } from "react";
import { NextIntlClientProvider, AbstractIntlMessages } from "next-intl";
import enMessages from "@/messages/en.json";
import arMessages from "@/messages/ar.json";

// حل مشكلة عدم تطابق ملفات الـ JSON عن طريق تعريف نوع عام للملفات
const messages: Record<string, AbstractIntlMessages> = {
  en: enMessages as unknown as AbstractIntlMessages,
  ar: arMessages as unknown as AbstractIntlMessages,
};

interface IntlProviderProps {
  children: ReactNode;
  locale: string;
}

export function IntlProvider({ children, locale }: IntlProviderProps) {
  const currentMessages = messages[locale] || messages.en;

  return (
    <NextIntlClientProvider
      messages={currentMessages}
      locale={locale}
      timeZone="UTC"
      // @ts-ignore
      defaultTranslationValues={{
        br: () => <br />,
        important: (chunks: ReactNode) => <strong>{chunks}</strong>,
      }}
    >
      {children}
    </NextIntlClientProvider>
  );
}
