import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Award, CheckCircle2, XCircle, Sparkles, 
  HelpCircle, RefreshCw, Trophy, BookOpen, Star, ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

const CHALLENGE_QUESTIONS = [
  {
    id: 1,
    title: 'The Sanskrit Verse & Life Significance',
    question: 'What is the core meaning of the ancient saying "अन्नेन जातानि जीवन्ति" (annena jātāni jīvanti)?',
    options: [
      'Food gives life and sustains all living beings.',
      'Only humans need cooked food to survive.',
      'Medicines are superior to daily food.',
      'Food is meant only for taste and celebration.'
    ],
    correctIdx: 0,
    explanation: '• In the Taittiriya Upanishad, the verse "अन्नेन जातानि जीवन्ति" proclaims that all living organisms are born from food, sustained by food, and merge back into nature.\n• Food is the foundational fuel and building material for all cellular life.'
  },
  {
    id: 2,
    title: 'Reshma’s Dim-Light Vision Issue (NCERT Q6)',
    question: 'Reshma has difficulty seeing things clearly in dim evening light. Which deficiency disease and vitamin is involved?',
    options: [
      'Scurvy caused by lack of Vitamin C',
      'Night Blindness caused by lack of Vitamin A',
      'Rickets caused by lack of Vitamin D',
      'Beriberi caused by lack of Vitamin B1'
    ],
    correctIdx: 1,
    explanation: '• Night Blindness (Nyctalopia) is caused by a deficiency of Vitamin A.\n• Vitamin A is needed to synthesise rhodopsin in the retina for twilight vision.\n• Doctor advises eating carrots, papaya, ripe mango, milk, and dark green leafy vegetables.'
  },
  {
    id: 3,
    title: 'Medu’s Digestive Problem (NCERT Q5)',
    question: 'Medu enjoys noodles, biscuits and white bread, but avoids vegetables. He frequently suffers from stomach aches and constipation. What is missing in his diet?',
    options: [
      'Extra sugar and energy syrups',
      'Dietary Fibre (Roughage) and fresh water',
      'More saturated animal fat and butter',
      'Vitamin D supplements'
    ],
    correctIdx: 1,
    explanation: '• Highly refined foods like white flour (maida), noodles, and biscuits have all coarse bran stripped away.\n• Without dietary fibre (roughage), food moves sluggishly through the intestines, causing constipation.\n• Medu must include unpeeled fruits, cucumber salads, whole wheat, and plenty of water.'
  },
  {
    id: 4,
    title: 'Virtual Chemical Indicators (Activity 3.5 & 3.7)',
    question: 'Which reagent turns blue-black in the presence of starch, and which reagents turn violet in the presence of protein?',
    options: [
      'Iodine for starch; Copper sulphate + Caustic soda for protein',
      'Caustic soda for starch; Iodine for protein',
      'Universal indicator for starch; Lemon juice for protein',
      'Saliva for starch; Alcohol for protein'
    ],
    correctIdx: 0,
    explanation: '• Dilute Iodine solution reacts with starch polysaccharides to form a deep blue-black complex.\n• In the Biuret test, Copper sulphate (CuSO4) and Caustic soda (NaOH) react with peptide bonds in proteins to produce a characteristic violet color.'
  },
  {
    id: 5,
    title: 'Traditional vs Modern Snacking (NCERT Q4 & Activity 3.9)',
    question: 'Why is traditional roasted chana scientifically superior to commercial potato wafers?',
    options: [
      'Roasted chana has 4x more protein, 10x more fibre, and almost zero harmful saturated fat or excessive sodium.',
      'Potato wafers contain zero calories and no fried oil.',
      'Both snacks provide the exact same nutrients.',
      'Roasted chana is artificially coloured with chemical dyes.'
    ],
    correctIdx: 0,
    explanation: '• Roasted chana is a whole legume dry-roasted in sand, preserving 21g protein, 17g fibre, and natural iron per 100g.\n• Commercial wafers are deep-fried in reused oils, containing 35g fat and massive salt (sodium) that strains childhood blood pressure.'
  },
  {
    id: 6,
    title: 'Canned vs Fresh Fruit Juice (NCERT Q7)',
    question: 'When comparing canned fruit juice with freshly squeezed fruit juice, which statement is scientifically correct?',
    options: [
      'Canned juice is healthier because it has artificial food colors and extra sugar.',
      'Fresh fruit juice contains active Vitamin C, natural bioflavonoids, and no synthetic preservatives or hidden added sugars.',
      'Canned juice never loses any heat-sensitive vitamins during factory pasteurization.',
      'Drinking sweetened canned drinks is necessary for hydration.'
    ],
    correctIdx: 1,
    explanation: '• Fresh juice provides intact, undamaged Vitamin C and natural minerals.\n• Canned juices undergo high-heat pasteurization (which degrades delicate Vitamin C) and frequently contain added sugar, sodium benzoate preservatives, and synthetic flavoring.'
  },
  {
    id: 7,
    title: 'Shree Anna Super-Grain Power',
    question: 'Why is Ragi (Finger Millet) considered a superhero food for growing bones and teeth?',
    options: [
      'It contains over 340 mg of Calcium per 100g, more than 10 times that of white rice.',
      'It is made entirely of pure fat.',
      'It dissolves instantly in cold water.',
      'It contains no dietary fibre at all.'
    ],
    correctIdx: 0,
    explanation: '• Ragi is the richest cereal source of natural calcium (approx 344 mg/100g).\n• It provides the essential building blocks for bone density, enamel protection, and muscular contractions in children.'
  }
];

