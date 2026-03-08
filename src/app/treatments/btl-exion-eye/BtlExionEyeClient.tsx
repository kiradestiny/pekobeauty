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
  "https://wa.me/85253353313?text=Hi%20Peko%2C%20我想查詢%20BTL%20Exion%20眼部試做優惠";
const WA_BOOKING =
  "https://wa.me/85253353313?text=Hi%20Peko%2C%20我想預約%20BTL%20Exion%20眼部試做，請問有咩時間？";

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
function AnimatedSection({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// ─────────────────────────────────────────────────────────────
// REUSABLE: WhatsApp CTA Button
// ─────────────────────────────────────────────────────────────
function WhatsAppButton({
  href = WA_LINK,
  text = "💬 WhatsApp 預約試做 — HK$380",
  className = "",
  large = true,
  fullWidth = false,
}: {
  href?: string;
  text?: string;
  className?: string;
  large?: boolean;
  fullWidth?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold rounded-lg transition-all duration-200 hover:bg-[#1ebe5d] hover:shadow-xl active:scale-[0.98] ${
        large ? "px-8 py-5 text-lg md:text-xl" : "px-6 py-4 text-base"
      } ${fullWidth ? "w-full" : ""} ${className}`}
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
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="hidden md:block sticky top-[64px] z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-center gap-6 py-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-xs font-semibold text-gray-500 hover:text-[#C52B21] transition-colors duration-150 pb-0.5 border-b-2 border-transparent hover:border-[#C52B21]"
            >
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
  const trustBadges = [
    "🏆 美國 FDA Class II 認證",
    "👁️ 眼袋槍專用手具",
    "👩‍⚕️ 全女班專業團隊",
    "🚫 絕無硬銷",
    "⭐ 5,000+ 真實好評",
  ];
  const stats = [
    { val: "+224%", label: "透明質酸激生" },
    { val: "1/10", label: "痛感極低" },
    { val: "零", label: "恢復期" },
  ];

  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-[#f5f0ff] to-white pt-20">
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: EASE_OUT }}
        className="relative w-full aspect-[16/9] md:aspect-[16/7] overflow-hidden"
      >
        <Image
          src="/images/peko-beauty-reception-desk-mong-kok.jpg"
          alt="Peko Beauty BTL Exion 眼部療程 魚尾紋 淚溝 眼袋改善 旺角朗豪坊醫美中心"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: EASE_OUT }}
          className="absolute top-4 right-4"
        >
          <span className="text-white text-xs md:text-sm font-black px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5" style={{ background: BRAND_RED }}>
            👁️ 新客試做 HK$380
          </span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: EASE_OUT }}
          className="absolute bottom-4 left-0 right-0 px-4"
        >
          <div className="flex flex-wrap gap-1.5 md:gap-2 justify-center">
            {trustBadges.map((badge) => (
              <span key={badge} className="bg-white/10 backdrop-blur-md text-white text-[10px] md:text-xs px-2.5 md:px-3 py-1 md:py-1.5 rounded-full font-semibold border border-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]">
                {badge}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <div className="max-w-4xl mx-auto px-4 pt-8 pb-14 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.15, ease: EASE_OUT }}
          className="text-[clamp(20px,4vw,40px)] font-black leading-[1.3] text-gray-900 mb-5 max-w-3xl mx-auto"
          style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}
        >
          BTL Exion 眼袋槍 香港｜無針眼周水潤緊緻
          <br />
          <span className="text-[clamp(16px,3vw,28px)] font-bold text-gray-600">
            +224% 透明質酸 · 魚尾紋 · 淚溝 · 眼袋
            <span className="hidden sm:inline"> — </span>
            <br className="sm:hidden" />
            效果 / 次數 / 技術原理完整解析
          </span>
          <br />
          <span className="text-[clamp(14px,2.5vw,22px)] font-black" style={{ color: BRAND_RED }}>
            試做 HK$380｜旺角朗豪坊 · FDA Class II 認證
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25, ease: EASE_OUT }}
          className="flex justify-center gap-2 md:gap-4 mb-6 w-full max-w-sm mx-auto"
        >
          {stats.map((s) => (
            <div key={s.label} className="bg-purple-50 border border-purple-100 rounded-xl px-2 md:px-5 py-2.5 text-center flex-1">
              <div className="text-sm md:text-xl font-black text-purple-700 leading-tight whitespace-nowrap">{s.val}</div>
              <div className="text-[9px] md:text-xs text-gray-500 mt-0.5 leading-tight">{s.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.32, ease: EASE_OUT }}
          className="text-gray-500 text-sm md:text-base max-w-lg mx-auto mb-7 leading-relaxed"
        >
          BTL Exion 眼袋槍 — 眼周專用 AI RF + 標靶超聲波，自然激生透明質酸 <strong>+224%</strong>，FDA Class II 認證。
          <span className="hidden md:inline">無需注射填充，從皮底自然補回透明質酸，改善魚尾紋、眼下細紋、淚溝凹陷及眼袋鬆弛感，痛感僅 1/10，零恢復期，適合敏感眼周。</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.42, ease: EASE_OUT }}
          className="flex flex-col items-center gap-3"
        >
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
      emoji: "😟",
      tag: "魚尾紋困擾",
      title: "笑一笑就出現魚尾紋，靜止時也不消失",
      desc: "眼角魚尾紋由眼周肌肉重複收縮加上膠原流失所形成。初期只有動態紋（笑才出現），隨後演變為靜止時也清晰可見的靜態紋。眼周皮膚比臉頰薄 4 倍，老化速度更快，外搽眼霜只能補水，無法逆轉已形成的紋路。",
      imgSrc: null as string | null,
      gradient: "from-violet-200 via-purple-100 to-indigo-50",
      accentColor: "#7c3aed",
    },
    {
      emoji: "😔",
      tag: "淚溝凹陷",
      title: "眼下出現凹陷，有「熊貓眼」陰影",
      desc: "淚溝是眼眶骨和臉頰之間的凹陷，由眼周支撐組織（脂肪墊、韌帶）下垂及透明質酸流失所致。光線在凹陷處產生陰影，視覺上形成「黑眼圈」感。即使睡眠充足，淚溝型黑眼圈也不會消失，因為根本原因在皮下組織，而非色素。",
      imgSrc: null as string | null,
      gradient: "from-sky-200 via-blue-100 to-cyan-50",
      accentColor: "#0284c7",
    },
    {
      emoji: "😩",
      tag: "眼袋鬆弛",
      title: "眼下皮膚開始下垂，整個人看起來很疲倦",
      desc: "眼袋分兩種：脂肪突出型（脂肪疝出）和皮膚鬆弛型（真皮層支撐不足）。後者可透過 RF 緊緻療程改善——當眼周皮膚失去彈性，輕微鬆弛下垂讓人看起來永遠很睏倦，用再貴的眼霜也無法從根源重建皮膚支撐層。",
      imgSrc: null as string | null,
      gradient: "from-rose-200 via-pink-100 to-red-50",
      accentColor: "#C52B21",
    },
    {
      emoji: "😤",
      tag: "上眼皮鬆弛",
      title: "上眼皮越來越厚重，眼神不再有神",
      desc: "上眼皮皮膚鬆弛令眼形顯小、眼裂收窄，整個人顯得疲態。這是眼周真皮層彈力蛋白流失的直接表現——眼皮支撐結構減弱，皮膚開始往下垮。在不動刀的前提下，RF 能量刺激膠原再生是改善輕至中度上眼皮鬆弛最有效的非侵入性方法。",
      imgSrc: null as string | null,
      gradient: "from-amber-200 via-orange-100 to-yellow-50",
      accentColor: "#d97706",
    },
  ];

  return (
    <AnimatedSection id="pain-points" className="py-12 md:py-16 px-4 bg-[#FAFAFA]">
      <div className="max-w-5xl mx-auto">
        <motion.div variants={fadeUp} className="text-center mb-10 md:mb-14">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-[#C52B21] mb-3 px-4 py-1.5 bg-red-50 rounded-full border border-red-100">
            你的困擾
          </span>
          <h2
            className="text-2xl md:text-[2rem] font-black text-gray-900 mb-3 leading-tight"
            style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}
          >
            你係咪試過呢啲情況？
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-md mx-auto leading-relaxed">
            眼周皮膚比臉頰薄 4 倍，老化速度最快，護膚品永遠無法到達真皮層底部
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
          {points.map((p) => (
            <motion.div
              key={p.title}
              variants={scaleIn}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
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

        <motion.div variants={fadeUp} className="text-center mt-10 md:mt-12 px-4 py-7 rounded-2xl bg-white border border-purple-100 shadow-sm">
          <p className="text-lg md:text-xl font-black text-[#C52B21] leading-relaxed mb-1">
            試過各種眼霜、導入都改善有限？
            <br />
            因為眼周問題的根源在真皮層，任何外搽產品根本到達不了。
          </p>
          <p className="text-sm text-gray-400 mt-2">
            BTL Exion™ 眼周專用手具以精準低能量 RF + 超聲波直接刺激眼周真皮層，激生膠原蛋白與透明質酸——這才是從根源改善的方法。
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
      <p>💡 BTL Exion™ 眼部療程最直接答案：</p>
      <p>
        BTL Exion™ 眼部療程改善魚尾紋、淚溝凹陷及眼袋鬆弛通常需要 3–6 次療程，每次間隔 4 週，
        約 80% 客人在第 1–2 次後已見到眼周皮膚緊緻改善。
        BTL Exion™ 眼周專用手具以極低能量 AI RF + 超聲波精準作用於眼周超薄皮膚，痛感 1/10，
        幾乎零恢復期，適合魚尾紋、眼下細紋、淚溝、眼袋鬆弛及上眼皮鬆弛問題人士。
        Peko Beauty 旺角朗豪坊新客試做價 HK$380，含免費 VISIA 分析。
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 5: KEY TAKEAWAYS (GEO)
// ─────────────────────────────────────────────────────────────
function KeyTakeawaysSection() {
  const items = [
    { label: "核心問題", text: "魚尾紋、淚溝、眼袋鬆弛及眼周細紋根源在眼周真皮層膠原蛋白與透明質酸流失，眼周皮膚比臉頰薄 4 倍，老化最快，護膚品無法到達" },
    { label: "技術解碼", text: "BTL Exion™ 眼周專用手具以 AI 精準調控極低能量 RF + 超聲波作用於眼周超薄皮膚，激生膠原蛋白、彈力蛋白及透明質酸，改善魚尾紋、淚溝及鬆弛" },
    { label: "Peko 優勢", text: "原廠正貨 BTL Exion 眼周手具，全女班資深治療師主理，免費 VISIA 分析先行，精準評估後才進行" },
    { label: "適合對象", text: "魚尾紋、眼下細紋、淚溝凹陷、眼袋鬆弛感、上眼皮輕微鬆弛、希望無創改善眼周的人士" },
    { label: "療程次數", text: "建議 3–6 次，每 4 週一次，完整療程後效果持續至少 6–12 個月" },
    { label: "試做價", text: "HK$380（新客限定）", isLink: true },
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
            ) : (item.text)}
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
    { icon: "⏱", label: "療程時間", value: "約 30–45 分鐘（眼周全區，無需額外敷膏）" },
    { icon: "😌", label: "痛感指數", value: "1/10 — 眼周專用手具能量極低，全程幾乎無感，大部分客人反映如「微溫輕觸」" },
    { icon: "🔴", label: "恢復期", value: "幾乎零恢復期，療程後眼周可能有輕微暖感，通常 30 分鐘至 1 小時內完全消退，可即時化妝" },
    { icon: "📅", label: "建議次數", value: "3–6 次，每 4 週一次（按個人眼周狀況及目標調整）" },
    { icon: "✅", label: "見效時間", value: "第 1–2 次後已見眼周皮膚緊緻感，魚尾紋及眼下細紋改善於第 3–4 次後最明顯" },
    { icon: "📆", label: "效果維持", value: "視乎個人膚質及完整療程次數，建議完成 3–6 次後效果更穩定，配合防曬及眼周護理可延長" },
    { icon: "🎯", label: "可改善問題", value: "魚尾紋 · 眼下細紋 · 淚溝凹陷感 · 眼袋鬆弛型 · 上眼皮輕微鬆弛 · 眼周皮膚暗啞" },
    { icon: "🛡️", label: "認證", value: "美國 FDA 認證 · 歐盟 CE · 原廠 BTL 正貨儀器" },
  ];

  return (
    <AnimatedSection id="treatment-stats" className="py-10 md:py-14 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <motion.h2 variants={fadeUp} className="text-center text-2xl md:text-3xl font-black text-gray-900 mb-2" style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}>
          BTL Exion™ 眼部療程 數據一覽
        </motion.h2>
        <motion.p variants={fadeUp} className="text-center text-gray-400 text-sm mb-8">
          所有數字來自 Peko Beauty 朗豪坊真實臨床記錄及 BTL 原廠臨床研究數據
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
                <td className="px-5 py-5 font-black text-[#C52B21] text-2xl">HK$380（眼周全區）</td>
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
          &ldquo;眼周療程係我最喜歡做的部位之一，因為客人的反應通常很驚喜——佢地以為眼周太敏感、太薄，一定很痛。但 Exion 眼周手具的能量非常精細，整個治療過程幾乎就是微溫感，完全不像傳統 RF。
          最令我印象深刻係一位 36 歲客人，連眼霜都沒有習慣用，做完 3 次後朋友話佢眼睛好像放大咗——其實係因為眼周皮膚緊了、魚尾紋減淡，整個眼神看起來更精神。
          淚溝型的客人通常需要多幾次，但改善方向係真實的：不是填充的那種「一次鼓起來」，而是皮膚底層慢慢飽滿。&rdquo;
        </p>
        <p className="text-xs text-gray-400 mt-3">— Peko Beauty 資深治療師，旺角朗豪坊診所</p>
      </div>
      {!open && (
        <p className="md:hidden text-gray-500 italic text-xs line-clamp-2">
          &ldquo;眼周療程係我最喜歡做的部位之一，因為客人的反應通常很驚喜——佢地以為眼周太敏感……&rdquo;
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
    { value: "+224%", label: "透明質酸激生" },
    { value: "4倍", label: "眼周皮膚較薄" },
    { value: "1/10", label: "痛感指數" },
    { value: "幾乎零", label: "恢復期" },
  ];

  return (
    <AnimatedSection id="science" className="py-10 md:py-14 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-black text-gray-900 mb-8" style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}>
          BTL Exion™ 眼周手具點樣改善眼部老化？
          <br className="hidden sm:block" />
          眼周專用版本 RF + 超聲波技術原理拆解
        </motion.h2>

        <motion.h3 variants={fadeUp} className="text-lg font-bold text-[#C52B21] mb-3">
          ❶ 問題根源：點解眼周最難改善？
        </motion.h3>
        <motion.div variants={fadeUp}>
          <ReadMoreText lines={3} className="text-gray-600 leading-[1.9] mb-5 text-[15px]">
            眼周皮膚是全臉最薄的部位，厚度約 0.5mm（相比臉頰 2mm）——這意味著眼周的膠原蛋白、
            彈力蛋白及透明質酸儲量最少，消耗最快，恢復能力也最有限。
            25 歲後眼周開始出現細紋，30 歲後魚尾紋及淚溝逐漸形成，40 歲後眼袋及上眼皮鬆弛顯現。
            任何眼霜，無論有效成分多豐富，分子體積只能停留在角質層，根本無法到達真皮層底部。
          </ReadMoreText>
        </motion.div>
        <motion.div variants={fadeUp}>
          <ReadMoreText lines={3} className="text-gray-600 leading-[1.9] mb-8 text-[15px]">
            淚溝的形成更是複雜——不只是膠原蛋白問題，還涉及眼眶隔（Orbital Septum）鬆弛、
            眼眶脂肪墊（Orbital fat pads）移位及皮下透明質酸流失。
            BTL Exion™ 眼周手具的設計，正是針對眼周超薄皮膚的特殊性：以極低能量精準作用，
            在不損傷表皮的前提下，直接刺激眼周真皮層的膠原蛋白與透明質酸再生。
          </ReadMoreText>
        </motion.div>

        <motion.h3 variants={fadeUp} className="text-lg font-bold text-[#C52B21] mb-3">
          ❷ 技術解法：眼周專用手具的三大設計差異
        </motion.h3>

        <div className="hidden md:grid grid-cols-3 gap-4 mb-7">
          <motion.div variants={scaleIn} className="bg-purple-50 rounded-xl p-5 border border-purple-100">
            <div className="font-black text-purple-700 text-base mb-2">① 極低能量精準輸出</div>
            <p className="text-gray-600 text-sm leading-relaxed">
              眼周版本的 RF 能量輸出比面部版低 40–60%，專門針對 0.5mm 的眼周超薄皮膚，
              確保治療效果達到真皮層的同時，表皮完全無任何損傷或不適。
            </p>
          </motion.div>
          <motion.div variants={scaleIn} className="bg-sky-50 rounded-xl p-5 border border-sky-100">
            <div className="font-black text-sky-700 text-base mb-2">② 小型眼部專用手具</div>
            <p className="text-gray-600 text-sm leading-relaxed">
              治療頭面積更細，可精準覆蓋上下眼皮、眼尾（魚尾紋區）及眼下淚溝區，
              避開眼球，安全性極高，全程治療師操控，精細處理每個眼周角落。
            </p>
          </motion.div>
          <motion.div variants={scaleIn} className="bg-emerald-50 rounded-xl p-5 border border-emerald-100">
            <div className="font-black text-emerald-700 text-base mb-2">③ AI 眼周溫控保護</div>
            <p className="text-gray-600 text-sm leading-relaxed">
              AI 實時偵測眼周皮膚溫度，自動限制最高溫度上限，
              確保眼周組織溫度維持在膠原激生範圍（38–40°C），絕不過熱，
              從根本消除眼周 RF 療程的灼傷風險。
            </p>
          </motion.div>
        </div>

        <div className="md:hidden grid grid-cols-1 gap-3 mb-6">
          {[
            { color: "purple", title: "極低能量精準輸出", desc: "比面部版低 40–60%，適合眼周超薄皮膚" },
            { color: "sky", title: "眼部專用小型手具", desc: "精準覆蓋魚尾紋、淚溝、眼皮每個角落" },
            { color: "emerald", title: "AI 眼周溫控保護", desc: "自動限溫，絕不過熱，安全保障最高" },
          ].map((t) => (
            <div key={t.title} className={`bg-${t.color}-50 rounded-xl p-4 border border-${t.color}-100`}>
              <div className={`font-black text-${t.color}-700 text-sm mb-1`}>{t.title}</div>
              <p className="text-gray-500 text-xs">{t.desc}</p>
            </div>
          ))}
        </div>

        <motion.h3 variants={fadeUp} className="text-lg font-bold text-[#C52B21] mb-5">
          ❸ 臨床數據：效果有幾好？
        </motion.h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {stats.map((s) => (
            <motion.div key={s.value} variants={scaleIn} className="bg-purple-50 rounded-xl p-5 text-center border border-purple-100">
              <div className="text-3xl md:text-4xl font-black text-purple-700 leading-tight">{s.value}</div>
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
// SECTION 8: PROCESS
// ─────────────────────────────────────────────────────────────
function ProcessSection() {
  const steps = [
    {
      num: 1,
      title: "WhatsApp 預約",
      desc: "透過 WhatsApp +852 5335 3313 預約，客服在 24 小時內確認時間。BTL Exion 眼周療程約 30–45 分鐘，建議提前最少 2 天預約。",
    },
    {
      num: 2,
      title: "到店 + 免費 VISIA 眼周皮膚分析",
      desc: "治療師以 VISIA 儀器分析眼周老化程度、淚溝深度、魚尾紋嚴重程度及皮膚底層水分含量，制定最適合的能量設定方案。",
    },
    {
      num: 3,
      title: "個人化方案制定（零硬銷）",
      desc: "根據 VISIA 數據及你的眼周困擾，治療師說明最適合的治療重點、能量參數及建議次數，如療程唔適合會如實告知。",
    },
    {
      num: 4,
      title: "BTL Exion™ 眼周療程進行",
      desc: "清潔眼周後，治療師以眼部專用小型手具系統化覆蓋上下眼皮、眼尾及淚溝區。全程極低能量，幾乎無感，約 25–35 分鐘完成。",
    },
    {
      num: 5,
      title: "療程後即可化妝 + WhatsApp 跟進",
      desc: "眼周療程完成後可即時正常化妝、返工。治療師提供眼周護理指引，並在 48 小時內透過 WhatsApp 主動跟進反應。",
    },
  ];

  return (
    <AnimatedSection id="process" className="py-14 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-black text-gray-900 text-center mb-12" style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}>
          在 Peko Beauty 做 BTL Exion™ 眼部療程係咩流程？
        </motion.h2>
        <div className="space-y-4 md:space-y-5">
          {steps.map((step) => (
            <motion.div key={step.num} variants={fadeUp} className="flex gap-4 md:gap-6 items-start">
              <div className="flex-shrink-0 w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center text-white font-black text-base md:text-lg shadow-md" style={{ background: BRAND_RED }}>
                {step.num}
              </div>
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
    { feature: "核心技術", exion: "AI 單極 RF + 超聲波（眼周專用）", filler: "玻尿酸注射填充", laser: "激光 / 熱瑪吉眼周" },
    { feature: "痛感", exion: "1/10（幾乎無感）", filler: "3–4/10（針刺感）", laser: "3–5/10" },
    { feature: "恢復期", exion: "幾乎零恢復期", filler: "1–3 天（瘀腫）", laser: "3–7 天（泛紅）" },
    { feature: "淚溝改善", exion: "✅ 有效（膠原填補）", filler: "✅ 即時（填充）", laser: "⚠️ 有限", highlight: true },
    { feature: "魚尾紋改善", exion: "✅ 有效（膠原重建）", filler: "⚠️ 需配合肉毒", laser: "✅ 有效", highlight: true },
    { feature: "效果自然度", exion: "✅ 最自然（自體生成）", filler: "⚠️ 視乎注射量", laser: "✅ 自然", highlight: true },
    { feature: "眼周皮膚緊緻", exion: "✅ 顯著", filler: "⚠️ 有限", laser: "✅ 有效", highlight: true },
    { feature: "眼球安全性", exion: "✅ 極高（AI 限溫）", filler: "⚠️ 技術要求高", laser: "⚠️ 需要護目鏡" },
    { feature: "試做價", exion: "HK$380", filler: "HK$2,000+", laser: "HK$1,500+", isPrice: true },
  ];

  return (
    <AnimatedSection id="comparison" className="hidden md:block py-14 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-black text-gray-900 mb-2" style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}>
          BTL Exion™ 眼部 vs 玻尿酸填充 vs 眼周激光
        </motion.h2>
        <motion.p variants={fadeUp} className="text-gray-400 text-sm mb-8">
          以下比較基於 Peko Beauty 真實臨床數據，幫助你做出最適合自己情況的選擇。
        </motion.p>

        <motion.div variants={scaleIn} className="overflow-x-auto rounded-2xl shadow-lg">
          <table className="w-full border-collapse min-w-[560px]">
            <thead>
              <tr className="bg-gray-900 text-white">
                <th className="py-4 px-4 text-left text-xs font-bold w-[22%]">比較項目</th>
                <th className="py-4 px-4 text-center text-xs font-bold w-[26%]" style={{ background: BRAND_RED }}>
                  ⭐ BTL Exion™ 眼部
                  <br /><span className="font-normal opacity-80 text-[10px]">(Peko Beauty)</span>
                </th>
                <th className="py-4 px-4 text-center text-xs font-bold w-[26%]">玻尿酸眼周填充</th>
                <th className="py-4 px-4 text-center text-xs font-bold w-[26%]">眼周激光 / 熱瑪吉</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.feature} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-4 py-3.5 font-semibold text-gray-800 text-xs border-b border-gray-100">{row.feature}</td>
                  <td className={`px-4 py-3.5 text-center text-xs border-b border-gray-100 font-semibold bg-red-50/60 ${row.isPrice ? "text-xl font-black text-[#C52B21]" : row.highlight ? "text-green-700" : "text-[#C52B21]"}`}>
                    {row.exion}
                  </td>
                  <td className="px-4 py-3.5 text-center text-xs text-gray-500 border-b border-gray-100">{row.filler}</td>
                  <td className="px-4 py-3.5 text-center text-xs text-gray-500 border-b border-gray-100">{row.laser}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-6 bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-5">
          <p className="text-sm md:text-[15px] text-gray-700 leading-relaxed">
            <strong className="text-gray-900">🎯 Peko 建議：</strong>
            如果你<strong>希望無創、無針、幾乎零恢復期</strong>，又想改善魚尾紋、淚溝及眼周鬆弛，
            BTL Exion™ 眼周療程是目前香港最安全舒適的無創眼周方案。
            唔確定是否適合？先透過{" "}
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="text-[#C52B21] font-bold underline underline-offset-2">
              WhatsApp 免費諮詢
            </a>
            ，零壓力。
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="text-center mt-10">
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 text-white font-bold rounded-lg px-6 py-4 text-base transition-all duration-200 hover:opacity-90 hover:shadow-lg active:scale-[0.98]"
            style={{ background: BRAND_RED }}
          >
            👉 查看 BTL Exion™ 眼部試做優惠 HK$380
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
      quote: "我一直以為眼周RF會很痛，因為皮膚很薄。但整個過程真的只有微微暖感，完全不像我想像中可怕。做完3次之後，同事問我係咪換了眼霜，話我眼睛看起來比之前精神——其實係魚尾紋淡了，眼神感覺更清亮。恢復期真的幾乎沒有，做完即刻補妝返工。",
      name: "A 小姐",
      age: "35歲",
      concern: "魚尾紋 + 眼下細紋",
      treatment: "BTL Exion™ 眼部 × 4 次",
    },
    {
      quote: "淚溝問題困擾咗我好多年，試過好多眼霜都改善有限。做完 Exion 眼周 4 次後，淚溝沒有完全消失，但明顯飽滿了，陰影感減淡了。最重要是自然，唔像打填充那種硬硬的感覺。治療師很耐心跟我解釋淚溝的成因，完全沒有hard sell。",
      name: "S 小姐",
      age: "38歲",
      concern: "淚溝凹陷 + 眼周鬆弛",
      treatment: "BTL Exion™ 眼部 × 5 次",
    },
  ];

  const socialStats = [
    { value: "95%", label: "客人滿意度" },
    { value: "5,000+", label: "真實好評" },
    { value: "1/10", label: "痛感指數" },
    { value: "100%", label: "原廠正貨儀器" },
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
              <div className="relative h-44 bg-gradient-to-br from-purple-50 to-indigo-50">
                <Image src="/images/peko-beauty-reception-desk-mong-kok.jpg" alt={`Peko Beauty BTL Exion 眼部效果 ${t.concern}`} fill className="object-cover opacity-80" sizes="(max-width: 768px) 100vw, 50vw" />
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

        <motion.div variants={scaleIn} className="bg-purple-50 rounded-2xl py-6 px-8 flex flex-wrap justify-center gap-8 text-center border border-purple-100">
          {socialStats.map((s) => (
            <div key={s.label}>
              <div className="text-3xl md:text-4xl font-black text-purple-700">{s.value}</div>
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
      title: "儀器信任",
      items: ["100% 原廠正貨 BTL Exion™ 眼周手具", "美國 FDA 認證", "歐盟 CE 認可", "AI 眼周溫控安全保護"],
    },
    {
      Icon: Users,
      title: "服務信任",
      items: ["全女班資深治療師", "零硬銷承諾", "明碼實價透明收費", "免費 VISIA 眼周皮膚分析"],
    },
    {
      Icon: ThumbsUp,
      title: "結果信任",
      items: ["95% 客人滿意度", "5,000+ 真實好評", "療程前後 VISIA 對比追蹤", "售後1對1 WhatsApp 跟進"],
    },
  ];

  return (
    <AnimatedSection id="why-peko" className="py-10 md:py-14 px-4 bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <motion.h2 variants={fadeUp} className="text-center text-2xl md:text-3xl font-black text-white mb-2" style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}>
          點解旺角客人揀 Peko Beauty 做 BTL Exion™ 眼部療程？
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
          BTL Exion™ 眼部療程 香港收費一覽
        </motion.h2>
        <motion.p variants={fadeUp} className="text-center text-gray-400 text-sm mb-10">
          Peko Beauty 承諾：明碼實價，絕無隱藏收費，絕不硬銷升級
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div variants={scaleIn} className="relative border-2 border-[#C52B21] rounded-2xl p-7 text-center bg-white shadow-md">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-white text-xs font-bold px-5 py-1 rounded-full whitespace-nowrap" style={{ background: BRAND_RED }}>
              👁️ 新客限定
            </div>
            <h3 className="text-lg font-bold text-gray-900 mt-3 mb-2">新客體驗方案</h3>
            <p className="text-gray-400 text-sm mb-5">
              BTL Exion™ 眼周全區單次療程
              <br />+ 免費 VISIA 皮膚深層分析
            </p>
            <div className="text-5xl font-black text-[#C52B21] leading-none mb-1">HK$380</div>
            <p className="text-gray-300 text-xs mb-6">市場參考價 HK$1,500+</p>
            <a href={WA_BOOKING} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center w-full text-white font-bold rounded-lg px-6 py-4 text-base transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
              style={{ background: BRAND_RED }}
            >
              💬 WhatsApp 立即預約
            </a>
          </motion.div>

          <motion.div variants={scaleIn} className="border-2 border-gray-200 rounded-2xl p-7 text-center bg-gray-50">
            <h3 className="text-lg font-bold text-gray-900 mb-2">療程套票方案</h3>
            <p className="text-gray-400 text-sm mb-5">
              根據 VISIA 分析個人化建議
              <br />（3 次 / 5 次 / 6 次套裝可選）
            </p>
            <div className="text-3xl font-black text-gray-600 leading-none mb-1">歡迎查詢</div>
            <p className="text-gray-300 text-xs mb-6">按個人眼周狀況及需求次數報價</p>
            <a href="https://wa.me/85253353313?text=Hi%20Peko%2C%20我想查詢%20BTL%20Exion%20眼部療程套票價錢"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center w-full bg-gray-600 text-white font-bold rounded-lg px-6 py-4 text-base transition-all duration-200 hover:bg-gray-700 active:scale-[0.98]"
            >
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
    "魚尾紋、眼角細紋、眼下乾紋",
    "淚溝凹陷感、眼下陰影（非色素型黑眼圈）",
    "眼袋（皮膚鬆弛型，非脂肪突出型）",
    "上眼皮輕至中度鬆弛",
    "眼周皮膚暗啞、缺水乾燥感",
    "希望無創無針改善眼周老化問題",
  ];
  const unsuitable = [
    "懷孕或哺乳期",
    "治療部位有活躍性感染或開放性傷口",
    "體內有心臟起搏器或其他電子植入物",
    "嚴重脂肪突出型眼袋（需評估是否需手術）",
    "近期眼周注射填充或肉毒（建議間隔 2–4 週）",
    "眼部手術後尚未完全癒合",
    "眼部活躍感染（如結膜炎、瞼腺炎）",
  ];

  return (
    <AnimatedSection id="suitability" className="py-14 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-black text-gray-900 mb-8" style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}>
          BTL Exion™ 眼部療程適合咩人做？（包含禁忌症）
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div variants={scaleIn} className="bg-green-50 rounded-2xl p-6 border border-green-200">
            <h3 className="text-green-800 font-bold text-base mb-5 flex items-center gap-2">
              <CheckCircle size={20} className="text-green-600" />
              適合做 BTL Exion™ 眼部療程
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
              不建議做 BTL Exion™ 眼部療程
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
          如果不確定自己的眼周狀況是否適合，歡迎先透過{" "}
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="text-[#C52B21] font-semibold not-italic">
            WhatsApp 免費諮詢
          </a>{" "}
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
      q: "BTL Exion™ 眼部療程係咩？同面部膠原槍療程有咩分別？",
      a: "BTL Exion™ 眼部療程使用 BTL Exion 平台的眼周專用小型手具，核心 AI RF + 超聲波技術與面部版相同，但能量輸出專門針對眼周超薄皮膚（約 0.5mm）設定，比面部版低 40–60%。面部膠原槍療程覆蓋全臉，手具較大；眼部療程則精準作用於上下眼皮、眼尾及淚溝等眼周精細範圍，是更針對性的眼周老化改善方案。兩者可以獨立進行，也可以同日先做面部再做眼部。",
    },
    {
      q: "眼周咁薄，RF 安全嗎？會唔會傷到眼睛？",
      a: "BTL Exion™ 眼周手具的設計本身已針對眼周超薄皮膚的安全性進行優化：AI 系統實時監測眼周皮膚溫度，自動限制最高溫度上限，絕不超過眼周安全範圍；治療頭形狀設計令能量方向遠離眼球；全程由資深治療師操控，不會直接接觸眼球。目前美國 FDA 認證 BTL Exion 眼周應用的安全紀錄良好，是目前市場上眼周 RF 療程中安全性最高的方案之一。",
    },
    {
      q: "BTL Exion 眼部療程可以改善淚溝嗎？",
      a: "可以，但需要理性預期。BTL Exion 眼周療程對淚溝的改善機制是：透過 RF + 超聲波激生眼周真皮層膠原蛋白及透明質酸，令眼下皮膚底層逐步飽滿，從而減淡淚溝的陰影感和凹陷視覺。這是一個自然漸進的改善，不像注射玻尿酸那樣即時鼓起來。淚溝較深或骨性淚溝的客人，改善幅度會比輕度淚溝相對有限，有時需要配合其他療程達到更完整效果。",
    },
    {
      q: "Exion 眼部療程可以改善眼袋嗎？",
      a: "BTL Exion 對眼袋的改善效果取決於眼袋類型。鬆弛型眼袋（眼周皮膚下垂、支撐不足）：最適合，RF 緊緻膠原重建後眼袋下垂感可明顯改善。脂肪突出型眼袋（脂肪疝出，按壓後回彈）：RF 療程改善有限，嚴重者可能需要手術評估。多數客人的眼袋同時有兩種成分，到店後治療師會評估你的主要眼袋類型，給出最誠實的效果預期。",
    },
    {
      q: "BTL Exion 眼部療程痛嗎？需要敷麻醉膏嗎？",
      a: "BTL Exion 眼周療程幾乎不需要舒緩膏。眼周版本的能量極低，痛感指數約 1/10，大部分客人描述為「微溫輕觸感」，完全不像傳統眼周激光那種刺熱感。全程舒適，即使是敏感型眼周皮膚的客人也通常反映沒有任何不適。不需要提前敷麻醉膏，因此整個治療時間也較短（30–45 分鐘）。",
    },
    {
      q: "BTL Exion 眼部療程做完有咩恢復要注意？",
      a: "眼周療程後護理非常簡單。即時：可以正常化妝及日常活動。24 小時內：避免高溫環境（蒸面、桑拿），使用溫和眼霜保濕。1 週內：做好眼周防曬（配合物理防曬如太陽眼鏡），避免使用含強刺激成分的眼周產品（如高濃度維他命 A 酸）。療程後眼周無明顯泛紅或腫脹，幾乎不影響任何日常活動。",
    },
    {
      q: "BTL Exion 眼部可以同日做面部膠原槍嗎？",
      a: "可以，而且是很常見的搭配。面部膠原槍（全面緊緻提升）+ 眼部療程（眼周精細改善）同日進行，治療師先做面部，再換眼周手具做眼部，整體時間約 75–90 分鐘。這個組合的好處是面部整體緊緻與眼周精細改善同步進行，效果更全面。費用方面，Peko Beauty 會提供同日組合優惠，歡迎查詢。",
    },
    {
      q: "BTL Exion 眼部療程需要做幾多次？",
      a: "建議 3–6 次，每 4 週一次。魚尾紋及眼下細紋：通常 3–4 次後已有明顯改善。淚溝及眼周飽滿度：建議 4–6 次，因為透明質酸及膠原再生需要更長時間積累。上眼皮鬆弛：建議 5–6 次，效果最佳在完整療程後 2–3 個月最為明顯。見效速度因個人眼周老化程度、年齡及生活習慣而異，治療師會在每次療程後評估進度並調整方案。",
    },
    {
      q: "BTL Exion 眼部療程香港收費大概幾多？",
      a: "香港市場眼周 RF 療程收費因儀器品牌、中心地段及是否含諮詢評估而有差異，一般在 HK$1,000–2,500 不等。Peko Beauty 目前新客試做價為 HK$380（眼周全區），包含免費 VISIA 皮膚深層分析；完整療程套票按 3 次、5 次或 6 次安排，按個人眼周狀況作個人化建議。選擇中心時，最重要看的是：儀器是否原廠 BTL、是否有眼周專用手具（而非以面部手具代替）及治療師評估是否到位。",
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
          BTL Exion™ 眼部療程 常見問題 FAQ
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
      title: "BTL Exion™ 膠原槍（面部）",
      desc: "全面 RF + 超聲波無創緊緻提升，改善法令紋及輪廓鬆弛，與眼部療程同日可組合",
      cta: "試做 HK$680",
      imgSrc: null as string | null,
    },
    {
      href: "/treatments/sylfirm-x",
      emoji: "💉",
      gradient: "from-rose-200 via-pink-100 to-red-50",
      accentColor: "#C52B21",
      tag: "微針電波",
      title: "Sylfirm X 矽谷雙波黃金微針",
      desc: "深入真皮層微針 RF，改善眼周凹凸洞及暗印，配合 Exion 眼部達到全面眼周修復",
      cta: "試做 HK$1,880",
      imgSrc: null as string | null,
    },
    {
      href: "/treatments/hollywood-spectra-laser",
      emoji: "⚡",
      gradient: "from-yellow-200 via-amber-100 to-orange-50",
      accentColor: "#d97706",
      tag: "激光提亮",
      title: "Hollywood Spectra 膠原激光",
      desc: "改善色素型黑眼圈及眼周暗沉，配合 Exion 眼部達到亮白 + 緊緻雙效",
      cta: "試做 HK$880",
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
    <section id="final-cta" className="py-16 px-4 text-center" style={{ background: "linear-gradient(135deg, #f5f0ff 0%, #faf5ff 100%)" }}>
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
        className="max-w-2xl mx-auto"
      >
        <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-3" style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}>
          準備好告別魚尾紋、淚溝、眼周老化了嗎？
        </h2>
        <p className="text-gray-500 text-base md:text-lg mb-8 leading-relaxed">
          免費 VISIA 眼周深層分析 + 零壓力專業諮詢
          <br />
          新客試做價 <strong className="text-[#C52B21]">HK$380</strong>，明碼實價，絕無隱藏消費
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
export default function BtlExionEyeClient() {
  return (
    <div className="bg-white">
      <StickyNav />
      <HeroSection />
      <PainPointsSection />
      <DirectAnswerSection />
      <KeyTakeawaysSection />
      <TreatmentStatsSection />
      <ScienceSection />
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