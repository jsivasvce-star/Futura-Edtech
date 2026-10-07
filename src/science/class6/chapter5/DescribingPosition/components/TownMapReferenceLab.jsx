import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Sparkles, CheckCircle2, Building, TreePine, Bus, Home } from 'lucide-react';
import { playPositionSound } from './audioHelper';

const CHARACTERS = [
  { id: 'deepa', name: 'Deepa', avatar: '👧', houseX: 130, houseY: 90, schoolDist: '500 m', gardenDist: '1,300 m', closer: 'School' },
  { id: 'anish', name: 'Anish', avatar: '👦🏽', houseX: 160, houseY: 140, schoolDist: '600 m', gardenDist: '1,200 m', closer: 'School' },
  { id: 'hardeep', name: 'Hardeep', avatar: '👦🏾', houseX: 270, houseY: 110, schoolDist: '850 m', gardenDist: '800 m', closer: 'Both Equal (~800 m)' },
  { id: 'tasneem', name: 'Tasneem', avatar: '👧🏻', houseX: 380, houseY: 80, schoolDist: '1,300 m', gardenDist: '450 m', closer: 'Garden' },
  { id: 'padma', name: 'Padma', avatar: '👧🏽', houseX: 420, houseY: 130, schoolDist: '1,400 m', gardenDist: '400 m', closer: 'Garden' }
];

