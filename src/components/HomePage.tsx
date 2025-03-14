import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  useColorModeValue
} from '@chakra-ui/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import webAppGif from '../assets/landingpage_animation.gif';

const MotionBox = motion(Box);

/**
 * This component uses a "parallax" effect:
 *  - The GIF is placed in the background, sized to be large and in front of the gradient.
 *  - As the user scrolls, the GIF moves (via a negative y transform).
 *  - Your hero text sits on top, so the user sees the GIF behind it.
 *  - The page extends below the hero section so you can see the effect.
 */
const HomePage: React.FC = () => {
  // Decide on light/dark gradient
  const gradientBg = useColorModeValue(
    'linear(to-r, teal.300, blue.400)',
    'linear(to-r, teal.600, blue.800)'
  );

  // Hook into scroll to create parallax
  const { scrollY } = useScroll();

  /**
   * We define how far the GIF should move as we scroll from 0px to, say, 800px.
   * At scrollY=0, y=0 (no movement).
   * At scrollY=800, y=-300 (the GIF moves up by 300px).
   * Adjust the numbers to your liking.
   */
  const gifY = useTransform(scrollY, [0, 800], [0, -300]);

  return (
    <Box position="relative" minH="200vh" overflow="hidden">
      {/*
        1) Background Gradient (lowest layer)
      */}
      <Box
        position="absolute"
        top={0}
        left={0}
        w="100%"
        h="100%"
        bgGradient={gradientBg}
        zIndex={-3}
      />

      {/*
        2) The large GIF with parallax effect
           - Stretches across the screen in "hero" style
           - Moves on scroll via 'gifY' transform
      */}
      <MotionBox
        style={{ y: gifY }}
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100vh"  /* The GIF covers the top "hero" portion */
        zIndex={-2}
        overflow="hidden"
      >
        <motion.img
          src={webAppGif}
          style={{
            width: '100%',
            height: 'auto'
          }}
          alt="Animated Web App"
        />
      </MotionBox>

      {/*
        3) Hero Text & Content (on top of the GIF)
      */}
      <Flex
        direction="column"
        justify="center"
        align="center"
        textAlign="center"
        color="white"
        minH="100vh"    /* Takes full viewport height */
        px={4}
        zIndex={1}      /* Above the GIF */
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
            AI solutions, chatbots, and more. Get high-quality work at
            competitive prices and scale your business faster.
          </Text>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ marginTop: '2rem' }}
        >
          <Button
            colorScheme="blackAlpha"
            bg="gray.900"
            size="lg"
            _hover={{ bg: 'gray.700' }}
          >
            Contact Us
          </Button>
        </motion.div>
      </Flex>

      {/*
        4) Additional placeholder content below the hero
           so you can scroll and see the GIF move.
           Replace with real sections or remove if not needed.
      */}
      <Box p={6} mt="-100px" color="white">
        <Heading size="lg" mb={4}>
          More About Our Services
        </Heading>
        <Text maxW="700px" mb={8}>
          Scroll further to watch the GIF move. You can add your actual landing
          page sections here: about, services, etc.
        </Text>
        <Text maxW="700px" mb={8}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </Box>
    </Box>
  );
};

export default HomePage;
