import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, RefreshCw, Sparkles, HelpCircle, Award } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function CategorizationLab({
  discoveredOrganisms,
  onCompleteLab,
  onAddXP
}) {
  const [activeTab, setActiveTab] = useState('plants'); // 'plants' or 'animals'
  
  // State for Table 2.1 (Plants)
  const [plantAnswers, setPlantAnswers] = useState({
    tulsi: '',
    rose_plants: '',
    tree: ''
  });
  
  // State for Table 2.2 (Animals)
  const [animalAnswers, setAnimalAnswers] = useState({
    frog: '',
    squirrel: '',
    butterfly: '',
    monkey: '',
    sparrow: '',
    crow: ''
  });

  const [completedPlantTable, setCompletedPlantTable] = useState(false);
  const [completedAnimalTable, setCompletedAnimalTable] = useState(false);

  // Correct Answer Key
  const plantKeys = {
    tulsi: 'herb',
    rose_plants: 'shrub',
    tree: 'tree'
  };

  const animalKeys = {
    frog: 'both',
    squirrel: 'land',
    butterfly: 'air',
    monkey: 'land',
    sparrow: 'air',
    crow: 'air'
  };

  const handlePlantSelect = (plantId, category) => {
    sounds.playPop();
    const updated = { ...plantAnswers, [plantId]: category };
    setPlantAnswers(updated);

    // Check if table complete
    const isAllCorrect = Object.keys(plantKeys).every(id => updated[id] === plantKeys[id]);
    if (isAllCorrect && !completedPlantTable) {
      setCompletedPlantTable(true);
      sounds.playSuccess();
      onAddXP(75);
    }
  };

  const handleAnimalSelect = (animalId, habitat) => {
    sounds.playPop();
    const updated = { ...animalAnswers, [animalId]: habitat };
    setAnimalAnswers(updated);

    // Check if table complete
    const isAllCorrect = Object.keys(animalKeys).every(id => updated[id] === animalKeys[id]);
    if (isAllCorrect && !completedAnimalTable) {
      setCompletedAnimalTable(true);
      sounds.playSuccess();
      onAddXP(75);
    }
  };

  const handleProceedToQuiz = () => {
    sounds.playStar();
    onCompleteLab();
  };

  return (
    <div style={{
      width: '100%',
      maxWidth: '56rem',
      margin: '1.5rem auto',
      background: 'rgba(250, 248, 242, 0.55)',
      border: '2px solid rgba(20, 69, 47, 0.5)',
      borderRadius: '24px',
      padding: '2rem',
      boxShadow: '0 16px 36px rgba(20, 69, 47, 0.12)',
      color: '#14452F'
    }}>
      
      {/* Header */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        paddingBottom: '1.5rem',
        borderBottom: '2px solid rgba(20, 69, 47, 0.2)'
      }}>
        <div>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '15px',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            background: '#14452F',
            color: '#FFFFFF',
            padding: '4px 12px',
            borderRadius: '999px',
            border: '1.5px solid #10B981'
          }}>
            <Sparkles className="w-4 h-4" /> CBSE Class 6 Table 2.1 & 2.2 Lab
          </span>
          <h2 style={{
            fontFamily: '"Fraunces", Georgia, serif',
            fontSize: '24px',
            fontWeight: 900,
            color: '#14452F',
            margin: '0.5rem 0 0.25rem'
          }}>
            Categorize Nature Discoveries 📊
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#2D3748',
            margin: 0,
            lineHeight: 1.5
          }}>
            Help Prof. Buddy fill the observation tables by classifying stems, heights, and habitats.
          </p>
        </div>

        {/* Tab Selector */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(20, 69, 47, 0.08)',
          padding: '6px',
          borderRadius: '16px',
          border: '1.5px solid #14452F',
          gap: '6px'
        }}>
          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('plants');
            }}
            style={{
              padding: '0.6rem 1.2rem',
              borderRadius: '12px',
              fontWeight: 800,
              fontSize: '16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              border: activeTab === 'plants' ? '1.5px solid #10B981' : '1px solid transparent',
              background: activeTab === 'plants' ? '#14452F' : 'transparent',
              color: activeTab === 'plants' ? '#FFFFFF' : '#14452F',
              boxShadow: activeTab === 'plants' ? '0 4px 12px rgba(20, 69, 47, 0.25)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <span>🌿 Table 2.1: Plants</span>
            {completedPlantTable && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('animals');
            }}
            style={{
              padding: '0.6rem 1.2rem',
              borderRadius: '12px',
              fontWeight: 800,
              fontSize: '16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              border: activeTab === 'animals' ? '1.5px solid #10B981' : '1px solid transparent',
              background: activeTab === 'animals' ? '#14452F' : 'transparent',
              color: activeTab === 'animals' ? '#FFFFFF' : '#14452F',
              boxShadow: activeTab === 'animals' ? '0 4px 12px rgba(20, 69, 47, 0.25)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <span>🐾 Table 2.2: Animals</span>
            {completedAnimalTable && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
          </button>
        </div>
      </div>

      {/* Tab 1: Table 2.1 Plants */}
      {activeTab === 'plants' && (
        <div style={{ padding: '1.5rem 0', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{
            background: 'rgba(20, 69, 47, 0.08)',
            border: '1.5px solid #14452F',
            padding: '1rem 1.25rem',
            borderRadius: '16px',
            fontSize: '16px',
            color: '#14452F',
            lineHeight: 1.5
          }}>
            💡 <strong>Guide:</strong> Classify each plant into <strong>Herb</strong> (soft stem), <strong>Shrub</strong> (woody, multiple stems), or <strong>Tree</strong> (thick trunk).
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            {/* Tulsi */}
            <div style={{
              background: 'rgba(250, 248, 242, 0.55)',
              border: '1.8px solid #14452F',
              borderRadius: '18px',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 4px 14px rgba(20, 69, 47, 0.08)'
            }}>
              <div style={{ textAlign: 'center', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(20, 69, 47, 0.15)' }}>
                <span style={{ fontSize: '2.5rem' }}>🌿</span>
                <h3 style={{ fontFamily: '"Fraunces", Georgia, serif', fontWeight: 800, fontSize: '18px', color: '#14452F', margin: '0.5rem 0 0.25rem' }}>Tulsi &amp; Soft Herbs</h3>
                <p style={{ fontSize: '16px', color: '#4A5568', margin: 0 }}>Stem: Soft &amp; tender green stem</p>
              </div>

              <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {['herb', 'shrub', 'tree'].map((cat) => {
                  const selected = plantAnswers.tulsi === cat;
                  const isCorrect = cat === 'herb';
                  return (
                    <button
                      key={cat}
                      onClick={() => handlePlantSelect('tulsi', cat)}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.75rem',
                        borderRadius: '12px',
                        fontSize: '16px',
                        fontWeight: 800,
                        textTransform: 'capitalize',
                        cursor: 'pointer',
                        border: selected ? (isCorrect ? '1.8px solid #10B981' : '1.8px solid #EF4444') : '1.5px solid rgba(20, 69, 47, 0.3)',
                        background: selected ? (isCorrect ? '#14452F' : '#DC2626') : 'rgba(20, 69, 47, 0.06)',
                        color: selected ? '#FFFFFF' : '#14452F',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {cat === 'herb' ? '🌱 Herb (Soft)' : cat === 'shrub' ? '🌳 Shrub (Bushy)' : '🌲 Tree (Trunk)'}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hibiscus / Rose */}
            <div style={{
              background: 'rgba(250, 248, 242, 0.55)',
              border: '1.8px solid #14452F',
              borderRadius: '18px',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 4px 14px rgba(20, 69, 47, 0.08)'
            }}>
              <div style={{ textAlign: 'center', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(20, 69, 47, 0.15)' }}>
                <span style={{ fontSize: '2.5rem' }}>🌺</span>
                <h3 style={{ fontFamily: '"Fraunces", Georgia, serif', fontWeight: 800, fontSize: '18px', color: '#14452F', margin: '0.5rem 0 0.25rem' }}>Rose &amp; Hibiscus</h3>
                <p style={{ fontSize: '16px', color: '#4A5568', margin: 0 }}>Stem: Hard woody stems branching near ground</p>
              </div>

              <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {['herb', 'shrub', 'tree'].map((cat) => {
                  const selected = plantAnswers.rose_plants === cat;
                  const isCorrect = cat === 'shrub';
                  return (
                    <button
                      key={cat}
                      onClick={() => handlePlantSelect('rose_plants', cat)}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.75rem',
                        borderRadius: '12px',
                        fontSize: '16px',
                        fontWeight: 800,
                        textTransform: 'capitalize',
                        cursor: 'pointer',
                        border: selected ? (isCorrect ? '1.8px solid #10B981' : '1.8px solid #EF4444') : '1.5px solid rgba(20, 69, 47, 0.3)',
                        background: selected ? (isCorrect ? '#14452F' : '#DC2626') : 'rgba(20, 69, 47, 0.06)',
                        color: selected ? '#FFFFFF' : '#14452F',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {cat === 'herb' ? '🌱 Herb (Soft)' : cat === 'shrub' ? '🌳 Shrub (Bushy)' : '🌲 Tree (Trunk)'}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tree */}
            <div style={{
              background: 'rgba(250, 248, 242, 0.55)',
              border: '1.8px solid #14452F',
              borderRadius: '18px',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 4px 14px rgba(20, 69, 47, 0.08)'
            }}>
              <div style={{ textAlign: 'center', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(20, 69, 47, 0.15)' }}>
                <span style={{ fontSize: '2.5rem' }}>🌳</span>
                <h3 style={{ fontFamily: '"Fraunces", Georgia, serif', fontWeight: 800, fontSize: '18px', color: '#14452F', margin: '0.5rem 0 0.25rem' }}>Banyan &amp; Mango</h3>
                <p style={{ fontSize: '16px', color: '#4A5568', margin: 0 }}>Stem: Very thick main brown trunk</p>
              </div>

              <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {['herb', 'shrub', 'tree'].map((cat) => {
                  const selected = plantAnswers.tree === cat;
                  const isCorrect = cat === 'tree';
                  return (
                    <button
                      key={cat}
                      onClick={() => handlePlantSelect('tree', cat)}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.75rem',
                        borderRadius: '12px',
                        fontSize: '16px',
                        fontWeight: 800,
                        textTransform: 'capitalize',
                        cursor: 'pointer',
                        border: selected ? (isCorrect ? '1.8px solid #10B981' : '1.8px solid #EF4444') : '1.5px solid rgba(20, 69, 47, 0.3)',
                        background: selected ? (isCorrect ? '#14452F' : '#DC2626') : 'rgba(20, 69, 47, 0.06)',
                        color: selected ? '#FFFFFF' : '#14452F',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {cat === 'herb' ? '🌱 Herb (Soft)' : cat === 'shrub' ? '🌳 Shrub (Bushy)' : '🌲 Tree (Trunk)'}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Table 2.2 Animals */}
      {activeTab === 'animals' && (
        <div style={{ padding: '1.5rem 0', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{
            background: 'rgba(20, 69, 47, 0.08)',
            border: '1.5px solid #14452F',
            padding: '1rem 1.25rem',
            borderRadius: '16px',
            fontSize: '16px',
            color: '#14452F',
            lineHeight: 1.5
          }}>
            💡 <strong>Guide:</strong> Classify animal habitats into <strong>Land</strong>, <strong>Water</strong>, <strong>Both (Amphibian)</strong>, or <strong>Air (Flying)</strong>.
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1.25rem' }}>
            {[
              { id: 'frog', name: 'Indian Pond Frog', emoji: '🐸', hint: 'Jumps & swims near pond' },
              { id: 'squirrel', name: 'Palm Squirrel', emoji: '🐿️', hint: 'Climbs tree trunks & land' },
              { id: 'butterfly', name: 'Monarch Butterfly', emoji: '🦋', hint: 'Flies between flowers' },
              { id: 'monkey', name: 'Rhesus Monkey', emoji: '🐒', hint: 'Treetops & forest land' },
              { id: 'sparrow', name: 'House Sparrow', emoji: '🐦', hint: 'Perches & flies' },
              { id: 'crow', name: 'House Crow', emoji: '🐦‍⬛', hint: 'Soars in clear sky' }
            ].map((anim) => (
              <div key={anim.id} style={{
                background: 'rgba(250, 248, 242, 0.55)',
                border: '1.8px solid #14452F',
                borderRadius: '18px',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 4px 14px rgba(20, 69, 47, 0.08)'
              }}>
                <div style={{ textAlign: 'center', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(20, 69, 47, 0.15)' }}>
                  <span style={{ fontSize: '2.5rem' }}>{anim.emoji}</span>
                  <h4 style={{ fontFamily: '"Fraunces", Georgia, serif', fontWeight: 800, fontSize: '18px', color: '#14452F', margin: '0.25rem 0 0.1rem' }}>{anim.name}</h4>
                  <p style={{ fontSize: '15px', color: '#4A5568', margin: 0 }}>{anim.hint}</p>
                </div>

                <div style={{ marginTop: '0.75rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  {[
                    { id: 'land', label: '🏞️ Land' },
                    { id: 'water', label: '🌊 Water' },
                    { id: 'both', label: '🐸 Both' },
                    { id: 'air', label: '🪶 Air' }
                  ].map((hab) => {
                    const selected = animalAnswers[anim.id] === hab.id;
                    const isCorrect = animalKeys[anim.id] === hab.id;
                    return (
                      <button
                        key={hab.id}
                        onClick={() => handleAnimalSelect(anim.id, hab.id)}
                        style={{
                          padding: '0.5rem',
                          borderRadius: '10px',
                          fontSize: '15px',
                          fontWeight: 800,
                          cursor: 'pointer',
                          border: selected ? (isCorrect ? '1.8px solid #10B981' : '1.8px solid #EF4444') : '1.5px solid rgba(20, 69, 47, 0.25)',
                          background: selected ? (isCorrect ? '#14452F' : '#DC2626') : 'rgba(20, 69, 47, 0.06)',
                          color: selected ? '#FFFFFF' : '#14452F',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {hab.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer Navigation */}
      <div style={{
        paddingTop: '1.5rem',
        borderTop: '2px solid rgba(20, 69, 47, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', fontWeight: 700, color: '#14452F' }}>
          <Award className="w-5 h-5 text-amber-500" />
          <span>Earn 75 XP per table completed!</span>
        </div>

        <button
          onClick={handleProceedToQuiz}
          disabled={!completedPlantTable && !completedAnimalTable}
          style={{
            padding: '0.75rem 1.6rem',
            borderRadius: '16px',
            fontWeight: 800,
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.15s ease',
            border: completedPlantTable || completedAnimalTable ? '1.5px solid #10B981' : '1.5px solid #CBD5E1',
            background: completedPlantTable || completedAnimalTable
              ? 'linear-gradient(135deg, #14452F 0%, #064E3B 100%)'
              : '#E2E8F0',
            color: completedPlantTable || completedAnimalTable ? '#FFFFFF' : '#94A3B8',
            cursor: completedPlantTable || completedAnimalTable ? 'pointer' : 'not-allowed',
            boxShadow: completedPlantTable || completedAnimalTable ? '0 4px 14px rgba(20, 69, 47, 0.3)' : 'none'
          }}
        >
          <span>Proceed to Science Quiz</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
}
