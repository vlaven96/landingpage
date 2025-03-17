import React, { useEffect, useState } from 'react';
import { Text } from '@chakra-ui/react';

interface TypedTextProps {
  text: string;
  speed?: number; // ms per character
  hasVisited?: boolean; // New prop
}

const TypedText: React.FC<TypedTextProps> = ({ text, speed = 25, hasVisited = false }) => {
  const [displayedText, setDisplayedText] = useState(hasVisited ? text : '');

  useEffect(() => {
    // If we've visited before, immediately show the full text
    if (hasVisited) {
      setDisplayedText(text);
      return;
    }

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, hasVisited]);

  return <Text mt={2}>{displayedText}</Text>;
};

export default TypedText;
