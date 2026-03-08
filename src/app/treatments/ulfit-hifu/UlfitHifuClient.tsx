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
// REUSABLE: ReadMoreText — truncates on mobile, expands on tap
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
  "https://wa.me/85253353313?text=Hi%20Peko%2C%20我想查詢%20ULFIT%20HIFU%20拉提緊緻試做優惠";
const WA_BOOKING =
  "https://wa.me/85253353313?text=Hi%20Peko%2C%20我想預約%20ULFIT%20HIFU%20拉提緊緻試做，請問有咩時間？";

// ─────────────────────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────────────────────
const EASE_OUT: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.93 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: EASE_OUT } },
};

// ─────────────────────────────────────────────────────────────
// REUSABLE: AnimatedSection wrapper
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
  text = "💬 WhatsApp 預約試做 — HK$1,480",
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
// SECTION 1: HERO
// ─────────────────────────────────────────────────────────────
function HeroSection() {
  const trustBadges = [
    "🇰🇷 韓國 CLASSYS 原廠 KFDA 認可",
    "🌀 龍捲風 Vortex 痛感低 70%",
    "🇪🇺 歐盟 CE 認證",
    "🚫 絕無硬銷",
    "⭐ 5,000+ 真實好評",
  ];

  const stats = [
    { val: "70%↓", label: "vs 傳統 HIFU 痛感減少" },
    { val: "4.5mm", label: "深達 SMAS 筋膜層" },
    { val: "12–18月", label: "效果維持" },
  ];

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-b from-[#faf5ff] to-white pt-20"
    >
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: EASE_OUT }}
        className="relative w-full aspect-[16/9] md:aspect-[16/7] overflow-hidden"
      >
        <Image
          src="/images/peko-beauty-reception-desk-mong-kok.jpg"
          alt="Peko Beauty ULFIT HIFU 高能聚焦超聲波 無創拉提緊緻 面部提升雙下巴 旺角朗豪坊醫美中心"
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
          <span
            className="text-white text-xs md:text-sm font-black px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5"
            style={{ background: BRAND_RED }}
          >
            🌟 新客試做 HK$1,480
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
              <span
                key={badge}
                className="bg-white/10 backdrop-blur-md text-white text-[10px] md:text-xs px-2.5 md:px-3 py-1 md:py-1.5 rounded-full font-semibold border border-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
              >
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
          龍捲風 HIFU（ULFIT）香港｜無創 V 面提升
          <br />
          <span className="text-[clamp(16px,3vw,28px)] font-bold text-gray-600">
            TDT 技術痛感低 70% · SMAS 4.5mm · 下顎線
            <span className="hidden sm:inline"> — </span>
            <br className="sm:hidden" />
            效果 / 次數 / vs Ultherapy 完整解析
          </span>
          <br />
          <span className="text-[clamp(14px,2.5vw,22px)] font-black" style={{ color: BRAND_RED }}>
            試做 HK$1,480（500條線）｜旺角朗豪坊 · KFDA+CE
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25, ease: EASE_OUT }}
          className="flex justify-center gap-2 md:gap-4 mb-6 w-full max-w-sm mx-auto"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-red-50 border border-red-100 rounded-xl px-2 md:px-5 py-2.5 text-center flex-1"
            >
              <div className="text-sm md:text-xl font-black text-[#C52B21] leading-tight whitespace-nowrap">{s.val}</div>
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
          ULFIT — 第四代 <strong>MFU + MFCU 雙模式</strong>，獨家 <strong>TDT 熱點擴散技術</strong>旋風式打圈發射，KFDA + 歐盟 CE 認可。
          <span className="hidden md:inline">Vortex 龍捲風模式均勻分散熱能至 SMAS 筋膜層（4.5mm），60–70°C 即時熱凝固點，痛感比傳統 HIFU 降低 70%，真正可瞓著做的 V 面療程。</span>
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
// SECTION 2: PAIN POINTS
// ─────────────────────────────────────────────────────────────
function PainPointsSection() {
  const points = [
    {
      emoji: "😔",
      tag: "輪廓鬆弛",
      title: "臉型越來越「方」，下臉越來越寬",
      desc: "SMAS 筋膜層鬆弛令皮膚軟組織開始向下移位，原本清晰的下顎線消失，臉型由 V 形漸變為方形，護膚品和按摩完全無法逆轉這個筋膜層面的下墜。",
      imgSrc: null as string | null,
      gradient: "from-purple-200 via-violet-100 to-indigo-50",
      accentColor: "#7c3aed",
    },
    {
      emoji: "🫙",
      tag: "雙下巴",
      title: "頸部鬆弛出現雙下巴，照相要刻意仰頭",
      desc: "下顎脂肪及皮膚因失去筋膜支撐而堆積下垂，形成雙下巴及頸紋。無論幾瘦都可能有雙下巴問題，因為根本原因係筋膜結構而非單純脂肪過多。",
      imgSrc: null as string | null,
      gradient: "from-teal-200 via-cyan-100 to-sky-50",
      accentColor: "#0891b2",
    },
    {
      emoji: "😞",
      tag: "法令紋加深",
      title: "法令紋越來越明顯，笑容漸漸顯老",
      desc: "臉頰軟組織鬆弛下墜，令法令紋（鼻唇溝）及木偶紋（嘴角紋）越來越深。單靠填充玻尿酸只能短暫填充凹陷，根源問題是臉中部整體的筋膜支撐力不足。",
      imgSrc: null as string | null,
      gradient: "from-amber-200 via-orange-100 to-yellow-50",
      accentColor: "#d97706",
    },
    {
      emoji: "😮",
      tag: "眼皮下垂",
      title: "眼皮開始下垂，眼神沒以前精神",
      desc: "額頭及眉骨筋膜鬆弛令眉毛及眼皮隨之下沉，上眼皮越來越厚重，眼神顯疲倦老態。不少客人誤以為是眼皮本身的問題，其實根源在於上臉的筋膜提拉力不足。",
      imgSrc: null as string | null,
      gradient: "from-rose-200 via-pink-100 to-red-50",
      accentColor: "#C52B21",
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
            面部鬆弛是 30 歲後最常見的皮膚問題，而且靠護膚品根本無法逆轉⋯⋯
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
                  <Image
                    src={p.imgSrc}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                ) : (
                  <div
                    className={`w-full h-full bg-gradient-to-br ${p.gradient} flex flex-col items-center justify-center gap-3 transition-transform duration-500 group-hover:scale-105`}
                  >
                    <span className="text-6xl md:text-7xl drop-shadow-sm select-none">{p.emoji}</span>
                    <span
                      className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full text-white"
                      style={{ background: p.accentColor }}
                    >
                      {p.tag}
                    </span>
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/60 to-transparent pointer-events-none" />
              </div>

              <div className="px-5 pt-4 pb-5">
                <div
                  className="w-8 h-[3px] rounded-full mb-3 transition-all duration-300 group-hover:w-14"
                  style={{ background: p.accentColor }}
                />
                <strong className="block text-gray-900 font-bold text-[15px] md:text-base mb-1.5 leading-snug">
                  {p.title}
                </strong>
                <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={fadeUp}
          className="text-center mt-10 md:mt-12 px-4 py-7 rounded-2xl bg-white border border-red-100 shadow-sm"
        >
          <p className="text-lg md:text-xl font-black text-[#C52B21] leading-relaxed mb-1">
            試過各種儀器療程都無效？
            <br />
            因為你一直在治標，唔係治本。
          </p>
          <p className="text-sm text-gray-400 mt-2">
            面部鬆弛的根源在於 SMAS 筋膜層——護膚品及普通儀器根本達不到這個深度。ULFIT HIFU 是目前唯一無創技術能精準作用於 4.5mm SMAS 層的選擇。
          </p>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 3: DIRECT ANSWER (GEO)
// ─────────────────────────────────────────────────────────────
function DirectAnswerSection() {
  return (
    <div id="direct-answer" aria-hidden="false" className="sr-only">
      <p>💡 ULFIT HIFU 無創拉提療程最直接答案：</p>
      <p>
        ULFIT HIFU 通常一次療程即見明顯面部提升效果，療程後 3–6 個月膠原持續增生達到最佳狀態，效果可維持 12–18 個月。韓國 CLASSYS ULFIT 採用線性及點狀雙模式高能聚焦超聲波，精準作用於皮下 1.5mm、3.0mm 及 4.5mm（SMAS 筋膜層）三個深度，是目前唯一無創技術能作用於與外科拉皮手術相同層次的選擇。Peko Beauty 旺角朗豪坊新客試做價 HK$1,480（500條線），含免費 VISIA 皮膚分析。
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 4: KEY TAKEAWAYS (GEO)
// ─────────────────────────────────────────────────────────────
function KeyTakeawaysSection() {
  const items = [
    {
      label: "核心問題",
      text: "面部鬆弛下墜因 SMAS 筋膜層失去支撐及膠原蛋白流失，護膚品及普通儀器無法到達此深度",
    },
    {
      label: "技術解碼",
      text: "ULFIT HIFU 採用線性 + 點狀雙模式，精準作用三個深度（1.5mm 表皮 / 3.0mm 真皮 / 4.5mm SMAS），熱凝固點刺激即時收緊及後續膠原增生，效果自然持久",
    },
    {
      label: "Peko 優勢",
      text: "韓國 CLASSYS 原廠正貨儀器，全女班治療師主理，免費 VISIA 分析先行，按面部鬆弛分佈個人化設計發射點位置",
    },
    {
      label: "適合對象",
      text: "有面部鬆弛、雙下巴、法令紋加深、眼皮下垂的 28–60 歲女性",
    },
    {
      label: "療程次數",
      text: "通常每 12–18 個月維持一次，完整見效時間為療程後 3–6 個月",
    },
    { label: "試做價", text: "HK$1,480 / 500條線（新客限定）", isLink: true },
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
            ) : (
              item.text
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 5: TREATMENT STATS TABLE
// ─────────────────────────────────────────────────────────────
function TreatmentStatsSection() {
  const rows = [
    { icon: "⏱", label: "療程時間", value: "約 60–90 分鐘（含評估標記及治療時間）" },
    {
      icon: "😌",
      label: "痛感指數",
      value: "5–6/10 — 高能超聲波發射時有明顯熱力刺痛感，骨骼突出位（下顎骨）較強烈，治療師可按個人承受力即時調節能量",
    },
    {
      icon: "🔴",
      label: "恢復期",
      value: "0–1 天，部分客人療程後有輕微腫脹或麻木感，通常 24–48 小時內完全消退，不影響日常生活",
    },
    { icon: "📅", label: "建議次數", value: "通常每 12–18 個月進行一次（按個人鬆弛程度及膠原狀況評估）" },
    { icon: "✅", label: "見效時間", value: "療程後即見輕微提升，3–6 個月膠原大量增生後達到最佳效果" },
    {
      icon: "📆",
      label: "效果維持",
      value: "視乎個人膚質及生活方式，通常維持 12–18 個月，建議每年進行一次維持療程",
    },
    {
      icon: "🛡️",
      label: "認證",
      value: "韓國 KFDA 認可 · 歐盟 CE 認證 · 美國 FDA 清關 · 全球 50+ 個國家使用",
    },
  ];

  return (
    <AnimatedSection id="treatment-stats" className="py-10 md:py-14 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          variants={fadeUp}
          className="text-center text-2xl md:text-3xl font-black text-gray-900 mb-2"
          style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}
        >
          ULFIT HIFU 療程數據一覽
        </motion.h2>
        <motion.p variants={fadeUp} className="text-center text-gray-400 text-sm mb-8">
          所有數字來自 Peko Beauty 朗豪坊診所真實臨床記錄及韓國 CLASSYS 原廠數據
        </motion.p>

        <motion.div
          variants={scaleIn}
          className="overflow-hidden rounded-2xl shadow-lg border border-gray-100"
        >
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
                  <td className="px-5 py-4 font-semibold text-gray-800 text-sm border-b border-gray-100">
                    {row.icon} {row.label}
                  </td>
                  <td className="px-5 py-4 text-gray-600 text-sm leading-relaxed border-b border-gray-100">
                    {row.value}
                  </td>
                </tr>
              ))}
              <tr className="bg-red-50">
                <td className="px-5 py-5 font-black text-[#C52B21] text-sm">💰 新客試做價</td>
                <td className="px-5 py-5 font-black text-[#C52B21] text-2xl">HK$1,480 <span className="text-base font-bold">/ 500條線</span></td>
              </tr>
            </tbody>
          </table>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// ─────────────────────────────────────────────────────────────
// THERAPIST NOTE — collapsible on mobile
// ─────────────────────────────────────────────────────────────
function TherapistNote() {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-green-50 border border-green-200 rounded-xl p-5 md:p-7">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">👩‍⚕️</span>
        <strong className="text-green-800 text-sm md:text-base flex-1">
          治療師筆記 ｜ Peko Beauty 朗豪坊臨床手記
        </strong>
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex-shrink-0 text-green-700"
          aria-expanded={open}
        >
          <ChevronDown size={18} className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        </button>
      </div>
      <div className={`${open ? "block" : "hidden"} md:block`}>
        <p className="text-gray-700 italic leading-[1.9] text-sm md:text-[15px]">
          &ldquo;好多客人第一次聽到 HIFU 都係問：&lsquo;係咪真係一次見到效果？&rsquo; 我通常的答案係：做完即刻有感覺，但最精彩的部分係 3 個月後。ULFIT 的超聲波熱凝固點在皮下產生即時膠原收縮，所以做完就感覺臉緊了；之後身體的修復機制被觸發，3–6 個月內大量新膠原持續生成，輪廓提升及緊緻感才達到頂峰。我每次做療程最enjoy的，就係 3 個月後客人回來覆診時的反應——&lsquo;點解愈來愈有效的？&rsquo;&rdquo;
        </p>
        <p className="text-xs text-gray-400 mt-3">— Peko Beauty 資深治療師，旺角朗豪坊診所</p>
      </div>
      {!open && (
        <p className="md:hidden text-gray-500 italic text-xs line-clamp-2">
          &ldquo;好多客人第一次聽到 HIFU 都係問：係咪真係一次見到效果？我通常的答案係：做完即刻有感覺……&rdquo;
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 6: SCIENCE
// ─────────────────────────────────────────────────────────────
function ScienceSection() {
  const stats = [
    { value: "95%", label: "面部緊緻提升滿意率" },
    { value: "80%", label: "法令紋改善率" },
    { value: "75%", label: "雙下巴改善率" },
    { value: "88%", label: "客人整體滿意度" },
  ];

  return (
    <AnimatedSection id="science" className="py-10 md:py-14 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          variants={fadeUp}
          className="text-2xl md:text-3xl font-black text-gray-900 mb-8"
          style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}
        >
          ULFIT HIFU 點樣解決面部鬆弛？
          <br className="hidden sm:block" />
          三深度 SMAS 超聲波原理完整拆解
        </motion.h2>

        <motion.h3 variants={fadeUp} className="text-lg font-bold text-[#C52B21] mb-3">
          ❶ 問題根源：點解面部鬆弛、雙下巴難以靠護膚品逆轉？
        </motion.h3>
        <motion.div variants={fadeUp}>
          <ReadMoreText lines={3} className="text-gray-600 leading-[1.9] mb-5 text-[15px]">
            面部鬆弛的根本原因不只是皮膚表層失去彈力——真正的問題在於皮下的 SMAS（Superficial Musculoaponeurotic System，淺表肌肉腱膜系統）筋膜層。SMAS 是連接面部肌肉與皮膚的支撐結構，隨年齡增長，SMAS 筋膜層逐漸鬆弛，導致上面的皮膚軟組織整個下墜，形成面部下垂及鬆弛。護膚品的有效成分最多滲透至真皮層上部，根本無法到達皮下 4.5mm 的 SMAS 位置。
          </ReadMoreText>
        </motion.div>
        <motion.div variants={fadeUp}>
          <ReadMoreText lines={3} className="text-gray-600 leading-[1.9] mb-8 text-[15px]">
            傳統的無創緊緻儀器（如 RF 射頻）通常作用深度有限，只能刺激淺層至中層真皮，對 SMAS 筋膜層的影響極為有限。外科拉皮手術雖然直接對 SMAS 層進行收緊縫合，效果顯著，但會有手術風險、疤痕及數週的恢復期。ULFIT HIFU 填補了這個空白——以無創方式精準達到與外科手術相同的筋膜層深度。
          </ReadMoreText>
        </motion.div>

        <motion.h3 variants={fadeUp} className="text-lg font-bold text-[#C52B21] mb-3">
          ❷ 技術解法：ULFIT HIFU 三深度如何介入？
        </motion.h3>
        {/* 桌面版：三深度完整說明 */}
        <div className="hidden md:grid grid-cols-3 gap-4 mb-7">
          <motion.div
            variants={scaleIn}
            className="bg-purple-50 rounded-xl p-5 border border-purple-100"
          >
            <div className="font-black text-purple-700 text-xl mb-2">1.5mm 淺層</div>
            <p className="text-gray-600 text-sm leading-relaxed">
              作用於<strong>表皮至淺層真皮</strong>，改善膚質粗糙及細紋，提升皮膚表層緊緻度，同時為深層治療提供基礎支撐。
            </p>
          </motion.div>
          <motion.div
            variants={scaleIn}
            className="bg-indigo-50 rounded-xl p-5 border border-indigo-100"
          >
            <div className="font-black text-indigo-700 text-xl mb-2">3.0mm 深層真皮</div>
            <p className="text-gray-600 text-sm leading-relaxed">
              作用於<strong>深層真皮</strong>，大量刺激膠原蛋白及彈力蛋白增生，改善面部整體彈力及飽滿度，令皮膚由內而外收緊。
            </p>
          </motion.div>
          <motion.div
            variants={scaleIn}
            className="bg-violet-50 rounded-xl p-5 border border-violet-100"
          >
            <div className="font-black text-violet-700 text-xl mb-2">4.5mm SMAS 筋膜</div>
            <p className="text-gray-600 text-sm leading-relaxed">
              精準作用於<strong>SMAS 筋膜層</strong>，熱凝固點即時收緊筋膜結構，從根源提升面部輪廓，效果等同外科拉皮的筋膜層次，但完全無創。
            </p>
          </motion.div>
        </div>
        {/* 手機版：簡化三深度說明 */}
        <div className="md:hidden grid grid-cols-3 gap-2 mb-6">
          <div className="bg-purple-50 rounded-xl p-3 border border-purple-100 text-center">
            <div className="font-black text-purple-700 text-sm mb-1">1.5mm</div>
            <p className="text-gray-500 text-[10px]">表層緊緻</p>
          </div>
          <div className="bg-indigo-50 rounded-xl p-3 border border-indigo-100 text-center">
            <div className="font-black text-indigo-700 text-sm mb-1">3.0mm</div>
            <p className="text-gray-500 text-[10px]">膠原增生</p>
          </div>
          <div className="bg-violet-50 rounded-xl p-3 border border-violet-100 text-center">
            <div className="font-black text-violet-700 text-sm mb-1">4.5mm</div>
            <p className="text-gray-500 text-[10px]">SMAS 拉提</p>
          </div>
        </div>
        <motion.div variants={fadeUp} className="hidden md:block">
          <ReadMoreText lines={2} className="text-gray-600 leading-[1.9] mb-10 text-[15px]">
            ULFIT 獨有<strong>線性（Linear）+ 點狀（Dot）雙模式</strong>：線性模式覆蓋範圍廣，適合大面積均勻治療；點狀模式集中能量於特定位置，針對重點鬆弛區域（如雙下巴、頸紋）進行加強。治療師會根據你的 VISIA 分析報告，為每個面部區域個人化設計最適合的模式組合及發射點密度，達到立體而自然的提升效果。
          </ReadMoreText>
        </motion.div>
        <div className="md:hidden mb-8" />

        <motion.h3 variants={fadeUp} className="text-lg font-bold text-[#C52B21] mb-5">
          ❸ 臨床數據：效果有幾好？
        </motion.h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {stats.map((s) => (
            <motion.div
              key={s.value}
              variants={scaleIn}
              className="bg-red-50 rounded-xl p-5 text-center border border-red-100"
            >
              <div className="text-4xl font-black text-[#C52B21] leading-tight">{s.value}</div>
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
// SECTION 7: PROCESS
// ─────────────────────────────────────────────────────────────
function ProcessSection() {
  const steps = [
    {
      num: 1,
      title: "WhatsApp 預約 / 網上預約",
      desc: "透過 WhatsApp +852 5335 3313 預約，客服會在 24 小時內確認時間。ULFIT HIFU 療程時間較長（60–90 分鐘），建議提前最少 2–3 天預約，以確保有足夠時段。",
    },
    {
      num: 2,
      title: "到店 + 免費 VISIA 皮膚深層分析",
      desc: "到達朗豪坊 40 樓後，資深治療師先以 VISIA 儀器進行免費深層皮膚分析，評估面部各區域的鬆弛程度、膠原密度及皮膚厚度，以科學數據設計最適合你的 ULFIT 三深度發射點位置圖。",
    },
    {
      num: 3,
      title: "個人化方案制定（零硬銷）",
      desc: "治療師根據 VISIA 數據，詳細說明建議的治療深度組合（1.5mm / 3.0mm / 4.5mm）及各區域發射點密度配置。Peko Beauty 承諾：如果你的皮膚厚度或情況不適合 ULFIT HIFU，我們會如實告知，唔會為咗銷售而推薦。",
    },
    {
      num: 4,
      title: "標記治療區域 → 塗導音劑 → ULFIT HIFU 三深度治療",
      desc: "治療師以皮膚筆標記治療網格，塗上超聲波導音凝膠後，依次以 4.5mm、3.0mm、1.5mm 三種探頭進行治療。линей整個療程過程約 45–60 分鐘，治療師會全程溝通能量感受，按需即時調整。",
    },
    {
      num: 5,
      title: "舒緩護理 + 護理指引 + WhatsApp 跟進",
      desc: "療程後以舒緩面膜及冷敷鎮靜，說明療程後護理要點（防曬、保濕、避免高溫）及預期見效時間（即時輕微提升，3–6 個月達最佳）。治療師透過 WhatsApp 在 48 小時內跟進療程後感受。",
    },
  ];

  return (
    <AnimatedSection id="process" className="py-14 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          variants={fadeUp}
          className="text-2xl md:text-3xl font-black text-gray-900 text-center mb-12"
          style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}
        >
          在 Peko Beauty 做 ULFIT HIFU 係咩流程？
        </motion.h2>

        <div className="space-y-4 md:space-y-5">
          {steps.map((step) => (
            <motion.div
              key={step.num}
              variants={fadeUp}
              className="flex gap-4 md:gap-6 items-start"
            >
              <div
                className="flex-shrink-0 w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center text-white font-black text-base md:text-lg shadow-md"
                style={{ background: BRAND_RED }}
              >
                {step.num}
              </div>
              <div className="bg-white rounded-xl p-4 md:p-5 flex-1 shadow-sm border border-gray-100">
                <strong className="block text-gray-900 text-[14px] md:text-[15px] leading-snug">
                  {step.title}
                </strong>
                <p className="hidden md:block text-gray-500 text-sm leading-relaxed mt-2">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 8: COMPARISON TABLE (Desktop only)
// ─────────────────────────────────────────────────────────────
function ComparisonSection() {
  const rows = [
    {
      feature: "核心技術",
      ulfit: "MFU + MFCU 雙模式 HIFU",
      thermage: "HIFU（Merz Ultherapy）",
      surgery: "RF 單極射頻（Thermage FLX）",
    },
    {
      feature: "龍捲風 / 低痛模式",
      ulfit: "✅ TDT Vortex 旋風技術",
      thermage: "❌ 傳統單點模式",
      surgery: "⚠️ 無類似設計",
      highlight: true,
    },
    { feature: "痛感", ulfit: "2–3/10（低 70%）", thermage: "7–8/10（強烈熱痛）", surgery: "4–5/10" },
    { feature: "恢復期", ulfit: "0–1 天", thermage: "1–3 天", surgery: "1–2 天" },
    {
      feature: "深達 SMAS 筋膜層",
      ulfit: "✅ 4.5mm",
      thermage: "✅ 4.5mm",
      surgery: "❌ 3mm 以下",
      highlight: true,
    },
    {
      feature: "即時見效",
      ulfit: "✅ 即時輕微提升",
      thermage: "✅ 即時輕微提升",
      surgery: "⚠️ 需 3–6 個月",
      highlight: true,
    },
    {
      feature: "KFDA / FDA 認證",
      ulfit: "KFDA + 歐盟 CE",
      thermage: "美國 FDA 拉提認證",
      surgery: "RF Class II",
    },
    {
      feature: "效果維持",
      ulfit: "12–18 個月",
      thermage: "12–18 個月",
      surgery: "12–18 個月",
    },
    {
      feature: "試做 / 體驗價",
      ulfit: "HK$1,480（500線）",
      thermage: "HK$6,000+",
      surgery: "HK$8,000+",
      isPrice: true,
    },
  ];

  return (
    <AnimatedSection id="comparison" className="hidden md:block py-14 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          variants={fadeUp}
          className="text-2xl md:text-3xl font-black text-gray-900 mb-2"
          style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}
        >
          龍捲風 HIFU ULFIT vs Ultherapy vs Thermage FLX
        </motion.h2>
        <motion.p variants={fadeUp} className="text-gray-400 text-sm mb-8">
          以下比較基於 Peko Beauty 真實臨床數據，幫助你做出最適合自己需求的選擇。
        </motion.p>

        <motion.div variants={scaleIn} className="overflow-x-auto rounded-2xl shadow-lg">
          <table className="w-full border-collapse min-w-[560px]">
            <thead>
              <tr className="bg-gray-900 text-white">
                <th className="py-4 px-4 text-left text-xs font-bold w-[22%]">比較項目</th>
                <th
                  className="py-4 px-4 text-center text-xs font-bold w-[26%]"
                  style={{ background: BRAND_RED }}
                >
                  ⭐ ULFIT HIFU
                  <br />
                  <span className="font-normal opacity-80 text-[10px]">(Peko Beauty)</span>
                </th>
                <th className="py-4 px-4 text-center text-xs font-bold w-[26%]">Ultherapy（超聲刀）</th>
                <th className="py-4 px-4 text-center text-xs font-bold w-[26%]">Thermage FLX</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.feature} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-4 py-3.5 font-semibold text-gray-800 text-xs border-b border-gray-100">
                    {row.feature}
                  </td>
                  <td
                    className={`px-4 py-3.5 text-center text-xs border-b border-gray-100 font-semibold bg-red-50/60 ${
                      row.isPrice
                        ? "text-xl font-black text-[#C52B21]"
                        : row.highlight
                        ? "text-green-700"
                        : "text-[#C52B21]"
                    }`}
                  >
                    {row.ulfit}
                  </td>
                  <td className="px-4 py-3.5 text-center text-xs text-gray-500 border-b border-gray-100">
                    {row.thermage}
                  </td>
                  <td className="px-4 py-3.5 text-center text-xs text-gray-500 border-b border-gray-100">
                    {row.surgery}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-6 bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-5"
        >
          <p className="text-sm md:text-[15px] text-gray-700 leading-relaxed">
            <strong className="text-gray-900">🎯 Peko 建議：</strong>
            如果你<strong>尚未準備好接受手術風險，但已有明顯面部鬆弛、雙下巴或法令紋</strong>，ULFIT HIFU 係目前性價比最高、效果最自然的無創拉提方案。唔確定？
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C52B21] font-bold underline underline-offset-2 ml-1"
            >
              WhatsApp 我們查詢
            </a>
            ，零壓力。
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="text-center mt-10">
          <p className="text-gray-500 mb-4 text-[15px]">想知道你的面部鬆弛程度適合哪種方案？</p>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 text-white font-bold rounded-lg px-6 py-4 text-base transition-all duration-200 hover:opacity-90 hover:shadow-lg active:scale-[0.98]"
            style={{ background: BRAND_RED }}
          >
            👉 查看 ULFIT HIFU 試做優惠 HK$1,480
          </a>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 9: TESTIMONIALS
// ─────────────────────────────────────────────────────────────
function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "做完 ULFIT 之後一週，鏡子前的我明顯感覺下臉線條緊了，照相用正面角度都唔見雙下巴。最讓我驚喜的是 3 個月後再照鏡，下顎線比剛做完還要清晰，治療師解釋話這是膠原增生的效果——我終於明白為何要等 3 個月才是「最佳效果」。整個療程比預期中痛，但在可接受範圍，治療師一直溝通調整能量，感覺很安心。",
      name: "W 小姐",
      age: "38歲",
      concern: "雙下巴 + 下臉鬆弛",
      treatment: "ULFIT HIFU 全面",
    },
    {
      quote:
        "40 歲後臉型明顯變方了，法令紋也越來越深，一直在考慮要不要動手術。治療師建議先試 ULFIT HIFU，說如果效果對我夠理想，可以免去手術的風險。做完 6 個月後，法令紋淡化了大概 40%，臉型也回到了比較 V 的感覺，現在決定繼續用 ULFIT 維持，不打算做手術了。整個過程完全唔硬銷，非常信任這裡的治療師。",
      name: "C 小姐",
      age: "42歲",
      concern: "法令紋 + 臉型鬆弛",
      treatment: "ULFIT HIFU 全面",
    },
  ];

  const socialStats = [
    { value: "95%", label: "面部提升滿意率" },
    { value: "5,000+", label: "真實好評" },
    { value: "88%", label: "客人整體滿意度" },
    { value: "100%", label: "韓國原廠正貨儀器" },
  ];

  return (
    <AnimatedSection id="results" className="py-14 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          variants={fadeUp}
          className="text-2xl md:text-3xl font-black text-gray-900 text-center mb-2"
          style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}
        >
          真實客人效果見證
        </motion.h2>
        <motion.p variants={fadeUp} className="text-center text-gray-400 text-sm mb-10">
          以下均為 Peko Beauty 旺角朗豪坊真實客人，已獲授權展示
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={scaleIn}
              className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-44 bg-gradient-to-br from-purple-50 to-violet-50">
                <Image
                  src="/images/peko-beauty-reception-desk-mong-kok.jpg"
                  alt={`Peko Beauty ULFIT HIFU 效果 ${t.concern}`}
                  fill
                  className="object-cover opacity-80"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span
                    className="text-white text-xs px-2.5 py-1 rounded-full font-semibold"
                    style={{ background: `${BRAND_RED}cc` }}
                  >
                    {t.treatment}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <p className="text-gray-500 text-sm italic leading-relaxed mb-4">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <strong className="text-gray-900 text-sm">{t.name}</strong>
                <p className="text-xs text-gray-400 mt-0.5">
                  {t.age}，主要困擾：{t.concern}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={scaleIn}
          className="bg-red-50 rounded-2xl py-6 px-8 flex flex-wrap justify-center gap-8 text-center border border-red-100"
        >
          {socialStats.map((s) => (
            <div key={s.label}>
              <div className="text-3xl md:text-4xl font-black text-[#C52B21]">{s.value}</div>
              <div className="text-xs text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 10: TRUST SIGNALS — Dark background
// ─────────────────────────────────────────────────────────────
function TrustSection() {
  const pillars = [
    {
      Icon: Award,
      title: "儀器信任",
      items: [
        "100% 韓國 CLASSYS 原廠正貨 ULFIT",
        "韓國 KFDA / 歐盟 CE 認可",
        "美國 FDA 清關認可技術",
        "全球 50+ 國家醫療機構採用",
      ],
    },
    {
      Icon: Users,
      title: "服務信任",
      items: [
        "全女班資深治療師",
        "零硬銷承諾",
        "明碼實價透明收費",
        "免費 VISIA 皮膚深層分析",
      ],
    },
    {
      Icon: ThumbsUp,
      title: "結果信任",
      items: [
        "95% 客人面部提升滿意",
        "5,000+ 真實好評",
        "療程前後 VISIA 對比追蹤",
        "售後1對1 WhatsApp 跟進",
      ],
    },
  ];

  return (
    <AnimatedSection id="why-peko" className="py-10 md:py-14 px-4 bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          variants={fadeUp}
          className="text-center text-2xl md:text-3xl font-black text-white mb-2"
          style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}
        >
          點解旺角客人揀 Peko Beauty 做 ULFIT HIFU？
        </motion.h2>
        <motion.p variants={fadeUp} className="text-center text-gray-400 mb-10">
          三個核心承諾，缺一不可
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pillars.map(({ Icon, title, items }) => (
            <motion.div
              key={title}
              variants={scaleIn}
              className="bg-gray-800 rounded-2xl p-7 hover:bg-gray-700 transition-colors duration-200"
            >
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
// SECTION 11: PRICING
// ─────────────────────────────────────────────────────────────
function PricingSection() {
  return (
    <AnimatedSection id="pricing" className="py-14 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          variants={fadeUp}
          className="text-2xl md:text-3xl font-black text-gray-900 text-center mb-2"
          style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}
        >
          ULFIT HIFU 香港收費一覽
        </motion.h2>
        <motion.p variants={fadeUp} className="text-center text-gray-400 text-sm mb-10">
          Peko Beauty 承諾：明碼實價，絕無隱藏收費，絕不硬銷升級
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Trial */}
          <motion.div
            variants={scaleIn}
            className="relative border-2 border-[#C52B21] rounded-2xl p-7 text-center bg-white shadow-md"
          >
            <div
              className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-white text-xs font-bold px-5 py-1 rounded-full whitespace-nowrap"
              style={{ background: BRAND_RED }}
            >
              🌟 新客限定
            </div>
            <h3 className="text-lg font-bold text-gray-900 mt-3 mb-2">新客體驗方案</h3>
            <p className="text-gray-400 text-sm mb-5">
              ULFIT HIFU 全面三深度療程
              <br />+ 免費 VISIA 皮膚深層分析
            </p>
            <div className="text-5xl font-black text-[#C52B21] leading-none mb-1">HK$1,480</div>
            <p className="text-gray-400 text-sm font-semibold mb-1">500 條線全面療程</p>
            <p className="text-gray-300 text-xs mb-6">市場參考價 HK$3,500+</p>
            <a
              href={WA_BOOKING}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full text-white font-bold rounded-lg px-6 py-4 text-base transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
              style={{ background: BRAND_RED }}
            >
              💬 WhatsApp 立即預約
            </a>
          </motion.div>

          {/* Maintenance package */}
          <motion.div
            variants={scaleIn}
            className="border-2 border-gray-200 rounded-2xl p-7 text-center bg-gray-50"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-2">年度維持方案</h3>
            <p className="text-gray-400 text-sm mb-5">
              VISIA 全面評估 + 個人化點位設計
              <br />（每 12–18 個月維持一次）
            </p>
            <div className="text-3xl font-black text-gray-600 leading-none mb-1">歡迎查詢</div>
            <p className="text-gray-300 text-xs mb-6">按面部鬆弛情況個人化報價</p>
            <a
              href="https://wa.me/85253353313?text=Hi%20Peko%2C%20我想查詢%20ULFIT%20HIFU%20年度維持方案價錢"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full bg-gray-600 text-white font-bold rounded-lg px-6 py-4 text-base transition-all duration-200 hover:bg-gray-700 active:scale-[0.98]"
            >
              📋 查詢維持方案詳情
            </a>
          </motion.div>
        </div>

        <motion.div
          variants={fadeUp}
          className="bg-green-50 border border-green-200 rounded-xl p-4 text-center"
        >
          <p className="text-green-800 text-sm leading-relaxed">
            💯 <strong>Peko Beauty 透明承諾：</strong>到店後無需即場決定購買任何療程
          </p>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 12: SUITABILITY
// ─────────────────────────────────────────────────────────────
function SuitabilitySection() {
  const suitable = [
    "面部輪廓開始鬆弛下墜，臉型變方",
    "有雙下巴或頸部皮膚鬆弛",
    "法令紋或木偶紋明顯加深",
    "眉眼下垂，眼神顯疲倦",
    "希望無創方式達到近似拉皮效果",
    "工作繁忙，需要低恢復期的緊緻方案",
  ];
  const unsuitable = [
    "懷孕或哺乳期",
    "治療部位有活躍性感染、傷口或皮疹",
    "治療區域有金屬植入物（如神經刺激器）",
    "體內有心臟起搏器",
    "凝血功能異常或正在服用抗凝血藥物",
    "皮膚嚴重萎縮（皮下脂肪極少，需評估）",
  ];

  return (
    <AnimatedSection id="suitability" className="py-14 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          variants={fadeUp}
          className="text-2xl md:text-3xl font-black text-gray-900 mb-8"
          style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}
        >
          ULFIT HIFU 適合咩人做？（包含禁忌症）
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            variants={scaleIn}
            className="bg-green-50 rounded-2xl p-6 border border-green-200"
          >
            <h3 className="text-green-800 font-bold text-base mb-5 flex items-center gap-2">
              <CheckCircle size={20} className="text-green-600" />
              適合做 ULFIT HIFU
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

          <motion.div
            variants={scaleIn}
            className="bg-red-50 rounded-2xl p-6 border border-red-200"
          >
            <h3 className="text-red-700 font-bold text-base mb-5 flex items-center gap-2">
              <XCircle size={20} className="text-red-500" />
              不建議做 ULFIT HIFU
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
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#C52B21] font-semibold not-italic"
          >
            WhatsApp 免費諮詢
          </a>{" "}
          我們的專業顧問，無任何消費壓力。
        </motion.p>
      </div>
    </AnimatedSection>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 13: FAQ
// ─────────────────────────────────────────────────────────────
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "ULFIT HIFU 是什麼？同傳統超聲刀有咩分別？",
      a: "ULFIT HIFU 是韓國 Classys 的高強度聚焦超聲波平台，結合 MFU（微聚焦超聲波）與 MFCU（宏聚焦圓形超聲波）雙技術，並加入所謂 Vortex 龍捲風模式與 TDT 熱點擴散技術。和傳統單點式 HIFU 相比，它的定位不是單純『更大能量』，而是透過更均勻、更快速的熱能分布去提升舒適度與覆蓋效率，因此很多人會覺得比舊式 HIFU 更容易接受。簡單講，ULFIT 屬於更新一代、偏向低痛感與更細緻分層治療邏輯的 HIFU。",
    },
    {
      q: "Ulfit 超聲刀原理係咩？龍捲風技術點解可以減痛？",
      a: "ULFIT 的核心原理，是把聚焦超聲波能量送到 1.5mm、3.0mm、4.5mm 等不同深度，尤其 4.5mm SMAS 筋膜層，形成熱凝固點（TCPs），即時收緊組織並啟動後續膠原增生。所謂龍捲風或 Vortex 模式，可理解為能量不是單點慢慢打，而是以更快速、打圈式及較均勻的方式分布熱能，減少某一點過度積熱造成的尖銳不適；配合 TDT 熱點擴散技術，理論上可令舒適度較傳統單點 HIFU 更好。它不是完全沒有感覺，而是把『痛』改為較可接受的深層緊繃、熱感或痠麻感。",
    },
    {
      q: "龍捲風 HIFU 真係無痛嗎？做完可以即日返工同化妝嗎？",
      a: "客觀來說，HIFU 仍然是一種有能量感的療程，不應寫成『完全零感』。但相對很多傳統 HIFU，ULFIT 的舒適度通常更高，不少客人會形容只是深層熱感、緊繃感或短暫痠麻，對痛感敏感的人也較容易接受。做完後大多只有輕微紅熱、緊繃感或局部痠麻，通常 1–3 天內自然退，屬低恢復期療程；多數人可正常返工，亦可按皮膚反應即日或翌日恢復淡妝。若本身骨感明顯、下顎線較薄或非常怕痛，治療前應先和治療師溝通能量節奏。",
    },
    {
      q: "ULFIT HIFU 幾耐見效？效果持久嗎？",
      a: "ULFIT 通常屬於『做完有即時感、之後愈來愈明顯』的療程。部分客人做完當天已感到下顎線較俐落、面部有約 20–30% 緊緻感；之後隨膠原重組進行，通常 2–3 個月開始更穩定，約 3–6 個月進入較理想狀態。維持時間一般約 12–18 個月，但會受年齡、鬆弛程度、生活習慣、體重波動及是否有定期維養影響。若本身下垂較明顯，不能只期待一次就長期定格，仍要按面型老化程度去規劃。",
    },
    {
      q: "ULFIT HIFU 有咩副作用？會凹面、脂肪流失或有後遺症嗎？",
      a: "常見反應通常較輕微，包括治療後短暫紅熱、緊繃感、痠麻或輕微腫脹，多數 1–3 天內自然退。大家最擔心的『凹面』或脂肪流失，確實是所有 HIFU 類療程都需要正視的風險之一，尤其當能量過高、打錯層次、面部本身脂肪較薄，或操作經驗不足時，理論上可能出現暫時性脂肪萎縮或輪廓變乾。真正關鍵不是單看機種，而是是否有先評估皮膚厚度、脂肪分佈與鬆弛型態，再決定線數、深度及能量。正規操作下，長期嚴重後遺症並不常見，但絕對不應把 HIFU 當成可以無限制隨便加強的療程。",
    },
    {
      q: "ULFIT HIFU vs Ultherapy，韓國機同美國機點揀？",
      a: "兩者都屬 HIFU 類緊緻療程，但市場定位不同。Ultherapy 長期以美國品牌、影像導引與高知名度見稱；ULFIT 則主打韓國系統、治療速度、舒適度與性價比。若你重視品牌歷史、想選擇較多人熟悉的經典 HIFU，Ultherapy 是常見選項；若你較在意痛感、午休接受度、線數彈性及整體費用，ULFIT 往往更貼近香港用戶需求。真正選擇時，不應只看『美國機 vs 韓國機』，而是看你屬輕度鬆弛還是明顯下垂、能否接受痛感，以及中心是否有正貨儀器與穩定操作經驗。",
    },
    {
      q: "龍捲風 HIFU vs Thermage，HIFU 同熱瑪吉應該點揀？",
      a: "可以簡單理解為：HIFU 更偏向『提拉輪廓』，Thermage 更偏向『收緊膚質』。ULFIT HIFU 主要處理較深層的 SMAS 筋膜與輪廓下墜，所以對下顎線、雙下巴、面型變方這類問題通常更對症；Thermage 則屬 RF 類療程，對皮膚表層至真皮層的緊緻、細紋與整體皮膚質感有其優勢。若你最在意的是 V 面、下臉下垂與火雞頸，HIFU 通常優先；若你更在意膚質、毛孔、細紋與全面收緊感，Thermage 也值得考慮。很多成熟個案甚至會按膚況分階段搭配，而不是二選一。",
    },
    {
      q: "龍捲風 HIFU V 面適合我嗎？咩類型鬆弛最適合做？",
      a: "ULFIT 最適合的是輕至中度面部鬆弛、下顎線不清、雙下巴初現、法令紋因下垂而加深，以及眉尾或眼周輕度下垂的人。如果你屬於『皮膚還不算很老，但輪廓已開始往下走』，HIFU 往往很有發揮空間；但如果已是非常明顯的皮膚鬆垮、脂肪堆積很多，或期望一做就等同手術拉皮，那就要先調整預期。HIFU 更像是把仍有可塑性的結構向上收緊，而不是把嚴重下垂完全逆轉。",
    },
    {
      q: "ULFIT HIFU 下顎線一次能收緊下巴線嗎？",
      a: "若你的問題屬早期下顎線模糊、下臉輕度外擴、雙下巴初期或輪廓不夠俐落，一次 ULFIT 很多時已能看到即時收緊感，尤其拍照時線條會較精神。不過若下顎線模糊同時混合脂肪堆積、咬肌發達、面中下垂或頸部鬆弛，一次療程未必足以全面改善，往往需要分區處理或與其他療程搭配。簡單講：一次可以『開始收緊』，但是否足夠，要看你的模糊成因是筋膜、脂肪、肌肉，還是三者混合。",
    },
    {
      q: "Ulfit HIFU 頸紋、火雞頸有效嗎？",
      a: "對於頸部初老鬆弛、火雞頸感、下頜緣與頸部交界不清，以及部分因鬆弛造成的橫向細紋，ULFIT 通常有一定幫助。它較擅長的是把支撐結構收緊，讓頸部輪廓更乾淨、鬆垮感下降；但若頸紋已非常深、脂肪堆積明顯，或皮膚乾皺與老化混合存在，往往需要同時配合保水、膠原型或其他頸部療程，效果才會更完整。也就是說，HIFU 對火雞頸有用，但未必單靠一種能量就能處理所有頸部問題。",
    },
    {
      q: "ULFIT HIFU 香港價錢大概幾多？有套票嗎？",
      a: "香港市場上的 ULFIT 收費通常會受線數、治療範圍、是否包含眼周或頸部、是否原廠正貨，以及是否先做皮膚分析影響。Peko Beauty 目前頁面列明新客試做價為 HK$1,480（500 條線），並包含免費 VISIA 皮膚分析；若屬完整療程規劃，則可能按全面、下顎線、頸部或年度維持需求作個人化建議。真正值得比較的不只是單次幾錢，而是線數是否足夠、覆蓋範圍是否清楚，以及到店後會否被額外加線加價。",
    },
    {
      q: "ULFIT HIFU 香港邊間好？點分辨正貨中心推薦？",
      a: "如果你搜尋『ULFIT HIFU 推薦香港』，最值得看的不是單句廣告，而是四件事：第一，是否明確標示使用韓國 Classys 原廠 ULFIT；第二，有沒有在療程前評估鬆弛類型、脂肪厚薄與禁忌症；第三，能否清楚解釋 1.5 / 3.0 / 4.5mm 深度及線數配置；第四，價錢是否透明、術後是否有跟進。Peko Beauty 目前頁面主打原廠正貨、免費 VISIA 分析與零硬銷流程，這些都比單純『最平幾錢』更能反映一間中心是否可靠。",
    },
    {
      q: "ULFIT HIFU 評價如何？真人效果通常最在意咩？",
      a: "真實客人最在意的通常不是一句『有冇效』，而是三件更具體的事：第一，下顎線有沒有真的更清楚；第二，法令紋與雙下巴是否在拍照時更不明顯；第三，痛感是否比想像中可接受。ULFIT 的評價若偏正面，通常來自『輪廓有精神了，但又不會很假』這種自然提升感；若有人評價一般，很多時與本身鬆弛過重、線數不足，或期待一次等同手術有關。所以看評價時，最好一併看個案原本的鬆弛程度、治療部位與術後時間點。",
    },
    {
      q: "做完 ULFIT HIFU 要注意咩？",
      a: "術後護理以溫和、保濕、防曬為主。建議當天避免大力按摩、刮痧、焗桑拿、蒸面及劇烈運動；若有輕微紅熱、痠麻或緊繃感，多屬正常過渡反應。日間請做好 SPF 50+ 防曬，亦要避免短期內再進行過度刺激的果酸、激光或高熱療程，讓組織有足夠時間完成重組。ULFIT 雖然恢復期低，但不代表術後可以完全忽略保養，穩定的修復環境會直接影響效果表現。",
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
        <motion.h2
          variants={fadeUp}
          className="text-2xl md:text-3xl font-black text-gray-900 mb-10"
          style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}
        >
          ULFIT HIFU 常見問題 FAQ
        </motion.h2>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-5 text-left hover:bg-gray-50 transition-colors duration-150"
                aria-expanded={openIndex === i}
              >
                <span className="font-bold text-gray-900 text-sm md:text-base leading-snug">
                  {faq.q}
                </span>
                <ChevronDown
                  size={20}
                  className={`flex-shrink-0 text-[#C52B21] transition-transform duration-300 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
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
// SECTION 14: RELATED TREATMENTS
// ─────────────────────────────────────────────────────────────
function RelatedSection() {
  const related = [
    {
      href: "/treatments/btl-exion",
      emoji: "💎",
      gradient: "from-blue-200 via-indigo-100 to-violet-50",
      accentColor: "#4f46e5",
      tag: "無創緊緻",
      title: "BTL Exion 膠原槍",
      desc: "配合 ULFIT HIFU 使用，激生 +224% 透明質酸補充組織飽滿度，提升效果更立體",
      cta: "試做 HK$680",
      imgSrc: null as string | null,
    },
    {
      href: "/treatments/sylfirm-x",
      emoji: "⚡",
      gradient: "from-rose-200 via-pink-100 to-red-50",
      accentColor: "#C52B21",
      tag: "微針電波",
      title: "Sylfirm X 雙波黃金微針",
      desc: "從真皮層刺激膠原，與 ULFIT HIFU 配合形成由內至外的全層緊緻效果",
      cta: "試做 HK$1,880",
      imgSrc: null as string | null,
    },
    {
      href: "/treatments/hollywood-spectra-laser",
      emoji: "✨",
      gradient: "from-amber-200 via-yellow-100 to-orange-50",
      accentColor: "#d97706",
      tag: "美白激光",
      title: "Hollywood Spectra 膠原激光",
      desc: "HIFU 提升輪廓之後，配合激光提亮膚色，內外兼修達到全面年輕化",
      cta: "試做 HK$880",
      imgSrc: null as string | null,
    },
  ];

  return (
    <AnimatedSection id="related" className="py-12 md:py-16 px-4 bg-[#FAFAFA]">
      <div className="max-w-4xl mx-auto">
        <motion.h3 variants={fadeUp} className="text-xl font-black text-gray-900 mb-2">
          相關療程推薦
        </motion.h3>
        <motion.p variants={fadeUp} className="text-gray-400 text-sm mb-8">
          配合使用，效果更全面
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {related.map((item) => (
            <motion.div
              key={item.href}
              variants={scaleIn}
              whileHover={{ y: -6, transition: { duration: 0.22 } }}
              className="group"
            >
              <Link
                href={item.href}
                className="block bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  {item.imgSrc ? (
                    <Image
                      src={item.imgSrc}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  ) : (
                    <div
                      className={`w-full h-full bg-gradient-to-br ${item.gradient} flex flex-col items-center justify-center gap-2 transition-transform duration-500 group-hover:scale-105`}
                    >
                      <span className="text-5xl drop-shadow-sm select-none">{item.emoji}</span>
                      <span
                        className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full text-white"
                        style={{ background: item.accentColor }}
                      >
                        {item.tag}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white/50 to-transparent pointer-events-none" />
                </div>

                <div className="px-4 pt-3.5 pb-4">
                  <div
                    className="w-6 h-[2.5px] rounded-full mb-2.5 transition-all duration-300 group-hover:w-10"
                    style={{ background: item.accentColor }}
                  />
                  <strong className="block text-gray-900 text-[13px] font-bold mb-1 leading-snug group-hover:text-[#C52B21] transition-colors">
                    {item.title}
                  </strong>
                  <p className="text-gray-500 text-xs leading-relaxed mb-3">{item.desc}</p>
                  <span
                    className="inline-flex items-center gap-1 text-xs font-bold"
                    style={{ color: item.accentColor }}
                  >
                    → {item.cta}
                  </span>
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
// SECTION 15: FINAL CTA
// ─────────────────────────────────────────────────────────────
function FinalCTASection() {
  return (
    <section
      id="final-cta"
      className="py-16 px-4 text-center"
      style={{
        background: "linear-gradient(135deg, #f5f0ff 0%, #fdf8ff 100%)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
        className="max-w-2xl mx-auto"
      >
        <h2
          className="text-2xl md:text-3xl font-black text-gray-900 mb-3"
          style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}
        >
          準備好告別面部鬆弛、雙下巴了嗎？
        </h2>
        <p className="text-gray-500 text-base md:text-lg mb-8 leading-relaxed">
          免費 VISIA 皮膚深層分析 + 零壓力專業諮詢
          <br />
          新客試做價{" "}
          <strong className="text-[#C52B21]">HK$1,480</strong>（500條線），明碼實價，絕無隱藏消費
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
// STICKY NAV (desktop only)
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

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

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
// DEFAULT EXPORT — compose all sections
// ─────────────────────────────────────────────────────────────
export default function UlfitHifuClient() {
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
