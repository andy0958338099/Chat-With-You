//@ts-nocheck

import React, { useState } from 'react';
import { 
  ChakraProvider, 
  Flex, 
  Box, 
  Button, 
  Text, 
  RadioGroup, 
  Radio 
} from '@chakra-ui/react';
import { IconArrowLeft, IconBrandAlipay, IconBrandWechat, IconBrandApple, IconCreditCard } from '@tabler/icons-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { kStyleGlobal } from '../../theme';
import 'swiper/css';

const BuyCredits = () => {
  const creditPackages = [
    { points: 100, price: "¥10", bonus: "额外赠送10积分" },
    { points: 500, price: "¥45", bonus: "额外赠送75积分" },
    { points: 1000, price: "¥80", bonus: "额外赠送200积分" }
  ];

  const [selectedPackage, setSelectedPackage] = useState(creditPackages[0]);
  const [selectedPayment, setSelectedPayment] = useState("alipay");

  const paymentMethods = [
    { id: "alipay", name: "支付宝", icon: IconBrandAlipay },
    { id: "wechat", name: "微信支付", icon: IconBrandWechat },
    { id: "apple", name: "Apple Pay", icon: IconBrandApple },
    { id: "card", name: "信用卡", icon: IconCreditCard }
  ];

  const handleGoBack = () => {
    // Implement navigation back logic
  };

  const handleConfirmPurchase = () => {
    // Implement navigation to billing subscription
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
          borderColor="gray.100"
          align="center"
          justify="space-between"
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
            购买积分
          </Text>
          <Box w="24px" />
        </Flex>

        <Flex
          direction="column"
          flex={1}
          p={6}
          gap={8}
        >
          <Flex
            direction="column"
            align="center"
            bg="primary.50"
            p={6}
            borderRadius="2xl"
          >
            <Text
              fontSize="16px"
              color="gray.600"
              mb={2}
            >
              当前余额
            </Text>
            <Text
              fontSize="36px"
              fontWeight="bold"
              color={kStyleGlobal.colors.dark}
            >
              2,580
            </Text>
          </Flex>

          <Swiper>
            {creditPackages.map((pkg, index) => (
              <SwiperSlide key={index}>
                <Flex
                  direction="column"
                  bg="white"
                  p={6}
                  borderRadius="xl"
                  shadow="sm"
                  gap={4}
                  onClick={() => setSelectedPackage(pkg)}
                  cursor="pointer"
                  border="2px"
                  borderColor={selectedPackage === pkg ? "primary.300" : "transparent"}
                >
                  <Flex
                    justify="space-between"
                    align="center"
                  >
                    <Text
                      fontSize="24px"
                      fontWeight="bold"
                    >
                      {pkg.points} 积分
                    </Text>
                    <Text
                      fontSize="20px"
                      fontWeight="600"
                      color="primary.500"
                    >
                      {pkg.price}
                    </Text>
                  </Flex>
                  <Text
                    fontSize="14px"
                    color="primary.500"
                  >
                    {pkg.bonus}
                  </Text>
                </Flex>
              </SwiperSlide>
            ))}
          </Swiper>

          <Flex
            direction="column"
            gap={4}
          >
            <Text
              fontSize="16px"
              fontWeight="600"
            >
              支付方式
            </Text>
            <RadioGroup 
              value={selectedPayment} 
              onChange={setSelectedPayment}
            >
              <Flex
                direction="column"
                gap={3}
              >
                {paymentMethods.map(method => (
                  <Flex
                    key={method.id}
                    p={4}
                    bg="gray.50"
                    borderRadius="lg"
                    align="center"
                    justify="space-between"
                  >
                    <Flex
                      align="center"
                      gap={3}
                    >
                      <method.icon size={24} />
                      <Text>{method.name}</Text>
                    </Flex>
                    <Radio value={method.id} />
                  </Flex>
                ))}
              </Flex>
            </RadioGroup>
          </Flex>
        </Flex>

        <Flex
          p={6}
          borderTop="1px"
          borderColor="gray.100"
          direction="column"
          gap={4}
        >
          <Flex
            fontSize="xs"
            color="gray.500"
            justify="center"
            gap={2}
          >
            <Text fontSize="12px">点击确认即表示同意</Text>
            <Text 
              fontSize="12px" 
              color="primary.500" 
              textDecoration="underline"
            >
              使用条款
            </Text>
            <Text fontSize="12px">和</Text>
            <Text 
              fontSize="12px" 
              color="primary.500" 
              textDecoration="underline"
            >
              隐私政策
            </Text>
          </Flex>
          <Button
            size="lg"
            width="full"
            onClick={handleConfirmPurchase}
          >
            确认购买
          </Button>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
};

export default BuyCredits;
