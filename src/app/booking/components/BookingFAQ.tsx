"use client";

/**
 * BookingFAQ — 預約頁面專屬常見問題
 *
 * SEO 策略：
 * - 定位「正在填寫或剛提交預約表格」的訪客心態
 * - 問題圍繞：預約確認流程、多療程選擇、治療師指定、
 *   醫療禁忌（孕婦/哺乳）、個人資料保護
 * - 與聯絡頁 FAQ（到訪/地址/改期）、療程頁 FAQ（選哪款療程）完全差異化
 * - 長尾關鍵字：香港醫美線上預約、醫美預約確認、指定治療師醫美、
 *   醫美個人資料保護、孕婦醫美香港
 */

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";

// ─── 預約頁面專屬 FAQ 資料 ────────────────────────────────────────────────────
// 選題原則：
// 1. 預約後流程（提交後下一步）
// 2. 多療程預約可行性
// 3. 不確定療程的處理方式
// 4. 治療師指定偏好
// 5. 醫療禁忌（孕婦/哺乳）
// 6. 個人資料私隱保護

const FAQ_ITEMS = [
  {
    q: "提交預約表格後，下一步是什麼？幾時會收到確認？",
    a: "成功提交預約表格後，我們的顧問會在 24 小時內透過 WhatsApp 或電話與您聯絡，確認具體預約時間及療程詳情。確認後您會收到 WhatsApp 訊息作記錄。療程前 24 小時我們亦會再次發送提醒通知。如在繁忙時段（如節假日前後）等候超過 24 小時，歡迎直接 WhatsApp 我們查詢。",
    category: "預約確認",
  },
  {
    q: "我可以在一次預約中選擇多於一個療程嗎？",
    a: "可以。您可以在預約表格的「選擇療程」欄位選取多於一個療程。實際能否於同日完成需視乎療程組合及您的皮膚狀況，我們的治療師會在確認預約時為您評估最合適的安排。若您希望深入了解哪些療程適合組合進行，建議在備注欄說明您的皮膚問題，我們會為您提供個人化建議。",
    category: "療程選擇",
  },
  {
    q: "如果我不確定應該選擇哪個療程，可以怎樣預約？",
    a: "完全沒問題。您可以在預約表格的備注欄簡單描述您的皮膚問題（例如：凹凸洞、鬆弛、暗沉），或直接選擇「皮膚諮詢」選項。到診後我們會先為您進行免費 VISIA 第 7 代皮膚影像分析，由治療師根據客觀數據為您推薦最合適的療程，完全沒有壓力。",
    category: "療程選擇",
  },
  {
    q: "我可以在預約時要求指定特定的治療師嗎？",
    a: "可以。如您曾到訪 Peko Beauty 並希望繼續由同一位治療師跟進，歡迎在預約備注欄或透過 WhatsApp 告知我們。我們會盡力配合您的要求，但具體安排須視乎該治療師當日的排程。如指定治療師當日未能安排，我們會提前通知您，讓您決定是否更改時間或由其他同樣專業的治療師接待。",
    category: "治療師安排",
  },
  {
    q: "孕婦或正在哺乳的媽媽可以預約療程嗎？",
    a: "孕婦在整個懷孕期間均不建議進行任何醫學美容療程（包括射頻、微針、超聲波等），以確保母嬰安全。哺乳期媽媽則視乎療程類型而定，部分非入侵性護理療程可能可以安排，但需在預約前告知我們，由治療師評估。如有疑問，建議先諮詢您的婦產科醫生，並在預約時在備注欄說明您的情況。",
    category: "特殊情況",
  },
  {
    q: "在線上預約時提交的個人資料（姓名、電話）如何保護？",
    a: "Peko Beauty 嚴格遵守《個人資料（私隱）條例》。您提供的姓名及電話號碼只用於確認及跟進您的預約，不會用於任何第三方行銷用途，亦不會轉售予任何機構。所有客戶資料均受到安全系統保護。如您希望查閱或刪除您的個人資料記錄，歡迎隨時透過 WhatsApp 或電郵聯絡我們提出要求。",
    category: "私隱保護",
  },
];

