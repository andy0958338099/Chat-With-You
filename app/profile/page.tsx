"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { supabase, getCurrentUser, UserProfile, signOut } from '@/src/services/supabase';
import BottomNavigation from '../components/BottomNavigation';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [credits, setCredits] = useState(0);
  const [aiAssistants, setAiAssistants] = useState(0);
  const [copied, setCopied] = useState(false);

  // 獲取用戶資料
  useEffect(() => {
    async function loadUserData() {
      try {
        setLoading(true);
        const userData = await getCurrentUser();
        
        if (userData) {
          setUser(userData);
          
          // 獲取用戶積分
          const { data: creditsData, error: creditsError } = await supabase
            .from('Credits')
            .select('amount')
            .eq('user_id', userData.id)
            .single();
            
          if (!creditsError && creditsData) {
            setCredits(creditsData.amount);
          } else {
            setCredits(userData.credits || 0);
          }
          
          // 獲取用戶 AI 助手數量
          const { data: assistantsData, error: assistantsError } = await supabase
            .from('AI_Assistants')
            .select('id')
            .eq('user_id', userData.id);
            
          if (!assistantsError && assistantsData) {
            setAiAssistants(assistantsData.length);
          } else {
            setAiAssistants(3); // 預設值
          }
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

  // 複製用戶 ID
  const copyUserId = () => {
    if (user?.id) {
      navigator.clipboard.writeText(user.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // 處理登出
  const handleLogout = async () => {
    try {
      const success = await signOut();
      if (success) {
        router.push('/login');
      }
    } catch (error) {
      console.error('登出錯誤:', error);
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
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* 頂部導航欄 */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <h1 className="text-xl font-semibold">個人資料</h1>
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* 個人資料卡片 */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="flex items-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full overflow-hidden flex items-center justify-center text-blue-600 mr-6">
              {user?.avatar_url ? (
                <img 
                  src={user.avatar_url} 
                  alt={user.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-3xl">{user?.name?.charAt(0).toUpperCase() || 'U'}</span>
              )}
            </div>
            <div>
              <h2 className="text-xl font-medium">{user?.name || '用戶名稱'}</h2>
              <div className="flex items-center mt-1 cursor-pointer" onClick={copyUserId}>
                <p className="text-gray-500">ID: {user?.id?.substring(0, 8) || '12345678'}</p>
                <svg className="w-4 h-4 ml-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
                  <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
                </svg>
                {copied && <span className="text-xs text-green-600 ml-2">已複製</span>}
              </div>
              <div className="mt-2">
                <Link href="/profile/edit" className="bg-blue-600 text-white px-4 py-1 rounded-md text-sm inline-block">
                  編輯資料
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 功能卡片區域 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/ai" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="text-3xl mb-4">🤖</div>
            <h3 className="text-lg font-medium mb-2">我的AI助手</h3>
            <p className="text-gray-500">{aiAssistants}個</p>
          </Link>

          <Link href="/credits" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="text-3xl mb-4">💰</div>
            <h3 className="text-lg font-medium mb-2">積分餘額</h3>
            <p className="text-gray-500">{credits}積分</p>
          </Link>

          <Link href="/settings" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="text-3xl mb-4">⚙️</div>
            <h3 className="text-lg font-medium mb-2">設置</h3>
            <p className="text-gray-500">帳戶與安全</p>
          </Link>
        </div>

        {/* 選項列表 */}
        <div className="bg-white rounded-lg shadow mt-6">
          <Link href="/settings/privacy" className="p-4 border-b border-gray-100 flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-xl mr-4">🔒</span>
              <span>隱私設置</span>
            </div>
            <span className="text-gray-400">→</span>
          </Link>
          <Link href="/settings/notifications" className="p-4 border-b border-gray-100 flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-xl mr-4">🔔</span>
              <span>通知設置</span>
            </div>
            <span className="text-gray-400">→</span>
          </Link>
          <Link href="/settings/chat" className="p-4 border-b border-gray-100 flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-xl mr-4">💬</span>
              <span>聊天設置</span>
            </div>
            <span className="text-gray-400">→</span>
          </Link>
          <Link href="/help" className="p-4 border-b border-gray-100 flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-xl mr-4">❓</span>
              <span>幫助中心</span>
            </div>
            <span className="text-gray-400">→</span>
          </Link>
          <button 
            onClick={handleLogout}
            className="w-full p-4 flex justify-between items-center text-left"
          >
            <div className="flex items-center">
              <span className="text-xl mr-4">↩️</span>
              <span>登出</span>
            </div>
            <span className="text-gray-400">→</span>
          </button>
        </div>
      </main>

      {/* 底部導航 */}
      <BottomNavigation />
    </div>
  );
} 