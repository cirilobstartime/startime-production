import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { fetchAPI } from "@/lib/api";
import MoveRightButton from "../MoveRightButton";

interface Props {
  locale: string;
}

export default async function WhyChooseSection({ locale }: Props) {
  const response = await fetchAPI<any>("home-triple-s-areanas", locale);
  const data = response?.data?.[0];

  const t = await getTranslations({ locale, namespace: "WhyChoose" });

  const isAr = locale === "ar";
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_BASE_URL;

  const title = data?.Triple_S_Titles?.title || t("tripleS.title");
  const description = data?.description || t("tripleS.description");
  const imageUrl = data?.triple_s_image?.url
    ? `${STRAPI_URL}${data.triple_s_image.url}`
    : null;

  return (
    <section className="w-full bg-black py-20 text-white overflow-hidden">
      <div className="container mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="relative w-full aspect-square bg-zinc-800 flex items-center justify-center">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={title || "Triple S Arena"}
                fill
                className="object-cover"
                priority
              />
            )}
          </div>

          {/* Text Side */}
          <div className="flex flex-col gap-6">
            <h2 className="text-4xl md:text-6xl font-bold leading-[1.2] md:leading-[1.3]">
              {title}
            </h2>

            <p className="text-lg leading-relaxed max-w-xl text-zinc-300">
              {description}
            </p>

            <MoveRightButton
              href={`/${locale}/triple-s-arena`}
              text={t("common.learnMore")}
              isAr={isAr}
              className="text-lg font-medium"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
