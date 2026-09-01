import React, { useState, useRef, useEffect } from 'react';

const GLYPHS = ['K', 'K', 'J', 'E', 'W', 'E', 'L', 'S', '✦', '✧', '♦', '◊'];

export const ScrambleText = ({ text, className = '', as: Component = 'span' }) => {
  const [displayText, setDisplayText] = useState(text);
  const isScrambling = useRef(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    setDisplayText(text);
  }, [text]);

  const handleMouseEnter = () => {
    if (isScrambling.current) return;
    isScrambling.current = true;

    let iteration = 0;
    const maxIterations = text.length * 2;

    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration / 2) {
              return text[index];
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join('')
      );

      if (iteration >= maxIterations) {
        clearInterval(intervalRef.current);
        setDisplayText(text);
        isScrambling.current = false;
      }

      iteration += 1;
    }, 25);
  };

  const handleMouseLeave = () => {
    clearInterval(intervalRef.current);
    setDisplayText(text);
    isScrambling.current = false;
  };

  return (
    <Component
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`inline-block cursor-default select-none font-mono ${className}`}
    >
      {displayText}
    </Component>
  );
};

export default ScrambleText;
