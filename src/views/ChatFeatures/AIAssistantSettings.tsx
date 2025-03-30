//@ts-nocheck

import React, { useState } from 'react';
import { 
  ChakraProvider, 
  Flex, 
  Button, 
  Avatar, 
  Text, 
  Box, 
  Slider, 
  SliderTrack, 
  SliderFilledTrack, 
  SliderThumb, 
  Select, 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalBody,
  Progress
} from '@chakra-ui/react';
import { 
  IconArrowLeft, 
  IconUpload, 
  IconTrash, 
  IconChevronDown 
} from '@tabler/icons-react';
import { kStyleGlobal } from '../theme';
import { useNavigate } from 'react-router-dom';

const AIAssistantSettings = () => {
  const [isAIListOpen, setIsAIListOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("neutral");
  const [participationLevel, setParticipationLevel] = useState(50);
  const [isAdvancedSettingsOpen, setIsAdvancedSettingsOpen] = useState(false);
  const [languageStyle, setLanguageStyle] = useState(50);
  const [replyLength, setReplyLength] = useState(50);
  const [technicalTermFrequency, setTechnicalTermFrequency] = useState(50);
  
  const navigate = useNavigate();

  const toggleAIList = () => {
    setIsAIListOpen(!isAIListOpen);
  };

  const toggleAdvancedSettings = () => {
    setIsAdvancedSettingsOpen(!isAdvancedSettingsOpen);
  };

  const aiAssistants = [
    {
      name: "智慧导师",
      desc: "专业知识解答",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb"
    },
    {
      name: "创意助手",
      desc: "激发灵感创意",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
    }
  ];

  return (
    <ChakraProvider theme={kStyleGlobal}>
      <Flex
        direction="column"
        h="100vh"
        bg="background"
        position="relative"
      >
        <Flex
          py={4}
          px={6}
          borderBottomWidth="1px"
          borderColor="borderColor"
          align="center"
          justify="space-between"
        >
          <Button
            p={0}
            variant="ghost"
            onClick={() => navigate("/chat")}
          >
            <IconArrowLeft size={24} />
          </Button>
          <Text
            fontSize="18px"
            fontWeight="600"
          >
            AI助手设置
          </Text>
          <Box w="24px" />
        </Flex>
        
        <Flex
          direction="column"
          p={6}
          gap={8}
          flex={1}
          overflowY="auto"
        >
          <Flex
            align="center"
            gap={4}
            bg="primary.50"
            p={4}
            borderRadius="xl"
          >
            <Avatar
              size="lg"
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb"
            />
            <Flex
              direction="column"
              flex={1}
            >
              <Text
                fontSize="14px"
                color="gray.600"
              >
                当前AI助手
              </Text>
              <Text
                fontSize="16px"
                fontWeight="600"
              >
                智慧导师
              </Text>
            </Flex>
            <Button
              onClick={toggleAIList}
              variant="outline"
            >
              更换AI助手
            </Button>
          </Flex>

          <Flex direction="column" gap={4}>
            <Text
              fontSize="16px"
              fontWeight="600"
            >
              参与度设置
            </Text>
            <Slider
              value={participationLevel}
              min={0}
              max={100}
              step={1}
              onChange={(val) => setParticipationLevel(val)}
            >
              <SliderTrack bg="gray.200">
                <SliderFilledTrack bg="primary.500" />
              </SliderTrack>
              <SliderThumb boxSize={6} />
            </Slider>
            <Flex justify="space-between">
              <Text>观察模式</Text>
              <Text>积极参与</Text>
            </Flex>
            <Text
              fontSize="14px"
              color="gray.600"
            >
              {`当前设置：${participationLevel}%`}
            </Text>
          </Flex>

          <Flex direction="column" gap={4}>
            <Text
              fontSize="16px"
              fontWeight="600"
            >
              角色设定
            </Text>
            <Select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="neutral">中立观察者</option>
              <option value="friendly">友好支持者</option>
              <option value="professional">专业顾问</option>
            </Select>
            <Text
              fontSize="14px"
              color="gray.600"
            >
              {selectedRole === "neutral" ? "以客观的角度观察和分析对话" : 
               selectedRole === "friendly" ? "以友好的态度支持和鼓励用户" : 
               "提供专业的建议和见解"}
            </Text>
          </Flex>

          <Flex direction="column" gap={4}>
            <Text
              fontSize="16px"
              fontWeight="600"
            >
              知识库上传
            </Text>
            <Button
              leftIcon={<IconUpload />}
              variant="outline"
              w="full"
            >
              上传文件
            </Button>
            <Flex
              direction="column"
              gap={2}
              bg="gray.50"
              p={4}
              borderRadius="xl"
            >
              <Flex
                align="center"
                justify="space-between"
              >
                <Text>产品说明书.pdf</Text>
                <IconTrash
                  color="red.500"
                  style={{ cursor: "pointer" }}
                />
              </Flex>
              <Progress value={80} size="sm" colorScheme="green" />
            </Flex>
          </Flex>

          <Flex direction="column" gap={4}>
            <Flex
              align="center"
              justify="space-between"
              onClick={toggleAdvancedSettings}
              cursor="pointer"
            >
              <Text
                fontSize="16px"
                fontWeight="600"
              >
                高级设置
              </Text>
              <IconChevronDown
                size={20}
                style={{
                  transform: isAdvancedSettingsOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s ease"
                }}
              />
            </Flex>
            
            {isAdvancedSettingsOpen && (
              <Flex
                direction="column"
                gap={4}
                mt={2}
              >
                <Flex direction="column" gap={2}>
                  <Text
                    fontSize="14px"
                    fontWeight="600"
                  >
                    语言风格
                  </Text>
                  <Slider
                    value={languageStyle}
                    min={0}
                    max={100}
                    step={1}
                    onChange={(val) => setLanguageStyle(val)}
                  >
                    <SliderTrack bg="gray.200">
                      <SliderFilledTrack bg="primary.500" />
                    </SliderTrack>
                    <SliderThumb boxSize={6} />
                  </Slider>
                  <Flex justify="space-between">
                    <Text>正式</Text>
                    <Text>随意</Text>
                  </Flex>
                </Flex>

                <Flex direction="column" gap={2}>
                  <Text
                    fontSize="14px"
                    fontWeight="600"
                  >
                    回复长度
                  </Text>
                  <Slider
                    value={replyLength}
                    min={0}
                    max={100}
                    step={1}
                    onChange={(val) => setReplyLength(val)}
                  >
                    <SliderTrack bg="gray.200">
                      <SliderFilledTrack bg="primary.500" />
                    </SliderTrack>
                    <SliderThumb boxSize={6} />
                  </Slider>
                  <Flex justify="space-between">
                    <Text>简短</Text>
                    <Text>详细</Text>
                  </Flex>
                </Flex>

                <Flex direction="column" gap={2}>
                  <Text
                    fontSize="14px"
                    fontWeight="600"
                  >
                    专业术语使用频率
                  </Text>
                  <Slider
                    value={technicalTermFrequency}
                    min={0}
                    max={100}
                    step={1}
                    onChange={(val) => setTechnicalTermFrequency(val)}
                  >
                    <SliderTrack bg="gray.200">
                      <SliderFilledTrack bg="primary.500" />
                    </SliderTrack>
                    <SliderThumb boxSize={6} />
                  </Slider>
                  <Flex justify="space-between">
                    <Text>较少</Text>
                    <Text>频繁</Text>
                  </Flex>
                </Flex>
              </Flex>
            )}
          </Flex>
        </Flex>

        <Flex
          p={6}
          borderTopWidth="1px"
          borderColor="borderColor"
        >
          <Button
            w="full"
            onClick={() => navigate("/chat")}
          >
            保存设置
          </Button>
        </Flex>

        <Modal
          isOpen={isAIListOpen}
          onClose={toggleAIList}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Text
                fontSize="18px"
                fontWeight="600"
              >
                选择AI助手
              </Text>
            </ModalHeader>
            <ModalBody>
              <Flex
                direction="column"
                gap={4}
              >
                {aiAssistants.map(ai => (
                  <Flex
                    key={ai.name}
                    p={4}
                    borderRadius="xl"
                    border="1px solid"
                    borderColor="borderColor"
                    align="center"
                    gap={4}
                    cursor="pointer"
                    _hover={{
                      bg: "primary.50"
                    }}
                  >
                    <Avatar
                      size="md"
                      src={ai.avatar}
                    />
                    <Flex direction="column">
                      <Text fontWeight="600">
                        {ai.name}
                      </Text>
                      <Text
                        fontSize="14px"
                        color="gray.600"
                      >
                        {ai.desc}
                      </Text>
                    </Flex>
                  </Flex>
                ))}
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Flex>
    </ChakraProvider>
  );
};

export default AIAssistantSettings;
