import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Table, Check, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { speakNaturalIndianMale, stopNarration } from '../../../../services/elevenLabsService';

const TABLE_2_5_DATA = [
  { sNo: 1, animal: 'Ant', movement: 'Crawls and walks', bodyPart: 'Six articulated jointed legs', habit: 'Colonial ground foraging' },
  { sNo: 2, animal: 'Goat', movement: 'Walks, runs and jumps', bodyPart: 'Four muscular legs with hooves', habit: 'Grassland grazing' },
  { sNo: 3, animal: 'Pigeon', movement: 'Walks on ground, flies in air', bodyPart: 'Two perching legs and two feathered wings', habit: 'Aerial seed foraging' },
  { sNo: 4, animal: 'Housefly', movement: 'Walks and flies rapidly', bodyPart: 'Six legs with suction pads and wings', habit: 'Sensory scavenger' },
  { sNo: 5, animal: 'Fish (Mahseer)', movement: 'Swims and maneuvers in water', bodyPart: 'Pectoral, dorsal and caudal fins', habit: 'Freshwater pelagic' },
  { sNo: 6, animal: 'Frog', movement: 'Hops on land, swims in water', bodyPart: 'Strong hind legs with webbed toes', habit: 'Amphibious wetland' },
  { sNo: 7, animal: 'Snake', movement: 'Slithers and crawls', bodyPart: 'Entire muscular body with ventral scales', habit: 'Subterranean / Ground' }
];

const TABLE_2_6_DATA = [
  { region: 'In the Desert', plants: 'Cactus (fleshy stem, spines), Date Palm, Babool', animals: 'Camel (1 hump), Desert Monitor Lizard, Kangaroo Rat', conditions: 'Intense daytime heat, freezing night, scarce water' },
  { region: 'On Mountains', plants: 'Deodar (conical shape), Pine, Nilgiri/Sikkim Rhododendron', animals: 'Mountain Goat (sturdy hooves), Snow Leopard, Yak', conditions: 'Frequent snowfall, sub-zero winters, gale winds' },
  { region: 'In the Ocean', plants: 'Marine Algae, Seaweed, Seagrass Meadows', animals: 'Blue Whale, Tuna Fish, Sea Turtles, Corals', conditions: 'High salinity, hydrostatic pressure, buoyant water' },
  { region: 'In the Forest', plants: 'Sal, Teak, Banyan, Shola Evergreen Trees', animals: 'Bengal Tiger, Spider Monkey, Hornbill, Elephant', conditions: 'Dense canopy shade, high rainfall, rich leaf litter' }
];

