"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { X, Send, Sparkles, ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

/* ─────────────────────────────────────────────
   WhatsApp SVG Icon (official brand icon)
───────────────────────────────────────────── */
const WhatsAppIcon = ({ size = 32, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

/* ─────────────────────────────────────────────
   Typewriter Hook
───────────────────────────────────────────── */
function useTypewriter(text: string, speed = 35, active = true) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active) {
      setDisplayed('');
      setDone(false);
      return;
    }
    setDisplayed('');
    setDone(false);
    let i = 0;
    const delay = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, 300);
    return () => clearTimeout(delay);
  }, [text, speed, active]);

  return { displayed, done };
}

/* ─────────────────────────────────────────────
   Floating Particles
───────────────────────────────────────────── */
const FloatingParticles = () => {
  const particles = [0, 1, 2, 3, 4, 5];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
      {particles.map((i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-white/60"
          style={{ left: `${20 + i * 12}%`, bottom: '10%' }}
          animate={{
            y: [0, -40 - i * 8, 0],
            x: [0, (i % 2 === 0 ? 1 : -1) * (4 + i * 2), 0],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: 2.5 + i * 0.4,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

/* ─────────────────────────────────────────────
   Ripple Effect on Click
───────────────────────────────────────────── */
const RippleEffect = ({ trigger }: { trigger: number }) => {
  if (trigger === 0) return null;
  return (
    <AnimatePresence>
      <motion.span
        key={trigger}
        className="absolute inset-0 rounded-full bg-white/30"
        initial={{ scale: 0.8, opacity: 0.6 }}
        animate={{ scale: 2.5, opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    </AnimatePresence>
  );
};

/* ─────────────────────────────────────────────
   Notification Badge
───────────────────────────────────────────── */
const NotificationBadge = ({ visible }: { visible: boolean }) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0, rotate: 180 }}
        transition={{ type: "spring", stiffness: 500, damping: 25 }}
        className="absolute -top-1.5 -right-1.5 z-10"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center shadow-lg"
        >
          <span className="text-[9px] font-black text-white leading-none">1</span>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

/* ─────────────────────────────────────────────
   3D Tilt Button Wrapper
───────────────────────────────────────────── */
const TiltButton = ({
  children,
  onClick,
  onHoverStart,
  onHoverEnd,
  className = "",
}: {
  children: React.ReactNode;
  onClick: () => void;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
  className?: string;
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-30, 30], [15, -15]);
  const rotateY = useTransform(x, [-30, 30], [-15, 15]);
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      x.set(e.clientX - (rect.left + rect.width / 2));
      y.set(e.clientY - (rect.top + rect.height / 2));
    },
    [x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    onHoverEnd?.();
  }, [x, y, onHoverEnd]);

  return (
    <motion.button
      ref={ref}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={onHoverStart}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.92 }}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.button>
  );
};

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
const WhatsAppFloat = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [hasClosed, setHasClosed] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [ripple, setRipple] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const whatsappNumber = "85253353313";

  /* 根據路徑獲取訊息內容 */
  const getMessageContent = () => {
    if (pathname.includes('/treatments')) {
      return {
        title: "療程諮詢",
        agent: "Peko 專業顧問",
        avatar: "💆",
        text: "想了解更多療程細節或預約首客優惠？專業顧問為您解答！✨",
        cta: "立即諮詢療程",
        message: "你好 Peko Beauty，我想查詢療程的最新優惠和預約詳情。",
        accentColor: "#128C7E",
      };
    }
    if (pathname.includes('/offers')) {
      return {
        title: "優惠登記",
        agent: "優惠專員",
        avatar: "🎁",
        text: "限時優惠名額有限，立即登記鎖定專屬優惠！🎁",
        cta: "搶先登記優惠",
        message: "你好 Peko Beauty，我想登記領取最新的限時優惠。",
        accentColor: "#075E54",
      };
    }
    return {
      title: "即時諮詢",
      agent: "Peko 客服",
      avatar: "🔬",
      text: "歡迎來到 Peko Beauty！想預約免費 VISIA 皮膚分析或諮詢皮膚問題嗎？",
      cta: "預約免費分析",
      message: "你好 Peko Beauty，我想預約免費 VISIA 皮膚分析。",
      accentColor: "#075E54",
    };
  };

  const content = getMessageContent();
  const { displayed, done: typingDone } = useTypewriter(content.text, 30, !isTyping && isOpen);

  /* 自動彈出邏輯 */
  useEffect(() => {
    if (hasClosed || isOpen) return;

    const triggerPopup = () => {
      setIsOpen(true);
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 1200);
    };

    const timer = setTimeout(triggerPopup, 15000);

    const handleScroll = () => {
      const pct = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
      if (pct > 0.5) triggerPopup();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasClosed, isOpen]);

  /* 懸停提示延遲 */
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    if (isHovered && !isOpen) {
      t = setTimeout(() => setShowTooltip(true), 400);
    } else {
      setShowTooltip(false);
    }
    return () => clearTimeout(t);
  }, [isHovered, isOpen]);

  const handleWhatsAppClick = () => {
    setRipple((r) => r + 1);
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(content.message)}`;
    setTimeout(() => window.open(url, '_blank'), 150);
  };

  const handleButtonClick = () => {
    setRipple((r) => r + 1);
    if (!isOpen) {
      setIsOpen(true);
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 1200);
    } else {
      handleWhatsAppClick();
    }
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
    setHasClosed(true);
  };

  /* ── Framer Motion Variants ── */
  const bubbleVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.85, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { type: "spring" as const, damping: 22, stiffness: 280, mass: 0.8 },
    },
    exit: {
      opacity: 0,
      y: 16,
      scale: 0.88,
      filter: "blur(0px)",
      transition: { duration: 0.22, ease: "easeIn" as const },
    },
  };

  const messageVariants = {
    hidden: { opacity: 0, x: -12, scale: 0.96 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { type: "spring" as const, damping: 20, stiffness: 260 },
    },
  };

  const ctaVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.15, type: "spring" as const, damping: 20, stiffness: 260 },
    },
  };

  return (
    <div className="fixed bottom-6 right-4 md:right-6 z-[9999] flex flex-col items-end select-none">

      {/* ── 訊息氣泡 ── */}
      <AnimatePresence>
        {isOpen && !hasClosed && (
          <motion.div
            variants={bubbleVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mb-4 w-[290px] md:w-[330px] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.18)] overflow-hidden"
            style={{ transformOrigin: "bottom right" }}
          >
            {/* ── 頂欄 ── */}
            <div
              className="relative p-3 text-white flex justify-between items-center overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${content.accentColor} 0%, #128C7E 100%)` }}
            >
              {/* 頂欄光暈 */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{ opacity: [0.05, 0.12, 0.05] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  background:
                    "radial-gradient(circle at 30% 50%, rgba(255,255,255,0.3) 0%, transparent 70%)",
                }}
              />

              <div className="flex items-center gap-3 relative z-10">
                {/* 頭像 */}
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-xl border border-white/30 shadow-inner">
                    {content.avatar}
                  </div>
                  {/* 在線指示燈 */}
                  <motion.div
                    className="absolute bottom-0 right-0 w-3 h-3 bg-[#4ADE80] rounded-full border-2 border-[#075E54]"
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>

                <div>
                  <p className="font-bold text-sm leading-none mb-1 tracking-wide">
                    {content.agent}
                  </p>
                  <div className="flex items-center gap-1">
                    <motion.div
                      className="w-1.5 h-1.5 bg-[#4ADE80] rounded-full"
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <p className="text-[10px] text-white/80 font-medium">在線中 · 即時回覆</p>
                  </div>
                </div>
              </div>

              {/* 關閉按鈕 */}
              <motion.button
                onClick={handleClose}
                whileHover={{
                  scale: 1.15,
                  rotate: 90,
                  backgroundColor: "rgba(255,255,255,0.2)",
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="relative z-10 p-1.5 rounded-full transition-colors"
              >
                <X size={16} />
              </motion.button>
            </div>

            {/* ── 對話區 ── */}
            <div
              className="p-4 relative min-h-[110px]"
              style={{ background: "linear-gradient(180deg, #ECE5DD 0%, #E5DDD5 100%)" }}
            >
              {/* WhatsApp 背景紋理 */}
              <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />

              <AnimatePresence mode="wait">
                {isTyping ? (
                  /* 打字中指示器 */
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0, scale: 0.8, x: -8 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: -8 }}
                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                    className="bg-white p-3 rounded-2xl rounded-tl-sm shadow-sm inline-flex items-center gap-1.5 relative z-10"
                  >
                    {[0, 150, 300].map((delay, i) => (
                      <motion.span
                        key={i}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          delay: delay / 1000,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </motion.div>
                ) : (
                  /* 訊息內容 */
                  <motion.div
                    key="message"
                    variants={messageVariants}
                    initial="hidden"
                    animate="visible"
                    className="relative z-10 space-y-3"
                  >
                    {/* 訊息氣泡 */}
                    <div className="relative">
                      {/* 氣泡尾巴 */}
                      <div className="absolute -left-2 top-2 w-0 h-0 border-t-[8px] border-t-white border-l-[8px] border-l-transparent drop-shadow-sm" />
                      <div className="bg-white rounded-2xl rounded-tl-sm shadow-sm p-3.5">
                        {/* 打字機文字 */}
                        <p className="text-gray-800 text-sm leading-relaxed min-h-[3.5rem]">
                          {displayed}
                          {!typingDone && (
                            <motion.span
                              className="inline-block w-0.5 h-4 bg-gray-500 ml-0.5 align-middle"
                              animate={{ opacity: [1, 0, 1] }}
                              transition={{ duration: 0.7, repeat: Infinity }}
                            />
                          )}
                        </p>
                        {/* 時間戳 + 已讀雙勾 */}
                        <div className="flex items-center justify-end gap-1 mt-1.5">
                          <p className="text-[10px] text-gray-400">
                            {new Date().toLocaleTimeString('zh-HK', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                          <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                            <path
                              d="M1 5L4.5 8.5L9 3"
                              stroke="#53BDEB"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M5 5L8.5 8.5L13 3"
                              stroke="#53BDEB"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* CTA 按鈕 */}
                    <motion.div variants={ctaVariants}>
                      <motion.button
                        onClick={handleWhatsAppClick}
                        whileHover={{
                          scale: 1.02,
                          boxShadow: "0 8px 25px rgba(37,211,102,0.45)",
                        }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full relative overflow-hidden bg-[#25D366] text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg"
                      >
                        {/* 光澤掃過效果 */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                          initial={{ x: "-100%" }}
                          animate={{ x: "200%" }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 3,
                            ease: "easeInOut",
                          }}
                        />
                        <WhatsAppIcon size={18} />
                        <span className="relative z-10 text-sm tracking-wide">{content.cta}</span>
                        <motion.div
                          animate={{ x: [0, 3, 0] }}
                          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <ChevronRight size={16} className="relative z-10" />
                        </motion.div>
                      </motion.button>
                    </motion.div>

                    {/* 底部信任標籤 */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="flex items-center justify-center gap-1.5"
                    >
                      <Sparkles size={10} className="text-[#25D366]" />
                      <p className="text-[10px] text-gray-400 text-center">
                        免費諮詢 · 無需預付 · 即時回覆
                      </p>
                      <Sparkles size={10} className="text-[#25D366]" />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 主按鈕區域 ── */}
      <div className="relative">
        {/* 懸停提示 (桌面) */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 8, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 8, scale: 0.9 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="absolute right-full mr-3 top-1/2 -translate-y-1/2 pointer-events-none hidden md:block"
            >
              <div className="bg-gray-900/90 backdrop-blur-sm text-white text-xs py-2 px-3.5 rounded-xl whitespace-nowrap shadow-xl">
                <span className="font-medium">有問題想問？</span>
                <span className="text-white/70 ml-1">點擊對話 💬</span>
                {/* 箭頭 */}
                <div className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-gray-900/90" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 脈衝光環 — 使用獨立定位層避免影響按鈕佈局 */}
        {!isOpen && (
          <div className="absolute inset-0 pointer-events-none" style={{ zIndex: -1 }}>
            <motion.span
              className="absolute inset-0 rounded-full bg-[#25D366]"
              animate={{ scale: [1, 1.7], opacity: [0.45, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
                repeatDelay: 0.5,
              }}
            />
            <motion.span
              className="absolute inset-0 rounded-full bg-[#25D366]"
              animate={{ scale: [1, 2.1], opacity: [0.25, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.5,
                repeatDelay: 0.5,
              }}
            />
          </div>
        )}

        {/* 通知徽章 */}
        <NotificationBadge visible={!isOpen && !hasClosed} />

        {/* 3D 傾斜主按鈕 */}
        <TiltButton
          onClick={handleButtonClick}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          className="relative w-16 h-16 rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_rgba(37,211,102,0.5)] flex items-center justify-center overflow-hidden"
        >
          {/* 按鈕內光澤 */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 via-transparent to-black/10 pointer-events-none" />

          {/* 點擊漣漪 */}
          <RippleEffect trigger={ripple} />

          {/* 粒子效果 (hover 時) */}
          {isHovered && <FloatingParticles />}

          {/* 圖示切換動畫 */}
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="open"
                initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", damping: 18, stiffness: 300 }}
              >
                <Send size={26} />
              </motion.div>
            ) : (
              <motion.div
                key="closed"
                initial={{ rotate: 90, scale: 0.5, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: -90, scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", damping: 18, stiffness: 300 }}
              >
                <WhatsAppIcon size={30} />
              </motion.div>
            )}
          </AnimatePresence>
        </TiltButton>
      </div>
    </div>
  );
};

export default WhatsAppFloat;
