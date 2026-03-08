import Link from "next/link";
import { ArrowRight, Check, ChevronRight, Sparkles, Star, Eye } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "黑眼圈 / 眼紋 / 眼袋療程推薦 | Peko Beauty 醫學美容",
  description:
    "針對黑眼圈、眼袋、眼紋及眼皮下垂的專業療程推薦。BTL Exion Eye 結合單極射頻與超聲波，專為眼部設計，無痛改善疲憊雙眼，立即預約免費諮詢。",
  alternates: {
    canonical: "https://www.peko.com.hk/concerns/eye-dark-circles",
  },
  openGraph: {
    title: "黑眼圈 / 眼紋 / 眼袋療程推薦 | Peko Beauty",
    description: "重煥眼部光彩，改善疲憊黑眼圈與眼紋，回復明亮神采。",
    url: "https://www.peko.com.hk/concerns/eye-dark-circles",
    siteName: "Peko Beauty",
    locale: "zh_HK",
    type: "website",
    images: [
      {
        url: "/images/peko-beauty-reception-desk-mong-kok.jpg",
        width: 1200,
        height: 630,
        alt: "黑眼圈眼紋眼袋療程推薦 Peko Beauty 旺角朗豪坊",
      },
    ],
  },
};

const symptoms = [
  { label: "黑眼圈", desc: "眼下色素沉積或血管顯現，令外觀顯得疲憊蒼老" },
  { label: "眼袋明顯", desc: "眼下脂肪疝出或水腫，形成下眼瞼的突出膨脹感" },
  { label: "眼紋 / 魚尾紋", desc: "眼角及眼下細紋，因重複表情動作及膠原流失加深" },
  { label: "眼皮鬆弛下垂", desc: "上眼皮皮膚因彈性下降而鬆弛，令眼睛顯小顯重" },
  { label: "淚溝凹陷", desc: "眼下至臉頰交界的凹陷線條，令外觀顯老且疲憊" },
  { label: "眼部暗啞無光", desc: "眼周皮膚乾燥、血液循環不佳，令整體眼神暗淡" },
];

const treatments = [
  {
    tag: "🏆 首選方案",
    tagStyle: "bg-indigo-50 text-indigo-700 border border-indigo-200",
    name: "BTL Exion™ Eye",
    href: "/treatments/btl-exion-eye",
    subtitle: "Monopolar RF + Ultrasound · 眼部專用技術",
    why: "BTL Exion Eye 採用專為眼周脆弱皮膚設計的精細探頭，結合單極射頻與超聲波技術，精準作用於眼袋、黑眼圈、眼紋及眼皮鬆弛問題。AI 控溫技術確保安全，激生透明質酸填補淚溝，改善眼周整體老化問題。",
    features: ["針對眼袋及眼皮鬆弛", "改善黑眼圈及血液循環", "撫平眼紋及魚尾紋", "AI 控溫，眼周安全適用"],
    price: "試做價 HK$380",
    highlight: true,
  },
  {
    tag: "✨ 全面提升",
    tagStyle: "bg-violet-50 text-violet-700 border border-violet-200",
    name: "BTL Exion™ 面 + 眼 + 頸",
    href: "/treatments/btl-exion",
    subtitle: "+224% 透明質酸激生 · 填補淚溝凹陷",
    why: "BTL Exion 面部療程中的眼部模式以更大範圍覆蓋眼周至頰骨區域，激生 +224% 透明質酸，從內自外填補淚溝凹陷，改善眼周容積流失問題，令眼下飽滿，減少憔悴感。",
    features: ["+224% 透明質酸激生", "填補淚溝及眼下凹陷", "覆蓋眼周至蘋果肌區域", "一次療程改善多個問題"],
    price: "試做價 HK$680",
    highlight: false,
  },
  {
    tag: "💧 深層滋養",
    tagStyle: "bg-blue-50 text-blue-700 border border-blue-200",
    name: "DEP 無針水光",
    href: "/treatments/dep-mesotherapy",
    subtitle: "電穿孔深層導入 · 眼周補水增彈",
    why: "DEP 無針水光利用電穿孔技術，將透明質酸及維他命 C 等活性成分直接導入眼周真皮層，深層滋養改善眼周乾燥細紋，增強透明質酸含量及膠原支撐，令眼周維持年輕飽滿狀態。",
    features: ["深層補水滋養眼周", "維他命 C 提亮暗沉", "改善眼周乾燥細紋", "協助維持療程效果"],
    price: "試做價 HK$980",
    highlight: false,
  },
];

