import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, MapPin, Compass, CheckCircle, Sparkles, 
  Search, BookOpen, Utensils, Wheat, Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

const STATES_DATA = [
  {
    id: 'punjab',
    name: 'Punjab (Northern Plains)',
    crops: 'Wheat, Mustard, Maize, Sugarcane',
    stapleDishes: 'Makki di Roti, Sarson da Saag, Rajma-Chawal, Dal Makhani',
    drinkBeverage: 'Lassi, Fresh Chhach',
    whyTraditional: 'The fertile alluvial plains and winter climate favor golden wheat, mustard fields, and rich dairy cattle farming.',
    color: '#F59E0B',
    badge: 'North India',
    icon: '🌾'
  },
  {
    id: 'tamil_nadu',
    name: 'Tamil Nadu & Kerala (Southern Coast)',
    crops: 'Paddy (Rice), Coconut, Black Gram (Urad), Spices, Banana',
    stapleDishes: 'Idli, Dosa, Sambar, Rasam, Appam, Avial',
    drinkBeverage: 'Tender Coconut Water, Filter Kaapi',
    whyTraditional: 'Abundant coastal rains and warm climate produce extensive rice paddies and coconut groves. Fermentation makes foods light and probiotic.',
    color: '#10B981',
    badge: 'South India',
    icon: '🥥'
  },
  {
    id: 'west_bengal',
    name: 'West Bengal & Odisha (Eastern Delta)',
    crops: 'Paddy (Rice), Mustard, Jute, Freshwater Fisheries',
    stapleDishes: 'Bhaat (Rice), Machher Jhol (Fish Curry), Shorshe Ilish, Shukto',
    drinkBeverage: 'Aam Pora Sharbat, Green Coconut',
    whyTraditional: 'River Ganges and Brahmaputra deltas yield plentiful freshwater fish and multiple paddy harvests every year.',
    color: '#3B82F6',
    badge: 'East India',
    icon: '🐟'
  },
  {
    id: 'gujarat',
    name: 'Gujarat & Rajasthan (Western Arid Zone)',
    crops: 'Millets (Bajra, Jowar), Groundnut, Sesame, Pulses',
    stapleDishes: 'Thepla, Dhokla, Handvo, Dal Baati Churma, Bajra No Rotlo',
    drinkBeverage: 'Chhas (Spiced Buttermilk)',
    whyTraditional: 'Semi-arid climates make drought-hardy millets like bajra and energy-dense nuts the staple survival food.',
    color: '#EC4899',
    badge: 'West India',
    icon: '🫓'
  },
  {
    id: 'ladakh',
    name: 'Ladakh (High Altitude Cold Desert)',
    crops: 'Barley (Grim), Buckwheat, Apricots, Yak Dairy',
    stapleDishes: 'Tsampa (Roasted barley flour), Thukpa (Noodle soup), Skyu',
    drinkBeverage: 'Gur-Gur Cha (Salted Yak Butter Tea)',
    whyTraditional: 'Extreme sub-zero winters require high-calorie butter tea and hardy barley grain that ripens quickly in short summers.',
    color: '#8B5CF6',
    badge: 'Himalayan Zone',
    icon: '🏔️'
  },
  {
    id: 'assam',
    name: 'Assam & Meghalaya (North-East Hills)',
    crops: 'Rice, Bamboo Shoots, Black Pepper, Fresh Greens, Tea',
    stapleDishes: 'Khar, Masor Tenga (Tangy fish curry), Pitha, Steamed Rice',
    drinkBeverage: 'Assam Orthodox Black Tea',
    whyTraditional: 'Lush tropical rainfall creates wild edible greens, fragrant Joha rice, and natural alkaline cooking using charred plant stems.',
    color: '#06B6D4',
    badge: 'North-East',
    icon: '🍵'
  }
];

