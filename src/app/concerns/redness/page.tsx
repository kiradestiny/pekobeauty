import Link from "next/link";
import { ArrowRight, Check, ChevronRight, Sparkles, ShieldCheck, Star } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "泛紅 / 玫瑰痤瘡療程推薦 | Peko Beauty 醫學美容",
  description:
    "針對泛紅、玫瑰痤瘡、血管擴張的專業療程推薦。Sylfirm X 是全球唯一 FDA 認證用於治療玫瑰痤瘡的微針射頻，配合 Hollywood Spectra Golden Laser 消退紅血絲，立即預約諮詢。",
  alternates: {
    canonical: "https://www.peko.com.hk/concerns/redness",
  },
  openGraph: {
    title: "泛紅 / 玫瑰痤瘡療程推薦 | Peko Beauty",
    description: "修復血管壁，鎮靜敏感泛紅，重建健康穩定膚底。",
    url: "https://www.peko.com.hk/concerns/redness",
    siteName: "Peko Beauty",
    locale: "zh_HK",
    type: "website",
    images: [
      {
        url: "/images/peko-beauty-reception-desk-mong-kok.jpg",
        width: 1200,
        height: 630,
        alt: "泛紅玫瑰痤瘡療程推薦 Peko Beauty 旺角朗豪坊",
      },
    ],
  },
};

const symptoms = [
  { label: "持續性面部泛紅", desc: "面頰、鼻翼部位長期呈現紅色，不隨時間消退" },
  { label: "紅血絲明顯", desc: "毛細血管擴張，透過皮膚清晰可見的紅色線狀血管" },
  { label: "容易泛紅潮熱", desc: "進食熱食、飲酒、溫度變化或情緒波動即引致泛紅" },
  { label: "皮膚過度敏感", desc: "輕微刺激即產生灼熱、刺痛或發癢等不適反應" },
  { label: "玫瑰痤瘡症狀", desc: "伴隨丘疹及膿皰的慢性皮膚炎症，反覆發作" },
  { label: "紅印難以消退", desc: "輕微刮傷或暗瘡後的紅色印記（PIE），長期不退" },
];

const treatments = [
  {
    tag: "🏆 首選方案",
    tagStyle: "bg-green-50 text-green-700 border border-green-200",
    name: "Sylfirm X 矽谷電波",
    href: "/treatments/sylfirm-x",
    subtitle: "全球唯一 FDA 認證 · 針對玫瑰痤瘡",
    why: "Sylfirm X 是全球目前唯一獲得 FDA 認證，可用於治療玫瑰痤瘡（Rosacea）的微針射頻技術。其 Continuous Wave 模式可精準作用於異常血管及敏感基底膜，修復血管壁結構，從根源解決泛紅問題，而非只是暫時遮蓋。",
    features: ["全球唯一 FDA 認證（玫瑰痤瘡）", "修復異常血管壁", "重建穩定基底膜", "減少皮膚敏感反應"],
    price: "試做價 HK$1,880",
    highlight: true,
  },
  {
    tag: "✨ 血管針對",
    tagStyle: "bg-amber-50 text-amber-700 border border-amber-200",
    name: "Hollywood Spectra Golden Laser",
    href: "/treatments/hollywood-spectra-laser",
    subtitle: "585nm Gold Toning · 消退紅血絲",
    why: "獨家 585nm Gold Toning 技術，波長精準對應血紅素吸收峰值，可有針對性地作用於擴張的毛細血管，促使血管收縮閉合，消退紅印（PIE）及明顯的紅血絲，同時不損傷周邊正常皮膚組織。",
    features: ["585nm 精準針對血紅素", "消退紅血絲及 PIE", "不損傷周邊組織", "溫和能量零恢復期"],
    price: "試做價 HK$1,280",
    highlight: false,
  },
  {
    tag: "💧 鎮靜修護",
    tagStyle: "bg-cyan-50 text-cyan-700 border border-cyan-200",
    name: "Venus Glow™ 水漾活膚",
    href: "/treatments/venus-glow",
    subtitle: "70微米水流深層淨化 · 溫和鎮靜",
    why: "Venus Glow 以 70 微米極幼水流配合 360° 旋轉真空吸力，溫和而深層地清潔毛孔，移除令皮膚反應的油脂及雜質。非物理擠壓的清潔方式減少皮膚刺激，有助配合主力療程，維持皮膚穩定健康狀態。",
    features: ["70 微米溫和水流", "360° 旋轉溫和清潔", "減少致敏刺激源", "鎮靜緊緻毛孔"],
    price: "試做價 HK$480",
    highlight: false,
  },
];

