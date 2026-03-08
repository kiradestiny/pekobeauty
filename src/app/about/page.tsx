import type { Metadata } from 'next';
import AboutHero from './components/AboutHero';
import AboutManifesto from './components/AboutManifesto';
import AboutPekoStandard from './components/AboutPekoStandard';
import AboutScience from './components/AboutScience';
import AboutFounderLetter from './components/AboutFounderLetter';
import AboutTeam from './components/AboutTeam';
import AboutCTA from './components/AboutCTA';
import AboutFAQ from './components/AboutFAQ';
import Testimonials from '@/components/Testimonials';

export const metadata: Metadata = {
  title: '關於 Peko Beauty｜旺角朗豪坊高端醫美中心 效果為本 原廠正貨',
  description:
    'Peko Beauty 創立於 2025 年，位於香港旺角朗豪坊。全女班資深治療師團隊，平均 10 年+ 臨床經驗，採用 BTL Exion™、Sylfirm X 等 100% 原廠正貨儀器。VISIA AI 皮膚分析，個人化療程規劃，絕無 Hard Sell。',
  alternates: {
    canonical: 'https://www.peko.com.hk/about',
  },
  openGraph: {
    title: '關於 Peko Beauty｜旺角朗豪坊高端醫美中心 效果為本 原廠正貨',
    description:
      'Peko Beauty 全女班資深治療師，VISIA AI 皮膚分析，100% 原廠正貨，絕無 Hard Sell。旺角朗豪坊 40 樓。',
    url: 'https://www.peko.com.hk/about',
    siteName: 'Peko Beauty',
    locale: 'zh_HK',
    type: 'website',
    images: [
      {
        url: '/images/peko-beauty-reception-desk-mong-kok.jpg',
        width: 1200,
        height: 630,
        alt: 'Peko Beauty 旺角朗豪坊醫學美容中心',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '關於 Peko Beauty｜旺角朗豪坊高端醫美中心',
    description:
      'Peko Beauty 全女班資深治療師，VISIA AI 皮膚分析，100% 原廠正貨，絕無 Hard Sell。旺角朗豪坊 40 樓。',
  },
};

export default function AboutPage() {
  return (
    <div className="bg-[#FDFBF8] text-[#2C1810] overflow-x-hidden">

      {/* 1. Hero ── 首屏品牌宣言入口 */}
      <AboutHero />

      {/* 2. Manifesto ── 品牌宣言「誕生於對純粹的渴求」 */}
      <AboutManifesto />

      {/* 3. Peko Standard ── 企業治理四大基準 */}
      <AboutPekoStandard />

      {/* 4. Science of Beauty ── 數據科學 + 比較表格 */}
      <AboutScience />

      {/* 5. Founder Letter ── 創辦人/團隊寄語 */}
      <AboutFounderLetter />

      {/* 8. FAQ ── 關於頁面專屬問題，針對「深入了解品牌」的訪客，含 FAQPage schema */}
      <AboutFAQ />

      {/* 9. CTA ── 行動號召 */}
      <AboutCTA />

    </div>
  );
}
