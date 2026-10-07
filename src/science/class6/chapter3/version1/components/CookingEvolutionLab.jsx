import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Clock, History, Flame, Sparkles, 
  HelpCircle, CheckCircle2, ChevronRight, MessageSquare
} from 'lucide-react';
import confetti from 'canvas-confetti';

const QUESTIONS_WITH_ELDERS = [
  {
    id: 'utensils',
    question: '1. What cookware and utensils were used in old times vs today?',
    traditional: {
      title: 'Earthen Clay Pots & Cast Iron',
      icon: '🏺',
      desc: 'Meals were cooked slowly in unglazed clay handis and heavy cast iron kadais. Porous clay allowed heat and steam to circulate evenly, preserving heat-sensitive vitamins (like Vitamin C and B-complex) and infusing natural trace minerals (iron and calcium).',
      pros: 'Even gentle heating, zero toxic coatings, retains natural moisture and nutrients.'
    },
    modern: {
      title: 'Pressure Cookers & Non-Stick Aluminium',
      icon: '🍳',
      desc: 'Cookware shifted to lightweight aluminium pans, rapid high-pressure autoclaves, and synthetic non-stick fluoropolymer coatings. Cooking time reduced dramatically from hours to minutes.',
      pros: 'Extreme speed, convenient dishwashing, minimal oil needed on non-stick surfaces.'
    }
  },
  {
    id: 'grinding',
    question: '2. How were spices, chutneys and flours ground?',
    traditional: {
      title: 'Stone Grinder (Sil-Batta & Chakki)',
      icon: '🪨',
      desc: 'Women and families used a heavy stone roller (sil-batta) and hand-rotated stone grain mills (chakki). The slow cold-stone friction never overheated the spices, keeping aromatic essential oils and coarse dietary fibre intact.',
      pros: 'Coarse prebiotic fibre preserved; heat never destroyed sensitive vitamins.'
    },
    modern: {
      title: 'Electric High-Speed Mixers & Packaged Flours',
      icon: '⚡',
      desc: 'High-speed motor blades spin at 20,000 RPM. Supermarkets provide pre-packaged, ultra-fine white flour (maida) with bran and germ stripped away to increase shelf life.',
      pros: 'Instant powders in seconds; perfectly uniform smooth texture.'
    }
  },
  {
    id: 'fuel',
    question: '3. What stove and energy source cooked the family meals?',
    traditional: {
      title: 'Clay Chulha with Wood & Cow Dung Cakes',
      icon: '🪵',
      desc: 'Cooked over wood embers, dried twigs, and bio-cakes on mud hearths. Infused a delicate smoky aroma into rotis and slow-simmered dals, though indoor smoke was tough on lungs.',
      pros: 'Renewable biomass, deep smoky flavor, slow lingering simmering.'
    },
    modern: {
      title: 'LPG Gas Stoves & Induction Cooktops',
      icon: '🔥',
      desc: 'Clean blue LPG flame and electromagnetic induction cooktops with precise digital temperature control, timers, and automatic shut-off.',
      pros: 'Smokeless, spotless kitchen walls, instant instant heat, precise flame control.'
    }
  },
  {
    id: 'snacks',
    question: '4. What did children eat for snacks between meals?',
    traditional: {
      title: 'Roasted Chana, Jaggery & Seasonal Fruits',
      icon: '🥜',
      desc: 'Grandparents snacked on hand-roasted chickpeas, groundnut-chikki, roasted makhana (fox nuts), tender coconut, and fresh guavas or ber plucked straight from trees.',
      pros: 'High natural protein, rich dietary fibre, iron from jaggery, zero trans fats.'
    },
    modern: {
      title: 'Packaged Wafers, Biscuits & Sodas',
      icon: '🍟',
      desc: 'Children frequently reach for ultra-processed fried potato chips, high-fructose biscuits, and artificially sweetened fizzy drinks packed with synthetic flavorings.',
      pros: 'Convenient packaging, long shelf life, intensely hyper-palatable taste.'
    }
  }
];

