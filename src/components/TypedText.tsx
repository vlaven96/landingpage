import React, { useEffect, useState } from 'react';
import { Text } from '@chakra-ui/react';

interface TypedTextProps {
  text: string;
  speed?: number; // ms per character
}

const TypedText: React.FC<TypedTextProps> = ({ text, speed = 25 }) => {
  const [typed, setTyped] = useState('');

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setTyped((prev) => prev + text[index]);
        index++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return <Text>{typed}</Text>;
};

export default TypedText;
