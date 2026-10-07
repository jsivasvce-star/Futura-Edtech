import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Utensils, CheckCircle, AlertTriangle, 
  Sparkles, RefreshCw, Award, Heart, ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

const THALI_FOODS = {
  grains: [
    { id: 'wheat_roti', name: 'Whole Wheat Roti', type: 'Grain', carbs: 30, fibre: 20, protein: 10, cal: 120, icon: '🫓' },
    { id: 'ragi_rotti', name: 'Shree Anna: Ragi Rotti', type: 'Millet', carbs: 25, fibre: 35, protein: 15, calcium: 40, cal: 110, icon: '🌾' },
    { id: 'bajra_roti', name: 'Shree Anna: Bajra Roti', type: 'Millet', carbs: 25, fibre: 30, iron: 40, protein: 15, cal: 115, icon: '🌾' },
    { id: 'brown_rice', name: 'Steamed Brown Rice', type: 'Grain', carbs: 35, fibre: 15, protein: 8, cal: 130, icon: '🍚' },
    { id: 'white_bread', name: 'Refined White Bread', type: 'Refined', carbs: 45, fibre: 2, protein: 5, cal: 150, icon: '🍞' }
  ],
  proteins: [
    { id: 'moong_dal', name: 'Yellow Moong Dal', type: 'Pulse', protein: 35, carbs: 15, fibre: 15, cal: 120, icon: '🍲' },
    { id: 'rajma', name: 'Rajma (Kidney Beans)', type: 'Pulse', protein: 40, iron: 25, fibre: 20, cal: 140, icon: '🫘' },
    { id: 'sprouted_gram', name: 'Sprouted Bengal Gram', type: 'Sprouts', protein: 45, vitC: 30, fibre: 25, cal: 110, icon: '🌱' },
    { id: 'paneer_curry', name: 'Fresh Paneer Tikka', type: 'Dairy', protein: 35, fat: 25, calcium: 30, cal: 160, icon: '🧀' },
    { id: 'fish_curry', name: 'Freshwater Fish Curry', type: 'Fish', protein: 45, fat: 15, vitD: 25, cal: 130, icon: '🐟' }
  ],
  vegetables: [
    { id: 'palak_saag', name: 'Palak Saag (Spinach)', type: 'Greens', iron: 45, vitA: 40, fibre: 25, cal: 50, icon: '🥬' },
    { id: 'mix_veg', name: 'Carrot & Beans Stir-fry', type: 'Veggies', vitA: 35, vitC: 30, fibre: 30, cal: 70, icon: '🥕' },
    { id: 'lauki_sabzi', name: 'Lauki (Bottle Gourd)', type: 'Light Veg', water: 40, fibre: 20, cal: 40, icon: '🥒' },
    { id: 'deep_fried_chips', name: 'Deep Fried Potato Fries', type: 'Junk', fat: 50, carbs: 45, sodium: 40, cal: 280, icon: '🍟' }
  ],
  dairy: [
    { id: 'fresh_curd', name: 'Fresh Homemade Curd', type: 'Probiotic', calcium: 35, protein: 15, prob: 40, cal: 80, icon: '🥣' },
    { id: 'chhach', name: 'Spiced Buttermilk (Chhach)', type: 'Hydration', water: 45, calcium: 20, prob: 30, cal: 45, icon: '🥛' },
    { id: 'sugary_soda', name: 'Canned Carbonated Soda', type: 'Junk Drink', sugar: 60, acid: 30, cal: 160, icon: '🥤' }
  ],
  salad: [
    { id: 'raw_salad', name: 'Cucumber, Tomato & Lemon', type: 'Raw Fibre', fibre: 40, vitC: 35, water: 30, cal: 30, icon: '🥗' },
    { id: 'sprouted_salad', name: 'Sprouted Moong & Pomegranate', type: 'Super Salad', fibre: 35, iron: 25, vitC: 30, cal: 60, icon: '🥗' },
    { id: 'none_salad', name: 'No Salad / No Raw Veg', type: 'Empty', fibre: 0, cal: 0, icon: '❌' }
  ]
};

