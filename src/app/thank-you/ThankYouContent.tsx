"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Calendar,
  Clock,
  Sparkles,
  MapPin,
  Phone,
  MessageCircle,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";

// 格式化日期顯示（例：2026-03-15 → 2026年3月15日（星期日））
function formatDisplayDate(dateStr: string): string {
  if (!dateStr) return dateStr;
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  const weekday = ["日", "一", "二", "三", "四", "五", "六"][date.getDay()];
  return `${y}年${m}月${d}日（星期${weekday}）`;
}

// 下一步說明
const NEXT_STEPS = [
  {
    icon: Phone,
    title: "等候確認",
    desc: "我們的顧問將於 24 小時內透過 WhatsApp 或電話聯絡您，確認最終預約時間。",
    color: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    icon: Calendar,
    title: "準時到達",
    desc: "確認後請準時前往旺角朗豪坊辦公室大樓 40 樓，建議提早 5 分鐘到達。",
    color: "bg-green-50",
    iconColor: "text-green-500",
  },
  {
    icon: MessageCircle,
    title: "隨時聯絡",
    desc: "如需更改預約或有任何疑問，可隨時透過 WhatsApp +852 5335 3313 聯絡我們。",
    color: "bg-accent/5",
    iconColor: "text-accent",
  },
];

export default function ThankYouContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "親愛的顧客";
  const date = searchParams.get("date") || "";
  const time = searchParams.get("time") || "";
  const treatment = searchParams.get("treatment") || "";

  const whatsappNumber = "85253353313";
  const whatsappMessage = `你好 Peko Beauty，我已完成網上預約：\n姓名：${name}\n療程：${treatment}\n日期：${date}\n時間：${time}\n請確認，謝謝！`;

  const hasBookingInfo = date || time || treatment;

  return (
    <div className="min-h-screen bg-background pt-24 md:pt-28 pb-20 px-4">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* ── 主確認卡片 ───────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-white rounded-3xl shadow-xl border border-platinum-silver overflow-hidden"
        >
          {/* 頂部色條 */}
          <div className="h-1.5 bg-gradient-to-r from-transparent via-accent to-transparent" />

          <div className="p-8 md:p-10 text-center">
            {/* 成功圖示 */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.15 }}
              className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-md"
            >
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </motion.div>

            {/* 標題 */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="text-2xl md:text-3xl font-bold text-foreground mb-3"
            >
              預約申請已收到！
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="text-muted text-sm mb-8 max-w-sm mx-auto leading-relaxed"
            >
              {name}，感謝您選擇 Peko Beauty。
              <br />
              我們將於 <span className="font-semibold text-foreground">24 小時內</span> 透過 WhatsApp 確認您的預約。
            </motion.p>

            {/* 預約摘要 */}
            {hasBookingInfo && (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="bg-gray-50 rounded-2xl p-5 mb-8 text-left border border-platinum-silver"
              >
                <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-accent" />
                  預約摘要
                </p>

                <div className="space-y-3">
                  {treatment && (
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                        <Sparkles className="w-4 h-4 text-accent" />
                      </div>
                      <div>
                        <p className="text-[10px] text-muted">預約療程</p>
                        <p className="text-sm font-bold text-foreground">{treatment}</p>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    {date && (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                          <Calendar className="w-4 h-4 text-accent" />
                        </div>
                        <div>
                          <p className="text-[10px] text-muted">首選日期</p>
                          <p className="text-sm font-bold text-foreground">{formatDisplayDate(date)}</p>
                        </div>
                      </div>
                    )}

                    {time && (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                          <Clock className="w-4 h-4 text-accent" />
                        </div>
                        <div>
                          <p className="text-[10px] text-muted">首選時間</p>
                          <p className="text-sm font-bold text-foreground">{time}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-start gap-3 pt-1 border-t border-platinum-silver">
                    <div className="w-8 h-8 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-[10px] text-muted">地址</p>
                      <p className="text-sm font-bold text-foreground leading-snug">
                        旺角亞皆老街 8 號朗豪坊辦公室大樓 40 樓 02 室
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 行動按鈕 */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <motion.a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#25D366] text-white rounded-2xl font-bold text-sm shadow-lg shadow-green-500/20 hover:bg-[#20bd5a] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp 確認預約
              </motion.a>

              <Link
                href="/"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-gray-100 text-foreground rounded-2xl font-bold text-sm hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                返回首頁
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* ── 下一步說明 ────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="bg-white rounded-3xl shadow-sm border border-platinum-silver p-6 md:p-8"
        >
          <h2 className="text-base font-bold text-foreground mb-5 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-accent" />
            接下來會發生什麼？
          </h2>

          <div className="space-y-4">
            {NEXT_STEPS.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.65 + idx * 0.08, duration: 0.4 }}
                className={`flex gap-4 p-4 rounded-2xl ${step.color}`}
              >
                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                  <step.icon className={`w-4 h-4 ${step.iconColor}`} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-foreground mb-0.5">{step.title}</h3>
                  <p className="text-xs text-muted leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── 底部備註 ──────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.4 }}
          className="text-center text-xs text-muted leading-relaxed px-2"
        >
          如 24 小時內未收到回覆，請直接 WhatsApp{" "}
          <a
            href="https://wa.me/85253353313"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-foreground hover:text-accent transition-colors underline underline-offset-2"
          >
            +852 5335 3313
          </a>
        </motion.p>
      </div>
    </div>
  );
}
