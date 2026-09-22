import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, PlayCircle, Leaf, Clover, Flower2, TreePine, Search, Lightbulb, Brain, Users, Heart, RotateCcw } from 'lucide-react';
import introVideoSrc from '../../../../assets/activity29_intro.mp4';
import animalMovementsVideoSrc from '../../../../assets/activity29_animal_movements.mp4';
import antVideo from '../../../../assets/activity29_ant.mp4';
import goatVideo from '../../../../assets/activity29_goat.mp4';
import pigeonVideo from '../../../../assets/activity29_pigeon.mp4';
import houseflyVideo from '../../../../assets/activity29_housefly.mp4';
import fishVideo from '../../../../assets/activity29_fish.mp4';

import antImg from '../../../../assets/activity29/ant_thumbnail_1789987932035.jpg';
import goatImg from '../../../../assets/activity29/goat_thumbnail_1789987944795.jpg';
import pigeonImg from '../../../../assets/activity29/pigeon_thumbnail_1789987956446.jpg';
import houseflyImg from '../../../../assets/activity29/housefly_thumbnail_1789987971650.jpg';
import fishImg from '../../../../assets/activity29/fish_thumbnail_1789987984685.jpg';

const ANIMAL_DATA = [
  { id: 'ant', image: antImg, name: 'Ant', moveType: 'Walks', bodyPart: 'Legs', videoSrc: antVideo, explanation: "Ants have six strong legs equipped with tiny claws, allowing them to walk smoothly even on walls and ceilings!" },
  { id: 'goat', image: goatImg, name: 'Goat', moveType: 'Walks and jumps', bodyPart: 'Legs', videoSrc: goatVideo, explanation: "Goats use their four muscular legs to walk, run, and expertly jump across rocky terrains." },
  { id: 'pigeon', image: pigeonImg, name: 'Pigeon', moveType: 'Walks and flies', bodyPart: 'Legs and wings', videoSrc: pigeonVideo, explanation: "A pigeon can walk on the ground using its two feet and soar through the air by flapping its powerful wings." },
  { id: 'housefly', image: houseflyImg, name: 'Housefly', moveType: 'Walks and flies', bodyPart: 'Legs and wings', videoSrc: houseflyVideo, explanation: "Houseflies rapidly beat their wings to fly and use their six specialized legs to walk on any surface." },
  { id: 'fish', image: fishImg, name: 'Fish', moveType: 'Swims', bodyPart: 'Fins', videoSrc: fishVideo, explanation: "Fish glide effortlessly through water using their fins to steer and their tail to propel themselves forward." }
];

