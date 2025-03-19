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
  HStack,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react';
import { DefaultPageName, PageIdentifier, DynamicPageData } from '../App';
import { FaRobot } from 'react-icons/fa';
import { IoSend } from 'react-icons/io5';
import { askChatbot } from '../services/chatbotService';

interface ChatProps {
  onUnlockOrCreatePage: (pageId: PageIdentifier, pageData?: DynamicPageData) => void;
}

type Message = {
  type: 'user' | 'system';
  text: string;
};

// Our known pages
// TypeScript fix for complex union type
type KnownPage = 'home' | 'about' | 'services' | 'team' | 'contact' | 'process';
const KNOWN_PAGES: KnownPage[] = ['home', 'about', 'services', 'team', 'contact', 'process'];

const Chat: React.FC<ChatProps> = ({ onUnlockOrCreatePage }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Constants
  const INPUT_AREA_HEIGHT = "56px";
  
  // Colors - Using Material Design palette
  const bgColor = useColorModeValue('#FAFAFA', '#121212');
  const userMsgBg = useColorModeValue('#E3F2FD', '#263238');
  const botMsgBg = useColorModeValue('#FFFFFF', '#1E1E1E');
  const borderColor = useColorModeValue('#EEEEEE', '#333333');
  const inputBg = useColorModeValue('#FFFFFF', '#1E1E1E');
  const textColor = useColorModeValue('#212121', '#EEEEEE');
  const subtextColor = useColorModeValue('#757575', '#AAAAAA');
  const chatboxBg = useColorModeValue('#FFFFFF', '#1E1E1E');
  const primaryColor = useColorModeValue('#2196F3', '#90CAF9');
  
  // Scroll to bottom when messages change, but only if there are messages
  useEffect(() => {
    if (messages.length > 0 && isFocused) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isFocused]);
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = async () => {
    if (inputValue.trim()) {
      // Add user message to chat
      const userMessage: Message = { text: inputValue, type: 'user' };
      setMessages(prev => [...prev, userMessage]);
      setInputValue('');
      
      try {
        // Call the backend API
        const response = await askChatbot(inputValue.trim());
        
        // Add bot response to chat
        setMessages(prev => [...prev, { 
          text: response.answer, 
          type: 'system' 
        }]);
        
        // Only navigate if page_name is explicitly provided
        if (response.page_name) {
          // If page_name exists, navigate to that page
          onUnlockOrCreatePage(response.page_name);
        }
        // Otherwise, just keep the conversation in the chat
        
      } catch (error) {
        // Handle error gracefully
        setMessages(prev => [...prev, { 
          text: "Sorry, I'm having trouble connecting right now. Please try again later.", 
          type: 'system' 
        }]);
        console.error('Chat error:', error);
      }
    }
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  // Function to focus input programmatically
  const focusInput = () => {
    inputRef.current?.focus();
  };
  
  return (
    <Box 
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      zIndex={100}
      height={isFocused ? `calc(30vh)` : INPUT_AREA_HEIGHT}
      bg={chatboxBg}
      borderTop="1px solid"
      borderColor={borderColor}
      boxShadow="sm" 
      overflow="hidden"
      display="flex"
      flexDirection="column"
      width="100%"
      onClick={focusInput}
    >
      {/* Chat messages area - only visible when focused */}
      {isFocused && (
        <Box
          flex="1"
          display="flex"
          flexDirection="column"
          overflow="hidden"
          p={2}
        >
          {/* Welcome message when no messages */}
          {messages.length === 0 && (
            <Box
              p={4}
              textAlign="center"
              my="auto"
            >
              <Icon as={FaRobot} fontSize="xl" color={primaryColor} mb={2} />
              <Text fontSize="sm" fontWeight="medium" mb={1} color={textColor}>
                How can I help you today?
              </Text>
              <Text fontSize="xs" color={subtextColor}>
                Ask me to navigate to different pages or create custom content for you.
              </Text>
            </Box>
          )}
          
          {/* Chat messages area */}
          <VStack 
            spacing={2}
            flex="1"
            overflowY="auto"
            p={0}
            mb={2}
            width="100%"
            maxW="container.xl"
            mx="auto"
            align="stretch"
          >
            {messages.map((msg, idx) => (
              <Box 
                key={idx}
                maxW="80%"
                py={2}
                px={3}
                my={0.5}
                bg={msg.type === 'user' ? userMsgBg : botMsgBg}
                borderRadius="lg"
                alignSelf={msg.type === 'user' ? 'flex-end' : 'flex-start'}
                boxShadow="sm"
              >
                <HStack spacing={2} align="center" mb={1}>
                  {msg.type !== 'user' && (
                    <Avatar size="2xs" bg={primaryColor} icon={<FaRobot fontSize="0.6rem" />} />
                  )}
                  <Text fontWeight="medium" fontSize="xs" color={textColor}>
                    {msg.type === 'user' ? 'You' : 'Assistant'}
                  </Text>
                </HStack>
                <Text fontSize="sm" color={textColor}>
                  {msg.text}
                </Text>
              </Box>
            ))}
            <div ref={messagesEndRef} />
          </VStack>
        </Box>
      )}
      
      {/* Input area - always visible with consistent height */}
      <Box 
        px={4}
        py={2}
        borderTop={isFocused ? "1px solid" : "none"}
        borderColor={borderColor}
        bg={chatboxBg}
        height={INPUT_AREA_HEIGHT}
        minHeight={INPUT_AREA_HEIGHT}
        display="flex"
        alignItems="center"
      >
        <InputGroup size="md" maxW="container.xl" mx="auto">
          <Input
            ref={inputRef}
            placeholder="Ask a question..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            borderWidth="1px"
            borderColor={borderColor}
            bg={inputBg}
            color={textColor}
            _hover={{ borderColor: primaryColor }}
            _focus={{ borderColor: primaryColor, boxShadow: 'none' }}
            pr="2.5rem"
            borderRadius="full"
            size="md"
            fontSize="sm"
          />
          <InputRightElement width="2.5rem">
            <IconButton
              h="1.75rem"
              w="1.75rem"
              size="sm"
              aria-label="Send message"
              icon={<IoSend size="0.9rem" />}
              color={inputValue.trim() ? "white" : "gray.400"}
              bg={inputValue.trim() ? primaryColor : "transparent"}
              _hover={{ bg: inputValue.trim() ? `${primaryColor}` : "transparent" }}
              isDisabled={!inputValue.trim()}
              borderRadius="full"
              onMouseDown={(e) => e.preventDefault()}
            />
          </InputRightElement>
        </InputGroup>
      </Box>
    </Box>
  );
};

export default Chat;
