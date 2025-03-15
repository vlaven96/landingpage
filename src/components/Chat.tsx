import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Flex,
  Input,
  Text,
  IconButton,
  useColorModeValue,
  Container,
  VStack,
  Icon,
  Avatar,
  HStack,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { PageName, PageIdentifier, DynamicPageData } from '../App';
import { FaRobot, FaPaperPlane, FaUser } from 'react-icons/fa';

interface ChatProps {
  onUnlockOrCreatePage: (pageId: PageIdentifier, pageData?: DynamicPageData) => void;
}

type Message = {
  type: 'user' | 'system';
  text: string;
};

// Our known pages
const KNOWN_PAGES: PageName[] = ['home', 'about', 'services', 'team', 'contact', 'process'];

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const Chat: React.FC<ChatProps> = ({ onUnlockOrCreatePage }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Colors
  const bgColor = useColorModeValue('gray.50', 'darkBg.900');
  const userMsgBg = useColorModeValue('blue.50', 'blue.900');
  const botMsgBg = useColorModeValue('white', 'darkBg.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const inputBg = useColorModeValue('white', 'darkBg.800');
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const subtextColor = useColorModeValue('gray.600', 'gray.400');
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    const userMsg = inputValue.trim();
    if (!userMsg) return;

    // Add user message
    setMessages((prev) => [...prev, { type: 'user', text: userMsg }]);

    const lower = userMsg.toLowerCase();

    // 1) Check if user asked for a known page
    const found = KNOWN_PAGES.find((p) => lower.includes(p));
    if (found) {
      const systemText = `Navigating to "${found}" page...`;
      setMessages((prev) => [...prev, { type: 'system', text: systemText }]);
      onUnlockOrCreatePage(found);
      setInputValue('');
      return;
    }

    // 2) Otherwise, create a dynamic page
    const dynamicPageId = `custom-page-${Date.now()}`;
    const systemText = `Creating a new custom page for your request...`;

    setMessages((prev) => [...prev, { type: 'system', text: systemText }]);

    const newPageData: DynamicPageData = {
      id: dynamicPageId,
      title: 'Custom Topic',
      content: `User question: "${userMsg}"\n\n(This is a custom dynamic page. Use actual AI to fill more content here.)`
    };

    onUnlockOrCreatePage(dynamicPageId, newPageData);
    setInputValue('');
  };

  return (
    <Box 
      w="100%" 
      minH="100vh"
      bg={bgColor}
      display="flex"
      flexDirection="column"
    >
      {/* Header area - welcome message & instructions */}
      {messages.length === 0 && (
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          pt={{ base: 20, md: 32 }}
          pb={8}
          textAlign="center"
        >
          <Container maxW="container.md">
            <Icon as={FaRobot} fontSize="5xl" color="brand.500" mb={6} />
            <Text fontSize="2xl" fontWeight="bold" mb={4} color={textColor}>
              Welcome to TechSolutions AI Assistant
            </Text>
            <Text fontSize="lg" color={subtextColor} mb={8}>
              Ask me to navigate to different pages or create custom content for you.
              Try asking about "Home", "About", "Services", "Team", or "Contact".
            </Text>
          </Container>
        </MotionBox>
      )}
      
      {/* Chat messages area */}
      <VStack 
        spacing={0}
        w="100%"
        flex="1"
        overflowY="auto"
        pt={messages.length > 0 ? 24 : 0}
        px={0}
      >
        {messages.map((msg, idx) => (
          <Box 
            key={idx}
            w="100%"
            py={4}
            bg={msg.type === 'user' ? userMsgBg : botMsgBg}
            borderBottom="1px solid"
            borderColor={borderColor}
          >
            <Container maxW="container.lg">
              <Flex align="flex-start">
                <Box mr={4} mt={1}>
                  {msg.type === 'user' ? (
                    <Avatar size="sm" bg="brand.600" icon={<FaUser fontSize="0.8rem" />} />
                  ) : (
                    <Avatar size="sm" bg="brand.500" icon={<FaRobot fontSize="0.8rem" />} />
                  )}
                </Box>
                <Box flex="1">
                  <Text fontWeight="bold" fontSize="sm" mb={1} color={textColor}>
                    {msg.type === 'user' ? 'You' : 'AI Assistant'}
                  </Text>
                  <Text color={msg.type === 'user' ? 'white' : textColor}>
                    {msg.text}
                  </Text>
                </Box>
              </Flex>
            </Container>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </VStack>
      
      {/* Input area - fixed at bottom */}
      <Box 
        position="fixed"
        bottom={0}
        left={0}
        right={0}
        borderTop="1px solid"
        borderColor={borderColor}
        bg={bgColor}
        px={4}
        py={6}
        zIndex={10}
      >
        <Container maxW="container.md">
          <InputGroup size="lg">
            <Input
              placeholder="Type your message here..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              borderWidth="1px"
              borderColor={borderColor}
              bg={inputBg}
              color={textColor}
              _hover={{ borderColor: 'brand.400' }}
              _focus={{ borderColor: 'brand.500', boxShadow: 'outline' }}
              pr="4.5rem"
              borderRadius="lg"
              height="56px"
            />
            <InputRightElement width="4.5rem" h="full">
              <IconButton
                h="1.75rem"
                size="lg"
                aria-label="Send message"
                icon={<FaPaperPlane />}
                colorScheme="brand"
                onClick={handleSend}
                isDisabled={!inputValue.trim()}
                borderRadius="md"
                mt={1}
              />
            </InputRightElement>
          </InputGroup>
        </Container>
      </Box>
    </Box>
  );
};

export default Chat;
