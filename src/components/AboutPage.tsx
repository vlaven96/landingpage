import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Skeleton,
  Stack,
  Icon,
  SimpleGrid,
  useColorModeValue
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaRobot, FaLightbulb, FaUsers, FaCode, FaCheck, FaHandshake, FaCogs } from 'react-icons/fa';
import TypedText from './TypedText';
import { Language } from '../App';

const MotionBox = motion(Box);

interface AboutPageProps {
  language: Language;
  hasVisited?: boolean;
}

const AboutPage: React.FC<AboutPageProps> = ({ language, hasVisited = false }) => {
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
  const headingText = language === 'en' ? "About Us" : "Despre Noi";
  
  const introText = language === 'en'
    ? "Learn about our mission and the team behind TechSolutions."
    : "Află despre misiunea noastră și echipa din spatele TechSolutions.";
    
  const whoWeAreTitle = language === 'en' ? "Who We Are" : "Cine Suntem";
  
  const whoWeAreText = language === 'en'
    ? "TechSolutions was founded by two developers who bring extensive experience from industry-leading organizations like Amazon, Microsoft, Google, BP, as well as agile startups such as Superside and Noom. Our background enables us to blend enterprise-level expertise with startup-driven agility to deliver solutions that truly drive results."
    : "TechSolutions a fost fondată de doi dezvoltatori care aduc experiență vastă din organizații de top precum Amazon, Microsoft, Google, BP, precum și startup-uri agile ca Superside și Noom. Experiența noastră ne permite să îmbinăm expertiza de nivel enterprise cu agilitatea specifică startup-urilor pentru a oferi soluții care generează rezultate reale.";
    
  const ourVisionTitle = language === 'en' ? "Our Vision" : "Viziunea Noastră";
  
  const ourVisionText = language === 'en'
    ? "We believe every small business should be able to leverage the latest technology—without the complexity or the steep costs. By offering flexible, scalable digital transformation services, we empower you to innovate quickly and remain competitive in an ever-evolving market."
    : "Credem că fiecare afacere mică ar trebui să poată folosi cele mai noi tehnologii—fără complexitate sau costuri ridicate. Oferind servicii flexibile și scalabile de transformare digitală, vă ajutăm să inovați rapid și să rămâneți competitivi într-o piață în continuă evoluție.";
    
  const ourValuesTitle = language === 'en' ? "Our Values" : "Valorile Noastre";
  
  const valuesList = language === 'en'
    ? [
        {
          title: "Customer-Centric",
          description: "We tailor every solution to your unique challenges.",
          icon: FaUsers
        },
        {
          title: "Innovation",
          description: "We constantly explore new technologies to give you an edge.",
          icon: FaLightbulb
        },
        {
          title: "Integrity",
          description: "We communicate transparently and deliver on our promises.",
          icon: FaHandshake
        },
        {
          title: "Collaboration",
          description: "Your input shapes our development process, ensuring solutions are aligned with your goals.",
          icon: FaCogs
        }
      ]
    : [
        {
          title: "Centrat pe Client",
          description: "Adaptăm fiecare soluție la provocările tale unice.",
          icon: FaUsers
        },
        {
          title: "Inovație",
          description: "Explorăm constant noi tehnologii pentru a-ți oferi un avantaj.",
          icon: FaLightbulb
        },
        {
          title: "Integritate",
          description: "Comunicăm transparent și ne respectăm promisiunile.",
          icon: FaHandshake
        },
        {
          title: "Colaborare",
          description: "Contribuția ta modelează procesul nostru de dezvoltare, asigurând soluții aliniate cu obiectivele tale.",
          icon: FaCogs
        }
      ];

  // Color mode values
  const bg = useColorModeValue('white', 'darkBg.700');
  const cardBg = useColorModeValue('white', 'darkBg.800');
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const subtextColor = useColorModeValue('gray.600', 'gray.300');
  const accentColor = useColorModeValue('brand.500', 'brand.300');
  const sectionBg = useColorModeValue('gray.50', 'darkBg.800');

  return (
    <Box minH="100vh" bg={bg}>
      <Container maxW="container.lg" pt={{ base: 20, md: 32 }} pb={{ base: 16, md: 24 }}>
        {loading ? (
          <Flex direction="column" align="center" justify="center" textAlign="center">
            <MotionBox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              mb={6}
            >
              <Icon as={FaUsers} fontSize="5xl" color="brand.500" />
            </MotionBox>
            
            <Heading
              as="h1"
              size="2xl"
              mb={4}
            >
              <TypedText text={headingText} speed={50} />
            </Heading>
            
            <Text 
              fontSize="xl" 
              maxW="2xl"
              mb={12}
            >
              <TypedText text={introText} />
            </Text>
          </Flex>
        ) : (
          <Stack spacing={16} align="stretch">
            {/* Header Section */}
            <Flex direction="column" align="center" justify="center" textAlign="center">
              <Icon as={FaUsers} fontSize="5xl" color="brand.500" mb={6} />
              
              <Heading
                as="h1"
                size="2xl"
                mb={4}
                color={textColor}
              >
                {headingText}
              </Heading>
              
              <Text 
                fontSize="xl" 
                maxW="2xl"
                color={subtextColor}
              >
                {introText}
              </Text>
            </Flex>
            
            {/* Who We Are Section */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Stack spacing={6} align="flex-start">
                <Heading as="h2" size="xl" color={textColor}>
                  {whoWeAreTitle}
                </Heading>
                <Text fontSize="lg" color={subtextColor} lineHeight="tall">
                  {whoWeAreText}
                </Text>
              </Stack>
            </MotionBox>
            
            {/* Our Vision Section */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <Box bg={sectionBg} p={8} borderRadius="lg">
                <Stack spacing={6} align="flex-start">
                  <Heading as="h2" size="xl" color={textColor}>
                    {ourVisionTitle}
                  </Heading>
                  <Text fontSize="lg" color={subtextColor} lineHeight="tall">
                    {ourVisionText}
                  </Text>
                </Stack>
              </Box>
            </MotionBox>
            
            {/* Our Values Section */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <Stack spacing={8} align="flex-start">
                <Heading as="h2" size="xl" color={textColor}>
                  {ourValuesTitle}
                </Heading>
                
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} w="100%">
                  {valuesList.map((value, idx) => (
                    <MotionBox
                      key={idx}
                      initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * idx + 0.5 }}
                    >
                      <Flex 
                        bg={cardBg}
                        p={6}
                        borderRadius="md"
                        boxShadow="sm"
                        borderLeft="4px solid"
                        borderColor={accentColor}
                        h="100%"
                      >
                        <Icon 
                          as={value.icon} 
                          fontSize="xl" 
                          color={accentColor} 
                          mt={1}
                          mr={4}
                        />
                        <Stack align="flex-start" spacing={2}>
                          <Heading as="h3" size="md" color={textColor}>
                            {value.title}
                          </Heading>
                          <Text color={subtextColor}>
                            {value.description}
                          </Text>
                        </Stack>
                      </Flex>
                    </MotionBox>
                  ))}
                </SimpleGrid>
              </Stack>
            </MotionBox>
          </Stack>
        )}
      </Container>
    </Box>
  );
};

export default AboutPage;
