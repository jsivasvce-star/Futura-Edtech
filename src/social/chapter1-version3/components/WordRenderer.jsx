import React from 'react';

const WordRenderer = ({ text, idPrefix, defaultColor = "inherit", highlightColor = "#fbbf24", activeWordId }) => {
  if (typeof text !== 'string') return text;
  
  const words = text.split(/\s+/);
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

        let isBold = false;
        let isOrange = false;

        if (cleanWord.startsWith("**") && cleanWord.endsWith("**")) {
          isBold = true;
          cleanWord = cleanWord.slice(2, -2);
        } else if (cleanWord.startsWith("!!") && cleanWord.endsWith("!!")) {
          isOrange = true;
          cleanWord = cleanWord.slice(2, -2);
        }

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
