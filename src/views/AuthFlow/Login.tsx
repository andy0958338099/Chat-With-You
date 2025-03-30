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
  Divider 
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

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/ai-assistant-setup');
  };

  const handleOAuthLogin = (provider: string) => {
    navigate(`/oauth/${provider}`);
  };

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
              欢迎使用 ChatterMind
            </Text>
          </Flex>
          <Box
            bg="white"
            borderRadius="2xl"
            p={8}
            boxShadow="lg"
          >
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
                    placeholder="邮箱地址"
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
                    placeholder="密码"
                    pl={12}
                    pr={12}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                    记住我
                  </Checkbox>
                  <Button
                    variant="ghost"
                    color="primary.500"
                    onClick={() => navigate('/forgot-password')}
                  >
                    忘记密码？
                  </Button>
                </Flex>
                <Button
                  w="100%"
                  size="lg"
                  onClick={handleLogin}
                >
                  登录
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
                其他登录方式
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
              >
                <IconBrandFacebook size={24} />
              </Button>
              <Button
                variant="ghost"
                borderRadius="full"
                onClick={() => handleOAuthLogin('google')}
              >
                <IconBrandGoogle size={24} />
              </Button>
              <Button
                variant="ghost"
                borderRadius="full"
                onClick={() => handleOAuthLogin('apple')}
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
              还没有账号？
            </Text>
            <Button
              variant="ghost"
              color="primary.500"
              onClick={() => navigate('/register')}
            >
              立即注册
            </Button>
          </Flex>
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default Login;
