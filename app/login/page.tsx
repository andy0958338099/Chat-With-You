"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // 檢查本地存儲是否有保存的電子郵件
    const savedEmail = localStorage.getItem('savedEmail')
    if (savedEmail) {
      setEmail(savedEmail)
      setRememberMe(true)
    }
  }, [])

  const handleLogin = async () => {
    // 表單驗證
    if (!email || !password) {
      setError('請填寫所有必填欄位')
      return
    }

    if (!validateEmail(email)) {
      setError('請輸入有效的電子郵件地址')
      return
    }

    try {
      setIsLoading(true)
      setError('')
      
      // 模擬登入過程
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      if (rememberMe) {
        localStorage.setItem('savedEmail', email)
      }
      
      // 成功訊息
      alert('登入成功！歡迎回來！')
      
      // 登入成功後導航到首頁
      window.location.href = '/dashboard'
    } catch (err) {
      console.error('登入時出錯:', err)
      setError('登入失敗，請檢查您的憑證')
    } finally {
      setIsLoading(false)
    }
  }

  // 電子郵件驗證函數
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-yellow-200 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 flex items-center justify-center">
            <span className="text-3xl">🌟</span>
          </div>
          <h1 className="text-2xl font-bold">歡迎使用 Chat-With-You</h1>
          <p className="text-gray-600 mt-1">登入您的帳戶開始聊天</p>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              電子郵件
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="password">
              密碼
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                placeholder="輸入您的密碼"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? '隱藏' : '顯示'}
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-blue-600"
              />
              <label htmlFor="remember-me" className="ml-2 text-sm text-gray-600">
                記住我
              </label>
            </div>
            <Link href="/forgot-password">
              <span className="text-sm text-blue-600 hover:underline">忘記密碼？</span>
            </Link>
          </div>
          
          <button
            className={`w-full py-2 px-4 rounded-md text-white font-medium ${
              isLoading 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? '處理中...' : '登入'}
          </button>
          
          <div className="relative flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-600">或使用</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            <button 
              className="py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50"
              onClick={() => alert('Google 登入')}
            >
              Google
            </button>
            <button 
              className="py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50"
              onClick={() => alert('Facebook 登入')}
            >
              Facebook
            </button>
            <button 
              className="py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50"
              onClick={() => alert('Apple 登入')}
            >
              Apple
            </button>
          </div>
        </div>
        
        <div className="flex justify-center mt-6">
          <p className="text-sm text-gray-600">還沒有帳戶？</p>
          <Link href="/register">
            <span className="text-sm text-blue-600 hover:underline ml-1">立即註冊</span>
          </Link>
        </div>
      </div>
    </div>
  )
} 