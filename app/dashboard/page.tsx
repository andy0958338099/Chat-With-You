"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import BottomNavigation from '../components/BottomNavigation';
import { supabase, getCurrentUser, UserProfile } from '@/src/services/supabase';

// 定義聊天記錄的類型
interface ChatItem {
  id: number | string;
  title: string;
  last_message: string;
  last_message_time: string;
  is_group: boolean;
  unread_count: number;
  avatar?: string | null;
  Participants?: any[];
}

export default function DashboardPage() {
  const [recentChats, setRecentChats] = useState<ChatItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    async function loadUserData() {
      try {
        const userData = await getCurrentUser();
        if (userData) {
          setUser(userData);
          
          // 獲取最近聊天記錄
          const { data, error } = await supabase
            .from('Conversations')
            .select(`
              id,
              title,
              last_message,
              last_message_time,
              is_group,
              unread_count,
              Participants(user_id, Users(name, avatar_url))
            `)
            .eq('Participants.user_id', userData.id)
            .order('last_message_time', { ascending: false })
            .limit(20);
            
          if (error) {
            console.error('獲取聊天記錄失敗:', error);
            setRecentChats([]);
          } else {
            setRecentChats(data as ChatItem[] || []);
          }
        }
      } catch (err) {
        console.error('載入用戶資料錯誤:', err);
      } finally {
        setLoading(false);
      }
    }
    
    loadUserData();
  }, []);

  // 模擬聊天數據
  const mockChats: ChatItem[] = [
    {
      id: 1,
      title: 'Alice',
      last_message: '嗨！最近好嗎？',
      last_message_time: new Date(Date.now() - 20 * 60000).toISOString(),
      is_group: false,
      unread_count: 2,
      avatar: null
    },
    {
      id: 2,
      title: 'Bob',
      last_message: '我剛剛發送了文件給你',
      last_message_time: new Date(Date.now() - 24 * 60 * 60000).toISOString(),
      is_group: false,
      unread_count: 0,
      avatar: null
    },
    {
      id: 3,
      title: 'AI 助手',
      last_message: '有什麼我可以幫助你的？',
      last_message_time: new Date(Date.now() - 7 * 24 * 60 * 60000).toISOString(),
      is_group: false,
      unread_count: 1,
      avatar: null
    },
    {
      id: 4,
      title: '工作群組',
      last_message: '會議時間更改到下午3點',
      last_message_time: new Date(Date.now() - 7 * 24 * 60 * 60000).toISOString(),
      is_group: true,
      unread_count: 5,
      avatar: null
    }
  ];

  // 格式化時間
  const formatTime = (timeString: string): string => {
    const msgDate = new Date(timeString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - msgDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return msgDate.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays < 7) {
      return ['週日', '週一', '週二', '週三', '週四', '週五', '週六'][msgDate.getDay()];
    } else {
      return msgDate.toLocaleDateString('zh-TW', { month: 'numeric', day: 'numeric' });
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

  const displayChats = recentChats.length > 0 ? recentChats : mockChats;

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* 頂部導航欄 */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <h1 className="text-xl font-semibold">最近對話</h1>
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
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* 新對話按鈕 */}
        <div className="flex justify-end mb-4">
          <Link href="/new-chat" className="bg-blue-600 text-white px-4 py-2 rounded-md">
            新對話
          </Link>
        </div>

        {/* 聊天列表 */}
        <div className="bg-white rounded-lg shadow">
          {displayChats.map((chat) => (
            <Link href={`/chat/${chat.id}`} key={chat.id.toString()} className="block">
              <div className="p-4 border-b border-gray-100 flex items-center">
                <div className="relative">
                  <div className={`w-12 h-12 ${chat.is_group ? 'bg-green-100' : 'bg-blue-100'} rounded-full flex items-center justify-center text-lg overflow-hidden`}>
                    {chat.avatar ? (
                      <img src={chat.avatar} alt={chat.title} className="w-full h-full object-cover" />
                    ) : (
                      <span>{chat.title.charAt(0)}</span>
                    )}
                  </div>
                  {chat.unread_count > 0 && (
                    <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {chat.unread_count}
                    </div>
                  )}
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">{chat.title}</h3>
                    <span className="text-xs text-gray-500">{formatTime(chat.last_message_time)}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{chat.last_message}</p>
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