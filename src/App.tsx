// App.tsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  ChakraProvider,
  extendTheme,
  ColorModeScript,    //  <-- Import this
} from '@chakra-ui/react';
import Navbar from './components/Navbar';
import Chat from './components/Chat';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import ServicesPage from './components/ServicesPage';
import TeamPage from './components/TeamPage';
import ContactPage from './components/ContactPage';
import DynamicPage from './components/DynamicPage';
import OurProcessPage from './components/OurProcessPage';

// Define a custom theme with improved dark mode colors
const theme = extendTheme({
  colors: {
    brand: {
      50: '#e6f7ff',
      100: '#b3e0ff',
      200: '#80c9ff',
      300: '#4db2ff',
      400: '#269bff',
      500: '#0084ff', // primary brand color
      600: '#0066cc',
      700: '#004d99',
      800: '#003366',
      900: '#001a33',
    },
    darkBg: {
      700: '#2d3748', // slightly lighter dark background
      800: '#1e2536', // medium dark background
      900: '#171923', // darkest background (for chat)
    },
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'darkBg.700' : 'white',
        color: props.colorMode === 'dark' ? 'white' : 'gray.800',
      },
    }),
  },
});

// "Default" pages
export type DefaultPageName = 'home' | 'about' | 'services' | 'team' | 'contact' | 'process';

// If you have dynamic pages, each is identified by a string ID
export type PageIdentifier = DefaultPageName | string;

// If you are supporting EN and RO:
export type Language = 'en' | 'ro';

// Example shape for new pages created on-the-fly
export interface DynamicPageData {
  id: string;       // e.g. "custom-page-123"
  title: string;    // e.g. "My Custom Page"
  content: string;  // e.g. "Some user-provided text"
}

