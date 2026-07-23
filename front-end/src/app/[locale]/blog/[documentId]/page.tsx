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

export default async function BlogPost({ params }: Props) {
  const { locale, documentId } = await params;

    // uses the single result
    const res = await fetchAPI<any>(
        `news?filters[documentId][$eq]=${documentId}`,
        locale
    );

    const [articleRes, relatedRes] = await Promise.all([
        fetchAPI<any>(
            `news?filters[documentId][$eq]=${documentId}`,
            locale
        ),
        fetchAPI<any>("news", locale),
    ]);

    if (!res || !res.data.length) {
        notFound();
    }

    // uses the single result 
    //const article = res.data[0];

    const article = articleRes.data[0];
    const relatedNews =
        relatedRes.data
            .filter((item: any) => item.documentId !== documentId)
            .slice(0, 3);

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
                        <h1 className="mt-4 mb-4 text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                            {article.title}
                        </h1>
                        <p className="text-sm uppercase tracking-[0.2em] text-[#5A417F] font-semibold">
                            {article.sub_title}
                        </p>
                    </div>

                    {/* Featured Image */}
                    <div className="relative w-full h-[300px] md:h-[450px] lg:h-[550px] overflow-hidden rounded-xl shadow-lg">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${article.main_image.url}`}
                        alt={article.title}
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

                        {article.Details?.map((block: any, index: number) => (
                        <p key={index} className="mb-6">
                            {block.children?.map((child: any) => child.text).join("")}
                        </p>
                        ))}

                    </div>
                    </article>
                    <SocialShare
                    title={article.title}
                    />
                </div>
                
            </section>

            {/* this is the related news section */}
            <section className="mt-24 p-[5rem] border-t pt-16">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900">
                    Related News
                </h2>
                <p className="text-center text-gray-500 mt-2 mb-12">
                    Explore more stories from Startime.
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
                                    Read More →
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

            </section>
    </main>
    
    
  );
}