import React from "react";
import { getTranslations } from "next-intl/server";
import { fetchAPI } from "@/lib/api";
import ContactForm from "./ContactForm";
import Link from "next/link";

interface Props {
  locale: string;
}

export default async function ContactFormSection({ locale }: Props) {
  const response = await fetchAPI<any>("contact-us-third-banners", locale);
  const data = response?.data?.[0];

  const t = await getTranslations({
    locale,
    namespace: "ContactPage.ContactForm",
  });

  const description = data?.description || t("description");
  const email = data?.email || "info@startime.sa";
  const phone = data?.phone || "920010500";

  return (
    <section className="w-full bg-white py-20 px-8 md:px-16">
      <div className="container max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Side Info */}
          <div className="flex flex-col gap-8 order-1">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#5b4180]">
              {t("title")}
            </h2>
            <p className="text-zinc-600 text-lg leading-relaxed whitespace-pre-line">
              {description}
            </p>

            <div className="mt-4 space-y-4 text-lg font-bold">
              <p className="flex gap-2">
                <span className="text-[#5B4180]">{t("emailLabel")}:</span>
                <Link href={`mailto:${email}`} className="hover:underline">
                  {email}
                </Link>
              </p>
              <p className="flex gap-2">
                <span className="text-[#5B4180]">{t("phoneLabel")}:</span>
                <Link href="tel:920010500" className="text-black font-medium hover:underline"><span dir="ltr">{phone}</span></Link>
              </p>
            </div>
          </div>

          {/* Form Side */}
          <div className="order-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
