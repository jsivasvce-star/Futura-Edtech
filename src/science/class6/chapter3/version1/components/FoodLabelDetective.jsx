import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Search, CheckCircle2, AlertTriangle, 
  Sparkles, Award, ShieldAlert, Heart, ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

const NUTRITION_DATA = [
  { metric: 'Energy (Calories)', wafers: '540 kcal', chana: '380 kcal', winner: 'chana', note: 'Wafers are calorie-dense due to oil frying; chana provides steady sustainable metabolic energy.' },
  { metric: 'Protein (Growth & Repair)', wafers: '5.2 g', chana: '21.8 g (4x more!)', winner: 'chana', note: 'Chana is a rich plant-based body-building food ideal for growing school children.' },
  { metric: 'Total Fat', wafers: '34.5 g (Very High)', chana: '5.3 g (Low)', winner: 'chana', note: 'Wafers contain over 6 times the fat absorbed from commercial frying oils.' },
  { metric: 'Saturated Fat', wafers: '15.0 g (Harmful)', chana: '0.8 g (Negligible)', winner: 'chana', note: 'Excess saturated fats clog developing arteries and strain the cardiovascular system.' },
  { metric: 'Dietary Fibre (Roughage)', wafers: '1.8 g (Minimal)', chana: '17.5 g (10x more!)', winner: 'chana', note: 'High fiber in chana guarantees smooth digestion, prevents constipation, and feeds gut microbiome.' },
  { metric: 'Sodium (Added Salt)', wafers: '880 mg (Dangerously high)', chana: '45 mg (Natural)', winner: 'chana', note: 'Heavy salt in packaged snacks elevates blood pressure and damages delicate kidney filtration.' },
  { metric: 'Iron Content', wafers: '0.9 mg', chana: '6.4 mg (High)', winner: 'chana', note: 'Roasted chana provides essential iron to produce hemoglobin, directly preventing childhood anaemia.' }
];

