import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  useColorModeValue
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionButton = motion(Button);

const ServicesPage: React.FC = () => {
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
          Our Services
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
          We deliver high-quality, cost-effective outsourcing for a variety of
          solutions, including software automations, web scrapers, AI-powered
          chatbots, and custom machine learning models. Let us handle the
          technical heavy-lifting, so you can focus on business growth.
        </MotionText>

        <MotionButton
          colorScheme="blackAlpha"
          bg="gray.900"
          size="lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          _hover={{ bg: 'gray.700' }}
        >
          Get a Free Quote
        </MotionButton>
      </Flex>
    </Box>
  );
};

export default ServicesPage;
