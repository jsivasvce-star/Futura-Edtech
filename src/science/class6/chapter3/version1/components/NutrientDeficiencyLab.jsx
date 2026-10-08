import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, HeartPulse, ShieldAlert, Sparkles, CheckCircle, 
  Stethoscope, AlertCircle, Apple, Check, RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';

const NUTRIENT_CATALOGUE = [
  {
    id: 'carbs',
    name: 'Carbohydrates',
    category: 'Energy Giving Food',
    sources: 'Rice, Wheat, Maize, Potato, Sweet Potato, Sugar, Banana',
    role: 'Primary instantaneous energy fuel for the body and brain cells during activity.',
    deficiency: 'Underweight, general physical fatigue, lethargy, lack of stamina.',
    color: '#F59E0B',
    icon: '🌾'
  },
  {
    id: 'fats',
    name: 'Fats',
    category: 'Energy Reserve & Insulation',
    sources: 'Ghee, Butter, Mustard Oil, Groundnuts, Coconut, Fish, Cheese',
    role: 'Provides more than double the energy per gram compared to carbohydrates; insulates vital organs and carries fat-soluble vitamins (A, D, E, K).',
    deficiency: 'Dry skin, feeling cold easily, deficiency of fat-soluble vitamins.',
    color: '#EAB308',
    icon: '🧈'
  },
  {
    id: 'protein',
    name: 'Proteins',
    category: 'Body Building & Repair',
    sources: 'Gram, Moong, Rajma, Soybeans, Milk, Paneer, Eggs, Fish, Meat',
    role: 'Required for growth, building muscles, tissue repair, enzymes, and immune antibodies.',
    deficiency: 'Kwashiorkor / Marasmus: stunted growth, swelling of face, discolouration of hair, skin diseases, weakness.',
    color: '#8B5CF6',
    icon: '🫘'
  },
  {
    id: 'vit_a',
    name: 'Vitamin A',
    category: 'Protective Nutrient',
    sources: 'Carrot, Papaya, Mango, Milk, Butter, Spinach, Fish oil',
    role: 'Keeps skin and eyes healthy; essential for rhodopsin formation in retinas for vision in dim light.',
    deficiency: 'Night Blindness (Loss of vision in darkness; complete blindness in severe cases).',
    color: '#F97316',
    icon: '🥕'
  },
  {
    id: 'vit_b1',
    name: 'Vitamin B1 (Thiamine)',
    category: 'Protective Nutrient',
    sources: 'Whole grain cereals, pulses, peas, nuts, yeast',
    role: 'Helps convert nutrients into energy; essential for proper heart and nerve functioning.',
    deficiency: 'Beriberi (Weak muscles and very little energy to work).',
    color: '#10B981',
    icon: '🌾'
  },
  {
    id: 'vit_c',
    name: 'Vitamin C (Ascorbic Acid)',
    category: 'Protective & Immunity',
    sources: 'Amla (Indian gooseberry), Guava, Orange, Lemon, Tomato, Green chilli',
    role: 'Fights infections, aids wound healing, keeps gums and teeth healthy. Note: easily destroyed by heat during cooking!',
    deficiency: 'Scurvy (Bleeding gums, wounds take longer time to heal).',
    color: '#EC4899',
    icon: '🍋'
  },
  {
    id: 'vit_d',
    name: 'Vitamin D',
    category: 'Bone & Tooth Mineralization',
    sources: 'Exposure to morning Sunlight, Milk, Butter, Eggs, Fish',
    role: 'Enables the body to absorb calcium and phosphorus to build strong, dense bones and teeth.',
    deficiency: 'Rickets (Bones become soft and bent; bowed legs in growing children).',
    color: '#3B82F6',
    icon: '☀️'
  },
  {
    id: 'calcium',
    name: 'Calcium (Mineral)',
    category: 'Structural Mineral',
    sources: 'Milk, Curd, Ragi (Finger millet), Sesame seeds, Green leafy vegetables',
    role: 'Essential structural component of bones and teeth; required for blood clotting and muscle contractions.',
    deficiency: 'Bone and Tooth Decay (Weak, brittle bones and rapid dental cavities).',
    color: '#06B6D4',
    icon: '🥛'
  },
  {
    id: 'iodine',
    name: 'Iodine (Mineral)',
    category: 'Metabolic Regulator',
    sources: 'Iodised salt, Sea fish, Crab, Prawns, Seaweed',
    role: 'Required by the thyroid gland to produce thyroxine hormone controlling growth and mental development.',
    deficiency: 'Goitre (Glands in the neck appear swollen; mental disability in children).',
    color: '#6366F1',
    icon: '🧂'
  },
  {
    id: 'iron',
    name: 'Iron (Mineral)',
    category: 'Blood Hemoglobin Former',
    sources: 'Spinach, Jaggery (Gur), Apples, Pomegranate, Liver, Fenugreek (Methi)',
    role: 'Forms hemoglobin in red blood cells that transports vital oxygen to every cell in the body.',
    deficiency: 'Anaemia (General weakness, tiredness, pale skin and fatigue).',
    color: '#EF4444',
    icon: '🍎'
  },
  {
    id: 'roughage',
    name: 'Dietary Fibre (Roughage)',
    category: 'Digestive Bulk & Motility',
    sources: 'Whole grains, fresh unpeeled fruits (apples, guavas), raw salads, cucumber, pulses',
    role: 'Does NOT provide nutrients, but adds bulk to undigested food, retains water in stool, and ensures smooth bowel movements.',
    deficiency: 'Constipation, abdominal pain, bloating, and irregular bowel movements (Medu’s problem).',
    color: '#84CC16',
    icon: '🥗'
  },
  {
    id: 'water',
    name: 'Water',
    category: 'Universal Biological Medium',
    sources: 'Drinking water, Milk, Buttermilk, Lemonade, Juicy fruits (Melons, Oranges)',
    role: 'Transports absorbed nutrients throughout the bloodstream, flushes out metabolic wastes in urine and sweat, and regulates body temperature.',
    deficiency: 'Dehydration, headache, muscle cramps, reduced kidney filtering.',
    color: '#0284C7',
    icon: '💧'
  }
];