export default function TownMapReferenceLab() {
  const [referenceMode, setReferenceMode] = useState('house'); // 'house' | 'bus_stand'
  const [selectedCharId, setSelectedCharId] = useState('deepa');

  const currentChar = CHARACTERS.find(c => c.id === selectedCharId) || CHARACTERS[0];

  const handleSelectChar = (id) => {
    playPositionSound('click');
    setSelectedCharId(id);
  };

  const handleToggleMode = (mode) => {
    playPositionSound('click');
    setReferenceMode(mode);
  };

  return (
    <div className="town-map-component">
      {/* Top Controller Bar */}
      <div className="town-ctrl-card">
        <div className="ctrl-header-row">
          <div className="ctrl-title-group">
            <Navigation size={17} color="#D97706" />
            <h4 className="ctrl-title">Interactive Reference Point Map (Fig. 5.9)</h4>
          </div>
          <span className="ctrl-badge">NCERT Town Visit</span>
        </div>

        <div className="mode-toggle-buttons">
          <button
            onClick={() => handleToggleMode('house')}
            className={`mode-btn ${referenceMode === 'house' ? 'active' : ''}`}
          >
            <span>🏠 Reference: Individual Student's House</span>
          </button>
          <button
            onClick={() => handleToggleMode('bus_stand')}
            className={`mode-btn ${referenceMode === 'bus_stand' ? 'active' : ''}`}
          >
            <span>🚌 Reference: Common Bus Stand</span>
          </button>
        </div>
      </div>

      {/* Main Town Map Stage Vector */}
      <div className="town-map-stage-card">
        <div className="town-svg-box">
          <svg className="town-map-svg" viewBox="0 0 560 210" fill="none">
            {/* Town Background Grid & Roads */}
            <rect width="100%" height="100%" fill="#F0FDF4" rx="14" />
            
            {/* Roads */}
            <path d="M 30 110 L 530 110" stroke="#CBD5E1" strokeWidth="22" strokeLinecap="round" />
            <path d="M 280 20 L 280 190" stroke="#CBD5E1" strokeWidth="18" strokeLinecap="round" />
            
            {/* Road center dashes */}
            <path d="M 30 110 L 530 110" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="8 6" />

            {/* Landmarks: School (Left) */}
            <g transform="translate(40, 40)">
              <rect width="60" height="40" rx="6" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="2" />
              <text x="30" y="24" fontSize="18" textAnchor="middle">🏫</text>
              <text x="30" y="52" fill="#1D4ED8" fontSize="11" fontWeight="900" textAnchor="middle">School</text>
            </g>

            {/* Landmarks: Garden (Right) */}
            <g transform="translate(460, 40)">
              <rect width="60" height="40" rx="6" fill="#ECFDF5" stroke="#10B981" strokeWidth="2" />
              <text x="30" y="24" fontSize="18" textAnchor="middle">🌳</text>
              <text x="30" y="52" fill="#047857" fontSize="11" fontWeight="900" textAnchor="middle">Garden</text>
            </g>

            {/* Landmarks: Bus Stand (Bottom Center) */}
            <g transform="translate(250, 140)">
              <rect width="60" height="40" rx="6" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
              <text x="30" y="24" fontSize="18" textAnchor="middle">🚌</text>
              <text x="30" y="52" fill="#B45309" fontSize="11" fontWeight="900" textAnchor="middle">Bus Stand</text>
              {referenceMode === 'bus_stand' && (
                <circle cx="30" cy="-6" r="6" fill="#DC2626" />
              )}
            </g>

            {/* Student Houses */}
            {CHARACTERS.map((char) => {
              const isSelected = char.id === selectedCharId;
              return (
                <g key={char.id} transform={`translate(${char.houseX}, ${char.houseY})`}>
                  {/* Distance Sight Lines if House mode */}
                  {referenceMode === 'house' && isSelected && (
                    <g>
                      {/* Line to School */}
                      <line x1="12" y1="12" x2="70 - char.houseX" y2="60 - char.houseY" stroke="#3B82F6" strokeWidth="2" strokeDasharray="4 3" />
                      {/* Line to Garden */}
                      <line x1="12" y1="12" x2="490 - char.houseX" y2="60 - char.houseY" stroke="#10B981" strokeWidth="2" strokeDasharray="4 3" />
                    </g>
                  )}

                  {/* Distance Sight Lines if Bus Stand mode */}
                  {referenceMode === 'bus_stand' && (
                    <g>
                      <line x1="280 - char.houseX" y1="160 - char.houseY" x2="70 - char.houseX" y2="60 - char.houseY" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="4 4" />
                      <line x1="280 - char.houseX" y1="160 - char.houseY" x2="490 - char.houseX" y2="60 - char.houseY" stroke="#10B981" strokeWidth="1.5" strokeDasharray="4 4" />
                    </g>
                  )}

                  {/* House Icon & Avatar */}
                  <circle cx="12" cy="12" r="16" fill={isSelected ? '#FEF3C7' : '#FFFFFF'} stroke={isSelected ? '#D97706' : '#CBD5E1'} strokeWidth={isSelected ? 3 : 1.5} />
                  <text x="12" y="17" fontSize="14" textAnchor="middle">{char.avatar}</text>
                  <text x="12" y="36" fill="#0F172A" fontSize="10" fontWeight="900" textAnchor="middle">{char.name}</text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Bottom Student Selector & Observation Readout */}
        {referenceMode === 'house' ? (
          <div className="char-observer-row">
            <div className="char-buttons-strip">
              {CHARACTERS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleSelectChar(c.id)}
                  className={`char-btn ${selectedCharId === c.id ? 'active' : ''}`}
                >
                  <span>{c.avatar}</span>
                  <strong>{c.name}</strong>
                </button>
              ))}
            </div>

            <div className="char-observation-chip">
              <span>📍 From <strong>{currentChar.name}'s House</strong>: School = {currentChar.schoolDist} | Garden = {currentChar.gardenDist} $\rightarrow$ Closer: <strong className="highlight-tag">{currentChar.closer}</strong></span>
            </div>
          </div>
        ) : (
          <div className="bus-stand-observation-card">
            <Sparkles size={18} color="#059669" />
            <div className="bus-obs-text">
              <strong>Fixed Reference Point (Bus Stand):</strong> Distance to School = <strong>1.0 km</strong> | Distance to Garden = <strong>1.8 km</strong>.
              <span>Everyone now agrees: <strong>School is closer</strong> when measured from the Bus Stand!</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
