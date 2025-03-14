import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  SimpleGrid,
  Avatar,
  useColorModeValue
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

const TeamPage: React.FC = () => {
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
          Meet Our Team
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
          Our dedicated professionals bring together expertise in automation,
          AI, and creative problem-solving to help you achieve stellar results.
        </MotionText>

        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          spacing={8}
          maxW="800px"
          w="full"
          px={2}
        >
          {/* Team Member 1 */}
          <Flex direction="column" align="center">
            <Avatar name="Jane Smith" size="xl" mb={2} />
            <Text fontWeight="bold">Jane Smith</Text>
            <Text fontSize="sm">Senior Automation Engineer</Text>
          </Flex>

          {/* Team Member 2 */}
          <Flex direction="column" align="center">
            <Avatar name="John Doe" size="xl" mb={2} />
            <Text fontWeight="bold">John Doe</Text>
            <Text fontSize="sm">AI Specialist</Text>
          </Flex>

          {/* Team Member 3 */}
          <Flex direction="column" align="center">
            <Avatar name="Sarah Johnson" size="xl" mb={2} />
            <Text fontWeight="bold">Sarah Johnson</Text>
            <Text fontSize="sm">Scraping Expert</Text>
          </Flex>
        </SimpleGrid>
      </Flex>
    </Box>
  );
};

export default TeamPage;
