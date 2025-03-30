"use client"

import React, { useState } from 'react'
import Link from 'next/link'

export default function RegisterPage() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [agreeToTerms, setAgreeToTerms] = useState(false)

  const handleRegister = async () => {
    // 表單驗證
    if (!username || !email || !password || !confirmPassword) {
      setError('請填寫所有必填欄位')
      return
    }

    if (!validateEmail(email)) {
      setError('請輸入有效的電子郵件地址')
      return
    }

    if (password.length < 8) {
      setError('密碼必須至少包含8個字符')
      return
    }
    
    if (password !== confirmPassword) {
      setError('兩次輸入的密碼不一致')
      return
    }

    if (!agreeToTerms) {
      setError('請同意用戶條款和隱私政策')
      return
    }

    try {
      setIsLoading(true)
      setError('')
      
      // 模擬註冊過程
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // 成功訊息
      alert('註冊成功！您已成功註冊，歡迎加入！')
      
      // 導航到引導頁
      window.location.href = '/onboarding'
    } catch (err) {
      console.error('註冊時出錯:', err)
      setError('註冊失敗，請稍後再試')
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
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 bg-gray-200 rounded-full mb-4 flex items-center justify-center">
            <span className="text-3xl">✨</span>
          </div>
          <h1 className="text-2xl font-bold">加入 Chat-With-You</h1>
          <p className="text-gray-600 mt-1">創建帳戶，開始暢聊無阻</p>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="username">
              用戶名
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
              placeholder="您的用戶名"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
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
                placeholder="至少8個字符"
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
          
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="confirm-password">
              確認密碼
            </label>
            <div className="relative">
              <input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                placeholder="再次輸入密碼"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showConfirmPassword ? '隱藏' : '顯示'}
              </button>
            </div>
          </div>
          
          <div className="flex items-start mt-2">
            <input
              id="terms"
              type="checkbox"
              checked={agreeToTerms}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAgreeToTerms(e.target.checked)}
              className="h-4 w-4 mt-1 text-blue-600"
            />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
              我已閱讀並同意
              <Link href="/terms" className="text-blue-600 hover:underline mx-1">
                用戶條款
              </Link>
              和
              <Link href="/privacy" className="text-blue-600 hover:underline ml-1">
                隱私政策
              </Link>
            </label>
          </div>
          
          <button
            className={`w-full py-2 px-4 rounded-md text-white font-medium mt-2 ${
              isLoading 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
            onClick={handleRegister}
            disabled={isLoading}
          >
            {isLoading ? '處理中...' : '創建帳戶'}
          </button>
          
          <div className="relative flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-600">或使用以下方式註冊</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            <button 
              className="py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50"
              onClick={() => alert('Google 註冊')}
            >
              Google
            </button>
            <button 
              className="py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50"
              onClick={() => alert('Facebook 註冊')}
            >
              Facebook
            </button>
            <button 
              className="py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50"
              onClick={() => alert('Apple 註冊')}
            >
              Apple
            </button>
          </div>
        </div>
        
        <div className="flex justify-center mt-6">
          <p className="text-sm text-gray-600">已有帳戶？</p>
          <Link href="/login" className="text-sm text-blue-600 hover:underline ml-1">
            立即登入
          </Link>
        </div>
      </div>
    </div>
  )
} 