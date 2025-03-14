import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Heading,
  Skeleton,
  Stack,
  SimpleGrid,
  Center,
  useColorModeValue
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaCog } from 'react-icons/fa';
import TypedText from './TypedText';
import { Language } from '../App';

const MotionBox = motion(Box);

interface ServicesPageProps {
  language: Language;
}

const ServicesPage: React.FC<ServicesPageProps> = ({ language }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Use same gradient as Home
  const gradientBg = useColorModeValue(
    'linear(to-r, teal.300, blue.400)',
    'linear(to-r, teal.600, blue.800)'
  );

  // Quick translations
  const pageTitle = language === 'en' ? 'Our Services' : 'Serviciile Noastre';
  const pageIntro = language === 'en'
    ? `We specialize in automations, scrapers, AI-driven chatbots, and more, helping you streamline operations and scale efficiently.`
    : `Suntem specializați în automatizări, scrapers, chatbot-uri bazate pe AI și multe altele, ajutându-vă să optimizați operațiunile și să creșteți eficiența.`;

  const listItems = language === 'en'
    ? [
        '- Robotic Process Automation',
        '- Web Scraping & Data Extraction',
        '- AI Chatbot Development',
        '- Custom ML Solutions'
      ]
    : [
        '- Automatizare Robotică a Proceselor',
        '- Scraping Web & Extracție de Date',
        '- Dezvoltare Chatbot AI',
        '- Soluții ML Personalizate'
      ];

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
                <FaCog size={50} />
              </MotionBox>
            </Center>
            <Skeleton height="30px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>
        ) : (
          <>
            <Heading fontSize={{ base: '3xl', md: '5xl' }} mb={4}>
              <TypedText text={pageTitle} speed={30} />
            </Heading>
            <TypedText text={pageIntro} />
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mt={6}>
              {listItems.map((item, index) => (
                <TypedText key={index} text={item} />
              ))}
            </SimpleGrid>
          </>
        )}
      </Flex>
    </Box>
  );
};

export default ServicesPage;
