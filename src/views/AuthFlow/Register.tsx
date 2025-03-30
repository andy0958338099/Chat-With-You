//@ts-nocheck

import React, { useState } from 'react';
import { 
  ChakraProvider, 
  Flex, 
  Box, 
  Button, 
  Text, 
  VStack, 
  Input, 
  InputGroup, 
  InputLeftElement,
  Divider,
  useToast,
  Alert,
  AlertIcon,
  FormControl,
  FormErrorMessage
} from '@chakra-ui/react';
import { 
  IconArrowLeft, 
  IconUser, 
  IconMail, 
  IconLock, 
  IconBrandFacebook, 
  IconBrandGoogle, 
  IconBrandApple 
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { kStyleGlobal } from '../../theme';
import { useAuth } from '../../contexts/AuthContext';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const navigate = useNavigate();
  const toast = useToast();
  const { register, socialLogin, error, clearError } = useAuth();

  // 表單驗證
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!username.trim()) {
      newErrors.username = '用戶名不能為空';
    }
    
    if (!email.trim()) {
      newErrors.email = '電子郵件不能為空';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = '請輸入有效的電子郵件地址';
    }
    
    if (!password) {
      newErrors.password = '密碼不能為空';
    } else if (password.length < 6) {
      newErrors.password = '密碼必須至少包含6個字符';
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = '兩次輸入的密碼不匹配';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    clearError();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setIsLoading(true);
      const success = await register(username, email, password);
      
      if (success) {
        toast({
          title: '註冊成功',
          description: '您已成功註冊，現在將進入應用。',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        
        // 註冊成功後自動登入，導航到引導頁面
        navigate('/onboarding');
      }
    } catch (err) {
      console.error('註冊失敗:', err);
      toast({
        title: '註冊失敗',
        description: error || '註冊過程中發生錯誤，請稍後重試',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthSignup = async (provider: 'google' | 'facebook' | 'apple') => {
    try {
      clearError();
      setIsLoading(true);
      const success = await socialLogin(provider);
      
      if (!success) {
        toast({
          title: '註冊失敗',
          description: `無法使用 ${provider} 註冊，請稍後再試`,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
      // 社交登入成功後，用戶將被重定向到OAuth提供商，
      // 成功後將返回應用，並在AuthContext中處理
    } catch (err) {
      console.error(`${provider} 註冊失敗:`, err);
      toast({
        title: '註冊失敗',
        description: `無法使用 ${provider} 註冊，請稍後再試`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const goToNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <ChakraProvider theme={kStyleGlobal}>
      <Flex
        direction="column"
        h="100vh"
        bg="background"
        p={4}
      >
        <Flex
          justify="space-between"
          align="center"
          mb={6}
        >
          <Button
            variant="ghost"
            p={0}
            onClick={goBack}
          >
            <IconArrowLeft size={24} />
          </Button>
          <Text
            fontSize="20px"
            fontWeight="600"
          >
            註冊
          </Text>
          <Box w="24px" />
        </Flex>
        <Flex
          direction="column"
          gap={6}
          maxW="440px"
          mx="auto"
          w="100%"
        >
          {error && (
            <Alert status="error" mb={4} borderRadius="md">
              <AlertIcon />
              {error}
            </Alert>
          )}
          
          <form>
            <VStack spacing={4}>
              <FormControl isInvalid={!!errors.username}>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<IconUser color="gray.400" />}
                    pl={4}
                  />
                  <Input
                    pl={12}
                    placeholder="用戶名"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </InputGroup>
                {errors.username && <FormErrorMessage>{errors.username}</FormErrorMessage>}
              </FormControl>
              
              <FormControl isInvalid={!!errors.email}>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<IconMail color="gray.400" />}
                    pl={4}
                  />
                  <Input
                    pl={12}
                    placeholder="電子郵箱"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
                {errors.email && <FormErrorMessage>{errors.email}</FormErrorMessage>}
              </FormControl>
              
              <FormControl isInvalid={!!errors.password}>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<IconLock color="gray.400" />}
                    pl={4}
                  />
                  <Input
                    pl={12}
                    placeholder="密碼"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </InputGroup>
                {errors.password && <FormErrorMessage>{errors.password}</FormErrorMessage>}
              </FormControl>
              
              <FormControl isInvalid={!!errors.confirmPassword}>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<IconLock color="gray.400" />}
                    pl={4}
                  />
                  <Input
                    pl={12}
                    placeholder="確認密碼"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </InputGroup>
                {errors.confirmPassword && <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>}
              </FormControl>
              
              <Button
                bg="primary.500"
                color="white"
                size="lg"
                w="100%"
                h="54px"
                onClick={handleRegister}
                isLoading={isLoading}
                loadingText="註冊中..."
                colorScheme="green"
              >
                註冊
              </Button>
            </VStack>
          </form>
          <Divider>
            <Text
              color="gray.500"
            >
              或
            </Text>
          </Divider>
          <VStack spacing={4}>
            <Button
              variant="outline"
              leftIcon={<IconBrandFacebook />}
              w="100%"
              h="54px"
              onClick={() => handleOAuthSignup('facebook')}
              isDisabled={isLoading}
            >
              使用 Facebook 註冊
            </Button>
            <Button
              variant="outline"
              leftIcon={<IconBrandGoogle />}
              w="100%"
              h="54px"
              onClick={() => handleOAuthSignup('google')}
              isDisabled={isLoading}
            >
              使用 Google 註冊
            </Button>
            <Button
              variant="outline"
              leftIcon={<IconBrandApple />}
              w="100%"
              h="54px"
              onClick={() => handleOAuthSignup('apple')}
              isDisabled={isLoading}
            >
              使用 Apple ID 註冊
            </Button>
          </VStack>
          <Flex
            direction="column"
            align="center"
            gap={4}
            mt={4}
          >
            <Text
              fontSize="14px"
              color="gray.500"
            >
              註冊即表示同意
            </Text>
            <Flex gap={1}>
              <Button
                variant="link"
                color="primary.500"
                onClick={() => goToNavigation("/terms")}
              >
                用戶協議
              </Button>
              <Text>和</Text>
              <Button
                variant="link"
                color="primary.500"
                onClick={() => goToNavigation("/privacy")}
              >
                隱私政策
              </Button>
            </Flex>
            <Flex gap={1}>
              <Text color="gray.500">
                已有帳號？
              </Text>
              <Button
                variant="link"
                color="primary.500"
                onClick={() => goToNavigation("/login")}
              >
                立即登入
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
};

export default Register;
