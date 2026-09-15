import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, Compass, Info, Sparkles, Volume2, VolumeX, Eye } from 'lucide-react';
import { speakNaturalIndianMale, stopNarration } from '../../../../services/elevenLabsService';
import ch2CamelAdaptations from '../../../../assets/ch2_camel_adaptations.jpg';

export default function AdaptationsLab({ onBackToDashboard, onNextSubModule }) {
  const [activeTab, setActiveTab] = useState('camel'); // 'camel' | 'mountain' | 'aquatic'
  const [selectedCamel, setSelectedCamel] = useState('hot'); // 'hot' | 'cold'
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    return () => {
      stopNarration();
    };
  }, [activeTab, selectedCamel]);

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
      background: '#FAF8F2',
      borderRadius: '20px',
      border: '2px solid #14452F',
      padding: '16px 22px 14px',
      boxSizing: 'border-box',
      overflow: 'hidden',
      boxShadow: '0 10px 30px rgba(20, 69, 47, 0.08)'
    }}>
      {/* Header & Sub-Navigation */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '2px solid #14452F',
        paddingBottom: '12px',
        flexShrink: 0
      }}>
        <div>
          <div style={{ fontSize: '16px', fontWeight: '900', letterSpacing: '0.06em', color: '#14452F', textTransform: 'uppercase', marginBottom: '3px' }}>
            Section 2.3 · Morphological &amp; Behavioral Traits (Pages 24–27)
          </div>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '900', color: '#14452F', lineHeight: 1.2, fontFamily: '"Fraunces", Georgia, serif' }}>
            🌵 Adaptations: Surviving Extreme Surroundings
          </h2>
        </div>

        {/* Mode Toggles */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ display: 'flex', background: '#F5F1E5', padding: '4px', borderRadius: '12px', border: '1.8px solid #14452F', gap: '4px' }}>
            <button
              onClick={() => setActiveTab('camel')}
              style={{
                padding: '7px 18px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '800',
                border: 'none',
                cursor: 'pointer',
                background: activeTab === 'camel' ? 'linear-gradient(135deg, #14452F 0%, #064E3B 100%)' : 'transparent',
                color: activeTab === 'camel' ? '#ffffff' : '#14452F',
                transition: 'all 0.15s ease',
                boxShadow: activeTab === 'camel' ? '0 2px 8px rgba(20, 69, 47, 0.3)' : 'none'
              }}
            >
              🐪 Camels (Hot vs Cold)
            </button>
            <button
              onClick={() => setActiveTab('mountain')}
              style={{
                padding: '7px 18px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '800',
                border: 'none',
                cursor: 'pointer',
                background: activeTab === 'mountain' ? 'linear-gradient(135deg, #14452F 0%, #064E3B 100%)' : 'transparent',
                color: activeTab === 'mountain' ? '#ffffff' : '#14452F',
                transition: 'all 0.15s ease',
                boxShadow: activeTab === 'mountain' ? '0 2px 8px rgba(20, 69, 47, 0.3)' : 'none'
              }}
            >
              🌲 Mountain Flora
            </button>
            <button
              onClick={() => setActiveTab('aquatic')}
              style={{
                padding: '7px 18px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '800',
                border: 'none',
                cursor: 'pointer',
                background: activeTab === 'aquatic' ? 'linear-gradient(135deg, #14452F 0%, #064E3B 100%)' : 'transparent',
                color: activeTab === 'aquatic' ? '#ffffff' : '#14452F',
                transition: 'all 0.15s ease',
                boxShadow: activeTab === 'aquatic' ? '0 2px 8px rgba(20, 69, 47, 0.3)' : 'none'
              }}
            >
              🐟 Aquatic Streamlining
            </button>
          </div>

          <button
            onClick={() => handleReadAloud(
              activeTab === 'camel'
                ? "Adaptations in camels. Hot desert camels in Rajasthan have a single hump, long legs to avoid hot sand, wide padded hooves, and produce dry dung with minimal urine. Cold desert camels in Ladakh have two humps that shrink in late winter, shorter legs for mountain rocks, and long woolly hair for sub-zero temperatures."
                : activeTab === 'mountain'
                ? "Mountain adaptations. Deodar trees have conical crowns and sloping flexible branches so heavy snow slides off easily. In Nilgiri Shola forests, rhododendrons remain short with small leaves to resist gale winds, while Sikkim varieties grow into tall trees."
                : "Aquatic adaptations. Fishes and ocean mammals feature streamlined spindle-shaped bodies and steering fins to minimize water resistance during locomotion."
            )}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 16px',
              background: isSpeaking ? '#fee2e2' : '#FAF8F2',
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

      {/* Main Interactive Comparison Body */}
      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', padding: '10px 0', overflow: 'hidden' }}>
        {/* ============================================================ */}
        {/* TAB A: CAMEL ADAPTATIONS (HOT VS COLD DESERT)                */}
        {/* ============================================================ */}
        {activeTab === 'camel' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 1.1fr 0.9fr',
            gap: '14px',
            height: '100%',
            alignItems: 'stretch'
          }}>
            {/* Hot Desert Camel Card */}
            <div 
              onClick={() => setSelectedCamel('hot')}
              style={{
                background: selectedCamel === 'hot' ? '#F5F1E5' : '#FAF8F2',
                border: `2px solid #14452F`,
                borderRadius: '16px',
                padding: '16px 18px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: selectedCamel === 'hot' ? '0 6px 20px rgba(20, 69, 47, 0.15)' : '0 2px 8px rgba(0,0,0,0.04)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxSizing: 'border-box'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '16px', fontWeight: '900', color: '#14452F', textTransform: 'uppercase' }}>
                    Rajasthan Thar Desert
                  </span>
                  <span style={{ background: '#EDE7D8', color: '#14452F', fontSize: '16px', fontWeight: '800', padding: '3px 10px', borderRadius: '8px', border: '1px solid #14452F' }}>
                    1 Hump
                  </span>
                </div>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: '900', color: '#14452F', fontFamily: '"Fraunces", Georgia, serif' }}>
                  🐪 Hot Desert Dromedary Camel
                </h3>
                <p style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#2A3B2C', lineHeight: 1.5, fontWeight: '500' }}>
                  Thrives under scorching daytime sand (over 45°C) and sub-tropical desert nights with scarce groundwater.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ background: '#FAF8F2', padding: '8px 12px', borderRadius: '10px', border: '1.5px solid #14452F', fontSize: '16px', color: '#14452F', lineHeight: 1.45 }}>
                    <b style={{ color: '#14452F' }}>• Single Hump:</b> Concentrates fat reserves for energy conversion during food scarcity.
                  </div>
                  <div style={{ background: '#FAF8F2', padding: '8px 12px', borderRadius: '10px', border: '1.5px solid #14452F', fontSize: '16px', color: '#14452F', lineHeight: 1.45 }}>
                    <b style={{ color: '#14452F' }}>• Elevated Long Legs:</b> Lifts torso far above the scorching hot desert surface.
                  </div>
                  <div style={{ background: '#FAF8F2', padding: '8px 12px', borderRadius: '10px', border: '1.5px solid #14452F', fontSize: '16px', color: '#14452F', lineHeight: 1.45 }}>
                    <b style={{ color: '#14452F' }}>• Wide Padded Hooves:</b> Spreads body mass so feet do not sink into shifting sand.
                  </div>
                  <div style={{ background: '#FAF8F2', padding: '8px 12px', borderRadius: '10px', border: '1.5px solid #14452F', fontSize: '16px', color: '#14452F', lineHeight: 1.45 }}>
                    <b style={{ color: '#14452F' }}>• Water Conservation:</b> Excretes dry dung, minimal urine, and does not sweat.
                  </div>
                </div>
              </div>

              <div style={{ background: selectedCamel === 'hot' ? '#EDE7D8' : '#FAF8F2', border: '1px solid #14452F', padding: '6px 12px', borderRadius: '8px', fontSize: '16px', color: '#14452F', fontWeight: '800', textAlign: 'center', marginTop: '10px' }}>
                {selectedCamel === 'hot' ? '✓ Currently Focused' : 'Click to inspect traits'}
              </div>
            </div>

            {/* Cold Desert Camel Card */}
            <div 
              onClick={() => setSelectedCamel('cold')}
              style={{
                background: selectedCamel === 'cold' ? '#F5F1E5' : '#FAF8F2',
                border: `2px solid #14452F`,
                borderRadius: '16px',
                padding: '16px 18px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: selectedCamel === 'cold' ? '0 6px 20px rgba(20, 69, 47, 0.15)' : '0 2px 8px rgba(0,0,0,0.04)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxSizing: 'border-box'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '16px', fontWeight: '900', color: '#14452F', textTransform: 'uppercase' }}>
                    Ladakh High Altitude
                  </span>
                  <span style={{ background: '#EDE7D8', color: '#14452F', fontSize: '16px', fontWeight: '800', padding: '3px 10px', borderRadius: '8px', border: '1px solid #14452F' }}>
                    2 Humps
                  </span>
                </div>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: '900', color: '#14452F', fontFamily: '"Fraunces", Georgia, serif' }}>
                  🐫 Cold Desert Bactrian Camel
                </h3>
                <p style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#2A3B2C', lineHeight: 1.5, fontWeight: '500' }}>
                  Inhabits high-altitude Nubra Valley of Ladakh surviving sub-zero blizzards (-30°C) and rocky terrain.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ background: '#FAF8F2', padding: '8px 12px', borderRadius: '10px', border: '1.5px solid #14452F', fontSize: '16px', color: '#14452F', lineHeight: 1.45 }}>
                    <b style={{ color: '#14452F' }}>• Two Humps:</b> Double storage; these humps visibly shrink in late winter as stored fat is consumed.
                  </div>
                  <div style={{ background: '#FAF8F2', padding: '8px 12px', borderRadius: '10px', border: '1.5px solid #14452F', fontSize: '16px', color: '#14452F', lineHeight: 1.45 }}>
                    <b style={{ color: '#14452F' }}>• Shorter Sturdy Legs:</b> Low center of gravity provides superior balance across jagged rocks.
                  </div>
                  <div style={{ background: '#FAF8F2', padding: '8px 12px', borderRadius: '10px', border: '1.5px solid #14452F', fontSize: '16px', color: '#14452F', lineHeight: 1.45 }}>
                    <b style={{ color: '#14452F' }}>• Dense Shaggy Wool:</b> Grows thick dense hair from head to neck for warmth, molting in summer.
                  </div>
                  <div style={{ background: '#FAF8F2', padding: '8px 12px', borderRadius: '10px', border: '1.5px solid #14452F', fontSize: '16px', color: '#14452F', lineHeight: 1.45 }}>
                    <b style={{ color: '#14452F' }}>• Sleet Resistance:</b> Strong respiratory passages protect against icy mountain winds.
                  </div>
                </div>
              </div>

              <div style={{ background: selectedCamel === 'cold' ? '#EDE7D8' : '#FAF8F2', border: '1px solid #14452F', padding: '6px 12px', borderRadius: '8px', fontSize: '16px', color: '#14452F', fontWeight: '800', textAlign: 'center', marginTop: '10px' }}>
                {selectedCamel === 'cold' ? '✓ Currently Focused' : 'Click to inspect traits'}
              </div>
            </div>

            {/* Scientific Synthesis Panel */}
            <div style={{
              background: '#FAF8F2',
              border: '2px solid #14452F',
              borderRadius: '16px',
              padding: '16px 18px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxSizing: 'border-box'
            }}>
              <div>
                {/* Realistic Photographic Comparison */}
                <div style={{ width: '100%', height: '120px', borderRadius: '12px', overflow: 'hidden', border: '1.8px solid #14452F', marginBottom: '10px', boxShadow: '0 3px 10px rgba(20, 69, 47, 0.1)' }}>
                  <img src={ch2CamelAdaptations} alt="Hot vs Cold Desert Camel Split View" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ fontSize: '16px', fontWeight: '800', color: '#14452F', textAlign: 'center', marginBottom: '8px' }}>
                  🐪 Thar Dromedary (1 Hump) vs 🐫 Ladakh Bactrian (2 Humps)
                </div>

                <div style={{ fontSize: '16px', fontWeight: '900', color: '#14452F', textTransform: 'uppercase', marginBottom: '4px' }}>
                  🔬 NCERT Key Insight (Pages 25–26)
                </div>
                <h4 style={{ margin: '0 0 6px 0', fontSize: '20px', fontWeight: '900', color: '#14452F', fontFamily: '"Fraunces", Georgia, serif' }}>
                  Adaptation vs Environment
                </h4>
                <p style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#2A3B2C', lineHeight: 1.5 }}>
                  Even within the same animal family (camel), diverse climatic conditions forge entirely distinct physical traits to thrive.
                </p>

                <div style={{ background: '#F5F1E5', border: '1.8px solid #14452F', borderRadius: '12px', padding: '12px 14px', marginBottom: '10px' }}>
                  <div style={{ fontSize: '16px', fontWeight: '900', color: '#14452F', marginBottom: '4px' }}>
                    💡 Did You Know?
                  </div>
                  <div style={{ fontSize: '16px', color: '#2A3B2C', lineHeight: 1.5 }}>
                    The late-winter shrinking of the Bactrian camel’s two humps directly demonstrates how stored biochemical energy sustains life when vegetation is buried under snow.
                  </div>
                </div>
              </div>

              <div style={{ background: '#EDE7D8', border: '1px solid #14452F', borderRadius: '10px', padding: '8px 12px', fontSize: '16px', color: '#14452F', fontWeight: '800' }}>
                ✓ Textbook Activity 2.10 Analyzed
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB B: MOUNTAIN FLORA (DEODAR & RHODODENDRON)                 */}
        {/* ============================================================ */}
        {activeTab === 'mountain' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 1.1fr 0.8fr',
            gap: '14px',
            height: '100%',
            alignItems: 'stretch'
          }}>
            {/* Deodar Tree Card */}
            <div style={{
              background: '#FAF8F2',
              border: '2px solid #14452F',
              borderRadius: '16px',
              padding: '16px 18px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxSizing: 'border-box'
            }}>
              <div>
                <div style={{ fontSize: '16px', fontWeight: '900', color: '#14452F', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Himalayan Conifer · Page 24
                </div>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: '900', color: '#14452F', fontFamily: '"Fraunces", Georgia, serif' }}>
                  🌲 Himalayan Deodar (Cedrus deodara)
                </h3>
                <p style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#2A3B2C', lineHeight: 1.5, fontWeight: '500' }}>
                  Dominates high-altitude slopes across Himachal Pradesh and Kashmir where winter brings heavy snowfalls.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ background: '#F5F1E5', padding: '8px 12px', borderRadius: '10px', border: '1.5px solid #14452F', fontSize: '16px', color: '#14452F', lineHeight: 1.45 }}>
                    <b style={{ color: '#14452F' }}>• Conical Pyramid Architecture:</b> Tapers toward top, shedding snow naturally instead of trapping it.
                  </div>
                  <div style={{ background: '#F5F1E5', padding: '8px 12px', borderRadius: '10px', border: '1.5px solid #14452F', fontSize: '16px', color: '#14452F', lineHeight: 1.45 }}>
                    <b style={{ color: '#14452F' }}>• Sloping Flexible Branches:</b> Bends gently under snow accumulation so branches never snap.
                  </div>
                  <div style={{ background: '#F5F1E5', padding: '8px 12px', borderRadius: '10px', border: '1.5px solid #14452F', fontSize: '16px', color: '#14452F', lineHeight: 1.45 }}>
                    <b style={{ color: '#14452F' }}>• Needle-like Waxy Foliage:</b> Prevents freezing of internal fluids and minimizes moisture loss.
                  </div>
                </div>
              </div>

              <div style={{ background: '#EDE7D8', border: '1px solid #14452F', padding: '6px 12px', borderRadius: '8px', fontSize: '16px', color: '#14452F', fontWeight: '800', marginTop: '10px' }}>
                ✓ Adapted for Heavy Snow Loads
              </div>
            </div>

            {/* Rhododendron Variation Card */}
            <div style={{
              background: '#FAF8F2',
              border: '2px solid #14452F',
              borderRadius: '16px',
              padding: '16px 18px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxSizing: 'border-box'
            }}>
              <div>
                <div style={{ fontSize: '16px', fontWeight: '900', color: '#14452F', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Regional Variation · Page 26
                </div>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: '900', color: '#14452F', fontFamily: '"Fraunces", Georgia, serif' }}>
                  🌺 Rhododendron Across India
                </h3>
                <p style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#2A3B2C', lineHeight: 1.5, fontWeight: '500' }}>
                  As shared by Maya and Pema in the textbook, the same genus shows distinct forms in different mountain zones:
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ background: '#F5F1E5', padding: '8px 12px', borderRadius: '10px', border: '1.5px solid #14452F', fontSize: '16px', color: '#14452F', lineHeight: 1.45 }}>
                    <b style={{ color: '#14452F' }}>• Nilgiri Sholas (South India):</b> Stunted shrub height with small, thick leaves to resist violent winds.
                  </div>
                  <div style={{ background: '#F5F1E5', padding: '8px 12px', borderRadius: '10px', border: '1.5px solid #14452F', fontSize: '16px', color: '#14452F', lineHeight: 1.45 }}>
                    <b style={{ color: '#14452F' }}>• Sikkim Himalayas (East India):</b> Grows into towering tree forms in sheltered, high-rainfall valleys.
                  </div>
                  <div style={{ background: '#F5F1E5', padding: '8px 12px', borderRadius: '10px', border: '1.5px solid #14452F', fontSize: '16px', color: '#14452F', lineHeight: 1.45 }}>
                    <b style={{ color: '#14452F' }}>• Bright Bell Flowers:</b> Attracts high-altitude bird and insect pollinators during spring.
                  </div>
                </div>
              </div>

              <div style={{ background: '#EDE7D8', border: '1px solid #14452F', padding: '6px 12px', borderRadius: '8px', fontSize: '16px', color: '#14452F', fontWeight: '800', marginTop: '10px' }}>
                ✓ Altitude &amp; Wind Pressure Adaptation
              </div>
            </div>

            {/* Scientific Rule */}
            <div style={{
              background: '#FAF8F2',
              border: '2px solid #14452F',
              borderRadius: '16px',
              padding: '16px 18px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxSizing: 'border-box'
            }}>
              <div>
                <div style={{ fontSize: '16px', fontWeight: '900', color: '#14452F', textTransform: 'uppercase', marginBottom: '6px' }}>
                  📌 Biological Law
                </div>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: '900', color: '#14452F', fontFamily: '"Fraunces", Georgia, serif' }}>
                  What is an Adaptation?
                </h4>
                <p style={{ margin: 0, fontSize: '16px', color: '#2A3B2C', lineHeight: 1.55 }}>
                  "The special features that enable plants and animals to survive in a particular region are called adaptations." (Curiosity Grade 6, page 27).
                </p>
              </div>

              <div style={{ background: '#F5F1E5', padding: '12px 14px', borderRadius: '12px', border: '1.8px solid #14452F', marginTop: '10px' }}>
                <div style={{ fontSize: '16px', fontWeight: '900', color: '#14452F', marginBottom: '4px' }}>
                  Habitat Interdependence:
                </div>
                <div style={{ fontSize: '16px', color: '#2A3B2C', lineHeight: 1.5 }}>
                  Habitat provides food, water, air, and shelter. When habitat changes abruptly, species must adapt or face decline.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB C: AQUATIC STREAMLINING & OCEANS                         */}
        {/* ============================================================ */}
        {activeTab === 'aquatic' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1.8fr',
            gap: '14px',
            height: '100%',
            alignItems: 'stretch'
          }}>
            <div style={{
              background: '#FAF8F2',
              border: '2px solid #14452F',
              borderRadius: '16px',
              padding: '16px 18px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxSizing: 'border-box'
            }}>
              <div>
                <div style={{ fontSize: '16px', fontWeight: '900', color: '#14452F', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Aquatic Locomotion · Page 26
                </div>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: '900', color: '#14452F', fontFamily: '"Fraunces", Georgia, serif' }}>
                  🌊 Streamlined Body Dynamics
                </h3>
                <p style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#2A3B2C', lineHeight: 1.5, fontWeight: '500' }}>
                  As observed by Sagar in the Andaman and Nicobar Islands, both giant whales and agile river fishes share a spindle-like contour that tapers at both ends.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ background: '#F5F1E5', padding: '8px 12px', borderRadius: '10px', border: '1.5px solid #14452F', fontSize: '16px', color: '#14452F', lineHeight: 1.45 }}>
                    <b style={{ color: '#14452F' }}>• Spindle Geometry:</b> Narrow head and tail minimize fluid friction (drag) as water flows around.
                  </div>
                  <div style={{ background: '#F5F1E5', padding: '8px 12px', borderRadius: '10px', border: '1.5px solid #14452F', fontSize: '16px', color: '#14452F', lineHeight: 1.45 }}>
                    <b style={{ color: '#14452F' }}>• Caudal &amp; Pectoral Fins:</b> Provide dynamic propulsion, steering, and lateral balance.
                  </div>
                </div>
              </div>

              <div style={{ background: '#EDE7D8', border: '1px solid #14452F', padding: '6px 12px', borderRadius: '8px', fontSize: '16px', color: '#14452F', fontWeight: '800', marginTop: '10px' }}>
                ✓ Fluid Friction Reduction
              </div>
            </div>

            {/* Comparison Grid */}
            <div style={{
              background: '#FAF8F2',
              border: '2px solid #14452F',
              borderRadius: '16px',
              padding: '16px 18px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxSizing: 'border-box'
            }}>
              <div>
                <div style={{ fontSize: '16px', fontWeight: '900', color: '#14452F', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Aquatic vs Terrestrial Locomotion
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                  <div style={{ background: '#F5F1E5', border: '1.8px solid #14452F', borderRadius: '12px', padding: '12px' }}>
                    <div style={{ fontSize: '18px', fontWeight: '900', color: '#14452F', fontFamily: '"Fraunces", Georgia, serif', marginBottom: '4px' }}>
                      🐟 Fish in Water
                    </div>
                    <div style={{ fontSize: '16px', color: '#2A3B2C', lineHeight: 1.45 }}>
                      Propels forward by oscillating flexible backbone and tail fin; breathes dissolved oxygen using vascularized gills.
                    </div>
                  </div>

                  <div style={{ background: '#F5F1E5', border: '1.8px solid #14452F', borderRadius: '12px', padding: '12px' }}>
                    <div style={{ fontSize: '18px', fontWeight: '900', color: '#14452F', fontFamily: '"Fraunces", Georgia, serif', marginBottom: '4px' }}>
                      🐐 Goat on Grassland
                    </div>
                    <div style={{ fontSize: '16px', color: '#2A3B2C', lineHeight: 1.45 }}>
                      Walks, runs, and leaps on four muscular limbs with split hooves for firm traction across grassy terrain.
                    </div>
                  </div>
                </div>

                <div style={{ background: '#F5F1E5', border: '1.5px solid #14452F', borderRadius: '10px', padding: '10px 14px', fontSize: '16px', color: '#2A3B2C', lineHeight: 1.5 }}>
                  <b style={{ color: '#14452F' }}>Amphibian Dual Life:</b> Frogs bridge both worlds — using webbed hind feet to swim in water and strong muscular legs to leap on land (Page 28).
                </div>
              </div>

              <div style={{ background: '#EDE7D8', border: '1px solid #14452F', padding: '6px 12px', borderRadius: '8px', fontSize: '16px', color: '#14452F', fontWeight: '800', marginTop: '10px' }}>
                ✓ Habitat Shapes Locomotion Anatomy
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Nav Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: '2px solid #14452F',
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
            background: '#FAF8F2',
            border: '1.8px solid #14452F',
            borderRadius: '10px',
            color: '#14452F',
            fontWeight: '800',
            fontSize: '16px',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
          }}
        >
          <ArrowLeft size={18} color="#14452F" />
          <span>Back to Table 2.5 / 2.6</span>
        </button>

        <div style={{ fontSize: '16px', color: '#14452F', fontWeight: '800' }}>
          NCERT Pages 24–27 Core Adaptation Module
        </div>

        <button
          onClick={onNextSubModule}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 20px',
            background: 'linear-gradient(135deg, #14452F 0%, #064E3B 100%)',
            borderRadius: '10px',
            color: '#ffffff',
            fontWeight: '900',
            fontSize: '16px',
            border: '1.5px solid #10B981',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(20, 69, 47, 0.35)'
          }}
        >
          <span>Conservation &amp; Sacred Groves ➔</span>
        </button>
      </div>
    </div>
  );
}
