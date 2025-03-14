import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import Chat from './components/Chat';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import ServicesPage from './components/ServicesPage';
import TeamPage from './components/TeamPage';
import ContactPage from './components/ContactPage';

export type PageName = 'home' | 'about' | 'services' | 'team' | 'contact';

const App: React.FC = () => {
  // The pages that are unlocked & visible in the navbar
  const [unlockedPages, setUnlockedPages] = useState<PageName[]>(['home']);
  // Current displayed page
  const [currentPage, setCurrentPage] = useState<PageName>('home');

  // Called by chat when user enters a command
  const unlockPage = (page: PageName) => {
    // Add the page to unlocked list if not already present
    setUnlockedPages((prev) =>
      prev.includes(page) ? prev : [...prev, page]
    );
    // Also navigate to it
    setCurrentPage(page);
  };

  // Called by navbar or chat to switch pages (already unlocked)
  const handleNavigate = (page: PageName) => {
    if (unlockedPages.includes(page)) {
      setCurrentPage(page);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'services':
        return <ServicesPage />;
      case 'team':
        return <TeamPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <Box minH="100vh" position="relative">
      {/* Navbar shows only unlocked pages */}
      <Navbar
        unlockedPages={unlockedPages}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />
      {/* Render whichever page is active */}
      {renderPage()}
      {/* Chat that can unlock new pages */}
      <Chat onUnlockPage={unlockPage} />
    </Box>
  );
};

export default App;
