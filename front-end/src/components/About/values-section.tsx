"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { ChevronLeft, ChevronRight, X, Paperclip, Send } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import MoveRightButton from "../MoveRightButton";

const STRAPI_BASE_URL = "https://staging.startime.sa";

interface GovernanceCard {
    id: number;
    title: string;
    desc: string;
    imageUrl: string | null;
    category?: string;
}

export default function GovernanceSection() {
    const t = useTranslations("AboutPage");
    const locale = useLocale();
    const isAr = locale === "ar";
    const swiperRef = useRef<any>(null);

    const [governanceCards, setGovernanceCards] = useState<GovernanceCard[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formRef.current) return;
        setStatus("loading");
        try {
            const res = await fetch("/api/discover-us", {
                method: "POST",
                body: new FormData(formRef.current),
            });
            const data = await res.json();
            if (data.success) {
                setStatus("success");
                setTimeout(() => {
                    setIsModalOpen(false);
                    setStatus("idle");
                    setSelectedFiles([]);
                }, 2000);
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    useEffect(() => {
        const fetchGovernanceData = async () => {
            try {
                const url = `${STRAPI_BASE_URL}/api/discover-ceo-elements?populate=*&locale=${locale}`;
                const res = await fetch(url, { cache: "no-store" });
                const result = await res.json();

                if (result?.data) {
                    const mappedData = result.data.map((item: any) => {
                        const textData = item.element_text?.[0];
                        const imgPath = item.element_logo?.url;
                        return {
                            id: item.id,
                            title: textData?.title || "",
                            desc: textData?.description || "",
                            category: item.category || (isAr ? "قسم الحوكمة" : "Governance Dept"),
                            imageUrl: imgPath ? `${STRAPI_BASE_URL}${imgPath}` : null,
                        };
                    });
                    setGovernanceCards(mappedData);
                }
            } catch (error) {
                console.error("Governance API Error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchGovernanceData();
    }, [locale]);

    // التحكم في سكرول الصفحة عند فتح المودال
    useEffect(() => {
        if (isModalOpen) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "unset";
    }, [isModalOpen]);

    if (loading) return null;

    return (
        <section className="bg-white py-12 md:py-24 border-b border-gray-100 overflow-hidden" dir={isAr ? "rtl" : "ltr"}>
            <div className="mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="flex flex-col lg:flex-row items-center justify-between mb-10 md:mb-16 gap-6">
                    <h2 className="text-3xl md:text-5xl font-black text-[#5b4180] text-center lg:text-right">
                        {t("governance.title") || (isAr ? "الحوكمة المؤسسية" : "Corporate Governance")}
                    </h2>

                    <div className="flex gap-4">
                        <button
                            onClick={() => swiperRef.current?.slidePrev()}
                            className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all active:scale-90"
                        >
                            {isAr ? <ChevronRight size={28} /> : <ChevronLeft size={28} />}
                        </button>
                        <button
                            onClick={() => swiperRef.current?.slideNext()}
                            className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all active:scale-90"
                        >
                            {isAr ? <ChevronLeft size={28} /> : <ChevronRight size={28} />}
                        </button>
                    </div>
                </div>

                {/* Slider */}
                <Swiper
    onSwiper={(swiper) => (swiperRef.current = swiper)}
    modules={[Navigation]}
    slidesPerView="auto"
    spaceBetween={20}
    className="!overflow-visible"
>
    {governanceCards.map((card) => (
        <SwiperSlide key={card.id} className="!w-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                /* تعديل الخلفية والبوردر والظل */
                className="bg-[#F8F9FA] p-6 w-[280px] md:w-[350px] min-h-[200px]  border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
            >
                <div className="space-y-4">
                    {/* النص العلوي الصغير (Subtitle) باللون البنفسجي */}

                    {/* العنوان الرئيسي */}
                    <h3 className="text-[#5b4180] font-extrabold text-lg md:text-xl leading-snug group-hover:text-[#5B3E83] transition-colors">
                        {card.title}
                    </h3>

                    {/* الوصف مع التاريخ */}
                    <div className="text-[#5b4180] text-xs md:text-sm leading-relaxed">
                       
                        <p className="mt-2 line-clamp-5">
                            {card.desc}
                        </p>
                    </div>
                </div>

                {/* زر Read More في الأسفل */}
               
            </motion.div>
        </SwiperSlide>
    ))}
</Swiper>

                {/* CTA Button */}
                <div className="mt-16 md:mt-24 flex justify-center px-4">
    <motion.button
  onClick={() => setIsModalOpen(true)}
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  className="group text-[#5b4180] py-4 md:py-5 text-xl md:text-2xl font-black border-b-2 border-[#5b4180] inline-flex items-center justify-center gap-2 transition-all"
>
  <span>
    {t("governance.cta") ||
      (isAr
        ? "تواصل مع فريق الموارد المؤسسية"
        : "Contact HR Team")}
  </span>

  <motion.svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="transition-transform duration-300"
    whileHover={{ x: isAr ? -6 : 6 }}
  >
    <path d="M5 12h14" />
    <path d="M12 5l7 7-7 7" />
  </motion.svg>
</motion.button>

               
                </div>
            </div>

            {/* Popup / Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 40 }}
                            className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]"
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-5 md:p-6 border-b border-gray-100">
                                <h2 className="text-[#5D44A7] text-lg md:text-2xl font-bold">
                                    {isAr ? "تواصل مع فريق الموارد المؤسسية" : "Connect with the Corporate Resources Team"}
                                </h2>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-black transition-colors">
                                    <X size={28} />
                                </button>
                            </div>

                            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
                            {/* Form Content */}
                            <div className="flex-1 overflow-y-auto p-5 md:p-8 space-y-5 custom-scrollbar">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-sm font-bold text-gray-700">{isAr ? "جهة / القسم" : "Department"}</label>
                                        <input name="entity" type="text" className="w-full border border-gray-200 p-2 focus:border-[#7F56D9] outline-none transition-colors" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-bold text-gray-700">{isAr ? "الاسم" : "Name"}</label>
                                        <input name="name" type="text" className="w-full border border-gray-200 p-2 focus:border-[#7F56D9] outline-none transition-colors" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-bold text-gray-700">{isAr ? "المصب الوظيفي" : "Position"}</label>
                                        <input name="position" type="text" className="w-full border border-gray-200 p-2 focus:border-[#7F56D9] outline-none transition-colors" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-bold text-gray-700">{isAr ? "رقم الهاتف" : "Phone"}</label>
                                        <input name="phone" type="tel" className="w-full border border-gray-200 p-2 focus:border-[#7F56D9] outline-none transition-colors text-left" dir="ltr" />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-sm font-bold text-gray-700">{isAr ? "البريد الإلكتروني" : "Email"}</label>
                                    <input name="email" type="email" className="w-full border border-gray-200 p-2 focus:border-[#7F56D9] outline-none transition-colors text-left" dir="ltr" />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-sm font-bold text-gray-700">{isAr ? "الرسالة" : "Message"}</label>
                                    <textarea name="message" rows={4} className="w-full border border-gray-200 p-2 focus:border-[#7F56D9] outline-none transition-colors resize-none" />
                                </div>

                                {/* Attachments Area */}
                                <div className="space-y-1">
                                    <label className="text-sm font-bold text-gray-700">{isAr ? "المرفقات" : "Attachments"}</label>
                                    <label className="border-2 border-dashed border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors group">
                                        <input
                                            name="attachments"
                                            type="file"
                                            multiple
                                            className="hidden"
                                            onChange={(e) => setSelectedFiles(Array.from(e.target.files || []))}
                                        />
                                        <Paperclip className="text-gray-400 group-hover:text-[#7F56D9] mb-2" />
                                        {selectedFiles.length > 0 ? (
                                            <span className="text-[#7F56D9] text-sm font-medium text-center">
                                                {selectedFiles.map((f) => f.name).join(", ")}
                                            </span>
                                        ) : (
                                            <span className="text-gray-400 group-hover:text-gray-600 text-sm">
                                                {isAr ? "اضغط لرفع الملفات" : "Click to upload files"}
                                            </span>
                                        )}
                                    </label>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="p-5 md:p-6 bg-gray-50 border-t border-gray-100">
                                {status === "success" && (
                                    <p className="text-green-600 font-bold text-center mb-3 italic">
                                        {isAr ? "تم الإرسال بنجاح!" : "Sent successfully!"}
                                    </p>
                                )}
                                {status === "error" && (
                                    <p className="text-red-600 font-bold text-center mb-3 italic">
                                        {isAr ? "حدث خطأ، يرجى المحاولة مرة أخرى" : "An error occurred, please try again"}
                                    </p>
                                )}
                                <button
                                    type="submit"
                                    disabled={status === "loading" || status === "success"}
                                    className="w-full bg-[#5D44A7] text-white py-4 rounded-lg font-black flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:opacity-60"
                                >
                                    <Send size={20} className={isAr ? "rotate-180" : ""} />
                                    {status === "loading"
                                        ? (isAr ? "جاري الإرسال..." : "Sending...")
                                        : (isAr ? "إرسال" : "Submit")}
                                </button>
                            </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}