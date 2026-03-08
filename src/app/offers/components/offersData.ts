// ─── Types ───────────────────────────────────────────────────────────────────
export interface Promotion {
  id: string;
  /** Internal series grouping */
  series: 'flagship' | 'hollywood-spectra';
  title: string;
  subtitle: string;
  /** Short display tag (e.g. 皇牌推介 / 全能激光) */
  tag: string;
  tagColor?: string;
  /** Core technology chip text */
  coreTech: string;
  /** Primary targeted skin concerns */
  concerns: string[];
  /** 2-3 sentence treatment description */
  description: string;
  /** Key selling point / USP always displayed on card */
  usp: string;
  /** "Why better than X" comparison note, shown in detail view */
  advantage: string;
  trialPrice: string;
  originalPrice: string;
  image: string;
  popular: boolean;
  /** Legacy category kept for concern-page deep links */
  category: string;
  link: string;
  rating?: number;
  reviewCount?: number;
  bookingsThisMonth?: number;
  duration?: string;
  highlights?: string[];
}

// ─── Constants ────────────────────────────────────────────────────────────────
export const BRAND_RED = '#C52B21';
export const HOLLYWOOD_ORANGE = '#C75E1A';

/** Series display config */
export const SERIES_CONFIG = {
  flagship: {
    label: '皇牌儀器系列',
    labelShort: '皇牌儀器',
    color: BRAND_RED,
    gradient: 'from-[#C52B21] to-[#8B0000]',
    bgLight: 'bg-red-50',
    borderClass: 'border-t-[#C52B21]',
  },
  'hollywood-spectra': {
    label: 'Hollywood Spectra™ 激光系列',
    labelShort: 'Hollywood Spectra',
    color: HOLLYWOOD_ORANGE,
    gradient: 'from-[#C75E1A] to-[#7C3B0D]',
    bgLight: 'bg-orange-50',
    borderClass: 'border-t-[#C75E1A]',
  },
} as const;

