import React from 'react';

const WordRenderer = ({ text, idPrefix, defaultColor = "inherit", highlightColor = "#fbbf24", activeWordId }) => {
  if (typeof text !== 'string') return text;
  
  const words = text.split(/\s+/);
  let inBold = false;
  let inOrange = false;

  return (
    <>
      {words.map((word, index) => {
        const wordId = `${idPrefix}-${index + 1}`;
        const isHighlight = wordId === activeWordId;

        // Clean punctuation from start/end to check for bold (**) or orange (!!) markers
        let cleanWord = word;
        let prefix = "";
        let suffix = "";

        const match = word.match(/^([.,:;!?("']*)(.*?)([.,:;!?)"']*)$/);
        if (match) {
          prefix = match[1];
          cleanWord = match[2];
          suffix = match[3];
        }

        if (cleanWord.startsWith("**")) {
          inBold = true;
          cleanWord = cleanWord.substring(2);
        }
        if (cleanWord.startsWith("!!")) {
          inOrange = true;
          cleanWord = cleanWord.substring(2);
        }

        let isBold = inBold;
        let isOrange = inOrange;

        if (cleanWord.endsWith("**")) {
          cleanWord = cleanWord.slice(0, -2);
          isBold = true;
          inBold = false;
        }
        if (cleanWord.endsWith("!!")) {
          cleanWord = cleanWord.slice(0, -2);
          isOrange = true;
          inOrange = false;
        }
        
        // Failsafe strip of any remaining asterisks
        cleanWord = cleanWord.replace(/\*\*/g, '');

        let color = defaultColor;
        if (isHighlight) {
          color = highlightColor;
        } else if (isOrange) {
          color = "#ea580c";
        }

        return (
          <React.Fragment key={wordId}>
            {prefix}
            <span
              id={wordId}
              style={{
                color: color,
                fontWeight: isBold || isHighlight ? 'bold' : 'inherit',
                transition: 'color 0.1s ease',
              }}
            >
              {cleanWord}
            </span>
            {suffix}{" "}
          </React.Fragment>
        );
      })}
    </>
  );
};

export default WordRenderer;
