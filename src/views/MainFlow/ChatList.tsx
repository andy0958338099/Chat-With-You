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
  Avatar, 
  Circle,
  Box
} from '@chakra-ui/react';
import { IconPlus, IconSearch, IconUser } from '@tabler/icons-react';
import { kStyleGlobal } from '../../theme';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../services/supabase';

const ChatList = () => {
  const [showEmptyState, setShowEmptyState] = useState(false);
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

  const chats = [
    {
      "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      "name": "Alice",
      "lastMessage": "嗨！最近好嗎？",
      "time": "10:30",
      "unread": 2
    },
    {
      "avatar": "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
      "name": "Bob",
      "lastMessage": "我剛剛發送了文件給你",
      "time": "昨天",
      "unread": 0
    },
    {
      "avatar": "A",
      "name": "AI 助手",
      "lastMessage": "有什麼我可以幫助你的？",
      "time": "週一",
      "unread": 1
    },
    {
      "avatar": "工",
      "name": "工作群組",
      "lastMessage": "會議時間更改到下午3點",
      "time": "週日",
      "unread": 5
    }
  ];

  const handleAddContact = () => {
    navigate('/add-contact');
  };

  const handleChatClick = (index) => {
    navigate('/chat/' + index);
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <ChakraProvider theme={kStyleGlobal}>
      <Flex
        direction="column"
        h="100vh"
        bg="background"
      >
        <Flex
          justify="space-between"
          align="center"
          p={4}
          borderBottom="1px"
          borderColor="gray.100"
        >
          <Text
            fontSize="18px"
            fontWeight="600"
          >
            最近對話
          </Text>
          <Flex gap={3}>
            <Button
              variant="ghost"
              onClick={handleAddContact}
              p={0}
            >
              <IconPlus size={24} />
            </Button>
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
          </Flex>
        </Flex>

        <InputGroup p={4}>
          <InputLeftElement
            pointerEvents="none"
            pl={4}
          >
            <IconSearch
              color="gray.400"
              size={20}
            />
          </InputLeftElement>
          <Input
            pl={12}
            placeholder="搜索"
            borderRadius="full"
            bg="gray.50"
          />
        </InputGroup>

        {showEmptyState ? (
          <Flex
            direction="column"
            align="center"
            justify="center"
            flex={1}
            p={8}
            gap={4}
          >
            <img
              src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61"
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "20px"
              }}
              alt="Empty state"
            />
            <Text
              fontSize="18px"
              fontWeight="500"
              color="gray.600"
            >
              開始你的第一次聊天吧！
            </Text>
            <Button
              colorScheme="primary"
              onClick={handleAddContact}
            >
              開始聊天
            </Button>
          </Flex>
        ) : (
          <Flex
            direction="column"
            flex={1}
            overflowY="auto"
            px={4}
            gap={2}
          >
            {chats.map((chat, index) => (
              <Flex
                key={index}
                justify="space-between"
                align="center"
                p={3}
                borderRadius="xl"
                bg="white"
                onClick={() => handleChatClick(index)}
                _hover={{
                  bg: "gray.50"
                }}
                cursor="pointer"
              >
                <Flex
                  gap={3}
                  align="center"
                >
                  <Avatar
                    src={chat.avatar}
                    name={chat.name}
                    size="md"
                  />
                  <Flex direction="column">
                    <Text
                      fontWeight="500"
                    >
                      {chat.name}
                    </Text>
                    <Text
                      fontSize="14px"
                      color="gray.500"
                    >
                      {chat.lastMessage}
                    </Text>
                  </Flex>
                </Flex>
                <Flex
                  direction="column"
                  align="flex-end"
                  gap={2}
                >
                  <Text
                    fontSize="12px"
                    color="gray.500"
                  >
                    {chat.time}
                  </Text>
                  {chat.unread > 0 && (
                    <Circle
                      size="20px"
                      bg="primary.500"
                      color="white"
                      fontSize="12px"
                    >
                      {chat.unread}
                    </Circle>
                  )}
                </Flex>
              </Flex>
            ))}
          </Flex>
        )}
      </Flex>
    </ChakraProvider>
  );
};

export default ChatList;
