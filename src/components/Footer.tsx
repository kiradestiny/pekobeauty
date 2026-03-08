"use client";

import React from 'react';
import FooterNewsletter from './footer/FooterNewsletter';
import FooterBrand from './footer/FooterBrand';
import {
  FooterTreatmentLinks,
  FooterConcernLinks,
  FooterQuickLinks,
} from './footer/FooterLinks';
import FooterContact from './footer/FooterContact';
import FooterTrustBar from './footer/FooterTrustBar';
import FooterBottom from './footer/FooterBottom';

const Footer = () => {
  return (
    <footer className="bg-white relative overflow-hidden">

      {/* ── 1. 訂閱區 ── */}
      <FooterNewsletter />

      {/* ── 2. 主內容區 ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-0">

        {/*
          主網格佈局（桌面 6 欄）：
          [品牌(2fr)] [核心療程(1fr)] [肌膚困擾(1fr)] [快速連結(1fr)] [聯絡(1fr)]
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1.2fr] gap-x-8 gap-y-12 xl:gap-x-12 mb-14">

          {/* 欄 1：品牌故事 + 社群（佔 2fr，手機全寬） */}
          <div className="sm:col-span-2 lg:col-span-1">
            <FooterBrand />
          </div>

          {/* 欄 2：核心療程 */}
          <FooterTreatmentLinks />

          {/* 欄 3：肌膚困擾 */}
          <FooterConcernLinks />

          {/* 欄 4：快速連結 */}
          <FooterQuickLinks />

          {/* 欄 5：聯絡資訊 */}
          <FooterContact />
        </div>

        {/* ── 3. 信任標章區 ── */}
        <FooterTrustBar />

        {/* ── 4. 底部版權 ── */}
        <FooterBottom />

        {/* 底部間距 */}
        <div className="pb-8" />
      </div>

      {/* 背景裝飾 */}
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-red-50 rounded-full blur-3xl opacity-40 pointer-events-none -mb-24 -mr-24" />
      <div className="absolute top-1/2 left-0 w-48 h-48 bg-gray-50 rounded-full blur-3xl opacity-60 pointer-events-none -ml-16" />
    </footer>
  );
};

export default Footer;
