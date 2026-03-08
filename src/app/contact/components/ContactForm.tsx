"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, Loader2, ChevronDown, ArrowRight } from 'lucide-react';

const BRAND = "#C52B21";

function FloatingInput({ label, type = 'text', required, placeholder, value, onChange, error }: {
  label: string; type?: string; required?: boolean; placeholder?: string;
  value: string; onChange: (v: string) => void; error?: string;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  return (
    <div className="relative pt-5">
      <motion.label
        animate={{ y: active ? -20 : 0, scale: active ? 0.78 : 1, color: focused ? BRAND : '#9CA3AF' }}
        transition={{ duration: 0.2 }}
        className="absolute left-0 top-5 text-sm font-medium origin-left pointer-events-none"
      >
        {label}{required && <span style={{ color: BRAND }} className="ml-0.5">*</span>}
      </motion.label>
      <input
        type={type} value={value} onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        placeholder={active ? placeholder : ''}
        className="w-full pt-2 pb-2 bg-transparent border-b-2 outline-none text-gray-900 placeholder:text-gray-300 transition-colors duration-300"
        style={{ borderBottomColor: error ? '#EF4444' : focused ? BRAND : '#E5E7EB' }}
      />
      <AnimatePresence>
        {error && (
          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="text-xs text-red-500 mt-1">{error}</motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function FloatingTextarea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void; }) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  return (
    <div className="relative pt-5">
      <motion.label
        animate={{ y: active ? -20 : 0, scale: active ? 0.78 : 1, color: focused ? BRAND : '#9CA3AF' }}
        transition={{ duration: 0.2 }}
        className="absolute left-0 top-5 text-sm font-medium origin-left pointer-events-none"
      >
        訊息內容
      </motion.label>
      <textarea
        value={value} onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        rows={4}
        className="w-full pt-2 pb-2 bg-transparent border-b-2 outline-none text-gray-900 resize-none transition-colors duration-300"
        style={{ borderBottomColor: focused ? BRAND : '#E5E7EB' }}
      />
    </div>
  );
}

const inquiryTypes = ['預約皮膚分析', '療程詳情查詢', '商務合作提案', '媒體採訪/公關查詢', '其他'];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', type: '預約皮膚分析', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [focusedSelect, setFocusedSelect] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = '請輸入您的姓名';
    if (!form.phone.trim()) e.phone = '請輸入聯絡電話';
    if (!form.email.trim()) e.email = '請輸入電郵地址';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = '請輸入有效的電郵地址';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 2200));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div id="contact-form" className="p-8 md:p-14 lg:p-16">
      <div className="max-w-md mx-auto lg:mx-0">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <span className="text-[10px] font-bold tracking-[0.4em] uppercase mb-3 block" style={{ color: BRAND }}>Send Message</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">發送訊息</h2>
          <p className="text-gray-400 mb-10 leading-relaxed font-light">
            請填寫以下資訊，我們的專業顧問將於 24 小時內回覆您的查詢。
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }}
              onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FloatingInput label="您的姓名" required placeholder="例如：陳小姐"
                  value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} error={errors.name} />
                <FloatingInput label="聯絡電話" type="tel" required placeholder="9123 4567"
                  value={form.phone} onChange={v => setForm(f => ({ ...f, phone: v }))} error={errors.phone} />
              </div>

              <FloatingInput label="電郵地址" type="email" required placeholder="hello@example.com"
                value={form.email} onChange={v => setForm(f => ({ ...f, email: v }))} error={errors.email} />

              {/* Select */}
              <div className="relative pt-5">
                <label className="absolute left-0 top-0 text-[10px] font-bold tracking-[0.2em] uppercase transition-colors duration-300"
                  style={{ color: focusedSelect ? BRAND : '#9CA3AF' }}>
                  查詢類型
                </label>
                <div className="relative">
                  <select
                    value={form.type}
                    onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                    onFocus={() => setFocusedSelect(true)}
                    onBlur={() => setFocusedSelect(false)}
                    className="w-full pt-2 pb-2 bg-transparent border-b-2 outline-none appearance-none cursor-pointer text-gray-900 transition-colors duration-300"
                    style={{ borderBottomColor: focusedSelect ? BRAND : '#E5E7EB' }}
                  >
                    {inquiryTypes.map(t => <option key={t}>{t}</option>)}
                  </select>
                  <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                </div>
              </div>

              <FloatingTextarea label="訊息內容" value={form.message} onChange={v => setForm(f => ({ ...f, message: v }))} />

              {/* Submit */}
              <motion.button
                type="submit" disabled={isSubmitting}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="relative w-full py-5 rounded-2xl text-white font-bold tracking-[0.2em] flex items-center justify-center gap-3 overflow-hidden group disabled:opacity-70 transition-all"
                style={{ background: `linear-gradient(135deg, ${BRAND}, #FF4444)`, boxShadow: '0 16px 48px rgba(197,43,33,0.35)' }}
              >
                {/* Shimmer */}
                <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <span className="relative z-10 flex items-center gap-3">
                  {isSubmitting ? (
                    <><Loader2 size={20} className="animate-spin" /> 處理中...</>
                  ) : (
                    <><Send size={20} /> 立即發送訊息</>
                  )}
                </span>
              </motion.button>

              <p className="text-center text-xs text-gray-400">
                提交即表示您同意我們的
                <a href="/privacy" className="underline hover:text-gray-600 transition-colors mx-1">私隱政策</a>
              </p>
            </motion.form>
          ) : (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="py-16 text-center">
              {/* Success animation */}
              <motion.div
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8"
                style={{ background: 'linear-gradient(135deg, #22C55E, #16A34A)', boxShadow: '0 16px 48px rgba(34,197,94,0.35)' }}
              >
                <CheckCircle2 size={48} className="text-white" />
              </motion.div>
              <motion.h4 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="text-3xl font-bold text-gray-900 mb-4">發送成功！</motion.h4>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                className="text-gray-400 mb-10 px-4 leading-relaxed">
                感謝您的訊息。我們的顧問將會盡快與您聯絡。
              </motion.p>
              <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                onClick={() => setSubmitted(false)}
                className="inline-flex items-center gap-2 text-sm font-bold hover:underline transition-colors"
                style={{ color: BRAND }}>
                發送另一則訊息 <ArrowRight size={16} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