export default function Chapter3Challenge({ onBackToDashboard }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showCertificate, setShowCertificate] = useState(false);

  const currentQ = CHALLENGE_QUESTIONS[currentIdx];

  const handleSelectOption = (idx) => {
    if (isAnswered) return;
    setSelectedOpt(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctIdx) {
      setScore(prev => prev + 1);
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
    }
  };

  const handleNext = () => {
    setSelectedOpt(null);
    setIsAnswered(false);
    if (currentIdx < CHALLENGE_QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setShowCertificate(true);
      confetti({ particleCount: 80, spread: 90, origin: { y: 0.5 } });
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setScore(0);
    setShowCertificate(false);
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: 'radial-gradient(120% 120% at 50% 10%, #064E3B 0%, #042E23 50%, #021711 100%)',
      color: '#FFFFFF',
      fontFamily: "'Outfit', 'Inter', sans-serif",
      boxSizing: 'border-box',
      overflowY: 'auto'
    }}>
      {/* Header */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.25rem 2rem',
        borderBottom: '1px solid rgba(167, 243, 208, 0.2)',
        background: 'rgba(6, 40, 30, 0.5)',
        backdropFilter: 'blur(10px)',
        position: 'sticky',
        top: 0,
        zIndex: 20
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {onBackToDashboard && (
            <button
              onClick={onBackToDashboard}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.45rem 0.9rem',
                borderRadius: '10px',
                border: '1.5px solid rgba(167, 243, 208, 0.4)',
                background: 'rgba(6, 78, 59, 0.5)',
                color: '#A7F3D0',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <ArrowLeft size={16} /> Back to Lab Map
            </button>
          )}

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.3rem' }}>🏆</span>
              <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#FDE68A' }}>
                Chapter Challenge: Mindful Eating Mastery
              </h2>
            </div>
            <span style={{ fontSize: '0.8rem', color: '#A7F3D0' }}>
              NCERT Textbook Exercises, Real-World Cases & Completion Certificate
            </span>
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.4rem 1rem',
          borderRadius: '12px',
          background: 'rgba(245, 158, 11, 0.2)',
          border: '1px solid rgba(245, 158, 11, 0.35)',
          color: '#FDE68A',
          fontSize: '0.85rem',
          fontWeight: 800
        }}>
          <Star size={16} fill="#F59E0B" color="#F59E0B" />
          <span>Score: {score} / {CHALLENGE_QUESTIONS.length}</span>
        </div>
      </header>

      {/* Main Container */}
      <div style={{
        flex: 1,
        padding: '2.5rem 2rem',
        maxWidth: '900px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <AnimatePresence mode="wait">
          {!showCertificate ? (
            <motion.div
              key={currentIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              style={{
                borderRadius: '24px',
                background: 'linear-gradient(145deg, rgba(6, 78, 59, 0.6) 0%, rgba(2, 44, 34, 0.85) 100%)',
                border: '2px solid rgba(167, 243, 208, 0.3)',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.35)',
                padding: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
              }}
            >
              {/* Progress & Badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  color: '#6EE7B7',
                  background: 'rgba(16, 185, 129, 0.2)',
                  padding: '0.25rem 0.65rem',
                  borderRadius: '8px'
                }}>
                  {currentQ.title}
                </span>
                <span style={{ fontSize: '0.85rem', color: '#A7F3D0', fontWeight: 700 }}>
                  Question {currentIdx + 1} of {CHALLENGE_QUESTIONS.length}
                </span>
              </div>

              {/* Question Text */}
              <h3 style={{ margin: 0, fontSize: '1.35rem', color: '#FFFFFF', lineHeight: '1.45' }}>
                {currentQ.question}
              </h3>

              {/* Options Grid */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {currentQ.options.map((opt, oIdx) => {
                  let borderCol = 'rgba(167, 243, 208, 0.25)';
                  let bgCol = 'rgba(6, 78, 59, 0.4)';
                  let textCol = '#E2E8F0';

                  if (isAnswered) {
                    if (oIdx === currentQ.correctIdx) {
                      borderCol = '#10B981';
                      bgCol = 'rgba(16, 185, 129, 0.3)';
                      textCol = '#D1FAE5';
                    } else if (selectedOpt === oIdx) {
                      borderCol = '#EF4444';
                      bgCol = 'rgba(239, 68, 68, 0.25)';
                      textCol = '#FEE2E2';
                    }
                  } else if (selectedOpt === oIdx) {
                    borderCol = '#F59E0B';
                    bgCol = 'rgba(245, 158, 11, 0.2)';
                  }

                  return (
                    <motion.button
                      key={oIdx}
                      whileHover={!isAnswered ? { scale: 1.01, x: 2 } : {}}
                      whileTap={!isAnswered ? { scale: 0.99 } : {}}
                      onClick={() => handleSelectOption(oIdx)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '1rem 1.25rem',
                        borderRadius: '14px',
                        border: `2px solid ${borderCol}`,
                        background: bgCol,
                        color: textCol,
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        textAlign: 'left',
                        cursor: isAnswered ? 'default' : 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <span>{opt}</span>
                      {isAnswered && oIdx === currentQ.correctIdx && (
                        <CheckCircle2 size={20} color="#34D399" />
                      )}
                      {isAnswered && selectedOpt === oIdx && oIdx !== currentQ.correctIdx && (
                        <XCircle size={20} color="#EF4444" />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Explanation Box */}
              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    borderRadius: '14px',
                    padding: '1.25rem',
                    background: selectedOpt === currentQ.correctIdx ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                    border: `1.5px solid ${selectedOpt === currentQ.correctIdx ? '#10B981' : '#EF4444'}`,
                    color: '#E2E8F0',
                    fontSize: '0.88rem',
                    lineHeight: '1.6'
                  }}
                >
                  <div style={{ fontWeight: 800, color: selectedOpt === currentQ.correctIdx ? '#A7F3D0' : '#FCA5A5', marginBottom: '0.4rem' }}>
                    {selectedOpt === currentQ.correctIdx ? '✓ Excellent Scientific Reasoning!' : 'Review Science Concept:'}
                  </div>
                  <div style={{ whiteSpace: 'pre-line' }}>{currentQ.explanation}</div>
                </motion.div>
              )}

              {/* Next Question CTA */}
              {isAnswered && (
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNext}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.75rem 2rem',
                      borderRadius: '12px',
                      border: 'none',
                      background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                      color: '#FFFFFF',
                      fontSize: '0.95rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(217, 119, 6, 0.35)'
                    }}
                  >
                    <span>{currentIdx < CHALLENGE_QUESTIONS.length - 1 ? 'Next Question' : 'View Certificate'}</span>
                    <ChevronRight size={18} />
                  </motion.button>
                </div>
              )}
            </motion.div>
          ) : (
            /* Certificate of Completion */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                borderRadius: '28px',
                background: 'linear-gradient(145deg, #064E3B 0%, #042E23 60%, #021711 100%)',
                border: '4px solid #F59E0B',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5), 0 0 35px rgba(245, 158, 11, 0.3)',
                padding: '3rem',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.5rem',
                position: 'relative'
              }}
            >
              <span style={{ fontSize: '4rem' }}>🏅</span>
              <div style={{
                fontSize: '0.85rem',
                fontWeight: 900,
                color: '#FDE68A',
                letterSpacing: '0.1em',
                textTransform: 'uppercase'
              }}>
                FuturaX Learning Labs · Certificate of Excellence
              </div>

              <h2 style={{
                margin: 0,
                fontSize: '2.5rem',
                fontWeight: 900,
                background: 'linear-gradient(135deg, #FFFFFF 0%, #FDE68A 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Mindful Eating Master
              </h2>

              <p style={{
                margin: 0,
                maxWidth: '600px',
                fontSize: '1.05rem',
                color: '#D1FAE5',
                lineHeight: '1.6'
              }}>
                This is proudly awarded for successfully mastering Class 6 Science Chapter 3: <strong>Mindful Eating: A Path to a Healthy Body</strong>. You demonstrated expertise in food diversity, virtual laboratory nutrient testing, balanced Indian thalis, and healthy lifestyle choices!
              </p>

              <div style={{
                display: 'flex',
                gap: '2rem',
                borderTop: '1px solid rgba(167, 243, 208, 0.25)',
                borderBottom: '1px solid rgba(167, 243, 208, 0.25)',
                padding: '1rem 2rem',
                marginTop: '0.5rem'
              }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#A7F3D0' }}>Final Score</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#FDE68A' }}>{score} / {CHALLENGE_QUESTIONS.length}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#A7F3D0' }}>Mastery Grade</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#34D399' }}>A+ Distinguished</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#A7F3D0' }}>Curriculum</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#60A5FA' }}>NCERT Curiosity</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button
                  onClick={handleRestart}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '12px',
                    border: '1.5px solid rgba(167, 243, 208, 0.4)',
                    background: 'rgba(6, 78, 59, 0.6)',
                    color: '#A7F3D0',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  <RefreshCw size={16} /> Retake Challenge
                </button>

                {onBackToDashboard && (
                  <button
                    onClick={onBackToDashboard}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.75rem 2rem',
                      borderRadius: '12px',
                      border: 'none',
                      background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                      color: '#FFFFFF',
                      fontWeight: 800,
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)'
                    }}
                  >
                    Return to Chapter Hub →
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
