import React from 'react';
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Button,
  Stack,
  useColorModeValue,
  VStack,
  HStack,
  Divider,
  Badge
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Language } from '../App';
import NeuralNetworkAnimation from './NeuralNetworkAnimation';
import { FaArrowRight } from 'react-icons/fa';

const MotionBox = motion(Box);
const MotionText = motion(Text);

interface HomePageProps {
  language: Language;
}

const HomePage: React.FC<HomePageProps> = ({ language }) => {
  // Content
  const headingText = language === 'en'
    ? 'Empowering Small Businesses Through Smart Technology Solutions'
    : 'Dezvoltarea Afacerilor Mici prin Soluții Tehnologice Inteligente';

  const subText = language === 'en'
    ? 'Automation • AI Integration • Web Development • Data Engineering'
    : 'Automatizare • Integrare AI • Dezvoltare Web • Inginerie de Date';
    
  const introText = language === 'en'
    ? 'At TechSolutions, our mission is simple: help small businesses embrace digital transformation with cutting-edge solutions that enhance efficiency, reduce costs, and unlock new opportunities. We\'re a small but highly experienced team based in Romania, with a global reach and a passion for innovation.'
    : 'La TechSolutions, misiunea noastră este simplă: să ajutăm afacerile mici să adopte transformarea digitală cu soluții avansate care cresc eficiența, reduc costurile și deblochează noi oportunități. Suntem o echipă mică dar cu experiență vastă din România, cu acoperire globală și pasiune pentru inovație.';
    
  const ctaText = language === 'en'
    ? 'Ready to transform your business?'
    : 'Pregătit să-ți transformi afacerea?';
    
  const buttonText = language === 'en'
    ? 'Book a Free Consultation'
    : 'Programează o Consultație Gratuită';

  // Color mode values
  const bg = useColorModeValue('white', 'darkBg.900');
  const cardBg = useColorModeValue('white', 'darkBg.800');
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const subtextColor = useColorModeValue('gray.600', 'gray.300');
  const highlightColor = useColorModeValue('brand.500', 'brand.300');
  const badgeBg = useColorModeValue('brand.50', 'whiteAlpha.200');
  
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
          <VStack 
            maxW={{ base: '100%', lg: '45%' }} 
            spacing={6} 
            align={{ base: 'center', lg: 'flex-start' }}
            textAlign={{ base: 'center', lg: 'left' }}
          >
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              w="full"
            >
              <Badge 
                colorScheme="brand" 
                bg={badgeBg} 
                color={highlightColor} 
                px={3} 
                py={1} 
                borderRadius="full" 
                mb={4}
                fontSize="sm"
              >
                {language === 'en' ? 'Tech Outsourcing Experts' : 'Experți în Externalizare IT'}
              </Badge>
              
              <Heading 
                as="h1" 
                size="2xl" 
                lineHeight="1.2"
                fontWeight="bold"
                mb={4}
                color={textColor}
              >
                {headingText}
              </Heading>
              
              <MotionText
                fontSize="lg"
                fontWeight="medium"
                color={highlightColor}
                mb={5}
                letterSpacing="wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.7 }}
              >
                {subText}
              </MotionText>
            </MotionBox>
            
            <MotionText
              fontSize="md"
              color={subtextColor}
              mb={6}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              {introText}
            </MotionText>
            
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              w={{ base: 'full', lg: 'auto' }}
            >
              <VStack spacing={4} align={{ base: 'center', lg: 'flex-start' }}>
                <Text fontWeight="bold" color={textColor}>
                  {ctaText}
                </Text>
                <Button 
                  size="lg" 
                  colorScheme="brand"
                  rightIcon={<FaArrowRight />}
                  px={8}
                  boxShadow="md"
                  _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                >
                  {buttonText}
                </Button>
              </VStack>
            </MotionBox>
          </VStack>
            
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
