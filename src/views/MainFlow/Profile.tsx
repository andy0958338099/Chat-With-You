//@ts-nocheck

import React, { useState } from 'react';
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
  Input 
} from '@chakra-ui/react';
import { 
  IconCopy, 
  IconEdit, 
  IconRobot, 
  IconCoin, 
  IconSettings, 
  IconPlus, 
  IconShare, 
  IconHelp 
} from '@tabler/icons-react';
import { kStyleGlobal } from '../../theme';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const goToNavigation = (path: string) => {
    navigate(path);
  };

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
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
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
                  张三
                </Text>
                <Flex
                  align="center"
                  gap={2}
                >
                  <Text
                    color="gray.500"
                  >
                    ID: 12345678
                  </Text>
                  <IconCopy
                    size={16}
                    color="gray.500"
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
                3个
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
                账单与订阅
              </Text>
              <Text
                color="gray.500"
                fontSize="sm"
              >
                1000积分
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
                设置
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
              创建AI助手
            </Button>
            <Button
              leftIcon={<IconShare />}
              variant="ghost"
              justifyContent="flex-start"
              onClick={() => setIsModalOpen(true)}
            >
              邀请好友
            </Button>
            <Button
              leftIcon={<IconHelp />}
              variant="ghost"
              justifyContent="flex-start"
              onClick={() => goToNavigation("/help")}
            >
              帮助中心
            </Button>
          </Flex>
          <Button
            colorScheme="red"
            variant="outline"
            mt={4}
            onClick={() => goToNavigation("/login")}
          >
            退出登录
          </Button>
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                邀请好友
              </ModalHeader>
              <ModalBody>
                <Flex
                  direction="column"
                  gap={4}
                >
                  <Input
                    value="INVITE123"
                    isReadOnly
                  />
                  <Text
                    color="gray.500"
                  >
                    分享此邀请码给你的好友
                  </Text>
                </Flex>
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={() => setIsModalOpen(false)}
                >
                  关闭
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
