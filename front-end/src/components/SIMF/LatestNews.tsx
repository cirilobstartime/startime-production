"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface NewsItem {
  category: string;
  date: string;
  title: string;
  excerpt: string;
  newscontent: string;
  readmoretext?: string;
  href?: string;
  imageSrc?: string;
  imageAlt?: string;
}

interface LatestNewsProps {
  locale?: string;
  eyebrow?: string;
  heading?: string;
  lead?: string;
  readMoreLabel?: string;
  viewAllLabel?: string;
  viewAllHref?: string;
  items?: NewsItem[];
}

const DEFAULT_ITEMS: NewsItem[] = [
  {
    category: "",
    date: "Jun 2026",
    title:
      "Seabed Security and Maritime Supply Chains in a Critically Changing World",
    excerpt:
      "Key Strategic Themes Addressed by the 4th Saudi International Maritime Forum",
    "newscontent": "Riyadh is preparing to host the fourth edition of the Saudi International Maritime Forum from 23 to 25 November 2026, under the patronage of His Royal Highness Prince Khalid bin Salman bin Abdulaziz Al Saud, Minister of Defense, and organized by the Royal Saudi Naval Forces. The forum convenes at a time when the global maritime environment is undergoing unprecedented shifts, with rising threats targeting deep sea infrastructure and global supply chains. The fourth edition introduces a comprehensive program and agenda that reflect the scale of challenges facing the world's seas amid rapidly evolving geopolitical and technological dynamics. \n\nThis year's theme, \"The Future of Seabed Security & Maritime Supply Chains in a Critically Changing World,\" underscores the growing international recognition of the importance of deep sea infrastructure, from undersea communication cables carrying more than 95% of the world's data, to energy pipelines that form the backbone of global trade. As risks targeting these critical systems continue to escalate, the forum emerges as a global platform bringing together experts and decision makers from dozens of countries to explore the future of maritime security through an integrated perspective that connects the surface to the depths, and energy to data and trade. \n\nThe forum's agenda features advanced discussions on the shifting global strategic environment and its impact on the security of maritime supply chains, particularly as international crises place mounting pressure on trade routes that transport nearly 80% of the world's goods. It also examines the vulnerabilities facing subsea energy lines and their implications for global economic stability, at a time when recent disruptions have exposed the fragility of supply systems and driven shipping costs up by more than 350% when a single corridor is blocked. \n\nFurther discussions will address the protection of the seabed and deep sea digital infrastructure, which has become an essential component of national security. The forum highlights the challenges facing undersea cables stretching more than 1.4 million kilometers, and the cyber risks that threaten global communications and financial markets. It also explores the role of artificial intelligence and unmanned systems in strengthening deterrence, surveillance, and the protection of critical infrastructure in the depths, amid growing global reliance on smart technologies in maritime operations. \n\nThe fourth edition represents a unique opportunity for government entities, military organizations, private sector leaders, and international technology institutions to contribute to a shared vision for the future of maritime security. It provides a platform for building new partnerships that enhance the resilience of supply chains and support the stable flow of energy, data, and trade in a rapidly changing world. The forum also serves as an ideal venue for showcasing advanced maritime technologies, exchanging expertise, and engaging in a global dialogue that redefines maritime security in alignment with the ambitions of Saudi Vision 2030. \n\nParticipation in this event offers an exceptional opportunity for stakeholders in maritime security, energy, communications, and logistics to engage in strategic discussions and develop practical solutions to the growing challenges facing deep sea infrastructure and global supply chains. With delegations from more than forty countries expected to attend, the forum opens the door to broad international cooperation that strengthens the stability of the seas and supports the future of the global economy.",
    imageSrc: "/news-images/1.1.webp",
    imageAlt:
      "Patronage confirmed for the 4th Saudi International Maritime Forum",
  },
  // {
  //   category: "Agenda",
  //   date: "Mar 2026",
  //   title:
  //     "In Continuation of Its Strategic Partnership with the Royal Saudi Naval Forces",
  //   excerpt:
  //     "Startime Events Signs the Organizing Contract for the 4th Saudi International Maritime Forum – November 2026",
  //   newscontent: "",
  //   imageSrc: "/news-image.webp",
  //   imageAlt: "Five strategic pillars set the 2026 agenda",
  // },
  // {
  //   category: "Partners",
  //   date: "November 2025",
  //   title:
  //     "Launch of Preparatory Activities for the 4th Saudi International Maritime Forum – November 2026",
  //   excerpt:
  //     "The Supreme Organizing Committee of the Saudi International Maritime Forum announced the commencement of preparatory activities for the fourth edition of the Forum",
  //   newscontent: "",
  //   imageSrc: "/news-image.webp",
  //   imageAlt:
  //     "Sovereign and global defense partners join the platform",
  // },
];

