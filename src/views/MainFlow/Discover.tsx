//@ts-nocheck

import React from 'react';
import { 
  ChakraProvider, 
  Flex, 
  Box, 
  Button, 
  Avatar, 
  Text, 
  Image 
} from '@chakra-ui/react';
import { 
  IconSearch, 
  IconHeart, 
  IconMessageCircle 
} from '@tabler/icons-react';
import { kStyleGlobal } from '../../theme';
import { useNavigate } from 'react-router-dom';

const Discover: React.FC = () => {
  const navigate = useNavigate();

  const assistants = [
    {
      name: "智能助理",
      avatar: "https://images.unsplash.com/photo-1531746790731-6bf607ccff6f",
      desc: "你的个人AI助手"
    },
    {
      name: "写作助手",
      avatar: "https://images.unsplash.com/photo-1519791883288-dc8bd696e667",
      desc: "帮你写出精彩文章"
    },
    {
      name: "翻译助手",
      avatar: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8",
      desc: "多语言翻译专家"
    }
  ];

  const tags = ["全部", "工作效率", "学习教育", "生活助手", "娱乐休闲", "健康医疗"];

  const posts = [
    {
      title: "如何提高工作效率",
      author: "效率专家",
      likes: 128,
      comments: 32,
      image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643"
    },
    {
      title: "AI写作技巧分享",
      author: "写作达人",
      likes: 256,
      comments: 48,
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a"
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
          justify="space-between"
          align="center"
          p={4}
          borderBottom="1px"
          borderColor="borderColor"
        >
          <Text
            fontSize={20}
            fontWeight="bold"
          >
            发现
          </Text>
          <Button
            variant="ghost"
            onClick={() => navigate("/search")}
          >
            <IconSearch size={24} />
          </Button>
        </Flex>
        <Box
          flex={1}
          overflowY="auto"
          px={4}
          py={6}
        >
          <Flex
            overflowX="auto"
            mb={6}
            css={{
              "scrollbarWidth": "none",
              "::-webkit-scrollbar": {
                "display": "none"
              }
            }}
          >
            <Flex gap={4}>
              {assistants.map(assistant => (
                <Flex
                  key={assistant.name}
                  direction="column"
                  bg="white"
                  p={4}
                  borderRadius="xl"
                  minW="160px"
                  cursor="pointer"
                  onClick={() => navigate("/ai-assistant-market")}
                  _hover={{
                    transform: "translateY(-2px)",
                    transition: "all 0.2s"
                  }}
                >
                  <Avatar
                    src={assistant.avatar}
                    size="lg"
                    mb={3}
                  />
                  <Text
                    fontWeight="bold"
                    mb={1}
                  >
                    {assistant.name}
                  </Text>
                  <Text
                    fontSize="14px"
                    color="gray.500"
                  >
                    {assistant.desc}
                  </Text>
                </Flex>
              ))}
            </Flex>
          </Flex>
          <Flex
            wrap="wrap"
            gap={3}
            mb={8}
          >
            {tags.map(tag => (
              <Button
                key={tag}
                size="sm"
                variant="outline"
                borderRadius="full"
                bg={tag === "全部" ? "primary.100" : "transparent"}
              >
                <Text>{tag}</Text>
              </Button>
            ))}
          </Flex>
          <Flex
            direction="column"
            gap={4}
          >
            {posts.map(post => (
              <Flex
                key={post.title}
                bg="white"
                p={4}
                borderRadius="xl"
                gap={4}
                onClick={() => navigate("/post-detail")}
                cursor="pointer"
              >
                <Flex
                  flex={1}
                  direction="column"
                  gap={2}
                >
                  <Text
                    fontWeight="bold"
                    fontSize="16px"
                  >
                    {post.title}
                  </Text>
                  <Flex gap={2}>
                    <Text
                      fontSize="14px"
                      color="gray.500"
                    >
                      {post.author}
                    </Text>
                    <Flex
                      align="center"
                      gap={1}
                    >
                      <IconHeart size={16} />
                      <Text
                        fontSize="14px"
                        color="gray.500"
                      >
                        {post.likes}
                      </Text>
                    </Flex>
                    <Flex
                      align="center"
                      gap={1}
                    >
                      <IconMessageCircle size={16} />
                      <Text
                        fontSize="14px"
                        color="gray.500"
                      >
                        {post.comments}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
                <Image
                  src={post.image}
                  boxSize="80px"
                  borderRadius="lg"
                  objectFit="cover"
                />
              </Flex>
            ))}
          </Flex>
        </Box>
        <Button
          position="fixed"
          bottom={20}
          left="50%"
          transform="translateX(-50%)"
          bg="primary.500"
          color="white"
          borderRadius="full"
          px={8}
          py={4}
          onClick={() => navigate("/ai-assistant-market")}
        >
          <Text>探索更多AI助手</Text>
        </Button>
      </Flex>
    </ChakraProvider>
  );
};

export default Discover;
