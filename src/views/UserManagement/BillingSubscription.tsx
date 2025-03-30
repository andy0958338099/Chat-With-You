//@ts-nocheck

import React, { useState } from 'react';
import { 
  ChakraProvider, 
  Flex, 
  Box, 
  Button, 
  Text, 
  Badge, 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  Stack, 
  RadioGroup, 
  Radio,
  Switch
} from '@chakra-ui/react';
import { 
  IconArrowLeft, 
  IconCreditCard, 
  IconChevronRight 
} from '@tabler/icons-react';
import { kStyleGlobal } from '../theme';
import { useNavigate } from 'react-router-dom';

const BillingSubscription = () => {
  const [isAutoRenewModalOpen, setIsAutoRenewModalOpen] = useState(false);
  const [isPaymentMethodModalOpen, setIsPaymentMethodModalOpen] = useState(false);
  const navigate = useNavigate();

  const subscriptionPlans = [
    {
      name: "基础版",
      price: "￥29/月",
      features: "基础AI对话功能"
    },
    {
      name: "高级版",
      price: "￥99/月",
      features: "无限AI对话 + 高级功能"
    },
    {
      name: "专业版",
      price: "￥199/月",
      features: "团队协作 + 自定义AI模型"
    }
  ];

  const billRecords = [
    {
      date: "2023-12-01",
      type: "订阅续费",
      amount: "-￥99"
    },
    {
      date: "2023-11-15",
      type: "购买积分",
      amount: "-￥50"
    },
    {
      date: "2023-11-01",
      type: "订阅续费",
      amount: "-￥99"
    }
  ];

  return (
    <ChakraProvider theme={kStyleGlobal}>
      <Flex
        direction="column"
        h="100vh"
        bg="background"
        px={4}
        py={6}
        maxW="container.md"
        mx="auto"
      >
        <Flex
          justify="space-between"
          align="center"
          mb={6}
        >
          <Button
            variant="ghost"
            p={0}
            onClick={() => navigate("/profile")}
          >
            <IconArrowLeft size={24} />
          </Button>
          <Text
            fontSize="xl"
            fontWeight="bold"
          >
            账单与订阅
          </Text>
          <Box w={8} />
        </Flex>
        <Flex
          direction="column"
          gap={6}
          flex={1}
          overflowY="auto"
        >
          <Box
            bg="primary.50"
            p={4}
            borderRadius="xl"
          >
            <Flex
              justify="space-between"
              align="center"
            >
              <Flex
                direction="column"
                gap={1}
              >
                <Text
                  fontSize="sm"
                  color="gray.600"
                >
                  当前订阅计划
                </Text>
                <Text
                  fontSize="lg"
                  fontWeight="bold"
                >
                  高级会员
                </Text>
                <Text
                  fontSize="sm"
                  color="gray.600"
                >
                  有效期至 2024-12-31
                </Text>
              </Flex>
              <Badge colorScheme="green">
                已激活
              </Badge>
            </Flex>
          </Box>
          <Flex
            bg="gray.50"
            p={4}
            borderRadius="xl"
            justify="space-between"
            align="center"
          >
            <Flex direction="column">
              <Text
                fontSize="sm"
                color="gray.600"
              >
                积分余额
              </Text>
              <Text
                fontSize="2xl"
                fontWeight="bold"
              >
                1,280
              </Text>
            </Flex>
            <Button
              onClick={() => navigate("/buy-credits")}
              colorScheme="primary"
            >
              购买积分
            </Button>
          </Flex>
          <Box>
            <Text
              fontSize="lg"
              fontWeight="bold"
              mb={4}
            >
              可用订阅计划
            </Text>
            <Flex
              direction="column"
              gap={3}
            >
              {subscriptionPlans.map(plan => (
                <Box
                  key={plan.name}
                  p={4}
                  borderWidth={1}
                  borderColor="gray.200"
                  borderRadius="lg"
                  bg="white"
                >
                  <Flex
                    justify="space-between"
                    align="center"
                  >
                    <Flex
                      direction="column"
                      gap={1}
                    >
                      <Text fontWeight="bold">
                        {plan.name}
                      </Text>
                      <Text
                        color="primary.500"
                        fontSize="lg"
                      >
                        {plan.price}
                      </Text>
                      <Text
                        fontSize="sm"
                        color="gray.600"
                      >
                        {plan.features}
                      </Text>
                    </Flex>
                    <Button
                      size="sm"
                      variant={plan.name === "高级版" ? "primary" : "outline"}
                    >
                      {plan.name === "高级版" ? "续费" : "升级"}
                    </Button>
                  </Flex>
                </Box>
              ))}
            </Flex>
          </Box>
          <Box>
            <Text
              fontSize="lg"
              fontWeight="bold"
              mb={4}
            >
              账单记录
            </Text>
            <Flex
              direction="column"
              gap={3}
            >
              {billRecords.map(bill => (
                <Flex
                  key={bill.date}
                  justify="space-between"
                  p={3}
                  bg="gray.50"
                  borderRadius="lg"
                >
                  <Flex
                    direction="column"
                    gap={1}
                  >
                    <Text fontWeight="medium">
                      {bill.type}
                    </Text>
                    <Text
                      fontSize="sm"
                      color="gray.600"
                    >
                      {bill.date}
                    </Text>
                  </Flex>
                  <Text
                    fontWeight="bold"
                    color="red.500"
                  >
                    {bill.amount}
                  </Text>
                </Flex>
              ))}
            </Flex>
          </Box>
          <Flex
            direction="column"
            gap={4}
          >
            <Flex
              justify="space-between"
              align="center"
              onClick={() => setIsAutoRenewModalOpen(true)}
            >
              <Text>自动续费</Text>
              <Switch
                defaultChecked
                size="lg"
              />
            </Flex>
            <Flex
              justify="space-between"
              align="center"
              onClick={() => setIsPaymentMethodModalOpen(true)}
            >
              <Text>支付方式</Text>
              <Flex
                align="center"
                gap={2}
              >
                <IconCreditCard size={20} />
                <Text>**** 8888</Text>
                <IconChevronRight size={20} />
              </Flex>
            </Flex>
          </Flex>
          <Button
            variant="outline"
            colorScheme="red"
            mt={4}
          >
            取消订阅
          </Button>
        </Flex>
        <Modal
          isOpen={isAutoRenewModalOpen}
          onClose={() => setIsAutoRenewModalOpen(false)}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Text>自动续费设置</Text>
            </ModalHeader>
            <ModalBody>
              <Text>开启自动续费，系统将在订阅到期前自动为您续费，确保服务不中断。</Text>
            </ModalBody>
            <ModalFooter>
              <Button onClick={() => setIsAutoRenewModalOpen(false)}>
                确定
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Modal
          isOpen={isPaymentMethodModalOpen}
          onClose={() => setIsPaymentMethodModalOpen(false)}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Text>支付方式</Text>
            </ModalHeader>
            <ModalBody>
              <Stack spacing={4}>
                <RadioGroup defaultValue="card">
                  <Stack spacing={2}>
                    <Radio value="card">
                      <Text>信用卡 **** 8888</Text>
                    </Radio>
                    <Radio value="alipay">
                      <Text>支付宝</Text>
                    </Radio>
                    <Radio value="wechat">
                      <Text>微信支付</Text>
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button onClick={() => setIsPaymentMethodModalOpen(false)}>
                保存
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </ChakraProvider>
  );
};

export default BillingSubscription;
