"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, ChevronLeft, ChevronRight, CheckCircle2, ShieldCheck, Info } from "lucide-react";

interface FormData {
  name: string;
  phone: string;
  date: string;
  time: string;
}

interface BookingStep3DateTimeProps {
  formData: FormData;
  onChange: (data: Partial<FormData>) => void;
}

const WEEKDAYS = ["日", "一", "二", "三", "四", "五", "六"];

// 判斷日期是否禁用
function isDateDisabled(date: Date | null): boolean {
  if (!date) return true;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const compareDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  if (compareDate < tomorrow) return true;
  if (compareDate.getDay() === 0) return true; // 星期日休息
  return false;
}

// 格式化日期
function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

// 格式化顯示日期
function formatDisplayDate(dateStr: string): string {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  const weekday = ["日", "一", "二", "三", "四", "五", "六"][date.getDay()];
  return `${y}年${m}月${d}日（星期${weekday}）`;
}

// 根據日期獲取營業時間
function getOpeningHours(dateString: string): { start: number; end: number } | null {
  if (!dateString) return null;
  const [year, month, dayNum] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, dayNum);
  const day = date.getDay();
  if (day === 0) return null;
  if (day === 6) return { start: 10 * 60, end: 19 * 60 };
  return { start: 11.5 * 60, end: 20.5 * 60 };
}

