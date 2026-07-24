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
      name: "اللواء البحري البروفيسور توماش ريزارد شوبريخت",
      title: "الأكاديمية البحرية البولندية  قائد",
      country: "Poland",
      flag: "/flags/PL.svg",
    },
    // {
    //   image: "/speaker.png",
    //   name: "د. فهد بن ساعد العرابي الحارثي",
    //   title: "مركز أسبار للدراسات والبحوث والإعلام رئيس",
    //   country: "Saudi Arabia",
    //   flag: "/flags/SA.svg",
    // },
    {
      image: "/speakers/1st-batch/Prof. Christina Schori.webp",
      name: "د. كريستينا شوري ليانغ",
      title: "مركز جنيف للسياسات الأمنية  خبيرة في شؤون الإرهاب والتطرف و الأمن البحري",
      country: "Switzerland",
      flag: "/flags/CH.svg",
    },
    {
      image: "/speakers/1st-batch/Sugio Takahashi.webp",
      name: "د. سوجيو تاكاهاشي",
      title: "المعهد الوطني للدراسات الدفاعية خبير الاستراتيجيات الدفاعية و الأمنية ",
      country: "Japan",
      flag: "/flags/JP.svg",
    },
    {
      image: "/speakers/1st-batch/Major General Fahad Hamad Al-Otaibi.webp",
      name: "اللواء الركن فهد حمد العتيبي",
      title: "مركز الدراسات والبحوث الاستراتيجية الدفاعية الرئيس التنفيذي",
      country: "Saudi Arabia",
      flag: "/flags/SA.svg",
    },
    {
      image: "/speakers/1st-batch/Prof. Gurpreet Singh.webp",
      name: "العقيد البحري المتقاعد د. جوربريت إس. كورانا",
      title: "خبير الأمن البحري في المحيط الهندي والهادئ",
      country: "India",
      flag: "/flags/IN.svg",
    },
    {
      image: "/speakers/1st-batch/Prof. Zaili Yang.webp",
      name: "البروفيسور زايلي يانغ",
      title: "جامعة ليفربول جون موريس خبير المخاطر البحرية وأنظمة النقل",
      country: "Britain",
      flag: "/flags/GB.svg",
    },
    {
      image: "/speakers/1st-batch/Patalano Alessio.webp",
      name: "د. أليسيو باتالانو",
      title: "كينغز كوليدج لندن خبير الاستراتيجيات البحرية ",
      country: "Britain",
      flag: "/flags/GB.svg",
    },


    // {
    //   image: "/speaker.png",
    //   name: "الأستاذ سعد القحطاني",
    //   title: "مركز الدراسات الاستراتيجية والدولية  باحث أول",
    //   country: "Saudi Arabia",
    //   flag: "/flags/SA.svg",
    // },
    // {
    //   image: "/speaker.png",
    //   name: "العميد سلمان بن حسين الحربي",
    //   title: "جامعة الدفاع الوطني  نائب مدير مركز الدراسات الاستراتيجية",
    //   country: "Saudi Arabia",
    //   flag: "/flags/SA.svg",
    // },

    // {
    //   image: "/speaker.png",
    //   name: "البروفيسور كريستيان بوغر",
    //   title: "جامعة كوبنهاغن، الدنمارك خبير الأمن البحري والسياسات البحرية ",
    //   country: "Germany",
    //   flag: "/flags/DE.svg",
    // },
    {
      image: "/speakers/3rd-batch/Dr. Ihsan Mohammed Bu Haliqa.webp",
      name: "د. إحسان محمد بوحليقة",
      title: "مركز جواثا الاستشاري  رئيس",
      country: "Saudi Arabia",
      flag: "/flags/SA.svg",
    },
    {
      image: "/speakers/3rd-batch/Dr. Faisal Al-Saaq.webp",
      name: "د. فيصل الصعاق",
      title: "جامعة الملك عبدالعزيز عميد كلية الدراسات البحرية",
      country: "Saudi Arabia",
      flag: "/flags/SA.svg",
    },
    {
      image: "/speakers/3rd-batch/Prof. Sanjay Chaturvedi.webp",
      name: "البروفيسور سانجاي تشاتورفيدي",
      title: "جامعة جنوب آسيا، الهند  خبير العلاقات الدولية في مجال الأمن البحري",
      country: "India",
      flag: "/flags/IN.svg",
    },
    {
      image: "/speakers/3rd-batch/Abdulrahman Ibrahim Ali Al-Fuzai.webp",
      name: "الأستاذ عبدالرحمن إبراهيم الفزيع",
      title: "مركز البحرين للدراسات الاستراتيجية والدولية والطاقة باحث خبير",
      country: "Bahrain",
      flag: "/flags/BH.svg",
    },
    // {
    //   image: "/speaker.png",
    //   name: "د. أيمن بن صدقة فاضل",
    //   title: "جامعة جدة  رئيس أكاديمية إدارة سلاسل الإمداد",
    //   country: "Saudi Arabia",
    //   flag: "/flags/SA.svg",
    // },


    // {
    //   image: "/speaker.png",
    //   name: "البروفيسور روبرت جيمس ماكلوفلين",
    //   title: "الجامعة الوطنية الأسترالية خبير القانون البحري الدولي والأمن البحري",
    //   country: "Australia",
    //   flag: "/flags/SA.svg",
    // },
    {
      image: "/speakers/2nd-batch/Commadore. John.webp",
      name: "العميد البحري جون أيتكن",
      title: "مركز راند للأبحاث خبير في أمن قاع البحار والبنية الحساسة تحت البحر",
      country: "Britain",
      flag: "/flags/GB.svg",
    },
    {
      image: "/speakers/2nd-batch/Mike Constable.webp",
      name: "مايك كونستابل",
      title: "شركة إنفرا أناليتكس، سنغافورة رئيس",
      country: "New Zealand",
      flag: "/flags/NZ.svg",
    },
    {
      image: "/speakers/2nd-batch/Tareq bin Yousef Al-Naffouri.webp",
      name: "البروفيسور طارق يوسف النافوري",
      title: "جامعة الملك عبدالله للعلوم والتقنية   خبير أبحاث الاتصالات البحرية والمستشعرات",
      country: "Saudi Arabia",
      flag: "/flags/SA.svg",
    },
    {
      image: "/speakers/2nd-batch/Abdullah Yasir Atala.webp",
      name: "د. ياسر عطلان",
      title: "مركز الدراسات الاستراتيجية والدولية (CSIS)  باحث في الأمن التقني العالمي",
      country: "Turkey",
      flag: "/flags/TR.svg",
    },
    {
      image: "/speakers/2nd-batch/Dr. Kashif Naseer Qureshi.webp",
      name: "د. كاشف ناصر",
      title: "جامعة ليمريك، جمهورية إيرلندا باحث في الأمن السيبراني والاتصالات والذكاء الاصطناعي",
      country: "Pakistan",
      flag: "/flags/PK.svg",
    },
    
    {
      image: "/speakers/2nd-batch/Dr.marios-Pangiotis.webp",
      name: "د. ماريوس بانقيوتيس ",
      title: "جامعة فيتاوتاس مانيوس ليتوانيا خبير في مجالات الأمن الدولي والدراسات الجيوسياسية",
      country: "Greece",
      flag: "/flags/GR.svg",
    },


    {
      image: "/speakers/5th-batch/Prof. Gary Com.webp",
      name: "البروفيسور غاري كورن",
      title: "كلية واشنطن للقانون، الجامعة الأمريكية  خبير قانون الحروب السيبرانية العسكرية و الاستراتيجيات السيبرانية",
      country: "America",
      flag: "/flags/US.svg",
    },
    {
      image: "/speakers/5th-batch/Prof. Chris Sadie.webp",
      name: "البروفيسورة سادي كريز",
      title: "جامعة أكسفورد أستاذة الأمن السيبراني ومديرة المركز العالمي لبناء القدرات في الأمن السيبراني",
      country: "Britain",
      flag: "/flags/GB.svg",
    },
    {
      image: "/speakers/5th-batch/Dr. Omaimah bint Omar Bamasq .webp",
      name: "د. أميمة بنت عمر بامسق",
      title: "الهيئة العامة للنقل خبيرة الأمن السيبراني وقائدة التمكين",
      country: "Saudi Arabia",
      flag: "/flags/SA.svg",
    },
    // {
    //   image: "/speaker.png",
    //   name: "المقدم د. بندر بن حمود العمري",
    //   title: "القوات البحرية الملكية السعودية  مدير قسم أمن المعلومات والاتصالات بإدارة الأمن العسكري",
    //   country: "Saudi Arabia",
    //   flag: "/flags/SA.svg",
    // },
    {
      image: "/speakers/5th-batch/Dogrul Mursel.webp",
      name: "البروفيسور دوغرول مورسيل",
      title: "جامعة الدفاع الوطنية التركية  أستاذ مشارك",
      country: "Turkey",
      flag: "/flags/TR.svg",
    },
    {
      image: "/speakers/5th-batch/Dr. Ibrahim Tariq Jaid.webp",
      name: "د. إبراهيم طارق جافد",
      title: "جامعة فريزر فالي، كندا  باحث في مجال الأمن السيبراني والتقنيات الحديثة",
      country: "Canada",
      flag: "/flags/CAN.svg",
    },
    {
      image: "/speakers/4th-batch/Dr. Basma Al-Buhairan.webp",
      name: "د. بسمة البحيران",
      title: "مدينة الملك عبدالعزيز للعلوم والتقنية قائدة في مجال الابتكار ومستشارة أبحاث",
      country: "Saudi Arabia",
      flag: "/flags/SA.svg",
    },
    {
      image: "/speakers/4th-batch/Prof. Lam Kook Yan.jpg.webp",
      name: "البروفيسور لام كوك يان",
      title: "جامعة نانيانغ التكنولوجية، سنغافورة خبير الذكاء الاصطناعي والتقنيات الحديثة في المجال البحري",
      country: "Singapore",
      flag: "/flags/SG.svg",
    },
    // {
    //   image: "/speaker.png",
    //   name: "د. عواطف سالم بالعبيد",
    //   title: "جامعة جازان  باحثة وقائدة مشاريع أبحاث في التقنيات البحرية",
    //   country: "Saudi Arabia",
    //   flag: "/flags/SA.svg",
    // },
    {
      image: "/speakers/4th-batch/Mohamed Slim.webp",
      name: "البروفيسور محمد سليم العويني",
      title: "جامعة الملك عبدالله للعلوم والتقنية (كاوست) خبير أبحاث الاتصالات اللاسلكية البحرية والفضائية",
      country: "Canada",
      flag: "/flags/CAN.svg",
    },
    // {
    //   image: "/speaker.png",
    //   name: "العميد د. عيسى بن حسن الفيفي",
    //   title: "مدرسة مشاة القوات البحرية الملكية السعودية عميد وباحث في الذكاء الاصطناعي",
    //   country: "Saudi Arabia",
    //   flag: "/flags/SA.svg",
    // },

    // {
    //   image: "/Prof. Salman bin Ali Al-Qahtani.png",
    //   name: "بروف. سلمان بن علي القحطاني",
    //   title: "جامعة الملك سعود أستاذ علوم وهندسة الحاسب الألي",
    //   country: "Saudi Arabia",
    //   flag: "/flags/SA.svg",
    // },
   
    // {
    //   image: "/Ms. Aisha Saeed Al-Qarni.png",
    //   name: "أ. عائشة سعيد القرني",
    //   title: "المركز الوطني للرقابة على الالتزام البيئي  باحثة دكتوراة في استدامة البنية والبيئة البحرية",
    //   country: "Saudi Arabia",
    //   flag: "/flags/SA.svg",
    // },
    // {
    //   image: "/Brigadier General Fuhayd bin Mohammed Al-Subaie.png",
    //   name: "العميد فهيد بن محمد السبيعي",
    //   title: "القوات البحرية الملكية السعودية  مدير إدارة الاتصالات وتقنية المعلومات",
    //   country: "Saudi Arabia",
    //   flag: "/flags/SA.svg",
    // },
    // {
    //   image: "/Dr. Salahuddin Nasser Dreibi.png",
    //   name: "د. صلاح الدين ناصر دريبي",
    //   title: "جامعة جازان  أستاذ مشارك في كلية الهندسة وعلوم الحاسب",
    //   country: "Saudi Arabia",
    //   flag: "/flags/SA.svg",
    // },
    // {
    //   image: "/Brigadier General (Staff) Nasser Ghadeer Al-Harbi.png",
    //   name: "العميد الركن ناصر غدير الحربي",
    //   title: "جامعة الدفاع قائد مركز تطوير القادة",
    //   country: "Saudi Arabia",
    //   flag: "/flags/SA.svg",
    // },
    // {
    //   image: "/Brigadier General (Staff) Dr. Fahad Jabbar Al-Mutairi.png",
    //   name: "العميد الركن د. فهد جبار المطيري ",
    //   title: "القوات البحرية الملكية السعودية  قائد قيادة التدريب والعقائد",
    //   country: "Saudi Arabia",
    //   flag: "/flags/SA.svg",
    // },
    // {
    //   image: "/Prof. Wahid Sami Abu Shanab.png",
    //   name: "بروف. وحيد سامي أبو شنب",
    //   title: "جامعة الملك عبد العزيز أستاذ هندسة المواد بكلية الدراسات البحرية ",
    //   country: "Saudi Arabia",
    //   flag: "/flags/SA.svg",
    // },
    // {
    //   image: "/Dr. Dhabia Ahmed Muhammad Alboainin.png",
    //   name: "الدكتورة ظبيه أحمد البو عينين",
    //   title: "جامعة الإمام عبد الرحمن بن فيصل  وكيل عمادة التعليم الالكتروني والتعلم عن بعد",
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
      name: "Rear Admiral Prof. Tomasz Ryszard Szubrycht",
      title: "Commandant, Polish Naval Academy",
      country: "Poland",
      flag: "/flags/PL.svg",
    },
    // {
    //   image: "/speaker.png",
    //   name: "Dr. Fahad bin Saad Al-Orabi Al-Harthi",
    //   title: "President, Asbar Center for Studies, Research and Media",
    //   country: "Saudi Arabia",
    //   flag: "/flags/SA.svg",
    // },
    {
      image: "/speakers/1st-batch/Prof. Christina Schori.webp",
      name: "Dr. Christina Schori Liang",
      title: "Expert in Terrorism, Extremism and Maritime Security, Geneva Centre for Security Policy",
      country: "Switzerland",
      flag: "/flags/CH.svg",
    },
    {
      image: "/speakers/1st-batch/Sugio Takahashi.webp",
      name: "Dr. Sugio Takahashi",
      title: "Expert in Defense and Security Strategies, National Institute for Defense Studies, Japan",
      country: "Japan",
      flag: "/flags/JP.svg",
    },
    {
      image: "/speakers/1st-batch/Major General Fahad Hamad Al-Otaibi.webp",
      name: "Major General Fahad Hamad Al-Otaibi",
      title: "Chief Executive Officer, Center for Defense Strategic Studies and Research",
      country: "Saudi Arabia",
      flag: "/flags/SA.svg",
    },
    {
      image: "/speakers/1st-batch/Prof. Gurpreet Singh.webp",
      name: "Captain (Ret.) Dr. Gurpreet S. Khurana",
      title: "Expert in Maritime Security in the Indian Ocean and Indo-Pacific",
      country: "India",
      flag: "/flags/IN.svg",
    },
    {
      image: "/speakers/1st-batch/Prof. Zaili Yang.webp",
      name: "Prof. Zaili Yang",
      title: "Expert in Maritime Risk and Transport Systems, Liverpool John Moores University",
      country: "Britain",
      flag: "/flags/GB.svg",
    },
    {
      image: "/speakers/1st-batch/Patalano Alessio.webp",
      name: "Dr. Alessio Patalano",
      title: "Expert in Maritime Strategy, King's College London",
      country: "Britain",
      flag: "/flags/GB.svg",
    },


    // {
    //   image: "/speaker.png",
    //   name: "Mr. Saad Al-Qahtani",
    //   title: "Senior Researcher, Center for International Strategic Studies",
    //   country: "Saudi Arabia",
    //   flag: "/flags/SA.svg",
    // },
    // {
    //   image: "/speaker.png",
    //   name: "Brigadier General Salman bin Hussein Al-Harbi",
    //   title: "Deputy Director of the Center for Strategic Studies, National Defense University",
    //   country: "Saudi Arabia",
    //   flag: "/flags/SA.svg",
    // },

    // {
    //   image: "/speaker.png",
    //   name: "Prof. Christian Bueger",
    //   title: "Expert in Maritime Security and Maritime Policy, University of Copenhagen, Denmark",
    //   country: "Germany",
    //   flag: "/flags/DE.svg",
    // },
    {
      image: "/speakers/3rd-batch/Dr. Ihsan Mohammed Bu Haliqa.webp",
      name: "Dr. Ihsan Mohammed Bu Haliqa",
      title: "President, Jawatha Consulting Center",
      country: "Saudi Arabia",
      flag: "/flags/SA.svg",
    },
    {
      image: "/speakers/3rd-batch/Dr. Faisal Al-Saaq.webp",
      name: "Dr. Faisal Al-Saaq",
      title: "Dean of the Faculty of Maritime Studies, King Abdulaziz University",
      country: "Saudi Arabia",
      flag: "/flags/SA.svg",
    },
    {
      image: "/speakers/3rd-batch/Prof. Sanjay Chaturvedi.webp",
      name: "Prof. Sanjay Chaturvedi",
      title: "Expert in International Relations in Maritime Security , South Asian University, India",
      country: "India",
      flag: "/flags/IN.svg",
    },
    {
      image: "/speakers/3rd-batch/Abdulrahman Ibrahim Ali Al-Fuzai.webp",
      name: "Mr. Abdulrahman Ibrahim Al-Fuzai",
      title: "Expert Researcher, Bahrain Center for Strategic, International and Energy Studies (Derasat)",
      country: "Bahrain",
      flag: "/flags/BH.svg",
    },
    // {
    //   image: "/speaker.png",
    //   name: "Dr. Ayman bin Sidqah Fadel",
    //   title: "President of the Supply Chain Management Academy, University of Jeddah",
    //   country: "Saudi Arabia",
    //   flag: "/flags/SA.svg",
    // },


    // {
    //   image: "/speaker.png",
    //   name: "Prof. Robert James McLaughlin",
    //   title: "Expert in International Maritime Law and Maritime Security, Australian National University",
    //   country: "Australia",
    //   flag: "/flags/SA.svg",
    // },
    {
      image: "/speakers/2nd-batch/Commadore. John.webp",
      name: "Commodore (Ret.) John Aitken",
      title: "Expert in Seabed Security and Critical Subsea Infrastructure, RAND",
      country: "Britain",
      flag: "/flags/GB.svg",
    },
    {
      image: "/speakers/2nd-batch/Mike Constable.webp",
      name: "Mike Constable",
      title: "President, Infra Analytics, Singapore",
      country: "New Zealand",
      flag: "/flags/NZ.svg",
    },
    {
      image: "/speakers/2nd-batch/Tareq bin Yousef Al-Naffouri.webp",
      name: "Prof. Tareq Yousef Al-Naffouri",
      title: "Expert in Maritime Communications and Sensor Research, King Abdullah University of Science and Technology (KAUST)",
      country: "Saudi Arabia",
      flag: "/flags/SA.svg",
    },
    {
      image: "/speakers/2nd-batch/Abdullah Yasir Atala.webp",
      name: "Dr. Yasir Atalan",
      title: "Researcher in Global Technology Security, Center for Strategic and International Studies (CSIS)",
      country: "Turkey",
      flag: "/flags/TR.svg",
    },
    {
      image: "/speakers/2nd-batch/Dr. Kashif Naseer Qureshi.webp",
      name: "Assoc. Prof. Kashif Naseer Qureshi",
      title: "Researcher in Cybersecurity, Communications and Artificial Intelligence, University of Limerick, Ireland",
      country: "Pakistan",
      flag: "/flags/PK.svg",
    },
    
    {
      image: "/speakers/2nd-batch/Dr.marios-Pangiotis.webp",
      name: "Prof. Dr. Marios Panagiotis Efthymiopoulos",
      title: "Expert in International Security and Geopolitical Studies, Vytautas Magnus University, Lithuania",
      country: "Greece",
      flag: "/flags/GR.svg",
    },


    {
      image: "/speakers/5th-batch/Prof. Gary Com.webp",
      name: "Prof. Gary Corn",
      title: "Expert in the Law of Military Cyber Warfare and Cyber Strategy, Washington College of Law, American University",
      country: "America",
      flag: "/flags/US.svg",
    },
    {
      image: "/speakers/5th-batch/Prof. Chris Sadie.webp",
      name: "Prof. Sadie Creese",
      title: "Professor of Cybersecurity and Director of the Global Cyber Security Capacity Centre, University of Oxford",
      country: "Britain",
      flag: "/flags/GB.svg",
    },
    {
      image: "/speakers/5th-batch/Dr. Omaimah bint Omar Bamasq .webp",
      name: "Dr. Omaimah bint Omar Bamasq",
      title: "Cybersecurity Expert and Empowerment Leader, Transport General Authority",
      country: "Saudi Arabia",
      flag: "/flags/SA.svg",
    },
    // {
    //   image: "/speaker.png",
    //   name: "Lieutenant Colonel Dr. Bandar bin Hamoud Al-Omari",
    //   title: "Director of the Information Security and Communications Section, Military Security Department, Royal Saudi Naval Forces",
    //   country: "Saudi Arabia",
    //   flag: "/flags/SA.svg",
    // },
    {
      image: "/speakers/5th-batch/Dogrul Mursel.webp",
      name: "Dr. Mürsel Doğrul",
      title: "Associate Professor, Turkish National Defence University",
      country: "Turkey",
      flag: "/flags/TR.svg",
    },
    {
      image: "/speakers/5th-batch/Dr. Ibrahim Tariq Jaid.webp",
      name: "Dr. Ibrahim Tariq Javed",
      title: "Researcher in Cybersecurity and Emerging Technologies, University of the Fraser Valley, Canada",
      country: "Canada",
      flag: "/flags/CAN.svg",
    },
    {
      image: "/speakers/4th-batch/Dr. Basma Al-Buhairan.webp",
      name: "Dr. Basma Al-Buhairan",
      title: "Innovation Leader and Research Advisor, King Abdulaziz City for Science and Technology (KACST)",
      country: "Saudi Arabia",
      flag: "/flags/SA.svg",
    },
    {
      image: "/speakers/4th-batch/Prof. Lam Kook Yan.jpg.webp",
      name: "Prof. Lam Kwok Yan",
      title: "Expert in Artificial Intelligence and Emerging Technologies in the Maritime Sector, Nanyang Technological University, Singapore",
      country: "Singapore",
      flag: "/flags/SG.svg",
    },
    // {
    //   image: "/speaker.png",
    //   name: "Assoc. Prof. Dr. Awatef Salem Balobaid",
    //   title: "Researcher and Leader of Marine Technology Research Projects, Jazan University",
    //   country: "Saudi Arabia",
    //   flag: "/flags/SA.svg",
    // },
    {
      image: "/speakers/4th-batch/Mohamed Slim.webp",
      name: "Prof. Mohamed-Slim Alouini",
      title: "Expert in Maritime and Space Wireless Communications Research, King Abdullah University of Science and Technology (KAUST)",
      country: "Canada",
      flag: "/flags/CAN.svg",
    },
    // {
    //   image: "/speaker.png",
    //   name: "Brigadier General Dr. Issa bin Hassan Al-Fifi",
    //   title: "Brigadier General and Artificial Intelligence Researcher, sRoyal Saudi Naval Forces Marine Corps School",
    //   country: "Saudi Arabia",
    //   flag: "/flags/SA.svg",
    // },


    // {
    //   image: "/speaker.png",
    //   name: "Prof. Salman bin Ali Al-Qahtani",
    //   title: "Professor of Computer Science and Engineering, King Saud University",
    //   country: "Saudi Arabia",
    //   flag: "/flags/SA.svg",
    // },
    // {
    //   image: "/speaker.png",
    //   name: "Ms. Aisha Saeed Al-Qarni",
    //   title: "PhD Researcher in Marine Infrastructure and Environmental Sustainability National Center for Environmental Compliance (NCEC)",
    //   country: "Saudi Arabia",
    //   flag: "/flags/SA.svg",
    // },
    // {
    //   image: "/speaker.png",
    //   name: "Brigadier General Fuhayd bin Mohammed Al-Subaie",
    //   title: "Director of the Communications and Information Technology Department Royal Saudi Naval Forces",
    //   country: "Saudi Arabia",
    //   flag: "/flags/SA.svg",
    // },
    // {
    //   image: "/speaker.png",
    //   name: "Dr. Salahuddin Nasser Dreibi",
    //   title: "Associate Professor, College of Engineering and Computer Science Jazan University",
    //   country: "Saudi Arabia",
    //   flag: "/flags/SA.svg",
    // },
    // {
    //   image: "/speaker.png",
    //   name: "Brigadier General (Staff) Nasser Ghadeer Al-Harbi",
    //   title: "Commander of the Leadership Development Center National Defense University",
    //   country: "Saudi Arabia",
    //   flag: "/flags/SA.svg",
    // },
    // {
    //   image: "/speaker.png",
    //   name: "Brigadier General (Staff) Dr. Fahad Jabbar Al-Mutairi",
    //   title: "Commander of the Training and Doctrine Command Royal Saudi Naval Forces",
    //   country: "Saudi Arabia",
    //   flag: "/flags/SA.svg",
    // },
    // {
    //   image: "/speaker.png",
    //   name: "Prof. Wahid Sami Abu Shanab",
    //   title: "Professor of Materials Engineering, Faculty of Maritime Studies  King Abdulaziz University",
    //   country: "Saudi Arabia",
    //   flag: "/flags/SA.svg",
    // },
    // {
    //   image: "/speaker.png",
    //   name: "Dr. Dhabia Ahmed Muhammad Alboainin",
    //   title: "Vice Dean of E-Learning and Distance Learning  Imam Abdulrahman Bin Faisal University",
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
                          !h-[180px]
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
