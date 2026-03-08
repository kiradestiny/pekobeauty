import type { Metadata } from "next";
import SylfirmXClient from "./SylfirmXClient";

// ============================================================
// SEO METADATA
// ============================================================
export const metadata: Metadata = {
  title: "矽谷電波 Sylfirm X 香港｜肝斑凹凸洞雙波黃金微針 試做 HK$1,880 | Peko Beauty 旺角朗豪坊",
  description:
    "矽谷電波（Sylfirm X）全球唯一雙波RF微針（PW+CW），FDA Class II 雙模式認證，NA Effect 技術根源修復肝斑基底膜，單次 20–30% 色素改善。凹凸洞・玫瑰痤瘡・PIH 首選，新客試做 HK$1,880，Peko Beauty 旺角朗豪坊，零硬銷。",
  alternates: {
    canonical: "https://www.peko.com.hk/treatments/sylfirm-x",
  },
  openGraph: {
    type: "website",
    locale: "zh_HK",
    siteName: "Peko Beauty",
    title: "矽谷電波 Sylfirm X｜肝斑凹凸洞雙波黃金微針 HK$1,880 | Peko Beauty 旺角",
    description:
      "矽谷電波 Sylfirm X｜全球唯一雙波RF微針，修復肝斑基底膜，單次20–30%改善，FDA Class II 雙模式認證，凹凸洞・玫瑰痤瘡・PIH。試做 HK$1,880，零硬銷。",
    url: "https://www.peko.com.hk/treatments/sylfirm-x",
    images: [
      {
        url: "/images/peko-beauty-reception-desk-mong-kok.jpg",
        width: 1200,
        height: 630,
        alt: "Peko Beauty Sylfirm X 雙波黃金微針 凹凸洞治療 旺角朗豪坊",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "矽谷電波 Sylfirm X｜肝斑凹凸洞雙波黃金微針 HK$1,880 | Peko Beauty 旺角",
    images: ["/images/peko-beauty-reception-desk-mong-kok.jpg"],
  },
};

// ============================================================
// SCHEMA MARKUP (5 schemas — SSR rendered, no hydration cost)
// ============================================================
const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Sylfirm X 幾多次先見效？完整療程需要做幾耐？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "大部分客人在第 2 次療程後（即約第 8 週）開始見到凹凸洞邊緣柔化、膚色提亮的明顯改善。完整療程建議 3–6 次，每 4 週一次，整個療程周期約 3–6 個月。荷爾蒙斑患者通常需要 4–6 次，凹凸洞及毛孔問題一般 3–4 次已有顯著效果，實際次數由治療師根據 VISIA 分析數據評估。",
      },
    },
    {
      "@type": "Question",
      name: "Sylfirm X 痛唔痛？做完可以即日返工嗎？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "痛感約 3/10，感覺似橡皮筋輕輕彈皮膚加上微微熱感。Peko Beauty 標準流程包含敷麻醉藥膏 30 分鐘，大部分客人形容過程舒適。停工期極短，做完後約 4–6 小時輕微泛紅，翌日可正常上妝返工，完全不影響日常生活。",
      },
    },
    {
      "@type": "Question",
      name: "Sylfirm X 同 CO2 Laser 有咩分別？邊個改善凹凸洞效果更好？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CO2 Laser 係剝脫性激光，改善嚴重深層凹凸洞效果強，但停工期長達 5–7 天，深色膚質反黑風險高，不適合敏感肌及荷爾蒙斑患者。Sylfirm X 以 RF 微針直接在真皮層發射能量，停工期僅 4–6 小時，適合敏感肌及亞洲膚質，且能同時修復基底膜改善荷爾蒙斑。輕中度凹凸洞 Sylfirm X 效果已非常顯著；嚴重深洞可考慮配合 CO2 Laser 分階段處理。",
      },
    },
    {
      "@type": "Question",
      name: "荷爾蒙斑（肝斑）適合做 Sylfirm X 嗎？係咪真係唔會反黑？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "荷爾蒙斑係 Sylfirm X 最主要的適應症之一。其 PW 脈衝波段以溫和間歇性能量作用，組織溫度控制在 42–45°C，不會刺激黑色素細胞活躍，反黑風險極低。Sylfirm X 能修復導致肝斑持續形成的基底膜根源，實現更穩定的長遠改善效果，停做後不易反黑。",
      },
    },
    {
      "@type": "Question",
      name: "做完 Sylfirm X 需要注意咩？可以即日上妝嗎？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "療程後建議當天素顏或只塗防曬，翌日可正常上妝。術後 1 週內避免使用果酸、A 醇（Retinol）、高濃度維他命 C 等刺激性成分。加強保濕，使用溫和修復型護膚品。防曬係必須，建議全程 SPF 50+。",
      },
    },
    {
      "@type": "Question",
      name: "Sylfirm X 香港試做價係幾多？Peko Beauty 有冇隱藏收費？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Peko Beauty 旺角朗豪坊的 Sylfirm X 新客試做價為 HK$1,880（全面），包含免費 VISIA 皮膚深層分析，原價 HK$4,000。Peko Beauty 承諾明碼實價，到診後無需即場決定購買套票，沒有最低消費，亦無任何隱藏附加費用。",
      },
    },
    {
      "@type": "Question",
      name: "Peko Beauty 旺角朗豪坊點去？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Peko Beauty 位於九龍旺角亞皆老街 8 號朗豪坊辦公室大樓 40 樓 02 室。港鐵旺角站 C 出口步行約 5 分鐘。營業時間：週一至五 11:30–20:30，週六 10:00–19:00，公眾假期 11:00–18:00，週日休息。",
      },
    },
    {
      "@type": "Question",
      name: "Peko Beauty 接受咩付款方式？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Peko Beauty 接受現金（港幣）、Visa、MasterCard、American Express、銀聯卡、轉數快（FPS）、支付寶香港（AlipayHK）及微信支付香港（WeChat Pay HK）。",
      },
    },
    {
      "@type": "Question",
      name: "矽谷電波（Sylfirm X）vs 皮秒激光，淡肝斑邊個更好？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "皮秒激光主要透過超短脈衝打散表層色素顆粒，對曬斑、雀斑等淺層色素有效，但對反覆發作的肝斑（Melasma）效果不穩定，亞洲膚質更有反黑風險。矽谷電波（Sylfirm X）的 PW 脈衝波則透過 NA Effect 技術，選擇性修復基底膜及清除異常微血管，從根源截斷肝斑養分來源，反黑風險極低。因此若主要問題是肝斑、PIH 或敏感肌泛紅，矽谷電波通常更具優勢；若係表層曬斑，可按個人膚況評估兩者或組合使用。",
      },
    },
    {
      "@type": "Question",
      name: "矽谷電波 Sylfirm X vs Morpheus8，兩個 RF 微針邊個效果更持久？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "兩者同屬 RF 微針，對膠原重組、毛孔及痘疤均有幫助。矽谷電波（Sylfirm X）獨有雙波技術——PW 脈衝波針對基底膜修復及異常微血管（肝斑、PIH、酒糟泛紅適合）、CW 連續波負責膠原增生緊緻，合共獲美國 FDA Class II 雙模式認證（K200185 / K213612）。Morpheus8 屬單模式微針電波，在深層塑形方面有其適應症。若主訴是肝斑、PIH、玫瑰痤瘡，矽谷電波更對症；若主訴是輪廓緊緻，則需由專業評估選擇。",
      },
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Peko Beauty Sylfirm X 雙波黃金微針完整療程流程",
  description:
    "Sylfirm X 透過全球唯一雙波 RF 微針技術（PW 脈衝波 + CW 連續波），改善凹凸洞、荷爾蒙斑及玫瑰痤瘡。以下為 Peko Beauty 旺角朗豪坊的標準療程步驟。",
  estimatedCost: { "@type": "MonetaryAmount", currency: "HKD", value: "1880" },
  totalTime: "PT60M",
  step: [
    {
      "@type": "HowToStep",
      position: "1",
      name: "WhatsApp 預約",
      text: "透過 WhatsApp +852 5335 3313 預約，建議提前至少 1 天，熱門時段建議提前 3–5 天。",
    },
    {
      "@type": "HowToStep",
      position: "2",
      name: "到診 + 免費 VISIA 360° 皮膚深層分析",
      text: "到達旺角朗豪坊 40 樓後，治療師以 VISIA 儀器量化評估凹凸洞深度、色素分佈、毛孔狀況，以科學數據制定療程方案。",
    },
    {
      "@type": "HowToStep",
      position: "3",
      name: "個人化方案制定",
      text: "治療師根據 VISIA 數據說明最適合的 Sylfirm X 模式配置及建議次數，全程無硬銷壓力。",
    },
    {
      "@type": "HowToStep",
      position: "4",
      name: "敷麻醉藥膏 30 分鐘後進行 Sylfirm X 療程",
      text: "即場開封原廠 Sylfirm X 探頭，以 0.3mm 非絕緣金針技術對全面進行雙波射頻微針治療，治療過程約 30–45 分鐘。",
    },
    {
      "@type": "HowToStep",
      position: "5",
      name: "冷敷舒緩 + 術後護理指引 + WhatsApp 48 小時跟進",
      text: "療程後即場冷敷，泛紅約 4–6 小時消退。治療師提供個人化術後護理指引，並透過 WhatsApp 在 48 小時內主動跟進恢復情況。",
    },
  ],
};

const medicalWebPageSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "矽谷電波 Sylfirm X 香港｜雙波黃金微針肝斑・凹凸洞・玫瑰痤瘡 效果/次數/副作用完整解析",
  description:
    "矽谷電波（Sylfirm X）全球唯一雙波RF微針，FDA Class II 雙模式認證，NA Effect 技術根源修復肝斑基底膜，單次 20–30% 色素改善。凹凸洞・玫瑰痤瘡・PIH 首選，新客試做 HK$1,880，Peko Beauty 旺角朗豪坊，零硬銷。",
  url: "https://www.peko.com.hk/treatments/sylfirm-x",
  inLanguage: "zh-HK",
  about: {
    "@type": "MedicalProcedure",
    name: "Sylfirm X 雙波黃金微針射頻",
    procedureType: "NoninvasiveProcedure",
    bodyLocation: "面部",
    indication: {
      "@type": "MedicalIndication",
      name: "凹凸洞、荷爾蒙斑、玫瑰痤瘡、毛孔粗大、皮膚鬆弛",
    },
  },
  medicalAudience: { "@type": "MedicalAudience", audienceType: "Patient" },
  reviewedBy: {
    "@type": "Person",
    name: "Peko Beauty 醫美顧問團隊",
    worksFor: { "@type": "MedicalBusiness", name: "Peko Beauty" },
  },
  dateModified: "2026-03-08",
};

const medicalBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Peko Beauty",
  alternateName: "Peko Beauty 肌源解碼美學",
  image: "https://www.peko.com.hk/images/peko-beauty-hong-kong-medical-aesthetics-logo.png",
  logo: "https://www.peko.com.hk/images/peko-beauty-hong-kong-medical-aesthetics-logo.png",
  url: "https://www.peko.com.hk",
  telephone: "+85253353313",
  email: "info@peko.com.hk",
  priceRange: "$$$",
  currenciesAccepted: "HKD",
  paymentAccepted: "Cash, Visa, MasterCard, American Express, UnionPay, FPS, AlipayHK, WeChat Pay HK",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Room 02, 40/F, Office Tower, Langham Place, 8 Argyle Street",
    addressLocality: "Mong Kok",
    addressRegion: "Kowloon",
    addressCountry: "HK",
  },
  geo: { "@type": "GeoCoordinates", latitude: "22.3193", longitude: "114.1694" },
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
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "PublicHolidays",
      opens: "11:00",
      closes: "18:00",
    },
  ],
  hasMap: "https://maps.app.goo.gl/PNEjSMsQ66Ax7ohX9",
  sameAs: [
    "https://www.facebook.com/pekobeauty/",
    "https://www.instagram.com/pekobeauty_official/",
    "https://www.threads.com/@pekobeauty_official",
    "https://www.youtube.com/@PekoBeauty",
  ],
};

const offerSchema = {
  "@context": "https://schema.org",
  "@type": "Offer",
  name: "Sylfirm X 雙波黃金微針 新客試做優惠",
  description:
    "Sylfirm X 全面單次療程，包含免費 VISIA 皮膚深層分析，新客限定試做優惠",
  price: "1880",
  priceCurrency: "HKD",
  availability: "https://schema.org/InStock",
  validFrom: "2026-01-01",
  eligibleCustomerType: "https://schema.org/NewCustomer",
  seller: { "@type": "MedicalBusiness", name: "Peko Beauty", url: "https://www.peko.com.hk" },
  url: "https://www.peko.com.hk/treatments/sylfirm-x",
};

// ============================================================
// PAGE COMPONENT (Server)
// ============================================================
export default function SylfirmXPage() {
  return (
    <>
      {/* Inject all schema scripts — SSR, no JS bundle cost */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalWebPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerSchema) }}
      />

      <SylfirmXClient />
    </>
  );
}