const App: React.FC = () => {
  /**
   * 1) Keep track of default/dynamic pages in the nav - only home is initially visible
   */
  const [unlockedPages, setUnlockedPages] = useState<PageIdentifier[]>(['home']);

  /**
   * 2) Array storing dynamic page data
   */
  const [dynamicPages, setDynamicPages] = useState<DynamicPageData[]>([]);

  /**
   * 3) Which page is currently displayed
   */
  const [currentPage, setCurrentPage] = useState<PageIdentifier>('home');

  /**
   * 4) Language state (EN or RO)
   */
  const [language, setLanguage] = useState<Language>('ro');

  /**
   * Track which pages have already been visited to skip animations
   */
  const [visitedPages, setVisitedPages] = useState<PageIdentifier[]>(['home']);

  /**
   * Add a state for message to be displayed in chat
   */
  const [chatSystemMessage, setChatSystemMessage] = useState<string | null>(null);

  /**
   * Optional: auto-detect user language on mount
   */
  /*
  useEffect(() => {
    const userLang = navigator.language || navigator.languages?.[0] || 'en';
    if (userLang.toLowerCase().startsWith('ro')) {
      setLanguage('ro');
    } else {
      setLanguage('en');
    }
  }, []);
  */

  /**
   * Toggle language between EN & RO
   */
  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'ro' : 'en'));
  };

  /**
   * Quick helper: is page one of the default ones
   */
  const isDefaultPage = (p: PageIdentifier): p is DefaultPageName => {
    return ['home', 'about', 'services', 'team', 'contact', 'process'].includes(p as any);
  };

  /**
   * Called by the Chat whenever we need to unlock or create a page
   */
  const unlockOrCreatePage = (
    pageId: PageIdentifier,
    pageData?: DynamicPageData,
    newLanguage?: Language
  ) => {
    // If language change is requested, update it
    if (newLanguage && (newLanguage === 'en' || newLanguage === 'ro')) {
      setLanguage(newLanguage);
    }

    // If this is a new dynamic page, store it
    if (pageData) {
      setDynamicPages((prev) => [...prev, pageData]);
    }

    // Unlock if not in the list
    setUnlockedPages((prev) => (prev.includes(pageId) ? prev : [...prev, pageId]));

    // Track that this page has been visited
    if (!visitedPages.includes(pageId)) {
      setVisitedPages((prev) => [...prev, pageId]);
    }

    // Navigate to the new/unlocked page
    setCurrentPage(pageId);

    // Scroll to the top of the page
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  /**
   * Called by the Navbar or Chat to navigate to an already unlocked page
   */
  const handleNavigate = (pageId: PageIdentifier) => {
    if (unlockedPages.includes(pageId)) {
      // Track that this page has been visited
      if (!visitedPages.includes(pageId)) {
        setVisitedPages((prev) => [...prev, pageId]);
      }

      setCurrentPage(pageId);
    }
  };

  /**
   * Create a function to handle specific page requests with chat messages
   */
  const handlePageRequest = (targetPage: PageIdentifier) => {
    // Set message based on current page and language
    let message;

    if (targetPage === 'services') {
      message =
        language === 'en'
          ? "We're directing you to our Services page."
          : 'Vă redirecționăm către pagina de servicii.';
    } else if (targetPage === 'contact') {
      message =
        language === 'en'
          ? "We're directing you to our Contact page."
          : 'Vă redirecționăm către pagina de contact.';
    } else {
      message =
        language === 'en'
          ? `We're directing you to the ${targetPage} page.`
          : `Vă redirecționăm către pagina ${targetPage}.`;
    }

    // Set the message to be displayed in chat
    setChatSystemMessage(message);

    // Navigate to the page after a small delay
    setTimeout(() => {
      // Use unlockOrCreatePage to ensure the page is unlocked
      unlockOrCreatePage(targetPage);
    }, 500);
  };

  /**
   * Function specifically for handling consultation requests
   */
  const handleConsultationRequest = () => {
    handlePageRequest('contact');
  };

  /**
   * Renders the current page
   */
  const renderPage = () => {
    // Check if this page has been visited before
    const hasVisited = visitedPages.includes(currentPage);

    if (isDefaultPage(currentPage)) {
      switch (currentPage) {
        case 'home':
          return (
            <HomePage
              language={language}
              hasVisited={hasVisited}
              onNavigate={handleNavigate}
              onConsultation={handleConsultationRequest}
              onPageRequest={handlePageRequest}
            />
          );
        case 'about':
          return <AboutPage language={language} hasVisited={hasVisited} />;
        case 'services':
          return (
            <ServicesPage
              language={language}
              hasVisited={hasVisited}
              onConsultation={handleConsultationRequest}
            />
          );
        case 'team':
          return <TeamPage language={language} hasVisited={hasVisited} />;
        case 'contact':
          return <ContactPage language={language} hasVisited={hasVisited} />;
        case 'process':
          return <OurProcessPage language={language} hasVisited={hasVisited} />;
        default:
          return <HomePage language={language} hasVisited={hasVisited} />;
      }
    } else {
      // It's a dynamic page
      const dp = dynamicPages.find((d) => d.id === currentPage);
      if (!dp) return <Box color="white">Error: Page Not Found</Box>;
      return <DynamicPage page={dp} hasVisited={hasVisited} />;
    }
  };

  return (
    <>
      {/* This script syncs the color mode before the app mounts */}
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />

      {/* Wrap the entire UI in one ChakraProvider */}
      <ChakraProvider theme={theme}>
        <Box minH="100vh" position="relative">
          <Navbar
            unlockedPages={unlockedPages}
            currentPage={currentPage}
            onNavigate={handleNavigate}
            dynamicPages={dynamicPages}
            language={language}
            onToggleLanguage={toggleLanguage}
          />
          <Box pb={{ base: '30vh', md: '30vh' }}>{renderPage()}</Box>

          {/* The Chat can unlock existing pages or create new ones */}
          <Chat
            onUnlockOrCreatePage={unlockOrCreatePage}
            currentPage={currentPage}
            systemMessage={chatSystemMessage}
            onSystemMessageDisplayed={() => setChatSystemMessage(null)}
          />
        </Box>
      </ChakraProvider>
    </>
  );
};

export default App;
