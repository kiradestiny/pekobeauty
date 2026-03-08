"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, User, Sparkles, Calendar } from "lucide-react";

export interface Step {
  id: number;
  name: string;
  desc: string;
  icon: React.ElementType;
}

export const BOOKING_STEPS: Step[] = [
  { id: 1, name: "個人資料", desc: "填寫聯絡資訊", icon: User },
  { id: 2, name: "選擇療程", desc: "挑選心儀項目", icon: Sparkles },
  { id: 3, name: "預約時間", desc: "確認日期時段", icon: Calendar },
];

interface BookingStepIndicatorProps {
  currentStep: number;
}

export default function BookingStepIndicator({ currentStep }: BookingStepIndicatorProps) {
  return (
    <div className="mb-10 select-none">
      {/* 步驟列 */}
      <div className="flex items-center relative">
        {BOOKING_STEPS.map((step, idx) => {
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;
          const isPending = currentStep < step.id;

          return (
            <div key={step.id} className="flex-1 flex flex-col items-center relative">
              {/* 連接線（非最後一個） */}
              {idx < BOOKING_STEPS.length - 1 && (
                <div className="absolute top-5 left-1/2 w-full h-[2px] bg-gray-100 z-0">
                  <motion.div
                    className="h-full bg-gradient-to-r from-accent to-accent/60"
                    initial={{ width: "0%" }}
                    animate={{ width: isCompleted ? "100%" : "0%" }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                </div>
              )}

              {/* 步驟圓圈 */}
              <div className="relative z-10">
                <motion.div
                  animate={{
                    scale: isActive ? 1.15 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 relative
                    ${isCompleted ? "bg-accent shadow-lg shadow-accent/30" : ""}
                    ${isActive ? "bg-accent shadow-xl shadow-accent/40" : ""}
                    ${isPending ? "bg-gray-100" : ""}
                  `}
                >
                  <AnimatePresence mode="wait">
                    {isCompleted ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      >
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="icon"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <step.icon
                          className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-400"}`}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* 活躍脈衝環 */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-accent"
                      animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </motion.div>
              </div>

              {/* 步驟文字 */}
              <motion.div
                animate={{ opacity: isPending ? 0.4 : 1 }}
                className="mt-3 text-center"
              >
                <div
                  className={`text-xs font-bold tracking-wide ${
                    isActive || isCompleted ? "text-foreground" : "text-muted"
                  }`}
                >
                  {step.name}
                </div>
                <div className="text-[10px] text-muted mt-0.5 hidden sm:block">
                  {step.desc}
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* 進度文字 */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 text-center"
      >
        <span className="text-xs text-muted">
          步驟 <span className="text-accent font-bold">{currentStep}</span> / {BOOKING_STEPS.length}
        </span>
        <div className="mt-2 h-1 bg-gray-100 rounded-full overflow-hidden max-w-xs mx-auto">
          <motion.div
            className="h-full bg-gradient-to-r from-accent to-accent/70 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${((currentStep - 1) / (BOOKING_STEPS.length - 1)) * 100}%` }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </div>
  );
}
