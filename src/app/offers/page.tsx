import type { Metadata } from 'next';
import OffersClient from '@/app/offers/components/OffersClient';

// ─── SEO Metadata (Server Component) ─────────────────────────────────────────
export const metadata: Metadata = {
  title: '新客戶試做優惠 | Peko Beauty 醫學美容中心',
  description:
    '探索 Peko Beauty 為新客戶精心準備的皇牌醫美療程試做優惠，包含 Sylfirm X 矽谷電波、BTL Exion 第五代膠原槍、Ulfit HIFU 無痛拉提等。費用已包含 VISIA 皮膚分析，明碼實價，絕無 Hard Sell。',
  keywords: [
    '醫學美容優惠',
    '新客戶試做',
    'Sylfirm X',
    'BTL Exion',
    'HIFU',
    '旺角美容',
    '凹凸洞治療',
    '皮膚緊緻',
    'Peko Beauty',
  ],
  openGraph: {
    title: '新客戶試做優惠 | Peko Beauty 醫學美容中心',
    description: '皇牌醫美療程試做優惠，費用包含 VISIA 皮膚分析，明碼實價，絕無 Hard Sell。',
    url: 'https://www.peko.com.hk/offers',
    siteName: 'Peko Beauty',
    locale: 'zh_HK',
    type: 'website',
    images: [
      {
        url: '/images/peko-beauty-reception-desk-mong-kok.jpg',
        width: 1200,
        height: 630,
        alt: 'Peko Beauty 新客試做優惠 旺角朗豪坊',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '新客戶試做優惠 | Peko Beauty 醫學美容中心',
    description: '皇牌醫美療程試做優惠，費用包含 VISIA 皮膚分析，明碼實價，絕無 Hard Sell。',
  },
  alternates: {
    canonical: 'https://www.peko.com.hk/offers',
  },
};

// ─── Page (server shell → delegates to client component) ─────────────────────
export default function OffersPage() {
  return <OffersClient />;
}
