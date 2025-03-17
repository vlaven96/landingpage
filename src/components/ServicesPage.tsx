import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Flex,
  Icon,
  Button,
  Skeleton,
  SkeletonText,
  SkeletonCircle,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Divider,
  VStack
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { 
  FaRobot, 
  FaCode, 
  FaDatabase, 
  FaChartLine, 
  FaServer, 
  FaMobileAlt,
  FaCheckCircle,
  FaComments,
  FaTasks,
  FaChartBar,
  FaGlobe,
  FaLaptopCode,
  FaClipboardList,
  FaStream,
  FaSearch
} from 'react-icons/fa';
import TypedText from './TypedText';
import { Language } from '../App';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

interface ServicesPageProps {
  language: Language;
  hasVisited?: boolean;
}

const ServicesPage: React.FC<ServicesPageProps> = ({ language, hasVisited = false }) => {
  const [loading, setLoading] = useState(!hasVisited);

  useEffect(() => {
    // If we've visited before, skip the loading animation
    if (hasVisited) {
      setLoading(false);
      return;
    }
    
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [hasVisited]);

  // Text content based on language
  const headingText = language === 'en' ? "Our Services" : "Serviciile Noastre";
  
  const introText = language === 'en'
    ? "Cutting-edge solutions tailored to your business needs"
    : "Soluții de ultimă generație adaptate nevoilor afacerii tale";

  // Color mode values
  const bg = useColorModeValue('white', 'darkBg.700');
  const cardBg = useColorModeValue('white', 'darkBg.800');
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const subtextColor = useColorModeValue('gray.600', 'gray.300');
  const featureBg = useColorModeValue('brand.50', 'darkBg.700');
  const featureHeadingColor = useColorModeValue('brand.600', 'brand.200');
  const bulletColor = useColorModeValue('brand.500', 'brand.300');

  // Define service categories
  const serviceCategories = [
    {
      title: language === 'en' ? "Automation & AI Integration" : "Automatizare & Integrare AI",
      description: language === 'en'
        ? "Harness the power of automation to streamline processes and cut operational costs. Our AI-driven services include:"
        : "Valorifică puterea automatizării pentru a eficientiza procesele și a reduce costurile operaționale. Serviciile noastre AI includ:",
      icon: FaRobot,
      color: "blue.500",
      features: language === 'en' 
        ? [
            { text: "Chatbots & Virtual Assistants for faster customer support", icon: FaComments },
            { text: "Workflow Automation to eliminate repetitive tasks", icon: FaTasks },
            { text: "Intelligent Data Analysis for actionable business insights", icon: FaChartBar }
          ]
        : [
            { text: "Chatboți & Asistenți Virtuali pentru suport clienți mai rapid", icon: FaComments },
            { text: "Automatizare Flux de Lucru pentru eliminarea sarcinilor repetitive", icon: FaTasks },
            { text: "Analiză Inteligentă a Datelor pentru insights de afaceri acționabile", icon: FaChartBar }
          ]
    },
    {
      title: language === 'en' ? "Web & Software Development" : "Dezvoltare Web & Software",
      description: language === 'en'
        ? "Build a modern, high-performing digital presence that sets you apart. We specialize in:"
        : "Construiește o prezență digitală modernă și performantă care te diferențiază. Ne specializăm în:",
      icon: FaCode,
      color: "purple.500",
      features: language === 'en'
        ? [
            { text: "Custom Web Applications aligned with your brand identity", icon: FaGlobe },
            { text: "Responsive Websites optimized for all devices", icon: FaMobileAlt },
            { text: "Full-Stack Development for end-to-end project delivery", icon: FaLaptopCode }
          ]
        : [
            { text: "Aplicații Web Personalizate aliniate cu identitatea brandului tău", icon: FaGlobe },
            { text: "Site-uri Web Responsive optimizate pentru toate dispozitivele", icon: FaMobileAlt },
            { text: "Dezvoltare Full-Stack pentru livrare proiecte end-to-end", icon: FaLaptopCode }
          ]
    },
    {
      title: language === 'en' ? "Data Engineering & Analytics" : "Inginerie de Date & Analiză",
      description: language === 'en'
        ? "Transform raw data into a competitive advantage. Our data experts help you:"
        : "Transformă datele brute într-un avantaj competitiv. Experții noștri în date te ajută să:",
      icon: FaDatabase,
      color: "green.500",
      features: language === 'en'
        ? [
            { text: "Collect & Cleanse data from multiple sources", icon: FaClipboardList },
            { text: "Set Up Scalable Pipelines for continuous data processing", icon: FaStream },
            { text: "Implement Advanced Analytics for informed, real-time decision-making", icon: FaSearch }
          ]
        : [
            { text: "Colectezi & Cureți date din multiple surse", icon: FaClipboardList },
            { text: "Configurezi Pipeline-uri Scalabile pentru procesarea continuă a datelor", icon: FaStream },
            { text: "Implementezi Analiză Avansată pentru decizii informate în timp real", icon: FaSearch }
          ]
    }
  ];

  return (
    <Box minH="100vh" bg={bg}>
      <Container maxW="container.lg" pt={{ base: 20, md: 32 }} pb={{ base: 16, md: 24 }}>
        {loading ? (
          <Flex direction="column" align="center" textAlign="center">
            <MotionBox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              mb={6}
            >
              <Icon as={FaServer} fontSize="5xl" color="brand.500" />
            </MotionBox>
            
            <Skeleton height="40px" width="200px" mb={4} />
            <SkeletonText noOfLines={2} spacing="4" width="60%" mb={12} />
            
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="100%">
              {[1, 2, 3].map((_, i) => (
                <Box key={i} p={8} boxShadow="md" borderRadius="lg">
                  <SkeletonCircle size="16" mb={6} />
                  <Skeleton height="24px" mb={4} />
                  <SkeletonText noOfLines={4} spacing="4" mb={6} />
                  <Skeleton height="10px" width="60%" mb={2} />
                  <Skeleton height="10px" width="70%" mb={2} />
                  <Skeleton height="10px" width="50%" mb={4} />
                  <Skeleton height="40px" width="120px" />
                </Box>
              ))}
            </SimpleGrid>
          </Flex>
        ) : (
          <Box>
            <Flex direction="column" align="center" textAlign="center" mb={16}>
              <Icon as={FaServer} fontSize="5xl" color="brand.500" mb={6} />
              
              <Heading 
                as="h1" 
                size="2xl" 
                mb={6} 
                color={textColor}
              >
                <TypedText text={headingText} speed={30} />
              </Heading>
              
              <Text 
                fontSize="xl"
                maxW="2xl"
                color={subtextColor}
              >
                <TypedText text={introText} />
              </Text>
            </Flex>
            
            <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={10} mb={16}>
              {serviceCategories.map((category, idx) => (
                <MotionBox
                  key={idx}
                  bg={cardBg}
                  p={8}
                  borderRadius="lg"
                  boxShadow="md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.2, duration: 0.5 }}
                  overflow="hidden"
                  position="relative"
                  borderTop="4px solid"
                  borderColor={category.color}
                  height="100%"
                  display="flex"
                  flexDirection="column"
                >
                  <VStack spacing={6} align="flex-start" flex="1">
                    <Icon 
                      as={category.icon} 
                      fontSize="4xl" 
                      color={category.color} 
                    />
                    
                    <Heading as="h2" size="lg" color={textColor}>
                      {category.title}
                    </Heading>
                    
                    <Text color={subtextColor} fontSize="md">
                      {category.description}
                    </Text>
                    
                    <List spacing={3} mt={4} width="100%">
                      {category.features.map((feature, fidx) => (
                        <ListItem key={fidx} display="flex" alignItems="flex-start">
                          <ListIcon as={feature.icon} color={bulletColor} mt={1} />
                          <Text color={subtextColor} fontSize="sm">
                            {feature.text}
                          </Text>
                        </ListItem>
                      ))}
                    </List>
                  </VStack>
                  
                  <Button 
                    variant="outline" 
                    colorScheme="brand"
                    alignSelf="flex-start"
                    mt={8}
                    size="sm"
                    opacity={0.8}
                    _hover={{ opacity: 1 }}
                  >
                    {language === 'en' ? "Learn More" : "Află Mai Multe"}
                  </Button>
                </MotionBox>
              ))}
            </SimpleGrid>
            
            <Box bg={featureBg} p={10} borderRadius="xl" mb={12}>
              <Heading 
                as="h2" 
                size="lg" 
                mb={6} 
                color={featureHeadingColor}
                textAlign="center"
              >
                {language === 'en' ? "Why Choose Our Services" : "De Ce Să Alegi Serviciile Noastre"}
              </Heading>
              
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
                {[
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
                ].map((feature, idx) => (
                  <MotionFlex
                    key={idx}
                    direction="column"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * idx + 0.5, duration: 0.5 }}
                  >
                    <Heading as="h3" size="md" mb={3} color={textColor}>
                      {feature.title}
                    </Heading>
                    <Text color={subtextColor}>
                      {feature.description}
                    </Text>
                  </MotionFlex>
                ))}
              </SimpleGrid>
            </Box>
            
            <Flex justify="center">
              <Button 
                colorScheme="brand" 
                size="lg" 
                px={8}
                leftIcon={<FaChartLine />}
              >
                {language === 'en' ? "Schedule a Consultation" : "Programează o Consultație"}
              </Button>
            </Flex>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ServicesPage;
