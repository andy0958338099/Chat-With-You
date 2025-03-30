//@ts-nocheck

import React, { useState } from 'react';
import { 
  ChakraProvider, 
  Flex, 
  Box, 
  Button, 
  Text, 
  Avatar, 
  Input, 
  Textarea, 
  Select, 
  Slider, 
  SliderTrack, 
  SliderFilledTrack, 
  SliderThumb, 
  RadioGroup, 
  Stack, 
  Radio 
} from '@chakra-ui/react';
import { IconArrowLeft, IconUpload } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { kStyleGlobal } from '../../theme';

const CreateAIAssistant = () => {
  const [selectedArea, setSelectedArea] = useState([]);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleCreateAIAssistant = () => {
    navigate('/my-ai-assistants');
  };

  return (
    <ChakraProvider theme={kStyleGlobal}>
      <Flex
        direction="column"
        h="100vh"
        bg="background"
        px={6}
        py={4}
        position="relative"
      >
        <Flex
          justify="space-between"
          mb={6}
          align="center"
        >
          <Button
            p={0}
            variant="ghost"
            onClick={handleGoBack}
          >
            <IconArrowLeft size={24} />
          </Button>
          <Text
            fontSize="20px"
            fontWeight="600"
          >
            创建AI助手
          </Text>
          <Box w="24px" />
        </Flex>
        <Flex
          direction="column"
          gap={6}
          flex={1}
          overflowY="auto"
          css={{
            "&::-webkit-scrollbar": {
              display: "none"
            }
          }}
        >
          <Box>
            <Text
              fontSize="18px"
              fontWeight="600"
              mb={4}
            >
              基本信息设置
            </Text>
            <Flex
              gap={4}
              align="center"
              mt={4}
            >
              <Avatar
                size="xl"
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
                cursor="pointer"
                onClick={() => {}}
              />
              <Input
                placeholder="AI助手名称"
                maxLength={30}
                flex={1}
              />
            </Flex>
            <Textarea
              placeholder="简介"
              mt={4}
              maxLength={100}
              rows={3}
            />
            <Select
              placeholder="选择专业领域 (可多选)"
              mt={4}
              multiple
              value={selectedArea}
              onChange={(e) => {
                setSelectedArea(
                  Array.from(e.target.selectedOptions, (option) => option.value)
                );
              }}
            >
              <option value="work">工作效率</option>
              <option value="study">学习辅导</option>
              <option value="emotion">情感咨询</option>
            </Select>
          </Box>
          <Box>
            <Text
              fontSize="18px"
              fontWeight="600"
              mb={4}
            >
              个性化设置
            </Text>
            <Flex
              direction="column"
              gap={4}
              mt={4}
            >
              <Box>
                <Text mb={2}>外向性</Text>
                <Slider defaultValue={50}>
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </Box>
              <RadioGroup defaultValue="formal">
                <Text mb={2}>语言风格</Text>
                <Stack
                  direction="row"
                  mt={2}
                  spacing={4}
                >
                  <Radio value="formal">正式</Radio>
                  <Radio value="casual">随意</Radio>
                  <Radio value="humorous">幽默</Radio>
                </Stack>
              </RadioGroup>
            </Flex>
          </Box>
          <Box>
            <Text
              fontSize="18px"
              fontWeight="600"
              mb={4}
            >
              知识库上传
            </Text>
            <Flex
              mt={4}
              p={4}
              border="1px dashed"
              borderColor="gray.300"
              borderRadius="lg"
              justify="center"
              align="center"
              direction="column"
              gap={2}
              cursor="pointer"
              onClick={() => {}}
            >
              <IconUpload size={24} />
              <Text>点击上传文件</Text>
              <Text
                fontSize="14px"
                color="gray.500"
              >
                支持 PDF、TXT 等格式
              </Text>
            </Flex>
          </Box>
        </Flex>
        <Button
          mt={6}
          size="lg"
          w="100%"
          onClick={handleCreateAIAssistant}
        >
          创建AI助手
        </Button>
      </Flex>
    </ChakraProvider>
  );
};

export default CreateAIAssistant;
