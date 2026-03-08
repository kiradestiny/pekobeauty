import Link from "next/link";
import { ArrowRight, Check, ChevronRight, Sparkles, Star, Activity } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "蘋果肌下垂 / 鬆弛療程推薦 | Peko Beauty 醫學美容",
  description:
    "針對蘋果肌下垂、面部鬆弛、法令紋加深的專業療程推薦。Ulfit HIFU 筋膜提拉 + BTL Exion 膠原激生，無痛重塑 V 面輪廓，立即預約免費諮詢。",
  alternates: {
    canonical: "https://www.peko.com.hk/concerns/sagging",
  },
  openGraph: {
    title: "蘋果肌下垂 / 鬆弛療程推薦 | Peko Beauty",
    description: "提升面部輪廓，收緊雙下巴，回復緊緻 V 面。",
    url: "https://www.peko.com.hk/concerns/sagging",
    siteName: "Peko Beauty",
    locale: "zh_HK",
    type: "website",
    images: [
      {
        url: "/images/peko-beauty-reception-desk-mong-kok.jpg",
        width: 1200,
        height: 630,
        alt: "蘋果肌下垂鬆弛療程推薦 Peko Beauty 旺角朗豪坊",
      },
    ],
  },
};

const symptoms = [
  { label: "蘋果肌明顯下移", desc: "面部最高點下垂，令面形拉長，失去年輕圓潤感" },
  { label: "法令紋加深", desc: "微笑紋因組織下垂而加深，令外觀顯老" },
  { label: "輪廓線模糊", desc: "下顎線不再清晰，面部輪廓趨向方形或梨形" },
  { label: "雙下巴出現", desc: "下顎脂肪積聚及頸部皮膚鬆弛，形成雙下巴" },
  { label: "眼皮下垂沉重感", desc: "上眼皮皮膚鬆弛，令眼睛顯小、表情顯疲憊" },
  { label: "皮膚彈性下降", desc: "按壓後回彈緩慢，膚質感覺鬆弛不緊緻" },
];

const treatments = [
  {
    tag: "🏆 首選方案",
    tagStyle: "bg-rose-50 text-rose-700 border border-rose-200",
    name: "Ulfit HIFU 緊緻拉提",
    href: "/treatments/ulfit-hifu",
    subtitle: "第 4 代擴散式加熱 · 筋膜層強力提拉",
    why: "Ulfit HIFU 採用第四代擴散式加熱技術，作用於 SMAS 筋膜層，效果相當於「無刀拉皮」。獨有圓形探頭可靈活修飾面部輪廓，無痛無需敷麻，單次療程即有明顯提升效果。",
    features: ["作用於 SMAS 筋膜層", "獨有圓形探頭設計", "無痛、無需敷麻", "效果可維持 12–18 個月"],
    price: "試做價 HK$1,480",
    highlight: true,
  },
  {
    tag: "⚡ 深層激活",
    tagStyle: "bg-red-50 text-red-700 border border-red-200",
    name: "BTL Exion™ 面 + 眼 + 頸",
    href: "/treatments/btl-exion",
    subtitle: "激生 +224% 透明質酸 · 由內至外飽滿提升",
    why: "BTL Exion 以 AI 精準控溫技術，全球唯一可激生 +224% 透明質酸及 +47% 膠原蛋白。透明質酸由內至外填充流失的組織容積，令蘋果肌回復飽滿，法令紋自然淡化。",
    features: ["+224% 透明質酸自生", "+47% 膠原蛋白提升", "飽滿蘋果肌效果", "無痛 AI 控溫技術"],
    price: "試做價 HK$680",
    highlight: false,
  },
  {
    tag: "💧 保濕鞏固",
    tagStyle: "bg-blue-50 text-blue-700 border border-blue-200",
    name: "DEP 無針水光",
    href: "/treatments/dep-mesotherapy",
    subtitle: "電穿孔深層導入 · 補水鎖水提彈",
    why: "利用電穿孔技術將透明質酸、膠原蛋白等活性成分直接導入真皮層，深層補水保濕，令皮膚更具彈性及支撐力，協助維持 HIFU 及 Exion 的提升效果，延長療程持效。",
    features: ["深層補水保濕", "提升皮膚彈性支撐", "無針無痛", "協助鞏固提升效果"],
    price: "試做價 HK$980",
    highlight: false,
  },
];

