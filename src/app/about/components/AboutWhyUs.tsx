"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Scan, ShieldCheck, Ban, Lock,
  X, Check, ChevronDown, ArrowUpRight
} from 'lucide-react';
import Link from 'next/link';

/* ─── Reveal wrapper ─── */
const Reveal = ({ children, delay = 0, dir = 'up' }: {
  children: React.ReactNode; delay?: number; dir?: 'up' | 'left' | 'right' | 'scale';
}) => {
  const variants = {
    up: { hidden: { opacity: 0, y: 48 }, visible: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: -48 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 48 }, visible: { opacity: 1, x: 0 } },
    scale: { hidden: { opacity: 0, scale: 0.88 }, visible: { opacity: 1, scale: 1 } },
  };
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }} variants={variants[dir]}>
      {children}
    </motion.div>
  );
};

/* ─── Why Choose - Pillar data ─── */
const pillars = [
  {
    icon: <Scan size={28} strokeWidth={1.5} />,
    color: '#C52B21', bg: '#FFF5F4', border: '#FDDBD8',
    title: '數據先行，再談療程',
    sub: 'Science Before Beauty',
    desc: '每次療程前，我們先用 VISIA 第 7 代儀器進行 8 維度皮膚掃描，讓數據說話。您清楚看到問題，我們才制定方案。',
    tag: '有根有據',
  },
  {
    icon: <Ban size={28} strokeWidth={1.5} />,
    color: '#8B5CF6', bg: '#F5F3FF', border: '#DDD6FE',
    title: '絕無 Hard Sell 保證',
    sub: 'Zero Pressure Sales',
    desc: '我們的收入來源只有療程效果。不靠追加推銷，不靠軟硬兼施。效果是我們唯一的推銷工具，口碑是最好的廣告。',
    tag: '明碼實價',
  },
  {
    icon: <ShieldCheck size={28} strokeWidth={1.5} />,
    color: '#B8936A', bg: '#FBF5EE', border: '#E8D5B7',
    title: '原廠正貨即場核實',
    sub: '100% Authentic Devices',
    desc: '每支探頭均為原廠認證，絕無翻新或山寨。我們當場開封、當場掃碼驗證序列號，讓您親眼確認儀器真偽。',
    tag: '可即場核實',
  },
  {
    icon: <Lock size={28} strokeWidth={1.5} />,
    color: '#059669', bg: '#F0FDF4', border: '#A7F3D0',
    title: '全女班一對一私密服務',
    sub: 'All-Female Team & Privacy',
    desc: '全體治療師均為女性，設有獨立私密房間。敏感肌膚問題或私密療程，您可以放心傾訴，我們給您最安心的空間。',
    tag: '私密無憂',
  },
];

/* ─── Comparison data ─── */
const comparisons = [
  { point: '皮膚分析', peko: 'VISIA 8 維度科學分析', others: '望診或問卷估算' },
  { point: '儀器真偽', peko: '原廠序列號即場核實', others: '難以確認真偽' },
  { point: '銷售方式', peko: '絕無 Hard Sell，效果說話', others: '優惠誘導，追加推銷' },
  { point: '療程規劃', peko: '基於皮膚週期，完整方案', others: '單次即打，欠缺延續性' },
  { point: '治療師', peko: '全女班，10 年+ 認證經驗', others: '流轉率高，難保水準' },
  { point: '私密程度', peko: '獨立房間，無旁人打擾', others: '共用空間，私隱度低' },
  { point: '售後跟進', peko: '療程後追蹤，數據對比', others: '療程後欠缺跟進' },
];

