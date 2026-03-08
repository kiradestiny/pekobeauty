"use client";
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { MessageCircle, Phone, Mail, ArrowRight } from 'lucide-react';

const BRAND = "#C52B21";

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rotX = useMotionValue(0), rotY = useMotionValue(0);
  const sX = useSpring(rotX, { stiffness: 150, damping: 20 });
  const sY = useSpring(rotY, { stiffness: 150, damping: 20 });
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    rotX.set(-((e.clientY - r.top) / r.height - 0.5) * 14);
    rotY.set(((e.clientX - r.left) / r.width - 0.5) * 14);
  };
  const onLeave = () => { rotX.set(0); rotY.set(0); };
  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ rotateX: sX, rotateY: sY, transformStyle: 'preserve-3d' }} className={className}>
      {children}
    </motion.div>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

const cards = [
  {
    icon: <MessageCircle size={28} />, title: 'WhatsApp', subtitle: '即時回覆',
    detail: '+852 5335 3313', desc: '專業顧問即時為您解答',
    action: '立即對話', link: 'https://wa.me/85253353313',
    from: '#22C55E', to: '#16A34A', glow: 'rgba(34,197,94,0.3)', badge: '最快回覆',
    badgeBg: 'bg-green-100', badgeText: 'text-green-700',
  },
  {
    icon: <Phone size={28} />, title: '電話查詢', subtitle: '辦公時間',
    detail: '+852 2662 2092', desc: '週一至五 11:30–20:30',
    action: '立即致電', link: 'tel:+85226622092',
    from: '#3B82F6', to: '#1D4ED8', glow: 'rgba(59,130,246,0.3)', badge: '專業諮詢',
    badgeBg: 'bg-blue-100', badgeText: 'text-blue-700',
  },
  {
    icon: <Mail size={28} />, title: '電郵聯絡', subtitle: '24小時內回覆',
    detail: 'info@peko.com.hk', desc: '商務合作及媒體查詢',
    action: '發送電郵', link: 'mailto:info@peko.com.hk',
    from: BRAND, to: '#991B1B', glow: 'rgba(197,43,33,0.3)', badge: '商務合作',
    badgeBg: 'bg-red-100', badgeText: 'text-red-700',
  },
];

export default function ContactCards() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <Reveal>
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase mb-4 block" style={{ color: BRAND }}>
              Get In Touch
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-6xl font-light text-gray-900 tracking-tight">
              選擇您的<span className="font-serif italic" style={{ color: BRAND }}>聯絡方式</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <TiltCard className="h-full" >
                <a
                  href={card.link}
                  target={card.link.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="group relative flex flex-col p-8 lg:p-10 bg-white rounded-[32px] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden h-full cursor-pointer block"
                >
                  {/* Animated bg on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[32px]"
                    style={{ background: `linear-gradient(135deg, ${card.from}08, ${card.to}12)` }}
                  />

                  {/* Glow circle */}
                  <motion.div
                    className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-700"
                    style={{ background: card.glow }}
                  />

                  {/* Badge */}
                  <div className="relative z-10 flex items-start justify-between mb-8">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500"
                      style={{ background: `linear-gradient(135deg, ${card.from}, ${card.to})`, boxShadow: `0 8px 24px ${card.glow}` }}
                    >
                      {card.icon}
                    </div>
                    <span className={`text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-full ${card.badgeBg} ${card.badgeText}`}>
                      {card.badge}
                    </span>
                  </div>

                  <div className="relative z-10 flex-1">
                    <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-1">{card.subtitle}</p>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{card.title}</h3>
                    <p className="text-lg font-semibold text-gray-800 mb-2">{card.detail}</p>
                    <p className="text-sm text-gray-400 leading-relaxed mb-8">{card.desc}</p>
                  </div>

                  <div className="relative z-10 flex items-center gap-3 text-sm font-bold" style={{ color: card.from }}>
                    <span className="relative">
                      {card.action}
                      <span
                        className="absolute -bottom-0.5 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                        style={{ background: card.from }}
                      />
                    </span>
                    <motion.div
                      whileHover={{ x: 4 }}
                      className="w-8 h-8 rounded-full border flex items-center justify-center group-hover:text-white transition-all duration-300"
                      style={{ borderColor: `${card.from}40` }}
                    >
                      <ArrowRight size={14} />
                    </motion.div>
                  </div>
                </a>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
