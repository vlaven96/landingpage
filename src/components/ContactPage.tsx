import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Input,
  Textarea,
  Stack,
  useColorModeValue
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionButton = motion(Button);

const ContactPage: React.FC = () => {
  const gradientBg = useColorModeValue(
    'linear(to-r, teal.300, blue.400)',
    'linear(to-r, teal.600, blue.800)'
  );

  return (
    <Box position="relative" overflow="hidden" minH="100vh">
      {/* Background Gradient */}
      <Box
        position="absolute"
        top={0}
        left={0}
        w="100%"
        h="100%"
        bgGradient={gradientBg}
        zIndex={-2}
      />

      {/* Decorative Blurred Circle */}
      <MotionBox
        position="absolute"
        top="-100px"
        right="-100px"
        w="300px"
        h="300px"
        bg="whiteAlpha.400"
        borderRadius="50%"
        zIndex={-1}
        filter="blur(80px)"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 2 }}
      />

      <Flex
        direction="column"
        justify="center"
        align="center"
        textAlign="center"
        color="white"
        px={4}
        minH="100vh"
      >
        <MotionHeading
          fontSize={{ base: '3xl', md: '5xl' }}
          mb={4}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Contact Us
        </MotionHeading>

        <MotionText
          fontSize={{ base: 'md', md: 'xl' }}
          maxW="700px"
          mx="auto"
          mb={8}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Ready to learn how automation, scrapers, or AI chatbots can help your
          business? Let’s talk!
        </MotionText>

        <Box
          bg="whiteAlpha.200"
          p={6}
          borderRadius="md"
          w="full"
          maxW="500px"
          mx="auto"
        >
          <Stack spacing={3} textAlign="left">
            <Input placeholder="Your Name" bg="whiteAlpha.800" color="black" />
            <Input placeholder="Your Email" bg="whiteAlpha.800" color="black" />
            <Textarea
              placeholder="How can we help?"
              bg="whiteAlpha.800"
              color="black"
            />
            <MotionButton
              colorScheme="blackAlpha"
              bg="gray.900"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              _hover={{ bg: 'gray.700' }}
            >
              Send Message
            </MotionButton>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
};

export default ContactPage;