export default function FoodLabelDetective({ onBackToDashboard, onBack, onNext }) {
  const [selectedMetricIdx, setSelectedMetricIdx] = useState(0);
  const [revealedAll, setRevealedAll] = useState(false);

  const handleBack = onBack || onBackToDashboard;
  const currentMetric = NUTRITION_DATA[selectedMetricIdx];

  const handleRevealAll = () => {
    setRevealedAll(true);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
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
          {handleBack && (
            <button
              onClick={handleBack}
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
              <span style={{ fontSize: '1.3rem' }}>🔍</span>
              <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#FDE68A' }}>
                Activity 3.9: Nutritional Label Detective
              </h2>
            </div>
            <span style={{ fontSize: '0.8rem', color: '#A7F3D0' }}>
              NCERT Activity 3.9 · Potato Wafers vs Roasted Chana Head-to-Head Showdown
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={handleRevealAll}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.55rem 1.25rem',
              borderRadius: '12px',
              border: 'none',
              background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
              color: '#FFFFFF',
              fontSize: '0.88rem',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(217, 119, 6, 0.35)'
            }}
          >
            <Award size={16} /> Declare Winner
          </button>
          {onNext && (
            <button
              onClick={onNext}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.55rem 1.15rem',
                borderRadius: '12px',
                border: '1.5px solid #FEF08A',
                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                color: '#FFFFFF',
                fontSize: '0.88rem',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)'
              }}
            >
              <span>Next</span>
              <ChevronRight size={16} />
            </button>
          )}
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
        display: 'grid',
        gridTemplateColumns: '1.1fr 1fr',
        gap: '2rem'
      }}>
        {/* Left Column: Side-by-Side Product Packs & Label Table */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Pack Graphics Comparison */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            {/* Pack A: Potato Wafers */}
            <div style={{
              borderRadius: '20px',
              background: 'linear-gradient(145deg, rgba(239, 68, 68, 0.15) 0%, rgba(6, 78, 59, 0.3) 100%)',
              border: '2px solid rgba(239, 68, 68, 0.4)',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '0.5rem'
            }}>
              <span style={{ fontSize: '3.5rem' }}>🥔🍟</span>
              <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#FCA5A5' }}>
                (a) Potato Wafers Pack
              </h3>
              <span style={{ fontSize: '0.75rem', color: '#EF4444', fontWeight: 700 }}>
                Ultra-Processed Deep-Fried Snack
              </span>
              <div style={{
                marginTop: '0.5rem',
                fontSize: '0.8rem',
                color: '#CBD5E1',
                lineHeight: '1.4'
              }}>
                Deep fried in reused oil, sprinkled with industrial salt & synthetic monosodium enhancers.
              </div>
            </div>

            {/* Pack B: Roasted Chana */}
            <div style={{
              borderRadius: '20px',
              background: 'linear-gradient(145deg, rgba(16, 185, 129, 0.2) 0%, rgba(6, 78, 59, 0.3) 100%)',
              border: '2px solid rgba(16, 185, 129, 0.5)',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '0.5rem'
            }}>
              <span style={{ fontSize: '3.5rem' }}>🥜🌱</span>
              <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#6EE7B7' }}>
                (b) Roasted Chana Pack
              </h3>
              <span style={{ fontSize: '0.75rem', color: '#34D399', fontWeight: 700 }}>
                Traditional Dry-Roasted Legume
              </span>
              <div style={{
                marginTop: '0.5rem',
                fontSize: '0.8rem',
                color: '#CBD5E1',
                lineHeight: '1.4'
              }}>
                Slow-roasted in hot sand without excess oil. Outer edible husk retains complete fibre and trace iron.
              </div>
            </div>
          </div>

          {/* Interactive Comparison Table */}
          <div style={{
            borderRadius: '20px',
            background: 'linear-gradient(145deg, rgba(6, 78, 59, 0.5) 0%, rgba(2, 44, 34, 0.75) 100%)',
            border: '2px solid rgba(167, 243, 208, 0.25)',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.25)',
            padding: '1.5rem',
            overflowX: 'auto'
          }}>
            <h4 style={{ margin: '0 0 1rem 0', fontSize: '1.05rem', color: '#FDE68A' }}>
              Textbook Nutrition Facts Comparison (per 100g)
            </h4>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(167, 243, 208, 0.3)', color: '#A7F3D0', textAlign: 'left' }}>
                  <th style={{ padding: '0.6rem' }}>Nutritional Component</th>
                  <th style={{ padding: '0.6rem', color: '#FCA5A5' }}>Potato Wafers</th>
                  <th style={{ padding: '0.6rem', color: '#6EE7B7' }}>Roasted Chana</th>
                  <th style={{ padding: '0.6rem', textAlign: 'center' }}>Verdict</th>
                </tr>
              </thead>
              <tbody>
                {NUTRITION_DATA.map((row, idx) => {
                  const isSelected = selectedMetricIdx === idx;
                  return (
                    <tr
                      key={row.metric}
                      onClick={() => setSelectedMetricIdx(idx)}
                      style={{
                        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                        background: isSelected ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
                        cursor: 'pointer'
                      }}
                    >
                      <td style={{ padding: '0.6rem', fontWeight: 600, color: isSelected ? '#FDE68A' : '#E2E8F0' }}>
                        {row.metric}
                      </td>
                      <td style={{ padding: '0.6rem', color: '#FCA5A5' }}>{row.wafers}</td>
                      <td style={{ padding: '0.6rem', color: '#6EE7B7', fontWeight: 700 }}>{row.chana}</td>
                      <td style={{ padding: '0.6rem', textAlign: 'center' }}>
                        <span style={{
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          padding: '0.2rem 0.5rem',
                          borderRadius: '6px',
                          background: 'rgba(16, 185, 129, 0.25)',
                          color: '#34D399'
                        }}>
                          Chana Wins! 🏆
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Detective Inspector Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Active Metric Deep-Dive */}
          <div style={{
            borderRadius: '24px',
            background: 'linear-gradient(145deg, rgba(6, 78, 59, 0.6) 0%, rgba(2, 44, 34, 0.85) 100%)',
            border: '2px solid rgba(245, 158, 11, 0.4)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                fontSize: '1.4rem'
              }}>
                🔬
              </span>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#FCD34D', fontWeight: 800, textTransform: 'uppercase' }}>
                  Label Detective Inspection
                </span>
                <h3 style={{ margin: 0, fontSize: '1.4rem', color: '#FFFFFF' }}>
                  {currentMetric.metric}
                </h3>
              </div>
            </div>

            {/* Comparison Badges */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '12px',
                padding: '0.85rem',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '0.75rem', color: '#FCA5A5' }}>Potato Wafers</div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#EF4444', marginTop: '0.2rem' }}>
                  {currentMetric.wafers}
                </div>
              </div>

              <div style={{
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '12px',
                padding: '0.85rem',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '0.75rem', color: '#A7F3D0' }}>Roasted Chana</div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#34D399', marginTop: '0.2rem' }}>
                  {currentMetric.chana}
                </div>
              </div>
            </div>

            {/* Scientific Explanation */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.25)',
              borderRadius: '14px',
              padding: '1.25rem',
              border: '1px solid rgba(167, 243, 208, 0.2)',
              fontSize: '0.92rem',
              lineHeight: '1.65',
              color: '#D1FAE5'
            }}>
              <strong>Health Detective Insight:</strong><br/>
              {currentMetric.note}
            </div>

            {/* NCERT Question 4 & 7 Connection */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(37, 99, 235, 0.05) 100%)',
              borderRadius: '14px',
              padding: '1rem',
              border: '1.5px solid rgba(59, 130, 246, 0.35)',
              display: 'flex',
              gap: '0.75rem',
              alignItems: 'flex-start'
            }}>
              <span style={{ fontSize: '1.4rem' }}>💡</span>
              <div style={{ fontSize: '0.82rem', color: '#DBEAFE', lineHeight: '1.55' }}>
                <strong>NCERT Thinking Connection:</strong> <em>"Not all delicious foods are healthy, while not all healthy foods are initially enjoyable."</em> (Question 4). Potato wafers taste hyper-palatable because of fried oil and monosodium salt, but offer empty calories that cause weight gain and lethargy. Roasted chana builds strong muscle and hemoglobin!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
