"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import BottomNavigation from '../components/BottomNavigation';
import { supabase, getCurrentUser, UserProfile } from '@/src/services/supabase';

// 定義聯絡人類型
interface Contact {
  id: string;
  user_id: string;
  name: string;
  avatar_url?: string | null;
  status?: string;
  last_seen?: string;
}

// 定義 Supabase 返回的聯絡人資料格式
interface ContactRecord {
  id: string;
  contact_user_id: string;
  Users: {
    id: string;
    name: string;
    avatar_url: string | null;
    last_seen: string | null;
    status: string | null;
  };
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function loadContacts() {
      try {
        setLoading(true);
        const userData = await getCurrentUser();
        
        if (userData) {
          setUser(userData);
          
          // 獲取聯絡人列表
          const { data, error } = await supabase
            .from('Contacts')
            .select(`
              id,
              contact_user_id,
              Users:contact_user_id (
                id,
                name,
                avatar_url,
                last_seen,
                status
              )
            `)
            .eq('user_id', userData.id);
            
          if (error) {
            console.error('獲取聯絡人失敗:', error);
            setContacts(mockContacts); // 使用模擬數據
          } else if (data) {
            // 格式化聯絡人數據
            const formattedContacts = data.map((item: ContactRecord) => ({
              id: item.id,
              user_id: item.contact_user_id,
              name: item.Users.name,
              avatar_url: item.Users.avatar_url,
              status: item.Users.status,
              last_seen: item.Users.last_seen,
            }));
            
            setContacts(formattedContacts.length > 0 ? formattedContacts : mockContacts);
          } else {
            setContacts(mockContacts); // 使用模擬數據
          }
        }
      } catch (err) {
        console.error('載入聯絡人錯誤:', err);
        setContacts(mockContacts); // 使用模擬數據
      } finally {
        setLoading(false);
      }
    }
    
    loadContacts();
  }, []);

  // 模擬聯絡人數據
  const mockContacts: Contact[] = [
    { id: '1', user_id: 'u1', name: 'Alice Chen', status: 'online' },
    { id: '2', user_id: 'u2', name: 'Bob Lin', status: 'offline' },
    { id: '3', user_id: 'u3', name: 'Charlie Wang', status: 'online' },
    { id: '4', user_id: 'u4', name: 'David Lee', status: 'offline' },
    { id: '5', user_id: 'u5', name: 'Emma Su', status: 'online' },
    { id: '6', user_id: 'u6', name: 'Frank Wu', status: 'busy' },
    { id: '7', user_id: 'u7', name: 'Grace Zhang', status: 'online' },
    { id: '8', user_id: 'u8', name: 'Henry Kao', status: 'offline' },
    { id: '9', user_id: 'u9', name: 'Ivy Yang', status: 'online' },
    { id: '10', user_id: 'u10', name: 'Jack Huang', status: 'busy' },
    { id: '11', user_id: 'u11', name: 'Karen Liu', status: 'online' },
    { id: '12', user_id: 'u12', name: 'Leo Chiang', status: 'offline' },
    { id: '13', user_id: 'u13', name: 'Mia Ho', status: 'away' },
    { id: '14', user_id: 'u14', name: 'Nina Liao', status: 'online' },
    { id: '15', user_id: 'u15', name: 'Oscar Hsu', status: 'offline' },
    { id: '16', user_id: 'u16', name: 'Pam Lin', status: 'online' },
    { id: '17', user_id: 'u17', name: 'Quinn Chen', status: 'busy' },
    { id: '18', user_id: 'u18', name: 'Ray Tsai', status: 'online' },
    { id: '19', user_id: 'u19', name: 'Sam Chang', status: 'offline' },
    { id: '20', user_id: 'u20', name: 'Tina Wu', status: 'online' },
  ];

  // 過濾並分組聯絡人
  const filterAndGroupContacts = () => {
    const filteredContacts = contacts.filter(contact => 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // 按首字母分組
    const grouped: Record<string, Contact[]> = {};
    
    filteredContacts.forEach(contact => {
      const firstLetter = contact.name.charAt(0).toUpperCase();
      if (!grouped[firstLetter]) {
        grouped[firstLetter] = [];
      }
      grouped[firstLetter].push(contact);
    });
    
    // 按字母順序排序
    return Object.entries(grouped)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([letter, contacts]) => ({
        letter,
        contacts: contacts.sort((a, b) => a.name.localeCompare(b.name))
      }));
  };

  const groupedContacts = filterAndGroupContacts();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="spinner w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">載入中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* 頂部導航欄 */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <h1 className="text-xl font-semibold">聯絡人</h1>
          <div className="flex items-center space-x-4">
            <Link href="/profile">
              <div className="w-8 h-8 bg-blue-500 rounded-full overflow-hidden flex items-center justify-center text-white">
                {user?.avatar_url ? (
                  <img 
                    src={user.avatar_url} 
                    alt={user.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>{user?.name?.charAt(0).toUpperCase() || 'U'}</span>
                )}
              </div>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* 搜尋框 */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="搜尋聯絡人..."
              className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute left-3 top-3 text-gray-400">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>
        </div>

        {/* 新增聯絡人按鈕 */}
        <div className="flex justify-end mb-4">
          <Link href="/contacts/add" className="bg-blue-600 text-white px-4 py-2 rounded-md">
            新增聯絡人
          </Link>
        </div>

        {/* 聯絡人列表 */}
        <div className="bg-white rounded-lg shadow">
          {groupedContacts.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              找不到符合的聯絡人
            </div>
          ) : (
            groupedContacts.map(group => (
              <div key={group.letter} className="mb-4">
                <div className="sticky top-0 bg-gray-100 p-2 px-4 font-medium text-gray-700">
                  {group.letter}
                </div>
                {group.contacts.map(contact => (
                  <Link href={`/chat/${contact.user_id}`} key={contact.id} className="block">
                    <div className="flex items-center p-4 border-b border-gray-100 hover:bg-gray-50">
                      <div className="relative">
                        <div className="w-12 h-12 bg-blue-100 rounded-full overflow-hidden flex items-center justify-center text-blue-600">
                          {contact.avatar_url ? (
                            <img src={contact.avatar_url} alt={contact.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-xl">{contact.name.charAt(0)}</span>
                          )}
                        </div>
                        <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${
                          contact.status === 'online' ? 'bg-green-500' : 
                          contact.status === 'busy' ? 'bg-red-500' : 
                          contact.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                        } border-2 border-white`}></div>
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium">{contact.name}</h3>
                        <p className="text-sm text-gray-500">
                          {contact.status === 'online' ? '在線' : 
                           contact.status === 'busy' ? '忙碌中' : 
                           contact.status === 'away' ? '離開' : '離線'}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ))
          )}
        </div>
      </main>

      {/* 底部導航 */}
      <BottomNavigation />
    </div>
  );
} 