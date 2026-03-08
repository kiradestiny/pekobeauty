"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Filter,
  ChevronRight,
  Sparkles,
  Zap,
  ShieldCheck,
  Plus,
  CheckCircle2,
  Search,
  MessageCircle,
  ArrowRight,
  Info,
  Star,
  Clock,
  Award
} from 'lucide-react';
import Link from 'next/link';
import FAQAccordion from '@/components/FAQAccordion';
import type { FaqItem } from '@/types/faq';

// ─── 療程頁面專屬 FAQ ──────────────────────────────────────────────────────────
const TREATMENTS_FAQS: FaqItem[] = [
  {
    category: "療程選擇",
    question: "我同時有多個皮膚問題，可以在同一次到訪做多個療程嗎？",
    answer:
      "可以，但需視乎療程組合及您的皮膚狀況而定。部分療程之間存在協同效應（例如先做 XE LHA Peel 再配合 Sylfirm X），效果相加更佳；而某些高強度療程則建議間隔進行，避免皮膚過度刺激。我們會透過 VISIA 皮膚影像分析，客觀評估您的皮膚承受能力，再為您設計最安全、高效的複合療程方案，而非盲目疊加。",
  },
  {
    category: "療程分類",
    question: "非入侵性療程和微創療程（如黃金微針）有什麼分別？我適合哪一種？",
    answer:
      "非入侵性療程（如 BTL Exion™ 面部、Ulfit HIFU）完全不損傷皮膚屏障，適合生活忙碌、無法接受停機時間的客戶；微創療程（如 BTL Exion™ 黃金微針、Sylfirm X）透過精細針道刺激深層膠原再生，針對嚴重凹凸洞或深層問題效果更顯著，療程後需要約 24-48 小時的短暫恢復期。選擇哪種取決於您的皮膚問題嚴重程度、時間安排及個人接受程度，我們的治療師會在諮詢時詳細說明。",
  },
  {
    category: "療程效果",
    question: "一般要做幾次療程才能看到明顯效果？",
    answer:
      "效果因療程類型而異。BTL Exion 膠原槍等累積型療程通常首次後即感受到皮膚緊緻提升，而深層改善效果在 3-6 次後最為顯著；針對凹凸洞的 Sylfirm X 一般建議 3-6 次為一個完整療程，每次間隔 4 週。我們不鼓勵無限期、無方向地進行療程——我們會在每個階段使用 VISIA 追蹤數據，讓您清晰看到皮膚進展，確保每次療程均物有所值。",
  },
  {
    category: "療程準備",
    question: "預約療程前，我需要提前做什麼準備？",
    answer:
      "一般準則：療程前一週建議停用高濃度果酸（AHA/BHA）、A 酸（Retinol）或其他強效美白成分；療程當天請勿化濃妝，並避免在日曬後直接到診。如您正在服用特定藥物（如抗凝血藥、光敏感藥物），請提前告知我們的治療師。首次到訪的客戶無需額外準備，進診後我們會先為您進行 VISIA 皮膚分析，全面了解您的肌膚狀況後才安排療程。",
  },
  {
    category: "皮膚類型",
    question: "我有嚴重敏感肌或玫瑰痤瘡（酒渣鼻），Peko Beauty 有適合我的療程嗎？",
    answer:
      "有。Sylfirm X 矽谷電波正是目前市場上少數經臨床認可、專門針對玫瑰痤瘡（Rosacea）及敏感肌底層血管問題的療程，透過 PW 脈衝模式精準修復受損基底膜，而不刺激表皮。敏感肌患者不代表不能做醫美，關鍵在於選對適合的儀器及設定。我們的治療師會根據您當前皮膚狀態調整療程參數，確保安全有效，絕不一刀切地使用標準設定。",
  },
  {
    category: "收費查詢",
    question: "Peko Beauty 的療程收費如何計算？有沒有套餐或首次優惠？",
    answer:
      "我們實行單次透明報價及套餐兩種模式，所有收費均事前清晰列明，不設隱藏費用。新客戶可享首次體驗優惠價，並附送免費 VISIA 第 7 代皮膚影像分析（價值 HK$680）。套餐方案適合有計劃進行多次療程的客戶，可享額外折扣。具體優惠詳情請參閱【最新優惠】頁面，或直接透過 WhatsApp 向我們的顧問查詢最新報價。",
  },
];

