"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Sparkles, Zap, Droplets, Flame, Star, ChevronDown, ChevronUp } from "lucide-react";
import treatmentsData from "@/data/treatments.json";

// ─── 型別定義 ───────────────────────────────────────────────────────────────
// 明確定義統一介面，避免使用 `as` 強制轉型掩蓋潛在型別問題
export interface TreatmentItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  /** 可選欄位：treatmentsData 可能含有更多字段，VISIA item 不一定有 */
  [key: string]: unknown;
}

interface BookingStep2TreatmentProps {
  selectedTreatments: string[];
  onToggle: (title: string) => void;
}

// 療程分類圖示映射
const TREATMENT_ICONS: Record<string, React.ElementType> = {
  "sylfirm-x": Zap,
  "btl-exion-face": Sparkles,
  "btl-exion-rf": Zap,
  "xe-lha-peel": Droplets,
  "ulfit-hifu": Flame,
  "venus-glow": Droplets,
  "emfemme-360": Star,
  "hs-laser-facial": Sparkles,
  "hs-golden-laser": Flame,
};

// 療程標籤
const TREATMENT_TAGS: Record<string, string[]> = {
  "sylfirm-x": ["HOT", "凹凸洞"],
  "btl-exion-face": ["緊緻", "透明質酸"],
  "btl-exion-rf": ["微針", "深層"],
  "xe-lha-peel": ["煥膚", "零脫皮"],
  "ulfit-hifu": ["提拉", "無痛"],
  "venus-glow": ["淨化", "即時"],
  "emfemme-360": ["私密", "修復"],
  "hs-laser-facial": ["美白", "去斑"],
  "hs-golden-laser": ["激光", "嫩膚"],
};

// 單個療程卡片
function TreatmentCard({
  item,
  isSelected,
  onSelect,
  index,
}: {
  item: TreatmentItem;
  isSelected: boolean;
  onSelect: () => void;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const Icon = TREATMENT_ICONS[item.id] || Sparkles;
  const tags = TREATMENT_TAGS[item.id] || [];
  const isHot = tags.includes("HOT");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      layout
    >
      <motion.div
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.99 }}
        onClick={onSelect}
        className={`
          relative rounded-2xl border-2 cursor-pointer transition-all duration-300 overflow-hidden
          ${isSelected
            ? "border-accent bg-gradient-to-br from-accent/8 to-accent/3 shadow-lg shadow-accent/15"
            : "border-platinum-silver bg-white hover:border-accent/50 hover:shadow-md hover:shadow-accent/5"
          }
        `}
      >
        {/* 選中背景光效 */}
        {isSelected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none"
          />
        )}

        {/* HOT 標籤 */}
        {isHot && (
          <div className="absolute top-0 right-0">
            <div className="bg-accent text-white text-[9px] font-black px-3 py-1 rounded-bl-xl tracking-widest">
              HOT
            </div>
          </div>
        )}

        <div className="p-4">
          <div className="flex items-start gap-3">
            {/* 圖示 */}
            <motion.div
              animate={{
                backgroundColor: isSelected ? "rgba(197,43,33,0.15)" : "rgba(0,0,0,0.04)",
              }}
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
            >
              <Icon
                className={`w-5 h-5 transition-colors ${isSelected ? "text-accent" : "text-gray-400"}`}
              />
            </motion.div>

            {/* 內容 */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3
                    className={`font-bold text-sm leading-tight transition-colors ${
                      isSelected ? "text-accent" : "text-foreground"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted mt-0.5">{item.subtitle}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-sm font-bold ${isSelected ? "text-accent" : "text-foreground"}`}>
                    {item.price.replace("試做價 ", "")}
                  </span>
                  {/* 選擇圓圈 */}
                  <motion.div
                    animate={{
                      backgroundColor: isSelected ? "#C52B21" : "transparent",
                      borderColor: isSelected ? "#C52B21" : "#D1D5DB",
                      scale: isSelected ? 1.1 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="w-6 h-6 rounded-full border-2 flex items-center justify-center"
                  >
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0, rotate: -90 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0 }}
                          transition={{ type: "spring", stiffness: 500 }}
                        >
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </div>

              {/* 標籤 */}
              <div className="flex flex-wrap gap-1 mt-2">
                {tags.filter(t => t !== "HOT").map((tag) => (
                  <span
                    key={tag}
                    className={`text-[10px] px-2 py-0.5 rounded-full font-medium transition-colors ${
                      isSelected
                        ? "bg-accent/15 text-accent"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* 展開描述 */}
              <AnimatePresence>
                {expanded && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-xs text-muted mt-2 leading-relaxed overflow-hidden"
                  >
                    {item.description}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* 展開按鈕 */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded(!expanded);
                }}
                className="mt-2 flex items-center gap-1 text-[10px] text-muted hover:text-accent transition-colors"
              >
                {expanded ? (
                  <>收起 <ChevronUp className="w-3 h-3" /></>
                ) : (
                  <>了解更多 <ChevronDown className="w-3 h-3" /></>
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function BookingStep2Treatment({
  selectedTreatments,
  onToggle,
}: BookingStep2TreatmentProps) {
  // 加入 VISIA 諮詢選項，使用 TreatmentItem 統一型別，避免 `as` 強制轉型
  const allItems: TreatmentItem[] = [
    ...(treatmentsData as TreatmentItem[]),
    {
      id: "visia-consultation",
      title: "VISIA 專業皮膚分析咨詢",
      subtitle: "由專業顧問為您分析皮膚底層問題",
      description:
        "使用 VISIA 皮膚分析儀，深層掃描皮膚狀況，包括斑點、皺紋、毛孔、紫外線損傷等，為您制定個人化護膚方案。",
      price: "免費體驗",
    },
  ];

  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-6"
    >
      {/* 標題區 */}
      <div className="space-y-2">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-accent/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-accent" />
            </div>
            <span className="text-xs font-bold text-accent uppercase tracking-widest">Step 02</span>
          </div>

          {/* 已選標籤 */}
          <AnimatePresence>
            {selectedTreatments.length > 0 && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="flex items-center gap-1.5 bg-accent/10 text-accent text-xs font-bold px-3 py-1.5 rounded-full"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                已選：{selectedTreatments[0]}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-2xl md:text-3xl font-bold text-foreground"
        >
          選擇您感興趣的療程
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-muted text-sm"
        >
          請選擇一項您想預約的療程，點擊「了解更多」查看詳情。
        </motion.p>
      </div>

      {/* 療程列表 */}
      <div className="grid grid-cols-1 gap-3 max-h-[480px] overflow-y-auto pr-1 custom-scrollbar">
        {allItems.map((item, idx) => (
          <TreatmentCard
            key={item.id}
            item={item}
            isSelected={selectedTreatments.includes(item.title)}
            onSelect={() => onToggle(item.title)}
            index={idx}
          />
        ))}
      </div>

      {/* 底部提示 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex items-center gap-2 text-xs text-muted"
      >
        <div className="w-1 h-1 rounded-full bg-accent" />
        不確定選哪個？選擇「VISIA 皮膚分析」，讓我們的專家為您推薦最適合的療程。
      </motion.div>
    </motion.div>
  );
}
