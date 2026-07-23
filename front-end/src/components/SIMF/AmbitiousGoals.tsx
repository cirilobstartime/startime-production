"use client";

import React, { useState, useEffect }  from "react";
import Image from "next/image";

import { useTranslations } from "next-intl";
import { motion, Variants } from "framer-motion";
import Modal from "@/components/modal/Modal";
import ContactModal from "../modal/ContactModal";

/**
 * SIMF "Ambitious Goals" banner (Figma node 9485:6026).
 *
 * Full-width rounded card: photo on one side, dark-purple gradient overlay,
 * left-aligned eyebrow + heading + lead.
 *
 * Tokens: overlay #1f172d, eyebrow #d7bbf0, lead #ccc4d8, white heading.
 * Roboto — H2 Bold 40px.
 */

interface AmbitiousGoalsProps {
  locale?: string;
  eyebrow?: string;
  heading?: string;
  lead?: string;
  /** Background photo (add e.g. /simf-goals.jpg to /public). */
  imageSrc?: string;
  imageAlt?: string;
  moreLabel?: string;
}

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export default function AmbitiousGoals({
  locale = "en",
  eyebrow,
  heading,
  lead,
  //imageSrc = "/simf-goals.jpg",
  imageSrc = "/ambitious-goals-3.webp",
  imageAlt = "Delegates at the Saudi International Maritime Forum",
  moreLabel,
}: AmbitiousGoalsProps) {
  const isAr = locale === "ar";
  const reasonsAr = [
    {
      number: "01",
      title: "حضور مؤسسي أمام الجهات الأكثر تأثيرًا في منظومات الأمن البحري العالمي",
      description:
        "يتيح الملتقى للراعي مركزًا متقدمًا أمام متخذي القرار بالجهات الحكومية والشركات العالمية التي تقود الحوار حول قضايا الأمن البحري وسلاسل الإمداد؛ ويمنحه فرصة مباشرة للتواصل مع الجهات الأكثر تأثيرًا في مجالات حماية الممرات البحرية واستدامة تدفق الطاقة وتطوير التقنيات البحرية المتقدمة.",
    },
    {
      number: "02",
      title: "الوصول الذكي إلى مسار اجتماعات الأعمال الحكومية كقناة محفزة للتعاون وبناء الشراكات",
      description:
        "تُعد اجتماعات الأعمال الحكومية B2G أحد أهم فعاليات الملتقى المخصصة حصرًا للرعاة، والتي تناقش الفرص وتُبنى الشراكات وتفتح قنوات التعاون مع أصحاب المصلحة؛ وبالتالي فإن رعاية الملتقى تمنح الرعاة أولوية النفاذ إلى هذا المسار التنفيذي عالي القيمة والأثر؛ وتعزز فرص الوصول إلى صفقات ناجحة وعالية القيمة.",
    },
    {
      number: "03",
      title: "ارتباط العلامة التجارية بقطاع استراتيجي يشهد توسعًا عالميًا متسارعًا",
      description:
        "يشهد قطاع الأمن البحري – بما يشمل حماية الكابلات البحرية، والأنظمة غير المأهولة، والأمن السيبراني البحري، واستدامة سلاسل الإمداد – توسعًا عالميًا مدفوعًا بالتحولات الجيوسياسية والتقنية؛ وبالتالي فان رعاية الملتقى ستشكل فرصة للتموضع داخل قطاع يعيد رسم موازين القوى الاقتصادية.",
    },
    {
      number: "04",
      title: "تعزيز النفاذ إلى منظومة مترابطة معنية بأحد أهم القضايا العالمية المعاصرة",
      description:
        "يجمع الملتقى منظومة واسعة من الجهات المعنية بأمن الطاقة وحماية الممرات البحرية والتقنيات غير المأهولة والأمن السيبراني البحري؛ فرعاية الملتقى ستمنح الراعي النفاذ إلى هذه المنظومة المترابطة، والتفاعل مع خبرائها، وفهم توجهاتها، واستكشاف فرص التعاون والشراكات الاستراتيجية الواعدة.",
    },
  ];

  const reasonsEn = [
    {
      number: "01",
      title: "Institutional Presence Before the Most Influential Entities in Global Maritime Security Ecosystems",
      description: "The Forum provides the Sponsor with a prominent position before decision-makers from government entities and global companies leading the dialogue on maritime security and supply-chain issues. It also provides the Sponsor with a direct opportunity to engage with the most influential entities in the fields of maritime corridor protection, the sustainability of energy flows, and the development of advanced maritime technologies.",
    },
    {
      number: "02",
      title: "Strategic Access to the Business-to-Government Meetings Track as a Catalyst for Cooperation and Partnership Building ",
      description: "Business-to-Government meetings B2G, are among the Forum’s most important activities and are exclusively allocated to participating Sponsors. These meetings provide a platform where opportunities are discussed, partnerships are built, and channels of cooperation are established with stakeholders. Accordingly, sponsoring the Forum provides Sponsors with priority access to this high-value and high-impact executive track and strengthens their opportunities to secure successful, high-value transactions.",
    },
    {
      number: "03",
      title: "Associating the Brand with a Strategic Sector Experiencing Accelerated Global Expansion",
      description: "The maritime security sector, including subsea cable protection, unmanned systems, maritime cybersecurity, and supply-chain sustainability, is experiencing global expansion driven by geopolitical and technological transformations. Accordingly, sponsoring the Forum will provide an opportunity to establish a position within a sector that is reshaping the balance of economic power.",
    },
    {
      number: "04",
      title: "Strengthening Access to an Interconnected Ecosystem Concerned with One of the Most Important Contemporary Global Issues",
      description: "The Forum brings together a broad ecosystem of entities concerned with energy security, maritime corridor protection, unmanned technologies, and maritime cybersecurity. Sponsoring the Forum will provide the Sponsor with access to this interconnected ecosystem, engagement with its experts, an understanding of its directions, and the opportunity to explore promising strategic cooperation and partnership opportunities.",
    },
  ];

  const reasons = isAr ? reasonsAr : reasonsEn;

  const align = isAr ? "text-right" : "text-left";
  const itemsAlign = isAr ? "items-end" : "items-start";
  const t = useTranslations("SIMF.ambitiousgoals");

  const eyebrowText = eyebrow ?? t("eyebrow");
  const headingText = heading ?? t("heading");
  const leadText = lead ?? t("lead");
  const moreLabelText = moreLabel ?? t("moreLabel");

  const [open, setOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

<>
    {/* <button onClick={() => setOpen(true)}>
        Open Modal
    </button> */}

    {/* <Modal
        open={open}
        onClose={() => setOpen(false)}
    >
        <div className="p-16">
            Hello World
        </div>
    </Modal> */}
</>

  return (
    <section dir={isAr ? "rtl" : "ltr"} className="w-full bg-[#f7f8fb]" style={{ backgroundColor: "#F7F8FB" }}>
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:px-20 md:py-20">

        {/* new content */}
        <div className="flex flex-col items-center gap-10 w-full max-w-[1280px] flex-grow">
          {/* content */}
          <div className="flex w-full max-w-[760px] flex-col items-center gap-4">
          <h2 className="w-full max-w-[720px] text-center font-['Noto Kufi Arabic'] text-[40px] font-bold leading-[45px] text-black">
            {isAr ? "4 أسباب تدعو للرعاية" : "4 Reasons to Become a Sponsor"}
          </h2>

          <p className="w-full max-w-[500px] text-center font-['Noto Kufi Arabic'] text-[18px] leading-8 text-slate-600">
            {isAr
              ? "قادة وخبراء دوليون لاستشراف مستقبل الأمن البحري"
              : "International leaders and experts shaping the future of maritime security."}
          </p>
        </div>

          <motion.div
            className="grid w-full max-w-[1280px] grid-cols-1 gap-6 md:grid-cols-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.number}
                variants={cardVariants}
                className={`
                  group
                  flex
                  flex-col
                  gap-6
                  rounded-3xl
                  bg-[#EDF4F8]/70
                  p-7
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-xl
                  ${itemsAlign}
                `}
              >
                <p
                  className={`
                    w-full
                    font-['Noto Kufi Arabic']
                    text-4xl
                    font-extrabold
                    leading-none
                    text-[#E8C060]
                    ${align}
                  `}
                >
                  {reason.number}
                </p>

                <h3
                  className={`
                    w-full
                    font-['Noto Kufi Arabic']
                    text-[19px]
                    font-bold
                    leading-[125%]
                    text-black
                    transition-colors
                    duration-300
                    group-hover:text-[#498FBD]
                    ${align}
                  `}
                >
                  {reason.title}
                </h3>

                <p
                  className={`
                    w-full
                    font-['Noto Kufi Arabic']
                    text-[15px]
                    leading-[155%]
                    text-[#244A77]
                    ${align}
                  `}
                >
                  {reason.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <div className="flex justify-center w-full mt-10">
            <button onClick={() => setIsContactOpen(true)} className="inline-flex h-12 items-center justify-center rounded-full border border-[#BBC7D5] bg-[#498FBD] px-6 py-3 text-white transition-colors hover:bg-[#3C7DA9] font-extrabold">
              {isAr ? "سجل رعايتك الان" : "Become a Sponsor"}
            </button>
          </div>

        </div>
        {/* wnd of new content */}
            {/* Modal here */}
            <ContactModal
              isOpen={isContactOpen}
              onClose={() => setIsContactOpen(false)}
            />
        
      </div>
    </section>
  );
}
