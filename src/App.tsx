import React, { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import Chat from './components/Chat';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import ServicesPage from './components/ServicesPage';
import TeamPage from './components/TeamPage';
import ContactPage from './components/ContactPage';
import DynamicPage from './components/DynamicPage';

// "Default" pages
export type DefaultPageName = 'home' | 'about' | 'services' | 'team' | 'contact';

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
   * 1) Keep track of default/dynamic pages in the nav
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
  const [language, setLanguage] = useState<Language>('en');

  /**
   * Optional: auto-detect user language on mount
   * (If you want to detect "ro" from the browser, uncomment)
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
    return ['home', 'about', 'services', 'team', 'contact'].includes(p as any);
  };

  /**
   * Called by the Chat whenever we need to unlock or create a page
   */
  const unlockOrCreatePage = (pageId: PageIdentifier, pageData?: DynamicPageData) => {
    // If this is a new dynamic page, store it
    if (pageData) {
      setDynamicPages((prev) => [...prev, pageData]);
    }
    // Unlock if not in the list
    setUnlockedPages((prev) => (prev.includes(pageId) ? prev : [...prev, pageId]));

    // Navigate to the new/unlocked page
    setCurrentPage(pageId);
  };

  /**
   * Called by the Navbar or Chat to navigate to an already unlocked page
   */
  const handleNavigate = (pageId: PageIdentifier) => {
    if (unlockedPages.includes(pageId)) {
      setCurrentPage(pageId);
    }
  };

  /**
   * Renders the current page (home, about, or a dynamic one)
   * We'll pass "language" to each subpage so it can display the correct text
   */
  const renderPage = () => {
    if (isDefaultPage(currentPage)) {
      switch (currentPage) {
        case 'home':
          return <HomePage language={language} />;
        case 'about':
          return <AboutPage language={language} />;
        case 'services':
          return <ServicesPage language={language} />;
        case 'team':
          return <TeamPage language={language} />;
        case 'contact':
          return <ContactPage language={language} />;
        default:
          return <HomePage language={language} />;
      }
    } else {
      // It's dynamic: find the data
      const dp = dynamicPages.find((d) => d.id === currentPage);
      if (!dp) return <Box color="white">Error: Page Not Found</Box>;
      // Show a custom dynamic page with same style
      return <DynamicPage page={dp} />;
    }
  };

  return (
    <Box minH="100vh" position="relative">
      <Navbar
        unlockedPages={unlockedPages}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        dynamicPages={dynamicPages}
        language={language}
        onToggleLanguage={toggleLanguage}
      />
      {renderPage()}

      {/* The Chat can unlock existing pages or create new ones */}
      <Chat onUnlockOrCreatePage={unlockOrCreatePage} />
    </Box>
  );
};

export default App;
