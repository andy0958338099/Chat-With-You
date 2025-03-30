"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * 底部導航組件 - Next.js 版本
 * 包含四個主要頁面：聊天、聯絡人、AI 助手和個人資料
 */
const BottomNavigation = () => {
  const pathname = usePathname();
  
  // 導航項目
  const navItems = [
    {
      label: '聊天',
      iconName: 'message',
      path: '/dashboard',
    },
    {
      label: '聯絡人',
      iconName: 'users',
      path: '/contacts',
    },
    {
      label: 'AI 助手',
      iconName: 'robot',
      path: '/ai',
    },
    {
      label: '我的',
      iconName: 'user',
      path: '/profile',
    },
  ];

  // 檢查當前路徑是否激活
  const isActive = (path: string) => {
    // 確保路徑比較的一致性
    return pathname === path;
  };

  // 渲染圖標
  const renderIcon = (iconName: string, active: boolean) => {
    const color = active ? '#3182CE' : '#718096';
    
    switch (iconName) {
      case 'message':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
            <path d="M3 20.29V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H7.961a2 2 0 00-1.561.75l-2.331 2.914A.6.6 0 013 20.29z" />
          </svg>
        );
      case 'users':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
            <circle cx="8.5" cy="7" r="4"></circle>
            <path d="M20 8v6"></path>
            <path d="M23 11h-6"></path>
          </svg>
        );
      case 'robot':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
            <rect x="3" y="4" width="18" height="16" rx="2"></rect>
            <circle cx="9" cy="10" r="2"></circle>
            <circle cx="15" cy="10" r="2"></circle>
            <line x1="9" y1="16" x2="15" y2="16"></line>
          </svg>
        );
      case 'user':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 h-16 flex justify-around items-center z-50">
      {navItems.map((item) => (
        <Link
          key={item.path}
          href={item.path}
          className="flex flex-col items-center justify-center cursor-pointer py-2 flex-1"
        >
          <div>
            {renderIcon(item.iconName, isActive(item.path))}
          </div>
          <span
            className={`text-xs mt-1 ${isActive(item.path) ? 'text-blue-500' : 'text-gray-500'}`}
          >
            {item.label}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default BottomNavigation; 