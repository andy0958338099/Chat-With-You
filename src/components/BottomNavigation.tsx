import React from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * 底部導航組件
 * 包含四個主要頁面：聊天、聯絡人、AI 助手和個人資料
 */
const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bg = 'white';
  const borderColor = 'gray.100';

  // 導航項目 - 使用相對路徑，因為這些都是在MainLayout下的子路由
  const navItems = [
    {
      label: '聊天',
      iconName: 'message',
      path: '/chat-list',
    },
    {
      label: '聯絡人',
      iconName: 'users',
      path: '/contacts',
    },
    {
      label: 'AI 助手',
      iconName: 'robot',
      path: '/ai-assistant',
    },
    {
      label: '我的',
      iconName: 'user',
      path: '/profile',
    },
  ];

  // 檢查當前路徑是否激活
  const isActive = (path: string) => {
    // 移除開頭的斜線來比較，確保子路由也能匹配
    const currentPath = location.pathname.replace(/^\/+/, '');
    const targetPath = path.replace(/^\/+/, '');
    return currentPath === targetPath;
  };

  // 導航到指定路徑
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  // 渲染圖標
  const renderIcon = (iconName: string, isActive: boolean) => {
    const color = isActive ? 'primary.500' : 'gray.500';
    
    switch (iconName) {
      case 'message':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color === 'primary.500' ? '#3182CE' : '#718096'} strokeWidth="2">
            <path d="M3 20.29V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H7.961a2 2 0 00-1.561.75l-2.331 2.914A.6.6 0 013 20.29z" />
          </svg>
        );
      case 'users':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color === 'primary.500' ? '#3182CE' : '#718096'} strokeWidth="2">
            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
            <circle cx="8.5" cy="7" r="4"></circle>
            <path d="M20 8v6"></path>
            <path d="M23 11h-6"></path>
          </svg>
        );
      case 'robot':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color === 'primary.500' ? '#3182CE' : '#718096'} strokeWidth="2">
            <rect x="3" y="4" width="18" height="16" rx="2"></rect>
            <circle cx="9" cy="10" r="2"></circle>
            <circle cx="15" cy="10" r="2"></circle>
            <line x1="9" y1="16" x2="15" y2="16"></line>
          </svg>
        );
      case 'user':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color === 'primary.500' ? '#3182CE' : '#718096'} strokeWidth="2">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <Flex
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      height="60px"
      bg={bg}
      borderTop="1px"
      borderColor={borderColor}
      justifyContent="space-around"
      alignItems="center"
      zIndex={1000}
    >
      {navItems.map((item) => (
        <Flex
          key={item.path}
          direction="column"
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
          flex={1}
          onClick={() => handleNavigation(item.path)}
          py={2}
        >
          <Box>
            {renderIcon(item.iconName, isActive(item.path))}
          </Box>
          <Text
            fontSize="xs"
            mt={1}
            color={isActive(item.path) ? 'primary.500' : 'gray.500'}
          >
            {item.label}
          </Text>
        </Flex>
      ))}
    </Flex>
  );
};

export default BottomNavigation; 