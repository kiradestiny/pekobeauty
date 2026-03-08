"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export const treatmentLinks = [
  { name: 'Sylfirm X 矽谷電波', href: '/treatments/sylfirm-x' },
  { name: 'BTL Exion™ 面+眼+頸', href: '/treatments/btl-exion' },
  { name: 'BTL Exion™ 黃金微針', href: '/treatments/btl-exion-microneedle' },
  { name: 'BTL Exion™ Body', href: '/treatments/btl-exion-body' },
  { name: 'BTL Exion™ 眼部', href: '/treatments/btl-exion-eye' },
  { name: 'XE LHA Peel 玻璃肌', href: '/treatments/xe-lha-peel' },
  { name: 'Hollywood Spectra™ 系列', href: '/treatments/hollywood-spectra-laser' },
  { name: 'Ulfit HIFU 緊緻拉提', href: '/treatments/ulfit-hifu' },
  { name: 'Venus Glow™ 水漾活膚', href: '/treatments/venus-glow' },
  { name: 'BTL EMfemme 360', href: '/treatments/btl-emfemme-360' },
  { name: 'DEP 無針水光', href: '/treatments/dep-mesotherapy' },
  { name: 'VISIA 皮膚深層分析', href: '/treatments/visia-skin-analysis' },
];

export const concernLinks = [
  { name: '凹凸洞 / 深層皺紋', href: '/concerns/pores-wrinkles' },
  { name: '色斑 / 荷爾蒙斑', href: '/concerns/pigmentation' },
  { name: '蘋果肌下垂 / 鬆弛', href: '/concerns/sagging' },
  { name: '暗瘡印 / 毛孔粗大', href: '/concerns/acne-scars' },
  { name: '泛紅 / 玫瑰痤瘡', href: '/concerns/redness' },
  { name: '黑眼圈 / 眼紋 / 眼袋', href: '/concerns/eye-dark-circles' },
  { name: '瘦身修形 / 溶脂', href: '/concerns/body-slimming' },
  { name: '私密健康護理', href: '/concerns/intimate-care' },
];

export const quickLinks = [
  { name: '關於 Peko Beauty', href: '/about' },
  { name: '最新試做優惠', href: '/offers' },
  { name: '醫美專欄 Journal', href: '/blog' },
  { name: '常見問題 FAQ', href: '/faq' },
  { name: '預約諮詢', href: '/booking' },
];

interface LinkColumnProps {
  title: string;
  links: { name: string; href: string }[];
}

export const LinkColumn = ({ title, links }: LinkColumnProps) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div>
      <h4 className="text-[11px] font-bold uppercase tracking-[0.22em] text-gray-900 mb-7 flex items-center gap-2.5">
        <span className="w-5 h-px bg-[#C52B21]" />
        {title}
      </h4>
      <ul className="space-y-3.5">
        {links.map((link, idx) => (
          <li key={link.name}>
            <Link
              href={link.href}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="group flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#C52B21] transition-all duration-200"
            >
              {/* 左側滑入指示線 */}
              <span
                className={`block h-px bg-[#C52B21] transition-all duration-300 flex-shrink-0 ${
                  hoveredIdx === idx ? 'w-4 opacity-100' : 'w-0 opacity-0'
                }`}
              />
              <span className="transition-transform duration-200 group-hover:translate-x-0.5 leading-snug">
                {link.name}
              </span>
              {hoveredIdx === idx && (
                <ArrowUpRight
                  size={12}
                  className="ml-auto flex-shrink-0 text-[#C52B21] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

// 三個獨立欄位組件，供主 Footer 分別放入 grid cell
export const FooterTreatmentLinks = () => (
  <LinkColumn title="核心療程" links={treatmentLinks} />
);

export const FooterConcernLinks = () => (
  <LinkColumn title="肌膚困擾" links={concernLinks} />
);

export const FooterQuickLinks = () => (
  <LinkColumn title="快速連結" links={quickLinks} />
);

// 預設 export：三欄合一（備用）
const FooterLinks = () => (
  <>
    <FooterTreatmentLinks />
    <FooterConcernLinks />
    <FooterQuickLinks />
  </>
);

export default FooterLinks;
