//@ts-nocheck

import React, { useState, useEffect } from 'react';
import { 
  ChakraProvider, 
  Flex, 
  Text, 
  Button, 
  InputGroup, 
  InputLeftElement, 
  Input, 
  Grid, 
  Box, 
  Avatar, 
  Tag, 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  Stack, 
  AlertDialog, 
  AlertDialogOverlay, 
  AlertDialogContent, 
  AlertDialogHeader, 
  AlertDialogBody, 
  AlertDialogFooter 
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { 
  IconPlus, 
  IconSearch, 
  IconEdit, 
  IconTrash,
  IconUser
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { kStyleGlobal } from '../../theme';
import { getCurrentUser } from '../../services/supabase';

const MyAIAssistants = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAssistant, setSelectedAssistant] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 載入用戶資料
    const loadUserProfile = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          setUserProfile(user);
        }
      } catch (error) {
        console.error('載入用戶資料失敗:', error);
      }
    };
    
    loadUserProfile();
  }, []);

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const assistants = [
    {
      name: "工作助理",
      icon: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7",
      type: "工作",
      lastUsed: "2小時前"
    },
    {
      name: "學習夥伴",
      icon: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d",
      type: "學習",
      lastUsed: "昨天"
    },
    {
      name: "創意助手",
      icon: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead",
      type: "娛樂",
      lastUsed: "3天前"
    }
  ];

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
          <Text
            fontSize="24px"
            fontWeight="bold"
          >
            我的AI助手
          </Text>
          <Flex gap={3} align="center">
            <Box 
              onClick={handleProfileClick}
              cursor="pointer"
            >
              {userProfile?.avatar_url ? (
                <Avatar 
                  size="sm" 
                  src={userProfile.avatar_url} 
                  name={userProfile.name || "用戶"}
                />
              ) : (
                <IconUser size={24} />
              )}
            </Box>
            <Button
              onClick={() => navigate("/create-ai-assistant")}
              bg="primary.500"
              color="white"
              borderRadius="full"
              w={10}
              h={10}
              display="flex"
              alignItems="center"
              justifyContent="center"
              p={0}
            >
              <IconPlus size={20} />
            </Button>
          </Flex>
        </Flex>

        <InputGroup mb={6}>
          <InputLeftElement
            pointerEvents="none"
            pl={4}
          >
            <IconSearch color="gray.400" />
          </InputLeftElement>
          <Input
            pl={12}
            placeholder="搜索AI助手"
            borderRadius="full"
            bg="gray.50"
          />
        </InputGroup>

        <Flex
          overflowX="auto"
          mb={6}
          css={{
            "scrollbarWidth": "none",
            "&::-webkit-scrollbar": {
              "display": "none"
            }
          }}
        >
          <Flex gap={3} pb={2}>
            {["全部", "工作", "學習", "娛樂"].map(tag => (
              <Button
                key={tag}
                px={6}
                py={2}
                borderRadius="full"
                bg={tag === "全部" ? "primary.500" : "white"}
                color={tag === "全部" ? "white" : "gray.600"}
                boxShadow="sm"
              >
                <Text>{tag}</Text>
              </Button>
            ))}
          </Flex>
        </Flex>

        <Grid
          templateColumns="repeat(auto-fill, minmax(160px, 1fr))"
          gap={6}
          overflow="auto"
        >
          {assistants.map(assistant => (
            <motion.div
              key={assistant.name}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Box
                bg="white"
                p={4}
                borderRadius="xl"
                boxShadow="sm"
                onClick={() => navigate("/ai-assistant-settings")}
                cursor="pointer"
                position="relative"
                onContextMenu={(e) => {
                  e.preventDefault();
                  setSelectedAssistant(assistant);
                  setIsEditModalOpen(true);
                }}
              >
                <Avatar
                  src={assistant.icon}
                  size="xl"
                  mb={3}
                  mx="auto"
                />
                <Text
                  fontSize="16px"
                  fontWeight="bold"
                  textAlign="center"
                  display="block"
                  mb={2}
                >
                  {assistant.name}
                </Text>
                <Flex justify="center" gap={2} mb={2}>
                  <Tag size="sm" colorScheme="primary">
                    <Text>{assistant.type}</Text>
                  </Tag>
                </Flex>
                <Text
                  fontSize="12px"
                  color="gray"
                  textAlign="center"
                  display="block"
                >
                  {assistant.lastUsed}
                </Text>
              </Box>
            </motion.div>
          ))}
        </Grid>

        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Text>AI助手操作</Text>
            </ModalHeader>
            <ModalBody>
              <Stack spacing={4}>
                <Button onClick={() => navigate("/edit-ai-assistant")}>
                  <Flex align="center" gap={2}>
                    <IconEdit />
                    <Text>編輯</Text>
                  </Flex>
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => {
                    setIsDeleteModalOpen(true);
                    setIsEditModalOpen(false);
                  }}
                >
                  <Flex align="center" gap={2}>
                    <IconTrash />
                    <Text>刪除</Text>
                  </Flex>
                </Button>
              </Stack>
            </ModalBody>
          </ModalContent>
        </Modal>

        <AlertDialog
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
        >
          <AlertDialogOverlay />
          <AlertDialogContent>
            <AlertDialogHeader>
              <Text>確認刪除</Text>
            </AlertDialogHeader>
            <AlertDialogBody>
              <Text>確定要刪除這個AI助手嗎？此操作無法撤銷。</Text>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={() => setIsDeleteModalOpen(false)}>
                <Text>取消</Text>
              </Button>
              <Button colorScheme="red" ml={3}>
                <Text>刪除</Text>
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Flex>
    </ChakraProvider>
  );
};

export default MyAIAssistants;
