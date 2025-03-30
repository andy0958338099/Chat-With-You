//@ts-nocheck

import React, { useState } from 'react';
import { 
  ChakraProvider, 
  Flex, 
  Button, 
  Text, 
  Box 
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useNavigate } from 'react-router-dom';
import { kStyleGlobal } from '../../theme';

const Onboarding: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const onboardingData = [
    {
      "title": "欢迎使用ChatterMind",
      "subtitle": "智能社交新体验",
      "description": "开启全新的社交方式，让AI助手为您带来更智能的交流体验",
      "image": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
      "buttonText": "下一步"
    },
    {
      "title": "AI助手",
      "subtitle": "个性化对话",
      "description": "智能AI助手为您提供个性化的对话体验，提升沟通效率",
      "image": "https://images.unsplash.com/photo-1531746790731-6bf607ccff6f",
      "buttonText": "下一步"
    },
    {
      "title": "隐私保护",
      "subtitle": "安全加密",
      "description": "采用先进的加密技术，确保您的每一次交流都受到完善保护",
      "image": "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
      "buttonText": "下一步"
    },
    {
      "title": "跨平台同步",
      "subtitle": "随时随地",
      "description": "支持多平台无缝同步，让您随时随地都能保持联系",
      "image": "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6",
      "buttonText": "开始使用"
    }
  ];

  const handleNext = (index: number) => {
    if (index === onboardingData.length - 1) {
      navigate('/login');
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <ChakraProvider theme={kStyleGlobal}>
      <Flex
        direction="column"
        h="100vh"
        bg="background"
        position="relative"
      >
        <Button
          position="absolute"
          right={4}
          top={4}
          zIndex={2}
          variant="ghost"
          onClick={() => navigate('/login')}
        >
          <Text>跳过</Text>
        </Button>
        <Swiper
          initialSlide={currentIndex}
          onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
        >
          {onboardingData.map((item, index) => (
            <SwiperSlide key={index}>
              <Flex
                direction="column"
                justifyContent="space-between"
                alignItems="center"
                minHeight="100%"
                width="100%"
                height="100vh"
                padding={6}
              >
                <Flex
                  flex={1}
                  justifyContent="center"
                  alignItems="center"
                  width="100%"
                  direction="column"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Box
                      as="img"
                      src={item.image}
                      width="280px"
                      height="280px"
                      borderRadius="24px"
                      objectFit="cover"
                      marginBottom="48px"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <Flex
                      direction="column"
                      align="center"
                      textAlign="center"
                      gap={4}
                    >
                      <Text
                        fontSize="32px"
                        fontWeight="bold"
                        color={kStyleGlobal.colors.dark}
                      >
                        {item.title}
                      </Text>
                      <Text
                        fontSize="24px"
                        fontWeight="medium"
                        color={kStyleGlobal.colors.dark}
                      >
                        {item.subtitle}
                      </Text>
                      <Text
                        fontSize="16px"
                        color="gray.600"
                        maxWidth="300px"
                      >
                        {item.description}
                      </Text>
                    </Flex>
                  </motion.div>
                </Flex>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Button
                    size="lg"
                    width="200px"
                    bg={index === onboardingData.length - 1 ? "primary.500" : "primary.100"}
                    color={index === onboardingData.length - 1 ? "white" : "dark"}
                    onClick={() => handleNext(index)}
                  >
                    <Text>{item.buttonText}</Text>
                  </Button>
                </motion.div>
              </Flex>
            </SwiperSlide>
          ))}
        </Swiper>
      </Flex>
    </ChakraProvider>
  );
};

export default Onboarding;