// 療程頁面 FAQ CTA 設定
const TREATMENTS_FAQ_CTA = {
  heading: "還有疑問？讓數據告訴您答案。",
  subheading:
    "預約 VISIA 第 7 代皮膚影像分析，由客觀數據指引您選擇最適合的療程方案，而非靠猜測。",
  primaryLabel: "預約免費 VISIA 分析",
  primaryHref: "/booking",
  secondaryLabel: "查看首次優惠",
  secondaryHref: "/offers",
};

// 療程數據結構
const treatments = [
  {
    id: "sylfirm-x",
    title: "Sylfirm X 矽谷電波",
    category: "皇牌儀器",
    concerns: ["凹凸洞", "荷爾蒙斑", "紅印", "玫瑰痤瘡"],
    highlights: ["修復基底膜", "原廠探頭開封"],
    stat: "4-6hr 退紅",
    price: "1,880",
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=800",
    description: "Dual Wave 雙波微針射頻，專利技術修復基底膜，不結焦，極速退紅。",
    duration: "60 min",
    rating: "4.9"
  },
  {
    id: "btl-exion-face",
    href: "btl-exion",
    title: "BTL Exion 面+眼+頸",
    category: "緊緻提拉",
    concerns: ["鬆弛", "皺紋", "蘋果肌下垂", "眼袋/淚溝"],
    highlights: ["+224% 透明質酸", "+47% 膠原"],
    stat: "+224% HA",
    price: "680",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=800",
    description: "單極射頻 + 靶向超聲波 + AI 技術，全球唯一自然激生透明質酸，無痛無創。",
    duration: "45 min",
    rating: "5.0"
  },
  {
    id: "btl-exion-rf",
    href: "btl-exion-microneedle",
    title: "BTL Exion 黃金微針",
    category: "毛孔凹凸洞",
    concerns: ["深層皺紋", "嚴重凹凸洞", "鬆弛"],
    highlights: ["AI 脈衝控制", "單次通過技術"],
    stat: "AI 智能微針",
    price: "2,980",
    image: "https://images.unsplash.com/photo-1512290902247-47f808b99382?q=80&w=800",
    description: "AI Fractional RF 技術，單次通過技術減少痛感，高效針對嚴重凹凸洞。",
    duration: "60 min",
    rating: "4.9"
  },
  {
    id: "btl-exion-body",
    title: "BTL Exion (Body)",
    category: "身體塑形",
    concerns: ["肚腩", "拜拜肉", "大腿脂肪", "鬆弛"],
    highlights: ["溶脂 + 緊膚", "激生透明質酸"],
    stat: "三效合一",
    price: "680 / part",
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=800",
    description: "溶脂、緊膚、激生膠原三效合一，無痛無創改善身體線條。",
    duration: "45 min",
    rating: "4.8"
  },
  {
    id: "btl-exion-eye",
    title: "BTL Exion (Eye) 眼袋小熨斗",
    category: "緊緻提拉",
    concerns: ["眼袋", "黑眼圈", "眼紋", "眼皮鬆弛"],
    highlights: ["激生透明質酸", "眼袋小熨斗"],
    stat: "無痛無創",
    price: "380",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=800",
    description: "促進眼周微循環，激生膠原與透明質酸，無需手術即可改善眼紋及鬆弛。",
    duration: "30 min",
    rating: "4.9"
  },
  {
    id: "xe-lha-peel",
    title: "XE LHA Peel 玻璃肌",
    category: "深層清潔",
    concerns: ["暗瘡印", "粗糙", "敏感肌", "閉塞粉刺"],
    highlights: ["第四代鹼性煥膚", "玻璃肌效果"],
    stat: "零脫皮",
    price: "980",
    image: "https://images.unsplash.com/photo-1570172619992-052267ad7c3f?q=80&w=800",
    description: "獨家 Fill & Peel 概念，邊煥膚邊填充，不傷皮膚屏障，即時呈現玻璃肌。",
    duration: "45 min",
    rating: "4.9"
  },
  {
    id: "ulfit-hifu",
    title: "Ulfit HIFU 緊緻拉提",
    category: "緊緻提拉",
    concerns: ["包包面", "雙下巴", "輪廓下垂"],
    highlights: ["TDT 擴散式加熱", "500發"],
    stat: "即時提升",
    price: "1,480",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800",
    description: "第 4 代 TDT 擴散式加熱技術，圓形探頭貼合面型，筋膜層強力提拉。",
    duration: "60 min",
    rating: "4.9"
  },
  {
    id: "venus-glow",
    title: "Venus Glow™ 水漾活膚",
    category: "深層清潔",
    concerns: ["黑頭粉刺", "油光", "暗啞"],
    highlights: ["360° 旋轉真空", "70微米水流"],
    stat: "即時發光",
    price: "480",
    image: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=800",
    description: "70微米水流非物理擠壓，深層淨化毛孔，即時改善暗啞發光。",
    duration: "45 min",
    rating: "4.7"
  },
  {
    id: "emfemme-360",
    href: "btl-emfemme-360",
    title: "BTL EMfemme 360",
    category: "女性私密",
    concerns: ["尿滲", "陰道鬆弛", "行房痛"],
    highlights: ["全女班主理", "改善黏膜健康"],
    stat: "一次性探頭",
    price: "3,680",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800",
    description: "360度環迴溫控射頻，非侵入式改善女性私密健康，全女班專業主理。",
    duration: "30 min",
    rating: "5.0"
  },
  {
    id: "hs-laser-facial",
    href: "hollywood-spectra-laser",
    title: "HS Laser Facial",
    category: "Hollywood Spectra",
    concerns: ["面黃", "膚色不均", "荷爾蒙斑", "反黑"],
    highlights: ["極速打散色素", "美白嫩膚"],
    stat: "能量溫和",
    price: "880",
    image: "https://images.unsplash.com/photo-1521335629791-ce4aec67dd15?q=80&w=800",
    description: "1064nm Q-switched 技術，極速擊碎黑色素，改善膚色不均，能量溫和均勻。",
    duration: "45 min",
    rating: "4.8"
  },
  {
    id: "hs-fractional",
    href: "hollywood-spectra-laser",
    title: "HS 蜂巢無創膠原",
    category: "Hollywood Spectra",
    concerns: ["毛孔粗大", "凹凸洞", "皺紋"],
    highlights: ["LIOB 熱誘光空泡", "不破皮修復"],
    stat: "膠原再生",
    price: "980",
    image: "https://images.unsplash.com/photo-14884231912ed-07e5c567e617?q=80&w=800",
    description: "MLA 蜂巢探頭製造 LIOB，不傷表皮重啟修復機制，膠原高效再生。",
    duration: "45 min",
    rating: "4.9"
  },
  {
    id: "hs-carbon-peel",
    href: "hollywood-spectra-laser",
    title: "HS Carbon Peel",
    category: "Hollywood Spectra",
    concerns: ["油光", "暗瘡粉刺", "黑頭"],
    highlights: ["碳粉引爆", "收細皮脂腺"],
    stat: "疏通毛孔",
    price: "880",
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=800",
    description: "碳粉吸光引爆帶走油脂污垢，即時收細皮脂腺，改善油光及黑頭問題。",
    duration: "45 min",
    rating: "4.7"
  },
  {
    id: "hs-golden-laser",
    href: "hollywood-spectra-laser",
    title: "HS Golden Laser",
    category: "Hollywood Spectra",
    concerns: ["紅印 (PIE)", "玫瑰痤瘡", "泛紅"],
    highlights: ["585nm 針對血紅素", "消退紅腫"],
    stat: "血管調整",
    price: "1,280",
    image: "https://images.unsplash.com/photo-1509133039912-8959d09c2a68?q=80&w=800",
    description: "獨家 585nm Gold Toning，針對微血管與血紅素，調整血管狀態，消退泛紅。",
    duration: "45 min",
    rating: "4.9"
  },
  {
    id: "hs-pigment",
    href: "hollywood-spectra-laser",
    title: "HS 色斑針對治療",
    category: "Hollywood Spectra",
    concerns: ["雀斑", "曬斑", "老人斑", "顴痣"],
    highlights: ["定點擊碎", "針對頑固色素"],
    stat: "分層去斑",
    price: "880",
    image: "https://images.unsplash.com/photo-1532413992378-f169ac26fff0?q=80&w=800",
    description: "532nm/1064nm 高能量激光，定點擊碎表層及深層顽固色斑，精準高效。",
    duration: "30 min",
    rating: "4.9"
  },
  {
    id: "dep-mesotherapy",
    title: "DEP 無針水光",
    category: "深層清潔",
    concerns: ["缺水乾燥", "暗啞膚色", "乾紋", "毛孔粗大"],
    highlights: ["電穿孔深層導入", "媲美水光針效果"],
    stat: "完全無針",
    price: "980",
    image: "https://images.unsplash.com/photo-1570172619992-052267ad7c3f?q=80&w=800",
    description: "電穿孔技術無針深導入透明質酸及維他命C，媲美水光針效果，完全無痛無針，零恢復期即刻補水亮膚。",
    duration: "45 min",
    rating: "4.8"
  }
];

