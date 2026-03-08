import React from 'react';
import { Metadata } from 'next';
import FAQSection from '@/components/FAQSection';

export const metadata: Metadata = {
  title: '常見問題 FAQ | Peko Beauty 旺角醫美中心',
  description: '了解 Peko Beauty 的醫美療程、原廠認證儀器、預約流程及術後護理。我們提供透明的收費與專業的全女班團隊服務。',
  keywords: '醫美FAQ, Peko Beauty常見問題, 旺角醫美, 原廠正貨, 醫美預約, 術後護理',
  alternates: {
    canonical: 'https://www.peko.com.hk/faq',
  },
  openGraph: {
    title: '常見問題 FAQ | Peko Beauty 旺角醫美中心',
    description: '了解 Peko Beauty 的醫美療程、原廠認證儀器、預約流程及術後護理。我們提供透明的收費與專業的全女班團隊服務。',
    url: 'https://www.peko.com.hk/faq',
    siteName: 'Peko Beauty',
    locale: 'zh_HK',
    type: 'website',
  },
};

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-white pt-20">
      <FAQSection />
    </main>
  );
}
