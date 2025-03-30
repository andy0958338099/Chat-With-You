//@ts-nocheck

import React, { useState } from 'react';
import { 
  ChakraProvider, 
  Flex, 
  Box, 
  VStack, 
  Button, 
  Text, 
  Divider, 
  Select, 
  Switch, 
  Slider, 
  SliderTrack, 
  SliderFilledTrack, 
  SliderThumb,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input
} from '@chakra-ui/react';
import { 
  IconArrowLeft, 
  IconUser, 
  IconChevronRight, 
  IconLock, 
  IconLanguage, 
  IconMoon 
} from '@tabler/icons-react';
import { kStyleGlobal } from '../../theme';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentModal, setCurrentModal] = useState('');
  const navigate = useNavigate();

  const toggleModal = (modalName: string) => {
    setIsModalOpen(!isModalOpen);
    setCurrentModal(modalName);
  };

  const $goBack = () => {
    navigate(-1);
  };

  const $goToNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <ChakraProvider theme={kStyleGlobal}>
      <Flex direction="column" h="100vh" bg="background">
        <Flex 
          p={4} 
          borderBottom="1px" 
          borderColor="gray.100"
          align="center"
          justify="space-between"
        >
          <Flex align="center" gap={4}>
            <Button
              p={0}
              variant="ghost"
              onClick={() => $goBack()}
            >
              <IconArrowLeft size={24} />
            </Button>
            <Text
              fontSize="xl"
              fontWeight="bold"
            >
              设置
            </Text>
          </Flex>
        </Flex>

        <Box flex={1} overflowY="auto" p={4}>
          <VStack spacing={6}>
            <VStack spacing={4}>
              <Text
                fontSize="lg"
                fontWeight="semibold"
              >
                账户设置
              </Text>
              <Flex 
                direction="column" 
                bg="white" 
                borderRadius="xl" 
                shadow="sm"
              >
                <Button
                  variant="ghost"
                  p={4}
                  justifyContent="space-between"
                  onClick={() => $goToNavigation("/edit-profile")}
                >
                  <Flex align="center" gap={3}>
                    <IconUser size={20} />
                    <Text>个人资料</Text>
                  </Flex>
                  <IconChevronRight size={20} />
                </Button>

                <Divider />

                <Button
                  variant="ghost"
                  p={4}
                  justifyContent="space-between"
                  onClick={() => toggleModal("password")}
                >
                  <Flex align="center" gap={3}>
                    <IconLock size={20} />
                    <Text>密码修改</Text>
                  </Flex>
                  <IconChevronRight size={20} />
                </Button>

                <Divider />

                <Button
                  variant="ghost"
                  p={4}
                  justifyContent="space-between"
                >
                  <Flex align="center" gap={3}>
                    <IconLanguage size={20} />
                    <Text>语言选择</Text>
                  </Flex>
                  <Select w="120px" size="sm">
                    <option>中文</option>
                    <option>English</option>
                  </Select>
                </Button>

                <Divider />

                <Button
                  variant="ghost"
                  p={4}
                  justifyContent="space-between"
                >
                  <Flex align="center" gap={3}>
                    <IconMoon size={20} />
                    <Text>深色模式</Text>
                  </Flex>
                  <Switch />
                </Button>
              </Flex>
            </VStack>

            <VStack spacing={4}>
              <Text
                fontSize="lg"
                fontWeight="semibold"
              >
                AI助手设置
              </Text>
              <Box bg="white" p={4} borderRadius="xl" shadow="sm">
                <VStack spacing={4}>
                  <Flex direction="column" gap={2}>
                    <Text>AI参与度</Text>
                    <Slider defaultValue={70}>
                      <SliderTrack>
                        <SliderFilledTrack bg="primary.300" />
                      </SliderTrack>
                      <SliderThumb boxSize={6} bg="primary.300" />
                    </Slider>
                  </Flex>

                  <Flex direction="column" gap={2}>
                    <Text>默认AI助手</Text>
                    <Select>
                      <option>通用助手</option>
                      <option>写作助手</option>
                      <option>编程助手</option>
                    </Select>
                  </Flex>

                  <Flex justify="space-between" align="center">
                    <Text>AI功能</Text>
                    <Switch defaultChecked />
                  </Flex>
                </VStack>
              </Box>
            </VStack>

            <VStack spacing={4}>
              <Text
                fontSize="lg"
                fontWeight="semibold"
              >
                账户操作
              </Text>
              <Flex direction="column" gap={4}>
                <Button
                  w="100%"
                  variant="outline"
                  colorScheme="red"
                  onClick={() => toggleModal("delete")}
                >
                  注销账户
                </Button>
                <Button
                  w="100%"
                  onClick={() => $goToNavigation("/login")}
                >
                  退出登录
                </Button>
              </Flex>
            </VStack>
          </VStack>
        </Box>

        <Modal isOpen={isModalOpen} onClose={() => toggleModal('')}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {currentModal === "password" ? "修改密码" : "注销账户"}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {currentModal === "password" && (
                <VStack spacing={4}>
                  <Input type="password" placeholder="当前密码" />
                  <Input type="password" placeholder="新密码" />
                  <Input type="password" placeholder="确认新密码" />
                </VStack>
              )}
              {currentModal === "delete" && (
                <VStack spacing={4}>
                  <Text color="red.500">
                    此操作不可逆，确定要注销账户吗？
                  </Text>
                  <Input placeholder='请输入"DELETE"确认' />
                </VStack>
              )}
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" onClick={() => toggleModal('')}>
                取消
              </Button>
              <Button 
                colorScheme={currentModal === "delete" ? "red" : "primary"}
              >
                {currentModal === "password" ? "确认" : "注销"}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </ChakraProvider>
  );
};

export default Settings;
