import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  SimpleGrid,
  Avatar,
  VStack,
  Skeleton,
  SkeletonCircle,
  Center,
  useColorModeValue
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaUsers } from 'react-icons/fa';
import TypedText from './TypedText';
import { Language } from '../App';

const MotionBox = motion(Box);

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
      role: language === 'en' ? "Full-Stack Developer" : "Developer Full-Stack",
      bio: language === 'en'
        ? "Builds robust applications with modern technologies."
        : "Construiește aplicații robuste cu tehnologii moderne.",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg"
    }
  ];

  // Same background gradient as other pages
  const gradientBg = useColorModeValue(
    'linear(to-r, teal.300, blue.400)',
    'linear(to-r, teal.600, blue.800)'
  );

  return (
    <Box position="relative" minH="100vh" overflow="hidden">
      {/* Background gradient */}
      <Box
        position="absolute"
        top={0}
        left={0}
        w="100%"
        h="100%"
        bgGradient={gradientBg}
        zIndex={-2}
      />

      <Flex
        direction="column"
        align="center"
        minH="100vh"
        px={6}
        py={12}
        color="white"
        position="relative"
        zIndex={1}
      >
        {loading ? (
          <Box textAlign="center" maxW="800px" mx="auto">
            <Center mb={8}>
              <MotionBox
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
              >
                <FaUsers size={50} />
              </MotionBox>
            </Center>
            <Skeleton height="40px" mb={6} />
            <Skeleton height="20px" mb={10} />
            
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
              {[1, 2, 3].map((_, i) => (
                <VStack key={i} spacing={3} p={4}>
                  <SkeletonCircle size="80px" />
                  <Skeleton height="20px" width="120px" />
                  <Skeleton height="15px" width="100px" />
                  <Skeleton height="40px" />
                </VStack>
              ))}
            </SimpleGrid>
          </Box>
        ) : (
          <Box textAlign="center" maxW="800px" mx="auto">
            <Heading as="h1" fontSize={{ base: '3xl', md: '5xl' }} mb={4}>
              <TypedText text={headingText} speed={30} />
            </Heading>
            <Text fontSize="xl" mb={10}>
              <TypedText text={introText} />
            </Text>
            
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
              {teamMembers.map((member, idx) => (
                <MotionBox
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  bg="whiteAlpha.200"
                  p={6}
                  borderRadius="lg"
                  backdropFilter="blur(10px)"
                >
                  <VStack>
                    <Avatar size="xl" src={member.avatar} mb={4} />
                    <Heading size="md">{member.name}</Heading>
                    <Text color="teal.200" fontWeight="bold">
                      {member.role}
                    </Text>
                    <Text>{member.bio}</Text>
                  </VStack>
                </MotionBox>
              ))}
            </SimpleGrid>
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default TeamPage;
