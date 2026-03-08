# Peko Beauty — 療程 Landing Page 框架模板

> 參考來源：`/treatments/sylfirm-x`（SylfirmXClient.tsx）
> 用途：為每個新療程建立高轉換率、SEO 優化的 Landing Page 時，遵循此框架

---

## 📐 Section 排列順序（固定）

```
01. StickyNav          — 桌面版錨點導航（sticky top-[64px]）
02. HeroSection        — 主視覺 + H1 + CTA
03. PainPointsSection  — 用戶困擾（你係咪試過呢啲情況？）
04. DirectAnswer       — GEO 核心問答（sr-only，隱藏前端，保留 HTML）
05. KeyTakeaways       — 本頁重點摘要（sr-only，同上）
06. TreatmentStats     — 療程數據一覽（表格）
07. ScienceSection     — 技術原理拆解
08. ProcessSection     — 到店流程步驟       ← 比較表之前
09. ComparisonSection  — 療程比較表          ← hidden md:block（手機隱藏）
10. TestimonialsSection— 真實客人見證
11. TrustSection       — 三大信任支柱
12. PricingSection     — 收費方案            ← 適合人士之前
13. SuitabilitySection — 適合 / 不適合人士
14. FAQSection         — 常見問題 Accordion
15. RelatedSection     — 相關療程推薦（圖版）
16. FinalCTASection    — 最終行動呼籲
```

---

## 01 · StickyNav

```tsx
// 桌面版僅顯示（hidden md:block）
// sticky top-[64px] — 對齊 scrolled 後的 header 高度（h-16 = 64px）
// 導航到各 section anchor id
navItems = ["療程數據", "技術原理", "療程比較", "客人見證", "常見問題", "收費"]
```

**規則：**
- `top-[64px]`（對應 Header `scrolled=true` 時 `py-0 h-16`）
- 只在 `hidden md:block`，手機不顯示

---

## 02 · HeroSection

### 視覺結構
```
┌─────────────────────────────────────────┐
│  [全寬大圖 aspect-[16/9] mobile          │  ← scale 進場動畫
│           aspect-[16/7] desktop]        │
│                           🌟 新客試做價  │  ← 右上角紅色標籤（slideIn）
│                                         │
│  [Trust Badge 1] [Badge 2] [Badge 3]    │  ← 底部玻璃感 badges（fadeUp）
└─────────────────────────────────────────┘
  [H1 三層標題]
  [三大數據卡]
  [副標題]
  [WhatsApp CTA Button]
  ✅ 新客限定 · 明碼實價 · 到店後無需即場決定
```

### H1 三層結構（高 CTR 公式）
```
第一層（主標）：{療程名稱} 香港｜{療程別稱/技術名}
第二層（副標）：{適應症 A} · {適應症 B} · {適應症 C} — 效果 / 次數 / 痛感完整解析
第三層（轉換）：新客試做 HK${價格}｜旺角朗豪坊
```

**範例（Sylfirm X）：**
```
Sylfirm X 香港｜矽谷雙波黃金微針
凹凸洞 · 荷爾蒙斑 · 玫瑰痤瘡 — 效果 / 次數 / 痛感完整解析
新客試做 HK$1,880｜旺角朗豪坊
```

### Badges（玻璃質感）
```tsx
className="bg-white/10 backdrop-blur-md text-white text-[10px] md:text-xs
           px-2.5 md:px-3 py-1 md:py-1.5 rounded-full font-semibold
           border border-white/30
           shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
```

### 三大數據卡（即時說服）
```tsx
// 選 3 個最有說服力的數字
{ val: "70%",    label: "凹凸洞改善率" }
{ val: "30%+",   label: "毛孔縮小"    }
{ val: "4–6小時", label: "極短恢復期" }
```

### Trust Badges 標準清單
```
🏆 美國 FDA 雙模式認證
🇰🇷 韓國 KFDA 認可
👩‍⚕️ 全女班專業團隊
🚫 絕無硬銷
⭐ 5,000+ 真實好評
```

---

## 03 · PainPointsSection

**目的：** 引起共鳴，讓用戶確認「我就係有呢個問題」

