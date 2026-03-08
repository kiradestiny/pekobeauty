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
  "https://wa.me/85253353313?text=Hi%20Peko%2C%20我想查詢%20Venus%20Glow%20深層煥膚試做優惠";
const WA_BOOKING =
  "https://wa.me/85253353313?text=Hi%20Peko%2C%20我想預約%20Venus%20Glow%20深層煥膚試做，請問有咩時間？";

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
  text = "💬 WhatsApp 預約試做 — HK$480",
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
    "🇮🇱 以色列 Venus Concept 專利技術",
    "🇺🇸 美國 FDA Class I 認證",
    "🇪🇺 歐盟 CE 認證",
    "🧴 即棄治療頭零細菌殘留",
    "🚫 絕無硬銷",
  ];

  const stats = [
    { val: "0/10", label: "零痛感零紅腫" },
    { val: "70μm", label: "超細水柱（比頭髮幼）" },
    { val: "零", label: "恢復期即刻化妝" },
  ];

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-b from-[#f0fdf8] to-white pt-20"
    >
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: EASE_OUT }}
        className="relative w-full aspect-[16/9] md:aspect-[16/7] overflow-hidden"
      >
        <Image
          src="/images/peko-beauty-reception-desk-mong-kok.jpg"
          alt="Peko Beauty Venus Glow 多極RF PEMF 三合一深層煥膚護理 旺角朗豪坊醫美中心"
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
            🌟 新客試做 HK$480
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
          Venus Glow 香港｜「吸、噴、注」三合一毛孔水漾護理
          <br />
          <span className="text-[clamp(16px,3vw,28px)] font-bold text-gray-600">
            黑頭粉刺 · 毛孔粗大 · 士多啤梨鼻
            <span className="hidden sm:inline"> — </span>
            <br className="sm:hidden" />
            比針清更衛生 · 即棄治療頭 · FDA Class I 認證
          </span>
          <br />
          <span className="text-[clamp(14px,2.5vw,22px)] font-black" style={{ color: BRAND_RED }}>
            零痛感 · 零恢復期 · 新客試做 HK$480｜旺角朗豪坊
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
          以色列 Venus Concept 專利「吸、噴、注」三合一微米水漾技術，即棄式治療頭 + 70 微米超細噴柱，真空負壓吸走黑頭粉刺、水柱溶解老廢角質、客製精華直達肌底。
          <span className="hidden md:inline">比傳統針清衛生 10 倍，FDA Class I + CE 雙重認證，零痛感零恢復期，即做即走，全膚質均適用。</span>
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
      emoji: "🫧",
      tag: "毛孔堵塞",
      title: "毛孔長期堵塞，清潔再認真都無用",
      desc: "角栓、油脂、化妝品殘留在毛孔深層，普通潔面乳根本清不到。毛孔越堵越大，形成惡性循環，導致暗瘡、粉刺反覆出現。",
      imgSrc: null as string | null,
      gradient: "from-teal-200 via-cyan-100 to-sky-50",
      accentColor: "#0891b2",
    },
    {
      emoji: "💧",
      tag: "皮膚缺水",
      title: "護膚品塗再多，皮膚依然乾燥缺水",
      desc: "皮膚屏障受損後，透明質酸及水分從真皮層大量流失。外塗的保濕品只能暫時補充表面水分，無法深入真皮層補充流失的「內在水」。",
      imgSrc: null as string | null,
      gradient: "from-blue-200 via-sky-100 to-indigo-50",
      accentColor: "#3b82f6",
    },
    {
      emoji: "😔",
      tag: "膚色暗啞",
      title: "角質堆積，膚色暗黃護膚品難以吸收",
      desc: "老化角質在皮膚表層堆積，令膚色暗啞不均，更嚴重影響護膚品的滲透吸收。花大錢買精華液，大部分停留在死皮上根本無法發揮作用。",
      imgSrc: null as string | null,
      gradient: "from-amber-200 via-orange-100 to-yellow-50",
      accentColor: "#d97706",
    },
    {
      emoji: "😞",
      tag: "膠原流失",
      title: "皮膚開始失去彈感，觸摸沒有以前緊實",
      desc: "25 歲後膠原蛋白每年天然流失，皮膚觸感逐漸變得鬆軟，臉頰按下去少了以前的彈感，細紋隱隱出現。普通護膚品無法真正刺激真皮層自行增生膠原。",
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
            護膚品再貴，若皮膚底層問題未解決，效果永遠事倍功半⋯⋯
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

        <motion.div variants={fadeUp} className="text-center mt-10 md:mt-12 px-4 py-7 rounded-2xl bg-white border border-red-100 shadow-sm">
          <p className="text-lg md:text-xl font-black text-[#C52B21] leading-relaxed mb-1">
            護膚品用再多都無效？<br />因為你一直在治標，唔係治本。
          </p>
          <p className="text-sm text-gray-400 mt-2">
            根源在於皮膚深層的清潔不足、水分鎖不住及膠原流失——而 Venus Glow 三合一技術正是從這三個根源同步介入。
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
      <p>💡 Venus Glow 毛孔水漾護理最直接答案：</p>
      <p>
        Venus Glow™ 是以色列 Venus Concept 專利「吸、噴、注」三合一微米水漾技術，採用獨家即棄式治療頭 + 70 微米超細噴柱（比頭髮還幼）。真空負壓「吸」走毛孔内黑頭油脂，360° 旋轉水柱「噴」溶解老廢角質，開放通道「注」入客製化精華直達肌底。美國 FDA Class I 認證 + 歐盟 CE 認證，比傳統針清更衛生（每次即棄治療頭零細菌殘留），零痛感零恢復期，第一次後即見皮膚提亮清爽。Peko Beauty 旺角朗豪坊新客試做價 HK$480，含免費 VISIA 分析。
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 4: KEY TAKEAWAYS (GEO)
// ─────────────────────────────────────────────────────────────
function KeyTakeawaysSection() {
  const items = [
    { label: "產品定位", text: "Venus Glow™ 係以色列 Venus Concept 專利「吸噴注」三合一微米水漾技術，並非 RF/PEMF 射頻儀器，而是升級版智能毛孔水療機" },
    { label: "三步驟技術", text: "①「吸」：真空負壓吸走黑頭油脂；②「噴」：70μm 超細水柱溶解老廢角質；③「注」：即時導入客製精華直達肌底" },
    { label: "核心衛生優勢", text: "獨家即棄式治療頭逐客更換，零細菌殘留，比傳統針清衛生 10 倍，不引起感染發炎" },
    { label: "認證", text: "美國 FDA Class I 認證（motorized dermabrasion device）+ 歐盟 CE 認證" },
    { label: "適合對象", text: "黑頭粉刺、毛孔粗大、士多啤梨鼻、暗啞缺水、需要護膚品吸收提升的 18–55 歲人士，敏感肌及頭皮清潔亦適用" },
    { label: "試做價", text: "HK$480（新客限定）", isLink: true },
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
// SECTION 5: TREATMENT STATS TABLE
// ─────────────────────────────────────────────────────────────
function TreatmentStatsSection() {
  const rows = [
    { icon: "⏱", label: "療程時間", value: "約 60 分鐘（含 VISIA 分析、深層清潔、吸噴注三步驟及護後保養）" },
    { icon: "😌", label: "痛感指數", value: "0/10 — 全程只有輕柔吸啜感 + 清涼水流，零痛感零灼熱零紅腫，絕大多數客人形容過程舒適放鬆如做普通護膚" },
    { icon: "🟢", label: "恢復期", value: "零恢復期 — 做完即刻化妝返工，無需請假，無任何泛紅、脫皮或不適" },
    { icon: "🧴", label: "治療頭衛生", value: "獨家即棄式治療頭，逐客更換，零細菌殘留——此點對暗瘡肌及敏感肌尤其重要，避免傳統工具交叉感染風險" },
    { icon: "📅", label: "建議次數", value: "4–6 次，每 2–4 週一次（建議前 4 次密集清潔周期；之後每月一次維持）" },
    { icon: "✅", label: "見效時間", value: "第 1 次後即見皮膚清爽通透，毛孔清走污垢後肉眼可見差異；治療頭上排出污垢即時可見" },
    { icon: "📆", label: "效果維持", value: "完成 4–6 次主療程後建議每月一次維持清潔周期，長期保持毛孔暢通清爽" },
    { icon: "🛡️", label: "認證", value: "🇺🇸 美國 FDA Class I 認證（motorized dermabrasion device）· 🇪🇺 歐盟 CE 認證 · 以色列 Venus Concept 原廠技術" },
  ];

  return (
    <AnimatedSection id="treatment-stats" className="py-10 md:py-14 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <motion.h2 variants={fadeUp} className="text-center text-2xl md:text-3xl font-black text-gray-900 mb-2" style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}>
          Venus Glow 療程數據一覽
        </motion.h2>
        <motion.p variants={fadeUp} className="text-center text-gray-400 text-sm mb-8">
          所有數字來自 Peko Beauty 朗豪坊診所真實臨床記錄及加拿大 Venus Concept 原廠數據
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
                <td className="px-5 py-5 font-black text-[#C52B21] text-2xl">HK$480（全面）</td>
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
          &ldquo;Venus Glow 係我最常推薦給初次接觸醫美護理、或者想做個徹底的皮膚更新的客人。原因很簡單：它既沒有痛，又沒有恢復期，而且三合一的效果係真實可以感受到的——客人做完之後通常第一句話係：&lsquo;皮膚摸落去軟咗好多&rsquo;，或者&lsquo;光燈照係咪皮膚真係亮了？&rsquo;。尤其係用 Venus Glow 做完之後即刻注入配對的精華液，搭配 PEMF 促進吸收，效果比單純厚塗護膚品高出好多倍——這才是我鍾意 Venus Glow 的地方，它讓護膚真正「有效」。&rdquo;
        </p>
        <p className="text-xs text-gray-400 mt-3">— Peko Beauty 資深治療師，旺角朗豪坊診所</p>
      </div>
      {!open && (
        <p className="md:hidden text-gray-500 italic text-xs line-clamp-2">
          &ldquo;Venus Glow 係我最常推薦給初次接觸醫美護理、或者想做個徹底皮膚更新的客人……&rdquo;
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
    { value: "0/10", label: "零痛感零紅腫" },
    { value: "70μm", label: "超細噴柱（比頭髮幼）" },
    { value: "即刻", label: "化妝返工零恢復期" },
    { value: "FDA", label: "Class I 美國認證" },
  ];

  return (
    <AnimatedSection id="science" className="py-10 md:py-14 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-black text-gray-900 mb-8" style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}>
          Venus Glow「吸、噴、注」原理完整拆解
          <br className="hidden sm:block" />
          <span className="text-lg font-semibold text-gray-500">以色列專利技術 · 即棄治療頭 · FDA Class I 認證</span>
        </motion.h2>

        <motion.h3 variants={fadeUp} className="text-lg font-bold text-[#C52B21] mb-3">
          ❶ 問題根源：點解普通清潔 + 護膚品無法解決毛孔黑頭？
        </motion.h3>
        <motion.div variants={fadeUp}>
          <ReadMoreText lines={3} className="text-gray-600 leading-[1.9] mb-5 text-[15px]">
            毛孔黑頭、粉刺、士多啤梨鼻的根本原因是皮脂、老化角質及化妝品殘留長期積累在毛孔底部，形成固態角栓。普通洗面乳只能清洗皮膚表面；居家毛孔吸塵器吸力不足，且重複使用的頭部有細菌殘留風險；傳統針清靠人手擠壓，容易造成皮膚損傷及發炎，甚至令毛孔更大。
          </ReadMoreText>
        </motion.div>
        <motion.div variants={fadeUp}>
          <ReadMoreText lines={3} className="text-gray-600 leading-[1.9] mb-8 text-[15px]">
            護膚品吸收效率差，關鍵原因就是皮膚表面有一層老化角質「封住」毛孔——即使是最貴的精華液，大部分也停留在死皮上無法滲透。Venus Glow 的「吸噴注」三步驟正是從根本清除這道屏障，並在毛孔最通暢的狀態下即時導入精華，令吸收效率倍增。
          </ReadMoreText>
        </motion.div>

        <motion.h3 variants={fadeUp} className="text-lg font-bold text-[#C52B21] mb-3">
          ❷ 三步驟技術：「吸」「噴」「注」各自做什麼？
        </motion.h3>
        {/* 桌面版：三欄技術卡片 */}
        <div className="hidden md:grid grid-cols-3 gap-4 mb-7">
          <motion.div variants={scaleIn} className="bg-teal-50 rounded-xl p-5 border border-teal-100">
            <div className="font-black text-teal-700 text-xl mb-1">① 真空負壓「吸」</div>
            <div className="text-xs font-semibold text-teal-600 mb-2 bg-teal-100 rounded-full px-2 py-0.5 inline-block">深層清走黑頭油脂</div>
            <p className="text-gray-600 text-sm leading-relaxed">
              醫療級真空負壓溫和吸走毛孔内油脂、黑頭粉刺及化妝品殘留。即棄式治療頭每客更換，<strong>零細菌殘留</strong>，比傳統針清衛生 10 倍。吸出的污垢在治療頭上<strong>即時可見</strong>，效果透明直觀。
            </p>
          </motion.div>
          <motion.div variants={scaleIn} className="bg-sky-50 rounded-xl p-5 border border-sky-100">
            <div className="font-black text-sky-700 text-xl mb-1">② 360° 水柱「噴」</div>
            <div className="text-xs font-semibold text-sky-600 mb-2 bg-sky-100 rounded-full px-2 py-0.5 inline-block">70μm 超細水柱去角質</div>
            <p className="text-gray-600 text-sm leading-relaxed">
              70 微米超細噴柱（比頭髮直徑還幼）以 360° 旋轉方式高速噴射生理鹽水，<strong>溫和溶解老廢角質</strong>連接，令死皮自然脫落，同時沖走吸出的毛孔污垢，全程無任何摩擦刺激。
            </p>
          </motion.div>
          <motion.div variants={scaleIn} className="bg-emerald-50 rounded-xl p-5 border border-emerald-100">
            <div className="font-black text-emerald-700 text-xl mb-1">③ 開放通道「注」</div>
            <div className="text-xs font-semibold text-emerald-600 mb-2 bg-emerald-100 rounded-full px-2 py-0.5 inline-block">客製精華直達肌底</div>
            <p className="text-gray-600 text-sm leading-relaxed">
              毛孔清潔後處於最開放通暢狀態，即時導入<strong>客製化精華液</strong>（透明質酸、維他命 C、胜肽等），讓精華直達真皮層被細胞利用，吸收效率遠高於普通塗抹的數倍。
            </p>
          </motion.div>
        </div>
        {/* 手機版：三欄簡化 */}
        <div className="md:hidden grid grid-cols-3 gap-2 mb-6">
          <div className="bg-teal-50 rounded-xl p-3 border border-teal-100 text-center">
            <div className="font-black text-teal-700 text-sm mb-1">① 吸</div>
            <p className="text-gray-500 text-[10px]">深清黑頭油脂</p>
          </div>
          <div className="bg-sky-50 rounded-xl p-3 border border-sky-100 text-center">
            <div className="font-black text-sky-700 text-sm mb-1">② 噴</div>
            <p className="text-gray-500 text-[10px]">70μm 水柱去角質</p>
          </div>
          <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-100 text-center">
            <div className="font-black text-emerald-700 text-sm mb-1">③ 注</div>
            <p className="text-gray-500 text-[10px]">客製精華直達肌底</p>
          </div>
        </div>
        <motion.div variants={fadeUp} className="hidden md:block">
          <ReadMoreText lines={2} className="text-gray-600 leading-[1.9] mb-10 text-[15px]">
            Venus Glow 最核心的差異化優勢有兩點：第一，<strong>即棄式治療頭</strong>（Disposable Applicator）每次使用全新治療頭，不僅衛生，亦確保吸力一致，是目前香港市場上零細菌殘留風險的毛孔護理方案；第二，<strong>精華注入效率</strong>遠超普通護膚——毛孔清潔後「開放注入」的精華吸收率遠高於日常塗抹，令 VISIA 前後對比差異明顯可見。
          </ReadMoreText>
        </motion.div>
        <div className="md:hidden mb-8" />

        <motion.h3 variants={fadeUp} className="text-lg font-bold text-[#C52B21] mb-5">
          ❸ 官方認證與臨床數據
        </motion.h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {stats.map((s) => (
            <motion.div key={s.label} variants={scaleIn} className="bg-red-50 rounded-xl p-5 text-center border border-red-100">
              <div className="text-3xl md:text-4xl font-black text-[#C52B21] leading-tight">{s.value}</div>
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
// SECTION 11: PRICING
// ─────────────────────────────────────────────────────────────
function PricingSection() {
  return (
    <AnimatedSection id="pricing" className="py-14 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-black text-gray-900 text-center mb-2" style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}>
          Venus Glow 香港收費一覽
        </motion.h2>
        <motion.p variants={fadeUp} className="text-center text-gray-400 text-sm mb-10">
          Peko Beauty 承諾：明碼實價，絕無隱藏收費，絕不硬銷升級
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div variants={scaleIn} className="relative border-2 border-[#C52B21] rounded-2xl p-7 text-center bg-white shadow-md">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-white text-xs font-bold px-5 py-1 rounded-full whitespace-nowrap" style={{ background: BRAND_RED }}>
              🌟 新客限定
            </div>
            <h3 className="text-lg font-bold text-gray-900 mt-3 mb-2">新客體驗方案</h3>
            <p className="text-gray-400 text-sm mb-5">
              Venus Glow 三合一全面護理<br />+ 免費 VISIA 皮膚深層分析
            </p>
            <div className="text-5xl font-black text-[#C52B21] leading-none mb-1">HK$480</div>
            <p className="text-gray-300 text-xs mb-6">市場參考價 HK$900+</p>
            <a href={WA_BOOKING} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full text-white font-bold rounded-lg px-6 py-4 text-base transition-all duration-200 hover:opacity-90 active:scale-[0.98]" style={{ background: BRAND_RED }}>
              💬 WhatsApp 立即預約
            </a>
          </motion.div>

          <motion.div variants={scaleIn} className="border-2 border-gray-200 rounded-2xl p-7 text-center bg-gray-50">
            <h3 className="text-lg font-bold text-gray-900 mb-2">療程套票方案</h3>
            <p className="text-gray-400 text-sm mb-5">
              根據 VISIA 分析個人化建議<br />（4 次 / 6 次套裝可選）
            </p>
            <div className="text-3xl font-black text-gray-600 leading-none mb-1">歡迎查詢</div>
            <p className="text-gray-300 text-xs mb-6">按個人膚質及需求次數報價</p>
            <a href="https://wa.me/85253353313?text=Hi%20Peko%2C%20我想查詢%20Venus%20Glow%20套票價錢" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full bg-gray-600 text-white font-bold rounded-lg px-6 py-4 text-base transition-all duration-200 hover:bg-gray-700 active:scale-[0.98]">
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
// SECTION 12: SUITABILITY
// ─────────────────────────────────────────────────────────────
function SuitabilitySection() {
  const suitable = [
    "黑頭粉刺、士多啤梨鼻、毛孔粗大（即棄治療頭深層清潔）",
    "皮膚缺水乾燥，護膚品塗再多都吸收不到",
    "膚色暗啞不均，需要整體提亮水光感",
    "敏感肌 / 初次接觸醫美，擔心儀器刺激性過強",
    "暗瘡肌（注意：非活躍性暗瘡），即棄頭避免交叉感染",
    "希望提升護膚品吸收效率，護膚品「真正有效」",
    "頭油旺盛、毛囊堵塞、頭皮屑困擾（可選頭皮護理）",
    "準新娘 / 大日子前急救，零恢復期完全不影響安排",
  ];
  const unsuitable = [
    "懷孕或哺乳期",
    "治療部位有活躍性感染、開放性傷口或活躍性暗瘡發炎",
    "皮膚最近進行過高能量換膚（如深度化學換膚）未癒合",
    "嚴重曬傷、皮膚急性敏感未消退",
    "正在使用口服 A 酸（Isotretinoin）治療暗瘡者",
    "對生理鹽水或護理中使用成分有過敏反應",
  ];

  return (
    <AnimatedSection id="suitability" className="py-14 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-black text-gray-900 mb-8" style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}>
          Venus Glow 適合咩人做？（包含禁忌症）
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div variants={scaleIn} className="bg-green-50 rounded-2xl p-6 border border-green-200">
            <h3 className="text-green-800 font-bold text-base mb-5 flex items-center gap-2">
              <CheckCircle size={20} className="text-green-600" />適合做 Venus Glow
            </h3>
            <ul className="space-y-3">
              {suitable.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-gray-700 text-sm">
                  <CheckCircle size={15} className="text-green-500 flex-shrink-0 mt-0.5" />{item}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div variants={scaleIn} className="bg-red-50 rounded-2xl p-6 border border-red-200">
            <h3 className="text-red-700 font-bold text-base mb-5 flex items-center gap-2">
              <XCircle size={20} className="text-red-500" />不建議做 Venus Glow
            </h3>
            <ul className="space-y-3">
              {unsuitable.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-gray-700 text-sm">
                  <XCircle size={15} className="text-red-400 flex-shrink-0 mt-0.5" />{item}
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
// SECTION 13: FAQ
// ─────────────────────────────────────────────────────────────
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "Venus Glow 係咩？係毛孔吸塵機嗎？點解同其他毛孔護理唔一樣？",
      a: "Venus Glow™ 是以色列 Venus Concept 的專利「吸、噴、注」三合一微米水漾技術，配備獨家即棄式治療頭及 70 微米超細噴柱（比頭髮直徑還幼），可理解為升級版「智能毛孔吸塵機」。療程包含三個同步進行的步驟：① 真空負壓「吸」——溫和吸走毛孔內油脂、黑頭粉刺、化妝品殘留；② 360° 旋轉水柱「噴」——高速霧化生理鹽水，溫和溶解老廢角質，同步沖走吸出的污垢；③ 開放通道「注」——即時高效導入客製化精華（維他命 C、抗氧化物、胜肽等），直達肌底。關鍵是即棄式治療頭——每次使用全新治療頭，零細菌殘留，比傳統針清衛生得多，且完全無創傷。",
    },
    {
      q: "Venus Glow 吸噴注原理係咩？70 微米係幾細？",
      a: "人類頭髮平均直徑約 70–100 微米，即 Venus Glow 的水柱跟頭髮粗幼相約，遠比傳統洗臉機或家用毛孔吸塵器的水流更精細均勻。這條精細水柱以 360° 旋轉方式高速噴射生理鹽水，一方面溶解老化角質連接（令死皮自然脫落），另一方面沖洗真空吸出的毛孔污垢；吸走污垢的同時，毛孔通道處於最開放清潔的狀態，正是導入精華的最佳時機——精華液吸收率遠高於正常護膚程序。整個「吸噴注」三步驟同步進行，才是令 Venus Glow 跟一般家用吸塵機或洗臉儀截然不同的核心原因。",
    },
    {
      q: "Venus Glow 真係可以吸走黑頭粉刺嗎？士多啤梨鼻有效嗎？",
      a: "對，Venus Glow 的真空負壓設計正是針對黑頭粉刺問題。傳統護膚品或居家吸黑頭儀的吸力有限，通常只能清走表面開放性粉刺；Venus Glow 的醫療級真空負壓配合 70 微米水柱同步溶解角栓，可更徹底清走毛孔底部油脂栓塞。士多啤梨鼻（鼻翼毛孔粗大、佈滿黑頭）通常因 T 區皮脂旺盛加上角質堆積形成，Venus Glow 對這個部位特別有效——每次療程結束後，排出的污垢可在即棄治療頭上即時可見，很多客人第一次看到「成果」都相當驚訝。建議至少 3–4 次形成規律清潔周期，令毛孔持續改善。",
    },
    {
      q: "Venus Glow 有咩副作用？做完毛孔會唔會變大？有冇後遺症？",
      a: "Venus Glow 是目前市場上副作用最少的毛孔深層護理之一。常見反應：療程過程只有輕柔吸啜感及清涼水流，零痛感、零紅腫、零脫皮；做完可即刻化妝返工，屬真正「零恢復期」護理。極少數超敏感肌可能有數小時輕微泛紅，亦會自然消退。關於「做完毛孔會唔會變大」：Venus Glow 採用物理水力清潔而非擠壓或刺穿方式，不會像傳統針清因操作不當令毛孔撐大；加上即棄治療頭確保零細菌殘留，不引起後續感染發炎。長期規律護理反而有助毛孔保持清爽、外觀縮小，不存在「愈做愈差」的後遺症。",
    },
    {
      q: "Venus Glow vs 傳統針清，邊個更好？邊個更安全？",
      a: "從衛生與安全角度，Venus Glow 遠優於傳統人手針清。傳統針清依靠人手擠壓毛孔，容易因力度不均或工具消毒不足引起皮膚細菌感染、敏感發炎，甚至擠出更大的凹洞；過程較痛，容易留下暫時性紅印及毛孔擴張。Venus Glow 以真空吸力及水柱物理方式清走污垢，治療頭即棄，全程無接觸式擠壓，零痛感、零風險；做完毫無紅腫可即刻出門。效果方面，Venus Glow 同時注入精華補充皮膚，針清則純粹清潔，對同時想補水保濕的客人 Venus Glow 更全面。唯一針清仍有優勢的情況：超固化的閉口粉刺（粉刺頭封閉）有時仍需配合人手輔助。",
    },
    {
      q: "Venus Glow vs HydraFacial，香港人應該點揀？",
      a: "兩者核心概念相似（深層清潔 + 精華注入），但有幾個差異值得注意。HydraFacial 是美國知名品牌，以漩渦式水流清潔 + 精華導入為主，市場認知度較高；Venus Glow 以 Venus Concept 的「吸噴注」三步驟設計，70 微米精細水柱配合真空負壓，在清潔徹底度及即棄衛生標準上有其特點，且能在治療頭上即時可見吸出污垢（直觀感受）。選擇建議：若你重視品牌知名度及已習慣 HydraFacial 節奏，繼續是合理選擇；若你想體驗更精細毛孔深層清潔方式、強調即棄衛生及低試做門檻，Venus Glow HK$480 試做是個別中心更具性價比的選項。兩者都屬零恢復期護理，差距不如廣告般巨大，性價比往往才是香港客人最實際的考量。",
    },
    {
      q: "敏感肌 / 暗瘡肌做 Venus Glow 合適嗎？Venus Glow 水漾活膚係咩？",
      a: "Venus Glow 非常適合敏感肌及暗瘡肌，原因有三：第一，全程無酸性化學成分，不刺激敏感皮膚神經；第二，即棄治療頭每次更換新頭，對暗瘡肌尤其重要（避免細菌交叉感染）；第三，客製化精華液可根據膚況選擇抗炎、舒緩或補水型配方，而非一刀切。「Venus Glow 水漾活膚」即是指導入保濕系精華（玻尿酸、維他命 B5 等），特別適合乾性或缺水膚況，讓皮膚做完後立即呈現飽水透亮感。注意：有活躍性暗瘡（有膿頭）建議先治療皮膚炎症再做 Venus Glow；若只是閉口粉刺或毛孔堵塞問題則可正常進行。",
    },
    {
      q: "Venus Glow 可以清潔頭皮嗎？對頭油、毛囊堵塞有效嗎？",
      a: "可以，Venus Glow 的「吸噴注」技術亦可用於頭皮清潔護理，針對頭油旺盛、毛囊堵塞、頭皮屑過多等問題。頭皮的皮脂腺分佈與面部類似，Venus Glow 的真空吸力配合細水柱可清走累積在毛囊口的皮脂、頭油及老化角質，同時導入針對頭皮的成分（控油、舒緩、防脫落類精華）。定期頭皮 Venus Glow 可改善頭油分泌過旺、頭皮癢及毛囊堵塞導致的掉髮前兆。需要頭皮護理的客人請在預約時事先說明，治療師會準備相應的頭部治療配件及精華配方。",
    },
    {
      q: "做完 Venus Glow 可以即刻化妝嗎？零恢復期係真嗎？",
      a: "係，「零恢復期、即刻化妝」是 Venus Glow 最核心的優勢之一，並非誇大宣傳。療程採用物理水力清潔方式，不涉及酸蝕、針刺或能量熱療，做完後皮膚除了感覺清爽外，通常完全無任何泛紅或不適，可以直接補妝出門。部分客人更會在做完後素顏已有水潤光澤感，直接返工見客。唯一建議：做完當日選用輕薄底妝讓毛孔有最大呼吸空間，保持清潔效果更持久。",
    },
    {
      q: "Venus Glow 幾多次先見效？完整療程需要做幾耐？",
      a: "大部分客人第一次做完後即見皮膚清爽光滑、毛孔縮細及膚色通透，這是「吸噴注」即時清走毛孔污垢並同步導入精華的直接效果。完整療程建議 4–6 次，每 2–4 週一次，總周期約 2–4 個月；之後可改為每月一次維持清潔周期，令毛孔長期保持暢通。對有頑固黑頭或油脂旺盛的客人，前 4 次密集清潔周期尤其重要，讓角栓清走後皮膚有時間完成代謝穩定，而不是一清走即快速再堵回。",
    },
    {
      q: "Venus Glow 香港邊間好？點分辨正貨中心推薦？",
      a: "搜尋「Venus Glow 推薦香港」，最實際的判斷重點有四件事：第一，是否使用 Venus Concept 原廠儀器及每次更換即棄式治療頭（若中心重複使用治療頭則衛生有隱患）；第二，是否在療程前做皮膚分析並根據膚況客製化精華；第三，是否能清楚解釋「吸噴注」三步驟，而非只說「水飛梭」；第四，收費是否透明，有沒有術後跟進。Peko Beauty 目前主打即棄治療頭、免費 VISIA 分析及零硬銷流程，這些都是判斷一間中心是否可靠的基本指標，重要性高於單純比較哪間最平。",
    },
    {
      q: "Venus Glow 評價如何？真實客人通常最在意咩效果？",
      a: "Venus Glow 的真人評價通常集中在三件事：第一，黑頭有沒有明顯被吸走，鼻翼 / T 區看上去更乾淨；第二，妝容服貼度是否有改善，底妝不再「浮」在皮膚表面而是更服貼；第三，療程過程是否舒適，做完能否立刻返工見客。若評價偏正，常見是「第一次做完即見排出的黑頭，很有成就感」或「做完素顏明顯透亮了」；若有評價一般，多數與對效果維持時間的期望有關（維持時長受個人出油量及清潔習慣影響）。效果長期穩定需要定期護理，不能期望一次永久解決毛孔問題。",
    },
    {
      q: "Venus Glow 香港試做價幾多？包含咩內容？",
      a: "Peko Beauty 旺角朗豪坊 Venus Glow 新客試做價為 HK$480（全面三合一護理），包含：免費 VISIA 皮膚深層分析、即棄式治療頭全面療程、根據膚況選配的客製化精華液導入，以及療程後 WhatsApp 48 小時跟進。到店後無需即場決定購買套票，無最低消費，絕無隱藏附加費。市場同類毛孔水療護理參考價 HK$900+。",
    },
    {
      q: "做完 Venus Glow 要注意咩？",
      a: "術後護理非常日常，主要四點：第一，全日做好 SPF 50+ 防曬；第二，加強保濕，可使用療程中導入精華的同款保濕品加強鞏固效果；第三，24 小時內避免高溫環境（桑拿、熱瑜伽、蒸面）；第四，當天可正常化妝，建議選輕薄底妝讓毛孔繼續呼吸、保持清潔效果更持久。Venus Glow 的零恢復期特點令術後護理相當簡單，維持正常生活節奏即可，比傳統換膚術後護理要求低得多。",
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
          Venus Glow 常見問題 FAQ
        </motion.h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div key={i} variants={fadeUp} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full flex items-center justify-between gap-4 px-5 py-5 text-left hover:bg-gray-50 transition-colors duration-150" aria-expanded={openIndex === i}>
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
// SECTION 14: RELATED TREATMENTS
// ─────────────────────────────────────────────────────────────
function RelatedSection() {
  const related = [
    {
      href: "/treatments/xe-lha-peel",
      emoji: "✨",
      gradient: "from-orange-200 via-amber-100 to-yellow-50",
      accentColor: "#d97706",
      tag: "鹼性煥膚",
      title: "XE-LHA Peel 鹼性煥膚",
      desc: "Venus Glow 之前先做 XE-LHA 鹼性煥膚去除舊角質，令精華注入吸收效率大幅提升",
      cta: "試做 HK$980",
      imgSrc: null as string | null,
    },
    {
      href: "/treatments/sylfirm-x",
      emoji: "⚡",
      gradient: "from-rose-200 via-pink-100 to-red-50",
      accentColor: "#C52B21",
      tag: "微針電波",
      title: "Sylfirm X 雙波黃金微針",
      desc: "深層修復凹凸洞，配合 Venus Glow 的膠原刺激，雙重加乘緊緻提升",
      cta: "試做 HK$1,880",
      imgSrc: null as string | null,
    },
    {
      href: "/treatments/hollywood-spectra-laser",
      emoji: "🌟",
      gradient: "from-yellow-200 via-lime-100 to-green-50",
      accentColor: "#65a30d",
      tag: "美白激光",
      title: "Hollywood Spectra 膠原激光",
      desc: "Venus Glow 補水提亮後配合激光去斑，由內至外全方位嫩膚美白",
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
// SECTION 15: FINAL CTA
// ─────────────────────────────────────────────────────────────
function FinalCTASection() {
  return (
    <section id="final-cta" className="py-16 px-4 text-center" style={{ background: "linear-gradient(135deg, #f0fdf8 0%, #f5fff9 100%)" }}>
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
        className="max-w-2xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 text-xs font-bold text-[#C52B21] bg-red-50 border border-red-100 rounded-full px-4 py-1.5 mb-4">
          🇺🇸 FDA Class I 認證 · 🇮🇱 以色列 Venus Concept 專利 · 即棄治療頭零細菌
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-3" style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}>
          準備體驗「吸噴注」深層毛孔水漾護理嗎？
        </h2>
        <p className="text-gray-500 text-base md:text-lg mb-8 leading-relaxed">
          免費 VISIA 皮膚深層分析 + 即棄治療頭 + 零壓力專業諮詢<br />
          FDA Class I 認證正貨 · 新客試做價 <strong className="text-[#C52B21]">HK$480</strong> · 做完即刻化妝返工
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
            <button key={item.id} onClick={() => scrollTo(item.id)} className="text-xs font-semibold text-gray-500 hover:text-[#C52B21] transition-colors duration-150 pb-0.5 border-b-2 border-transparent hover:border-[#C52B21]">
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// DEFAULT EXPORT
// ─────────────────────────────────────────────────────────────
export default function VenusGlowClient() {
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
// SECTION 7: PROCESS
// ─────────────────────────────────────────────────────────────
function ProcessSection() {
  const steps = [
    { num: 1, title: "WhatsApp 預約 / 網上預約", desc: "透過 WhatsApp +852 5335 3313 預約，客服會在 24 小時內確認時間。建議提前最少 1 天預約，熱門時段（週五晚、週六）建議提前 3–5 天。" },
    { num: 2, title: "到店 + 免費 VISIA 皮膚深層分析", desc: "到達朗豪坊 40 樓後，資深治療師先以 VISIA 儀器進行免費深層分析，評估毛孔狀況、皮膚水分含量、角質厚度及膠原密度，以科學數據為 Venus Glow 的精華配方選擇提供依據。" },
    { num: 3, title: "個人化方案制定（零硬銷）", desc: "治療師根據 VISIA 數據，說明最適合的 Venus Glow 精華液配方（保濕型 / 美白型 / 修復型等）及建議次數。Peko Beauty 承諾：如療程唔適合你，我們會如實告知。" },
    { num: 4, title: "深層清潔 → Venus Glow「吸噴注」三步驟護理（即棄治療頭）", desc: "深層潔面後，治療師更換全新即棄式治療頭，全面進行「真空負壓吸 + 360° 水柱噴 + 精華通道注」三步驟，全程只有輕柔吸啜感及清涼水流，完全無痛。吸出的毛孔污垢在治療頭上即時可見，整個過程約 40–50 分鐘。" },
    { num: 5, title: "舒緩面膜 + 護理指引 + WhatsApp 跟進", desc: "護理後敷上針對性舒緩或保濕面膜，皮膚即刻顯現提亮效果。治療師說明護理後注意事項（防曬、保濕），並透過 WhatsApp 在 48 小時內跟進膚況。" },
  ];

  return (
    <AnimatedSection id="process" className="py-14 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-black text-gray-900 text-center mb-12" style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}>
          在 Peko Beauty 做 Venus Glow 係咩流程？
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
// SECTION 8: COMPARISON TABLE (Desktop only)
// ─────────────────────────────────────────────────────────────
function ComparisonSection() {
  const rows = [
    { feature: "核心技術", venus: "「吸噴注」三合一微米水漾", facial: "擠壓針清 + 人手清潔", hydra: "水飛梭漩渦式水流清潔" },
    { feature: "官方認證", venus: "🇺🇸 FDA Class I + 🇪🇺 CE", facial: "無統一認證", hydra: "FDA 認可（品牌層面）", highlight: true },
    { feature: "治療頭衛生", venus: "✅ 即棄頭逐客更換（零細菌）", facial: "❌ 共用工具（消毒後使用）", hydra: "⚠️ 視乎診所", highlight: true },
    { feature: "痛感", venus: "0/10 零痛感", facial: "3–5/10 擠壓不適", hydra: "1/10" },
    { feature: "恢復期", venus: "✅ 零恢復期即刻化妝", facial: "⚠️ 可能泛紅 1–2 天", hydra: "✅ 零恢復期" },
    { feature: "深層毛孔清潔", venus: "✅ 70μm 水柱 + 真空負壓", facial: "✅ 人手擠壓（創傷風險）", hydra: "✅ 水力旋渦清潔", highlight: true },
    { feature: "精華深層注入", venus: "✅ 即時通道注入", facial: "❌ 無精華注入", hydra: "✅ 有（精華種類較固定）", highlight: true },
    { feature: "客製化精華", venus: "✅ VISIA 分析後按膚質配對", facial: "❌ 否", hydra: "⚠️ 套裝精華（非客製）", highlight: true },
    { feature: "VISIA 科學分析", venus: "✅ 含免費分析", facial: "❌ 否", hydra: "⚠️ 視乎診所" },
    { feature: "試做價", venus: "HK$480", facial: "HK$200+", hydra: "HK$680+", isPrice: true },
  ];

  return (
    <AnimatedSection id="comparison" className="hidden md:block py-14 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-black text-gray-900 mb-2" style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}>
          Venus Glow vs 傳統針清 vs HydraFacial 類護理
        </motion.h2>
        <motion.p variants={fadeUp} className="text-gray-400 text-sm mb-8">
          以下比較基於 Peko Beauty 真實臨床數據，幫助你做出最適合自己膚質的選擇。
        </motion.p>
        <motion.div variants={scaleIn} className="overflow-x-auto rounded-2xl shadow-lg">
          <table className="w-full border-collapse min-w-[560px]">
            <thead>
              <tr className="bg-gray-900 text-white">
                <th className="py-4 px-4 text-left text-xs font-bold w-[22%]">比較項目</th>
                <th className="py-4 px-4 text-center text-xs font-bold w-[26%]" style={{ background: BRAND_RED }}>
                  ⭐ Venus Glow<br /><span className="font-normal opacity-80 text-[10px]">(Peko Beauty)</span>
                </th>
                <th className="py-4 px-4 text-center text-xs font-bold w-[26%]">傳統水療護理</th>
                <th className="py-4 px-4 text-center text-xs font-bold w-[26%]">HydraFacial 類</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.feature} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-4 py-3.5 font-semibold text-gray-800 text-xs border-b border-gray-100">{row.feature}</td>
                  <td className={`px-4 py-3.5 text-center text-xs border-b border-gray-100 font-semibold bg-red-50/60 ${row.isPrice ? "text-xl font-black text-[#C52B21]" : row.highlight ? "text-green-700" : "text-[#C52B21]"}`}>{row.venus}</td>
                  <td className="px-4 py-3.5 text-center text-xs text-gray-500 border-b border-gray-100">{row.facial}</td>
                  <td className="px-4 py-3.5 text-center text-xs text-gray-500 border-b border-gray-100">{row.hydra}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
        <motion.div variants={fadeUp} className="mt-6 bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-5">
          <p className="text-sm md:text-[15px] text-gray-700 leading-relaxed">
            <strong className="text-gray-900">🎯 Peko 建議：</strong>
            如果你主要想解決<strong>黑頭粉刺、毛孔粗大、士多啤梨鼻</strong>，同時想要比傳統針清更衛生安全、比 HydraFacial 更客製化，Venus Glow「吸噴注」即棄頭 + FDA Class I 認證係最均衡的選擇。唔確定？
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="text-[#C52B21] font-bold underline underline-offset-2 ml-1">WhatsApp 我們查詢</a>，零壓力。
          </p>
        </motion.div>
        <motion.div variants={fadeUp} className="text-center mt-10">
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 text-white font-bold rounded-lg px-6 py-4 text-base transition-all duration-200 hover:opacity-90 hover:shadow-lg active:scale-[0.98]" style={{ background: BRAND_RED }}>
            👉 查看 Venus Glow 試做優惠 HK$480
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
      quote: "做完 Venus Glow 之後皮膚立刻軟滑咗，用手背觸碰臉的時候差距係真實可感受到的。我一直有嚴重毛孔問題，做完 4 次之後毛孔細咗很多，而且護膚品吸收效果明顯好咗，感覺花同樣的錢買護膚品但效果翻倍。整個護理過程非常舒服放鬆，治療師全程細心，無任何硬銷壓力。",
      name: "B 小姐",
      age: "27歲",
      concern: "毛孔粗大 + 護膚品吸收差",
      treatment: "Venus Glow × 4 次",
    },
    {
      quote: "我係敏感肌，一直擔心做儀器護理會刺激皮膚。Venus Glow 整個過程只係溫熱舒適感，完全無刺激。做完後皮膚水潤感維持好長時間，膚色也明顯比之前均勻。治療師根據我的 VISIA 分析結果配搭了修復型精華，感覺非常貼心專業，之後已預約了第 3 次。",
      name: "M 小姐",
      age: "33歲",
      concern: "敏感肌 + 皮膚缺水暗啞",
      treatment: "Venus Glow × 3 次",
    },
  ];

  const socialStats = [
    { value: "95%", label: "皮膚水潤提升率" },
    { value: "5,000+", label: "真實好評" },
    { value: "92%", label: "客人整體滿意度" },
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
              <div className="relative h-44 bg-gradient-to-br from-teal-50 to-emerald-50">
                <Image src="/images/peko-beauty-reception-desk-mong-kok.jpg" alt={`Peko Beauty Venus Glow 效果 ${t.concern}`} fill className="object-cover opacity-80" sizes="(max-width: 768px) 100vw, 50vw" />
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
        <motion.div variants={scaleIn} className="bg-red-50 rounded-2xl py-6 px-8 flex flex-wrap justify-center gap-8 text-center border border-red-100">
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
// SECTION 10: TRUST SIGNALS
// ─────────────────────────────────────────────────────────────
function TrustSection() {
  const pillars = [
    {
      Icon: Award,
      title: "認證 & 衛生信任",
      items: [
        "🇺🇸 美國 FDA Class I 認證（motorized dermabrasion device）",
        "🇪🇺 歐盟 CE 認證",
        "🇮🇱 以色列 Venus Concept 原廠正貨技術",
        "獨家即棄式治療頭，逐客更換，零細菌殘留",
        "比傳統針清衛生 10 倍，無交叉感染風險",
      ],
    },
    {
      Icon: Users,
      title: "服務信任",
      items: [
        "全女班資深治療師主理",
        "零硬銷承諾（唔適合就唔做）",
        "明碼實價，絕無隱藏收費",
        "免費 VISIA 深層分析 + VISIA 即時客製精華配對",
        "術後 48 小時 WhatsApp 主動跟進",
      ],
    },
    {
      Icon: ThumbsUp,
      title: "效果信任",
      items: [
        "零痛感、零恢復期，即刻化妝返工",
        "首次後即見皮膚清爽通透（治療頭可見排出污垢）",
        "5,000+ 真實好評（Google + 社交媒體）",
        "VISIA 前後對比追蹤，效果有科學數據支撐",
        "敏感肌 / 暗瘡肌亦可安全使用",
      ],
    },
  ];

  return (
    <AnimatedSection id="why-peko" className="py-10 md:py-14 px-4 bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <motion.h2 variants={fadeUp} className="text-center text-2xl md:text-3xl font-black text-white mb-2" style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}>
          點解旺角客人揀 Peko Beauty 做 Venus Glow？
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

// ─────────────────────────────────────────────────────