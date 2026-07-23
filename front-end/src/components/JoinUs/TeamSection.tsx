"use client";
import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

const STRAPI_BASE_URL = "https://startime.sa";

interface TeamMember {
  id: number;
  name: string;
  job_title: string;
  description: string;
  imageUrl: string;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

export const TeamSection = () => {
  const locale = useLocale();
  const isAr = locale === "ar";
  
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const res = await fetch(
          `${STRAPI_BASE_URL}/api/join-us-team-sliders?populate[banner][populate]=*&locale=${locale}`
        );
        const result = await res.json();

        if (result?.data?.[0]?.banner) {
          const formattedMembers = result.data[0].banner.map((item: any) => ({
            id: item.id,
            name: item.name,
            job_title: item.job_title,
            description: item.description,
            imageUrl: item.image?.url ? `${STRAPI_BASE_URL}${item.image.url}` : ""
          }));
          setMembers(formattedMembers);
        }
      } catch (error) {
        console.error("Error fetching Team data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, [locale]);

  if (loading) return null;

  return (
    <section className="w-full bg-black py-32 px-6" dir={isAr ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {members.map((member, idx) => (
            <motion.div
              key={member.id}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              className="flex flex-col group h-full"
            >
              {/* 1. منطقة الصورة */}
              <div className="relative aspect-[4/5] overflow-hidden bg-[#222]">
                {member.imageUrl && (
                  <Image 
                    src={member.imageUrl} 
                    alt={member.name} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
              </div>

              {/* 2. منطقة المحتوى */}
              <div className="bg-[#1A1A1A] p-8 flex flex-col items-center flex-grow border border-[#262626] shadow-2xl">

                {/* الاسم */}
                <h4 className="text-[#5A417F] font-black text-2xl text-center uppercase  w-full mb-1">
                  {member.name}
                </h4>

                {/* المسمى الوظيفي */}
                <p className="text-gray-400 font-bold text-xs text-center uppercase tracking-[0.2em] mb-6">
                  {member.job_title}
                </p>

                {/* الوصف */}
                <p className="text-gray-400 text-sm md:text-base leading-relaxed font-medium border-t border-[#262626] pt-6 px-2">
                  "{member.description}"
                </p>

                {/* لمسة ديكورية في النهاية */}
                <div className="mt-auto pt-8 w-full flex justify-center gap-2">
                  <div className="h-[1px] bg-[#A855F7]/30 w-10"></div>
                  <div className="h-[1px] bg-[#A855F7]/30 w-2"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};