import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  Icon,
  VStack,
  HStack,
  Circle,
  Divider,
  useColorModeValue,
  Skeleton,
  SkeletonText
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { 
  FaRocket, 
  FaComments, 
  FaCode, 
  FaChartLine,
  FaLightbulb,
  FaLaptopCode,
  FaSyncAlt
} from 'react-icons/fa';
import TypedText from './TypedText';
import { Language } from '../App';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionCircle = motion(Circle);

interface OurProcessPageProps {
  language: Language;
  hasVisited?: boolean;
}

const OurProcessPage: React.FC<OurProcessPageProps> = ({ language, hasVisited = false }) => {
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
  const headingText = language === 'en' ? "Our Process" : "Procesul Nostru";
  
  const introText = language === 'en'
    ? "We keep things simple and transparent."
    : "Menținem lucrurile simple și transparente.";

  // Define process steps
  const processSteps = [
    {
      title: language === 'en' ? "Free Consultation" : "Consultație Gratuită",
      description: language === 'en'
        ? "We start with a no-obligation call to understand your business challenges and brainstorm tech solutions. We'll suggest possible features, automation workflows, or AI applications tailored to your needs."
        : "Începem cu un apel fără obligații pentru a înțelege provocările afacerii tale și a genera idei pentru soluții tehnologice. Vom sugera posibile funcționalități, fluxuri de automatizare sau aplicații AI adaptate nevoilor tale.",
      icon: FaComments,
      color: "blue.400"
    },
    {
      title: language === 'en' ? "MVP Development" : "Dezvoltare MVP",
      description: language === 'en'
        ? "Our team rapidly builds a minimum viable product so you can test and validate the concept. This agile approach saves time and money, letting you refine the idea before scaling."
        : "Echipa noastră construiește rapid un produs minim viabil pentru a putea testa și valida conceptul. Această abordare agilă economisește timp și bani, permițându-ți să rafinezi ideea înainte de a o scala.",
      icon: FaCode,
      color: "purple.400"
    },
    {
      title: language === 'en' ? "Iteration & Scaling" : "Iterație & Scalare",
      description: language === 'en'
        ? "Based on your feedback, we iterate to add more features or optimize performance. From maintenance to continuous improvements, we ensure your digital solution grows with your business."
        : "Pe baza feedback-ului tău, iterăm pentru a adăuga mai multe funcționalități sau a optimiza performanța. De la mentenanță la îmbunătățiri continue, ne asigurăm că soluția ta digitală crește odată cu afacerea ta.",
      icon: FaSyncAlt,
      color: "green.400"
    }
  ];

  // Color mode values
  const bg = useColorModeValue('white', 'darkBg.700');
  const cardBg = useColorModeValue('white', 'darkBg.800');
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const subtextColor = useColorModeValue('gray.600', 'gray.300');
  const accentColor = useColorModeValue('brand.500', 'brand.300');
  const stepBg = useColorModeValue('gray.50', 'darkBg.800');
  const connectingLineBg = useColorModeValue('gray.200', 'gray.700');

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
              <Icon as={FaRocket} fontSize="5xl" color="brand.500" />
            </MotionBox>
            
            <Skeleton height="40px" width="200px" mb={4} />
            <SkeletonText noOfLines={2} spacing="4" width="60%" mb={16} />
            
            {[1, 2, 3].map((_, i) => (
              <Flex key={i} mb={10} align="flex-start" width="100%">
                <Skeleton height="60px" width="60px" borderRadius="full" mr={6} />
                <Box flex="1">
                  <Skeleton height="24px" width="40%" mb={4} />
                  <SkeletonText noOfLines={3} spacing="4" mb={6} />
                </Box>
              </Flex>
            ))}
          </Flex>
        ) : (
          <Box>
            <Flex direction="column" align="center" textAlign="center" mb={16}>
              <Icon as={FaRocket} fontSize="5xl" color="brand.500" mb={6} />
              
              <Heading 
                as="h1" 
                size="2xl" 
                mb={4} 
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
            
            <VStack spacing={12} align="stretch" position="relative">
              {/* Connecting Line (Vertical Timeline) */}
              <Box
                position="absolute"
                left={{ base: "36px", md: "60px" }}
                top="0"
                bottom="0"
                width="2px"
                bg={connectingLineBg}
                zIndex={0}
              />
              
              {processSteps.map((step, idx) => (
                <MotionFlex
                  key={idx}
                  align="flex-start"
                  position="relative"
                  zIndex={1}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.3, duration: 0.7 }}
                >
                  {/* Step Number Circle */}
                  <MotionCircle
                    size={{ base: "70px", md: "120px" }}
                    bg={cardBg}
                    color={step.color}
                    border="2px solid"
                    borderColor={step.color}
                    mr={{ base: 4, md: 8 }}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexShrink={0}
                    boxShadow="md"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: idx * 0.3 + 0.2, duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <VStack spacing={1}>
                      <Icon as={step.icon} fontSize={{ base: "xl", md: "3xl" }} />
                      <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold">
                        {idx + 1}
                      </Text>
                    </VStack>
                  </MotionCircle>
                  
                  {/* Step Content */}
                  <Box 
                    bg={stepBg} 
                    p={{ base: 5, md: 8 }} 
                    borderRadius="lg" 
                    boxShadow="md"
                    flex="1"
                    borderLeft="4px solid"
                    borderColor={step.color}
                  >
                    <Heading as="h3" size="lg" mb={4} color={textColor}>
                      {step.title}
                    </Heading>
                    <Text color={subtextColor} fontSize="md" lineHeight="tall">
                      {step.description}
                    </Text>

                    {/* Key Benefits - Small highlighted points */}
                    <HStack mt={5} spacing={4} flexWrap="wrap">
                      {[
                        language === 'en' ? (idx === 0 ? "Personalized Solutions" : idx === 1 ? "Rapid Feedback" : "Sustainable Growth") 
                                         : (idx === 0 ? "Soluții Personalizate" : idx === 1 ? "Feedback Rapid" : "Creștere Sustenabilă"),
                        language === 'en' ? (idx === 0 ? "Zero Obligation" : idx === 1 ? "Cost Efficiency" : "Long-term Support") 
                                         : (idx === 0 ? "Zero Obligații" : idx === 1 ? "Eficiență Costuri" : "Suport pe Termen Lung")
                      ].map((benefit, bidx) => (
                        <MotionBox
                          key={bidx}
                          bg={useColorModeValue(`${step.color.split('.')[0]}.50`, `${step.color.split('.')[0]}.900`)}
                          px={3}
                          py={1}
                          borderRadius="full"
                          fontSize="xs"
                          fontWeight="medium"
                          color={step.color}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.3 + 0.5 + bidx * 0.2, duration: 0.5 }}
                        >
                          {benefit}
                        </MotionBox>
                      ))}
                    </HStack>
                  </Box>
                </MotionFlex>
              ))}
            </VStack>
            
            {/* Closing Section */}
            <MotionBox
              mt={16}
              p={8}
              bg={cardBg}
              borderRadius="xl"
              boxShadow="md"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.7 }}
              textAlign="center"
            >
              <Icon as={FaLightbulb} fontSize="3xl" color={accentColor} mb={4} />
              <Heading as="h2" size="lg" mb={4} color={textColor}>
                {language === 'en' ? "Ready to Get Started?" : "Gata să Începem?"}
              </Heading>
              <Text color={subtextColor}>
                {language === 'en' 
                  ? "Our streamlined process ensures you get results quickly without unnecessary complexity. Contact us today to start your journey toward digital transformation."
                  : "Procesul nostru eficient asigură obținerea de rezultate rapid, fără complexitate inutilă. Contactează-ne astăzi pentru a începe călătoria ta spre transformarea digitală."}
              </Text>
            </MotionBox>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default OurProcessPage; 