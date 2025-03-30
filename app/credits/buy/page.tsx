"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase, getCurrentUser, UserProfile } from '@/src/services/supabase';

// 充值套餐選項
const creditPackages = [
  { id: 1, credits: 100, price: 30, popular: false },
  { id: 2, credits: 300, price: 80, popular: true, discount: '11% 折扣' },
  { id: 3, credits: 500, price: 120, popular: false, discount: '20% 折扣' },
  { id: 4, credits: 1000, price: 220, popular: false, discount: '26% 折扣' },
];

// 支付方式
const paymentMethods = [
  { id: 'credit_card', name: '信用卡支付', icon: '💳' },
  { id: 'line_pay', name: 'Line Pay', icon: '🟢' },
  { id: 'jkopay', name: '街口支付', icon: '📱' },
];

export default function BuyCreditsPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState(creditPackages[1]); // 默認選擇第二個套餐
  const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0].id);
  const [processingPayment, setProcessingPayment] = useState(false);

  // 獲取用戶資料
  useEffect(() => {
    async function loadUserData() {
      try {
        setLoading(true);
        const userData = await getCurrentUser();
        
        if (userData) {
          setUser(userData);
        } else {
          // 未登入，重定向到登入頁面
          router.push('/login');
        }
      } catch (err) {
        console.error('載入用戶資料錯誤:', err);
      } finally {
        setLoading(false);
      }
    }

    loadUserData();
  }, [router]);

  // 處理充值
  const handlePayment = async () => {
    if (!user) return;
    
    try {
      setProcessingPayment(true);
      
      // TODO: 整合實際的支付系統
      // 這裡僅模擬支付過程
      setTimeout(() => {
        // 假設支付成功
        addCreditsToUser(selectedPackage.credits);
      }, 2000);
    } catch (error) {
      console.error('處理支付錯誤:', error);
      setProcessingPayment(false);
    }
  };

  // 向用戶添加積分
  const addCreditsToUser = async (creditsToAdd: number) => {
    if (!user) return;
    
    try {
      // 獲取當前積分
      const { data: currentCredits, error: fetchError } = await supabase
        .from('Credits')
        .select('amount')
        .eq('user_id', user.id)
        .single();
      
      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }
      
      let newAmount = creditsToAdd;
      
      // 如果已有積分記錄，則添加到現有積分
      if (currentCredits) {
        newAmount += currentCredits.amount;
        
        // 更新積分
        const { error: updateError } = await supabase
          .from('Credits')
          .update({ amount: newAmount, updated_at: new Date().toISOString() })
          .eq('user_id', user.id);
          
        if (updateError) throw updateError;
      } else {
        // 創建新的積分記錄
        const { error: insertError } = await supabase
          .from('Credits')
          .insert({
            user_id: user.id,
            amount: newAmount,
            updated_at: new Date().toISOString()
          });
          
        if (insertError) throw insertError;
      }
      
      // 添加積分記錄
      const { error: historyError } = await supabase
        .from('Credit_History')
        .insert({
          user_id: user.id,
          amount: creditsToAdd,
          action_type: 'earn',
          description: `購買了 ${creditsToAdd} 積分`,
          created_at: new Date().toISOString()
        });
        
      if (historyError) throw historyError;
      
      // 重定向到成功頁面
      router.push('/credits/success?amount=' + creditsToAdd);
    } catch (error) {
      console.error('添加積分錯誤:', error);
      setProcessingPayment(false);
      alert('充值失敗，請重試或聯繫客服');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="spinner w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">載入中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 頂部導航欄 */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="flex items-center">
            <button 
              onClick={() => router.back()} 
              className="mr-4 text-gray-500 hover:text-gray-700"
            >
              ← 返回
            </button>
            <h1 className="text-xl font-semibold">充值積分</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20">
        {/* 標題和介紹 */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold mb-2">選擇您想購買的積分套餐</h2>
          <p className="text-gray-600">使用積分解鎖更多 AI 功能與服務</p>
        </div>
        
        {/* 套餐選擇 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {creditPackages.map((pkg) => (
            <div 
              key={pkg.id} 
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                selectedPackage.id === pkg.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => setSelectedPackage(pkg)}
            >
              {pkg.popular && (
                <div className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full inline-block mb-2">
                  最受歡迎
                </div>
              )}
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-2xl font-bold">{pkg.credits}</span>
                <span className="text-gray-500">積分</span>
              </div>
              <div className="text-xl font-bold text-blue-600 mb-1">NT$ {pkg.price}</div>
              {pkg.discount && (
                <div className="text-xs text-green-600">{pkg.discount}</div>
              )}
            </div>
          ))}
        </div>

        {/* 支付方式 */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-medium mb-4">選擇支付方式</h3>
          
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <div 
                key={method.id}
                className={`border rounded-lg p-4 cursor-pointer flex items-center ${
                  selectedPayment === method.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200'
                }`}
                onClick={() => setSelectedPayment(method.id)}
              >
                <div className="flex items-center flex-1">
                  <span className="text-2xl mr-3">{method.icon}</span>
                  <span>{method.name}</span>
                </div>
                <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center">
                  {selectedPayment === method.id && (
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* 訂單摘要 */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-medium mb-4">訂單摘要</h3>
          
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">{selectedPackage.credits} 積分</span>
            <span>NT$ {selectedPackage.price}</span>
          </div>
          
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">稅費</span>
            <span>NT$ 0</span>
          </div>
          
          <div className="flex justify-between py-4">
            <span className="font-medium">總計</span>
            <span className="font-bold text-lg">NT$ {selectedPackage.price}</span>
          </div>
        </div>
        
        {/* 提交按鈕 */}
        <div className="flex justify-center">
          <button
            onClick={handlePayment}
            disabled={processingPayment}
            className={`w-full md:w-auto px-12 py-3 rounded-lg text-white font-medium ${
              processingPayment 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {processingPayment ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                處理中...
              </span>
            ) : (
              `支付 NT$ ${selectedPackage.price}`
            )}
          </button>
        </div>
        
        {/* 條款說明 */}
        <div className="text-center text-xs text-gray-500 mt-4">
          <p>點擊「支付」表示您同意我們的<Link href="/terms" className="text-blue-600 hover:underline">使用條款</Link>和<Link href="/privacy" className="text-blue-600 hover:underline">隱私政策</Link></p>
        </div>
      </main>
    </div>
  );
} 