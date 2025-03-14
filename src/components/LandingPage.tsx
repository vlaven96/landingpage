import React from 'react';
import { Box, Container, Heading, Text, Button } from '@chakra-ui/react';
import { SectionName } from '../App';
import AboutSection from './AboutPage';
import ServicesSection from './ServicesPage';
import TeamSection from './TeamPage';
import ContactSection from './ContactSection';

interface LandingPageProps {
  displayedSections: SectionName[];
}

const LandingPage: React.FC<LandingPageProps> = ({ displayedSections }) => {
  return (
    <Box>
      {/* Hero / Banner Section */}
      <Box
        bgGradient="linear(to-r, teal.500, green.400)"
        py={20}
        color="white"
        textAlign="center"
      >
        <Heading size="2xl" mb={4}>
          AI & Automation Solutions
        </Heading>
        <Text fontSize="xl" maxW="600px" mx="auto" mb={6}>
          Revolutionize your business with cutting-edge AI-driven automation services,
          tailored to your unique challenges and goals.
        </Text>
        <Button colorScheme="blackAlpha" size="lg">
          Get Started
        </Button>
      </Box>

      {/* Dynamic Sections */}
      <Container maxW="container.lg" mt={8} mb={40}>
        {displayedSections.includes('about') && <AboutSection />}
        {displayedSections.includes('services') && <ServicesSection />}
        {displayedSections.includes('team') && <TeamSection />}
        {displayedSections.includes('contact') && <ContactSection />}
      </Container>
    </Box>
  );
};

export default LandingPage;
