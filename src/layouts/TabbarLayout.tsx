import { Box, Flex, Icon, Text } from '@chakra-ui/react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { IconMessage, IconUsers, IconCompass, IconUser } from '@tabler/icons-react'

const TabbarLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  
  const tabs = [
    { name: '聊天', path: '/chat-list', icon: IconMessage },
    { name: '联系人', path: '/contacts', icon: IconUsers },
    { name: '发现', path: '/discover', icon: IconCompass },
    { name: '我的', path: '/profile', icon: IconUser },
  ]

  return (
    <Box display="flex" flexDirection="column" h="100vh">
      <Box flex="1" overflow="auto">
        <Outlet />
      </Box>
      
      <Flex 
        as="nav" 
        bg="white" 
        borderTop="1px solid" 
        borderColor="gray.200" 
        justifyContent="space-around"
        py={2}
      >
        {tabs.map((tab) => (
          <Flex 
            key={tab.path}
            direction="column"
            align="center"
            justify="center"
            onClick={() => navigate(tab.path)}
            color={location.pathname === tab.path ? "blue.500" : "gray.500"}
            cursor="pointer"
            px={4}
            py={1}
          >
            <Icon as={tab.icon} boxSize={6} />
            <Text fontSize="xs" mt={1}>{tab.name}</Text>
          </Flex>
        ))}
      </Flex>
    </Box>
  )
}

export default TabbarLayout