### 卡片格式（Image-first Magazine Style）
```tsx
// 每張卡片：
// - 上半部 aspect-[16/9] 圖片佔位區（有圖換 imgSrc，無圖用漸層 + emoji）
// - 下半部：標題 + 描述
// - hover: y: -6px + shadow 加深
// - Accent underline: hover 時從 w-8 展開至 w-14

points = [
  { emoji, tag, title, desc, gradient, accentColor, imgSrc: null }
  // 建議 4 張，2×2 佈局
]
```

### 每個 Pain Point 寫法公式
```
emoji:  情感化 emoji
tag:    簡短分類標籤（2–4字）
title:  「用戶的具體困擾」（帶情感，唔係治療術語）
desc:   描述困擾的詳細情況（60–80字），要有代入感
```

### 收尾 Callout
```
試過好多方法都無效？
因為你一直在治標，唔係治本。
（真正根源說明）
```

---

## 04 · DirectAnswerSection（GEO）

**目的：** 供 AI 爬蟲（Perplexity / ChatGPT / Gemini）索引，不在前端顯示

```tsx
// 使用 className="sr-only"，aria-hidden="false"
// 不用 Framer Motion（省 JS）
// 直接回答：「{療程名稱} 最直接答案：」
// 內容：次數、見效時間、技術特點、Peko 試做價
```

---

## 05 · KeyTakeawaysSection（GEO）

**目的：** 同上，供 AI 索引

```tsx
// className="sr-only"，aria-hidden="false"
// 標準項目：核心問題、技術解碼、Peko 優勢、適合對象、療程次數、試做價
```

---

## 06 · TreatmentStatsSection

### 表格欄位標準（必須包含）
| 圖標 | 標籤 | 備注 |
|---|---|---|
| ⏱ | 療程時間 | 包含敷舒緩膏 |
| 😌 | 痛感指數 | X/10，有描述 |
| 🔴 | **恢復期**（非「停工期」）| 消紅時間 |
| 📅 | 建議次數 | 範圍 + 間隔 |
| ✅ | 見效時間 | 第 X 次後 |
| 📆 | 效果維持 | 避免明確月份，強調「完成完整療程後更穩定」 |
| 🛡️ | 認證 | FDA / CE / KFDA |

### 重要用語規範
| ❌ 禁用 | ✅ 使用 |
|---|---|
| 停工期 | 恢復期 |
| 麻醉藥膏 | 舒緩膏 |
| 術後 | 護理後 / 療程後 |
| 到診 | 到店 |
| 術後專人跟進 | 售後1對1 WhatsApp 跟進 |
| VISIA 360° 皮膚深層分析 | VISIA 皮膚深層分析 |

---

## 07 · ScienceSection

### 結構
```
H2: {療程名} 點樣解決 {問題}？{技術} 原理完整拆解

❶ 問題根源：點解 {問題A}、{問題B} 難以自癒？
   → ReadMoreText（手機 3 行折疊）

❷ 技術解法：{療程} 如何介入？
   → 技術卡片（桌面版：完整說明；手機版：簡化 2 欄版）
   → 技術細節段落（hidden md:block）

❸ 臨床數據：效果有幾好？
   → 4 格數據卡（2×2 grid）

TherapistNote（治療師手記，手機可折疊）
```

### 手機版精簡規則
```tsx
// PW/CW 技術卡片：
// 桌面：hidden md:grid grid-cols-2 完整說明
// 手機：md:hidden grid grid-cols-2 簡化版（標題 + 1行描述）

// 技術細節段落：
// className="hidden md:block"
```

---

## 08 · ProcessSection

### 標準 5 步驟
```
步驟 1: WhatsApp 預約 / 網上預約
步驟 2: 到店 + 免費 VISIA 皮膚深層分析
步驟 3: 個人化方案制定（零硬銷）
步驟 4: 敷舒緩膏 → 療程進行
步驟 5: 冷敷舒緩 + 護理指引 + WhatsApp 跟進
```

### 手機版精簡
```tsx
// 桌面：顯示步驟標題 + 描述
// 手機：只顯示步驟標題（描述加 hidden md:block）
<p className="hidden md:block text-gray-500 text-sm leading-relaxed mt-2">
  {step.desc}
</p>
```

---

## 09 · ComparisonSection

