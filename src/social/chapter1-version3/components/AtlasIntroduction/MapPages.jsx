import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Lightbulb, X, Globe2, Image as ImageIcon, Maximize2, Minimize2, Mountain, Play, Pause } from 'lucide-react';
import physicalImg from './assets/printed_physical_map.jpeg';
import politicalImg from './assets/political.png';
import thematicMapImg from './assets/thematic-map.jpeg';
import ContentScrollNav, { useScrollNav } from '../ContentScrollNav';
import IndiaMountainsMapExplorer from './IndiaMountainsMapExplorer';
import { theme } from './theme';
import page7Audio from '../audio/page7.mp3?url';
import { PAGE7_TRANSCRIPT } from './Page7Transcript';
import page8Audio from '../audio/page8.mp3?url';
import { PAGE8_TRANSCRIPT } from './Page8Transcript';
import riversAudio from '../audio/rivers.mp3?url';
import { RIVERS_TRANSCRIPT } from './RiversTranscript';
import page9Audio from '../audio/page9.mp3?url';
import { PAGE9_TRANSCRIPT } from './Page9Transcript';
import page10Audio from '../audio/page10.mp3?url';
import { PAGE10_TRANSCRIPT } from './Page10Transcript';
import page11Audio from '../audio/page11.mp3?url';
import { PAGE11_TRANSCRIPT } from './Page11Transcript';
import page12Audio from '../audio/page12.mp3?url';
import { PAGE12_TRANSCRIPT } from './Page12Transcript';
import page13Audio from '../audio/page13.mp3?url';
import { PAGE13_TRANSCRIPT } from './Page13Transcript';
import citiesAudio from '../audio/cities.mp3?url';
import { CITIES_TRANSCRIPT } from './CitiesTranscript';
import page15Audio from '../audio/page15.mp3?url';
import { PAGE15_TRANSCRIPT } from './Page15Transcript';
import page16Audio from '../audio/page16.mp3?url';
import { PAGE16_TRANSCRIPT } from './Page16Transcript';
import page17Audio from '../audio/page17.mp3?url';
import { PAGE17_TRANSCRIPT } from './Page17Transcript';
import page18Audio from '../audio/page18.mp3?url';
import { PAGE18_TRANSCRIPT } from './Page18Transcript';
import page19Audio from '../audio/page19.mp3?url';
import { PAGE19_TRANSCRIPT } from './Page19Transcript';
import page20Audio from '../audio/page20.mp3?url';
import { PAGE20_TRANSCRIPT } from './Page20Transcript';

const WordRenderer = ({ text, idPrefix, defaultColor, highlightColor, activeWordId }) => {
  const words = text.trim().split(/\s+/);
  return (
    <>
      {words.map((word, index) => {
        const wordId = `${idPrefix}-${index + 1}`;
        const isHighlighted = activeWordId === wordId;
        return (
          <React.Fragment key={index}>
            <span
              data-word-id={wordId}
              style={{
                color: isHighlighted ? highlightColor : defaultColor,
                background: isHighlighted ? 'rgba(180, 83, 9, 0.1)' : 'transparent',
                borderRadius: '4px',
                padding: '0 2px',
                margin: '0 -2px',
                transition: 'all 0.15s ease-out'
              }}>
              {word}
            </span>
            {index < words.length - 1 ? ' ' : ''}
          </React.Fragment>
        );
      })}
    </>
  );
};
// The interactive 3D globe (physical / political / thematic modes) lives as a
// static asset so it can be dropped into an iframe from anywhere in the app.
const GLOBE_URL = '/atlas-globe.html';

const globeBtn = {
  width: '34px', height: '34px', borderRadius: '9px',
  background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.16)',
  color: '#eaf0f8', cursor: 'pointer', display: 'grid', placeItems: 'center',
  transition: 'background 0.15s'
};

