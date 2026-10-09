import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ChevronDown, X } from 'lucide-react';

// Full-screen background image
import activity31Bg from '../assets/activity3_1_bg.png';

// 4K Realistic Cinematic Breakfast Dishes
import bIdliImg from '../assets/dishes/b_idli.png';
import bDosaImg from '../assets/dishes/b_dosa.png';
import bUpmaImg from '../assets/dishes/b_upma.png';
import bPohaImg from '../assets/dishes/b_poha.png';
import bPongalImg from '../assets/dishes/b_pongal.png';
import bParathaImg from '../assets/dishes/b_paratha.png';
import bPuriImg from '../assets/dishes/b_puri.png';
import bEggImg from '../assets/dishes/b_egg.png';

// 4K Realistic Cinematic Lunch Dishes
import lRiceImg from '../assets/dishes/l_rice.png';
import lDalTadkaImg from '../assets/dishes/l_dal_tadka.png';
import lPaneerImg from '../assets/dishes/l_paneer.png';
import lBiryaniImg from '../assets/dishes/l_biryani.png';
import lRajmaImg from '../assets/dishes/l_rajma.png';
import lSaladImg from '../assets/dishes/l_salad.png';
import lRotiImg from '../assets/dishes/l_roti.png';
import lChickenCurryImg from '../assets/dishes/l_chicken_curry.png';

// 4K Realistic Cinematic Dinner Dishes
import dPhulkaImg from '../assets/dishes/d_phulka.png';
import dKhichdiImg from '../assets/dishes/d_khichdi.png';
import dPalakPaneerImg from '../assets/dishes/d_palak_paneer.png';
import dMixedVegImg from '../assets/dishes/d_mixed_veg.png';
import dEggCurryImg from '../assets/dishes/d_egg_curry.png';
import dChickenTikkaImg from '../assets/dishes/d_chicken_tikka.png';
import dKheerImg from '../assets/dishes/d_kheer.png';
import dMilkImg from '../assets/dishes/d_milk.png';

// BREAKFAST DISHES (Authentic Indian Morning Foods)
export const BREAKFAST_ITEMS = [
  { id: 'b_idli', name: 'Idli Sambar', img: bIdliImg, category: 'veg', meal: 'breakfast' },
  { id: 'b_dosa', name: 'Masala Dosa', img: bDosaImg, category: 'veg', meal: 'breakfast' },
  { id: 'b_poha', name: 'Lemon Poha', img: bPohaImg, category: 'veg', meal: 'breakfast' },
  { id: 'b_pongal', name: 'Ven Pongal', img: bPongalImg, category: 'veg', meal: 'breakfast' },
  { id: 'b_upma', name: 'Veg Upma', img: bUpmaImg, category: 'veg', meal: 'breakfast' },
  { id: 'b_paratha', name: 'Aloo Paratha', img: bParathaImg, category: 'veg', meal: 'breakfast' },
  { id: 'b_puri', name: 'Puri Bhaji', img: bPuriImg, category: 'veg', meal: 'breakfast' },
  { id: 'b_egg', name: 'Boiled Eggs', img: bEggImg, category: 'non_veg', meal: 'breakfast' },
];

// LUNCH DISHES (Authentic Wholesome Indian Afternoon Meals)
export const LUNCH_ITEMS = [
  { id: 'l_rice', name: 'Basmati Rice', img: lRiceImg, category: 'veg', meal: 'lunch' },
  { id: 'l_dal_tadka', name: 'Dal Tadka', img: lDalTadkaImg, category: 'veg', meal: 'lunch' },
  { id: 'l_paneer', name: 'Paneer Masala', img: lPaneerImg, category: 'veg', meal: 'lunch' },
  { id: 'l_biryani', name: 'Veg Biryani', img: lBiryaniImg, category: 'veg', meal: 'lunch' },
  { id: 'l_rajma', name: 'Rajma Curry', img: lRajmaImg, category: 'veg', meal: 'lunch' },
  { id: 'l_salad', name: 'Fresh Salad', img: lSaladImg, category: 'veg', meal: 'lunch' },
  { id: 'l_roti', name: 'Butter Roti', img: lRotiImg, category: 'veg', meal: 'lunch' },
  { id: 'l_chicken_curry', name: 'Chicken Curry', img: lChickenCurryImg, category: 'non_veg', meal: 'lunch' },
];