// 生成時間段
function generateTimeSlots(dateString: string): string[] {
  const hours = getOpeningHours(dateString);
  if (!hours) return [];
  const slots: string[] = [];
  let current = hours.start;
  while (current < hours.end) {
    const h = Math.floor(current / 60);
    const m = current % 60;
    slots.push(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`);
    current += 30;
  }
  return slots;
}

// 時間段分組（上午/下午/晚上）
function groupTimeSlots(slots: string[]): Record<string, string[]> {
  const groups: Record<string, string[]> = { 上午: [], 下午: [], 晚上: [] };
  slots.forEach((slot) => {
    const hour = parseInt(slot.split(":")[0]);
    if (hour < 12) groups["上午"].push(slot);
    else if (hour < 18) groups["下午"].push(slot);
    else groups["晚上"].push(slot);
  });
  return groups;
}

export default function BookingStep3DateTime({ formData, onChange }: BookingStep3DateTimeProps) {
  const [viewDate, setViewDate] = useState(new Date());
  const [slideDir, setSlideDir] = useState<"left" | "right">("right");

  // 日曆天數
  const calendarDays = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days: (Date | null)[] = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));
    return days;
  }, [viewDate]);

  // 時間段
  const timeSlots = useMemo(() => generateTimeSlots(formData.date), [formData.date]);
  const groupedSlots = useMemo(() => groupTimeSlots(timeSlots), [timeSlots]);

  // 月份導航邊界：不允許倒退到「本月」之前
  const today = new Date();
  const isAtMinMonth =
    viewDate.getFullYear() === today.getFullYear() &&
    viewDate.getMonth() === today.getMonth();

  const handlePrevMonth = () => {
    if (isAtMinMonth) return; // 已在最早可選月份，禁止繼續往前
    setSlideDir("right");
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setSlideDir("left");
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1));
  };

  const openingInfo = formData.date ? getOpeningHours(formData.date) : null;

  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-8"
    >
      {/* 標題區 */}
      <div className="space-y-2">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-2"
        >
          <div className="w-8 h-8 rounded-xl bg-accent/10 flex items-center justify-center">
            <Calendar className="w-4 h-4 text-accent" />
          </div>
          <span className="text-xs font-bold text-accent uppercase tracking-widest">Step 03</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-2xl md:text-3xl font-bold text-foreground"
        >
          預約首選時間
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-muted text-sm"
        >
          我們會盡力配合您的時間，並於 24 小時內確認最終安排。
        </motion.p>
      </div>

      {/* 日曆 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="space-y-3"
      >
        <label className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Calendar className="w-4 h-4 text-accent" />
          1. 選擇首選日期
          <span className="text-xs text-muted font-normal">（星期日休息）</span>
        </label>

        <div className="bg-gray-50/60 rounded-3xl p-5 border border-platinum-silver">
          {/* 月份導航 */}
          <div className="flex items-center justify-between mb-5">
            <motion.h3
              key={`${viewDate.getFullYear()}-${viewDate.getMonth()}`}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-bold text-foreground text-lg"
            >
              {viewDate.getFullYear()}年 {viewDate.getMonth() + 1}月
            </motion.h3>
            <div className="flex gap-1">
              <motion.button
                type="button"
                whileHover={!isAtMinMonth ? { scale: 1.1 } : {}}
                whileTap={!isAtMinMonth ? { scale: 0.9 } : {}}
                onClick={handlePrevMonth}
                disabled={isAtMinMonth}
                aria-label="上一個月"
                className={`w-9 h-9 rounded-xl border bg-white flex items-center justify-center transition-colors ${
                  isAtMinMonth
                    ? "border-gray-100 text-gray-300 cursor-not-allowed"
                    : "border-platinum-silver hover:border-accent hover:text-accent cursor-pointer"
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </motion.button>
              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleNextMonth}
                className="w-9 h-9 rounded-xl border border-platinum-silver bg-white flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          {/* 星期標題 */}
          <div className="grid grid-cols-7 mb-2">
            {WEEKDAYS.map((d, i) => (
              <div
                key={d}
                className={`text-center text-[11px] font-bold py-1.5 ${
                  i === 0 ? "text-red-400" : "text-muted"
                }`}
              >
                {d}
              </div>
            ))}
          </div>

          {/* 日期格子 */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${viewDate.getFullYear()}-${viewDate.getMonth()}`}
              initial={{ opacity: 0, x: slideDir === "left" ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: slideDir === "left" ? -20 : 20 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-7 gap-1"
            >
              {calendarDays.map((date, i) => {
                if (!date) return <div key={`empty-${i}`} />;
                const disabled = isDateDisabled(date);
                const dateStr = formatDate(date);
                const isSelected = formData.date === dateStr;
                const isToday = formatDate(new Date()) === dateStr;
                const isSunday = date.getDay() === 0;

                return (
                  <motion.button
                    type="button"
                    key={date.getTime()}
                    whileHover={!disabled ? { scale: 1.12 } : {}}
                    whileTap={!disabled ? { scale: 0.92 } : {}}
                    onClick={() => {
                      if (!disabled) {
                        onChange({ date: dateStr, time: "" });
                      }
                    }}
                    className={`
                      aspect-square flex items-center justify-center rounded-xl text-sm font-bold transition-all relative
                      ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
                      ${isSunday && !isSelected ? "text-red-300" : ""}
                      ${disabled && !isSunday ? "text-gray-300" : ""}
                      ${isSelected ? "bg-accent text-white shadow-lg shadow-accent/30 scale-110 z-10" : ""}
                      ${!disabled && !isSelected ? "hover:bg-accent/10 text-foreground" : ""}
                    `}
                  >
                    {date.getDate()}
                    {/* 今日標記 */}
                    {isToday && !isSelected && (
                      <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" />
                    )}
                  </motion.button>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 已選日期顯示 */}
        <AnimatePresence>
          {formData.date && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 text-sm"
            >
              <CheckCircle2 className="w-4 h-4 text-accent" />
              <span className="font-medium text-foreground">{formatDisplayDate(formData.date)}</span>
              {openingInfo && (
                <span className="text-xs text-muted">
                  · 營業時間：{Math.floor(openingInfo.start / 60).toString().padStart(2, "0")}:
                  {(openingInfo.start % 60).toString().padStart(2, "0")} –{" "}
                  {Math.floor(openingInfo.end / 60).toString().padStart(2, "0")}:
                  {(openingInfo.end % 60).toString().padStart(2, "0")}
                </span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 時間選擇 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="space-y-3"
      >
        <label className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Clock className="w-4 h-4 text-accent" />
          2. 選擇首選時間
          <span className="text-xs text-muted font-normal">（每半小時一格）</span>
        </label>

        <AnimatePresence mode="wait">
          {!formData.date ? (
            <motion.div
              key="no-date"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-3 p-10 border-2 border-dashed border-gray-200 rounded-3xl text-center"
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2, repeat: Infinity, type: 'tween', ease: 'easeInOut' }}
              >
                <Calendar className="w-10 h-10 text-gray-200" />
              </motion.div>
              <p className="text-sm text-muted">請先從上方日曆選擇日期</p>
            </motion.div>
          ) : (
            <motion.div
              key="time-slots"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {Object.entries(groupedSlots).map(([period, slots]) => {
                if (slots.length === 0) return null;
                return (
                  <div key={period}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-muted uppercase tracking-wider">{period}</span>
                      <div className="flex-1 h-px bg-gray-100" />
                    </div>
                    <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
                      {slots.map((slot) => (
                        <motion.button
                          type="button"
                          key={slot}
                          whileHover={{ scale: 1.06 }}
                          whileTap={{ scale: 0.94 }}
                          onClick={() => onChange({ time: slot })}
                          className={`
                            py-2.5 px-1 rounded-xl border-2 text-xs font-bold transition-all text-center
                            ${formData.time === slot
                              ? "border-accent bg-accent text-white shadow-md shadow-accent/25"
                              : "border-platinum-silver hover:border-accent hover:bg-accent/5 text-foreground"
                            }
                          `}
                        >
                          {slot}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* 已選時間確認 */}
        <AnimatePresence>
          {formData.time && (
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 text-sm text-accent font-medium"
            >
              <CheckCircle2 className="w-4 h-4" />
              已選擇：{formatDisplayDate(formData.date)} {formData.time}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 提交前提示 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="flex items-start gap-3 p-4 bg-accent/5 rounded-2xl border border-accent/10"
      >
        <ShieldCheck className="w-5 h-5 text-accent shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="text-xs font-semibold text-accent">預約確認流程</p>
          <p className="text-xs text-accent/70 leading-relaxed">
            提交後，我們的客戶服務專員會於 <strong>24 小時內</strong>透過 WhatsApp 聯絡您確認最終預約時間。
          </p>
        </div>
      </motion.div>

      {/* 營業時間資訊 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-start gap-2 text-xs text-muted"
      >
        <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
        <span>
          營業時間：星期一至五 11:30–20:30 · 星期六 10:00–19:00 · 星期日休息
        </span>
      </motion.div>
    </motion.div>
  );
}
