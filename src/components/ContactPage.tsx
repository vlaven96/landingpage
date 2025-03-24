import React, { useState, useEffect, useRef } from 'react';
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
  useColorModeValue,
  VStack,
  HStack,
  Badge,
  List,
  ListItem,
  ListIcon,
  Divider,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Select,
  SkeletonText,
  Alert,
  AlertIcon
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaGlobe, 
  FaCheck, 
  FaCalendarAlt,
  FaRocket,
  FaLightbulb,
  FaCogs,
  FaMicrochip
} from 'react-icons/fa';
import TypedText from './TypedText';
import { Language } from '../App';
import { submitContactForm, ContactFormData } from '../services/contactService';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

interface ContactPageProps {
  language: Language;
  hasVisited?: boolean;
}

// Normally this would be in a separate component
const CalendlyEmbed: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeHeight, setIframeHeight] = useState("650px");

  useEffect(() => {
    // In production, replace with your actual Calendly URL
    const calendlyScript = document.createElement('script');
    calendlyScript.src = "https://assets.calendly.com/assets/external/widget.js";
    calendlyScript.async = true;
    document.body.appendChild(calendlyScript);
    
    return () => {
      document.body.removeChild(calendlyScript);
    };
  }, []);

  return (
    <Box className="calendly-inline-widget" height={iframeHeight} width="100%">
      {/* Replace with your actual Calendly URL in production */}
      <iframe
        ref={iframeRef}
        src="https://calendly.com/your-calendly-url/30min"
        width="100%"
        height="100%"
        frameBorder="0"
        title="Schedule a meeting"
      />
    </Box>
  );
};