const DEFAULT_ITEMS_AR: NewsItem[] = [
  {
    category: "",
    date: "يونيو ٢٠٢٦",
    title: "مستقبل أمن قاع البحار وسلاسل الإمداد في بيئة عالمية متغيرة",
    excerpt:
      "موضوعات حيوية يناقشها الملتقى البحري السعودي الدولي الرابع ضمن أجندة أعماله",
    newscontent: "تستعد العاصمة الرياض لاستضافة النسخة الرابعة من الملتقى البحري السعودي الدولي تحت رعاية صاحب السمو الملكي الأمير خالد بن سلمان بن عبدالعزيز آل سعود، وزير الدفاع، وتنظيم القوات البحرية الملكية السعودية، خلال الفترة من الثالث والعشرين إلى الخامس والعشرين من نوفمبر 2026، في وقت يشهد فيه العالم تحولات غير مسبوقة في البيئة البحرية، وتناميًا في التهديدات التي تطال البنية التحتية العميقة وسلاسل الإمداد العالمية؛ ويضم الملتقى في نسخته الرابعة برنامجًا وأجندة أعمال تعكس حجم التحديات التي تواجه البحار في عصر تتسارع فيه المتغيرات الجيوسياسية والتقنية.\n\nوتحمل النسخة الرابعة عنوان \"مستقبل أمن قاع البحار وسلاسل الإمداد في بيئة عالمية متغيرة\"، وهو عنوان يعكس إدراكًا دوليًا متزايدًا لأهمية البنية التحتية الممتدة في الأعماق، من كابلات الاتصالات البحرية التي تحمل أكثر من 95% من بيانات العالم، إلى خطوط الطاقة التي تشكّل شريانًا رئيسيًا لحركة التجارة العالمية؛ وفي ظل ارتفاع مستوى المخاطر التي تستهدف هذه المنظومات، يبرز الملتقى كمنصة دولية تجمع الخبراء وصناع القرار من عشرات الدول لمناقشة مستقبل الأمن البحري بمنظور شامل يربط بين السطح والأعماق، وبين الطاقة والبيانات والتجارة.\n\nوتتضمن أجندة أعمال الملتقى هذا العام نقاشات متقدمة حول التحولات في البيئة الاستراتيجية العالمية وتأثيرها على أمن سلاسل الإمداد البحرية، وما تفرضه الأزمات الدولية من ضغوط على حركة التجارة التي يعتمد عليها العالم في نقل 80% من السلع؛ كما يستعرض الملتقى المخاطر التي تطال خطوط الطاقة الممتدة تحت سطح البحر، وتأثيرها على استقرار الاقتصاد العالمي، في وقت كشفت فيه الأزمات الأخيرة هشاشة منظومات الإمداد وارتفاع تكاليف الشحن بأكثر من 350% عند تعطل ممر واحد فقط.\n\nويمتد النقاش ليشمل حماية قاع البحار والبنية الرقمية العميقة التي أصبحت جزءًا من الأمن الوطني للدول، مع التركيز على التحديات التي تواجه الكابلات البحرية التي تمتد لأكثر من 1.4 مليون كيلومتر، وما يرتبط بها من مخاطر سيبرانية تستهدف تعطيل الاتصالات العالمية وحركة الأسواق المالية؛ كما يتناول الملتقى دور الذكاء الاصطناعي والأنظمة غير المأهولة في تعزيز قدرات الردع والمراقبة وحماية البنية التحتية الممتدة في الأعماق، في ظل توسع الاعتماد العالمي على التقنيات الذكية في بيئة العمليات البحرية.\n\nويمثل انعقاد النسخة الرابعة فرصة فريدة للجهات الحكومية والعسكرية والقطاع الخاص والمؤسسات التقنية الدولية للمشاركة في صياغة رؤية مشتركة لمستقبل الأمن البحري، وبناء شراكات جديدة تعزز مرونة سلاسل الإمداد، وتدعم استقرار تدفق الطاقة والبيانات والتجارة في عالم سريع التغيرات؛ كما يشكل الملتقى منصة مثالية لاستعراض أحدث التقنيات البحرية، وتبادل الخبرات، والانخراط في حوار دولي يعيد تعريف أمن البحار بمنظور شامل يتسق مع طموحات رؤية السعودية 2030.\n\nويُعد حضور هذا الحدث فرصة استثنائية للجهات المعنية بالأمن البحري، والطاقة، والاتصالات، واللوجستيات، للمشاركة في نقاشات استراتيجية وصياغة حلول عملية تعالج التحديات المتنامية التي تواجه البنية التحتية البحرية وسلاسل الإمداد العالمية؛ ومع مشاركة وفود من أكثر من أربعين دولة، يفتح الملتقى الباب أمام تعاون دولي واسع يعزز استقرار البحار ويدعم مستقبل الاقتصاد العالمي.",
    imageSrc: "/news-images/1.webp",
    imageAlt:
      "تأكيد رعاية النسخة الرابعة من الملتقى البحري السعودي الدولي",
  },
  // {
  //   category: "الأجندة",
  //   date: "مارس ٢٠٢٦",
  //   title:
  //     "إمتدادًا لشراكتها الاستراتيجية مع القوات البحرية الملكية السعودية",
  //   excerpt:
  //     "ستارتايم توقع عقد تنظيم الملتقى البحري السعودي الدولي الرابع – نوفمبر 2026",
  //   newscontent: "",
  //   imageSrc: "/news-image.webp",
  //   imageAlt: "خمسة محاور استراتيجية تحدّد أجندة ٢٠٢٦",
  // },
  // {
  //   category: "شركاء",
  //   date: "فبراير ٢٠٢٦",
  //   title:
  //     "انطلاق الأعمال التحضيرية لإقامة الملتقى البحري السعودي الدولي الرابع – نوفمبر 2026",
  //   excerpt:
  //     "أعلنت اللجنة العليا المنظمة للملتقى البحري السعودي الدولي عن بدء الأعمال التحضيرية لانعقاد النسخة الرابعة من الملتقى البحري السعودي الدولي، والمقرر انعقاده تحت رعاية كريمة من لدن صاحب السمو الملكي الأمير خالد بن سلمان بن عبدالعزيز آل سعود، وزير الدفاع، وبإشراف وزارة الدفاع وتنظيم القوات البحرية الملكية السعودية؛ بالتعاون التنظيمي مع شركة ستارتايم إيفينتس؛ وذلك خلال الفترة من 23 إلى 25 نوفمبر 2026 في فندق ومركز المؤتمرات سوفيتيل الرياض.",
  //   newscontent: "",
  //   imageSrc: "/news-image.webp",
  //   imageAlt:
  //     "شركاء دفاع سياديون وعالميون ينضمون إلى المنصة",
  // },
];

function ArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

const fadeUp: Variants = {
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

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};


export default function LatestNews({
  locale = "en",
  eyebrow,
  heading,
  lead,
  readMoreLabel,
  viewAllLabel,
  viewAllHref = "#news",
  items,
}: LatestNewsProps) {
  const isAr = locale === "ar";
  const t = useTranslations("SIMF.latestnews");
  
  const eyebrowText = eyebrow ?? t("eyebrow");
  const headingText = heading ?? t("heading");
  const leadText = lead ?? t("lead");
  const readMoreLabelText = readMoreLabel ?? t("readMoreLabel");
  const viewAllLabelText = viewAllLabel ?? t("viewAllLabel");

  const resolvedItems = items ?? (isAr ? DEFAULT_ITEMS_AR : DEFAULT_ITEMS);

  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  return (
    <>
    {/* <section dir={isAr ? "rtl" : "ltr"} className="w-full bg-[#faf9fb]" style={{ backgroundColor: "#FAF9FB", background: "linear-gradient(0deg, rgba(230, 242, 251, 0.64), rgba(230, 242, 251, 0.64)), #FFFFFF" }}> */}
    <section dir={isAr ? "rtl" : "ltr"} className="w-full" style={{ background: "linear-gradient(180deg, #EAF2FA 0%, #DCEAF7 100%)" }}>
      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 md:px-20 md:py-24">
        {/* Header */}
        <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          {/* <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5b4180]">
            {eyebrowText}
          </p> */}
          <h2 className="mt-3 text-3xl font-bold leading-tight text-[#111827] md:text-[40px]">
            {headingText}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-[#4b5563] md:text-lg">
            {leadText}
          </p>
        </motion.div>

        {/* News grid */}
        <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {resolvedItems.map((item) => (
            <motion.article
                variants={fadeUp}
                key={item.title}
                className="
                    group
                    flex
                    flex-col
                    overflow-hidden
                    rounded-2xl
                    bg-white
                    shadow-[0_10px_30px_-15px_rgba(90,66,128,0.25)]
                    transition-all
                    duration-300
                    hover:-translate-y-2
                    hover:shadow-xl
                "
            >
              {/* Image */} 
              {/* changed from aspect-[410/200] to aspect-[16/9] to fit the image in the container */}
              <div className="relative aspect-[16/9] w-full bg-gradient-to-br from-[#e9edf1] to-[#dfe6f0]">
                {item.imageSrc && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.imageSrc}
                    alt={item.imageAlt ?? item.title}
                    className="
                        absolute
                        inset-0
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-700
                        ease-out
                        group-hover:scale-110
                    "
                  />
                )}
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-[#6b7280]">
                  {/* {item.category} · {item.date} */} {item.date}
                </p>
                <h3 className="mt-4 text-xl font-bold leading-7 text-[#111827]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#4b5563]">
                  {item.excerpt}
                </p>

                {/* <a
                  href={item.href ?? "#"}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[#5b4180] transition-colors hover:text-[#7d23ce]"
                >
                  {readMoreLabelText}
                  <ArrowUpRightIcon
                      className={`
                          transition-transform
                          duration-300
                          group-hover:translate-x-1
                          ${isAr ? "-scale-x-100 group-hover:-translate-x-1" : ""}
                      `}
                  />
                </a> */}
                <button
                  type="button"
                  onClick={() => setSelectedNews(item)}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[#5b4180] transition-colors hover:text-[#7d23ce]"
                >
                  {readMoreLabelText}
                  <ArrowUpRightIcon
                    className={`transition-transform duration-300 group-hover:translate-x-1 ${isAr ? "-scale-x-100 group-hover:-translate-x-1" : ""}`}
                  />
                </button>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* View all */}
        <div className="mt-12 flex justify-center invisible">
          <a
            href={viewAllHref}
            className="inline-flex items-center gap-2 text-base font-medium text-[#5b4180] transition-colors hover:text-[#7d23ce]"
          >
            {viewAllLabelText}
            <ArrowUpRightIcon className={isAr ? "-scale-x-100" : ""} />
          </a>
        </div>
      </div>
    </section>

    <AnimatePresence>
     {selectedNews && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedNews(null)}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        />

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-white shadow-2xl"
        >
          {selectedNews.imageSrc && (
            <div className="relative h-64 w-full">
              <img
                src={selectedNews.imageSrc}
                alt={selectedNews.imageAlt ?? selectedNews.title}
                className="h-full w-full object-cover"
              />

              <button
                onClick={() => setSelectedNews(null)}
                className="absolute top-4 right-4 rounded-full bg-black/50 p-2 text-white hover:bg-black"
              >
                <X size={20} />
              </button>
            </div>
          )}

          <div className="p-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#5A417F]">
              {selectedNews.category} · {selectedNews.date}
            </p>

            <h2 className="mt-3 text-3xl font-bold text-[#111827]">
              {selectedNews.title}
            </h2>

            <p className="mt-6 whitespace-pre-line leading-8 text-gray-700">
              {selectedNews.excerpt}
            </p>

            <p className="mt-6 whitespace-pre-wrap leading-8 text-gray-700">
              {selectedNews.newscontent}
            </p>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
    </>
  );
}