// ─── Promotions Data ──────────────────────────────────────────────────────────
export const promotions: Promotion[] = [
  // ── FLAGSHIP SERIES ────────────────────────────────────────────────────────

  {
    id: 'sylfirm-x',
    series: 'flagship',
    title: 'Sylfirm X 矽谷電波',
    subtitle: '凹凸洞 / 荷爾蒙斑專家',
    tag: '皇牌推介',
    tagColor: BRAND_RED,
    coreTech: 'Dual Wave RF Microneedling（PW/CW）',
    concerns: ['凹凸洞', '荷爾蒙斑', '暗瘡紅印', '玫瑰痤瘡', '毛孔粗大'],
    description:
      '第 2 代雙波 (PW/CW) 雙極射頻微針。修復受損基底膜，抑制異常血管增生，同時刺激膠原蛋白重組。',
    usp: '修復基底膜 · 不結焦 · 4-6小時退紅 · 原廠探頭即場開封',
    advantage:
      '相比 CO2 Laser 痛感極低，無結焦，恢復期僅 4-6 小時，是凹凸洞及荷爾蒙斑的頂尖選擇。',
    trialPrice: '1,880',
    originalPrice: '4,000',
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=800',
    popular: true,
    category: '皮膚修復',
    link: '/treatments/sylfirm-x',
    rating: 4.9,
    reviewCount: 128,
    bookingsThisMonth: 85,
    duration: '60 分鐘',
    highlights: ['修復基底膜，根治凹凸洞', '抑制血管增生，消退玫瑰痤瘡', '刺激膠原重組，改善荷爾蒙斑'],
  },

  {
    id: 'btl-exion-face',
    series: 'flagship',
    title: 'BTL Exion™ 面＋眼＋頸',
    subtitle: 'AI 自生膠原 · 無痛無創',
    tag: '科技首選',
    tagColor: '#1A6B8A',
    coreTech: 'Monopolar RF + Targeted Ultrasound + AI',
    concerns: ['面部鬆弛', '蘋果肌下垂', '皺紋', '眼袋', '淚溝', '膠原流失'],
    description:
      '結合「單極射頻」與「靶向超聲波」，AI 智能控制能量。臨床證實激生透明質酸 +224%、膠原蛋白 +47%。',
    usp: '+224% 透明質酸 · +47% 膠原蛋白 · 全球唯一激生 · 無痛無創',
    advantage:
      '全球唯一能自然激生透明質酸，無痛、無創、無恢復期，效果比傳統單極射頻更顯著持久。',
    trialPrice: '680',
    originalPrice: '2,200',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=800',
    popular: true,
    category: '緊緻拉提',
    link: '/treatments/btl-exion',
    rating: 4.8,
    reviewCount: 96,
    bookingsThisMonth: 72,
    duration: '45 分鐘',
    highlights: ['透明質酸激生 +224%', '膠原蛋白 +47%', 'AI 智能能量控制'],
  },

  {
    id: 'btl-exion-microneedle',
    series: 'flagship',
    title: 'BTL Exion™ 黃金微針',
    subtitle: '深層改造 · AI 射頻微針',
    tag: '深層重塑',
    tagColor: '#8B6914',
    coreTech: 'AI Fractional RF Microneedling',
    concerns: ['深層皺紋', '嚴重鬆弛', '嚴重凹凸洞', '毛孔粗大', '皮膚缺乏彈性'],
    description:
      'AI Fractional RF 分段射頻微針系統，配備 Single Pass 技術，AI 脈衝精準控制每針能量。',
    usp: 'Single Pass 技術 · AI 脈衝控能 · 痛感比傳統微針低',
    advantage:
      '採用 Single Pass 技術，一次走針完成療程，AI 即時調整脈衝能量，恢復期更短，效果更均勻。',
    trialPrice: '2,980',
    originalPrice: '5,800',
    image: 'https://images.unsplash.com/photo-1570172619992-052267ad7c3f?q=80&w=800',
    popular: false,
    category: '皮膚修復',
    link: '/treatments/btl-exion-microneedle',
    rating: 4.8,
    reviewCount: 44,
    bookingsThisMonth: 28,
    duration: '75 分鐘',
    highlights: ['Single Pass 一次完成', 'AI 即時脈衝控制', '深層膠原重組'],
  },

  {
    id: 'btl-exion-body',
    series: 'flagship',
    title: 'BTL Exion™ Body',
    subtitle: '溶脂 + 緊膚 + 激生三效',
    tag: '身體雕塑',
    tagColor: '#2E7D32',
    coreTech: 'Monopolar RF + Targeted Ultrasound',
    concerns: ['肚腩', '拜拜肉', '大腿脂肪', '身體鬆弛', '橙皮紋'],
    description:
      '結合單極射頻與靶向超聲波，同步溶脂、緊膚、激生透明質酸及膠原，三效合一非入侵式身體療程。',
    usp: '溶脂 + 緊膚 + 激生三效 · +224% 透明質酸 · 無痛無創',
    advantage:
      '不同於傳統溶脂只針對脂肪，BTL Exion Body 同時啟動膠原及透明質酸激生，緊膚效果更全面。',
    trialPrice: '680',
    originalPrice: '1,800',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800',
    popular: false,
    category: '緊緻拉提',
    link: '/treatments/btl-exion-body',
    rating: 4.7,
    reviewCount: 38,
    bookingsThisMonth: 31,
    duration: '40 分鐘/部位',
    highlights: ['溶脂 + 緊膚同步進行', '激生透明質酸 +224%', '無需恢復期'],
  },

  {
    id: 'btl-exion-eye',
    series: 'flagship',
    title: 'BTL Exion™ 眼部',
    subtitle: '眼袋小熨斗 · 眼周激活',
    tag: '眼部專項',
    tagColor: '#5C35A0',
    coreTech: 'Monopolar RF + Targeted Ultrasound（眼周版）',
    concerns: ['眼袋', '黑眼圈', '眼紋', '眼皮鬆弛', '淚溝'],
    description:
      '採用專為眼周設計的儀器頭，結合單極射頻與超聲波能量，促進眼周微循環，激生膠原與透明質酸。',
    usp: '眼袋小熨斗 · 促進眼周微循環 · 激生膠原與HA',
    advantage:
      '眼周皮膚極薄，傳統儀器難以安全使用。BTL Exion 眼部探頭專為眼周設計，安全且有效。',
    trialPrice: '380',
    originalPrice: '1,200',
    image: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?q=80&w=800',
    popular: false,
    category: '緊緻拉提',
    link: '/treatments/btl-exion-eye',
    rating: 4.7,
    reviewCount: 52,
    bookingsThisMonth: 48,
    duration: '30 分鐘',
    highlights: ['消退眼袋及淚溝', '改善眼周微循環', '促進膠原與透明質酸激生'],
  },

  {
    id: 'dep-mesotherapy',
    series: 'flagship',
    title: 'DEP 無針水光',
    subtitle: '電穿孔深層導入 · 媲美水光針',
    tag: '無針補水',
    tagColor: '#1565C0',
    coreTech: 'Dermal Electroporation（DEP）',
    concerns: ['皮膚缺水', '暗啞膚色', '乾紋', '毛孔粗大', '敏感肌'],
    description:
      '利用電穿孔技術在細胞膜開啟奈米通道，將透明質酸、維他命 C 等活性成分直接導入真皮層，媲美水光針效果，完全無針無痛。',
    usp: '媲美水光針效果 · 完全無針無痛 · 零恢復期即刻化妝',
    advantage:
      '無針無創，比傳統水光針更安全，適合怕針人士。電穿孔技術確保活性成分真正滲透至真皮層，非停留在表皮。',
    trialPrice: '980',
    originalPrice: '1,980',
    image: 'https://images.unsplash.com/photo-1570172619992-052267ad7c3f?q=80&w=800',
    popular: false,
    category: '深層補水',
    link: '/treatments/dep-mesotherapy',
    rating: 4.8,
    reviewCount: 47,
    bookingsThisMonth: 39,
    duration: '45 分鐘',
    highlights: ['電穿孔真正滲透真皮層', '醫療級透明質酸配方', '即時水潤光澤效果'],
  },

  {
    id: 'xe-lha-peel',
    series: 'flagship',
    title: 'XE LHA Peel',
    subtitle: '第四代鹼性煥膚 · 零脫皮',
    tag: '溫和煥膚',
    tagColor: '#AD5C6D',
    coreTech: 'LHA（Lipo Hydroxy Acid）+ Alkaline',
    concerns: ['暗瘡印', '閉塞粉刺', '粗糙膚質', '敏感肌', '膚色暗沉'],
    description:
      '第四代 LHA 鹼性煥膚技術。Fill & Peel 理念：先填充後換膚，不損屏障。適合所有膚質包括敏感肌。',
    usp: 'Fill & Peel 概念 · 零脫皮 · 玻璃肌效果 · 敏感肌亦適用',
    advantage:
      '傳統換膚多以酸性剝落角質層，容易致敏。LHA Peel 採用鹼性技術，先滋補後換膚，更安全溫和。',
    trialPrice: '980',
    originalPrice: '1,980',
    image: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?q=80&w=800',
    popular: false,
    category: '深層保養',
    link: '/treatments/xe-lha-peel',
    rating: 4.7,
    reviewCount: 61,
    bookingsThisMonth: 44,
    duration: '50 分鐘',
    highlights: ['零脫皮，即做即出', '敏感肌安全使用', 'Fill & Peel 玻璃肌效果'],
  },

  {
    id: 'ulfit-hifu',
    series: 'flagship',
    title: 'Ulfit HIFU',
    subtitle: '無痛 V 面 · 輪廓提拉',
    tag: '輪廓雕塑',
    tagColor: '#00695C',
    coreTech: 'MFU Micro-Focused Ultrasound（TDT）',
    concerns: ['包包面', '雙下巴', '輪廓下垂', '下顎線模糊', '虎紋', '頸紋'],
    description:
      '第 4 代 MFU 擴散式加熱技術（TDT），獨有圓形探頭貼合面型，精準對準筋膜層（SMAS）提拉收緊。',
    usp: 'TDT 擴散加熱 · 圓形探頭貼面 · 無痛免麻膏 · 500 發',
    advantage:
      '圓形探頭能避開面頰凹陷位，只瘦該瘦的地方。過程無痛，無需敷麻膏，舒適度遠勝傳統 HIFU。',
    trialPrice: '1,480',
    originalPrice: '3,800',
    image: 'https://images.unsplash.com/photo-1588516903720-8ceb67f96d2c?q=80&w=800',
    popular: false,
    category: '緊緻拉提',
    link: '/treatments/ulfit-hifu',
    rating: 4.8,
    reviewCount: 89,
    bookingsThisMonth: 61,
    duration: '60 分鐘',
    highlights: ['500 發全面提拉', 'TDT 擴散式加熱', '無痛無需麻膏'],
  },

  {
    id: 'venus-glow',
    series: 'flagship',
    title: 'Venus Glow™',
    subtitle: '毛孔深層吸塵 · 即時發光肌',
    tag: '即效清潔',
    tagColor: '#7B5EA7',
    coreTech: '360° Rotating Vacuum + Dual Jet Streams',
    concerns: ['黑頭粉刺', '油光', '毛孔粗大', '膚色暗啞', '角質堆積'],
    description:
      '結合真空吸力、360° 旋轉探頭及兩條 70 微米極幼噴射水流，深入毛孔沖走污垢油脂，非物理擠壓。',
    usp: '70 微米噴射水流 · 非物理擠壓 · 即時玻璃肌',
    advantage:
      '比傳統 Aqua Peel 更溫和且清潔力更強。旋轉吸頭確保每個毛孔方向都被覆蓋，即時呈現發光肌。',
    trialPrice: '480',
    originalPrice: '1,280',
    image: 'https://images.unsplash.com/photo-1552693673-1bf958298935?q=80&w=800',
    popular: false,
    category: '深層清潔',
    link: '/treatments/venus-glow',
    rating: 4.6,
    reviewCount: 52,
    bookingsThisMonth: 38,
    duration: '40 分鐘',
    highlights: ['360° 旋轉探頭全面覆蓋', '70 微米水流非物理擠壓', '即時玻璃肌效果'],
  },

  {
    id: 'btl-emfemme-360',
    series: 'flagship',
    title: 'BTL EMfemme 360',
    subtitle: '私密修復 · 全女班主理',
    tag: '女性專屬',
    tagColor: '#AD1457',
    coreTech: '360° Volumetric Heating RF',
    concerns: ['尿滲', '陰道鬆弛', '行房痛', '陰道乾澀', '更年期保養'],
    description:
      '360 度體積式射頻加熱，均勻作用於陰道黏膜層及盆底組織，刺激膠原增生，增厚陰道壁。',
    usp: '改善黏膜健康 · 全女班主理 · 一次性探頭衛生保證',
    advantage:
      '非入侵性，無痛無創，全女班操作確保私隱。一次性探頭使用，衛生標準最高，比幸福椅更全面修復黏膜。',
    trialPrice: '3,680',
    originalPrice: '8,800',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800',
    popular: false,
    category: '私密護理',
    link: '/treatments/btl-emfemme-360',
    rating: 4.9,
    reviewCount: 41,
    bookingsThisMonth: 22,
    duration: '30 分鐘',
    highlights: ['無創 360° 全方位修復', '全女班操作保障私隱', '一次性探頭醫療級衛生'],
  },

  // ── HOLLYWOOD SPECTRA SERIES ───────────────────────────────────────────────

  {
    id: 'hollywood-laser-facial',
    series: 'hollywood-spectra',
    title: 'Spectra™ Laser Facial',
    subtitle: '美白嫩膚 · 極速均勻膚色',
    tag: '美白首選',
    tagColor: HOLLYWOOD_ORANGE,
    coreTech: '1064nm Q-switched Nd:YAG',
    concerns: ['面黃', '膚色不均', '荷爾蒙斑', '反黑', '暗啞'],
    description:
      '1064nm Q-switched 激光，搭載 HyperSurge 震動技術，極速打散黑色素，精準美白均勻膚色。',
    usp: '極速打散黑色素 · HyperSurge 技術 · 零恢復期',
    advantage:
      '比傳統 Pico 更溫和，更適合易反黑的亞洲膚質。全面均勻提亮，以 30 分鐘換回明亮白皙。',
    trialPrice: '880',
    originalPrice: '1,800',
    image: 'https://images.unsplash.com/photo-1612532237444-25a6fcacebea?q=80&w=800',
    popular: false,
    category: '煥膚美白',
    link: '/treatments/hollywood-spectra-laser',
    rating: 4.7,
    reviewCount: 78,
    bookingsThisMonth: 55,
    duration: '30 分鐘',
    highlights: ['極速打散黑色素', '均勻提亮膚色', '零恢復即出'],
  },

  {
    id: 'hollywood-honeycomb',
    series: 'hollywood-spectra',
    title: 'Spectra™ 蜂巢無創膠原',
    subtitle: '不破皮重啟修復 · 煥膚無痕',
    tag: '無創換膚',
    tagColor: HOLLYWOOD_ORANGE,
    coreTech: 'MLA Fractional Handpiece（LIOB）',
    concerns: ['毛孔粗大', '凹凸洞', '細紋', '皮膚粗糙', '暗啞'],
    description:
      'MLA（Micro Lens Array）分段激光，利用 LIOB 熱誘光致空泡技術，不破皮重啟皮膚修復機制。',
    usp: 'LIOB 熱誘空泡 · 不破皮 · 重啟修復機制',
    advantage:
      '有別於傳統 CO2 分段激光需破皮，蜂巢模式完全不破皮，恢復期極短，膚色均勻改善效果顯著。',
    trialPrice: '980',
    originalPrice: '1,980',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800',
    popular: false,
    category: '皮膚修復',
    link: '/treatments/hollywood-spectra-laser',
    rating: 4.7,
    reviewCount: 63,
    bookingsThisMonth: 47,
    duration: '35 分鐘',
    highlights: ['LIOB 熱誘空泡技術', '不破皮零恢復期', '毛孔收細 + 凹凸洞改善'],
  },

  {
    id: 'hollywood-carbon-peel',
    series: 'hollywood-spectra',
    title: 'Spectra™ Carbon Peel',
    subtitle: '碳粉激光 · 深層控油',
    tag: '油肌必備',
    tagColor: HOLLYWOOD_ORANGE,
    coreTech: '1064nm Laser + Carbon Lotion',
    concerns: ['油光', '暗瘡', '粉刺', '黑頭', '毛孔粗大'],
    description:
      '在面部均勻塗上專用碳粉，再以 1064nm 激光照射，碳粒吸光瞬間爆炸，帶走油脂及污垢。',
    usp: '碳粉吸光帶走油脂 · 即時收縮皮脂腺 · 殺菌消炎',
    advantage:
      'Hollywood 明星御用的發光療程，油光問題立竿見影。碳粉作為天然導體，比傳統光療更精準控油。',
    trialPrice: '880',
    originalPrice: '1,800',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=800',
    popular: false,
    category: '深層清潔',
    link: '/treatments/hollywood-spectra-laser',
    rating: 4.6,
    reviewCount: 91,
    bookingsThisMonth: 66,
    duration: '40 分鐘',
    highlights: ['碳粉吸光深層清潔', '即時收縮皮脂腺', '殺菌消炎改善暗瘡'],
  },

  {
    id: 'hollywood-golden-laser',
    series: 'hollywood-spectra',
    title: 'Spectra™ Golden Laser',
    subtitle: '消退紅印 · 針對微血管',
    tag: '紅印專攻',
    tagColor: HOLLYWOOD_ORANGE,
    coreTech: '585nm Gold Toning Handpiece',
    concerns: ['紅印（PIE）', '玫瑰痤瘡', '泛紅', '血管擴張', '發炎後紅腫'],
    description:
      '585nm 黃金激光，精準靶向血紅素及微血管，消退暗瘡後紅印（PIE）及玫瑰痤瘡泛紅，消炎退腫。',
    usp: '針對血紅素 · 消退 PIE 紅印 · 抑制玫瑰痤瘡',
    advantage:
      '585nm 波長為血紅素吸收高峰，對紅印及玫瑰痤瘡的針對性遠超傳統 1064nm 激光。',
    trialPrice: '1,280',
    originalPrice: '2,480',
    image: 'https://images.unsplash.com/photo-1520338801623-dae20424e6fb?q=80&w=800',
    popular: false,
    category: '皮膚修復',
    link: '/treatments/hollywood-spectra-laser',
    rating: 4.8,
    reviewCount: 57,
    bookingsThisMonth: 42,
    duration: '30 分鐘',
    highlights: ['585nm 靶向血紅素', '消退 PIE 暗瘡紅印', '抑制玫瑰痤瘡泛紅'],
  },

  {
    id: 'hollywood-pigment',
    series: 'hollywood-spectra',
    title: 'Spectra™ 色斑治療',
    subtitle: '定點擊碎深淺色素',
    tag: '去斑專攻',
    tagColor: HOLLYWOOD_ORANGE,
    coreTech: '532nm / 1064nm High Energy Q-switched',
    concerns: ['雀斑', '曬斑', '老人斑', '顴痣', '咖啡斑', '黃褐斑'],
    description:
      '結合 532nm（淺層）及 1064nm（深層）高能量 Q-switched 激光，定點精準擊碎表層及深層色素。',
    usp: '雙波長雙深度 · 定點色素擊碎 · 表層至深層',
    advantage:
      '雙波長同一台儀器切換，可同時處理表淺雀斑及深層顴痣，比單一波長更全面且效率更高。',
    trialPrice: '880',
    originalPrice: '1,800',
    image: 'https://images.unsplash.com/photo-1526758097130-bab247274f58?q=80&w=800',
    popular: false,
    category: '煥膚美白',
    link: '/treatments/hollywood-spectra-laser',
    rating: 4.7,
    reviewCount: 49,
    bookingsThisMonth: 35,
    duration: '30 分鐘',
    highlights: ['雙波長覆蓋深淺色素', '定點精準少傷鄰近組織', '雀斑 / 老人斑 / 顴痣'],
  },
];

// ─── Trust Points ──────────────────────────────────────────────────────────────
export const trustPoints = [
  {
    icon: 'ShieldCheck',
    title: '原廠正貨保證',
    description:
      'Peko Beauty 嚴格執行「原廠正貨」標準，所有儀器探頭均可即場核實序號，確保療程安全及有效。',
    stat: '100%',
    statLabel: '原廠認證',
  },
  {
    icon: 'Clock',
    title: '明碼實價',
    description:
      '絕無隱藏收費。試做優惠已包含所有諮詢及護理費用，讓您在無壓力的情況下體驗醫美。',
    stat: '0',
    statLabel: '隱藏費用',
  },
  {
    icon: 'Users',
    title: '專業全女班',
    description:
      '由富有經驗的女性治療師主理，特別在私密處療程提供最高度私隱與細膩照顧。',
    stat: '5★',
    statLabel: '服務評分',
  },
];
