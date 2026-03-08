"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";

import BookingStepIndicator from "./BookingStepIndicator";
import BookingStep1Personal from "./BookingStep1Personal";
import BookingStep2Treatment from "./BookingStep2Treatment";
import BookingStep3DateTime from "./BookingStep3DateTime";
import BookingTrustSidebar from "./BookingTrustSidebar";

interface FormData {
  name: string;
  phone: string;
  date: string;
  time: string;
}

// 驗證每個步驟是否可以繼續
function canProceed(step: number, formData: FormData, selectedTreatments: string[]): boolean {
  if (step === 1) {
    return formData.name.trim().length >= 2 && /^[0-9]{8}$/.test(formData.phone.replace(/\s/g, ""));
  }
  if (step === 2) {
    return selectedTreatments.length > 0;
  }
  if (step === 3) {
    return !!formData.date && !!formData.time;
  }
  return false;
}

// 步驟按鈕文字
function getNextButtonLabel(step: number, formData: FormData, selectedTreatments: string[]): string {
  if (step === 1) {
    if (!formData.name.trim()) return "請輸入姓名";
    if (!/^[0-9]{8}$/.test(formData.phone.replace(/\s/g, ""))) return "請輸入有效電話";
    return "下一步：選擇療程";
  }
  if (step === 2) {
    if (selectedTreatments.length === 0) return "請選擇療程";
    return "下一步：選擇時間";
  }
  if (step === 3) {
    if (!formData.date) return "請選擇日期";
    if (!formData.time) return "請選擇時間";
    return "立即提交預約";
  }
  return "下一步";
}

export default function BookingClient() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTreatments, setSelectedTreatments] = useState<string[]>([]);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    date: "",
    time: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // ─── Scroll to form top ─────────────────────────────────────────────────
  // 使用 ref 滾動至表單卡片頂部，而非 window.scrollTo({ top: 0 })
  // 好處：Header 固定高度 (≈80px) 不會被遮擋，使用者不必目光重新尋找錨點
  const formCardRef = useRef<HTMLDivElement>(null);

  const scrollToForm = useCallback(() => {
    if (!formCardRef.current) return;
    const rect = formCardRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY + rect.top - 96; // 96px = header height + 16px padding
    window.scrollTo({ top: scrollTop, behavior: "smooth" });
  }, []);

  const handleFormChange = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleToggleTreatment = (title: string) => {
    setSelectedTreatments([title]);
  };

  const handleNext = () => {
    if (!canProceed(currentStep, formData, selectedTreatments)) return;
    if (currentStep < 3) {
      scrollToForm();
      setCurrentStep((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    scrollToForm();
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const params = new URLSearchParams({
        name: formData.name,
        date: formData.date,
        time: formData.time,
        treatment: selectedTreatments[0] || "皮膚分析咨詢",
      });
      router.push(`/thank-you?${params.toString()}`);
    } catch (error) {
      console.error("Booking failed:", error);
      setIsSubmitting(false);
    }
  };

  const isNextEnabled = canProceed(currentStep, formData, selectedTreatments);
  const nextLabel = getNextButtonLabel(currentStep, formData, selectedTreatments);

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start px-4 sm:px-6 pb-20">
      {/* 左側：表單主體 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="lg:col-span-2"
      >
        <div ref={formCardRef} className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-platinum-silver relative overflow-hidden">
          {/* 頂部裝飾光條 */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-60" />

          {/* 步驟指示器 */}
          <BookingStepIndicator currentStep={currentStep} />

          {/* 步驟內容 */}
          <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <BookingStep1Personal
                  key="step1"
                  formData={formData}
                  onChange={handleFormChange}
                />
              )}
              {currentStep === 2 && (
                <BookingStep2Treatment
                  key="step2"
                  selectedTreatments={selectedTreatments}
                  onToggle={handleToggleTreatment}
                />
              )}
              {currentStep === 3 && (
                <BookingStep3DateTime
                  key="step3"
                  formData={formData}
                  onChange={handleFormChange}
                />
              )}
            </AnimatePresence>
          </div>

          {/* 導航按鈕 */}
          <div className="pt-8 flex gap-3 border-t border-gray-100 mt-8">
            {/* 上一步按鈕 */}
            <AnimatePresence>
              {currentStep > 1 && (
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  type="button"
                  onClick={handlePrev}
                  className="flex items-center gap-2 px-6 py-4 border-2 border-platinum-silver text-foreground rounded-2xl font-bold hover:border-accent hover:text-accent transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  上一步
                </motion.button>
              )}
            </AnimatePresence>

            {/* 下一步 / 提交按鈕 */}
            <motion.button
              type="button"
              onClick={handleNext}
              disabled={!isNextEnabled || isSubmitting}
              whileHover={isNextEnabled && !isSubmitting ? { scale: 1.02, y: -1 } : {}}
              whileTap={isNextEnabled && !isSubmitting ? { scale: 0.98 } : {}}
              className={`
                flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-bold text-sm transition-all
                ${isNextEnabled && !isSubmitting
                  ? "bg-accent text-white shadow-lg shadow-accent/25 hover:bg-accent/90 hover:shadow-xl hover:shadow-accent/30"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }
              `}
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Loader2 className="w-5 h-5" />
                  </motion.div>
                  提交中，請稍候...
                </>
              ) : (
                <>
                  {nextLabel}
                  {currentStep === 3 ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <ArrowRight className="w-5 h-5" />
                  )}
                </>
              )}
            </motion.button>
          </div>

          {/* 步驟摘要（Step 3 顯示已選資訊） */}
          <AnimatePresence>
            {currentStep === 3 && (selectedTreatments.length > 0 || formData.name) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 overflow-hidden"
              >
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-xs font-bold text-muted uppercase tracking-wider mb-2">預約摘要</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {formData.name && (
                      <div>
                        <span className="text-muted">姓名：</span>
                        <span className="font-semibold text-foreground">{formData.name}</span>
                      </div>
                    )}
                    {formData.phone && (
                      <div>
                        <span className="text-muted">電話：</span>
                        <span className="font-semibold text-foreground">{formData.phone}</span>
                      </div>
                    )}
                    {selectedTreatments[0] && (
                      <div className="col-span-2">
                        <span className="text-muted">療程：</span>
                        <span className="font-semibold text-accent">{selectedTreatments[0]}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* 右側：信任信號側邊欄 */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <BookingTrustSidebar />
      </motion.div>
    </div>
  );
}
