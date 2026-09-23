import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, PlayCircle, Leaf, Clover, Flower2, TreePine, Search, Lightbulb, Brain, Users, Heart, RotateCcw, Cloud, Zap, Footprints, Waves, CheckCircle2 } from 'lucide-react';
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
import fishImg from '../../../../assets/activity29/fish_thumbnail_real.png';

import birdImg from '../../../../assets/activity29/bird_thumbnail_real.png';
import monkeyImg from '../../../../assets/activity29/monkey_thumbnail_real.png';
import rabbitImg from '../../../../assets/activity29/rabbit_thumbnail_real.png';
import cheetahImg from '../../../../assets/activity29/cheetah_thumbnail_real.png';
import frogImg from '../../../../assets/activity29/frog_thumbnail_real.png';
import page4Bg from '../../../../assets/activity29_page4_bg.jpg';

const ANIMAL_DATA = [
  { id: 'ant', image: antImg, name: 'Ant', moveType: 'Walks', bodyPart: 'Legs', videoSrc: antVideo, explanation: "Ants have six strong legs equipped with tiny claws, allowing them to walk smoothly even on walls and ceilings!" },
  { id: 'goat', image: goatImg, name: 'Goat', moveType: 'Walks and jumps', bodyPart: 'Legs', videoSrc: goatVideo, explanation: "Goats use their four muscular legs to walk, run, and expertly jump across rocky terrains." },
  { id: 'pigeon', image: pigeonImg, name: 'Pigeon', moveType: 'Walks and flies', bodyPart: 'Legs and wings', videoSrc: pigeonVideo, explanation: "A pigeon can walk on the ground using its two feet and soar through the air by flapping its powerful wings." },
  { id: 'housefly', image: houseflyImg, name: 'Housefly', moveType: 'Walks and flies', bodyPart: 'Legs and wings', videoSrc: houseflyVideo, explanation: "Houseflies rapidly beat their wings to fly and use their six specialized legs to walk on any surface." },
  { id: 'fish', image: fishImg, name: 'Fish', moveType: 'Swims', bodyPart: 'Fins', videoSrc: fishVideo, explanation: "Fish glide effortlessly through water using their fins to steer and their tail to propel themselves forward." }
];

const PAGE4_ANIMALS = [
  { id: 'fish', image: fishImg, name: 'Fish', targetZone: 'swims' },
  { id: 'bird', image: birdImg, name: 'Bird', targetZone: 'flies' },
  { id: 'monkey', image: monkeyImg, name: 'Monkey', targetZone: 'climbs' },
  { id: 'rabbit', image: rabbitImg, name: 'Rabbit', targetZone: 'hops' },
  { id: 'cheetah', image: cheetahImg, name: 'Cheetah', targetZone: 'runs' },
  { id: 'frog', image: frogImg, name: 'Frog', targetZone: 'hops' }
];

