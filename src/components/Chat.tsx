import React, { useState } from 'react';
import { PageName } from '../App';
import {
  Box,
  Flex,
  Button,
  Input,
  Text,
  useColorModeValue
} from '@chakra-ui/react';

interface ChatProps {
  onUnlockPage: (page: PageName) => void;
}

type Message = {
  type: 'user' | 'system';
  text: string;
};

const VALID_COMMANDS: PageName[] = ['about', 'services', 'team', 'contact'];

const Chat: React.FC<ChatProps> = ({ onUnlockPage }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');

  const chatBg = useColorModeValue('gray.50', 'gray.800');

  const handleSend = () => {
    const trimmed = inputValue.trim().toLowerCase();
    if (!trimmed) return;

    // 1. Display user message
    setMessages((prev) => [...prev, { type: 'user', text: inputValue }]);

    // 2. Check if it matches a valid page
    if (VALID_COMMANDS.includes(trimmed as PageName)) {
      setMessages((prev) => [
        ...prev,
        {
          type: 'system',
          text: `Unlocking "${trimmed}" page...`
        }
      ]);
      onUnlockPage(trimmed as PageName);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          type: 'system',
          text: 'Unrecognized command. Try: about, services, team, or contact.'
        }
      ]);
    }

    setInputValue('');
  };

  return (
    <Box
      position="fixed"
      bottom="0"
      left="0"
      w="100%"
      maxH="35vh"
      bg={chatBg}
      boxShadow="md"
      borderTop="1px solid"
      borderColor="gray.200"
      zIndex={999}
      display="flex"
      flexDir="column"
    >
      {/* Chat messages */}
      <Box flex="1" overflowY="auto" p={3}>
        {messages.map((msg, idx) => (
          <Box
            key={idx}
            bg={msg.type === 'user' ? 'blue.500' : 'gray.400'}
            color="white"
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

      {/* Input */}
      <Flex p={2} borderTop="1px solid" borderColor="gray.200">
        <Input
          placeholder='Type "about", "services", "team", or "contact"'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          color="black"
        />
        <Button ml={2} onClick={handleSend} colorScheme="blue">
          Send
        </Button>
      </Flex>
    </Box>
  );
};

export default Chat;
