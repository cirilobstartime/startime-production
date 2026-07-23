"use client";

import { ChevronDown } from "lucide-react";
import { useLocale } from "next-intl";
import { useState } from "react";

interface Country {
  code: string;
  flag: string;
  name: string;
  digits: number;
}

interface PhoneInputProps {
  label: string;
  name: string;
  value?: string;
  country?: Country;
  placeholder?: string;
  required?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onCountryChange?: (country: Country) => void;
}

const countries: Country[] = [
  { name: "Saudi Arabia", code: "+966", flag: "🇸🇦", digits: 9 },
  { name: "United Arab Emirates", code: "+971", flag: "🇦🇪", digits: 9 },
  { name: "Qatar", code: "+974", flag: "🇶🇦", digits: 8 },
  { name: "Kuwait", code: "+965", flag: "🇰🇼", digits: 8 },
  { name: "Bahrain", code: "+973", flag: "🇧🇭", digits: 8 },
  { name: "Oman", code: "+968", flag: "🇴🇲", digits: 8 },
  { name: "Egypt", code: "+20", flag: "🇪🇬", digits: 10 },
  { name: "Jordan", code: "+962", flag: "🇯🇴", digits: 9 },
  { name: "Lebanon", code: "+961", flag: "🇱🇧", digits: 8 },
  { name: "United States", code: "+1", flag: "🇺🇸", digits: 10 },
  { name: "United Kingdom", code: "+44", flag: "🇬🇧", digits: 10 },
  { name: "France", code: "+33", flag: "🇫🇷", digits: 9 },
  { name: "Germany", code: "+49", flag: "🇩🇪", digits: 10 },
  { name: "India", code: "+91", flag: "🇮🇳", digits: 10 },
];

export default function PhoneInput({
  label,
  name,
  value,
  country = countries[0],
  placeholder = "Phone number",
  required,
  onChange,
  onCountryChange,
}: PhoneInputProps) {
  const locale = useLocale();
  const isAr = locale === "ar";

  const [selectedCountry, setSelectedCountry] = useState(country);

  const handleCountryChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selected = countries.find(
      (c) => c.code === e.target.value
    );

    if (selected) {
      setSelectedCountry(selected);
      onCountryChange?.(selected);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className={`text-xs font-bold text-[#2A2E45] ${
          isAr ? "text-right" : "text-left"
        }`}
      >
        {label}
      </label>

      <div
        className={`flex h-[45px] w-full gap-2 ${
          isAr ? "flex-row-reverse" : ""
        }`}
      >
        {/* Country Selector */}
        <div className="relative w-[110px] shrink-0">
          <select
            value={selectedCountry.code}
            onChange={handleCountryChange}
            className="h-full w-full appearance-none rounded-full border border-[#C1C2C2] bg-[#FBFBFB] px-4 pr-8 text-sm outline-none focus:border-[#007CD8]"
          >
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.flag} {country.code}
              </option>
            ))}
          </select>

          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2" />
        </div>

        {/* Phone Number */}
        <input
          id={name}
          name={name}
          value={value}
          required={required}
          placeholder={placeholder}
          minLength={selectedCountry.digits}
          maxLength={selectedCountry.digits}
          inputMode="numeric"
          pattern={`\\d{${selectedCountry.digits}}`}
          onChange={(e) => {
            // Allow digits only
            const digitsOnly = e.target.value.replace(/\D/g, "");

            // Prevent exceeding max digits
            e.target.value = digitsOnly.slice(0, selectedCountry.digits);

            onChange?.(e);
          }}
          className={`h-full min-w-0 flex-1 rounded-full border border-[#C1C2C2] bg-[#FBFBFB] px-4 text-sm outline-none placeholder:text-[#ADADAD] focus:border-[#007CD8] ${
            isAr ? "text-right" : "text-left"
          }`}
        />
      </div>
    </div>
  );
}