const categories = ["全部", "皇牌儀器", "Hollywood Spectra", "緊緻提拉", "毛孔凹凸洞", "深層清潔", "女性私密", "身體塑形"];
const allConcerns = ["全部", "凹凸洞", "荷爾蒙斑", "鬆弛", "皺紋", "眼袋/淚溝", "暗瘡印", "黑頭粉刺", "面黃", "泛紅", "尿滲"];

export default function TreatmentsClient() {
  const [filter, setFilter] = useState("全部");
  const [concernFilter, setConcernFilter] = useState("全部");
  const [searchQuery, setSearchQuery] = useState("");
  const brandRed = "#C52B21";

  const filteredItems = useMemo(() => {
    return treatments.filter(item => {
      const matchesCategory = filter === "全部" || item.category === filter;
      const matchesConcern = concernFilter === "全部" || item.concerns.some(c => c.includes(concernFilter));
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesConcern && matchesSearch;
    });
  }, [filter, concernFilter, searchQuery]);

  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-[#C52B21] text-xs font-bold mb-4"
            >
              <Award size={14} />
              <span>香港領先醫療美學中心</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-6xl font-light text-gray-900 mb-6 leading-tight"
            >
              針對性 · <span className="font-bold">高效療程方案</span>
            </motion.h1>
            <p className="text-gray-500 text-lg">
              不只是單一儀器，我們結合 VISIA 數據分析與國際頂尖技術，為您量身定制最有效的皮膚與私密處修復方案。
            </p>
          </div>

          {/* 快速統計 (Trust Badge) */}
          <div className="flex gap-8 border-l border-gray-100 pl-8">
            <div className="text-center">
              <div className="text-3xl font-bold" style={{ color: brandRed }}>15+</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">原廠認證設備</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold" style={{ color: brandRed }}>10k+</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">成功案例</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold" style={{ color: brandRed }}>100%</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">全女班團隊</div>
            </div>
          </div>
        </div>

        {/* Interactive Filter System */}
        <div className="bg-gray-50 rounded-[40px] p-8 mb-16 shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="搜尋療程或皮膚問題..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border-none focus:ring-2 focus:ring-[#C52B21] transition-all shadow-sm"
              />
            </div>

            {/* Category Filter */}
            <div className="lg:col-span-2 flex flex-wrap items-center gap-3">
              <span className="text-sm font-bold text-gray-400 mr-2 flex items-center gap-2">
                <Filter size={16} /> 療程分類:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    filter === cat
                    ? 'bg-[#C52B21] text-white shadow-md'
                    : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Concern Filter */}
            <div className="lg:col-span-3 flex flex-wrap items-center gap-3 pt-4 border-t border-gray-200/50">
              <span className="text-sm font-bold text-gray-400 mr-2 flex items-center gap-2">
                <Zap size={16} /> 針對煩惱:
              </span>
              {allConcerns.map((con) => (
                <button
                  key={con}
                  onClick={() => setConcernFilter(con)}
                  className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                    concernFilter === con
                    ? 'bg-gray-900 text-white shadow-md'
                    : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-100'
                  }`}
                >
                  {con}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Treatment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode='popLayout'>
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group bg-white rounded-[32px] overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500 flex flex-col"
              >
                {/* 圖片與數據標籤 */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                    {item.highlights.map(h => (
                      <span key={h} className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold text-gray-900 shadow-sm border border-white/20">
                        {h}
                      </span>
                    ))}
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center gap-2 text-white text-xs font-bold">
                      <Clock size={14} /> {item.duration}
                    </div>
                    <div className="bg-[#C52B21] text-white px-4 py-2 rounded-2xl shadow-lg">
                      <div className="text-sm font-bold tracking-tighter">{item.stat}</div>
                    </div>
                  </div>
                </div>

                {/* 內容區域 */}
                <div className="p-8 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="text-[10px] font-bold text-[#C52B21] uppercase tracking-widest mb-1">{item.category}</div>
                      <h3 className="text-2xl font-bold text-gray-900">{item.title}</h3>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                      <Star size={12} className="fill-yellow-400 text-yellow-400" />
                      <span className="text-[10px] font-bold text-yellow-700">{item.rating}</span>
                    </div>
                  </div>

                  <p className="text-gray-500 text-sm mb-6 line-clamp-2">
                    {item.description}
                  </p>

                  {/* 針對煩惱 (SEO Tagging) */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {item.concerns.slice(0, 3).map(c => (
                      <span key={c} className="text-[11px] font-medium text-gray-400 flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md">
                        <CheckCircle2 size={12} style={{ color: brandRed }} /> {c}
                      </span>
                    ))}
                    {item.concerns.length > 3 && (
                      <span className="text-[11px] font-medium text-gray-400 px-2 py-1">+{item.concerns.length - 3}</span>
                    )}
                  </div>

                  {/* 價格與轉化 */}
                  <div className="mt-auto pt-6 border-t border-gray-50">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest block mb-1">新客戶試做價</span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-xs font-bold">HK$</span>
                          <span className="text-3xl font-bold text-gray-900">{item.price}</span>
                        </div>
                      </div>
                      <Link href={`/treatments/${'href' in item ? item.href : item.id}`} className="text-gray-400 hover:text-[#C52B21] transition-colors">
                        <Info size={20} />
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Link
                        href="/booking"
                        className="px-4 py-3 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-black transition-colors flex items-center justify-center gap-2"
                      >
                        立即預約
                      </Link>
                      <a
                        href={`https://wa.me/85253353313?text=${encodeURIComponent(`Hi Peko，我想查詢 ${item.title} 試做優惠`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-3 bg-white border border-gray-200 text-gray-900 rounded-xl text-xs font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                      >
                        <MessageCircle size={14} /> 諮詢
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-50 text-gray-300 mb-6">
              <Search size={40} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">找不到相關療程</h3>
            <p className="text-gray-500 mb-8">試試調整篩選條件或搜尋其他關鍵字</p>
            <button
              onClick={() => {setFilter("全部"); setConcernFilter("全部"); setSearchQuery("");}}
              className="text-[#C52B21] font-bold flex items-center gap-2 mx-auto hover:underline"
            >
              重設所有篩選 <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* 互動式諮詢區塊 */}
        <div className="mt-32 relative overflow-hidden bg-gray-900 rounded-[48px] p-12 md:p-20 text-white">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-l from-[#C52B21] to-transparent" />
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dad9998e?q=80&w=800"
              className="w-full h-full object-cover"
              alt="Consultation Background"
            />
          </div>

          <div className="relative z-10 max-w-xl">
            <h2 className="text-4xl md:text-5xl font-light mb-8 leading-tight">
              不確定哪項療程<br />
              <span className="font-bold">最適合您的肌膚？</span>
            </h2>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
              皮膚的狀況千變萬化。與其盲目選擇，不如先讓我們的專業團隊透過 VISIA 數據為您診斷，獲取專屬肌源解碼報告。
            </p>

            <div className="space-y-6 mb-12">
              {[
                "免費 15 分鐘專家皮膚分析",
                "VISIA 7 代深層肌底掃描",
                "量身定制 3 個月皮膚改善方案"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#C52B21] flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 size={14} />
                  </div>
                  <span className="text-gray-200 font-medium">{text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/booking"
                className="px-10 py-5 bg-[#C52B21] text-white rounded-2xl font-bold shadow-2xl hover:scale-105 transition-transform flex items-center justify-center gap-3"
              >
                預約免費 VISIA 分析 <ArrowRight size={18} />
              </Link>
              <a
                href="https://wa.me/85253353313?text=Hi%20Peko%2C%20我想查詢療程及預約免費%20VISIA%20皮膚分析"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-2xl font-bold hover:bg-white/20 transition-colors flex items-center justify-center gap-3"
              >
                WhatsApp 諮詢
              </a>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <FAQAccordion
          items={TREATMENTS_FAQS}
          title="療程"
          titleHighlight="常見問題"
          badge="Treatment FAQs"
          subtitle="我們整理了考慮接受療程的客戶最常提出的問題，助您做好決定前充分了解每個細節。"
          cta={TREATMENTS_FAQ_CTA}
          injectSchema={true}
          showFilter={false}
          className="mt-8"
        />
      </div>
    </div>
  );
}
