//@ts-nocheck

import React, { useState } from 'react';
import { 
  ChakraProvider, 
  Flex, 
  Button, 
  Text, 
  Avatar, 
  FormControl, 
  FormLabel, 
  Input, 
  RadioGroup, 
  Radio, 
  HStack, 
  Select, 
  Textarea, 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  VStack, 
  Box 
} from '@chakra-ui/react';
import { IconArrowLeft } from '@tabler/icons-react';
import { kStyleGlobal } from '../../theme';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSave = () => {
    navigate('/profile');
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
          px={6}
          py={4}
          borderBottom="1px"
          borderColor="gray.100"
        >
          <Button
            variant="ghost"
            p={0}
            onClick={handleGoBack}
          >
            <IconArrowLeft size={24} />
          </Button>
          <Text
            fontSize="18px"
            fontWeight="600"
          >
            个人资料编辑
          </Text>
          <Box w="24px" />
        </Flex>
        <Flex
          direction="column"
          align="center"
          px={6}
          py={8}
          gap={8}
          flex={1}
          overflowY="auto"
        >
          <Flex
            direction="column"
            align="center"
            gap={4}
          >
            <Avatar
              size="2xl"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
              borderRadius="full"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleOpenModal}
            >
              更换头像
            </Button>
          </Flex>
          <Flex
            direction="column"
            w="100%"
            gap={6}
          >
            <FormControl>
              <FormLabel>昵称</FormLabel>
              <Input
                placeholder="输入昵称"
                defaultValue="用户昵称"
              />
            </FormControl>
            <FormControl>
              <FormLabel>性别</FormLabel>
              <RadioGroup defaultValue="male">
                <HStack spacing={6}>
                  <Radio value="male">男</Radio>
                  <Radio value="female">女</Radio>
                  <Radio value="secret">保密</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
            <FormControl>
              <FormLabel>生日</FormLabel>
              <Input
                type="date"
                defaultValue="1990-01-01"
              />
            </FormControl>
            <FormControl>
              <FormLabel>地区</FormLabel>
              <Flex gap={4}>
                <Select placeholder="选择省份">
                  <option value="beijing">北京</option>
                  <option value="shanghai">上海</option>
                </Select>
                <Select placeholder="选择城市">
                  <option value="chaoyang">朝阳区</option>
                  <option value="haidian">海淀区</option>
                </Select>
              </Flex>
            </FormControl>
            <FormControl>
              <FormLabel>个性签名</FormLabel>
              <Textarea
                placeholder="写点什么吧..."
                rows={4}
              />
            </FormControl>
          </Flex>
        </Flex>
        <Flex
          px={6}
          py={4}
          borderTop="1px"
          borderColor="gray.100"
        >
          <Button
            w="100%"
            onClick={handleSave}
          >
            保存
          </Button>
        </Flex>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>更换头像</ModalHeader>
            <ModalBody>
              <VStack spacing={4}>
                <Button w="100%">拍照</Button>
                <Button w="100%">从相册选择</Button>
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Flex>
    </ChakraProvider>
  );
};

export default EditProfile;