const CLINIC_CASES = [
  {
    patientName: 'Reshma (Textbook Question 6)',
    complaint: 'Trouble seeing things clearly in dim light or after twilight. Eyes feel strained in evening hours.',
    correctNutrientId: 'vit_a',
    diagnosis: 'Night Blindness',
    cureRecommendation: 'Rich in Vitamin A: Carrots, Papaya, Mango, and Spinach.',
    icon: '👧'
  },
  {
    patientName: 'Medu (Textbook Question 5)',
    complaint: 'Enjoys white bread, noodles and biscuits, but avoids vegetables. Suffers from chronic stomach ache and severe constipation.',
    correctNutrientId: 'roughage',
    diagnosis: 'Dietary Fibre (Roughage) Deficiency',
    cureRecommendation: 'Fresh raw salads, unpeeled apples, cucumber, whole wheat and sprouted moong.',
    icon: '👦'
  },
  {
    patientName: 'Sailor Mohan',
    complaint: 'Bleeding gums when brushing, wounds taking unusually long weeks to heal.',
    correctNutrientId: 'vit_c',
    diagnosis: 'Scurvy (Vitamin C Deficiency)',
    cureRecommendation: 'Citrus fruits like Amla, Oranges, Lemons, and Guavas (eat raw!).',
    icon: '🧔'
  },
  {
    patientName: 'Aarav (Age 8)',
    complaint: 'Leg bones appear bowed outward at the knees, bones are soft and ache upon running.',
    correctNutrientId: 'vit_d',
    diagnosis: 'Rickets (Vitamin D Deficiency)',
    cureRecommendation: 'Daily morning sunlight exposure, milk, and fortified butter.',
    icon: '🧒'
  },
  {
    patientName: 'Grandma Kaushalya',
    complaint: 'Noticeable swelling in the front of her neck like a soft collar; feeling unusually cold and tired.',
    correctNutrientId: 'iodine',
    diagnosis: 'Goitre (Iodine Deficiency)',
    cureRecommendation: 'Switching strictly to Iodised salt and including seafood if non-vegetarian.',
    icon: '👵'
  },
  {
    patientName: 'Priya (Student)',
    complaint: 'Extreme fatigue, pale fingernails and inner eyelids, gets breathless climbing school stairs.',
    correctNutrientId: 'iron',
    diagnosis: 'Anaemia (Iron Deficiency)',
    cureRecommendation: 'Spinach, Jaggery (Gur), Pomegranates, and Beetroot.',
    icon: '👧'
  }
];