export default function CookingEvolutionLab({ onBackToDashboard, onBack, onNext }) {
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [unlockedQuestions, setUnlockedQuestions] = useState({ 0: true });

  const currentQ = QUESTIONS_WITH_ELDERS[activeQuestionIdx];

  const handleNextQuestion = () => {
    if (activeQuestionIdx < QUESTIONS_WITH_ELDERS.length - 1) {
      const nextIdx = activeQuestionIdx + 1;
      setActiveQuestionIdx(nextIdx);
      setUnlockedQuestions(prev => ({ ...prev, [nextIdx]: true }));
    } else {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      if (onNext) {
        onNext();
      }
    }
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
          {(onBack || onBackToDashboard) && (
            <button
              onClick={onBack || onBackToDashboard}
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
              <ArrowLeft size={16} /> Back
            </button>
          )}

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.3rem' }}>⏳</span>
              <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#FDE68A' }}>
                Activity 3.3: How Have Cooking Practices Changed Over Time?
              </h2>
            </div>
            <span style={{ fontSize: '0.8rem', color: '#A7F3D0' }}>
              Interviews with Elders · Traditional Wisdom vs Modern Technologies
            </span>
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.4rem 0.9rem',
          borderRadius: '12px',
          background: 'rgba(245, 158, 11, 0.2)',
          border: '1px solid rgba(245, 158, 11, 0.35)',
          fontSize: '0.82rem',
          color: '#FDE68A'
        }}>
          <History size={15} />
          <span>Interview Topic {activeQuestionIdx + 1} of {QUESTIONS_WITH_ELDERS.length}</span>
        </div>
      </header>

      {/* Main Grid */}
      <div style={{
        flex: 1,
        padding: '2rem',
        maxWidth: '1280px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
      }}>
        {/* Elder Interview Navigation Ribbon */}
        <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto' }}>
          {QUESTIONS_WITH_ELDERS.map((q, idx) => {
            const isCurrent = activeQuestionIdx === idx;
            return (
              <button
                key={q.id}
                onClick={() => setActiveQuestionIdx(idx)}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '14px',
                  border: isCurrent ? '2px solid #F59E0B' : '1px solid rgba(167, 243, 208, 0.2)',
                  background: isCurrent ? 'linear-gradient(135deg, rgba(6, 78, 59, 0.8) 0%, rgba(2, 44, 34, 0.9) 100%)' : 'rgba(6, 78, 59, 0.35)',
                  color: isCurrent ? '#FDE68A' : '#A7F3D0',
                  fontSize: '0.88rem',
                  fontWeight: isCurrent ? 800 : 600,
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <MessageSquare size={16} style={{ color: isCurrent ? '#FBBF24' : '#6EE7B7', flexShrink: 0 }} />
                <span>Topic {idx + 1}: {q.id.toUpperCase()}</span>
              </button>
            );
          })}
        </div>

        {/* Question Header Card */}
        <div style={{
          padding: '1.25rem 1.75rem',
          borderRadius: '16px',
          background: 'rgba(6, 78, 59, 0.45)',
          border: '1.5px solid rgba(167, 243, 208, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <span style={{ fontSize: '2rem' }}>👵🧓</span>
          <div>
            <span style={{ fontSize: '0.75rem', color: '#A7F3D0', fontWeight: 700, textTransform: 'uppercase' }}>
              Sample Elder Interview Question
            </span>
            <h3 style={{ margin: '0.2rem 0 0 0', fontSize: '1.2rem', color: '#FDE68A' }}>
              {currentQ.question}
            </h3>
          </div>
        </div>

        {/* Side-by-Side Comparison Arena */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem'
        }}>
          {/* Traditional Way */}
          <div style={{
            borderRadius: '24px',
            background: 'linear-gradient(145deg, rgba(16, 185, 129, 0.15) 0%, rgba(6, 78, 59, 0.3) 100%)',
            border: '2px solid rgba(52, 211, 153, 0.4)',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.25)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '2.5rem' }}>{currentQ.traditional.icon}</span>
              <div>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  color: '#34D399',
                  background: 'rgba(16, 185, 129, 0.2)',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '6px'
                }}>
                  Traditional Practice
                </span>
                <h4 style={{ margin: '0.25rem 0 0 0', fontSize: '1.3rem', color: '#FDE68A' }}>
                  {currentQ.traditional.title}
                </h4>
              </div>
            </div>

            <p style={{ margin: 0, fontSize: '0.95rem', color: '#E2E8F0', lineHeight: '1.65' }}>
              {currentQ.traditional.desc}
            </p>

            <div style={{
              marginTop: 'auto',
              background: 'rgba(0, 0, 0, 0.25)',
              borderRadius: '12px',
              padding: '1rem',
              border: '1px solid rgba(52, 211, 153, 0.25)'
            }}>
              <span style={{ fontSize: '0.8rem', color: '#6EE7B7', fontWeight: 700 }}>
                🌿 Nutritional & Health Advantage:
              </span>
              <div style={{ fontSize: '0.88rem', color: '#D1FAE5', marginTop: '0.25rem' }}>
                {currentQ.traditional.pros}
              </div>
            </div>
          </div>

          {/* Modern Way */}
          <div style={{
            borderRadius: '24px',
            background: 'linear-gradient(145deg, rgba(245, 158, 11, 0.1) 0%, rgba(6, 78, 59, 0.3) 100%)',
            border: '2px solid rgba(245, 158, 11, 0.4)',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.25)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '2.5rem' }}>{currentQ.modern.icon}</span>
              <div>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  color: '#FBBF24',
                  background: 'rgba(245, 158, 11, 0.2)',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '6px'
                }}>
                  Modern Adaptation
                </span>
                <h4 style={{ margin: '0.25rem 0 0 0', fontSize: '1.3rem', color: '#FDE68A' }}>
                  {currentQ.modern.title}
                </h4>
              </div>
            </div>

            <p style={{ margin: 0, fontSize: '0.95rem', color: '#E2E8F0', lineHeight: '1.65' }}>
              {currentQ.modern.desc}
            </p>

            <div style={{
              marginTop: 'auto',
              background: 'rgba(0, 0, 0, 0.25)',
              borderRadius: '12px',
              padding: '1rem',
              border: '1px solid rgba(245, 158, 11, 0.25)'
            }}>
              <span style={{ fontSize: '0.8rem', color: '#FCD34D', fontWeight: 700 }}>
                ⚡ Modern Efficiency & Convenience:
              </span>
              <div style={{ fontSize: '0.88rem', color: '#FEF3C7', marginTop: '0.25rem' }}>
                {currentQ.modern.pros}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
          <button
            onClick={handleNextQuestion}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.8rem',
              borderRadius: '14px',
              border: 'none',
              background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
              color: '#FFFFFF',
              fontSize: '0.95rem',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(217, 119, 6, 0.35)'
            }}
          >
            <span>{activeQuestionIdx < QUESTIONS_WITH_ELDERS.length - 1 ? 'Next Interview Topic' : (onNext ? 'Continue to Deficiency Clinic' : 'All Topics Explored!')}</span>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
