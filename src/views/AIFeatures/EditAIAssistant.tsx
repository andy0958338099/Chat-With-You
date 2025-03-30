//@ts-nocheck

import React, { useState } from 'react';
import { 
  ChakraProvider, 
  Flex, 
  Button, 
  Avatar, 
  Input, 
  Textarea, 
  Card, 
  Text, 
  Slider, 
  SliderTrack, 
  SliderFilledTrack, 
  SliderThumb,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Checkbox,
  CheckboxGroup,
  Box
} from '@chakra-ui/react';
import { 
  IconArrowLeft, 
  IconChevronRight, 
  IconUpload, 
  IconTrash 
} from '@tabler/icons-react';
import { kStyleGlobal } from '../theme';
import { useNavigate } from 'react-router-dom';

const EditAIAssistant = () => {
  const [isPersonalityModalOpen, setIsPersonalityModalOpen] = useState(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [isKnowledgeModalOpen, setIsKnowledgeModalOpen] = useState(false);
  const [selectedPersonality, setSelectedPersonality] = useState(["专业"]);
  const [languageStyle, setLanguageStyle] = useState(50);
  const [responseLength, setResponseLength] = useState(50);
  const [interactionLevel, setInteractionLevel] = useState(50);
  const [responseSpeed, setResponseSpeed] = useState(50);
  const [useEmoji, setUseEmoji] = useState(false);
  const [selectedMode, setSelectedMode] = useState("工作模式");

  const navigate = useNavigate();

  const togglePersonalityModal = () => {
    setIsPersonalityModalOpen(!isPersonalityModalOpen);
  };

  const toggleLanguageModal = () => {
    setIsLanguageModalOpen(!isLanguageModalOpen);
  };

  const toggleKnowledgeModal = () => {
    setIsKnowledgeModalOpen(!isKnowledgeModalOpen);
  };

  return (
    <ChakraProvider theme={kStyleGlobal}>
      <Flex
        direction="column"
        h="100vh"
        bg="background"
        px={4}
        py={2}
        overflow="auto"
      >
        <Flex
          justify="space-between"
          align="center"
          mb={6}
        >
          <Button
            variant="ghost"
            p={0}
            onClick={() => navigate("/my-ai-assistants")}
          >
            <IconArrowLeft size={24} />
          </Button>
          <Text
            fontSize="20px"
            fontWeight="bold"
          >
            编辑AI助手
          </Text>
          <Box w="24px" />
        </Flex>
        <Flex
          direction="column"
          gap={6}
        >
          <Flex
            align="center"
            gap={4}
          >
            <Avatar
              size="xl"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
              cursor="pointer"
            />
            <Flex
              direction="column"
              flex={1}
              gap={2}
            >
              <Input placeholder="AI助手名称" />
              <Textarea
                placeholder="AI助手简介"
                rows={3}
              />
            </Flex>
          </Flex>
          <Card>
            <Flex
              direction="column"
              gap={4}
            >
              <Text
                fontSize="18px"
                fontWeight="600"
              >
                个性化设置
              </Text>
              <Button
                onClick={togglePersonalityModal}
                variant="outline"
                justifyContent="space-between"
                w="100%"
              >
                <Text>性格特征</Text>
                <IconChevronRight size={20} />
              </Button>
              <Flex
                direction="column"
                gap={2}
              >
                <Text>语言风格</Text>
                <Slider
                  value={languageStyle}
                  min={0}
                  max={100}
                  onChange={(val) => setLanguageStyle(val)}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
                <Flex justify="space-between">
                  <Text>正式</Text>
                  <Text>随意</Text>
                </Flex>
              </Flex>
              <Flex
                direction="column"
                gap={2}
              >
                <Text>回复长度</Text>
                <Slider
                  value={responseLength}
                  min={0}
                  max={100}
                  onChange={(val) => setResponseLength(val)}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </Flex>
            </Flex>
          </Card>
          <Card>
            <Flex
              direction="column"
              gap={4}
            >
              <Text
                fontSize="18px"
                fontWeight="600"
              >
                知识库管理
              </Text>
              <Button
                leftIcon={<IconUpload />}
                onClick={toggleKnowledgeModal}
              >
                上传文件
              </Button>
              <Flex
                direction="column"
                gap={2}
              >
                <Text>已上传文件</Text>
                <Flex
                  direction="column"
                  gap={2}
                  maxH="200px"
                  overflowY="auto"
                >
                  {["文档1.pdf", "文档2.txt"].map(file => (
                    <Flex
                      key={file}
                      justify="space-between"
                      align="center"
                      p={2}
                      bg="gray.50"
                      borderRadius="md"
                    >
                      <Text>{file}</Text>
                      <IconTrash
                        size={20}
                        color="red"
                        style={{
                          cursor: "pointer"
                        }}
                      />
                    </Flex>
                  ))}
                </Flex>
              </Flex>
            </Flex>
          </Card>
          <Button
            size="lg"
            w="100%"
            mb={4}
            onClick={() => navigate("/chat")}
          >
            测试对话
          </Button>
          <Button
            size="lg"
            w="100%"
            colorScheme="green"
            onClick={() => navigate("/my-ai-assistants")}
          >
            保存更改
          </Button>
        </Flex>
        <Modal
          isOpen={isPersonalityModalOpen}
          onClose={togglePersonalityModal}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Text>选择性格特征</Text>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <CheckboxGroup 
                value={selectedPersonality} 
                onChange={(val) => setSelectedPersonality(val)}
              >
                {["专业", "幽默", "同理心", "严谨", "友善"].map(trait => (
                  <Checkbox
                    key={trait}
                    value={trait}
                  >
                    {trait}
                  </Checkbox>
                ))}
              </CheckboxGroup>
            </ModalBody>
            <ModalFooter>
              <Button onClick={togglePersonalityModal}>
                确定
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </ChakraProvider>
  );
};

export default EditAIAssistant;
