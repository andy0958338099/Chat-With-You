//@ts-nocheck

import React, { useState } from 'react';
import { 
  ChakraProvider, 
  Flex, 
  Text, 
  Button, 
  InputGroup, 
  InputLeftElement, 
  Input, 
  Avatar, 
  Circle 
} from '@chakra-ui/react';
import { IconPlus, IconSearch } from '@tabler/icons-react';
import { kStyleGlobal } from '../../theme';
import { useNavigate } from 'react-router-dom';

const ChatList = () => {
  const [showEmptyState, setShowEmptyState] = useState(false);
  const navigate = useNavigate();

  const chats = [
    {
      "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      "name": "小明",
      "lastMessage": "好的,下次见!",
      "time": "14:30",
      "unread": 2
    },
    {
      "avatar": "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
      "name": "工作群",
      "lastMessage": "项目进度更新...",
      "time": "13:45",
      "unread": 5
    },
    {
      "avatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
      "name": "家人群",
      "lastMessage": "晚上吃什么?",
      "time": "12:20",
      "unread": 0
    }
  ];

  const handleAddContact = () => {
    navigate('/add-contact');
  };

  const handleChatClick = () => {
    navigate('/chat');
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
            聊天列表
          </Text>
          <Button
            variant="ghost"
            onClick={handleAddContact}
          >
            <IconPlus size={24} />
          </Button>
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
              开始你的第一次聊天吧！
            </Text>
            <Button
              colorScheme="primary"
              onClick={handleAddContact}
            >
              开始聊天
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
                onClick={handleChatClick}
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
