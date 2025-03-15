import React from 'react';
import {
  Box,
  Flex,
  Button,
  Image,
  HStack,
  Text,
  IconButton,
  useDisclosure,
  useColorMode,
  useColorModeValue,
  Container,
  Collapse,
  VStack,
  Divider,
  Stack,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useBreakpointValue
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import { PageName, PageIdentifier } from '../App';

const MotionBox = motion(Box);

interface NavBarProps {
  currentPage: PageIdentifier;
  unlockedPages: PageIdentifier[]; // Array of pages that have been unlocked
  onNavigate: (page: PageIdentifier) => void;
  onToggleLanguage: () => void;
  language: 'en' | 'ro';
}

const NavBar: React.FC<NavBarProps> = ({ 
  currentPage, 
  unlockedPages,
  onNavigate, 
  onToggleLanguage,
  language 
}) => {
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  
  // Navigation items with translations
  const navItems = [
    { name: 'home', label: language === 'en' ? 'Home' : 'Acasă' },
    { name: 'about', label: language === 'en' ? 'About' : 'Despre' },
    { name: 'services', label: language === 'en' ? 'Services' : 'Servicii' },
    { name: 'team', label: language === 'en' ? 'Team' : 'Echipa' },
    { name: 'contact', label: language === 'en' ? 'Contact' : 'Contact' },
    { name: 'process', label: language === 'en' ? 'Our Process' : 'Procesul Nostru' },
  ];

  // Filter items to only show unlocked pages
  const availableNavItems = navItems.filter(item => 
    unlockedPages.includes(item.name as PageIdentifier)
  );

  // Page name mappings for both languages
  const getPageName = (pageId: PageIdentifier): string => {
    switch (pageId) {
      case 'home':
        return language === 'en' ? 'Home' : 'Acasă';
      case 'about':
        return language === 'en' ? 'About' : 'Despre';
      case 'services':
        return language === 'en' ? 'Services' : 'Servicii';
      case 'team':
        return language === 'en' ? 'Team' : 'Echipa';
      case 'contact':
        return language === 'en' ? 'Contact' : 'Contact';
      case 'process':
        return language === 'en' ? 'Our Process' : 'Procesul Nostru';
      default:
        return pageId as string; // For dynamic pages, we'll just use the ID
    }
  };

  return (
    <Box 
      as="nav" 
      position="fixed" 
      top={0} 
      left={0} 
      right={0} 
      zIndex={1000}
      bg={bg}
      borderBottom="1px solid"
      borderColor={borderColor}
      shadow="sm"
    >
      <Container maxW="container.xl">
        <Flex align="center" justify="space-between" h="70px">
          {/* Logo */}
          <MotionBox 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            cursor="pointer"
            onClick={() => onNavigate('home')}
          >
            <Flex align="center">
              <Text 
                fontSize="xl" 
                fontWeight="bold" 
                color="brand.500"
              >
                TechSolutions
              </Text>
            </Flex>
          </MotionBox>

          {/* Desktop Nav - only showing unlocked pages */}
          <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
            {availableNavItems.map((item, idx) => (
              <Box 
                key={item.name}
                as={MotionBox}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
              >
                <Button
                  variant="ghost"
                  color={currentPage === item.name ? 'brand.500' : textColor}
                  fontWeight={currentPage === item.name ? 'semibold' : 'normal'}
                  borderBottom={currentPage === item.name ? '2px solid' : 'none'}
                  borderColor="brand.500"
                  borderRadius="0"
                  onClick={() => onNavigate(item.name as PageIdentifier)}
                  _hover={{
                    color: 'brand.500',
                    bg: 'transparent'
                  }}
                >
                  {getPageName(item.name as PageIdentifier)}
                </Button>
              </Box>
            ))}
          </HStack>

          {/* Right side controls */}
          <HStack spacing={4}>
            <MotionBox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Button
                size="sm"
                variant="outline"
                onClick={onToggleLanguage}
                borderColor="brand.500"
                color={textColor}
                _hover={{ bg: 'brand.50' }}
              >
                {language === 'en' ? 'RO' : 'EN'}
              </Button>
            </MotionBox>
            
            <MotionBox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <IconButton
                aria-label="Toggle color mode"
                icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                onClick={toggleColorMode}
                variant="ghost"
                color={textColor}
              />
            </MotionBox>
            
            {/* Mobile menu button */}
            <Box display={{ base: 'block', md: 'none' }}>
              <IconButton
                aria-label="Open menu"
                icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                onClick={onToggle}
                variant="ghost"
                color={textColor}
              />
            </Box>
          </HStack>
        </Flex>

        {/* Mobile Nav - only showing unlocked pages */}
        <Collapse in={isOpen} animateOpacity>
          <VStack
            py={4}
            spacing={4}
            align="stretch"
            display={{ md: 'none' }}
            borderTop="1px solid"
            borderColor={borderColor}
          >
            {availableNavItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                justifyContent="flex-start"
                onClick={() => {
                  onNavigate(item.name as PageIdentifier);
                  onToggle();
                }}
                color={currentPage === item.name ? 'brand.500' : textColor}
                fontWeight={currentPage === item.name ? 'semibold' : 'normal'}
                _hover={{
                  color: 'brand.500'
                }}
              >
                {getPageName(item.name as PageIdentifier)}
              </Button>
            ))}
            <Divider />
          </VStack>
        </Collapse>
      </Container>
    </Box>
  );
};

export default NavBar;
