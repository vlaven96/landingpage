import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Input,
  Textarea,
  Button,
  SimpleGrid,
  Icon,
  FormControl,
  FormLabel,
  Skeleton,
  Stack,
  useColorModeValue
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import TypedText from './TypedText';
import { Language } from '../App';

const MotionBox = motion(Box);

interface ContactPageProps {
  language: Language;
}

const ContactPage: React.FC<ContactPageProps> = ({ language }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Text content based on language
  const headingText = language === 'en' ? "Contact Us" : "Contactează-ne";
  
  const descriptionText = language === 'en'
    ? "Ready to transform your business with our solutions? Reach out to discuss how we can help."
    : "Ești gata să-ți transformi afacerea cu soluțiile noastre? Contactează-ne pentru a discuta cum te putem ajuta.";

  const placeholders = {
    name: language === 'en' ? "Your Name" : "Numele tău",
    email: language === 'en' ? "Your Email" : "Email-ul tău",
    message: language === 'en' ? "Your Message" : "Mesajul tău"
  };

  const buttonText = language === 'en' ? "Send Message" : "Trimite Mesaj";
  
  // Contact info for the cards
  const contactInfo = [
    {
      icon: FaEnvelope,
      title: language === 'en' ? "Email Us" : "Trimite-ne un email",
      info: "contact@example.com"
    },
    {
      icon: FaPhone,
      title: language === 'en' ? "Call Us" : "Sună-ne",
      info: "+1 (555) 123-4567"
    },
    {
      icon: FaMapMarkerAlt,
      title: language === 'en' ? "Visit Us" : "Vizitează-ne",
      info: language === 'en' ? "123 Business Street, Tech City" : "Strada Afaceri 123, Orașul Tech"
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
              <FaEnvelope size={50} />
            </MotionBox>
            <Skeleton height="40px" width="200px" />
            <Skeleton height="20px" width="300px" />
            <Skeleton height="20px" width="250px" />
          </Flex>
        ) : (
          <Flex direction="column" align="center">
            <Box mb={16} maxW="800px" textAlign="center">
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
              >
                <TypedText text={descriptionText} />
              </Text>
            </Box>
            
            {/* Contact info cards */}
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} width="100%" mb={16}>
              {contactInfo.map((item, idx) => (
                <MotionBox
                  key={idx}
                  p={6}
                  borderRadius="lg"
                  boxShadow="sm"
                  bg="white"
                  textAlign="center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.2 }}
                >
                  <Icon 
                    as={item.icon} 
                    boxSize={10} 
                    color="brand.500" 
                    mb={4} 
                  />
                  <Heading as="h3" size="md" mb={2} color="gray.800">
                    {item.title}
                  </Heading>
                  <Text color="gray.600">
                    {item.info}
                  </Text>
                </MotionBox>
              ))}
            </SimpleGrid>
            
            {/* Contact form */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              width="100%"
              maxW="600px"
              p={8}
              borderRadius="lg"
              boxShadow="md"
              bg="white"
            >
              <Heading as="h3" size="md" mb={6} color="gray.800">
                {language === 'en' ? "Send us a message" : "Trimite-ne un mesaj"}
              </Heading>
              
              <Stack spacing={4}>
                <FormControl>
                  <FormLabel color="gray.700">{language === 'en' ? "Name" : "Nume"}</FormLabel>
                  <Input 
                    placeholder={placeholders.name}
                    bg="gray.50"
                    borderColor="gray.200"
                  />
                </FormControl>
                
                <FormControl>
                  <FormLabel color="gray.700">{language === 'en' ? "Email" : "Email"}</FormLabel>
                  <Input 
                    placeholder={placeholders.email}
                    bg="gray.50"
                    borderColor="gray.200"
                  />
                </FormControl>
                
                <FormControl>
                  <FormLabel color="gray.700">{language === 'en' ? "Message" : "Mesaj"}</FormLabel>
                  <Textarea 
                    placeholder={placeholders.message}
                    bg="gray.50"
                    borderColor="gray.200"
                    rows={5}
                  />
                </FormControl>
                
                <Button 
                  colorScheme="brand"
                  size="lg"
                  width="full"
                  mt={2}
                >
                  {buttonText}
                </Button>
              </Stack>
            </MotionBox>
          </Flex>
        )}
      </Container>
    </Box>
  );
};

export default ContactPage;
