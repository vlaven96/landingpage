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
  Badge,
  SimpleGrid,
  Icon
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Language } from '../App';
import NeuralNetworkAnimation from './NeuralNetworkAnimation';
import { FaArrowRight, FaCheckCircle } from 'react-icons/fa';

const MotionBox = motion(Box);
const MotionText = motion(Text);
const MotionFlex = motion(Flex);

interface HomePageProps {
  language: Language;
  hasVisited?: boolean;
  onNavigate?: (pageId: PageIdentifier) => void;
  onConsultation?: () => void;
  onPageRequest?: (pageId: PageIdentifier) => void;
}

const HomePage: React.FC<HomePageProps> = ({ language, hasVisited = false, onNavigate, onConsultation, onPageRequest }) => {
  // Update any loading states or animations based on hasVisited
  // For example, if you have typed text or animations that should run only once:
  
  const animationDelay = hasVisited ? 0 : 0.5; // Skip delay on repeat visits
  
  // Color mode values
  const bg = useColorModeValue('white', 'darkBg.700');
  const cardBg = useColorModeValue('white', 'darkBg.800');
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const subtextColor = useColorModeValue('gray.600', 'gray.300');
  const highlightColor = useColorModeValue('brand.500', 'brand.300');
  const badgeBg = useColorModeValue('brand.50', 'whiteAlpha.200');
  const accentColor = useColorModeValue('brand.500', 'brand.300');
  const highlightBg = useColorModeValue('brand.50', 'darkBg.700');
  const sectionBg = useColorModeValue('white', 'gray.900');
  const messageBgColor = useColorModeValue('gray.100', 'gray.700'); // Add this for chat message
  
  // Content
  const headingText = language === 'en'
    ? 'Empowering Small Businesses Through Smart Technology Solutions'
    : 'Dezvoltarea Afacerilor Mici prin Soluții Tehnologice Inteligente';

  const subText = language === 'en'
    ? 'Automation • AI Integration • Web Development • Data Engineering'
    : 'Automatizare • Integrare AI • Dezvoltare Web • Inginerie de Date';
    
  const introText = language === 'en'
    ? 'At DeceneuLabs, our mission is simple: help small businesses embrace digital transformation with cutting-edge solutions that enhance efficiency, reduce costs, and unlock new opportunities. We\'re a small but highly experienced team based in Romania, with a global reach and a passion for innovation.'
    : 'La DeceneuLabs, misiunea noastră este simplă: să ajutăm afacerile mici să adopte transformarea digitală cu soluții avansate care cresc eficiența, reduc costurile și deblochează noi oportunități. Suntem o echipă mică dar cu experiență vastă din România, cu acoperire globală și pasiune pentru inovație.';
    
  const ctaText = language === 'en'
    ? 'Ready to transform your business?'
    : 'Pregătit să-ți transformi afacerea?';
    
  const buttonText = language === 'en'
    ? 'Book a Free Consultation'
    : 'Programează o Consultație Gratuită';

  // Why Choose Us section content
  const whyChooseUsTitle = language === 'en' 
    ? "Why Choose Our Services" 
    : "De Ce Să Alegi Serviciile Noastre";
    
  const whyChooseUsFeatures = [
    {
      title: language === 'en' ? "Tailored Solutions" : "Soluții Personalizate",
      description: language === 'en' 
        ? "We design custom solutions that address your specific challenges."
        : "Proiectăm soluții personalizate care abordează provocările tale specifice."
    },
    {
      title: language === 'en' ? "Transparent Communication" : "Comunicare Transparentă",
      description: language === 'en'
        ? "Clear, honest communication throughout the entire project lifecycle."
        : "Comunicare clară și onestă pe tot parcursul ciclului de viață al proiectului."
    },
    {
      title: language === 'en' ? "Industry Expertise" : "Expertiză în Industrie",
      description: language === 'en'
        ? "Deep knowledge of technology trends and best practices."
        : "Cunoștințe profunde despre tendințele și cele mai bune practici din tehnologie."
    },
    {
      title: language === 'en' ? "Ongoing Support" : "Suport Continuu",
      description: language === 'en'
        ? "We're partners in your success, offering continued assistance after launch."
        : "Suntem parteneri în succesul tău, oferind asistență continuă după lansare."
    }
  ];
  
  // Function to handle consultation button click
  const handleConsultation = () => {
    if (onConsultation) {
      onConsultation();
    } else if (onNavigate) {
      // Fallback to direct navigation if onConsultation not provided
      onNavigate('contact');
    }
  };
  
  // Function to handle services button click
  const handleServicesClick = () => {
    if (onPageRequest) {
      onPageRequest('services');
    } else if (onNavigate) {
      // Fallback to direct navigation
      onNavigate('services');
    }
  };
  
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
                transition={{ delay: animationDelay, duration: 0.7 }}
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
              transition={{ delay: animationDelay + 0.2, duration: 0.7 }}
            >
              {introText}
            </MotionText>
            
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: animationDelay + 0.5, duration: 0.7 }}
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
                  onClick={handleConsultation}
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
            transition={{ delay: animationDelay, duration: 0.7 }}
            maxW={{ base: '100%', lg: '55%' }}
          >
            <NeuralNetworkAnimation height="400px" />
          </MotionBox>
        </Flex>
      </Container>
      
      {/* Why Choose Our Services Section - replacing "Our Services" */}
      <Box 
        bg={sectionBg} 
        py={20}
        borderTop="1px solid"
        borderBottom="1px solid"
        borderColor={useColorModeValue('gray.200', 'gray.700')}
      >
        <Container maxW="container.xl">
          <VStack spacing={12} align="stretch">
            <Heading
              as="h2"
              size="xl"
              textAlign="center"
              mb={6}
              color={textColor}
            >
              {whyChooseUsTitle}
            </Heading>
            
            {/* Line with Badge */}
            <Flex justify="center" mb={6}>
              <Box position="relative" width="100%" maxW="300px">
                <Divider borderColor={accentColor} borderWidth="2px" opacity={0.3} />
                <Badge 
                  colorScheme="brand" 
                  position="absolute" 
                  top="-10px" 
                  left="50%" 
                  transform="translateX(-50%)"
                  px={3}
                  py={1}
                >
                  {language === 'en' ? "Benefits" : "Beneficii"}
                </Badge>
              </Box>
            </Flex>
            
            {/* Why Choose Us Features */}
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
              {whyChooseUsFeatures.map((feature, idx) => (
                <MotionFlex
                  key={idx}
                  direction="column"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: animationDelay + 0.1 * idx + 0.5, duration: 0.5 }}
                  p={5}
                  borderRadius="lg"
                  bg={highlightBg}
                  _hover={{ 
                    transform: 'translateY(-5px)',
                    boxShadow: 'md'
                  }}
                  transition="all 0.3s"
                >
                  <HStack spacing={4} align="flex-start" mb={2}>
                    <Icon as={FaCheckCircle} color={accentColor} boxSize={5} mt={1} />
                    <Heading as="h3" size="md" color={textColor}>
                      {feature.title}
                    </Heading>
                  </HStack>
                  <Text color={subtextColor} pl={9}>
                    {feature.description}
                  </Text>
                </MotionFlex>
              ))}
            </SimpleGrid>
            
            {/* Call to Action */}
            <Flex justify="center" mt={10}>
              <Button
                size="lg"
                colorScheme="brand"
                px={8}
                _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                transition="all 0.2s"
                onClick={handleServicesClick}
                rightIcon={<FaArrowRight />}
              >
                {language === 'en' ? "Explore Our Services" : "Explorează Serviciile Noastre"}
              </Button>
            </Flex>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
