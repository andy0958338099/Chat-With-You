"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/src/services/supabase';
import { UserProfile } from '@/src/services/supabase';
import { getCurrentUser } from '@/src/services/supabase';

export default function EditProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    avatar_url: '',
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  // 獲取用戶資料
  useEffect(() => {
    async function loadUserData() {
      try {
        setLoading(true);
        const userData = await getCurrentUser();
        
        if (userData) {
          setUser(userData);
          setFormData({
            name: userData.name || '',
            email: userData.email || '',
            avatar_url: userData.avatar_url || '',
          });
        } else {
          // 未登入，重定向到登入頁面
          router.push('/login');
        }
      } catch (err) {
        console.error('載入用戶資料錯誤:', err);
        setError('無法載入用戶資料，請重試');
      } finally {
        setLoading(false);
      }
    }

    loadUserData();
  }, [router]);

  // 處理表單輸入改變
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 處理頭像文件選擇
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      
      // 創建預覽
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // 上傳頭像到 Supabase Storage
  const uploadAvatar = async (): Promise<string | null> => {
    if (!avatarFile || !user) return null;

    try {
      // 生成唯一文件名
      const fileExt = avatarFile.name.split('.').pop();
      const fileName = `${user.id}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // 上傳文件
      const { error: uploadError } = await supabase.storage
        .from('user-avatars')
        .upload(filePath, avatarFile);

      if (uploadError) {
        throw uploadError;
      }

      // 獲取公共URL
      const { data } = supabase.storage
        .from('user-avatars')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('上傳頭像錯誤:', error);
      return null;
    }
  };

  // 保存個人資料
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    try {
      setSaving(true);
      setError(null);
      
      let avatarUrl = formData.avatar_url;
      
      // 如果有新頭像，先上傳
      if (avatarFile) {
        const newAvatarUrl = await uploadAvatar();
        if (newAvatarUrl) {
          avatarUrl = newAvatarUrl;
        }
      }
      
      // 更新用戶資料
      const { error: updateError } = await supabase
        .from('Users')
        .update({
          name: formData.name,
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (updateError) {
        throw updateError;
      }
      
      // 更新成功，返回個人資料頁面
      router.push('/profile');
    } catch (err: any) {
      console.error('保存個人資料錯誤:', err);
      setError(err.message || '無法更新個人資料，請重試');
    } finally {
      setSaving(false);
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
            <h1 className="text-xl font-semibold">編輯個人資料</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* 表單錯誤顯示 */}
        {error && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>{error}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
          {/* 頭像上傳 */}
          <div className="mb-6 text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <div className="w-24 h-24 bg-blue-100 rounded-full overflow-hidden flex items-center justify-center text-blue-600">
                {avatarPreview || formData.avatar_url ? (
                  <img 
                    src={avatarPreview || formData.avatar_url} 
                    alt="用戶頭像" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl">{formData.name.charAt(0).toUpperCase()}</span>
                )}
              </div>
              <label htmlFor="avatar-upload" className="absolute -right-2 bottom-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white cursor-pointer">
                <span>+</span>
              </label>
              <input 
                id="avatar-upload" 
                type="file" 
                accept="image/*" 
                onChange={handleAvatarChange} 
                className="hidden" 
              />
            </div>
            <p className="text-sm text-gray-500">點擊更換頭像</p>
          </div>
          
          {/* 用戶名稱 */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              用戶名稱
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="請輸入用戶名稱"
              required
            />
          </div>
          
          {/* 電子郵件 (唯讀) */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              電子郵件
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 cursor-not-allowed"
              placeholder="電子郵件"
              disabled
            />
            <p className="mt-1 text-xs text-gray-500">電子郵件無法修改</p>
          </div>
          
          {/* 會員類型 */}
          {user && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                會員類型
              </label>
              <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                <span className={`inline-block px-2 py-1 rounded text-xs ${
                  user.account_type === 'premium' 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : user.account_type === 'business'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-green-100 text-green-800'
                }`}>
                  {user.account_type === 'premium' 
                    ? '高級會員' 
                    : user.account_type === 'business'
                      ? '企業會員'
                      : '免費會員'}
                </span>
              </div>
              {user.account_type === 'free' && (
                <p className="mt-1 text-xs text-blue-600">
                  <Link href="/subscription" className="hover:underline">
                    升級會員享受更多權益 →
                  </Link>
                </p>
              )}
            </div>
          )}
          
          {/* 註冊日期 */}
          {user && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                註冊日期
              </label>
              <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                {new Date(user.registration_date).toLocaleDateString('zh-TW', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          )}
          
          {/* 提交按鈕 */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => router.back()}
              className="mr-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={saving}
            >
              {saving ? '儲存中...' : '儲存變更'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
} 