//@ts-nocheck

import React, { useState } from 'react';
import { 
  ChakraProvider, 
  Flex, 
  Box, 
  Button, 
  Text, 
  Badge, 
  Stack 
} from '@chakra-ui/react';
import { 
  IconArrowLeft, 
  IconCheck, 
  IconQuestion, 
  IconMessage 
} from '@tabler/icons-react';
import { kStyleGlobal } from '../../theme';
import { useNavigate } from 'react-router-dom';

const SubscriptionPlans: React.FC = () => {
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("professional");
  const navigate = useNavigate();

  const plans = [
    {
      "name": "基础版",
      "price": "¥29",
      "period": "/月",
      "features": ["每月100条消息", "基础AI助手", "标准支持"],
      "isPopular": false
    },
    {
      "name": "专业版",
      "price": "¥99",
      "period": "/月",
      "features": ["无限消息", "高级AI助手", "优先支持", "自定义AI助手"],
      "isPopular": true
    },
    {
      "name": "企业版",
      "price": "¥299",
      "period": "/月",
      "features": ["团队协作", "API访问", "专属客服", "自定义功能"],
      "isPopular": false
    }
  ];

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSelectPlan = () => {
    navigate("/billing-subscription");
  };

  const handleCompareModal = () => {
    setIsCompareModalOpen(true);
  };

  return (
    <ChakraProvider theme={kStyleGlobal}>
      <Flex
        direction="column"
        h="100vh"
        bg="background"
      >
        <Flex
          p={4}
          borderBottom="1px"
          borderColor="gray.200"
          align="center"
        >
          <Button
            variant="ghost"
            onClick={handleGoBack}
          >
            <IconArrowLeft size={24} />
          </Button>
          <Text
            fontSize="18px"
            fontWeight="600"
            flex={1}
            textAlign="center"
          >
            订阅计划
          </Text>
        </Flex>
        <Flex
          direction="column"
          flex={1}
          p={6}
          overflowY="auto"
          gap={6}
        >
          {plans.map((plan, index) => (
            <Box
              key={index}
              bg="white"
              borderRadius="xl"
              p={6}
              boxShadow="sm"
              border="2px"
              borderColor={plan.isPopular ? "primary.300" : "transparent"}
              position="relative"
            >
              {plan.isPopular && (
                <Badge
                  position="absolute"
                  top={-3}
                  right={4}
                  bg="primary.400"
                  color="white"
                  px={3}
                  py={1}
                  borderRadius="full"
                >
                  最受欢迎
                </Badge>
              )}
              <Flex
                justify="space-between"
                mb={4}
              >
                <Text
                  fontSize="20px"
                  fontWeight="600"
                >
                  {plan.name}
                </Text>
                <Flex align="baseline">
                  <Text
                    fontSize="24px"
                    fontWeight="700"
                    color="primary.500"
                  >
                    {plan.price}
                  </Text>
                  <Text
                    fontSize="14px"
                    color="gray.500"
                  >
                    {plan.period}
                  </Text>
                </Flex>
              </Flex>
              <Stack
                spacing={3}
                mb={6}
              >
                {plan.features.map((feature, i) => (
                  <Flex
                    key={i}
                    align="center"
                    gap={2}
                  >
                    <IconCheck
                      size={20}
                      color={kStyleGlobal.colors.primary[500]}
                    />
                    <Text>{feature}</Text>
                  </Flex>
                ))}
              </Stack>
              <Button
                w="full"
                variant={plan.isPopular ? "primary" : "outline"}
                onClick={handleSelectPlan}
              >
                选择此计划
              </Button>
            </Box>
          ))}
        </Flex>
        <Flex
          p={4}
          gap={4}
          borderTop="1px"
          borderColor="gray.200"
        >
          <Button
            flex={1}
            variant="outline"
            leftIcon={<IconQuestion size={20} />}
            onClick={handleCompareModal}
          >
            对比计划
          </Button>
          <Button
            flex={1}
            leftIcon={<IconMessage size={20} />}
          >
            联系客服
          </Button>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
};

export default SubscriptionPlans;
