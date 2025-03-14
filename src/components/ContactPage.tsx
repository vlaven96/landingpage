import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Heading,
  Skeleton,
  Stack,
  Input,
  Textarea,
  Button,
  Center,
  useColorModeValue
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaEnvelope } from 'react-icons/fa';
import TypedText from './TypedText';

const MotionBox = motion(Box);

const ContactPage: React.FC = () => {
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
              {/* Rotating Envelope Icon */}
              <MotionBox
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
              >
                <FaEnvelope size={50} />
              </MotionBox>
            </Center>
            {/* Skeleton placeholders */}
            <Skeleton height="30px" />
            <Skeleton height="20px" />
            <Skeleton height="40px" />
          </Stack>
        ) : (
          <>
            <Heading fontSize={{ base: '3xl', md: '5xl' }} mb={4}>
              <TypedText text="Contact Us" speed={30} />
            </Heading>
            <TypedText text="
              Ready to learn how our outsourcing services can help? 
              Drop us a line below and we’ll be in touch!
            " />
            <Stack spacing={3} mt={6} maxW="400px" mx="auto" w="full">
              <Input
                placeholder="Your Name"
                bg="whiteAlpha.800"
                color="black"
              />
              <Input
                placeholder="Your Email"
                bg="whiteAlpha.800"
                color="black"
              />
              <Textarea
                placeholder="Your Message"
                bg="whiteAlpha.800"
                color="black"
              />
              <Button colorScheme="teal">Send Message</Button>
            </Stack>
          </>
        )}
      </Flex>
    </Box>
  );
};

export default ContactPage;
