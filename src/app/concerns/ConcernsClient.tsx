"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Layers, Focus, Activity, Target, ShieldCheck, Heart, Sparkles, Eye, Zap } from "lucide-react";

const concerns = [
  {
    id: "pores-wrinkles",
    href: "/concerns/pores-wrinkles",
    icon: <Layers size={28} />,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    accentColor: "from-orange-400 to-amber-500",
    borderHover: "hover:border-orange-300",
    title: "凹凸洞 / 深層皺紋",
    subtitle: "Pores & Deep Wrinkles",
    description: "暗瘡留下的凹陷痕跡、毛孔粗大，或歲月累積的深層皺紋，影響肌膚質感與整體外觀。",
    symptoms: ["冰錐型凹陷", "滾輪型凹陷", "深層皺紋", "毛孔粗大"],
    topTreatment: "Sylfirm X 矽谷電波",
  },
  {
    id: "pigmentation",
    href: "/concerns/pigmentation",
    icon: <Focus size={28} />,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-500",
    accentColor: "from-purple-400 to-violet-500",
    borderHover: "hover:border-purple-300",
    title: "色斑 / 荷爾蒙斑",
    subtitle: "Pigmentation & Melasma",
    description: "日曬、荷爾蒙變化或遺傳因素引致的色素沉澱，令膚色不均、暗啞，難以靠護膚品改善。",
    symptoms: ["荷爾蒙斑", "雀斑 / 太陽斑", "膚色暗啞", "色素不均"],
    topTreatment: "Hollywood Spectra 激光",
  },
  {
    id: "sagging",
    href: "/concerns/sagging",
    icon: <Activity size={28} />,
    iconBg: "bg-red-50",
    iconColor: "text-rose-500",
    accentColor: "from-rose-400 to-pink-500",
    borderHover: "hover:border-rose-300",
    title: "蘋果肌下垂 / 鬆弛",
    subtitle: "Sagging & Loss of Volume",
    description: "隨年齡增長，面部膠原蛋白流失，導致蘋果肌下垂、輪廓鬆弛、法令紋加深，失去年輕感。",
    symptoms: ["蘋果肌下垂", "法令紋加深", "輪廓線模糊", "雙下巴"],
    topTreatment: "Ulfit HIFU 緊緻拉提",
  },
  {
    id: "acne-scars",
    href: "/concerns/acne-scars",
    icon: <Target size={28} />,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    accentColor: "from-emerald-400 to-teal-500",
    borderHover: "hover:border-emerald-300",
    title: "暗瘡印 / 毛孔粗大",
    subtitle: "Acne Marks & Enlarged Pores",
    description: "暗瘡炎症後留下的紅印、黑印，以及毛孔因油脂過剩而粗大，令肌膚表面粗糙、暗沉。",
    symptoms: ["紅印 (PIE)", "黑印 (PIH)", "毛孔粗大", "肌膚粗糙"],
    topTreatment: "Sylfirm X + Hollywood Spectra",
  },
  {
    id: "redness",
    href: "/concerns/redness",
    icon: <ShieldCheck size={28} />,
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    accentColor: "from-green-400 to-emerald-500",
    borderHover: "hover:border-green-300",
    title: "泛紅 / 玫瑰痤瘡",
    subtitle: "Redness & Rosacea",
    description: "皮膚長期泛紅、血管擴張或對外界刺激過度反應，是玫瑰痤瘡的常見表現，需針對性修復。",
    symptoms: ["持續性泛紅", "血管擴張", "紅血絲", "皮膚敏感"],
    topTreatment: "Sylfirm X 修復基底膜",
  },
  {
    id: "intimate",
    href: "/concerns/intimate-care",
    icon: <Heart size={28} />,
    iconBg: "bg-pink-50",
    iconColor: "text-pink-500",
    accentColor: "from-pink-400 to-rose-500",
    borderHover: "hover:border-pink-300",
    title: "私密健康護理",
    subtitle: "Intimate Health Care",
    description: "產後或年齡增長引致的私密處鬆弛、尿滲及黏膜乾燥問題。全女班主理，私密專業護理。",
    symptoms: ["私密鬆弛", "輕微尿滲", "黏膜乾燥", "私密緊緻"],
    topTreatment: "BTL EMfemme 360",
  },
  {
    id: "eye-dark-circles",
    href: "/concerns/eye-dark-circles",
    icon: <Eye size={28} />,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-500",
    accentColor: "from-indigo-400 to-violet-500",
    borderHover: "hover:border-indigo-300",
    title: "黑眼圈 / 眼紋 / 眼袋",
    subtitle: "Dark Circles & Eye Wrinkles",
    description: "黑眼圈、眼袋及眼周細紋令外觀顯得疲憊衰老，專為眼周設計的醫美技術可全面改善眼部困擾。",
    symptoms: ["黑眼圈", "眼袋", "魚尾紋", "淚溝凹陷"],
    topTreatment: "BTL Exion™ Eye",
  },
  {
    id: "body-slimming",
    href: "/concerns/body-slimming",
    icon: <Zap size={28} />,
    iconBg: "bg-teal-50",
    iconColor: "text-teal-500",
    accentColor: "from-teal-400 to-green-500",
    borderHover: "hover:border-teal-300",
    title: "瘦身修形 / 溶脂",
    subtitle: "Body Slimming & Contouring",
    description: "局部頑固脂肪難以靠運動消除，無創醫美技術可精準針對肚腩、拜拜肉、大腿等部位，同步緊膚塑形。",
    symptoms: ["肚腩 / 腰間贅肉", "拜拜肉", "大腿脂肪", "身體鬆弛"],
    topTreatment: "BTL Exion™ Body",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function ConcernsClient() {
  return (
    <div className="min-h-screen bg-white">
      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-neutral-900 overflow-hidden">
        {/* subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#C52B21]/10 blur-[120px] pointer-events-none" />

        <div className="relative container mx-auto px-4 py-24 md:py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#C52B21] mb-5 bg-[#C52B21]/10 px-4 py-2 rounded-full border border-[#C52B21]/20">
              <Sparkles size={12} />
              針對性改善方案
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              了解你的肌膚困擾
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C52B21] to-orange-400">
                找到最適合你的方案
              </span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              每一種肌膚問題都有其根源。選擇你的困擾，
              <br className="hidden md:block" />
              我們為你推薦最有效的針對性療程方案。
            </p>
          </motion.div>
        </div>

        {/* bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 48L1440 48L1440 0C1200 40 960 48 720 40C480 32 240 8 0 0L0 48Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── Concern Grid ── */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {concerns.map((concern) => (
              <motion.div key={concern.id} variants={cardVariants}>
                <Link href={concern.href} className="group block h-full">
                  <div
                    className={`relative h-full bg-white rounded-3xl border-2 border-gray-100 ${concern.borderHover} p-7 transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
                  >
                    {/* icon */}
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${concern.iconBg} ${concern.iconColor} mb-5`}>
                      {concern.icon}
                    </div>

                    {/* title */}
                    <h2 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-[#C52B21] transition-colors duration-200">
                      {concern.title}
                    </h2>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-4 font-medium">
                      {concern.subtitle}
                    </p>

                    {/* description */}
                    <p className="text-gray-500 text-sm leading-relaxed mb-5">
                      {concern.description}
                    </p>

                    {/* symptom tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {concern.symptoms.map((s) => (
                        <span
                          key={s}
                          className="text-xs px-2.5 py-1 bg-gray-50 text-gray-500 rounded-full border border-gray-100"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    {/* bottom cta */}
                    <div className="flex items-center justify-between pt-5 border-t border-gray-100">
                      <div>
                        <p className="text-[11px] text-gray-400 mb-0.5 uppercase tracking-wider">推薦方案</p>
                        <p className="text-sm font-semibold text-gray-700">{concern.topTreatment}</p>
                      </div>
                      <div className={`flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br ${concern.accentColor} text-white shadow-sm group-hover:scale-110 transition-transform duration-200`}>
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white border-t border-gray-100">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            不確定自己的肌膚問題？
          </h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            歡迎預約免費諮詢，我們的專業團隊會為你詳細分析肌膚狀況，
            制定最適合你的個人化療程計劃。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-2 bg-[#C52B21] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#a82219] transition-colors duration-200 shadow-lg shadow-[#C52B21]/25"
            >
              預約免費諮詢
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/treatments"
              className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 px-8 py-4 rounded-full font-semibold border-2 border-gray-200 hover:border-gray-300 transition-colors duration-200"
            >
              瀏覽所有療程
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
