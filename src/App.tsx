import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import ServicesPage from './components/ServicesPage';
import TeamPage from './components/TeamPage';
import ContactPage from './components/ContactPage';
import Chat from './components/Chat';

export type PageName = 'home' | 'about' | 'services' | 'team' | 'contact';

const App: React.FC = () => {
  // The pages that are "unlocked" (available in the nav)
  const [unlockedPages, setUnlockedPages] = useState<PageName[]>(['home']);
  // The currently displayed page
  const [currentPage, setCurrentPage] = useState<PageName>('home');

  // Called by Chat whenever user triggers a new page
  const unlockPage = (page: PageName) => {
    setUnlockedPages((prev) => {
      if (!prev.includes(page)) return [...prev, page];
      return prev;
    });
    setCurrentPage(page); // Also navigate to that page
  };

  // Render the current page
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
    <Box minH="100vh" pb="200px" position="relative">
      {/* Top navigation bar */}
      <Navbar
        unlockedPages={unlockedPages}
        currentPage={currentPage}
        onNavigate={setCurrentPage}
      />

      {/* Render whichever page is active */}
      {renderPage()}

      {/* Bottom chat to unlock more pages */}
      <Chat onUnlockPage={unlockPage} />
    </Box>
  );
};

export default App;
