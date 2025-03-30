//@ts-nocheck

import React, { useState, useEffect } from 'react';
import { 
  ChakraProvider, 
  Flex, 
  Button, 
  Text, 
  Avatar, 
  FormControl, 
  FormLabel, 
  Input, 
  RadioGroup, 
  Radio, 
  HStack, 
  Select, 
  Textarea, 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  VStack, 
  Box,
  useToast,
  Spinner
} from '@chakra-ui/react';
import { IconArrowLeft, IconCamera, IconPhoto } from '@tabler/icons-react';
import { kStyleGlobal } from '../../theme';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, supabase } from '../../services/supabase';
import { UserProfile } from '../../services/supabase';

const EditProfile = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  
  // 表單狀態
  const [name, setName] = useState('');
  const [gender, setGender] = useState('secret');
  const [birthdate, setBirthdate] = useState('');
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [bio, setBio] = useState('');
  const [uploadedAvatar, setUploadedAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  useEffect(() => {
    // 載入用戶資料
    const loadUserProfile = async () => {
      try {
        setIsLoading(true);
        const user = await getCurrentUser();
        if (user) {
          setUserProfile(user);
          
          // 設置初始表單值
          setName(user.name || '');
          setGender(user.gender || 'secret');
          setBirthdate(user.birthdate || '');
          setProvince(user.province || '');
          setCity(user.city || '');
          setBio(user.bio || '');
          
          // 如果有頭像，預覽它
          if (user.avatar_url) {
            setAvatarPreview(user.avatar_url);
          }
        } else {
          // 若未登入則重定向到登入頁
          navigate('/login');
        }
      } catch (error) {
        toast({
          title: '載入資料失敗',
          description: '無法載入您的個人資料，請稍後再試',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        console.error('載入用戶資料失敗:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUserProfile();
  }, [navigate, toast]);

  const handleGoBack = () => {
    navigate('/profile');
  };

  // 處理頭像上傳
  const handleAvatarUpload = async (file: File) => {
    try {
      if (!userProfile?.id) {
        throw new Error('用戶ID未找到');
      }
      
      // 顯示預覽
      const preview = URL.createObjectURL(file);
      setAvatarPreview(preview);
      setUploadedAvatar(file);
      setIsModalOpen(false);
      
      toast({
        title: '頭像已選擇',
        description: '點擊保存按鈕將上傳新頭像',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: '頭像選擇失敗',
        description: '請稍後再試',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.error('頭像選擇錯誤:', error);
    }
  };

  // 實際上傳頭像到 Supabase Storage
  const uploadAvatarToStorage = async (file: File, userId: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('user-avatars')
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from('user-avatars')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSave = async () => {
    if (!userProfile?.id) {
      toast({
        title: '保存失敗',
        description: '無法獲取用戶信息',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      setIsSaving(true);
      
      let avatarUrl = userProfile.avatar_url;
      
      // 如果有新上傳的頭像，則上傳到 Storage
      if (uploadedAvatar) {
        avatarUrl = await uploadAvatarToStorage(uploadedAvatar, userProfile.id);
      }
      
      // 更新用戶資料
      const { error } = await supabase
        .from('Users')
        .update({
          name,
          gender,
          birthdate,
          province,
          city,
          bio,
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', userProfile.id);
        
      if (error) throw error;
      
      toast({
        title: '個人資料已更新',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      navigate('/profile');
    } catch (error) {
      toast({
        title: '保存失敗',
        description: '更新個人資料時發生錯誤',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.error('保存個人資料錯誤:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  // 處理相機拍照
  const handleTakePhoto = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.capture = 'user';
    fileInput.click();
    
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        handleAvatarUpload(file);
      }
    };
  };
  
  // 處理相簿選擇
  const handleChooseFromGallery = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.click();
    
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        handleAvatarUpload(file);
      }
    };
  };

  if (isLoading) {
    return (
      <ChakraProvider theme={kStyleGlobal}>
        <Flex
          justify="center"
          align="center"
          h="100vh"
          bg="background"
        >
          <Spinner size="xl" color="primary.500" />
        </Flex>
      </ChakraProvider>
    );
  }

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
          px={6}
          py={4}
          borderBottom="1px"
          borderColor="gray.100"
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
            個人資料編輯
          </Text>
          <Box w="24px" />
        </Flex>
        <Flex
          direction="column"
          align="center"
          px={6}
          py={8}
          gap={8}
          flex={1}
          overflowY="auto"
        >
          <Flex
            direction="column"
            align="center"
            gap={4}
          >
            <Avatar
              size="2xl"
              src={avatarPreview || userProfile?.avatar_url}
              name={userProfile?.name || "用戶"}
              borderRadius="full"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleOpenModal}
            >
              更換頭像
            </Button>
          </Flex>
          <Flex
            direction="column"
            w="100%"
            gap={6}
          >
            <FormControl>
              <FormLabel>暱稱</FormLabel>
              <Input
                placeholder="輸入暱稱"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>性別</FormLabel>
              <RadioGroup value={gender} onChange={setGender}>
                <HStack spacing={6}>
                  <Radio value="male">男</Radio>
                  <Radio value="female">女</Radio>
                  <Radio value="secret">保密</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
            <FormControl>
              <FormLabel>生日</FormLabel>
              <Input
                type="date"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>地區</FormLabel>
              <Flex gap={4}>
                <Select 
                  placeholder="選擇省份" 
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                >
                  <option value="taipei">臺北</option>
                  <option value="taichung">臺中</option>
                  <option value="kaohsiung">高雄</option>
                  <option value="hsinchu">新竹</option>
                  <option value="tainan">臺南</option>
                </Select>
                <Select 
                  placeholder="選擇城市"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  isDisabled={!province}
                >
                  {province === 'taipei' && (
                    <>
                      <option value="daan">大安區</option>
                      <option value="xinyi">信義區</option>
                      <option value="zhongshan">中山區</option>
                    </>
                  )}
                  {province === 'taichung' && (
                    <>
                      <option value="north">北區</option>
                      <option value="west">西區</option>
                      <option value="east">東區</option>
                    </>
                  )}
                  {province === 'kaohsiung' && (
                    <>
                      <option value="gushan">鼓山區</option>
                      <option value="lingya">苓雅區</option>
                      <option value="qianjin">前金區</option>
                    </>
                  )}
                </Select>
              </Flex>
            </FormControl>
            <FormControl>
              <FormLabel>個性簽名</FormLabel>
              <Textarea
                placeholder="寫點什麼吧..."
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </FormControl>
          </Flex>
        </Flex>
        <Flex
          px={6}
          py={4}
          borderTop="1px"
          borderColor="gray.100"
        >
          <Button
            w="100%"
            onClick={handleSave}
            isLoading={isSaving}
            loadingText="保存中"
          >
            保存
          </Button>
        </Flex>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>更換頭像</ModalHeader>
            <ModalBody>
              <VStack spacing={4}>
                <Button 
                  w="100%" 
                  leftIcon={<IconCamera />}
                  onClick={handleTakePhoto}
                >
                  拍照
                </Button>
                <Button 
                  w="100%" 
                  leftIcon={<IconPhoto />}
                  onClick={handleChooseFromGallery}
                >
                  從相簿選擇
                </Button>
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Flex>
    </ChakraProvider>
  );
};

export default EditProfile;
