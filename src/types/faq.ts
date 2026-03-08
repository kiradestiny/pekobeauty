/**
 * FAQ 資料型別定義
 * 設計為可重用於所有頁面的標準介面
 */

export interface FaqItem {
  /** 問題文字（同時作為 FAQPage schema 的 name） */
  question: string;
  /** 答案文字（同時作為 FAQPage schema 的 acceptedAnswer.text） */
  answer: string;
  /** 分類標籤（可選，用於分類篩選） */
  category?: string;
}

export interface FAQAccordionProps {
  /** FAQ 資料清單 */
  items: FaqItem[];
  /** 標題（預設：常見問題） */
  title?: string;
  /** 標題強調詞（紅色粗體部分） */
  titleHighlight?: string;
  /** 副標題說明文字 */
  subtitle?: string;
  /** 上方小徽章文字 */
  badge?: string;
  /** CTA 區塊設定 */
  cta?: {
    heading: string;
    subheading: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel?: string;
    secondaryHref?: string;
  };
  /** 注入 FAQPage JSON-LD schema（預設 true，每頁應只有一個 FAQPage schema） */
  injectSchema?: boolean;
  /** 是否顯示搜尋/篩選（完整 FAQ 頁面用，首頁建議關閉） */
  showFilter?: boolean;
  /** 自訂 className */
  className?: string;
}
