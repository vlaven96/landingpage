import React, { useState, useEffect } from 'react';
import { Box, Container, Heading, Text, Divider, Skeleton, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { DynamicPageData } from '../App';

interface DynamicPageProps {
  page: DynamicPageData;
  hasVisited?: boolean;
}

const MotionBox = motion(Box);

const DynamicPage: React.FC<DynamicPageProps> = ({ page, hasVisited = false }) => {
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

  if (!page) {
    return (
      <Box minH="100vh" bg="white">
        <Container maxW="container.md" pt={{ base: 20, md: 32 }} pb={{ base: 16, md: 24 }}>
          <Skeleton height="60px" mb={6} />
          <Divider my={6} borderColor="gray.200" />
          <Skeleton height="20px" mb={3} />
          <Skeleton height="20px" mb={3} />
          <Skeleton height="20px" mb={3} />
          <Skeleton height="20px" mb={3} />
          <Skeleton height="20px" width="70%" />
        </Container>
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg="white">
      <Container maxW="container.md" pt={{ base: 20, md: 32 }} pb={{ base: 16, md: 24 }}>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Heading 
            as="h1" 
            size="2xl" 
            mb={6} 
            color="gray.800"
          >
            {page.title}
          </Heading>
          
          <Divider my={6} borderColor="gray.200" />
          
          <Box 
            whiteSpace="pre-wrap" 
            fontSize="lg" 
            color="gray.700" 
            lineHeight="1.8"
          >
            {page.content}
          </Box>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default DynamicPage;
