"use client";

import Link from "next/link";
import { ArrowRight, Check, ChevronRight, Sparkles, Target, Star } from "lucide-react";

const symptoms = [
  { label: "紅印 (PIE — 血管性紅印)", desc: "暗瘡痊癒後殘留的粉紅或紅色印記，因血管擴張所致" },
  { label: "黑印 (PIH — 色素性黑印)", desc: "炎症後黑色素過度沉積，呈棕色或深褐色斑點" },
  { label: "毛孔粗大", desc: "皮脂分泌旺盛令毛孔長期擴大，化妝後仍清晰可見" },
  { label: "暗瘡反覆發作", desc: "毛孔堵塞、細菌繁殖，令暗瘡難以根治，印記不斷累積" },
  { label: "肌膚質感粗糙", desc: "印記令肌膚表面凹凸不平，缺乏光滑感及均勻膚色" },
  { label: "油光及毛孔同時困擾", desc: "T 位油脂過剩，毛孔因長期擴張而難以自行收縮" },
];

const treatments = [
  {
    tag: "🏆 首選方案",
    tagStyle: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    name: "Sylfirm X 矽谷電波",
    href: "/treatments/sylfirm-x",
    subtitle: "第 2 代雙波微針射頻 · 修復基底膜",
    why: "Sylfirm X 雙波模式中的 Pulse Wave 有效針對異常色素及血管，同步改善紅印（PIE）及黑印（PIH）；Continuous Wave 修復受損基底膜，從底層阻止色素反覆沉積，效果持久穩定。",
    features: ["同時改善 PIE 紅印及 PIH 黑印", "修復受損基底膜 (BMZ)", "抑制色素異常沉積", "4–6 小時退紅，極短恢復期"],
    price: "試做價 HK$1,880",
    highlight: true,
  },
  {
    tag: "✨ 去印協同",
    tagStyle: "bg-yellow-50 text-yellow-700 border border-yellow-200",
    name: "Hollywood Spectra Laser Facial",
    href: "/treatments/hollywood-spectra-laser",
    subtitle: "納秒激光 · 均勻膚色 + 縮細毛孔",
    why: "Hollywood Spectra 納秒激光可精準打散表皮層的色素沉積，快速淡化黑印，同時刺激膠原增生，自然縮細毛孔。能量溫和不刺激反黑，適合與 Sylfirm X 配合定期使用，加速膚色均勻。",
    features: ["納秒激光打散色素", "淡化黑印 (PIH) 效果顯著", "縮細毛孔及控油", "零恢復期即時亮肌"],
    price: "試做價 HK$880",
    highlight: false,
  },
  {
    tag: "💧 毛孔深層",
    tagStyle: "bg-cyan-50 text-cyan-700 border border-cyan-200",
    name: "Venus Glow™ 水漾活膚",
    href: "/treatments/venus-glow",
    subtitle: "70 微米水流深層淨化 · 即時通透",
    why: "Venus Glow 以 70 微米超幼水流配合 360° 旋轉真空吸力，非物理擠壓方式深層清潔毛孔內的油脂及角質堆積。定期清潔是預防暗瘡及印記繼續形成的關鍵基礎護理步驟。",
    features: ["非物理擠壓溫和清潔", "深層移除毛孔污垢", "即時通透發光效果", "預防暗瘡反覆形成"],
    price: "試做價 HK$480",
    highlight: false,
  },
];

