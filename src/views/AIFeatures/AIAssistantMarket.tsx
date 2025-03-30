//@ts-nocheck

import React from 'react';
import { 
  ChakraProvider, 
  Flex, 
  Box, 
  Button, 
  Text, 
  InputGroup, 
  InputLeftElement, 
  Input, 
  Grid, 
  Image 
} from '@chakra-ui/react';
import { 
  IconArrowLeft, 
  IconSearch, 
  IconStarFilled 
} from '@tabler/icons-react';
import { kStyleGlobal } from '../../theme';
import { useNavigate } from 'react-router-dom';

const AIAssistantMarket: React.FC = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const goToAIAssistantSettings = () => {
    navigate('/ai-assistant-settings');
  };

  const assistants = [
    {
      name: "效率助手",
      desc: "提高工作效率",
      rating: 4.8,
      users: "2.3万",
      image: "https://images.unsplash.com/photo-1534723452862-4c874018d66d"
    },
    {
      name: "学习导师",
      desc: "个性化学习辅导",
      rating: 4.9,
      users: "1.8万",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8"
    },
    {
      name: "生活管家",
      desc: "日常生活助手",
      rating: 4.7,
      users: "3.1万",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
    },
    {
      name: "写作助手",
      desc: "智能写作辅助",
      rating: 4.6,
      users: "1.5万",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a"
    }
  ];

  const categories = ["全部", "工作效率", "学习辅导", "生活助手"];

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
          justify="space-between"
          align="center"
          borderBottom="1px"
          borderColor="borderColor"
        >
          <Flex
            align="center"
            gap={4}
          >
            <Button
              p={0}
              variant="ghost"
              onClick={goBack}
            >
              <IconArrowLeft size={24} />
            </Button>
            <Text
              fontSize="xl"
              fontWeight="bold"
            >
              AI助手市场
            </Text>
          </Flex>
        </Flex>

        <Flex
          px={6}
          py={4}
        >
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              pl={4}
            >
              <IconSearch color="gray.400" />
            </InputLeftElement>
            <Input
              pl={12}
              placeholder="搜索AI助手"
              borderRadius="xl"
            />
          </InputGroup>
        </Flex>

        <Box
          overflowX="auto"
          px={6}
          py={2}
          css={{
            "scrollbarWidth": "none"
          }}
        >
          <Flex gap={3}>
            {categories.map(category => (
              <Button
                key={category}
                bg={category === "全部" ? "primary.500" : "white"}
                color={category === "全部" ? "white" : "gray.600"}
                px={6}
                py={2}
                borderRadius="full"
                boxShadow="sm"
              >
                <Text>{category}</Text>
              </Button>
            ))}
          </Flex>
        </Box>

        <Box
          flex={1}
          overflowY="auto"
          px={6}
          py={4}
        >
          <Grid
            templateColumns="repeat(2, 1fr)"
            gap={4}
          >
            {assistants.map(assistant => (
              <Flex
                key={assistant.name}
                direction="column"
                bg="white"
                p={4}
                borderRadius="xl"
                boxShadow="sm"
                onClick={goToAIAssistantSettings}
                cursor="pointer"
                _hover={{
                  transform: "translateY(-2px)",
                  transition: "all 0.2s"
                }}
              >
                <Image
                  src={assistant.image}
                  borderRadius="lg"
                  h="120px"
                  w="100%"
                  objectFit="cover"
                  mb={3}
                />
                <Text
                  fontWeight="bold"
                  fontSize="md"
                  mb={1}
                >
                  {assistant.name}
                </Text>
                <Text
                  color="gray.600"
                  fontSize="sm"
                  mb={2}
                >
                  {assistant.desc}
                </Text>
                <Flex
                  justify="space-between"
                  align="center"
                >
                  <Flex
                    align="center"
                    gap={1}
                  >
                    <IconStarFilled
                      size={16}
                      color="#FFD700"
                    />
                    <Text
                      fontSize="sm"
                      color="gray.600"
                    >
                      {assistant.rating}
                    </Text>
                  </Flex>
                  <Text
                    fontSize="sm"
                    color="gray.600"
                  >
                    {assistant.users}使用
                  </Text>
                </Flex>
                <Button
                  mt={3}
                  size="sm"
                  variant="outline"
                  borderColor="primary.500"
                  color="primary.500"
                  _hover={{
                    bg: "primary.50"
                  }}
                >
                  <Text>添加</Text>
                </Button>
              </Flex>
            ))}
          </Grid>
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default AIAssistantMarket;
