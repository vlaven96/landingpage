import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Flex,
  Input,
  Text,
  IconButton,
  useColorModeValue,
  VStack,
  Icon,
  Avatar,
  InputGroup,
  InputRightElement,
  Container,
  Textarea
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { PageIdentifier, DynamicPageData } from '../App';
import { FaRobot } from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs';
import { askChatbot } from '../services/chatbotService';

interface ChatProps {
  onUnlockOrCreatePage: (pageId: PageIdentifier, pageData?: DynamicPageData, newLanguage?: Language) => void;
  currentPage: PageIdentifier;
  systemMessage?: string | null;
  onSystemMessageDisplayed?: () => void;
}

type Message = {
  type: 'user' | 'system';
  text: string;
};

const MotionBox = motion(Box);

const Chat: React.FC<ChatProps> = ({ 
  onUnlockOrCreatePage, 
  currentPage,
  systemMessage,
  onSystemMessageDisplayed
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Colors
  const bgColor = useColorModeValue('white', 'darkBg.900');
  const userMsgBg = useColorModeValue('brand.500', 'brand.600');
  const botMsgBg = useColorModeValue('gray.100', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const inputBg = useColorModeValue('white', 'darkBg.800');
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const subtextColor = useColorModeValue('gray.600', 'gray.400');
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  // Handle system message effect
  useEffect(() => {
    if (systemMessage) {
      // Add the message to chat
      setMessages(prev => [...prev, { 
        text: systemMessage, 
        type: 'system' 
      }]);
      
      // Set chat to focused state to make it visible
      setIsFocused(true);
      
      // Notify parent component that message was displayed
      if (onSystemMessageDisplayed) {
        onSystemMessageDisplayed();
      }
    }
  }, [systemMessage, onSystemMessageDisplayed]);
  
  // Add a useEffect to handle document-wide click events
  useEffect(() => {
    // Function to handle clicks outside the chat
    const handleClickOutside = (event: MouseEvent) => {
      const chatContainer = document.getElementById('chat-container');
      
      // If the chat is expanded and the click is outside the chat
      if (isFocused && chatContainer && !chatContainer.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    
    // Add event listener when chat is focused
    if (isFocused) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    // Clean up the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFocused]);
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    // Ensure the chat container is fully visible when focused
    setTimeout(() => {
      const chatContainer = document.getElementById('chat-container');
      if (chatContainer) {
        chatContainer.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    }, 100);
  };

  const handleBlur = () => {
    // Only unfocus if the active element is not inside the chat component
    setTimeout(() => {
      const activeElement = document.activeElement;
      const chatContainer = document.getElementById('chat-container');
      if (!chatContainer?.contains(activeElement)) {
        setIsFocused(false);
      }
    }, 100);
  };

  const handleSend = async () => {
    if (inputValue.trim()) {
      // Keep focus when sending a message
      setIsFocused(true);
      
      // Add user message to chat
      const userMessage: Message = { text: inputValue, type: 'user' };
      setMessages(prev => [...prev, userMessage]);
      setInputValue('');
      
      // Make sure the UI updates and scrolls to bottom before making the API call
      setTimeout(async () => {
        try {
          // Call the backend API
          const response = await askChatbot(inputValue.trim());
          
          // Add bot response to chat
          setMessages(prev => [...prev, { 
            text: response.answer, 
            type: 'system' 
          }]);
          
          // Handle language change if provided by server
          if (response.lang && (response.lang === 'en' || response.lang === 'ro')) {
            // If no page_name is provided, stay on current page but update language
            const pageToUse = response.page_name || currentPage;
            onUnlockOrCreatePage(pageToUse, undefined, response.lang);
          }
          
          // Only navigate if page_name is explicitly provided
          if (response.page_name) {
            // If page_name exists, navigate to that page
            onUnlockOrCreatePage(response.page_name);
          }
          
          // Ensure the chat container is properly positioned after response
          setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
          
        } catch (error) {
          // Handle error gracefully
          setMessages(prev => [...prev, { 
            text: "Sorry, I'm having trouble connecting right now. Please try again later.", 
            type: 'system' 
          }]);
          console.error('Chat error:', error);
        }
      }, 100);
    }
  };

  return (
    <MotionBox
      id="chat-container"
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      width="100%"
      height={isFocused ? "calc(30vh)" : "auto"}
      bg={bgColor}
      borderTopWidth="0"
      boxShadow="0 -2px 10px rgba(0, 0, 0, 0.07)"
      zIndex={1000}
      transition={{ duration: 0.2 }}
      overflow="hidden"
    >
      {/* Chat header - Material Design style */}
      <Flex 
        py={3}
        px={4}
        bg="brand.500" 
        color="white" 
        alignItems="center"
        borderRadius="0"
        boxShadow="0 2px 4px rgba(0,0,0,0.2)"
        height="56px"
      >
        <Icon as={FaRobot} mr={3} fontSize="18px" />
        <Text fontWeight="500" letterSpacing="0.2px">AI Assistant</Text>
      </Flex>

      {/* Chat messages area */}
      {isFocused && (
        <VStack 
          spacing={4}
          height="calc(30vh - 136px)"
          overflowY="auto"
          p="16px 24px 16px 60px"
          bg={bgColor}
          align="stretch"
        >
          {messages.length === 0 ? (
            <Flex direction="column" justify="center" align="center" height="100%" p={4}>
              <Icon as={FaRobot} fontSize="3xl" color="brand.500" mb={4} />
              <Text fontSize="sm" color={subtextColor} textAlign="center">
                Ask me to navigate to different pages or create custom content for you.
              </Text>
            </Flex>
          ) : (
            messages.map((msg, idx) => (
              <Box 
                key={idx}
                alignSelf={msg.type === 'user' ? 'flex-end' : 'flex-start'}
                maxWidth="75%"
                position="relative"
                mb={2}
              >
                {msg.type === 'system' && (
                  <Avatar 
                    size="sm" 
                    bg="brand.500" 
                    icon={<FaRobot fontSize="0.75rem" />} 
                    position="absolute"
                    left="-40px"
                    top="0"
                    boxShadow="0 1px 2px rgba(0,0,0,0.2)"
                  />
                )}
                <Box
                  p={3}
                  borderRadius={msg.type === 'user' ? "18px 18px 4px 18px" : "18px 18px 18px 4px"}
                  bg={msg.type === 'user' ? userMsgBg : botMsgBg}
                  boxShadow="0 1px 2px rgba(0,0,0,0.1)"
                  mt={msg.type === 'system' ? 1 : 0}
                >
                  <Text 
                    fontSize="md" 
                    color={msg.type === 'user' ? 'white' : textColor}
                    lineHeight="1.5"
                  >
                    {msg.text}
                  </Text>
                </Box>
              </Box>
            ))
          )}
          <div ref={messagesEndRef} />
        </VStack>
      )}

      {/* Input area - Material Design style */}
      <Box 
        p={4}
        borderTop="1px solid"
        borderColor={borderColor}
        bg={bgColor}
        minHeight="64px"
        display="flex"
        alignItems="center"
      >
        <Container maxW="container.xl">
          <InputGroup size="lg">
            <Textarea
              placeholder="Type your message here..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              onFocus={handleFocus}
              onBlur={handleBlur}
              borderWidth="1px"
              borderColor="transparent"
              bg={inputBg}
              color={textColor}
              _hover={{ borderColor: 'brand.300' }}
              _focus={{ borderColor: 'brand.500', boxShadow: 'none' }}
              pr="4.5rem"
              borderRadius="8px"
              minHeight="48px"
              maxHeight="80px"
              resize="none"
              transition="all 0.2s"
              overflow="auto"
              fontSize="md"
              pt="12px"
              pb="12px"
            />
            <InputRightElement width="4.5rem" h="full" alignItems="center" pr={2}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                h="36px"
                w="36px"
                color={inputValue.trim() ? "brand.500" : "gray.300"}
                cursor={inputValue.trim() ? "pointer" : "default"}
                onClick={inputValue.trim() ? handleSend : undefined}
                transition="all 0.2s"
                _hover={inputValue.trim() ? { color: "brand.600" } : {}}
              >
                <BsArrowRight size={20} />
              </Box>
            </InputRightElement>
          </InputGroup>
        </Container>
      </Box>
    </MotionBox>
  );
};

export default Chat;