export default function NutrientDeficiencyLab({ onBackToDashboard }) {
  const [activeTab, setActiveTab] = useState('catalogue'); // 'catalogue' | 'clinic'
  const [selectedNutrientId, setSelectedNutrientId] = useState('carbs');
  
  // Clinic Game State
  const [currentCaseIdx, setCurrentCaseIdx] = useState(0);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [casesSolved, setCasesSolved] = useState(0);

  const selectedNutrient = NUTRIENT_CATALOGUE.find(n => n.id === selectedNutrientId) || NUTRIENT_CATALOGUE[0];
  const currentCase = CLINIC_CASES[currentCaseIdx];

  const handleDiagnose = (nutrientId) => {
    setSelectedDiagnosis(nutrientId);
    if (nutrientId === currentCase.correctNutrientId) {
      setFeedback({
        type: 'success',
        msg: `Correct! ${currentCase.patientName} has ${currentCase.diagnosis}. Treatment: ${currentCase.cureRecommendation}`
      });
      setCasesSolved(prev => prev + 1);
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
    } else {
      setFeedback({
        type: 'error',
        msg: `Not quite. Review the symptoms: "${currentCase.complaint}". What nutrient specifically prevents this?`
      });
    }
  };

  const handleNextCase = () => {
    setSelectedDiagnosis('');
    setFeedback(null);
    if (currentCaseIdx < CLINIC_CASES.length - 1) {
      setCurrentCaseIdx(prev => prev + 1);
    } else {
      setCurrentCaseIdx(0);
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
              <span style={{ fontSize: '1.3rem' }}>🧪</span>
              <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#FDE68A' }}>
                Activity 3.4: Nutrients & Deficiency Diseases Explorer
              </h2>
            </div>
            <span style={{ fontSize: '0.8rem', color: '#A7F3D0' }}>
              Food Components, Biological Functions & Doctor's Diagnostic Clinic
            </span>
          </div>
        </div>

        {/* Tab switch */}
        <div style={{
          display: 'flex',
          gap: '0.4rem',
          background: 'rgba(0, 0, 0, 0.3)',
          padding: '0.3rem',
          borderRadius: '12px',
          border: '1px solid rgba(167, 243, 208, 0.2)'
        }}>
          <button
            onClick={() => setActiveTab('catalogue')}
            style={{
              padding: '0.45rem 0.9rem',
              borderRadius: '9px',
              border: 'none',
              background: activeTab === 'catalogue' ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)' : 'transparent',
              color: activeTab === 'catalogue' ? '#FFFFFF' : '#A7F3D0',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer'
            }}
          >
            📚 Nutrients Directory
          </button>
          <button
            onClick={() => setActiveTab('clinic')}
            style={{
              padding: '0.45rem 0.9rem',
              borderRadius: '9px',
              border: 'none',
              background: activeTab === 'clinic' ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' : 'transparent',
              color: activeTab === 'clinic' ? '#FFFFFF' : '#A7F3D0',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer'
            }}
          >
            🩺 Doctor's Clinic ({casesSolved} Solved)
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div style={{
        flex: 1,
        padding: '2rem',
        maxWidth: '1280px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        {activeTab === 'catalogue' ? (
          /* Directory View */
          <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: '2rem' }}>
            {/* Left Column: Grid of Nutrients */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              maxHeight: '680px',
              overflowY: 'auto',
              paddingRight: '0.5rem'
            }}>
              {NUTRIENT_CATALOGUE.map((item) => {
                const isSelected = selectedNutrientId === item.id;
                return (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.01, x: 2 }}
                    onClick={() => setSelectedNutrientId(item.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.75rem 1rem',
                      borderRadius: '14px',
                      border: isSelected ? `2px solid ${item.color}` : '1px solid rgba(167, 243, 208, 0.2)',
                      background: isSelected 
                        ? 'linear-gradient(135deg, rgba(6, 78, 59, 0.85) 0%, rgba(2, 44, 34, 0.95) 100%)' 
                        : 'rgba(6, 78, 59, 0.35)',
                      cursor: 'pointer',
                      boxShadow: isSelected ? `0 6px 18px ${item.color}33` : 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.92rem', fontWeight: 800, color: isSelected ? '#FDE68A' : '#FFFFFF' }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: item.color, fontWeight: 600 }}>
                        {item.category}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Right Column: Detailed Nutrient Profile Card */}
            <div style={{
              borderRadius: '24px',
              background: 'linear-gradient(145deg, rgba(6, 78, 59, 0.5) 0%, rgba(2, 44, 34, 0.75) 100%)',
              border: `2px solid ${selectedNutrient.color}`,
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '60px',
                  height: '60px',
                  borderRadius: '16px',
                  background: `linear-gradient(135deg, ${selectedNutrient.color} 0%, #064E3B 100%)`,
                  fontSize: '2.2rem',
                  boxShadow: `0 8px 24px ${selectedNutrient.color}44`
                }}>
                  {selectedNutrient.icon}
                </span>
                <div>
                  <span style={{
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    color: selectedNutrient.color
                  }}>
                    {selectedNutrient.category}
                  </span>
                  <h3 style={{ margin: 0, fontSize: '1.8rem', color: '#FDE68A' }}>
                    {selectedNutrient.name}
                  </h3>
                </div>
              </div>

              {/* Biological Role */}
              <div style={{
                background: 'rgba(0, 0, 0, 0.25)',
                borderRadius: '16px',
                border: '1px solid rgba(167, 243, 208, 0.2)',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem'
              }}>
                <span style={{ fontSize: '0.85rem', color: '#A7F3D0', fontWeight: 700 }}>
                  🧬 Role in the Human Body:
                </span>
                <p style={{ margin: 0, fontSize: '0.95rem', color: '#FFFFFF', lineHeight: '1.6' }}>
                  {selectedNutrient.role}
                </p>
              </div>

              {/* Sources */}
              <div style={{
                background: 'rgba(0, 0, 0, 0.25)',
                borderRadius: '16px',
                border: '1px solid rgba(167, 243, 208, 0.2)',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem'
              }}>
                <span style={{ fontSize: '0.85rem', color: '#FCD34D', fontWeight: 700 }}>
                  🥗 Rich Food Sources (NCERT Fig. 3.5):
                </span>
                <p style={{ margin: 0, fontSize: '0.95rem', color: '#FFFFFF', lineHeight: '1.6' }}>
                  {selectedNutrient.sources}
                </p>
              </div>

              {/* Deficiency Warning */}
              <div style={{
                background: 'rgba(239, 68, 68, 0.12)',
                borderRadius: '16px',
                border: '1.5px solid rgba(239, 68, 68, 0.35)',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#FCA5A5', fontSize: '0.85rem', fontWeight: 700 }}>
                  <ShieldAlert size={16} /> Deficiency Disease & Symptoms:
                </div>
                <p style={{ margin: 0, fontSize: '0.92rem', color: '#FEE2E2', lineHeight: '1.6' }}>
                  {selectedNutrient.deficiency}
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Clinic Diagnostic Mini-Game View */
          <div style={{
            maxWidth: '850px',
            margin: '0 auto',
            borderRadius: '24px',
            background: 'linear-gradient(145deg, rgba(6, 78, 59, 0.6) 0%, rgba(2, 44, 34, 0.85) 100%)',
            border: '2px solid rgba(167, 243, 208, 0.3)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.35)',
            padding: '2.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Stethoscope size={24} style={{ color: '#FBBF24' }} />
                <h3 style={{ margin: 0, fontSize: '1.4rem', color: '#FDE68A' }}>
                  Patient Case #{currentCaseIdx + 1}: {currentCase.patientName}
                </h3>
              </div>
              <span style={{
                fontSize: '0.8rem',
                color: '#A7F3D0',
                background: 'rgba(16, 185, 129, 0.2)',
                padding: '0.3rem 0.75rem',
                borderRadius: '8px'
              }}>
                Case {currentCaseIdx + 1} of {CLINIC_CASES.length}
              </span>
            </div>

            {/* Patient Symptoms Box */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '16px',
              border: '1.5px solid rgba(167, 243, 208, 0.25)',
              padding: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem'
            }}>
              <span style={{ fontSize: '3rem' }}>{currentCase.icon}</span>
              <div>
                <span style={{ fontSize: '0.78rem', color: '#FCD34D', fontWeight: 700, textTransform: 'uppercase' }}>
                  Observed Symptoms & Medical History:
                </span>
                <p style={{ margin: '0.4rem 0 0 0', fontSize: '1.05rem', color: '#FFFFFF', lineHeight: '1.6' }}>
                  "{currentCase.complaint}"
                </p>
              </div>
            </div>

            {/* Question Prompt */}
            <div>
              <label style={{ fontSize: '0.9rem', color: '#A7F3D0', fontWeight: 700 }}>
                Doctor, which nutrient or component is urgently lacking in this patient's diet?
              </label>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0.65rem',
                marginTop: '0.75rem'
              }}>
                {NUTRIENT_CATALOGUE.map(n => (
                  <button
                    key={n.id}
                    onClick={() => handleDiagnose(n.id)}
                    style={{
                      padding: '0.65rem 0.8rem',
                      borderRadius: '10px',
                      border: selectedDiagnosis === n.id ? `2px solid ${n.color}` : '1px solid rgba(167, 243, 208, 0.25)',
                      background: selectedDiagnosis === n.id ? 'rgba(6, 78, 59, 0.9)' : 'rgba(6, 78, 59, 0.4)',
                      color: selectedDiagnosis === n.id ? '#FDE68A' : '#FFFFFF',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    <span>{n.icon}</span>
                    <span>{n.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Diagnostic Feedback */}
            <AnimatePresence>
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{
                    borderRadius: '14px',
                    padding: '1.25rem',
                    background: feedback.type === 'success' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                    border: `1.5px solid ${feedback.type === 'success' ? '#10B981' : '#EF4444'}`,
                    color: feedback.type === 'success' ? '#D1FAE5' : '#FEE2E2',
                    fontSize: '0.92rem',
                    lineHeight: '1.6'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, marginBottom: '0.3rem' }}>
                    {feedback.type === 'success' ? <CheckCircle size={18} color="#34D399" /> : <AlertCircle size={18} color="#EF4444" />}
                    <span>{feedback.type === 'success' ? 'Accurate Diagnosis!' : 'Check Symptom Details'}</span>
                  </div>
                  {feedback.msg}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Next Patient Button */}
            {feedback && feedback.type === 'success' && (
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={handleNextCase}
                  style={{
                    padding: '0.75rem 1.75rem',
                    borderRadius: '12px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                    color: '#FFFFFF',
                    fontWeight: 800,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(217, 119, 6, 0.35)'
                  }}
                >
                  Next Patient Case →
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
