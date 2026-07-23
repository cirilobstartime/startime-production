import type { Metadata } from "next";
import { Roboto, Noto_Kufi_Arabic } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import { IntlProvider } from "@/components/IntlProvider";
import Footer from "@/components/Footer";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
  subsets: ["latin"],
});

const notoKufi = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto-kufi",
});

export const metadata: Metadata = {
  title: "Startime",
  description: "Ultimate Impact Agency",
  icons: {
    icon: "/startime horizntal white logo .svg",
  },
  openGraph: {
    siteName: "Startime",
    title: "Startime",
    description: "Ultimate Impact Agency",
    url: "https://startime.sa",
    type: "website",
    images: [
      {
        url: "https://startime.sa/startime%20horizntal%20logo%20.svg",
        alt: "Startime - Ultimate Impact Agency Logo",
      },
    ],
  },
  metadataBase: new URL("https://startime.sa"),
};

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const direction = locale === "ar" ? "rtl" : "ltr";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://startime.sa/#organization",
        name: "Startime",
        url: "https://startime.sa",
        logo: {
          "@type": "ImageObject",
          url: "https://startime.sa/startime%20horizntal%20logo%20.svg",
          caption: "Startime",
        },
        sameAs: ["https://startime.sa"],
      },
      {
        "@type": "WebSite",
        "@id": "https://startime.sa/#website",
        url: "https://startime.sa",
        name: "Startime",
        publisher: {
          "@id": "https://startime.sa/#organization",
        },
      },
    ],
  };

  return (
    <html lang={locale} dir={direction}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${roboto.variable} ${notoKufi.variable} antialiased`}>
        <IntlProvider locale={locale}>
          <Navbar />
          <main>{children}</main>
          <Footer/>
        </IntlProvider>
        {/* <GoogleTagManager
          gtmId={process.env.NEXT_PUBLIC_GTM_ID!}
        /> */}
        <GoogleTagManager gtmId="GTM-MLG4X755" />
      </body>
    </html>
  );
}