const PageLayout = ({
  title, subtitle, imageSrc,
  whatIsTitle, whatIs,
  featuresTitle, features,
  colorsTitle, colors,
  whyUseTitle, whyUse,
  remember, funFact,
  imageAspectRatio = '1/1',
  imageScale = 1,
  onFullyViewed,
  globeMode = 'physical',
  globeTheme,
  thematicMapOptions,
  onNextMap,
  onPrevMap,
  currentPage,
  onFinish,
  headerAction,
  onPageChange
}) => {
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [activeMapIndex, setActiveMapIndex] = useState(0);

  const currentImageSrc = thematicMapOptions ? thematicMapOptions[activeMapIndex].src : (imageSrc || (globeMode === 'physical' ? '/maps/printed_physical_map.jpeg' : globeMode === 'political' ? '/maps/political_map.png' : '/maps/thematic_map.jpg'));
  const currentMapTitle = thematicMapOptions ? thematicMapOptions[activeMapIndex].label : title;
  const [isGlobeOpen, setIsGlobeOpen] = useState(false);
  const [isMountainsMapOpen, setIsMountainsMapOpen] = useState(false);
  const [mountainsCategory, setMountainsCategory] = useState('all');
  const [isGlobeFull, setIsGlobeFull] = useState(false);
  const [leftPage, setLeftPage] = useState(1);
  const globePanelRef = useRef(null);

  // native full screen where it exists, with a maximise fallback where it doesn't
  useEffect(() => {
    if (onPageChange) {
      onPageChange(leftPage);
    }
  }, [leftPage, onPageChange]);

  const toggleGlobeFull = () => {
    const el = globePanelRef.current;
    if (document.fullscreenElement) { document.exitFullscreen?.(); return; }
    if (el?.requestFullscreen) { el.requestFullscreen().catch(() => setIsGlobeFull(v => !v)); return; }
    setIsGlobeFull(v => !v);
  };

  useEffect(() => {
    const sync = () => setIsGlobeFull(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', sync);
    return () => document.removeEventListener('fullscreenchange', sync);
  }, []);

  useEffect(() => {
    if (!isGlobeOpen) return;
    const onKey = e => {
      if (e.key !== 'Escape') return;
      if (document.fullscreenElement) return;   // let full screen exit first
      setIsGlobeOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isGlobeOpen]);

  /* ── Content is packed to the measured page box ─────────────────────────
     Blocks are filled onto a sub-page until it is full, then a new sub-page
     starts. A tall window therefore shows fewer, fuller pages; a short or
     narrow one simply gets more pages. Nothing scrolls, nothing overlaps and
     no page is left half empty. */
  const contentRef = useRef(null);
  const innerRef = useRef(null);
  const probeRef = useRef(null);
  const [box, setBox] = useState({ w: 480, h: 560 });
  const [shrink, setShrink] = useState(0);   // budget trimmed if a page still overflows

  useEffect(() => {
    const el = contentRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    let last = { w: 0, h: 0 };
    const ro = new ResizeObserver(entries => {
      const r = entries[0].contentRect;
      if (Math.abs(last.w - r.width) < 3 && Math.abs(last.h - r.height) < 3) return;
      last = { w: r.width, h: r.height };
      setBox(last);
      setShrink(0);                          // new size, start optimistic again
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* Block heights are measured from a hidden probe rather than guessed, so a
     page is filled right up to the edge — no premature break, no empty half. */
  const [m, setM] = useState(null);

  useEffect(() => {
    const el = probeRef.current;
    if (!el) return;
    const pick = k => el.querySelector(`[data-p="${k}"]`);
    const featCard = pick('features');
    const grid = featCard && featCard.querySelector('[data-grid="1"]');
    if (!featCard || !grid) return;

    const tiles = Array.from(grid.children);
    if (!tiles.length) return;
    const top0 = tiles[0].offsetTop;
    const measured = {
      gap: parseFloat(getComputedStyle(el).rowGap) || 8,
      whatIs: pick('whatIs') ? pick('whatIs').offsetHeight : 0,
      colors: pick('colors') ? pick('colors').offsetHeight : 0,
      why: pick('why') ? pick('why').offsetHeight : 0,
      cols: Math.max(1, tiles.filter(t => Math.abs(t.offsetTop - top0) < 2).length),
      tile: Math.max(...tiles.map(t => t.offsetHeight)),
      rowGap: parseFloat(getComputedStyle(grid).rowGap) || 0,
      chrome: featCard.offsetHeight - grid.offsetHeight
    };
    setM(prev => {
      if (prev && Object.keys(measured).every(k => Math.abs(prev[k] - measured[k]) < 1.5)) return prev;
      return measured;
    });
  }, [box.w, box.h, features, colors, whyUse, whatIs, funFact]);

  const packed = React.useMemo(() => {
    const all = [{ type: 'whatIs' }, { type: 'features', list: features, continued: false }, { type: 'colors' }, { type: 'why' }];
    if (!m) return [all];

    const budget = Math.max(120, box.h - shrink - 2);
    const featuresH = n => Math.ceil(n / m.cols) * (m.tile + m.rowGap) - m.rowGap + m.chrome;

    // Fill pages up to `cap`, splitting the feature grid across pages as needed.
    // `maxPerChunk` keeps those splits even (3 + 3 rather than 1 + 5).
    const packWith = (cap, maxPerChunk) => {
      const pages = [];
      let cur = [];
      let left = cap;
      const flush = () => { if (cur.length) { pages.push(cur); cur = []; left = cap; } };
      const place = (item, h) => {
        if (cur.length && h + m.gap > left) flush();
        left -= h + (cur.length ? m.gap : 0);
        cur.push(item);
      };

      place({ type: 'whatIs' }, m.whatIs);

      let rest = features;
      let firstChunk = true;
      let guard = 0;
      while (rest.length && guard++ < 24) {
        if (cur.some(b => b.type === 'features')) {
          flush();
        }
        const avail = left - (cur.length ? m.gap : 0) - m.chrome + m.rowGap;
        let rows = Math.floor(avail / (m.tile + m.rowGap));
        if (rows < 1) {
          if (cur.length) { flush(); continue; }
          rows = 1; // never loop on an empty page
        }
        const take = Math.max(1, maxPerChunk ? Math.min(rows * m.cols, maxPerChunk) : rows * m.cols);
        const chunk = rest.slice(0, take);
        rest = rest.slice(take);
        place({ type: 'features', list: chunk, continued: !firstChunk }, featuresH(chunk.length));
        firstChunk = false;
        if (rest.length) {
          flush();
        }
      }

      place({ type: 'colors' }, m.colors);
      place({ type: 'why' }, m.why);
      flush();

      // Post-merge safeguard: guarantee each page has at most ONE consolidated features box
      const mergedPages = pages.map(pg => {
        const featBlocks = pg.filter(b => b.type === 'features');
        if (featBlocks.length <= 1) return pg;
        const combinedList = featBlocks.flatMap(b => b.list);
        const firstFeatIndex = pg.findIndex(b => b.type === 'features');
        const isContinued = featBlocks[0].continued;
        return pg.reduce((acc, b, idx) => {
          if (b.type !== 'features') {
            acc.push(b);
          } else if (idx === firstFeatIndex) {
            acc.push({ type: 'features', list: combinedList, continued: isContinued });
          }
          return acc;
        }, []);
      });

      return mergedPages;
    };

    const chunkCount = pgs => pgs.reduce((n, pg) => n + pg.filter(b => b.type === 'features').length, 0);

    let pages = packWith(budget);
    if (pages.length < 2) return pages.length ? pages : [all];

    // Even out the feature split across however many chunks it needs.
    const perChunk = Math.ceil(features.length / Math.max(1, chunkCount(pages)));
    const evened = packWith(budget, perChunk);
    if (evened.length <= pages.length) pages = evened;

    // Same page count, but spread evenly — otherwise page one is crammed and
    // the last one is nearly empty.
    let lo = Math.ceil((m.whatIs + m.colors + m.why) / pages.length);
    let hi = budget;
    let best = pages;
    for (let i = 0; i < 18 && lo <= hi; i++) {
      const mid = Math.floor((lo + hi) / 2);
      const attempt = packWith(mid, perChunk);
      if (attempt.length <= pages.length) { best = attempt; hi = mid - 1; } else { lo = mid + 1; }
    }
    return best;
  }, [m, box.h, shrink, features, colors, whyUse]);

  const LEFT_PAGES = Math.max(1, packed.length);

  // Safety net only: once the blocks have been measured, verify the rendered
  // page really fits and trim a little if it does not. Never runs before the
  // measurement exists, otherwise the unmeasured first paint would starve it.
  useEffect(() => { setShrink(0); }, [m]);

  // Disabled safety net to prevent layout instability when navigating between pages.
  // The layout will now remain exactly as initially measured without dynamically shifting content.
  useEffect(() => {
    // if (!m) return;
    // const vp = contentRef.current;
    // const inner = innerRef.current;
    // if (!vp || !inner) return;
    // if (inner.scrollHeight > vp.clientHeight + 2 && shrink < 96) {
    //   setShrink(s => s + 16);
    // }
  }, []);

  useEffect(() => {
    if (leftPage > LEFT_PAGES) setLeftPage(LEFT_PAGES);
  }, [leftPage, LEFT_PAGES]);

  useEffect(() => {
    if (leftPage === LEFT_PAGES && onFullyViewed) {
      onFullyViewed();
    }
  }, [leftPage, LEFT_PAGES, onFullyViewed]);

  // shared card chrome
  const pageCol = { display: 'flex', flexDirection: 'column', gap: theme.spacing.fluid.md, flex: 1, minHeight: 0 };
  const cardBase = { border: `1.5px solid ${theme.colors.border}`, borderRadius: theme.radius.md, boxShadow: theme.shadows.card };
  const headStyle = { fontSize: theme.typography.sizes.sectionHeading, color: theme.colors.primary, marginTop: 0, fontWeight: 900, fontFamily: theme.typography.fonts.heading, flexShrink: 0 };

  const renderBlock = (block, i, probe) => {
    if (block.type === 'whatIs') {
      return (
        <div key={i} data-p={probe} style={{ ...cardBase, background: theme.colors.card, padding: `${theme.spacing.fluid.md} ${theme.spacing.fluid.lg}`, flexShrink: 0 }}>
          <h3 style={{ ...headStyle, marginBottom: theme.spacing.s2 }}>{whatIsTitle}</h3>
          {whatIs.map((p, k) => (
            <p
              key={k}
              style={{
                margin: k > 0 ? theme.spacing.s2 : 0,
                color: theme.colors.text,
                fontSize: theme.typography.sizes.body,
                lineHeight: 1.6,
                fontWeight: 600,
                textAlign: 'justify',
                textJustify: 'inter-word'
              }}
            >
              {p}
            </p>
          ))}
        </div>
      );
    }

    if (block.type === 'features') {
      return (
        <div key={i} data-p={probe} style={{ ...cardBase, background: theme.colors.paper, padding: `${theme.spacing.fluid.md} ${theme.spacing.fluid.md}`, flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ ...headStyle, marginBottom: theme.spacing.s3 }}>
            {featuresTitle} {block.continued && "(continued)"}
          </h3>
          <div data-grid="1" style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.fluid.sm }}>
            {block.list.map((f, k) => {
              const featureCategoryMap = {
                'Mountains': 'mountains',
                'Plains': 'plains',
                'Rivers': 'rivers',
                'Deserts': 'deserts',
                'Forests': 'forests',
                'Plateaus': 'plateaus'
              };
              const targetCategory = featureCategoryMap[f.rawTitle || f.title];
              const isInteractive = Boolean(targetCategory);

              return (
                <div
                  key={k}
                  onClick={() => {
                    if (isInteractive) {
                      setMountainsCategory(targetCategory);
                      setIsMountainsMapOpen(true);
                    }
                  }}
                  style={{
                    display: 'flex',
                    gap: theme.spacing.s3,
                    alignItems: 'center',
                    background: isInteractive ? 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)' : '#FFFFFF',
                    padding: theme.spacing.fluid.md,
                    borderRadius: '12px',
                    border: isInteractive ? '1.5px solid #F59E0B' : '1.5px solid #F2DFBC',
                    minWidth: 0,
                    cursor: isInteractive ? 'pointer' : 'default',
                    boxShadow: isInteractive ? '0 4px 12px rgba(217, 119, 6, 0.12)' : '0 2px 6px rgba(0,0,0,0.02)',
                    transition: 'all 0.15s'
                  }}
                  onMouseOver={(e) => {
                    if (isInteractive) e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    if (isInteractive) e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ fontSize: '36px', lineHeight: 1.15, flexShrink: 0 }}>{f.icon}</div>
                  <div style={{ minWidth: 0, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ fontWeight: 800, color: isInteractive ? theme.colors.primaryActive : theme.colors.primary, fontSize: 'clamp(18px, 3vh, 22px)', lineHeight: 1.25, display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: theme.spacing.s1, marginBottom: theme.spacing.s2 }}>
                      {f.title}
                      {isInteractive && <span style={{ fontSize: '11px', background: theme.colors.buttonOrange, color: '#FFF', padding: '2px 8px', borderRadius: '6px', fontWeight: 800, whiteSpace: 'nowrap', boxShadow: '0 2px 4px rgba(217, 119, 6, 0.3)' }}>3D Map ➔</span>}
                    </div>
                    <div style={{ fontSize: 'clamp(15.5px, 2.5vh, 18px)', color: theme.colors.text, lineHeight: 1.5, fontWeight: 600, overflowWrap: 'anywhere', textAlign: 'justify', textJustify: 'inter-word' }}>{f.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    if (block.type === 'colors') {
      return (
        <div key={i} data-p={probe} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <h3 style={{ ...headStyle, marginBottom: theme.spacing.s3 }}>{colorsTitle}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gridAutoRows: '1fr', gap: theme.spacing.fluid.md, flex: 1 }}>
            {colors.map((c, k) => (
              <div 
                key={k} 
                style={{ ...cardBase, padding: theme.spacing.s6, border: `1px solid ${theme.colors.borderLight}`, display: 'flex', alignItems: 'flex-start', gap: theme.spacing.s4 }}
              >
                {c.hexCode ? (
                  <div style={{ width: '26px', height: '26px', borderRadius: '6px', backgroundColor: c.hexCode, flexShrink: 0, marginTop: '1px', border: '1.5px solid rgba(0,0,0,0.08)', boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.15)' }}></div>
                ) : (
                  <span style={{ fontSize: '26px', lineHeight: 1.2, flexShrink: 0 }}>{c.color}</span>
                )}
                <span style={{ fontSize: theme.typography.sizes.body, color: theme.colors.text, fontWeight: 600, lineHeight: 1.5, overflowWrap: 'anywhere', textAlign: 'justify', textJustify: 'inter-word' }}>{c.desc}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div key={i} data-p={probe} style={{ ...cardBase, background: theme.colors.paper, padding: `${theme.spacing.fluid.md} ${theme.spacing.fluid.lg}`, flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ ...headStyle, marginBottom: theme.spacing.s3 }}>{whyUseTitle}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.fluid.sm }}>
          {whyUse.map((w, k) => (
            <div key={k} style={{ background: theme.colors.card, border: `1.5px solid ${theme.colors.border}`, padding: `${theme.spacing.fluid.sm} ${theme.spacing.fluid.md}`, borderRadius: theme.radius.sm, display: 'flex', alignItems: 'flex-start', gap: theme.spacing.s3, minWidth: 0 }}>
              <span style={{ fontSize: '24px', lineHeight: 1.3, flexShrink: 0 }}>{w.icon}</span>
              <span style={{ fontSize: theme.typography.sizes.body, color: theme.colors.text, fontWeight: 600, lineHeight: 1.45, overflowWrap: 'anywhere', textAlign: 'justify', textJustify: 'inter-word' }}>{w.desc}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: theme.spacing.fluid.md, paddingTop: theme.spacing.s3, borderTop: `1.5px dashed ${theme.colors.border}`, color: theme.colors.primaryActive, fontSize: theme.typography.sizes.body, lineHeight: 1.5, fontWeight: 700, flexShrink: 0, textAlign: 'justify', textJustify: 'inter-word' }}>
          💡 {funFact}
        </div>
      </div>
    );
  };

  return (
    <>
      <div style={{ display: 'flex', width: '100%', height: '100%', padding: 0, boxSizing: 'border-box', minHeight: 0 }}>
      
      {/* Left Page (Text) — Parallel Symmetrical Padding matching Right Page */}
      <div style={{ flex: '1 1 50%', minWidth: 0, minHeight: 0, display: 'flex', flexDirection: 'column', borderRight: `2px solid ${theme.colors.border}`, padding: `${theme.spacing.fluid.lg} ${theme.spacing.fluid.lg} 4.5rem ${theme.spacing.fluid.lg}`, boxSizing: 'border-box', overflow: 'hidden', justifyContent: 'space-between', background: `linear-gradient(160deg, ${theme.colors.paper} 0%, ${theme.colors.paperDark} 100%)`, position: 'relative' }}>
        
        {/* Header */}
        <div style={{ flexShrink: 0, marginBottom: theme.spacing.fluid.sm }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: theme.spacing.s1, background: theme.colors.accentLight, border: `1px solid ${theme.colors.borderLight}`, padding: '4px 12px', borderRadius: theme.radius.full, color: theme.colors.primaryActive, fontSize: theme.typography.sizes.badge, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: theme.spacing.s2 }}>
            Chapter 1 • Atlas Introduction
          </div>
          <h2 style={{ fontSize: theme.typography.sizes.title, color: theme.colors.primary, margin: `0 0 ${theme.spacing.s1} 0`, fontFamily: theme.typography.fonts.heading, fontWeight: 900, lineHeight: 1.15, display: 'flex', alignItems: 'center', gap: '16px' }}>
            {title} {headerAction}
          </h2>
          <div style={{ fontSize: theme.typography.sizes.subtitle, color: theme.colors.primaryActive, fontWeight: 700, lineHeight: 1.4, textAlign: 'justify', textJustify: 'inter-word' }}>{subtitle}</div>
        </div>

        {/* Page Content Viewport — packed sub-pages, never scrolls */}
        <div ref={contentRef} style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
          <div ref={innerRef} style={pageCol}>
            {(packed[Math.min(leftPage, LEFT_PAGES) - 1] || []).map(renderBlock)}
          </div>

          {/* hidden probe: same width, natural heights, used only for measuring */}
          <div
            ref={probeRef}
            aria-hidden="true"
            style={{ position: 'absolute', left: '-10000px', top: 0, width: box.w ? `${box.w}px` : '100%', display: 'flex', flexDirection: 'column', gap: 'clamp(6px, 1.4vh, 10px)', visibility: 'hidden', pointerEvents: 'none' }}
          >
            {renderBlock({ type: 'whatIs' }, 'p0', 'whatIs')}
            {renderBlock({ type: 'features', list: features, continued: false }, 'p1', 'features')}
            {renderBlock({ type: 'colors' }, 'p2', 'colors')}
            {renderBlock({ type: 'why' }, 'p3', 'why')}
          </div>
        </div>

        {/* Left Page Pagination Footer */}
        <div style={{ position: 'absolute', bottom: '0.75rem', left: 0, right: 0, display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', padding: `0 ${theme.spacing.fluid.md}` }}>
          {/* Left: Back button */}
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <button
              onClick={() => {
                if (leftPage > 1) {
                  setLeftPage(n => n - 1);
                } else if (onPrevMap) {
                  onPrevMap();
                }
              }}
              disabled={leftPage === 1 && currentPage === 1}
              style={{
                fontFamily: theme.typography.fonts.body, fontWeight: 800, fontSize: '15px',
                background: theme.colors.paper, color: theme.colors.primary, border: `1.5px solid ${theme.colors.border}`, borderRadius: theme.radius.full,
                padding: `10px 20px`, cursor: (leftPage === 1 && currentPage === 1) ? 'not-allowed' : 'pointer',
                opacity: (leftPage === 1 && currentPage === 1) ? 0.35 : 1, transition: 'all 0.2s', whiteSpace: 'nowrap',
                display: 'flex', alignItems: 'center', gap: theme.spacing.s1
              }}
            >
              ◀ Back
            </button>
          </div>

          {/* Center: Dots indicating text pages */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {LEFT_PAGES > 1 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.s2 }}>
                {Array.from({ length: LEFT_PAGES }).map((_, i) => (
                  <span
                    key={i}
                    style={{
                      width: i + 1 === leftPage ? '18px' : '7px',
                      height: '7px',
                      borderRadius: theme.radius.full,
                      background: i + 1 === leftPage ? theme.colors.borderActive : theme.colors.border,
                      transition: 'all 0.2s'
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right: empty for grid balance */}
          <div />
        </div>
      </div>

      {/* Right Page (Printed Map View & Activities) — Parallel Symmetrical Padding 3.6rem */}
      <div style={{ flex: '1 1 50%', minWidth: 0, padding: `${theme.spacing.fluid.lg} ${theme.spacing.fluid.lg} 4.5rem ${theme.spacing.fluid.lg}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', minHeight: 0, overflow: 'hidden', boxSizing: 'border-box', background: `linear-gradient(160deg, ${theme.colors.paperDark} 0%, #EFE6D2 100%)`, position: 'relative' }}>
        
        {/* PRINTED MAP CONTAINER */}
        <div
          onClick={() => setIsImageOpen(true)}
          style={{
            cursor: 'pointer',
            width: '100%',
            flex: 1,
            minHeight: 0,
            position: 'relative',
            borderRadius: theme.radius.lg,
            overflow: 'hidden',
            border: `2px solid ${theme.colors.border}`,
            boxShadow: theme.shadows.container,
            background: theme.colors.card,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: theme.spacing.s2,
            boxSizing: 'border-box',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.borderColor = '#D97706';
            e.currentTarget.style.boxShadow = '0 12px 36px rgba(217, 119, 6, 0.15)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.borderColor = '#F2DFBC';
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(60,40,20,0.08)';
          }}
          title="Click to view full high-resolution printed map"
        >
          {/* Header Tag */}
          <div style={{
            position: 'absolute',
            top: '8px',
            left: '8px',
            background: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(4px)',
            color: '#FDE68A',
            padding: '3px 8px',
            borderRadius: '6px',
            fontSize: '8.5px',
            fontWeight: 800,
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
          }}>
            <ImageIcon size={11} /> Printed {currentMapTitle}
          </div>


          <img
            src={currentImageSrc}
            alt={currentMapTitle}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              borderRadius: '8px',
              display: 'block'
            }}
            onError={(e) => {
              if (e.currentTarget.dataset.retried) return;
              e.currentTarget.dataset.retried = 'true';
              if (globeMode === 'physical') e.currentTarget.src = '/maps/printed_physical_map.jpeg';
              else if (globeMode === 'political') e.currentTarget.src = '/maps/political_map.png';
              else e.currentTarget.src = '/maps/thematic_map.jpg';
            }}
          />
        </div>

        {/* INTERACTIVE CONTROLS */}
        <div style={{ marginTop: theme.spacing.s2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: theme.spacing.s2, flexShrink: 0, width: '100%' }}>

          {/* Parallel Side-by-Side Action Buttons */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: theme.spacing.s2,
            width: '100%',
            maxWidth: '380px'
          }}>
            <button
              onClick={() => setIsGlobeOpen(true)}
              style={{
                flex: '1 1 0',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: theme.spacing.s1,
                background: theme.colors.buttonNavy,
                color: '#fff',
                border: 'none',
                borderRadius: theme.radius.full,
                padding: `${theme.spacing.s2} ${theme.spacing.s3}`,
                fontSize: theme.typography.sizes.small,
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(14, 53, 86, 0.25)',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
                fontFamily: theme.typography.fonts.body
              }}
              onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.background = theme.colors.buttonNavyHover; }}
              onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = theme.colors.buttonNavy; }}
            >
              <Globe2 size={16} /> View on 3D Globe
            </button>
            <button
              onClick={() => setIsImageOpen(true)}
              style={{
                flex: '1 1 0',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: theme.spacing.s1,
                background: theme.colors.buttonOrange,
                color: '#fff',
                border: 'none',
                borderRadius: theme.radius.full,
                padding: `${theme.spacing.s2} ${theme.spacing.s3}`,
                fontSize: theme.typography.sizes.small,
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(217, 119, 6, 0.35)',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
                fontFamily: theme.typography.fonts.body
              }}
              onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.background = theme.colors.buttonOrangeHover; }}
              onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = theme.colors.buttonOrange; }}
            >
              <ImageIcon size={16} /> View Full Printed Map
            </button>
          </div>
        </div>

        {/* Right Page Pagination Footer */}
        <div style={{ position: 'absolute', bottom: '0.75rem', left: 0, right: 0, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: `0 ${theme.spacing.fluid.md}` }}>
          {/* Map Progress and Next Button */}
          <div style={{ display: 'flex', gap: theme.spacing.s2, alignItems: 'center', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.s1, color: theme.colors.primary, fontSize: '13px', fontWeight: 800, whiteSpace: 'nowrap', marginRight: theme.spacing.s2 }}>
              <span>Map {currentPage} of 3</span>
            </div>
            <button
              onClick={() => {
                if (leftPage < LEFT_PAGES) {
                  setLeftPage(n => n + 1);
                } else if (currentPage < 3 && onNextMap) {
                  onNextMap();
                } else if (currentPage === 3 && onFinish) {
                  onFinish();
                }
              }}
              style={{
                background: (leftPage === LEFT_PAGES && currentPage === 3) ? theme.colors.buttonGreen : theme.colors.buttonOrange,
                color: '#FFFFFF',
                border: '1.5px solid transparent',
                padding: `10px 20px`,
                borderRadius: theme.radius.full,
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing.s1,
                cursor: 'pointer',
                boxShadow: (leftPage === LEFT_PAGES && currentPage === 3) ? '0 4px 12px rgba(22,163,74,0.3)' : '0 4px 12px rgba(245,158,11,0.38)',
                whiteSpace: 'nowrap',
                fontSize: '15px',
                fontWeight: 800,
                fontFamily: theme.typography.fonts.body,
                transition: 'background 0.2s'
              }}
            >
              {leftPage < LEFT_PAGES ? 'Next ▶' : (currentPage < 3 ? 'Next Map ▶' : 'Finish ✔')}
            </button>
          </div>
        </div>

      </div>
    </div>

    {/* Natural Features 3D Map Explorer Modal */}
    {isMountainsMapOpen && typeof document !== 'undefined' && createPortal(
      <IndiaMountainsMapExplorer 
        initialCategory={mountainsCategory}
        onClose={() => setIsMountainsMapOpen(false)} 
      />,
      document.body
    )}

    {/* High-Resolution Printed Map Modal */}
    {isImageOpen && typeof document !== 'undefined' && createPortal(
      <div
        onClick={() => setIsImageOpen(false)}
        style={{
          position: 'fixed', inset: 0, zIndex: 99999,
          background: 'rgba(15, 23, 42, 0.88)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', padding: '16px'
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'relative',
            width: 'min(1100px, 94vw)',
            height: '92vh',
            background: '#FFFFFF',
            borderRadius: '16px',
            boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
            border: '2px solid #F2DFBC',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            cursor: 'default'
          }}
        >
          {/* Modal Header */}
          <div style={{
            height: '48px',
            background: 'linear-gradient(90deg, #1C1917 0%, #292524 100%)',
            color: '#FFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 16px',
            borderBottom: '2.5px solid #D97706',
            flexShrink: 0
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 900, fontSize: '14px' }}>
              <ImageIcon size={18} color="#F59E0B" /> Printed {currentMapTitle} • NCERT Class 6 Atlas Reference
            </div>
            <button
              onClick={() => setIsImageOpen(false)}
              style={{
                background: 'rgba(255,255,255,0.15)',
                border: 'none',
                color: '#FFF',
                cursor: 'pointer',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                display: 'grid',
                placeItems: 'center',
                transition: 'background 0.15s'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.8)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
              title="Close (Esc)"
            >
              <X size={18} />
            </button>
          </div>

          {/* Map Viewer Body */}
          <div style={{
            flex: 1,
            minHeight: 0,
            display: 'flex',
            flexDirection: 'column',
            background: '#FAF5EB',
            overflow: 'hidden'
          }}>
            {thematicMapOptions && (
              <div style={{
                display: 'flex',
                gap: '8px',
                padding: '12px 16px',
                background: '#FFFFFF',
                borderBottom: '2px solid #F2DFBC',
                overflowX: 'auto',
                flexShrink: 0
              }}>
                {thematicMapOptions.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => { e.stopPropagation(); setActiveMapIndex(idx); }}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      border: idx === activeMapIndex ? '2px solid #D97706' : '2px solid transparent',
                      background: idx === activeMapIndex ? '#FEF3C7' : '#F3F4F6',
                      color: idx === activeMapIndex ? '#92400E' : '#4B5563',
                      fontWeight: 800,
                      fontSize: '13px',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    {opt.icon} {opt.label}
                  </button>
                ))}
              </div>
            )}
            
            <div style={{
              flex: 1,
              minHeight: 0,
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}>
              <img
                src={currentImageSrc}
                alt={currentMapTitle}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                borderRadius: '10px',
                boxShadow: '0 6px 24px rgba(0,0,0,0.15)',
                border: '1px solid #E2D4B7'
              }}
              onError={(e) => {
                if (e.currentTarget.dataset.retried) return;
                e.currentTarget.dataset.retried = 'true';
                if (globeMode === 'physical') e.currentTarget.src = '/maps/printed_physical_map.jpeg';
                else if (globeMode === 'political') e.currentTarget.src = '/maps/political_map.png';
                else e.currentTarget.src = '/maps/thematic_map.jpg';
              }}
            />
          </div>
          </div>
        </div>
      </div>,
      document.body
    )}

    {/* 3D Globe Modal */}
    {isGlobeOpen && typeof document !== 'undefined' && createPortal(
      <div
        onClick={() => setIsGlobeOpen(false)}
        style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgba(4,8,16,0.86)', backdropFilter: 'blur(5px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', padding: 'clamp(10px, 2.2vw, 28px)'
        }}
      >
        <div
          ref={globePanelRef}
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'relative',
            width: isGlobeFull ? '100%' : 'min(1400px, 100%)',
            height: isGlobeFull ? '100%' : 'min(880px, 100%)',
            background: '#05070d',
            borderRadius: isGlobeFull ? 0 : '16px',
            overflow: 'hidden',
            cursor: 'default',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: isGlobeFull ? 'none' : '0 30px 80px rgba(0,0,0,0.6)',
            border: isGlobeFull ? 'none' : '1px solid rgba(255,255,255,0.16)'
          }}
        >
          {/* toolbar — the globe's own controls sit at the corners of the canvas,
              so the window controls get their own strip rather than covering them */}
          <div style={{
            flexShrink: 0, height: '46px', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', gap: '12px', padding: '0 10px 0 16px',
            background: 'rgba(14,19,30,0.95)', borderBottom: '1px solid rgba(255,255,255,0.10)'
          }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#eaf0f8', fontSize: '14px', fontWeight: 700, minWidth: 0 }}>
              <Globe2 size={16} color="#6fc4ff" />
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Interactive 3D Globe — {title}</span>
            </span>

            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
              <button
                onClick={toggleGlobeFull}
                title={isGlobeFull ? 'Exit full screen' : 'View full screen'}
                aria-label={isGlobeFull ? 'Exit full screen' : 'View full screen'}
                style={globeBtn}
              >
                {isGlobeFull ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              </button>
              <button
                onClick={() => { if (document.fullscreenElement) document.exitFullscreen?.(); setIsGlobeOpen(false); }}
                title="Close (Esc)"
                aria-label="Close the globe"
                style={globeBtn}
              >
                <X size={18} />
              </button>
            </span>
          </div>

          <iframe
            title="Interactive 3D Globe"
            src={`${GLOBE_URL}?mode=${globeMode}${globeTheme ? `&theme=${globeTheme}` : ''}&embed=1`}
            style={{ flex: 1, minHeight: 0, width: '100%', border: 'none', display: 'block' }}
            allow="fullscreen"
            allowFullScreen
          />
        </div>
      </div>,
      document.body
    )}
    </>
  );
};

export const PhysicalMapPage = ({ onFullyViewed, onNextMap, onPrevMap, currentPage, onFinish }) => {
  const [currentSubPage, setCurrentSubPage] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeWordId, setActiveWordId] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    setIsPlaying(false);
    setActiveWordId(null);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [currentSubPage]);

  const currentAudioSrc = currentSubPage === 1 ? page7Audio : currentSubPage === 2 ? page8Audio : currentSubPage === 3 ? riversAudio : currentSubPage === 4 ? page9Audio : currentSubPage === 5 ? page10Audio : currentSubPage === 6 ? page11Audio : null;
  const currentTranscript = currentSubPage === 1 ? PAGE7_TRANSCRIPT : currentSubPage === 2 ? PAGE8_TRANSCRIPT : currentSubPage === 3 ? RIVERS_TRANSCRIPT : currentSubPage === 4 ? PAGE9_TRANSCRIPT : currentSubPage === 5 ? PAGE10_TRANSCRIPT : currentSubPage === 6 ? PAGE11_TRANSCRIPT : [];

  const toggleAudio = () => {
    if (!currentAudioSrc) return;
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const time = audioRef.current.currentTime;
      const activeWord = currentTranscript.find(w => time >= w.start && time < w.end);
      let newActiveId = null;
      if (activeWord && activeWord.matchType === 'matched') {
        newActiveId = activeWord.pageWordId;
      }
      if (newActiveId !== activeWordId) {
        setActiveWordId(newActiveId);
      }
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setActiveWordId(null);
  };

  const audioButton = currentAudioSrc ? (
    <button
      type="button"
      onClick={toggleAudio}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '6px',
        padding: '8px 16px', background: '#d97706',
        border: 'none', borderRadius: '999px',
        fontSize: '14px', fontWeight: 800, color: '#fff',
        cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginRight: '8px'
      }}
    >
      {isPlaying ? "Pause" : "Play"}
    </button>
  ) : null;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {currentAudioSrc && <audio ref={audioRef} src={currentAudioSrc} onTimeUpdate={handleTimeUpdate} onEnded={handleAudioEnded} />}
      <PageLayout 
        onPageChange={setCurrentSubPage}
        onFullyViewed={onFullyViewed}
        onNextMap={onNextMap}
        onPrevMap={onPrevMap}
        currentPage={currentPage}
        onFinish={onFinish}
        headerAction={audioButton}
        title={<WordRenderer text="Physical Maps" idPrefix="title" activeWordId={activeWordId} defaultColor={theme.colors.primary} highlightColor="#451a03" />}
        subtitle={<WordRenderer text="Maps that show Earth's natural features like mountains and rivers" idPrefix="subtitle" activeWordId={activeWordId} defaultColor={theme.colors.primaryActive} highlightColor="#451a03" />}
        imageSrc={physicalImg}
        globeMode="physical"
        callouts={[
          { icon: '🏔', label: 'Mountains', top: '25%', left: '20%' },
          { icon: '🌊', label: 'River', top: '70%', left: '45%' },
          { icon: '🌳', label: 'Forest', top: '75%', left: '80%' },
          { icon: '🏜', label: 'Desert', top: '35%', left: '60%' },
          { icon: '🏞', label: 'Plain', top: '80%', left: '25%' },
          { icon: '⛰', label: 'Plateau', top: '50%', left: '25%' }
        ]}
        whatIs={[
          <WordRenderer text="A Physical Map shows the natural features of the Earth." idPrefix="what1" activeWordId={activeWordId} defaultColor={theme.colors.text} highlightColor="#451a03" />,
          <WordRenderer text="It helps us see the shape of the land without showing roads or cities built by people." idPrefix="what2" activeWordId={activeWordId} defaultColor={theme.colors.text} highlightColor="#451a03" />
        ]}
        whatIsTitle={<WordRenderer text="What is a Physical Map?" idPrefix="whatIsTitle" activeWordId={activeWordId} defaultColor={theme.colors.primary} highlightColor="#451a03" />}
        featuresTitle={<WordRenderer text="Natural Features on a Physical Map" idPrefix="featuresTitle" activeWordId={activeWordId} defaultColor={theme.colors.primary} highlightColor="#451a03" />}
        features={[
          { icon: '🏞', rawTitle: 'Plains', title: <WordRenderer text="Plains" idPrefix="feature-0-title" activeWordId={activeWordId} defaultColor={theme.colors.primaryActive} highlightColor="#451a03" />, desc: <WordRenderer text="Large flat areas of land that are great for farming and building houses." idPrefix="feature-0-desc" activeWordId={activeWordId} defaultColor={theme.colors.text} highlightColor="#451a03" /> },
          { icon: '🏔', rawTitle: 'Mountains', title: <WordRenderer text="Mountains" idPrefix="feature-1-title" activeWordId={activeWordId} defaultColor={theme.colors.primaryActive} highlightColor="#451a03" />, desc: <WordRenderer text="Very tall and large rocky hills rising high above the land." idPrefix="feature-1-desc" activeWordId={activeWordId} defaultColor={theme.colors.text} highlightColor="#451a03" /> },
          { icon: '🌊', rawTitle: 'Rivers', title: <WordRenderer text="Rivers" idPrefix="feature-2-title" activeWordId={activeWordId} defaultColor={theme.colors.primaryActive} highlightColor="#451a03" />, desc: <WordRenderer text="Natural streams of flowing water moving across the land into the sea." idPrefix="feature-2-desc" activeWordId={activeWordId} defaultColor={theme.colors.text} highlightColor="#451a03" /> },
          { icon: '🏜', rawTitle: 'Deserts', title: <WordRenderer text="Deserts" idPrefix="feature-3-title" activeWordId={activeWordId} defaultColor={theme.colors.primaryActive} highlightColor="#451a03" />, desc: <WordRenderer text="Very dry and sandy lands that get almost no rain all year." idPrefix="feature-3-desc" activeWordId={activeWordId} defaultColor={theme.colors.text} highlightColor="#451a03" /> },
          { icon: '🌳', rawTitle: 'Forests', title: <WordRenderer text="Forests" idPrefix="feature-4-title" activeWordId={activeWordId} defaultColor={theme.colors.primaryActive} highlightColor="#451a03" />, desc: <WordRenderer text="Large areas completely covered with lots of trees and plants." idPrefix="feature-4-desc" activeWordId={activeWordId} defaultColor={theme.colors.text} highlightColor="#451a03" /> },
          { icon: '⛰', rawTitle: 'Plateaus', title: <WordRenderer text="Plateaus" idPrefix="feature-5-title" activeWordId={activeWordId} defaultColor={theme.colors.primaryActive} highlightColor="#451a03" />, desc: <WordRenderer text="Large flat lands that are raised high up like a table." idPrefix="feature-5-desc" activeWordId={activeWordId} defaultColor={theme.colors.text} highlightColor="#451a03" /> }
        ]}
        colorsTitle={<WordRenderer text="Colours Used on Physical Maps" idPrefix="colorsTitle" activeWordId={activeWordId} defaultColor={theme.colors.primary} highlightColor="#451a03" />}
        colors={[
          { hexCode: '#22c55e', desc: <WordRenderer text="Green represents plains, river valleys, and low flat lands." idPrefix="color-0-desc" activeWordId={activeWordId} defaultColor={theme.colors.text} highlightColor="#451a03" /> },
          { hexCode: '#854d0e', desc: <WordRenderer text="Brown is used for high mountains and tall hills." idPrefix="color-1-desc" activeWordId={activeWordId} defaultColor={theme.colors.text} highlightColor="#451a03" /> },
          { hexCode: '#3b82f6', desc: <WordRenderer text="Blue shows water like rivers, lakes, seas, and oceans." idPrefix="color-2-desc" activeWordId={activeWordId} defaultColor={theme.colors.text} highlightColor="#451a03" /> },
          { hexCode: '#eab308', desc: <WordRenderer text="Yellow is used to show high flat lands called plateaus." idPrefix="color-3-desc" activeWordId={activeWordId} defaultColor={theme.colors.text} highlightColor="#451a03" /> }
        ]}
        whyUseTitle={<WordRenderer text="Why are Physical Maps Useful?" idPrefix="whyUseTitle" activeWordId={activeWordId} defaultColor={theme.colors.primary} highlightColor="#451a03" />}
        whyUse={[
          { icon: '🏕', desc: <WordRenderer text="Planning outdoor trips and finding paths through nature" idPrefix="whyUse-0-desc" activeWordId={activeWordId} defaultColor={theme.colors.text} highlightColor="#451a03" /> },
          { icon: '🌾', desc: <WordRenderer text="Learning about different land shapes on Earth" idPrefix="whyUse-1-desc" activeWordId={activeWordId} defaultColor={theme.colors.text} highlightColor="#451a03" /> },
          { icon: '🏞', desc: <WordRenderer text="Seeing where water flows and where mountains are located" idPrefix="whyUse-2-desc" activeWordId={activeWordId} defaultColor={theme.colors.text} highlightColor="#451a03" /> }
        ]}
        remember={[
          "Physical Maps show nature.",
          "They help us find mountains, rivers, plains, forests and deserts."
        ]}
        funFact={<WordRenderer text="The Himalayas are colored dark brown on physical maps because they are some of the tallest mountains in the world!" idPrefix="funFact" activeWordId={activeWordId} defaultColor={theme.colors.primaryActive} highlightColor="#451a03" />}
      />
    </div>
  );
};

