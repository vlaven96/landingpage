import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Heading,
  Skeleton,
  Stack,
  Avatar,
  Text,
  SimpleGrid,
  Center,
  useColorModeValue
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaUsers } from 'react-icons/fa';
import TypedText from './TypedText';

const MotionBox = motion(Box);

const TeamPage: React.FC = () => {
  const [loading, setLoading] = useState(true);

  // Simulate loading for 1.5s
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  // Same background gradient as HomePage
  const gradientBg = useColorModeValue(
    'linear(to-r, teal.300, blue.400)',
    'linear(to-r, teal.600, blue.800)'
  );

  return (
    <Box position="relative" minH="100vh" overflow="hidden">
      {/* Background gradient */}
      <Box
        position="absolute"
        top={0}
        left={0}
        w="100%"
        h="100%"
        bgGradient={gradientBg}
        zIndex={-2}
      />

      <Flex
        direction="column"
        justify="center"
        align="center"
        minH="100vh"
        px={4}
        textAlign="center"
        color="white"
        position="relative"
        zIndex={1}
      >
        {loading ? (
          <Stack spacing={4} maxW="600px" mx="auto">
            <Center>
              {/* Rotating Users Icon */}
              <MotionBox
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
              >
                <FaUsers size={50} />
              </MotionBox>
            </Center>
            {/* Skeleton placeholders */}
            <Skeleton height="30px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>
        ) : (
          <>
            <Heading fontSize={{ base: '3xl', md: '5xl' }} mb={4}>
              <TypedText text="Meet Our Team" speed={30} />
            </Heading>
            <TypedText text="
              Our experts in automation, AI, and scraping collaborate 
              to deliver world-class results for your business.
            " />

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mt={6}>
              <Center flexDir="column">
                <Avatar name="Jane Smith" size="xl" mb={2} />
                <Text fontWeight="bold">Jane Smith</Text>
                <Text fontSize="sm">Senior Automation Engineer</Text>
              </Center>
              <Center flexDir="column">
                <Avatar name="John Doe" size="xl" mb={2} />
                <Text fontWeight="bold">John Doe</Text>
                <Text fontSize="sm">AI Specialist</Text>
              </Center>
              <Center flexDir="column">
                <Avatar name="Sarah Johnson" size="xl" mb={2} />
                <Text fontWeight="bold">Sarah Johnson</Text>
                <Text fontSize="sm">Scraping Expert</Text>
              </Center>
            </SimpleGrid>
          </>
        )}
      </Flex>
    </Box>
  );
};

export default TeamPage;
