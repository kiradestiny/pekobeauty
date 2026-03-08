import { 
  Sparkles, 
  ShieldCheck, 
  HeartHandshake, 
  BadgeCheck, 
  Search,
  Activity,
  Zap,
  Clock
} from "lucide-react";

export const homeData = {
  hero: {
    h1: "香港醫美權威 | Peko Beauty 肌源解碼",
    subtitle: "始於肌源 忠於完美",
    cta: "立即預約",
    ctaLink: "/booking"
  },
  symptomChecker: {
    title: "您正面對甚麼肌膚困擾？",
    subtitle: "點擊您的肌膚問題，為您配對專屬醫學美容方案",
    items: [
      {
        id: "acne-scars",
        title: "凹凸洞 / 暗瘡印",
        description: "月球表面、色素沉澱",
        link: "/treatments/sylfirm-x"
      },
      {
        id: "pigmentation",
        title: "荷爾蒙斑 / 色斑",
        description: "雀斑、太陽斑、膚色暗啞",
        link: "/treatments/sylfirm-x"
      },
      {
        id: "sagging",
        title: "鬆弛下垂 / 包包面",
        description: "輪廓模糊、蘋果肌下垂",
        link: "/treatments/ulfit-hifu"
      },
      {
        id: "wrinkles",
        title: "皺紋 / 表情紋",
        description: "魚尾紋、抬頭紋、法令紋",
        link: "/treatments/btl-exion"
      },
      {
        id: "pores",
        title: "毛孔粗大",
        description: "油脂分泌旺盛、皮膚粗糙",
        link: "/treatments/sylfirm-x"
      },
      {
        id: "eye-bags",
        title: "眼袋 / 黑眼圈",
        description: "眼部浮腫、眼紋",
        link: "/treatments/btl-exion"
      },
      {
        id: "post-partum",
        title: "產後修身 / 肚紋",
        description: "腹直肌分離、妊娠紋",
        link: "/treatments/btl-exion"
      },
      {
        id: "sensitive",
        title: "敏感 / 玫瑰痤瘡",
        description: "泛紅、微絲血管顯現",
        link: "/treatments/sylfirm-x"
      }
    ]
  },
  signatureTreatments: {
    title: "皇牌療程推介",
    subtitle: "SIGNATURE TREATMENTS",
    items: [
      {
        id: "sylfirm-x",
        name: "Sylfirm X 矽谷電波",
        efficacyTitle: "凹凸洞終結者・修復基底膜",
        description: "全球首創雙波微針射頻，針對性解決凹凸洞、荷爾蒙斑及玫瑰痤瘡。修復受損基底膜，從根源重建健康肌膚。",
        tags: ["凹凸洞", "荷爾蒙斑", "玫瑰痤瘡"],
        image: "/images/sylfirm-x.jpg", // Placeholder
        link: "/treatments/sylfirm-x"
      },
      {
        id: "btl-exion",
        name: "BTL Exion™",
        efficacyTitle: "AI 膠原自生・激增透明質酸",
        description: "結合單極射頻與靶向超聲波，全球唯一能自然激生透明質酸的技術。無痛提升蘋果肌，重塑立體輪廓。",
        tags: ["膠原自生", "提升輪廓", "去皺紋"],
        image: "/images/btl-exion.jpg", // Placeholder
        link: "/treatments/btl-exion"
      },
      {
        id: "ulfit-hifu",
        name: "Ulfit HIFU",
        efficacyTitle: "無痛 V 面拉提・緊緻輪廓",
        description: "第 4 代擴散式加熱技術，獨有圓形探頭靈活修飾輪廓。無痛無需敷麻，即時見效，打造緊緻 V 面。",
        tags: ["V面拉提", "緊緻肌膚", "雙下巴"],
        image: "/images/ulfit-hifu.jpg", // Placeholder
        link: "/treatments/ulfit-hifu"
      }
    ]
  },
  whyUs: {
    title: "為何選擇 Peko Beauty?",
    subtitle: "OUR PROMISE",
    items: [
      {
        title: "全女班醫療團隊",
        description: "專業細心，同聲同氣，讓您在私密舒適的環境中享受療程。",
        icon: "users"
      },
      {
        title: "原廠正貨保證",
        description: "堅持使用 100% 原廠正貨儀器及產品，安全可靠，效果有保證。",
        icon: "shield"
      },
      {
        title: "絕無 Hard Sell",
        description: "明碼實價，拒絕疲勞轟炸。我們相信效果才是最好的推銷。",
        icon: "heart"
      },
      {
        title: "量膚定制方案",
        description: "專業皮膚分析，針對您的肌膚問題，度身訂造最合適的治療方案。",
        icon: "clipboard"
      }
    ]
  },
  socialProof: {
    title: "客戶真實好評",
    subtitle: "TESTIMONIALS",
    reviews: [
      {
        name: "Sarah L.",
        treatment: "Sylfirm X 矽谷電波",
        content: "第一次做 Sylfirm X，效果真的很驚喜！凹凸洞明顯改善了，治療師很細心，完全不痛。環境也很舒服，沒有壓迫感。",
        rating: 5
      },
      {
        name: "Michelle C.",
        treatment: "BTL Exion™",
        content: "Exion 的效果比我想像中更好，蘋果肌真的提升了，而且過程很舒服，像做 spa 一樣。做完即時見到效果！",
        rating: 5
      },
      {
        name: "Jessica W.",
        treatment: "Ulfit HIFU",
        content: "這裡的環境很舒適，沒有 hard sell，可以很放鬆地享受療程。HIFU 做完面型真的尖了，強烈推薦！",
        rating: 5
      }
    ]
  },
  seoContent: {
    title: "香港醫美趨勢與 Peko Beauty 品牌理念",
    content: `
      <p>在競爭激烈的<strong>香港醫美</strong>市場中，Peko Beauty 始終堅持「始於肌源，忠於完美」的品牌理念。我們深信，真正的美麗源於健康的肌膚底層。因此，我們引進全球頂尖的醫學美容科技，如 <strong>Sylfirm X 矽谷電波</strong>、<strong>BTL Exion</strong> 及 <strong>Ulfit HIFU</strong>，致力於為每一位客人提供最安全、有效的治療方案。</p>
      <p>不同於坊間的美容中心，Peko Beauty 專注於<strong>肌源解碼</strong>，透過專業的皮膚分析，深入了解您的肌膚問題——無論是<strong>凹凸洞</strong>、<strong>荷爾蒙斑</strong>、<strong>皮膚鬆弛</strong>還是<strong>產後修身</strong>需求。我們的全女班專業團隊，以豐富的臨床經驗，為您量身定制專屬的治療計劃，拒絕千篇一律的流水作業。</p>
      <p>我們承諾<strong>絕無 Hard Sell</strong>，所有療程<strong>明碼實價</strong>，並堅持使用<strong>原廠正貨</strong>。在 Peko Beauty，您可以在舒適、私密的環境中，安心享受變美的過程。我們不僅解決您的肌膚困擾，更希望透過改善外在，提升您的自信，讓您由內而外散發光彩。立即預約 Peko Beauty，體驗不一樣的香港醫美服務。</p>
    `
  }
};
