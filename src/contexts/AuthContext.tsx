import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { AuthService } from '../services/auth';
import { UserProfile } from '../services/supabase';
import { clearAuthData, getUserData, setUserData } from '../utils/localStorage';

// 預設值類型
interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
  socialLogin: (provider: 'google' | 'facebook' | 'apple') => Promise<boolean>;
  updateProfile: (userData: Partial<UserProfile>) => Promise<boolean>;
  resetPassword: (email: string) => Promise<boolean>;
  changePassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
  clearError: () => void;
  handleOAuthCallback: () => Promise<UserProfile | null>;
}

// 創建上下文
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 提供者屬性
interface AuthProviderProps {
  children: ReactNode;
  authService: AuthService;
}

// 認證提供者組件
export const AuthProvider: React.FC<AuthProviderProps> = ({ children, authService }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 初始化：檢查當前用戶
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // 嘗試從本地存儲獲取用戶數據（快速載入）
        const cachedUser = getUserData<UserProfile>();
        if (cachedUser) {
          setUser(cachedUser);
        }
        
        // 從服務器獲取最新用戶數據
        const currentUser = await authService.getCurrentUser();
        
        if (currentUser) {
          setUser(currentUser);
          setUserData(currentUser); // 更新緩存
        } else if (cachedUser) {
          // 如果服務器返回null但本地有緩存，需要清除緩存
          clearAuthData();
          setUser(null);
        }
      } catch (err) {
        console.error('身份驗證初始化失敗:', err);
        setError('無法獲取用戶信息。請重新登入。');
        clearAuthData();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [authService]);

  // 處理 OAuth 回調（如果需要）
  useEffect(() => {
    const handleOAuthCallback = async () => {
      // 檢查當前URL是否包含OAuth回調參數
      const hasAuthParams = window.location.hash.includes('access_token') || 
                           window.location.search.includes('code=');
      
      if (hasAuthParams) {
        setLoading(true);
        try {
          const user = await authService.handleOAuthCallback();
          if (user) {
            setUser(user);
            setUserData(user);
          }
        } catch (err) {
          console.error('處理OAuth回調失敗:', err);
          setError('社交登入失敗。請重試。');
        } finally {
          setLoading(false);
          // 清除URL中的OAuth參數
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      }
    };

    handleOAuthCallback();
  }, [authService]);

  // 登入方法
  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      const success = await authService.login(email, password);
      if (success) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          setUser(userData);
          setUserData(userData);
        }
        return true;
      } else {
        setError('登入失敗。請檢查您的憑證。');
        return false;
      }
    } catch (err: any) {
      const errorMessage = err.message || '登入時發生錯誤。';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // 註冊方法
  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      const success = await authService.register(username, email, password);
      if (success) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          setUser(userData);
          setUserData(userData);
        }
        return true;
      } else {
        setError('註冊失敗。請稍後重試。');
        return false;
      }
    } catch (err: any) {
      const errorMessage = err.message || '註冊時發生錯誤。';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // 登出方法
  const logout = async (): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      const success = await authService.logout();
      if (success) {
        setUser(null);
        clearAuthData();
        return true;
      } else {
        setError('登出失敗。請稍後重試。');
        return false;
      }
    } catch (err: any) {
      const errorMessage = err.message || '登出時發生錯誤。';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // 社交登入
  const socialLogin = async (provider: 'google' | 'facebook' | 'apple'): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      return await authService.socialLogin(provider);
    } catch (err: any) {
      const errorMessage = err.message || `${provider} 登入失敗。`;
      setError(errorMessage);
      setLoading(false);
      return false;
    }
  };

  // 更新用戶資料
  const updateProfile = async (userData: Partial<UserProfile>): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      const success = await authService.updateUserProfile(userData);
      if (success) {
        // 獲取更新後的用戶資料
        const updatedUser = await authService.getCurrentUser();
        if (updatedUser) {
          setUser(updatedUser);
          setUserData(updatedUser);
        }
        return true;
      } else {
        setError('更新資料失敗。');
        return false;
      }
    } catch (err: any) {
      const errorMessage = err.message || '更新個人資料時發生錯誤。';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // 重設密碼
  const resetPassword = async (email: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      const success = await authService.resetPassword(email);
      if (!success) {
        setError('發送密碼重設郵件失敗。');
      }
      return success;
    } catch (err: any) {
      const errorMessage = err.message || '重設密碼時發生錯誤。';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // 更改密碼
  const changePassword = async (oldPassword: string, newPassword: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      const success = await authService.changePassword(oldPassword, newPassword);
      if (!success) {
        setError('更改密碼失敗。請確保您的當前密碼正確。');
      }
      return success;
    } catch (err: any) {
      const errorMessage = err.message || '更改密碼時發生錯誤。';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // 清除錯誤
  const clearError = (): void => {
    setError(null);
  };

  // 處理 OAuth 回調
  const handleOAuthCallbackExposed = async (): Promise<UserProfile | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const user = await authService.handleOAuthCallback();
      if (user) {
        setUser(user);
        setUserData(user);
      }
      return user;
    } catch (err: any) {
      const errorMessage = err.message || '處理社交登入回調時發生錯誤。';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // 上下文值
  const contextValue: AuthContextType = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    socialLogin,
    updateProfile,
    resetPassword,
    changePassword,
    clearError,
    handleOAuthCallback: handleOAuthCallbackExposed
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// 自定義鉤子，用於輕鬆訪問認證上下文
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth 必須在 AuthProvider 內使用');
  }
  return context;
}; 