export default function Tables2_5_2_6_Lab({ onBackToDashboard, onNextSubModule, onOpenActivity2_10 }) {
  const [activeTable, setActiveTable] = useState('2.5'); // '2.5' | '2.6'
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    return () => {
      stopNarration();
    };
  }, [activeTable]);

  const handleReadAloud = (text) => {
    if (isSpeaking) {
      stopNarration();
      setIsSpeaking(false);
      return;
    }
    setIsSpeaking(true);
    speakNaturalIndianMale({
      text,
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false)
    });
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      background: 'rgba(15, 23, 42, 0.50)',
      backdropFilter: 'blur(4px)',
      WebkitBackdropFilter: 'blur(2px)',
      borderRadius: '20px',
      border: '2px solid #D4AF37',
      padding: '16px 22px 14px',
      boxSizing: 'border-box',
      overflow: 'hidden',
      boxShadow: '0 16px 45px rgba(0, 0, 0, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.30)'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '2px solid rgba(212, 175, 55, 0.45)',
        paddingBottom: '12px',
        flexShrink: 0
      }}>
        <div>
          <div style={{ fontSize: '16px', fontWeight: '900', letterSpacing: '0.06em', color: '#FDE68A', textTransform: 'uppercase', marginBottom: '3px' }}>
            Activities 2.9 &amp; 2.10 · Observation Registers (Pages 22 &amp; 24)
          </div>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '900', color: '#FBBF24', lineHeight: 1.2, fontFamily: '"Fraunces", Georgia, serif' }}>
            📋 Observation Tables 2.5 &amp; 2.6
          </h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ display: 'flex', background: 'rgba(15, 23, 42, 0.45)', padding: '4px', borderRadius: '12px', border: '1.8px solid #D4AF37', gap: '4px' }}>
            <button
              onClick={() => setActiveTable('2.5')}
              style={{
                padding: '7px 18px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '800',
                border: 'none',
                cursor: 'pointer',
                background: activeTable === '2.5' ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' : 'transparent',
                color: activeTable === '2.5' ? '#ffffff' : '#14452F',
                transition: 'all 0.15s ease',
                boxShadow: activeTable === '2.5' ? '0 2px 8px rgba(20, 69, 47, 0.3)' : 'none'
              }}
            >
              Table 2.5 (Locomotion)
            </button>
            <button
              onClick={() => setActiveTable('2.6')}
              style={{
                padding: '7px 18px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '800',
                border: 'none',
                cursor: 'pointer',
                background: activeTable === '2.6' ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' : 'transparent',
                color: activeTable === '2.6' ? '#ffffff' : '#14452F',
                transition: 'all 0.15s ease',
                boxShadow: activeTable === '2.6' ? '0 2px 8px rgba(20, 69, 47, 0.3)' : 'none'
              }}
            >
              Table 2.6 (Surroundings)
            </button>
          </div>

          <button
            onClick={() => handleReadAloud(
              activeTable === '2.5'
                ? "Table 2.5, Movements in animals and their body parts involved. Ants use six legs to crawl. Goats use four legs to walk and jump. Pigeons use legs and wings. Fishes swim using fins. Different animals use specialized body structures depending on their mode of locomotion."
                : "Table 2.6, Animals and plants found in different surroundings. Desert organisms like cactus and camels conserve water. Mountain organisms like deodar trees and mountain goats withstand snow and cold. Marine organisms are adapted to saline water."
            )}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 16px',
              background: isSpeaking ? '#fee2e2' : 'rgba(250, 248, 242, 0.55)',
              border: `1.8px solid ${isSpeaking ? '#ef4444' : '#14452F'}`,
              borderRadius: '10px',
              color: isSpeaking ? '#991b1b' : '#14452F',
              fontWeight: '800',
              fontSize: '16px',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
            }}
          >
            {isSpeaking ? <VolumeX size={18} /> : <Volume2 size={18} />}
            <span>{isSpeaking ? 'Stop' : 'Listen'}</span>
          </button>
        </div>
      </div>

      {/* Main Table Display Stage */}
      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', padding: '10px 0', overflow: 'hidden' }}>
        {/* ============================================================ */}
        {/* TABLE 2.5: MOVEMENTS IN ANIMALS                              */}
        {/* ============================================================ */}
        {activeTable === '2.5' && (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', overflow: 'hidden' }}>
            <div style={{ marginBottom: '8px', flexShrink: 0 }}>
              <div style={{ fontSize: '16px', fontWeight: '800', color: '#F8FAFC', textTransform: 'uppercase' }}>
                Activity 2.9 · Page 22
              </div>
              <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '900', color: '#F8FAFC', fontFamily: '"Fraunces", Georgia, serif' }}>
                Table 2.5: Movements in Animals and Their Body Parts Involved
              </h3>
            </div>

            <div style={{
              flex: 1,
              minHeight: 0,
              background: 'rgba(15, 23, 42, 0.50)',
              border: '2px solid #D4AF37',
              borderRadius: '14px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '16px' }}>
                <thead>
                  <tr style={{ background: 'rgba(15, 23, 42, 0.45)', borderBottom: '2px solid rgba(212, 175, 55, 0.45)', color: '#F8FAFC', fontWeight: '900', fontSize: '16px' }}>
                    <th style={{ padding: '10px 14px', width: '70px' }}>S.No.</th>
                    <th style={{ padding: '10px 14px' }}>Name of Animal</th>
                    <th style={{ padding: '10px 14px' }}>Type of Movement</th>
                    <th style={{ padding: '10px 14px' }}>Body Parts Used for Movement</th>
                    <th style={{ padding: '10px 14px' }}>Ecological Niche</th>
                  </tr>
                </thead>
                <tbody>
                  {TABLE_2_5_DATA.map((row) => (
                    <tr key={row.sNo} style={{ borderBottom: '1px solid #EDE7D8', background: row.sNo % 2 === 0 ? '#F5F1E5' : 'rgba(250, 248, 242, 0.55)' }}>
                      <td style={{ padding: '10px 14px', fontWeight: '800', color: '#F8FAFC' }}>{row.sNo}</td>
                      <td style={{ padding: '10px 14px', fontWeight: '900', color: '#F8FAFC' }}>{row.animal}</td>
                      <td style={{ padding: '10px 14px', color: '#2A3B2C', fontWeight: '600' }}>{row.movement}</td>
                      <td style={{ padding: '10px 14px', color: '#F8FAFC', fontWeight: '700' }}>{row.bodyPart}</td>
                      <td style={{ padding: '10px 14px', color: '#2A3B2C', fontWeight: '600' }}>{row.habit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ background: 'rgba(15, 23, 42, 0.45)', border: '1.8px solid #D4AF37', borderRadius: '12px', padding: '10px 16px', marginTop: '10px', flexShrink: 0 }}>
              <span style={{ fontSize: '16px', fontWeight: '900', color: '#F8FAFC' }}>
                📌 Textbook Inference (Page 22):
              </span>
              <span style={{ fontSize: '16px', color: '#2A3B2C', marginLeft: '8px', fontWeight: '700', lineHeight: 1.5 }}>
                Different animals have diverse types of movement (flying, running, crawling, walking, hopping, swimming) and possess specialized anatomical organs suited to their habitats.
              </span>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TABLE 2.6: ANIMALS AND PLANTS IN DIFFERENT SURROUNDINGS      */}
        {/* ============================================================ */}
        {activeTable === '2.6' && (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', overflow: 'hidden' }}>
            <div style={{ marginBottom: '8px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '16px', fontWeight: '800', color: '#F8FAFC', textTransform: 'uppercase' }}>
                  Activity 2.10 · Page 24
                </div>
                <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '900', color: '#F8FAFC', fontFamily: '"Fraunces", Georgia, serif' }}>
                  Table 2.6: Animals and Plants Found in Different Surroundings
                </h3>
              </div>
              <button
                onClick={() => onOpenActivity2_10 ? onOpenActivity2_10() : onNextSubModule()}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 18px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                  color: '#ffffff',
                  border: '1.5px solid #34D399',
                  fontSize: '15px',
                  fontWeight: '900',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(5, 150, 105, 0.35)',
                  transition: 'transform 0.15s ease'
                }}
              >
                <span>Launch Activity 2.10 Simulation</span>
                <ArrowRight size={16} />
              </button>
            </div>

            <div style={{
              flex: 1,
              minHeight: 0,
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '12px',
              alignItems: 'stretch',
              overflowY: 'auto'
            }}>
              {TABLE_2_6_DATA.map((env, eIdx) => (
                <div
                  key={eIdx}
                  style={{
                    background: 'rgba(15, 23, 42, 0.50)',
                    border: '2px solid #D4AF37',
                    borderRadius: '14px',
                    padding: '14px 18px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 4px 12px rgba(20, 69, 47, 0.05)'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <h4 style={{ margin: 0, fontSize: '20px', fontWeight: '900', color: '#F8FAFC', fontFamily: '"Fraunces", Georgia, serif' }}>
                        {env.region}
                      </h4>
                      <span style={{ fontSize: '16px', background: '#EDE7D8', color: '#F8FAFC', fontWeight: '800', padding: '3px 10px', borderRadius: '8px', border: '1px solid #14452F' }}>
                        Biome {eIdx + 1}
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '6px' }}>
                      <div style={{ fontSize: '16px', color: '#2A3B2C', lineHeight: 1.45 }}>
                        <b style={{ color: '#F8FAFC' }}>Flora (Plants):</b> {env.plants}
                      </div>
                      <div style={{ fontSize: '16px', color: '#2A3B2C', lineHeight: 1.45 }}>
                        <b style={{ color: '#F8FAFC' }}>Fauna (Animals):</b> {env.animals}
                      </div>
                      <div style={{ fontSize: '16px', color: '#2A3B2C', fontStyle: 'italic', lineHeight: 1.4 }}>
                        <b style={{ color: '#F8FAFC' }}>Environmental Condition:</b> {env.conditions}
                      </div>
                    </div>
                  </div>

                  <div style={{ background: '#EDE7D8', border: '1px solid #14452F', padding: '5px 12px', borderRadius: '8px', fontSize: '16px', color: '#F8FAFC', fontWeight: '800', marginTop: '10px', alignSelf: 'flex-start' }}>
                    ✓ Biome Register Entry
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: 'rgba(15, 23, 42, 0.45)', border: '1.8px solid #D4AF37', borderRadius: '12px', padding: '10px 16px', marginTop: '10px', flexShrink: 0 }}>
              <span style={{ fontSize: '16px', fontWeight: '900', color: '#F8FAFC' }}>
                📌 Textbook Inference (Page 24):
              </span>
              <span style={{ fontSize: '16px', color: '#2A3B2C', marginLeft: '8px', fontWeight: '700', lineHeight: 1.5 }}>
                Plants and animals found in one kind of region are distinctly different from those in another, because each ecosystem poses unique environmental conditions.
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Footer Navigation Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: '2px solid rgba(212, 175, 55, 0.45)',
        paddingTop: '10px',
        flexShrink: 0
      }}>
        <button
          onClick={onBackToDashboard}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            background: 'rgba(15, 23, 42, 0.50)',
            border: '1.8px solid #D4AF37',
            borderRadius: '10px',
            color: '#F8FAFC',
            fontWeight: '800',
            fontSize: '16px',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
          }}
        >
          <ArrowLeft size={18} color="#14452F" />
          <span>Back to Field Mission</span>
        </button>

        <div style={{ fontSize: '16px', color: '#F8FAFC', fontWeight: '800' }}>
          ✓ Verified Tables 2.5 &amp; 2.6 Data Registries
        </div>

        <button
          onClick={onNextSubModule}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 20px',
            background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
            borderRadius: '10px',
            color: '#ffffff',
            fontWeight: '900',
            fontSize: '16px',
            border: '1.8px solid #FDE68A',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(20, 69, 47, 0.35)'
          }}
        >
          <span>Adaptations Lab ➔</span>
        </button>
      </div>
    </div>
  );
}
