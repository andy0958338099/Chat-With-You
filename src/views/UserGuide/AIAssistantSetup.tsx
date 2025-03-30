//@ts-nocheck

import React, { useState } from 'react';
import { 
  ChakraProvider, 
  Flex, 
  Box, 
  Button, 
  Text, 
  Grid, 
  Slider, 
  SliderTrack, 
  SliderFilledTrack, 
  SliderThumb,
  Switch 
} from '@chakra-ui/react';
import { 
  IconArrowLeft, 
  IconBriefcase, 
  IconMoodSmile, 
  IconBook, 
  IconBulb,
  IconUpload,
  IconTag,
  IconSettings
} from '@tabler/icons-react';
import { kStyleGlobal } from '../theme';
import { useNavigate } from 'react-router-dom';

const AIAssistantSetup = () => {
  const [selectedAssistantType, setSelectedAssistantType] = useState('');
  const [isKnowledgeModalOpen, setIsKnowledgeModalOpen] = useState(false);
  const [isKeywordModalOpen, setIsKeywordModalOpen] = useState(false);
  const [isScenarioModalOpen, setIsScenarioModalOpen] = useState(false);
  const navigate = useNavigate();

  const assistantTypes = [
    {
      icon: 'briefcase',
      title: '职场专业',
      desc: '专业正式的交流风格'
    },
    {
      icon: 'mood-smile',
      title: '轻松活泼',
      desc: '友好轻松的对话方式'
    },
    {
      icon: 'book',
      title: '学术研究',
      desc: '严谨的学术讨论'
    },
    {
      icon: 'bulb',
      title: '创意型',
      desc: '富有创意的思维模式'
    }
  ];

  const renderIcon = (iconName: string) => {
    switch(iconName) {
      case 'briefcase': return <IconBriefcase size={32} />;
      case 'mood-smile': return <IconMoodSmile size={32} />;
      case 'book': return <IconBook size={32} />;
      case 'bulb': return <IconBulb size={32} />;
      default: return null;
    }
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
            p={0}
            variant="ghost"
            onClick={() => navigate(-1)}
          >
            <IconArrowLeft size={24} />
          </Button>
          <Text
            fontSize="xl"
            fontWeight="bold"
          >
            AI助手设置
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
              选择AI助手类型
            </Text>
            <Grid
              templateColumns="repeat(2, 1fr)"
              gap={4}
            >
              {assistantTypes.map((item, index) => (
                <Box
                  key={index}
                  p={4}
                  borderRadius="xl"
                  bg="white"
                  boxShadow="sm"
                  cursor="pointer"
                  onClick={() => setSelectedAssistantType(item.title)}
                  _hover={{
                    transform: "translateY(-2px)"
                  }}
                  transition="all 0.2s"
                >
                  <Flex
                    direction="column"
                    align="center"
                    gap={2}
                  >
                    {renderIcon(item.icon)}
                    <Text fontWeight="medium">
                      {item.title}
                    </Text>
                    <Text
                      fontSize="sm"
                      color="gray.500"
                    >
                      {item.desc}
                    </Text>
                  </Flex>
                </Box>
              ))}
            </Grid>
          </Box>
          <Box>
            <Text
              fontSize="lg"
              fontWeight="semibold"
              mb={4}
            >
              个性化设置
            </Text>
            <Flex
              direction="column"
              gap={4}
            >
              <Box>
                <Text mb={2}>语言风格</Text>
                <Slider
                  min={0}
                  max={100}
                  defaultValue={50}
                >
                  <SliderTrack>
                    <SliderFilledTrack bg="primary.300" />
                  </SliderTrack>
                  <SliderThumb bg="primary.500" />
                </Slider>
                <Flex justify="space-between">
                  <Text
                    fontSize="sm"
                    color="gray.500"
                  >
                    正式
                  </Text>
                  <Text
                    fontSize="sm"
                    color="gray.500"
                  >
                    随意
                  </Text>
                </Flex>
              </Box>
              <Box>
                <Text mb={2}>回复长度</Text>
                <Slider
                  min={0}
                  max={100}
                  defaultValue={50}
                >
                  <SliderTrack>
                    <SliderFilledTrack bg="primary.300" />
                  </SliderTrack>
                  <SliderThumb bg="primary.500" />
                </Slider>
                <Flex justify="space-between">
                  <Text
                    fontSize="sm"
                    color="gray.500"
                  >
                    简洁
                  </Text>
                  <Text
                    fontSize="sm"
                    color="gray.500"
                  >
                    详细
                  </Text>
                </Flex>
              </Box>
            </Flex>
          </Box>
          <Box>
            <Text
              fontSize="lg"
              fontWeight="semibold"
              mb={4}
            >
              高级设置
            </Text>
            <Flex
              direction="column"
              gap={4}
            >
              <Button
                variant="outline"
                onClick={() => setIsKnowledgeModalOpen(true)}
                leftIcon={<IconUpload />}
              >
                上传知识库
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsKeywordModalOpen(true)}
                leftIcon={<IconTag />}
              >
                设置关键词触发
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsScenarioModalOpen(true)}
                leftIcon={<IconSettings />}
              >
                情境模式
              </Button>
            </Flex>
          </Box>
          <Box>
            <Text
              fontSize="lg"
              fontWeight="semibold"
              mb={4}
            >
              隐私设置
            </Text>
            <Flex
              direction="column"
              gap={4}
            >
              <Switch>本地处理</Switch>
              <Switch>差分隐私</Switch>
            </Flex>
          </Box>
        </Flex>
        <Button
          size="lg"
          mt={6}
          onClick={() => navigate('/chat-list')}
        >
          保存并开始聊天
        </Button>
      </Flex>
    </ChakraProvider>
  );
};

export default AIAssistantSetup;
