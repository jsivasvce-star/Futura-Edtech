import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, ChevronRight, Eye, Film, Sparkles, CheckCircle2 } from 'lucide-react';

/**
 * Photorealistic Cinematic Visual Component for Chapter 1.2 "Patterns in Numbers"
 * 
 * Delivers concept-specific, photorealistic physical scene representations for:
 * 1. Number Pattern Lab (Guided sequence introduction with auto-play stages and real physical arrangements)
 * 2. Predict & Discover (A completely distinct real-world context for each sequence)
 */

export default function PatternVisualCinema({
  sequenceId,
  mode = 'lab', // 'lab' | 'predict'
  videoSrc,
  videoTitle,
  accentColor = '#2563eb',
  isSolved = false
}) {
  const [activeStage, setActiveStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [viewMode, setViewMode] = useState('stages'); // 'stages' | 'video'
  const timerRef = useRef(null);

  // Reset stage when sequence changes
  useEffect(() => {
    setActiveStage(0);
    setIsPlaying(true);
  }, [sequenceId, mode]);

  // Stage configuration for Number Pattern Lab
  const labStagesData = {
    all_ones: {
      title: "All 1's — Single Focus Object",
      ruleNote: "The quantity strictly stays ONE in every scene.",
      stages: [
        { label: "Scene 1", count: 1, text: "1 Polished Wooden Ball on Studio Oak Table", angle: "Eye-Level Focus" },
        { label: "Scene 2", count: 1, text: "1 Ball under Soft Natural Daylight", angle: "Warm Window Light" },
        { label: "Scene 3", count: 1, text: "1 Ball on Slate Gray Surface", angle: "Overhead Top-Down" },
        { label: "Scene 4", count: 1, text: "1 Ball in Macro Cinematic Close-Up", angle: "Macro Depth of Field" }
      ]
    },
    counting: {
      title: "Counting Numbers — One-by-One Placement",
      ruleNote: "Each additional ball is naturally placed beside the previous ones (+1).",
      stages: [
        { label: "Stage 1", count: 1, text: "1 Wooden Ball placed on the table", values: [1] },
        { label: "Stage 2", count: 2, text: "2 Balls placed side by side", values: [1, 2] },
        { label: "Stage 3", count: 3, text: "3 Balls in a neat row", values: [1, 2, 3] },
        { label: "Stage 4", count: 4, text: "4 Balls in a neat row", values: [1, 2, 3, 4] },
        { label: "Stage 5", count: 5, text: "5 Balls in a neat row", values: [1, 2, 3, 4, 5] },
        { label: "Stage 6", count: 6, text: "6 Balls in a neat row", values: [1, 2, 3, 4, 5, 6] }
      ]
    },
    odd_numbers: {
      title: "Odd Numbers — One Always Left Unpaired",
      ruleNote: "Grouped in pairs, exactly 1 object always remains without a partner.",
      stages: [
        { label: "Stage 1", count: 1, text: "1 Ball alone (No pair possible)", pairs: 0, remainder: 1 },
        { label: "Stage 2", count: 3, text: "3 Balls = 1 Pair + 1 Unpaired", pairs: 1, remainder: 1 },
        { label: "Stage 3", count: 5, text: "5 Balls = 2 Pairs + 1 Unpaired", pairs: 2, remainder: 1 },
        { label: "Stage 4", count: 7, text: "7 Balls = 3 Pairs + 1 Unpaired", pairs: 3, remainder: 1 },
        { label: "Stage 5", count: 9, text: "9 Balls = 4 Pairs + 1 Unpaired", pairs: 4, remainder: 1 }
      ]
    },
    even_numbers: {
      title: "Even Numbers — Real Students in Pairs",
      ruleNote: "Every student has a partner. Nobody is left alone!",
      imageSrc: "/images/patterns/even_students_pairs.jpg",
      stages: [
        { label: "Stage 1", count: 2, text: "2 Students = 1 Pair (👧👦)", pairs: 1 },
        { label: "Stage 2", count: 4, text: "4 Students = 2 Pairs (👧👦 👧👦)", pairs: 2 },
        { label: "Stage 3", count: 6, text: "6 Students = 3 Pairs (👧👦 👧👦 👧👦)", pairs: 3 },
        { label: "Stage 4", count: 8, text: "8 Students = 4 Pairs", pairs: 4 },
        { label: "Stage 5", count: 10, text: "10 Students = 5 Pairs", pairs: 5 }
      ]
    },
    triangular: {
      title: "Triangular Numbers — Triangular Layering",
      ruleNote: "Each stage adds one more row to the triangle base (+2, +3, +4, +5...).",
      imageSrc: "/images/patterns/lab_triangular_pebbles.jpg",
      stages: [
        { label: "Stage 1", count: 1, text: "1 Sphere (Peak)", rows: [1] },
        { label: "Stage 2", count: 3, text: "3 Spheres: 1 + 2 (Base of 2)", rows: [1, 2] },
        { label: "Stage 3", count: 6, text: "6 Spheres: 1 + 2 + 3 (Base of 3)", rows: [1, 2, 3] },
        { label: "Stage 4", count: 10, text: "10 Spheres: 1 + 2 + 3 + 4 (Base of 4)", rows: [1, 2, 3, 4] },
        { label: "Stage 5", count: 15, text: "15 Spheres: 1 + 2 + 3 + 4 + 5 (Base of 5)", rows: [1, 2, 3, 4, 5] }
      ]
    },
    squares: {
      title: "Square Numbers — Equal Rows & Columns",
      ruleNote: "Numbers physically form equal n × n square tile grids.",
      stages: [
        { label: "1 × 1", count: 1, text: "1 × 1 = 1 Tile", size: 1 },
        { label: "2 × 2", count: 4, text: "2 × 2 = 4 Tiles in a Square", size: 2 },
        { label: "3 × 3", count: 9, text: "3 × 3 = 9 Tiles in a Square", size: 3 },
        { label: "4 × 4", count: 16, text: "4 × 4 = 16 Tiles in a Square", size: 4 },
        { label: "5 × 5", count: 25, text: "5 × 5 = 25 Tiles in a Square", size: 5 }
      ]
    },
    cubes: {
      title: "Cube Numbers — 3D Physical Volumes",
      ruleNote: "Small wooden cube blocks assembled into solid 3D cubes with depth.",
      stages: [
        { label: "1³", count: 1, text: "1 × 1 × 1 = 1 Cube Block", dim: "1 cube" },
        { label: "2³", count: 8, text: "2 × 2 × 2 = 8 Blocks (Width 2, Height 2, Depth 2)", dim: "8 cubes" },
        { label: "3³", count: 27, text: "3 × 3 × 3 = 27 Blocks (Width 3, Height 3, Depth 3)", dim: "27 cubes" },
        { label: "4³", count: 64, text: "4 × 4 × 4 = 64 Blocks (Width 4, Height 4, Depth 4)", dim: "64 cubes" }
      ]
    },
    virahanka: {
      title: "Virahāṅka Numbers — Physical Combining",
      ruleNote: "Two previous physical groups physically join together to form the next group.",
      stages: [
        { label: "1 + 2 = 3", count: 3, text: "[1 Block] + [2 Blocks] physically slide together → 3 Blocks", a: 1, b: 2, sum: 3 },
        { label: "2 + 3 = 5", count: 5, text: "[2 Blocks] + [3 Blocks] physically slide together → 5 Blocks", a: 2, b: 3, sum: 5 },
        { label: "3 + 5 = 8", count: 8, text: "[3 Blocks] + [5 Blocks] physically slide together → 8 Blocks", a: 3, b: 5, sum: 8 },
        { label: "5 + 8 = 13", count: 13, text: "[5 Blocks] + [8 Blocks] physically slide together → 13 Blocks", a: 5, b: 8, sum: 13 }
      ]
    },
    powers_of_2: {
      title: "Powers of 2 — Physical Doubling",
      ruleNote: "The quantity doubles at every stage (× 2). Camera pulls back as pile grows.",
      stages: [
        { label: "Stage 1", count: 1, text: "1 Textbook on Table", groups: 1 },
        { label: "Stage 2", count: 2, text: "2 Textbooks (Doubled: 1 × 2 = 2)", groups: 2 },
        { label: "Stage 3", count: 4, text: "4 Textbooks (Doubled: 2 × 2 = 4)", groups: 4 },
        { label: "Stage 4", count: 8, text: "8 Textbooks (Doubled: 4 × 2 = 8)", groups: 8 },
        { label: "Stage 5", count: 16, text: "16 Textbooks (Doubled: 8 × 2 = 16)", groups: 16 }
      ]
    },
    powers_of_3: {
      title: "Powers of 3 — Physical Tripling",
      ruleNote: "The quantity triples into three distinct groups at every step (× 3).",
      stages: [
        { label: "Stage 1", count: 1, text: "1 Object on Table", groups: 1 },
        { label: "Stage 2", count: 3, text: "3 Objects (1 group of 3)", groups: 3 },
        { label: "Stage 3", count: 9, text: "9 Objects (3 distinct groups of 3)", groups: 9 },
        { label: "Stage 4", count: 27, text: "27 Objects (9 distinct groups of 3)", groups: 27 }
      ]
    }
  };

  // Distinct Predict & Discover Scenarios
  const predictScenariosData = {
    all_ones: {
      title: "Classroom Pendulum Clock — Always 1",
      imageSrc: "/images/patterns/predict_all_ones_clock.png",
      prompt: "At 1:00, 2:00, 3:00, 4:00... As time passes, how many clocks are mounted on this wall?",
      highlight: "Quantity stays strictly 1 across time.",
      patternPreview: "1, 1, 1, 1, [?], [?], [?]"
    },
    counting: {
      title: "Classroom Textbooks & Notebooks",
      imageSrc: "/images/patterns/predict_counting_books.jpg",
      prompt: "Real textbooks laid out one by one across the study desk: 1 book, 2 books, 3 books, 4 books...",
      highlight: "Each step adds exactly 1 more book.",
      patternPreview: "1, 2, 3, 4, [?], [?], [?]"
    },
    odd_numbers: {
      title: "Training Cones on Sports Ground",
      prompt: "Athletic field cones arranged in partner pairs. Every round leaves 1 solitary cone unpaired: 1, 3, 5, 7...",
      highlight: "Notice the 1 unpaired cone left over each round!",
      patternPreview: "1, 3, 5, 7, [?], [?], [?]"
    },
    even_numbers: {
      title: "Pairs of Shoes Outside Classroom",
      imageSrc: "/images/patterns/predict_even_shoes.jpg",
      prompt: "Real school students shoes placed neatly in pairs outside the classroom door: 1 pair (2 shoes), 2 pairs (4 shoes), 3 pairs (6 shoes)...",
      highlight: "Every pair has 2 shoes. No shoe is left without a partner!",
      patternPreview: "2, 4, 6, 8, [?], [?], [?]"
    },
    triangular: {
      title: "Bowling Pins in Triangle Formation",
      prompt: "Bowling pins set up on an alley lane in triangular tiers: Row 1 (1 pin), Row 2 (2 pins [total 3]), Row 3 (3 pins [total 6]), Row 4 (4 pins [total 10])...",
      highlight: "Each new tier adds one more pin than the tier above it.",
      patternPreview: "1, 3, 6, 10, [?], [?], [?]"
    },
    squares: {
      title: "Architectural Window Pane Grids",
      imageSrc: "/images/patterns/predict_square_window.png",
      prompt: "Square architectural window panes arranged in equal rows and columns: 1×1=1, 2×2=4, 3×3=9, 4×4=16...",
      highlight: "Equal rows and columns always form a perfect square.",
      patternPreview: "1, 4, 9, 16, [?], [?], [?]"
    },
    cubes: {
      title: "Warehouse Shipping Storage Crates",
      prompt: "Heavy cubic storage crates stacked into solid 3D cubes: 1 box, 2×2×2=8 boxes, 3×3×3=27 boxes...",
      highlight: "True 3-dimensional volume: length × width × height.",
      patternPreview: "1, 8, 27, [?], [?], [?]"
    },
    virahanka: {
      title: "Classroom Supply Bundles Combining",
      prompt: "Bundles where the contents of the previous two bundles combine into the next: 1+2=3, 2+3=5, 3+5=8...",
      highlight: "Next quantity = previous two quantities combined.",
      patternPreview: "1, 2, 3, 5, [?], [?], [?]"
    },
    powers_of_2: {
      title: "Auditorium Seating Rows Doubling",
      prompt: "Tiered auditorium seating sections doubling at every level: 1 seat → 2 seats → 4 seats → 8 seats...",
      highlight: "Every new tier holds exactly DOUBLE the previous tier.",
      patternPreview: "1, 2, 4, 8, [?], [?], [?]"
    },
    powers_of_3: {
      title: "Origami Paper Crane Displays Tripling",
      prompt: "Artisan origami paper crane clusters tripling at each showcase: 1 crane → 3 cranes → 9 cranes...",
      highlight: "Each group multiplies by 3 at every step.",
      patternPreview: "1, 3, 9, [?], [?], [?]"
    }
  };

  const currentLab = labStagesData[sequenceId] || labStagesData.counting;
  const currentPredict = predictScenariosData[sequenceId] || predictScenariosData.counting;
  const stagesCount = currentLab.stages ? currentLab.stages.length : 1;

  // Auto-play timer for Lab stages
  useEffect(() => {
    if (mode === 'lab' && isPlaying && viewMode === 'stages') {
      timerRef.current = setInterval(() => {
        setActiveStage((prev) => (prev + 1) % stagesCount);
      }, 2200);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [mode, isPlaying, viewMode, stagesCount]);

  const activeStageInfo = currentLab.stages ? currentLab.stages[activeStage] : null;

  // Render individual sequence stage graphics
  const renderPhysicalArrangement = () => {
    switch (sequenceId) {
      case 'all_ones': {
        const angles = [
          { bg: 'radial-gradient(circle at 40% 35%, #fef3c7 0%, #b45309 60%, #451a03 100%)', shadow: 'rgba(0,0,0,0.55)', pos: 'center' },
          { bg: 'radial-gradient(circle at 60% 25%, #ffffff 0%, #cbd5e1 50%, #475569 100%)', shadow: 'rgba(0,0,0,0.45)', pos: 'center' },
          { bg: 'radial-gradient(circle at 50% 50%, #fde68a 0%, #d97706 70%, #78350f 100%)', shadow: 'rgba(0,0,0,0.6)', pos: 'center' },
          { bg: 'radial-gradient(circle at 30% 30%, #ffedd5 0%, #ea580c 70%, #7c2d12 100%)', shadow: 'rgba(0,0,0,0.5)', pos: 'center' }
        ];
        const cur = angles[activeStage % angles.length];
        return (
          <div style={{
            width: '100%',
            height: '100%',
            background: '#1a1815 url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h40v40H0z\' fill=\'%2326211a\' fill-opacity=\'0.4\'/%3E%3C/svg%3E")',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            <div style={{
              width: '110px',
              height: '110px',
              borderRadius: '50%',
              background: cur.bg,
              boxShadow: `0 35px 40px -15px ${cur.shadow}, inset -8px -8px 24px rgba(0,0,0,0.7), inset 6px 6px 16px rgba(255,255,255,0.7)`,
              border: '2px solid rgba(255,255,255,0.25)',
              position: 'relative',
              transition: 'all 0.6s ease'
            }}>
              {/* Specular Highlight */}
              <div style={{
                position: 'absolute',
                top: '14px',
                left: '20px',
                width: '26px',
                height: '18px',
                borderRadius: '50%',
                background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 80%)',
                transform: 'rotate(-25deg)'
              }} />
            </div>

            <div style={{
              marginTop: '32px',
              background: 'rgba(15, 23, 42, 0.85)',
              padding: '8px 22px',
              borderRadius: '24px',
              border: '1.5px solid rgba(251, 191, 36, 0.5)',
              color: '#fef08a',
              fontWeight: 800,
              fontSize: '1.25rem',
              fontFamily: '"Times New Roman", Times, Georgia, serif'
            }}>
              Quantity: <strong>1 Ball</strong> (Remains strictly ONE across all scenes)
            </div>
          </div>
        );
      }

      case 'counting': {
        const count = activeStage + 1;
        return (
          <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(180deg, #1e1b18 0%, #292524 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            boxSizing: 'border-box'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '18px',
              flexWrap: 'wrap',
              minHeight: '120px'
            }}>
              {Array.from({ length: count }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: '68px',
                    height: '68px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at 35% 30%, #fef3c7 0%, #d97706 65%, #78350f 100%)',
                    boxShadow: '0 20px 24px -8px rgba(0,0,0,0.65), inset -5px -5px 14px rgba(0,0,0,0.6), inset 4px 4px 10px rgba(255,255,255,0.8)',
                    border: '1.5px solid rgba(255,255,255,0.3)',
                    position: 'relative',
                    animation: 'fadeInScale 0.4s ease forwards'
                  }}
                >
                  <span style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: '#ffffff',
                    fontWeight: 900,
                    fontSize: '1.2rem',
                    textShadow: '0 2px 4px rgba(0,0,0,0.8)'
                  }}>
                    {i + 1}
                  </span>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: '28px',
              background: 'rgba(15, 23, 42, 0.85)',
              padding: '8px 22px',
              borderRadius: '24px',
              border: '1.5px solid rgba(217, 119, 6, 0.5)',
              color: '#fde68a',
              fontWeight: 800,
              fontSize: '1.2rem',
              fontFamily: '"Times New Roman", Times, Georgia, serif'
            }}>
              Count: <strong>{count} {count === 1 ? 'Ball' : 'Balls'}</strong> (Each stage naturally adds 1 ball beside the rest)
            </div>
          </div>
        );
      }

      case 'odd_numbers': {
        const stage = activeStageInfo || { pairs: 0, remainder: 1, count: 1 };
        return (
          <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            boxSizing: 'border-box'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              {/* Unpaired Solitary Ball */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ color: '#f87171', fontSize: '0.9rem', fontWeight: 800, marginBottom: '6px' }}>
                  ★ Unpaired (Left Out)
                </span>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 35% 30%, #fecaca 0%, #dc2626 65%, #7f1d1d 100%)',
                  boxShadow: '0 16px 20px -6px rgba(220, 38, 38, 0.5), inset -4px -4px 12px rgba(0,0,0,0.6), inset 4px 4px 8px rgba(255,255,255,0.7)',
                  border: '2px solid #ef4444'
                }} />
              </div>

              {/* Paired Balls */}
              {stage.pairs > 0 && (
                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
                  {Array.from({ length: stage.pairs }).map((_, pIdx) => (
                    <div
                      key={pIdx}
                      style={{
                        display: 'flex',
                        gap: '6px',
                        padding: '6px 10px',
                        background: 'rgba(30, 41, 59, 0.9)',
                        border: '2px dashed #38bdf8',
                        borderRadius: '16px'
                      }}
                    >
                      <div style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle at 35% 30%, #bae6fd 0%, #0284c7 65%, #0c4a6e 100%)',
                        boxShadow: '0 12px 16px -6px rgba(0,0,0,0.5)'
                      }} />
                      <div style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle at 35% 30%, #bae6fd 0%, #0284c7 65%, #0c4a6e 100%)',
                        boxShadow: '0 12px 16px -6px rgba(0,0,0,0.5)'
                      }} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{
              marginTop: '24px',
              background: 'rgba(15, 23, 42, 0.85)',
              padding: '8px 22px',
              borderRadius: '24px',
              border: '1.5px solid #38bdf8',
              color: '#e0f2fe',
              fontWeight: 800,
              fontSize: '1.2rem',
              fontFamily: '"Times New Roman", Times, Georgia, serif'
            }}>
              Total: <strong>{stage.count} Balls</strong> ({stage.pairs} {stage.pairs === 1 ? 'Pair' : 'Pairs'} + 1 Left Unpaired = Odd Number)
            </div>
          </div>
        );
      }

      case 'even_numbers': {
        const stage = activeStageInfo || { pairs: 1, count: 2 };
        return (
          <div style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
            {/* Real Photograph of Class 6 Students in Pairs */}
            <img
              src="/images/patterns/even_students_pairs.jpg"
              alt="Real Class 6 Students Standing in Pairs"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                position: 'absolute',
                top: 0,
                left: 0
              }}
            />

            {/* Cinematic Gradient Vignette */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.65) 100%)'
            }} />

            {/* Pair Counter Overlay */}
            <div style={{
              position: 'relative',
              zIndex: 2,
              background: 'rgba(15, 23, 42, 0.92)',
              border: '2px solid #ef4444',
              borderRadius: '16px',
              padding: '12px 24px',
              textAlign: 'center',
              boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
              maxWidth: '85%'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ fontSize: '1.6rem' }}>👫</span>
                <span style={{ color: '#fca5a5', fontWeight: 900, fontSize: '1.35rem' }}>
                  {stage.pairs} {stage.pairs === 1 ? 'Pair' : 'Pairs'} = {stage.count} Students
                </span>
              </div>
              <p style={{
                margin: 0,
                color: '#f8fafc',
                fontSize: '1.05rem',
                fontWeight: 700,
                fontFamily: '"Times New Roman", Times, Georgia, serif'
              }}>
                Every single student has a partner. There is zero remainder!
              </p>
            </div>
          </div>
        );
      }

      case 'triangular': {
        const rows = (activeStageInfo && activeStageInfo.rows) || [1];
        return (
          <div style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
            {/* Background Photograph of Real Wooden Spheres in Triangle */}
            <img
              src="/images/patterns/lab_triangular_pebbles.jpg"
              alt="Real Wooden Spheres in Triangular Arrangement"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                position: 'absolute',
                top: 0,
                left: 0
              }}
            />

            {/* Semi-transparent Dark Contrast Layer */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at center, rgba(15,23,42,0.6) 0%, rgba(15,23,42,0.85) 100%)'
            }} />

            {/* Interactive Triangular Rows Display */}
            <div style={{
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px'
            }}>
              {rows.map((rowNum, rIdx) => (
                <div key={rIdx} style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                  {Array.from({ length: rowNum }).map((_, cIdx) => (
                    <div
                      key={cIdx}
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle at 35% 30%, #fef08a 0%, #b45309 70%, #451a03 100%)',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.6), inset -2px -2px 6px rgba(0,0,0,0.6), inset 2px 2px 6px rgba(255,255,255,0.7)',
                        border: '1.5px solid rgba(255,255,255,0.4)'
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>

            <div style={{
              position: 'relative',
              zIndex: 2,
              marginTop: '16px',
              background: 'rgba(15, 23, 42, 0.92)',
              border: '2px solid #10b981',
              borderRadius: '20px',
              padding: '6px 20px',
              color: '#6ee7b7',
              fontWeight: 800,
              fontSize: '1.15rem',
              fontFamily: '"Times New Roman", Times, Georgia, serif'
            }}>
              Total: <strong>{activeStageInfo ? activeStageInfo.count : 1} Spheres</strong> (Row {rows.length} adds {rows.length} more spheres)
            </div>
          </div>
        );
      }

      case 'squares': {
        const size = activeStage + 1;
        const total = size * size;
        return (
          <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(180deg, #1c1917 0%, #292524 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            boxSizing: 'border-box'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${size}, 1fr)`,
              gap: '4px',
              padding: '8px',
              background: '#0c0a09',
              borderRadius: '10px',
              boxShadow: '0 20px 30px rgba(0,0,0,0.7), inset 0 2px 4px rgba(255,255,255,0.1)'
            }}>
              {Array.from({ length: total }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: size <= 3 ? '52px' : size === 4 ? '40px' : '32px',
                    height: size <= 3 ? '52px' : size === 4 ? '40px' : '32px',
                    borderRadius: '4px',
                    background: 'linear-gradient(135deg, #d97706 0%, #b45309 50%, #78350f 100%)',
                    border: '1.5px solid #fbbf24',
                    boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.5), inset -2px -2px 4px rgba(0,0,0,0.6)'
                  }}
                />
              ))}
            </div>

            <div style={{
              marginTop: '20px',
              background: 'rgba(15, 23, 42, 0.88)',
              border: '1.5px solid #d97706',
              borderRadius: '20px',
              padding: '6px 20px',
              color: '#fef3c7',
              fontWeight: 800,
              fontSize: '1.2rem',
              fontFamily: '"Times New Roman", Times, Georgia, serif'
            }}>
              <strong>{size} × {size} = {total} Tiles</strong> (Forms a perfect equal square)
            </div>
          </div>
        );
      }

      case 'cubes': {
        const step = activeStage + 1;
        const totalCubes = step * step * step;
        return (
          <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(180deg, #18181b 0%, #09090b 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            boxSizing: 'border-box'
          }}>
            {/* Isometric 3D Cube Representation */}
            <div style={{
              position: 'relative',
              width: '180px',
              height: '140px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="180" height="140" viewBox="0 0 180 140">
                <defs>
                  <linearGradient id="topFace" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a78bfa" />
                    <stop offset="100%" stopColor="#7c3aed" />
                  </linearGradient>
                  <linearGradient id="leftFace" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#6d28d9" />
                    <stop offset="100%" stopColor="#4c1d95" />
                  </linearGradient>
                  <linearGradient id="rightFace" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#5b21b6" />
                    <stop offset="100%" stopColor="#2e1065" />
                  </linearGradient>
                </defs>
                {/* Isometric Cube Faces with Grid Seams */}
                <polygon points="90,15 155,50 90,85 25,50" fill="url(#topFace)" stroke="#c4b5fd" strokeWidth="1.5" />
                <polygon points="25,50 90,85 90,135 25,100" fill="url(#leftFace)" stroke="#7c3aed" strokeWidth="1.5" />
                <polygon points="90,85 155,50 155,100 90,135" fill="url(#rightFace)" stroke="#5b21b6" strokeWidth="1.5" />
              </svg>
            </div>

            <div style={{
              marginTop: '16px',
              background: 'rgba(15, 23, 42, 0.9)',
              border: '1.5px solid #8b5cf6',
              borderRadius: '20px',
              padding: '6px 20px',
              color: '#ddd6fe',
              fontWeight: 800,
              fontSize: '1.2rem',
              fontFamily: '"Times New Roman", Times, Georgia, serif'
            }}>
              <strong>{step} × {step} × {step} = {totalCubes} Cubes</strong> (Solid 3D volume with Width, Height & Depth)
            </div>
          </div>
        );
      }

      case 'virahanka': {
        const stage = activeStageInfo || { a: 1, b: 2, sum: 3 };
        return (
          <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(180deg, #0c192c 0%, #030712 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            boxSizing: 'border-box'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {/* Group A */}
              <div style={{
                background: 'rgba(217, 119, 6, 0.25)',
                border: '2px solid #f59e0b',
                borderRadius: '12px',
                padding: '10px 16px',
                textAlign: 'center'
              }}>
                <span style={{ display: 'block', color: '#fbbf24', fontWeight: 900, fontSize: '1.3rem' }}>
                  Group A: {stage.a}
                </span>
                <div style={{ display: 'flex', gap: '6px', marginTop: '6px', justifyContent: 'center' }}>
                  {Array.from({ length: stage.a }).map((_, i) => (
                    <div key={i} style={{ width: '22px', height: '22px', borderRadius: '4px', background: '#f59e0b' }} />
                  ))}
                </div>
              </div>

              <span style={{ fontSize: '2rem', color: '#ffffff', fontWeight: 900 }}>+</span>

              {/* Group B */}
              <div style={{
                background: 'rgba(2, 132, 199, 0.25)',
                border: '2px solid #0284c7',
                borderRadius: '12px',
                padding: '10px 16px',
                textAlign: 'center'
              }}>
                <span style={{ display: 'block', color: '#38bdf8', fontWeight: 900, fontSize: '1.3rem' }}>
                  Group B: {stage.b}
                </span>
                <div style={{ display: 'flex', gap: '6px', marginTop: '6px', justifyContent: 'center' }}>
                  {Array.from({ length: stage.b }).map((_, i) => (
                    <div key={i} style={{ width: '22px', height: '22px', borderRadius: '4px', background: '#0284c7' }} />
                  ))}
                </div>
              </div>

              <span style={{ fontSize: '2rem', color: '#ffffff', fontWeight: 900 }}>➔</span>

              {/* Combined Next Group */}
              <div style={{
                background: 'rgba(16, 185, 129, 0.28)',
                border: '2.5px solid #10b981',
                borderRadius: '12px',
                padding: '10px 18px',
                textAlign: 'center'
              }}>
                <span style={{ display: 'block', color: '#34d399', fontWeight: 900, fontSize: '1.4rem' }}>
                  Next: {stage.sum}
                </span>
                <span style={{ color: '#a7f3d0', fontSize: '0.85rem', fontWeight: 700 }}>
                  (Previous Two Combined)
                </span>
              </div>
            </div>

            <div style={{
              marginTop: '22px',
              background: 'rgba(15, 23, 42, 0.88)',
              border: '1.5px solid #0284c7',
              borderRadius: '20px',
              padding: '6px 20px',
              color: '#bae6fd',
              fontWeight: 800,
              fontSize: '1.18rem',
              fontFamily: '"Times New Roman", Times, Georgia, serif'
            }}>
              Rule: <strong>Add the previous two quantities to get the next number!</strong>
            </div>
          </div>
        );
      }

      case 'powers_of_2': {
        const count = Math.pow(2, activeStage);
        return (
          <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(180deg, #2b0b1c 0%, #10040b 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            boxSizing: 'border-box'
          }}>
            <div style={{
              display: 'flex',
              gap: '8px',
              flexWrap: 'wrap',
              maxWidth: '380px',
              justifyContent: 'center'
            }}>
              {Array.from({ length: Math.min(count, 32) }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: count <= 4 ? '44px' : count <= 8 ? '34px' : '24px',
                    height: count <= 4 ? '58px' : count <= 8 ? '44px' : '32px',
                    borderRadius: '4px',
                    background: 'linear-gradient(135deg, #ec4899 0%, #db2777 50%, #9d174d 100%)',
                    border: '1px solid #f472b6',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.5)'
                  }}
                />
              ))}
            </div>

            <div style={{
              marginTop: '22px',
              background: 'rgba(15, 23, 42, 0.9)',
              border: '1.5px solid #ec4899',
              borderRadius: '20px',
              padding: '6px 20px',
              color: '#fbcfe8',
              fontWeight: 800,
              fontSize: '1.2rem',
              fontFamily: '"Times New Roman", Times, Georgia, serif'
            }}>
              Quantity: <strong>{count} Objects</strong> (Visibly doubles every stage: × 2)
            </div>
          </div>
        );
      }

      case 'powers_of_3': {
        const count = Math.pow(3, activeStage);
        return (
          <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(180deg, #042f2e 0%, #021a19 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            boxSizing: 'border-box'
          }}>
            <div style={{
              display: 'flex',
              gap: '14px',
              flexWrap: 'wrap',
              maxWidth: '420px',
              justifyContent: 'center'
            }}>
              {/* Groups of 3 */}
              {Array.from({ length: Math.ceil(count / 3) }).map((_, gIdx) => (
                <div
                  key={gIdx}
                  style={{
                    display: 'flex',
                    gap: '4px',
                    padding: '4px 6px',
                    background: 'rgba(13, 148, 136, 0.25)',
                    border: '1px solid #14b8a6',
                    borderRadius: '8px'
                  }}
                >
                  {Array.from({ length: Math.min(3, count - gIdx * 3) }).map((_, itemIdx) => (
                    <div
                      key={itemIdx}
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle at 35% 30%, #5eead4 0%, #0d9488 70%, #115e59 100%)',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.5)'
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>

            <div style={{
              marginTop: '22px',
              background: 'rgba(15, 23, 42, 0.9)',
              border: '1.5px solid #14b8a6',
              borderRadius: '20px',
              padding: '6px 20px',
              color: '#ccfbf1',
              fontWeight: 800,
              fontSize: '1.2rem',
              fontFamily: '"Times New Roman", Times, Georgia, serif'
            }}>
              Quantity: <strong>{count} Objects</strong> (Visibly triples into 3 clusters every step: × 3)
            </div>
          </div>
        );
      }

      default:
        return null;
    }
  };

  // Render Predict & Discover Scene
  const renderPredictScene = () => {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0f1d',
        overflow: 'hidden'
      }}>
        {currentPredict.imageSrc ? (
          <>
            <img
              src={currentPredict.imageSrc}
              alt={currentPredict.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                position: 'absolute',
                top: 0,
                left: 0
              }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(10,15,29,0.3) 0%, rgba(10,15,29,0.75) 100%)'
            }} />
          </>
        ) : (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at center, #1e293b 0%, #0a0f1d 100%)'
          }} />
        )}

        {/* Challenge Banner */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          background: 'rgba(15, 23, 42, 0.94)',
          border: `2px solid ${isSolved ? '#10b981' : accentColor}`,
          borderRadius: '16px',
          padding: '16px 24px',
          maxWidth: '85%',
          textAlign: 'center',
          boxShadow: '0 12px 32px rgba(0,0,0,0.6)'
        }}>
          <h4 style={{
            margin: '0 0 8px 0',
            color: '#ffffff',
            fontSize: 'clamp(1.3rem, 1.5vw, 1.7rem)',
            fontWeight: 900
          }}>
            {currentPredict.title}
          </h4>
          <p style={{
            margin: '0 0 10px 0',
            color: '#e2e8f0',
            fontSize: '1.12rem',
            fontWeight: 700,
            lineHeight: 1.35,
            fontFamily: '"Times New Roman", Times, Georgia, serif'
          }}>
            {currentPredict.prompt}
          </p>
          <div style={{
            display: 'inline-block',
            background: 'rgba(56, 189, 248, 0.15)',
            border: '1.5px solid #38bdf8',
            borderRadius: '20px',
            padding: '4px 16px',
            color: '#38bdf8',
            fontWeight: 800,
            fontSize: '0.95rem'
          }}>
            💡 {currentPredict.highlight}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: '#070b14',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Visual Subheader Controls (In Lab Mode) */}
      {mode === 'lab' && (
        <div style={{
          padding: '8px 16px',
          background: 'rgba(15, 23, 42, 0.95)',
          borderBottom: '1.5px solid rgba(255,255,255,0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '8px',
          zIndex: 3
        }}>
          {/* Stage Selector Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            {currentLab.stages && currentLab.stages.map((st, sIdx) => {
              const isActive = activeStage === sIdx && viewMode === 'stages';
              return (
                <button
                  key={sIdx}
                  type="button"
                  onClick={() => {
                    setActiveStage(sIdx);
                    setViewMode('stages');
                    setIsPlaying(false);
                  }}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    background: isActive ? accentColor : 'rgba(255,255,255,0.08)',
                    color: isActive ? '#ffffff' : '#cbd5e1',
                    border: `1.5px solid ${isActive ? '#ffffff' : 'rgba(255,255,255,0.15)'}`,
                    fontSize: '0.85rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {st.label}
                </button>
              );
            })}
          </div>

          {/* Auto-advancing stages button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              style={{
                padding: '4px 12px',
                background: isPlaying ? 'rgba(16, 185, 129, 0.28)' : 'rgba(255, 255, 255, 0.1)',
                border: `1.5px solid ${isPlaying ? '#34d399' : '#94a3b8'}`,
                borderRadius: '6px',
                color: '#ffffff',
                fontSize: '0.88rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              {isPlaying ? <Pause size={13} color="#34d399" /> : <Play size={13} color="#60a5fa" />}
              <span>{isPlaying ? 'Auto-Advancing' : 'Play Stages'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Canvas Frame */}
      <div style={{
        flex: 1,
        minHeight: '260px',
        width: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000000',
        overflow: 'hidden'
      }}>
        {mode === 'predict' ? (
          renderPredictScene()
        ) : (
          renderPhysicalArrangement()
        )}
      </div>

      {/* Stage Description Banner (In Lab Mode) */}
      {mode === 'lab' && activeStageInfo && viewMode === 'stages' && (
        <div style={{
          padding: '10px 18px',
          background: 'linear-gradient(180deg, #0b1120 0%, #151e2e 100%)',
          borderTop: '2px solid rgba(56, 189, 248, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.4rem' }}>📍</span>
            <span style={{
              color: '#f8fafc',
              fontSize: 'clamp(1.1rem, 1.25vw, 1.45rem)',
              fontWeight: 800,
              fontFamily: '"Times New Roman", Times, Georgia, serif'
            }}>
              {activeStageInfo.text}
            </span>
          </div>
          <span style={{
            fontSize: '0.9rem',
            color: '#94a3b8',
            fontWeight: 700
          }}>
            Stage {activeStage + 1} of {stagesCount}
          </span>
        </div>
      )}
    </div>
  );
}
