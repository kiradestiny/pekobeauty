import Link from "next/link";
import { ArrowRight, Check, ChevronRight, Sparkles, Heart, Star, ShieldCheck, Lock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "私密健康護理療程推薦 | Peko Beauty 醫學美容",
  description:
    "針對私密鬆弛、輕微尿滲、黏膜乾燥的專業療程推薦。BTL EMfemme 360 全球認可的 360° 環迴射頻技術，全女班主理，使用一次性探頭，立即預約免費諮詢。",
  alternates: {
    canonical: "https://www.peko.com.hk/concerns/intimate-care",
  },
  openGraph: {
    title: "私密健康護理療程推薦 | Peko Beauty",
    description: "重拾私密健康自信，舒適安心的女性專屬護理體驗。",
    url: "https://www.peko.com.hk/concerns/intimate-care",
    siteName: "Peko Beauty",
    locale: "zh_HK",
    type: "website",
    images: [
      {
        url: "/images/peko-beauty-reception-desk-mong-kok.jpg",
        width: 1200,
        height: 630,
        alt: "私密健康護理療程推薦 Peko Beauty 旺角朗豪坊",
      },
    ],
  },
};

const symptoms = [
  { label: "私密鬆弛感", desc: "產後或年齡增長導致私密肌肉及黏膜組織彈性下降" },
  { label: "輕微尿滲 / 壓力性尿失禁", desc: "咳嗽、打噴嚏或運動時出現輕微漏尿情況" },
  { label: "私密乾燥不適", desc: "黏膜老化萎縮，分泌減少，引致乾燥及不適感" },
  { label: "私密敏感度下降", desc: "神經末梢功能因組織鬆弛而退化，影響生活質素" },
  { label: "產後修復需求", desc: "分娩後需要針對性的盆底組織修復及功能重建" },
  { label: "更年期私密症狀", desc: "荷爾蒙水平下降引致的一系列私密健康困擾" },
];

const treatments = [
  {
    tag: "🏆 核心療程",
    tagStyle: "bg-pink-50 text-pink-700 border border-pink-200",
    name: "BTL EMfemme 360",
    href: "/treatments/btl-emfemme-360",
    subtitle: "360° 環迴溫控射頻 · 私密修復專家",
    why: "BTL EMfemme 360 採用全球獨有的 360° 環迴射頻技術，均勻加熱私密黏膜及盆底組織，安全刺激膠原蛋白重組，改善陰道鬆弛、乾燥及輕微尿滲問題。全程舒適無痛，每次療程僅需 30 分鐘。",
    features: ["360° 環迴均勻加熱技術", "改善陰道鬆弛及乾燥", "針對輕微壓力性尿滲", "使用一次性探頭，衛生安心"],
    price: "試做價 HK$3,680",
    highlight: true,
  },
  {
    tag: "✨ 療程亮點",
    tagStyle: "bg-rose-50 text-rose-700 border border-rose-200",
    name: "全女班主理",
    href: "/treatments/btl-emfemme-360",
    subtitle: "全程女性治療師 · 私密舒適體驗",
    why: "Peko Beauty 深明私密護理的特殊性，特設全女班主理。從諮詢、評估到療程全程由女性專業美療師陪同，確保你在最舒適、最安心的環境下完成每次療程，充分尊重你的私密空間。",
    features: ["全程女性治療師主理", "私密獨立房間", "保密咨詢環境", "療程前詳細講解說明"],
    price: "免費諮詢評估",
    highlight: false,
  },
  {
    tag: "📋 療程須知",
    tagStyle: "bg-purple-50 text-purple-700 border border-purple-200",
    name: "療程安全與注意事項",
    href: "/treatments/btl-emfemme-360",
    subtitle: "安全認證 · 適合人群說明",
    why: "BTL EMfemme 360 獲多個國際醫療認證，非手術、非侵入性，基本無恢復期，療程後可即時正常生活。建議每 1–2 週進行一次，共 3–4 次為一個療程週期，效果可維持 12 個月以上。",
    features: ["非手術非侵入性療程", "基本無恢復期", "一次性探頭，零交叉感染", "不適用：懷孕期、月經期"],
    price: "建議 3–4 次療程",
    highlight: false,
  },
];

const faqs = [
  {
    q: "BTL EMfemme 360 療程有痛感嗎？",
    a: "療程全程採用溫控技術，大多數客人形容感覺如溫熱按摩，舒適無痛感。我們的裝置設有實時溫度監控，確保治療溫度在安全範圍內，客人可隨時要求調整能量。",
  },
  {
    q: "私密護理療程有什麼禁忌？",
    a: "以下情況暫不建議進行療程：妊娠期間、月經期間（建議月經結束後 3 天再進行）、骨盆腔急性炎症、體內有金屬植入物（如子宮環）。我們在諮詢時會詳細問診，確保療程適合你。",
  },
  {
    q: "需要做多少次才有效果？",
    a: "大多數客人在 3–4 次療程後有明顯感覺改善。建議每 1–2 週進行一次，完成一個完整療程週期後效果最佳，可維持 12 個月以上。之後每半年至一年進行維護療程，保持長期效果。",
  },
  {
    q: "療程後需要休養嗎？可以正常生活嗎？",
    a: "BTL EMfemme 360 基本沒有恢復期，療程後可即時正常生活及工作。療程後建議 24–48 小時內避免性行為及游泳，其他日常活動不受限制。",
  },
];

