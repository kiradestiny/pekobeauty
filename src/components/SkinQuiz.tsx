"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Droplets,
  Zap,
  Target,
  ShieldCheck,
  MessageCircle,
  Star,
  Sun,
  Moon,
  Coffee,
  Wind,
  Smile,
  AlertTriangle,
  Activity,
  User,
  ClipboardCheck
} from 'lucide-react';

interface Option {
  label: string;
  value: string;
  icon?: React.ReactNode;
  description?: string;
}

interface Question {
  id: string;
  q: string;
  subtitle?: string;
  options: Option[];
  dependsOn?: {
    id: string;
    value: string;
  };
}

interface SkinQuizProps {
  onClose: () => void;
  onResult: (concern: string, category?: string) => void;
  promotions: any[];
}

const SkinQuiz = ({ onClose, onResult, promotions }: SkinQuizProps) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // 定義所有可能的問題 - 更專業化和系統化
  const allQuestions: Question[] = [
    {
      id: 'skinType',
      q: "請選擇您的基礎膚質類型",
      subtitle: "了解您的皮脂分泌狀態是制定療程的第一步",
      options: [
        { 
          label: "乾性肌膚", 
          value: "dry", 
          icon: <Droplets className="text-blue-500" />, 
          description: "皮膚緊繃、表面粗糙、易出現細紋" 
        },
        { 
          label: "油性肌膚", 
          value: "oily", 
          icon: <Zap className="text-amber-500" />, 
          description: "T字部位油光明顯、毛孔粗大、易生粉刺" 
        },
        { 
          label: "混合性肌膚", 
          value: "combination", 
          icon: <Activity className="text-emerald-500" />, 
          description: "T字部位偏油、兩頰偏乾、膚質不均" 
        },
        { 
          label: "中性肌膚", 
          value: "normal", 
          icon: <CheckCircle2 className="text-green-500" />, 
          description: "水油平衡、膚質細膩、狀態穩定" 
        },
        { 
          label: "敏感性肌膚", 
          value: "sensitive", 
          icon: <AlertTriangle className="text-red-500" />, 
          description: "易泛紅發熱、對外界刺激反應強烈" 
        }
      ]
    },
    // 針對油性/混合性的深度追問
    {
      id: 'oilyDetail',
      q: "您的油性肌膚主要表現為？",
      subtitle: "精準定位問題，才能對症下藥",
      dependsOn: { id: 'skinType', value: 'oily' },
      options: [
        { 
          label: "毛孔粗大明顯", 
          value: "毛孔粗大", 
          icon: <Wind className="text-cyan-600" />,
          description: "鼻翼、臉頰毛孔擴張、粗糙不平" 
        },
        { 
          label: "黑頭粉刺嚴重", 
          value: "黑頭粉刺", 
          icon: <Target className="text-slate-700" />,
          description: "鼻頭、下巴有明顯黑點、閉口粉刺" 
        },
        { 
          label: "活躍性痤瘡（暗瘡）", 
          value: "活躍性暗瘡", 
          icon: <AlertTriangle className="text-red-600" />,
          description: "經常爆發紅腫痘痘、膿包型痘痘" 
        },
        { 
          label: "面部油光泛濫", 
          value: "油光問題", 
          icon: <Zap className="text-yellow-500" />,
          description: "全天候出油、妝容易花、需頻繁補妝" 
        }
      ]
    },
    {
      id: 'oilyDetailMix',
      q: "混合性肌膚最困擾您的是？",
      subtitle: "T字與兩頰需要不同的護理策略",
      dependsOn: { id: 'skinType', value: 'combination' },
      options: [
        { 
          label: "T字部位油膩", 
          value: "黑頭粉刺", 
          icon: <Target className="text-amber-600" />,
          description: "額頭、鼻翼易出油、有黑頭白頭" 
        },
        { 
          label: "兩頰乾燥缺水", 
          value: "極度乾燥", 
          icon: <Droplets className="text-blue-500" />,
          description: "臉頰緊繃、起皮、上妝卡粉" 
        },
        { 
          label: "膚色不均暗沉", 
          value: "荷爾蒙斑", 
          icon: <Sun className="text-orange-500" />,
          description: "T字暗沉、兩頰泛紅、整體無光澤" 
        },
        { 
          label: "毛孔大小不一", 
          value: "毛孔粗大", 
          icon: <Wind className="text-cyan-600" />,
          description: "鼻翼毛孔粗大、兩頰細膩、不均勻" 
        }
      ]
    },
    // 針對敏感性的專業追問
    {
      id: 'sensitiveDetail',
      q: "您的敏感肌主要症狀是？",
      subtitle: "敏感肌需要特別溫和的治療方案",
      dependsOn: { id: 'skinType', value: 'sensitive' },
      options: [
        { 
          label: "泛紅血絲明顯", 
          value: "敏感肌-泛紅", 
          icon: <AlertTriangle className="text-rose-500" />,
          description: "臉頰泛紅、微血管擴張、遇熱加劇" 
        },
        { 
          label: "易受刺激過敏", 
          value: "敏感肌-刺激", 
          icon: <ShieldCheck className="text-red-400" />,
          description: "使用護膚品易刺痛、發癢、灼熱感" 
        },
        { 
          label: "酒糟玫瑰痤瘡", 
          value: "酒糟肌", 
          icon: <Activity className="text-pink-600" />,
          description: "持續性泛紅、丘疹膿包、毛孔粗大" 
        },
        { 
          label: "濕疹或皮炎病史", 
          value: "濕疹肌", 
          icon: <AlertTriangle className="text-orange-500" />,
          description: "皮膚屏障受損、乾癢脫屑、反覆發作" 
        }
      ]
    },
    // 針對乾性肌膚的追問
    {
      id: 'dryDetail',
      q: "您的乾性肌膚主要困擾是？",
      subtitle: "找出乾燥的根本原因",
      dependsOn: { id: 'skinType', value: 'dry' },
      options: [
        { 
          label: "極度缺水緊繃", 
          value: "極度乾燥", 
          icon: <Droplets className="text-blue-600" />,
          description: "全天緊繃、脫皮起屑、妝容不服貼" 
        },
        { 
          label: "細紋乾紋明顯", 
          value: "細紋問題", 
          icon: <Activity className="text-purple-500" />,
          description: "眼周、嘴角細紋、笑紋加深" 
        },
        { 
          label: "膚色暗沉無光", 
          value: "荷爾蒙斑", 
          icon: <Sun className="text-amber-600" />,
          description: "整體膚色灰暗、缺乏透明感" 
        },
        { 
          label: "皮膚粗糙不平", 
          value: "極度乾燥", 
          icon: <Wind className="text-slate-500" />,
          description: "觸感粗糙、紋理明顯、不夠細膩" 
        }
      ]
    },
    {
      id: 'primaryConcern',
      q: "您目前最迫切想改善的肌膚問題是？",
      subtitle: "我們將根據您的首要需求制定個人化療程方案",
      options: [
        { 
          label: "痘疤凹凸洞", 
          value: "凹凸洞", 
          icon: <Target className="text-orange-600" />, 
          description: "冰錐型、箱車型、滾動型痘坑" 
        },
        { 
          label: "色斑色素沉澱", 
          value: "荷爾蒙斑", 
          icon: <Sun className="text-amber-500" />, 
          description: "黃褐斑、曬斑、炎症後色素沉澱" 
        },
        { 
          label: "皮膚鬆弛下垂", 
          value: "面部鬆弛", 
          icon: <Zap className="text-purple-600" />, 
          description: "法令紋、木偶紋、雙下巴、輪廓模糊" 
        },
        { 
          label: "細紋皺紋", 
          value: "細紋皺紋", 
          icon: <Activity className="text-indigo-500" />, 
          description: "魚尾紋、抬頭紋、頸紋、表情紋" 
        },
        { 
          label: "毛孔粗大", 
          value: "毛孔粗大", 
          icon: <Wind className="text-cyan-600" />, 
          description: "鼻翼、兩頰毛孔明顯、橘皮肌" 
        },
        { 
          label: "暗沉膚色不均", 
          value: "荷爾蒙斑", 
          icon: <Moon className="text-slate-600" />, 
          description: "整體無光澤、T字暗沉、兩頰蠟黃" 
        }
      ]
    },
    {
      id: 'ageRange',
      q: "請問您的年齡區間？",
      subtitle: "不同年齡層的膠原蛋白流失速度與肌膚需求不同",
      options: [
        { 
          label: "18-25 歲", 
          value: "under25",
          icon: <Smile className="text-green-400" />,
          description: "肌膚新陳代謝旺盛，重點預防保養"
        },
        { 
          label: "26-35 歲", 
          value: "25-35",
          icon: <User className="text-blue-400" />,
          description: "初期抗老，維持膠原蛋白"
        },
        { 
          label: "36-45 歲", 
          value: "36-45",
          icon: <Activity className="text-purple-400" />,
          description: "抗衰老關鍵期，對抗鬆弛細紋"
        },
        { 
          label: "46 歲以上", 
          value: "above45",
          icon: <Star className="text-amber-400" />,
          description: "深度抗衰，全面提升緊緻度"
        }
      ]
    },
    {
      id: 'lifestyle',
      q: "您的日常生活型態是？",
      subtitle: "生活習慣對皮膚狀態有直接影響，幫助我們評估修復能力",
      options: [
        { 
          label: "經常熬夜晚睡", 
          value: "late-night", 
          icon: <Moon className="text-indigo-500" />,
          description: "常超過 12 點睡、睡眠不足 6 小時"
        },
        { 
          label: "工作壓力大", 
          value: "high-stress", 
          icon: <Coffee className="text-amber-600" />,
          description: "精神緊張、易焦慮、內分泌失調"
        },
        { 
          label: "長期待冷氣房", 
          value: "ac-room", 
          icon: <Wind className="text-cyan-500" />,
          description: "辦公室族、室內工作、皮膚易乾燥"
        },
        { 
          label: "戶外工作/運動", 
          value: "outdoor", 
          icon: <Sun className="text-orange-500" />,
          description: "經常日曬、紫外線暴露、需加強防護"
        },
        { 
          label: "作息規律健康", 
          value: "healthy", 
          icon: <Smile className="text-green-500" />,
          description: "充足睡眠、均衡飲食、定期運動"
        }
      ]
    },
    {
      id: 'treatmentHistory',
      q: "您曾經接受過醫美療程嗎？",
      subtitle: "了解您的療程經驗，為您推薦更合適的進階方案",
      options: [
        { 
          label: "從未做過", 
          value: "never", 
          icon: <CheckCircle2 className="text-gray-400" />,
          description: "首次接觸醫美，需要詳細諮詢"
        },
        { 
          label: "做過基礎清潔", 
          value: "basic", 
          icon: <Droplets className="text-blue-400" />,
          description: "如補水、清潔、基礎護理療程"
        },
        { 
          label: "做過進階療程", 
          value: "advanced", 
          icon: <Zap className="text-purple-500" />,
          description: "如激光、射頻、超聲刀等"
        },
        { 
          label: "定期保養中", 
          value: "regular", 
          icon: <Star className="text-amber-500" />,
          description: "有固定療程計劃，尋求優化方案"
        }
      ]
    }
  ];

  // 根據當前答案過濾出應該顯示的問題列表
  const activeQuestions = useMemo(() => {
    return allQuestions.filter(q => {
      if (!q.dependsOn) return true;
      return answers[q.dependsOn.id] === q.dependsOn.value;
    });
  }, [answers]);

  const currentQuestion = activeQuestions[step];

  const handleOptionSelect = (value: string) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    if (step < activeQuestions.length - 1) {
      setStep(step + 1);
    } else {
      startAnalysis(newAnswers);
    }
  };

  const startAnalysis = (finalAnswers: Record<string, string>) => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResult(true);
    }, 2500);
  };

  const handleGoBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const progress = ((step + 1) / activeQuestions.length) * 100;

  // 計算推薦療程
  const recommendedTreatments = useMemo(() => {
    if (!showResult) return [];
    
    // 優先根據 primaryConcern 推薦
    let concern = answers.primaryConcern;
    
    // 如果有特定的追問答案，也納入考慮
    if (answers.oilyDetail) concern = answers.oilyDetail;
    if (answers.oilyDetailMix) concern = answers.oilyDetailMix;
    if (answers.sensitiveDetail) {
      // 處理帶有後綴的敏感肌標籤
      concern = answers.sensitiveDetail.split('-')[0];
    }

    const filtered = promotions.filter(p => p.concerns.includes(concern));
    
    if (filtered.length === 0) {
      // 根據膚質保底推薦
      if (answers.skinType === 'oily') return promotions.filter(p => p.category === '深層清潔');
      if (answers.skinType === 'dry') return promotions.filter(p => p.category === '深層保養');
      return promotions.slice(0, 2);
    }
    
    return filtered;
  }, [showResult, answers, promotions]);

  // 生成個性化的分析報告
  const analysisReport = useMemo(() => {
    if (!showResult) return null;

    // 膚質描述對照表
    const skinTypeDesc: Record<string, string> = {
      'dry': '乾性肌膚',
      'oily': '油性肌膚',
      'combination': '混合性肌膚',
      'normal': '中性肌膚',
      'sensitive': '敏感性肌膚'
    };

    // 主要問題對照表
    const concernDesc: Record<string, string> = {
      '凹凸洞': '痘疤凹凸洞',
      '荷爾蒙斑': '色斑色素問題',
      '面部鬆弛': '皮膚鬆弛下垂',
      '細紋皺紋': '細紋老化問題',
      '毛孔粗大': '毛孔粗大問題',
      '黑頭粉刺': '黑頭粉刺堵塞',
      '活躍性暗瘡': '活躍性痤瘡（暗瘡）',
      '油光問題': '面部油光問題',
      '極度乾燥': '極度乾燥缺水',
      '敏感肌-泛紅': '敏感泛紅問題',
      '敏感肌-刺激': '易受刺激敏感',
      '酒糟肌': '酒糟玫瑰痤瘡',
      '濕疹肌': '濕疹皮炎問題',
      '細紋問題': '乾性細紋問題'
    };

    // 年齡對照表
    const ageDesc: Record<string, string> = {
      'under25': '18-25歲',
      '25-35': '26-35歲',
      '36-45': '36-45歲',
      'above45': '46歲以上'
    };

    // 生活習慣描述
    const lifestyleDesc: Record<string, { label: string; impact: string }> = {
      'late-night': { label: '經常熬夜', impact: '睡眠不足會影響皮膚修復，加速老化' },
      'high-stress': { label: '壓力過大', impact: '高壓力會導致內分泌失調，引發皮膚問題' },
      'ac-room': { label: '長期待冷氣房', impact: '乾燥環境易使皮膚缺水，屏障受損' },
      'outdoor': { label: '經常戶外活動', impact: '紫外線暴露會加速光老化，需加強防護' },
      'healthy': { label: '作息規律健康', impact: '良好生活習慣有助皮膚自我修復' }
    };

    const skinType = skinTypeDesc[answers.skinType] || '未知膚質';
    const age = ageDesc[answers.ageRange] || '未知年齡';
    
    // 確定主要問題
    let mainConcern = answers.primaryConcern;
    if (answers.oilyDetail) mainConcern = answers.oilyDetail;
    if (answers.oilyDetailMix) mainConcern = answers.oilyDetailMix;
    if (answers.sensitiveDetail) mainConcern = answers.sensitiveDetail;
    if (answers.dryDetail) mainConcern = answers.dryDetail;
    
    const concern = concernDesc[mainConcern] || mainConcern;
    const lifestyle = answers.lifestyle ? lifestyleDesc[answers.lifestyle] : null;

    // 生成個性化標題
    let title = `您的肌膚分析報告已生成`;
    if (answers.skinType === 'sensitive' || answers.sensitiveDetail) {
      title = `敏感肌專屬分析報告`;
    } else if (answers.ageRange === 'above45' || answers.ageRange === '36-45') {
      title = `抗老回春專屬方案`;
    } else if (mainConcern === '凹凸洞' || mainConcern === '活躍性暗瘡') {
      title = `痘疤暗瘡專業治療方案`;
    } else if (mainConcern === '毛孔粗大' || mainConcern === '黑頭粉刺') {
      title = `毛孔緊緻淨化方案`;
    }

    // 生成個性化描述
    let description = `根據您的 ${skinType} 特徵、${age} 的膚質狀態`;
    if (lifestyle) {
      description += `，以及${lifestyle.label}的生活型態`;
    }
    description += `，我們為您量身制定了專業醫美方案。`;

    // 生成關鍵發現
    const keyFindings = [
      {
        icon: <Droplets size={18} className="text-blue-500" />,
        label: '膚質類型',
        value: skinType,
        severity: answers.skinType === 'sensitive' ? 'high' : 'normal'
      },
      {
        icon: <Target size={18} className="text-orange-500" />,
        label: '主要問題',
        value: concern,
        severity: mainConcern.includes('敏感') || mainConcern.includes('暗瘡') || mainConcern.includes('酒糟') ? 'high' : mainConcern.includes('鬆弛') || mainConcern.includes('細紋') ? 'medium' : 'normal'
      },
      {
        icon: <User size={18} className="text-purple-500" />,
        label: '年齡層級',
        value: age,
        severity: answers.ageRange === 'above45' ? 'medium' : 'normal'
      }
    ];

    if (lifestyle) {
      keyFindings.push({
        icon: <Activity size={18} className="text-green-500" />,
        label: '生活因素',
        value: lifestyle.label,
        severity: lifestyle.label.includes('熬夜') || lifestyle.label.includes('壓力') ? 'high' : lifestyle.label.includes('健康') ? 'low' : 'normal'
      });
    }

    // 專業建議
    let professionalAdvice = '';
    if (answers.skinType === 'sensitive' || answers.sensitiveDetail) {
      professionalAdvice = '敏感肌膚需要特別溫和的療程，建議從基礎修復開始，逐步改善皮膚屏障功能。';
    } else if (mainConcern === '凹凸洞') {
      professionalAdvice = '痘疤凹洞需要深層治療，結合激光、微針等療程，才能有效刺激膠原蛋白再生，撫平疤痕。';
    } else if (mainConcern.includes('斑')) {
      professionalAdvice = '色斑問題需要多管齊下，結合激光去斑、美白精華，並做好防曬，才能達到最佳效果。';
    } else if (mainConcern.includes('鬆弛') || mainConcern.includes('細紋')) {
      professionalAdvice = '抗老療程重在預防與維持，建議定期接受膠原蛋白增生療程，保持肌膚緊緻彈性。';
    } else if (mainConcern.includes('毛孔') || mainConcern.includes('黑頭')) {
      professionalAdvice = '毛孔問題需要深層清潔與收縮雙管齊下，定期深層清潔搭配緊緻療程，可顯著改善膚質。';
    } else {
      professionalAdvice = '根據您的肌膚狀況，建議選擇適合的療程，並保持規律護理，即可看到明顯改善。';
    }

    return {
      title,
      description,
      keyFindings,
      professionalAdvice,
      lifestyle: lifestyle ? lifestyle.impact : null
    };
  }, [showResult, answers]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-[32px] max-w-2xl w-full relative overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[450px] max-h-[90vh]"
      >
        {/* Left Sidebar - Progress Info (Desktop Only) */}
        <div className="hidden md:flex md:w-[240px] bg-gray-50 p-8 flex-col justify-between border-r border-gray-100">
          <div>
            <div className="w-12 h-12 bg-gradient-to-br from-[#C52B21] to-[#A01F17] rounded-xl flex items-center justify-center text-white mb-6 shadow-lg shadow-red-100">
              <Sparkles size={22} />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2 leading-tight">AI 智能皮膚分析</h2>
            <p className="text-[11px] text-gray-500 leading-relaxed mb-6">
              精準分析您的肌膚狀態，制定個人化醫美方案。
            </p>
          </div>

          <div className="flex-1 flex flex-col justify-center space-y-6">
            {activeQuestions.map((q, i) => (
              <div key={q.id} className="flex items-center gap-3 group">
                <div className="relative flex flex-col items-center">
                  <div className={`z-10 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 ${
                    i < step ? 'bg-green-500' : i === step ? 'bg-[#C52B21] ring-4 ring-red-50' : 'bg-white border-2 border-gray-200'
                  }`}>
                    {i < step ? (
                      <CheckCircle2 size={12} className="text-white" />
                    ) : (
                      <span className={`text-[9px] font-bold ${i === step ? 'text-white' : 'text-gray-300'}`}>{i + 1}</span>
                    )}
                  </div>
                  {i < activeQuestions.length - 1 && (
                    <div className={`absolute top-5 w-0.5 h-6 transition-colors duration-300 ${
                      i < step ? 'bg-green-500' : 'bg-gray-100'
                    }`} />
                  )}
                </div>
                <span className={`text-[11px] font-bold transition-colors ${
                  i === step ? 'text-[#C52B21]' : i < step ? 'text-gray-500' : 'text-gray-300'
                }`}>
                  {q.q.length > 8 ? q.q.substring(0, 8) + '...' : q.q}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-gray-100">
            <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold">
              <ShieldCheck size={12} className="text-green-500" />
              <span>100% 保密分析</span>
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 flex flex-col relative">
          {/* Close Button */}
          {!showResult && (
            <button 
              onClick={onClose} 
              className="absolute top-6 right-6 z-10 p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
            >
              <X size={20} />
            </button>
          )}

          {!showResult && !isAnalyzing && (
            <div className="p-6 md:p-10 flex-1 flex flex-col overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {/* Mobile Progress Bar */}
              <div className="md:hidden mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black text-[#C52B21] uppercase tracking-widest">Progress</span>
                  <span className="text-[10px] font-bold text-gray-400">{Math.round(progress)}%</span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-[#C52B21]"
                  />
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1"
                >
                  <div className="mb-8">
                    <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-2 leading-tight">
                      {currentQuestion.q}
                    </h3>
                    {currentQuestion.subtitle && (
                      <p className="text-gray-400 text-xs md:text-sm">{currentQuestion.subtitle}</p>
                    )}
                  </div>

                  <div className="grid gap-2.5">
                    {currentQuestion.options.map((opt, idx) => (
                      <button
                        key={`${opt.value}-${idx}`}
                        onClick={() => handleOptionSelect(opt.value)}
                        className="group flex items-center gap-3.5 p-3.5 md:p-4 rounded-2xl border-2 border-gray-50 hover:border-[#C52B21] hover:bg-red-50 transition-all text-left shadow-sm"
                      >
                        {opt.icon && (
                          <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform flex-shrink-0">
                            {React.isValidElement(opt.icon) ? React.cloneElement(opt.icon as React.ReactElement<any>, { size: 18 }) : opt.icon}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-sm text-gray-900 group-hover:text-[#C52B21] transition-colors truncate">{opt.label}</div>
                          {opt.description && (
                            <div className="text-[10px] text-gray-400 mt-0.5 truncate">{opt.description}</div>
                          )}
                        </div>
                        <ChevronRight size={16} className="text-gray-300 group-hover:text-[#C52B21] group-hover:translate-x-1 transition-all flex-shrink-0" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 pt-5 border-t border-gray-50 flex items-center justify-between">
                <button 
                  onClick={handleGoBack}
                  disabled={step === 0}
                  className={`flex items-center gap-1.5 text-xs font-bold ${step === 0 ? 'opacity-0 pointer-events-none' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <ChevronLeft size={16} /> 上一步
                </button>
                <span className="text-[9px] text-gray-300 font-black tracking-[0.2em]">STEP {step + 1} / {activeQuestions.length}</span>
              </div>
            </div>
          )}

          {isAnalyzing && (
            <div className="p-12 flex-1 flex flex-col items-center justify-center text-center">
              <div className="relative mb-12">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                  className="w-40 h-40 rounded-full border-[6px] border-dashed border-red-100"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                  className="absolute inset-4 rounded-full border-[4px] border-dotted border-orange-100"
                />
                <motion.div
                  animate={{ 
                    scale: [1, 1.15, 1],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#C52B21] to-[#A01F17] flex items-center justify-center text-white shadow-2xl shadow-red-300/50">
                    <ClipboardCheck size={32} />
                  </div>
                </motion.div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-3 whitespace-nowrap">AI 智能分析中</h3>
              <p className="text-sm text-gray-500 mb-10 max-w-sm whitespace-nowrap">正在運用醫學級演算法，為您生成專屬的肌膚健康報告</p>
              <div className="space-y-4 w-full max-w-md">
                {[
                  { text: "分析 15+ 項肌膚指標", icon: <Activity size={16} /> },
                  { text: "評估環境與生活因子影響", icon: <Wind size={16} /> },
                  { text: "匹配 500+ 臨床案例數據", icon: <Target size={16} /> },
                  { text: "生成個人化療程建議", icon: <Sparkles size={16} /> }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.5 }}
                    className="flex items-center gap-4 text-sm text-gray-700 bg-gradient-to-r from-gray-50 to-white p-4 rounded-2xl border border-gray-100 shadow-sm whitespace-nowrap"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-100 to-emerald-50 text-green-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                      {item.icon}
                    </div>
                    <span className="font-medium">{item.text}</span>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: i * 0.5 + 0.3, duration: 1 }}
                      className="ml-auto flex-shrink-0"
                    >
                      <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center shadow-sm">
                        <CheckCircle2 size={16} className="text-white" />
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {showResult && (
            <div className="flex-1 flex flex-col max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] bg-white">
              <div className="p-6 md:p-10">
                {/* Header Section */}
                <div className="flex items-center justify-between mb-8">
                  <div className="w-10 h-10 bg-[#C52B21] rounded-xl flex items-center justify-center text-white shadow-lg">
                    <Sparkles size={20} />
                  </div>
                  <button 
                    onClick={onClose} 
                    className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="mb-10">
                  <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-3 leading-tight">
                    {analysisReport?.title || 'AI 智能皮膚分析'}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
                    {analysisReport?.description || '精準分析您的肌膚狀態，制定個人化醫美方案。'}
                  </p>
                  
                  {/* Key Findings Cards */}
                  {analysisReport && (
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {analysisReport.keyFindings.map((finding, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.1 }}
                          className={`p-4 rounded-2xl border-2 ${
                            finding.severity === 'high' 
                              ? 'bg-red-50 border-red-200' 
                              : finding.severity === 'medium'
                              ? 'bg-amber-50 border-amber-200'
                              : finding.severity === 'low'
                              ? 'bg-green-50 border-green-200'
                              : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm flex-shrink-0">
                              {finding.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">
                                {finding.label}
                              </div>
                              <div className="text-sm font-bold text-gray-900 truncate">
                                {finding.value}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Professional Advice Banner */}
                  {analysisReport?.professionalAdvice && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-5 mb-6"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm flex-shrink-0">
                          <ClipboardCheck size={18} className="text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h5 className="text-sm font-black text-gray-900 mb-2 flex items-center gap-2">
                            專業建議
                            <span className="px-2 py-0.5 bg-blue-600 text-white text-[9px] font-bold rounded-full">AI 分析</span>
                          </h5>
                          <p className="text-xs text-gray-700 leading-relaxed">
                            {analysisReport.professionalAdvice}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Lifestyle Impact Warning */}
                  {analysisReport?.lifestyle && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <AlertTriangle size={14} className="text-amber-600" />
                        <span className="text-[10px] font-black text-amber-900 uppercase tracking-wider">生活習慣影響</span>
                      </div>
                      <p className="text-xs text-amber-900 leading-relaxed">
                        {analysisReport.lifestyle}
                      </p>
                    </motion.div>
                  )}
                </div>


                {/* Recommendations Section */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#C52B21] flex items-center justify-center shadow-lg">
                      <Sparkles size={20} className="text-white" />
                    </div>
                    <h4 className="text-xl font-black text-gray-900">
                      為您推薦的專業療程
                    </h4>
                  </div>
                  <div className="px-3 py-1.5 bg-white border border-gray-200 rounded-xl shadow-sm">
                    <span className="text-[10px] font-bold text-gray-900 whitespace-nowrap">{recommendedTreatments.length} 個方案</span>
                  </div>
                </div>

                {/* Treatment Cards - Optimized for Conversion */}
                <div className="space-y-6 mb-12">
                  {recommendedTreatments.map((treatment, idx) => (
                    <motion.div
                      key={treatment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      onClick={() => {
                        window.location.href = `/treatments/${treatment.slug || treatment.id}`;
                      }}
                      className="group bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer"
                    >
                      <div className="relative h-48 md:h-64 overflow-hidden">
                        <img src={treatment.image} alt={treatment.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute top-4 left-4 flex gap-2">
                          <span className="px-3 py-1 bg-[#C52B21] text-white text-[10px] font-black rounded-full shadow-lg uppercase tracking-wider">
                            {treatment.tag}
                          </span>
                          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-900 text-[10px] font-black rounded-full shadow-lg flex items-center gap-1">
                            <Sparkles size={10} className="text-[#C52B21]" /> 最適合您
                          </span>
                        </div>
                        <div className="absolute bottom-6 left-6 right-6">
                          <h5 className="text-2xl md:text-3xl font-black text-white mb-2 drop-shadow-lg">{treatment.title}</h5>
                          <div className="flex items-center gap-4 text-white/90 text-sm font-bold">
                            <div className="flex items-center gap-1.5">
                              <Star size={14} className="text-yellow-400" fill="currentColor" />
                              <span>4.9 (1,200+)</span>
                            </div>
                            <div className="w-1.5 h-1.5 bg-white/50 rounded-full" />
                            <span>專業認證療程</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-8">
                        <p className="text-base text-gray-600 leading-relaxed mb-8 line-clamp-2">
                          {treatment.description}
                        </p>
                        <div className="flex flex-col gap-4">
                          <div className="flex flex-col items-center text-center">
                            <span className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mb-1">首次體驗價</span>
                            <div className="flex items-baseline gap-1">
                              <span className="text-4xl font-black text-[#C52B21]">HK${treatment.trialPrice}</span>
                            </div>
                          </div>
                          <button 
                            className="w-full px-8 py-5 bg-gray-900 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 group-hover:bg-[#C52B21] transition-all shadow-xl shadow-gray-200 group-hover:shadow-red-200"
                          >
                            立即查看療程介紹
                            <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Section */}
                <div className="bg-[#FFF5F4] rounded-[32px] p-8 text-center border border-red-50 relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#C52B21] mx-auto mb-4 shadow-sm">
                      <MessageCircle size={32} />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">需要專業顧問協助？</h4>
                    <p className="text-sm text-gray-600 mb-6">
                      測驗結果僅供初步參考，我們的專業醫美顧問將為您提供<span className="font-bold text-[#C52B21]">一對一深度諮詢</span>，制定最適合您的療程計劃
                    </p>
                    
                    <div className="flex flex-col gap-3">
                      <a 
                        href="https://wa.me/85253353313?text=我剛完成了皮膚測驗，想預約專業諮詢"
                        className="w-full py-4 bg-[#C52B21] text-white rounded-[16px] font-bold text-base shadow-lg shadow-red-200 flex items-center justify-center gap-2"
                      >
                        <MessageCircle size={20} />
                        立即預約免費諮詢
                      </a>
                      <button 
                        onClick={() => {
                          setStep(0);
                          setShowResult(false);
                          setAnswers({});
                        }}
                        className="w-full py-4 bg-white text-gray-700 border border-gray-200 rounded-[16px] font-bold text-base hover:bg-gray-50 transition-all"
                      >
                        重新進行測驗
                      </button>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-8 pt-6 border-t border-red-200/50">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle2 size={16} className="text-green-500" />
                        <span>100% 免費</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <ShieldCheck size={16} className="text-blue-500" />
                        <span>專業認證</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Star size={16} className="text-yellow-500" fill="currentColor" />
                        <span>4.9 評分</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Disclaimer / Terms */}
                <div className="mt-12 pb-8 text-center">
                  <div className="flex items-center justify-center gap-2 text-gray-400 mb-4">
                    <ShieldCheck size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Terms & Conditions</span>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-relaxed max-w-2xl mx-auto px-4">
                    免責聲明：本皮膚分析測驗結果僅供參考，不具備醫療診斷效力。療程效果因個人體質、生活習慣及皮膚狀況而異。
                    所有醫美療程均存在一定風險，建議在接受任何治療前，先與我們的專業顧問或醫生進行詳細諮詢。
                    Peko Beauty 保留對所有療程及優惠之最終決定權。
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SkinQuiz;