// DINNER DISHES (Authentic Light & Nutritious Indian Night Meals)
export const DINNER_ITEMS = [
  { id: 'd_phulka', name: 'Phulka Chapati', img: dPhulkaImg, category: 'veg', meal: 'dinner' },
  { id: 'd_khichdi', name: 'Dal Khichdi', img: dKhichdiImg, category: 'veg', meal: 'dinner' },
  { id: 'd_palak_paneer', name: 'Palak Paneer', img: dPalakPaneerImg, category: 'veg', meal: 'dinner' },
  { id: 'd_mixed_veg', name: 'Mix Veg Sabzi', img: dMixedVegImg, category: 'veg', meal: 'dinner' },
  { id: 'd_kheer', name: 'Rice Kheer', img: dKheerImg, category: 'veg', meal: 'dinner' },
  { id: 'd_milk', name: 'Warm Milk', img: dMilkImg, category: 'veg', meal: 'dinner' },
  { id: 'd_egg_curry', name: 'Egg Curry', img: dEggCurryImg, category: 'non_veg', meal: 'dinner' },
  { id: 'd_chicken_tikka', name: 'Tandoori Tikka', img: dChickenTikkaImg, category: 'non_veg', meal: 'dinner' },
];

const ALL_ITEMS = [...BREAKFAST_ITEMS, ...LUNCH_ITEMS, ...DINNER_ITEMS];
const ITEM_MAP = Object.fromEntries(ALL_ITEMS.map(item => [item.id, item]));

const MEALS = [
  { key: 'breakfast', label: 'Breakfast', icon: '☀️', headerBg: 'rgba(5, 150, 105, 0.45)', headerColor: '#ECFDF5', items: BREAKFAST_ITEMS },
  { key: 'lunch', label: 'Lunch', icon: '🥗', headerBg: 'rgba(4, 120, 87, 0.55)', headerColor: '#D1FAE5', items: LUNCH_ITEMS },
  { key: 'dinner', label: 'Dinner', icon: '🍲', headerBg: 'rgba(6, 78, 59, 0.65)', headerColor: '#A7F3D0', items: DINNER_ITEMS },
];

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const INITIAL_TABLE = DAYS.map(day => ({
  day,
  breakfast: null,
  lunch: null,
  dinner: null,
}));

const SAMPLE_WEEK = [
  { day: 'Monday', breakfast: 'b_idli', lunch: 'l_rice', dinner: 'd_phulka' },
  { day: 'Tuesday', breakfast: 'b_poha', lunch: 'l_dal_tadka', dinner: 'd_khichdi' },
  { day: 'Wednesday', breakfast: 'b_dosa', lunch: 'l_biryani', dinner: 'd_palak_paneer' },
  { day: 'Thursday', breakfast: 'b_upma', lunch: 'l_paneer', dinner: 'd_mixed_veg' },
  { day: 'Friday', breakfast: 'b_paratha', lunch: 'l_rajma', dinner: 'd_egg_curry' },
  { day: 'Saturday', breakfast: 'b_pongal', lunch: 'l_chicken_curry', dinner: 'd_chicken_tikka' },
  { day: 'Sunday', breakfast: 'b_puri', lunch: 'l_salad', dinner: 'd_kheer' },
];

