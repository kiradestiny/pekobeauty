import Hero from "@/components/Hero";
import WhyUs from "@/components/WhyUs";
import TreatmentShowcase from "@/components/TreatmentShowcase";
import VisiaSection from "@/components/VisiaSection";
import CaseStudies from "@/components/CaseStudies";
import Testimonials from "@/components/Testimonials";
import HomeFAQ from "@/components/HomeFAQ";
import MarqueeStrip from "@/components/MarqueeStrip";

// ─── Global Structured Data (GEO / AI SEO) ───────────────────────────────────

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.peko.com.hk/#organization",
  name: "Peko Beauty",
  alternateName: "Peko Beauty 肌源解碼美學",
  url: "https://www.peko.com.hk",
  logo: {
    "@type": "ImageObject",
    url: "https://www.peko.com.hk/images/peko-beauty-hong-kong-medical-aesthetics-logo.png",
    width: 400,
    height: 100,
  },
  description:
    "Peko Beauty 是位於香港旺角朗豪坊的高端醫學美容中心，提供 BTL Exion™、Sylfirm X、Hollywood Spectra™ 等國際頂尖原廠儀器療程。全女班團隊，VISIA AI 皮膚分析，效果為本，絕無 Hard Sell。",
  foundingDate: "2025",
  slogan: "肌源解碼 · 定義您的原生美學",
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+85253353313",
      contactType: "customer service",
      availableLanguage: ["zh-HK", "zh-TW", "en"],
      contactOption: "TollFree",
    },
    {
      "@type": "ContactPoint",
      telephone: "+85226622092",
      contactType: "customer support",
      availableLanguage: ["zh-HK"],
    },
  ],
  email: "info@peko.com.hk",
  sameAs: [
    "https://www.facebook.com/pekobeauty/",
    "https://www.instagram.com/pekobeauty_official/",
    "https://www.threads.com/@pekobeauty_official",
    "https://www.youtube.com/@PekoBeauty",
  ],
  areaServed: {
    "@type": "City",
    name: "Hong Kong",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["MedicalClinic", "BeautySalon", "LocalBusiness"],
  "@id": "https://www.peko.com.hk/#clinic",
  name: "Peko Beauty",
  alternateName: "Peko Beauty 旺角朗豪坊",
  image: "https://www.peko.com.hk/images/peko-beauty-reception-desk-mong-kok.jpg",
  logo: "https://www.peko.com.hk/images/peko-beauty-hong-kong-medical-aesthetics-logo.png",
  url: "https://www.peko.com.hk",
  telephone: "+85253353313",
  email: "info@peko.com.hk",
  description:
    "旺角朗豪坊高端醫學美容中心。VISIA 第 7 代 AI 皮膚分析，BTL Exion™、Sylfirm X、Hollywood Spectra™ 等原廠認證療程。全女班資深治療師，Google 評分 4.9★，服務 5,000+ 客戶。",
  priceRange: "HK$380 - HK$3,680",
  currenciesAccepted: "HKD",
  paymentAccepted:
    "Cash, Visa, MasterCard, American Express, UnionPay, FPS, AlipayHK, WeChat Pay HK",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Room 02, 40/F, Office Tower, Langham Place, 8 Argyle Street",
    addressLocality: "Mong Kok",
    addressRegion: "Kowloon",
    addressCountry: "HK",
    postalCode: "",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 22.3193,
    longitude: 114.1694,
  },
  hasMap: "https://maps.app.goo.gl/PNEjSMsQ66Ax7ohX9",
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
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "00:00",
      closes: "00:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "5000",
    bestRating: "5",
    worstRating: "1",
  },
  medicalSpecialty: "Dermatology",
  parentOrganization: {
    "@id": "https://www.peko.com.hk/#organization",
  },
  sameAs: [
    "https://www.facebook.com/pekobeauty/",
    "https://www.instagram.com/pekobeauty_official/",
    "https://www.threads.com/@pekobeauty_official",
    "https://www.youtube.com/@PekoBeauty",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.peko.com.hk/#website",
  name: "Peko Beauty",
  url: "https://www.peko.com.hk",
  description: "香港旺角朗豪坊高端醫學美容中心官方網站",
  inLanguage: "zh-HK",
  publisher: {
    "@id": "https://www.peko.com.hk/#organization",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://www.peko.com.hk/treatments?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      {/* Global Structured Data — SSR rendered */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      <main className="flex flex-col min-h-screen">
        <Hero />

        {/* Trust signals marquee — immediately after hero */}
        <MarqueeStrip speed={32} />

        <WhyUs />

        {/* VISIA 皮膚分析區塊 */}
        <VisiaSection />

        {/* 療程展示區塊 */}
        <TreatmentShowcase />

        {/* 成功案例區塊 */}
        <CaseStudies />

        {/* 客戶評價區塊 */}
        <Testimonials />

        {/* 常見問題區塊 — 首頁專屬 6 題，含 FAQPage schema，與其他頁面完全差異化 */}
        <HomeFAQ />
      </main>
    </>
  );
}