const faqs = [
  {
    q: "HIFU 和射頻（RF）有什麼分別？哪個效果更好？",
    a: "HIFU（高強度聚焦超聲波）作用於更深的 SMAS 筋膜層（4.5mm 深），提升效果較為立竿見影，適合有明顯鬆弛輪廓問題的人士。射頻（RF）則主要作用於真皮至淺層筋膜，以激生膠原為主，效果較溫和循序漸進。兩者各有優勢，理想情況是配合使用，達到最全面的效果。",
  },
  {
    q: "Ulfit HIFU 療程過程痛嗎？",
    a: "Ulfit 採用第四代擴散式加熱技術，相比傳統點狀 HIFU，熱能分佈更均勻，刺痛感大幅降低，大多數客人無需敷麻醉藥膏即可完成療程。少數皮膚較薄的部位（如顴骨）可能有輕微刺熱感，屬正常現象。",
  },
  {
    q: "做完 HIFU 後會有恢復期嗎？",
    a: "Ulfit HIFU 基本無恢復期，療程後可能有輕微紅熱，通常數小時內消退。部分客人在療程後 1–2 週內感到輕微面部緊繃感，這是正常的組織反應，代表療程正在發揮效果。",
  },
  {
    q: "效果可以維持多久？需要定期維護嗎？",
    a: "Ulfit HIFU 的效果一般可維持 12–18 個月。隨著正常的自然老化過程，建議每年進行 1–2 次維護療程。配合 BTL Exion 的定期療程，可持續激生膠原透明質酸，延緩鬆弛的再次出現。",
  },
];

export default function SaggingPage() {
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
            <span className="text-gray-600 font-medium">蘋果肌下垂 / 鬆弛</span>
          </nav>
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-rose-50 via-pink-50 to-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-100/60 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-rose-600 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-full mb-5">
              <Sparkles size={11} />
              肌膚困擾解決方案
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
              蘋果肌下垂 / 鬆弛
            </h1>
            <p className="text-xl text-gray-600 mb-6 leading-relaxed max-w-2xl">
              膠原蛋白流失是面部鬆弛的根本原因。現代醫美技術無需手術，即可作用於深層筋膜，有效提升輪廓、重塑飽滿蘋果肌，重現年輕緊緻的面部輪廓。
            </p>
            <div className="flex flex-wrap gap-2">
              {["無需手術", "作用筋膜層", "无痛無創", "效果持久 12–18 個月"].map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 text-sm text-rose-700 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full font-medium">
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
            <p className="text-gray-500">以下任何一種情況，都適合諮詢針對性緊緻提升療程</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {symptoms.map((s) => (
              <div key={s.label} className="flex gap-3 p-4 bg-rose-50/50 rounded-2xl border border-rose-100">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-rose-500 flex items-center justify-center mt-0.5">
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
            <p className="text-gray-500">由筋膜層到真皮層，全方位對抗面部鬆弛與下垂</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {treatments.map((t) => (
              <div
                key={t.name}
                className={`bg-white rounded-3xl p-6 flex flex-col border-2 ${t.highlight ? "border-rose-300 shadow-lg shadow-rose-100" : "border-gray-100"}`}
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
                      <Star size={11} className="text-rose-500 flex-shrink-0" fill="currentColor" />
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
            <span className="text-xs font-bold uppercase tracking-widest text-rose-400 mb-3 block">黃金組合推薦</span>
            <h2 className="text-3xl font-bold mb-3">筋膜提拉 × 膠原激生</h2>
            <p className="text-gray-400 max-w-xl mx-auto">Ulfit HIFU 從深層筋膜拉提輪廓，BTL Exion 同步激生膠原透明質酸填充——提升 + 飽滿，雙管齊下對抗鬆弛</p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10">
            {["Ulfit HIFU 緊緻拉提", "+", "BTL Exion 面+眼+頸"].map((item, i) =>
              item === "+" ? (
                <span key={i} className="text-3xl font-bold text-rose-400">+</span>
              ) : (
                <div key={i} className="bg-white/10 backdrop-blur rounded-2xl px-6 py-4 text-center border border-white/10">
                  <p className="font-bold text-white">{item}</p>
                </div>
              )
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            {[
              { num: "1–3", unit: "次療程", desc: "HIFU 建議頻率" },
              { num: "即時", unit: "見效", desc: "輪廓提升感覺" },
              { num: "12–18", unit: "個月", desc: "效果維持時間" },
            ].map((stat) => (
              <div key={stat.desc} className="bg-white/5 rounded-2xl p-5 border border-white/10">
                <p className="text-3xl font-bold text-rose-400">
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
      <section className="py-16 bg-gradient-to-br from-rose-50 to-white border-t border-rose-100">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <Activity size={36} className="text-rose-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">立即預約免費諮詢</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            我們的專業美療師會為你評估鬆弛程度及輪廓狀況，
            制定最適合你的個人化提升方案，首次諮詢完全免費。
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
