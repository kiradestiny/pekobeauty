"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle,
  XCircle,
  Award,
  Users,
  ThumbsUp,
  ChevronDown,
  MessageCircle,
  MapPin,
  Clock,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// REUSABLE: ReadMoreText
// ─────────────────────────────────────────────────────────────
function ReadMoreText({
  children,
  lines = 3,
  className = "",
}: {
  children: React.ReactNode;
  lines?: number;
  className?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const lineClampClass = !expanded ? `line-clamp-${lines}` : "";
  return (
    <div className={className}>
      <div className={`md:line-clamp-none ${lineClampClass}`}>{children}</div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="md:hidden mt-1 text-[#C52B21] text-xs font-semibold hover:underline"
      >
        {expanded ? "收起 ▲" : "展開更多 ▼"}
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────
const BRAND_RED = "#C52B21";
const WA_LINK =
  "https://wa.me/85253353313?text=Hi%20Peko%2C%20我想查詢%20DEP%20無針水光導入療程試做優惠";
const WA_BOOKING =
  "https://wa.me/85253353313?text=Hi%20Peko%2C%20我想預約%20DEP%20無針水光導入療程，請問有咩時間？";

const EASE_OUT: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const scaleIn = {
  hidden: { opacity: 0, scale: 0.93 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: EASE_OUT } },
};

// ─────────────────────────────────────────────────────────────
// REUSABLE: AnimatedSection
// ─────────────────────────────────────────────────────────────
function AnimatedSection({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.section id={id} ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger} className={className}>
      {children}
    </motion.section>
  );
}

// ─────────────────────────────────────────────────────────────
// REUSABLE: WhatsApp CTA Button
// ─────────────────────────────────────────────────────────────
function WhatsAppButton({ href = WA_LINK, text = "💬 WhatsApp 預約試做 — HK$980", className = "", large = true, fullWidth = false }: { href?: string; text?: string; className?: string; large?: boolean; fullWidth?: boolean }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold rounded-lg transition-all duration-200 hover:bg-[#1ebe5d] hover:shadow-xl active:scale-[0.98] ${large ? "px-8 py-5 text-lg md:text-xl" : "px-6 py-4 text-base"} ${fullWidth ? "w-full" : ""} ${className}`}
      style={{ boxShadow: "0 4px 20px rgba(37,211,102,0.40)" }}
    >
      {text}
    </a>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 1: STICKY NAV
// ─────────────────────────────────────────────────────────────
function StickyNav() {
  const navItems = [
    { label: "療程數據", id: "treatment-stats" },
    { label: "技術原理", id: "science" },
    { label: "療程比較", id: "comparison" },
    { label: "客人見證", id: "results" },
    { label: "常見問題", id: "faq" },
    { label: "收費", id: "pricing" },
  ];
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <div className="hidden md:block sticky top-[64px] z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-center gap-6 py-3">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => scrollTo(item.id)}
              className="text-xs font-semibold text-gray-500 hover:text-[#C52B21] transition-colors duration-150 pb-0.5 border-b-2 border-transparent hover:border-[#C52B21]">
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 2: HERO
// ─────────────────────────────────────────────────────────────
function HeroSection() {
  const trustBadges = ["💧 無針無痛水光", "🔬 電穿孔深導入技術", "👩‍⚕️ 全女班專業團隊", "🚫 絕無硬銷", "⭐ 5,000+ 真實好評"];
  const stats = [
    { val: "0/10", label: "完全無痛" },
    { val: "零", label: "恢復期" },
    { val: "45–60分", label: "療程時間" },
  ];

  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-[#e8f4fd] to-white pt-20">
      <motion.div initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, ease: EASE_OUT }} className="relative w-full aspect-[16/9] md:aspect-[16/7] overflow-hidden">
        <Image src="/images/peko-beauty-reception-desk-mong-kok.jpg" alt="Peko Beauty DEP 無針水光導入 透明質酸深層補水 旺角朗豪坊醫美" fill className="object-cover object-center" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.4, ease: EASE_OUT }} className="absolute top-4 right-4">
          <span className="text-white text-xs md:text-sm font-black px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5" style={{ background: BRAND_RED }}>
            💧 新客試做 HK$980
          </span>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5, ease: EASE_OUT }} className="absolute bottom-4 left-0 right-0 px-4">
          <div className="flex flex-wrap gap-1.5 md:gap-2 justify-center">
            {trustBadges.map((badge) => (
              <span key={badge} className="bg-white/10 backdrop-blur-md text-white text-[10px] md:text-xs px-2.5 md:px-3 py-1 md:py-1.5 rounded-full font-semibold border border-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]">{badge}</span>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <div className="max-w-4xl mx-auto px-4 pt-8 pb-14 text-center">
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.15, ease: EASE_OUT }}
          className="text-[clamp(20px,4vw,40px)] font-black leading-[1.3] text-gray-900 mb-5 max-w-3xl mx-auto"
          style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}>
          DEP 無針水光導入 香港｜電穿孔深層補水
          <br />
          <span className="text-[clamp(16px,3vw,28px)] font-bold text-gray-600">
            皮膚暗啞 · 乾紋缺水 · 怕針水光
            <span className="hidden sm:inline"> — </span>
            <br className="sm:hidden" />
            效果 / 成分 / 次數完整解析
          </span>
          <br />
          <span className="text-[clamp(14px,2.5vw,22px)] font-black" style={{ color: BRAND_RED }}>
            新客試做 HK$980｜旺角朗豪坊
          </span>
        </motion.h1>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25, ease: EASE_OUT }} className="flex justify-center gap-2 md:gap-4 mb-6 w-full max-w-sm mx-auto">
          {stats.map((s) => (
            <div key={s.label} className="bg-sky-50 border border-sky-100 rounded-xl px-2 md:px-5 py-2.5 text-center flex-1">
              <div className="text-sm md:text-xl font-black text-sky-700 leading-tight whitespace-nowrap">{s.val}</div>
              <div className="text-[9px] md:text-xs text-gray-500 mt-0.5 leading-tight">{s.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.32, ease: EASE_OUT }} className="text-gray-500 text-sm md:text-base max-w-lg mx-auto mb-7 leading-relaxed">
          電穿孔技術（DEP）以微電脈衝開啟皮膚細胞通道，無針深導入透明質酸。
          <span className="hidden md:inline">達到水光針補水效果，完全無針、無痛、零恢復期，即刻補妝返工，適合所有膚質。</span>
        </motion.p>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.42, ease: EASE_OUT }} className="flex flex-col items-center gap-3">
          <WhatsAppButton href={WA_LINK} />
          <p className="text-xs text-gray-400">✅ 新客限定 · 明碼實價 · 到店後無需即場決定</p>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 3: PAIN POINTS
