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
  useColorModeValue
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { 
  FaRobot, 
  FaCode, 
  FaDatabase, 
  FaChartLine, 
  FaServer, 
  FaCogs,
  FaArrowRight
} from 'react-icons/fa';
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

  // Text content based on language
  const headingText = language === 'en' ? "Our Services" : "Serviciile Noastre";
  
  const introText = language === 'en'
    ? "Cutting-edge solutions tailored to your business needs"
    : "Soluții de ultimă generație adaptate nevoilor afacerii tale";

  // Color mode values
  const bg = useColorModeValue('white', 'darkBg.900');
  const cardBg = useColorModeValue('white', 'darkBg.800');
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const subtextColor = useColorModeValue('gray.600', 'gray.300');
  const featureBg = useColorModeValue('brand.50', 'darkBg.700');
  const featureHeadingColor = useColorModeValue('brand.600', 'brand.200');

  // Define services
  const services = [
    {
      icon: FaRobot,
      title: language === 'en' ? "AI Integration" : "Integrare AI",
      description: language === 'en'
        ? "Implement advanced AI tools to automate tasks and gain valuable insights from your data."
        : "Implementează instrumente AI avansate pentru a automatiza sarcini și a obține informații valoroase din datele tale.",
      color: "blue.500"
    },
    {
      icon: FaCode,
      title: language === 'en' ? "Custom Development" : "Dezvoltare Personalizată",
      description: language === 'en'
        ? "Bespoke software solutions designed to address your unique business challenges."
        : "Soluții software personalizate concepute pentru a aborda provocările unice ale afacerii tale.",
      color: "green.500"
    },
    {
      icon: FaDatabase,
      title: language === 'en' ? "Data Extraction" : "Extragere Date",
      description: language === 'en'
        ? "Powerful web scraping tools to gather business intelligence and market insights."
        : "Instrumente puternice de extragere web pentru a colecta informații de afaceri și date despre piață.",
      color: "purple.500"
    },
    {
      icon: FaChartLine,
      title: language === 'en' ? "Automation" : "Automatizare",
      description: language === 'en'
        ? "Streamline operations and reduce costs with intelligent workflow automation."
        : "Eficientizează operațiunile și reduce costurile cu automatizarea inteligentă a fluxului de lucru.",
      color: "orange.500"
    },
    {
      icon: FaServer,
      title: language === 'en' ? "Cloud Solutions" : "Soluții Cloud",
      description: language === 'en'
        ? "Scalable and secure cloud infrastructure to power your applications."
        : "Infrastructură cloud scalabilă și sigură pentru a-ți alimenta aplicațiile.",
      color: "cyan.500"
    },
    {
      icon: FaCogs,
      title: language === 'en' ? "System Integration" : "Integrare Sisteme",
      description: language === 'en'
        ? "Connect your existing systems and software to create a unified business ecosystem."
        : "Conectează sistemele și software-ul existent pentru a crea un ecosistem de afaceri unificat.",
      color: "red.500"
    }
  ];
  
  // Featured service section
  const featuredService = {
    title: language === 'en' ? "Enterprise AI Solutions" : "Soluții AI pentru Întreprinderi",
    description: language === 'en'
      ? "Our flagship enterprise-grade AI solutions help businesses transform their operations through intelligent automation, predictive analytics, and data-driven decision making."
      : "Soluțiile noastre AI de nivel enterprise ajută companiile să își transforme operațiunile prin automatizare inteligentă, analize predictive și luarea deciziilor bazate pe date.",
    buttonText: language === 'en' ? "Learn More" : "Află Mai Multe"
  };

  return (
    <Box minH="100vh" bg={bg}>
      <Container maxW="container.lg" pt={{ base: 20, md: 32 }} pb={{ base: 16, md: 24 }}>
        {loading ? (
          <Flex direction="column" align="center" gap={8}>
            <MotionBox
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
              color="brand.500"
              fontSize="4xl"
            >
              <FaCogs size={50} />
            </MotionBox>
            <Skeleton height="40px" width="200px" />
            <Skeleton height="20px" width="300px" />
            
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} width="100%" mt={8}>
              {[1, 2, 3, 4, 5, 6].map((_, i) => (
                <Box key={i} p={6} borderRadius="lg" boxShadow="sm">
                  <Skeleton height="40px" width="40px" mb={4} />
                  <SkeletonText mt={4} noOfLines={4} spacing={4} />
                </Box>
              ))}
            </SimpleGrid>
          </Flex>
        ) : (
          <Box>
            {/* Header Section */}
            <Box textAlign="center" mb={16} maxW="800px" mx="auto">
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
                color={subtextColor}
              >
                <TypedText text={introText} />
              </Text>
            </Box>
            
            {/* Featured Service */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              mb={16}
              bg={featureBg}
              borderRadius="xl"
              overflow="hidden"
              boxShadow="md"
            >
              <Flex 
                direction={{ base: 'column', md: 'row' }} 
                align="center" 
                p={{ base: 6, md: 10 }}
              >
                <Box flex={1} pr={{ base: 0, md: 8 }} mb={{ base: 6, md: 0 }}>
                  <Heading as="h2" size="xl" mb={4} color={featureHeadingColor}>
                    {featuredService.title}
                  </Heading>
                  <Text fontSize="lg" color={textColor} mb={6}>
                    {featuredService.description}
                  </Text>
                  <Button 
                    rightIcon={<FaArrowRight />} 
                    colorScheme="brand" 
                    size="lg"
                  >
                    {featuredService.buttonText}
                  </Button>
                </Box>
                <Flex 
                  flex={1} 
                  justifyContent="center" 
                  alignItems="center"
                  bg="brand.500" 
                  p={10} 
                  borderRadius="lg"
                  color="white"
                >
                  <Icon as={FaRobot} fontSize="9xl" />
                </Flex>
              </Flex>
            </MotionBox>
            
            {/* Services Grid */}
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
              {services.map((service, idx) => (
                <MotionBox
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  p={6}
                  borderRadius="lg"
                  boxShadow="sm"
                  bg={cardBg}
                  borderTop="4px solid"
                  borderColor={service.color}
                  _hover={{
                    transform: 'translateY(-5px)',
                    boxShadow: 'md',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Icon 
                    as={service.icon} 
                    fontSize="3xl" 
                    color={service.color} 
                    mb={4} 
                  />
                  <Heading as="h3" size="md" mb={3} color={textColor}>
                    {service.title}
                  </Heading>
                  <Text color={subtextColor}>
                    {service.description}
                  </Text>
                </MotionBox>
              ))}
            </SimpleGrid>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ServicesPage;
