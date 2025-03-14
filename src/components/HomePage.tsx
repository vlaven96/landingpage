import React from 'react';
import { Box, Flex, Heading, Text, Button, useColorModeValue } from '@chakra-ui/react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Replace with your own large GIF or image
import webAppGif from '../assets/landingpage_animation.gif';

const MotionBox = motion(Box);

const HomePage: React.FC = () => {
  const gradientBg = useColorModeValue(
    'linear(to-r, teal.300, blue.400)',
    'linear(to-r, teal.600, blue.800)'
  );

  // Parallax logic
  const { scrollY } = useScroll();
  const gifY = useTransform(scrollY, [0, 800], [0, -300]);

  return (
    <Box position="relative" minH="200vh" overflow="hidden">
      {/* Background gradient (lowest layer) */}
      <Box
        position="absolute"
        top={0}
        left={0}
        w="100%"
        h="100%"
        bgGradient={gradientBg}
        zIndex={-3}
      />

      {/* Parallax GIF */}
      <MotionBox
        style={{ y: gifY }}
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100vh"
        zIndex={-2}
        overflow="hidden"
      >
        <motion.img
          src={webAppGif}
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover'
          }}
          alt="Animated Web App"
        />
      </MotionBox>

      {/* Hero content (on top) */}
      <Flex
        direction="column"
        justify="center"
        align="center"
        textAlign="center"
        color="white"
        minH="100vh"
        px={4}
        zIndex={1}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Heading fontSize={{ base: '3xl', md: '5xl' }} mb={4}>
            Outsourcing Your Tech Needs
          </Heading>
          <Text fontSize={{ base: 'md', md: 'xl' }} maxW="600px" mx="auto">
            We are a fresh yet passionate team offering automations, scrapers,
            AI solutions, chatbots, and more. High-quality work at competitive
            prices to scale your business faster.
          </Text>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ marginTop: '2rem' }}
        >
          <Button colorScheme="blackAlpha" bg="gray.900" size="lg" _hover={{ bg: 'gray.700' }}>
            Contact Us
          </Button>
        </motion.div>
      </Flex>

      {/* Placeholder content so you can scroll */}
      <Box p={6} mt="-100px" color="white">
        <Heading size="lg" mb={4}>
          More About Our Services
        </Heading>
        <Text maxW="700px" mb={8}>
          (Scroll to see the GIF move with parallax. Replace this text with your real content.)
        </Text>
      </Box>
    </Box>
  );
};

export default HomePage;