export default function NewActivity29({ onBackToDashboard, onNextActivity }) {
  const [page, setPage] = useState(1);
  const [videoEnded, setVideoEnded] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(ANIMAL_DATA[0]);

  // --- Page 4 Drag and Drop State ---
  const [availableAnimals, setAvailableAnimals] = useState(PAGE4_ANIMALS);
  const [droppedAnimals, setDroppedAnimals] = useState({
    climbs: [],
    flies: [],
    runs: [],
    hops: [],
    swims: []
  });
  const [isAnswersChecked, setIsAnswersChecked] = useState(false);
  const [showInfoPopup, setShowInfoPopup] = useState(false);

  const handleDragStart = (e, animal) => {
    e.dataTransfer.setData('animalId', animal.id);
  };

  const handleDrop = (e, zoneId) => {
    e.preventDefault();
    if (isAnswersChecked) return;
    const animalId = e.dataTransfer.getData('animalId');
    const animal = availableAnimals.find(a => a.id === animalId);
    
    if (animal) {
      setAvailableAnimals(prev => prev.filter(a => a.id !== animalId));
      setDroppedAnimals(prev => ({
        ...prev,
        [zoneId]: [...prev[zoneId], animal]
      }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const resetActivity = () => {
    setAvailableAnimals(PAGE4_ANIMALS);
    setDroppedAnimals({ climbs: [], flies: [], runs: [], hops: [], swims: [] });
    setIsAnswersChecked(false);
    setShowInfoPopup(false);
  };

  const checkAnswers = () => {
    setIsAnswersChecked(true);
    setShowInfoPopup(true);
  };  return (
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

            {/* 4. BOTTOM-LEFT (Back Button) */}
            <div style={{ 
              position: 'absolute', left: '24px', bottom: '24px',
              pointerEvents: 'auto', zIndex: 30 
            }}>
              <button 
                onClick={() => setPage(2)}
                style={{
                  background: 'white', color: '#334155',
                  border: '2px solid #e2e8f0', borderRadius: '30px',
                  padding: '12px 24px', fontSize: '16px', fontWeight: '800',
                  display: 'flex', alignItems: 'center', gap: '8px',
                  cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                  transition: 'transform 0.2s', margin: 0
                }}
              >
                <ArrowLeft size={18} /> Back
              </button>
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

      {/* ------------------------------------------------------------- */}
      {/* PAGE 4: Nature Landscape (Interactive Area Placeholder)       */}
      {/* ------------------------------------------------------------- */}
      {page === 4 && (
        <>
          {/* Background Image */}
          <div style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            backgroundImage: `url(${page4Bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0
          }} />

          {/* UI Overlay Container */}
          <div style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            zIndex: 10, pointerEvents: 'none', display: 'flex', flexDirection: 'column'
          }}>
            {/* TOP BAR */}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 20px', pointerEvents: 'none' }}>
              {/* TOP-LEFT TITLE */}
              <div style={{
                display: 'flex', flexDirection: 'column', gap: '0px',
                alignItems: 'center', pointerEvents: 'auto',
                transform: 'rotate(-4deg)'
              }}>
                <div style={{
                  background: '#d4a373', backgroundImage: 'linear-gradient(90deg, #d4a373, #e6ccb2, #d4a373)',
                  border: '2px solid #8b5a2b', borderRadius: '8px 12px 10px 8px',
                  padding: '10px 20px', boxShadow: '4px 6px 12px rgba(0,0,0,0.4)',
                  position: 'relative', color: '#3e2723', textAlign: 'center'
                }}>
                  <div style={{ position: 'absolute', top: '-18px', left: '20%', width: '4px', height: '18px', background: '#5d4037', borderRadius: '2px' }} />
                  <div style={{ position: 'absolute', top: '-18px', right: '20%', width: '4px', height: '18px', background: '#5d4037', borderRadius: '2px' }} />
                  <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '900', fontFamily: '"Fraunces", Georgia, serif', letterSpacing: '1px' }}>Activity 2.9</h2>
                  <h3 style={{ margin: '2px 0 0 0', fontSize: '14px', fontWeight: '700' }}>How Do They Move?</h3>
                </div>
              </div>
            </div>

            {/* MAIN CONTENT */}
            <div style={{ flex: 1, position: 'relative', pointerEvents: 'none' }}>

              {/* DROP ZONES (Absolutely Positioned) */}
              <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                pointerEvents: 'none'
              }}>
                {[
                  { id: 'swims', label: 'Swims', icon: <Waves size={20} color="#0284c7" />, color: '#e0f2fe', border: '#7dd3fc', pos: { top: '65%', left: '58%' } },
                  { id: 'flies', label: 'Flies', icon: <Cloud size={20} color="#6366f1" />, color: '#e0e7ff', border: '#a5b4fc', pos: { top: '8%', left: '52%' } },
                  { id: 'climbs', label: 'Climbs', icon: <TreePine size={20} color="#16a34a" />, color: '#dcfce7', border: '#86efac', pos: { top: '15%', left: '12%' } },
                  { id: 'runs', label: 'Runs', icon: <Zap size={20} color="#ea580c" />, color: '#ffedd5', border: '#fdba74', pos: { top: '35%', left: '42%' } },
                  { id: 'hops', label: 'Hops', icon: <Footprints size={20} color="#d946ef" />, color: '#fae8ff', border: '#f0abfc', pos: { top: '55%', left: '15%' } }
                ].map(zone => (
                  <div 
                    key={zone.id}
                    onDrop={(e) => handleDrop(e, zone.id)}
                    onDragOver={handleDragOver}
                    style={{
                      position: 'absolute',
                      top: zone.pos.top,
                      left: zone.pos.left,
                      pointerEvents: 'auto',
                      width: '180px',
                      height: '180px',
                      boxSizing: 'border-box',
                      background: 'rgba(255,255,255,0.85)',
                      backdropFilter: 'blur(4px)',
                      border: `3px dashed ${zone.border}`,
                      borderRadius: '12px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      padding: '10px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div style={{ 
                      background: zone.color, padding: '4px 12px', borderRadius: '20px', 
                      display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '800', 
                      color: '#334155', marginBottom: '10px', border: `1px solid ${zone.border}`
                    }}>
                      {zone.icon} {zone.label}
                    </div>
                    <div style={{ 
                      display: 'flex', gap: '10px', flex: 1, 
                      alignItems: 'center', justifyContent: 'center', 
                      width: '100%', overflow: 'hidden', padding: '5px' 
                    }}>
                      {droppedAnimals[zone.id].map(animal => (
                        <div key={animal.id} style={{ 
                          position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' 
                        }}>
                          <img 
                            src={animal.image} 
                            alt={animal.name} 
                            style={{ 
                              width: '60px', height: '60px', objectFit: 'cover', 
                              borderRadius: '50%', border: '3px solid white', 
                              boxShadow: '0 4px 8px rgba(0,0,0,0.2)' 
                            }}
                          />
                          <span style={{ fontSize: '12px', fontWeight: '700', color: '#334155', marginTop: '4px' }}>
                            {animal.name}
                          </span>
                          {isAnswersChecked && (
                            <div style={{ position: 'absolute', top: -5, right: -5, background: 'white', borderRadius: '50%' }}>
                              {animal.targetZone === zone.id ? 
                                <CheckCircle2 size={20} color="#16a34a" /> : 
                                <RotateCcw size={20} color="#ef4444" />
                              }
                            </div>
                          )}
                        </div>
                      ))}
                      {droppedAnimals[zone.id].length === 0 && (
                        <div style={{ color: '#94a3b8', fontSize: '14px', fontWeight: '600', textAlign: 'center' }}>
                          Drop here
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* RIGHT SIDE CONTAINER */}
              <div style={{ 
                position: 'absolute', top: '20px', right: '20px', display: 'flex', flexDirection: 'column', 
                gap: '12px', alignItems: 'center', pointerEvents: 'none', zIndex: 20
              }}>

                {/* ANIMALS TO DRAG PANEL (Right) */}
                <div style={{
                  width: '280px', height: 'fit-content',
                  background: 'rgba(20, 50, 20, 0.9)', backdropFilter: 'blur(8px)',
                  borderRadius: '16px', border: '2px solid rgba(255,255,255,0.2)',
                  padding: '15px', pointerEvents: 'auto', display: 'flex', flexDirection: 'column',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                }}>
                  <h3 style={{ margin: '0 0 15px 0', color: 'white', fontSize: '18px', textAlign: 'center', fontWeight: '800', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '10px' }}>
                  Animals to drag
                </h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {availableAnimals.map(animal => (
                    <div 
                      key={animal.id}
                      draggable={!isAnswersChecked}
                      onDragStart={(e) => handleDragStart(e, animal)}
                      style={{
                        background: 'white', borderRadius: '12px', padding: '8px',
                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                        cursor: isAnswersChecked ? 'default' : 'grab',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                        transition: 'transform 0.2s',
                      }}
                    >
                      <div style={{
                        width: '96px',
                        height: '96px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        border: '2px solid #e2e8f0',
                        margin: '0 auto 6px auto',
                        background: 'transparent',
                      }}>
                        <img 
                          src={animal.image} 
                          alt={animal.name} 
                          style={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'contain', 
                            objectPosition: 'center', 
                            display: 'block'
                          }}
                          draggable="false"
                        />
                      </div>
                      <span style={{ fontSize: '14px', fontWeight: '700', color: '#334155' }}>{animal.name}</span>
                    </div>
                  ))}
                </div>
                
                {/* NEW THINK SECTION IN PANEL */}
                <div style={{
                  marginTop: '15px', paddingTop: '15px', borderTop: '1px solid rgba(255,255,255,0.2)',
                  background: '#fef3c7', borderRadius: '8px', padding: '12px',
                  boxShadow: 'inset 0 0 10px rgba(0,0,0,0.05)', position: 'relative'
                }}>
                  <div style={{ position: 'absolute', top: 0, bottom: 0, left: '12px', width: '2px', background: '#f87171', opacity: 0.5 }} />
                  <h4 style={{ margin: '0 0 6px 10px', fontSize: '16px', fontWeight: '800', color: '#92400e', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    💡 Think!
                  </h4>
                  <p style={{ margin: '0 0 0 10px', fontSize: '13px', color: '#78350f', fontWeight: '600', lineHeight: 1.4 }}>
                    Drag the animals to match how they move. Some zones might have more than one animal.
                  </p>
                </div>

              </div>
            </div>
          </div>


            {/* Back Button (Bottom Left) */}
            <div style={{ 
              position: 'absolute', left: '24px', bottom: '24px', top: 'unset', right: 'unset',
              margin: 0, transform: 'none', pointerEvents: 'auto', zIndex: 30 
            }}>
              <button 
                onClick={() => setPage(3)}
                style={{
                  background: 'rgba(255,255,255,0.9)', color: '#334155',
                  border: '2px solid rgba(0,0,0,0.1)', borderRadius: '30px',
                  padding: '10px 20px', fontSize: '15px', fontWeight: '700',
                  display: 'flex', alignItems: 'center', gap: '6px',
                  cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                }}
              >
                <ArrowLeft size={18} /> Back
              </button>
            </div>

            {/* Center Navigation Pill */}
            <div style={{
              position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)',
              display: 'flex', gap: '16px', alignItems: 'center',
              background: 'rgba(20, 60, 30, 0.9)', backdropFilter: 'blur(8px)',
              padding: '12px 30px', borderRadius: '40px', border: '2px solid rgba(255,255,255,0.2)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)', pointerEvents: 'auto', zIndex: 30
            }}>
              <span style={{ color: 'white', fontWeight: '700', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Leaf size={16} color="#86efac" /> Observe
              </span>
              <span style={{ color: '#86efac', fontWeight: '800' }}>|</span>
              <span style={{ color: 'white', fontWeight: '700', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Brain size={16} color="#86efac" /> Think
              </span>
              <span style={{ color: '#86efac', fontWeight: '800' }}>|</span>
              <span style={{ color: 'white', fontWeight: '700', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Leaf size={16} color="#86efac" /> Learn
              </span>
              <span style={{ color: '#86efac', fontWeight: '800' }}>|</span>
              <span style={{ color: 'white', fontWeight: '700', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Flower2 size={16} color="#86efac" /> Appreciate Nature
              </span>
            </div>



            {/* Action Buttons (Bottom Right) */}
            <div style={{ 
              position: 'absolute', right: '24px', bottom: '24px', top: 'unset', left: 'unset',
              margin: 0, transform: 'none', pointerEvents: 'auto', zIndex: 30,
              display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px'
            }}>
              <button 
                onClick={resetActivity}
                style={{
                  background: 'white', color: '#ef4444',
                  border: '2px solid #ef4444', borderRadius: '30px',
                  padding: '12px 24px', fontSize: '16px', fontWeight: '800',
                  display: 'flex', alignItems: 'center', gap: '8px',
                  cursor: 'pointer', boxShadow: '0 4px 15px rgba(239,68,68,0.2)',
                  transition: 'transform 0.2s', margin: 0
                }}
              >
                <RotateCcw size={20} /> Reset
              </button>
              
              <button 
                onClick={checkAnswers}
                style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: 'white',
                  border: 'none', borderRadius: '30px',
                  padding: '12px 24px', fontSize: '16px', fontWeight: '800',
                  display: 'flex', alignItems: 'center', gap: '8px',
                  cursor: 'pointer', boxShadow: '0 4px 15px rgba(16,185,129,0.4)',
                  transition: 'transform 0.2s', margin: 0
                }}
              >
                <CheckCircle2 size={20} /> Check My Answers
              </button>
            </div>

            {/* Info Popup Modal */}
            {showInfoPopup && (
              <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                background: 'rgba(0, 0, 0, 0.65)', backdropFilter: 'blur(6px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 100, pointerEvents: 'auto'
              }}>
                <div style={{
                  background: 'white', borderRadius: '20px', padding: '32px 40px',
                  maxWidth: '550px', boxShadow: '0 24px 48px rgba(0,0,0,0.4)',
                  animation: 'fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                }}>
                  <div style={{
                    background: '#fef3c7', borderRadius: '12px', padding: '16px',
                    borderLeft: '4px solid #f59e0b', marginBottom: '24px'
                  }}>
                    <h2 style={{ margin: '0 0 8px 0', color: '#92400e', fontSize: '24px', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Lightbulb size={24} color="#d97706" /> What Did We Learn?
                    </h2>
                  </div>
                  <ul style={{ 
                    color: '#334155', fontSize: '17px', lineHeight: 1.7, 
                    paddingLeft: '24px', margin: '0 0 32px 0', fontWeight: '600' 
                  }}>
                    <li style={{ marginBottom: '12px' }}>Animals move by flying, running, crawling, walking, hopping, or jumping.</li>
                    <li style={{ marginBottom: '12px' }}>They use different body parts for movement.</li>
                    <li style={{ marginBottom: '12px' }}>Animals can be grouped by their movement and body parts.</li>
                    <li style={{ marginBottom: '12px' }}>Animals differ in shape, size, structure, and colour.</li>
                    <li>Grouping helps us understand animal diversity.</li>
                  </ul>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button 
                      onClick={() => setShowInfoPopup(false)}
                      style={{
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        color: 'white', border: 'none', borderRadius: '30px',
                        padding: '12px 40px', fontSize: '18px', fontWeight: '800',
                        cursor: 'pointer', boxShadow: '0 4px 15px rgba(16,185,129,0.4)',
                        transition: 'transform 0.2s', display: 'flex', alignItems: 'center', gap: '8px'
                      }}
                    >
                      Continue <ArrowRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            )}

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
