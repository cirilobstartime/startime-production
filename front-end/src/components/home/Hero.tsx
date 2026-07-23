import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { fetchAPI } from "@/lib/api";
import MoveRightButton from "../MoveRightButton";

interface HeroSectionProps {
  locale: string;
}

export default async function HeroSection({ locale }: HeroSectionProps) {
  const tMission = await getTranslations({ locale, namespace: "Mission" });
  const isAr = locale === "ar";

  const response = await fetchAPI<any>("home-banners", locale);
  const heroData = response?.data?.[0];

  const title = heroData?.Title;
  const subtitle = heroData?.shortDescription;

  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_BASE_URL;
  const bgImage = heroData?.Background?.url
    ? `${baseUrl}${heroData.Background.url}`
    : null;

  const missionResponse = await fetchAPI<any>("home-banner-2s", locale);
  const missionData = missionResponse?.data?.[0];

  const missionElements = missionData?.element || [];

  const missionImage = missionData?.banner?.url
    ? `${baseUrl}${missionData.banner.url}`
    : null;

  return (
    <div className="bg-black text-white w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center">
        {bgImage && (
          <div className="absolute inset-0 z-0">
            <Image
              src={bgImage}
              alt={title || "Hero Background"}
              fill
              className="object-cover opacity-80"
               priority={true}
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
          </div>
        )}

        <div
          className={`container mx-auto relative z-10 px-8 md:px-16 ${isAr ? "text-right" : "text-left"}`}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl  text-white leading-relaxed lg:leading-[1.4] mb-12 max-w-3xl lg:max-w-4xl rtl:text-right text-center lg:text-start whitespace-pre-line">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-white mb-10 max-w-xl">
            {subtitle}
          </p>
          <MoveRightButton
            href={`/${locale}/discover`}
            text={isAr ? "اكتشف" : "Discover"}
            isAr={isAr}
            className="text-xl font-medium"
          />
        </div>
      </section>

      <section className="bg-white">
        {/* UFI Section */}
        <div className="bg-white py-20 text-center">
          <div className="max-w-5xl mx-auto px-4 flex flex-col items-center">
            {/* {// Fallback في حالة عدم وجود داتا} */}
            
            <p className="text-black/80 text-xl md:text-2xl leading-relaxed font-light" style={{ color: "rgb(63 63 70/var(--tw-text-opacity,1))" }}>
              {isAr ? "نفخر بعضويتنا في" : "A proud member of"}
            </p>
            <Image
                src="/logo-ufi-colored.svg"
                alt="UFI The Global Association of the Exhibition Industry Logo"
                width={240}
                height={48}
                style={{ padding: "2.5vh" }}
                className="object-contain"
                priority
              />
            <p className="text-black/80 text-xl md:text-2xl leading-relaxed font-light" style={{ color: "rgb(63 63 70/var(--tw-text-opacity,1))" }}>
              {isAr ? "الرابطة العالمية لصناعة المعارض" : "The Global Association of Exhibition Industry"}
            </p>
            
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative pt-28 pb-0 overflow-hidden bg-black">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-0 items-center">
            <div
              className={`flex flex-col gap-8 ${isAr ? "text-right" : "text-left"}`}
            >
              {missionElements.map((item: any) => (
                <div key={item.id} className="flex flex-col gap-4">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                    {item.title}
                  </h2>
                  <p className="text-white/80 text-xl md:text-2xl leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="relative w-full flex items-center justify-center md:justify-end">
              <div className="relative w-full md:w-[80%] h-[300px] md:h-[500px]">
                {missionImage && (
                  <div className="relative w-full md:w-[80%] h-[300px] md:h-[500px]">
                    <Image
                      src={missionImage}
                      alt="From the Heart of Najd | From the Legacy of Diriyah"
                      fill
                      className="object-contain object-right-bottom drop-shadow-[0_0_25px_rgba(123,111,232,0.15)]"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-black py-8">
        <div className="container mx-auto px-8 md:px-16">
          <div className="flex items-center w-full">
            <div className="w-16 h-[2px] bg-white" />
            <div className="flex-grow h-[1px] bg-white/20" />
          </div>
        </div>
      </section>

      
    </div>

    
  );
}
