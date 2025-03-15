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
import { DynamicPageData, PageIdentifier, Language } from '../App';

/**
 * For "default" pages, we have both EN and RO labels.
 * If a page is dynamic, we store its `title` in dynamicPages (no additional translation).
 */
const DEFAULT_PAGE_LABELS: Record<string, { en: string; ro: string }> = {
  home: { en: 'Home', ro: 'Acasă' },
  about: { en: 'About', ro: 'Despre Noi' },
  services: { en: 'Services', ro: 'Servicii' },
  team: { en: 'Team', ro: 'Echipă' },
  contact: { en: 'Contact', ro: 'Contact' }
};

interface NavbarProps {
  /** A list of page IDs that are currently unlocked (could be default or dynamic). */
  unlockedPages: PageIdentifier[];
  /** The user’s current page. */
  currentPage: PageIdentifier;
  /** Called when the user clicks a nav button. */
  onNavigate: (pageId: PageIdentifier) => void;
  /** The list of dynamic pages that have been created by the chatbot. */
  dynamicPages: DynamicPageData[];
  /** Current language (en/ro). */
  language: Language;
  /** Function to toggle language. */
  onToggleLanguage: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  unlockedPages,
  currentPage,
  onNavigate,
  dynamicPages,
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
        {/** Brand / Logo, toggles to 'home' */}
        <Heading
          size="md"
          cursor="pointer"
          onClick={() => onNavigate('home')}
          mr={8}
        >
          {language === 'en' ? 'My Outsourcing Co.' : 'Compania Outsourcing'}
        </Heading>

        <HStack spacing={4}>
          {/** Render nav buttons for each unlocked page (default or dynamic) */}
          {unlockedPages.map((pageId) => {
            // If it's one of our default pages, show the translated label
            if (DEFAULT_PAGE_LABELS[pageId]) {
              const labelObj = DEFAULT_PAGE_LABELS[pageId];
              const label = labelObj[language]; // 'Home' or 'Acasă' etc.
              return (
                <Button
                  key={pageId}
                  variant={currentPage === pageId ? 'solid' : 'outline'}
                  colorScheme="teal"
                  size="sm"
                  onClick={() => onNavigate(pageId)}
                >
                  {label}
                </Button>
              );
            }

            // Otherwise, see if it's a dynamic page
            const dp = dynamicPages.find((d) => d.id === pageId);
            if (dp) {
              return (
                <Button
                  key={dp.id}
                  variant={currentPage === dp.id ? 'solid' : 'outline'}
                  colorScheme="teal"
                  size="sm"
                  onClick={() => onNavigate(dp.id)}
                >
                  {dp.title}
                </Button>
              );
            }

            // If something else or not found, ignore
            return null;
          })}
        </HStack>

        <Spacer />

        {/** Language Toggle Button (EN / RO) */}
        <Button
          size="sm"
          colorScheme="orange"
          variant="outline"
          onClick={onToggleLanguage}
          mr={2}
        >
          {language === 'en' ? 'RO' : 'EN'}
        </Button>

        {/** Dark/Light Mode Toggle */}
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
