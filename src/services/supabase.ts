import { createClient } from '@supabase/supabase-js';

// 從環境變量獲取Supabase配置
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://default-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'default-anon-key';

// 創建Supabase客戶端
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 用戶資料類型
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
  registration_date: string;
  last_login?: string;
  account_type: 'free' | 'premium' | 'business';
  is_verified?: boolean;
  credits?: number;
  auth_provider?: string;
  [key: string]: any; // 允許額外的屬性
}

// 獲取當前用戶
export async function getCurrentUser() {
  try {
    const { data, error } = await supabase.auth.getUser();
    
    if (error) {
      console.error('獲取用戶失敗:', error.message);
      return null;
    }
    
    if (!data.user) return null;
    
    // 從用戶表中獲取額外的用戶資訊
    const { data: userData, error: profileError } = await supabase
      .from('Users')
      .select('*')
      .eq('id', data.user.id)
      .single();
      
    if (profileError) {
      console.error('獲取用戶資料失敗:', profileError.message);
      return null;
    }
    
    // 合併認證用戶和用戶資料
    return {
      ...data.user,
      ...userData,
    };
  } catch (error) {
    console.error('獲取當前用戶失敗:', error);
    return null;
  }
}

// 登出用戶
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('登出失敗:', error.message);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('登出操作失敗:', error);
    return false;
  }
}

export default supabase; 