const faqs = [
  {
    q: "紅印和黑印需要不同的療程嗎？",
    a: "是的，兩者成因不同。紅印（PIE）由血管擴張引起，需要針對血管的療程如 Sylfirm X 的 Continuous Wave 或 Hollywood Spectra Golden Laser；黑印（PIH）由色素沉澱引起，需要針對黑色素的療程。Sylfirm X 的雙波技術同時針對兩者，是最全面的選擇。",
  },
  {
    q: "暗瘡印需要多長時間才能改善？",
    a: "輕微印記一般在 3–5 次療程後有明顯改善；較深的色素印記或舊印可能需要 6–8 次。每次療程間距建議 4 週，讓皮膚充分代謝。日常配合防曬可大幅加快改善速度，防止色素加深。",
  },
  {
    q: "有活躍暗瘡期間可以做療程嗎？",
    a: "有活躍性炎症暗瘡（紅腫膿瘡）時，建議先處理活躍暗瘡狀況，再進行針對印記的療程。Venus Glow 深層清潔及部分溫和療程在暗瘡活躍期亦可進行，具體情況我們會在諮詢時為你評估。",
  },
  {
    q: "毛孔粗大可以永久改善嗎？",
    a: "毛孔大小與遺傳、皮脂腺活躍程度有關，難以永久改變，但可透過定期療程及日常護理維持在改善狀態。Hollywood Spectra 及 Venus Glow 定期進行，配合日常防曬及控油護理，可持續維持毛孔細緻效果。",
  },
];

export default function AcneScarsClient() {
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
            <span className="text-gray-600 font-medium">暗瘡印 / 毛孔粗大</span>
          </nav>
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-teal-50 to-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/60 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full mb-5">
              <Sparkles size={11} />
              肌膚困擾解決方案
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
              暗瘡印 / 毛孔粗大
            </h1>
            <p className="text-xl text-gray-600 mb-6 leading-relaxed max-w-2xl">
              暗瘡雖然痊癒，留下的紅印、黑印與粗大毛孔卻長期影響外觀。透過針對性的醫美療程，從色素根源及毛孔結構入手，重現均勻通透、細膩平滑的肌膚質感。
            </p>
            <div className="flex flex-wrap gap-2">
              {["同時改善紅印黑印", "縮細毛孔", "控油不反黑", "極短恢復期"].map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full font-medium">
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
            <p className="text-gray-500">以下任何一種情況，都適合諮詢針對性暗瘡印療程方案</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {symptoms.map((s) => (
              <div key={s.label} className="flex gap-3 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center mt-0.5">
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
            <p className="text-gray-500">針對紅印、黑印及毛孔粗大，由根源解決暗瘡後遺症</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {treatments.map((t) => (
              <div
                key={t.name}
                className={`bg-white rounded-3xl p-6 flex flex-col border-2 ${
                  t.highlight ? "border-emerald-300 shadow-lg shadow-emerald-100" : "border-gray-100"
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
                      <Star size={11} className="text-emerald-500 flex-shrink-0" fill="currentColor" />
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
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-3 block">黃金組合推薦</span>
            <h2 className="text-3xl font-bold mb-3">修復基底 × 激光淡印</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Sylfirm X 從根源修復基底膜，抑制色素再沉積；Hollywood Spectra 快速打散已有色素印記——雙管齊下，加速還原均勻肌膚
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10">
            {["Sylfirm X 矽谷電波", "+", "Hollywood Spectra 激光"].map((item, i) =>
              item === "+" ? (
                <span key={i} className="text-3xl font-bold text-emerald-400">+</span>
              ) : (
                <div key={i} className="bg-white/10 backdrop-blur rounded-2xl px-6 py-4 text-center border border-white/10">
                  <p className="font-bold text-white">{item}</p>
                </div>
              )
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            {[
              { num: "3–6", unit: "次療程", desc: "建議療程次數" },
              { num: "80%+", unit: "改善率", desc: "輕中度暗瘡印平均淡化" },
              { num: "4 週", unit: "一次", desc: "建議療程間距" },
            ].map((stat) => (
              <div key={stat.desc} className="bg-white/5 rounded-2xl p-5 border border-white/10">
                <p className="text-3xl font-bold text-emerald-400">
                  {stat.num}
                  <span className="text-base ml-1 text-white/70">{stat.unit}</span>
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
      <section className="py-16 bg-gradient-to-br from-emerald-50 to-white border-t border-emerald-100">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <Target size={36} className="text-emerald-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">立即預約免費諮詢</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            我們的專業美療師會為你評估印記類型及毛孔狀況，
            制定最適合你的個人化淡印方案，首次諮詢完全免費。
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
