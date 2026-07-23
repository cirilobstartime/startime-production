"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";

export const ContactHeader = () => {
  const t = useTranslations("contact");
  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    <section className="w-full bg-white py-20 px-6" dir={isAr ? "rtl" : "ltr"}>
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        
        {/* العنوان الرئيسي */}
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-[#5b4180] text-4xl md:text-6xl font-black mb-10 tracking-tight uppercase"
        >
          {t("title") || (isAr ? "نتصل بالجميع" : "Connecting with Everyone")}
        </motion.h2>

        {/* استبدال الخطوط بكتل نصية مرتبة هرمياً (Hierarchical Text Blocks) */}
        <div className="flex flex-col items-center w-full space-y-6">
          
          {/* النص الأول: يحل محل الخط العريض جداً (Highlight Text) */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className=" text-black px-8 py-4 w-full md:w-[90%] transform origin-center"
          >
            <p className="text-lg md:text-xl font-bold tracking-widest uppercase">
              {t("highlight") || (isAr ? "نحن هنا للإجابة على تساؤلاتكم وبناء شراكات مستدامة" : "We are here to answer your questions and build sustainable partnerships")}
            </p>
          </motion.div>
          
          {/* النصوص السفلية: تحل محل الخطوط النحيفة المزدوجة */}
          <div className="space-y-4 w-[85%]">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-black text-base md:text-lg font-medium leading-relaxed"
            >
              {t("subtext") || (isAr ? "فريقنا المتخصص مستعد لتقديم الدعم الفني والاستشارات المؤسسية على مدار الساعة." : "Our specialized team is ready to provide technical support and corporate consultations around the clock.")}
            </motion.p>

            {/* خط فاصل بسيط جداً للحفاظ على روح التصميم */}
            <div className="h-[2px] bg-black/10 w-24 mx-auto" />

            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-black/70 text-sm md:text-base font-bold italic"
            >
              {t("subtext") || (isAr ? "تواصل معنا اليوم لنبدأ رحلة النجاح معاً." : "Contact us today to start our success journey together.")}
            </motion.p>
          </div>
        </div>

      </div>
    </section>
  );
};