// ─── 分類顏色 ─────────────────────────────────────────────────────────────────
const CATEGORY_COLORS: Record<string, string> = {
  預約確認: "bg-blue-100 text-blue-600",
  療程選擇: "bg-green-100 text-green-600",
  治療師安排: "bg-purple-100 text-purple-600",
  特殊情況: "bg-amber-100 text-amber-600",
  私隱保護: "bg-slate-100 text-slate-600",
};

// ─── FAQPage JSON-LD Schema ───────────────────────────────────────────────────
const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

// ─── FAQItem 子元件 ───────────────────────────────────────────────────────────
function FAQItem({
  item,
  index,
  isOpen,
  onToggle,
  inView,
}: {
  item: (typeof FAQ_ITEMS)[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      className={`
        rounded-2xl border-2 overflow-hidden transition-all duration-300
        ${isOpen
          ? "border-accent/30 shadow-md shadow-accent/5"
          : "border-platinum-silver hover:border-accent/30"
        }
      `}
    >
      {/* 問題標題 */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-start gap-4 p-5 text-left group"
      >
        {/* 序號 */}
        <motion.div
          animate={{
            backgroundColor: isOpen
              ? "rgba(197,43,33,0.1)"
              : "rgba(0,0,0,0.04)",
          }}
          className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-colors"
        >
          <span
            className={`text-xs font-black ${
              isOpen ? "text-accent" : "text-muted"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </motion.div>

        <div className="flex-1 min-w-0">
          {/* 分類標籤 */}
          <span
            className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-1.5 ${
              CATEGORY_COLORS[item.category] || "bg-gray-100 text-gray-500"
            }`}
          >
            {item.category}
          </span>
          <h3
            className={`font-bold text-sm leading-snug transition-colors ${
              isOpen
                ? "text-accent"
                : "text-foreground group-hover:text-accent"
            }`}
          >
            {item.q}
          </h3>
        </div>

        {/* 展開圖示 */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`shrink-0 mt-1 transition-colors ${
            isOpen ? "text-accent" : "text-muted"
          }`}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>

      {/* 答案內容 */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pl-[68px]">
              <motion.p
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                className="text-sm text-muted leading-relaxed"
              >
                {item.a}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── 主元件 ───────────────────────────────────────────────────────────────────
export default function BookingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div ref={ref} className="max-w-4xl mx-auto">
      {/* FAQPage JSON-LD Schema */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />

      {/* 標題 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-2 bg-accent/5 border border-accent/10 rounded-full px-4 py-2 mb-4">
          <HelpCircle className="w-4 h-4 text-accent" />
          <span className="text-xs font-bold text-accent uppercase tracking-widest">
            Booking FAQ
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          預約前常見問題
        </h2>
        <p className="text-muted text-sm max-w-md mx-auto">
          關於預約流程、療程選擇及個人資料保護的常見疑問，讓您安心完成預約。
        </p>
      </motion.div>

      {/* FAQ 列表 */}
      <div className="space-y-3">
        {FAQ_ITEMS.map((item, idx) => (
          <FAQItem
            key={item.q}
            item={item}
            index={idx}
            isOpen={openIndex === idx}
            onToggle={() => handleToggle(idx)}
            inView={inView}
          />
        ))}
      </div>

      {/* 底部 CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-10 text-center p-6 bg-gray-50 rounded-3xl border border-platinum-silver"
      >
        <p className="text-sm text-muted mb-4">
          還有其他問題？我們的專業顧問隨時為您解答
        </p>
        <motion.a
          href="https://wa.me/85253353313?text=%E6%88%91%E6%83%B3%E6%9F%A5%E8%A9%A2%E9%A0%90%E7%B4%84%E4%BA%8B%E5%AE%9C"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          aria-label="透過 WhatsApp 查詢預約事宜（新視窗開啟）"
          className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-green-500/20"
        >
          <MessageCircle className="w-4 h-4" aria-hidden="true" />
          WhatsApp 查詢預約事宜
        </motion.a>
      </motion.div>
    </div>
  );
}
