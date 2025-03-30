// 令牌存儲鍵
const TOKEN_KEY = 'auth_token';
const USER_DATA_KEY = 'user_data';

/**
 * 存儲令牌到本地存儲
 * @param token - 認證令牌
 */
export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

/**
 * 從本地存儲獲取令牌
 * @returns 存儲的令牌或null
 */
export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * 從本地存儲刪除令牌
 */
export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

/**
 * 存儲用戶資料到本地存儲（用於離線訪問）
 * @param userData - 用戶資料對象
 */
export const setUserData = <T>(userData: T): void => {
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
};

/**
 * 從本地存儲獲取用戶資料
 * @returns 用戶資料對象或null
 */
export const getUserData = <T>(): T | null => {
  const data = localStorage.getItem(USER_DATA_KEY);
  if (!data) return null;
  
  try {
    return JSON.parse(data) as T;
  } catch (error) {
    console.error('解析用戶資料失敗:', error);
    return null;
  }
};

/**
 * 從本地存儲刪除用戶資料
 */
export const removeUserData = (): void => {
  localStorage.removeItem(USER_DATA_KEY);
};

/**
 * 清除所有認證相關的本地存儲
 */
export const clearAuthData = (): void => {
  removeToken();
  removeUserData();
};

/**
 * 檢查用戶是否已登入（基於本地存儲的令牌）
 * @returns 登入狀態
 */
export const isLoggedIn = (): boolean => {
  return !!getToken();
};

/**
 * 存儲用戶設置到本地存儲
 * @param key - 設置鍵
 * @param value - 設置值
 */
export const setUserSetting = <T>(key: string, value: T): void => {
  localStorage.setItem(`user_setting_${key}`, JSON.stringify(value));
};

/**
 * 從本地存儲獲取用戶設置
 * @param key - 設置鍵
 * @param defaultValue - 默認值
 * @returns 設置值或默認值
 */
export const getUserSetting = <T>(key: string, defaultValue: T): T => {
  const data = localStorage.getItem(`user_setting_${key}`);
  if (!data) return defaultValue;
  
  try {
    return JSON.parse(data) as T;
  } catch (error) {
    console.error(`解析用戶設置 ${key} 失敗:`, error);
    return defaultValue;
  }
};

/**
 * 從本地存儲刪除用戶設置
 * @param key - 設置鍵
 */
export const removeUserSetting = (key: string): void => {
  localStorage.removeItem(`user_setting_${key}`);
};

/**
 * 存儲離線消息到本地存儲
 * @param messages - 離線消息數組
 */
export const setOfflineMessages = <T>(messages: T[]): void => {
  localStorage.setItem('offline_messages', JSON.stringify(messages));
};

/**
 * 從本地存儲獲取離線消息
 * @returns 離線消息數組或空數組
 */
export const getOfflineMessages = <T>(): T[] => {
  const data = localStorage.getItem('offline_messages');
  if (!data) return [];
  
  try {
    return JSON.parse(data) as T[];
  } catch (error) {
    console.error('解析離線消息失敗:', error);
    return [];
  }
};

/**
 * 添加離線消息到本地存儲
 * @param message - 新消息
 */
export const addOfflineMessage = <T>(message: T): void => {
  const messages = getOfflineMessages<T>();
  messages.push(message);
  setOfflineMessages(messages);
};

/**
 * 清除離線消息
 */
export const clearOfflineMessages = (): void => {
  localStorage.removeItem('offline_messages');
}; 