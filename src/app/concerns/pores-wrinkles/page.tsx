import Link from "next/link";
import { ArrowRight, Check, ChevronRight, Sparkles, Zap, Star } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "凹凸洞 / 深層皺紋療程推薦 | Peko Beauty 醫學美容",
  description:
    "針對凹凸洞、深層皺紋、毛孔粗大的專業療程推薦。Sylfirm X 矽谷電波修復基底膜，BTL Exion 黃金微針精準填補，即日起接受免費諮詢。",
  alternates: {
    canonical: "https://www.peko.com.hk/concerns/pores-wrinkles",
  },
  openGraph: {
    title: "凹凸洞 / 深層皺紋療程推薦 | Peko Beauty",
    description: "重修肌膚底層結構，撫平凹凸痕跡，重現平滑緊緻肌膚。",
    url: "https://www.peko.com.hk/concerns/pores-wrinkles",
    siteName: "Peko Beauty",
    locale: "zh_HK",
    type: "website",
    images: [
      {
        url: "/images/peko-beauty-reception-desk-mong-kok.jpg",
        width: 1200,
        height: 630,
        alt: "凹凸洞深層皺紋療程推薦 Peko Beauty 旺角朗豪坊",
      },
    ],
  },
};

const symptoms = [
  { label: "冰錐型深度凹陷", desc: "深而窄，開口細，難以靠普通護膚品填補" },
  { label: "箱型 / 滾輪型凹洞", desc: "邊界清晰或寬而淺的凹陷，皮膚呈波浪狀" },
  { label: "深層法令紋 / 眉間紋", desc: "歲月累積的表情紋，膠原蛋白大量流失" },
  { label: "毛孔粗大且鬆弛", desc: "皮脂腺分泌旺盛，毛孔擴大難自行收縮" },
  { label: "肌膚質感粗糙", desc: "表面凹凸不平，化妝後起卡粉、不服帖" },
  { label: "膠原蛋白明顯流失", desc: "皮膚失去彈性，按壓後回彈速度緩慢" },
];

const treatments = [
  {
    tag: "🏆 首選方案",
    tagStyle: "bg-amber-50 text-amber-700 border border-amber-200",
    name: "Sylfirm X 矽谷電波",
    href: "/treatments/sylfirm-x",
    subtitle: "第 2 代雙波微針射頻 · 修復基底膜",
    why: "Sylfirm X 是全球唯一獲 FDA 認證可治療凹凸洞的微針射頻。其專利雙波模式可精準修復受損基底膜纖維結構，從底層重塑膠原蛋白，有效撫平多種類型的凹陷疤痕。",
    features: ["修復基底膜 (BMZ)", "激生新生膠原蛋白", "4–6 小時極速退紅", "原廠探頭即場開封"],
    price: "試做價 HK$1,880",
    highlight: true,
  },
  {
    tag: "⚡ 深層強化",
    tagStyle: "bg-yellow-50 text-yellow-700 border border-yellow-200",
    name: "BTL Exion™ 黃金微針",
    href: "/treatments/btl-exion-microneedle",
    subtitle: "AI Fractional RF · 精準針對嚴重凹凸洞",
    why: "針對嚴重凹凸洞及深層皺紋，BTL Exion 黃金微針以 AI 脈衝技術精準控制能量深度，單次通過技術大幅減少痛感，刺激深層真皮重組，效果持久顯著。",
    features: ["AI 精準深度控制", "單次通過減少痛感", "針對嚴重凹凸洞", "深層皺紋填補"],
    price: "試做價 HK$2,980",
    highlight: false,
  },
  {
    tag: "✨ 輔助修護",
    tagStyle: "bg-rose-50 text-rose-700 border border-rose-200",
    name: "BTL Exion™ 面 + 眼 + 頸",
    href: "/treatments/btl-exion",
    subtitle: "激生 +224% 透明質酸 · 無痛填補凹陷",
    why: "結合單極射頻與靶向超聲波，全球唯一技術可激生 +224% 透明質酸及 +47% 膠原蛋白。由內至外填補凹陷，改善膚質的同時提升緊緻感，療程無痛舒適。",
    features: ["+224% 透明質酸激生", "+47% 膠原蛋白提升", "無痛無創，零恢復期", "即時見效 + 持續改善"],
    price: "試做價 HK$680",
    highlight: false,
  },
];