const ContactPage: React.FC<ContactPageProps> = ({ language, hasVisited = false }) => {
  const [loading, setLoading] = useState(!hasVisited);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
  const headingText = language === 'en' ? "Let's Transform Your Business!" : "Să Transformăm Afacerea Ta!";
  
  const introText = language === 'en'
    ? "Ready to embark on your digital transformation journey? We'd love to hear about your vision and show you how we can help."
    : "Pregătit să pornești în călătoria ta de transformare digitală? Ne-ar plăcea să aflăm despre viziunea ta și să îți arătăm cum te putem ajuta.";
  
  const contactInfo = {
    phone: "+40 123 456 789",
    email: "contact@DeceneuLabs.com",
    location: language === 'en' ? "Bucharest, Romania (Serving clients worldwide)" : "București, România (Deservim clienți din întreaga lume)"
  };
  
  const consultationTitle = language === 'en' ? "Get Your Free Consultation" : "Obține Consultația Gratuită";
  
  const consultationText = language === 'en'
    ? "Schedule a Call and let's discuss how we can:"
    : "Programează un apel și să discutăm cum putem:";
    
  const consultationPoints = language === 'en'
    ? [
        { text: "Identify quick-win automations", icon: FaRocket },
        { text: "Explore AI-driven optimizations", icon: FaMicrochip },
        { text: "Build a scalable web or data solution", icon: FaCogs },
        { text: "Prototype new product ideas", icon: FaLightbulb }
      ]
    : [
        { text: "Identificăm automatizări cu câștig rapid", icon: FaRocket },
        { text: "Explorăm optimizări bazate pe AI", icon: FaMicrochip },
        { text: "Construim o soluție web sau de date scalabilă", icon: FaCogs },
        { text: "Prototipăm idei de produse noi", icon: FaLightbulb }
      ];
      
  const guidanceText = language === 'en'
    ? "We're here to guide you every step of the way—whether you're looking to build a simple website, automate your workflows, or harness the power of data for smarter decision-making."
    : "Suntem aici pentru a te ghida la fiecare pas—fie că vrei să construiești un site web simplu, să-ți automatizezi fluxurile de lucru sau să valorifici puterea datelor pentru decizii mai inteligente.";
  
  const formTitle = language === 'en' ? "Send Us a Message" : "Trimite-ne un Mesaj";
  const nameLabel = language === 'en' ? "Name" : "Nume";
  const emailLabel = language === 'en' ? "Email" : "Email";
  const subjectLabel = language === 'en' ? "Subject" : "Subiect"; 
  const messageLabel = language === 'en' ? "Message" : "Mesaj";
  const submitButtonText = language === 'en' ? "Send Message" : "Trimite Mesaj";
  const scheduleCallText = language === 'en' ? "Schedule a Call" : "Programează un Apel";
  const thankYouText = language === 'en' ? "Thank you for your message. We'll get back to you soon!" : "Mulțumim pentru mesaj. Vă vom contacta în curând!";

  // Color mode values
  const bg = useColorModeValue('white', 'darkBg.700');
  const cardBg = useColorModeValue('white', 'darkBg.800');
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const subtextColor = useColorModeValue('gray.600', 'gray.300');
  const accentColor = useColorModeValue('brand.500', 'brand.300');
  const highlightBg = useColorModeValue('brand.50', 'darkBg.700');
  const borderColor = useColorModeValue('gray.200', 'darkBg.600');
  const inputBg = useColorModeValue('white', 'darkBg.700');

  // Form field change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setErrorMessage(language === 'en' 
        ? 'Please fill in all required fields' 
        : 'Vă rugăm să completați toate câmpurile obligatorii');
      return;
    }
    
    setIsSubmitting(true);
    setErrorMessage(null);
    
    try {
      const response = await submitContactForm(formData);
      
      console.log('Form submission response:', response);
      
      if (response.success) {
        // Success! Show the thank you message
        setFormSubmitted(true);
      } else {
        // API returned an error
        setErrorMessage(response.message);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      // Exception occurred
      setErrorMessage(language === 'en' 
        ? 'An error occurred. Please try again later.' 
        : 'A apărut o eroare. Vă rugăm să încercați din nou mai târziu.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box minH="100vh" bg={bg}>
      <Container maxW="container.xl" pt={{ base: 20, md: 32 }} pb={{ base: 16, md: 24 }}>
        {loading ? (
          <Flex direction="column" align="center" textAlign="center">
            <MotionBox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              mb={6}
            >
              <Icon as={FaEnvelope} fontSize="5xl" color="brand.500" />
            </MotionBox>
            
            <Skeleton height="40px" width="200px" mb={4} />
            <SkeletonText noOfLines={2} spacing="4" width="60%" mb={16} />
            
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} width="100%">
              <Box>
                <SkeletonText noOfLines={4} spacing="4" mb={8} />
                <Skeleton height="100px" mb={8} />
              </Box>
              <Skeleton height="400px" />
            </SimpleGrid>
          </Flex>
        ) : (
          <Box>
            {/* Header Section */}
            <MotionFlex 
              direction="column" 
              align="center" 
              textAlign="center"
              mb={16}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Icon as={FaEnvelope} fontSize="5xl" color="brand.500" mb={6} />
              
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
            </MotionFlex>
            
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10}>
              {/* Left Column - Contact Info & Consultation */}
              <MotionBox
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                {/* Contact Information */}
                <VStack spacing={6} align="stretch" mb={10}>
                  <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                    <MotionFlex 
                      direction="column" 
                      bg={cardBg} 
                      p={6} 
                      borderRadius="lg" 
                      boxShadow="sm"
                      align="center"
                      textAlign="center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <Icon as={FaPhone} color={accentColor} fontSize="2xl" mb={3} />
                      <Text fontWeight="bold" fontSize="sm" color={textColor}>
                        {language === 'en' ? "Phone" : "Telefon"}
                      </Text>
                      <Text color={subtextColor}>{contactInfo.phone}</Text>
                    </MotionFlex>
                    
                    <MotionFlex 
                      direction="column" 
                      bg={cardBg} 
                      p={6} 
                      borderRadius="lg" 
                      boxShadow="sm"
                      align="center"
                      textAlign="center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <Icon as={FaEnvelope} color={accentColor} fontSize="2xl" mb={3} />
                      <Text fontWeight="bold" fontSize="sm" color={textColor}>
                        {language === 'en' ? "Email" : "Email"}
                      </Text>
                      <Text color={subtextColor}>{contactInfo.email}</Text>
                    </MotionFlex>
                    
                    <MotionFlex 
                      direction="column" 
                      bg={cardBg} 
                      p={6} 
                      borderRadius="lg" 
                      boxShadow="sm"
                      align="center"
                      textAlign="center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <Icon as={FaMapMarkerAlt} color={accentColor} fontSize="2xl" mb={3} />
                      <Text fontWeight="bold" fontSize="sm" color={textColor}>
                        {language === 'en' ? "Location" : "Locație"}
                      </Text>
                      <Text color={subtextColor}>{contactInfo.location}</Text>
                    </MotionFlex>
                  </SimpleGrid>
                </VStack>
                
                {/* Get Your Free Consultation */}
                <MotionBox
                  bg={highlightBg}
                  p={8}
                  borderRadius="lg"
                  mb={10}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                >
                  <Heading as="h2" size="lg" mb={4} color={textColor}>
                    {consultationTitle}
                  </Heading>
                  
                  <Text color={subtextColor} mb={4}>
                    {consultationText}
                  </Text>
                  
                  <List spacing={3} mb={6}>
                    {consultationPoints.map((point, idx) => (
                      <ListItem 
                        key={idx} 
                        display="flex" 
                        alignItems="flex-start"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.6 + idx * 0.1 }}
                        as={motion.li}
                      >
                        <ListIcon as={point.icon} color={accentColor} mt={1} />
                        <Text color={subtextColor}>
                          {point.text}
                        </Text>
                      </ListItem>
                    ))}
                  </List>
                  
                  <Text color={subtextColor} mb={6} fontStyle="italic">
                    {guidanceText}
                  </Text>
                  
                  <Button 
                    leftIcon={<FaCalendarAlt />} 
                    colorScheme="brand" 
                    size="lg" 
                    width="100%"
                    onClick={onOpen}
                  >
                    {scheduleCallText}
                  </Button>
                </MotionBox>
              </MotionBox>
              
              {/* Right Column - Contact Form */}
              <MotionBox
                bg={cardBg}
                p={8}
                borderRadius="lg"
                boxShadow="md"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <Heading as="h2" size="lg" mb={6} color={textColor}>
                  {formTitle}
                </Heading>
                
                {formSubmitted ? (
                  <MotionFlex
                    direction="column"
                    align="center"
                    justify="center"
                    textAlign="center"
                    py={10}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon as={FaCheck} fontSize="4xl" color="green.500" mb={4} />
                    <Heading as="h3" size="md" mb={2} color={textColor}>
                      {language === 'en' ? "Thank You!" : "Mulțumim!"}
                    </Heading>
                    <Text color={subtextColor}>
                      {thankYouText}
                    </Text>
                  </MotionFlex>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <VStack spacing={4}>
                      {errorMessage && (
                        <Alert status="error" borderRadius="md">
                          <AlertIcon />
                          {errorMessage}
                        </Alert>
                      )}
                      
                      <FormControl isRequired>
                        <FormLabel color={textColor}>{nameLabel}</FormLabel>
                        <Input 
                          type="text" 
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder={`${nameLabel}...`}
                          bg={inputBg}
                          borderColor={borderColor}
                          _hover={{ borderColor: 'brand.400' }}
                          _focus={{ borderColor: 'brand.500', boxShadow: 'outline' }}
                        />
                      </FormControl>
                      
                      <FormControl isRequired>
                        <FormLabel color={textColor}>{emailLabel}</FormLabel>
                        <Input 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder={`${emailLabel}...`}
                          bg={inputBg}
                          borderColor={borderColor}
                          _hover={{ borderColor: 'brand.400' }}
                          _focus={{ borderColor: 'brand.500', boxShadow: 'outline' }}
                        />
                      </FormControl>
                      
                      <FormControl isRequired>
                        <FormLabel color={textColor}>{subjectLabel}</FormLabel>
                        <Select 
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder={language === 'en' ? "Select an option" : "Selectează o opțiune"}
                          bg={inputBg}
                          borderColor={borderColor}
                          _hover={{ borderColor: 'brand.400' }}
                          _focus={{ borderColor: 'brand.500', boxShadow: 'outline' }}
                        >
                          <option value="consultation">{language === 'en' ? "Request Consultation" : "Solicitare Consultație"}</option>
                          <option value="quotation">{language === 'en' ? "Request Quotation" : "Solicitare Ofertă"}</option>
                          <option value="information">{language === 'en' ? "General Information" : "Informații Generale"}</option>
                          <option value="other">{language === 'en' ? "Other" : "Altele"}</option>
                        </Select>
                      </FormControl>
                      
                      <FormControl isRequired>
                        <FormLabel color={textColor}>{messageLabel}</FormLabel>
                        <Textarea 
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder={`${messageLabel}...`}
                          rows={5}
                          bg={inputBg}
                          borderColor={borderColor}
                          _hover={{ borderColor: 'brand.400' }}
                          _focus={{ borderColor: 'brand.500', boxShadow: 'outline' }}
                        />
                      </FormControl>
                      
                      <Button 
                        colorScheme="brand" 
                        size="lg" 
                        width="100%"
                        type="submit"
                        mt={4}
                        isLoading={isSubmitting}
                        loadingText={language === 'en' ? 'Sending...' : 'Se trimite...'}
                      >
                        {submitButtonText}
                      </Button>
                    </VStack>
                  </form>
                )}
              </MotionBox>
            </SimpleGrid>
          </Box>
        )}
      </Container>
      
      {/* Calendly Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent height="80vh">
          <ModalHeader>{language === 'en' ? "Schedule Your Free Consultation" : "Programează Consultația Ta Gratuită"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <CalendlyEmbed />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ContactPage;
