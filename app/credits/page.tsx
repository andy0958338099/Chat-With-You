"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase, getCurrentUser, UserProfile } from '@/src/services/supabase';

// 積分記錄類型
interface CreditRecord {
  id: string;
  user_id: string;
  amount: number;
  action_type: 'earn' | 'use' | 'refund';
  description: string;
  created_at: string;
}

export default function CreditsPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentCredits, setCurrentCredits] = useState(0);
  const [creditRecords, setCreditRecords] = useState<CreditRecord[]>([]);
  
  // 獲取用戶資料和積分記錄
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const userData = await getCurrentUser();
        
        if (userData) {
          setUser(userData);
          
          // 獲取當前積分
          const { data: creditsData, error: creditsError } = await supabase
            .from('Credits')
            .select('amount')
            .eq('user_id', userData.id)
            .single();
            
          if (!creditsError && creditsData) {
            setCurrentCredits(creditsData.amount);
          } else {
            setCurrentCredits(userData.credits || 0);
          }
          
          // 獲取積分使用記錄
          const { data: recordsData, error: recordsError } = await supabase
            .from('Credit_History')
            .select('*')
            .eq('user_id', userData.id)
            .order('created_at', { ascending: false })
            .limit(20);
            
          if (!recordsError && recordsData) {
            setCreditRecords(recordsData as CreditRecord[]);
          }
        } else {
          // 未登入，重定向到登入頁面
          router.push('/login');
        }
      } catch (err) {
        console.error('載入積分資料錯誤:', err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [router]);

  // 獲取積分記錄的圖標
  const getActionIcon = (action: string) => {
    switch (action) {
      case 'earn':
        return '💰'; // 獲得積分
      case 'use':
        return '🔄'; // 使用積分
      case 'refund':
        return '↩️'; // 退還積分
      default:
        return '💲'; // 默認
    }
  };

  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
            <h1 className="text-xl font-semibold">積分餘額</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-blue-500 rounded-full overflow-hidden flex items-center justify-center text-white">
              {user?.avatar_url ? (
                <img 
                  src={user.avatar_url} 
                  alt={user.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{user?.name?.charAt(0).toUpperCase() || 'U'}</span>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20">
        {/* 當前積分卡片 */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-lg font-medium mb-2">當前積分</h2>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-blue-600">{currentCredits}</span>
            <span className="ml-2 text-gray-500">積分</span>
          </div>
          <div className="mt-4">
            <Link href="/credits/buy" className="bg-blue-600 text-white px-6 py-2 rounded-md text-sm inline-block mr-3">
              充值積分
            </Link>
            <Link href="/subscription" className="border border-blue-600 text-blue-600 px-6 py-2 rounded-md text-sm inline-block">
              升級會員
            </Link>
          </div>
        </div>
        
        {/* 積分說明 */}
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h3 className="font-medium mb-2 flex items-center">
            <span className="text-lg mr-2">💡</span>
            <span>積分使用說明</span>
          </h3>
          <ul className="text-sm text-gray-700 space-y-1 pl-7 list-disc">
            <li>發送訊息免費，使用 AI 功能需消耗積分</li>
            <li>根據 AI 模型和使用量，每次對話消耗 1-5 積分</li>
            <li>每日登入可獲得 2 積分</li>
            <li>月度會員每月獲贈 200 積分</li>
            <li>年度會員每月獲贈 300 積分</li>
          </ul>
        </div>

        {/* 積分記錄 */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-medium">積分記錄</h2>
          </div>
          
          {creditRecords.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p>暫無積分記錄</p>
            </div>
          ) : (
            <div>
              {creditRecords.map((record) => (
                <div key={record.id} className="p-4 border-b border-gray-100 flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                      {getActionIcon(record.action_type)}
                    </span>
                    <div>
                      <p className="font-medium">{record.description}</p>
                      <p className="text-xs text-gray-500">{formatDate(record.created_at)}</p>
                    </div>
                  </div>
                  <div className={`text-lg font-medium ${
                    record.action_type === 'earn' ? 'text-green-600' : 
                    record.action_type === 'refund' ? 'text-blue-600' : 'text-red-600'
                  }`}>
                    {record.action_type === 'earn' || record.action_type === 'refund' ? '+' : '-'}
                    {Math.abs(record.amount)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      
      {/* 底部導航 */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around items-center h-16">
          <Link href="/dashboard" className="flex flex-col items-center text-gray-500">
            <span className="text-xl">💬</span>
            <span className="text-xs">聊天</span>
          </Link>
          <Link href="/contacts" className="flex flex-col items-center text-gray-500">
            <span className="text-xl">👥</span>
            <span className="text-xs">聯絡人</span>
          </Link>
          <Link href="/ai" className="flex flex-col items-center text-gray-500">
            <span className="text-xl">🤖</span>
            <span className="text-xs">AI 助手</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center text-blue-600">
            <span className="text-xl">👤</span>
            <span className="text-xs">我的</span>
          </Link>
        </div>
      </footer>
    </div>
  );
} 