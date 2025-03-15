import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Avatar,
  Flex,
  Skeleton,
  SkeletonCircle,
  useColorModeValue
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaUsers } from 'react-icons/fa';
import TypedText from './TypedText';
import { Language } from '../App';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

interface TeamPageProps {
  language: Language;
}

const TeamPage: React.FC<TeamPageProps> = ({ language }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Text content based on language
  const headingText = language === 'en' ? "Our Team" : "Echipa Noastră";
  
  const introText = language === 'en'
    ? "Meet the passionate professionals behind our solutions."
    : "Cunoaște profesioniștii pasionați din spatele soluțiilor noastre.";

  // Team member data with language support
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: language === 'en' ? "AI Developer" : "Dezvoltator AI",
      bio: language === 'en' 
        ? "Expert in machine learning and natural language processing."
        : "Expert în învățare automată și procesarea limbajului natural.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Maria Rodriguez",
      role: language === 'en' ? "Automation Specialist" : "Specialist în Automatizări",
      bio: language === 'en'
        ? "Creates efficient workflows that save time and reduce errors."
        : "Creează fluxuri de lucru eficiente care economisesc timp și reduc erorile.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "David Chen",
      role: language === 'en' ? "Data Engineer" : "Inginer de Date",
      bio: language === 'en'
        ? "Transforms raw data into valuable business insights."
        : "Transformă date brute în informații valoroase pentru afaceri.",
      avatar: "https://randomuser.me/api/portraits/men/79.jpg"
    }
  ];

  // Color mode values
  const bg = useColorModeValue('white', 'darkBg.700');
  const cardBg = useColorModeValue('white', 'darkBg.800');
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const subtextColor = useColorModeValue('gray.600', 'gray.300');
  const roleColor = useColorModeValue('brand.500', 'brand.300');

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
              <FaUsers size={50} />
            </MotionBox>
            <Skeleton height="40px" width="200px" />
            <SkeletonCircle size="100px" />
            <Skeleton height="20px" width="150px" />
            <Skeleton height="20px" width="200px" />
          </Flex>
        ) : (
          <Flex direction="column" align="center" gap={16}>
            <Heading 
              as="h1" 
              size="2xl" 
              textAlign="center"
              color={textColor}
            >
              <TypedText text={headingText} speed={30} />
            </Heading>
            
            <Text 
              fontSize="xl" 
              mb={16} 
              maxW="xl" 
              textAlign="center"
              color={subtextColor}
            >
              <TypedText text={introText} />
            </Text>
            
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} w="100%">
              {teamMembers.map((member, idx) => (
                <MotionFlex
                  key={idx}
                  direction="column"
                  align="center"
                  p={6}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  bg={cardBg}
                  borderRadius="lg"
                  boxShadow="sm"
                  textAlign="center"
                >
                  <Avatar 
                    size="xl" 
                    src={member.avatar} 
                    mb={4} 
                    border="4px solid"
                    borderColor={cardBg}
                    boxShadow="md"
                  />
                  <Heading size="md" color={textColor} mb={1}>
                    {member.name}
                  </Heading>
                  <Text color={roleColor} fontWeight="500" mb={4}>
                    {member.role}
                  </Text>
                  <Text color={subtextColor}>
                    {member.bio}
                  </Text>
                </MotionFlex>
              ))}
            </SimpleGrid>
          </Flex>
        )}
      </Container>
    </Box>
  );
};

export default TeamPage;
