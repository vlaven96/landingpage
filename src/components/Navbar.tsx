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
import { PageName } from '../App';

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
          My Outsourcing Co.
        </Heading>

        <HStack spacing={4}>
          {unlockedPages.map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? 'solid' : 'outline'}
              colorScheme="teal"
              size="sm"
              onClick={() => onNavigate(page)}
            >
              {PAGE_LABELS[page]}
            </Button>
          ))}
        </HStack>

        <Spacer />
        {/* Dark/Light Mode Toggle */}
        <IconButton
          aria-label="Toggle dark mode"
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          variant="outline"
          size="sm"
          ml={2}
        />
      </Flex>
    </Box>
  );
};

export default Navbar;
