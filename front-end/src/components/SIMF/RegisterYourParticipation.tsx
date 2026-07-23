"use client";

import React, { useState, useRef } from "react";
import { useTranslations } from "next-intl";

/**
 * SIMF "Register Your Participation" CTA (Figma node 9485:6107, "section 6").
 *
 * Rounded lavender panel: centered eyebrow + heading + lead, an email-capture
 * pill (input + dark button), and a contact row, with a faint brand mark.
 *
 * Tokens: eyebrow/contact violet #5a4280, heading #000, lead gray #4b5563,
 * button navy #001640, input text #3f3f46. Roboto — H2 Bold 40px.
 */

interface ContactItem {
  Icon: React.FC;
  label: string;
  href?: string;
}

interface RegisterYourParticipationProps {
  locale?: string;
  eyebrow?: string;
  heading?: string;
  lead?: string;
  emailPlaceholder?: string;
  submitLabel?: string;
  contacts?: ContactItem[];
  onSubmitEmail?: (email: string) => void;
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z" />
    </svg>
  );
}

const DEFAULT_CONTACTS: ContactItem[] = [
  { Icon: PinIcon, label: "Riyadh 12341 3507" },
  { Icon: PhoneIcon, label: "+966920010500", href: "tel:+966920010500" },
  { Icon: MailIcon, label: "sim@startime.sa", href: "mailto:sim@startime.sa" },
];
const DEFAULT_CONTACTS_AR: ContactItem[] = [
  
  { Icon: PhoneIcon, label: "+966920010500", href: "tel:+966920010500" },
  { Icon: MailIcon, label: "sim@startime.sa", href: "mailto:sim@startime.sa" },
];

export default function RegisterYourParticipation({
  locale = "en",
  eyebrow,
  heading,
  lead,
  emailPlaceholder,
  submitLabel,
  contacts,
  onSubmitEmail,
}: RegisterYourParticipationProps) {
  const isAr = locale === "ar";
  const t = useTranslations("SIMF.registeryourparticipation");

  const resolvedContacts = isAr ? DEFAULT_CONTACTS_AR : DEFAULT_CONTACTS;

  const eyebrowText = eyebrow ?? t("eyebrow");
  const headingText = heading ?? t("heading");
  const leadText = lead ?? t("lead");
  const emailPlaceholderText = emailPlaceholder ?? t("emailPlaceholder");
  const submitLabelText = submitLabel ?? t("submitLabel");

  const [email, setEmail] = useState("");

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   onSubmitEmail?.(email);
  // };

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    //console.log(Object.fromEntries(formData.entries()));
    const newErrors: { [key: string]: string } = {};
    //console.log(formData);
    const requiredFields = ["email"];

    requiredFields.forEach((field) => {
      if (!formData.get(field)) {
        if (t.has(`fields.required`)) {
          newErrors[field] = t(`fields.required`);
        } else {
          newErrors[field] =
            locale === "ar" ? "هذا الحقل مطلوب" : "This field is required";
        }
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setStatus(data.success ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section dir={isAr ? "rtl" : "ltr"} className="w-full bg-white">
      <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 md:px-20 md:py-16">
        <div
          className="relative overflow-hidden rounded-[28px] px-6 py-14 sm:px-10 md:px-16 md:py-16"
          style={{
            // background:
            //   "linear-gradient(135deg, #ece7f5 0%, #f4eefb 45%, #e7e1f2 100%)",
            //backgroundColor: "#EDF5F7"
            background: "linear-gradient(231.44deg, rgba(176, 214, 243, 0.5) 0%, rgba(241, 242, 242, 0.5) 100%)"
          }}
        >
          {/* Faint brand mark */}
          {/* <svg
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 right-0 h-56 w-56 text-white/40"
            viewBox="0 0 200 200"
            fill="currentColor"
          >
            <path d="M40 150 190 40 120 175l-15-55-65-15Zm65 15 15 55 8-40-23-15Z" />
          </svg> */}
          <svg aria-hidden="true"
            className="pointer-events-none absolute bottom-0 right-0 h-56 w-56 text-white/40"
            viewBox="0 0 200 200"
            fill="currentColor"
            style={{ position: "absolute", right: "0px", bottom: "0px"}}>
            {/*style={{ position: "absolute", right: "-19.812px", bottom: "-59.896px"}}>*/}
          <path d="M164.865 57.283L118.066 122.55L143.845 220.631L275.327 0L79.9927 101.288L0 20.5715L164.865 57.283Z" fill="#CCC4D8"/>
          </svg>


          {/* Content */}
          <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
            <p className="hidden text-xs font-bold uppercase tracking-[0.15em] text-[#5a4280]">
              {eyebrowText}
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-black md:text-[40px] md:leading-[1.15]">
              {headingText}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#4b5563] md:text-lg">
              {leadText}
            </p>

            {/* Email form */}
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="mt-8 flex w-full max-w-md flex-col items-stretch gap-2 rounded-full bg-white p-1.5 shadow-sm sm:flex-row sm:items-center"
            >
              <label className="flex flex-1 items-center gap-2 px-4 text-[#3f3f46]">
                <span className="text-[#9aa2b1]">
                  <MailIcon />
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={emailPlaceholderText}
                  className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-[#9aa2b1]"
                />
              </label>
              {status === "success" && (
                <p className="text-green-700 font-bold text-center">
                  {t.has("fields.successMessage")
                    ? "You are now subscribed to our newsletter!"
                    : locale === "ar"
                      ? "لقد اشتركت الآن في نشرتنا الإخبارية!"
                      : "You are now subscribed to our newsletter!"}
                </p>
              )}

              {status === "error" && (
                <p className="text-red-600 font-bold text-center">
                  {t.has("fields.errorMessage")
                    ? t("fields.errorMessage")
                    : locale === "ar"
                      ? "حدث خطأ"
                      : "An error occurred"}
                </p>
              )}
              <button
                type="submit"
                className="shrink-0 rounded-full bg-[#001640] px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#0a2559]"
              >
                {submitLabelText}
              </button>
            </form>

            {/* Contact row */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-[#5a4280]">
              {resolvedContacts.map(({ Icon, label, href }) => {
                const content = (
                  <span className="inline-flex items-center gap-2">
                    <Icon />
                    {label}
                  </span>
                );
                return href ? (
                  <a key={label} href={href} className="transition-opacity hover:opacity-70">
                    {content}
                  </a>
                ) : (
                  <span key={label}>{content}</span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
