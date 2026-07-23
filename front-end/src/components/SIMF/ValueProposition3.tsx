import Image from "next/image";
import { useLocale } from "next-intl";

interface ValuePropositionProps {
  locale?: string;
}

const valueItems = [
  {
    image: "/valueproposition3-img2.webp",
    title: "أمن قاع البحار والبنية التحتية الرقمية",
    description:
      "استعراض تحديات حماية الكابلات البحرية والأنظمة الرقمية في الأعماق، وتعزيز الأمن السيبراني البحري، ودور الدول في حماية الاقتصاد الرقمي العالمي المعتمد على البنية التحتية تحت سطح البحر.",
  },
  {
    image: "/valueproposition3-img1.webp",
    title: "سلاسل الإمداد البحرية والبنية التحتية اللوجستية",
    description:
      "بحث مستقبل التجارة البحرية ورفع مرونة سلاسل الإمداد وتعزيز كفاءة الموانئ والممرات البحرية عبر التقنيات الحديثة لضمان استدامة تدفق السلع عالميًا.",
  },
  {
    image: "/valueproposition3-img3.webp",
    title: "أمن سلاسل إمداد الطاقة",
    description:
      "تركيز على حماية منظومات الطاقة الممتدة عبر البحار، من خطوط وأنابيب النفط والغاز إلى البنية التحتية تحت السطح، في ظل تصاعد التهديدات الجيوسياسية وأهمية الممرات البحرية الحيوية.",
  },
];

const valueItemsEn = [
  {
    image: "/valueproposition3-img2.webp",
    title: "Seabed Security and Digital Infrastructure",
    description:
      "Examining the challenges of protecting subsea cables and digital infrastructure, strengthening maritime cybersecurity, and highlighting the role of nations in safeguarding the global digital economy, which relies on subsea infrastructure.",
  },
  {
    image: "/valueproposition3-img1.webp",
    title: "Maritime Supply Chain Security and Logistics Infrastructure",
    description:
      "Exploring the future of maritime trade, strengthening supply chain resilience, and enhancing the efficiency of ports and maritime corridors through advanced technologies to ensure the sustainable global flow of goods.",
  },
  {
    image: "/valueproposition3-img3.webp",
    title: "Energy Supply Chain Security",
    description:
      "Focusing on protecting energy systems extending across the seas, from oil and gas pipelines to subsea infrastructure, amid escalating geopolitical threats and the critical importance of vital maritime corridors.",
  },
];

export default function ValueProposition({
    locale = "en",
  }: ValuePropositionProps) {
    const isAr = locale === "ar";

    const items = isAr ? valueItems : valueItemsEn;

    const heading = isAr
      ? "برنامج الملتقى"
      : "Forum Program";

    const description = isAr
      ? "تعزيز منظومة الأمن البحري بما يدعم الجهود الدولية لحماية قاع البحار ورفع كفاءة سلاسل إمداد الطاقة والتجارة والمساهمة في تحقيق استقرار الاقتصاد العالمي"
      : "Strengthening the maritime security ecosystem by supporting international efforts to safeguard the seabed, enhance the efficiency of energy and trade supply chains, and contribute to global economic stability";

  return (
    <section
      className="
        relative
        isolate
        overflow-hidden
        bg-[linear-gradient(305.49deg,#193050_0.04%,#396F9B_99.97%)]
        px-5
        py-16
        md:px-20
      "
    >
      {/* Wave Overlay */}
      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          h-[515px]
          w-full
          bg-[linear-gradient(180deg,rgba(199,220,235,0)_0%,#C7DCEB_100%)]
          opacity-[0.04]
          mix-blend-soft-light
        "
      />

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          max-w-[1280px]
          flex-col
          items-center
          gap-12
        "
      >
        {/* Header */}
        <div
          className="
            flex
            max-w-[760px]
            flex-col
            items-center
            gap-3
            text-center
          "
        >
          <h2
            className="
              font-['Noto Kufi Arabic']
              text-[32px]
              font-bold
              leading-[56px]
              text-white
              md:text-[40px]
            "
          >
            {heading}
          </h2>

          <p
            className="
              max-w-[640px]
              font-['Noto Kufi Arabic']
              text-[16px]
              leading-8
              text-[#BBC7D5]
              md:text-[18px]
            "
          >
            {description}
          </p>
        </div>


        {/* Cards */}
        <div
          className="
            grid
            w-full
            grid-cols-1
            gap-4
            md:grid-cols-3
          "
          dir={isAr ? "rtl" : "ltr"}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className={`
                group
                flex
                flex-col
                transition-all
                duration-500
                hover:-translate-y-2
                ${isAr ? "items-end" : "items-start"}
              `}
            >
              {/* Image */}
              <div
                className="
                  relative
                  h-[400px]
                  w-full
                  overflow-hidden
                  rounded-t-lg
                "
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="
                      object-cover
                      transition-all
                      duration-700
                      ease-out
                      group-hover:scale-110
                      group-hover:brightness-105
                  "
                />
              </div>


              {/* Text Section */}
              <div
                className={`
                  flex
                  min-h-[200px]
                  w-full
                  flex-col
                  pb-[50px]
                  ${isAr ? "border-r" : "border-l"}
                  border-[#BBC7D5]
                `}
              >
                <h3
                  className={`
                  w-full
                  px-6
                  pt-6
                  font-['Noto Kufi Arabic']
                  text-[16px]
                  font-normal
                  leading-[26px]
                  tracking-[2.5px]
                  text-white
                  uppercase
                  ${isAr ? "text-right" : "text-left"}
                `}
                >
                  {item.title}
                </h3>

                <p
                  className={`
                  w-full
                  px-6
                  pt-3
                  font-['Noto Kufi Arabic']
                  text-[14px]
                  leading-[22px]
                  tracking-[0.8px]
                  text-white
                  transition-colors
                  duration-300
                  group-hover:text-[#00AEEF]
                  ${isAr ? "text-right" : "text-left"}
                `}
                >
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>


        {/* Bottom CTA (hidden in Figma desktop) */}
        <div className="hidden">
          <button
            className="
              flex
              items-center
              gap-2
              pb-4
              text-xs
              uppercase
              tracking-[2px]
              text-white
            "
          >
            Inspiring Greatness
          </button>
        </div>

      </div>
    </section>
  );
}