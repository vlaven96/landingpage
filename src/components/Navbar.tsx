import React from 'react';
import { PageName } from '../App';
import {
  Box,
  Flex,
  Heading,
  HStack,
  Button,
  useColorMode,
  Spacer,
  IconButton
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

interface NavbarProps {
  unlockedPages: PageName[];
  currentPage: PageName;
  onNavigate: (page: PageName) => void;
}

const PAGE_LABELS: Record<PageName, string> = {
  home: 'Home',
  about: 'About',
  services: 'Services',
  team: 'Team',
  contact: 'Contact'
};

const Navbar: React.FC<NavbarProps> = ({
  unlockedPages,
  currentPage,
  onNavigate
}) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      as="header"
      bg="gray.800"
      color="white"
      px={4}
      py={3}
      position="sticky"
      top="0"
      zIndex="1000"
    >
      <Flex alignItems="center">
        {/* Brand / Logo */}
        <Heading size="md" cursor="pointer" onClick={() => onNavigate('home')}>
          My AI Company
        </Heading>

        <Spacer />

        <HStack spacing={4}>
          {/* Render a button for each unlocked page */}
          {unlockedPages.map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? 'solid' : 'outline'}
              colorScheme="teal"
              onClick={() => onNavigate(page)}
            >
              {PAGE_LABELS[page]}
            </Button>
          ))}

          {/* Light/Dark Mode Toggle */}
          <IconButton
            aria-label="Toggle dark mode"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="outline"
          />
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