export const PoliticalMapPage = ({ onFullyViewed, onNextMap, onPrevMap, currentPage: mainCurrentPage, onFinish }) => {
  const [currentSubPage, setCurrentSubPage] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeWordId, setActiveWordId] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setActiveWordId(null);
    }
  }, [currentSubPage]);

  const currentAudioSrc = currentSubPage === 1 ? page12Audio : currentSubPage === 2 ? page13Audio : currentSubPage === 3 ? citiesAudio : currentSubPage === 4 ? page15Audio : currentSubPage === 5 ? page16Audio : null;
  const currentTranscript = currentSubPage === 1 ? PAGE12_TRANSCRIPT : currentSubPage === 2 ? PAGE13_TRANSCRIPT : currentSubPage === 3 ? CITIES_TRANSCRIPT : currentSubPage === 4 ? PAGE15_TRANSCRIPT : currentSubPage === 5 ? PAGE16_TRANSCRIPT : [];

  const toggleAudio = () => {
    if (!currentAudioSrc) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error("Audio play error", e));
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current || !currentTranscript.length) return;
    const time = audioRef.current.currentTime;
    const currentWord = currentTranscript.find(w => time >= w.start && time <= w.end);
    if (currentWord) {
      setActiveWordId(currentWord.pageWordId);
    } else {
      setActiveWordId(null);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setActiveWordId(null);
  };

  return (
    <>
      <audio 
        ref={audioRef}
        src={currentAudioSrc}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleAudioEnded}
      />
      <PageLayout 
        onFullyViewed={onFullyViewed}
        onNextMap={onNextMap}
        onPrevMap={onPrevMap}
        currentPage={mainCurrentPage}
        onPageChange={setCurrentSubPage}
        onFinish={onFinish}
        headerAction={
          currentAudioSrc ? (
            <button
              onClick={toggleAudio}
              style={{
                marginLeft: theme.spacing.s4,
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '8px 16px', background: '#d97706',
                border: 'none', borderRadius: '999px',
                fontSize: '14px', fontWeight: 800, color: '#fff',
                cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              {isPlaying ? "Pause" : "Play"}
            </button>
          ) : null
        }
        title={<WordRenderer text="Political Maps" idPrefix="title" activeWordId={activeWordId} defaultColor={theme.colors.primary} highlightColor="#451a03" />}
        subtitle={<WordRenderer text="Maps that show countries, states, cities and their borders" idPrefix="subtitle" activeWordId={activeWordId} defaultColor={theme.colors.textLight} highlightColor="#451a03" />}
        imageSrc={politicalImg}
        globeMode="political"
        callouts={[
          { icon: '📍', label: 'Capital', top: '30%', left: '50%' },
          { icon: '🏙', label: 'City', top: '60%', left: '35%' },
          { icon: '➖', label: 'Boundary', top: '45%', left: '75%' },
          { icon: '🗺', label: 'State', top: '75%', left: '60%' },
          { icon: '🌎', label: 'Country', top: '25%', left: '25%' }
        ]}
        whatIs={[
          <WordRenderer text="A Political Map shows the borders of countries, states, and cities." idPrefix="whatIs-0" activeWordId={activeWordId} defaultColor={theme.colors.text} highlightColor="#451a03" />,
          <WordRenderer text="It helps us see the different regions and governments created by people." idPrefix="whatIs-1" activeWordId={activeWordId} defaultColor={theme.colors.text} highlightColor="#451a03" />
        ]}
        whatIsTitle={<WordRenderer text="What is a Political Map?" idPrefix="whatIsTitle" activeWordId={activeWordId} defaultColor={theme.colors.primary} highlightColor="#451a03" />}
        featuresTitle={<WordRenderer text="What Can We See?" idPrefix="featuresTitle" activeWordId={activeWordId} defaultColor={theme.colors.primary} highlightColor="#451a03" />}
        features={[
          { icon: '🌎', rawTitle: 'Countries', title: <WordRenderer text="Countries" idPrefix="feature-0-title" activeWordId={activeWordId} defaultColor={theme.colors.primaryActive} highlightColor="#451a03" />, desc: <WordRenderer text="Different nations around the world with their own governments." idPrefix="feature-0-desc" activeWordId={activeWordId} defaultColor={theme.colors.text} highlightColor="#451a03" /> },
          { icon: '🗺', rawTitle: 'States', title: <WordRenderer text="States" idPrefix="feature-1-title" activeWordId={activeWordId} defaultColor={theme.colors.primaryActive} highlightColor="#451a03" />, desc: <WordRenderer text="Smaller regions or states inside a country." idPrefix="feature-1-desc" activeWordId={activeWordId} defaultColor={theme.colors.text} highlightColor="#451a03" /> },
          { icon: '📍', rawTitle: 'Capitals', title: <WordRenderer text="Capitals" idPrefix="feature-2-title" activeWordId={activeWordId} defaultColor={theme.colors.primaryActive} highlightColor="#451a03" />, desc: <WordRenderer text="Important cities where the government of a state or country works." idPrefix="feature-2-desc" activeWordId={activeWordId} defaultColor={theme.colors.text} highlightColor="#451a03" /> },
          { icon: '🏙', rawTitle: 'Cities', title: <WordRenderer text="Cities," idPrefix="feature-3-title" activeWordId={activeWordId} defaultColor={theme.colors.primaryActive} highlightColor="#451a03" />, desc: <WordRenderer text="Big towns where many people live and work," idPrefix="feature-3-desc" activeWordId={activeWordId} defaultColor={theme.colors.text} highlightColor="#451a03" /> },
          { icon: '➖', rawTitle: 'Boundaries', title: <WordRenderer text="Boundaries," idPrefix="feature-4-title" activeWordId={activeWordId} defaultColor={theme.colors.primaryActive} highlightColor="#451a03" />, desc: <WordRenderer text="The lines on the map that separate states and countries." idPrefix="feature-4-desc" activeWordId={activeWordId} defaultColor={theme.colors.text} highlightColor="#451a03" /> }
        ]}
        colorsTitle={<WordRenderer text="Common Symbols" idPrefix="colorsTitle" activeWordId={activeWordId} defaultColor={theme.colors.primary} highlightColor="#451a03" />}
        colors={[
          { color: '⭐️', desc: <WordRenderer text="Stars are used to show capital cities." idPrefix="color-0-desc" activeWordId={activeWordId} defaultColor={theme.colors.text} highlightColor="#451a03" /> },
          { color: '⚫️', desc: <WordRenderer text="Black dots are used to show important cities." idPrefix="color-1-desc" activeWordId={activeWordId} defaultColor={theme.colors.text} highlightColor="#451a03" /> },
          { color: '➖', desc: <WordRenderer text="Thick lines show the borders between different countries." idPrefix="color-2-desc" activeWordId={activeWordId} defaultColor={theme.colors.text} highlightColor="#451a03" /> },
          { color: '〰️', desc: <WordRenderer text="Dotted or dashed lines show the borders between states." idPrefix="color-3-desc" activeWordId={activeWordId} defaultColor={theme.colors.text} highlightColor="#451a03" /> }
        ]}
        whyUseTitle={<WordRenderer text="Why Do We Use Political Maps?" idPrefix="whyUseTitle" activeWordId={activeWordId} defaultColor={theme.colors.primary} highlightColor="#451a03" />}
        whyUse={[
          { icon: '🏫', desc: <WordRenderer text="Learning about the different countries and states in the world" idPrefix="whyUse-0-desc" activeWordId={activeWordId} defaultColor={theme.colors.text} highlightColor="#451a03" /> },
          { icon: '✈️', desc: <WordRenderer text="Finding out which state a city belongs to when traveling" idPrefix="whyUse-1-desc" activeWordId={activeWordId} defaultColor={theme.colors.text} highlightColor="#451a03" /> },
          { icon: '🗺', desc: <WordRenderer text="Seeing the borders that separate different nations" idPrefix="whyUse-2-desc" activeWordId={activeWordId} defaultColor={theme.colors.text} highlightColor="#451a03" /> }
        ]}
        remember={[
          "Political Maps show places made by people.",
          "They help us locate countries, states, cities and their borders."
        ]}
        funFact={<WordRenderer text="India currently has 28 states and 8 Union Territories, each with its own borders on the map." idPrefix="funFact" activeWordId={activeWordId} defaultColor={theme.colors.primaryActive} highlightColor="#451a03" />}
      />
    </>
  );
};

