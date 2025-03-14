import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Button,
  HStack,
  IconButton,
  Spacer,
  useColorMode,
  useColorModeValue
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { PageName, Language } from '../App';

interface NavbarProps {
  unlockedPages: PageName[];
  currentPage: PageName;
  onNavigate: (page: PageName) => void;
  language: Language;
  onToggleLanguage: () => void;
}

const PAGE_LABELS: Record<PageName, { en: string; ro: string }> = {
  home: { en: 'Home', ro: 'Acasă' },
  about: { en: 'About', ro: 'Despre Noi' },
  services: { en: 'Services', ro: 'Servicii' },
  team: { en: 'Team', ro: 'Echipă' },
  contact: { en: 'Contact', ro: 'Contact' }
};

const Navbar: React.FC<NavbarProps> = ({
  unlockedPages,
  currentPage,
  onNavigate,
  language,
  onToggleLanguage
}) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgNav = useColorModeValue('gray.800', 'gray.900');

  return (
    <Box
      as="header"
      bg={bgNav}
      color="white"
      px={4}
      py={3}
      position="sticky"
      top="0"
      zIndex="1000"
    >
      <Flex alignItems="center">
        {/* Brand / Logo */}
        <Heading
          size="md"
          cursor="pointer"
          onClick={() => onNavigate('home')}
          mr={8}
        >
          {language === 'en' ? 'My Outsourcing Co.' : 'Compania Outsourcing'}
        </Heading>

        <HStack spacing={4}>
          {/* Only show unlocked pages */}
          {unlockedPages.map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? 'solid' : 'outline'}
              colorScheme="teal"
              size="sm"
              onClick={() => onNavigate(page)}
            >
              {/* Translate each page label */}
              {PAGE_LABELS[page][language]}
            </Button>
          ))}
        </HStack>

        <Spacer />

        {/* Language Toggle Button (EN / RO) */}
        <Button
          size="sm"
          colorScheme="orange"
          variant="outline"
          onClick={onToggleLanguage}
          mr={2}
        >
          {language === 'en' ? 'RO' : 'EN'}
        </Button>

        {/* Dark/Light Mode Toggle */}
        <IconButton
          aria-label="Toggle dark mode"
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          variant="outline"
          size="sm"
        />
      </Flex>
    </Box>
  );
};

export default Navbar;
