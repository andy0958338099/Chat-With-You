import React, { useEffect, useState } from 'react';
import {
  Flex,
  Box,
  Spinner,
  Text,
  useToast,
  Container,
  Heading,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

/**
 * OAuth 回調頁面
 * 處理從社交媒體提供商(Google, Facebook, Apple)返回的認證回調
 * 顯示處理過程中的狀態，並在完成後自動導航
 */
const OAuthCallback: React.FC = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();
  const { handleOAuthCallback } = useAuth();
  const toast = useToast();

  useEffect(() => {
    // 處理 OAuth 回調
    const processOAuthCallback = async () => {
      try {
        // 嘗試處理 OAuth 回調並獲取用戶資料
        const user = await handleOAuthCallback();
        
        if (user) {
          // 成功獲取用戶資料
          setStatus('success');
          toast({
            title: '登入成功',
            description: '您已成功登入，正在為您跳轉...',
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
          
          // 2秒後自動導航到主頁
          setTimeout(() => {
            navigate('/home');
          }, 2000);
        } else {
          // 未獲取到用戶資料
          setStatus('error');
          setErrorMessage('無法完成身份驗證，請重試');
          toast({
            title: '登入失敗',
            description: '無法完成身份驗證，請重試',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
          
          // 3秒後自動導航到登入頁面
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        }
      } catch (error) {
        // 處理過程中發生錯誤
        console.error('OAuth 回調處理失敗:', error);
        setStatus('error');
        setErrorMessage(error instanceof Error ? error.message : '身份驗證過程中發生錯誤');
        toast({
          title: '登入失敗',
          description: error instanceof Error ? error.message : '身份驗證過程中發生錯誤',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        
        // 3秒後自動導航到登入頁面
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    };

    processOAuthCallback();
  }, [handleOAuthCallback, navigate, toast]);

  return (
    <Container maxW="container.md" centerContent>
      <Flex
        minH="100vh"
        direction="column"
        justify="center"
        align="center"
        p={4}
      >
        <Box
          bg="white"
          borderRadius="xl"
          boxShadow="lg"
          p={8}
          textAlign="center"
          maxW="md"
          w="100%"
        >
          {status === 'loading' && (
            <>
              <Spinner
                size="xl"
                color="blue.500"
                mb={4}
              />
              <Heading size="md" mb={2}>
                正在處理您的登入...
              </Heading>
              <Text color="gray.600">
                請稍候，我們正在驗證您的身份
              </Text>
            </>
          )}

          {status === 'success' && (
            <>
              <Heading color="green.500" size="md" mb={2}>
                登入成功！
              </Heading>
              <Text>
                您已成功登入，正在為您跳轉...
              </Text>
            </>
          )}

          {status === 'error' && (
            <>
              <Heading color="red.500" size="md" mb={2}>
                登入失敗
              </Heading>
              <Text color="red.400">
                {errorMessage || '無法完成身份驗證，請重試'}
              </Text>
            </>
          )}
        </Box>
      </Flex>
    </Container>
  );
};

export default OAuthCallback; 