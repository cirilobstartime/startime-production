import { getTranslations } from "next-intl/server";
import { fetchAPI } from "@/lib/api";
import MoveRightButton from "../MoveRightButton";

interface Props {
  locale: string;
}

export default async function WorkSection({ locale }: Props) {
  const response = await fetchAPI<any>("home-how-we-works", locale);
  const data = response?.data?.[0];

  const t = await getTranslations({ locale, namespace: "ActionSection" });
  const isAr = locale === "ar";

  const titleComponent =
    data?.how_we_work_title || data?.localizations?.[0]?.how_we_work_title;

  const mainTitle = titleComponent?.title;
  const subTitle = titleComponent?.description;
  const description = data?.description;

  return (
    <section className="w-full bg-black py-20 px-8 md:px-16">
      <div className="flex flex-col items-center text-center gap-6 pb-12 max-w-4xl mx-auto">
        <p className="text-white font-bold text-2xl md:text-3xl uppercase tracking-widest mb-2">
          {mainTitle}
        </p>

        <h2 className="text-3xl md:text-6xl font-bold text-white mb-2 leading-[1.3] md:leading-[1.4]">
          {subTitle}
        </h2>

        <p className="text-white/80 leading-relaxed text-lg md:text-xl max-w-2xl whitespace-pre-line">
          {description}
        </p>

        <p className="text-white font-medium mt-4">{t("workJoin")}</p>

        <MoveRightButton
          href={`/${locale}/contact`}
          text={t("workBtn")}
          isAr={isAr}
          className="text-xl font-bold"
        />
      </div>
    </section>
  );
}