export default function BalancedThaliBuilder({ onBackToDashboard }) {
  const [plate, setPlate] = useState({
    grain: THALI_FOODS.grains[1], // Ragi Rotti by default
    protein: THALI_FOODS.proteins[0], // Moong Dal
    veg: THALI_FOODS.vegetables[0], // Palak Saag
    dairy: THALI_FOODS.dairy[0], // Curd
    salad: THALI_FOODS.salad[0] // Raw Salad
  });

  const [activeSlot, setActiveSlot] = useState('grain');

  // Compute balance
  const hasRefinedGrain = plate.grain.id === 'white_bread';
  const hasJunkVeg = plate.veg.id === 'deep_fried_chips';
  const hasJunkDrink = plate.dairy.id === 'sugary_soda';
  const hasNoSalad = plate.salad.id === 'none_salad';

  const isBalanced = !hasRefinedGrain && !hasJunkVeg && !hasJunkDrink && !hasNoSalad;
  const isMilletsHero = plate.grain.type === 'Millet';

  const handleSelectFood = (slot, item) => {
    setPlate(prev => ({ ...prev, [slot]: item }));
  };

  const handlePlateCheck = () => {
    if (isBalanced) {
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
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
              <span style={{ fontSize: '1.3rem' }}>🍱</span>
              <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#FDE68A' }}>
                Activity 3.8: Balanced Diet Analyzer & Shree Anna Thali
              </h2>
            </div>
            <span style={{ fontSize: '0.8rem', color: '#A7F3D0' }}>
              Build an Authentic Indian Thali & Validate Essential Nutrient Ratios
            </span>
          </div>
        </div>

        <button
          onClick={handlePlateCheck}
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
          <Sparkles size={16} /> Check Diet Balance
        </button>
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
        gridTemplateColumns: '1fr 420px',
        gap: '2rem'
      }}>
        {/* Left Side: Interactive Thali Canvas & Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Visual Thali Plate */}
          <div style={{
            borderRadius: '24px',
            background: 'linear-gradient(145deg, rgba(6, 78, 59, 0.5) 0%, rgba(2, 44, 34, 0.7) 100%)',
            border: '2px solid rgba(167, 243, 208, 0.25)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative'
          }}>
            {/* The Golden Thali Circle */}
            <div style={{
              width: '380px',
              height: '380px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #FFFBEB 0%, #FEF3C7 60%, #F59E0B 100%)',
              border: '10px solid #D97706',
              boxShadow: '0 15px 45px rgba(0, 0, 0, 0.4), inset 0 2px 10px rgba(0,0,0,0.15)',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {/* Central Grain / Shree Anna Item */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                onClick={() => setActiveSlot('grain')}
                style={{
                  width: '110px',
                  height: '110px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, #FFFFFF 0%, #FEF9C3 100%)',
                  border: activeSlot === 'grain' ? '3px solid #D97706' : '2px dashed #B45309',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  textAlign: 'center',
                  padding: '0.4rem',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              >
                <span style={{ fontSize: '1.8rem' }}>{plate.grain.icon}</span>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#78350F', marginTop: '0.2rem' }}>
                  {plate.grain.name}
                </span>
                <span style={{ fontSize: '0.62rem', color: '#B45309', fontWeight: 600 }}>Cereals / Grain</span>
              </motion.div>

              {/* Surrounding Katoris (Bowls) */}
              {/* Top Bowl: Protein / Dal */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                onClick={() => setActiveSlot('protein')}
                style={{
                  position: 'absolute',
                  top: '18px',
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  background: '#FEF3C7',
                  border: activeSlot === 'protein' ? '3px solid #7C3AED' : '2px solid #D97706',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  padding: '0.3rem',
                  textAlign: 'center',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.12)'
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>{plate.protein.icon}</span>
                <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#451A03' }}>{plate.protein.name}</span>
                <span style={{ fontSize: '0.58rem', color: '#78350F' }}>Protein Bowl</span>
              </motion.div>

              {/* Right Bowl: Vegetable / Greens */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                onClick={() => setActiveSlot('veg')}
                style={{
                  position: 'absolute',
                  right: '18px',
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  background: '#ECFDF5',
                  border: activeSlot === 'veg' ? '3px solid #059669' : '2px solid #D97706',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  padding: '0.3rem',
                  textAlign: 'center',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.12)'
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>{plate.veg.icon}</span>
                <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#064E3B' }}>{plate.veg.name}</span>
                <span style={{ fontSize: '0.58rem', color: '#047857' }}>Veggies & Iron</span>
              </motion.div>

              {/* Bottom Bowl: Salad / Roughage */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                onClick={() => setActiveSlot('salad')}
                style={{
                  position: 'absolute',
                  bottom: '18px',
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  background: '#F0FDF4',
                  border: activeSlot === 'salad' ? '3px solid #16A34A' : '2px solid #D97706',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  padding: '0.3rem',
                  textAlign: 'center',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.12)'
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>{plate.salad.icon}</span>
                <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#14532D' }}>{plate.salad.name}</span>
                <span style={{ fontSize: '0.58rem', color: '#15803D' }}>Roughage / Fibre</span>
              </motion.div>

              {/* Left Bowl: Dairy / Probiotics */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                onClick={() => setActiveSlot('dairy')}
                style={{
                  position: 'absolute',
                  left: '18px',
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  background: '#F8FAFC',
                  border: activeSlot === 'dairy' ? '3px solid #2563EB' : '2px solid #D97706',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  padding: '0.3rem',
                  textAlign: 'center',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.12)'
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>{plate.dairy.icon}</span>
                <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#1E293B' }}>{plate.dairy.name}</span>
                <span style={{ fontSize: '0.58rem', color: '#475569' }}>Calcium & Curd</span>
              </motion.div>
            </div>

            {/* Tap instruction */}
            <span style={{ marginTop: '1.25rem', fontSize: '0.85rem', color: '#D1FAE5' }}>
              💡 Click any bowl on the plate above to swap with alternatives from the food bank below!
            </span>
          </div>

          {/* Slot Food Options Carousel */}
          <div style={{
            background: 'rgba(6, 78, 59, 0.4)',
            borderRadius: '16px',
            border: '1px solid rgba(167, 243, 208, 0.2)',
            padding: '1.25rem'
          }}>
            <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '0.95rem', color: '#FDE68A', textTransform: 'capitalize' }}>
              Available Choices for: {activeSlot.toUpperCase()}
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.65rem' }}>
              {(THALI_FOODS[activeSlot === 'grain' ? 'grains' : activeSlot === 'protein' ? 'proteins' : activeSlot === 'veg' ? 'vegetables' : activeSlot === 'dairy' ? 'dairy' : 'salad'] || []).map(item => {
                const isSelected = plate[activeSlot]?.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectFood(activeSlot, item)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.3rem',
                      padding: '0.75rem 0.5rem',
                      borderRadius: '12px',
                      border: isSelected ? '2px solid #F59E0B' : '1px solid rgba(167, 243, 208, 0.25)',
                      background: isSelected ? 'rgba(245, 158, 11, 0.2)' : 'rgba(0,0,0,0.2)',
                      color: isSelected ? '#FDE68A' : '#E2E8F0',
                      cursor: 'pointer',
                      fontSize: '0.82rem',
                      fontWeight: isSelected ? 800 : 600,
                      textAlign: 'center'
                    }}
                  >
                    <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Diet Inspector & Shree Anna Millets Super-Power */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Status Badge Card */}
          <div style={{
            borderRadius: '20px',
            background: isBalanced 
              ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(6, 78, 59, 0.4) 100%)' 
              : 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(6, 78, 59, 0.4) 100%)',
            border: `2px solid ${isBalanced ? '#10B981' : '#EF4444'}`,
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              {isBalanced ? <CheckCircle size={24} style={{ color: '#34D399' }} /> : <AlertTriangle size={24} style={{ color: '#EF4444' }} />}
              <h3 style={{ margin: 0, fontSize: '1.25rem', color: isBalanced ? '#D1FAE5' : '#FEE2E2' }}>
                {isBalanced ? 'Balanced Indian Thali!' : 'Imbalanced Plate Detected'}
              </h3>
            </div>
            <p style={{ margin: 0, fontSize: '0.88rem', color: '#E2E8F0', lineHeight: '1.6' }}>
              {isBalanced 
                ? 'Your plate has adequate carbohydrates for energy, pulses/dairy for tissue repair, roughage for bowel motility, and protective micronutrients!' 
                : hasRefinedGrain 
                  ? 'Refined white bread lacks the outer bran and germ! Swap with whole grains or Shree Anna millets.'
                  : hasJunkVeg 
                    ? 'Deep-fried chips are loaded with saturated fats and high sodium, lacking genuine vegetable minerals.'
                    : hasJunkDrink 
                      ? 'Sugary soda contains empty calories and acidic additives that harm growing teeth. Choose buttermilk or water.'
                      : 'Missing salad or raw vegetables means insufficient dietary fibre, risking constipation!'}
            </p>
          </div>

          {/* Shree Anna (Millets) Spotlight Box */}
          <div style={{
            borderRadius: '20px',
            background: 'linear-gradient(145deg, rgba(245, 158, 11, 0.15) 0%, rgba(6, 78, 59, 0.3) 100%)',
            border: '2px solid rgba(245, 158, 11, 0.4)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span style={{ fontSize: '2rem' }}>🌾</span>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#FCD34D', fontWeight: 800, textTransform: 'uppercase' }}>
                  Indian Super-Grain Spotlight
                </span>
                <h4 style={{ margin: 0, fontSize: '1.2rem', color: '#FDE68A' }}>
                  Shree Anna (Millets) Power
                </h4>
              </div>
            </div>

            <p style={{ margin: 0, fontSize: '0.88rem', color: '#E2E8F0', lineHeight: '1.6' }}>
              Millets are traditional, climate-resilient coarse grains grown across India for thousands of years:
            </p>

            <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#D1FAE5', fontSize: '0.85rem', lineHeight: '1.65' }}>
              <li><strong>Ragi (Finger Millet):</strong> Contains over <strong>340 mg of Calcium</strong> per 100g—more than 10 times that of white rice!</li>
              <li><strong>Bajra (Pearl Millet):</strong> Rich source of <strong>Iron</strong> and magnesium, combating anaemia.</li>
              <li><strong>Jowar (Sorghum):</strong> Packed with complex dietary fibre that regulates blood sugar and keeps fullness long.</li>
            </ul>

            <div style={{
              background: 'rgba(0, 0, 0, 0.25)',
              padding: '0.65rem 0.9rem',
              borderRadius: '10px',
              fontSize: '0.78rem',
              color: '#FDE68A'
            }}>
              ✓ {isMilletsHero ? 'Awesome! You added Shree Anna to your thali!' : 'Tip: Pick Ragi Rotti or Bajra Roti in the Grain slot to supercharge minerals!'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
