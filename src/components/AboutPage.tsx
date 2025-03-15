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
import { FaRobot, FaLightbulb, FaUsers, FaCode } from 'react-icons/fa';
import TypedText from './TypedText';
import { Language } from '../App';

const MotionBox = motion(Box);

interface AboutPageProps {
  language: Language;
}

const AboutPage: React.FC<AboutPageProps> = ({ language }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Text content based on language
  const headingText = language === 'en' ? "About Our Company" : "Despre Compania Noastră";
  
  const aboutText = language === 'en'
    ? "We're a passionate team specializing in software automation, AI solutions, and data extraction. Though we're relatively new, our commitment to excellence drives everything we do."
    : "Suntem o echipă pasionată, specializată în automatizare software, soluții AI și extragere de date. Deși suntem relativ noi, angajamentul nostru pentru excelență motivează tot ceea ce facem.";

  // Values content
  const values = [
    {
      icon: FaLightbulb,
      title: language === 'en' ? "Innovation" : "Inovație",
      description: language === 'en' 
        ? "We constantly explore new technologies to deliver cutting-edge solutions."
        : "Explorăm constant noi tehnologii pentru a oferi soluții de ultimă generație."
    },
    {
      icon: FaUsers,
      title: language === 'en' ? "Collaboration" : "Colaborare",
      description: language === 'en'
        ? "We work closely with our clients to ensure their needs are fully met."
        : "Lucrăm îndeaproape cu clienții noștri pentru a ne asigura că nevoile lor sunt pe deplin satisfăcute."
    },
    {
      icon: FaCode,
      title: language === 'en' ? "Quality" : "Calitate",
      description: language === 'en'
        ? "We pride ourselves on clean, efficient, and maintainable code."
        : "Suntem mândri de codul nostru curat, eficient și ușor de întreținut."
    }
  ];

  return (
    <Box minH="100vh" bg="white">
      <Container maxW="container.lg" pt={{ base: 20, md: 32 }} pb={{ base: 16, md: 24 }}>
        {loading ? (
          <Flex direction="column" align="center" gap={8}>
            <MotionBox
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
              color="brand.500"
              fontSize="4xl"
            >
              <FaRobot size={50} />
            </MotionBox>
            <Skeleton height="40px" width="200px" />
            <Skeleton height="20px" width="300px" />
            <Skeleton height="20px" width="250px" />
          </Flex>
        ) : (
          <Flex direction="column" align={{ base: 'center', lg: 'flex-start' }}>
            <Box mb={16} maxW="800px" mx="auto" textAlign="center">
              <Heading 
                as="h1" 
                size="2xl" 
                mb={6} 
                color="gray.800"
              >
                <TypedText text={headingText} speed={30} />
              </Heading>
              
              <Text 
                fontSize="xl" 
                color="gray.600"
                lineHeight="1.8"
              >
                <TypedText text={aboutText} />
              </Text>
            </Box>
            
            <Box w="100%">
              <Heading 
                as="h2" 
                size="xl" 
                mb={10} 
                textAlign="center"
                color="gray.800"
              >
                {language === 'en' ? "Our Values" : "Valorile Noastre"}
              </Heading>
              
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} w="100%">
                {values.map((value, idx) => (
                  <MotionBox
                    key={idx}
                    p={8}
                    borderRadius="lg"
                    boxShadow="sm"
                    bg="white"
                    textAlign="center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.2 }}
                  >
                    <Icon 
                      as={value.icon} 
                      boxSize={12} 
                      color="brand.500" 
                      mb={4} 
                    />
                    <Heading as="h3" size="md" mb={4} color="gray.800">
                      {value.title}
                    </Heading>
                    <Text color="gray.600">
                      {value.description}
                    </Text>
                  </MotionBox>
                ))}
              </SimpleGrid>
            </Box>
          </Flex>
        )}
      </Container>
    </Box>
  );
};

export default AboutPage;