// ─────────────────────────────────────────────────────────────
function PainPointsSection() {
  const points = [
    {
      emoji: "😟", tag: "皮膚嚴重缺水",
      title: "用了好多保濕品，皮膚還是乾、還是暗啞",
      desc: "外用護膚品的分子體積過大，無法穿透皮膚屏障（角質層）到達真皮層。即使用最貴的透明質酸精華，絕大多數分子都滯留在皮膚表面，無法補充底層真正缺乏的水分。皮膚底層乾燥，表皮看起來就是暗、乾、缺乏光澤。",
      imgSrc: null as string | null,
      gradient: "from-sky-200 via-blue-100 to-cyan-50",
      accentColor: "#0284c7",
    },
    {
      emoji: "😔", tag: "怕針水光",
      title: "知道水光針效果好，但非常怕針、怕瘀腫",
      desc: "傳統水光針需要以細針在全臉刺入數十至數百針，即使敷麻醉膏也有一定不適感，療程後通常有針孔紅點及輕微瘀腫，需要 1–3 天恢復期。很多人因此一直望而卻步——這正是 DEP 無針水光的出現原因：同等深導效果，完全無針無痛。",
      imgSrc: null as string | null,
      gradient: "from-rose-200 via-pink-100 to-red-50",
      accentColor: "#C52B21",
    },
    {
      emoji: "😩", tag: "缺水毛孔粗大",
      title: "毛孔越來越粗，用收斂水沒有用",
      desc: "缺水性毛孔粗大是由於皮膚底層水分不足，令毛孔周邊皮膚失去飽滿支撐，毛孔邊緣因此向外「塌陷」顯大。收斂水只是暫時收緊表皮，並未解決底層缺水問題。真正縮小缺水性毛孔，需要從真皮層補充透明質酸讓皮膚飽滿起來。",
      imgSrc: null as string | null,
      gradient: "from-violet-200 via-purple-100 to-indigo-50",
      accentColor: "#7c3aed",
    },
    {
      emoji: "😤", tag: "膚色不均暗沉",
      title: "臉色暗黃不均，敷面膜、去角質都沒有用",
      desc: "膚色暗沉除了色素問題，很大程度因為皮膚底層缺水——缺水的皮膚細胞代謝變慢，廢物堆積令膚色暗黃。單靠去角質只能改善表層，DEP 將維他命 C 等亮膚成分直接導入真皮層，從底部激活細胞代謝，改善膚色均勻度。",
      imgSrc: null as string | null,
      gradient: "from-amber-200 via-orange-100 to-yellow-50",
      accentColor: "#d97706",
    },
  ];

  return (
    <AnimatedSection id="pain-points" className="py-12 md:py-16 px-4 bg-[#FAFAFA]">
      <div className="max-w-5xl mx-auto">
        <motion.div variants={fadeUp} className="text-center mb-10 md:mb-14">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-[#C52B21] mb-3 px-4 py-1.5 bg-red-50 rounded-full border border-red-100">你的困擾</span>
          <h2 className="text-2xl md:text-[2rem] font-black text-gray-900 mb-3 leading-tight" style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}>
            你係咪試過呢啲情況？
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-md mx-auto leading-relaxed">
            護膚品的分子體積太大，永遠滲透不了皮膚屏障——真正的深層補水需要不同的方法
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
          {points.map((p) => (
            <motion.div key={p.title} variants={scaleIn} whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="relative aspect-[16/9] overflow-hidden">
                {p.imgSrc ? (
                  <Image src={p.imgSrc} alt={p.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, 50vw" />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${p.gradient} flex flex-col items-center justify-center gap-3 transition-transform duration-500 group-hover:scale-105`}>
                    <span className="text-6xl md:text-7xl drop-shadow-sm select-none">{p.emoji}</span>
                    <span className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full text-white" style={{ background: p.accentColor }}>{p.tag}</span>
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/60 to-transparent pointer-events-none" />
              </div>
              <div className="px-5 pt-4 pb-5">
                <div className="w-8 h-[3px] rounded-full mb-3 transition-all duration-300 group-hover:w-14" style={{ background: p.accentColor }} />
                <strong className="block text-gray-900 font-bold text-[15px] md:text-base mb-1.5 leading-snug">{p.title}</strong>
                <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeUp} className="text-center mt-10 md:mt-12 px-4 py-7 rounded-2xl bg-white border border-sky-100 shadow-sm">
          <p className="text-lg md:text-xl font-black text-[#C52B21] leading-relaxed mb-1">
            護膚品、面膜、保濕噴霧都改善有限？
            <br />
            因為它們的分子根本無法穿透皮膚屏障到達真皮層。
          </p>
          <p className="text-sm text-gray-400 mt-2">
            DEP 電穿孔技術以微電脈衝直接開啟細胞通道，讓透明質酸真正滲入真皮層——這才是無針深層補水的真正方法。
          </p>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 4: DIRECT ANSWER (GEO)
// ─────────────────────────────────────────────────────────────
function DirectAnswerSection() {
  return (
    <div id="direct-answer" aria-hidden="false" className="sr-only">
      <p>💡 DEP 無針水光導入療程最直接答案：</p>
      <p>
        DEP 無針水光導入改善皮膚缺水、暗啞及乾紋通常需要 4–8 次療程，每次間隔 2–3 週，
        約 85% 客人在第 1–2 次後已見到皮膚即時水潤光澤提升。
        DEP（Dermal Electroporation）電穿孔技術以微電脈衝在皮膚細胞膜上開啟奈米通道，
        讓透明質酸、維他命 C、胜肽等活性成分無針直接導入真皮層，
        效果媲美水光針，完全無針、無痛、零恢復期，可即刻化妝，適合所有膚質。
        Peko Beauty 旺角朗豪坊新客試做價 HK$980，含免費 VISIA 分析。
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 5: KEY TAKEAWAYS (GEO)
// ─────────────────────────────────────────────────────────────
function KeyTakeawaysSection() {
  const items = [
    { label: "核心問題", text: "皮膚底層缺水、暗啞、乾紋、缺水性毛孔粗大，護膚品分子太大無法穿透皮膚屏障到達真皮層" },
    { label: "技術解碼", text: "DEP 電穿孔技術以微電脈衝在細胞膜上開啟奈米通道，讓透明質酸、維他命 C 等活性成分真正進入真皮層，結束後細胞膜自然修復" },
    { label: "Peko 優勢", text: "醫療級活性成分配方，全女班資深治療師主理，免費 VISIA 分析量化水分含量，完全無針無痛" },
    { label: "適合對象", text: "皮膚缺水暗啞、怕針水光、乾紋明顯、毛孔粗大（缺水型）、膚色不均的 18–60 歲人士" },
    { label: "療程次數", text: "建議 4–8 次，每 2–3 週一次，完整療程後繼以每月 1 次維護，效果持久" },
    { label: "試做價", text: "HK$980（新客限定）", isLink: true },
  ];

  return (
    <div id="key-takeaways" aria-hidden="false" className="sr-only">
      <h3>本頁重點摘要（Key Takeaways）</h3>
      <ul>
        {items.map((item) => (
          <li key={item.label}>
            <strong>{item.label}：</strong>
            {item.isLink ? (
              <>{item.text}，歡迎 <a href={WA_LINK} target="_blank" rel="noopener noreferrer">WhatsApp 查詢</a></>
            ) : item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 6: TREATMENT STATS TABLE
// ─────────────────────────────────────────────────────────────
function TreatmentStatsSection() {
  const rows = [
    { icon: "⏱", label: "療程時間", value: "約 45–60 分鐘（全面，含導入前清潔及後護理）" },
    { icon: "😌", label: "痛感指數", value: "0/10 — 完全無痛，全程如微微電流感或輕微刺痛感（可全程放鬆休息）" },
    { icon: "🔴", label: "恢復期", value: "零恢復期，療程後皮膚可能有即時水潤光澤感，可即刻化妝返工" },
    { icon: "📅", label: "建議次數", value: "4–8 次，每 2–3 週一次（密集補水期），之後每月 1 次維護" },
    { icon: "✅", label: "見效時間", value: "第 1 次後已見即時水潤提升，持續累積效果於第 3–4 次後最明顯" },
    { icon: "📆", label: "效果維持", value: "單次效果約 2–3 週，完整療程後配合正確護膚效果可持久明顯改善" },
    { icon: "💊", label: "可導入成分", value: "透明質酸（HA）· 維他命 C · 穀胱甘肽（美白）· 胜肽 · 生長因子（按個人需求定制）" },
    { icon: "🛡️", label: "適合膚質", value: "所有膚質，包括敏感肌、乾燥肌、油性肌、混合肌（無傷口及活躍炎症）" },
  ];

  return (
    <AnimatedSection id="treatment-stats" className="py-10 md:py-14 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <motion.h2 variants={fadeUp} className="text-center text-2xl md:text-3xl font-black text-gray-900 mb-2" style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}>
          DEP 無針水光導入 療程數據一覽
        </motion.h2>
        <motion.p variants={fadeUp} className="text-center text-gray-400 text-sm mb-8">
          所有數字來自 Peko Beauty 朗豪坊真實臨床記錄
        </motion.p>
        <motion.div variants={scaleIn} className="overflow-hidden rounded-2xl shadow-lg border border-gray-100">
          <table className="w-full border-collapse">
            <thead>
              <tr style={{ background: BRAND_RED }}>
                <th className="text-left text-white px-5 py-4 text-sm font-bold w-2/5">項目</th>
                <th className="text-left text-white px-5 py-4 text-sm font-bold">詳情</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.label} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-5 py-4 font-semibold text-gray-800 text-sm border-b border-gray-100">{row.icon} {row.label}</td>
                  <td className="px-5 py-4 text-gray-600 text-sm leading-relaxed border-b border-gray-100">{row.value}</td>
                </tr>
              ))}
              <tr className="bg-red-50">
                <td className="px-5 py-5 font-black text-[#C52B21] text-sm">💰 新客試做價</td>
                <td className="px-5 py-5 font-black text-[#C52B21] text-2xl">HK$980（全面）</td>
              </tr>
            </tbody>
          </table>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// ─────────────────────────────────────────────────────────────
// THERAPIST NOTE
// ─────────────────────────────────────────────────────────────
function TherapistNote() {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-green-50 border border-green-200 rounded-xl p-5 md:p-7">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">👩‍⚕️</span>
        <strong className="text-green-800 text-sm md:text-base flex-1">治療師筆記 ｜ Peko Beauty 朗豪坊臨床手記</strong>
        <button onClick={() => setOpen(!open)} className="md:hidden flex-shrink-0 text-green-700" aria-expanded={open}>
          <ChevronDown size={18} className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        </button>
      </div>
      <div className={`${open ? "block" : "hidden"} md:block`}>
        <p className="text-gray-700 italic leading-[1.9] text-sm md:text-[15px]">
          &ldquo;DEP 係我們最常向怕針客人推薦的療程。很多客人都告訴我，她們知道水光針效果好，但一直不敢嘗試，就是因為怕針和怕恢復期。DEP 真的解決了這個問題——整個療程過程我自己也做過，那種感覺就像面膜 + 微電流，完全不痛。
          最驚喜的是效果：做完第 1 次肌膚就有即時水潤感，做完 3–4 次後客人普遍反映皮膚暗啞感明顯減退、乾紋淡了、整個人看起來更有精神。
          我特別喜歡配合 VISIA 的水分分析，做療程前後對比，讓客人用數據看到真皮層水分的變化，說服力比任何言語都強。&rdquo;
        </p>
        <p className="text-xs text-gray-400 mt-3">— Peko Beauty 資深治療師，旺角朗豪坊診所</p>
      </div>
      {!open && (
        <p className="md:hidden text-gray-500 italic text-xs line-clamp-2">
          &ldquo;DEP 係我們最常向怕針客人推薦的療程。很多客人都告訴我，她們知道水光針效果好，但一直不敢嘗試……&rdquo;
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 7: SCIENCE
// ─────────────────────────────────────────────────────────────
function ScienceSection() {
  const stats = [
    { value: "無針", label: "完全無針" },
    { value: "0/10", label: "痛感指數" },
    { value: "即時", label: "水潤感受" },
    { value: "零", label: "恢復期" },
  ];

  return (
    <AnimatedSection id="science" className="py-10 md:py-14 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-black text-gray-900 mb-8" style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}>
          DEP 無針水光點樣做到深層補水？
          <br className="hidden sm:block" />
          電穿孔（Electroporation）技術原理完整拆解
        </motion.h2>

        <motion.h3 variants={fadeUp} className="text-lg font-bold text-[#C52B21] mb-3">
          ❶ 問題根源：點解護膚品永遠無法真正補水？
        </motion.h3>
        <motion.div variants={fadeUp}>
          <ReadMoreText lines={3} className="text-gray-600 leading-[1.9] mb-5 text-[15px]">
            皮膚屏障（角質層）是一道精密的防禦系統，主要功能是防止外來物質入侵及防止水分流失。
            問題是，這道屏障同樣阻擋了護膚品中的活性成分——包括透明質酸。
            透明質酸分子（即使是「小分子 HA」）相比皮膚細胞間隙仍然太大，
            無法自行穿透角質層到達真皮層。因此，外搽補水只是補充皮膚表面水分，
            真皮層底部的玻尿酸儲量依然在持續流失。
          </ReadMoreText>
        </motion.div>

        <motion.h3 variants={fadeUp} className="text-lg font-bold text-[#C52B21] mb-3">
          ❷ 技術解法：DEP 電穿孔如何突破皮膚屏障？
        </motion.h3>

        <div className="hidden md:grid grid-cols-3 gap-4 mb-7">
          <motion.div variants={scaleIn} className="bg-sky-50 rounded-xl p-5 border border-sky-100">
            <div className="font-black text-sky-700 text-base mb-2">① 微電脈衝開啟細胞通道</div>
            <p className="text-gray-600 text-sm leading-relaxed">
              DEP 儀器發出短暫、精準的微電脈衝（電場），令皮膚細胞膜上產生<strong>奈米級臨時通道</strong>（electropores）。這些通道在電脈衝期間開放，讓活性成分分子通過進入真皮層。
            </p>
          </motion.div>
          <motion.div variants={scaleIn} className="bg-emerald-50 rounded-xl p-5 border border-emerald-100">
            <div className="font-black text-emerald-700 text-base mb-2">② 活性成分深層導入</div>
            <p className="text-gray-600 text-sm leading-relaxed">
              在細胞通道開放的同時，透明質酸、維他命 C、胜肽等活性成分即時穿越屏障，直達真皮層。這是離子導入、超聲波導入等技術所無法達到的<strong>真正真皮層滲透</strong>效果。
            </p>
          </motion.div>
          <motion.div variants={scaleIn} className="bg-violet-50 rounded-xl p-5 border border-violet-100">
            <div className="font-black text-violet-700 text-base mb-2">③ 細胞膜自然修復</div>
            <p className="text-gray-600 text-sm leading-relaxed">
              電脈衝停止後，細胞膜<strong>完全自然修復</strong>（通常在數分鐘至數小時內），不留下任何損傷。這是電穿孔技術的核心安全性基礎——奈米通道的開放是臨時性、可逆的。
            </p>
          </motion.div>
        </div>

        <div className="md:hidden grid grid-cols-1 gap-3 mb-6">
          {[
            { color: "sky", title: "微電脈衝開啟通道", desc: "皮膚細胞膜上開啟奈米級臨時通道" },
            { color: "emerald", title: "活性成分深層導入", desc: "透明質酸等成分直達真皮層" },
            { color: "violet", title: "細胞膜自然修復", desc: "脈衝停止後完全恢復，零損傷" },
          ].map((t) => (
            <div key={t.title} className={`bg-${t.color}-50 rounded-xl p-4 border border-${t.color}-100`}>
              <div className={`font-black text-${t.color}-700 text-sm mb-1`}>{t.title}</div>
              <p className="text-gray-500 text-xs">{t.desc}</p>
            </div>
          ))}
        </div>

        <motion.div variants={fadeUp} className="hidden md:block">
          <ReadMoreText lines={2} className="text-gray-600 leading-[1.9] mb-10 text-[15px]">
            DEP 與舊一代「離子導入」（Iontophoresis）的根本區別：離子導入只能透過電荷差異移動帶電分子，
            且僅限於表皮層；DEP 則以物理方式在細胞膜上開啟實體通道，不受分子電荷限制，
            滲透深度更深（可達真皮層），可導入的活性成分種類也更廣泛。
          </ReadMoreText>
        </motion.div>
        <div className="md:hidden mb-8" />

        <motion.h3 variants={fadeUp} className="text-lg font-bold text-[#C52B21] mb-5">
          ❸ 臨床優勢數據
        </motion.h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {stats.map((s) => (
            <motion.div key={s.value} variants={scaleIn} className="bg-sky-50 rounded-xl p-5 text-center border border-sky-100">
              <div className="text-3xl md:text-4xl font-black text-sky-700 leading-tight">{s.value}</div>
              <div className="text-xs text-gray-500 mt-2">{s.label}</div>
            </motion.div>
          ))}
        </div>

        <TherapistNote />
      </div>
    </AnimatedSection>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 7.5: ACTIVE INGREDIENTS — 可導入成分
// ─────────────────────────────────────────────────────────────
function IngredientsSection() {
  const ingredients = [
    { emoji: "💧", name: "透明質酸（HA）", benefit: "深層補水、填補乾紋、提升皮膚飽滿度", tag: "保濕首選", accentColor: "#0284c7" },
    { emoji: "✨", name: "維他命 C", benefit: "提亮膚色、減淡暗沉、均勻色調、抗氧化", tag: "亮白美肌", accentColor: "#d97706" },
    { emoji: "🔬", name: "穀胱甘肽（Glutathione）", benefit: "美白淡斑、抗氧化、改善黃氣、均勻膚色", tag: "深層美白", accentColor: "#7c3aed" },
    { emoji: "⚗️", name: "胜肽（Peptides）", benefit: "刺激膠原蛋白合成、緊緻抗老、改善細紋", tag: "抗老緊緻", accentColor: "#059669" },
    { emoji: "🌱", name: "生長因子（EGF/FGF）", benefit: "促進細胞再生、修復受損皮膚、加速新陳代謝", tag: "修復再生", accentColor: "#C52B21" },
    { emoji: "🫧", name: "煙酰胺（Niacinamide）", benefit: "縮小毛孔、均勻膚色、控油又補水、改善膚質", tag: "全效改善", accentColor: "#0369a1" },
  ];

  return (
    <AnimatedSection id="ingredients" className="py-10 md:py-14 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-black text-gray-900 mb-3 text-center" style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}>
          DEP 可導入哪些活性成分？
        </motion.h2>
        <motion.p variants={fadeUp} className="text-center text-gray-400 text-sm mb-10">
          根據你的皮膚困擾，治療師為你個人化定制導入成分組合
        </motion.p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {ingredients.map((item) => (
            <motion.div key={item.name} variants={scaleIn} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
              <span className="text-3xl mb-3 block">{item.emoji}</span>
              <strong className="block text-base font-bold mb-1" style={{ color: item.accentColor }}>{item.name}</strong>
              <p className="text-gray-500 text-xs leading-relaxed mb-3">{item.benefit}</p>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold text-white" style={{ background: item.accentColor }}>{item.tag}</span>
            </motion.div>
          ))}
        </div>
        <motion.div variants={fadeUp} className="mt-8 bg-sky-50 border border-sky-200 rounded-xl p-5 text-center">
          <p className="text-sky-800 text-sm leading-relaxed">
            💡 <strong>個人化定制：</strong>Peko Beauty 的 DEP 療程不是固定配方——治療師會根據你的 VISIA 皮膚分析結果及主要困擾，為你推薦最合適的活性成分組合，確保每次療程針對你的皮膚需求。
          </p>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 8: PROCESS
// ─────────────────────────────────────────────────────────────
function ProcessSection() {
  const steps = [
    { num: 1, title: "WhatsApp 預約", desc: "透過 WhatsApp +852 5335 3313 預約，客服在 24 小時內確認時間。DEP 療程約 45–60 分鐘，建議提前最少 1 天預約。" },
    { num: 2, title: "到店 + 免費 VISIA 皮膚深層分析", desc: "治療師以 VISIA 儀器分析你的皮膚真皮層水分含量、暗沉程度及毛孔狀況，以科學數據制定最適合的導入成分組合方案。" },
    { num: 3, title: "個人化成分方案制定（零硬銷）", desc: "根據 VISIA 數據及你的主要困擾（補水 / 美白 / 抗老 / 縮毛孔），治療師說明最適合的活性成分組合及療程建議次數。不適合就不做。" },
    { num: 4, title: "DEP 無針導入療程進行", desc: "清潔面部後塗上定制活性成分導入液，以 DEP 手具對全臉系統化導入。全程如微電流刺激感，完全無痛，約 30–40 分鐘，可輕鬆休息。" },
    { num: 5, title: "療程後即可化妝 + WhatsApp 跟進", desc: "DEP 療程後零恢復期，可即時補妝返工，皮膚通常即時有水潤光澤感。治療師透過 WhatsApp 在 24–48 小時內主動跟進皮膚反應。" },
  ];

  return (
    <AnimatedSection id="process" className="py-14 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-black text-gray-900 text-center mb-12" style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}>
          在 Peko Beauty 做 DEP 無針水光係咩流程？
        </motion.h2>
        <div className="space-y-4 md:space-y-5">
          {steps.map((step) => (
            <motion.div key={step.num} variants={fadeUp} className="flex gap-4 md:gap-6 items-start">
              <div className="flex-shrink-0 w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center text-white font-black text-base md:text-lg shadow-md" style={{ background: BRAND_RED }}>{step.num}</div>
              <div className="bg-white rounded-xl p-4 md:p-5 flex-1 shadow-sm border border-gray-100">
                <strong className="block text-gray-900 text-[14px] md:text-[15px] leading-snug">{step.title}</strong>
                <p className="hidden md:block text-gray-500 text-sm leading-relaxed mt-2">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 9: COMPARISON TABLE
// ─────────────────────────────────────────────────────────────
function ComparisonSection() {
  const rows = [
    { feature: "核心技術", dep: "電穿孔（Electroporation）", meso: "細針注射（Mesotherapy）", ionto: "電荷驅動（Iontophoresis）" },
    { feature: "針具", dep: "✅ 完全無針", meso: "❌ 需要注射針", ionto: "✅ 無針", highlight: true },
    { feature: "痛感", dep: "0/10（完全無感）", meso: "3–4/10（即使敷麻醉膏）", ionto: "0/10" },
    { feature: "恢復期", dep: "零恢復期（即刻化妝）", meso: "1–3 天（針孔紅點 / 瘀腫）", ionto: "零恢復期", highlight: true },
    { feature: "真皮層滲透", dep: "✅ 真正滲透真皮層", meso: "✅ 直接注射真皮層", ionto: "⚠️ 停留在表皮層", highlight: true },
    { feature: "導入成分靈活性", dep: "✅ 多種成分（不限電荷）", meso: "✅ 多種成分", ionto: "⚠️ 只限帶電分子", highlight: true },
    { feature: "即時效果", dep: "即時水潤感", meso: "即時飽滿（填充感）", ionto: "輕微潤澤" },
    { feature: "適合敏感肌", dep: "✅ 適合", meso: "⚠️ 需謹慎（創口）", ionto: "✅ 適合" },
    { feature: "試做價", dep: "HK$980", meso: "HK$2,000+", ionto: "HK$300–600", isPrice: true },
  ];

  return (
    <AnimatedSection id="comparison" className="hidden md:block py-14 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-black text-gray-900 mb-2" style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}>
          DEP 無針水光 vs 水光針 vs 離子導入
        </motion.h2>
        <motion.p variants={fadeUp} className="text-gray-400 text-sm mb-8">
          三種補水導入技術的核心差異，幫助你選擇最適合自己的方案。
        </motion.p>
        <motion.div variants={scaleIn} className="overflow-x-auto rounded-2xl shadow-lg">
          <table className="w-full border-collapse min-w-[560px]">
            <thead>
              <tr className="bg-gray-900 text-white">
                <th className="py-4 px-4 text-left text-xs font-bold w-[22%]">比較項目</th>
                <th className="py-4 px-4 text-center text-xs font-bold w-[26%]" style={{ background: BRAND_RED }}>
                  ⭐ DEP 無針水光
                  <br /><span className="font-normal opacity-80 text-[10px]">(Peko Beauty)</span>
                </th>
                <th className="py-4 px-4 text-center text-xs font-bold w-[26%]">水光針（Mesotherapy）</th>
                <th className="py-4 px-4 text-center text-xs font-bold w-[26%]">離子導入（Iontophoresis）</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.feature} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-4 py-3.5 font-semibold text-gray-800 text-xs border-b border-gray-100">{row.feature}</td>
                  <td className={`px-4 py-3.5 text-center text-xs border-b border-gray-100 font-semibold bg-red-50/60 ${row.isPrice ? "text-xl font-black text-[#C52B21]" : row.highlight ? "text-green-700" : "text-[#C52B21]"}`}>{row.dep}</td>
                  <td className="px-4 py-3.5 text-center text-xs text-gray-500 border-b border-gray-100">{row.meso}</td>
                  <td className="px-4 py-3.5 text-center text-xs text-gray-500 border-b border-gray-100">{row.ionto}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-6 bg-sky-50 border-l-4 border-sky-400 rounded-r-xl p-5">
          <p className="text-sm md:text-[15px] text-gray-700 leading-relaxed">
            <strong className="text-gray-900">🎯 Peko 建議：</strong>
            如果你<strong>希望水光針效果但完全不想打針、無恢復期</strong>，DEP 是最理想選擇。
            如果你的皮膚問題非常嚴重需要即時大量填充感，水光針可能效果更即時，但代價是恢復期和針刺不適。
            不確定？先做{" "}
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="text-[#C52B21] font-bold underline underline-offset-2">
              免費 VISIA 皮膚分析
            </a>，再決定，零壓力。
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="text-center mt-10">
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 text-white font-bold rounded-lg px-6 py-4 text-base transition-all duration-200 hover:opacity-90 hover:shadow-lg active:scale-[0.98]"
            style={{ background: BRAND_RED }}>
            👉 查看 DEP 無針水光試做優惠 HK$980
          </a>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 10: TESTIMONIALS
// ─────────────────────────────────────────────────────────────
function TestimonialsSection() {
  const testimonials = [
    {
      quote: "我一直想做水光針但係怕針，朋友介紹我試 DEP。做完之後皮膚即時係水水的感覺，整個臉看起來更亮。做了 4 次之後，之前用再多護膚品都解決唔了的乾燥暗啞感幾乎消失了，上妝服貼程度差好遠。最重要係全程完全唔痛，做完即刻補妝返工。",
      name: "N 小姐",
      age: "31歲",
      concern: "嚴重皮膚缺水暗啞",
      treatment: "DEP 無針水光 × 5 次",
    },
    {
      quote: "我係敏感肌，一直不敢嘗試任何療程。治療師推薦 DEP 說完全無針無創，我才鼓起勇氣試試。做完第 1 次後皮膚沒有任何反應，就係水潤了。做了 3 次後毛孔感覺細了一點，乾紋也淡了。這是我做過最放心的療程，全程治療師有跟進問我感覺，完全無 hard sell。",
      name: "P 小姐",
      age: "28歲",
      concern: "敏感肌缺水 + 毛孔粗大",
      treatment: "DEP 無針水光 × 3 次",
    },
  ];

  const socialStats = [
    { value: "95%", label: "客人滿意度" },
    { value: "5,000+", label: "真實好評" },
    { value: "0/10", label: "痛感指數" },
    { value: "零", label: "恢復期" },
  ];

  return (
    <AnimatedSection id="results" className="py-14 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-black text-gray-900 text-center mb-2" style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}>
          真實客人效果見證
        </motion.h2>
        <motion.p variants={fadeUp} className="text-center text-gray-400 text-sm mb-10">
          以下均為 Peko Beauty 旺角朗豪坊真實客人，已獲授權展示
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {testimonials.map((t) => (
            <motion.div key={t.name} variants={scaleIn} className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-44 bg-gradient-to-br from-sky-50 to-cyan-50">
                <Image src="/images/peko-beauty-reception-desk-mong-kok.jpg" alt={`Peko Beauty DEP 無針水光效果 ${t.concern}`} fill className="object-cover opacity-80" sizes="(max-width: 768px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className="text-white text-xs px-2.5 py-1 rounded-full font-semibold" style={{ background: `${BRAND_RED}cc` }}>{t.treatment}</span>
                </div>
              </div>
              <div className="p-5">
                <p className="text-gray-500 text-sm italic leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
                <strong className="text-gray-900 text-sm">{t.name}</strong>
                <p className="text-xs text-gray-400 mt-0.5">{t.age}，主要困擾：{t.concern}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={scaleIn} className="bg-sky-50 rounded-2xl py-6 px-8 flex flex-wrap justify-center gap-8 text-center border border-sky-100">
          {socialStats.map((s) => (
            <div key={s.label}>
              <div className="text-3xl md:text-4xl font-black text-sky-700">{s.value}</div>
              <div className="text-xs text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 11: TRUST SIGNALS
// ─────────────────────────────────────────────────────────────
function TrustSection() {
  const pillars = [
    {
      Icon: Award,
      title: "成分信任",
      items: ["醫療級活性成分配方", "透明質酸、維他命C、胜肽等", "個人化成分定制方案", "VISIA 科學數據支持"],
    },
    {
      Icon: Users,
      title: "服務信任",
      items: ["全女班資深治療師", "零硬銷承諾", "明碼實價透明收費", "免費 VISIA 皮膚深層分析"],
    },
    {
      Icon: ThumbsUp,
      title: "結果信任",
      items: ["95% 客人滿意度", "5,000+ 真實好評", "療程前後 VISIA 水分對比", "售後1對1 WhatsApp 跟進"],
    },
  ];

  return (
    <AnimatedSection id="why-peko" className="py-10 md:py-14 px-4 bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <motion.h2 variants={fadeUp} className="text-center text-2xl md:text-3xl font-black text-white mb-2" style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}>
          點解旺角客人揀 Peko Beauty 做 DEP 無針水光？
        </motion.h2>
        <motion.p variants={fadeUp} className="text-center text-gray-400 mb-10">三個核心承諾，缺一不可</motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pillars.map(({ Icon, title, items }) => (
            <motion.div key={title} variants={scaleIn} className="bg-gray-800 rounded-2xl p-7 hover:bg-gray-700 transition-colors duration-200">
              <Icon size={36} className="text-[#C52B21] mb-4" />
              <h3 className="text-[#C52B21] font-bold text-lg mb-4">{title}</h3>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-gray-300 text-sm">
                    <CheckCircle size={14} className="text-green-400 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 12: PRICING
// ─────────────────────────────────────────────────────────────
function PricingSection() {
  return (
    <AnimatedSection id="pricing" className="py-14 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-black text-gray-900 text-center mb-2" style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}>
          DEP 無針水光導入 香港收費一覽
        </motion.h2>
        <motion.p variants={fadeUp} className="text-center text-gray-400 text-sm mb-10">
          Peko Beauty 承諾：明碼實價，絕無隱藏收費，絕不硬銷升級
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div variants={scaleIn} className="relative border-2 border-[#C52B21] rounded-2xl p-7 text-center bg-white shadow-md">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-white text-xs font-bold px-5 py-1 rounded-full whitespace-nowrap" style={{ background: BRAND_RED }}>
              💧 新客限定
            </div>
            <h3 className="text-lg font-bold text-gray-900 mt-3 mb-2">新客體驗方案</h3>
            <p className="text-gray-400 text-sm mb-5">
              DEP 無針水光導入全面單次療程
              <br />+ 免費 VISIA 皮膚深層分析 + 個人化成分配方
            </p>
            <div className="text-5xl font-black text-[#C52B21] leading-none mb-1">HK$980</div>
            <p className="text-gray-300 text-xs mb-6">市場參考價 HK$1,500+</p>
            <a href={WA_BOOKING} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center w-full text-white font-bold rounded-lg px-6 py-4 text-base transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
              style={{ background: BRAND_RED }}>
              💬 WhatsApp 立即預約
            </a>
          </motion.div>

          <motion.div variants={scaleIn} className="border-2 border-gray-200 rounded-2xl p-7 text-center bg-gray-50">
            <h3 className="text-lg font-bold text-gray-900 mb-2">療程套票方案</h3>
            <p className="text-gray-400 text-sm mb-5">
              根據 VISIA 分析個人化建議
              <br />（4 次 / 6 次 / 8 次套裝可選）
            </p>
            <div className="text-3xl font-black text-gray-600 leading-none mb-1">歡迎查詢</div>
            <p className="text-gray-300 text-xs mb-6">按個人膚質及需求次數報價</p>
            <a href="https://wa.me/85253353313?text=Hi%20Peko%2C%20我想查詢%20DEP%20無針水光套票價錢"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center w-full bg-gray-600 text-white font-bold rounded-lg px-6 py-4 text-base transition-all duration-200 hover:bg-gray-700 active:scale-[0.98]">
              📋 查詢套票詳情
            </a>
          </motion.div>
        </div>

        <motion.div variants={fadeUp} className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
          <p className="text-green-800 text-sm leading-relaxed">
            💯 <strong>Peko Beauty 透明承諾：</strong>到店後無需即場決定購買任何療程
          </p>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 13: SUITABILITY
// ─────────────────────────────────────────────────────────────
function SuitabilitySection() {
  const suitable = [
    "皮膚嚴重缺水、暗啞、乾紋明顯",
    "想打水光針但怕針、怕恢復期",
    "缺水性毛孔粗大",
    "膚色不均、暗沉、黃氣",
    "敏感肌、脆弱肌（適合低刺激深導入）",
    "任何需要深層補水及活性成分導入的人士",
  ];
  const unsuitable = [
    "懷孕或哺乳期",
    "治療部位有活躍性濕疹、皮膚炎或開放性傷口",
    "體內有心臟起搏器或其他電子植入物",
    "正在服用光敏感性藥物（視乎成分）",
    "面部有金屬植入物（如面部骨板）",
    "治療部位皮膚感染期間",
  ];

  return (
    <AnimatedSection id="suitability" className="py-14 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-black text-gray-900 mb-8" style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}>
          DEP 無針水光適合咩人做？（包含禁忌症）
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div variants={scaleIn} className="bg-green-50 rounded-2xl p-6 border border-green-200">
            <h3 className="text-green-800 font-bold text-base mb-5 flex items-center gap-2">
              <CheckCircle size={20} className="text-green-600" />
              適合做 DEP 無針水光
            </h3>
            <ul className="space-y-3">
              {suitable.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-gray-700 text-sm">
                  <CheckCircle size={15} className="text-green-500 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div variants={scaleIn} className="bg-red-50 rounded-2xl p-6 border border-red-200">
            <h3 className="text-red-700 font-bold text-base mb-5 flex items-center gap-2">
              <XCircle size={20} className="text-red-500" />
              不建議做 DEP 無針水光
            </h3>
            <ul className="space-y-3">
              {unsuitable.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-gray-700 text-sm">
                  <XCircle size={15} className="text-red-400 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
        <motion.p variants={fadeUp} className="text-gray-400 text-sm mt-5 leading-relaxed italic">
          如果不確定自己的體質是否適合，歡迎先透過{" "}
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="text-[#C52B21] font-semibold not-italic">WhatsApp 免費諮詢</a>{" "}
          我們的專業顧問，無任何消費壓力。
        </motion.p>
      </div>
    </AnimatedSection>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 14: FAQ
// ─────────────────────────────────────────────────────────────
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "DEP 無針水光係咩？同傳統水光針有咩分別？",
      a: "DEP（Dermal Electroporation，電穿孔）是一種利用微電脈衝技術，在皮膚細胞膜上暫時開啟奈米通道，讓透明質酸等活性成分直接進入真皮層的無針導入技術。最大分別是：傳統水光針需要以細針在全臉注射，有針刺痛感及 1–3 天恢復期（針孔、瘀腫）；DEP 則完全無針、無痛（0/10）、零恢復期，做完即刻化妝返工。效果方面，DEP 的補水深度可達真皮層，媲美水光針的深層導入，但屬漸進積累效果而非針劑的即時鼓起感。",
    },
    {
      q: "DEP 同離子導入（Iontophoresis）有咩分別？",
      a: "這是很多人混淆的問題。離子導入（Iontophoresis）利用電荷差異驅動帶電分子在皮膚表層移動，只能作用於表皮層，且只適用於帶電分子。DEP（電穿孔）則以物理方式在細胞膜上開啟實體奈米通道，不受分子電荷限制，滲透深度更深（可達真皮層），可導入成分種類也更廣。簡單說，離子導入是「表皮層的輕度導入」，DEP 是「真皮層的真正深導入」——兩者的效果深度和廣度差別明顯。",
    },
    {
      q: "DEP 無針水光效果可以維持多久？",
      a: "單次 DEP 療程的即時效果（皮膚水潤感提升）約持續 2–3 週；完整療程（4–8 次）後，皮膚底層的透明質酸含量及膠原蛋白狀態累積改善，效果更持久，通常可維持 1–3 個月以上。建議完成密集療程（每 2–3 週一次，共 4–8 次）後，以每月 1 次的頻率做維護，長期保持皮膚底層水分及活性成分供應。",
    },
    {
      q: "DEP 無針水光可以同日配合其他療程做嗎？",
      a: "DEP 通常可以配合多種療程同日進行，而且效果會更好。特別適合配合：BTL Exion 膠原槍（DEP 補充底層水分 + Exion 刺激膠原重建，雙效協同）、Hollywood Spectra 激光（激光後皮膚通道更易吸收，DEP 馬上補充修復成分效果加倍）、VISIA 分析（先分析再導入針對性更強）。通常 DEP 作為「最後步驟」進行，確保其他療程不影響導入效果。如果你有其他療程計劃，告訴治療師，她會為你規劃最佳先後順序。",
    },
    {
      q: "DEP 療程可以改善敏感肌嗎？",
      a: "DEP 非常適合敏感肌——事實上，敏感肌往往因為皮膚屏障脆弱而更容易缺水，而 DEP 不需要任何摩擦、磨砂或化學剝脫，是最低刺激性的深層補水方案之一。導入成分可以選擇對敏感肌最友好的純透明質酸或修護型胜肽，治療師會根據你的膚況調整電流強度，確保全程舒適。不過，如果你的敏感肌目前有活躍炎症或濕疹發作，建議先等肌膚穩定後再進行。",
    },
    {
      q: "DEP 可以改善暗沉和膚色不均嗎？",
      a: "可以，尤其是缺水型暗沉。當皮膚底層水分不足，細胞代謝變慢、廢物積聚，令膚色暗黃發灰。DEP 補充底層透明質酸後，細胞代謝加速，膚色自然提升。如果同時導入維他命 C 或穀胱甘肽（美白成分），亮膚效果更佳——這些成分透過 DEP 直接到達產黑色素的皮層，效果比外搽美白精華明顯得多。色素型暗沉（如曬班、荷爾蒙斑）則建議配合激光療程一起處理，效果更全面。",
    },
    {
      q: "DEP 無針水光療程多久做一次比較好？",
      a: "密集補水期：每 2–3 週一次，共 4–8 次（約 2–4 個月完成），這個階段最重要，讓皮膚底層透明質酸含量大幅提升到一個穩定水平。維護期：每月 1 次，長期維持皮膚底層水分及活性成分供應。如果你的皮膚問題較嚴重（長期嚴重缺水、老化乾燥），可以每 2 週一次加密進行；皮膚狀況改善後才轉為每月 1 次維護。",
    },
    {
      q: "DEP 無針水光香港收費大概幾多？",
      a: "香港市場 DEP 無針水光療程收費因中心、地段及是否包含諮詢評估而有差異，一般在 HK$800–2,000 不等。Peko Beauty 目前新客試做價為 HK$980（全面），包含免費 VISIA 皮膚深層分析及個人化成分配方；完整療程套票按 4 次、6 次或 8 次安排，按個人膚質作個人化建議。選擇時需注意：導入的活性成分品質（是否醫療級）及濃度差異很大，價錢低不一定代表成分品質差，但要了解清楚導入的是什麼成分及濃度。",
    },
    {
      q: "Peko Beauty 旺角朗豪坊點去？",
      a: "Peko Beauty 位於九龍旺角亞皆老街 8 號朗豪坊辦公室大樓 40 樓 02 室。港鐵旺角站 C 出口步行約 5 分鐘，或旺角東站步行約 8 分鐘。營業時間：週一至五 11:30–20:30，週六 10:00–19:00，公眾假期 11:00–18:00，週日休息。",
    },
    {
      q: "Peko Beauty 接受咩付款方式？",
      a: "Peko Beauty 接受現金（港幣）、Visa、MasterCard、American Express、銀聯卡、轉數快（FPS）、支付寶香港（AlipayHK）及微信支付香港（WeChat Pay HK）。",
    },
  ];

  return (
    <AnimatedSection id="faq" className="py-14 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-black text-gray-900 mb-10" style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}>
          DEP 無針水光導入 常見問題 FAQ
        </motion.h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div key={i} variants={fadeUp} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-5 text-left hover:bg-gray-50 transition-colors duration-150"
                aria-expanded={openIndex === i}
              >
                <span className="font-bold text-gray-900 text-sm md:text-base leading-snug">{faq.q}</span>
                <ChevronDown size={20} className={`flex-shrink-0 text-[#C52B21] transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`} />
              </button>
              {openIndex === i && (
                <div className="px-5 pb-5">
                  <p className="text-gray-600 text-sm leading-[1.85]">{faq.a}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 15: RELATED TREATMENTS
// ─────────────────────────────────────────────────────────────
function RelatedSection() {
  const related = [
    {
      href: "/treatments/btl-exion",
      emoji: "✨",
      gradient: "from-indigo-200 via-blue-100 to-sky-50",
      accentColor: "#3730a3",
      tag: "面部緊緻",
      title: "BTL Exion™ 膠原槍",
      desc: "AI RF + 超聲波激生膠原蛋白，與 DEP 補水組合使用，達到緊緻 + 水潤雙效",
      cta: "試做 HK$680",
      imgSrc: null as string | null,
    },
    {
      href: "/treatments/hollywood-spectra-laser",
      emoji: "⚡",
      gradient: "from-yellow-200 via-amber-100 to-orange-50",
      accentColor: "#d97706",
      tag: "激光美白",
      title: "Hollywood Spectra 膠原激光",
      desc: "激光改善色素及暗印，配合 DEP 導入美白成分，亮白效果倍增",
      cta: "試做 HK$880",
      imgSrc: null as string | null,
    },
    {
      href: "/treatments/venus-glow",
      emoji: "💎",
      gradient: "from-rose-200 via-pink-100 to-red-50",
      accentColor: "#C52B21",
      tag: "鑽石煥膚",
      title: "Venus Glow 鑽石微雕",
      desc: "微晶磨皮去除老化角質，後配合 DEP 導入，滲透效果更理想",
      cta: "了解詳情",
      imgSrc: null as string | null,
    },
  ];

  return (
    <AnimatedSection id="related" className="py-12 md:py-16 px-4 bg-[#FAFAFA]">
      <div className="max-w-4xl mx-auto">
        <motion.h3 variants={fadeUp} className="text-xl font-black text-gray-900 mb-2">相關療程推薦</motion.h3>
        <motion.p variants={fadeUp} className="text-gray-400 text-sm mb-8">配合使用，效果更全面</motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {related.map((item) => (
            <motion.div key={item.href} variants={scaleIn} whileHover={{ y: -6, transition: { duration: 0.22 } }} className="group">
              <Link href={item.href} className="block bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300">
                <div className="relative aspect-[4/3] overflow-hidden">
                  {item.imgSrc ? (
                    <Image src={item.imgSrc} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, 33vw" />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${item.gradient} flex flex-col items-center justify-center gap-2 transition-transform duration-500 group-hover:scale-105`}>
                      <span className="text-5xl drop-shadow-sm select-none">{item.emoji}</span>
                      <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full text-white" style={{ background: item.accentColor }}>{item.tag}</span>
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white/50 to-transparent pointer-events-none" />
                </div>
                <div className="px-4 pt-3.5 pb-4">
                  <div className="w-6 h-[2.5px] rounded-full mb-2.5 transition-all duration-300 group-hover:w-10" style={{ background: item.accentColor }} />
                  <strong className="block text-gray-900 text-[13px] font-bold mb-1 leading-snug group-hover:text-[#C52B21] transition-colors">{item.title}</strong>
                  <p className="text-gray-500 text-xs leading-relaxed mb-3">{item.desc}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold" style={{ color: item.accentColor }}>→ {item.cta}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 16: FINAL CTA
// ─────────────────────────────────────────────────────────────
function FinalCTASection() {
  return (
    <section id="final-cta" className="py-16 px-4 text-center" style={{ background: "linear-gradient(135deg, #e8f4fd 0%, #f0f8ff 100%)" }}>
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
        className="max-w-2xl mx-auto"
      >
        <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-3" style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}>
          準備好告別皮膚缺水暗啞了嗎？
        </h2>
        <p className="text-gray-500 text-base md:text-lg mb-8 leading-relaxed">
          免費 VISIA 皮膚深層分析 + 個人化成分配方 + 零壓力諮詢
          <br />
          新客試做價 <strong className="text-[#C52B21]">HK$980</strong>，明碼實價，絕無隱藏消費
        </p>
        <div className="flex justify-center mb-8">
          <WhatsAppButton href={WA_BOOKING} text="💬 WhatsApp 立即預約" large />
        </div>
        <div className="text-xs text-gray-400 space-y-2 leading-relaxed max-w-xs mx-auto text-left md:max-w-none md:text-center">
          <div className="flex items-start md:items-center justify-start md:justify-center gap-1.5">
            <MapPin size={13} className="flex-shrink-0 mt-0.5 md:mt-0" />
            <span>旺角朗豪坊辦公室大樓 40 樓 02 室（港鐵旺角站 C 出口，步行約 5 分鐘）</span>
          </div>
          <div className="flex items-start md:items-center justify-start md:justify-center gap-1.5">
            <Clock size={13} className="flex-shrink-0 mt-0.5 md:mt-0" />
            <span>週一至五 11:30–20:30 ｜ 週六 10:00–19:00 ｜ 公眾假期 11:00–18:00 ｜ 週日休息</span>
          </div>
          <div className="flex items-center justify-start md:justify-center gap-1.5">
            <MessageCircle size={13} className="flex-shrink-0" />
            <span>+852 5335 3313 ｜ info@peko.com.hk</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// DEFAULT EXPORT
// ─────────────────────────────────────────────────────────────
export default function DepMesotherapyClient() {
  return (
    <div className="bg-white">
      <StickyNav />
      <HeroSection />
      <PainPointsSection />
      <DirectAnswerSection />
      <KeyTakeawaysSection />
      <TreatmentStatsSection />
      <ScienceSection />
      <IngredientsSection />
      <ProcessSection />
      <ComparisonSection />
      <TestimonialsSection />
      <TrustSection />
      <PricingSection />
      <SuitabilitySection />
      <FAQSection />
      <RelatedSection />
      <FinalCTASection />
    </div>
  );
}