```tsx
// 手機版完全隱藏（複雜表格在小螢幕體驗差）
<AnimatedSection className="hidden md:block py-14 px-4 bg-gray-50">

// 比較欄：⭐ {本店療程}（重點突出）| 競爭方案 1 | 競爭方案 2
// 行項目：核心技術、痛感、恢復期、適合敏感肌、治療 {問題}、反黑風險、效果維持、試做價

// 底部建議框：強調本店優勢，移除對競爭方案的正面推薦
```

---

## 10 · TestimonialsSection

```tsx
// 2 張見證卡（桌面 2 欄，手機 1 欄）
// 每張：圖片佔位區（待客人照片）+ 引言 + 名稱 + 年齡 + 困擾 + 療程次數
// 底部：4 個社交數據（客人滿意度 / 真實好評數 / 具體療程滿意率 / 原廠正貨）
```

---

## 11 · TrustSection

### 三大支柱（固定結構）
```
1. 儀器信任 — 原廠正貨、認證列表、探頭開封示範
2. 服務信任 — 全女班、零硬銷承諾、免費 VISIA 分析
3. 結果信任 — 客人滿意度、真實好評數、售後1對1 WhatsApp 跟進
```

**深色背景（`bg-gray-900`）**，白色文字，品牌紅圖示

---

## 12 · PricingSection

### 固定結構
```
新客體驗方案（突出邊框）  |  療程套票方案（詢問制）
     HK$1,880            |      歡迎查詢
  含免費 VISIA 分析        |  3次/5次/6次可選
```

### 透明承諾（必須保留）
```
💯 Peko Beauty 透明承諾：
到店後無需即場決定購買任何療程 · 沒有最低消費要求
```

---

## 13 · SuitabilitySection

```
✅ 適合做 {療程}（左欄，綠色）  |  ❌ 不建議做 {療程}（右欄，紅色）
   6 個適合條件                  |   6 個禁忌症（懷孕/感染/起搏器等）
```

---

## 14 · FAQSection

### 必答問題清單（至少 8 條）
```
1. {療程} 幾多次先見效？完整療程需要做幾耐？
2. {療程} 痛唔痛？做完可以即日返工嗎？
3. {療程} 同 {競爭方案} 有咩分別？（不推薦競爭方案）
4. {主要適應症} 適合做 {療程} 嗎？
5. 做完 {療程} 需要注意咩？
6. {療程} 香港試做價係幾多？有冇隱藏收費？
7. Peko Beauty 旺角朗豪坊點去？
8. Peko Beauty 接受咩付款方式？
```

---

## 15 · RelatedSection

### 圖版卡片格式
```tsx
// 3 張相關療程（桌面 3 欄，手機 1 欄）
// 每張：aspect-[4/3] 圖片佔位區（imgSrc: null, 漸層 + emoji）+ 標題 + 描述 + CTA

related = [
  { href, emoji, gradient, accentColor, tag, title, desc, cta, imgSrc: null }
]
```

---

## 16 · FinalCTASection

### 結構
```
H2: 準備好告別 {問題A}、{問題B} 了嗎？
副標: 免費 VISIA 皮膚深層分析 + 零壓力專業諮詢
      新客試做價 HK${價格}，明碼實價，絕無隱藏消費

[💬 WhatsApp 立即預約]（唯一 CTA，移除致電按鈕）

地址（items-start md:items-center，修正多行文字 icon 對位）
營業時間
聯絡方式
```

---

## 📱 手機版精簡規則

| Section | 手機處理 |
|---|---|
| `StickyNav` | `hidden md:block`（手機完全隱藏）|
| `ScienceSection` PW/CW 卡片 | 保留簡化 2 欄版 |
| `ScienceSection` 技術細節文字 | `hidden md:block` |
| `ComparisonSection` | `hidden md:block`（整個 Section 隱藏）|
| `ProcessSection` 步驟描述 | `hidden md:block` |

---

## 🔤 文案用語規範

### 必須避免的用語
| ❌ | ✅ |
|---|---|
| 停工期 | 恢復期 |
| 麻醉藥膏 | 舒緩膏 |
| 術後 / 術前 | 療程後 / 療程前 |
| 到診 | 到店 |
| 術後專人 WhatsApp 跟進 | 售後1對1 WhatsApp 跟進 |
| 有效投訴 | （刪除，不提）|
| X 個月（效果維持明確數字）| 視乎個人膚質及完整療程次數 |
| 配合 CO2 Laser / 其他診所儀器 | （刪除，只推薦本店服務）|

