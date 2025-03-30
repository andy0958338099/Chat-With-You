/** @type {import('next').NextConfig} */
const nextConfig = {
  // 環境變數配置
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
  // 禁用 eslint 檢查，如果有需要的話
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 禁用 typescript 檢查，如果有需要的話
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
