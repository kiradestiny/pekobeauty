import Link from "next/link";
import { ArrowRight, Check, ChevronRight, Sparkles, Zap, Star } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "瘦身修形 / 溶脂療程推薦 | Peko Beauty 醫學美容",
  description:
    "針對肚腩、拜拜肉、大腿脂肪及身體鬆弛的專業療程推薦。BTL Exion Body 結合 Monopolar RF 及靶向超聲波，無創溶脂緊身，立即預約免費諮詢。",
  alternates: {
    canonical: "https://www.peko.com.hk/concerns/body-slimming",
  },
  openGraph: {
    title: "瘦身修形 / 溶脂療程推薦 | Peko Beauty",
    description: "無創溶脂緊身，塑造完美身體線條。",
    url: "https://www.peko.com.hk/concerns/body-slimming",
    siteName: "Peko Beauty",
    locale: "zh_HK",
    type: "website",
    images: [
      {
        url: "/images/peko-beauty-reception-desk-mong-kok.jpg",
        width: 1200,
        height: 630,
        alt: "瘦身修形溶脂療程推薦 Peko Beauty 旺角朗豪坊",
      },
    ],
  },
};

const symptoms = [
  { label: "肚腩 / 腰間贅肉", desc: "腹部脂肪積聚，難以靠運動及節食針對性消除" },
  { label: "拜拜肉（上臂鬆弛）", desc: "手臂內側脂肪鬆弛下垂，揮手時明顯搖動" },
  { label: "大腿內外側脂肪", desc: "大腿脂肪層厚，穿著緊身褲子時線條不理想" },
  { label: "臀部下垂鬆弛", desc: "臀部失去緊緻感，皮膚彈性下降，輪廓不清晰" },
  { label: "局部脂肪難消除", desc: "特定部位脂肪頑固，即使體重正常仍有局部積聚" },
  { label: "產後肚皮鬆弛", desc: "生產後腹部皮膚及肌肉鬆弛，難以回復產前狀態" },
];

const treatments = [
  {
    tag: "🏆 首選方案",
    tagStyle: "bg-teal-50 text-teal-700 border border-teal-200",
    name: "BTL Exion™ Body",
    href: "/treatments/btl-exion-body",
    subtitle: "Monopolar RF + Targeted Ultrasound · 無創溶脂緊身",
    why: "BTL Exion Body 結合單極射頻（Monopolar RF）與靶向超聲波（Targeted Ultrasound），雙重技術協同作用：射頻加熱脂肪層促進脂肪代謝，同時刺激真皮膠原收縮緊膚，超聲波精準定位脂肪細胞。無創、無痛、零恢復期，有效針對頑固局部脂肪。",
    features: ["Monopolar RF + Targeted Ultrasound", "無創無痛溶脂", "同步緊膚改善鬆弛", "零恢復期可即時活動"],
    price: "試做價 HK$680/部位",
    highlight: true,
  },
  {
    tag: "🔬 技術原理",
    tagStyle: "bg-green-50 text-green-700 border border-green-200",
    name: "可針對的身體部位",
    href: "/treatments/btl-exion-body",
    subtitle: "全身多部位覆蓋",
    why: "BTL Exion Body 的探頭設計可靈活應用於全身多個部位，包括腹部、腰側、大腿內外側、手臂及臀部。每個部位可根據脂肪厚度及鬆弛程度，個別調整能量設定，達到針對性的最佳效果。",
    features: ["腹部 / 腰側", "大腿內外側", "手臂 (拜拜肉)", "臀部 / 後背"],
    price: "可同日處理多部位",
    highlight: false,
  },
  {
    tag: "💧 療程配合",
    tagStyle: "bg-blue-50 text-blue-700 border border-blue-200",
    name: "Ulfit HIFU 緊緻拉提",
    href: "/treatments/ulfit-hifu",
    subtitle: "HIFU 深層緊膚 · 提升身體輪廓",
    why: "對於以皮膚鬆弛為主要問題的身體部位（如大腿內側、腹部鬆弛），Ulfit HIFU 的超聲波能量可深入筋膜層，刺激膠原蛋白重組，有效收緊鬆弛皮膚，配合 Exion Body 的溶脂效果，雙重改善身體輪廓。",
    features: ["深至筋膜層收緊", "改善皮膚鬆弛問題", "塑造身體線條", "效果維持 12 個月以上"],
    price: "試做價 HK$1,480",
    highlight: false,
  },
];

