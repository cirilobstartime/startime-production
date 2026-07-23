import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { fetchAPI } from "@/lib/api";

interface Props {
  locale: string;
}

export default async function BenefitsSection({ locale }: Props) {
  const headerResponse = await fetchAPI<any>("home-protfolios", locale);
  const headerData = headerResponse?.data?.[0]?.title_subtitle;

  // Fetching projects from API
  const projectsResponse = await fetchAPI<any>("projects", locale);
  const projectsData = projectsResponse?.data || [];

  const t = await getTranslations({ locale, namespace: "Benefits" });

  const isAr = locale === "ar";
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_BASE_URL;

  return (
    <section className="w-full text-white py-20">
      <div className="container mx-auto px-8 md:px-16">
        {/* Header Part */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="max-w-3xl">
            <p className="text-[#5b4180] font-semibold text-lg mb-2 uppercase tracking-wider">
              {headerData?.title}
            </p>
            <h2 className="text-4xl md:text-6xl font-bold leading-[1.2] md:leading-[1.3] text-white">
              <span className="text-[#5b4180]">{headerData?.description}</span>
            </h2>
          </div>
        </div>

        {/* Dynamic Cards Section - Mapping all projectsData */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {projectsData.map((project: any, index: number) => {
            const imageUrl = project.image?.url
              ? `${STRAPI_URL}${project.image.url}`
              : "/placeholder.png";

            return (
              <div
                key={project.id || index}
                className="group bg-gray-50 border border-gray-200 flex flex-col h-full hover:shadow-lg transition-all duration-300 rounded-sm overflow-hidden"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={project.title || "Project"}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3
                    className={`text-lg font-bold text-[#5b4180] mb-3 leading-tight line-clamp-2 min-h-[3rem] ${isAr ? "text-right" : "text-left"}`}
                  >
                    {project.title}
                  </h3>

                  <p
                    className={`text-black text-sm leading-[1.8] ${
                      isAr
                        ? "text-right md:text-justify"
                        : "text-left md:text-justify"
                    }`}
                    style={{
                      direction: isAr ? "rtl" : "ltr",
                      textAlignLast: isAr ? "right" : "left",
                      textJustify: isAr ? "inter-character" : "distribute",
                      wordBreak: "normal",
                      overflowWrap: "anywhere",
                      lineBreak: "loose",
                    }}
                  >
                    {project.shortDescription}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
