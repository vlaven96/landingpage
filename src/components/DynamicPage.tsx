import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { DynamicPageData } from '../App';
import TypedText from './TypedText';

const MotionBox = motion(Box);

interface DynamicPageProps {
  page: DynamicPageData;
}

const DynamicPage: React.FC<DynamicPageProps> = ({ page }) => {
  const gradientBg = useColorModeValue(
    'linear(to-r, teal.300, blue.400)',
    'linear(to-r, teal.600, blue.800)'
  );

  return (
    <Box position="relative" minH="100vh" overflow="hidden">
      {/* Same gradient background style */}
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
        <Heading fontSize={{ base: '3xl', md: '5xl' }} mb={4}>
          <TypedText text={page.title} speed={30} />
        </Heading>
        <Text maxW="600px" mx="auto">
          <TypedText text={page.content} speed={20} />
        </Text>
      </Flex>
    </Box>
  );
};

export default DynamicPage;
