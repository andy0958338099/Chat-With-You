//@ts-nocheck

import React, { useState, useEffect } from 'react';
import { 
  ChakraProvider, 
  Box, 
  Flex, 
  Avatar, 
  Text, 
  Grid, 
  Button, 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  Input,
  useToast,
  Spinner
} from '@chakra-ui/react';
import { 
  IconCopy, 
  IconEdit, 
  IconRobot, 
  IconCoin, 
  IconSettings, 
  IconPlus, 
  IconShare, 
  IconHelp,
  IconLogout
} from '@tabler/icons-react';
import { kStyleGlobal } from '../../theme';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, signOut } from '../../services/supabase';
import { UserProfile } from '../../services/supabase';

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const navigate = useNavigate();
  const toast = useToast();
  const inviteCode = "CWY" + Math.random().toString(36).substring(2, 8).toUpperCase();

  useEffect(() => {
    // 載入用戶資料
    const loadUserProfile = async () => {
      try {
        setIsLoading(true);
        const user = await getCurrentUser();
        if (user) {
          setUserProfile(user);
        } else {
          // 若未登入則重定向到登入頁
          navigate('/login');
        }
      } catch (error) {
        toast({
          title: '載入資料失敗',
          description: '無法載入您的個人資料，請稍後再試',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        console.error('載入用戶資料失敗:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUserProfile();
  }, [navigate, toast]);

  const goToNavigation = (path: string) => {
    navigate(path);
  };

  const handleLogout = async () => {
    try {
      const success = await signOut();
      if (success) {
        toast({
          title: '登出成功',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        navigate('/login');
      } else {
        toast({
          title: '登出失敗',
          description: '請稍後再試',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: '發生錯誤',
        description: '登出時發生錯誤，請稍後再試',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.error('登出錯誤:', error);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: '已複製到剪貼簿',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  if (isLoading) {
    return (
      <ChakraProvider theme={kStyleGlobal}>
        <Flex 
          justify="center" 
          align="center" 
          minH="100vh" 
          bg="background"
        >
          <Spinner size="xl" color="primary.500" />
        </Flex>
      </ChakraProvider>
    );
  }

  return (
    <ChakraProvider theme={kStyleGlobal}>
      <Box
        bg="background"
        minH="100vh"
      >
        <Flex
          direction="column"
          maxW="container.md"
          mx="auto"
          p={4}
          gap={6}
        >
          <Flex
            justify="space-between"
            align="center"
          >
            <Flex
              gap={4}
              align="center"
            >
              <Avatar
                size="lg"
                src={userProfile?.avatar_url || "https://bit.ly/broken-link"}
                name={userProfile?.name || "用戶"}
                cursor="pointer"
                onClick={() => goToNavigation("/edit-profile")}
              />
              <Flex
                direction="column"
                gap={1}
              >
                <Text
                  fontSize="xl"
                  fontWeight="bold"
                >
                  {userProfile?.name || "未知用戶"}
                </Text>
                <Flex
                  align="center"
                  gap={2}
                  cursor="pointer"
                  onClick={() => copyToClipboard(userProfile?.id || "")}
                >
                  <Text
                    color="gray.500"
                    fontSize="sm"
                  >
                    ID: {userProfile?.id ? userProfile.id.substring(0, 8) + '...' : '未知'}
                  </Text>
                  <IconCopy
                    size={16}
                    color="gray"
                  />
                </Flex>
              </Flex>
            </Flex>
            <IconEdit
              size={24}
              cursor="pointer"
              onClick={() => goToNavigation("/edit-profile")}
            />
          </Flex>
          <Grid
            templateColumns="repeat(3, 1fr)"
            gap={4}
          >
            <Flex
              direction="column"
              bg="primary.50"
              p={4}
              borderRadius="xl"
              align="center"
              cursor="pointer"
              onClick={() => goToNavigation("/my-ai-assistants")}
            >
              <IconRobot size={24} />
              <Text mt={2}>
                我的AI助手
              </Text>
              <Text
                color="gray.500"
                fontSize="sm"
              >
                {userProfile?.aiAssistants ? userProfile.aiAssistants.length : 0}個
              </Text>
            </Flex>
            <Flex
              direction="column"
              bg="primary.50"
              p={4}
              borderRadius="xl"
              align="center"
              cursor="pointer"
              onClick={() => goToNavigation("/billing-subscription")}
            >
              <IconCoin size={24} />
              <Text mt={2}>
                帳單與訂閱
              </Text>
              <Text
                color="gray.500"
                fontSize="sm"
              >
                {userProfile?.credits || 0}積分
              </Text>
            </Flex>
            <Flex
              direction="column"
              bg="primary.50"
              p={4}
              borderRadius="xl"
              align="center"
              cursor="pointer"
              onClick={() => goToNavigation("/settings")}
            >
              <IconSettings size={24} />
              <Text mt={2}>
                設定
              </Text>
            </Flex>
          </Grid>
          <Flex
            direction="column"
            gap={4}
          >
            <Text
              fontSize="lg"
              fontWeight="bold"
            >
              快捷功能
            </Text>
            <Button
              leftIcon={<IconPlus />}
              variant="ghost"
              justifyContent="flex-start"
              onClick={() => goToNavigation("/create-ai-assistant")}
            >
              建立AI助手
            </Button>
            <Button
              leftIcon={<IconShare />}
              variant="ghost"
              justifyContent="flex-start"
              onClick={() => setIsModalOpen(true)}
            >
              邀請好友
            </Button>
            <Button
              leftIcon={<IconHelp />}
              variant="ghost"
              justifyContent="flex-start"
              onClick={() => goToNavigation("/ai-assistant-setup")}
            >
              幫助中心
            </Button>
          </Flex>
          <Button
            leftIcon={<IconLogout />}
            colorScheme="red"
            variant="outline"
            mt={4}
            onClick={handleLogout}
          >
            登出
          </Button>
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                邀請好友
              </ModalHeader>
              <ModalBody>
                <Flex
                  direction="column"
                  gap={4}
                >
                  <Input
                    value={inviteCode}
                    isReadOnly
                    onClick={() => copyToClipboard(inviteCode)}
                  />
                  <Text
                    color="gray.500"
                  >
                    分享此邀請碼給你的好友，雙方可獲得500積分獎勵
                  </Text>
                </Flex>
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={() => copyToClipboard(inviteCode)}
                >
                  複製邀請碼
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setIsModalOpen(false)}
                >
                  關閉
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Flex>
      </Box>
    </ChakraProvider>
  );
};

export default Profile;
