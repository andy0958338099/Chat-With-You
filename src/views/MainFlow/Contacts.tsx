//@ts-nocheck

import React, { useState, useEffect } from 'react';
import { 
  ChakraProvider, 
  Flex, 
  Box, 
  Text, 
  Button, 
  InputGroup, 
  InputLeftElement, 
  Input, 
  Avatar, 
  Badge 
} from '@chakra-ui/react';
import { IconPlus, IconSearch, IconUser } from '@tabler/icons-react';
import { kStyleGlobal } from '../../theme';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../services/supabase';

const Contacts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState("A");
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 載入用戶資料
    const loadUserProfile = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          setUserProfile(user);
        }
      } catch (error) {
        console.error('載入用戶資料失敗:', error);
      }
    };
    
    loadUserProfile();
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <ChakraProvider theme={kStyleGlobal}>
      <Flex
        direction="column"
        h="100vh"
        bg="background"
      >
        <Flex
          px={4}
          py={3}
          justify="space-between"
          align="center"
          borderBottom="1px"
          borderColor="gray.100"
        >
          <Text
            fontSize="18px"
            fontWeight="600"
          >
            聯絡人
          </Text>
          <Flex gap={3}>
            <Button
              variant="ghost"
              onClick={() => navigate("/add-contact")}
              p={0}
            >
              <IconPlus size={24} />
            </Button>
            <Box 
              onClick={handleProfileClick}
              cursor="pointer"
            >
              {userProfile?.avatar_url ? (
                <Avatar 
                  size="sm" 
                  src={userProfile.avatar_url} 
                  name={userProfile.name || "用戶"}
                />
              ) : (
                <IconUser size={24} />
              )}
            </Box>
          </Flex>
        </Flex>
        
        <Box px={4} py={3}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              pl={4}
            >
              <IconSearch
                size={20}
                color="gray.400"
              />
            </InputLeftElement>
            <Input
              pl={12}
              placeholder="搜索聯絡人"
              borderRadius="full"
              bg="gray.50"
            />
          </InputGroup>
        </Box>
        
        <Flex
          flex={1}
          overflow="hidden"
        >
          <Box
            flex={1}
            overflowY="auto"
            px={4}
          >
            {["A","B","C"].map(letter => (
              <Box
                key={letter}
                mb={6}
              >
                <Text
                  fontSize="14px"
                  fontWeight="600"
                  color="gray.500"
                  marginBottom="8px"
                >
                  {letter}
                </Text>
                {[1,2].map(i => (
                  <Flex
                    key={i}
                    py={3}
                    align="center"
                    borderBottom="1px"
                    borderColor="gray.100"
                    onClick={() => navigate("/chat")}
                  >
                    <Avatar
                      src={`https://images.unsplash.com/photo-1570295999919-56ceb5ecca6${i}`}
                      size="md"
                      mr={4}
                    />
                    <Flex
                      flex={1}
                      direction="column"
                    >
                      <Text
                        fontSize="16px"
                        fontWeight="500"
                        marginBottom="4px"
                      >
                        {`聯絡人 ${letter}${i}`}
                      </Text>
                      <Text
                        fontSize="14px"
                        color="gray.500"
                      >
                        最近一條消息預覽...
                      </Text>
                    </Flex>
                    {i === 1 && (
                      <Badge
                        bg="primary.500"
                        color="white"
                        borderRadius="full"
                        px={2}
                      >
                        2
                      </Badge>
                    )}
                  </Flex>
                ))}
              </Box>
            ))}
          </Box>
          
          <Flex
            position="fixed"
            right={2}
            top="50%"
            transform="translateY(-50%)"
            direction="column"
            bg="transparent"
            fontSize="12px"
            spacing={1}
            color="gray.500"
          >
            {["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","#"].map(letter => (
              <Button
                key={letter}
                size="xs"
                variant="ghost"
                onClick={() => setSelectedLetter(letter)}
              >
                {letter}
              </Button>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
};

export default Contacts;
