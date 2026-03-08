import type { Metadata } from "next";
import { Inter, Playfair_Display, Noto_Serif_TC } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import PageLoader from "@/components/PageLoader";
import ScrollProgress from "@/components/ScrollProgress";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

const notoSerifTC = Noto_Serif_TC({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-noto-serif-tc",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.peko.com.hk"),
  title: {
    default: "Peko Beauty | 肌源解碼 · 定義您的原生美學",
    template: "%s | Peko Beauty",
  },
  description:
    "位於旺角朗豪坊的高端醫美中心，提供 BTL Exion™、Sylfirm X 等原廠正貨療程。專業全女班團隊，拒絕無效消費。",
  alternates: {
    canonical: "https://www.peko.com.hk",
  },
  openGraph: {
    type: "website",
    locale: "zh_HK",
    siteName: "Peko Beauty",
    title: "Peko Beauty | 肌源解碼 · 定義您的原生美學",
    description:
      "位於旺角朗豪坊的高端醫美中心，提供 BTL Exion™、Sylfirm X 等原廠正貨療程。專業全女班團隊，拒絕無效消費。",
    images: [
      {
        url: "/images/peko-beauty-reception-desk-mong-kok.jpg",
        width: 1200,
        height: 630,
        alt: "Peko Beauty 旺角朗豪坊醫學美容中心",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@pekobeauty_official",
    title: "Peko Beauty | 肌源解碼 · 定義您的原生美學",
    description:
      "位於旺角朗豪坊的高端醫美中心，提供 BTL Exion™、Sylfirm X 等原廠正貨療程。專業全女班團隊，拒絕無效消費。",
    images: ["/images/peko-beauty-reception-desk-mong-kok.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-HK" className="overflow-x-hidden">
      <body
        className={`${inter.variable} ${playfair.variable} ${notoSerifTC.variable} ${inter.className} overflow-x-hidden`}
        suppressHydrationWarning
      >
        {/* Global immersive UX components */}
        <PageLoader />
        <ScrollProgress />

        <Header />
        {children}
        <WhatsAppFloat />
        <Footer />
      </body>
    </html>
  );
}