const faqs = [
  {
    q: "凹凸洞真的可以改善嗎？",
    a: "視乎凹洞類型及嚴重程度，現代醫美技術可顯著改善大部分凹洞問題。Sylfirm X 等微針射頻技術透過修復基底膜、激生膠原，能有效提升約 50–80% 的凹洞深度，尤其對滾輪型及箱型效果最為明顯。",
  },
  {
    q: "療程前後需要注意什麼？",
    a: "療程前避免日曬及刺激性護膚品（如 A 酸、果酸）約 1 週。療程後 24 小時避免化濃妝，做好防曬及基本補水工作即可。Sylfirm X 恢復期極短，4–6 小時後泛紅基本消退。",
  },
  {
    q: "需要做多少次才有明顯效果？",
    a: "大多數客人在 3–5 次療程後見到顯著改善。建議每 4–6 週進行一次，並根據個人情況配搭不同療程組合，效果更快更持久。初次建議先做諮詢評估。",
  },
  {
    q: "凹凸洞療程有沒有年齡限制？",
    a: "一般建議 18 歲以上人士進行療程。我們亦會根據個人皮膚狀況、敏感程度及健康狀況，在諮詢時制定最合適的療程計劃。",
  },
];

export default function PoresWrinklesPage() {
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
            <span className="text-gray-600 font-medium">凹凸洞 / 深層皺紋</span>
          </nav>
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-orange-50 via-amber-50 to-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100/60 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-orange-600 bg-orange-50 border border-orange-200 px-3 py-1.5 rounded-full mb-5">
              <Sparkles size={11} />
              肌膚困擾解決方案
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
              凹凸洞 / 深層皺紋
            </h1>
            <p className="text-xl text-gray-600 mb-6 leading-relaxed max-w-2xl">
              暗瘡疤痕留下的凹陷、歲月刻下的皺紋，不再是無法改變的遺憾。透過針對性的醫美療程，從底層修復肌膚結構，重現平滑緊緻的肌膚。
            </p>
            <div className="flex flex-wrap gap-2">
              {["可顯著改善", "FDA 認證技術", "最快 1 次見效", "極短恢復期"].map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 text-sm text-orange-700 bg-orange-50 border border-orange-200 px-3 py-1 rounded-full font-medium">
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
            <p className="text-gray-500">以下任何一種情況，都適合諮詢針對性療程方案</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {symptoms.map((s) => (
              <div key={s.label} className="flex gap-3 p-4 bg-orange-50/50 rounded-2xl border border-orange-100">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center mt-0.5">
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
            <p className="text-gray-500">根據你的凹洞類型及嚴重程度，我們推薦以下針對性療程</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {treatments.map((t) => (
              <div
                key={t.name}
                className={`bg-white rounded-3xl p-6 flex flex-col border-2 ${t.highlight ? "border-orange-300 shadow-lg shadow-orange-100" : "border-gray-100"}`}
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
                      <Star size={11} className="text-orange-500 flex-shrink-0" fill="currentColor" />
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
            <span className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-3 block">黃金組合推薦</span>
            <h2 className="text-3xl font-bold mb-3">雙效修復組合</h2>
            <p className="text-gray-400 max-w-xl mx-auto">單一療程已見效，雙重配搭效果倍增——先修復基底膜，再激生膠原填補，由深到淺全面改善</p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10">
            {["Sylfirm X 矽谷電波", "+", "BTL Exion 黃金微針"].map((item, i) =>
              item === "+" ? (
                <span key={i} className="text-3xl font-bold text-orange-400">+</span>
              ) : (
                <div key={i} className="bg-white/10 backdrop-blur rounded-2xl px-6 py-4 text-center border border-white/10">
                  <p className="font-bold text-white">{item}</p>
                </div>
              )
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            {[
              { num: "5–8", unit: "次療程", desc: "建議療程次數" },
              { num: "80%", unit: "改善率", desc: "滾輪型凹洞平均改善" },
              { num: "4–6 週", unit: "一次", desc: "建議療程間距" },
            ].map((stat) => (
              <div key={stat.desc} className="bg-white/5 rounded-2xl p-5 border border-white/10">
                <p className="text-3xl font-bold text-orange-400">
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
      <section className="py-16 bg-gradient-to-br from-orange-50 to-white border-t border-orange-100">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <Zap size={36} className="text-orange-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">立即預約免費諮詢</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            我們的專業美療師會為你詳細評估凹洞類型及嚴重程度，
            制定最適合你的個人化療程計劃，首次諮詢完全免費。
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
