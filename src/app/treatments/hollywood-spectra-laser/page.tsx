import type { Metadata } from "next";
import HollywoodSpectraClient from "./HollywoodSpectraClient";

export const metadata: Metadata = {
  title:
    "Hollywood Spectra™ 激光香港｜5合1納秒激光 荷爾蒙斑 Carbon Peel 去斑嫩膚｜旺角朗豪坊 Peko Beauty",
  description:
    "Hollywood Spectra™ 5合1納秒激光香港｜韓國 Lutronic Q-switched Nd:YAG（1064nm + 532nm）。5種精準模式：Laser Facial美白嫩膚、蜂巢PTP+™荷爾蒙斑（FDA唯一認證）、Carbon Peel碳粉激光收毛孔、Golden Laser消紅印、色斑針對治療。零恢復期，新客試做HK$880，含免費VISIA分析。旺角朗豪坊Peko Beauty，絕無硬銷。",
  keywords: [
    "Hollywood Spectra",
    "Hollywood Spectra 香港",
    "Hollywood Spectra 是什麼",
    "荷里活激光",
    "荷里活激光香港",
    "荷里活激光原理",
    "荷里活激光荷爾蒙斑",
    "荷里活激光副作用",
    "Hollywood Laser Peel 是什麼",
    "Hollywood Spectra vs 皮秒激光",
    "荷里活激光推薦香港",
    "荷里活激光價錢香港",
    "荷里活激光試做香港",
    "荷里活激光優惠",
    "荷里活激光療程香港",
    "荷里活激光去斑",
    "荷里活激光毛孔",
    "荷里活激光金激光",
    "Carbon Peel 香港",
    "碳粉激光香港",
    "PTP 激光荷爾蒙斑",
    "Gold Toning 消紅印",
    "去斑激光香港",
    "荷爾蒙斑激光香港",
    "FDA 認證激光香港",
    "Lutronic Spectra 香港",
    "零恢復期激光香港",
    "旺角醫美",
    "朗豪坊醫美",
    "Peko Beauty",
  ],
  openGraph: {
    title:
      "Hollywood Spectra™ 5合1納秒激光｜荷爾蒙斑 Carbon Peel 去斑嫩膚｜Peko Beauty 旺角朗豪坊",
    description:
      "韓國 Lutronic 5合1納秒激光平台，5種精準模式一套系統搞定：嫩膚、荷爾蒙斑（FDA唯一認證）、Carbon Peel收毛孔、消紅印、去色斑。零恢復期，新客試做HK$880。旺角朗豪坊Peko Beauty。",
    url: "https://www.peko.com.hk/treatments/hollywood-spectra-laser",
    type: "website",
    siteName: "Peko Beauty",
    images: [
      {
        url: "/images/peko-beauty-reception-desk-mong-kok.jpg",
        width: 1200,
        height: 630,
        alt: "Hollywood Spectra™ 5合1納秒激光 香港 Peko Beauty 旺角朗豪坊",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hollywood Spectra™ 5合1激光 香港｜HK$880試做｜Peko Beauty",
    description:
      "5種精準模式：嫩膚、荷爾蒙斑、碳粉控油、消紅印、去色斑。零恢復期，旺角朗豪坊 Peko Beauty。",
  },
  alternates: {
    canonical: "https://www.peko.com.hk/treatments/hollywood-spectra-laser",
  },
};

// ─────────────────────────────────────────────────────────────
// Structured Data (JSON-LD) for E-E-A-T & GEO
// ─────────────────────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalProcedure",
      "@id":
        "https://www.peko.com.hk/treatments/hollywood-spectra-laser#procedure",
      name: "Hollywood Spectra™ 5合1納秒激光",
      alternateName: [
        "Hollywood Spectra Laser",
        "荷里活激光",
        "Hollywood Laser Peel",
        "碳粉激光",
        "Carbon Peel",
        "PTP+ 蜂巢激光",
        "Gold Toning",
      ],
      description:
        "Hollywood Spectra™ 是韓國 Lutronic 出品的 Q-switched Nd:YAG 納秒激光平台（1064nm + 532nm），搭載5種精準治療模式：Laser Facial美白嫩膚、PTP+™多脈衝蜂巢模式（FDA唯一Melasma認證）、Carbon Peel碳粉激光、Golden Laser金激光、色斑針對治療。全系統零恢復期，適合香港日常保養及皮膚問題精準改善。",
      medicalSpecialty: "Dermatology",
      bodyLocation: "Face, Neck, Décolleté",
      procedureType: "Noninvasive",
      howPerformed:
        "Q-switched Nd:YAG 納秒激光（1064nm + 532nm）搭配5種精準模式，包括PTP+™多脈衝技術、Carbon Peel碳粉激光、Gold Toning、色斑針對治療",
      followup: "零恢復期，建議術後嚴格防曬及加強保濕",
      preparation: "清潔面部，如Carbon Peel需塗敷醫用碳粉",
      status: "ActiveNotRecruiting",
    },
    {
      "@type": "MedicalClinic",
      "@id": "https://www.peko.com.hk/#clinic",
      name: "Peko Beauty",
      description:
        "香港旺角朗豪坊醫學美容中心，提供Hollywood Spectra™納秒激光、Sylfirm X微針電波等專業醫美療程",
      url: "https://www.peko.com.hk",
      telephone: "+85253353313",
      email: "info@peko.com.hk",
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "亞皆老街8號朗豪坊辦公室大樓40樓02室",
        addressLocality: "旺角",
        addressRegion: "九龍",
        addressCountry: "HK",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 22.3193,
        longitude: 114.1694,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "11:30",
          closes: "20:30",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Saturday",
          opens: "10:00",
          closes: "19:00",
        },
      ],
      priceRange: "HK$680 - HK$5000",
      currenciesAccepted: "HKD",
      paymentAccepted:
        "Cash, Visa, MasterCard, American Express, UnionPay, FPS, AlipayHK, WeChat Pay HK",
      medicalSpecialty: "Dermatology",
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://www.peko.com.hk/treatments/hollywood-spectra-laser#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "Hollywood Spectra™ 係什麼？有幾多種模式？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Hollywood Spectra™ 是韓國 Lutronic 出品的 Q-switched Nd:YAG 納秒激光平台（1064nm + 532nm），搭載5種精準治療模式：Laser Facial美白嫩膚、PTP+™蜂巢多脈衝（FDA唯一Melasma認證）、Carbon Peel碳粉激光（收毛孔控油）、Golden Laser金激光（消紅印）、色斑針對治療（去雀斑曬斑）。全系統零恢復期。",
          },
        },
        {
          "@type": "Question",
          name: "Hollywood Spectra PTP+™ 蜂巢模式治療荷爾蒙斑有效嗎？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "PTP+™（Pulse Train Protocol）多脈衝模式是全球首個獲美國 FDA 批准（K213569，2022年）專門治療 Melasma（荷爾蒙斑）的激光模式，臨床改善率達 70–80%。其「先穩定再碎斑」雙步驟機制大幅降低反黑風險。旺角朗豪坊 Peko Beauty 採用 Lutronic 原廠正貨 Hollywood Spectra™，新客試做 HK$880。",
          },
        },
        {
          "@type": "Question",
          name: "Hollywood Spectra Carbon Peel 碳粉激光可以收毛孔嗎？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Carbon Peel（荷里活碳粉激光）先塗上醫用碳粉令碳粒深入毛孔，再以 1064nm Spectra Mode 照射，碳粒氣化爆破清除毛孔油脂及角栓，即時收縮毛孔、提亮膚色。屬零恢復期療程，做完即日可化妝返工。",
          },
        },
        {
          "@type": "Question",
          name: "Hollywood Spectra 香港新客試做價係幾多？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Peko Beauty 旺角朗豪坊新客試做價為 HK$880，包含 Hollywood Spectra™ 全面單次療程、免費 VISIA 皮膚深層分析及個人化模式推薦諮詢。明碼實價，絕無隱藏消費，到店後無需即場決定購買任何療程。",
          },
        },
      ],
    },
    {
      "@type": "Offer",
      "@id":
        "https://www.peko.com.hk/treatments/hollywood-spectra-laser#offer",
      name: "Hollywood Spectra™ 新客試做方案",
      description:
        "Hollywood Spectra™ 5合1納秒激光全面單次療程 + 免費VISIA深層皮膚分析 + 個人化模式推薦",
      price: "880",
      priceCurrency: "HKD",
      availability: "https://schema.org/InStock",
      seller: {
        "@id": "https://www.peko.com.hk/#clinic",
      },
      validForMemberTier: "New Customer",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "首頁",
          item: "https://www.peko.com.hk",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "醫學美容療程",
          item: "https://www.peko.com.hk/treatments",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Hollywood Spectra™ 5合1納秒激光",
          item: "https://www.peko.com.hk/treatments/hollywood-spectra-laser",
        },
      ],
    },
  ],
};

export default function HollywoodSpectraPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HollywoodSpectraClient />
    </>
  );
}
