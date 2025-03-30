//@ts-nocheck

import React, { useState } from 'react';
import { 
  ChakraProvider, 
  Flex, 
  Box, 
  Image, 
  Text, 
  FormControl, 
  InputGroup, 
  InputLeftElement, 
  Input, 
  InputRightElement, 
  Button, 
  Checkbox, 
  Divider,
  useToast,
  Alert,
  AlertIcon
} from '@chakra-ui/react';
import { 
  IconMail, 
  IconLock, 
  IconEye, 
  IconEyeOff, 
  IconBrandFacebook, 
  IconBrandGoogle, 
  IconBrandApple 
} from '@tabler/icons-react';
import { kStyleGlobal } from '../../theme';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { setToken, setUserData } from '../../utils/localStorage';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const toast = useToast();
  const { login, socialLogin, error, clearError } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      toast({
        title: '請填寫完整資訊',
        description: '電子郵件和密碼不能為空',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setIsLoading(true);
      const success = await login(email, password);
      
      if (success) {
        toast({
          title: '登入成功',
          description: '歡迎回來！',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        
        if (rememberMe) {
          // 將登入信息保存到本地存儲（僅保存電子郵件，密碼仍需每次手動輸入）
          localStorage.setItem('savedEmail', email);
        }

        // 導航到主頁或應用程序的主界面
        navigate('/chat-list');
      }
    } catch (err) {
      console.error('登入時出錯:', err);
      toast({
        title: '登入失敗',
        description: error || '請檢查您的憑證並重試',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: 'google' | 'facebook' | 'apple') => {
    try {
      clearError();
      setIsLoading(true);
      const success = await socialLogin(provider);
      
      if (!success) {
        toast({
          title: '登入失敗',
          description: `無法使用 ${provider} 登入，請稍後再試`,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
      // 社交登入成功後，用戶將被重定向到OAuth提供商，
      // 成功後將返回應用，並在AuthContext中處理
    } catch (err) {
      console.error(`${provider} 登入失敗:`, err);
      toast({
        title: '登入失敗',
        description: `無法使用 ${provider} 登入，請稍後再試`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 檢查本地存儲是否有保存的電子郵件
  React.useEffect(() => {
    const savedEmail = localStorage.getItem('savedEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  return (
    <ChakraProvider theme={kStyleGlobal}>
      <Flex
        minH="100vh"
        direction="column"
        bg="linear-gradient(120deg, #b8f5b8 0%, #FFE566 100%)"
      >
        <Box
          maxW="480px"
          w="100%"
          mx="auto"
          pt={20}
          px={6}
        >
          <Flex
            direction="column"
            align="center"
            mb={8}
          >
            <Image
              src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=200"
              width="120px"
              height="120px"
              objectFit="cover"
              mb={8}
            />
            <Text
              fontSize="2xl"
              fontWeight="bold"
              mb={4}
            >
              歡迎使用 Chat-With-You
            </Text>
          </Flex>
          <Box
            bg="white"
            borderRadius="2xl"
            p={8}
            boxShadow="lg"
          >
            {error && (
              <Alert status="error" mb={4} borderRadius="md">
                <AlertIcon />
                {error}
              </Alert>
            )}
            
            <FormControl>
              <Flex direction="column" gap={4}>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    pl={4}
                  >
                    <IconMail color="gray.400" size={20} />
                  </InputLeftElement>
                  <Input
                    type="email"
                    placeholder="電子郵件地址"
                    pl={12}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    pl={4}
                  >
                    <IconLock color="gray.400" size={20} />
                  </InputLeftElement>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="密碼"
                    pl={12}
                    pr={12}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleLogin();
                      }
                    }}
                  />
                  <InputRightElement>
                    <Button
                      variant="ghost"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <IconEyeOff size={20} />
                      ) : (
                        <IconEye size={20} />
                      )}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <Flex
                  justify="space-between"
                  align="center"
                  mb={2}
                >
                  <Checkbox
                    isChecked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  >
                    記住我
                  </Checkbox>
                  <Button
                    variant="ghost"
                    color="primary.500"
                    onClick={() => navigate('/forgot-password')}
                  >
                    忘記密碼？
                  </Button>
                </Flex>
                <Button
                  w="100%"
                  size="lg"
                  onClick={handleLogin}
                  isLoading={isLoading}
                  loadingText="登入中..."
                  colorScheme="green"
                >
                  登入
                </Button>
              </Flex>
            </FormControl>
            <Flex
              align="center"
              my={8}
              gap={4}
            >
              <Divider flex={1} />
              <Text color="gray.500">
                其他登入方式
              </Text>
              <Divider flex={1} />
            </Flex>
            <Flex
              justify="center"
              gap={6}
            >
              <Button
                variant="ghost"
                borderRadius="full"
                onClick={() => handleOAuthLogin('facebook')}
                isDisabled={isLoading}
              >
                <IconBrandFacebook size={24} />
              </Button>
              <Button
                variant="ghost"
                borderRadius="full"
                onClick={() => handleOAuthLogin('google')}
                isDisabled={isLoading}
              >
                <IconBrandGoogle size={24} />
              </Button>
              <Button
                variant="ghost"
                borderRadius="full"
                onClick={() => handleOAuthLogin('apple')}
                isDisabled={isLoading}
              >
                <IconBrandApple size={24} />
              </Button>
            </Flex>
          </Box>
          <Flex
            justify="center"
            mt={6}
            gap={2}
          >
            <Text color="gray.600">
              還沒有帳號？
            </Text>
            <Button
              variant="ghost"
              color="primary.500"
              onClick={() => navigate('/register')}
            >
              立即註冊
            </Button>
          </Flex>
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default Login;