### 透明承諾標準措辭
```
💯 Peko Beauty 透明承諾：
到店後無需即場決定購買任何療程 · 沒有最低消費要求
```

---

## 🤖 GEO（生成式引擎優化）架構

### sr-only 隱藏內容策略
```tsx
// 用於 DirectAnswerSection + KeyTakeawaysSection
// CSS: position:absolute; width:1px; height:1px; overflow:hidden; clip:rect(0,0,0,0)
// 效果：瀏覽器不顯示，AI 爬蟲可讀取完整 HTML

<div id="direct-answer" aria-hidden="false" className="sr-only">
  <p>💡 {療程名} 療程最直接答案：</p>
  <p>
    {療程名} 改善 {問題} 通常需要 X–X 次療程，每次間隔 X 週...
    Peko Beauty 旺角朗豪坊新客試做價 HK${價格}，含免費 VISIA 分析。
  </p>
</div>

<div id="key-takeaways" aria-hidden="false" className="sr-only">
  <h3>本頁重點摘要（Key Takeaways）</h3>
  <ul>
    <li>核心問題：...</li>
    <li>技術解碼：...</li>
    <li>Peko 優勢：...</li>
    <li>適合對象：...</li>
    <li>療程次數：...</li>
    <li>試做價：HK${價格}</li>
  </ul>
</div>
```

---

## 🎨 設計系統

### 顏色
```
BRAND_RED = "#C52B21"      — 主品牌色，CTA、重點標題
WA_GREEN  = "#25D366"      — WhatsApp 按鈕
bg-gray-900               — TrustSection 深色背景
bg-[#FAFAFA]              — 淺灰背景區塊
bg-gray-50                — 交替背景
```

### 字體
```tsx
// 標題（H1, H2, H3）
style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}

// 內文：Tailwind 默認
```

### 卡片陰影
```
shadow-sm              ← 預設
hover:shadow-xl        ← hover 時加深
```

### 動畫規範
```tsx
const EASE_OUT: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const fadeUp  = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } } };
const stagger = { hidden: {},                    visible: { transition: { staggerChildren: 0.1 } } };
const scaleIn = { hidden: { opacity: 0, scale: 0.93 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.45 } } };
```

---

## 📋 新療程頁面 Checklist

- [ ] 建立 `/src/app/treatments/{slug}/` 資料夾
- [ ] 建立 `page.tsx`（metadata + `<TreatmentNameClient />`）
- [ ] 建立 `{TreatmentName}Client.tsx`（依本框架）
- [ ] 更新 WA_LINK / WA_BOOKING 的 WhatsApp 預填訊息
- [ ] 填寫 BRAND_RED（如療程有獨立品牌色可調整）
- [ ] 替換 HeroSection 圖片（`/public/images/{slug}-hero.jpg`）
- [ ] 填寫 PainPoints 4 張卡片內容
- [ ] 填寫 TreatmentStats 表格數據
- [ ] 填寫 ScienceSection 技術原理
- [ ] 填寫 ProcessSection 流程（Step 4 名稱按療程調整）
- [ ] 填寫 ComparisonSection 與競爭方案對比（手機隱藏）
- [ ] 填寫 2 條 Testimonials
- [ ] 填寫 PricingSection 定價
- [ ] 填寫最少 8 條 FAQ
- [ ] 填寫 RelatedSection 3 個相關療程
- [ ] DirectAnswerSection + KeyTakeawaysSection 隱藏 GEO 內容
- [ ] 確認所有「停工期/麻醉藥膏/到診/術後」用語已替換
- [ ] 確認 StickyNav `top-[64px]`
- [ ] 確認 ComparisonSection 有 `hidden md:block`
- [ ] TypeScript 編譯通過（`npx tsc --noEmit`）

---

## 💰 官方試做定價一覽（必須嚴格對照）

> ⚠️ 每次建立新頁面前，必須對照此表確認正確價格，避免寫錯。

### A. 核心療程

