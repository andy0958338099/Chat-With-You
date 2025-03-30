"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  
  // 引導步驟內容
  const steps = [
    {
      title: "歡迎使用 Chat-With-You",
      description: "這是一個強大的聊天應用，結合了 AI 功能和即時通訊。讓我們來了解一下基本功能。",
      image: "👋"
    },
    {
      title: "與朋友聊天",
      description: "無論您的朋友在哪裡，都可以輕鬆與他們保持聯繫。發送文字、照片和更多內容。",
      image: "💬"
    },
    {
      title: "AI 聊天助手",
      description: "與我們的 AI 助手交談，獲取信息、創意或只是進行有趣的對話。",
      image: "🤖"
    },
    {
      title: "安全與隱私",
      description: "您的隱私是我們的首要任務。所有對話都經過加密，只有您和您的聊天對象可以查看。",
      image: "🔒"
    },
    {
      title: "準備開始了嗎？",
      description: "太棒了！您現在已經準備好開始使用 Chat-With-You 了。探索應用並開始聊天吧！",
      image: "🚀"
    }
  ];

  // 前往下一步
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // 完成引導，導航至主頁
      router.push('/dashboard');
    }
  };

  // 跳過引導
  const skipOnboarding = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 p-4">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-8 relative">
        {/* 進度指示器 */}
        <div className="flex justify-center space-x-2 mb-8">
          {steps.map((_, index) => (
            <div 
              key={index}
              className={`h-2 w-10 rounded-full ${
                index === currentStep ? 'bg-blue-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        
        {/* 步驟內容 */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center mb-6 text-4xl">
            {steps[currentStep].image}
          </div>
          <h2 className="text-2xl font-bold mb-3">{steps[currentStep].title}</h2>
          <p className="text-gray-600">{steps[currentStep].description}</p>
        </div>
        
        {/* 導航按鈕 */}
        <div className="flex justify-between">
          {currentStep < steps.length - 1 ? (
            <>
              <button 
                onClick={skipOnboarding} 
                className="text-gray-500 hover:text-gray-700"
              >
                跳過
              </button>
              <button 
                onClick={nextStep} 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
              >
                下一步
              </button>
            </>
          ) : (
            <button 
              onClick={nextStep} 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
            >
              開始使用
            </button>
          )}
        </div>
      </div>
      
      <div className="mt-6 text-sm text-gray-600">
        已經了解如何使用？ 
        <Link href="/dashboard" className="text-blue-600 hover:underline ml-1">
          前往主頁
        </Link>
      </div>
    </div>
  );
} 