/* ─── FAQ Accordion item ─── */
const FaqItem = ({ q, a, index }: { q: string; a: string; index: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07 }}
      className="border-b border-[#F0E4E2] last:border-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
      >
        <span className="text-sm font-bold text-[#1A1A1A] group-hover:text-[#C52B21] transition-colors leading-snug">{q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown size={16} className="shrink-0 text-[#C52B21]" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="text-sm text-[#6B6B6B] leading-relaxed font-light pb-5">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const faqs = [
  { q: '第一次來需要做什麼準備？', a: '完全不需要任何準備。第一次來診，我們會先進行免費的 VISIA 皮膚分析，了解您的皮膚狀況後，才由治療師為您制定個人化建議，無任何消費壓力。' },
  { q: '你們的定價是否透明？', a: '是的，我們所有療程均明碼實價，網站上列明試做優惠價及正價。諮詢過程中不存在「簽約優惠」或「今日限定」式的推銷手法。' },
  { q: '如何確認儀器是原廠正貨？', a: '所有探頭及儀器部件均有原廠序列號。我們在療程前當場開封，您可以即場掃描 QR code 或序列號到原廠網站核實，100% 透明。' },
  { q: '療程後皮膚有什麼反應是正常的？', a: '視乎療程種類，輕微泛紅或緊繃感屬正常，通常數小時至一天內消退。我們會於療程後詳細說明注意事項，並於 48 小時內主動跟進您的恢復情況。' },
];

/* ─── Main ─── */
export default function AboutWhyUs() {
  return (
    <section id="why-us" className="relative overflow-hidden bg-white">

      {/* ── PART 1: Why Choose Us ── */}
      <div className="relative py-28 md:py-40"
        style={{ background: 'linear-gradient(180deg, #FFFDF9 0%, #FFFFFF 100%)' }}>

        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] -translate-y-1/2 translate-x-1/3 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(197,43,33,0.04) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] translate-y-1/2 -translate-x-1/3 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(184,147,106,0.05) 0%, transparent 70%)' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-20">
            <Reveal>
              <span className="text-[10px] font-bold tracking-[0.6em] text-[#C52B21] uppercase block mb-5">
                Why Choose Us
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-[#1A1A1A] tracking-tighter leading-[0.9] mb-6">
                點解要揀<br />
                <span className="text-[#C52B21]">Peko Beauty？</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-[#6B6B6B] text-lg font-light leading-relaxed">
                在香港，美容院多如繁星。我們唯一的分別，是將您的皮膚健康放在生意之前。
              </p>
            </Reveal>
          </div>

          {/* Pillars grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {pillars.map((p, i) => (
              <Reveal key={i} delay={i * 0.08} dir="scale">
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="group relative p-8 rounded-[28px] h-full flex flex-col"
                  style={{ background: p.bg, border: `1.5px solid ${p.border}` }}
                >
                  {/* Tag */}
                  <div className="absolute top-5 right-5">
                    <span className="text-[9px] font-bold tracking-[0.3em] uppercase px-3 py-1 rounded-full"
                      style={{ color: p.color, background: `${p.color}14` }}>
                      {p.tag}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-400 group-hover:scale-110 shrink-0"
                    style={{ background: `${p.color}18`, color: p.color }}>
                    {p.icon}
                  </div>

                  <p className="text-[9px] font-bold tracking-[0.4em] uppercase mb-3" style={{ color: p.color }}>{p.sub}</p>
                  <h3 className="text-xl font-black text-[#1A1A1A] tracking-tight mb-4 leading-snug">{p.title}</h3>
                  <p className="text-[#6B6B6B] text-sm leading-relaxed font-light flex-1">{p.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ── PART 2: Comparison Table ── */}
      <div className="py-28 md:py-40 bg-[#FDF8F5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <Reveal>
              <span className="text-[10px] font-bold tracking-[0.6em] text-[#C52B21] uppercase block mb-5">
                The Difference
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] tracking-tighter leading-[0.9] mb-5">
                我哋同其他美容院<br />
                <span className="text-[#C52B21]">有咩唔同？</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-[#6B6B6B] text-base font-light max-w-xl mx-auto leading-relaxed">
                細節決定品質。以下是 Peko Beauty 與一般美容院的真實差異。
              </p>
            </Reveal>
          </div>

          {/* Comparison card */}
          <Reveal delay={0.1} dir="scale">
            <div className="rounded-[32px] overflow-hidden shadow-[0_8px_60px_-12px_rgba(197,43,33,0.12)] border border-[#F0E4E2]">
              {/* Table header */}
              <div className="grid grid-cols-[1fr_1fr_1fr] bg-white border-b border-[#F0E4E2]">
                <div className="p-5 pl-7">
                  <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#9B9B9B]">比較項目</span>
                </div>
                <div className="p-5 bg-[#FFF5F4] border-x border-[#F0E4E2]">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#C52B21]" />
                    <span className="text-[11px] font-black tracking-[0.2em] uppercase text-[#C52B21]">Peko Beauty</span>
                  </div>
                </div>
                <div className="p-5">
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#9B9B9B]">一般美容院</span>
                </div>
              </div>

              {/* Rows */}
              {comparisons.map((row, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className={`grid grid-cols-[1fr_1fr_1fr] border-b border-[#F0E4E2] last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-[#FDFAF9]'}`}
                >
                  {/* Point */}
                  <div className="p-5 pl-7 flex items-center">
                    <span className="text-sm font-bold text-[#4A4A4A]">{row.point}</span>
                  </div>
                  {/* Peko */}
                  <div className="p-5 bg-[#FFF5F4]/60 border-x border-[#F0E4E2] flex items-center gap-3">
                    <div className="shrink-0 w-5 h-5 rounded-full bg-[#C52B21] flex items-center justify-center">
                      <Check size={11} strokeWidth={3} className="text-white" />
                    </div>
                    <span className="text-sm text-[#1A1A1A] font-medium leading-snug">{row.peko}</span>
                  </div>
                  {/* Others */}
                  <div className="p-5 flex items-center gap-3">
                    <div className="shrink-0 w-5 h-5 rounded-full bg-[#F0E4E2] flex items-center justify-center">
                      <X size={11} strokeWidth={3} className="text-[#B0867F]" />
                    </div>
                    <span className="text-sm text-[#9B9B9B] font-light leading-snug">{row.others}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </Reveal>

          {/* CTA below table */}
          <Reveal delay={0.3}>
            <div className="mt-12 text-center">
              <p className="text-[#6B6B6B] text-sm mb-6 font-light">
                親身體驗才是最好的比較。首次 VISIA 皮膚分析，讓數據告訴您答案。
              </p>
              <Link
                href="/booking"
                className="inline-flex items-center gap-2.5 px-9 py-4 bg-[#C52B21] text-white rounded-full font-bold text-[11px] tracking-[0.35em] uppercase shadow-[0_8px_30px_-6px_rgba(197,43,33,0.4)] hover:shadow-[0_16px_50px_-6px_rgba(197,43,33,0.5)] hover:-translate-y-0.5 transition-all duration-300"
              >
                立即預約免費分析
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── PART 3: FAQ ── */}
      <div className="py-20 md:py-32 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <Reveal>
              <span className="text-[10px] font-bold tracking-[0.6em] text-[#C52B21] uppercase block mb-5">
                Common Questions
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-black text-[#1A1A1A] tracking-tighter">
                常見疑問
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="bg-white rounded-[28px] border border-[#F0E4E2] shadow-[0_4px_30px_-8px_rgba(197,43,33,0.08)] px-8 py-2">
              {faqs.map((faq, i) => (
                <FaqItem key={i} {...faq} index={i} />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
