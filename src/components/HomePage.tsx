import React from 'react';
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Button,
  Stack,
  useColorModeValue
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Language } from '../App';
import NeuralNetworkAnimation from './NeuralNetworkAnimation';

const MotionBox = motion(Box);
const MotionText = motion(Text);

interface HomePageProps {
  language: Language;
}

const HomePage: React.FC<HomePageProps> = ({ language }) => {
  // Content
  const headingText = language === 'en'
    ? 'Outsourcing Your Tech Needs'
    : 'Externalizează Nevoile Tale Tehnice';

  const subText = language === 'en'
    ? 'We deliver cutting-edge automation, AI solutions, and scalable software to help your business grow faster.'
    : 'Oferim automatizări avansate, soluții AI și software scalabil pentru a ajuta afacerea ta să crească mai rapid.';

  // Color mode values
  const bg = useColorModeValue('white', 'darkBg.900');
  const cardBg = useColorModeValue('white', 'darkBg.800');
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const subtextColor = useColorModeValue('gray.600', 'gray.300');
  
  return (
    <Box minH="100vh" bg={bg} overflowX="hidden">
      {/* Hero Section */}
      <Container maxW="container.xl" pt={{ base: 20, md: 32 }} pb={{ base: 16, md: 24 }}>
        <Flex 
          direction={{ base: 'column', lg: 'row' }} 
          align="center" 
          justify="space-between"
          gap={{ base: 12, lg: 6 }}
        >
          {/* Left Content */}
          <Box maxW={{ base: '100%', lg: '40%' }} textAlign={{ base: 'center', lg: 'left' }}>
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Heading 
                as="h1" 
                size="2xl" 
                lineHeight="1.2"
                fontWeight="bold"
                mb={6}
                color={textColor}
              >
                {headingText}
              </Heading>
              
              <MotionText
                fontSize="xl"
                color={subtextColor}
                mb={8}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.7 }}
              >
                {subText}
              </MotionText>
              
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
              >
                <Button 
                  size="lg" 
                  colorScheme="brand"
                  mb={{ base: 10, lg: 0 }}
                >
                  {language === 'en' ? 'Get Started' : 'Începe Acum'}
                </Button>
              </MotionBox>
            </MotionBox>
          </Box>
          
          {/* Right Content - Neural Network Animation */}
          <MotionBox
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            maxW={{ base: '100%', lg: '55%' }}
          >
            <NeuralNetworkAnimation height="400px" />
          </MotionBox>
        </Flex>
      </Container>
      
      {/* Features Section */}
      <Box bg={useColorModeValue('gray.50', 'darkBg.800')} py={20}>
        <Container maxW="container.xl">
          <Heading 
            as="h2" 
            size="xl" 
            textAlign="center" 
            mb={16}
            color={textColor}
          >
            {language === 'en' ? 'Our Services' : 'Serviciile Noastre'}
          </Heading>
          
          <Stack 
            direction={{ base: 'column', md: 'row' }}
            spacing={8}
            justify="center"
          >
            {[
              {
                title: language === 'en' ? 'AI Automation' : 'Automatizare AI',
                description: language === 'en' 
                  ? 'Smart solutions that learn and adapt to your business needs'
                  : 'Soluții inteligente care învață și se adaptează nevoilor afacerii tale'
              },
              {
                title: language === 'en' ? 'Web Scraping' : 'Web Scraping',
                description: language === 'en'
                  ? 'Extract valuable data to drive your business decisions'
                  : 'Extrage date valoroase pentru a-ți ghida deciziile de afaceri'
              },
              {
                title: language === 'en' ? 'Custom Development' : 'Dezvoltare Personalizată',
                description: language === 'en'
                  ? 'Bespoke software solutions tailored to your unique requirements'
                  : 'Soluții software personalizate adaptate cerințelor tale unice'
              }
            ].map((feature, idx) => (
              <MotionBox
                key={idx}
                bg={cardBg}
                p={8}
                borderRadius="lg"
                boxShadow="sm"
                flex="1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * idx, duration: 0.5 }}
              >
                <Heading as="h3" size="md" mb={4} color={textColor}>
                  {feature.title}
                </Heading>
                <Text color={subtextColor}>
                  {feature.description}
                </Text>
              </MotionBox>
            ))}
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