export default function MealTrackerActivity({ onBack, onNext, onBackToDashboard }) {
  const [tableData, setTableData] = useState(INITIAL_TABLE);
  const [activeCell, setActiveCell] = useState(null); // { dayIndex: 0, mealKey: 'breakfast' }
  const [activeMealTab, setActiveMealTab] = useState('breakfast'); // 'breakfast' | 'lunch' | 'dinner'
  const [openDropdown, setOpenDropdown] = useState(null); // { dayIndex, mealKey }
  const [notification, setNotification] = useState('');
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Set an item into a cell
  const handleAssignFoodToCell = (dayIndex, mealKey, foodId) => {
    setTableData(prev => {
      const nextData = [...prev];
      nextData[dayIndex] = {
        ...nextData[dayIndex],
        [mealKey]: foodId,
      };
      return nextData;
    });
    setOpenDropdown(null);

    // Auto-advance active cell to next slot
    if (mealKey === 'breakfast') {
      setActiveCell({ dayIndex, mealKey: 'lunch' });
      setActiveMealTab('lunch');
    } else if (mealKey === 'lunch') {
      setActiveCell({ dayIndex, mealKey: 'dinner' });
      setActiveMealTab('dinner');
    } else if (mealKey === 'dinner' && dayIndex < DAYS.length - 1) {
      setActiveCell({ dayIndex: dayIndex + 1, mealKey: 'breakfast' });
      setActiveMealTab('breakfast');
    } else {
      setActiveCell(null);
    }
  };

  // When food is clicked on the food chooser panel below
  const handleFoodItemClick = (food) => {
    if (activeCell) {
      handleAssignFoodToCell(activeCell.dayIndex, activeCell.mealKey, food.id);
      setNotification(`Added ${food.name} to ${DAYS[activeCell.dayIndex]}'s ${activeCell.mealKey}!`);
    } else {
      // Find the first empty cell matching this food's meal type
      let targetDayIndex = -1;
      for (let i = 0; i < tableData.length; i++) {
        if (!tableData[i][food.meal]) {
          targetDayIndex = i;
          break;
        }
      }

      if (targetDayIndex !== -1) {
        handleAssignFoodToCell(targetDayIndex, food.meal, food.id);
        setNotification(`Placed ${food.name} in ${DAYS[targetDayIndex]}'s ${food.meal}!`);
      } else {
        setNotification(`All ${food.meal} slots are filled! Click any cell in Table 3.1 to replace it.`);
      }
    }

    setTimeout(() => {
      setNotification('');
    }, 2000);
  };

  // Clear single cell
  const handleClearCell = (e, dayIndex, mealKey) => {
    e.stopPropagation();
    setTableData(prev => {
      const nextData = [...prev];
      nextData[dayIndex] = {
        ...nextData[dayIndex],
        [mealKey]: null,
      };
      return nextData;
    });
  };

  // Sample fill
  const handleLoadSample = () => {
    setTableData(SAMPLE_WEEK);
    setActiveCell(null);
    setNotification('Loaded authentic NCERT weekly diet plan!');
    setTimeout(() => setNotification(''), 2000);
  };

  // Reset all
  const handleResetTable = () => {
    setTableData(INITIAL_TABLE);
    setActiveCell(null);
    setNotification('Table 3.1 reset. Start recording your meals!');
    setTimeout(() => setNotification(''), 2000);
  };

  // Current meal tab items
  const currentTabItems = activeMealTab === 'breakfast'
    ? BREAKFAST_ITEMS
    : activeMealTab === 'lunch'
    ? LUNCH_ITEMS
    : DINNER_ITEMS;

  const handleCellClick = (dayIdx, mealKey) => {
    setActiveCell({ dayIndex: dayIdx, mealKey });
    setActiveMealTab(mealKey); // Auto-sync food panel below with active column!
    setOpenDropdown(openDropdown?.dayIndex === dayIdx && openDropdown?.mealKey === mealKey ? null : { dayIndex: dayIdx, mealKey });
  };

  const handleBackAction = onBack || onBackToDashboard;

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden', // Completely removes scroll
        fontFamily: "'Outfit', 'Inter', system-ui, sans-serif",
        background: '#042E23',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '12px 24px 14px 24px',
        boxSizing: 'border-box',
      }}
    >
      {/* 1. Full-Screen Background Image */}
      <img
        src={activity31Bg}
        alt="Sunlit Healthy Kitchen Study Scene"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          zIndex: 1,
        }}
      />

      {/* Subtle emerald tint overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(4, 46, 35, 0.06)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* 2A. TOP LEFT CORNER: TITLE "3.1 WHAT DO WE EAT?" */}
      <div
        style={{
          position: 'absolute',
          top: '12px',
          left: '24px',
          zIndex: 30,
        }}
      >
        {/* Emerald & Gold Frosted Glass Signboard with 8px Blur */}
        <div
          style={{
            position: 'relative',
            background: 'rgba(6, 38, 28, 0.72)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '2px solid rgba(251, 191, 36, 0.55)',
            borderRadius: '16px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.38), 0 0 14px rgba(251, 191, 36, 0.18), inset 0 1px 2px rgba(255, 255, 255, 0.25)',
            padding: '4px 24px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
          }}
        >
          {/* Metallic golden corner rivets */}
          <div style={{ position: 'absolute', top: 5, left: 7, width: 7, height: 7, borderRadius: '50%', background: '#FCD34D', border: '1px solid #78350F', boxShadow: 'inset 0 1px 1px #FEF08A' }} />
          <div style={{ position: 'absolute', top: 5, right: 7, width: 7, height: 7, borderRadius: '50%', background: '#FCD34D', border: '1px solid #78350F', boxShadow: 'inset 0 1px 1px #FEF08A' }} />
          <div style={{ position: 'absolute', bottom: 5, left: 7, width: 7, height: 7, borderRadius: '50%', background: '#FCD34D', border: '1px solid #78350F', boxShadow: 'inset 0 1px 1px #FEF08A' }} />
          <div style={{ position: 'absolute', bottom: 5, right: 7, width: 7, height: 7, borderRadius: '50%', background: '#FCD34D', border: '1px solid #78350F', boxShadow: 'inset 0 1px 1px #FEF08A' }} />

          {/* Emerald & Gold Pill Badge: 3.1 */}
          <div
            style={{
              background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
              color: '#FEF08A',
              fontSize: '26px',
              fontWeight: 900,
              padding: '2px 14px',
              borderRadius: '12px',
              boxShadow: '0 3px 10px rgba(4, 120, 87, 0.6), inset 0 1px 2px rgba(255, 255, 255, 0.4)',
              border: '1.5px solid #FCD34D',
              letterSpacing: '0.4px',
            }}
          >
            3.1
          </div>

          {/* Title: What Do We Eat? (Bold Complementary Gold) */}
          <span
            style={{
              fontSize: '26px',
              fontWeight: 900,
              color: '#FEF08A',
              textShadow: '0 2px 6px rgba(0, 0, 0, 0.85), 0 0 14px rgba(251, 191, 36, 0.45)',
              letterSpacing: '0.4px',
            }}
          >
            What Do We Eat?
          </span>
        </div>
      </div>

      {/* 2B. TOP CENTER: "ACTIVITY 3.1: LET US RECORD" (GLOSSY GREEN & CREAM PANEL) */}
      <div
        style={{
          position: 'absolute',
          top: '12px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 30,
        }}
      >
        <div
          style={{
            position: 'relative',
            background: 'linear-gradient(180deg, rgba(254, 252, 232, 0.45) 0%, rgba(16, 185, 129, 0.92) 16%, rgba(5, 150, 105, 0.96) 50%, rgba(4, 120, 87, 0.98) 100%)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            color: '#FEF08A',
            fontSize: '25px',
            fontWeight: 900,
            padding: '6px 36px',
            borderRadius: '999px',
            border: '2.5px solid #FEFCE8',
            boxShadow: '0 8px 25px rgba(4, 46, 35, 0.45), 0 0 18px rgba(52, 211, 153, 0.35), inset 0 2px 4px rgba(255, 255, 255, 0.85), inset 0 -2px 3px rgba(0, 0, 0, 0.35)',
            letterSpacing: '0.4px',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            textShadow: '0 2px 6px rgba(0, 0, 0, 0.85), 0 0 14px rgba(251, 191, 36, 0.45)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            overflow: 'hidden',
          }}
        >
          {/* Specular Gloss Reflection Layer */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '4%',
              right: '4%',
              height: '48%',
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.75) 0%, rgba(254, 252, 232, 0.15) 100%)',
              borderRadius: '999px 999px 0 0',
              pointerEvents: 'none',
            }}
          />
          <span style={{ position: 'relative', zIndex: 2 }}>Activity 3.1: Let us record</span>
        </div>
      </div>

      {/* Floating Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              position: 'fixed',
              top: '56px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1000,
              background: 'rgba(6, 40, 30, 0.95)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              color: '#FEF08A',
              padding: '6px 24px',
              borderRadius: '999px',
              fontSize: '22px',
              fontWeight: 800,
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.45), 0 0 15px rgba(245, 158, 11, 0.3)',
              border: '2px solid #FCD34D',
              pointerEvents: 'none',
            }}
          >
            {notification}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. CENTER & LOWER-CENTER WORKSPACE: COMPLEMENTARY GLASS WITH 8PX BLURNESS */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '18px', // Increased space to move food items to choose slightly to bottom
          flex: '1 1 auto',
          overflow: 'hidden',
          padding: '12px 0 6px 120px', // Shifts slightly on the right side away from the student
          boxSizing: 'border-box',
        }}
      >
        {/* TABLE 3.1 COMPLEMENTARY GLASS PANEL WITH 8PX BLUR */}
        <div
          style={{
            width: '1000px',
            maxWidth: '92vw',
            background: 'rgba(10, 32, 22, 0.52)', // Deep warm emerald glass harmonizing with wood table
            backdropFilter: 'blur(8px)', // 8px blurness
            WebkitBackdropFilter: 'blur(8px)',
            border: '2px solid rgba(251, 191, 36, 0.55)', // Complementary warm gold border
            borderRadius: '18px',
            boxShadow: '0 18px 45px rgba(0, 0, 0, 0.42), 0 0 20px rgba(245, 158, 11, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.25)',
            overflow: 'hidden',
            boxSizing: 'border-box',
          }}
        >
          {/* Table Header: Complementary Bar with Bold Gold Font & 8px blur */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(6, 56, 40, 0.88) 0%, rgba(14, 82, 58, 0.82) 50%, rgba(6, 42, 30, 0.90) 100%)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              color: '#FEF08A',
              fontSize: '26px',
              fontWeight: 900,
              padding: '8px 20px',
              textAlign: 'center',
              letterSpacing: '0.4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1.5px solid rgba(251, 191, 36, 0.45)',
            }}
          >
            <button
              type="button"
              onClick={handleLoadSample}
              style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.45) 0%, rgba(5, 150, 105, 0.55) 100%)',
                border: '1.5px solid #FCD34D',
                color: '#FEF08A',
                fontSize: '14px',
                fontWeight: 900,
                padding: '3px 12px',
                borderRadius: '6px',
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.25)',
              }}
              title="Auto-fill with authentic NCERT week"
            >
              Sample
            </button>

            <span style={{ textShadow: '0 2px 8px rgba(0,0,0,0.9), 0 0 16px rgba(251, 191, 36, 0.5)' }}>
              Table 3.1: Food items consumed over a week
            </span>

            <button
              type="button"
              onClick={handleResetTable}
              style={{
                background: 'rgba(30, 20, 10, 0.5)',
                border: '1.5px solid rgba(251, 191, 36, 0.65)',
                color: '#FDE68A',
                fontSize: '14px',
                fontWeight: 900,
                padding: '3px 12px',
                borderRadius: '6px',
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.25)',
              }}
              title="Clear all recorded meals"
            >
              Reset
            </button>
          </div>

          {/* Column Subheaders (Complementary glass tones with bold gold text) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '130px 1fr 1fr 1fr',
              borderBottom: '1.5px solid rgba(251, 191, 36, 0.35)',
            }}
          >
            <div
              style={{
                background: 'rgba(5, 42, 30, 0.8)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                color: '#FDE047',
                fontSize: '24px',
                fontWeight: 900,
                textAlign: 'center',
                padding: '8px 2px',
                borderRight: '1.5px solid rgba(251, 191, 36, 0.35)',
                textShadow: '0 1px 4px rgba(0,0,0,0.8)',
              }}
            >
              Day
            </div>
            {MEALS.map((meal, idx) => (
              <div
                key={meal.key}
                onClick={() => setActiveMealTab(meal.key)}
                style={{
                  background: activeMealTab === meal.key ? 'rgba(16, 185, 129, 0.65)' : meal.headerBg,
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  color: activeMealTab === meal.key ? '#FEF08A' : '#FDE68A',
                  fontSize: '24px',
                  fontWeight: 900,
                  textAlign: 'center',
                  padding: '8px 2px',
                  borderRight: idx < MEALS.length - 1 ? '1.5px solid rgba(251, 191, 36, 0.3)' : 'none',
                  borderBottom: activeMealTab === meal.key ? '3px solid #F59E0B' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  transition: 'background 0.15s ease',
                  textShadow: '0 1px 4px rgba(0,0,0,0.85)',
                }}
                title={`Click to view all ${meal.label} choices`}
              >
                <span>{meal.icon}</span>
                <span>{meal.label}</span>
              </div>
            ))}
          </div>

          {/* 7 Days Rows (Crisp transparent frosted rows with 8px blur) */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {tableData.map((row, dayIdx) => (
              <div
                key={row.day}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '130px 1fr 1fr 1fr',
                  borderBottom: dayIdx < DAYS.length - 1 ? '1px solid rgba(251, 191, 36, 0.2)' : 'none',
                  background: dayIdx % 2 === 0 ? 'rgba(255, 255, 255, 0.72)' : 'rgba(240, 253, 244, 0.65)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  height: '42px',
                }}
              >
                {/* Day Column */}
                <div
                  style={{
                    fontSize: '22px',
                    fontWeight: 900,
                    color: '#064E3B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2px 4px',
                    borderRight: '1.5px solid rgba(251, 191, 36, 0.35)',
                    background: 'rgba(254, 243, 199, 0.45)',
                  }}
                >
                  {row.day}
                </div>

                {/* Meal Slots (Breakfast, Lunch, Dinner) */}
                {MEALS.map((meal, mealIdx) => {
                  const foodId = row[meal.key];
                  const selectedFood = foodId ? ITEM_MAP[foodId] : null;
                  const isCellActive = activeCell?.dayIndex === dayIdx && activeCell?.mealKey === meal.key;
                  const isDropdownOpen = openDropdown?.dayIndex === dayIdx && openDropdown?.mealKey === meal.key;

                  return (
                    <div
                      key={meal.key}
                      style={{
                        position: 'relative',
                        padding: '3px 8px',
                        borderRight: mealIdx < MEALS.length - 1 ? '1.5px solid rgba(251, 191, 36, 0.25)' : 'none',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      {/* Interactive Dropdown Button with 8px blur */}
                      <div
                        onClick={() => handleCellClick(dayIdx, meal.key)}
                        style={{
                          width: '100%',
                          height: '35px',
                          background: selectedFood
                            ? selectedFood.category === 'veg' ? 'rgba(236, 253, 245, 0.85)' : 'rgba(255, 241, 242, 0.85)'
                            : isCellActive ? 'rgba(209, 250, 229, 0.9)' : 'rgba(255, 255, 255, 0.72)',
                          backdropFilter: 'blur(8px)',
                          WebkitBackdropFilter: 'blur(8px)',
                          border: isCellActive
                            ? '2px solid #10B981'
                            : selectedFood
                            ? selectedFood.category === 'veg' ? '1.5px solid #059669' : '1.5px solid #BE123C'
                            : '1.5px solid rgba(167, 243, 208, 0.85)',
                          borderRadius: '8px',
                          padding: '2px 10px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          cursor: 'pointer',
                          boxShadow: isCellActive ? '0 0 10px rgba(16, 185, 129, 0.5)' : 'none',
                          transition: 'all 0.12s ease',
                        }}
                        title={`Select ${meal.label} for ${row.day}`}
                      >
                        {selectedFood ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: 0 }}>
                            <img
                              src={selectedFood.img}
                              alt={selectedFood.name}
                              style={{
                                width: '25px',
                                height: '25px',
                                borderRadius: '50%',
                                objectFit: 'cover',
                                border: selectedFood.category === 'veg' ? '1.5px solid #059669' : '1.5px solid #BE123C',
                                flexShrink: 0,
                              }}
                            />
                            <span
                              style={{
                                fontSize: '22px',
                                fontWeight: 800,
                                color: selectedFood.category === 'veg' ? '#065F46' : '#9F1239',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                              }}
                            >
                              {selectedFood.name}
                            </span>
                          </div>
                        ) : (
                          <span
                            style={{
                              fontSize: '22px',
                              fontWeight: 600,
                              color: isCellActive ? '#047857' : '#1E293B',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            Select food item
                          </span>
                        )}

                        <div style={{ display: 'flex', alignItems: 'center', gap: '3px', flexShrink: 0, marginLeft: '4px' }}>
                          {selectedFood ? (
                            <button
                              type="button"
                              onClick={(e) => handleClearCell(e, dayIdx, meal.key)}
                              style={{
                                background: 'rgba(0, 0, 0, 0.08)',
                                border: 'none',
                                borderRadius: '50%',
                                width: '16px',
                                height: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                color: '#475569',
                                padding: 0,
                              }}
                              title="Remove item"
                            >
                              <X size={12} />
                            </button>
                          ) : (
                            <ChevronDown size={15} color={isCellActive ? '#047857' : '#475569'} />
                          )}
                        </div>
                      </div>

                      {/* Inline Dropdown Popover with 8px blur */}
                      {isDropdownOpen && (
                        <div
                          ref={dropdownRef}
                          style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            zIndex: 100,
                            width: '270px',
                            maxHeight: '250px',
                            overflowY: 'auto',
                            background: 'rgba(255, 255, 255, 0.95)',
                            backdropFilter: 'blur(8px)',
                            WebkitBackdropFilter: 'blur(8px)',
                            border: '2px solid #047857',
                            borderRadius: '12px',
                            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35)',
                            padding: '6px',
                          }}
                        >
                          <div style={{ fontSize: '13px', fontWeight: 800, color: '#047857', padding: '3px 6px', borderBottom: '1px solid #E2E8F0' }}>
                            🍃 {meal.label} Items (Veg)
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2px', padding: '3px 0' }}>
                            {meal.items.filter(i => i.category === 'veg').map(item => (
                              <div
                                key={item.id}
                                onClick={() => handleAssignFoodToCell(dayIdx, meal.key, item.id)}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '8px',
                                  padding: '4px 6px',
                                  borderRadius: '6px',
                                  cursor: 'pointer',
                                  background: foodId === item.id ? '#D1FAE5' : 'transparent',
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = '#ECFDF5'}
                                onMouseLeave={(e) => e.currentTarget.style.background = foodId === item.id ? '#D1FAE5' : 'transparent'}
                              >
                                <img src={item.img} alt={item.name} style={{ width: '22px', height: '22px', borderRadius: '50%', objectFit: 'cover' }} />
                                <span style={{ fontSize: '16px', fontWeight: 700, color: '#064E3B' }}>{item.name}</span>
                              </div>
                            ))}
                          </div>

                          <div style={{ fontSize: '13px', fontWeight: 800, color: '#9F1239', padding: '4px 6px 3px 6px', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
                            🍗 {meal.label} Items (Non-Veg)
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2px', padding: '3px 0' }}>
                            {meal.items.filter(i => i.category === 'non_veg').map(item => (
                              <div
                                key={item.id}
                                onClick={() => handleAssignFoodToCell(dayIdx, meal.key, item.id)}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '8px',
                                  padding: '4px 6px',
                                  borderRadius: '6px',
                                  cursor: 'pointer',
                                  background: foodId === item.id ? '#FFE4E6' : 'transparent',
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = '#FFF1F2'}
                                onMouseLeave={(e) => e.currentTarget.style.background = foodId === item.id ? '#FFE4E6' : 'transparent'}
                              >
                                <img src={item.img} alt={item.name} style={{ width: '22px', height: '22px', borderRadius: '50%', objectFit: 'cover' }} />
                                <span style={{ fontSize: '16px', fontWeight: 700, color: '#1E293B' }}>{item.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* FOOD ITEMS TO CHOOSE PANEL: COMPLEMENTARY GLASS WITH 8PX BLUR */}
        <div
          style={{
            width: '1000px',
            maxWidth: '92vw',
            background: 'rgba(10, 32, 22, 0.52)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '2px solid rgba(251, 191, 36, 0.55)',
            borderRadius: '16px',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.4), 0 0 18px rgba(245, 158, 11, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.25)',
            overflow: 'hidden',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Top Control Bar with 8px blur */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(6, 56, 40, 0.88) 0%, rgba(14, 82, 58, 0.82) 50%, rgba(6, 42, 30, 0.90) 100%)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              padding: '6px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1.5px solid rgba(251, 191, 36, 0.45)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '20px' }}>🍲</span>
              <span
                style={{
                  color: '#FEF08A',
                  fontSize: '26px',
                  fontWeight: 900,
                  letterSpacing: '0.4px',
                  textShadow: '0 2px 8px rgba(0,0,0,0.9), 0 0 16px rgba(251, 191, 36, 0.5)',
                }}
              >
                Food items to choose
              </span>
            </div>

            {/* Meal Category Tabs: Breakfast, Lunch, Dinner */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(2, 36, 26, 0.7)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                padding: '2px 8px',
                borderRadius: '10px',
                border: '1px solid rgba(251, 191, 36, 0.45)',
              }}
            >
              {[
                { key: 'breakfast', label: 'Breakfast', icon: '☀️' },
                { key: 'lunch', label: 'Lunch', icon: '🥗' },
                { key: 'dinner', label: 'Dinner', icon: '🍲' },
              ].map((tab) => {
                const isActive = activeMealTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveMealTab(tab.key)}
                    style={{
                      padding: '3px 14px',
                      border: isActive ? '1.5px solid #FCD34D' : 'none',
                      borderRadius: '8px',
                      background: isActive ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.95) 0%, rgba(4, 120, 87, 0.95) 100%)' : 'transparent',
                      color: isActive ? '#FEF08A' : '#FDE68A',
                      fontSize: '24px',
                      fontWeight: 900,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      boxShadow: isActive ? '0 2px 8px rgba(245, 158, 11, 0.45)' : 'none',
                      transition: 'all 0.15s ease',
                      textShadow: isActive ? '0 1px 3px rgba(0,0,0,0.8)' : 'none',
                    }}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Horizontal Food Items Strip with 8px blur */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(8, 1fr)',
              gap: '6px',
              padding: '6px 10px',
              background: 'rgba(255, 255, 255, 0.55)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              boxSizing: 'border-box',
            }}
          >
            {currentTabItems.map((item) => {
              const isVeg = item.category === 'veg';
              return (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleFoodItemClick(item)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '4px 2px',
                    minHeight: '74px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    background: 'rgba(255, 255, 255, 0.88)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    border: isVeg ? '1.5px solid rgba(5, 150, 105, 0.7)' : '1.5px solid rgba(190, 18, 60, 0.7)',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
                    transition: 'all 0.12s ease',
                    position: 'relative',
                  }}
                  title={`Click to add ${item.name} (${isVeg ? 'Veg' : 'Non-Veg'})`}
                >
                  {/* Category Indicator Tag */}
                  <span
                    style={{
                      position: 'absolute',
                      top: '2px',
                      right: '3px',
                      fontSize: '11px',
                      fontWeight: 800,
                      color: isVeg ? '#059669' : '#BE123C',
                    }}
                  >
                    {isVeg ? '🍃' : '🍗'}
                  </span>

                  <img
                    src={item.img}
                    alt={item.name}
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: isVeg ? '1.5px solid #059669' : '1.5px solid #BE123C',
                      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.12)',
                    }}
                  />
                  <span
                    style={{
                      fontSize: '22px',
                      fontWeight: 800,
                      color: isVeg ? '#064E3B' : '#9F1239',
                      textAlign: 'center',
                      lineHeight: 1.12,
                      marginTop: '3px',
                      maxWidth: '110px',
                      wordBreak: 'normal',
                      whiteSpace: 'normal',
                    }}
                  >
                    {item.name}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. BOTTOM SECTION: NAVIGATION BUTTONS */}
      <div
        style={{
          position: 'relative',
          zIndex: 100,
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flex: '0 0 auto',
        }}
      >
        {/* Bottom Left: Back Button (Glossy Green & Cream Panel) */}
        <button
          type="button"
          onClick={handleBackAction}
          style={{
            position: 'relative',
            background: 'linear-gradient(180deg, rgba(254, 252, 232, 0.35) 0%, rgba(6, 50, 36, 0.90) 18%, rgba(4, 38, 28, 0.94) 50%, rgba(2, 26, 18, 0.98) 100%)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '2px solid #FEFCE8',
            color: '#FEF08A',
            fontSize: '24px',
            fontWeight: 900,
            padding: '6px 28px',
            borderRadius: '12px',
            cursor: 'pointer',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.45), 0 0 12px rgba(167, 243, 208, 0.2), inset 0 2px 3px rgba(255, 255, 255, 0.75), inset 0 -2px 2px rgba(0, 0, 0, 0.35)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.15s ease',
            textShadow: '0 1px 4px rgba(0, 0, 0, 0.8), 0 0 10px rgba(251, 191, 36, 0.4)',
            overflow: 'hidden',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.5), 0 0 16px rgba(167, 243, 208, 0.35)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.45), 0 0 12px rgba(167, 243, 208, 0.2)';
          }}
        >
          {/* Top Half Gloss Reflection */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '48%',
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.65) 0%, rgba(254, 252, 232, 0.1) 100%)',
              pointerEvents: 'none',
            }}
          />
          <ArrowLeft size={20} color="#FEF08A" style={{ position: 'relative', zIndex: 2 }} />
          <span style={{ position: 'relative', zIndex: 2 }}>Back</span>
        </button>

        {/* Bottom Right: Next Button (Glossy Green & Cream Panel) */}
        <button
          type="button"
          onClick={onNext}
          style={{
            position: 'relative',
            background: 'linear-gradient(180deg, rgba(254, 252, 232, 0.45) 0%, rgba(16, 185, 129, 0.95) 18%, rgba(5, 150, 105, 0.96) 50%, rgba(4, 120, 87, 0.98) 100%)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '2.5px solid #FEFCE8',
            color: '#FEF08A',
            fontSize: '24px',
            fontWeight: 900,
            padding: '6px 32px',
            borderRadius: '12px',
            cursor: 'pointer',
            boxShadow: '0 6px 22px rgba(4, 46, 35, 0.45), 0 0 18px rgba(16, 185, 129, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.85), inset 0 -2px 3px rgba(0, 0, 0, 0.35)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.15s ease',
            textShadow: '0 1px 4px rgba(0, 0, 0, 0.8), 0 0 10px rgba(251, 191, 36, 0.4)',
            overflow: 'hidden',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)';
            e.currentTarget.style.boxShadow = '0 10px 28px rgba(4, 46, 35, 0.55), 0 0 22px rgba(52, 211, 153, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = '0 6px 22px rgba(4, 46, 35, 0.45), 0 0 18px rgba(16, 185, 129, 0.4)';
          }}
        >
          {/* Top Half Gloss Reflection */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '48%',
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.75) 0%, rgba(254, 252, 232, 0.15) 100%)',
              pointerEvents: 'none',
            }}
          />
          <span style={{ position: 'relative', zIndex: 2 }}>Next</span>
          <ArrowRight size={20} color="#FEF08A" style={{ position: 'relative', zIndex: 2 }} />
        </button>
      </div>
    </div>
  );
}
