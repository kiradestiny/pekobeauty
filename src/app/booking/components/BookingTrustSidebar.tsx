"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Clock, Users, Star, ShieldCheck, ArrowRight, Sparkles, Phone, MessageCircle } from "lucide-react";

// 動態計數器 Hook
// 支援整數與小數（如 4.9），小數時保留一位小數顯示
function useCountUp(target: number, duration: number = 1500, inView: boolean = false) {
  const [count, setCount] = useState(0);
  const isDecimal = target % 1 !== 0;

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(isDecimal ? Math.round(start * 10) / 10 : Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, inView, isDecimal]);

  return count;
}

// 統計數字組件
function StatCounter({
  value,
  suffix,
  label,
  delay,
  inView,
}: {
  value: number;
  suffix: string;
  label: string;
  delay: number;
  inView: boolean;
}) {
  const count = useCountUp(value, 1200, inView);
  const isDecimal = value % 1 !== 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      className="text-center"
    >
      <div className="text-2xl font-black text-foreground">
        {isDecimal ? count.toFixed(1) : count}
        <span className="text-accent">{suffix}</span>
      </div>
      <div className="text-xs text-muted mt-0.5">{label}</div>
    </motion.div>
  );
}

const TRUST_ITEMS = [
  {
    icon: Clock,
    title: "快速確認",
    desc: "24 小時內專人 WhatsApp 回覆確認",
    color: "from-blue-50 to-blue-50/30",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-500",
  },
  {
    icon: Users,
    title: "一對一服務",
    desc: "資深治療師全程陪同，不設硬銷",
    color: "from-purple-50 to-purple-50/30",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-500",
  },
  {
    icon: Star,
    title: "明碼實價",
    desc: "所有費用諮詢時清晰列明，絕無隱藏",
    color: "from-amber-50 to-amber-50/30",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-500",
  },
  {
    icon: ShieldCheck,
    title: "原廠正貨",
    desc: "100% 使用原廠儀器，即場開封驗證",
    color: "from-green-50 to-green-50/30",
    iconBg: "bg-green-100",
    iconColor: "text-green-500",
  },
];

const STATS = [
  { value: 2000, suffix: "+", label: "服務客戶" },
  { value: 98, suffix: "%", label: "滿意度" },
  { value: 4.9, suffix: "★", label: "Google 評分" },
];

export default function BookingTrustSidebar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="space-y-5">
      {/* 預約保障卡片 */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl p-6 shadow-lg border border-platinum-silver overflow-hidden relative"
      >
        {/* 背景裝飾 */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/3 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

        <h3 className="text-lg font-bold mb-5 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-accent" />
          預約保障
        </h3>

        <ul className="space-y-3">
          {TRUST_ITEMS.map((item, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: 15 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.1 + idx * 0.08, duration: 0.4 }}
              className={`flex gap-3 p-3 rounded-2xl bg-gradient-to-r ${item.color}`}
            >
              <div className={`w-9 h-9 rounded-xl ${item.iconBg} flex items-center justify-center shrink-0`}>
                <item.icon className={`w-4 h-4 ${item.iconColor}`} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-foreground">{item.title}</h4>
                <p className="text-xs text-muted mt-0.5 leading-relaxed">{item.desc}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* 統計數字 */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-white rounded-3xl p-6 shadow-lg border border-platinum-silver"
      >
        <div className="grid grid-cols-3 gap-4 divide-x divide-gray-100">
          {STATS.map((stat, idx) => (
            <StatCounter
              key={idx}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={0.3 + idx * 0.1}
              inView={inView}
            />
          ))}
        </div>
      </motion.div>

      {/* 新客戶禮遇 */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.3, duration: 0.5 }}
        whileHover={{ y: -3 }}
        className="relative bg-[#0a0a0a] rounded-3xl p-6 shadow-xl overflow-hidden cursor-default group"
      >
        {/* 背景光效 */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-transparent pointer-events-none" />
        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-accent/10 rounded-full blur-2xl pointer-events-none" />

        {/* 閃爍粒子 */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-accent/60"
            style={{
              left: `${20 + i * 15}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 2,
              delay: i * 0.4,
              repeat: Infinity,
            }}
          />
        ))}

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-accent text-xs font-bold uppercase tracking-widest">新客戶禮遇</span>
          </div>
          <h3 className="text-white text-lg font-bold mb-1">首次預約專屬優惠</h3>
          <p className="text-white/50 text-xs mb-4 leading-relaxed">
            免費 VISIA 皮膚分析一次
            <span className="text-white/30 line-through ml-1">價值 $800</span>
          </p>
          <div className="flex items-center gap-2 text-accent text-sm font-bold group-hover:gap-3 transition-all">
            立即預約鎖定優惠
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </motion.div>

      {/* 聯絡資訊 */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-white rounded-3xl p-5 shadow-lg border border-platinum-silver"
      >
        <p className="text-xs text-muted text-center mb-3">如有疑問，歡迎直接聯絡我們</p>
        <div className="flex gap-2">
          <motion.a
            href="https://wa.me/85253353313"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#25D366] text-white rounded-2xl text-sm font-bold"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </motion.a>
          <motion.a
            href="tel:+85253353313"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-100 text-foreground rounded-2xl text-sm font-bold"
          >
            <Phone className="w-4 h-4" />
            致電
          </motion.a>
        </div>
        <p className="text-center text-xs text-muted mt-2 font-medium">+852 5335 3313</p>
      </motion.div>
    </div>
  );
}