const faqs = [
  {
    q: "黑眼圈有不同類型嗎？哪種類型最難改善？",
    a: "黑眼圈主要分三類：色素型（棕色，因色素沉積）、血管型（青紫色，因血管透視），以及結構型（因淚溝凹陷造成陰影）。結構型最難靠護膚品改善，需要填補凹陷；血管型可透過改善血液循環及激光治療改善；色素型可透過淡化色素療程改善。BTL Exion Eye 及 DEP 水光可有效針對多種類型。",
  },
  {
    q: "眼袋可以不做手術改善嗎？",
    a: "輕中度的眼袋可透過非手術療程有效改善。BTL Exion Eye 的射頻能量可加熱脂肪層，促進脂肪代謝，同時收緊周邊皮膚組織。效果比手術溫和，但無需恢復期，適合不想承擔手術風險的人士。嚴重的眼袋可能需要配合其他方案，建議先諮詢評估。",
  },
  {
    q: "眼部療程安全嗎？會影響視力嗎？",
    a: "BTL Exion Eye 採用專為眼周設計的精細探頭，不會直接接觸眼球，療程期間閉眼進行，對視力完全無影響。AI 控溫技術確保能量在安全範圍內，我們的治療師均受過專業培訓，嚴格遵循操作規程，確保療程安全。",
  },
  {
    q: "眼部療程需要多少次才見效？",
    a: "多數客人在 3–5 次 BTL Exion Eye 療程後有明顯改善。眼部皮膚薄且細緻，建議從低能量開始，循序漸進。每次療程約 20–30 分鐘，建議每 2–4 週進行一次。配合 DEP 無針水光作日常維護，可延長效果。",
  },
];

export default function EyeDarkCirclesPage() {
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
            <span className="text-gray-600 font-medium">黑眼圈 / 眼紋 / 眼袋</span>
          </nav>
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-indigo-50 via-violet-50 to-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-100/60 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-indigo-600 bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded-full mb-5">
              <Sparkles size={11} />
              眼部困擾解決方案
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
              黑眼圈 / 眼紋 / 眼袋
            </h1>
            <p className="text-xl text-gray-600 mb-6 leading-relaxed max-w-2xl">
              雙眼是面部最引人注目的部位。黑眼圈、眼紋及眼袋令人顯得疲憊衰老，針對性的眼部醫美療程可從多個維度改善眼周問題，重煥明亮神采。
            </p>
            <div className="flex flex-wrap gap-2">
              {["專為眼周設計", "無痛安全", "改善多種眼部問題", "零恢復期"].map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 text-sm text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full font-medium">
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
            <p className="text-gray-500">眼部問題影響整體面容神采，專業療程助你重現明亮雙眼</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {symptoms.map((s) => (
              <div key={s.label} className="flex gap-3 p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
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
            <p className="text-gray-500">從眼袋、黑眼圈到眼紋，全方位改善眼部老化困擾</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {treatments.map((t) => (
              <div
                key={t.name}
                className={`bg-white rounded-3xl p-6 flex flex-col border-2 ${
                  t.highlight ? "border-indigo-300 shadow-lg shadow-indigo-100" : "border-gray-100"
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
                      <Star size={11} className="text-indigo-500 flex-shrink-0" fill="currentColor" />
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
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-3 block">黃金組合推薦</span>
            <h2 className="text-3xl font-bold mb-3">眼部集中修護組合</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              BTL Exion Eye 針對眼袋眼紋，DEP 水光深層補水——雙重技術，全面重煥眼部神采
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10">
            {["BTL Exion Eye", "+", "DEP 無針水光"].map((item, i) =>
              item === "+" ? (
                <span key={i} className="text-3xl font-bold text-indigo-400">+</span>
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
              { num: "20–30", unit: "分鐘", desc: "每次眼部療程時間" },
              { num: "2–4 週", unit: "一次", desc: "建議療程間距" },
            ].map((stat) => (
              <div key={stat.desc} className="bg-white/5 rounded-2xl p-5 border border-white/10">
                <p className="text-3xl font-bold text-indigo-400">
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
                  <ChevronRight
                    size={16}
                    className="flex-shrink-0 text-gray-400 group-open:rotate-90 transition-transform duration-200"
                  />
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
      <section className="py-16 bg-gradient-to-br from-indigo-50 to-white border-t border-indigo-100">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <Eye size={36} className="text-indigo-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">立即預約免費諮詢</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            我們的專業美療師會為你評估眼部問題類型，
            制定最適合你的個人化眼部修護方案，首次諮詢完全免費。
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