export const ThematicMapPage = ({ onFullyViewed, onNextMap, onPrevMap, currentPage: mainCurrentPage, onFinish }) => {
  const [currentSubPage, setCurrentSubPage] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeWordId, setActiveWordId] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setActiveWordId(null);
    }
  }, [currentSubPage]);

  const currentAudioSrc = currentSubPage === 1 ? page17Audio : currentSubPage === 2 ? page18Audio : currentSubPage === 3 ? page19Audio : currentSubPage === 4 ? page20Audio : null;
  const currentTranscript = currentSubPage === 1 ? PAGE17_TRANSCRIPT : currentSubPage === 2 ? PAGE18_TRANSCRIPT : currentSubPage === 3 ? PAGE19_TRANSCRIPT : currentSubPage === 4 ? PAGE20_TRANSCRIPT : [];

  const toggleAudio = () => {
    if (!currentAudioSrc) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error("Audio play error", e));
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current || !currentTranscript.length) return;
    const time = audioRef.current.currentTime;
    const currentWord = currentTranscript.find(w => time >= w.start && time <= w.end);
    if (currentWord) {
      setActiveWordId(currentWord.pageWordId);
    } else {
      setActiveWordId(null);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setActiveWordId(null);
  };

  return (
    <>
      <audio 
        ref={audioRef}
        src={currentAudioSrc}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleAudioEnded}
      />
      <PageLayout 
        onFullyViewed={onFullyViewed}
        onNextMap={onNextMap}
        onPrevMap={onPrevMap}
        currentPage={mainCurrentPage}
        onPageChange={setCurrentSubPage}
        onFinish={onFinish}
        headerAction={
          currentAudioSrc ? (
            <button
              onClick={toggleAudio}
              style={{
                marginLeft: theme.spacing.s4,
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '8px 16px', background: '#d97706',
                border: 'none', borderRadius: '999px',
                fontSize: '14px', fontWeight: 800, color: '#fff',
                cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              {isPlaying ? "Pause" : "Play"}
            </button>
          ) : null
        }
        title={<WordRenderer text="Thematic Maps" idPrefix="title" activeWordId={activeWordId} defaultColor={theme.colors.primary} highlightColor="#451a03" />}
        subtitle={<WordRenderer text="Maps that focus on one special topic like soil, rainfall, or crops" idPrefix="subtitle" activeWordId={activeWordId} defaultColor={theme.colors.textLight} highlightColor="#451a03" />}
        globeMode="thematic"
        globeTheme="rain"
        thematicMapOptions={[
          { icon: '🌱', label: 'Major Soil Types', src: thematicMapImg },
          { icon: '🌧', label: 'Annual Rainfall', src: '/maps/flat_thematic_rainfall_map.jpg' },
          { icon: '🌡', label: 'Temperature Distribution', src: '/maps/flat_thematic_temperature_map.jpg' },
          { icon: '👥', label: 'Population Density', src: '/maps/flat_thematic_population_density_map.jpg' },
          { icon: '🌳', label: 'Forest Cover', src: '/maps/flat_thematic_forest_cover_map.jpg' }
        ]}
        callouts={[
          { icon: '🌱', label: 'Alluvial Soil', top: '33%', left: '42%' },
          { icon: '🧱', label: 'Black Soil', top: '50%', left: '30%' },
          { icon: '🔴', label: 'Red & Yellow Soil', top: '56%', left: '50%' },
          { icon: '📊', label: 'Soil Legend', top: '75%', left: '72%' }
        ]}
        whatIs={[
          <WordRenderer text="A Thematic Map focuses on one special topic or theme." idPrefix="whatIs-0" activeWordId={activeWordId} defaultColor={theme.colors.text} highlightColor="#451a03" />,
          <WordRenderer text="Instead of showing borders, it shows specific information like rainfall, types of crops, or soil." idPrefix="whatIs-1" activeWordId={activeWordId} defaultColor={theme.colors.text} highlightColor="#451a03" />
        ]}
        whatIsTitle={<WordRenderer text="What is a Thematic Map?" idPrefix="whatIsTitle" activeWordId={activeWordId} defaultColor={theme.colors.primary} highlightColor="#451a03" />}
        featuresTitle={<WordRenderer text="What Can We Learn from Thematic Maps?" idPrefix="featuresTitle" activeWordId={activeWordId} defaultColor={theme.colors.primary} highlightColor="#451a03" />}
        features={[
          { icon: '🌱', rawTitle: 'Soil Types', title: <WordRenderer text="Soil Types" idPrefix="feature-0-title" activeWordId={activeWordId} defaultColor={theme.colors.primaryActive} highlightColor="#451a03" />, desc: <WordRenderer text="Shows where different kinds of soil are found for farming." idPrefix="feature-0-desc" activeWordId={activeWordId} defaultColor={theme.colors.text} highlightColor="#451a03" /> },
          { icon: '🌧', rawTitle: 'Rainfall', title: <WordRenderer text="Rainfall" idPrefix="feature-1-title" activeWordId={activeWordId} defaultColor={theme.colors.primaryActive} highlightColor="#451a03" />, desc: <WordRenderer text="Shows how much rain falls in different areas across the year." idPrefix="feature-1-desc" activeWordId={activeWordId} defaultColor={theme.colors.text} highlightColor="#451a03" /> },
          { icon: '🌡', rawTitle: 'Temperature', title: <WordRenderer text="Temperature" idPrefix="feature-2-title" activeWordId={activeWordId} defaultColor={theme.colors.primaryActive} highlightColor="#451a03" />, desc: <WordRenderer text="Shows how hot or cold different regions get." idPrefix="feature-2-desc" activeWordId={activeWordId} defaultColor={theme.colors.text} highlightColor="#451a03" /> },
          { icon: '🌾', rawTitle: 'Crops & Agriculture', title: <WordRenderer text="Crops & Agriculture" idPrefix="feature-3-title" activeWordId={activeWordId} defaultColor={theme.colors.primaryActive} highlightColor="#451a03" />, desc: <WordRenderer text="Shows where crops like rice, wheat, and cotton grow best." idPrefix="feature-3-desc" activeWordId={activeWordId} defaultColor={theme.colors.text} highlightColor="#451a03" /> }
        ]}
        colorsTitle={<WordRenderer text="Colours and Legends" idPrefix="colorsTitle" activeWordId={activeWordId} defaultColor={theme.colors.primary} highlightColor="#451a03" />}
        colors={[
          { color: '📊', desc: <WordRenderer text="The legend box explains what each color or pattern means on the map." idPrefix="color-0-desc" activeWordId={activeWordId} defaultColor={theme.colors.text} highlightColor="#451a03" /> },
          { hexCode: '#86efac', desc: <WordRenderer text="Light green shows good soil for farming near rivers." idPrefix="color-1-desc" activeWordId={activeWordId} defaultColor={theme.colors.text} highlightColor="#451a03" /> },
          { hexCode: '#4b5563', desc: <WordRenderer text="Dark grey shows black soil that is great for growing cotton." idPrefix="color-2-desc" activeWordId={activeWordId} defaultColor={theme.colors.text} highlightColor="#451a03" /> },
          { hexCode: '#ef4444', desc: <WordRenderer text="Red and yellow colors show older, rocky soils." idPrefix="color-3-desc" activeWordId={activeWordId} defaultColor={theme.colors.text} highlightColor="#451a03" /> }
        ]}
        whyUseTitle={<WordRenderer text="Why Do We Use Thematic Maps?" idPrefix="whyUseTitle" activeWordId={activeWordId} defaultColor={theme.colors.primary} highlightColor="#451a03" />}
        whyUse={[
          { icon: '🚜', desc: <WordRenderer text="Finding the best places to grow different crops" idPrefix="whyUse-0-desc" activeWordId={activeWordId} defaultColor={theme.colors.text} highlightColor="#451a03" /> },
          { icon: '☔️', desc: <WordRenderer text="Knowing where it will rain the most during the year" idPrefix="whyUse-1-desc" activeWordId={activeWordId} defaultColor={theme.colors.text} highlightColor="#451a03" /> },
          { icon: '📈', desc: <WordRenderer text="Seeing where people live and where natural resources are found" idPrefix="whyUse-2-desc" activeWordId={activeWordId} defaultColor={theme.colors.text} highlightColor="#451a03" /> }
        ]}
        remember={[
          "One map, one main idea.",
          "Thematic maps use distinct colors and a legend box to explain specific information."
        ]}
        funFact={<WordRenderer text="A soil map and a rainfall map of India cover the exact same land, but they tell us two completely different stories!" idPrefix="funFact" activeWordId={activeWordId} defaultColor={theme.colors.primaryActive} highlightColor="#451a03" />}
      />
    </>
  );
};
