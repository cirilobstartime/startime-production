import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { fetchAPI } from "@/lib/api";
import MoveRightButton from "../MoveRightButton";

interface Props {
  locale: string;
}

export default async function TeamSection({ locale }: Props) {
  // 1. جلب البيانات من الـ API
  const response = await fetchAPI<any>("home-teams", locale);
  const data = response?.data?.[0];

  const t = await getTranslations({ locale, namespace: "ActionSection" });
  const isAr = locale === "ar";

  // --- منطق الـ Fallback لضمان ظهور العناوين في العربي ---
  const teamHead = data?.Team_Head || data?.localizations?.[0]?.Team_Head;

  const mainTitle = teamHead?.title || t("teamTitle"); // "Our Team"
  const subTitle = teamHead?.description || t("teamSubtitle"); // "A workplace driven by passion..."
  const description = data?.description || t("teamDesc");

  return (
    <section className="w-full py-20 px-6 bg-white">
      <div className="flex flex-col items-center text-center gap-8 max-w-4xl mx-auto">
        {/* العنوان الصغير العلوي - مكبر مع مسافات */}
        <h2 className="text-[#5b4180] font-bold text-2xl md:text-3xl uppercase tracking-widest">
          {mainTitle}
        </h2>

        <div className="flex flex-col gap-6">
          {/* الجملة الكبيرة الجذابة - بمسافة أسطر مريحة */}
          <p className="font-bold text-[#5b4180] text-3xl md:text-5xl leading-[1.3] md:leading-[1.4]">
            {subTitle}
          </p>

          {/* الوصف التفصيلي - مع احترام فواصل الأسطر من Strapi */}
          <p className="text-zinc-700 leading-relaxed text-lg md:text-xl whitespace-pre-line max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        <MoveRightButton
          href={`/${locale}/join-us`}
          text={t("teamBtn")}
          isAr={isAr}
          color="text-black"
          className="text-xl font-bold"
        />
      </div>
    </section>
  );
}
