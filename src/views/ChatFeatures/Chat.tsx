//@ts-nocheck

import React, { useState } from 'react';
import { 
  ChakraProvider, 
  Flex, 
  Button, 
  Avatar, 
  Text, 
  Box, 
  InputGroup, 
  Input, 
  InputRightElement, 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  ModalCloseButton,
  Switch,
  Select
} from '@chakra-ui/react';
import { IconArrowLeft, IconSettings, IconSmile, IconPaperclip } from '@tabler/icons-react';
import { kStyleGlobal } from '../../theme';
import { useNavigate } from 'react-router-dom';

const Chat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      sender: "AI",
      content: "欢迎使用ChatterMind! 我是你的AI助手。",
      time: "09:00",
      avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12"
    },
    {
      sender: "user",
      content: "你好!很高兴认识你",
      time: "09:01",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb"
    }
  ]);

  const [isAIEnabled, setIsAIEnabled] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");

  const sendMessage = () => {
    if (inputMessage.trim() !== "") {
      const newMessages = [...messages, {
        sender: "user",
        content: inputMessage,
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb"
      }];
      
      setMessages(newMessages);
      setInputMessage("");

      if (isAIEnabled) {
        setTimeout(() => {
          setMessages([...newMessages, {
            sender: "AI",
            content: "这是AI助手的自动回复。",
            time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
            avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12"
          }]);
        }, 1000);
      }
    }
  };

  return (
    <ChakraProvider theme={kStyleGlobal}>
      <Flex
        direction="column"
        h="100vh"
        bg="background"
      >
        <Flex
          px={4}
          py={3}
          bg="white"
          borderBottomWidth="1px"
          borderColor="gray.200"
          justify="space-between"
          align="center"
          position="sticky"
          top={0}
          zIndex={10}
        >
          <Flex
            align="center"
            gap={3}
          >
            <Button
              variant="ghost"
              p={0}
              onClick={() => navigate(-1)}
            >
              <IconArrowLeft size={24} />
            </Button>
            <Flex
              align="center"
              gap={2}
            >
              <Avatar
                size="sm"
                src="https://images.unsplash.com/photo-1527980965255-d3b416303d12"
              />
              <Text fontWeight="bold">
                AI助手
              </Text>
            </Flex>
          </Flex>
          <Flex gap={2} align="center">
            <Switch
              isChecked={isAIEnabled}
              onChange={() => setIsAIEnabled(!isAIEnabled)}
            />
            <Text>{isAIEnabled ? "AI已启用" : "AI已禁用"}</Text>
            <Button
              variant="ghost"
              p={2}
              onClick={() => setIsSettingsOpen(true)}
            >
              <IconSettings size={20} />
            </Button>
          </Flex>
        </Flex>

        <Flex
          flex={1}
          direction="column"
          px={4}
          py={4}
          overflowY="auto"
          gap={4}
        >
          {messages.map((message, index) => (
            <Flex
              key={index}
              justify={message.sender === "user" ? "flex-end" : "flex-start"}
              gap={2}
            >
              {message.sender !== "user" && (
                <Avatar
                  size="sm"
                  src={message.avatar}
                />
              )}
              <Box
                bg={message.sender === "user" ? "primary.500" : "gray.100"}
                color={message.sender === "user" ? "white" : "black"}
                px={4}
                py={2}
                borderRadius="xl"
                maxW="70%"
              >
                <Text>{message.content}</Text>
              </Box>
              {message.sender === "user" && (
                <Avatar
                  size="sm"
                  src={message.avatar}
                />
              )}
            </Flex>
          ))}
        </Flex>

        <Flex
          p={4}
          bg="white"
          borderTopWidth="1px"
          borderColor="gray.200"
          gap={3}
        >
          <InputGroup flex={1}>
            <Input
              placeholder="输入消息..."
              borderRadius="full"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <InputRightElement>
              <Button
                variant="ghost"
                p={1}
              >
                <IconSmile size={20} />
              </Button>
            </InputRightElement>
          </InputGroup>
          <Flex gap={2}>
            <Button
              variant="ghost"
              p={2}
            >
              <IconPaperclip size={20} />
            </Button>
            <Button
              colorScheme="primary"
              borderRadius="full"
              px={6}
              onClick={sendMessage}
            >
              发送
            </Button>
          </Flex>
        </Flex>

        <Modal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Text fontWeight="bold">AI助手设置</Text>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex
                direction="column"
                gap={4}
              >
                <Flex
                  justify="space-between"
                  align="center"
                >
                  <Text>启用AI助手</Text>
                  <Switch
                    isChecked={isAIEnabled}
                    onChange={() => setIsAIEnabled(!isAIEnabled)}
                  />
                </Flex>
                <Select placeholder="选择AI模式">
                  <option value="creative">创意模式</option>
                  <option value="professional">专业模式</option>
                </Select>
              </Flex>
            </ModalBody>
            <ModalFooter>
              <Button onClick={() => setIsSettingsOpen(false)}>
                完成
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </ChakraProvider>
  );
};

export default Chat;
