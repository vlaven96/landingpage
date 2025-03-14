import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Heading,
  Skeleton,
  Stack,
  Center,
  useColorModeValue
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaRobot } from 'react-icons/fa';
import TypedText from './TypedText';

const MotionBox = motion(Box);

const AboutPage: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // We reuse the same background gradient as home, for visual consistency
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
              <MotionBox
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
              >
                <FaRobot size={50} />
              </MotionBox>
            </Center>
            <Skeleton height="30px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>
        ) : (
          <>
            <Heading fontSize={{ base: '3xl', md: '5xl' }} mb={4}>
              <TypedText text="About Our Company" speed={30} />
            </Heading>
            <TypedText text="
              We’re a passionate outsourcing team offering software automation,
              AI-driven solutions, and scraping. Even though we’re at the start
              of our journey, our dedication to delivering top-notch results is
              unwavering.
            " />
          </>
        )}
      </Flex>
    </Box>
  );
};

export default AboutPage;
