import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "聯絡我們 | Peko Beauty 旺角朗豪坊醫學美容中心",
  description:
    "聯絡 Peko Beauty：WhatsApp +852 5335 3313（即時回覆）、電話 +852 2662 2092、電郵 info@peko.com.hk。地址：旺角亞皆老街 8 號朗豪坊辦公室大樓 40 樓 02 室。港鐵旺角站 C 出口步行約 5 分鐘。",
  alternates: {
    canonical: "https://www.peko.com.hk/contact",
  },
  openGraph: {
    title: "聯絡我們 | Peko Beauty 旺角朗豪坊醫學美容中心",
    description:
      "WhatsApp +852 5335 3313（即時回覆）。旺角亞皆老街 8 號朗豪坊辦公室大樓 40 樓 02 室。港鐵旺角站 C 出口步行約 5 分鐘。",
    url: "https://www.peko.com.hk/contact",
    siteName: "Peko Beauty",
    locale: "zh_HK",
    type: "website",
    images: [
      {
        url: "/images/peko-beauty-reception-desk-mong-kok.jpg",
        width: 1200,
        height: 630,
        alt: "Peko Beauty 旺角朗豪坊醫學美容中心聯絡資訊",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "聯絡我們 | Peko Beauty 旺角朗豪坊",
    description:
      "WhatsApp +852 5335 3313（即時回覆）。旺角亞皆老街 8 號朗豪坊辦公室大樓 40 樓 02 室。",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
