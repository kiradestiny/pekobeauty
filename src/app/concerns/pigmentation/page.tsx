import Link from "next/link";
import { ArrowRight, Check, ChevronRight, Sparkles, Sun, Star } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "色斑 / 荷爾蒙斑療程推薦 | Peko Beauty 醫學美容",
  description:
    "針對色斑、荷爾蒙斑、雀斑的專業療程推薦。Hollywood Spectra 激光 + Sylfirm X 雙重擊退深層色素，均勻膚色，立即預約免費諮詢。",
  alternates: {
    canonical: "https://www.peko.com.hk/concerns/pigmentation",
  },
  openGraph: {
    title: "色斑 / 荷爾蒙斑療程推薦 | Peko Beauty",
    description: "擊退深層色素，均勻膚色，重拾透亮光澤。",
    url: "https://www.peko.com.hk/concerns/pigmentation",
    siteName: "Peko Beauty",
    locale: "zh_HK",
    type: "website",
    images: [
      {
        url: "/images/peko-beauty-reception-desk-mong-kok.jpg",
        width: 1200,
        height: 630,
        alt: "色斑荷爾蒙斑療程推薦 Peko Beauty 旺角朗豪坊",
      },
    ],
  },
};

const symptoms = [
  { label: "荷爾蒙斑 (黃褐斑)", desc: "面頰兩側對稱分佈的灰褐色斑點，因荷爾蒙波動引起" },
  { label: "雀斑 / 太陽斑", desc: "日曬後加深的細小褐色斑點，多見於鼻樑及面頰" },
  { label: "曬後色素沉澱", desc: "日曬後膚色變深，難以靠普通美白護膚品改善" },
  { label: "膚色暗啞不均", desc: "整體膚色缺乏光澤，各部位色調深淺不一" },
  { label: "老人斑 / 深層色素", desc: "隨年齡出現的深層色素沉積，表面護膚品無法觸及" },
  { label: "色素長期反覆", desc: "色斑治療後容易反彈，難以根治，困擾多年" },
];

const treatments = [
  {
    tag: "🏆 首選方案",
    tagStyle: "bg-purple-50 text-purple-700 border border-purple-200",
    name: "Sylfirm X 矽谷電波",
    href: "/treatments/sylfirm-x",
    subtitle: "第 2 代雙波微針射頻 · 荷爾蒙斑專家",
    why: "Sylfirm X 是針對荷爾蒙斑（黃褐斑）最有效的醫美療程之一。其雙波模式可同時作用於表皮及真皮層的黑色素細胞，調控黑色素生成，且不易反彈，是難治性色素問題的首選。",
    features: ["針對荷爾蒙斑根源", "抑制黑色素細胞過活", "不刺激黑色素反彈", "適合所有膚色人士"],
    price: "試做價 HK$1,880",
    highlight: true,
  },
  {
    tag: "✨ 協同增效",
    tagStyle: "bg-yellow-50 text-yellow-700 border border-yellow-200",
    name: "Hollywood Spectra Laser Facial",
    href: "/treatments/hollywood-spectra-laser",
    subtitle: "納秒激光 · 美白嫩膚去斑",
    why: "Hollywood Spectra 的納秒激光能量溫和但精準，可有效打散表皮層的雀斑、太陽斑及色素沉積，同步嫩膚提亮，膚色即時感覺更均勻透亮。能量低不反黑，適合定期維護。",
    features: ["去除雀斑及太陽斑", "均勻提亮膚色", "納秒激光不反黑", "零痛感零恢復期"],
    price: "試做價 HK$880",
    highlight: false,
  },
  {
    tag: "🌟 溫和維護",
    tagStyle: "bg-blue-50 text-blue-700 border border-blue-200",
    name: "XE LHA Peel 玻璃肌",
    href: "/treatments/xe-lha-peel",
    subtitle: "第四代鹼性煥膚 · Fill & Peel 雙效",
    why: "採用第四代鹼性配方，零脫皮的情況下加速肌膚代謝，逐步淡化表皮色素沉澱，改善暗沉及不均勻膚色。配合深層保濕，療程後肌膚呈現即時玻璃肌光澤效果。",
    features: ["零脫皮溫和換膚", "加速色素代謝", "即時通透感", "適合敏感肌膚"],
    price: "試做價 HK$980",
    highlight: false,
  },
];