export default function NewActivity29({ onBackToDashboard, onNextActivity }) {
  const [page, setPage] = useState(1);
  const [videoEnded, setVideoEnded] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(ANIMAL_DATA[0]);



  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      fontFamily: '"Plus Jakarta Sans", "Inter", system-ui, sans-serif'
    }}>
      {/* PAGE 1 */}
      {page === 1 && (
        <>
          <video 
            src={introVideoSrc}
            autoPlay 
            controls={false}
            onEnded={() => setVideoEnded(true)}
            style={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 1
            }}
          />

          <div style={{
            position: 'relative',
            zIndex: 3,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: 'clamp(10px, 1.5vh, 16px) clamp(14px, 1.8vw, 20px)',
            boxSizing: 'border-box',
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              background: 'rgba(15, 23, 42, 0.75)', 
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1.5px solid rgba(255, 255, 255, 0.25)',
              borderRadius: '12px',
              padding: '10px 16px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
              alignSelf: 'flex-start',
              marginBottom: '20px'
            }}>
              <button
                onClick={onBackToDashboard}
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  border: '1.5px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '8px',
                  padding: '6px 14px',
                  color: '#F1F5F9',
                  fontSize: '16px',
                  fontWeight: '800',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <ArrowLeft size={18} /> Back
              </button>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '800', color: '#FDE68A', textTransform: 'uppercase' }}>
                  Activity 2.9
                </div>
                <h1 style={{ margin: '0', fontSize: '20px', fontWeight: '900', color: '#FBBF24', fontFamily: '"Fraunces", Georgia, serif' }}>
                  Animal Movement Observation
                </h1>
              </div>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              {videoEnded && (
                <div style={{ 
                  textAlign: 'center', 
                  animation: 'fadeIn 1s',
                  background: 'rgba(250, 248, 242, 0.90)', 
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  padding: '30px 40px',
                  borderRadius: '20px',
                  border: '2px solid #14452F', 
                  boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
                  maxWidth: '750px',
                  color: '#064E3B' 
                }}>
                  <p style={{ fontSize: '24px', lineHeight: '1.6', margin: '0 auto', fontWeight: '600' }}>
                    Welcome to the new Activity 2.9! Animals live in various habitats and have different ways of moving around. 
                  </p>
                  <h3 style={{ fontSize: '30px', color: '#B45309', margin: '24px 0 0 0', fontWeight: '900', fontFamily: '"Fraunces", Georgia, serif' }}>
                    Observe the animals. How do they move?
                  </h3>
                </div>
              )}
            </div>

            {videoEnded && (
              <div style={{ position: 'absolute', bottom: '30px', right: '40px', animation: 'fadeIn 1s' }}>
                <button
                  onClick={() => setPage(2)}
                  style={{
                    background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                    color: '#FFFFFF',
                    border: '1.8px solid #FDE68A',
                    padding: '12px 32px',
                    borderRadius: '12px',
                    fontSize: '20px',
                    fontWeight: '900',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    boxShadow: '0 4px 20px rgba(217, 119, 6, 0.5)'
                  }}
                >
                  Next <ArrowRight size={22} />
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* PAGE 2 */}
      {page === 2 && (
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: 'clamp(10px, 1.5vh, 20px) clamp(14px, 1.8vw, 30px)',
          background: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          boxSizing: 'border-box',
          position: 'relative',
          zIndex: 3
        }}>
          {/* Subtle Decorative Elements */}
          <div style={{ position: 'absolute', top: '15%', left: '5%', opacity: 0.15, pointerEvents: 'none' }}>
            <Leaf size={120} color="#34d399" />
          </div>
          <div style={{ position: 'absolute', bottom: '20%', right: '5%', opacity: 0.15, pointerEvents: 'none', transform: 'rotate(25deg)' }}>
            <Flower2 size={160} color="#fbbf24" />
          </div>
          <div style={{ position: 'absolute', top: '40%', right: '10%', opacity: 0.1, pointerEvents: 'none' }}>
            <Clover size={100} color="#10b981" />
          </div>
          <div style={{ position: 'absolute', bottom: '10%', left: '12%', opacity: 0.15, pointerEvents: 'none', transform: 'rotate(-15deg)' }}>
            <TreePine size={140} color="#6ee7b7" />
          </div>

          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '2px solid rgba(245, 158, 11, 0.35)',
            paddingBottom: '12px',
            flexShrink: 0,
            marginBottom: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                <div style={{ fontSize: '16px', fontWeight: '800', color: '#FDE68A', textTransform: 'uppercase' }}>
                  Activity 2.9 · Page 2
                </div>
                <h1 style={{ margin: '2px 0 0 0', fontSize: '26px', fontWeight: '900', color: '#FBBF24', fontFamily: '"Fraunces", Georgia, serif' }}>
                  Observe Animal Movements
                </h1>
              </div>
            </div>
          </div>

          {/* Animal Selection Tabs - moved closer to content */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '12px', 
            marginBottom: '16px', 
            flexWrap: 'wrap',
            zIndex: 10 
          }}>
            {ANIMAL_DATA.map((animal) => (
              <button
                key={animal.id}
                onClick={() => setSelectedAnimal(animal)}
                style={{
                  background: selectedAnimal.id === animal.id ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' : 'rgba(255, 255, 255, 0.12)',
                  border: selectedAnimal.id === animal.id ? '2px solid #FDE68A' : '2px solid rgba(255, 255, 255, 0.25)',
                  borderRadius: '16px',
                  padding: '12px 28px',
                  color: '#FFFFFF',
                  fontSize: '22px',
                  fontWeight: '800',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'all 0.2s ease',
                  boxShadow: selectedAnimal.id === animal.id ? '0 4px 16px rgba(217, 119, 6, 0.5)' : 'none',
                  transform: selectedAnimal.id === animal.id ? 'scale(1.02)' : 'scale(1)'
                }}
              >
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.6)', flexShrink: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
                  <img src={animal.image} alt={animal.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div> {animal.name}
              </button>
            ))}
          </div>

          {/* Content Area - expanded to fill more space */}
          <div style={{ 
            flex: 1, 
            display: 'flex', 
            gap: '24px', 
            alignItems: 'stretch', 
            justifyContent: 'center',
            maxHeight: 'calc(100vh - 280px)', // ensure it doesn't push buttons out
            zIndex: 10
          }}>
            {/* Video Player - larger area */}
            <div style={{
              flex: 1.8,
              borderRadius: '24px',
              overflow: 'hidden',
              border: '4px solid rgba(253, 230, 138, 0.8)', // Gold tinted border matching theme
              boxShadow: '0 16px 50px rgba(0, 0, 0, 0.6)',
              background: '#000',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <video 
                key={selectedAnimal.id}
                src={selectedAnimal.videoSrc}
                autoPlay 
                loop
                controls={true}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>

            {/* Information Card - larger and balanced */}
            <div style={{
              flex: 1.2,
              background: 'rgba(250, 248, 242, 0.95)',
              border: '2px solid #14452F',
              borderRadius: '24px',
              padding: '36px',
              color: '#064E3B',
              boxShadow: '0 16px 50px rgba(0,0,0,0.5)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '20px'
            }}>
              <h2 style={{ fontSize: '38px', margin: 0, color: '#B45309', fontFamily: '"Fraunces", Georgia, serif', borderBottom: '2px dashed rgba(20, 69, 47, 0.2)', paddingBottom: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', overflow: 'hidden', border: '3px solid #B45309', flexShrink: 0, boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
                  <img src={selectedAnimal.image} alt={selectedAnimal.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div> {selectedAnimal.name}
              </h2>
              
              <div style={{ fontSize: '24px', fontWeight: '800', display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(20, 69, 47, 0.06)', padding: '16px 20px', borderRadius: '16px' }}>
                  <span style={{ color: '#14452F', opacity: 0.85 }}>Movement:</span>
                  <span style={{ color: '#064E3B' }}>{selectedAnimal.moveType}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(20, 69, 47, 0.06)', padding: '16px 20px', borderRadius: '16px' }}>
                  <span style={{ color: '#14452F', opacity: 0.85 }}>Body Parts:</span>
                  <span style={{ color: '#064E3B' }}>{selectedAnimal.bodyPart}</span>
                </div>
              </div>

              <div style={{ 
                marginTop: 'auto', 
                fontSize: '22px', 
                lineHeight: '1.6', 
                fontWeight: '600', 
                background: 'rgba(245, 158, 11, 0.1)', 
                borderLeft: '5px solid #F59E0B', 
                padding: '24px',
                borderRadius: '0 16px 16px 0'
              }}>
                {selectedAnimal.explanation}
              </div>
            </div>
          </div>

          {/* Footer Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', flexShrink: 0, zIndex: 10 }}>
            <button
              onClick={() => setPage(1)}
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                border: '1.5px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '12px',
                padding: '12px 28px',
                color: '#F1F5F9',
                fontSize: '20px',
                fontWeight: '800',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s'
              }}
            >
              <ArrowLeft size={22} /> Back
            </button>
            <button
              onClick={() => setPage(3)}
              style={{
                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                color: '#FFFFFF',
                border: '1.8px solid #FDE68A',
                padding: '12px 36px',
                borderRadius: '12px',
                fontSize: '22px',
                fontWeight: '900',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 4px 20px rgba(217, 119, 6, 0.5)',
                transition: 'all 0.2s'
              }}
            >
              Next <ArrowRight size={24} />
            </button>
          </div>
        </div>
      )}

      {/* PAGE 3 */}
      {page === 3 && (
        <>
          <video 
            src={animalMovementsVideoSrc}
            autoPlay 
            loop
            muted
            controls={false}
            style={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 1
            }}
          />
          <div style={{
            position: 'absolute',
            zIndex: 3,
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            pointerEvents: 'none',
          }}>
            {/* 1. TOP-LEFT */}
            <div style={{
              position: 'absolute', top: '10px', left: '10px',
              display: 'flex', flexDirection: 'column', gap: '0px',
              alignItems: 'center', pointerEvents: 'auto',
              transform: 'rotate(-8deg)'
            }}>
              {/* Main Board */}
              <div style={{
                background: '#d4a373',
                backgroundImage: 'linear-gradient(90deg, #d4a373, #e6ccb2, #d4a373)',
                border: '2px solid #8b5a2b',
                borderRadius: '8px 12px 10px 8px',
                padding: '10px 20px',
                boxShadow: '4px 6px 12px rgba(0,0,0,0.4)',
                position: 'relative',
                color: '#3e2723',
                textAlign: 'center'
              }}>
                {/* Ropes */}
                <div style={{ position: 'absolute', top: '-18px', left: '20%', width: '4px', height: '18px', background: '#5d4037', borderRadius: '2px' }} />
                <div style={{ position: 'absolute', top: '-18px', right: '20%', width: '4px', height: '18px', background: '#5d4037', borderRadius: '2px' }} />
                
                <div style={{ position: 'absolute', bottom: '-10px', left: '-5px', background: '#22c55e', borderRadius: '50%', padding: '4px', transform: 'rotate(-15deg)', border: '2px solid #166534' }}>
                  <Leaf size={18} color="#fff" />
                </div>

                <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '900', fontFamily: '"Fraunces", Georgia, serif', letterSpacing: '1px' }}>Activity 2.9</h2>
                <h3 style={{ margin: '2px 0 0 0', fontSize: '14px', fontWeight: '700' }}>Observe Animal Movements</h3>
              </div>
              {/* Bottom small plank */}
              <div style={{
                background: '#d4a373',
                backgroundImage: 'linear-gradient(90deg, #d4a373, #e6ccb2, #d4a373)',
                border: '2px solid #8b5a2b',
                borderRadius: '4px 6px 4px 6px',
                padding: '4px 12px',
                boxShadow: '2px 4px 8px rgba(0,0,0,0.3)',
                color: '#3e2723',
                fontSize: '11px',
                fontWeight: '800',
                position: 'relative',
                marginTop: '-4px', // tuck under
                zIndex: -1
              }}>
                Nature is always on the move!
              </div>
            </div>



            {/* 3. TOP-RIGHT */}
            <div style={{
              position: 'absolute', top: '20px', right: '30px',
              background: '#d4a373',
              backgroundImage: 'linear-gradient(135deg, #e6ccb2, #d4a373)',
              border: '2px solid #8b5a2b',
              borderRadius: '10px 14px 12px 10px',
              padding: '16px 24px',
              boxShadow: '4px 6px 12px rgba(0,0,0,0.4)',
              transform: 'rotate(3deg)',
              maxWidth: '220px',
              textAlign: 'center',
              pointerEvents: 'auto',
              color: '#3e2723'
            }}>
              <div style={{ position: 'absolute', top: '8px', left: '50%', transform: 'translateX(-50%)', width: '8px', height: '8px', background: '#3e2723', borderRadius: '50%' }} />
              <p style={{ margin: '8px 0 0 0', fontSize: '18px', fontWeight: '800', lineHeight: '1.3', fontFamily: '"Fraunces", Georgia, serif' }}>
                Different<br/>animals move<br/>differently.<br/>Let's explore!
              </p>
              <div style={{ position: 'absolute', bottom: '-15px', right: '-10px', background: '#22c55e', borderRadius: '50%', padding: '4px', transform: 'rotate(20deg)', border: '2px solid #166534' }}>
                <Leaf size={20} color="#fff" />
              </div>
            </div>

            {/* 4. BOTTOM-LEFT */}
            <div style={{
              position: 'absolute', bottom: '10px', left: '10px',
              background: '#fefcf5', // Cream paper
              border: '2px solid #d4a373',
              borderRadius: '4px 16px 16px 4px',
              padding: '12px 16px 12px 32px', // Extra left padding for holes
              boxShadow: '2px 8px 20px rgba(0,0,0,0.3)',
              maxWidth: '240px',
              pointerEvents: 'auto',
              transform: 'rotate(-2deg)'
            }}>
              {/* Notebook binding holes */}
              <div style={{ position: 'absolute', left: '12px', top: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[...Array(5)].map((_, i) => (
                  <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3e2723', boxShadow: 'inset 1px 1px 3px rgba(0,0,0,0.5)' }} />
                ))}
              </div>
              {/* Red line */}
              <div style={{ position: 'absolute', left: '26px', top: '0', bottom: '0', width: '2px', background: 'rgba(220, 38, 38, 0.3)' }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', position: 'relative', zIndex: 2 }}>
                <Lightbulb size={20} color="#d97706" />
                <h3 style={{ margin: 0, fontSize: '18px', color: '#1e293b', fontWeight: '900', fontFamily: '"Fraunces", serif' }}>Think!</h3>
              </div>
              <ul style={{ margin: 0, paddingLeft: '16px', color: '#334155', fontSize: '13px', lineHeight: '1.3', fontWeight: '700', position: 'relative', zIndex: 2 }}>
                <li style={{ marginBottom: '6px' }}>Why do animals move differently?</li>
                <li>How does their surrounding help them?</li>
              </ul>
            </div>

            {/* 5. BOTTOM-RIGHT (Instruction + Next) */}
            <div style={{
              position: 'absolute', bottom: '10px', right: '15px',
              display: 'flex', alignItems: 'center', gap: '16px',
              pointerEvents: 'auto'
            }}>
              {/* Instruction Card */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.75)', backdropFilter: 'blur(10px)',
                borderRadius: '20px', padding: '16px 24px',
                display: 'flex', alignItems: 'center', gap: '16px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                border: '2px solid rgba(255,255,255,0.6)',
                maxWidth: '480px', width: 'max-content'
              }}>
                <div style={{ background: '#3b82f6', padding: '12px', borderRadius: '14px', color: '#fff', flexShrink: 0 }}>
                  <Search size={32} />
                </div>
                <div>
                  <h3 style={{ margin: '0 0 6px 0', fontSize: '20px', color: '#1e3a8a', fontWeight: '900' }}>Look around and think!</h3>
                  <p style={{ margin: 0, fontSize: '16px', color: '#334155', lineHeight: '1.35', fontWeight: '600' }}>
                    Animals move in different ways. Drag each animal to the correct place based on how it moves.
                  </p>
                </div>
              </div>

              {/* Next Button */}
              <button 
                onClick={() => setPage(4)}
                style={{
                  background: '#065f46',
                  color: '#fff',
                  border: '2px solid #34d399',
                  borderRadius: '30px',
                  padding: '12px 24px',
                  fontSize: '16px',
                  fontWeight: '800',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                  transition: 'transform 0.2s',
                }}
              >
                Next <ArrowRight size={18} />
              </button>
            </div>

          </div>
        </>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
