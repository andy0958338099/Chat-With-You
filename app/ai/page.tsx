"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import BottomNavigation from '../components/BottomNavigation';
import { supabase, getCurrentUser, UserProfile } from '@/src/services/supabase';

// 定義 AI 助手類型
interface AIAssistant {
  id: string;
  name: string;
  description: string;
  avatar_url?: string | null;
  category: string;
  popularity: number;
  is_custom?: boolean;
}

export default function AIAssistantPage() {
  const [assistants, setAssistants] = useState<AIAssistant[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [activeCategory, setActiveCategory] = useState('所有');

  useEffect(() => {
    async function loadAssistants() {
      try {
        setLoading(true);
        const userData = await getCurrentUser();
        
        if (userData) {
          setUser(userData);
          
          // 嘗試獲取用戶的 AI 助手列表
          const { data, error } = await supabase
            .from('AI_Assistants')
            .select('*')
            .order('popularity', { ascending: false });
            
          if (error) {
            console.error('獲取 AI 助手失敗:', error);
            setAssistants(mockAssistants);
          } else {
            setAssistants(data.length > 0 ? data : mockAssistants);
          }
        }
      } catch (err) {
        console.error('載入 AI 助手錯誤:', err);
        setAssistants(mockAssistants);
      } finally {
        setLoading(false);
      }
    }
    
    loadAssistants();
  }, []);

  // 模擬 AI 助手數據
  const mockAssistants: AIAssistant[] = [
    {
      id: '1',
      name: '日常助手',
      description: '幫助你解答日常問題，提供生活建議',
      avatar_url: null,
      category: '生活',
      popularity: 984
    },
    {
      id: '2',
      name: '編程專家',
      description: '協助編寫代碼，解決技術問題',
      avatar_url: null,
      category: '工作',
      popularity: 756
    },
    {
      id: '3',
      name: '英語老師',
      description: '幫助學習英語，糾正語法錯誤',
      avatar_url: null,
      category: '學習',
      popularity: 632
    },
    {
      id: '4',
      name: '健身教練',
      description: '提供健身建議和飲食計劃',
      avatar_url: null,
      category: '健康',
      popularity: 521
    },
    {
      id: '5',
      name: '心靈導師',
      description: '提供心理支持和情緒管理建議',
      avatar_url: null,
      category: '生活',
      popularity: 489
    },
    {
      id: '6',
      name: '旅遊顧問',
      description: '規劃旅遊行程，推薦景點和美食',
      avatar_url: null,
      category: '生活',
      popularity: 467
    },
    {
      id: '7',
      name: '理財助手',
      description: '提供個人理財建議和投資策略',
      avatar_url: null,
      category: '工作',
      popularity: 435
    },
    {
      id: '8',
      name: '創意寫作',
      description: '協助創作故事、詩歌和文章',
      avatar_url: null,
      category: '學習',
      popularity: 412
    },
    {
      id: '9',
      name: '健康飲食',
      description: '提供營養建議和健康食譜',
      avatar_url: null,
      category: '健康',
      popularity: 398
    },
    {
      id: '10',
      name: '閱讀伙伴',
      description: '推薦書籍和討論文學作品',
      avatar_url: null,
      category: '生活',
      popularity: 356
    },
    {
      id: '11',
      name: '產品設計師',
      description: '協助產品設計和用戶體驗改進',
      avatar_url: null,
      category: '工作',
      popularity: 321
    },
    {
      id: '12',
      name: '考試輔導',
      description: '幫助準備各種考試和測驗',
      avatar_url: null,
      category: '學習',
      popularity: 287
    }
  ];

  // 獲取所有類別
  const getCategories = () => {
    const categories = Array.from(new Set(assistants.map(assistant => assistant.category)));
    return ['所有', ...categories];
  };

  // 過濾助手
  const filteredAssistants = activeCategory === '所有' 
    ? assistants 
    : assistants.filter(assistant => assistant.category === activeCategory);

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
          <h1 className="text-xl font-semibold">AI 助手</h1>
          <div className="flex items-center space-x-4">
            <Link href="/profile">
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
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* 分類標籤 */}
        <div className="flex overflow-x-auto pb-2 mb-6 hide-scrollbar">
          <div className="flex space-x-2">
            {getCategories().map(category => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                  activeCategory === category 
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300'
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* 新增 AI 助手按鈕 */}
        <div className="flex justify-end mb-4">
          <Link href="/ai/create" className="bg-blue-600 text-white px-4 py-2 rounded-md">
            創建助手
          </Link>
        </div>

        {/* AI 助手網格 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssistants.map(assistant => (
            <Link href={`/ai/${assistant.id}`} key={assistant.id} className="block">
              <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full overflow-hidden flex items-center justify-center text-blue-600 mr-4">
                    {assistant.avatar_url ? (
                      <img 
                        src={assistant.avatar_url} 
                        alt={assistant.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xl">🤖</span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">{assistant.name}</h3>
                    <p className="text-xs text-gray-500">{assistant.popularity} 人在使用</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{assistant.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">{assistant.category}</span>
                  {assistant.is_custom && (
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">自訂</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* 底部導航 */}
      <BottomNavigation />
    </div>
  );
} 