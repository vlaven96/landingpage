import React, { useState } from 'react';
import { Box, Flex, Button, Input, Text, useColorModeValue, useColorMode } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { PageName } from '../App';

interface ChatProps {
  onUnlockPage: (page: PageName) => void;
}

type Message = {
  type: 'user' | 'system';
  text: string;
};

const VALID_COMMANDS: PageName[] = ['about', 'services', 'team', 'contact', 'home'];

const MotionBox = motion(Box);

const Chat: React.FC<ChatProps> = ({ onUnlockPage }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');

  const { colorMode } = useColorMode();
  const chatBg = useColorModeValue('gray.800', 'gray.900');
  const inputBg = useColorModeValue('gray.100', 'gray.600');
  const borderCol = useColorModeValue('gray.700', 'gray.600');

  const handleSend = () => {
    const trimmed = inputValue.trim().toLowerCase();
    if (!trimmed) return;

    // Add user message
    setMessages((prev) => [...prev, { type: 'user', text: inputValue }]);

    // Check if valid command
    if (VALID_COMMANDS.includes(trimmed as PageName)) {
      setMessages((prev) => [
        ...prev,
        {
          type: 'system',
          text: `Unlocking or navigating to "${trimmed}" page...`
        }
      ]);
      onUnlockPage(trimmed as PageName);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          type: 'system',
          text: 'Unrecognized command. Try: home, about, services, team, contact.'
        }
      ]);
    }

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
          placeholder='Type "about", "services", "team", or "contact"'
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
