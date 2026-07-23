"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import Modal from "./Modal";

import Input from "@/components/form/Input";
import Select from "@/components/form/Select";
import Textarea from "@/components/form/Textarea";
import PhoneInput from "@/components/form/PhoneInput";
import FileUpload from "@/components/form/FileUpload";

import { countries } from "@/data/countries";
import { cities } from "@/data/cities";

// const countries = getNames().map((country) => ({
//   label: country,
//   value: country,
// }));

// import your Button component here
// import Button from "@/components/Button";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({
  isOpen,
  onClose,
}: ContactModalProps) {
  const t = useTranslations("SIMF.contactmodal");

  const [form, setForm] = useState({
    name: "",
    organization: "",
    jobTitle: "",
    country: "",
    address: "",
    telephone: "",
    mobile: "",
    email: "",
    website: "",
    message: "",
    attachment: null,
    });
    const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(form);

    // validation
    // call API

    setSubmitted(true);

  };

  return (
    // <Modal
    //   isOpen={isOpen}
    //   onClose={onClose}
    //   title={t("title")}
    //   maxWidth="md"
    // >
        
    // </Modal>
    <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={submitted ? "" : t("title")}
        maxWidth="md"
        >
        {submitted ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl text-green-600">
                    ✓
                </div>

                <h3 className="text-2xl font-bold text-[#244A77]">
                    {t("successTitle")}
                </h3>

                <p className="mt-3 max-w-md text-[#6B7280]">
                    {t("successMessage")}
                </p>
            </div>
        ) : (
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-6 p-10"
                >
                {/* Row 1 */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Input
                    name="name"
                    label={t("name")}
                    placeholder={t("namePlaceholder")}
                    />

                    <Input
                    name="organization"
                    label={t("organization")}
                    placeholder={t("organizationPlaceholder")}
                    />
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Input
                    name="jobTitle"
                    label={t("jobTitle")}
                    placeholder={t("jobTitlePlaceholder")}
                    />

                    <Select
                    name="country"
                    label={t("country")}
                    options={countries}
                    />
                </div>

                {/* Row 3 */}
                <Input
                    name="address"
                    label={t("address")}
                    placeholder={t("addressPlaceholder")}
                />

                {/* Row 4 */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <PhoneInput
                    name="telephone"
                    label={t("telephone")}
                    />

                    <PhoneInput
                    name="mobile"
                    label={t("mobile")}
                    />
                </div>

                {/* Row 5 */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Input
                    name="email"
                    type="email"
                    label={t("workEmail")}
                    placeholder="example@company.com"
                    />

                    <Input
                    name="website"
                    label={t("website")}
                    placeholder="https://example.com"
                    />
                </div>

                {/* Row 6 */}
                <FileUpload
                    label={t("attachments")}
                    buttonLabel={t("upload")}
                    helperText={t("acceptedFormats")}
                />

                {/* Row 7 */}
                <Textarea
                    name="message"
                    label={t("message")}
                    rows={6}
                    placeholder={t("messagePlaceholder")}
                    className="
                    rounded-3xl
                    border
                    border-[#C1C2C2]
                    bg-[#FBFBFB]
                    px-4
                    py-3
                    resize-none
                    "
                />

                {/* Row 8 */}
                <button
                    type="submit"
                    className="
                    mt-2
                    h-14
                    rounded-full
                    bg-[#498FBD]
                    font-semibold
                    text-white
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:bg-[#3A7CA7]
                    hover:shadow-lg
                    "
                >
                    {t("submit")}
                </button>
            </form>
        )}
    </Modal>
  );
}