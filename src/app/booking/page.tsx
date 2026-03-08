import BookingHero from "./components/BookingHero";
import BookingClient from "./components/BookingClient";
import BookingFAQ from "./components/BookingFAQ";

export const metadata = {
  title: "立即預約 | Peko Beauty 醫學美容",
  description: "只需 1 分鐘填寫資料，我們的專業團隊將為您量身定制最適合的美容方案。旺角中心，24小時內確認預約。",
  alternates: {
    canonical: "https://www.peko.com.hk/booking",
  },
  openGraph: {
    title: "立即預約 | Peko Beauty 醫學美容",
    description: "只需 1 分鐘填寫資料，我們的專業團隊將為您量身定制最適合的美容方案。旺角中心，24小時內確認預約。",
    url: "https://www.peko.com.hk/booking",
    siteName: "Peko Beauty",
    locale: "zh_HK",
    type: "website",
  },
};

export default function BookingPage() {
  return (
    <div className="flex flex-col gap-0 pb-20 pt-20 md:pt-24 bg-background overflow-x-hidden">
      {/* 沉浸式 Hero 區塊 */}
      <BookingHero />

      {/* 主要預約表單區塊 */}
      <section className="relative z-10 -mt-8">
        <div className="container mx-auto">
          <BookingClient />
        </div>
      </section>

      {/* 分隔線 */}
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-platinum-silver to-transparent" />
        </div>
      </div>

      {/* 常見問題區塊 */}
      <section className="container mx-auto px-4 py-20">
        <BookingFAQ />
      </section>
    </div>
  );
}
