"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

export default function CreditsSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [amount, setAmount] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(5);

  // 獲取 URL 參數
  useEffect(() => {
    const amountParam = searchParams.get('amount');
    setAmount(amountParam);
    
    // 倒數計時後自動跳轉
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/credits');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold mb-2">充值成功！</h1>
        
        <p className="text-gray-600 mb-4">
          {amount ? `您已成功充值 ${amount} 積分` : '您的充值已成功'}
        </p>
        
        <div className="w-full bg-blue-100 rounded-lg p-4 mb-6">
          <p className="text-blue-800">積分已即時到賬，可立即使用</p>
        </div>
        
        <div className="flex flex-col space-y-3">
          <Link 
            href="/credits" 
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            查看我的積分
          </Link>
          
          <Link 
            href="/ai" 
            className="border border-blue-600 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors"
          >
            使用 AI 助手
          </Link>
        </div>
        
        <p className="text-sm text-gray-500 mt-6">
          {countdown > 0 ? `${countdown} 秒後自動返回積分頁面` : '正在跳轉...'}
        </p>
      </div>
    </div>
  );
} 