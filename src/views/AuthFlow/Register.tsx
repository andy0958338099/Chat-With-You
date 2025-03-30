//@ts-nocheck

import React from 'react';
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
  Divider
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

const Register = () => {
  const navigate = useNavigate();

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
            注册
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
          <form>
            <VStack spacing={4}>
              <Box>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<IconUser color="gray.400" />}
                    pl={4}
                  />
                  <Input
                    pl={12}
                    placeholder="用户名"
                    type="text"
                  />
                </InputGroup>
              </Box>
              <Box>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<IconMail color="gray.400" />}
                    pl={4}
                  />
                  <Input
                    pl={12}
                    placeholder="电子邮箱"
                    type="email"
                  />
                </InputGroup>
              </Box>
              <Box>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<IconLock color="gray.400" />}
                    pl={4}
                  />
                  <Input
                    pl={12}
                    placeholder="密码"
                    type="password"
                  />
                </InputGroup>
              </Box>
              <Box>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<IconLock color="gray.400" />}
                    pl={4}
                  />
                  <Input
                    pl={12}
                    placeholder="确认密码"
                    type="password"
                  />
                </InputGroup>
              </Box>
              <Button
                bg="primary.500"
                color="white"
                size="lg"
                w="100%"
                h="54px"
                onClick={() => goToNavigation("/ai-assistant-setup")}
              >
                注册
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
            >
              使用 Facebook 注册
            </Button>
            <Button
              variant="outline"
              leftIcon={<IconBrandGoogle />}
              w="100%"
              h="54px"
            >
              使用 Google 注册
            </Button>
            <Button
              variant="outline"
              leftIcon={<IconBrandApple />}
              w="100%"
              h="54px"
            >
              使用 Apple ID 注册
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
              注册即表示同意
            </Text>
            <Flex gap={1}>
              <Button
                variant="link"
                color="primary.500"
                onClick={() => goToNavigation("/terms")}
              >
                用户协议
              </Button>
              <Text>和</Text>
              <Button
                variant="link"
                color="primary.500"
                onClick={() => goToNavigation("/privacy")}
              >
                隐私政策
              </Button>
            </Flex>
            <Flex gap={1}>
              <Text color="gray.500">
                已有账号？
              </Text>
              <Button
                variant="link"
                color="primary.500"
                onClick={() => goToNavigation("/login")}
              >
                立即登录
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
};

export default Register;
