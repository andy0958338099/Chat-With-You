import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Box, Spinner, Center } from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredLogin?: boolean;
  redirectTo?: string;
}

/**
 * 受保護路由組件
 * 
 * 處理三種情況：
 * 1. 需要登入的路由（比如聊天頁面）：未登入用戶重定向到登入頁
 * 2. 只有未登入用戶可訪問的路由（比如登入頁）：已登入用戶重定向到默認頁面
 * 3. 公共路由：所有人都可訪問
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredLogin = true,
  redirectTo = '/login'
}) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // 短暫延遲以等待身份驗證完成
    // 這有助於防止在身份驗證檢查期間進行不必要的重定向
    const timer = setTimeout(() => {
      setIsCheckingAuth(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [loading]);

  // 顯示加載狀態
  if (loading || isCheckingAuth) {
    return (
      <Center h="100vh">
        <Box textAlign="center">
          <Spinner 
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
          <Box mt={4}>驗證身份中...</Box>
        </Box>
      </Center>
    );
  }

  // 情況1：路由需要登入但用戶未登入 -> 重定向到登入頁
  if (requiredLogin && !user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // 情況2：路由用於未登入用戶（例如登入頁）但用戶已登入 -> 重定向到主頁
  if (!requiredLogin && user) {
    return <Navigate to="/chats" replace />;
  }

  // 情況3：用戶可以訪問此路由
  return <>{children}</>;
};

export default ProtectedRoute; 