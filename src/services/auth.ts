import { supabase } from './supabase';
import { UserProfile } from './supabase';

/**
 * 身份驗證服務介面
 * 定義了所有身份驗證相關的方法
 */
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

/**
 * Supabase 身份驗證服務實現
 * 實現了 AuthService 介面的所有方法
 */
export class SupabaseAuthService implements AuthService {
  private supabaseClient;

  constructor(supabaseClient = supabase) {
    this.supabaseClient = supabaseClient;
  }

  /**
   * 使用者登入方法
   * @param email 使用者電子郵件
   * @param password 使用者密碼
   * @returns 登入是否成功
   */
  async login(email: string, password: string): Promise<boolean> {
    try {
      const { data, error } = await this.supabaseClient.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('登入錯誤:', error.message);
        return false;
      }

      if (data?.user) {
        // 登入成功後更新最後登入時間
        const { error: updateError } = await this.supabaseClient
          .from('Users')
          .update({ last_login: new Date().toISOString() })
          .eq('id', data.user.id);

        if (updateError) {
          console.error('更新最後登入時間錯誤:', updateError.message);
          // 不影響登入成功
        }

        return true;
      }

      return false;
    } catch (error) {
      console.error('登入過程中發生錯誤:', error);
      return false;
    }
  }

  /**
   * 使用者註冊方法
   * @param username 使用者名稱
   * @param email 使用者電子郵件
   * @param password 使用者密碼
   * @returns 註冊是否成功
   */
  async register(username: string, email: string, password: string): Promise<boolean> {
    try {
      // 註冊新用戶
      const { data, error } = await this.supabaseClient.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
        },
      });

      if (error) {
        console.error('註冊錯誤:', error.message);
        return false;
      }

      if (data?.user) {
        // 創建用戶資料
        const { error: profileError } = await this.supabaseClient
          .from('Users')
          .insert({
            id: data.user.id,
            name: username,
            email,
            registration_date: new Date().toISOString(),
            last_login: new Date().toISOString(),
            account_type: 'free',
            is_verified: false,
            credits: 10,
          });

        if (profileError) {
          console.error('創建用戶資料錯誤:', profileError.message);
          // 如果創建資料失敗，嘗試刪除剛創建的用戶
          await this.supabaseClient.auth.admin.deleteUser(data.user.id);
          return false;
        }

        // 初始化使用者點數
        const { error: creditsError } = await this.supabaseClient
          .from('Credits')
          .insert({
            user_id: data.user.id,
            amount: 10, // 初始贈送點數
            updated_at: new Date().toISOString(),
          });

        if (creditsError) {
          console.error('初始化用戶點數錯誤:', creditsError.message);
          // 不影響註冊成功
        }

        return true;
      }

      return false;
    } catch (error) {
      console.error('註冊過程中發生錯誤:', error);
      return false;
    }
  }

  /**
   * 使用者登出方法
   * @returns 登出是否成功
   */
  async logout(): Promise<boolean> {
    try {
      const { error } = await this.supabaseClient.auth.signOut();
      
      if (error) {
        console.error('登出錯誤:', error.message);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('登出過程中發生錯誤:', error);
      return false;
    }
  }

  /**
   * 獲取當前登入使用者資訊
   * @returns 使用者資訊或 null
   */
  async getCurrentUser(): Promise<UserProfile | null> {
    try {
      const { data: { user }, error } = await this.supabaseClient.auth.getUser();
      
      if (error || !user) {
        console.error('獲取當前用戶錯誤:', error?.message);
        return null;
      }
      
      // 獲取額外的用戶資料
      const { data: userData, error: profileError } = await this.supabaseClient
        .from('Users')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (profileError) {
        console.error('獲取用戶資料錯誤:', profileError.message);
        return null;
      }
      
      return {
        id: user.id,
        email: user.email || '',
        name: userData.name || userData.username,
        avatar_url: userData.avatar_url,
        registration_date: userData.registration_date || userData.created_at,
        last_login: userData.last_login,
        account_type: userData.account_type || 'free',
        is_verified: user.email_confirmed_at !== null,
        credits: userData.credits,
        auth_provider: user.app_metadata?.provider || 'email',
      };
    } catch (error) {
      console.error('獲取當前用戶過程中發生錯誤:', error);
      return null;
    }
  }

  /**
   * 社交媒體登入方法
   * @param provider 社交媒體提供商
   * @returns 重定向是否成功
   */
  async socialLogin(provider: 'google' | 'facebook' | 'apple'): Promise<boolean> {
    try {
      // 將 provider 字符串映射到 Supabase Provider 類型
      const supabaseProvider = provider === 'google' 
        ? 'google' 
        : provider === 'facebook' 
          ? 'facebook' 
          : 'apple';

      const { data, error } = await this.supabaseClient.auth.signInWithOAuth({
        provider: supabaseProvider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        console.error(`${provider} 登入錯誤:`, error.message);
        return false;
      }

      // 如果有 URL，我們將重定向用戶
      if (data?.url) {
        window.location.href = data.url;
        return true;
      }

      return false;
    } catch (error) {
      console.error(`${provider} 登入過程中發生錯誤:`, error);
      return false;
    }
  }

  /**
   * 處理 OAuth 回調
   * @returns 用戶資訊或 null
   */
  async handleOAuthCallback(): Promise<UserProfile | null> {
    try {
      const { data, error } = await this.supabaseClient.auth.getSession();
      
      if (error || !data.session) {
        console.error('獲取會話錯誤:', error?.message);
        return null;
      }
      
      const user = data.session.user;
      
      // 檢查用戶是否已存在資料庫
      const { data: existingUser, error: fetchError } = await this.supabaseClient
        .from('Users')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 是 "行不存在" 錯誤
        console.error('檢查用戶錯誤:', fetchError.message);
        return null;
      }
      
      // 如果用戶不存在，創建新用戶資料
      if (!existingUser) {
        const displayName = user.user_metadata.name || user.user_metadata.full_name || user.email?.split('@')[0] || 'user';
        const avatar_url = user.user_metadata.avatar_url || null;
        
        const { error: createError } = await this.supabaseClient
          .from('Users')
          .insert({
            id: user.id,
            email: user.email,
            name: displayName,
            avatar_url,
            registration_date: new Date().toISOString(),
            last_login: new Date().toISOString(),
            account_type: 'free',
            is_verified: true,
            credits: 10,
            auth_provider: user.app_metadata?.provider || 'unknown',
          });
        
        if (createError) {
          console.error('創建社交登入用戶錯誤:', createError.message);
          return null;
        }
        
        // 初始化用戶點數
        const { error: creditsError } = await this.supabaseClient
          .from('Credits')
          .insert({
            user_id: user.id,
            amount: 10, // 初始贈送點數
            updated_at: new Date().toISOString(),
          });
        
        if (creditsError) {
          console.error('初始化社交登入用戶點數錯誤:', creditsError.message);
          // 不影響註冊成功
        }
        
        return {
          id: user.id,
          email: user.email || '',
          name: displayName,
          avatar_url,
          registration_date: new Date().toISOString(),
          last_login: new Date().toISOString(),
          account_type: 'free',
          is_verified: true,
          credits: 10,
          auth_provider: user.app_metadata?.provider || 'unknown',
        };
      }
      
      // 如果用戶存在，更新最後登入時間
      const { error: updateError } = await this.supabaseClient
        .from('Users')
        .update({ last_login: new Date().toISOString() })
        .eq('id', user.id);
      
      if (updateError) {
        console.error('更新社交登入用戶最後登入時間錯誤:', updateError.message);
        // 不影響登入成功
      }
      
      return {
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
        avatar_url: existingUser.avatar_url,
        registration_date: existingUser.registration_date,
        last_login: new Date().toISOString(),
        account_type: existingUser.account_type,
        is_verified: true,
        credits: existingUser.credits,
        auth_provider: user.app_metadata?.provider || existingUser.auth_provider || 'unknown',
      };
    } catch (error) {
      console.error('處理 OAuth 回調過程中發生錯誤:', error);
      return null;
    }
  }

  /**
   * 更新用戶資料
   * @param userData 用戶資料
   * @returns 更新是否成功
   */
  async updateUserProfile(userData: Partial<UserProfile>): Promise<boolean> {
    try {
      const { data: currentUser, error: userError } = await this.supabaseClient.auth.getUser();
      
      if (userError || !currentUser.user) {
        console.error('獲取當前用戶錯誤:', userError?.message);
        return false;
      }
      
      const userId = currentUser.user.id;
      
      // 更新 Users 表中的用戶資料
      const { error: updateError } = await this.supabaseClient
        .from('Users')
        .update({
          name: userData.name,
          avatar_url: userData.avatar_url,
          // 不允許更新 email 和 id
        })
        .eq('id', userId);
      
      if (updateError) {
        console.error('更新用戶資料錯誤:', updateError.message);
        return false;
      }
      
      // 如果有 name，也更新 auth 中的用戶元數據
      if (userData.name) {
        const { error: metadataError } = await this.supabaseClient.auth.updateUser({
          data: { full_name: userData.name }
        });
        
        if (metadataError) {
          console.error('更新用戶元數據錯誤:', metadataError.message);
          // 不影響 Users 表更新成功
        }
      }
      
      return true;
    } catch (error) {
      console.error('更新用戶資料過程中發生錯誤:', error);
      return false;
    }
  }

  /**
   * 重設密碼
   * @param email 用戶電子郵件
   * @returns 發送重設密碼郵件是否成功
   */
  async resetPassword(email: string): Promise<boolean> {
    try {
      const { error } = await this.supabaseClient.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        console.error('發送重設密碼郵件錯誤:', error.message);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('重設密碼過程中發生錯誤:', error);
      return false;
    }
  }

  /**
   * 驗證電子郵件
   * @returns 驗證是否成功
   */
  async verifyEmail(): Promise<boolean> {
    try {
      const { data: { user }, error } = await this.supabaseClient.auth.getUser();
      
      if (error || !user) {
        console.error('獲取當前用戶錯誤:', error?.message);
        return false;
      }
      
      return user.email_confirmed_at !== null;
    } catch (error) {
      console.error('驗證電子郵件過程中發生錯誤:', error);
      return false;
    }
  }

  /**
   * 修改密碼
   * @param oldPassword 舊密碼
   * @param newPassword 新密碼
   * @returns 修改是否成功
   */
  async changePassword(oldPassword: string, newPassword: string): Promise<boolean> {
    try {
      const { data: { user }, error: getUserError } = await this.supabaseClient.auth.getUser();
      
      if (getUserError || !user || !user.email) {
        console.error('獲取當前用戶錯誤:', getUserError?.message);
        return false;
      }
      
      // 驗證舊密碼是否正確
      const { error: signInError } = await this.supabaseClient.auth.signInWithPassword({
        email: user.email,
        password: oldPassword,
      });
      
      if (signInError) {
        console.error('密碼驗證錯誤:', signInError.message);
        return false;
      }
      
      // 更新密碼
      const { error: updateError } = await this.supabaseClient.auth.updateUser({
        password: newPassword,
      });
      
      if (updateError) {
        console.error('更新密碼錯誤:', updateError.message);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('修改密碼過程中發生錯誤:', error);
      return false;
    }
  }
}

// 創建並導出一個 SupabaseAuthService 的實例
const authService = new SupabaseAuthService(supabase);
export default authService; 