const faqs = [
  {
    q: "荷爾蒙斑和普通色斑有什麼分別？",
    a: "荷爾蒙斑（黃褐斑）由荷爾蒙波動引起，通常對稱分佈於面頰兩側，深淺可達真皮層，普通美白護膚品基本無效。普通色斑多因日曬引起，集中在表皮層，相對較易處理。兩者的治療策略有所不同，需先諮詢評估。",
  },
  {
    q: "激光去斑會令色斑加深反彈嗎？",
    a: "選擇正確的療程極為重要。過高能量的激光確實可能刺激黑色素細胞反應，導致反黑。Sylfirm X 的雙波技術及 Hollywood Spectra 的納秒激光能量溫和，設計上已充分考慮避免反彈問題，配合適當的防曬護理，效果持久穩定。",
  },
  {
    q: "色斑療程期間需要防曬嗎？",
    a: "防曬是色斑治療中最重要的一環，沒有之一。即使在室內，UV 及藍光都可能刺激黑色素生成。建議每日使用 SPF50+ 廣譜防曬霜，是鞏固療程效果、防止色斑反彈的最關鍵步驟。",
  },
  {
    q: "荷爾蒙斑可以完全去除嗎？",
    a: "荷爾蒙斑由於其根源在於荷爾蒙調節，完全根除較困難，但可以顯著淡化至幾乎看不見的程度。治療目標是長期管理而非一次根治，配合定期療程及日常護理，大多數客人可獲得滿意效果。",
  },
];

export default function PigmentationPage() {
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
            <span className="text-gray-600 font-medium">色斑 / 荷爾蒙斑</span>
          </nav>
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-purple-50 via-violet-50 to-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100/60 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-purple-600 bg-purple-50 border border-purple-200 px-3 py-1.5 rounded-full mb-5">
              <Sparkles size={11} />
              肌膚困擾解決方案
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
              色斑 / 荷爾蒙斑
            </h1>
            <p className="text-xl text-gray-600 mb-6 leading-relaxed max-w-2xl">
              色斑困擾是最普遍的肌膚問題之一，無論因日曬、荷爾蒙還是遺傳造成，現代醫美技術均能針對根源，安全有效地淡化色素，還原均勻透亮的膚色。
            </p>
            <div className="flex flex-wrap gap-2">
              {["針對荷爾蒙斑根源", "不易反彈", "溫和無恢復期", "所有膚色均適用"].map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 text-sm text-purple-700 bg-purple-50 border border-purple-200 px-3 py-1 rounded-full font-medium">
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
            <p className="text-gray-500">以下任何一種情況，都適合諮詢針對性色斑療程方案</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {symptoms.map((s) => (
              <div key={s.label} className="flex gap-3 p-4 bg-purple-50/50 rounded-2xl border border-purple-100">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center mt-0.5">
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
            <p className="text-gray-500">根據你的色斑類型，我們推薦以下針對性療程</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {treatments.map((t) => (
              <div
                key={t.name}
                className={`bg-white rounded-3xl p-6 flex flex-col border-2 ${t.highlight ? "border-purple-300 shadow-lg shadow-purple-100" : "border-gray-100"}`}
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
                      <Star size={11} className="text-purple-500 flex-shrink-0" fill="currentColor" />
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
            <span className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-3 block">黃金組合推薦</span>
            <h2 className="text-3xl font-bold mb-3">深層 + 表層雙重淡斑</h2>
            <p className="text-gray-400 max-w-xl mx-auto">Sylfirm X 針對真皮層荷爾蒙斑根源，Hollywood Spectra 清除表皮層色素——由深到淺全面擊退色斑</p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10">
            {["Sylfirm X 矽谷電波", "+", "Hollywood Spectra 激光"].map((item, i) =>
              item === "+" ? (
                <span key={i} className="text-3xl font-bold text-purple-400">+</span>
              ) : (
                <div key={i} className="bg-white/10 backdrop-blur rounded-2xl px-6 py-4 text-center border border-white/10">
                  <p className="font-bold text-white">{item}</p>
                </div>
              )
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            {[
              { num: "4–8", unit: "次療程", desc: "建議療程次數" },
              { num: "70%+", unit: "改善率", desc: "荷爾蒙斑平均淡化" },
              { num: "4 週", unit: "一次", desc: "建議療程間距" },
            ].map((stat) => (
              <div key={stat.desc} className="bg-white/5 rounded-2xl p-5 border border-white/10">
                <p className="text-3xl font-bold text-purple-400">
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
      <section className="py-16 bg-gradient-to-br from-purple-50 to-white border-t border-purple-100">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <Sun size={36} className="text-purple-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">立即預約免費諮詢</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            我們的專業美療師會為你評估色斑類型及深度，
            制定最適合你的個人化淡斑方案，首次諮詢完全免費。
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
