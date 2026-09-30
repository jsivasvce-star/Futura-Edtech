import React from 'react';

/**
 * Renders `words` (a slice of the flat word-timing array) as inline spans,
 * highlighting the word at `activeIndex` (an index into the FULL word array
 * that `words` was sliced from -- pass `baseIndex` = the offset of this
 * slice's first word in that full array so highlighting lines up).
 */
export default function NarratedWords({
  words,
  activeIndex,
  baseIndex = 0,
  activeStyle = {},
  wordStyle = {},
  containerStyle = {},
  spokenStyle = {},
}) {
  return (
    <span style={containerStyle}>
      {words.map((w, i) => {
        const globalIdx = baseIndex + i;
        const isActive = globalIdx === activeIndex;
        const isSpoken = globalIdx < activeIndex;
        return (
          <React.Fragment key={globalIdx}>
            <span
              style={{
                transition: 'color 0.12s ease, opacity 0.12s ease, text-shadow 0.12s ease',
                ...wordStyle,
                ...(isSpoken ? spokenStyle : {}),
                ...(isActive ? activeStyle : {}),
              }}
            >
              {w.word}
            </span>
            {i < words.length - 1 ? ' ' : ''}
          </React.Fragment>
        );
      })}
    </span>
  );
}
