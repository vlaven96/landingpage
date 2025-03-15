import React, { useState } from 'react';
import {
  Box,
  Flex,
  Button,
  Input,
  Text,
  useColorModeValue,
  useColorMode
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { PageName, PageIdentifier, DynamicPageData } from '../App';

interface ChatProps {
  // Instead of only “unlock page,” we might also create a new dynamic page
  onUnlockOrCreatePage: (pageId: PageIdentifier, pageData?: DynamicPageData) => void;
}

type Message = {
  type: 'user' | 'system';
  text: string;
};

// Our known pages
const KNOWN_PAGES: PageName[] = ['home', 'about', 'services', 'team', 'contact'];

const MotionBox = motion(Box);

const Chat: React.FC<ChatProps> = ({ onUnlockOrCreatePage }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');

  const { colorMode } = useColorMode();
  const chatBg = useColorModeValue('gray.800', 'gray.900');
  const inputBg = useColorModeValue('gray.100', 'gray.600');
  const borderCol = useColorModeValue('gray.700', 'gray.600');

  /**
   * A mock “chatbot” that checks if the user’s text
   * matches known pages. Otherwise, we create a new page.
   */
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

    // 2) Otherwise, we “dynamically create” a new page
    //    We'll do a minimal approach: the chatbot calls this "Custom Page"
    //    The "content" is just the user's text repeated or a “Chatbot answer”.
    const dynamicPageId = `custom-page-${Date.now()}`; // unique ID
    const systemText = `Creating a new custom page for your request...`;

    setMessages((prev) => [...prev, { type: 'system', text: systemText }]);

    // Suppose we want the page’s title = “Your Custom Topic”
    // and the content = “User said: [userMsg]”
    // or some “AI” text. We'll keep it simple here:
    const newPageData: DynamicPageData = {
      id: dynamicPageId,
      title: 'Custom Topic',
      content: `User question: "${userMsg}"\n\n(This is a custom dynamic page. Use actual AI to fill more content here.)`
    };

    onUnlockOrCreatePage(dynamicPageId, newPageData);
    setInputValue('');
  };

  return (
    <MotionBox
      position="fixed"
      bottom="0"
      left="0"
      width="100%"
      bg={chatBg}
      color="white"
      borderTop="1px solid"
      borderColor={borderCol}
      zIndex={999}
      display="flex"
      flexDirection="column"
      maxH="35vh"
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 50 }}
    >
      {/* Messages area */}
      <Box flex="1" overflowY="auto" p={3}>
        {messages.map((msg, idx) => (
          <Box
            key={idx}
            bg={msg.type === 'user' ? 'blue.600' : 'gray.600'}
            p={2}
            my={1}
            maxW="60%"
            borderRadius="md"
            alignSelf={msg.type === 'user' ? 'flex-end' : 'flex-start'}
          >
            <Text fontSize="sm">{msg.text}</Text>
          </Box>
        ))}
      </Box>

      {/* Input area */}
      <Flex p={2} borderTop="1px solid" borderColor={borderCol}>
        <Input
          placeholder='Ask me anything: "services", "team", or new topic...'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          bg={inputBg}
          color={colorMode === 'light' ? 'black' : 'white'}
        />
        <Button ml={2} onClick={handleSend} colorScheme="teal">
          Send
        </Button>
      </Flex>
    </MotionBox>
  );
};

export default Chat;
