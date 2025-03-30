import { supabase, UserProfile } from './supabase';

// 認證服務介面
export interface AuthService {
  login(email: string, password: string): Promise<boolean>;
  register(username: string, email: string, password: string): Promise<boolean>;
  logout(): Promise<boolean>;
  getCurrentUser(): Promise<UserProfile | null>;
  socialLogin(provider: 'google' | 'facebook' | 'apple'): Promise<boolean>;
  handleOAuthCallback(): Promise<UserProfile | null>;
  updateUserProfile(userData: Partial<UserProfile>): Promise<boolean>;
  resetPassword(email: string): Promise<boolean>;
  verifyEmail(): Promise<boolean>;
  changePassword(oldPassword: string, newPassword: string): Promise<boolean>;
}

// 實現 AuthService 接口
class SupabaseAuthService implements AuthService {
  // 登入
  async login(email: string, password: string): Promise<boolean> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      // 登入成功後更新用戶的最後登入時間
      if (data.user) {
        const { error: updateError } = await supabase
          .from('Users')
          .update({ last_login: new Date().toISOString() })
          .eq('id', data.user.id);
          
        if (updateError) {
          console.warn('更新最後登入時間失敗:', updateError);
          // 不中斷登入流程，僅記錄警告
        }
      }
      
      return true;
    } catch (error) {
      console.error('登入失敗:', error);
      return false;
    }
  }

  // 註冊
  async register(username: string, email: string, password: string): Promise<boolean> {
    try {
      // 使用 Supabase 創建用戶
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
        },
      });
      
      if (error) throw error;
      
      // 如果註冊成功，將用戶資料插入到用戶表中
      if (data.user) {
        const { error: profileError } = await supabase
          .from('Users')
          .insert({
            id: data.user.id,
            name: username,
            email: email,
            registration_date: new Date().toISOString(),
            account_type: 'free',
            credits: 0,
          });
        
        if (profileError) {
          console.error('創建用戶資料失敗:', profileError);
          return false;
        }
        
        // 創建用戶積分記錄
        const { error: creditsError } = await supabase
          .from('Credits')
          .insert({
            user_id: data.user.id,
            total_credits: 50, // 提供新用戶50個初始積分
            used_credits: 0
          });
          
        if (creditsError) {
          console.error('創建用戶積分記錄失敗:', creditsError);
          // 不中斷註冊流程，僅記錄錯誤
        }
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('註冊失敗:', error);
      return false;
    }
  }

  // 登出
  async logout(): Promise<boolean> {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      return true;
    } catch (error) {
      console.error('登出失敗:', error);
      return false;
    }
  }

  // 獲取當前用戶
  async getCurrentUser(): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;
      
      if (data.user) {
        // 從用戶表中獲取額外的用戶資訊
        const { data: userData, error: profileError } = await supabase
          .from('Users')
          .select('*')
          .eq('id', data.user.id)
          .single();
          
        if (profileError) throw profileError;
        
        return {
          ...data.user,
          ...userData,
        };
      }
      
      return null;
    } catch (error) {
      console.error('獲取當前用戶失敗:', error);
      return null;
    }
  }

  // 第三方登入
  async socialLogin(provider: 'google' | 'facebook' | 'apple'): Promise<boolean> {
    try {
      // 獲取重定向URL
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) throw error;
      
      // 重定向到OAuth提供商登入頁面
      if (data.url) {
        window.location.href = data.url;
      }
      
      // 注意：由於重定向，這裡永遠不會返回true
      // 實際的登入成功處理會在重定向回來後的callback路由中進行
      return true;
    } catch (error) {
      console.error('第三方登入失敗:', error);
      return false;
    }
  }

  // 處理OAuth回調
  async handleOAuthCallback(): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase.auth.getSession();
      
      if (error) throw error;
      
      if (data.session?.user) {
        // 檢查用戶是否已存在於Users表中
        const { data: existingUser, error: checkError } = await supabase
          .from('Users')
          .select('*')
          .eq('id', data.session.user.id)
          .single();
          
        if (checkError && checkError.code !== 'PGRST116') { // PGRST116是"記錄未找到"的錯誤
          throw checkError;
        }
        
        // 如果用戶不存在，創建新用戶資料
        if (!existingUser) {
          // 獲取用戶名（從第三方提供商或使用電子郵件前綴）
          const username = data.session.user.user_metadata.full_name || 
                          data.session.user.email?.split('@')[0] || 
                          `user_${Date.now()}`;
                          
          // 創建用戶資料
          const { error: insertError } = await supabase
            .from('Users')
            .insert({
              id: data.session.user.id,
              name: username,
              email: data.session.user.email,
              avatar: data.session.user.user_metadata.avatar_url,
              registration_date: new Date().toISOString(),
              account_type: 'free',
              credits: 0,
            });
            
          if (insertError) throw insertError;
          
          // 創建積分記錄
          const { error: creditsError } = await supabase
            .from('Credits')
            .insert({
              user_id: data.session.user.id,
              total_credits: 50, // 提供新用戶50個初始積分
              used_credits: 0
            });
            
          if (creditsError) {
            console.error('創建用戶積分記錄失敗:', creditsError);
            // 不中斷流程，僅記錄錯誤
          }
        }
        
        return data.session.user;
      }
      
      return null;
    } catch (error) {
      console.error('處理OAuth回調失敗:', error);
      return null;
    }
  }

  // 更新用戶資料
  async updateUserProfile(userData: Partial<UserProfile>): Promise<boolean> {
    try {
      // 獲取當前用戶
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;
      
      if (!data.user) {
        throw new Error('未找到當前用戶');
      }
      
      // 更新用戶資料
      const { error: updateError } = await supabase
        .from('Users')
        .update(userData)
        .eq('id', data.user.id);
        
      if (updateError) throw updateError;
      
      // 如果包含需要在auth.user_metadata中更新的欄位
      if (userData.email || userData.name) {
        const updateData: { email?: string; data?: { full_name?: string } } = {};
        
        if (userData.email) updateData.email = userData.email;
        if (userData.name) updateData.data = { full_name: userData.name };
        
        const { error: authUpdateError } = await supabase.auth.updateUser(updateData);
        
        if (authUpdateError) throw authUpdateError;
      }
      
      return true;
    } catch (error) {
      console.error('更新用戶資料失敗:', error);
      return false;
    }
  }

  // 重設密碼
  async resetPassword(email: string): Promise<boolean> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      
      if (error) throw error;
      
      return true;
    } catch (error) {
      console.error('發送重設密碼郵件失敗:', error);
      return false;
    }
  }

  // 驗證電子郵件
  async verifyEmail(): Promise<boolean> {
    try {
      // 在Supabase中，驗證電子郵件是自動處理的
      // 這個方法主要用於檢查電子郵件是否已驗證
      const { data, error } = await supabase.auth.getUser();
      
      if (error) throw error;
      
      return data.user?.email_confirmed_at != null;
    } catch (error) {
      console.error('驗證電子郵件失敗:', error);
      return false;
    }
  }

  // 更改密碼
  async changePassword(oldPassword: string, newPassword: string): Promise<boolean> {
    try {
      // 獲取當前用戶的電子郵件
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      
      if (!userData.user?.email) {
        throw new Error('未找到用戶電子郵件');
      }
      
      // 先使用舊密碼驗證用戶
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: userData.user.email,
        password: oldPassword,
      });
      
      if (signInError) {
        console.error('舊密碼不正確:', signInError);
        return false;
      }
      
      // 更新密碼
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (updateError) throw updateError;
      
      return true;
    } catch (error) {
      console.error('更改密碼失敗:', error);
      return false;
    }
  }
}

// 創建認證服務實例
export const authService = new SupabaseAuthService();
export default authService; 