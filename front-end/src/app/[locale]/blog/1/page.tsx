import { fetchAPI } from "@/lib/api";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import SocialShare from "@/components/SocialShare";
import Navbar from "@/components/Navbar";

interface Props {
  params: Promise<{
    locale: string;
    documentId: string;
  }>;
}

// export default function BlogOnePage() {
//   return (
//     <main>
//       <h1>Blog 1</h1>
//     </main>
//   );
// }

// export default async function BlogPost({ params }: Props) {
export default async function BlogOnePage({ params }: Props) {
  const { locale } = await params;
  const isAr = locale === "ar";
  const relatedNews: any[] = [];
//   const { locale, documentId } = await params;

//     // uses the single result
//     const res = await fetchAPI<any>(
//         `news?filters[documentId][$eq]=${documentId}`,
//         locale
//     );

//     const [articleRes, relatedRes] = await Promise.all([
//         fetchAPI<any>(
//             `news?filters[documentId][$eq]=${documentId}`,
//             locale
//         ),
//         fetchAPI<any>("news", locale),
//     ]);

//     if (!res || !res.data.length) {
//         notFound();
//     }

    // uses the single result 
    //const article = res.data[0];

    // const article = articleRes.data[0];
    // const articlesimf = articleRes.data[0];
    const articletitle = "Seabed Security and Maritime Supply Chains in a Critically Changing World";
    const articlesub = "Key Strategic Themes Addressed by the 4th Saudi International Maritime Forum";
    const articlebody = "Riyadh is preparing to host the fourth edition of the Saudi International Maritime Forum from 23 to 25 November 2026, under the patronage of His Royal Highness Prince Khalid bin Salman bin Abdulaziz Al Saud, Minister of Defense, and organized by the Royal Saudi Naval Forces. The forum convenes at a time when the global maritime environment is undergoing unprecedented shifts, with rising threats targeting deep sea infrastructure and global supply chains. The fourth edition introduces a comprehensive program and agenda that reflect the scale of challenges facing the world's seas amid rapidly evolving geopolitical and technological dynamics. \n\nThis year's theme, 'The Future of Seabed Security & Maritime Supply Chains in a Critically Changing World,' underscores the growing international recognition of the importance of deep sea infrastructure, from undersea communication cables carrying more than 95% of the world's data, to energy pipelines that form the backbone of global trade. As risks targeting these critical systems continue to escalate, the forum emerges as a global platform bringing together experts and decision makers from dozens of countries to explore the future of maritime security through an integrated perspective that connects the surface to the depths, and energy to data and trade. \n\nThe forum's agenda features advanced discussions on the shifting global strategic environment and its impact on the security of maritime supply chains, particularly as international crises place mounting pressure on trade routes that transport nearly 80% of the world's goods. It also examines the vulnerabilities facing subsea energy lines and their implications for global economic stability, at a time when recent disruptions have exposed the fragility of supply systems and driven shipping costs up by more than 350% when a single corridor is blocked. \n\nFurther discussions will address the protection of the seabed and deep sea digital infrastructure, which has become an essential component of national security. The forum highlights the challenges facing undersea cables stretching more than 1.4 million kilometers, and the cyber risks that threaten global communications and financial markets. It also explores the role of artificial intelligence and unmanned systems in strengthening deterrence, surveillance, and the protection of critical infrastructure in the depths, amid growing global reliance on smart technologies in maritime operations. \n\nThe fourth edition represents a unique opportunity for government entities, military organizations, private sector leaders, and international technology institutions to contribute to a shared vision for the future of maritime security. It provides a platform for building new partnerships that enhance the resilience of supply chains and support the stable flow of energy, data, and trade in a rapidly changing world. The forum also serves as an ideal venue for showcasing advanced maritime technologies, exchanging expertise, and engaging in a global dialogue that redefines maritime security in alignment with the ambitions of Saudi Vision 2030. \n\nParticipation in this event offers an exceptional opportunity for stakeholders in maritime security, energy, communications, and logistics to engage in strategic discussions and develop practical solutions to the growing challenges facing deep sea infrastructure and global supply chains. With delegations from more than forty countries expected to attend, the forum opens the door to broad international cooperation that strengthens the stability of the seas and supports the future of the global economy.";
    
    const articletitleAr = "مستقبل أمن قاع البحار وسلاسل الإمداد في بيئة عالمية متغيرة";
    const articlesubAr = "موضوعات حيوية يناقشها الملتقى البحري السعودي الدولي الرابع ضمن أجندة أعماله";
    const articlebodyAr = "تستعد العاصمة الرياض لاستضافة النسخة الرابعة من الملتقى البحري السعودي الدولي تحت رعاية صاحب السمو الملكي الأمير خالد بن سلمان بن عبدالعزيز آل سعود، وزير الدفاع، وتنظيم القوات البحرية الملكية السعودية، خلال الفترة من الثالث والعشرين إلى الخامس والعشرين من نوفمبر 2026، في وقت يشهد فيه العالم تحولات غير مسبوقة في البيئة البحرية، وتناميًا في التهديدات التي تطال البنية التحتية العميقة وسلاسل الإمداد العالمية؛ ويضم الملتقى في نسخته الرابعة برنامجًا وأجندة أعمال تعكس حجم التحديات التي تواجه البحار في عصر تتسارع فيه المتغيرات الجيوسياسية والتقنية. \n\n وتحمل النسخة الرابعة عنوان \"مستقبل أمن قاع البحار وسلاسل الإمداد في بيئة عالمية متغيرة\"، وهو عنوان يعكس إدراكًا دوليًا متزايدًا لأهمية البنية التحتية الممتدة في الأعماق، من كابلات الاتصالات البحرية التي تحمل أكثر من 95% من بيانات العالم، إلى خطوط الطاقة التي تشكّل شريانًا رئيسيًا لحركة التجارة العالمية؛ وفي ظل ارتفاع مستوى المخاطر التي تستهدف هذه المنظومات، يبرز الملتقى كمنصة دولية تجمع الخبراء وصناع القرار من عشرات الدول لمناقشة مستقبل الأمن البحري بمنظور شامل يربط بين السطح والأعماق، وبين الطاقة والبيانات والتجارة. \n\n وتتضمن أجندة أعمال الملتقى هذا العام نقاشات متقدمة حول التحولات في البيئة الاستراتيجية العالمية وتأثيرها على أمن سلاسل الإمداد البحرية، وما تفرضه الأزمات الدولية من ضغوط على حركة التجارة التي يعتمد عليها العالم في نقل 80% من السلع؛ كما يستعرض الملتقى المخاطر التي تطال خطوط الطاقة الممتدة تحت سطح البحر، وتأثيرها على استقرار الاقتصاد العالمي، في وقت كشفت فيه الأزمات الأخيرة هشاشة منظومات الإمداد وارتفاع تكاليف الشحن بأكثر من 350% عند تعطل ممر واحد فقط. \n\n ويمتد النقاش ليشمل حماية قاع البحار والبنية الرقمية العميقة التي أصبحت جزءًا من الأمن الوطني للدول، مع التركيز على التحديات التي تواجه الكابلات البحرية التي تمتد لأكثر من 1.4 مليون كيلومتر، وما يرتبط بها من مخاطر سيبرانية تستهدف تعطيل الاتصالات العالمية وحركة الأسواق المالية؛ كما يتناول الملتقى دور الذكاء الاصطناعي والأنظمة غير المأهولة في تعزيز قدرات الردع والمراقبة وحماية البنية التحتية الممتدة في الأعماق، في ظل توسع الاعتماد العالمي على التقنيات الذكية في بيئة العمليات البحرية. \n\n ويمثل انعقاد النسخة الرابعة فرصة فريدة للجهات الحكومية والعسكرية والقطاع الخاص والمؤسسات التقنية الدولية للمشاركة في صياغة رؤية مشتركة لمستقبل الأمن البحري، وبناء شراكات جديدة تعزز مرونة سلاسل الإمداد، وتدعم استقرار تدفق الطاقة والبيانات والتجارة في عالم سريع التغيرات؛ كما يشكل الملتقى منصة مثالية لاستعراض أحدث التقنيات البحرية، وتبادل الخبرات، والانخراط في حوار دولي يعيد تعريف أمن البحار بمنظور شامل يتسق مع طموحات رؤية السعودية 2030. \n\n ويُعد حضور هذا الحدث فرصة استثنائية للجهات المعنية بالأمن البحري، والطاقة، والاتصالات، واللوجستيات، للمشاركة في نقاشات استراتيجية وصياغة حلول عملية تعالج التحديات المتنامية التي تواجه البنية التحتية البحرية وسلاسل الإمداد العالمية؛ ومع مشاركة وفود من أكثر من أربعين دولة، يفتح الملتقى الباب أمام تعاون دولي واسع يعزز استقرار البحار ويدعم مستقبل الاقتصاد العالمي.";

    const title = isAr ? articletitleAr : articletitle;
    const subtitle = isAr ? articlesubAr : articlesub;
    const body = isAr ? articlebodyAr : articlebody;

    // const relatedNews =
    //     relatedRes.data
    //         .filter((item: any) => item.documentId !== documentId)
    //         .slice(0, 3);

    // const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_BASE_URL;
    // // Fetch البيانات مباشرة في السيرفر
    // const [heroRes, statsRes] = await Promise.all([
    //     fetchAPI<any>("soulation-banner-headers", locale),
    //     fetchAPI<any>("solution-second-banners", locale),
    // ]);
    // const heroData = heroRes?.data?.[0];
    // const statsData = statsRes?.data?.[0];
    // const bgUrl = heroData?.background?.url
    //     ? `${STRAPI_URL}${heroData.background.url}`
    //     : null;

  return (
    <main className="container mx-auto py-20">
        <Navbar transparentAtTop={false} />
        {/* <section className="hidden relative w-full min-h-[60vh] flex items-center justify-center bg-black overflow-hidden">
            <div className="absolute inset-0 z-0">
                {bgUrl && (
                <Image
                    src={bgUrl}
                    alt="Banner"
                    fill
                    className="object-cover"
                    priority
                />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <h1 className="text-5xl md:text-7xl lg:text-8xl text-white leading-tight tracking-tight">
                Blog Page
                </h1>
            </div>
        </section> */}
            
            {/* this is the News Article section, the contents */}
            <section className="bg-white py-20">
                <div className="max-w-5xl mx-auto px-6">

                    {/* Article Header */}
                    <div className="mt-12 mb-12 text-center">
                        <h1 className="mt-4 mb-4 text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-normal">
                            {/* {article.title} */}
                            {title}
                        </h1>
                        <p className="text-sm uppercase tracking-[0.2em] text-[#5A417F] font-semibold">
                            {/* {article.sub_title} */}
                            {subtitle}
                        </p>
                    </div>

                    {/* Featured Image */}
                    <div className="relative w-full h-[300px] md:h-[450px] lg:h-[550px] overflow-hidden rounded-xl shadow-lg">
                    {/* <Image
                        src={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${article.main_image.url}`}
                        alt={article.title}
                        fill
                        className="object-cover"
                        priority
                    /> */}
                    <Image
                        src="/news-images/1.1.webp"
                        alt={title}
                        fill
                        className="object-cover"
                        priority
                    />
                    </div>

                    {/* Divider */}
                    <div className="w-24 h-1 bg-[#5A417F] mx-auto my-10 rounded-full" />

                    {/* Blog Content */}
                    <article className="max-w-3xl mx-auto">
                    <div className="prose prose-lg lg:prose-xl max-w-none text-gray-700 leading-9">

                        {/* {article.Details?.map((block: any, index: number) => (
                        <p key={index} className="mb-6">
                            {block.children?.map((child: any) => child.text).join("")}
                        </p>
                        ))} */}
                        <p className="mb-6 whitespace-pre-line">{body}</p>

                    </div>
                    </article>
                    <SocialShare
                    title={title}
                    />
                </div>
                
            </section>

            {/* this is the related news section */}
            {relatedNews.length > 0 && (
            <section className="mt-24 border-t pt-16 pb-20">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900">
                {isAr ? "أخبار ذات صلة" : "Related News"}
                </h2>

                <p className="text-center text-gray-500 mt-2 mb-12">
                {isAr
                    ? "اكتشف المزيد من الأخبار والمقالات."
                    : "Explore more stories from Startime."}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedNews.map((item: any) => (
                    <Link
                    key={item.documentId}
                    href={`/${locale}/blog/${item.documentId}`}
                    className="group bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition-all duration-300"
                    >
                    <div className="relative h-56">
                        <Image
                        src={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${item.main_image.url}`}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>

                    <div className="p-6">
                        <p className="uppercase text-xs tracking-widest text-[#5A417F] font-semibold mb-2">
                        {item.sub_title}
                        </p>

                        <h3 className="text-xl font-bold text-gray-900 line-clamp-2">
                        {item.title}
                        </h3>

                        <p className="mt-4 text-[#5A417F] font-semibold group-hover:translate-x-1 transition-transform">
                        {isAr ? "اقرأ المزيد ←" : "Read More →"}
                        </p>
                    </div>
                    </Link>
                ))}
                </div>
            </section>
            )}
    </main>
    
    
  );
}