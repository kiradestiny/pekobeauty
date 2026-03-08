"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Clock, CreditCard, ShieldAlert, Sparkles, Scale, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const TermsPage = () => {
  const lastUpdated = "2025年7月1日";

  return (
    <div className="bg-white text-[#1A1A1A] min-h-screen pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-xs font-bold tracking-widest uppercase mb-6">
            <Scale size={14} />
            Terms of Service
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">服務條款</h1>
          <p className="text-gray-500 font-light">最後更新日期：{lastUpdated}</p>
        </motion.div>

        {/* Content */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-p:font-light prose-li:text-gray-600 prose-li:font-light"
        >
          <div className="bg-gray-50 rounded-3xl p-8 md:p-12 mb-12 border border-gray-100">
            <p className="leading-relaxed mb-0">
              歡迎使用 Peko Beauty 的服務！本服務條款 (下稱「本條款」) 適用於 Peko HK Limited (下稱「本公司」、「我們」或「我們的」)，以 Peko Beauty 品牌名稱向您 (下稱「客戶」、「閣下」或「您」) 提供的所有美容及護膚療程、產品銷售及相關諮詢服務 (統稱「本服務」)。
            </p>
            <p className="leading-relaxed mt-4 mb-0">
              在您使用本服務前，請仔細閱讀本條款。當您預約或使用本公司的任何服務，即表示您已閱讀、理解並同意接受本條款的所有內容約束。如您不同意本條款的任何部分，請勿使用本服務。
            </p>
          </div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-900 text-white text-sm">1</span>
              服務範圍
            </h2>
            <p>
              本公司提供多元化的專業美容及護膚療程，包括但不限於面部護理、身體護理、醫學美容療程 (例如 HIFU、Sylfirm X、BTL Exion™、Venus Glow™ 等)、產品銷售及相關專業美容諮詢服務。所有服務詳情及具體內容，以本公司當時提供的資訊為準。
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-900 text-white text-sm">2</span>
              預約、更改及取消政策
            </h2>
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Clock size={18} className="text-blue-500" /> (a) 預約安排
                </h4>
                <p className="text-sm leading-relaxed">為確保服務質素及能為您安排理想的療程時段，所有療程服務均建議提前預約。預約可透過本公司官方網站、電話、WhatsApp 或親臨門市進行。</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Clock size={18} className="text-blue-500" /> (b) 更改預約
                </h4>
                <p className="text-sm leading-relaxed">如需更改已確認的預約時間，客戶必須至少在原定預約時間的24小時前通知本公司。本公司將視乎實際情況盡力配合，但不保證一定能滿足所有更改要求。</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Clock size={18} className="text-blue-500" /> (c) 遲到處理
                </h4>
                <p className="text-sm leading-relaxed">若客戶遲到，為免影響其他已預約客戶的權益，本公司保留縮短該次療程服務時間的權利，而療程費用將按原定預約收取，不設減免。建議客戶準時到達。</p>
              </div>
              <div className="p-6 rounded-2xl bg-red-50 border border-red-100 shadow-sm">
                <h4 className="font-bold text-red-900 mb-2 flex items-center gap-2">
                  <ShieldAlert size={18} className="text-[#C52B21]" /> (d) 取消預約/缺席
                </h4>
                <ul className="text-sm space-y-2 list-disc pl-5 text-red-800/80">
                  <li>如客戶需取消預約，必須至少在原定預約時間的24小時前通知本公司。</li>
                  <li>若客戶未能在預約時間前24小時內通知本公司取消或更改預約，或無故缺席，本公司保留按情況收取該次預約療程之全額費用或部分費用作為行政費用的權利。對於已預繳的套餐療程，則可能視作已使用該次療程。</li>
                </ul>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Clock size={18} className="text-blue-500" /> (e) 本公司取消預約
                </h4>
                <p className="text-sm leading-relaxed">在極端或不可預見的情況下 (例如儀器故障、治療師緊急事故等)，本公司可能需要取消或重新安排您的預約。在此情況下，我們會盡快通知您，並與您協商安排新的預約時間，本公司對此不承擔任何額外賠償責任。</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-900 text-white text-sm">3</span>
              付款及退款政策
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
                <CreditCard size={24} className="text-[#C52B21] mb-4" />
                <h4 className="font-bold mb-2">(a) 付款方式</h4>
                <p className="text-sm">本公司接受現金 (港幣)、信用卡 (Visa/MasterCard/AE/銀聯)、銀行轉賬及香港常用的主要電子支付方式 (例如 FPS轉數快、AlipayHK、WeChat Pay HK等)。</p>
              </div>
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
                <FileText size={24} className="text-[#C52B21] mb-4" />
                <h4 className="font-bold mb-2">(b) 套餐及預付項目</h4>
                <p className="text-sm">所有購買的療程套餐或預付項目均設有固定有效期 (通常為 6-12 個月)。已過有效期的項目將自動失效，不獲退還或延期。</p>
              </div>
            </div>
            <div className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm">
              <h4 className="font-bold text-gray-900 mb-4">(c) 退款政策</h4>
              <p className="text-sm leading-relaxed mb-4">除因本公司提供的療程或產品確實存在質量問題外，一般情況下，所有已使用的服務、已開啟或已使用的產品，以及已購買的療程套餐或預付項目均不設退款。</p>
              <p className="text-sm leading-relaxed">若客戶因個人健康理由 (須提供有效醫生證明) 而無法繼續接受已購買的療程，本公司將按個別情況酌情處理。本公司對此擁有最終決定權。</p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-900 text-white text-sm">4</span>
              健康、安全及客戶責任
            </h2>
            <ul className="space-y-4 list-none pl-0">
              <li className="flex gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors">
                <span className="font-bold text-[#C52B21] shrink-0">(a)</span>
                <p className="text-sm m-0"><strong>健康狀況申報：</strong> 客戶有責任在療程前真實申報所有健康狀況、過敏史、懷孕情況及藥物使用紀錄。如因未能提供準確資料而引致不適，本公司概不負責。</p>
              </li>
              <li className="flex gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors">
                <span className="font-bold text-[#C52B21] shrink-0">(b)</span>
                <p className="text-sm m-0"><strong>療程適用性評估：</strong> 本公司保留因應客戶健康狀況或安全考量，建議替代療程或拒絕提供服務的權利。</p>
              </li>
              <li className="flex gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors">
                <span className="font-bold text-[#C52B21] shrink-0">(c)</span>
                <p className="text-sm m-0"><strong>風險認知及同意：</strong> 客戶理解美容療程可能存在潛在風險 (如短暫泛紅、腫脹等)，接受服務即表示已明白並自願承擔相關風險。</p>
              </li>
              <li className="flex gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors">
                <span className="font-bold text-[#C52B21] shrink-0">(d)</span>
                <p className="text-sm m-0"><strong>遵從指示：</strong> 客戶必須遵從治療師就療程前後護理所給予的一切專業指示。</p>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-900 text-white text-sm">5</span>
              療程效果
            </h2>
            <div className="p-8 rounded-3xl bg-amber-50 border border-amber-100">
              <p className="text-sm leading-relaxed text-amber-900/80 mb-0">
                每個人對療程的反應及效果均存在個體差異。療程最終效果受個人皮膚狀況、年齡、生活方式等多種因素影響。因此，本公司不能對任何療程的特定效果作出保證。網頁或宣傳品提供的個案參考僅供參考，並不構成對效果的承諾。
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-900 text-white text-sm">6</span>
              知識產權
            </h2>
            <p>
              本公司官方網站及宣傳材料中的所有內容 (文字、圖像、標誌等) 均為本公司所有。未經書面授權，不得以任何方式複製、修改或傳播。
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-900 text-white text-sm">7</span>
              私隱政策
            </h2>
            <p>
              本公司如何收集、使用、儲存和保護您的個人資料，詳情請參閱我們的 
              <Link href="/privacy" className="text-[#C52B21] font-bold hover:underline inline-flex items-center gap-1 ml-1">
                私隱政策聲明 <ExternalLink size={14} />
              </Link>。
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-900 text-white text-sm">8</span>
              免責聲明及責任限制
            </h2>
            <p className="text-sm leading-relaxed">
              在法律允許範圍內，除非因重大疏忽，否則本公司對於客戶因使用服務而引致的任何損失概不承擔法律責任。本公司承擔的全部責任總額將不超過客戶就該特定服務所支付的金額。
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-900 text-white text-sm">9</span>
              條款修訂
            </h2>
            <p>
              本公司保留隨時修訂本條款的權利。經修訂的條款將於官網公佈後即時生效。建議客戶定期查閱。
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-900 text-white text-sm">10</span>
              聯絡我們
            </h2>
            <div className="bg-gray-900 text-white rounded-3xl p-8 md:p-10">
              <div className="grid gap-6">
                <div className="flex gap-4">
                  <FileText className="text-[#C52B21] shrink-0" size={20} />
                  <div>
                    <p className="font-bold">Peko HK Limited (營運 Peko Beauty)</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <MapPin className="text-[#C52B21] shrink-0" size={20} />
                  <p className="text-sm">九龍旺角亞皆老街8號朗豪坊辦公室大樓40樓02室</p>
                </div>
                <div className="flex gap-4">
                  <Mail className="text-[#C52B21] shrink-0" size={20} />
                  <p className="text-sm">info@peko.com.hk</p>
                </div>
                <div className="flex gap-4">
                  <Phone className="text-[#C52B21] shrink-0" size={20} />
                  <p className="text-sm">2662 2092 / 5335 3313</p>
                </div>
              </div>
            </div>
          </section>

          <div className="border-t border-gray-100 pt-12 mt-12 text-center">
            <p className="text-xs text-gray-400">
              本條款受香港特別行政區法律管轄。如中英文版本有任何歧異，概以中文版本為準。
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsPage;
