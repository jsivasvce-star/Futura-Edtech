import React from 'react';

/**
 * MovingFieldArrows
 * Renders continuously moving golden arrows along every magnetic field line
 * with exact direction, size, and curvature matching the interface.
 */
export default function MovingFieldArrows({ carSide, carsMode }) {
  const isLeft = carSide === 'left';
  const isRepel = carsMode === 'same';

  // Left car: viewBox 0 0 899 828
  // Right car: viewBox 0 0 940 807 (attract) / 937 807 (repel)
  const viewBox = isLeft ? '0 0 899 828' : (isRepel ? '0 0 937 807' : '0 0 940 807');
  const uid = `${carSide}_${carsMode}`;

  // Paths configuration based on car topology
  let paths = [];

  if (isLeft) {
    // Left Car (Magnet [S | N], Center = 378, 220)
    // Left side flows into S (counter-clockwise), Right side flows out of N (counter-clockwise)
    paths = [
      // Central Vertical (Top: Upwards, Bottom: Downwards)
      { id: `${uid}_v_top`, d: 'M 378 168 L 378 28', count: 1, dur: 2.0 },
      { id: `${uid}_v_bot`, d: 'M 378 272 L 378 418', count: 1, dur: 2.0 },

      // Left Loops (Into S)
      { id: `${uid}_l_out`, d: 'M 378 78 C 220 72, 28 115, 28 220 C 28 325, 220 368, 378 362', count: 2, dur: 3.4 },
      { id: `${uid}_l_mid`, d: 'M 378 118 C 255 112, 98 145, 98 220 C 98 295, 255 328, 378 322', count: 2, dur: 2.8 },
      { id: `${uid}_l_inn`, d: 'M 270 170 C 195 166, 142 188, 142 220 C 142 252, 195 274, 270 270', count: 1, dur: 2.2 },

      // Right Loops (Out of N)
      { id: `${uid}_r_out`, d: 'M 378 362 C 536 368, 728 325, 728 220 C 728 115, 536 72, 378 78', count: 2, dur: 3.4 },
      { id: `${uid}_r_mid`, d: 'M 378 322 C 501 328, 658 295, 658 220 C 658 145, 501 112, 378 118', count: 2, dur: 2.8 },
      { id: `${uid}_r_inn`, d: 'M 486 270 C 561 274, 614 252, 614 220 C 614 188, 561 166, 486 170', count: 1, dur: 2.2 },
    ];
  } else if (!isRepel) {
    // Right Car - Attraction Mode (Magnet [S | N], Center = 588, 205)
    // Left side flows into S (counter-clockwise), Right side flows out of N (counter-clockwise)
    paths = [
      // Central Vertical (Top: Upwards, Bottom: Downwards)
      { id: `${uid}_v_top`, d: 'M 588 155 L 588 22', count: 1, dur: 2.0 },
      { id: `${uid}_v_bot`, d: 'M 588 255 L 588 402', count: 1, dur: 2.0 },

      // Left Loops (Into S)
      { id: `${uid}_l_out`, d: 'M 588 65 C 430 58, 248 102, 248 205 C 248 308, 430 352, 588 345', count: 2, dur: 3.4 },
      { id: `${uid}_l_mid`, d: 'M 588 105 C 465 98, 318 132, 318 205 C 318 278, 465 312, 588 305', count: 2, dur: 2.8 },
      { id: `${uid}_l_inn`, d: 'M 480 156 C 405 152, 362 174, 362 205 C 362 236, 405 258, 480 254', count: 1, dur: 2.2 },

      // Right Loops (Out of N)
      { id: `${uid}_r_out`, d: 'M 588 345 C 746 352, 928 308, 928 205 C 928 102, 746 58, 588 65', count: 2, dur: 3.4 },
      { id: `${uid}_r_mid`, d: 'M 588 305 C 711 312, 858 278, 858 205 C 858 132, 711 98, 588 105', count: 2, dur: 2.8 },
      { id: `${uid}_r_inn`, d: 'M 696 254 C 771 258, 814 236, 814 205 C 814 174, 771 152, 696 156', count: 1, dur: 2.2 },
    ];
  } else {
    // Right Car - Repulsion Mode (Magnet [N | S], Center = 588, 205)
    // Left side flows OUT of N (clockwise), Right side flows INTO S (clockwise)
    paths = [
      // Central Vertical (Top: Upwards, Bottom: Downwards)
      { id: `${uid}_v_top`, d: 'M 588 155 L 588 22', count: 1, dur: 2.0 },
      { id: `${uid}_v_bot`, d: 'M 588 255 L 588 402', count: 1, dur: 2.0 },

      // Left Loops (Out of N, clockwise)
      { id: `${uid}_l_out`, d: 'M 588 345 C 430 352, 248 308, 248 205 C 248 102, 430 58, 588 65', count: 2, dur: 3.4 },
      { id: `${uid}_l_mid`, d: 'M 588 305 C 465 312, 318 278, 318 205 C 318 132, 465 98, 588 105', count: 2, dur: 2.8 },
      { id: `${uid}_l_inn`, d: 'M 480 254 C 405 258, 362 236, 362 205 C 362 174, 405 152, 480 156', count: 1, dur: 2.2 },

      // Right Loops (Into S, clockwise)
      { id: `${uid}_r_out`, d: 'M 588 65 C 746 58, 928 102, 928 205 C 928 308, 746 352, 588 345', count: 2, dur: 3.4 },
      { id: `${uid}_r_mid`, d: 'M 588 105 C 711 98, 858 132, 858 205 C 858 278, 711 312, 588 305', count: 2, dur: 2.8 },
      { id: `${uid}_r_inn`, d: 'M 696 156 C 771 152, 814 174, 814 205 C 814 236, 771 258, 696 254', count: 1, dur: 2.2 },
    ];
  }

  return (
    <svg
      viewBox={viewBox}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 5,
        overflow: 'visible',
      }}
    >
      <defs>
        {/* Path Definitions */}
        {paths.map((p) => (
          <path key={p.id} id={p.id} d={p.d} fill="none" />
        ))}

        {/* Golden Arrow Glow Filter */}
        <filter id={`arrowGlow_${uid}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Render Moving Arrowheads along each path */}
      {paths.map((p) => {
        const arrowInstances = [];
        for (let i = 0; i < p.count; i++) {
          const beginOffset = i === 0 ? '0s' : `-${(p.dur / p.count) * i}s`;
          arrowInstances.push(
            <g key={`${p.id}_arrow_${i}`} filter={`url(#arrowGlow_${uid})`}>
              <path
                d="M -7.5,-5.2 L 7.5,0 L -7.5,5.2 L -3.2,0 Z"
                fill="#FEF08A"
                stroke="#D97706"
                strokeWidth="1.1"
                strokeLinejoin="round"
                opacity="0.95"
              >
                <animateMotion
                  dur={`${p.dur}s`}
                  repeatCount="indefinite"
                  rotate="auto"
                  begin={beginOffset}
                >
                  <mpath href={`#${p.id}`} />
                </animateMotion>
              </path>
            </g>
          );
        }
        return <g key={p.id}>{arrowInstances}</g>;
      })}
    </svg>
  );
}