export default function RegionalFoodExplorer({ onBackToDashboard }) {
  const [selectedStateId, setSelectedStateId] = useState('punjab');
  const [completedStates, setCompletedStates] = useState({ punjab: true });
  const [filterQuery, setFilterQuery] = useState('');

  const currentState = STATES_DATA.find(s => s.id === selectedStateId) || STATES_DATA[0];

  const handleSelectState = (id) => {
    setSelectedStateId(id);
    setCompletedStates(prev => {
      const next = { ...prev, [id]: true };
      if (Object.keys(next).length === STATES_DATA.length) {
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
      }
      return next;
    });
  };

  const filteredStates = STATES_DATA.filter(s => 
    s.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
    s.stapleDishes.toLowerCase().includes(filterQuery.toLowerCase()) ||
    s.crops.toLowerCase().includes(filterQuery.toLowerCase())
  );

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
      {/* Top Header */}
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
              <span style={{ fontSize: '1.3rem' }}>🗺️</span>
              <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#FDE68A' }}>
                Activity 3.2: Food in Different Regions of India
              </h2>
            </div>
            <span style={{ fontSize: '0.8rem', color: '#A7F3D0' }}>
              NCERT Table 3.2 · Traditional Foods, Locally Grown Crops & Cultural Wisdom
            </span>
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.4rem 0.9rem',
          borderRadius: '12px',
          background: 'rgba(16, 185, 129, 0.2)',
          border: '1px solid rgba(52, 211, 153, 0.35)',
          fontSize: '0.82rem',
          color: '#D1FAE5'
        }}>
          <CheckCircle size={15} style={{ color: '#34D399' }} />
          <span>Explored: <strong>{Object.keys(completedStates).length}</strong> of {STATES_DATA.length} Regions</span>
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
        gridTemplateColumns: '360px 1fr',
        gap: '2rem'
      }}>
        {/* Left Column: Region Selector List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Search Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(6, 78, 59, 0.5)',
            border: '1.5px solid rgba(167, 243, 208, 0.3)',
            borderRadius: '12px',
            padding: '0.55rem 0.85rem'
          }}>
            <Search size={16} style={{ color: '#A7F3D0' }} />
            <input
              type="text"
              placeholder="Search region, state, dish, or crop..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#FFFFFF',
                fontSize: '0.85rem',
                fontFamily: 'inherit',
                outline: 'none',
                width: '100%'
              }}
            />
          </div>

          {/* Cards List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {filteredStates.map((state) => {
              const isSelected = selectedStateId === state.id;
              const isDone = completedStates[state.id];
              return (
                <motion.div
                  key={state.id}
                  whileHover={{ scale: 1.01, x: 2 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleSelectState(state.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.85rem 1rem',
                    borderRadius: '14px',
                    border: isSelected ? `2px solid ${state.color}` : '1px solid rgba(167, 243, 208, 0.2)',
                    background: isSelected 
                      ? 'linear-gradient(135deg, rgba(6, 78, 59, 0.8) 0%, rgba(2, 44, 34, 0.9) 100%)' 
                      : 'rgba(6, 78, 59, 0.35)',
                    cursor: 'pointer',
                    boxShadow: isSelected ? `0 6px 20px ${state.color}33` : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>{state.icon}</span>
                    <div>
                      <div style={{ fontSize: '0.92rem', fontWeight: 700, color: isSelected ? '#FDE68A' : '#FFFFFF' }}>
                        {state.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#A7F3D0' }}>
                        {state.badge}
                      </div>
                    </div>
                  </div>

                  {isDone && (
                    <span style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: '#10B981',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF'
                    }}>
                      <Check size={12} strokeWidth={3} />
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Regional Culinary Profile (Table 3.2 Inspector) */}
        <div style={{
          borderRadius: '24px',
          background: 'linear-gradient(145deg, rgba(6, 78, 59, 0.5) 0%, rgba(2, 44, 34, 0.75) 100%)',
          border: '2px solid rgba(167, 243, 208, 0.3)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          {/* Header of Detail Card */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: `linear-gradient(135deg, ${currentState.color} 0%, #064E3B 100%)`,
                fontSize: '2rem',
                boxShadow: `0 8px 24px ${currentState.color}44`
              }}>
                {currentState.icon}
              </span>
              <div>
                <span style={{
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  color: currentState.color,
                  letterSpacing: '0.06em'
                }}>
                  {currentState.badge} Traditional Diet
                </span>
                <h3 style={{ margin: 0, fontSize: '1.6rem', color: '#FDE68A' }}>
                  {currentState.name}
                </h3>
              </div>
            </div>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.35rem 0.8rem',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              fontSize: '0.8rem',
              color: '#D1FAE5'
            }}>
              <MapPin size={14} style={{ color: currentState.color }} /> State Spotlight
            </div>
          </div>

          {/* Table 3.2 Breakdown Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
            {/* Box 1: Crops Grown */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.25)',
              borderRadius: '16px',
              border: '1px solid rgba(167, 243, 208, 0.2)',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#FCD34D', fontSize: '0.85rem', fontWeight: 700 }}>
                <Wheat size={16} /> Locally Grown Crops & Agriculture
              </div>
              <div style={{ fontSize: '1.05rem', color: '#FFFFFF', fontWeight: 600 }}>
                {currentState.crops}
              </div>
            </div>

            {/* Box 2: Traditional Dishes */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.25)',
              borderRadius: '16px',
              border: '1px solid rgba(167, 243, 208, 0.2)',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#34D399', fontSize: '0.85rem', fontWeight: 700 }}>
                <Utensils size={16} /> Iconic Staple Dishes (Table 3.2)
              </div>
              <div style={{ fontSize: '1.05rem', color: '#FFFFFF', fontWeight: 600 }}>
                {currentState.stapleDishes}
              </div>
            </div>
          </div>

          {/* Beverages & Climate Adaptation */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.2)',
            borderRadius: '16px',
            border: '1px solid rgba(167, 243, 208, 0.15)',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}>
            <div style={{ fontSize: '0.88rem', color: '#FDE68A', fontWeight: 700 }}>
              🌿 Scientific Adaptation & Climate Link:
            </div>
            <p style={{ margin: 0, fontSize: '0.92rem', color: '#E2E8F0', lineHeight: '1.65' }}>
              {currentState.whyTraditional}
            </p>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.85rem',
              color: '#A7F3D0',
              borderTop: '1px dashed rgba(167, 243, 208, 0.2)',
              paddingTop: '0.5rem'
            }}>
              <strong>Traditional Hydration:</strong> {currentState.drinkBeverage}
            </div>
          </div>

          {/* Interactive Match Challenge Prompt */}
          <div style={{
            marginTop: 'auto',
            padding: '1rem',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6, 0.05) 100%)',
            border: '1.5px solid rgba(245, 158, 11, 0.35)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <span style={{ fontSize: '1.8rem' }}>💡</span>
            <div style={{ fontSize: '0.85rem', color: '#FEF3C7', lineHeight: '1.5' }}>
              <strong>Did You Know? (NCERT Table 3.2 Insight):</strong> Notice how every traditional Indian meal combines at least one cereal grain for energy, one pulse/fish/meat for protein, and local vegetables/curd for vitamins, minerals, and probiotics!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
