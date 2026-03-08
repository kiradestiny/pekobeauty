"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Phone, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";

interface FormData {
  name: string;
  phone: string;
  date: string;
  time: string;
}

interface BookingStep1PersonalProps {
  formData: FormData;
  onChange: (data: Partial<FormData>) => void;
}

// 浮動標籤輸入框組件
function FloatingInput({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  icon: Icon,
  validate,
}: {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  icon: React.ElementType;
  validate?: (v: string) => boolean;
}) {
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);

  const isValid = validate ? validate(value) : value.length > 0;
  const showError = touched && !isValid && value.length > 0;
  const showSuccess = touched && isValid && value.length > 0;
  const isFloating = focused || value.length > 0;

  return (
    <div className="relative group">
      {/* 輸入框容器 */}
      <div
        className={`
          relative rounded-2xl border-2 transition-all duration-300 overflow-hidden
          ${focused ? "border-accent shadow-lg shadow-accent/10" : "border-platinum-silver"}
          ${showError ? "border-red-400 shadow-lg shadow-red-400/10" : ""}
          ${showSuccess ? "border-green-400 shadow-lg shadow-green-400/10" : ""}
        `}
      >
        {/* 背景光效 */}
        <motion.div
          animate={{ opacity: focused ? 1 : 0 }}
          className="absolute inset-0 bg-gradient-to-br from-accent/3 to-transparent pointer-events-none"
        />

        {/* 圖示 */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
          <motion.div
            animate={{ color: focused ? "#C52B21" : "#888888" }}
            transition={{ duration: 0.2 }}
          >
            <Icon className="w-5 h-5" />
          </motion.div>
        </div>

        {/* 浮動標籤 */}
        <motion.label
          htmlFor={id}
          animate={{
            top: isFloating ? "8px" : "50%",
            y: isFloating ? "0%" : "-50%",
            fontSize: isFloating ? "10px" : "14px",
            color: focused ? "#C52B21" : isFloating ? "#888888" : "#888888",
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute left-12 font-medium pointer-events-none z-10 origin-left"
          style={{ top: "50%", transform: "translateY(-50%)" }}
        >
          {label}
        </motion.label>

        {/* 輸入框 */}
        {/* autocomplete 提示瀏覽器自動填入，改善手機 UX 及無障礙 */}
        <input
          id={id}
          type={type}
          value={value}
          autoComplete={id === "phone" ? "tel" : id === "name" ? "name" : "off"}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            setTouched(true);
          }}
          placeholder={focused ? placeholder : ""}
          className="w-full pl-12 pr-12 pt-6 pb-3 bg-transparent text-foreground text-sm font-medium focus:outline-none relative z-10"
        />

        {/* 右側狀態圖示 */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
          <AnimatePresence mode="wait">
            {showSuccess && (
              <motion.div
                key="success"
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              </motion.div>
            )}
            {showError && (
              <motion.div
                key="error"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <AlertCircle className="w-5 h-5 text-red-400" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 錯誤提示 */}
      <AnimatePresence>
        {showError && (
          <motion.p
            initial={{ opacity: 0, y: -5, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -5, height: 0 }}
            className="text-xs text-red-400 mt-1.5 ml-2 flex items-center gap-1"
          >
            <AlertCircle className="w-3 h-3" />
            {id === "phone" ? "請輸入有效的香港電話號碼（8位數字）" : "請輸入您的姓名"}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// 驗證函數
const validatePhone = (phone: string) => /^[0-9]{8}$/.test(phone.replace(/\s/g, ""));
const validateName = (name: string) => name.trim().length >= 2;

export default function BookingStep1Personal({ formData, onChange }: BookingStep1PersonalProps) {
  return (
    <motion.div
      key="step1"
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
            <User className="w-4 h-4 text-accent" />
          </div>
          <span className="text-xs font-bold text-accent uppercase tracking-widest">Step 01</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-2xl md:text-3xl font-bold text-foreground"
        >
          告訴我們如何稱呼您
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-muted text-sm"
        >
          請填寫基本聯絡資料，以便我們跟進預約安排。
        </motion.p>
      </div>

      {/* 輸入框組 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        <FloatingInput
          id="name"
          label="您的姓名"
          type="text"
          value={formData.name}
          onChange={(v) => onChange({ name: v })}
          placeholder="例：陳小明"
          icon={User}
          validate={validateName}
        />
        <FloatingInput
          id="phone"
          label="WhatsApp 電話"
          type="tel"
          value={formData.phone}
          onChange={(v) => onChange({ phone: v })}
          placeholder="例：9123 4567"
          icon={Phone}
          validate={validatePhone}
        />
      </motion.div>

      {/* 隱私提示 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="flex items-start gap-3 p-4 bg-accent/5 rounded-2xl border border-accent/10"
      >
        <Sparkles className="w-4 h-4 text-accent shrink-0 mt-0.5" />
        <p className="text-xs text-accent/80 leading-relaxed">
          您的個人資料將受到嚴格保護，僅用於預約確認及後續跟進，絕不會用於其他用途。
        </p>
      </motion.div>

      {/* 完成狀態提示 */}
      <AnimatePresence>
        {validateName(formData.name) && validatePhone(formData.phone) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex items-center gap-3 p-4 bg-green-50 rounded-2xl border border-green-200"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            </motion.div>
            <p className="text-sm text-green-700 font-medium">
              資料填寫完成！點擊「下一步」繼續選擇療程。
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
