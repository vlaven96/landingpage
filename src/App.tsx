import React, { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import Chat from './components/Chat';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import ServicesPage from './components/ServicesPage';
import TeamPage from './components/TeamPage';
import ContactPage from './components/ContactPage';

export type PageName = 'home' | 'about' | 'services' | 'team' | 'contact';
export type Language = 'en' | 'ro';

const App: React.FC = () => {
  // The pages that are unlocked & visible in the navbar
  const [unlockedPages, setUnlockedPages] = useState<PageName[]>(['home']);
  // Current displayed page
  const [currentPage, setCurrentPage] = useState<PageName>('home');
  // Current language
  const [language, setLanguage] = useState<Language>('en');

  // On mount, detect user language
  useEffect(() => {
    console.log('navigator.language', navigator.language);
    const userLang = navigator.language || navigator.languages?.[0] || 'en';
    // If user language is Romanian, default to 'ro'; else 'en'
    if (userLang.toLowerCase().startsWith('ro')) {
      setLanguage('ro');
    } else {
      setLanguage('en');
    }
  }, []);

  // Called by chat when user enters a command
  const unlockPage = (page: PageName) => {
    setUnlockedPages((prev) =>
      prev.includes(page) ? prev : [...prev, page]
    );
    setCurrentPage(page);
  };

  // Navbar or chat can navigate if page is unlocked
  const handleNavigate = (page: PageName) => {
    if (unlockedPages.includes(page)) {
      setCurrentPage(page);
    }
  };

  // Toggle language (optional manual switch)
  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'ro' : 'en'));
  };

  // Render whichever page is active, passing in "language"
  const renderPage = () => {
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
  };

  return (
    <Box minH="100vh" position="relative">
      <Navbar
        unlockedPages={unlockedPages}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        language={language}
        onToggleLanguage={toggleLanguage}
      />
      {renderPage()}
      <Chat onUnlockPage={unlockPage} />
    </Box>
  );
};

export default App;