export default function IntimateCarePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ── Breadcrumb ── */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-1.5 text-xs text-gray-400">
            <Link href="/" className="hover:text-gray-600 transition-colors">首頁</Link>
            <ChevronRight size={12} />
            <Link href="/concerns" className="hover:text-gray-600 transition-colors">肌膚困擾</Link>
            <ChevronRight size={12} />
            <span className="text-gray-600 font-medium">私密健康護理</span>
          </nav>
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-pink-50 via-rose-50 to-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-100/60 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-pink-600 bg-pink-50 border border-pink-200 px-3 py-1.5 rounded-full mb-5">
              <Sparkles size={11} />
              女性私密健康護理
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
              私密健康護理
            </h1>
            <p className="text-xl text-gray-600 mb-6 leading-relaxed max-w-2xl">
              私密健康是女性整體健康不可忽視的一部分。無論是產後修復、更年期護理還是日常維護，Peko Beauty 提供全程女班主理、安全舒適的私密醫美護理方案，讓你重拾自信與舒適。
            </p>
            <div className="flex flex-wrap gap-2">
              {["全女班主理", "非手術非侵入", "30 分鐘療程", "一次性探頭衛生安心"].map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 text-sm text-pink-700 bg-pink-50 border border-pink-200 px-3 py-1 rounded-full font-medium">
                  <Check size={13} /> {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Privacy Notice Banner ── */}
      <div className="bg-pink-900/5 border-y border-pink-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3 max-w-3xl">
            <Lock size={16} className="text-pink-500 flex-shrink-0" />
            <p className="text-sm text-gray-600">
              <span className="font-semibold">私密護理承諾：</span>
              所有諮詢及療程記錄嚴格保密，全程由女性治療師主理，獨立私密房間，你的隱私是我們的首要考慮。
            </p>
          </div>
        </div>
      </div>

      {/* ── Symptoms ── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">你是否有以下困擾？</h2>
            <p className="text-gray-500">以下情況均可透過非手術醫美療程安全改善，無需尷尬，專業諮詢即可獲得解決方案</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {symptoms.map((s) => (
              <div key={s.label} className="flex gap-3 p-4 bg-pink-50/50 rounded-2xl border border-pink-100">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center mt-0.5">
                  <Check size={11} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm mb-0.5">{s.label}</p>
                  <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Treatments ── */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">推薦療程方案</h2>
            <p className="text-gray-500">以全球認可的非手術醫美技術，安全有效地改善私密健康狀況</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {treatments.map((t) => (
              <div
                key={t.name}
                className={`bg-white rounded-3xl p-6 flex flex-col border-2 ${
                  t.highlight ? "border-pink-300 shadow-lg shadow-pink-100" : "border-gray-100"
                }`}
              >
                <span className={`text-xs font-bold px-3 py-1 rounded-full mb-4 self-start ${t.tagStyle}`}>
                  {t.tag}
                </span>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{t.name}</h3>
                <p className="text-xs text-gray-400 mb-3 font-medium">{t.subtitle}</p>
                <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1">{t.why}</p>
                <ul className="space-y-1.5 mb-5">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-gray-600">
                      <Star size={11} className="text-pink-500 flex-shrink-0" fill="currentColor" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-sm font-bold text-[#C52B21] mb-3">{t.price}</p>
                  <Link
                    href={t.href}
                    className="flex items-center justify-center gap-2 bg-gray-900 text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-[#C52B21] transition-colors duration-200"
                  >
                    了解詳情 <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust Section ── */}
      <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-pink-400 mb-3 block">為什麼選擇 Peko Beauty</span>
            <h2 className="text-3xl font-bold mb-3">安心、私密、專業</h2>
            <p className="text-gray-400 max-w-xl mx-auto">我們深明私密護理需要特別的信任與尊重，每一個細節都為你的舒適和私隱而設</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            {[
              { icon: "👩‍⚕️", title: "全女班主理", desc: "從諮詢到療程，全程女性治療師陪同" },
              { icon: "🔒", title: "嚴格保密", desc: "所有個人及療程記錄絕對保密處理" },
              { icon: "✅", title: "國際認證", desc: "BTL EMfemme 360 獲多國醫療機構認可" },
            ].map((item) => (
              <div key={item.title} className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="text-3xl mb-3">{item.icon}</div>
                <p className="font-bold text-white mb-2">{item.title}</p>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">常見問題</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="group bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden">
                <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer font-semibold text-gray-800 hover:text-[#C52B21] transition-colors list-none">
                  {faq.q}
                  <ChevronRight size={16} className="flex-shrink-0 text-gray-400 group-open:rotate-90 transition-transform duration-200" />
                </summary>
                <div className="px-6 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-gradient-to-br from-pink-50 to-white border-t border-pink-100">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <Heart size={36} className="text-pink-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">預約私密免費諮詢</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            由女性專業美療師為你提供私密諮詢，
            了解你的需求並制定最適合的個人化護理方案。全程保密，安心輕鬆。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-2 bg-[#C52B21] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#a82219] transition-colors duration-200 shadow-lg shadow-[#C52B21]/25"
            >
              預約免費私密諮詢 <ArrowRight size={16} />
            </Link>
            <Link
              href="/concerns"
              className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 px-8 py-4 rounded-full font-semibold border-2 border-gray-200 hover:border-gray-300 transition-colors duration-200"
            >
              查看其他困擾
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
