import React from "react";
import { fetchAPI } from "@/lib/api";
import FeaturesGridContent from "./FeaturesGridContent";

interface Props {
  locale: string;
}

export default async function FeaturesGrid({ locale }: Props) {
  // Fetching data from the second banners API
  const response = await fetchAPI<any>("sss-arina-second-banners", locale);
  const featuresData = response?.data || [];

  const isAr = locale === "ar";

  return (
    <section className="w-full py-24 bg-black" dir={isAr ? "rtl" : "ltr"}>
      <div className="container mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {featuresData.map((item: any, index: number) => (
            <FeaturesGridContent
              key={item.id || index}
              index={index}
              title={item.element?.title}
              description={item.element?.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
