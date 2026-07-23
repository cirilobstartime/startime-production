"use client";

import React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { useCallback } from "react";

import { useTranslations } from "next-intl";

/**
 * SIMF "Ambitious Goals" banner (Figma node 9485:6026).
 *
 * Full-width rounded card: photo on one side, dark-purple gradient overlay,
 * left-aligned eyebrow + heading + lead.
 *
 * Tokens: overlay #1f172d, eyebrow #d7bbf0, lead #ccc4d8, white heading.
 * Roboto — H2 Bold 40px.
 */

interface KeyParticipantsProps {
  locale?: string;
  eyebrow?: string;
  heading?: string;
  lead?: string;
  /** Background photo (add e.g. /simf-goals.jpg to /public). */
  imageSrc?: string;
  imageAlt?: string;
  moreLabel?: string;
}


export default function KeyParticipants({
  locale = "en",
  eyebrow,
  heading,
  lead,
  //imageSrc = "/simf-goals.jpg",
  imageSrc = "/ambitious-goals-3.webp",
  imageAlt = "Delegates at the Saudi International Maritime Forum",
  moreLabel,
}: KeyParticipantsProps) {
  const isAr = locale === "ar";
  const t = useTranslations("SIMF.ambitiousgoals");

  const eyebrowText = eyebrow ?? t("eyebrow");
  const headingText = heading ?? t("heading");
  const leadText = lead ?? t("lead");
  const moreLabelText = moreLabel ?? t("moreLabel");
  const participantsAr = [
    {
      image: "/speakers/speaker1-1.webp",
      name: "معالي الفريق الأول الركن فياض بن حامد الرويلي",
      title: "رئيس هيئة الأركان العامة",
      country: "Saudi Arabia",
      flag: "/flags/SA.svg",
    },
    {
      image: "/speakers/speaker3-1.webp",
      name: "معالي الفريق الركن محمد بن عبدالرحمن الغريبي",
      title: "رئيس أركان القوات البحرية الملكية السعودية",
      country: "Saudi Arabia",
      flag: "/flags/SA.svg",
    },
    {
      image: "/speakers/speaker2-1.webp",
      name: "معالي الفريق الركن فهد بن عبدالله الغفيلي",
      title: "نائب رئيس هيئة الأركان العامة",
      country: "Saudi Arabia",
      flag: "/flags/SA.svg",
    },


    {
      image: "/speakers/1st-batch/Admiral Prof. Tomasz.webp",
      name: "أدميرال بروفيسور توماش ريزارد شوبريخت",
      title: "الأكاديمية البحرية البولندية، قائد بولندا",
      country: "Poland",
      flag: "/flags/PL.svg",
    },
    // {
    //   image: "/speaker.png",
    //   name: "د. فهد بن ساعد العرابي الحارثي",
    //   title: "رئيس مركز أسبار للدراسات (عضو مجلس الشورى سابقًا)",
    //   country: "Saudi Arabia",
    //   flag: "/flags/SA.svg",
    // },
    {
      image: "/speakers/1st-batch/Prof. Christina Schori.webp",
      name: "بروفيسور كريستينا شوري ليانغ",
      title: "مركز جنيف للسياسات الأمنية",
      country: "Switzerland",
      flag: "/flags/CH.svg",
    },
    {
      image: "/speakers/1st-batch/Sugio Takahashi.webp",
      name: "سوجيو تاكاهاشي",
      title: "مدير قسم الدفاع بالمعهد الوطني الياباني للدراسات الدفاعية",
      country: "Japan",
      flag: "/flags/JP.svg",
    },
    {
      image: "/speakers/1st-batch/Major General Fahad Hamad Al-Otaibi.webp",
      name: "اللواء فهد حمد العتيبي",
      title: "مدير مركز الدراسات الاستراتيجية الدولية",
      country: "Saudi Arabia",
      flag: "/flags/SA.svg",
    },
    {
      image: "/speakers/1st-batch/Prof. Gurpreet Singh.webp",
      name: "بروفيسور غوربريت سينغ خورانا",
      title: "جامعة نالاندا، الهند",
      country: "India",
      flag: "/flags/IN.svg",
    },
    {
      image: "/speakers/1st-batch/Prof. Zaili Yang.webp",
      name: "بروفيسور زايلي يانغ",
      title: "جامعة ليفربول جون موريس، المملكة المتحدة",
      country: "Britain",
      flag: "/flags/GB.svg",
    },
    {
      image: "/speakers/1st-batch/Patalano Alessio.webp",
      name: "باتالانو أليسيو",
      title: "كينغز كوليدج لندن",
      country: "Britain",
      flag: "/flags/GB.svg",
    },


    // {
    //   image: "/speaker.png",
    //   name: "الأستاذ سعد القحطاني",
    //   title: "مركز الدراسات الاستراتيجية الدولية",
    //   country: "Saudi Arabia",
    //   flag: "/flags/SA.svg",
    // },
    // {
    //   image: "/speaker.png",
    //   name: "العميد سلمان الحربي",
    //   title: "جامعة الدفاع الوطني",
    //   country: "Saudi Arabia",
    //   flag: "/flags/SA.svg",
    // },

    // {
    //   image: "/speaker.png",
    //   name: "كريستيان مايكل بوغر",
    //   title: "جامعة كوبنهاغن، الدنمارك",
    //   country: "Germany",
    //   flag: "/flags/DE.svg",
    // },
    {
      image: "/speakers/3rd-batch/Dr. Ihsan Mohammed Bu Haliqa.webp",
      name: "د. إحسان محمد بوحليقة",
      title: "رئيس مركز جواثا الاستشاري (عضو مجلس الشورى سابقًا)",
      country: "Saudi Arabia",
      flag: "/flags/SA.svg",
    },
    {
      image: "/speakers/3rd-batch/Dr. Faisal Al-Saaq.webp",
      name: "د. فيصل الصعاق",
      title: "عميد كلية علوم البحار بجامعة جدة",
      country: "Saudi Arabia",
      flag: "/flags/SA.svg",
    },
    {
      image: "/speakers/3rd-batch/Prof. Sanjay Chaturvedi.webp",
      name: "بروفيسور سانجاي تشاتورفيدي",
      title: "جامعة جنوب آسيا، الهند",
      country: "India",
      flag: "/flags/IN.svg",
    },
    {
      image: "/speakers/3rd-batch/Abdulrahman Ibrahim Ali Al-Fuzai.webp",
      name: "عبدالرحمن إبراهيم علي الفزيع",
      title: "مركز البحرين للدراسات الاستراتيجية والدولية والطاقة (دراسات)",
      country: "Bahrain",
      flag: "/flags/BH.svg",
    },
    // {
    //   image: "/speaker.png",
    //   name: "د. أيمن بن صدقة فاضل",
    //   title: "جامعة جدة",
    //   country: "Saudi Arabia",
    //   flag: "/flags/SA.svg",
    // },


    // {
    //   image: "/speaker.png",
    //   name: "بروفيسور روبرت جيمس ماكلوفلين",
    //   title: "الجامعة الوطنية الأسترالية، أستراليا",
    //   country: "Australia",
    //   flag: "/flags/SA.svg",
    // },
    {
      image: "/speakers/2nd-batch/Commadore. John.webp",
      name: "كومودور جون أيتكن (متقاعد)",
      title: "البحرية الملكية البريطانية",
      country: "Britain",
      flag: "/flags/GB.svg",
    },
    {
      image: "/speakers/2nd-batch/Mike Constable.webp",
      name: "مايك كونستابل",
      title: "شركة إنفرا أناليتكس، سنغافورة",
      country: "New Zealand",
      flag: "/flags/NZ.svg",
    },
    {
      image: "/speakers/2nd-batch/Tareq bin Yousef Al-Naffouri.webp",
      name: "طارق بن يوسف النفوري",
      title: "جامعة الملك عبدالله للعلوم والتقنية",
      country: "Saudi Arabia",
      flag: "/flags/SA.svg",
    },
    {
      image: "/speakers/2nd-batch/Abdullah Yasir Atala.webp",
      name: "عبدالله ياسر أتالا",
      title: "مركز الدراسات الاستراتيجية والدولية",
      country: "Turkey",
      flag: "/flags/TR.svg",
    },
    {
      image: "/speakers/2nd-batch/Dr. Kashif Naseer Qureshi.webp",
      name: "د. كاشف ناصر",
      title: "جامعة ليمريك بجمهورية إيرلندا",
      country: "Pakistan",
      flag: "/flags/PK.svg",
    },
    // {
    //   image: "/speakers/2nd-batch/Dr.marios-Pangiotis.webp",
    //   name: "د. ماريوس بانجيوتيس",
    //   title: "أوصى المعالي بالتواصل معه وقد قبل الدعوة",
    //   country: "Greece",
    //   flag: "/flags/GR.svg",
    // },


    {
      image: "/speakers/5th-batch/Prof. Gary Com.webp",
      name: "بروفيسور غاري كورن",
      title: "مركز أمن أمريكي جديد",
      country: "America",
      flag: "/flags/US.svg",
    },
    {
      image: "/speakers/5th-batch/Prof. Chris Sadie.webp",
      name: "البروفيسورة كريس سادي",
      title: "مديرة مركز التميز السيبراني بجامعة أكسفورد",
      country: "Britain",
      flag: "/flags/GB.svg",
    },
    {
      image: "/speakers/5th-batch/Dr. Omaimah bint Omar Bamasq .webp",
      name: "د. أميمة بنت عمر بامسق",
      title: "وكيلة التمكين في الهيئة العامة للنقل",
      country: "Saudi Arabia",
      flag: "/flags/SA.svg",
    },
    // {
    //   image: "/speaker.png",
    //   name: "المقدم د. بندر العمري",
    //   title: "القوات البحرية الملكية السعودية",
    //   country: "Saudi Arabia",
    //   flag: "/flags/SA.svg",
    // },
    {
      image: "/speakers/5th-batch/Dogrul Mursel.webp",
      name: "دوغرول مرسل",
      title: "جامعة الدفاع الوطني التركية",
      country: "Turkey",
      flag: "/flags/TR.svg",
    },
    {
      image: "/speakers/5th-batch/Dr. Ibrahim Tariq Jaid.webp",
      name: "د. إبراهيم طارق جايد",
      title: "جامعة وادي فريزر، كندا",
      country: "Canada",
      flag: "/flags/CAN.svg",
    },
    {
      image: "/speakers/4th-batch/Dr. Basma Al-Buhairan.webp",
      name: "د. بسمة البحيران",
      title: "مدير مركز الثورة الصناعية الرابعة (المنتدى الاقتصادي العالمي) سابقًا",
      country: "Saudi Arabia",
      flag: "/flags/SA.svg",
    },
    {
      image: "/speakers/4th-batch/Prof. Lam Kook Yan.jpg.webp",
      name: "البروفيسور لام كوك يان",
      title: "نائب رئيس جامعة نانيانغ التكنولوجية في سنغافورة",
      country: "Singapore",
      flag: "/flags/SG.svg",
    },
    // {
    //   image: "/speaker.png",
    //   name: "عواطف بنت سالم بالعبيد",
    //   title: "جامعة جازان",
    //   country: "Saudi Arabia",
    //   flag: "/flags/SA.svg",
    // },
    {
      image: "/speakers/4th-batch/Mohamed Slim.webp",
      name: "محمد سليم العويني",
      title: "جامعة الملك عبدالله للعلوم والتقنية",
      country: "Canada",
      flag: "/flags/CAN.svg",
    },
    // {
    //   image: "/speaker.png",
    //   name: "العميد د. عيسى الفيفي",
    //   title: "القوات البحرية",
    //   country: "Saudi Arabia",
    //   flag: "/flags/SA.svg",
    // },
  ];

  const participantsEn = [
    {
      image: "/speakers/speaker1-1.webp",
      name: "His Excellency General Fayyadh bin Hamed Al-Ruwaili",
      title: "Chief of the General Staff",
      country: "Saudi Arabia",
      flag: "/flags/SA.svg",
    },
    {
      image: "/speakers/speaker3-1.webp",
      name: "His Excellency Lieutenant General Mohammed bin Abdulrahman Al-Gharibi",
      title: "Chief of Staff of the Royal Saudi Naval Forces",
      country: "Saudi Arabia",
      flag: "/flags/SA.svg",
    },
    {
      image: "/speakers/speaker2-1.webp",
      name: "His Excellency Lieutenant General Fahd bin Abdullah Al-Ghofaily",
      title: "Vice Chief of the General Staff",
      country: "Saudi Arabia",
      flag: "/flags/SA.svg",
    },
    


    {
      image: "/speakers/1st-batch/Admiral Prof. Tomasz.webp",
      name: "Admiral Prof. Tomasz Ryszard Szubrycht",
      title: "Polish Naval Academy, Leader of Poland",
      country: "Poland",
      flag: "/flags/PL.svg",
    },
    // {
    //   image: "/speaker.png",
    //   name: "Dr. Fahad bin Saad Al-Orabi Al-Harthi",
    //   title: "President of Asbar Center for Studies (Former Shura Council Member)",
    //   country: "Saudi Arabia",
    //   flag: "/flags/SA.svg",
    // },
    {
      image: "/speakers/1st-batch/Prof. Christina Schori.webp",
      name: "Prof. Christina Schori Liang",
      title: "Geneva Centre for Security Policy",
      country: "Switzerland",
      flag: "/flags/CH.svg",
    },
    {
      image: "/speakers/1st-batch/Sugio Takahashi.webp",
      name: "Sugio Takahashi",
      title: "Director of Defense Policy Division, Japan’s National Institute for Defense Studies",
      country: "Japan",
      flag: "/flags/JP.svg",
    },
    {
      image: "/speakers/1st-batch/Major General Fahad Hamad Al-Otaibi.webp",
      name: "Major General Fahad Hamad Al-Otaibi",
      title: "Director of the Center for International Strategic Studies",
      country: "Saudi Arabia",
      flag: "/flags/SA.svg",
    },
    {
      image: "/speakers/1st-batch/Prof. Gurpreet Singh.webp",
      name: "Prof. Gurpreet Singh Khurana",
      title: "Nalanda University, India",
      country: "India",
      flag: "/flags/IN.svg",
    },
    {
      image: "/speakers/1st-batch/Prof. Zaili Yang.webp",
      name: "Prof. Zaili Yang",
      title: "Liverpool John Moores University, UK",
      country: "Britain",
      flag: "/flags/GB.svg",
    },
    {
      image: "/speakers/1st-batch/Patalano Alessio.webp",
      name: "Patalano Alessio",
      title: "King's College London",
      country: "Britain",
      flag: "/flags/GB.svg",
    },


    // {
    //   image: "/speaker.png",
    //   name: "Mr. Saad Al-Qahtani",
    //   title: "Center for International Strategic Studies",
    //   country: "Saudi Arabia",
    //   flag: "/flags/SA.svg",
    // },
    // {
    //   image: "/speaker.png",
    //   name: "Brigadier General Salman Al-Harbi",
    //   title: "National Defense University ",
    //   country: "Saudi Arabia",
    //   flag: "/flags/SA.svg",
    // },

    // {
    //   image: "/speaker.png",
    //   name: "Christian Michael Buger",
    //   title: "University of Copenhagen, Denmark",
    //   country: "Germany",
    //   flag: "/flags/DE.svg",
    // },
    {
      image: "/speakers/3rd-batch/Dr. Ihsan Mohammed Bu Haliqa.webp",
      name: "Dr. Ihsan Mohammed Bu Haliqa",
      title: "President of Jawatha Consulting Center (Former Shura Council Member)",
      country: "Saudi Arabia",
      flag: "/flags/SA.svg",
    },
    {
      image: "/speakers/3rd-batch/Dr. Faisal Al-Saaq.webp",
      name: "Dr. Faisal Al-Saaq",
      title: "Dean of the Faculty of Marine Sciences, University of Jeddah",
      country: "Saudi Arabia",
      flag: "/flags/SA.svg",
    },
    {
      image: "/speakers/3rd-batch/Prof. Sanjay Chaturvedi.webp",
      name: "Prof. Sanjay Chaturvedi",
      title: "South Asian University, India ",
      country: "India",
      flag: "/flags/IN.svg",
    },
    {
      image: "/speakers/3rd-batch/Abdulrahman Ibrahim Ali Al-Fuzai.webp",
      name: "Abdulrahman Ibrahim Ali Al-Fuzai",
      title: "Bahrain Center for Strategic, International and Energy Studies (Derasat)",
      country: "Bahrain",
      flag: "/flags/BH.svg",
    },
    // {
    //   image: "/speaker.png",
    //   name: "Dr. Ayman bin Sidqah Fadel",
    //   title: "University of Jeddah",
    //   country: "Saudi Arabia",
    //   flag: "/flags/SA.svg",
    // },


    // {
    //   image: "/speaker.png",
    //   name: "Prof. Robert James McLaughlin ",
    //   title: "The Australian National University, Australia ",
    //   country: "Australia",
    //   flag: "/flags/SA.svg",
    // },
    {
      image: "/speakers/2nd-batch/Commadore. John.webp",
      name: "Commodore John Aitken (Retired)",
      title: "British Royal Navy ",
      country: "Britain",
      flag: "/flags/GB.svg",
    },
    {
      image: "/speakers/2nd-batch/Mike Constable.webp",
      name: "Mike Constable ",
      title: "Infra Analytics Company, Singapore ",
      country: "New Zealand",
      flag: "/flags/NZ.svg",
    },
    {
      image: "/speakers/2nd-batch/Tareq bin Yousef Al-Naffouri.webp",
      name: "Tareq bin Yousef Al-Naffouri ",
      title: "King Abdullah University of Science and Technology",
      country: "Saudi Arabia",
      flag: "/flags/SA.svg",
    },
    {
      image: "/speakers/2nd-batch/Abdullah Yasir Atala.webp",
      name: "Abdullah Yasir Atala ",
      title: "Center for International Strategic Studies",
      country: "Turkey",
      flag: "/flags/TR.svg",
    },
    {
      image: "/speakers/2nd-batch/Dr. Kashif Naseer Qureshi.webp",
      name: "Dr. Kashif Nasser",
      title: "University of Limerick, Republic of Ireland",
      country: "Pakistan",
      flag: "/flags/PK.svg",
    },
    // {
    //   image: "/speakers/2nd-batch/Dr.marios-Pangiotis.webp",
    //   name: "Dr. Marios-Pangiotis ",
    //   title: "Recommended by His Excellency to be contacted and has accepted the invitation",
    //   country: "Greece",
    //   flag: "/flags/GR.svg",
    // },


    {
      image: "/speakers/5th-batch/Prof. Gary Com.webp",
      name: "Prof. Gary Corn",
      title: "Center for a New American Security",
      country: "America",
      flag: "/flags/US.svg",
    },
    {
      image: "/speakers/5th-batch/Prof. Chris Sadie.webp",
      name: "Prof. Chris Sadie",
      title: "Director of the Cybersecurity Centre of Excellence, University of Oxford",
      country: "Britain",
      flag: "/flags/GB.svg",
    },
    {
      image: "/speakers/5th-batch/Dr. Omaimah bint Omar Bamasq .webp",
      name: "Dr. Omaimah bint Omar Bamasq",
      title: "Deputy for Empowerment, Transport General Authority",
      country: "Saudi Arabia",
      flag: "/flags/SA.svg",
    },
    // {
    //   image: "/speaker.png",
    //   name: "Lieutenant Colonel Dr. Bandar Al-Omari ",
    //   title: "Royal Saudi Naval Forces",
    //   country: "Saudi Arabia",
    //   flag: "/flags/SA.svg",
    // },
    {
      image: "/speakers/5th-batch/Dogrul Mursel.webp",
      name: "Dogrul Mursel",
      title: "Turkish National Defence University",
      country: "Turkey",
      flag: "/flags/TR.svg",
    },
    {
      image: "/speakers/5th-batch/Dr. Ibrahim Tariq Jaid.webp",
      name: "Dr. Ibrahim Tariq Jaid",
      title: "University of the Fraser Valley, Canada",
      country: "Canada",
      flag: "/flags/CAN.svg",
    },
    {
      image: "/speakers/4th-batch/Dr. Basma Al-Buhairan.webp",
      name: "Dr. Basma Al-Buhairan",
      title: "Former Director of the Centre for the Fourth Industrial Revolution (WEF)",
      country: "Saudi Arabia",
      flag: "/flags/SA.svg",
    },
    {
      image: "/speakers/4th-batch/Prof. Lam Kook Yan.jpg.webp",
      name: "Prof. Lam Kook Yan",
      title: "Vice President of Nanyang Technological University, Singapore",
      country: "Singapore",
      flag: "/flags/SG.svg",
    },
    // {
    //   image: "/speaker.png",
    //   name: "Awatif bint Salem Al-Obaid",
    //   title: "Jazan University",
    //   country: "Saudi Arabia",
    //   flag: "/flags/SA.svg",
    // },
    {
      image: "/speakers/4th-batch/Mohamed Slim.webp",
      name: "Mohamed Slim Alouini",
      title: "King Abdullah University of Science and Technology",
      country: "Canada",
      flag: "/flags/CAN.svg",
    },
    // {
    //   image: "/speaker.png",
    //   name: "Brigadier General Dr. Issa Al-Fifi",
    //   title: "Naval Forces",
    //   country: "Saudi Arabia",
    //   flag: "/flags/SA.svg",
    // },
    
  ];

  const participants = isAr ? participantsAr : participantsEn;

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      loop: true,
      direction: isAr ? "rtl" : "ltr",
      dragFree: true,
    },
    [
      AutoScroll({
        speed: 1,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        playOnInit: true,
      }),
    ]
  );

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  return (
    <section dir={isAr ? "rtl" : "ltr"} className="w-full bg-[#f7f8fb]" style={{ backgroundColor: "#F7F8FB" }}>
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:px-20 md:py-20">

        {/* new content */}
        <div className="flex flex-col items-center gap-10 w-full max-w-[1280px] flex-grow">
          {/* content */}
          <div className="flex flex-col items-center gap-4 w-full max-w-[760px]">
            {/* header content */}
            <h2 className="w-full max-w-[720px] font-['] text-[40px] font-bold leading-[45px] text-center text-black">
              {/* Heading */}
              
              {isAr ? "أبرز المشاركون" : "Featured Participants"}
            </h2>
            <p className="w-full font-['Noto Kufi Arabic'] text-[18px] leading-8 text-center text-slate-600">
              {/* Lead text */}
             
             {isAr ? "قادة وخبراء دوليون لاستشراف مستقبل الأمن البحري" : "International Leaders and Experts Shaping the Future of Maritime Security"}
            </p>
          </div>

          <div className="grid w-full max-w-[1280px] grid-cols-2 gap-6"></div>
          <div className="w-full max-w-[1280px] h-[459px] self-stretch shrink-0">
            {/* Content */}

            {/* slider container */}
            <div className="relative w-full max-w-[1280px] h-[459px] overflow-hidden mb-4">
               {/* Left fade */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-0 top-0 z-20 h-[459px] w-14 bg-gradient-to-r from-[#FAF9FB] via-[#FAF9FB]/50 to-transparent"
                />

                {/* Right fade */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute right-0 top-0 z-20 h-[459px] w-14 bg-gradient-to-l from-[#FAF9FB] via-[#FAF9FB]/50 to-transparent"
                />

              {/* Cards Container */}
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-4 px-4">
                  {participants.map((participant, index) => (
                    <div
                      key={index}
                      className="
                      group
                      relative
                      flex-[0_0_302px]
                      h-[459px]
                      overflow-hidden
                      rounded-2xl
                      bg-gradient-to-br
                      from-white
                      via-[#F8FBFE]
                      to-[#EAF4FB]
                      shadow-lg
                      transition-all
                      duration-300
                      hover:shadow-2xl
                    "
                    >
                      <Image
                        src={participant.image}
                        alt={participant.name}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />

                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#244A77] via-[#244A77]/60 to-transparent" />

                      <div
                        className="
                          absolute
                          bottom-6
                          left-1/2
                          z-10
                          w-[254px]
                          !h-[160px]
                          -translate-x-1/2
                          rounded-lg
                          bg-[linear-gradient(0deg,rgba(232,192,96,0.12),rgba(232,192,96,0.12)),linear-gradient(111.96deg,rgba(255,255,255,0.8)_2.19%,rgba(217,235,249,0.8)_97.74%)]
                          p-4
                          backdrop-blur-[17px]
                          transition-all
                          duration-300
                          group-hover:-translate-y-1
                          group-hover:backdrop-blur-xl
                        "
                      >
                        {/* Flag */}
                        <div
                          className={`absolute top-4 ${
                            isAr ? "right-4" : "left-4"
                          }`}
                        >
                          <Image
                            src={participant.flag}
                            alt={participant.country}
                            width={22}
                            height={16}
                          />
                        </div>

                        {/* Text */}
                        <div className="flex h-full flex-col items-center justify-center gap-3 pt-4 text-center">
                          <h3
                            className="
                              w-full
                              max-w-[200px]
                              break-words
                              whitespace-normal
                              font-['Noto Kufi Arabic']
                              text-base
                              font-bold
                              text-[#333333]
                            "
                          >
                            {participant.name}
                          </h3>

                          <p
                            className="
                              w-full
                              max-w-[200px]
                              break-words
                              whitespace-normal
                              font-['Noto Kufi Arabic']
                              text-sm
                              text-[#376B8E]
                            "
                          >
                            {participant.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* prevnext buttons */}
            <div className="hidden flex h-14 w-full max-w-[1280px] items-center justify-end gap-16 self-stretch">
              <button
                onClick={scrollPrev}
                type="button"
                className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E6F2FB] transition-colors hover:bg-[#d6eaf9]"
              >
                {isAr ? (
                    <ChevronRight className="h-6 w-6 text-[#007CD8]" />
                ) : (
                    <ChevronLeft className="h-6 w-6 text-[#007CD8]" />
                )}
              </button>

              <button
                onClick={scrollNext}
                type="button"
                className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E6F2FB] transition-colors hover:bg-[#d6eaf9]"
              >
                {isAr ? (
                    <ChevronLeft className="h-6 w-6 text-[#007CD8]" />
                ) : (
                    <ChevronRight className="h-6 w-6 text-[#007CD8]" />
                )}
              </button>
            </div>

          </div>

          {/* CTA */}
          {/* <div className="flex justify-center w-full mt-10">
            <button className="inline-flex h-12 w-[174px] items-center justify-center gap-6 rounded-full border border-[#BBC7D5] bg-[#498FBD] px-6 py-3 text-white">
              سجّل الآن
            </button>
          </div> */}

        </div>
        {/* wnd of new content */}

        <div className="hidden relative overflow-hidden rounded-[32px] bg-[#1f172d]">
          {/* Background photo */}
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 1280px"
            className="object-cover object-right"
            priority={false}
          />

          {/* Gradient overlay (dark side under the text) */}
          <div
            className={`hidden absolute inset-0 ${
              isAr
                ? "bg-gradient-to-l from-[#244a77] via-[#244a77]/80 to-transparent"
                : "bg-gradient-to-r from-[#244a77] via-[#244a77]/80 to-transparent"
            }`}
          />
          {/* Extra darken on mobile for legibility */}
          <div className="absolute inset-0 bg-[#1f172d]/50 md:hidden" />

          {/* Content */}
          <div className="hidden relative flex min-h-[440px] items-center md:min-h-[491px]">
            <div className="max-w-xl px-8 py-12 sm:px-12 md:px-16">
              {/* <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d7bbf0]">
                {eyebrowText}
              </p> */}
              <h2 className="mt-4 text-3xl font-bold leading-tight text-white md:text-[40px] md:leading-[1.15]">
                {headingText}
              </h2>
              <p className="mt-5 text-base leading-8 text-[#ccc4d8] md:text-lg">
                {leadText}
              </p>
              {/* CTA Row */}
              <div className="mt-10 flex flex-col gap-4 pb-4 sm:flex-row">
                <a
                  href="tel:920010500"
                  aria-label={moreLabelText}
                  className="inline-flex items-center justify-center h-12 min-w-[142px] rounded-full bg-[#e8c060] px-6 text-base font-extrabold text-[#001640] transition-colors hover:bg-[#dcb24c]"
                >
                  {moreLabelText}
                </a>
              </div>
            </div>
            
          </div>

          
        </div>
        
      </div>
    </section>
  );
}
