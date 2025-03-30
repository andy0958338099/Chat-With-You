//@ts-nocheck

import React from 'react';
import { 
  ChakraProvider, 
  Flex, 
  Box, 
  Button, 
  Input, 
  InputGroup, 
  InputLeftElement, 
  Text 
} from '@chakra-ui/react';
import { 
  IconChevronLeft, 
  IconSearch, 
  IconQrcode, 
  IconPhone, 
  IconMapPin, 
  IconChevronRight, 
  IconUserSearch 
} from '@tabler/icons-react';
import { kStyleGlobal } from '../../theme';
import { useNavigate } from 'react-router-dom';

const AddContact = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const goToNavigation = (path: string) => {
    navigate(path);
  };

  const contactOptions = [
    {
      icon: "qr",
      title: "扫描二维码",
      onClick: () => goToNavigation("/scan-qr")
    },
    {
      icon: "phone",
      title: "手机联系人",
      onClick: () => goToNavigation("/phone-contacts")
    },
    {
      icon: "map",
      title: "附近的人",
      onClick: () => goToNavigation("/nearby")
    }
  ];

  return (
    <ChakraProvider theme={kStyleGlobal}>
      <Flex
        direction="column"
        h="100vh"
        bg="background"
      >
        <Flex
          justify="space-between"
          align="center"
          p={4}
          borderBottom="1px"
          borderColor="gray.100"
        >
          <Flex
            align="center"
            gap={2}
          >
            <Button
              variant="ghost"
              p={0}
              onClick={goBack}
            >
              <IconChevronLeft size={24} />
            </Button>
            <Text
              fontSize="18px"
              fontWeight="600"
            >
              添加联系人
            </Text>
          </Flex>
          <Button
            variant="ghost"
            onClick={() => goToNavigation("/contacts")}
          >
            <Text>完成</Text>
          </Button>
        </Flex>
        <Box p={4}>
          <InputGroup mb={6}>
            <InputLeftElement
              pointerEvents="none"
              pl={3}
            >
              <IconSearch
                size={20}
                color="gray.400"
              />
            </InputLeftElement>
            <Input
              pl={10}
              placeholder="搜索用户名或手机号"
              borderRadius="xl"
            />
          </InputGroup>
          <Flex
            direction="column"
            gap={4}
            mb={8}
          >
            {contactOptions.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                onClick={item.onClick}
                h="auto"
                py={3}
              >
                <Flex
                  w="100%"
                  justify="space-between"
                  align="center"
                >
                  <Flex
                    gap={4}
                    align="center"
                  >
                    {item.icon === "qr" && <IconQrcode size={24} />}
                    {item.icon === "phone" && <IconPhone size={24} />}
                    {item.icon === "map" && <IconMapPin size={24} />}
                    <Text>{item.title}</Text>
                  </Flex>
                  <IconChevronRight
                    size={20}
                    color="gray.400"
                  />
                </Flex>
              </Button>
            ))}
          </Flex>
          <Box>
            <Flex
              direction="column"
              align="center"
              gap={4}
              mt={8}
            >
              <IconUserSearch
                size={48}
                color="gray.300"
              />
              <Text
                color="gray.500"
              >
                未找到相关用户
              </Text>
              <Button
                variant="outline"
                borderRadius="full"
              >
                邀请好友使用ChatterMind
              </Button>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default AddContact;
