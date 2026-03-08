"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText, Mail, Phone, MapPin } from 'lucide-react';

const PrivacyPage = () => {
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-[#C52B21] text-xs font-bold tracking-widest uppercase mb-6">
            <Shield size={14} />
            Privacy Policy
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">隱私權政策</h1>
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
              Peko HK Limited (下稱「本公司」、「我們」或「我們的」)，以 Peko Beauty 的品牌名稱營運，尊重並致力保護您的個人私隱。本私隱政策聲明 (下稱「本政策」) 旨在解釋我們如何根據香港特別行政區法例第486章《個人資料（私隱）條例》(下稱「PDPO」) 的規定，收集、使用、儲存、處理及保護您的個人資料。請仔細閱讀本政策，以了解我們處理您個人資料的方式。當您向我們提供個人資料，即表示您同意本政策的條款。
            </p>
          </div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-900 text-white text-sm">1</span>
              我們收集的個人資料
            </h2>
            <p className="mb-4">為向您提供專業的美容療程服務及提升服務質素，Peko Beauty 可能會收集及處理以下類別的個人資料：</p>
            <ul className="space-y-4 list-none pl-0">
              <li className="flex gap-3">
                <span className="font-bold text-[#C52B21]">(a)</span>
                <span><strong>基本個人識別資料：</strong> 包括但不限於您的姓名、聯絡電話號碼、電郵地址、通訊地址等。</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-[#C52B21]">(b)</span>
                <span><strong>與美容療程相關的健康及醫療資訊：</strong> 為確保療程安全及有效，我們可能需要了解您的過往醫療紀錄、皮膚狀況、過敏史、藥物使用情況或反應等與療程直接相關的健康資訊。此類敏感資料的收集會事先取得您的明確同意。</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-[#C52B21]">(c)</span>
                <span><strong>服務及交易紀錄：</strong> 您在本公司接受的美容療程詳情、購買的產品紀錄、服務意見回饋等。</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-[#C52B21]">(d)</span>
                <span><strong>付款及賬戶資訊：</strong> 處理付款所需的信用卡資料 (我們會採取符合業界標準的安全措施處理)、賬單地址、交易收據及發票詳情等。</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-[#C52B21]">(e)</span>
                <span><strong>網站及應用程式使用數據 (如適用)：</strong> 當您瀏覽我們的官方網站或使用我們的會員應用程式時，我們可能透過 Cookie 或類似技術收集的瀏覽數據、IP地址、裝置資訊等 (詳見下文第6點)。</span>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-900 text-white text-sm">2</span>
              個人資料的使用目的
            </h2>
            <p className="mb-4">我們收集的個人資料將主要用於以下目的：</p>
            <ul className="space-y-4 list-none pl-0">
              <li className="flex gap-3">
                <span className="font-bold text-[#C52B21]">(a)</span>
                <span><strong>提供及管理美容服務：</strong> 核實身份、安排及確認您的療程預約、進行療程、跟進療程後狀況、處理您的查詢及提供客戶服務。</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-[#C52B21]">(b)</span>
                <span><strong>處理付款及行政事宜：</strong> 處理與療程或產品相關的付款、開立收據或發票、進行內部會計及審計。</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-[#C52B21]">(c)</span>
                <span><strong>提升及改善服務：</strong> 分析服務使用情況，以改善我們的療程技術、產品質量及客戶體驗。</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-[#C52B21]">(d)</span>
                <span><strong>市場推廣及資訊傳遞 (在取得您同意的情況下)：</strong> 向您發送有關本公司的最新療程資訊、產品推介、會員尊享優惠、折扣活動及其他您可能感興趣的市場推廣資訊。您可以隨時透過我們提供的途徑選擇拒絕接收此類資訊。</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-[#C52B21]">(e)</span>
                <span><strong>遵守法律及法規要求：</strong> 履行香港法律、規例、法院命令或任何監管機構的要求。</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-[#C52B21]">(f)</span>
                <span><strong>維護本公司合法權益：</strong> 在必要時用於保障本公司的權利、財產或安全，或防止欺詐及其他非法活動。</span>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-900 text-white text-sm">3</span>
              個人資料的保護措施
            </h2>
            <p className="mb-6">本公司高度重視您的個人資料安全。我們已實施一系列合理的物理、電子及管理方面的安全措施，以保護您的個人資料免遭未經授權或意外的查閱、處理、刪除、遺失或使用。這些措施包括但不限於：</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "電子數據的加密技術及設有密碼保護的系統。",
                "載有個人資料的實體文件會被存放在設有進出管制的安全地方。",
                "對可接觸個人資料的員工進行定期的私隱保護意識及操作培訓。",
                "建立並執行嚴格的資料處理程序及內部監控機制。",
                "定期檢討及更新我們的安全措施，以應對不斷變化的安全威脅。"
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-2xl bg-gray-50 border border-gray-100 text-sm flex gap-3">
                  <Lock size={16} className="text-[#C52B21] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-900 text-white text-sm">4</span>
              個人資料的分享及披露
            </h2>
            <p className="mb-4">本公司承諾不會向任何第三方出售、出租或交換您的個人資料。然而，在下列特定情況下，我們可能會向第三方分享或披露您的個人資料：</p>
            <ul className="space-y-4 list-none pl-0">
              <li className="flex gap-3">
                <span className="font-bold text-[#C52B21]">(a)</span>
                <span><strong>取得您的明確同意：</strong> 在事先獲得您明確同意的情況下，我們才會與第三方分享您的個人資料。</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-[#C52B21]">(b)</span>
                <span><strong>服務合作夥伴：</strong> 我們可能會與提供技術支援 (如網站寄存、數據分析)、付款處理、物流配送等服務的第三方服務供應商或合作夥伴分享必要的個人資料。我們會與該等第三方簽訂保密協議，確保他們遵守與本政策同等或更嚴格的私隱保護標準，並且僅為履行其服務合約之目的使用您的資料。</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-[#C52B21]">(c)</span>
                <span><strong>法律規定或執法要求：</strong> 當法律、規例、法院命令或任何政府、監管或執法機構要求時，我們可能需要披露您的個人資料。</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-[#C52B21]">(d)</span>
                <span><strong>保障本公司及他人權益：</strong> 為保障本公司、我們的客戶、員工或其他人士的權利、財產或安全，或為調查、防止或就非法活動、涉嫌欺詐、或違反我們服務條款的情況採取行動時，我們可能會在合法及必要的情況下披露個人資料。</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-[#C52B21]">(e)</span>
                <span><strong>業務轉讓：</strong> 如本公司涉及任何合併、收購或任何形式的業務資產出售，我們可能會在保密的前提下，將您的個人資料轉移給相關的第三方。</span>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-900 text-white text-sm">5</span>
              您就個人資料所享有的權利
            </h2>
            <p className="mb-4">根據PDPO，您就我們持有的您的個人資料享有以下權利：</p>
            <div className="space-y-4">
              {[
                { title: "查閱權", desc: "您有權要求查閱我們是否持有您的個人資料，並索取該等資料的副本。" },
                { title: "更正權", desc: "如您認為我們持有的您的個人資料不準確或不完整，您有權要求作出更正。" },
                { title: "反對權", desc: "您有權隨時要求我們停止將您的個人資料用於直接市場推廣活動。" },
                { title: "刪除權", desc: "在某些法律允許的情況下 (例如資料已不再為原有收集目的所必需)，您可要求我們刪除您的個人資料。" },
                { title: "撤回同意權", desc: "如我們是基於您的同意處理您的個人資料，您有權隨時撤回該同意，惟撤回同意不影響撤回前已進行的資料處理的合法性。" }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-[#C52B21]">
                    <Eye size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-gray-500 italic">
              如欲行使上述任何權利，請透過下文第8點所列的聯絡方式與我們的個人資料保護主任聯絡。我們會在收到您的要求後，根據PDPO的規定在合理時間內作出回應。請注意，在處理您的要求前，我們可能需要核實您的身份。在某些情況下，我們可能需要就處理查閱資料的要求收取合理的費用。
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-900 text-white text-sm">6</span>
              Cookie 及類似追蹤技術的使用
            </h2>
            <p>
              我們的官方網站及/或會員應用程式可能會使用 Cookie 及其他類似的追蹤技術 (例如像素標籤、網站信標等)，以提升您的瀏覽體驗、分析網站流量、個性化內容及廣告、以及了解用戶行為模式。Cookie 是存儲在您電腦或流動裝置上的小型文本檔案。您可以隨時透過您的瀏覽器設定來管理或拒絕 Cookie 的使用，但請注意，停用 Cookie 可能會影響您使用我們網站或應用程式部分功能的體驗。
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-900 text-white text-sm">7</span>
              私隱政策的更新
            </h2>
            <p>
              本公司保留不時修訂本政策的權利，以反映法律要求的變更、技術的發展或我們業務運作的調整。任何修訂將於本網站公佈，並註明最新的更新日期。若修訂涉及對您個人資料處理方式的重大改變，我們會在合理可行的情況下，透過適當方式 (例如電郵或網站顯眼位置通知) 通知您。我們建議您定期查閱本政策，以確保了解我們如何保護您的個人資料。
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-900 text-white text-sm">8</span>
              聯絡我們
            </h2>
            <div className="bg-gray-900 text-white rounded-3xl p-8 md:p-10">
              <p className="mb-8 text-gray-400">如您對本私隱政策聲明有任何疑問、意見或投訴，或希望行使您在PDPO下的個人資料權利，歡迎透過以下方式聯絡我們的個人資料保護主任：</p>
              <div className="grid gap-6">
                <div className="flex gap-4">
                  <FileText className="text-[#C52B21] shrink-0" size={20} />
                  <div>
                    <p className="font-bold">Peko HK Limited (營運 Peko Beauty)</p>
                    <p className="text-sm text-gray-400">個人資料保護主任</p>
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

          <div className="border-t border-gray-100 pt-12 mt-12 grid sm:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold mb-2">語言</h4>
              <p className="text-sm text-gray-500">本政策以中文撰寫，並可能翻譯成其他語言。如中英文版本有任何歧異，概以中文版本為準。</p>
            </div>
            <div>
              <h4 className="font-bold mb-2">管轄法律</h4>
              <p className="text-sm text-gray-500">本政策受香港特別行政區法律管轄並按其解釋。</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPage;
