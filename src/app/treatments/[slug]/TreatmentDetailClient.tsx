"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, 
  Zap, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  MessageCircle,
  Plus,
  Minus,
  Info,
  Target,
  AlertCircle,
  ChevronRight,
  Star,
  Clock,
  UserCheck,
  Heart,
  BookOpen,
  Award,
  Droplets
} from 'lucide-react';
import Link from 'next/link';
import VisiaSection from '@/components/VisiaSection';
import CaseStudies from '@/components/CaseStudies';

const TreatmentDetailClient = () => {
  const brandRed = "#C52B21";
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [quizStep, setQuizStep] = useState(0);
  const [quizResults, setQuizResults] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });

  // 倒計時邏輯
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { label: "療程優勢", id: "benefits" },
    { label: "解決痛點", id: "pain-points" },
    { label: "黃金組合", id: "pairings" },
    { label: "技術原理", id: "science" },
    { label: "常見問題", id: "faq" }
  ];

  const data = {
    title: "Sylfirm X 矽谷電波",
    tagline: "第 2 代雙波微針射頻 · 凹凸洞與色素修復專家",
    trialPrice: "1,880",
    originalPrice: "4,800",
    features: ["FDA & CE 雙重認證", "無結焦、極短恢復期", "全女班專業操作", "朗豪坊旗艦店"],
    stats: [
      { label: "修復基底膜", value: "95%" },
      { label: "退紅速度", value: "4-6hr" },
      { label: "滿意度", value: "98%" }
    ],
    painPoints: [
      {
        problem: "頑固凹凸洞",
        solution: "針對冰錐型、車廂型及滾輪型凹凸洞。CW 連續波模式精準傳遞熱能至真皮層，刺激膠原纖維即時收縮與長期再生，填補凹陷組織。",
        icon: <Target className="text-red-500" />
      },
      {
        problem: "荷爾蒙斑 (肝斑)",
        solution: "傳統激光易反黑？Sylfirm X 的 PW 脈衝波專利技術能修復受損基底膜，從根源阻斷黑色素下沉至真皮層，穩定黑色素細胞，防止色斑反彈。",
        icon: <Sparkles className="text-amber-500" />
      },
      {
        problem: "微絲血管/泛紅",
        solution: "精準針對異常增生血管，改善玫瑰痤瘡、長期面部泛紅及暗瘡印紅印。透過修復血管壁，恢復肌膚健康色澤。",
        icon: <AlertCircle className="text-rose-500" />
      },
      {
        problem: "毛孔粗大/鬆弛",
        solution: "全方位提升肌膚緊緻度，收細因老化或出油引起的粗大毛孔。熱能重塑真皮支撐力，重塑平滑細緻膚質，提升面部輪廓。",
        icon: <Zap className="text-blue-500" />
      }
    ],
    journey: [
      { title: "VISIA 深度分析", desc: "使用第 7 代 VISIA 偵測底層色斑、血管及基底膜受損狀況。", icon: <SearchIcon /> },
      { title: "專業諮詢與方案", desc: "美容顧問根據數據，制定專屬的能量參數與治療模式。", icon: <UserCheck size={24} /> },
      { title: "溫和清潔與準備", desc: "全女班團隊進行深層清潔，並塗抹溫和麻膏確保過程舒適。", icon: <Droplets size={24} /> },
      { title: "Sylfirm X 精準治療", desc: "治療師操作原廠儀器，針對問題區域切換 CW/PW 雙波模式。", icon: <Zap size={24} /> },
      { title: "術後舒緩修復", desc: "導入醫學級舒緩精華，即時退紅並鎖住射頻能量。", icon: <Heart size={24} /> }
    ],
    pairings: [
      {
        name: "肌源修復組合",
        items: ["Sylfirm X", "DEP 無針水光"],
        desc: "Sylfirm X 修復基底膜後，DEP 能將水分直接導入真皮層，加速修復並令肌膚水潤透亮。",
        benefit: "修復力 +200%"
      },
      {
        name: "極致去斑組合",
        items: ["Sylfirm X", "Hollywood Spectra"],
        desc: "Spectra 擊碎黑色素，Sylfirm X 則從根源抑制黑色素再生，徹底解決反覆性色斑。",
        benefit: "淨斑率 +85%"
      }
    ],
    comparison: [
      { feature: "技術原理", sylfirm: "雙波微針射頻 (CW+PW)", traditional: "單波微針射頻" },
      { feature: "基底膜修復", sylfirm: "專利技術有效修復", traditional: "無法處理" },
      { feature: "恢復期", sylfirm: "極短 (4-6小時退紅)", traditional: "較長 (3-7天結痂)" },
      { feature: "適用症狀", sylfirm: "凹凸洞、色斑、泛紅、緊緻", traditional: "主要針對凹凸洞" },
      { feature: "痛感", sylfirm: "低 (精準入針技術)", traditional: "較高" }
    ],
    faqs: [
      {
        question: "Sylfirm X 療程痛嗎？需要敷麻藥嗎？",
        answer: "Sylfirm X 採用專利精準入針技術，入針過程極快且平穩，痛感較傳統微針射頻大幅降低。為了確保您的舒適體驗，我們在療程前會塗抹醫學級溫和麻膏。大部分客戶形容感覺僅像輕微的刺癢感，過程輕鬆。"
      },
      {
        question: "Sylfirm X 價錢如何？有隱藏收費嗎？",
        answer: "Peko Beauty 堅持價格透明。Sylfirm X 首次體驗價為 HK$1,880，已包含專業 VISIA 皮膚分析及美容顧問諮詢。我們承諾絕無硬銷，亦無任何隱藏附加費。"
      },
      {
        question: "需要多少次療程才能見效？",
        answer: "單次療程後，您會發現皮膚泛紅減少、膚質變得細緻。針對嚴重的凹凸洞、深層荷爾蒙斑或玫瑰痤瘡，建議以 3-6 次為一個完整療程，每次間隔約 4-6 週，以達到最佳的基底修復效果。"
      },
      {
        question: "療程後會有結痂或恢復期嗎？",
        answer: "這是 Sylfirm X 矽谷電波的最大優勢！與傳統微針不同，它不會造成表面結痂或脫皮。療程後皮膚僅會有輕微泛紅，通常在 4-6 小時內自然消退。第二天即可正常化妝、上班及社交，不影響日常生活。"
      },
      {
        question: "Sylfirm X 與 Hollywood Spectra 激光有什麼分別？",
        answer: "Hollywood Spectra 主要利用激光能量擊碎黑色素；而 Sylfirm X 則透過射頻能量修復基底膜及異常血管。對於「反覆性色斑」或「伴隨泛紅的色斑」，兩者結合使用（黃金組合）能達到標本兼治的效果。"
      },
      {
        question: "術後有什麼需要注意的護理嗎？",
        answer: "療程後 24 小時內請避免使用含有果酸、維他命 C 或酒精的刺激性護膚品。加強保濕及防曬至關重要。建議配合 DEP 無針水光導入，能加速修復並提升療程效果。"
      }
    ]
  };

  const quizQuestions = [
    {
      q: "您的主要皮膚煩惱是什麼？",
      options: ["凹凸洞/毛孔", "色斑/暗沉 (如荷爾蒙斑)", "泛紅/微絲血管/玫瑰痤瘡", "鬆弛/細紋/毛孔粗大"]
    },
    {
      q: "您是否曾嘗試激光治療但效果不佳或反黑？",
      options: ["是，曾出現反黑/反白", "否，但效果不明顯", "從未嘗試過激光"]
    },
    {
      q: "您對恢復期的要求是？",
      options: ["越短越好 (當天需化妝/見人)", "可以接受 1-3 天輕微紅腫", "不介意結痂 (但希望效果顯著)"]
    }
  ];

  const handleQuizOption = (option: string) => {
    const newResults = [...quizResults, option];
    if (quizStep < quizQuestions.length - 1) {
      setQuizResults(newResults);
      setQuizStep(quizStep + 1);
    } else {
      setQuizResults(newResults);
      setQuizStep(quizStep + 1);
    }
  };

  return (
    <div className="bg-white">
      {/* 頂部導航錨點 (Desktop Only) */}
      <div className="hidden md:block sticky top-20 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center gap-8 py-4">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })}
                className="text-sm font-medium text-gray-500 hover:text-[#C52B21] transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SEO 結構化數據 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Sylfirm X 矽谷電波",
            "description": "第 2 代雙波微針射頻，專利技術修復基底膜，針對凹凸洞、荷爾蒙斑及泛紅問題。",
            "brand": { "@type": "Brand", "name": "Peko Beauty" },
            "offers": {
              "@type": "Offer",
              "price": data.trialPrice,
              "priceCurrency": "HKD",
              "availability": "https://schema.org/InStock"
            }
          })
        }}
      />

      {/* 1. Hero Section */}
      <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-32 overflow-hidden bg-[#FAFAFA]">
        {/* 背景裝飾 */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-red-50/30 to-transparent z-0" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-500/5 rounded-full blur-3xl z-0" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-7"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white shadow-sm border border-red-100 text-[#C52B21] text-[10px] sm:text-xs font-bold mb-6 sm:mb-8 tracking-wider">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                2024 頂尖修復技術 · 矽谷電波第 2 代
              </div>
              
              <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-gray-900 mb-6 sm:mb-8 leading-[1.2] lg:leading-[1.1]">
                {data.title} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C52B21] to-red-400">
                  徹底告別凹凸洞
                </span>
              </h1>
              
              <p className="text-base sm:text-lg lg:text-xl text-gray-500 mb-8 sm:mb-10 font-light leading-relaxed max-w-2xl">
                針對「反覆性色斑」與「頑固凹凸洞」的終極方案。Sylfirm X 透過專利雙波技術，修復受損基底膜，從根源阻斷黑色素再生。
              </p>
              
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3 mb-10 sm:mb-12">
                {data.features.map(f => (
                  <div key={f} className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-bold text-gray-600 bg-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-sm border border-gray-50">
                    <CheckCircle size={12} className="text-green-500 flex-shrink-0" /> <span className="truncate">{f}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#C52B21] to-red-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative bg-white px-6 sm:px-8 py-4 sm:py-6 rounded-2xl shadow-xl border border-gray-100 flex flex-col">
                    <div className="text-[9px] sm:text-[10px] text-red-500 font-bold uppercase tracking-widest mb-1">新客戶尊享首試價</div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-black text-gray-900">HK${data.trialPrice}</span>
                      <span className="text-xs sm:text-sm text-gray-300 line-through">HK${data.originalPrice}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-3 flex-1 sm:flex-none">
                  <Link href="/booking" className="group relative inline-flex items-center justify-center px-8 sm:px-10 py-4 sm:py-5 font-bold text-white transition-all duration-200 bg-[#C52B21] rounded-full shadow-lg hover:shadow-red-200 hover:-translate-y-1">
                    立即預約體驗
                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <div className="flex items-center justify-center gap-2 text-[10px] sm:text-[11px] font-bold text-red-500 bg-red-50/50 py-1.5 sm:py-2 px-4 rounded-full border border-red-100/50">
                    <Clock size={12} className="animate-pulse" /> 
                    優惠倒計時：{String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400">
                  <span className="text-gray-900 font-bold">1,200+</span> 位客戶已在 Peko Beauty 完成修復
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] border-[12px] border-white aspect-[4/5]">
                <img 
                  src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=800" 
                  alt="Sylfirm X 療程" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                
                {/* 懸浮標籤 */}
                <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-white">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#C52B21] flex items-center justify-center shadow-lg">
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest opacity-80">Safety Guarantee</div>
                      <div className="text-sm font-bold">FDA & CE 雙重安全認證</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 數據浮窗 - 移至右側避免重疊 */}
              <div className="absolute top-1/2 -right-8 lg:-right-12 -translate-y-1/2 z-20 space-y-4 hidden sm:block">
                {data.stats.map((s, i) => (
                  <motion.div 
                    key={s.label}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + (i*0.1) }}
                    className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-gray-100 min-w-[120px] text-center"
                  >
                    <div className="text-2xl font-black text-[#C52B21]">{s.value}</div>
                    <div className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">{s.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* 裝飾元素 */}
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-red-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. 專家建議 (Expert Advice) - NEW */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-gray-900 rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/10 flex-shrink-0">
                <img src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=400" alt="Expert" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-widest mb-4">
                  <Award size={14} /> Consultant's Insight
                </div>
                <h3 className="text-2xl font-bold mb-4">為什麼我們推薦 Sylfirm X？</h3>
                <p className="text-gray-400 leading-relaxed italic">
                  「在 Peko Beauty，我們見過無數因基底膜受損而導致色斑反覆、凹凸洞難以平復的案例。Sylfirm X 的出現改變了遊戲規則。它不只是破壞再重生，而是先修復肌膚的『地基』。對於追求長效、穩定膚質的客戶來說，這是目前最科學的選擇。」
                </p>
                <div className="mt-6 font-bold text-sm">— Peko Beauty 首席美容顧問</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 痛點解決方案 (Pain Points) */}
      <section id="pain-points" className="py-24 bg-white scroll-mt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">為什麼您的皮膚問題反覆發作？</h2>
            <p className="text-gray-500 text-lg">
              許多皮膚問題（如荷爾蒙斑、泛紅）的根源在於「基底膜受損」及「異常血管增生」。Sylfirm X 是全球首創能同時處理這兩大核心問題的技術。
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.painPoints.map((item, i) => (
              <motion.div 
                key={item.problem}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-[2rem] bg-gray-50 hover:bg-white hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-gray-100 group"
              >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">{item.problem}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.solution}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. 療程流程 (Journey) - NEW */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">您的美肌蛻變之旅</h2>
            <p className="text-gray-500">從科學診斷到術後修復，我們確保每一步都專業精準</p>
          </div>
          
          <div className="grid md:grid-cols-5 gap-4 relative">
            {/* 連接線 (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-12 z-0" />
            
            {data.journey.map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-full bg-white border-4 border-gray-50 flex items-center justify-center mb-6 shadow-lg group-hover:border-red-100 transition-colors">
                  <div className="text-[#C52B21]">{step.icon}</div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full">
                  <div className="text-[10px] font-bold text-red-400 uppercase mb-2 tracking-widest">Step 0{i+1}</div>
                  <h4 className="font-bold text-gray-900 mb-2">{step.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 互動小測驗 (Interactive Quiz) */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">30 秒皮膚自我評估</h2>
            <p className="text-gray-500">了解 Sylfirm X 如何針對您的具體問題提供解決方案</p>
          </div>
          <div className="bg-[#FDF2F2] rounded-[3rem] shadow-xl overflow-hidden border border-red-100">
            <div className="p-8 md:p-12">
              {quizStep < quizQuestions.length ? (
                <div>
                  <div className="flex justify-between items-center mb-8">
                    <span className="text-xs font-bold text-[#C52B21] uppercase tracking-widest">Skin Assessment</span>
                    <span className="text-xs text-gray-400">Step {quizStep + 1} of {quizQuestions.length}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900">{quizQuestions[quizStep].q}</h3>
                  <div className="grid gap-4">
                    {quizQuestions[quizStep].options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleQuizOption(option)}
                        className="w-full p-5 text-left rounded-2xl border border-white bg-white/50 hover:border-[#C52B21] hover:bg-white transition-all group flex justify-between items-center"
                      >
                        <span className="font-medium text-gray-700 group-hover:text-[#C52B21]">{option}</span>
                        <ChevronRight size={18} className="text-gray-300 group-hover:text-[#C52B21]" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Star className="text-green-500" fill="currentColor" size={32} />
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-gray-900">Sylfirm X 是您的完美選擇！</h3>
                  <p className="text-gray-500 mb-8 text-lg">
                    根據您的選擇，Sylfirm X 的雙波技術能精準針對您的皮膚需求。建議預約 VISIA 分析以獲取更精準的方案。
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link href="/booking" className="px-10 py-4 bg-[#C52B21] text-white rounded-full font-bold shadow-lg">
                      立即預約分析
                    </Link>
                    <button onClick={() => setQuizStep(0)} className="px-10 py-4 border border-gray-200 text-gray-600 rounded-full font-bold">
                      重新測試
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 6. 黃金組合建議 (Pairings) - NEW */}
      <section id="pairings" className="py-24 bg-white scroll-mt-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">1+1 {'>'} 2：黃金療程組合</h2>
            <p className="text-gray-500">針對特定皮膚問題，結合多項技術以達到極致效果</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {data.pairings.map((pair, i) => (
              <div key={i} className="bg-gray-50 rounded-[2.5rem] p-8 md:p-10 border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex justify-between items-start mb-6">
                  <h4 className="text-2xl font-bold text-gray-900">{pair.name}</h4>
                  <div className="px-4 py-1 bg-red-50 text-[#C52B21] rounded-full text-xs font-bold">
                    {pair.benefit}
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-6">
                  {pair.items.map((item, idx) => (
                    <React.Fragment key={item}>
                      <span className="px-4 py-2 bg-white rounded-xl text-sm font-bold text-gray-700 shadow-sm">{item}</span>
                      {idx < pair.items.length - 1 && <Plus size={14} className="text-gray-300" />}
                    </React.Fragment>
                  ))}
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-8">{pair.desc}</p>
                <Link href="/booking" className="inline-flex items-center gap-2 text-[#C52B21] font-bold hover:gap-3 transition-all">
                  了解組合優惠 <ArrowRight size={18} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. 技術原理 (Science) */}
      <section id="science" className="py-24 bg-gray-900 text-white overflow-hidden relative scroll-mt-32">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-[10px] font-bold mb-6 tracking-widest uppercase">
                Patented Technology
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">全球首創 <br /><span className="text-red-500">雙波微針射頻</span></h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-10">
                Sylfirm X 結合了連續波 (CW) 與脈衝波 (PW)，能根據不同皮膚問題切換模式，實現「一機多效」的精準治療。
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-6 p-8 bg-white/5 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="w-14 h-14 rounded-2xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
                    <Zap className="text-red-500" size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">PW 脈衝波模式 (Pulsed Wave)</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      專門針對色素與血管問題。修復受損基底膜，阻斷黑色素下沉，並收縮異常微絲血管，解決泛紅與荷爾蒙斑。
                    </p>
                  </div>
                </div>
                <div className="flex gap-6 p-8 bg-white/5 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <Zap className="text-blue-500" size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">CW 連續波模式 (Continuous Wave)</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      專注於膠原蛋白重組。透過熱能刺激真皮層，令膠原纖維即時收縮並長期增生，有效平滑凹凸洞、收細毛孔及提升輪廓。
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-red-500/20 blur-3xl rounded-full" />
              <img src="https://images.unsplash.com/photo-1551288560-1293910c061a?q=80&w=800" alt="Sylfirm X 技術原理" className="relative rounded-[3rem] border border-white/10 shadow-2xl" />
              
              {/* 科技感標籤 */}
              <div className="absolute top-10 right-10 bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                <div className="text-[10px] text-gray-400 uppercase tracking-tighter mb-1">Precision Depth</div>
                <div className="text-xl font-bold">0.3mm - 4.0mm</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. 科普內容 (Education) - NEW */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-[#C52B21]">
              <BookOpen size={24} />
            </div>
            <h2 className="text-3xl font-bold">美肌小知識：什麼是基底膜？</h2>
          </div>
          <div className="prose prose-red max-w-none text-gray-600 leading-relaxed">
            <p>
              基底膜 (Basement Membrane) 是位於表皮與真皮之間的薄層結構，它就像是皮膚的「地基」。當基底膜受損時，黑色素會下沉到真皮層形成難以根除的深層斑，血管也會異常增生導致泛紅。
            </p>
            <p className="font-bold text-gray-900 mt-4">
              Sylfirm X 的 PW 模式正是為了修復這層關鍵結構而設計，這也是為什麼它能解決許多傳統激光無法處理的頑固問題。
            </p>
          </div>
        </div>
      </section>

      {/* 9. 療程對比 (Comparison) */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">為什麼選擇 Sylfirm X？</h2>
            <p className="text-gray-500">與傳統技術相比，Sylfirm X 提供更全面、更舒適的體驗</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-6 text-left text-gray-400 font-medium border-b border-gray-100">比較項目</th>
                  <th className="p-6 text-center bg-red-50 text-[#C52B21] font-bold rounded-t-3xl border-b border-red-100">Sylfirm X 矽谷電波</th>
                  <th className="p-6 text-center text-gray-600 font-medium border-b border-gray-100">傳統微針射頻</th>
                </tr>
              </thead>
              <tbody>
                {data.comparison.map((row, i) => (
                  <tr key={row.feature}>
                    <td className="p-6 text-gray-700 font-bold border-b border-gray-50">{row.feature}</td>
                    <td className="p-6 text-center bg-red-50/30 text-gray-900 font-medium border-b border-red-50">{row.sylfirm}</td>
                    <td className="p-6 text-center text-gray-500 border-b border-gray-50">{row.traditional}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 10. 真實案例 (Case Studies) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">真實見證：Sylfirm X 的修復力量</h2>
            <p className="text-gray-500">多位客戶親身體驗，見證肌膚重獲新生</p>
          </div>
          <CaseStudies />
          <div className="mt-12 p-8 bg-red-50 rounded-[2rem] border border-red-100 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#C52B21] shadow-sm">
                <Info size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">想看更多針對您問題的案例？</h4>
                <p className="text-sm text-gray-500">由於隱私原因，更多對比圖僅限店內展示。立即預約 VISIA 分析查看相似案例。</p>
              </div>
            </div>
            <Link href="/booking" className="px-8 py-3 bg-[#C52B21] text-white rounded-full font-bold text-sm whitespace-nowrap">
              預約查看更多案例
            </Link>
          </div>
        </div>
      </section>

      {/* 11. VISIA 皮膚分析 (Diagnosis) */}
      <VisiaSection />

      {/* 12. 常見問題 (FAQ) */}
      <section id="faq" className="py-24 bg-gray-50 scroll-mt-32">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">關於 Sylfirm X 的疑問</h2>
            <p className="text-gray-500">我們為您解答最常遇到的問題</p>
          </div>
          
          <div className="space-y-4">
            {data.faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="font-bold text-gray-900">{faq.question}</span>
                  {activeFaq === i ? <Minus size={20} className="text-[#C52B21]" /> : <Plus size={20} className="text-gray-300" />}
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-6 text-gray-500 leading-relaxed text-sm"
                    >
                      <div className="pt-4 border-t border-gray-50">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. 底部 CTA */}
      <section className="py-24 bg-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <ShieldCheck size={40} className="text-[#C52B21]" />
          </div>
          <h2 className="text-4xl font-bold mb-6 text-gray-900">準備好重塑您的肌膚了嗎？</h2>
          <p className="text-gray-500 mb-12 text-lg leading-relaxed">
            立即預約專業 VISIA 皮膚分析，由 Peko Beauty 全女班專業團隊為您制定專屬的 Sylfirm X 療程方案。
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/booking" className="px-12 py-5 bg-[#C52B21] text-white rounded-full font-bold shadow-2xl hover:scale-105 transition-transform flex items-center justify-center gap-2">
              立即預約諮詢 <ArrowRight size={20} />
            </Link>
            <a href="https://wa.me/85253353313" target="_blank" rel="noopener noreferrer" className="px-12 py-5 border border-gray-200 text-gray-700 rounded-full font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
              WhatsApp 查詢 <MessageCircle size={20} />
            </a>
          </div>
          <p className="mt-8 text-sm text-gray-400">
            * 試做優惠僅適用於新客戶 | 朗豪坊旗艦店限定
          </p>
        </div>
      </section>

      {/* 底部固定預約欄 (Mobile Only) */}
      <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-xl border-t border-gray-100 py-3 px-6 z-[90] md:hidden flex items-center justify-between shadow-[0_-10px_30px_rgba(0,0,0,0.08)] pb-safe">
        <div>
          <div className="text-[9px] text-gray-400 uppercase font-bold tracking-tighter">Sylfirm X 體驗價</div>
          <div className="text-lg font-bold text-gray-900">HK${data.trialPrice}</div>
        </div>
        <Link href="/booking" className="bg-[#C52B21] text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-lg active:scale-95 transition-transform">
          立即預約
        </Link>
      </div>
    </div>
  );
};

const SearchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
  </svg>
);

export default TreatmentDetailClient;
