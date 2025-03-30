//@ts-nocheck

import React, { useState } from 'react';
import { 
  ChakraProvider, 
  Flex, 
  Box, 
  Button, 
  Text, 
  Switch, 
  Divider, 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  ModalCloseButton,
  Input
} from '@chakra-ui/react';
import { IconArrowLeft, IconChevronRight } from '@tabler/icons-react';
import { kStyleGlobal } from '../../theme';
import { useNavigate } from 'react-router-dom';

const NotificationSettings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTimeStart, setSelectedTimeStart] = useState("22:00");
  const [selectedTimeEnd, setSelectedTimeEnd] = useState("07:00");
  const navigate = useNavigate();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <ChakraProvider theme={kStyleGlobal}>
      <Flex
        direction="column"
        h="100vh"
        bg="background"
        position="relative"
      >
        <Flex
          p={4}
          borderBottomWidth="1px"
          borderColor="borderColor"
          align="center"
          justify="space-between"
        >
          <Button
            p={0}
            variant="ghost"
            onClick={handleGoBack}
          >
            <IconArrowLeft size={20} />
          </Button>
          <Text
            fontSize="18px"
            fontWeight="600"
          >
            通知设置
          </Text>
          <Box w="20px" />
        </Flex>
        <Flex
          direction="column"
          p={4}
          gap={6}
          overflowY="auto"
          flex={1}
        >
          <Box>
            <Flex
              justify="space-between"
              align="center"
              mb={4}
            >
              <Text fontWeight="600">
                接收通知
              </Text>
              <Switch
                defaultChecked
                colorScheme="primary"
              />
            </Flex>
            <Flex
              direction="column"
              gap={3}
              ml={4}
            >
              {["新消息通知", "群聊提醒", "AI助手互动提醒", "系统通知"].map(item => (
                <Flex
                  key={item}
                  justify="space-between"
                  align="center"
                >
                  <Text>{item}</Text>
                  <Switch
                    defaultChecked
                    colorScheme="primary"
                  />
                </Flex>
              ))}
            </Flex>
          </Box>
          <Divider />
          <Box>
            <Text
              fontWeight="600"
              marginBottom="16px"
            >
              通知方式设置
            </Text>
            <Flex
              direction="column"
              gap={3}
            >
              {["声音", "振动", "通知预览"].map(item => (
                <Flex
                  key={item}
                  justify="space-between"
                  align="center"
                >
                  <Text>{item}</Text>
                  <Switch
                    defaultChecked
                    colorScheme="primary"
                  />
                </Flex>
              ))}
            </Flex>
          </Box>
          <Divider />
          <Box>
            <Flex
              direction="column"
              gap={4}
            >
              <Flex
                justify="space-between"
                align="center"
              >
                <Text fontWeight="600">
                  开启免打扰模式
                </Text>
                <Switch
                  colorScheme="primary"
                  onChange={toggleModal}
                />
              </Flex>
              <Button
                variant="ghost"
                onClick={toggleModal}
                justifyContent="space-between"
                w="100%"
              >
                <Text>免打扰时段设置</Text>
                <IconChevronRight size={20} />
              </Button>
              <Text
                color="gray.500"
                fontSize="14px"
              >
                当前设置: 22:00 - 07:00
              </Text>
            </Flex>
          </Box>
          <Divider />
          <Box>
            <Text
              fontWeight="600"
              marginBottom="16px"
            >
              自定义通知
            </Text>
            <Flex
              direction="column"
              gap={3}
            >
              <Button
                variant="ghost"
                onClick={() => handleNavigation("/contacts")}
                justifyContent="space-between"
                w="100%"
              >
                <Text>联系人通知自定义</Text>
                <IconChevronRight size={20} />
              </Button>
              <Button
                variant="ghost"
                onClick={() => handleNavigation("/chat-list")}
                justifyContent="space-between"
                w="100%"
              >
                <Text>群组通知自定义</Text>
                <IconChevronRight size={20} />
              </Button>
            </Flex>
          </Box>
          <Text
            color="gray.500"
            fontSize="14px"
            textAlign="center"
            padding="16px"
          >
            合理设置通知可以帮助您更好地管理信息，不错过重要消息的同时也能避免打扰。
          </Text>
        </Flex>
        <Modal
          isOpen={isModalOpen}
          onClose={toggleModal}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Text fontWeight="600">
                设置免打扰时段
              </Text>
            </ModalHeader>
            <ModalBody>
              <Flex
                direction="column"
                gap={4}
              >
                <Flex
                  justify="space-between"
                  align="center"
                >
                  <Text>开始时间</Text>
                  <Input
                    type="time"
                    value={selectedTimeStart}
                    w="120px"
                    onChange={(e) => setSelectedTimeStart(e.target.value)}
                  />
                </Flex>
                <Flex
                  justify="space-between"
                  align="center"
                >
                  <Text>结束时间</Text>
                  <Input
                    type="time"
                    value={selectedTimeEnd}
                    w="120px"
                    onChange={(e) => setSelectedTimeEnd(e.target.value)}
                  />
                </Flex>
              </Flex>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="ghost"
                onClick={toggleModal}
              >
                <Text>取消</Text>
              </Button>
              <Button
                onClick={toggleModal}
                colorScheme="primary"
              >
                <Text>确定</Text>
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </ChakraProvider>
  );
};

export default NotificationSettings;
