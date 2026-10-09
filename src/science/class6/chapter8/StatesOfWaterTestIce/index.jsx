import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import './index.css';
import bgImage from '../assets/test_the_ice_bg.jpg';
import iceCubeImg from '../assets/ice_cube.png'; 

const StatesOfWaterTestIce = ({ onNext, onBack }) => {
  const [hasMoved, setHasMoved] = useState(false);

  const tableTopRef = React.useRef(null);

  const handleDragEnd = (event, info) => {
    // Check if the user moved the ice cube a meaningful distance
    if (Math.abs(info.offset.x) > 50 || Math.abs(info.offset.y) > 50) {
      setHasMoved(true);
    }
  };

  return (
    <div className="c8-testice-wrapper">
      <img src={bgImage} alt="Test the Ice Background" className="c8-testice-bg" draggable={false} />

      {/* Table Top Drag Area Constraints */}
      <div 
        ref={tableTopRef} 
        style={{ 
          position: 'absolute', 
          bottom: 0, 
          left: '10%', 
          width: '80%', 
          height: '50%', // Covers the wooden table area for dragging
          pointerEvents: 'none' 
        }} 
      />

      {/* Top Header */}
      <div className="c8-testice-top-center">
        <div className="c8-testice-wooden-sign">
          <div className="c8-testice-wooden-header">THIRAV'S IDEA</div>
        </div>
      </div>

      {/* Instruction Overlay */}
      <div className="c8-testice-instruction-card">
        <p>Now try moving the ice the same way.</p>
      </div>

      {/* Draggable Ice Cube */}
      <motion.div 
        className="c8-testice-ice-cube-container"
        drag
        dragConstraints={tableTopRef}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 1.1 }}
      >
        <img src={iceCubeImg} alt="Realistic Ice Cube" className="c8-testice-ice-img" draggable={false} />
      </motion.div>

      {/* Feedback Confirmation */}
      {hasMoved && (
        <div className="c8-testice-feedback-popup">
          You moved the ice!
        </div>
      )}

      {/* Back Button */}
      <button className="c8-testice-btn-back" onClick={onBack}>
        <ArrowLeft size={20} /> BACK
      </button>

      {/* Next Button */}
      <button 
        className={`c8-testice-btn-next ${!hasMoved ? 'disabled' : 'pulse'}`}
        onClick={hasMoved ? onNext : undefined}
      >
        NEXT <ArrowRight size={24} />
      </button>

    </div>
  );
};

export default StatesOfWaterTestIce;
