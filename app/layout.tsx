import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import TanstackClientProvider from '@/components/providers/tanstack-client-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chat-With-You',
  description: '多平台社群聊天應用，支援 AI 智能對話',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-Hant-TW">
      <body className={inter.className}>
        <TanstackClientProvider>{children}</TanstackClientProvider>
      </body>
    </html>
  )
}
