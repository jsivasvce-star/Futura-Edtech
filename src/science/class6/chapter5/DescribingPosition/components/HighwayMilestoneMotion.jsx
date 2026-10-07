import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bus, MapPin, Play, Pause, RotateCcw, Sparkles, Navigation, Clock } from 'lucide-react';
import { playPositionSound } from './audioHelper';

export default function HighwayMilestoneMotion() {
  const [busDistFromDelhiKm, setBusDistFromDelhiKm] = useState(70); // 70 km down to 0 km
  const [isDriving, setIsDriving] = useState(false);

  useEffect(() => {
    let timer = null;
    if (isDriving) {
      timer = setInterval(() => {
        setBusDistFromDelhiKm((prev) => {
          if (prev <= 5) {
            clearInterval(timer);
            setIsDriving(false);
            playPositionSound('success');
            return 0;
          }
          playPositionSound('bus');
          return prev - 5;
        });
      }, 400);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isDriving]);

  const handleToggleDrive = () => {
    if (busDistFromDelhiKm <= 0) {
      setBusDistFromDelhiKm(70);
    }
    setIsDriving(!isDriving);
  };

  const handleReset = () => {
    setIsDriving(false);
    setBusDistFromDelhiKm(70);
    playPositionSound('click');
  };

  // Milestone values: 70, 60, 50, 40, 30, 20, 10, 0
  const nearestMilestoneKm = Math.round(busDistFromDelhiKm / 10) * 10;
  const progressPercent = ((70 - busDistFromDelhiKm) / 70) * 100;

  return (
    <div className="highway-motion-component">
      {/* Top Banner */}
      <div className="highway-header-card">
        <div className="highway-title-group">
          <span className="highway-tag">NCERT Fig. 5.12 & 5.13</span>
          <h4 className="highway-title">Padma's Bus Journey & Kilometre Stones</h4>
        </div>
        <div className="ref-badge">
          <MapPin size={14} color="#DC2626" />
          <span>Fixed Reference Point: <strong>Delhi (0 km)</strong></span>
        </div>
      </div>

      {/* Main Interactive Highway Canvas */}
      <div className="highway-canvas-card">
        {/* Animated Highway Road Scene */}
        <div className="highway-road-stage">
          {/* Scenic Background with Trees & Mountains */}
          <div className="scenic-mountains-backdrop" />

          {/* Road Strip */}
          <div className="asphalt-road">
            <div className="center-dash-strip" />

            {/* Delhi Destination Marker at Far Right (0 km) */}
            <div className="delhi-destination-post">
              <span className="dest-icon">🏛️</span>
              <strong className="dest-name">Delhi (Ref Point)</strong>
            </div>

            {/* Kilometre Milestone Stones along the Road */}
            {[70, 60, 50, 40, 30, 20, 10].map((km) => {
              const leftPos = ((70 - km) / 70) * 82 + 5; // 5% to 87%
              const isPassed = busDistFromDelhiKm <= km;

              return (
                <div key={km} className={`milestone-stone ${isPassed ? 'passed' : ''}`} style={{ left: `${leftPos}%` }}>
                  {/* Indian Yellow & White Highway Milestone Design */}
                  <div className="stone-top-dome" />
                  <div className="stone-body">
                    <span className="stone-dest">DELHI</span>
                    <strong className="stone-km">{km}</strong>
                  </div>
                </div>
              );
            })}

            {/* Traveling Bus Sprite (Moves from Left to Right as distance decreases) */}
            <motion.div
              className="traveling-bus-sprite"
              style={{ left: `${progressPercent * 0.82 + 5}%` }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <div className="bus-graphic-box">
                <span className="bus-emoji">🚌</span>
                <span className="padma-tag">Padma</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Live Motion Status & Milestone Inspection */}
        <div className="motion-dashboard-row">
          <div className="milestone-readout-card">
            <div className="milestone-3d-replica">
              <div className="replica-dome">DELHI</div>
              <div className="replica-body">
                <span className="replica-num">{nearestMilestoneKm}</span>
                <span className="replica-km-tag">km</span>
              </div>
            </div>
            <div className="milestone-replica-text">
              <span className="replica-title">Current Road Milestone:</span>
              <strong className="replica-bold">Padma is {busDistFromDelhiKm} km away from Delhi.</strong>
              <span className="replica-note">As time passes, her distance to the reference point decreases!</span>
            </div>
          </div>

          {/* Drive Controls */}
          <div className="highway-controls-box">
            <button
              onClick={handleToggleDrive}
              className={`drive-bus-btn ${isDriving ? 'driving' : ''}`}
            >
              {isDriving ? <Pause size={16} /> : <Play size={16} />}
              <span>{isDriving ? 'Pause Bus' : busDistFromDelhiKm <= 0 ? 'Restart Journey' : 'Drive Bus to Delhi'}</span>
            </button>

            <button onClick={handleReset} className="reset-bus-btn" title="Reset to 70 km">
              <RotateCcw size={15} />
            </button>
          </div>
        </div>

        {/* Core Scientific Definition of Motion */}
        <div className="motion-definition-banner">
          <div className="def-icon-bubble">⚡</div>
          <div className="def-text">
            <strong>Definition of Motion (NCERT):</strong> “When the position of an object changes with time with respect to a fixed Reference Point, the object is said to be in <strong>MOTION</strong>!”
          </div>
        </div>
      </div>
    </div>
  );
}
