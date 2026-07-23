"use client";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const STRAPI_BASE_URL = "https://cms-staging.startime.sa";

interface Project {
  id: number;
  title: string;
  shortDescription: string;
  imageUrl: string;
  link: string | null;
}

interface HeaderData {
  title: string;
  description: string;
}

export const PortfolioGrid = () => {
  const locale = useLocale();
  const isAr = locale === "ar";
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [headerData, setHeaderData] = useState<HeaderData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. جلب بيانات الهيدر من الرابط الجديد
        const headerRes = await fetch(
          `${STRAPI_BASE_URL}/api/portfolio-forth-banners?populate=*&locale=${locale}`,
          { cache: "no-store" }
        );
        const headerResult = await headerRes.json();
        
        if (headerResult?.data?.[0]?.header) {
          setHeaderData({
            title: headerResult.data[0].header.title,
            description: headerResult.data[0].header.description,
          });
        }

        // 2. جلب المشاريع (كما كانت)
        const projectsRes = await fetch(
          `${STRAPI_BASE_URL}/api/projects?populate=*&locale=${locale}`,
          { cache: "no-store" }
        );
        const projectsResult = await projectsRes.json();

        /** Original Code */
        // if (projectsResult?.data) {
        //   const mappedProjects = projectsResult.data.map((item: any) => {
        //     const data = item.attributes ? item.attributes : item;
        //     return {
        //       id: item.id,
        //       title: data.title || "",
        //       shortDescription: data.shortDescription || "",
        //       imageUrl: data.image?.url 
        //         ? `${STRAPI_BASE_URL}${data.image.url}` 
        //         : "/fallback-image.jpg",
        //       link: data.link || null
        //     };
        //   });
        //   setProjects(mappedProjects);
        // }
        /** end of Original Code */
        if (projectsResult?.data) {
          const mappedProjects = projectsResult.data.map((item: any) => {
            const data = item.attributes ? item.attributes : item;

            return {
              id: item.id,
              documentId: item.documentId,
              title: data.title || "",
              shortDescription: data.shortDescription || "",
              imageUrl: data.image?.url
                ? `${STRAPI_BASE_URL}${data.image.url}`
                : "/fallback-image.jpg",
              link: data.link || null,
            };
          });

          const FEATURED_PROJECT = "eed1hhu2k8jkad75a7gpo9rq"; // replace with the actual documentId of the featured project

          const featured = mappedProjects.find(
            (p: typeof mappedProjects[number]) => p.documentId === FEATURED_PROJECT
          );

          const others = mappedProjects.filter(
            (p: typeof mappedProjects[number]) => p.documentId !== FEATURED_PROJECT
          );

          setProjects(featured ? [featured, ...others] : others);
        }
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [locale]);

  if (loading) return <div className="w-full h-96 bg-black flex items-center justify-center text-white font-bold">Loading...</div>;

  return (
    <section className="w-full bg-black py-24 px-6" dir={isAr ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto">
        
        {/* الهيدر الديناميكي الجديد */}
        <div className="flex flex-col items-center mb-24 text-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 md:px-10 py-3 mb-4"
          >
            {/* عرض العنوان من الـ API الجديد */}
            <h2 className="text-white text-4xl md:text-6xl font-black uppercase tracking-tighter">
              {headerData?.title || (isAr ? "مشاريع المحفظة" : "Portfolio Projects")}
            </h2>
            
            {/* عرض الوصف من الـ API الجديد */}
            {headerData?.description && (
              <p className="text-gray-400 mt-4 text-lg md:text-xl max-w-2xl mx-auto font-medium">
                {headerData.description}
              </p>
            )}
          </motion.div>
          <div className="h-[6px] bg-white w-64 md:w-96 mt-2"></div>
        </div>

        {/* شبكة الكروت (بدون تغيير في المنطق) */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
  {projects.map((project) => (
    <motion.div 
      key={project.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col h-full group"
    >
      {/* القسم العلوي (الصورة) - تم تغيير خلفية الإطار والزر */}
      <div className="bg-[#1A1A1A] p-4 relative"> {/* خلفية الكارت حول الصورة */}
        <div className="relative aspect-[4/3] w-full bg-[#262626] overflow-hidden">
          <Image 
            src={project.imageUrl} 
            alt={project.title} 
            fill 
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </div>

        {/* زر الـ Link - ألوان تناسب الـ Dark Mode */}
        {project.link && (
          <Link
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`absolute -bottom-4 ${isAr ? 'left-6' : 'right-6'} z-10`}
          >
            <div className="bg-[#1A1A1A] border-[1px] border-[#A855F7] flex items-center gap-2 px-3 py-1 transition-all cursor-pointer group-hover:bg-[#A855F7]">
              <span className="text-[#A855F7] group-hover:text-white text-[10px] font-bold underline italic uppercase">Discover Event</span>
              <ArrowRight size={14} className={`text-[#A855F7] group-hover:text-white ${isAr ? 'rotate-180' : ''}`} />
            </div>
          </Link>
        )}
      </div>

      {/* القسم السفلي (المحتوى) - خلفية سوداء ونصوص بنفسجية ورمادية */}
      <div className="bg-[#1A1A1A] p-6 pt-10 flex flex-col flex-grow gap-4 border-t-0 border border-[#262626] shadow-2xl">
        <div className="py-2 px-4 min-h-[50px] flex items-center justify-center">
          {/* العنوان بنفسجي فاتح (مثل الصورة) */}
          <h3 className="text-[#A582E2] font-bold text-lg text-center uppercase tracking-wide leading-tight">
            {project.title}
          </h3>
        </div>
        
        <div className="flex-grow flex flex-col justify-start">
          {/* الوصف باللون الرمادي الفاتح (مثل الصورة) ليكون مريح في القراءة على الأسود */}
          <p className="text-gray-400 font-medium text-sm leading-relaxed text-center ">
            {project.shortDescription}
          </p>
          {/* الخط الفاصل بنفسجي شفاف */}
          <div className="h-[1px] bg-[#A855F7]/30 w-full mt-4"></div>
        </div>
      </div>
    </motion.div>
  ))}
</div>
      </div>
    </section>
  );
};