const faqs = [
  {
    q: "玫瑰痤瘡（Rosacea）可以根治嗎？",
    a: "玫瑰痤瘡是一種慢性皮膚狀況，目前沒有完全根治的方法，但可以透過醫美療程顯著控制及改善症狀。Sylfirm X 作為 FDA 認證的玫瑰痤瘡治療方案，可有效修復血管壁並重建基底膜，大多數患者在 3–5 次療程後，泛紅程度可減少 60–80%。日常管理配合防曬及低刺激護膚品同樣重要。",
  },
  {
    q: "皮膚敏感泛紅可以做激光嗎？會令情況加重嗎？",
    a: "傳統高能量激光確實可能刺激敏感皮膚。Sylfirm X 及 Hollywood Spectra Golden Laser 均專為敏感及泛紅皮膚設計，能量溫和且精準，不會誘發炎症反應。我們在療程前會詳細評估皮膚狀況，確保能量設置適合你的皮膚類型。",
  },
  {
    q: "做完療程後皮膚會更紅嗎？",
    a: "Sylfirm X 療程後確實會有短暫約 4–6 小時的泛紅，屬於正常的組織反應，之後消退。Hollywood Spectra Golden Laser 及 Venus Glow 基本無即時反應。我們通常建議在重要活動前 1 週避免進行療程，其餘時間均可正常預約。",
  },
  {
    q: "日常護膚上有什麼要注意？",
    a: "泛紅敏感皮膚應使用成分簡單、無酒精、無香料的低刺激護膚品。避免過熱的水洗臉、過於用力按摩及物理磨砂。防曬是每日必做的步驟，UV 是誘發泛紅及玫瑰痤瘡的最主要外在因素之一。辛辣食物、酒精及過熱飲食也應適量減少。",
  },
];

export default function RednessPage() {
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
            <span className="text-gray-600 font-medium">泛紅 / 玫瑰痤瘡</span>
          </nav>
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-100/60 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-green-600 bg-green-50 border border-green-200 px-3 py-1.5 rounded-full mb-5">
              <Sparkles size={11} />
              肌膚困擾解決方案
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
              泛紅 / 玫瑰痤瘡
            </h1>
            <p className="text-xl text-gray-600 mb-6 leading-relaxed max-w-2xl">
              長期泛紅、血管擴張或玫瑰痤瘡，不只影響外觀，更代表皮膚屏障的失衡。針對性的醫美療程能從修復血管壁及基底膜入手，重建皮膚的穩定防護力。
            </p>
            <div className="flex flex-wrap gap-2">
              {["FDA 認證技術", "修復血管壁", "重建皮膚屏障", "敏感肌適用"].map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 text-sm text-green-700 bg-green-50 border border-green-200 px-3 py-1 rounded-full font-medium">
                  <Check size={13} /> {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Symptoms ── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">你是否有以下困擾？</h2>
            <p className="text-gray-500">以下任何一種情況，都適合諮詢針對性消紅鎮敏療程</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {symptoms.map((s) => (
              <div key={s.label} className="flex gap-3 p-4 bg-green-50/50 rounded-2xl border border-green-100">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mt-0.5">
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
            <p className="text-gray-500">由根源修復血管壁，到針對性消退紅血絲，全面對抗泛紅問題</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {treatments.map((t) => (
              <div
                key={t.name}
                className={`bg-white rounded-3xl p-6 flex flex-col border-2 ${t.highlight ? "border-green-300 shadow-lg shadow-green-100" : "border-gray-100"}`}
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
                      <Star size={11} className="text-green-500 flex-shrink-0" fill="currentColor" />
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

      {/* ── Combo ── */}
      <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-green-400 mb-3 block">黃金組合推薦</span>
            <h2 className="text-3xl font-bold mb-3">根源修復 × 血管針對</h2>
            <p className="text-gray-400 max-w-xl mx-auto">Sylfirm X 修復受損基底膜及血管壁，Golden Laser 精準消退紅血絲——雙重技術，全面解決泛紅問題</p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10">
            {["Sylfirm X 矽谷電波", "+", "Hollywood Spectra Golden Laser"].map((item, i) =>
              item === "+" ? (
                <span key={i} className="text-3xl font-bold text-green-400">+</span>
              ) : (
                <div key={i} className="bg-white/10 backdrop-blur rounded-2xl px-6 py-4 text-center border border-white/10">
                  <p className="font-bold text-white">{item}</p>
                </div>
              )
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            {[
              { num: "3–5", unit: "次療程", desc: "建議療程次數" },
              { num: "60–80%", unit: "改善率", desc: "泛紅程度平均減少" },
              { num: "4–6 週", unit: "一次", desc: "建議療程間距" },
            ].map((stat) => (
              <div key={stat.desc} className="bg-white/5 rounded-2xl p-5 border border-white/10">
                <p className="text-3xl font-bold text-green-400">
                  {stat.num}<span className="text-base ml-1 text-white/70">{stat.unit}</span>
                </p>
                <p className="text-gray-400 text-sm mt-1">{stat.desc}</p>
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
      <section className="py-16 bg-gradient-to-br from-green-50 to-white border-t border-green-100">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <ShieldCheck size={36} className="text-green-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">立即預約免費諮詢</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            我們的專業美療師會為你評估泛紅類型及嚴重程度，
            制定最適合敏感肌膚的個人化療程計劃，首次諮詢完全免費。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-2 bg-[#C52B21] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#a82219] transition-colors duration-200 shadow-lg shadow-[#C52B21]/25"
            >
              預約免費諮詢 <ArrowRight size={16} />
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
