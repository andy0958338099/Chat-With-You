import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import BottomNavigation from '../components/BottomNavigation';

/**
 * 主要布局組件
 * 包含固定的頂部和底部導航，中間顯示子路由內容
 */
const MainLayout = () => {
  return (
    <Flex direction="column" h="100vh">
      {/* 主要內容區域 */}
      <Box flex="1" overflowY="auto" pb="60px">
        <Outlet />
      </Box>
      
      {/* 底部導航 */}
      <BottomNavigation />
    </Flex>
  );
};

export default MainLayout; 