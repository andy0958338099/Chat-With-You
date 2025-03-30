//@ts-nocheck

import React, { useState } from 'react';
import { 
  ChakraProvider, 
  Flex, 
  Box, 
  Button, 
  Text, 
  Select, 
  Stack, 
  Switch, 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter 
} from '@chakra-ui/react';
import { IconArrowLeft } from '@tabler/icons-react';
import { kStyleGlobal } from '../../theme';
import { useNavigate } from 'react-router-dom';

const PrivacySettings: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleOpenModal = (type: string) => {
    setIsModalOpen(true);
    setModalType(type);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePrivacyPolicyNavigation = () => {
    navigate('/privacy-policy');
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
            onClick={handleGoBack}
          >
            <IconArrowLeft size={24} />
          </Button>
          <Text
            fontSize="xl"
            fontWeight="bold"
          >
            隐私设置
          </Text>
          <Box w={8} />
        </Flex>
        <Flex
          direction="column"
          gap={6}
          flex={1}
          overflowY="auto"
        >
          <Box>
            <Text
              fontSize="lg"
              fontWeight="semibold"
              mb={4}
            >
              个人信息可见性
            </Text>
            <Stack spacing={4}>
              {[
                { label: '头像', key: 'avatar' },
                { label: '昵称', key: 'nickname' },
                { label: '个性签名', key: 'bio' },
                { label: '联系方式', key: 'contact' }
              ].map(item => (
                <Flex
                  key={item.key}
                  justify="space-between"
                  align="center"
                >
                  <Text>{item.label}</Text>
                  <Select w="120px" size="sm">
                    <option value="public">所有人可见</option>
                    <option value="friends">仅好友可见</option>
                    <option value="private">仅自己可见</option>
                  </Select>
                </Flex>
              ))}
            </Stack>
          </Box>
          <Box>
            <Text
              fontSize="lg"
              fontWeight="semibold"
              mb={4}
            >
              聊天隐私
            </Text>
            <Stack spacing={4}>
              {[
                { label: '阅后即焚模式', key: 'burn' },
                { label: '禁止截图', key: 'screenshot' },
                { label: '聊天记录云端存储', key: 'cloud' }
              ].map(item => (
                <Flex
                  key={item.key}
                  justify="space-between"
                  align="center"
                >
                  <Text>{item.label}</Text>
                  <Switch colorScheme="green" />
                </Flex>
              ))}
            </Stack>
          </Box>
          <Box>
            <Text
              fontSize="lg"
              fontWeight="semibold"
              mb={4}
            >
              AI助手隐私
            </Text>
            <Stack spacing={4}>
              <Flex
                justify="space-between"
                align="center"
              >
                <Text>允许AI学习聊天内容</Text>
                <Switch colorScheme="green" />
              </Flex>
              <Flex
                justify="space-between"
                align="center"
              >
                <Text>允许AI访问个人信息</Text>
                <Switch colorScheme="green" />
              </Flex>
              <Flex
                justify="space-between"
                align="center"
              >
                <Text>AI生成内容的隐私级别</Text>
                <Select w="120px" size="sm">
                  <option value="low">低</option>
                  <option value="medium">中</option>
                  <option value="high">高</option>
                </Select>
              </Flex>
            </Stack>
          </Box>
          <Box>
            <Text
              fontSize="lg"
              fontWeight="semibold"
              mb={4}
            >
              数据管理
            </Text>
            <Stack spacing={4}>
              <Button
                variant="outline"
                w="full"
                onClick={() => handleOpenModal('export')}
              >
                导出个人数据
              </Button>
              <Button
                colorScheme="red"
                variant="outline"
                w="full"
                onClick={() => handleOpenModal('delete')}
              >
                删除账户
              </Button>
            </Stack>
          </Box>
          <Button
            variant="ghost"
            onClick={handlePrivacyPolicyNavigation}
          >
            隐私政策
          </Button>
        </Flex>
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Text fontWeight="bold">
                {modalType === 'export' ? '导出数据' : '删除账户'}
              </Text>
            </ModalHeader>
            <ModalBody>
              <Text>
                {modalType === 'export' 
                  ? '请选择要导出的数据类型：' 
                  : '此操作将永久删除您的账户，是否确认？'}
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="ghost"
                onClick={handleCloseModal}
              >
                取消
              </Button>
              <Button 
                colorScheme={modalType === 'delete' ? 'red' : 'blue'}
              >
                {modalType === 'export' ? '确认导出' : '确认删除'}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </ChakraProvider>
  );
};

export default PrivacySettings;
