import React, { useEffect, useState } from 'react';
import { Text } from '@chakra-ui/react';

interface TypedTextProps {
  text?: string;
  speed?: number; // ms per character
}

const TypedText: React.FC<TypedTextProps> = ({ text = '', speed = 30 }) => {
  const [typed, setTyped] = useState('');

  // Reset the typed text when text prop changes
  useEffect(() => {
    setTyped('');
  }, [text]);

  // Handle the typing effect
  useEffect(() => {
    if (!text) return; // Early return if text is empty
    
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        const char = text[index];
        if (char !== undefined) { // Ensure we're not adding undefined
          setTyped(prev => prev + char);
        }
        index++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    
    return () => clearInterval(timer);
  }, [text, speed]);

  return <Text mt={2}>{typed}</Text>;
};

export default TypedText;