const faqs = [
  {
    q: "BTL Exion Body 和傳統減肥有什麼分別？",
    a: "傳統減肥（節食、運動）是全身性的脂肪減少，難以針對特定部位。BTL Exion Body 是針對局部頑固脂肪的醫美療程，直接作用於目標脂肪區域。兩者可相輔相成——建議在健康生活方式的基礎上，以醫美療程改善難以消除的局部脂肪。",
  },
  {
    q: "療程效果可以維持多久？",
    a: "BTL Exion Body 的脂肪細胞減少效果相對持久，但並不能阻止新的脂肪積聚。建議完成療程後維持健康飲食及適量運動習慣，以彩維長期效果。一般建議每半年至一年進行維護療程。",
  },
  {
    q: "一次療程要做多久？需要做多少次？",
    a: "每個部位的療程時間約 20–30 分鐘，可同日連續處理多個部位。建議每 1–2 週進行一次，共 4–6 次為一個療程週期，方能達到最顯著的效果。多數客人在 3 次後已見明顯改善。",
  },
  {
    q: "療程有哪些禁忌？",
    a: "以下情況不建議進行：懷孕期間、體內有金屬植入物或心臟起搏器、治療部位有急性炎症或皮膚病變。BMI 正常至輕度超重（BMI < 30）的人士療效最佳，BMI 過高的人士建議先諮詢評估。",
  },
];

export default function BodySlimmingPage() {
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
            <span className="text-gray-600 font-medium">瘦身修形 / 溶脂</span>
          </nav>
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-teal-50 via-green-50 to-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-100/60 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-teal-600 bg-teal-50 border border-teal-200 px-3 py-1.5 rounded-full mb-5">
              <Sparkles size={11} />
              身體塑形解決方案
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
              瘦身修形 / 溶脂
            </h1>
            <p className="text-xl text-gray-600 mb-6 leading-relaxed max-w-2xl">
              局部頑固脂肪難以靠運動消除？身體線條不夠理想？現代無創醫美技術可精準針對特定部位的脂肪積聚，同步收緊鬆弛皮膚，幫助你塑造理想的身體輪廓。
            </p>
            <div className="flex flex-wrap gap-2">
              {["無創無痛", "針對局部脂肪", "同步緊膚", "零恢復期"].map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 text-sm text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full font-medium">
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
            <p className="text-gray-500">局部脂肪頑固、身體鬆弛，均可透過針對性醫美療程改善</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {symptoms.map((s) => (
              <div key={s.label} className="flex gap-3 p-4 bg-teal-50/50 rounded-2xl border border-teal-100">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center mt-0.5">
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
            <p className="text-gray-500">無創技術針對局部脂肪，同步改善皮膚鬆弛，塑造身體線條</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {treatments.map((t) => (
              <div
                key={t.name}
                className={`bg-white rounded-3xl p-6 flex flex-col border-2 ${
                  t.highlight ? "border-teal-300 shadow-lg shadow-teal-100" : "border-gray-100"
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
                      <Star size={11} className="text-teal-500 flex-shrink-0" fill="currentColor" />
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

      {/* ── Stats ── */}
      <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-400 mb-3 block">BTL Exion Body 療效數據</span>
            <h2 className="text-3xl font-bold mb-3">真實療效，數據支持</h2>
            <p className="text-gray-400 max-w-xl mx-auto">基於臨床研究的療效數據，讓你了解實際可期待的改善效果</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            {[
              { num: "4–6", unit: "次療程", desc: "建議完整療程次數" },
              { num: "即時", unit: "見效", desc: "部分客人首次療程後有感" },
              { num: "1–2 週", unit: "一次", desc: "建議療程間距" },
            ].map((stat) => (
              <div key={stat.desc} className="bg-white/5 rounded-2xl p-5 border border-white/10">
                <p className="text-3xl font-bold text-teal-400">
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
      <section className="py-16 bg-gradient-to-br from-teal-50 to-white border-t border-teal-100">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <Zap size={36} className="text-teal-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">立即預約免費諮詢</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            我們的專業美療師會為你評估需要改善的身體部位，
            制定最適合你的個人化溶脂修形方案，首次諮詢完全免費。
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