| 療程 Slug | 療程名稱 | 核心技術 | 主要改善 | 試做定價（HKD） |
|:---|:---|:---|:---|:---|
| `sylfirm-x` | **Sylfirm X** | Dual Wave RF Microneedling（PW/CW）| 凹凸洞 / 荷爾蒙斑 / 紅印 / 玫瑰痤瘡 | **$1,880**（全面）|
| `btl-exion` | **BTL Exion 面+眼+頸** | Monopolar RF + Targeted Ultrasound + AI | 鬆弛 / 皺紋 / 蘋果肌下垂 / 眼袋淚溝 | **$680** |
| `btl-exion-rf-microneedling` | **BTL Exion（黃金微針）** | AI Fractional RF 微針射頻 | 深層皺紋 / 鬆弛 / 嚴重凹凸洞 | **$2,980** |
| `btl-exion-body` | **BTL Exion（Body）** | Monopolar RF + Targeted Ultrasound | 肚腩 / 拜拜肉 / 大腿脂肪 / 鬆弛 | **$680/part** |
| `btl-exion-eye` | **BTL Exion（Eye）** | Monopolar RF + Ultrasound | 眼袋 / 黑眼圈 / 眼紋 / 眼皮鬆弛 | **$380** |
| `xe-lha-peel` | **XE LHA Peel** | LHA（Lipo Hydroxy Acid）+ Alkali | 暗瘡印 / 粗糙 / 敏感肌 / 閉塞粉刺 | **$980** |
| `ulfit-hifu` | **Ulfit HIFU** | MFU（Micro-Focused Ultrasound）| 包包面 / 雙下巴 / 輪廓下垂 | **$1,480**（500發）|
| `venus-glow` | **Venus Glow** | 360° Rotating Vacuum + Dual Jet Streams | 黑頭粉刺 / 油光 / 暗啞 | **$480** |
| `btl-emfemme-360` | **BTL EMfemme 360** | 360° Volumetric Heating（RF）| 尿滲 / 陰道鬆弛 / 行房痛 | **$3,680** |

### B. Hollywood Spectra 專項治療系列（5-in-1 Laser）

| Slug / Mode | 模式名稱 | 探頭 / 技術 | 最適改善 | 定價（HKD）|
|:---|:---|:---|:---|:---|
| `hollywood-spectra-laser` | **Laser Facial** | 1064nm Q-switched | 面黃 / 膚色不均 / 荷爾蒙斑 / 反黑 | **$880** |
| `hollywood-spectra-laser` | **蜂巢無創膠原** | MLA Handpiece（Fractional）| 毛孔粗大 / 凹凸洞 / 皺紋 | **$980** |
| `hollywood-spectra-laser` | **Carbon Peel** | 1064nm + Carbon Lotion | 油光 / 暗瘡粉刺 / 黑頭 | **$880** |
| `hollywood-spectra-laser` | **Golden Laser** | 585nm Gold Toning | 紅印（PIE）/ 玫瑰痤瘡 / 泛紅 | **$1,280** |
| `hollywood-spectra-laser` | **色斑針對治療** | 532nm / 1064nm High Energy | 雀斑 / 曬斑 / 老人斑 / 顴痣 | **$880** |

### C. 各療程 USP 簡記（用於 Hero 副標題及比較表）

| 療程 | 最重要 USP（1–2 句）|
|:---|:---|
| Sylfirm X | 全球唯一雙波 RF 微針（PW+CW），修復基底膜，4–6 小時退紅，原廠探頭即場開封 |
| BTL Exion | 全球唯一激生 +224% 透明質酸、+47% 膠原，無痛無創，AI 單極 RF + 超聲波 |
| BTL Exion 黃金微針 | Single Pass 技術，AI 脈衝控制能量，痛感比傳統微針低 |
| XE LHA Peel | 第四代鹼性煥膚，Fill & Peel 概念，零脫皮，玻璃肌效果 |
| Ulfit HIFU | TDT 擴散式加熱技術，圓形探頭貼合面型，筋膜層提拉 |
| Venus Glow | 70 微米水流，非物理擠壓，即時玻璃肌 |
| Hollywood Spectra | 5-in-1 激光平台，Q-switched + MLA + Gold Toning + 532nm 多模式 |
| BTL EMfemme 360 | 360° 體積加熱，改善黏膜健康，全女班主理，一次性探頭 |
