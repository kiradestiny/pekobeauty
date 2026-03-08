import React from 'react';
import TreatmentDetailClient from './TreatmentDetailClient';
import treatments from '@/data/treatments.json';

export function generateStaticParams() {
  return treatments.map((treatment) => ({
    slug: treatment.id,
  }));
}

import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  
  if (slug === 'sylfirm-x') {
    return {
      title: 'Sylfirm X 矽谷電波 | 徹底解決凹凸洞、荷爾蒙斑、泛紅 | Peko Beauty 旺角朗豪坊',
      description: 'Peko Beauty 引入第 2 代 Sylfirm X 矽谷電波，全球首創雙波微針射頻技術。專利 PW 脈衝波與 CW 連續波模式，精準修復受損基底膜，針對性解決頑固凹凸洞、荷爾蒙斑、微絲血管擴張及玫瑰痤瘡。全女班專業操作，FDA & CE 認證，立即預約 VISIA 皮膚分析。',
      keywords: ['Sylfirm X', '矽谷電波', 'Sylfirm X 效果', 'Sylfirm X 價錢', 'Sylfirm X 恢復期', '凹凸洞', '荷爾蒙斑', '肝斑', '微絲血管', '玫瑰痤瘡', '微針射頻', 'Peko Beauty', '旺角醫美', '矽谷電波 凹凸洞', '矽谷電波 效果', '矽谷電波 推薦'],
      openGraph: {
        title: 'Sylfirm X 矽谷電波 | 凹凸洞與色素修復專家 | Peko Beauty',
        description: '從根源修復肌底，徹底解決頑固皮膚問題。Sylfirm X 雙波技術，無結焦、恢復期極短。',
        images: ['https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=1200'],
      },
    };
  }

  const treatment = treatments.find(t => t.id === slug);
  return {
    title: `${treatment?.title || '醫美療程'} | Peko Beauty`,
    description: treatment?.description || '專業醫美療程服務',
  };
}

export default async function TreatmentDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  return <TreatmentDetailClient />;
}
