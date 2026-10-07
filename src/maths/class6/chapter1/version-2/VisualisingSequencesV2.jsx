import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import InteractiveCube4x4 from './InteractiveCube4x4';
import InteractiveCube5x5 from './InteractiveCube5x5';
import { StaticCube5x5 } from './Cube5x5';
import { SolidCube } from './SolidCube';
import b1 from './image/b1.png';
import b2 from './image/b2.png';
import b3 from './image/b3.png';
import bg from './image/bg.png';
import bg2 from './image/bg2.png';
import bg3 from './image/bg3.png';
import mg from './image/mg.png';
import ag from './image/ag.png';
import s1 from './image/s1.png';
import s2 from './image/s2.png';
import s3 from './image/s3.png';
import b4 from './image/b4.png';
import s4 from './image/s4.png';
import b5 from './image/b5.png';
import s5 from './image/s5.png';
import b6 from './image/b6.png';
import b7 from './image/b7.png';
import b8 from './image/b8.png';
import b9 from './image/b9.png';
import b10 from './image/b10.png';
import b11 from './image/b11.png';
import s6 from './image/s6.png';
import s7 from './image/s7.png';
import s8 from './image/s8.png';
import s9 from './image/s9.png';
import s10 from './image/s10.png';
import s11 from './image/s11.png';
import s16 from './image/s16.png';
import s17 from './image/s17.png';
import s18 from './image/s18.png';
import s19 from './image/s19.png';
import s20 from './image/s20.png';
import s21 from './image/s21.png';
import s22 from './image/s22.png';
import s23 from './image/s23.png';
import s24 from './image/s24.png';
import s25 from './image/s25.png';
import s26 from './image/s26.png';
import s27 from './image/s27.png';
import s28 from './image/s28.png';
import s29 from './image/s29.png';
import s30 from './image/s30.png';
import s31 from './image/s31.png';
import s32 from './image/s32.png';
import s34 from './image/s34.png';
import s35 from './image/s35.png';
import s36 from './image/s36.png';
import s37 from './image/s37.png';
import s38 from './image/s38.png';
import s39 from './image/s39.png';
import s40 from './image/s40.png';
import cg from './image/cg.png';
import s13 from './image/s13.png';
import s14 from './image/s14.png';
import s15 from './image/s15.png';
import b12 from './image/b12.png';
import b13 from './image/b13.png';
import { motion } from 'framer-motion';
import page1Audio from './audio/page1.mp3';
import v1Audio from './audio/v1.mp3';
import v2Audio from './audio/v2.mp3';
import v3Audio from './audio/v3.mp3';
import page3Audio from './audio/page3.mp3';
import page4Audio from './audio/page4.mp3';
import page5Audio from './audio/page5.mp3';
import page6Audio from './audio/page6.mp3';
import page7Audio from './audio/page7.mp3';
import page8Audio from './audio/page8.mp3';
import page9Audio from './audio/page9.mp3';
import page10Audio from './audio/page10.mp3';
import page11Audio from './audio/page11.mp3';
import page12Audio from './audio/page12.mp3';
import page13Audio from './audio/page13.mp3';
import page14Audio from './audio/page14.mp3';
import page15Audio from './audio/page15.mp3';
import page16Audio from './audio/page16.mp3';
import page17Audio from './audio/page17.mp3';
import page18Audio from './audio/page18.mp3';
import page19Audio from './audio/page19.mp3';
import page20Audio from './audio/page20.mp3';
import page21Audio from './audio/page21.mp3';
import page22Audio from './audio/page22.mp3';
import page23Audio from './audio/page23.mp3';
import page24Audio from './audio/page24.mp3';
import page25Audio from './audio/page25.mp3';
import page26Audio from './audio/page26.mp3';
import page27Audio from './audio/page27.mp3';
import page28Audio from './audio/page28.mp3';
import page29Audio from './audio/page29.mp3';
import page30Audio from './audio/page30.mp3';
import page31Audio from './audio/page31.mp3';
import page32Audio from './audio/page32.mp3';
import page33Audio from './audio/page33.mp3';
import page34Audio from './audio/page34.mp3';
import page35Audio from './audio/page35.mp3';
import page36Audio from './audio/page36.mp3';

export default function VisualisingSequencesV2({ onNext }) {
  const [page, setPage] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({ 34: null, 35: null, 36: null, 37: null, 41: null, 43: null, 45: null });
  const [page2Step, setPage2Step] = useState(0);
  const [page3Step, setPage3Step] = useState(0);
  const [movedBalls, setMovedBalls] = useState(false);
  const [movedBalls2, setMovedBalls2] = useState(false);
  const [movedBalls3, setMovedBalls3] = useState(false);
  const [movedBalls4, setMovedBalls4] = useState(false);
  const [movedBallsSquare2, setMovedBallsSquare2] = useState(false);
  const [movedBallsSquare3, setMovedBallsSquare3] = useState(false);
  const [movedBallsSquare4, setMovedBallsSquare4] = useState(false);
  const [movedBallsSquare5, setMovedBallsSquare5] = useState(false);
  const [page11Step, setPage11Step] = useState(0);

  const audioRef = useRef(null);
  const v1Ref = useRef(null);
  const v2Ref = useRef(null);
  const v3Ref = useRef(null);
  const page3Ref = useRef(null);
  const page4Ref = useRef(null);
  const page5Ref = useRef(null);
  const page6Ref = useRef(null);
  const page7Ref = useRef(null);
  const page8Ref = useRef(null);
  const page9Ref = useRef(null);
  const page10Ref = useRef(null);
  const page11Ref = useRef(null);
  const page12Ref = useRef(null);
  const page13Ref = useRef(null);
  const page14Ref = useRef(null);
  const page15Ref = useRef(null);
  const page16Ref = useRef(null);
  const page17Ref = useRef(null);
  const page18Ref = useRef(null);
  const page19Ref = useRef(null);
  const page20Ref = useRef(null);
  const page21Ref = useRef(null);
  const page22Ref = useRef(null);
  const page23Ref = useRef(null);
  const page24Ref = useRef(null);
  const page25Ref = useRef(null);
  const page26Ref = useRef(null);
  const page27Ref = useRef(null);
  const page28Ref = useRef(null);
  const page29Ref = useRef(null);
  const page30Ref = useRef(null);
  const page31Ref = useRef(null);
  const page32Ref = useRef(null);
  const page33Ref = useRef(null);
  const page34Ref = useRef(null);
  const page35Ref = useRef(null);
  const page36Ref = useRef(null);
  const [page40Step, setPage40Step] = useState(0);
  const [page39Step, setPage39Step] = useState(0);
  const [page51Step, setPage51Step] = useState(0);
  const [page49Step, setPage49Step] = useState(0);
  const [page30Step, setPage30Step] = useState(0);
  const [page25Step, setPage25Step] = useState(0);
  const [page24Step, setPage24Step] = useState(0);

  useEffect(() => {
    if (page === 1) {
      setPage2Step(0);
      if (audioRef.current) {
        audioRef.current.play().catch(e => console.log('Audio autoplay blocked:', e));
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }

    if (page === 2) {
      const t = setTimeout(() => {
        setPage2Step(1);
        if (v1Ref.current) v1Ref.current.play().catch(e => console.log('v1 autoplay blocked:', e));
      }, 500);
      return () => clearTimeout(t);
    } else {
      if (v1Ref.current) { v1Ref.current.pause(); v1Ref.current.currentTime = 0; }
      if (v2Ref.current) { v2Ref.current.pause(); v2Ref.current.currentTime = 0; }
      if (v3Ref.current) { v3Ref.current.pause(); v3Ref.current.currentTime = 0; }
    }

    if (page === 3) {
      setPage3Step(0);
      const t = setTimeout(() => {
        if (page3Ref.current) page3Ref.current.play().catch(e => console.log('page3 audio blocked:', e));
      }, 500);
      return () => clearTimeout(t);
    } else {
      if (page3Ref.current) { page3Ref.current.pause(); page3Ref.current.currentTime = 0; }
    }

    if (page === 4 || page === 14) {
      const t = setTimeout(() => {
        if (page4Ref.current) page4Ref.current.play().catch(e => console.log('page4 audio blocked:', e));
      }, 500);
      return () => clearTimeout(t);
    } else {
      if (page4Ref.current) { page4Ref.current.pause(); page4Ref.current.currentTime = 0; }
    }

    if (page === 5) {
      const t = setTimeout(() => {
        if (page5Ref.current) page5Ref.current.play().catch(e => console.log('page5 audio blocked:', e));
      }, 500);
      return () => clearTimeout(t);
    } else {
      if (page5Ref.current) { page5Ref.current.pause(); page5Ref.current.currentTime = 0; }
    }

    if (page === 7) {
      const t = setTimeout(() => {
        if (page6Ref.current) page6Ref.current.play().catch(e => console.log('page6 audio blocked:', e));
      }, 500);
      return () => clearTimeout(t);
    } else {
      if (page6Ref.current) { page6Ref.current.pause(); page6Ref.current.currentTime = 0; }
    }

    if (page === 9) {
      const t = setTimeout(() => {
        if (page7Ref.current) page7Ref.current.play().catch(e => console.log('page7 audio blocked:', e));
      }, 500);
      return () => clearTimeout(t);
    } else {
      if (page7Ref.current) { page7Ref.current.pause(); page7Ref.current.currentTime = 0; }
    }

    if (page === 11) {
      setPage11Step(0);
      const t = setTimeout(() => {
        if (page8Ref.current) page8Ref.current.play().catch(e => console.log('page8 audio blocked:', e));
      }, 500);
      return () => clearTimeout(t);
    } else {
      if (page8Ref.current) { page8Ref.current.pause(); page8Ref.current.currentTime = 0; }
      if (page9Ref.current) { page9Ref.current.pause(); page9Ref.current.currentTime = 0; }
    }

    if (page === 12) {
      const t = setTimeout(() => {
        if (page10Ref.current) page10Ref.current.play().catch(e => console.log('page10 audio blocked:', e));
      }, 500);
      return () => clearTimeout(t);
    } else {
      if (page10Ref.current) { page10Ref.current.pause(); page10Ref.current.currentTime = 0; }
    }

    if (page === 15) {
      const t = setTimeout(() => {
        if (page11Ref.current) page11Ref.current.play().catch(e => console.log('page11 audio blocked:', e));
      }, 500);
      return () => clearTimeout(t);
    } else {
      if (page11Ref.current) { page11Ref.current.pause(); page11Ref.current.currentTime = 0; }
    }

    if (page === 16) {
      const t = setTimeout(() => {
        if (page12Ref.current) page12Ref.current.play().catch(e => console.log('page12 audio blocked:', e));
      }, 500);
      return () => clearTimeout(t);
    } else {
      if (page12Ref.current) { page12Ref.current.pause(); page12Ref.current.currentTime = 0; }
    }

    if (page === 18) {
      const t = setTimeout(() => {
        if (page13Ref.current) page13Ref.current.play().catch(e => console.log('page13 audio blocked:', e));
      }, 500);
      return () => clearTimeout(t);
    } else {
      if (page13Ref.current) { page13Ref.current.pause(); page13Ref.current.currentTime = 0; }
    }
    if (page === 23) {
      const t = setTimeout(() => {
        if (page14Ref.current) page14Ref.current.play().catch(e => console.log('page14 audio blocked:', e));
      }, 500);
      return () => clearTimeout(t);
    } else {
      if (page14Ref.current) { page14Ref.current.pause(); page14Ref.current.currentTime = 0; }
    }
    if (page === 24) {
      setPage24Step(0);
      const t = setTimeout(() => {
        if (page15Ref.current) page15Ref.current.play().catch(e => console.log('page15 audio blocked:', e));
      }, 500);
      return () => clearTimeout(t);
    } else {
      if (page15Ref.current) { page15Ref.current.pause(); page15Ref.current.currentTime = 0; }
    }
    if (page === 25) {
      setPage25Step(0);
      const t = setTimeout(() => {
        if (page16Ref.current) page16Ref.current.play().catch(e => console.log('page16 audio blocked:', e));
      }, 500);
      return () => clearTimeout(t);
    } else {
      if (page16Ref.current) { page16Ref.current.pause(); page16Ref.current.currentTime = 0; }
    }
    if (page === 26) {
      const t = setTimeout(() => {
        if (page17Ref.current) page17Ref.current.play().catch(e => console.log('page17 audio blocked:', e));
      }, 500);
      return () => clearTimeout(t);
    } else {
      if (page17Ref.current) { page17Ref.current.pause(); page17Ref.current.currentTime = 0; }
    }
    if (page === 27) {
      const t = setTimeout(() => {
        if (page18Ref.current) page18Ref.current.play().catch(e => console.log('page18 audio blocked:', e));
      }, 500);
      return () => clearTimeout(t);
    } else {
      if (page18Ref.current) { page18Ref.current.pause(); page18Ref.current.currentTime = 0; }
    }
    if (page === 28) {
      const t = setTimeout(() => {
        if (page19Ref.current) page19Ref.current.play().catch(e => console.log('page19 audio blocked:', e));
      }, 500);
      return () => clearTimeout(t);
    } else {
      if (page19Ref.current) { page19Ref.current.pause(); page19Ref.current.currentTime = 0; }
    }
    if (page === 30) {
      setPage30Step(0);
      const t = setTimeout(() => {
        if (page20Ref.current) page20Ref.current.play().catch(e => console.log('page20 audio blocked:', e));
      }, 500);
      return () => clearTimeout(t);
    } else {
      if (page20Ref.current) { page20Ref.current.pause(); page20Ref.current.currentTime = 0; }
    }
    if (page === 31) {
      const t = setTimeout(() => {
        if (page21Ref.current) page21Ref.current.play().catch(e => console.log('page21 audio blocked:', e));
      }, 500);
      return () => clearTimeout(t);
    } else {
      if (page21Ref.current) { page21Ref.current.pause(); page21Ref.current.currentTime = 0; }
    }
    if (page === 32) {
      const t = setTimeout(() => {
        if (page22Ref.current) page22Ref.current.play().catch(e => console.log('page22 audio blocked:', e));
      }, 500);
      return () => clearTimeout(t);
    } else {
      if (page22Ref.current) { page22Ref.current.pause(); page22Ref.current.currentTime = 0; }
    }
    if (page === 33) {
      const t = setTimeout(() => {
        if (page23Ref.current) page23Ref.current.play().catch(e => console.log('page23 audio blocked:', e));
      }, 500);
      return () => clearTimeout(t);
    } else {
      if (page23Ref.current) { page23Ref.current.pause(); page23Ref.current.currentTime = 0; }
    }
    if (page === 34 || page === 36) {
      const t = setTimeout(() => {
        if (page24Ref.current) page24Ref.current.play().catch(e => console.log('page24 audio blocked:', e));
      }, 500);
      return () => clearTimeout(t);
    } else {
      if (page24Ref.current) { page24Ref.current.pause(); page24Ref.current.currentTime = 0; }
    }
    if (page === 35 || page === 37) {
      const t = setTimeout(() => {
        if (page25Ref.current) page25Ref.current.play().catch(e => console.log('page25 audio blocked:', e));
      }, 500);
      return () => clearTimeout(t);
    } else {
      if (page25Ref.current) { page25Ref.current.pause(); page25Ref.current.currentTime = 0; }
    }
    if (page === 48) {
      const t = setTimeout(() => {
        if (page26Ref.current) page26Ref.current.play().catch(e => console.log('page26 audio blocked:', e));
      }, 500);
      return () => clearTimeout(t);
    } else {
      if (page26Ref.current) { page26Ref.current.pause(); page26Ref.current.currentTime = 0; }
    }
    if (page === 49) {
      setPage49Step(0);
      const t = setTimeout(() => {
        if (page27Ref.current) page27Ref.current.play().catch(e => console.log('page27 audio blocked:', e));
      }, 500);
      return () => clearTimeout(t);
    } else {
      if (page27Ref.current) { page27Ref.current.pause(); page27Ref.current.currentTime = 0; }
    }
    if (page === 50) {
      const t = setTimeout(() => {
        if (page28Ref.current) page28Ref.current.play().catch(e => console.log('page28 audio blocked:', e));
      }, 500);
      return () => clearTimeout(t);
    } else {
      if (page28Ref.current) { page28Ref.current.pause(); page28Ref.current.currentTime = 0; }
    }
    if (page === 51) {
      setPage51Step(0);
      const t = setTimeout(() => {
        if (page29Ref.current) page29Ref.current.play().catch(e => console.log('page29 audio blocked:', e));
      }, 500);
      return () => clearTimeout(t);
    } else {
      if (page29Ref.current) { page29Ref.current.pause(); page29Ref.current.currentTime = 0; }
    }
    if (page === 53) {
      const t = setTimeout(() => {
        if (page30Ref.current) page30Ref.current.play().catch(e => console.log('page30 audio blocked:', e));
      }, 500);
      return () => clearTimeout(t);
    } else {
      if (page30Ref.current) { page30Ref.current.pause(); page30Ref.current.currentTime = 0; }
    }
    if (page === 52) {
      const t = setTimeout(() => {
        if (page31Ref.current) page31Ref.current.play().catch(e => console.log('page31 audio blocked:', e));
      }, 500);
      return () => clearTimeout(t);
    } else {
      if (page31Ref.current) { page31Ref.current.pause(); page31Ref.current.currentTime = 0; }
    }
    if (page === 39) {
      setPage39Step(0);
      const t = setTimeout(() => {
        if (page32Ref.current) page32Ref.current.play().catch(e => console.log('page32 audio blocked:', e));
      }, 500);
      return () => clearTimeout(t);
    } else {
      if (page32Ref.current) { page32Ref.current.pause(); page32Ref.current.currentTime = 0; }
    }
    if (page === 40) {
      setPage40Step(0);
      const t = setTimeout(() => {
        if (page33Ref.current) page33Ref.current.play().catch(e => console.log('page33 audio blocked:', e));
      }, 500);
      return () => clearTimeout(t);
    } else {
      if (page33Ref.current) { page33Ref.current.pause(); page33Ref.current.currentTime = 0; }
    }
    if (page === 41) {
      const t = setTimeout(() => {
        if (page34Ref.current) page34Ref.current.play().catch(e => console.log('page34 audio blocked:', e));
      }, 500);
      return () => clearTimeout(t);
    } else {
      if (page34Ref.current) { page34Ref.current.pause(); page34Ref.current.currentTime = 0; }
    }
    if (page === 42) {
      const t = setTimeout(() => {
        if (page35Ref.current) page35Ref.current.play().catch(e => console.log('page35 audio blocked:', e));
      }, 500);
      return () => clearTimeout(t);
    } else {
      if (page35Ref.current) { page35Ref.current.pause(); page35Ref.current.currentTime = 0; }
    }
    if (page === 44) {
      const t = setTimeout(() => {
        if (page36Ref.current) page36Ref.current.play().catch(e => console.log('page36 audio blocked:', e));
      }, 500);
      return () => clearTimeout(t);
    } else {
      if (page36Ref.current) { page36Ref.current.pause(); page36Ref.current.currentTime = 0; }
    }
  }, [page]);

  useEffect(() => {
    if (page === 39 && page39Step > 0 && page39Step < 4) {
      const t = setTimeout(() => setPage39Step(prev => prev + 1), 700);
      return () => clearTimeout(t);
    }
  }, [page, page39Step]);


  useEffect(() => {
    if (page === 51 && page51Step > 0 && page51Step < 10) {
      const t = setTimeout(() => setPage51Step(prev => prev + 1), 500);
      return () => clearTimeout(t);
    }
  }, [page, page51Step]);



  const renderOptions = (pageNum, options, correctOpt, topPos = "50%") => {
    const selected = selectedOptions[pageNum];
    return (
      <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', position: 'absolute', top: topPos, left: '55%', transform: 'translateX(-50%)', zIndex: 20 }}>
        {options.map(opt => {
          let bgColor = 'rgba(255, 255, 255, 0.9)';
          let textColor = '#1e1b4b';
          let border = '4px solid transparent';

          if (selected === correctOpt && opt === correctOpt) {
            bgColor = '#4ade80'; // Green
            textColor = 'white';
            border = '4px solid #22c55e';
          }

          return (
            <button
              key={opt}
              onClick={() => {
                if (selected !== correctOpt) {
                  if (opt === correctOpt) {
                    setSelectedOptions(prev => ({ ...prev, [pageNum]: opt }));
                  }
                }
              }}
              style={{
                padding: '16px 48px',
                fontSize: '2.5rem',
                fontWeight: '900',
                borderRadius: '24px',
                border: border,
                backgroundColor: bgColor,
                color: textColor,
                cursor: selected === correctOpt ? 'default' : 'pointer',
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                transition: 'all 0.2s',
                minWidth: '140px'
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>
    );
  };

  const handleNext = () => {
    if (page === 1) {
      setPage(2);
    } else if (page === 2) {
      setPage(3);
    } else if (page === 3) {
      setPage(4);
    } else if (page === 4) {
      setPage(5);
    } else if (page === 5) {
      setPage(6);
    } else if (page === 6) {
      setPage(7);
    } else if (page === 7) {
      setPage(8);
    } else if (page === 8) {
      setPage(9);
    } else if (page === 9) {
      setPage(10);
    } else if (page === 10) {
      setPage(11);
    } else if (page === 11) {
      setPage(12);
    } else if (page === 12) {
      setPage(13);
    } else if (page === 13) {
      setPage(14);
    } else if (page === 14) {
      setPage(15);
    } else if (page === 15) {
      setPage(16);
    } else if (page === 16) {
      setPage(17);
    } else if (page === 17) {
      setPage(18);
    } else if (page === 18) {
      setPage(19);
    } else if (page === 19) {
      setPage(20);
    } else if (page === 20) {
      setPage(21);
    } else if (page === 21) {
      setPage(22);
    } else if (page === 22) {
      setPage(23);
    } else if (page === 23) {
      setPage(24);
    } else if (page === 24) {
      setPage(25);
    } else if (page === 25) {
      setPage(26);
    } else if (page === 26) {
      setPage(27);
    } else if (page === 27) {
      setPage(28);
    } else if (page === 28) {
      setPage(29);
    } else if (page === 29) {
      setPage(30);
    } else if (page === 30) {
      setPage(31);
    } else if (page === 31) {
      setPage(32);
    } else if (page === 32) {
      setPage(33);
    } else if (page === 33) {
      setPage(34);
    } else if (page === 34) {
      setPage(35);
    } else if (page === 35) {
      setPage(36);
    } else if (page === 36) {
      setPage(37);
    } else if (page === 37) {
      setPage(38);
    } else if (page === 38) {
      setPage(48);
    } else if (page === 39) {
      setPage(40);
    } else if (page === 40) {
      setPage(41);
    } else if (page === 41) {
      setPage(42);
    } else if (page === 42) {
      setPage(43);
    } else if (page === 43) {
      setPage(44);
    } else if (page === 44) {
      setPage(45);
    } else if (page === 45) {
      setPage(46);
    } else if (page === 46) {
      setPage(47);
    } else if (page === 47) {
      if (onNext) onNext();
    } else if (page === 48) {
      setPage(49);
    } else if (page === 49) {
      setPage(50);
    } else if (page === 50) {
      setPage(51);
    } else if (page === 51) {
      setPage(52);
    } else if (page === 52) {
      setPage(53);
    } else if (page === 53) {
      setPage(39);
    } else {
      if (onNext) onNext();
    }
  };

  const handlePrev = () => {
    if (page === 2) {
      setPage(1);
    } else if (page === 3) {
      setPage(2);
    } else if (page === 4) {
      setPage(3);
    } else if (page === 5) {
      setPage(4);
      setMovedBalls(false);
    } else if (page === 6) {
      setPage(5);
    } else if (page === 7) {
      setPage(6);
      setMovedBalls2(false);
    } else if (page === 8) {
      setPage(7);
    } else if (page === 9) {
      setPage(8);
      setMovedBalls3(false);
    } else if (page === 10) {
      setPage(9);
    } else if (page === 11) {
      setPage(10);
    } else if (page === 12) {
      setPage(11);
      setMovedBalls4(false);
    } else if (page === 13) {
      setPage(12);
    } else if (page === 14) {
      setPage(13);
    } else if (page === 15) {
      setPage(14);
      setMovedBallsSquare2(false);
    } else if (page === 16) {
      setPage(15);
      setMovedBallsSquare3(false);
    } else if (page === 17) {
      setPage(16);
    } else if (page === 18) {
      setPage(17);
      setMovedBallsSquare4(false);
    } else if (page === 19) {
      setPage(18);
    } else if (page === 20) {
      setPage(19);
      setMovedBallsSquare5(false);
    } else if (page === 21) {
      setPage(20);
    } else if (page === 22) {
      setPage(21);
    } else if (page === 23) {
      setPage(22);
    } else if (page === 24) {
      setPage(23);
    } else if (page === 25) {
      setPage(24);
    } else if (page === 26) {
      setPage(25);
    } else if (page === 27) {
      setPage(26);
    } else if (page === 28) {
      setPage(27);
    } else if (page === 29) {
      setPage(28);
    } else if (page === 30) {
      setPage(29);
    } else if (page === 31) {
      setPage(30);
    } else if (page === 32) {
      setPage(31);
    } else if (page === 33) {
      setPage(32);
    } else if (page === 34) {
      setPage(33);
    } else if (page === 35) {
      setPage(34);
    } else if (page === 36) {
      setPage(35);
    } else if (page === 37) {
      setPage(36);
    } else if (page === 38) {
      setPage(37);
    } else if (page === 39) {
      setPage(53);
    } else if (page === 53) {
      setPage(52);
    } else if (page === 52) {
      setPage(51);
    } else if (page === 51) {
      setPage(50);
    } else if (page === 40) {
      setPage(39);
    } else if (page === 41) {
      setPage(40);
    } else if (page === 42) {
      setPage(41);
    } else if (page === 43) {
      setPage(42);
    } else if (page === 44) {
      setPage(43);
    } else if (page === 45) {
      setPage(44);
    } else if (page === 46) {
      setPage(45);
    } else if (page === 47) {
      setPage(46);
    } else if (page === 48) {
      setPage(38);
    } else if (page === 49) {
      setPage(48);
    } else if (page === 50) {
      setPage(49);
    }
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: '"Nunito", "Segoe UI", Arial, sans-serif'
    }}>
      <audio ref={audioRef} src={page1Audio} />
      <audio ref={v1Ref} src={v1Audio} onEnded={() => { setPage2Step(2); if (v2Ref.current) v2Ref.current.play().catch(e => console.log(e)); }} />
      <audio ref={v2Ref} src={v2Audio} onEnded={() => { setPage2Step(3); if (v3Ref.current) v3Ref.current.play().catch(e => console.log(e)); }} />
      <audio ref={v3Ref} src={v3Audio} />
      <audio ref={page3Ref} src={page3Audio} onEnded={() => setPage3Step(1)} />
      <audio ref={page4Ref} src={page4Audio} />
      <audio ref={page5Ref} src={page5Audio} />
      <audio ref={page6Ref} src={page6Audio} />
      <audio ref={page7Ref} src={page7Audio} />
      <audio ref={page8Ref} src={page8Audio} onEnded={() => {
        setPage11Step(1);
        if (page9Ref.current) page9Ref.current.play().catch(e => console.log('page9 blocked:', e));
      }} />
      <audio ref={page9Ref} src={page9Audio} />
      <audio ref={page10Ref} src={page10Audio} />
      <audio ref={page11Ref} src={page11Audio} />
      <audio ref={page12Ref} src={page12Audio} />
      <audio ref={page13Ref} src={page13Audio} />
      <audio ref={page14Ref} src={page14Audio} />
      <audio ref={page15Ref} src={page15Audio} onEnded={() => setPage24Step(1)} />
      <audio ref={page16Ref} src={page16Audio} onEnded={() => setPage25Step(1)} />
      <audio ref={page17Ref} src={page17Audio} />
      <audio ref={page18Ref} src={page18Audio} />
      <audio ref={page19Ref} src={page19Audio} />
      <audio ref={page20Ref} src={page20Audio} onEnded={() => setPage30Step(1)} />
      <audio ref={page21Ref} src={page21Audio} />
      <audio ref={page22Ref} src={page22Audio} />
      <audio ref={page23Ref} src={page23Audio} />
      <audio ref={page24Ref} src={page24Audio} />
      <audio ref={page25Ref} src={page25Audio} />
      <audio ref={page26Ref} src={page26Audio} />
      <audio ref={page27Ref} src={page27Audio} onEnded={() => setPage49Step(1)} />
      <audio ref={page28Ref} src={page28Audio} />
      <audio ref={page29Ref} src={page29Audio} onEnded={() => setPage51Step(1)} />
      <audio ref={page30Ref} src={page30Audio} />
      <audio ref={page31Ref} src={page31Audio} />
      <audio ref={page32Ref} src={page32Audio} onEnded={() => setPage39Step(1)} />
        <audio ref={page33Ref} src={page33Audio} onEnded={() => setPage40Step(1)} />
        <audio ref={page34Ref} src={page34Audio} />
        <audio ref={page35Ref} src={page35Audio} />
        <audio ref={page36Ref} src={page36Audio} />


      {/* Main Content Area */}
      <main style={{
        flex: 1,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        backgroundImage: `url(${page === 1 ? bg : page === 2 ? bg2 : page === 3 ? bg3 : (page >= 30 && page <= 38) ? ag : page === 39 ? cg : page >= 23 ? mg : bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>



        {page === 1 && (
          <>
            {/* Page 1 Content */}
            {/* Boy Image (b1.png) - Anchored to bottom left */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '35%', // ~30-35% of the page
              height: '55%',
              zIndex: 5,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-start'
            }}>
              <img
                src={b1}
                alt="Boy sitting at desk"
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  objectPosition: 'left bottom',
                  display: 'block',
                }}
              />
            </div>

            {/* Right Column: Sequences Table */}
            <div style={{
              position: 'absolute',
              top: '50%',
              right: '40px',
              transform: 'translateY(-50%)',
              width: '60%', // ~65-70% of the page (accounting for right margin)
              maxWidth: '1000px', // Allow it to grow wider
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              zIndex: 10
            }}>
              <div style={{
                backgroundColor: 'white',
                borderRadius: '32px',
                padding: '56px',
                boxShadow: '0 16px 50px rgba(0,0,0,0.15)',
                display: 'flex',
                flexDirection: 'column',
                gap: '48px',
                border: '4px solid #f1f5f9'
              }}>

                {/* Row 1: Triangular Numbers */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#fff1f2',
                  borderRadius: '24px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    backgroundColor: '#fce7f3',
                    color: '#831843',
                    padding: '48px 32px',
                    width: '220px',
                    fontWeight: '800',
                    fontSize: '1.6rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    lineHeight: '1.3'
                  }}>
                    Triangular<br />Numbers
                  </div>
                  <div style={{
                    display: 'flex',
                    flex: 1,
                    justifyContent: 'space-around',
                    padding: '0 40px',
                    fontSize: '3rem',
                    fontWeight: '800',
                    color: '#1e1b4b'
                  }}>
                    <span>1</span>
                    <span>3</span>
                    <span>6</span>
                    <span>10</span>
                    <span>15</span>
                    <span style={{ color: '#475569' }}>...</span>
                  </div>
                </div>

                {/* Row 2: Square Numbers */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#f0f9ff',
                  borderRadius: '24px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    backgroundColor: '#e0f2fe',
                    color: '#0c4a6e',
                    padding: '48px 32px',
                    width: '220px',
                    fontWeight: '800',
                    fontSize: '1.6rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    lineHeight: '1.3'
                  }}>
                    Square<br />Numbers
                  </div>
                  <div style={{
                    display: 'flex',
                    flex: 1,
                    justifyContent: 'space-around',
                    padding: '0 40px',
                    fontSize: '3rem',
                    fontWeight: '800',
                    color: '#1e1b4b'
                  }}>
                    <span>1</span>
                    <span>4</span>
                    <span>9</span>
                    <span>16</span>
                    <span>25</span>
                    <span style={{ color: '#475569' }}>...</span>
                  </div>
                </div>

                {/* Row 3: Cube Numbers */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#f0fdf4',
                  borderRadius: '24px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    backgroundColor: '#dcfce7',
                    color: '#14532d',
                    padding: '48px 32px',
                    width: '220px',
                    fontWeight: '800',
                    fontSize: '1.6rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    lineHeight: '1.3'
                  }}>
                    Cube<br />Numbers
                  </div>
                  <div style={{
                    display: 'flex',
                    flex: 1,
                    justifyContent: 'space-around',
                    padding: '0 40px',
                    fontSize: '3rem',
                    fontWeight: '800',
                    color: '#1e1b4b'
                  }}>
                    <span>1</span>
                    <span>8</span>
                    <span>27</span>
                    <span>64</span>
                    <span>125</span>
                    <span style={{ color: '#475569' }}>...</span>
                  </div>
                </div>

              </div>
            </div>
          </>
        )}

        {page === 2 && (
          <>
            {/* Page 2 Content */}

            {/* All three Sequences Table floating at the top */}
            <div style={{
              position: 'absolute',
              top: '18%',
              left: '50%',
              transform: 'translate(-50%, -10%)',
              width: '85%',
              maxWidth: '1200px',
              backgroundColor: 'white',
              borderRadius: '24px',
              padding: '24px',
              boxShadow: '0 16px 50px rgba(0,0,0,0.15)',
              border: '4px solid #f1f5f9',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: '16px'
            }}>
              {/* Row 1: Triangular Numbers */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#fff1f2',
                borderRadius: '16px',
                overflow: 'hidden',
                flex: 1
              }}>
                <div style={{
                  backgroundColor: '#fce7f3',
                  color: '#831843',
                  padding: '16px',
                  width: '120px',
                  fontWeight: '800',
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  lineHeight: '1.2'
                }}>
                  Triangular<br />Numbers
                </div>
                <div style={{
                  display: 'flex',
                  flex: 1,
                  justifyContent: 'space-around',
                  padding: '0 16px',
                  fontSize: '1.5rem',
                  fontWeight: '800',
                  color: '#1e1b4b'
                }}>
                  <span>1</span>
                  <span>3</span>
                  <span>6</span>
                  <span>10</span>
                  <span>15</span>
                  <span style={{ color: '#475569' }}>...</span>
                </div>
              </div>

              {/* Row 2: Square Numbers */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#f0f9ff',
                borderRadius: '16px',
                overflow: 'hidden',
                flex: 1
              }}>
                <div style={{
                  backgroundColor: '#e0f2fe',
                  color: '#0c4a6e',
                  padding: '16px',
                  width: '120px',
                  fontWeight: '800',
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  lineHeight: '1.2'
                }}>
                  Square<br />Numbers
                </div>
                <div style={{
                  display: 'flex',
                  flex: 1,
                  justifyContent: 'space-around',
                  padding: '0 16px',
                  fontSize: '1.5rem',
                  fontWeight: '800',
                  color: '#1e1b4b'
                }}>
                  <span>1</span>
                  <span>4</span>
                  <span>9</span>
                  <span>16</span>
                  <span>25</span>
                  <span style={{ color: '#475569' }}>...</span>
                </div>
              </div>

              {/* Row 3: Cube Numbers */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#f0fdf4',
                borderRadius: '16px',
                overflow: 'hidden',
                flex: 1
              }}>
                <div style={{
                  backgroundColor: '#dcfce7',
                  color: '#14532d',
                  padding: '16px',
                  width: '120px',
                  fontWeight: '800',
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  lineHeight: '1.2'
                }}>
                  Cube<br />Numbers
                </div>
                <div style={{
                  display: 'flex',
                  flex: 1,
                  justifyContent: 'space-around',
                  padding: '0 16px',
                  fontSize: '1.5rem',
                  fontWeight: '800',
                  color: '#1e1b4b'
                }}>
                  <span>1</span>
                  <span>8</span>
                  <span>27</span>
                  <span>64</span>
                  <span>125</span>
                  <span style={{ color: '#475569' }}>...</span>
                </div>
              </div>
            </div>

            {/* Conversation bubbles (s1, s2, s3) */}
            <div style={{
              position: 'absolute',
              top: '38%', // Positioned below the row
              left: '55%', // Shifted slightly right to match the red box alignment
              transform: 'translateX(-50%)',
              width: '90%',
              height: '35%',
              zIndex: 10,
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              gap: '16px' // Gap between the images
            }}>
              <img
                src={s1}
                alt="Conversation bubble 1"
                style={{
                  maxWidth: '30%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  opacity: page2Step >= 1 ? 1 : 0,
                  transition: 'opacity 0.4s ease-in-out'
                }}
              />
              <img
                src={s2}
                alt="Conversation bubble 2"
                style={{
                  maxWidth: '30%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  opacity: page2Step >= 2 ? 1 : 0,
                  transition: 'opacity 0.4s ease-in-out'
                }}
              />
              <img
                src={s3}
                alt="Conversation bubble 3"
                style={{
                  maxWidth: '30%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  opacity: page2Step >= 3 ? 1 : 0,
                  transition: 'opacity 0.4s ease-in-out'
                }}
              />
            </div>

            {/* Boy Image (b2.png) - Anchored to bottom, wider to fit bubbles */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: '-2%', // Shifted slightly left
              width: '90%', // Very wide to accommodate speech bubbles if they are in the image
              height: '40%', // Decreased size
              zIndex: 5,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-start'
            }}>
              <img
                src={b2}
                alt="Boy asking questions"
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  objectPosition: 'left bottom',
                  display: 'block',
                }}
              />
            </div>
          </>
        )}

        {page === 3 && (
          <>
            {/* Page 3 Content */}

            {/* Central White Box Container */}
            <div style={{
              position: 'absolute',
              top: '35%', // Moved up slightly
              left: '55%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '24px',
              padding: '40px 60px',
              width: '60%',
              minWidth: '700px',
              boxShadow: '0 0 40px rgba(139, 92, 246, 0.25)', // Soft purple glow
              border: '3px solid #ede9fe',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              opacity: page3Step >= 1 ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '32px', marginBottom: '32px', width: '100%', justifyContent: 'center' }}>
                <div style={{
                  backgroundColor: '#6366f1',
                  color: 'white',
                  borderRadius: '24px',
                  padding: '16px 32px',
                  fontSize: '3rem',
                  fontWeight: '900',
                  boxShadow: '0 8px 20px rgba(99, 102, 241, 0.3)',
                  border: '6px solid #e0e7ff'
                }}>
                  1.3
                </div>
                <div style={{
                  color: '#1e1b4b',
                  fontSize: '3.5rem',
                  fontWeight: '900',
                  lineHeight: '1.1',
                  textAlign: 'left'
                }}>
                  Visualising<br />Number Sequences
                </div>
              </div>

              <div style={{ width: '80%', height: '2px', backgroundColor: '#e2e8f0', marginBottom: '24px' }}></div>

              <div style={{
                color: '#1d4ed8',
                fontSize: '2rem',
                fontWeight: '600'
              }}>
                Let's turn numbers into pictures.
              </div>
            </div>

            {/* Boy Image (b3.png) */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '50%', // Wide enough to fit him and his bubble
              height: '45%', // Reduced height to decrease size
              zIndex: 5,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-start'
            }}>
              <img
                src={b3}
                alt="Boy visualizing numbers"
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  objectPosition: 'left bottom',
                  display: 'block',
                }}
              />
            </div>
          </>
        )}

        {page === 4 && (
          <>
            {/* Pink Sequence Bar */}
            <div style={{
              position: 'absolute',
              top: '110px',
              left: '50px',
              right: '50px',
              backgroundColor: '#fce7f3',
              borderRadius: '24px',
              padding: '16px 80px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '3.5rem',
              fontWeight: '800',
              color: '#1e1b4b',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              zIndex: 10
            }}>
              <span>1</span>
              <span>3</span>
              <span>6</span>
              <span>10</span>
              <span>15</span>
              <span>...</span>
            </div>

            {/* Boy Image (b4.png) */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: '-4%',
              width: '24%',
              height: '38%',
              zIndex: 5,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-start'
            }}>
              <img
                src={b4}
                alt="Boy"
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  objectPosition: 'left bottom',
                  display: 'block',
                }}
              />
            </div>

            {/* Speech Bubble (s4.png) */}
            <div style={{
              position: 'absolute',
              bottom: '28%',
              left: '18%',
              width: '18%',
              zIndex: 6
            }}>
              <img
                src={s4}
                alt="Speech bubble"
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />
            </div>

            {/* Frost Glass Box with Red Dot */}
            <div style={{
              position: 'absolute',
              top: '55%',
              right: '20%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(10px)',
              borderRadius: '32px',
              padding: '80px 100px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              border: '2px solid rgba(255,255,255,1)',
              zIndex: 10
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#e11d48',
                borderRadius: '50%',
                boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 2px 2px 10px rgba(225, 29, 72, 0.4)',
                marginBottom: '40px'
              }}></div>
              <div style={{
                backgroundColor: '#fef08a',
                padding: '12px 40px',
                borderRadius: '12px',
                fontSize: '2.2rem',
                fontWeight: '900',
                color: '#1e1b4b'
              }}>
                1
              </div>
            </div>
          </>
        )}

        {page === 5 && (
          <>
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '0', zIndex: 10 }}>
              <div style={{
                backgroundColor: '#0f172a',
                color: 'white',
                padding: '8px 20px',
                borderRadius: '12px',
                fontSize: '1.4rem',
                fontWeight: '900',
                zIndex: 2,
                boxShadow: '2px 2px 8px rgba(0,0,0,0.2)'
              }}>
                B2
              </div>
              <div style={{
                backgroundColor: '#fef08a',
                color: '#1e3a8a',
                padding: '8px 32px 8px 36px',
                borderRadius: '0 24px 24px 0',
                fontSize: '1.2rem',
                fontWeight: '700',
                marginLeft: '-16px',
                zIndex: 1,
                boxShadow: '2px 2px 8px rgba(0,0,0,0.1)'
              }}>
                Add two more to make 3
              </div>
            </div>

            {/* Pink Sequence Bar */}
            <div style={{
              position: 'absolute',
              top: '110px',
              left: '50px',
              right: '50px',
              backgroundColor: '#fce7f3',
              borderRadius: '24px',
              padding: '16px 80px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '3.5rem',
              fontWeight: '800',
              color: '#1e1b4b',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              zIndex: 10
            }}>
              <span>1</span>
              <span style={{ backgroundColor: '#f9a8d4', padding: '0 24px', borderRadius: '16px' }}>3</span>
              <span>6</span>
              <span>10</span>
              <span>15</span>
              <span>...</span>
            </div>

            {/* Boy Image (b5.png) */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: '-4%',
              width: '24%',
              height: '38%',
              zIndex: 5,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-start'
            }}>
              <img
                src={b5}
                alt="Boy"
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  objectPosition: 'left bottom',
                  display: 'block',
                }}
              />
            </div>

            {/* Speech Bubble (s5.png) */}
            <div style={{
              position: 'absolute',
              bottom: '30%',
              left: '18%',
              width: '24%',
              zIndex: 6
            }}>
              <img
                src={s5}
                alt="Speech bubble"
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />
            </div>

            {/* Target Left Box */}
            <div style={{
              position: 'absolute',
              top: '55%',
              right: '35%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(10px)',
              borderRadius: '32px',
              padding: '50px 60px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              border: '2px solid rgba(255,255,255,1)',
              zIndex: 10
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#e11d48',
                borderRadius: '50%',
                boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 2px 2px 10px rgba(225, 29, 72, 0.4)',
                marginBottom: '40px'
              }}></div>

              <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ width: '54px', height: '54px', borderRadius: '50%', border: '4px dashed #3b82f6', position: 'relative' }}>
                  {movedBalls && <motion.div layoutId="ball1" style={{ position: 'absolute', top: -4, left: -4, width: '54px', height: '54px', backgroundColor: '#0284c7', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)' }} />}
                </div>
                <div style={{ width: '54px', height: '54px', borderRadius: '50%', border: '4px dashed #3b82f6', position: 'relative' }}>
                  {movedBalls && <motion.div layoutId="ball2" style={{ position: 'absolute', top: -4, left: -4, width: '54px', height: '54px', backgroundColor: '#0284c7', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)' }} />}
                </div>
              </div>
            </div>

            {/* Dashed Arrow (Visible when not moved) */}
            {!movedBalls && (
              <div style={{
                position: 'absolute',
                top: '60%',
                right: '25%',
                width: '15%',
                height: '60px',
                transform: 'translateY(-50%)',
                zIndex: 5,
                pointerEvents: 'none'
              }}>
                <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
                  <path d="M 90 20 Q 50 10 10 30" fill="transparent" stroke="#1d4ed8" strokeWidth="4" strokeDasharray="8 8" />
                  <polygon points="10,30 25,20 20,38" fill="#1d4ed8" />
                </svg>
              </div>
            )}

            {/* Source Right Box */}
            <div
              onClick={() => setMovedBalls(true)}
              style={{
                position: 'absolute',
                top: '55%',
                right: '10%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(10px)',
                borderRadius: '32px',
                padding: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                border: '4px solid #4ade80',
                zIndex: 11,
                cursor: 'pointer'
              }}
            >
              <div style={{ position: 'relative', width: '120px', height: '140px' }}>
                {!movedBalls && (
                  <div style={{ position: 'absolute', inset: 0, transform: 'rotate(25deg)' }}>
                    <motion.div layoutId="ball1" style={{ position: 'absolute', top: 10, left: 33, width: '54px', height: '54px', backgroundColor: '#0284c7', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)', zIndex: 2 }} />
                    <div style={{ position: 'absolute', top: 50, left: 56, width: '8px', height: '40px', backgroundColor: 'white', zIndex: 1 }} />
                    <motion.div layoutId="ball2" style={{ position: 'absolute', bottom: 10, left: 33, width: '54px', height: '54px', backgroundColor: '#0284c7', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)', zIndex: 2 }} />
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {page === 6 && (
          <>
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '0', zIndex: 10 }}>
              <div style={{
                backgroundColor: '#0f172a',
                color: 'white',
                padding: '8px 20px',
                borderRadius: '12px',
                fontSize: '1.4rem',
                fontWeight: '900',
                zIndex: 2,
                boxShadow: '2px 2px 8px rgba(0,0,0,0.2)'
              }}>
                B2 (after placing)
              </div>
              <div style={{
                backgroundColor: '#fef08a',
                color: '#1e3a8a',
                padding: '8px 32px 8px 36px',
                borderRadius: '0 24px 24px 0',
                fontSize: '1.4rem',
                fontWeight: '800',
                marginLeft: '-16px',
                zIndex: 1,
                boxShadow: '2px 2px 8px rgba(0,0,0,0.1)'
              }}>
                1 + 2 = 3
              </div>
            </div>

            {/* Pink Sequence Bar */}
            <div style={{
              position: 'absolute',
              top: '110px',
              left: '50px',
              right: '50px',
              backgroundColor: '#fce7f3',
              borderRadius: '24px',
              padding: '16px 80px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '3.5rem',
              fontWeight: '800',
              color: '#1e1b4b',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              zIndex: 10
            }}>
              <span>1</span>
              <span style={{ backgroundColor: '#f9a8d4', padding: '0 24px', borderRadius: '16px' }}>3</span>
              <span>6</span>
              <span>10</span>
              <span>15</span>
              <span>...</span>
            </div>

            {/* Boy Image (b6.png) */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: '-4%',
              width: '24%',
              height: '38%',
              zIndex: 5,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-start'
            }}>
              <img
                src={b6}
                alt="Boy"
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  objectPosition: 'left bottom',
                  display: 'block',
                }}
              />
            </div>

            {/* Center Box */}
            <div style={{
              position: 'absolute',
              top: '55%',
              right: '25%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(10px)',
              borderRadius: '32px',
              padding: '60px 80px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              border: '2px solid rgba(255,255,255,1)',
              zIndex: 10
            }}>
              {/* Triangle of dots */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginBottom: '40px' }}>
                <div style={{
                  width: '54px', height: '54px', backgroundColor: '#e11d48', borderRadius: '50%',
                  boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.2), 2px 2px 10px rgba(225, 29, 72, 0.4)'
                }}></div>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{
                    width: '54px', height: '54px', backgroundColor: '#0284c7', borderRadius: '50%',
                    boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(2, 132, 199, 0.4)'
                  }}></div>
                  <div style={{
                    width: '54px', height: '54px', backgroundColor: '#0284c7', borderRadius: '50%',
                    boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(2, 132, 199, 0.4)'
                  }}></div>
                </div>
              </div>

              {/* Equation Label */}
              <div style={{
                backgroundColor: '#d9f99d',
                padding: '12px 32px',
                borderRadius: '24px',
                fontSize: '2rem',
                fontWeight: '900',
                color: '#1e1b4b'
              }}>
                1 + 2 = 3
              </div>
            </div>
          </>
        )}

        {page === 7 && (
          <>
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '0', zIndex: 10 }}>
              <div style={{
                backgroundColor: '#0f172a',
                color: 'white',
                padding: '8px 20px',
                borderRadius: '12px',
                fontSize: '1.4rem',
                fontWeight: '900',
                zIndex: 2,
                boxShadow: '2px 2px 8px rgba(0,0,0,0.2)'
              }}>
                B3
              </div>
              <div style={{
                backgroundColor: '#fef08a',
                color: '#1e3a8a',
                padding: '8px 32px 8px 36px',
                borderRadius: '0 24px 24px 0',
                fontSize: '1.2rem',
                fontWeight: '700',
                marginLeft: '-16px',
                zIndex: 1,
                boxShadow: '2px 2px 8px rgba(0,0,0,0.1)'
              }}>
                Add three more to make 6
              </div>
            </div>

            {/* Pink Sequence Bar */}
            <div style={{
              position: 'absolute',
              top: '110px',
              left: '50px',
              right: '50px',
              backgroundColor: '#fce7f3',
              borderRadius: '24px',
              padding: '16px 80px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '3.5rem',
              fontWeight: '800',
              color: '#1e1b4b',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              zIndex: 10
            }}>
              <span>1</span>
              <span>3</span>
              <span style={{ backgroundColor: '#f9a8d4', padding: '0 24px', borderRadius: '16px' }}>6</span>
              <span>10</span>
              <span>15</span>
              <span>...</span>
            </div>

            {/* Boy Image (b7.png) */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: '-4%',
              width: '24%',
              height: '38%',
              zIndex: 5,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-start'
            }}>
              <img
                src={b7}
                alt="Boy"
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  objectPosition: 'left bottom',
                  display: 'block',
                }}
              />
            </div>

            {/* Speech Bubble (s6.png) */}
            <div style={{
              position: 'absolute',
              bottom: '30%',
              left: '18%',
              width: '24%',
              zIndex: 6
            }}>
              <img
                src={s6}
                alt="Speech bubble"
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />
            </div>

            {/* Target Left Box */}
            <div style={{
              position: 'absolute',
              top: '55%',
              right: '35%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(10px)',
              borderRadius: '32px',
              padding: '40px 60px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              border: '2px solid rgba(255,255,255,1)',
              zIndex: 10
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <div style={{
                  width: '48px', height: '48px', backgroundColor: '#e11d48', borderRadius: '50%',
                  boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 2px 2px 10px rgba(225, 29, 72, 0.4)'
                }}></div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#0284c7', borderRadius: '50%',
                    boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.25), 2px 2px 10px rgba(2, 132, 199, 0.4)'
                  }}></div>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#0284c7', borderRadius: '50%',
                    boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.25), 2px 2px 10px rgba(2, 132, 199, 0.4)'
                  }}></div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '4px dashed #3b82f6', position: 'relative' }}>
                  {movedBalls2 && <motion.div layoutId="ball3" style={{ position: 'absolute', top: -4, left: -4, width: '48px', height: '48px', backgroundColor: '#22c55e', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)' }} />}
                </div>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '4px dashed #3b82f6', position: 'relative' }}>
                  {movedBalls2 && <motion.div layoutId="ball4" style={{ position: 'absolute', top: -4, left: -4, width: '48px', height: '48px', backgroundColor: '#22c55e', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)' }} />}
                </div>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '4px dashed #3b82f6', position: 'relative' }}>
                  {movedBalls2 && <motion.div layoutId="ball5" style={{ position: 'absolute', top: -4, left: -4, width: '48px', height: '48px', backgroundColor: '#22c55e', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)' }} />}
                </div>
              </div>
            </div>

            {/* Dashed Arrow (Visible when not moved) */}
            {!movedBalls2 && (
              <div style={{
                position: 'absolute',
                top: '60%',
                right: '25%',
                width: '15%',
                height: '60px',
                transform: 'translateY(-50%)',
                zIndex: 5,
                pointerEvents: 'none'
              }}>
                <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
                  <path d="M 90 20 Q 50 10 10 30" fill="transparent" stroke="#1d4ed8" strokeWidth="4" strokeDasharray="8 8" />
                  <polygon points="10,30 25,20 20,38" fill="#1d4ed8" />
                </svg>
              </div>
            )}

            {/* Source Right Box */}
            <div
              onClick={() => setMovedBalls2(true)}
              style={{
                position: 'absolute',
                top: '55%',
                right: '10%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(10px)',
                borderRadius: '32px',
                padding: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                border: '4px solid #4ade80',
                zIndex: 11,
                cursor: 'pointer'
              }}
            >
              <div style={{ position: 'relative', width: '120px', height: '120px' }}>
                {!movedBalls2 && (
                  <div style={{ position: 'absolute', inset: 0 }}>
                    {/* Triangle pointing down (2 on top, 1 on bottom) */}
                    <motion.div layoutId="ball3" style={{ position: 'absolute', top: 10, left: 10, width: '48px', height: '48px', backgroundColor: '#22c55e', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)', zIndex: 2 }} />
                    <motion.div layoutId="ball4" style={{ position: 'absolute', top: 10, left: 62, width: '48px', height: '48px', backgroundColor: '#22c55e', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)', zIndex: 2 }} />
                    <motion.div layoutId="ball5" style={{ position: 'absolute', bottom: 10, left: 36, width: '48px', height: '48px', backgroundColor: '#22c55e', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)', zIndex: 2 }} />
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {page === 8 && (
          <>
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '0', zIndex: 10 }}>
              <div style={{
                backgroundColor: '#0f172a',
                color: 'white',
                padding: '8px 20px',
                borderRadius: '12px',
                fontSize: '1.4rem',
                fontWeight: '900',
                zIndex: 2,
                boxShadow: '2px 2px 8px rgba(0,0,0,0.2)'
              }}>
                B3 (after placing)
              </div>
              <div style={{
                backgroundColor: '#fef08a',
                color: '#1e3a8a',
                padding: '8px 32px 8px 36px',
                borderRadius: '0 24px 24px 0',
                fontSize: '1.4rem',
                fontWeight: '800',
                marginLeft: '-16px',
                zIndex: 1,
                boxShadow: '2px 2px 8px rgba(0,0,0,0.1)'
              }}>
                3 + 3 = 6
              </div>
            </div>

            {/* Pink Sequence Bar */}
            <div style={{
              position: 'absolute',
              top: '110px',
              left: '50px',
              right: '50px',
              backgroundColor: '#fce7f3',
              borderRadius: '24px',
              padding: '16px 80px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '3.5rem',
              fontWeight: '800',
              color: '#1e1b4b',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              zIndex: 10
            }}>
              <span>1</span>
              <span>3</span>
              <span style={{ backgroundColor: '#f9a8d4', padding: '0 24px', borderRadius: '16px' }}>6</span>
              <span>10</span>
              <span>15</span>
              <span>...</span>
            </div>

            {/* Boy Image (b8.png) */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: '-4%',
              width: '24%',
              height: '38%',
              zIndex: 5,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-start'
            }}>
              <img
                src={b8}
                alt="Boy"
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  objectPosition: 'left bottom',
                  display: 'block',
                }}
              />
            </div>

            {/* Center Box */}
            <div style={{
              position: 'absolute',
              top: '55%',
              right: '25%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(10px)',
              borderRadius: '32px',
              padding: '50px 80px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              border: '2px solid rgba(255,255,255,1)',
              zIndex: 10
            }}>
              {/* Triangle of dots with background shadow */}
              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginBottom: '40px', padding: '10px 20px' }}>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                  background: 'linear-gradient(to bottom, rgba(59, 130, 246, 0.05), rgba(59, 130, 246, 0.3))',
                  zIndex: 0
                }}></div>
                <div style={{
                  width: '54px', height: '54px', backgroundColor: '#e11d48', borderRadius: '50%',
                  boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.2), 2px 2px 10px rgba(225, 29, 72, 0.4)',
                  zIndex: 1
                }}></div>
                <div style={{ display: 'flex', gap: '16px', zIndex: 1 }}>
                  <div style={{
                    width: '54px', height: '54px', backgroundColor: '#0284c7', borderRadius: '50%',
                    boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(2, 132, 199, 0.4)'
                  }}></div>
                  <div style={{
                    width: '54px', height: '54px', backgroundColor: '#0284c7', borderRadius: '50%',
                    boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(2, 132, 199, 0.4)'
                  }}></div>
                </div>
                <div style={{ display: 'flex', gap: '16px', zIndex: 1 }}>
                  <div style={{
                    width: '54px', height: '54px', backgroundColor: '#22c55e', borderRadius: '50%',
                    boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(34, 197, 94, 0.4)'
                  }}></div>
                  <div style={{
                    width: '54px', height: '54px', backgroundColor: '#22c55e', borderRadius: '50%',
                    boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(34, 197, 94, 0.4)'
                  }}></div>
                  <div style={{
                    width: '54px', height: '54px', backgroundColor: '#22c55e', borderRadius: '50%',
                    boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(34, 197, 94, 0.4)'
                  }}></div>
                </div>
              </div>

              {/* Equation Label */}
              <div style={{
                backgroundColor: '#d9f99d',
                padding: '12px 32px',
                borderRadius: '24px',
                fontSize: '2rem',
                fontWeight: '900',
                color: '#1e1b4b'
              }}>
                3 + 3 = 6
              </div>
            </div>
          </>
        )}

        {page === 9 && (
          <>
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '0', zIndex: 10 }}>
              <div style={{
                backgroundColor: '#0f172a',
                color: 'white',
                padding: '8px 20px',
                borderRadius: '12px',
                fontSize: '1.4rem',
                fontWeight: '900',
                zIndex: 2,
                boxShadow: '2px 2px 8px rgba(0,0,0,0.2)'
              }}>
                B4
              </div>
              <div style={{
                backgroundColor: '#fef08a',
                color: '#1e3a8a',
                padding: '8px 32px 8px 36px',
                borderRadius: '0 24px 24px 0',
                fontSize: '1.2rem',
                fontWeight: '700',
                marginLeft: '-16px',
                zIndex: 1,
                boxShadow: '2px 2px 8px rgba(0,0,0,0.1)'
              }}>
                Your turn - add four more
              </div>
            </div>

            {/* Pink Sequence Bar */}
            <div style={{
              position: 'absolute',
              top: '110px',
              left: '50px',
              right: '50px',
              backgroundColor: '#fce7f3',
              borderRadius: '24px',
              padding: '16px 80px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '3.5rem',
              fontWeight: '800',
              color: '#1e1b4b',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              zIndex: 10
            }}>
              <span>1</span>
              <span>3</span>
              <span>6</span>
              <span style={{ backgroundColor: '#f9a8d4', padding: '0 24px', borderRadius: '16px' }}>10</span>
              <span>15</span>
              <span>...</span>
            </div>

            {/* Boy Image (b9.png) */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: '-4%',
              width: '24%',
              height: '38%',
              zIndex: 5,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-start'
            }}>
              <img
                src={b9}
                alt="Boy"
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  objectPosition: 'left bottom',
                  display: 'block',
                }}
              />
            </div>

            {/* Speech Bubble (s7.png) */}
            <div style={{
              position: 'absolute',
              bottom: '30%',
              left: '18%',
              width: '24%',
              zIndex: 6
            }}>
              <img
                src={s7}
                alt="Speech bubble"
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />
            </div>

            {/* Target Left Box */}
            <div style={{
              position: 'absolute',
              top: '55%',
              right: '35%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(10px)',
              borderRadius: '32px',
              padding: '40px 60px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              border: '2px solid rgba(255,255,255,1)',
              zIndex: 10
            }}>
              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginBottom: '20px', padding: '10px 20px' }}>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                  background: 'linear-gradient(to bottom, rgba(59, 130, 246, 0.05), rgba(59, 130, 246, 0.3))',
                  zIndex: 0
                }}></div>
                <div style={{
                  width: '48px', height: '48px', backgroundColor: '#e11d48', borderRadius: '50%',
                  boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 2px 2px 10px rgba(225, 29, 72, 0.4)', zIndex: 1
                }}></div>
                <div style={{ display: 'flex', gap: '12px', zIndex: 1 }}>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#0284c7', borderRadius: '50%',
                    boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.25), 2px 2px 10px rgba(2, 132, 199, 0.4)'
                  }}></div>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#0284c7', borderRadius: '50%',
                    boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.25), 2px 2px 10px rgba(2, 132, 199, 0.4)'
                  }}></div>
                </div>
                <div style={{ display: 'flex', gap: '12px', zIndex: 1 }}>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#22c55e', borderRadius: '50%',
                    boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.25), 2px 2px 10px rgba(34, 197, 94, 0.4)'
                  }}></div>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#22c55e', borderRadius: '50%',
                    boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.25), 2px 2px 10px rgba(34, 197, 94, 0.4)'
                  }}></div>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#22c55e', borderRadius: '50%',
                    boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.25), 2px 2px 10px rgba(34, 197, 94, 0.4)'
                  }}></div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '4px dashed #3b82f6', position: 'relative' }}>
                  {movedBalls3 && <motion.div layoutId="ball6" style={{ position: 'absolute', top: -4, left: -4, width: '48px', height: '48px', backgroundColor: '#f59e0b', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)' }} />}
                </div>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '4px dashed #3b82f6', position: 'relative' }}>
                  {movedBalls3 && <motion.div layoutId="ball7" style={{ position: 'absolute', top: -4, left: -4, width: '48px', height: '48px', backgroundColor: '#f59e0b', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)' }} />}
                </div>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '4px dashed #3b82f6', position: 'relative' }}>
                  {movedBalls3 && <motion.div layoutId="ball8" style={{ position: 'absolute', top: -4, left: -4, width: '48px', height: '48px', backgroundColor: '#f59e0b', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)' }} />}
                </div>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '4px dashed #3b82f6', position: 'relative' }}>
                  {movedBalls3 && <motion.div layoutId="ball9" style={{ position: 'absolute', top: -4, left: -4, width: '48px', height: '48px', backgroundColor: '#f59e0b', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)' }} />}
                </div>
              </div>
            </div>

            {/* Dashed Arrow (Visible when not moved) */}
            {!movedBalls3 && (
              <div style={{
                position: 'absolute',
                top: '60%',
                right: '25%',
                width: '15%',
                height: '60px',
                transform: 'translateY(-50%)',
                zIndex: 5,
                pointerEvents: 'none'
              }}>
                <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
                  <path d="M 90 20 Q 50 10 10 30" fill="transparent" stroke="#1d4ed8" strokeWidth="4" strokeDasharray="8 8" />
                  <polygon points="10,30 25,20 20,38" fill="#1d4ed8" />
                </svg>
              </div>
            )}

            {/* Source Right Box */}
            <div
              onClick={() => setMovedBalls3(true)}
              style={{
                position: 'absolute',
                top: '55%',
                right: '10%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(10px)',
                borderRadius: '32px',
                padding: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                border: '4px solid #4ade80',
                zIndex: 11,
                cursor: 'pointer'
              }}
            >
              <div style={{ position: 'relative', width: '120px', height: '150px' }}>
                {!movedBalls3 && (
                  <div style={{ position: 'absolute', inset: 0 }}>
                    <motion.div layoutId="ball6" style={{ position: 'absolute', top: 10, left: 36, width: '48px', height: '48px', backgroundColor: '#f59e0b', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)', zIndex: 4 }} />
                    <motion.div layoutId="ball7" style={{ position: 'absolute', top: 50, left: 16, width: '48px', height: '48px', backgroundColor: '#f59e0b', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)', zIndex: 3 }} />
                    <motion.div layoutId="ball8" style={{ position: 'absolute', top: 50, left: 56, width: '48px', height: '48px', backgroundColor: '#f59e0b', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)', zIndex: 3 }} />
                    <motion.div layoutId="ball9" style={{ position: 'absolute', top: 90, left: 36, width: '48px', height: '48px', backgroundColor: '#f59e0b', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)', zIndex: 2 }} />
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {page === 10 && (
          <>
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '0', zIndex: 10 }}>
              <div style={{
                backgroundColor: '#0f172a',
                color: 'white',
                padding: '8px 20px',
                borderRadius: '12px',
                fontSize: '1.4rem',
                fontWeight: '900',
                zIndex: 2,
                boxShadow: '2px 2px 8px rgba(0,0,0,0.2)'
              }}>
                B4 (after placing)
              </div>
              <div style={{
                backgroundColor: '#fef08a',
                color: '#1e3a8a',
                padding: '8px 32px 8px 36px',
                borderRadius: '0 24px 24px 0',
                fontSize: '1.4rem',
                fontWeight: '800',
                marginLeft: '-16px',
                zIndex: 1,
                boxShadow: '2px 2px 8px rgba(0,0,0,0.1)'
              }}>
                6 + 4 = 10
              </div>
            </div>

            {/* Pink Sequence Bar */}
            <div style={{
              position: 'absolute',
              top: '110px',
              left: '50px',
              right: '50px',
              backgroundColor: '#fce7f3',
              borderRadius: '24px',
              padding: '16px 80px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '3.5rem',
              fontWeight: '800',
              color: '#1e1b4b',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              zIndex: 10
            }}>
              <span>1</span>
              <span>3</span>
              <span>6</span>
              <span style={{ backgroundColor: '#f9a8d4', padding: '0 24px', borderRadius: '16px' }}>10</span>
              <span>15</span>
              <span>...</span>
            </div>

            {/* Boy Image (b10.png) */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: '-4%',
              width: '24%',
              height: '38%',
              zIndex: 5,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-start'
            }}>
              <img
                src={b10}
                alt="Boy"
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  objectPosition: 'left bottom',
                  display: 'block',
                }}
              />
            </div>

            {/* Center Box */}
            <div style={{
              position: 'absolute',
              top: '55%',
              right: '25%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(10px)',
              borderRadius: '32px',
              padding: '40px 80px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              border: '2px solid rgba(255,255,255,1)',
              zIndex: 10
            }}>
              {/* Triangle of dots with background shadow */}
              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginBottom: '30px', padding: '10px 20px' }}>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                  background: 'linear-gradient(to bottom, rgba(59, 130, 246, 0.05), rgba(59, 130, 246, 0.3))',
                  zIndex: 0
                }}></div>
                <div style={{
                  width: '48px', height: '48px', backgroundColor: '#e11d48', borderRadius: '50%',
                  boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.2), 2px 2px 10px rgba(225, 29, 72, 0.4)',
                  zIndex: 1
                }}></div>
                <div style={{ display: 'flex', gap: '16px', zIndex: 1 }}>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#0284c7', borderRadius: '50%',
                    boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(2, 132, 199, 0.4)'
                  }}></div>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#0284c7', borderRadius: '50%',
                    boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(2, 132, 199, 0.4)'
                  }}></div>
                </div>
                <div style={{ display: 'flex', gap: '16px', zIndex: 1 }}>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#22c55e', borderRadius: '50%',
                    boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(34, 197, 94, 0.4)'
                  }}></div>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#22c55e', borderRadius: '50%',
                    boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(34, 197, 94, 0.4)'
                  }}></div>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#22c55e', borderRadius: '50%',
                    boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(34, 197, 94, 0.4)'
                  }}></div>
                </div>
                <div style={{ display: 'flex', gap: '16px', zIndex: 1 }}>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#f59e0b', borderRadius: '50%',
                    boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(245, 158, 11, 0.4)'
                  }}></div>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#f59e0b', borderRadius: '50%',
                    boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(245, 158, 11, 0.4)'
                  }}></div>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#f59e0b', borderRadius: '50%',
                    boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(245, 158, 11, 0.4)'
                  }}></div>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#f59e0b', borderRadius: '50%',
                    boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(245, 158, 11, 0.4)'
                  }}></div>
                </div>
              </div>

              {/* Equation Label */}
              <div style={{
                backgroundColor: '#d9f99d',
                padding: '12px 32px',
                borderRadius: '24px',
                fontSize: '2rem',
                fontWeight: '900',
                color: '#1e1b4b'
              }}>
                6 + 4 = 10
              </div>
            </div>
          </>
        )}

        {page === 11 && (
          <>
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '0', zIndex: 10 }}>
              <div style={{
                backgroundColor: '#0f172a',
                color: 'white',
                padding: '8px 20px',
                borderRadius: '12px',
                fontSize: '1.4rem',
                fontWeight: '900',
                zIndex: 2,
                boxShadow: '2px 2px 8px rgba(0,0,0,0.2)'
              }}>
                B5
              </div>
              <div style={{
                backgroundColor: '#fef08a',
                color: '#1e3a8a',
                padding: '8px 32px 8px 36px',
                borderRadius: '0 24px 24px 0',
                fontSize: '1.4rem',
                fontWeight: '800',
                marginLeft: '-16px',
                zIndex: 1,
                boxShadow: '2px 2px 8px rgba(0,0,0,0.1)'
              }}>
                Now do you see it?
              </div>
            </div>

            {/* Sequence Bar - No highlight */}
            <div style={{
              position: 'absolute',
              top: '110px',
              left: '50px',
              right: '50px',
              backgroundColor: '#fce7f3',
              borderRadius: '24px',
              padding: '16px 80px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '3.5rem',
              fontWeight: '800',
              color: '#1e1b4b',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              zIndex: 10
            }}>
              <span>1</span>
              <span>3</span>
              <span>6</span>
              <span>10</span>
              <span>...</span>
            </div>

            {/* Boy Image (b9.png) */}
            {page11Step === 0 && (
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: '-4%',
                width: '24%',
                height: '38%',
                zIndex: 5,
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'flex-start'
              }}>
                <img
                  src={b9}
                  alt="Boy"
                  style={{
                    maxHeight: '100%',
                    maxWidth: '100%',
                    objectFit: 'contain',
                    objectPosition: 'left bottom',
                    display: 'block',
                  }}
                />
              </div>
            )}

            {/* Left Speech Bubble (s8.png) */}
            {page11Step === 0 && (
              <div style={{
                position: 'absolute',
                bottom: '35%',
                left: '10%',
                width: '22%',
                zIndex: 6
              }}>
                <img
                  src={s8}
                  alt="Speech bubble"
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                  }}
                />
              </div>
            )}

            {/* Right Speech Bubble (s9.png) */}
            {page11Step === 1 && (
              <div style={{
                position: 'absolute',
                top: '32%',
                right: '10%',
                width: '22%',
                zIndex: 6
              }}>
                <img
                  src={s9}
                  alt="Pink Speech bubble"
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                  }}
                />
              </div>
            )}

            {/* Center Area */}
            {page11Step === 1 && (
              <div style={{
                position: 'absolute',
                top: '55%',
                right: '30%',
                transform: 'translateY(-50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10
              }}>
                {/* Triangle of dots with background shadow and dashed border */}
                <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginBottom: '20px', padding: '30px' }}>
                  <div style={{
                    position: 'absolute',
                    inset: 20,
                    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                    background: 'linear-gradient(to bottom, rgba(59, 130, 246, 0.05), rgba(59, 130, 246, 0.3))',
                    zIndex: 0
                  }}></div>

                  {/* Dashed SVG Triangle */}
                  <svg width="100%" height="100%" viewBox="0 0 300 276" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 10 }}>
                    <polygon points="150,10 0,265 300,265" fill="transparent" stroke="#f472b6" strokeWidth="6" strokeDasharray="12 12" strokeLinejoin="round" />
                  </svg>

                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#e11d48', borderRadius: '50%',
                    boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.2), 2px 2px 10px rgba(225, 29, 72, 0.4)',
                    zIndex: 1
                  }}></div>
                  <div style={{ display: 'flex', gap: '16px', zIndex: 1 }}>
                    <div style={{
                      width: '48px', height: '48px', backgroundColor: '#0284c7', borderRadius: '50%',
                      boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(2, 132, 199, 0.4)'
                    }}></div>
                    <div style={{
                      width: '48px', height: '48px', backgroundColor: '#0284c7', borderRadius: '50%',
                      boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(2, 132, 199, 0.4)'
                    }}></div>
                  </div>
                  <div style={{ display: 'flex', gap: '16px', zIndex: 1 }}>
                    <div style={{
                      width: '48px', height: '48px', backgroundColor: '#22c55e', borderRadius: '50%',
                      boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(34, 197, 94, 0.4)'
                    }}></div>
                    <div style={{
                      width: '48px', height: '48px', backgroundColor: '#22c55e', borderRadius: '50%',
                      boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(34, 197, 94, 0.4)'
                    }}></div>
                    <div style={{
                      width: '48px', height: '48px', backgroundColor: '#22c55e', borderRadius: '50%',
                      boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(34, 197, 94, 0.4)'
                    }}></div>
                  </div>
                  <div style={{ display: 'flex', gap: '16px', zIndex: 1 }}>
                    <div style={{
                      width: '48px', height: '48px', backgroundColor: '#f59e0b', borderRadius: '50%',
                      boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(245, 158, 11, 0.4)'
                    }}></div>
                    <div style={{
                      width: '48px', height: '48px', backgroundColor: '#f59e0b', borderRadius: '50%',
                      boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(245, 158, 11, 0.4)'
                    }}></div>
                    <div style={{
                      width: '48px', height: '48px', backgroundColor: '#f59e0b', borderRadius: '50%',
                      boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(245, 158, 11, 0.4)'
                    }}></div>
                    <div style={{
                      width: '48px', height: '48px', backgroundColor: '#f59e0b', borderRadius: '50%',
                      boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(245, 158, 11, 0.4)'
                    }}></div>
                  </div>
                </div>

                {/* Triangular Numbers Box */}
                <div style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '4px solid #f472b6',
                  padding: '16px 40px',
                  borderRadius: '32px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  minWidth: '400px'
                }}>
                  <div style={{ color: '#be123c', fontSize: '1.8rem', fontWeight: '800' }}>
                    Triangular Numbers
                  </div>
                  <div style={{ color: '#1e1b4b', fontSize: '2.5rem', fontWeight: '900', display: 'flex', gap: '32px' }}>
                    <span>1</span>
                    <span>3</span>
                    <span>6</span>
                    <span>10</span>
                    <span>...</span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {page === 12 && (
          <>
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '0', zIndex: 10 }}>
              <div style={{
                backgroundColor: '#0f172a',
                color: 'white',
                padding: '8px 20px',
                borderRadius: '12px',
                fontSize: '1.4rem',
                fontWeight: '900',
                zIndex: 2,
                boxShadow: '2px 2px 8px rgba(0,0,0,0.2)'
              }}>
                B6
              </div>
              <div style={{
                backgroundColor: '#fef08a',
                color: '#1e3a8a',
                padding: '8px 32px 8px 36px',
                borderRadius: '0 24px 24px 0',
                fontSize: '1.2rem',
                fontWeight: '700',
                marginLeft: '-16px',
                zIndex: 1,
                boxShadow: '2px 2px 8px rgba(0,0,0,0.1)'
              }}>
                One more - add five to make 15
              </div>
            </div>

            {/* Pink Sequence Bar */}
            <div style={{
              position: 'absolute',
              top: '110px',
              left: '50px',
              right: '50px',
              backgroundColor: '#fce7f3',
              borderRadius: '24px',
              padding: '16px 80px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '3.5rem',
              fontWeight: '800',
              color: '#1e1b4b',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              zIndex: 10
            }}>
              <span>1</span>
              <span>3</span>
              <span>6</span>
              <span>10</span>
              <span style={{ backgroundColor: '#f9a8d4', padding: '0 24px', borderRadius: '16px' }}>15</span>
              <span>...</span>
            </div>

            {/* Boy Image (b5.png) */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: '-4%',
              width: '24%',
              height: '38%',
              zIndex: 5,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-start'
            }}>
              <img
                src={b5}
                alt="Boy"
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  objectPosition: 'left bottom',
                  display: 'block',
                }}
              />
            </div>

            {/* Speech Bubble (s10.png) */}
            <div style={{
              position: 'absolute',
              bottom: '30%',
              left: '18%',
              width: '24%',
              zIndex: 6
            }}>
              <img
                src={s10}
                alt="Speech bubble"
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />
            </div>

            {/* Target Left Box */}
            <div style={{
              position: 'absolute',
              top: '55%',
              right: '28%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(10px)',
              borderRadius: '32px',
              padding: '40px 60px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              border: '2px solid rgba(255,255,255,1)',
              zIndex: 10
            }}>
              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginBottom: '20px', padding: '10px 20px' }}>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                  background: 'linear-gradient(to bottom, rgba(59, 130, 246, 0.05), rgba(59, 130, 246, 0.3))',
                  zIndex: 0
                }}></div>
                <div style={{
                  width: '48px', height: '48px', backgroundColor: '#e11d48', borderRadius: '50%',
                  boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 2px 2px 10px rgba(225, 29, 72, 0.4)', zIndex: 1
                }}></div>
                <div style={{ display: 'flex', gap: '12px', zIndex: 1 }}>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#0284c7', borderRadius: '50%',
                    boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.25), 2px 2px 10px rgba(2, 132, 199, 0.4)'
                  }}></div>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#0284c7', borderRadius: '50%',
                    boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.25), 2px 2px 10px rgba(2, 132, 199, 0.4)'
                  }}></div>
                </div>
                <div style={{ display: 'flex', gap: '12px', zIndex: 1 }}>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#22c55e', borderRadius: '50%',
                    boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.25), 2px 2px 10px rgba(34, 197, 94, 0.4)'
                  }}></div>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#22c55e', borderRadius: '50%',
                    boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.25), 2px 2px 10px rgba(34, 197, 94, 0.4)'
                  }}></div>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#22c55e', borderRadius: '50%',
                    boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.25), 2px 2px 10px rgba(34, 197, 94, 0.4)'
                  }}></div>
                </div>
                <div style={{ display: 'flex', gap: '12px', zIndex: 1 }}>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#f59e0b', borderRadius: '50%',
                    boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.25), 2px 2px 10px rgba(245, 158, 11, 0.4)'
                  }}></div>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#f59e0b', borderRadius: '50%',
                    boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.25), 2px 2px 10px rgba(245, 158, 11, 0.4)'
                  }}></div>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#f59e0b', borderRadius: '50%',
                    boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.25), 2px 2px 10px rgba(245, 158, 11, 0.4)'
                  }}></div>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#f59e0b', borderRadius: '50%',
                    boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.25), 2px 2px 10px rgba(245, 158, 11, 0.4)'
                  }}></div>
                </div>
              </div>

              {/* Bottom row: 5 dashed circles */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '4px dashed #8b5cf6', position: 'relative' }}>
                  {movedBalls4 && <motion.div layoutId="ball10" style={{ position: 'absolute', top: -4, left: -4, width: '48px', height: '48px', backgroundColor: '#8b5cf6', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)' }} />}
                </div>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '4px dashed #8b5cf6', position: 'relative' }}>
                  {movedBalls4 && <motion.div layoutId="ball11" style={{ position: 'absolute', top: -4, left: -4, width: '48px', height: '48px', backgroundColor: '#8b5cf6', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)' }} />}
                </div>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '4px dashed #8b5cf6', position: 'relative' }}>
                  {movedBalls4 && <motion.div layoutId="ball12" style={{ position: 'absolute', top: -4, left: -4, width: '48px', height: '48px', backgroundColor: '#8b5cf6', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)' }} />}
                </div>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '4px dashed #8b5cf6', position: 'relative' }}>
                  {movedBalls4 && <motion.div layoutId="ball13" style={{ position: 'absolute', top: -4, left: -4, width: '48px', height: '48px', backgroundColor: '#8b5cf6', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)' }} />}
                </div>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '4px dashed #8b5cf6', position: 'relative' }}>
                  {movedBalls4 && <motion.div layoutId="ball14" style={{ position: 'absolute', top: -4, left: -4, width: '48px', height: '48px', backgroundColor: '#8b5cf6', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)' }} />}
                </div>
              </div>
            </div>

            {/* Dashed Arrow (Visible when not moved) */}
            {!movedBalls4 && (
              <div style={{
                position: 'absolute',
                top: '60%',
                right: '25%',
                width: '10%',
                height: '60px',
                transform: 'translateY(-50%)',
                zIndex: 5,
                pointerEvents: 'none'
              }}>
                <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
                  <path d="M 90 20 Q 50 10 10 30" fill="transparent" stroke="#1d4ed8" strokeWidth="4" strokeDasharray="8 8" />
                  <polygon points="10,30 25,20 20,38" fill="#1d4ed8" />
                </svg>
              </div>
            )}

            {/* Source Right Box */}
            <div
              onClick={() => setMovedBalls4(true)}
              style={{
                position: 'absolute',
                top: '55%',
                right: '10%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(10px)',
                borderRadius: '32px',
                padding: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                border: '4px solid #4ade80',
                zIndex: 11,
                cursor: 'pointer'
              }}
            >
              <div style={{ position: 'relative', width: '120px', height: '190px' }}>
                {!movedBalls4 && (
                  <div style={{ position: 'absolute', inset: 0 }}>
                    <motion.div layoutId="ball10" style={{ position: 'absolute', top: 10, left: 36, width: '48px', height: '48px', backgroundColor: '#8b5cf6', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)', zIndex: 5 }} />
                    <motion.div layoutId="ball11" style={{ position: 'absolute', top: 50, left: 16, width: '48px', height: '48px', backgroundColor: '#8b5cf6', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)', zIndex: 4 }} />
                    <motion.div layoutId="ball12" style={{ position: 'absolute', top: 50, left: 56, width: '48px', height: '48px', backgroundColor: '#8b5cf6', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)', zIndex: 4 }} />
                    <motion.div layoutId="ball13" style={{ position: 'absolute', top: 90, left: 36, width: '48px', height: '48px', backgroundColor: '#8b5cf6', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)', zIndex: 3 }} />
                    <motion.div layoutId="ball14" style={{ position: 'absolute', top: 130, left: 16, width: '48px', height: '48px', backgroundColor: '#8b5cf6', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)', zIndex: 2 }} />
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {page === 13 && (
          <>
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '0', zIndex: 10 }}>
              <div style={{
                backgroundColor: '#0f172a',
                color: 'white',
                padding: '8px 20px',
                borderRadius: '12px',
                fontSize: '1.4rem',
                fontWeight: '900',
                zIndex: 2,
                boxShadow: '2px 2px 8px rgba(0,0,0,0.2)'
              }}>
                B6 (after placing)
              </div>
              <div style={{
                backgroundColor: '#fef08a',
                color: '#1e3a8a',
                padding: '8px 32px 8px 36px',
                borderRadius: '0 24px 24px 0',
                fontSize: '1.4rem',
                fontWeight: '800',
                marginLeft: '-16px',
                zIndex: 1,
                boxShadow: '2px 2px 8px rgba(0,0,0,0.1)'
              }}>
                10 + 5 = 15
              </div>
            </div>

            {/* Pink Sequence Bar */}
            <div style={{
              position: 'absolute',
              top: '110px',
              left: '50px',
              right: '50px',
              backgroundColor: '#fce7f3',
              borderRadius: '24px',
              padding: '16px 80px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '3.5rem',
              fontWeight: '800',
              color: '#1e1b4b',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              zIndex: 10
            }}>
              <span>1</span>
              <span>3</span>
              <span>6</span>
              <span>10</span>
              <span style={{ backgroundColor: '#f9a8d4', padding: '0 24px', borderRadius: '16px' }}>15</span>
              <span>...</span>
            </div>

            {/* Boy Image (b11.png) */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: '-4%',
              width: '24%',
              height: '38%',
              zIndex: 5,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-start'
            }}>
              <img
                src={b11}
                alt="Boy"
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  objectPosition: 'left bottom',
                  display: 'block',
                }}
              />
            </div>

            {/* Center Container for Box and Triangular Numbers Box */}
            <div style={{
              position: 'absolute',
              top: '60%',
              right: '25%',
              transform: 'translateY(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              zIndex: 10
            }}>
              {/* Frosted Glass Box */}
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(10px)',
                borderRadius: '32px',
                padding: '20px 40px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                border: '2px solid rgba(255,255,255,1)',
              }}>
                <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', marginBottom: '12px', padding: '10px 16px' }}>
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                    background: 'linear-gradient(to bottom, rgba(59, 130, 246, 0.05), rgba(59, 130, 246, 0.3))',
                    zIndex: 0
                  }}></div>
                  <div style={{
                    width: '44px', height: '44px', backgroundColor: '#e11d48', borderRadius: '50%',
                    boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 2px 2px 10px rgba(225, 29, 72, 0.4)', zIndex: 1
                  }}></div>
                  <div style={{ display: 'flex', gap: '8px', zIndex: 1 }}>
                    <div style={{
                      width: '44px', height: '44px', backgroundColor: '#0284c7', borderRadius: '50%',
                      boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.25), 2px 2px 10px rgba(2, 132, 199, 0.4)'
                    }}></div>
                    <div style={{
                      width: '44px', height: '44px', backgroundColor: '#0284c7', borderRadius: '50%',
                      boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.25), 2px 2px 10px rgba(2, 132, 199, 0.4)'
                    }}></div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', zIndex: 1 }}>
                    <div style={{
                      width: '44px', height: '44px', backgroundColor: '#22c55e', borderRadius: '50%',
                      boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.25), 2px 2px 10px rgba(34, 197, 94, 0.4)'
                    }}></div>
                    <div style={{
                      width: '44px', height: '44px', backgroundColor: '#22c55e', borderRadius: '50%',
                      boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.25), 2px 2px 10px rgba(34, 197, 94, 0.4)'
                    }}></div>
                    <div style={{
                      width: '44px', height: '44px', backgroundColor: '#22c55e', borderRadius: '50%',
                      boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.25), 2px 2px 10px rgba(34, 197, 94, 0.4)'
                    }}></div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', zIndex: 1 }}>
                    <div style={{
                      width: '44px', height: '44px', backgroundColor: '#f59e0b', borderRadius: '50%',
                      boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.25), 2px 2px 10px rgba(245, 158, 11, 0.4)'
                    }}></div>
                    <div style={{
                      width: '44px', height: '44px', backgroundColor: '#f59e0b', borderRadius: '50%',
                      boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.25), 2px 2px 10px rgba(245, 158, 11, 0.4)'
                    }}></div>
                    <div style={{
                      width: '44px', height: '44px', backgroundColor: '#f59e0b', borderRadius: '50%',
                      boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.25), 2px 2px 10px rgba(245, 158, 11, 0.4)'
                    }}></div>
                    <div style={{
                      width: '44px', height: '44px', backgroundColor: '#f59e0b', borderRadius: '50%',
                      boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.25), 2px 2px 10px rgba(245, 158, 11, 0.4)'
                    }}></div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', zIndex: 1 }}>
                    <div style={{
                      width: '44px', height: '44px', backgroundColor: '#8b5cf6', borderRadius: '50%',
                      boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(139, 92, 246, 0.4)'
                    }}></div>
                    <div style={{
                      width: '44px', height: '44px', backgroundColor: '#8b5cf6', borderRadius: '50%',
                      boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(139, 92, 246, 0.4)'
                    }}></div>
                    <div style={{
                      width: '44px', height: '44px', backgroundColor: '#8b5cf6', borderRadius: '50%',
                      boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(139, 92, 246, 0.4)'
                    }}></div>
                    <div style={{
                      width: '44px', height: '44px', backgroundColor: '#8b5cf6', borderRadius: '50%',
                      boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(139, 92, 246, 0.4)'
                    }}></div>
                    <div style={{
                      width: '44px', height: '44px', backgroundColor: '#8b5cf6', borderRadius: '50%',
                      boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(139, 92, 246, 0.4)'
                    }}></div>
                  </div>
                </div>

                {/* Equation Label */}
                <div style={{
                  backgroundColor: '#d9f99d',
                  padding: '12px 32px',
                  borderRadius: '24px',
                  fontSize: '2rem',
                  fontWeight: '900',
                  color: '#1e1b4b'
                }}>
                  10 + 5 = 15
                </div>
              </div>

              {/* Triangular Numbers Box */}
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '4px solid #f472b6',
                padding: '12px 32px',
                borderRadius: '24px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                minWidth: '400px'
              }}>
                <div style={{ color: '#be123c', fontSize: '1.4rem', fontWeight: '800' }}>
                  Triangular Numbers
                </div>
                <div style={{ color: '#1e1b4b', fontSize: '2.2rem', fontWeight: '900', display: 'flex', gap: '24px' }}>
                  <span>1</span>
                  <span>3</span>
                  <span>6</span>
                  <span>10</span>
                  <span>15</span>
                  <span>...</span>
                </div>
              </div>
            </div>
          </>
        )}


        {page === 14 && (
          <>
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '0', zIndex: 10 }}>
              <div style={{
                backgroundColor: '#0f172a',
                color: 'white',
                padding: '8px 20px',
                borderRadius: '12px',
                fontSize: '1.4rem',
                fontWeight: '900',
                zIndex: 2,
                boxShadow: '2px 2px 8px rgba(0,0,0,0.2)'
              }}>
                C1
              </div>
              <div style={{
                backgroundColor: '#fef08a',
                color: '#1e3a8a',
                padding: '8px 32px 8px 36px',
                borderRadius: '0 24px 24px 0',
                fontSize: '1.2rem',
                fontWeight: '700',
                marginLeft: '-16px',
                zIndex: 1,
                boxShadow: '2px 2px 8px rgba(0,0,0,0.1)'
              }}>
                Start with 1
              </div>
            </div>

            {/* Pink Sequence Bar */}
            <div style={{
              position: 'absolute',
              top: '110px',
              left: '50px',
              right: '50px',
              backgroundColor: '#fce7f3',
              borderRadius: '24px',
              padding: '16px 80px 16px 32px',
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              fontSize: '3.5rem',
              fontWeight: '800',
              color: '#1e1b4b',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              zIndex: 10,
              gap: '100px'
            }}>
              <div style={{ color: '#1e1b4b', fontSize: '1.5rem', marginRight: '20px' }}>Square Numbers</div>
              <span style={{ backgroundColor: '#f9a8d4', padding: '0 24px', borderRadius: '16px' }}>1</span>
              <span>4</span>
              <span>9</span>
              <span>16</span>
              <span>25</span>
              <span style={{ marginLeft: 'auto' }}>...</span>
            </div>

            {/* Boy Image (b4.png) */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: '-4%',
              width: '24%',
              height: '38%',
              zIndex: 5,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-start'
            }}>
              <img
                src={b4}
                alt="Boy"
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  objectPosition: 'left bottom',
                  display: 'block',
                }}
              />
            </div>

            {/* Speech Bubble (s4.png) */}
            <div style={{
              position: 'absolute',
              bottom: '28%',
              left: '18%',
              width: '18%',
              zIndex: 6
            }}>
              <img
                src={s4}
                alt="Speech bubble"
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />
            </div>

            {/* Frost Glass Box with Blue Dot */}
            <div style={{
              position: 'absolute',
              top: '55%',
              right: '20%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(10px)',
              borderRadius: '32px',
              padding: '80px 100px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              border: '2px solid rgba(255,255,255,1)',
              zIndex: 10
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#3b82f6',
                borderRadius: '50%',
                boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)',
                marginBottom: '40px'
              }}></div>

              <div style={{
                backgroundColor: '#fef08a',
                padding: '12px 32px',
                borderRadius: '16px',
                fontSize: '2.5rem',
                fontWeight: '900',
                color: '#1e1b4b'
              }}>
                1 × 1 = 1
              </div>
            </div>
          </>
        )}


        {page === 15 && (
          <>
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '0', zIndex: 10 }}>
              <div style={{
                backgroundColor: '#0f172a',
                color: 'white',
                padding: '8px 20px',
                borderRadius: '12px',
                fontSize: '1.4rem',
                fontWeight: '900',
                zIndex: 2,
                boxShadow: '2px 2px 8px rgba(0,0,0,0.2)'
              }}>
                C2
              </div>
              <div style={{
                backgroundColor: '#fef08a',
                color: '#1e3a8a',
                padding: '8px 32px 8px 36px',
                borderRadius: '0 24px 24px 0',
                fontSize: '1.2rem',
                fontWeight: '700',
                marginLeft: '-16px',
                zIndex: 1,
                boxShadow: '2px 2px 8px rgba(0,0,0,0.1)'
              }}>
                Add three more to make 4
              </div>
            </div>

            {/* Pink Sequence Bar */}
            <div style={{
              position: 'absolute',
              top: '110px',
              left: '50px',
              right: '50px',
              backgroundColor: '#fce7f3',
              borderRadius: '24px',
              padding: '16px 80px 16px 32px',
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              fontSize: '3.5rem',
              fontWeight: '800',
              color: '#1e1b4b',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              zIndex: 10,
              gap: '100px'
            }}>
              <div style={{ color: '#1e1b4b', fontSize: '1.5rem', marginRight: '20px' }}>Square Numbers</div>
              <span>1</span>
              <span style={{ backgroundColor: '#f9a8d4', padding: '0 24px', borderRadius: '16px' }}>4</span>
              <span>9</span>
              <span>16</span>
              <span>25</span>
              <span style={{ marginLeft: 'auto' }}>...</span>
            </div>

            {/* Boy Image (b5.png) */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: '-4%',
              width: '24%',
              height: '38%',
              zIndex: 5,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-start'
            }}>
              <img
                src={b5}
                alt="Boy"
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  objectPosition: 'left bottom',
                  display: 'block',
                }}
              />
            </div>

            {/* Speech Bubble (s11.png) */}
            <div style={{
              position: 'absolute',
              bottom: '35%',
              left: '18%',
              width: '28%',
              zIndex: 6
            }}>
              <img
                src={s11}
                alt="Speech bubble"
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />
            </div>

            {/* Target Left Box */}
            <div style={{
              position: 'absolute',
              top: '55%',
              right: '35%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(10px)',
              borderRadius: '32px',
              padding: '40px 50px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              border: '2px solid rgba(255,255,255,1)',
              zIndex: 10
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gridTemplateRows: '1fr 1fr',
                gap: '20px',
                marginBottom: '30px'
              }}>
                {/* Top-left: Blue dot */}
                <div style={{ width: '54px', height: '54px', borderRadius: '50%', backgroundColor: '#3b82f6', boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2)' }}></div>

                {/* Top-right: Empty/Target */}
                <div style={{ width: '54px', height: '54px', borderRadius: '50%', border: '4px dashed #f59e0b', position: 'relative' }}>
                  {movedBallsSquare2 && <motion.div layoutId="sqBall1" style={{ position: 'absolute', top: -4, left: -4, width: '54px', height: '54px', backgroundColor: '#f59e0b', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)' }} />}
                </div>

                {/* Bottom-left: Empty/Target */}
                <div style={{ width: '54px', height: '54px', borderRadius: '50%', border: '4px dashed #f59e0b', position: 'relative' }}>
                  {movedBallsSquare2 && <motion.div layoutId="sqBall2" style={{ position: 'absolute', top: -4, left: -4, width: '54px', height: '54px', backgroundColor: '#f59e0b', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)' }} />}
                </div>

                {/* Bottom-right: Empty/Target */}
                <div style={{ width: '54px', height: '54px', borderRadius: '50%', border: '4px dashed #f59e0b', position: 'relative' }}>
                  {movedBallsSquare2 && <motion.div layoutId="sqBall3" style={{ position: 'absolute', top: -4, left: -4, width: '54px', height: '54px', backgroundColor: '#f59e0b', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)' }} />}
                </div>
              </div>

              <div style={{
                backgroundColor: '#fef08a',
                padding: '12px 32px',
                borderRadius: '16px',
                fontSize: '2.5rem',
                fontWeight: '900',
                color: '#1e1b4b'
              }}>
                2 × 2 = 4
              </div>
            </div>

            {/* Dashed Arrow (Visible when not moved) */}
            {!movedBallsSquare2 && (
              <div style={{
                position: 'absolute',
                top: '55%',
                right: '25%',
                width: '10%',
                height: '60px',
                transform: 'translateY(-50%)',
                zIndex: 5,
                pointerEvents: 'none'
              }}>
                <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
                  <path d="M 90 20 Q 50 5 10 20" fill="transparent" stroke="#ea580c" strokeWidth="4" strokeDasharray="8 8" />
                  <polygon points="10,20 25,10 20,28" fill="#ea580c" />
                </svg>
              </div>
            )}

            {/* Source Right Box */}
            <div
              onClick={() => setMovedBallsSquare2(true)}
              style={{
                position: 'absolute',
                top: '55%',
                right: '10%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(10px)',
                borderRadius: '32px',
                padding: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                border: '4px solid #4ade80',
                zIndex: 11,
                cursor: 'pointer',
                minHeight: '200px'
              }}
            >
              <div style={{ position: 'relative', width: '100px', height: '140px' }}>
                {!movedBallsSquare2 && (
                  <div style={{ position: 'absolute', inset: 0 }}>
                    <motion.div layoutId="sqBall1" style={{ position: 'absolute', top: 0, left: 20, width: '54px', height: '54px', backgroundColor: '#f59e0b', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)', zIndex: 2 }} />
                    <motion.div layoutId="sqBall2" style={{ position: 'absolute', top: 60, left: -10, width: '54px', height: '54px', backgroundColor: '#f59e0b', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)', zIndex: 2 }} />
                    <motion.div layoutId="sqBall3" style={{ position: 'absolute', top: 90, left: 40, width: '54px', height: '54px', backgroundColor: '#f59e0b', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)', zIndex: 2 }} />
                  </div>
                )}
              </div>
            </div>
          </>
        )}


        {page === 16 && (
          <>
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '0', zIndex: 10 }}>
              <div style={{
                backgroundColor: '#0f172a',
                color: 'white',
                padding: '8px 20px',
                borderRadius: '12px',
                fontSize: '1.4rem',
                fontWeight: '900',
                zIndex: 2,
                boxShadow: '2px 2px 8px rgba(0,0,0,0.2)'
              }}>
                C3
              </div>
              <div style={{
                backgroundColor: '#fef08a',
                color: '#1e3a8a',
                padding: '8px 32px 8px 36px',
                borderRadius: '0 24px 24px 0',
                fontSize: '1.2rem',
                fontWeight: '700',
                marginLeft: '-16px',
                zIndex: 1,
                boxShadow: '2px 2px 8px rgba(0,0,0,0.1)'
              }}>
                Your turn - make 9
              </div>
            </div>

            {/* Pink Sequence Bar */}
            <div style={{
              position: 'absolute',
              top: '110px',
              left: '50px',
              right: '50px',
              backgroundColor: '#fce7f3',
              borderRadius: '24px',
              padding: '16px 80px 16px 32px',
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              fontSize: '3.5rem',
              fontWeight: '800',
              color: '#1e1b4b',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              zIndex: 10,
              gap: '100px'
            }}>
              <div style={{ color: '#1e1b4b', fontSize: '1.5rem', marginRight: '20px' }}>Square Numbers</div>
              <span>1</span>
              <span>4</span>
              <span style={{ backgroundColor: '#f9a8d4', padding: '0 24px', borderRadius: '16px' }}>9</span>
              <span>16</span>
              <span>25</span>
              <span style={{ marginLeft: 'auto' }}>...</span>
            </div>

            {/* Boy Image (b4.png) */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: '-4%',
              width: '24%',
              height: '38%',
              zIndex: 5,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-start'
            }}>
              <img
                src={b4}
                alt="Boy"
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  objectPosition: 'left bottom',
                  display: 'block',
                }}
              />
            </div>

            {/* Speech Bubble (s16.png) */}
            <div style={{
              position: 'absolute',
              bottom: '35%',
              left: '18%',
              width: '28%',
              zIndex: 6
            }}>
              <img
                src={s16}
                alt="Speech bubble"
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />
            </div>

            {/* Target Left Box */}
            <div style={{
              position: 'absolute',
              top: '55%',
              right: '35%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(10px)',
              borderRadius: '32px',
              padding: '40px 50px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              border: '2px solid rgba(255,255,255,1)',
              zIndex: 10
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gridTemplateRows: 'repeat(3, 1fr)',
                gap: '15px',
              }}>
                {/* Row 1 */}
                <div style={{ width: '54px', height: '54px', borderRadius: '50%', backgroundColor: '#3b82f6', boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2)' }}></div>
                <div style={{ width: '54px', height: '54px', borderRadius: '50%', backgroundColor: '#3b82f6', boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2)' }}></div>
                <div style={{ width: '54px', height: '54px', borderRadius: '50%', border: '4px dashed #f59e0b', position: 'relative' }}>
                  {movedBallsSquare3 && <motion.div layoutId="sq3Ball1" style={{ position: 'absolute', top: -4, left: -4, width: '54px', height: '54px', backgroundColor: '#f59e0b', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)' }} />}
                </div>

                {/* Row 2 */}
                <div style={{ width: '54px', height: '54px', borderRadius: '50%', backgroundColor: '#3b82f6', boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2)' }}></div>
                <div style={{ width: '54px', height: '54px', borderRadius: '50%', backgroundColor: '#3b82f6', boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2)' }}></div>
                <div style={{ width: '54px', height: '54px', borderRadius: '50%', border: '4px dashed #f59e0b', position: 'relative' }}>
                  {movedBallsSquare3 && <motion.div layoutId="sq3Ball2" style={{ position: 'absolute', top: -4, left: -4, width: '54px', height: '54px', backgroundColor: '#f59e0b', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)' }} />}
                </div>

                {/* Row 3 */}
                <div style={{ width: '54px', height: '54px', borderRadius: '50%', border: '4px dashed #f59e0b', position: 'relative' }}>
                  {movedBallsSquare3 && <motion.div layoutId="sq3Ball3" style={{ position: 'absolute', top: -4, left: -4, width: '54px', height: '54px', backgroundColor: '#f59e0b', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)' }} />}
                </div>
                <div style={{ width: '54px', height: '54px', borderRadius: '50%', border: '4px dashed #f59e0b', position: 'relative' }}>
                  {movedBallsSquare3 && <motion.div layoutId="sq3Ball4" style={{ position: 'absolute', top: -4, left: -4, width: '54px', height: '54px', backgroundColor: '#f59e0b', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)' }} />}
                </div>
                <div style={{ width: '54px', height: '54px', borderRadius: '50%', border: '4px dashed #f59e0b', position: 'relative' }}>
                  {movedBallsSquare3 && <motion.div layoutId="sq3Ball5" style={{ position: 'absolute', top: -4, left: -4, width: '54px', height: '54px', backgroundColor: '#f59e0b', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)' }} />}
                </div>
              </div>
            </div>

            {/* Dashed Arrow (Visible when not moved) */}
            {!movedBallsSquare3 && (
              <div style={{
                position: 'absolute',
                top: '55%',
                right: '25%',
                width: '10%',
                height: '60px',
                transform: 'translateY(-50%)',
                zIndex: 5,
                pointerEvents: 'none'
              }}>
                <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
                  <path d="M 90 20 Q 50 5 10 20" fill="transparent" stroke="#ea580c" strokeWidth="4" strokeDasharray="8 8" />
                  <polygon points="10,20 25,10 20,28" fill="#ea580c" />
                </svg>
              </div>
            )}

            {/* Source Right Box */}
            <div
              onClick={() => setMovedBallsSquare3(true)}
              style={{
                position: 'absolute',
                top: '55%',
                right: '10%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(10px)',
                borderRadius: '32px',
                padding: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                border: '4px solid #4ade80',
                zIndex: 11,
                cursor: 'pointer',
                minHeight: '220px'
              }}
            >
              <div style={{ position: 'relative', width: '130px', height: '150px' }}>
                {!movedBallsSquare3 && (
                  <div style={{ position: 'absolute', inset: 0 }}>
                    <motion.div layoutId="sq3Ball1" style={{ position: 'absolute', top: 0, left: 10, width: '54px', height: '54px', backgroundColor: '#f59e0b', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)', zIndex: 2 }} />
                    <motion.div layoutId="sq3Ball2" style={{ position: 'absolute', top: 0, left: 70, width: '54px', height: '54px', backgroundColor: '#f59e0b', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)', zIndex: 2 }} />
                    <motion.div layoutId="sq3Ball3" style={{ position: 'absolute', top: 60, left: 10, width: '54px', height: '54px', backgroundColor: '#f59e0b', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)', zIndex: 2 }} />
                    <motion.div layoutId="sq3Ball4" style={{ position: 'absolute', top: 60, left: 70, width: '54px', height: '54px', backgroundColor: '#f59e0b', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)', zIndex: 2 }} />
                    <motion.div layoutId="sq3Ball5" style={{ position: 'absolute', top: 120, left: 40, width: '54px', height: '54px', backgroundColor: '#f59e0b', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)', zIndex: 2 }} />
                  </div>
                )}
              </div>
            </div>
          </>
        )}


        {page === 17 && (
          <>
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '0', zIndex: 10 }}>
              <div style={{
                backgroundColor: '#0f172a',
                color: 'white',
                padding: '8px 20px',
                borderRadius: '12px',
                fontSize: '1.4rem',
                fontWeight: '900',
                zIndex: 2,
                boxShadow: '2px 2px 8px rgba(0,0,0,0.2)'
              }}>
                C3 (after placing)
              </div>
              <div style={{
                backgroundColor: '#fef08a',
                color: '#1e3a8a',
                padding: '8px 32px 8px 36px',
                borderRadius: '0 24px 24px 0',
                fontSize: '1.4rem',
                fontWeight: '800',
                marginLeft: '-16px',
                zIndex: 1,
                boxShadow: '2px 2px 8px rgba(0,0,0,0.1)'
              }}>
                4 + 5 = 9
              </div>
            </div>

            {/* Pink Sequence Bar */}
            <div style={{
              position: 'absolute',
              top: '110px',
              left: '50px',
              right: '50px',
              backgroundColor: '#fce7f3',
              borderRadius: '24px',
              padding: '16px 80px 16px 32px',
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              fontSize: '3.5rem',
              fontWeight: '800',
              color: '#1e1b4b',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              zIndex: 10,
              gap: '100px'
            }}>
              <div style={{ color: '#1e1b4b', fontSize: '1.5rem', marginRight: '20px' }}>Square Numbers</div>
              <span>1</span>
              <span>4</span>
              <span style={{ backgroundColor: '#f9a8d4', padding: '0 24px', borderRadius: '16px' }}>9</span>
              <span>16</span>
              <span>25</span>
              <span style={{ marginLeft: 'auto' }}>...</span>
            </div>

            {/* Boy Image (b11.png) */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: '-4%',
              width: '24%',
              height: '38%',
              zIndex: 5,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-start'
            }}>
              <img
                src={b11}
                alt="Boy"
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  objectPosition: 'left bottom',
                  display: 'block',
                }}
              />
            </div>

            {/* Center Box */}
            <div style={{
              position: 'absolute',
              top: '55%',
              right: '25%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(10px)',
              borderRadius: '32px',
              padding: '60px 80px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              border: '2px solid rgba(255,255,255,1)',
              zIndex: 10
            }}>
              {/* 3x3 Grid of dots */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gridTemplateRows: 'repeat(3, 1fr)',
                gap: '15px',
                marginBottom: '40px'
              }}>
                {/* Row 1 */}
                <div style={{ width: '54px', height: '54px', backgroundColor: '#3b82f6', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(59, 130, 246, 0.4)' }}></div>
                <div style={{ width: '54px', height: '54px', backgroundColor: '#3b82f6', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(59, 130, 246, 0.4)' }}></div>
                <div style={{ width: '54px', height: '54px', backgroundColor: '#f59e0b', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(245, 158, 11, 0.4)' }}></div>

                {/* Row 2 */}
                <div style={{ width: '54px', height: '54px', backgroundColor: '#3b82f6', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(59, 130, 246, 0.4)' }}></div>
                <div style={{ width: '54px', height: '54px', backgroundColor: '#3b82f6', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(59, 130, 246, 0.4)' }}></div>
                <div style={{ width: '54px', height: '54px', backgroundColor: '#f59e0b', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(245, 158, 11, 0.4)' }}></div>

                {/* Row 3 */}
                <div style={{ width: '54px', height: '54px', backgroundColor: '#f59e0b', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(245, 158, 11, 0.4)' }}></div>
                <div style={{ width: '54px', height: '54px', backgroundColor: '#f59e0b', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(245, 158, 11, 0.4)' }}></div>
                <div style={{ width: '54px', height: '54px', backgroundColor: '#f59e0b', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(245, 158, 11, 0.4)' }}></div>
              </div>

              {/* Equation Label */}
              <div style={{
                backgroundColor: '#d9f99d',
                padding: '12px 32px',
                borderRadius: '24px',
                fontSize: '2rem',
                fontWeight: '900',
                color: '#1e1b4b'
              }}>
                4 + 5 = 9
              </div>
            </div>
          </>
        )}


        {/* PAGE 18: Make 16 */}
        {page === 18 && (
          <>
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '0', zIndex: 10 }}>
              <div style={{
                backgroundColor: '#0f172a',
                color: 'white',
                padding: '8px 20px',
                borderRadius: '12px',
                fontSize: '1.4rem',
                fontWeight: '900',
                zIndex: 2,
                boxShadow: '2px 2px 8px rgba(0,0,0,0.2)'
              }}>
                C4
              </div>
              <div style={{
                backgroundColor: '#fef08a',
                color: '#1e3a8a',
                padding: '8px 32px 8px 36px',
                borderRadius: '0 24px 24px 0',
                fontSize: '1.2rem',
                fontWeight: '700',
                marginLeft: '-16px',
                zIndex: 1,
                boxShadow: '2px 2px 8px rgba(0,0,0,0.1)'
              }}>
                Next – make 16
              </div>
            </div>

            <div style={{
              position: 'absolute',
              top: '110px',
              left: '50px',
              right: '50px',
              backgroundColor: '#fce7f3',
              borderRadius: '24px',
              padding: '16px 80px 16px 32px',
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              fontSize: '3.5rem',
              fontWeight: '800',
              color: '#1e1b4b',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              zIndex: 10,
              gap: '100px'
            }}>
              <div style={{ color: '#1e1b4b', fontSize: '1.5rem', marginRight: '20px' }}>Square Numbers</div>
              <span>1</span>
              <span>4</span>
              <span>9</span>
              <span style={{ backgroundColor: '#f9a8d4', padding: '0 24px', borderRadius: '16px' }}>16</span>
              <span>25</span>
              <span style={{ marginLeft: 'auto' }}>...</span>
            </div>

            {/* Boy Image (b5.png) */}
            <div style={{
              position: 'absolute', bottom: 0, left: '-4%',
              width: '24%',
              height: '38%', zIndex: 5, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start'
            }}>
              <img src={b5} alt="Boy" style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', objectPosition: 'left bottom', display: 'block' }} />
            </div>

            {/* Speech Bubble (s13.png) */}
            <div style={{ position: 'absolute', bottom: '35%', left: '18%', width: '28%', zIndex: 6 }}>
              <img src={s13} alt="Speech bubble" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
            </div>

            <div style={{ position: 'absolute', top: '55%', right: '35%', transform: 'translateY(-50%)', backgroundColor: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(10px)', borderRadius: '32px', padding: '30px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', border: '2px solid rgba(255,255,255,1)', zIndex: 10 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                {Array.from({ length: 16 }).map((_, i) => {
                  const isBlue = (i % 4 < 3) && (Math.floor(i / 4) < 3); // 3x3 blue
                  if (isBlue) {
                    return <div key={i} style={{ width: '45px', height: '45px', backgroundColor: '#3b82f6', borderRadius: '50%', boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2)' }}></div>;
                  } else {
                    const orangeId = i === 3 ? 1 : i === 7 ? 2 : i === 11 ? 3 : i === 12 ? 4 : i === 13 ? 5 : i === 14 ? 6 : 7;
                    return (
                      <div key={i} style={{ width: '45px', height: '45px', borderRadius: '50%', border: '4px dashed #f59e0b', position: 'relative' }}>
                        {movedBallsSquare4 && <motion.div layoutId={`sq4Ball${orangeId}`} style={{ position: 'absolute', top: -4, left: -4, width: '45px', height: '45px', backgroundColor: '#f59e0b', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)' }} />}
                      </div>
                    );
                  }
                })}
              </div>
            </div>

            {!movedBallsSquare4 && (
              <div style={{ position: 'absolute', top: '55%', right: '25%', width: '10%', height: '60px', transform: 'translateY(-50%)', zIndex: 5, pointerEvents: 'none' }}>
                <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
                  <path d="M 90 20 Q 50 5 10 20" fill="transparent" stroke="#ea580c" strokeWidth="4" strokeDasharray="8 8" />
                  <polygon points="10,20 25,10 20,28" fill="#ea580c" />
                </svg>
              </div>
            )}

            <div onClick={() => setMovedBallsSquare4(true)} style={{ position: 'absolute', top: '55%', right: '10%', transform: 'translateY(-50%)', backgroundColor: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(10px)', borderRadius: '32px', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', border: '4px solid #4ade80', zIndex: 11, cursor: 'pointer', minHeight: '220px' }}>
              <div style={{ position: 'relative', width: '130px', height: '180px' }}>
                {!movedBallsSquare4 && (
                  <div style={{ position: 'absolute', inset: 0 }}>
                    <motion.div layoutId="sq4Ball1" style={{ position: 'absolute', top: 0, left: 10, width: '45px', height: '45px', backgroundColor: '#f59e0b', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)', zIndex: 2 }} />
                    <motion.div layoutId="sq4Ball2" style={{ position: 'absolute', top: 0, left: 70, width: '45px', height: '45px', backgroundColor: '#f59e0b', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)', zIndex: 2 }} />
                    <motion.div layoutId="sq4Ball3" style={{ position: 'absolute', top: 60, left: 10, width: '45px', height: '45px', backgroundColor: '#f59e0b', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)', zIndex: 2 }} />
                    <motion.div layoutId="sq4Ball4" style={{ position: 'absolute', top: 60, left: 70, width: '45px', height: '45px', backgroundColor: '#f59e0b', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)', zIndex: 2 }} />
                    <motion.div layoutId="sq4Ball5" style={{ position: 'absolute', top: 120, left: 10, width: '45px', height: '45px', backgroundColor: '#f59e0b', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)', zIndex: 2 }} />
                    <motion.div layoutId="sq4Ball6" style={{ position: 'absolute', top: 120, left: 70, width: '45px', height: '45px', backgroundColor: '#f59e0b', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)', zIndex: 2 }} />
                    <motion.div layoutId="sq4Ball7" style={{ position: 'absolute', top: 90, left: 40, width: '45px', height: '45px', backgroundColor: '#f59e0b', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)', zIndex: 2 }} />
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* PAGE 19: Make 16 (after placing) */}
        {page === 19 && (
          <>
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '0', zIndex: 10 }}>
              <div style={{ backgroundColor: '#0f172a', color: 'white', padding: '8px 20px', borderRadius: '12px', fontSize: '1.4rem', fontWeight: '900', zIndex: 2, boxShadow: '2px 2px 8px rgba(0,0,0,0.2)' }}>
                C4 (after placing)
              </div>
            </div>

            <div style={{
              position: 'absolute', top: '110px', left: '50px', right: '50px', backgroundColor: '#fce7f3', borderRadius: '24px', padding: '16px 80px 16px 32px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', fontSize: '3.5rem', fontWeight: '800', color: '#1e1b4b', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 10, gap: '100px'
            }}>
              <div style={{ color: '#1e1b4b', fontSize: '1.5rem', marginRight: '20px' }}>Square Numbers</div>
              <span>1</span>
              <span>4</span>
              <span>9</span>
              <span style={{ backgroundColor: '#f9a8d4', padding: '0 24px', borderRadius: '16px' }}>16</span>
              <span>25</span>
              <span style={{ marginLeft: 'auto' }}>...</span>
            </div>

            <div style={{
              position: 'absolute', bottom: 0, left: '-4%',
              width: '24%',
              height: '38%', zIndex: 5, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start'
            }}>
              <img src={b11} alt="Boy" style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', objectPosition: 'left bottom', display: 'block' }} />
            </div>

            <div style={{ position: 'absolute', top: '55%', right: '25%', transform: 'translateY(-50%)', backgroundColor: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(10px)', borderRadius: '32px', padding: '40px 60px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', border: '2px solid rgba(255,255,255,1)', zIndex: 10 }}>
              <div style={{ backgroundColor: '#fef08a', padding: '8px 24px', borderRadius: '16px', fontSize: '1.8rem', fontWeight: '900', color: '#1e1b4b', marginBottom: '20px' }}>4 × 4 = 16</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px' }}>
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} style={{ width: '45px', height: '45px', backgroundColor: '#3b82f6', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(59, 130, 246, 0.4)' }}></div>
                ))}
              </div>
              <div style={{ backgroundColor: '#fef08a', padding: '8px 24px', borderRadius: '16px', fontSize: '1.8rem', fontWeight: '900', color: '#1e1b4b' }}>4 × 4 = 16</div>
            </div>
          </>
        )}

        {/* PAGE 20: Make 25 */}
        {page === 20 && (
          <>
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '0', zIndex: 10 }}>
              <div style={{ backgroundColor: '#0f172a', color: 'white', padding: '8px 20px', borderRadius: '12px', fontSize: '1.4rem', fontWeight: '900', zIndex: 2, boxShadow: '2px 2px 8px rgba(0,0,0,0.2)' }}>
                C4 (continued)
              </div>
              <div style={{ backgroundColor: '#fef08a', color: '#1e3a8a', padding: '8px 32px 8px 36px', borderRadius: '0 24px 24px 0', fontSize: '1.2rem', fontWeight: '700', marginLeft: '-16px', zIndex: 1, boxShadow: '2px 2px 8px rgba(0,0,0,0.1)' }}>
                One more step - make 25
              </div>
            </div>

            <div style={{
              position: 'absolute', top: '110px', left: '50px', right: '50px', backgroundColor: '#fce7f3', borderRadius: '24px', padding: '16px 80px 16px 32px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', fontSize: '3.5rem', fontWeight: '800', color: '#1e1b4b', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 10, gap: '100px'
            }}>
              <div style={{ color: '#1e1b4b', fontSize: '1.5rem', marginRight: '20px' }}>Square Numbers</div>
              <span>1</span>
              <span>4</span>
              <span>9</span>
              <span>16</span>
              <span style={{ backgroundColor: '#f9a8d4', padding: '0 24px', borderRadius: '16px' }}>25</span>
              <span style={{ marginLeft: 'auto' }}>...</span>
            </div>

            <div style={{
              position: 'absolute', bottom: 0, left: '-4%',
              width: '24%',
              height: '38%', zIndex: 5, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start'
            }}>
              <img src={b5} alt="Boy" style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', objectPosition: 'left bottom', display: 'block' }} />
            </div>

            <div style={{ position: 'absolute', top: '55%', right: '35%', transform: 'translateY(-50%)', backgroundColor: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(10px)', borderRadius: '32px', padding: '20px 30px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', border: '2px solid rgba(255,255,255,1)', zIndex: 10 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
                {Array.from({ length: 25 }).map((_, i) => {
                  const isBlue = (i % 5 < 4) && (Math.floor(i / 5) < 4); // 4x4 blue
                  if (isBlue) {
                    return <div key={i} style={{ width: '40px', height: '40px', backgroundColor: '#3b82f6', borderRadius: '50%', boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2)' }}></div>;
                  } else {
                    const orangeId = i === 4 ? 1 : i === 9 ? 2 : i === 14 ? 3 : i === 19 ? 4 : i === 20 ? 5 : i === 21 ? 6 : i === 22 ? 7 : i === 23 ? 8 : 9;
                    return (
                      <div key={i} style={{ width: '40px', height: '40px', borderRadius: '50%', border: '4px dashed #f59e0b', position: 'relative' }}>
                        {movedBallsSquare5 && <motion.div layoutId={`sq5Ball${orangeId}`} style={{ position: 'absolute', top: -4, left: -4, width: '40px', height: '40px', backgroundColor: '#f59e0b', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)' }} />}
                      </div>
                    );
                  }
                })}
              </div>
            </div>

            {!movedBallsSquare5 && (
              <div style={{ position: 'absolute', top: '55%', right: '25%', width: '10%', height: '60px', transform: 'translateY(-50%)', zIndex: 5, pointerEvents: 'none' }}>
                <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
                  <path d="M 90 20 Q 50 5 10 20" fill="transparent" stroke="#ea580c" strokeWidth="4" strokeDasharray="8 8" />
                  <polygon points="10,20 25,10 20,28" fill="#ea580c" />
                </svg>
              </div>
            )}

            <div onClick={() => setMovedBallsSquare5(true)} style={{ position: 'absolute', top: '55%', right: '10%', transform: 'translateY(-50%)', backgroundColor: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(10px)', borderRadius: '32px', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', border: '4px solid #4ade80', zIndex: 11, cursor: 'pointer', minHeight: '220px' }}>
              <div style={{ position: 'relative', width: '130px', height: '180px' }}>
                {!movedBallsSquare5 && (
                  <div style={{ position: 'absolute', inset: 0 }}>
                    <motion.div layoutId="sq5Ball1" style={{ position: 'absolute', top: 0, left: 0, width: '40px', height: '40px', backgroundColor: '#f59e0b', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)', zIndex: 2 }} />
                    <motion.div layoutId="sq5Ball2" style={{ position: 'absolute', top: 0, left: 50, width: '40px', height: '40px', backgroundColor: '#f59e0b', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)', zIndex: 2 }} />
                    <motion.div layoutId="sq5Ball3" style={{ position: 'absolute', top: 0, left: 100, width: '40px', height: '40px', backgroundColor: '#f59e0b', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)', zIndex: 2 }} />
                    <motion.div layoutId="sq5Ball4" style={{ position: 'absolute', top: 50, left: 0, width: '40px', height: '40px', backgroundColor: '#f59e0b', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)', zIndex: 2 }} />
                    <motion.div layoutId="sq5Ball5" style={{ position: 'absolute', top: 50, left: 50, width: '40px', height: '40px', backgroundColor: '#f59e0b', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)', zIndex: 2 }} />
                    <motion.div layoutId="sq5Ball6" style={{ position: 'absolute', top: 50, left: 100, width: '40px', height: '40px', backgroundColor: '#f59e0b', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)', zIndex: 2 }} />
                    <motion.div layoutId="sq5Ball7" style={{ position: 'absolute', top: 100, left: 0, width: '40px', height: '40px', backgroundColor: '#f59e0b', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)', zIndex: 2 }} />
                    <motion.div layoutId="sq5Ball8" style={{ position: 'absolute', top: 100, left: 50, width: '40px', height: '40px', backgroundColor: '#f59e0b', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)', zIndex: 2 }} />
                    <motion.div layoutId="sq5Ball9" style={{ position: 'absolute', top: 100, left: 100, width: '40px', height: '40px', backgroundColor: '#f59e0b', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)', zIndex: 2 }} />
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* PAGE 21: Make 25 (after placing) */}
        {page === 21 && (
          <>
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '0', zIndex: 10 }}>
              <div style={{ backgroundColor: '#0f172a', color: 'white', padding: '8px 20px', borderRadius: '12px', fontSize: '1.4rem', fontWeight: '900', zIndex: 2, boxShadow: '2px 2px 8px rgba(0,0,0,0.2)' }}>
                C4 (after placing)
              </div>
            </div>

            <div style={{
              position: 'absolute', top: '110px', left: '50px', right: '50px', backgroundColor: '#fce7f3', borderRadius: '24px', padding: '16px 80px 16px 32px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', fontSize: '3.5rem', fontWeight: '800', color: '#1e1b4b', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 10, gap: '100px'
            }}>
              <div style={{ color: '#1e1b4b', fontSize: '1.5rem', marginRight: '20px' }}>Square Numbers</div>
              <span>1</span>
              <span>4</span>
              <span>9</span>
              <span>16</span>
              <span style={{ backgroundColor: '#f9a8d4', padding: '0 24px', borderRadius: '16px' }}>25</span>
              <span style={{ marginLeft: 'auto' }}>...</span>
            </div>

            <div style={{
              position: 'absolute', bottom: 0, left: '-4%',
              width: '24%',
              height: '38%', zIndex: 5, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start'
            }}>
              <img src={b11} alt="Boy" style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', objectPosition: 'left bottom', display: 'block' }} />
            </div>

            <div style={{ position: 'absolute', top: '55%', right: '25%', transform: 'translateY(-50%)', backgroundColor: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(10px)', borderRadius: '32px', padding: '40px 60px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', border: '2px solid rgba(255,255,255,1)', zIndex: 10 }}>
              <div style={{ backgroundColor: '#fef08a', padding: '8px 24px', borderRadius: '16px', fontSize: '1.8rem', fontWeight: '900', color: '#1e1b4b', marginBottom: '20px' }}>5 × 5 = 25</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', marginBottom: '20px' }}>
                {Array.from({ length: 25 }).map((_, i) => (
                  <div key={i} style={{ width: '40px', height: '40px', backgroundColor: '#3b82f6', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(59, 130, 246, 0.4)' }}></div>
                ))}
              </div>
              <div style={{ backgroundColor: '#fef08a', padding: '8px 24px', borderRadius: '16px', fontSize: '1.8rem', fontWeight: '900', color: '#1e1b4b' }}>5 × 5 = 25</div>
            </div>
          </>
        )}


        {/* PAGE 22: What do you notice? */}
        {page === 22 && (
          <>
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '0', zIndex: 10 }}>
              <div style={{ backgroundColor: '#0f172a', color: 'white', padding: '8px 20px', borderRadius: '12px', fontSize: '1.4rem', fontWeight: '900', zIndex: 2, boxShadow: '2px 2px 8px rgba(0,0,0,0.2)' }}>
                C5
              </div>
              <div style={{ backgroundColor: '#fef08a', color: '#1e3a8a', padding: '8px 32px 8px 36px', borderRadius: '0 24px 24px 0', fontSize: '1.4rem', fontWeight: '800', marginLeft: '-16px', zIndex: 1, boxShadow: '2px 2px 8px rgba(0,0,0,0.1)' }}>
                What do you notice?
              </div>
            </div>

            {/* Boy Left Image (b4.png) */}
            <div style={{ position: 'absolute', bottom: 0, left: '-2%', width: '22%', height: '40%', zIndex: 11, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start' }}>
              <img src={b4} alt="Boy" style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', objectPosition: 'left bottom', display: 'block' }} />
            </div>

            {/* Speech Bubble Left (s14.png) */}
            <div style={{ position: 'absolute', bottom: '20%', left: '13%', width: '18%', zIndex: 12 }}>
              <img src={s14} alt="Speech bubble" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
            </div>

            {/* Boy Right Image (b5.png) */}
            <div style={{ position: 'absolute', bottom: 0, right: '-2%', width: '22%', height: '40%', zIndex: 11, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
              <img src={b5} alt="Boy" style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', objectPosition: 'right bottom', display: 'block', transform: 'scaleX(-1)' }} />
            </div>

            {/* Speech Bubble Right (s15.png) */}
            <div style={{ position: 'absolute', top: '55%', right: '13%', width: '18%', zIndex: 12 }}>
              <img src={s15} alt="Speech bubble" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
            </div>

            {/* Main Center Container */}
            <div style={{
              position: 'absolute',
              top: '36%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '95%',
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(10px)',
              borderRadius: '32px',
              padding: '30px 40px 60px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              border: '2px solid rgba(255,255,255,1)',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>

              {/* 5 columns */}
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'flex-end', marginBottom: '20px' }}>
                {[
                  { n: 1, eq: '1 × 1 = 1' },
                  { n: 2, eq: '2 × 2 = 4' },
                  { n: 3, eq: '3 × 3 = 9' },
                  { n: 4, eq: '4 × 4 = 16' },
                  { n: 5, eq: '5 × 5 = 25' }
                ].map(({ n, eq }) => (
                  <div key={n} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>

                    {/* Square Card */}
                    <div style={{
                      backgroundColor: 'white',
                      padding: '12px',
                      borderRadius: '16px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                      border: '1px solid #e2e8f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '120px',
                      width: '120px'
                    }}>
                      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${n}, 1fr)`, gap: '4px' }}>
                        {Array.from({ length: n * n }).map((_, i) => (
                          <div key={i} style={{ width: n < 4 ? '16px' : '12px', height: n < 4 ? '16px' : '12px', backgroundColor: '#3b82f6', borderRadius: '50%', boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.2)' }}></div>
                        ))}
                      </div>
                    </div>

                    {/* Yellow Eq Label */}
                    <div style={{ backgroundColor: '#fef08a', padding: '6px 12px', borderRadius: '12px', fontSize: '1.2rem', fontWeight: '900', color: '#1e1b4b' }}>
                      {eq}
                    </div>

                    {/* Pink number label */}
                    <div style={{ backgroundColor: '#fbcfe8', padding: '4px 16px', borderRadius: '12px', fontSize: '1.2rem', fontWeight: '900', color: '#9d174d' }}>
                      {n * n}
                    </div>
                  </div>
                ))}
              </div>

              {/* Bracket */}
              <div style={{
                position: 'relative',
                width: '95%',
                height: '20px',
                borderBottom: '3px solid #1e3a8a',
                borderLeft: '3px solid #1e3a8a',
                borderRight: '3px solid #1e3a8a',
                borderRadius: '0 0 12px 12px',
                marginTop: '10px'
              }}>
                <div style={{
                  position: 'absolute',
                  bottom: '-22px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: '#fce7f3',
                  padding: '6px 24px',
                  borderRadius: '24px',
                  fontSize: '1.2rem',
                  fontWeight: '800',
                  color: '#1e1b4b',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}>
                  <span style={{ color: '#1e3a8a', marginRight: '16px' }}>Square Numbers</span>
                  1 &nbsp; 4 &nbsp; 9 &nbsp; 16 &nbsp; 25 &nbsp; ...
                </div>
              </div>
            </div>


          </>
        )}

        {/* PAGE 23: Cube Numbers Intro */}
        {page === 23 && (
          <>
            {/* Top Left Badge */}
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '0', zIndex: 10 }}>
              <div style={{ backgroundColor: '#0f172a', color: 'white', padding: '8px 20px', borderRadius: '12px', fontSize: '1.4rem', fontWeight: '900', zIndex: 2, boxShadow: '2px 2px 8px rgba(0,0,0,0.2)' }}>
                D1
              </div>
              <div style={{ backgroundColor: '#fef08a', color: '#1e3a8a', padding: '8px 32px 8px 36px', borderRadius: '0 24px 24px 0', fontSize: '1.4rem', fontWeight: '800', marginLeft: '-16px', zIndex: 1, boxShadow: '2px 2px 8px rgba(0,0,0,0.1)' }}>
                Start with a new sequence
              </div>
            </div>

            {/* Boy Left Image (b12.png) */}
            <div style={{ position: 'absolute', bottom: 0, left: '-2%', width: '32%', height: '55%', zIndex: 11, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start' }}>
              <img src={b12} alt="Boy" style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', objectPosition: 'left bottom', display: 'block' }} />
            </div>


            {/* Floating Sequence Row at the Top */}
            <div style={{
              position: 'absolute',
              top: '18%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80%',
              maxWidth: '1100px',
              backgroundColor: 'white',
              borderRadius: '24px',
              padding: '16px',
              boxShadow: '0 0 30px rgba(74, 222, 128, 0.4)',
              border: '4px solid #bbf7d0',
              zIndex: 10
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#f0fdf4',
                borderRadius: '16px',
                overflow: 'hidden'
              }}>
                <div style={{
                  backgroundColor: '#dcfce7',
                  color: '#14532d',
                  padding: '40px 32px',
                  width: '220px',
                  fontWeight: '800',
                  fontSize: '1.6rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  lineHeight: '1.3'
                }}>
                  Cube<br />Numbers
                </div>
                <div style={{
                  display: 'flex',
                  flex: 1,
                  justifyContent: 'space-around',
                  padding: '0 40px',
                  fontSize: '3rem',
                  fontWeight: '800',
                  color: '#1e1b4b'
                }}>
                  <span>1</span>
                  <span>8</span>
                  <span>27</span>
                  <span>64</span>
                  <span>125</span>
                  <span style={{ color: '#475569' }}>...</span>
                </div>
              </div>
            </div>

            {/* Bottom Right Content Container (Just the Cube now) */}
            <div style={{
              position: 'absolute',
              bottom: '12%',
              right: '12%',
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(10px)',
              borderRadius: '32px',
              padding: '40px 60px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              border: '2px solid rgba(255,255,255,1)',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '24px'
            }}>
              {/* 3D Cube Graphic */}
              <div style={{ position: 'relative', width: '150px', height: '150px' }}>
                <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ overflow: 'visible' }}>
                  {/* Top face */}
                  <polygon points="50,15 85,35 50,55 15,35" fill="#3b82f6" />
                  {/* Left face */}
                  <polygon points="15,35 50,55 50,95 15,75" fill="#1d4ed8" />
                  {/* Right face */}
                  <polygon points="50,55 85,35 85,75 50,95" fill="#2563eb" />

                  {/* Edge Highlights */}
                  <polyline points="15,35 50,15 85,35" fill="none" stroke="#60a5fa" strokeWidth="1.5" />
                  <line x1="50" y1="55" x2="50" y2="15" stroke="#93c5fd" strokeWidth="1.5" />
                  <line x1="50" y1="55" x2="15" y2="35" stroke="#93c5fd" strokeWidth="1.5" />
                  <line x1="50" y1="55" x2="85" y2="35" stroke="#60a5fa" strokeWidth="1.5" />
                </svg>
              </div>

              {/* Equation Pill */}
              <div style={{
                backgroundColor: '#fef08a',
                color: '#1e3a8a',
                fontWeight: '900',
                fontSize: '1.8rem',
                padding: '12px 32px',
                borderRadius: '24px',
                whiteSpace: 'nowrap'
              }}>
                1 × 1 × 1 = 1
              </div>
            </div>
          </>
        )}

        {/* PAGE 24: Cube layers comparison */}
        {page === 24 && (
          <>
            {/* Top Left Badge */}
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '0', zIndex: 10 }}>
              <div style={{ backgroundColor: '#0f172a', color: 'white', padding: '8px 20px', borderRadius: '12px', fontSize: '1.4rem', fontWeight: '900', zIndex: 2, boxShadow: '2px 2px 8px rgba(0,0,0,0.2)' }}>
                D2
              </div>
              <div style={{ backgroundColor: '#fef08a', color: '#1e3a8a', padding: '8px 32px 8px 36px', borderRadius: '0 24px 24px 0', fontSize: '1.4rem', fontWeight: '800', marginLeft: '-16px', zIndex: 1, boxShadow: '2px 2px 8px rgba(0,0,0,0.1)' }}>
                Add two more to make 8
              </div>
            </div>

            {/* Boy Left Image (b4.png) */}
            <div style={{
              position: 'absolute', bottom: 0, left: '-4%',
              width: '25%', height: '45%', zIndex: 11, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start'
            }}>
              <img src={b4} alt="Boy" style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', objectPosition: 'left bottom', display: 'block' }} />
            </div>

            {/* Speech Bubble (s17.png) */}
            <div style={{ position: 'absolute', bottom: '25%', left: '14%', width: '20%', zIndex: 12 }}>
              <img src={s17} alt="Speech bubble" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
            </div>

            {/* Center Content Container */}
            <div style={{
              position: 'absolute',
              top: '35%',
              left: '55%',
              transform: 'translate(-50%, -50%)',
              width: '65%',
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(10px)',
              borderRadius: '32px',
              padding: '40px 60px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              border: '2px solid rgba(255,255,255,1)',
              zIndex: 10,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-around'
            }}>

              {/* Left Side: 1 layer */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                <div style={{ position: 'relative', width: '160px', height: '160px' }}>
                  <svg viewBox="-60 -60 120 120" width="100%" height="100%" style={{ overflow: 'visible' }}>
                    {/* Render 2x2 layer of blue cubes */}
                    <g transform="translate(0, -5)">
                      {/* Back (0,0) */}
                      <g transform="translate(0, 0)">
                        <polygon points="0,-35 30.3,-17.5 0,0 -30.3,-17.5" fill="#60a5fa" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,35 -30.3,17.5 -30.3,-17.5" fill="#1d4ed8" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="30.3,-17.5 30.3,17.5 0,35 0,0" fill="#2563eb" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                      {/* Left (1,0) */}
                      <g transform="translate(-30.3, 17.5)">
                        <polygon points="0,-35 30.3,-17.5 0,0 -30.3,-17.5" fill="#60a5fa" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,35 -30.3,17.5 -30.3,-17.5" fill="#1d4ed8" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="30.3,-17.5 30.3,17.5 0,35 0,0" fill="#2563eb" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                      {/* Right (0,1) */}
                      <g transform="translate(30.3, 17.5)">
                        <polygon points="0,-35 30.3,-17.5 0,0 -30.3,-17.5" fill="#60a5fa" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,35 -30.3,17.5 -30.3,-17.5" fill="#1d4ed8" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="30.3,-17.5 30.3,17.5 0,35 0,0" fill="#2563eb" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                      {/* Front (1,1) */}
                      <g transform="translate(0, 35)">
                        <polygon points="0,-35 30.3,-17.5 0,0 -30.3,-17.5" fill="#60a5fa" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,35 -30.3,17.5 -30.3,-17.5" fill="#1d4ed8" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="30.3,-17.5 30.3,17.5 0,35 0,0" fill="#2563eb" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                    </g>
                  </svg>
                </div>
                <div style={{ backgroundColor: '#fef08a', padding: '12px 24px', borderRadius: '16px', textAlign: 'center', color: '#1e3a8a', fontWeight: '800', fontSize: '1.2rem', lineHeight: '1.4' }}>
                  1 layer = 4 cubes<br />(2 × 2)
                </div>
              </div>

              {/* Middle: Arrows */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '160px', paddingBottom: '70px', gap: '20px', opacity: page24Step >= 1 ? 1 : 0, transition: 'opacity 0.8s ease-in-out' }}>
                {/* Curved Arrow */}
                <svg width="60" height="40" viewBox="0 0 60 40" style={{ overflow: 'visible' }}>
                  <path d="M 0,30 Q 30,-10 60,30" fill="none" stroke="#2563eb" strokeWidth="4" strokeDasharray="6,4" />
                  <polygon points="60,30 50,22 54,34" fill="#2563eb" />
                </svg>
                {/* Straight Arrow */}
                <svg width="40" height="30" viewBox="0 0 40 30">
                  <path d="M 0,10 L 20,10 L 20,0 L 40,15 L 20,30 L 20,20 L 0,20 Z" fill="#2563eb" />
                </svg>
              </div>

              {/* Right Side: 2 layers */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', opacity: page24Step >= 1 ? 1 : 0, transition: 'opacity 0.8s ease-in-out 0.4s' }}>
                <div style={{ position: 'relative', width: '160px', height: '160px' }}>
                  <svg viewBox="-60 -60 120 120" width="100%" height="100%" style={{ overflow: 'visible' }}>
                    {/* Layer z=0 (blue) */}
                    <g transform="translate(0, -5)">
                      <g transform="translate(0, 0)">
                        <polygon points="0,-35 30.3,-17.5 0,0 -30.3,-17.5" fill="#60a5fa" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,35 -30.3,17.5 -30.3,-17.5" fill="#1d4ed8" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="30.3,-17.5 30.3,17.5 0,35 0,0" fill="#2563eb" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                      <g transform="translate(-30.3, 17.5)">
                        <polygon points="0,-35 30.3,-17.5 0,0 -30.3,-17.5" fill="#60a5fa" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,35 -30.3,17.5 -30.3,-17.5" fill="#1d4ed8" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="30.3,-17.5 30.3,17.5 0,35 0,0" fill="#2563eb" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                      <g transform="translate(30.3, 17.5)">
                        <polygon points="0,-35 30.3,-17.5 0,0 -30.3,-17.5" fill="#60a5fa" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,35 -30.3,17.5 -30.3,-17.5" fill="#1d4ed8" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="30.3,-17.5 30.3,17.5 0,35 0,0" fill="#2563eb" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                      <g transform="translate(0, 35)">
                        <polygon points="0,-35 30.3,-17.5 0,0 -30.3,-17.5" fill="#60a5fa" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,35 -30.3,17.5 -30.3,-17.5" fill="#1d4ed8" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="30.3,-17.5 30.3,17.5 0,35 0,0" fill="#2563eb" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                    </g>
                    {/* Layer z=1 (orange) */}
                    <g transform="translate(0, -40)">
                      <g transform="translate(0, 0)">
                        <polygon points="0,-35 30.3,-17.5 0,0 -30.3,-17.5" fill="#fbbf24" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,35 -30.3,17.5 -30.3,-17.5" fill="#d97706" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="30.3,-17.5 30.3,17.5 0,35 0,0" fill="#f59e0b" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                      <g transform="translate(-30.3, 17.5)">
                        <polygon points="0,-35 30.3,-17.5 0,0 -30.3,-17.5" fill="#fbbf24" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,35 -30.3,17.5 -30.3,-17.5" fill="#d97706" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="30.3,-17.5 30.3,17.5 0,35 0,0" fill="#f59e0b" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                      <g transform="translate(30.3, 17.5)">
                        <polygon points="0,-35 30.3,-17.5 0,0 -30.3,-17.5" fill="#fbbf24" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,35 -30.3,17.5 -30.3,-17.5" fill="#d97706" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="30.3,-17.5 30.3,17.5 0,35 0,0" fill="#f59e0b" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                      <g transform="translate(0, 35)">
                        <polygon points="0,-35 30.3,-17.5 0,0 -30.3,-17.5" fill="#fbbf24" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,35 -30.3,17.5 -30.3,-17.5" fill="#d97706" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="30.3,-17.5 30.3,17.5 0,35 0,0" fill="#f59e0b" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                    </g>
                  </svg>
                </div>
                <div style={{ backgroundColor: '#fef08a', padding: '12px 24px', borderRadius: '16px', textAlign: 'center', color: '#1e3a8a', fontWeight: '800', fontSize: '1.2rem', lineHeight: '1.4' }}>
                  2 layers = 8 cubes<br />(2 × 2 × 2)
                </div>
              </div>
            </div>
          </>
        )}


        {/* PAGE 25: 3x3 Cube layers comparison */}
        {page === 25 && (
          <>
            {/* Boy Left Image (b4.png) */}
            <div style={{
              position: 'absolute', bottom: 0, left: '-4%',
              width: '25%', height: '45%', zIndex: 11, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start'
            }}>
              <img src={b4} alt="Boy" style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', objectPosition: 'left bottom', display: 'block' }} />
            </div>

            {/* Speech Bubble (s18.png) */}
            <div style={{ position: 'absolute', bottom: '25%', left: '16%', width: '18%', zIndex: 12 }}>
              <img src={s18} alt="Speech bubble" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
            </div>

            {/* Center Content Container */}
            <div style={{
              position: 'absolute',
              top: '35%',
              left: '55%',
              transform: 'translate(-50%, -50%)',
              width: '85%',
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(10px)',
              borderRadius: '32px',
              padding: '40px 40px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              border: '2px solid rgba(255,255,255,1)',
              zIndex: 10,
              display: 'flex',
              alignItems: 'flex-end',
              opacity: page25Step >= 1 ? 1 : 0,
              transition: 'opacity 0.8s ease-in-out',
              justifyContent: 'space-around'
            }}>

              {/* Left Side: 1 layer */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                <div style={{ position: 'relative', width: '150px', height: '160px' }}>
                  <svg viewBox="-90 -80 180 160" width="100%" height="100%" style={{ overflow: 'visible' }}>
                    {/* Layer z=0 */}
                    <g transform="translate(0, -15)">
                      <g transform="translate(0.0, 0.0)">
                        <polygon points="0,-22 19.1,-11.0 0,0 -19.1,-11.0" fill="#60a5fa" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,22 -19.1,11.0 -19.1,-11.0" fill="#1d4ed8" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="19.1,-11.0 19.1,11.0 0,22 0,0" fill="#2563eb" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                      <g transform="translate(19.1, 11.0)">
                        <polygon points="0,-22 19.1,-11.0 0,0 -19.1,-11.0" fill="#60a5fa" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,22 -19.1,11.0 -19.1,-11.0" fill="#1d4ed8" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="19.1,-11.0 19.1,11.0 0,22 0,0" fill="#2563eb" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                      <g transform="translate(38.1, 22.0)">
                        <polygon points="0,-22 19.1,-11.0 0,0 -19.1,-11.0" fill="#60a5fa" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,22 -19.1,11.0 -19.1,-11.0" fill="#1d4ed8" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="19.1,-11.0 19.1,11.0 0,22 0,0" fill="#2563eb" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                      <g transform="translate(-19.1, 11.0)">
                        <polygon points="0,-22 19.1,-11.0 0,0 -19.1,-11.0" fill="#60a5fa" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,22 -19.1,11.0 -19.1,-11.0" fill="#1d4ed8" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="19.1,-11.0 19.1,11.0 0,22 0,0" fill="#2563eb" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                      <g transform="translate(0.0, 22.0)">
                        <polygon points="0,-22 19.1,-11.0 0,0 -19.1,-11.0" fill="#60a5fa" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,22 -19.1,11.0 -19.1,-11.0" fill="#1d4ed8" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="19.1,-11.0 19.1,11.0 0,22 0,0" fill="#2563eb" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                      <g transform="translate(19.1, 33.0)">
                        <polygon points="0,-22 19.1,-11.0 0,0 -19.1,-11.0" fill="#60a5fa" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,22 -19.1,11.0 -19.1,-11.0" fill="#1d4ed8" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="19.1,-11.0 19.1,11.0 0,22 0,0" fill="#2563eb" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                      <g transform="translate(-38.1, 22.0)">
                        <polygon points="0,-22 19.1,-11.0 0,0 -19.1,-11.0" fill="#60a5fa" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,22 -19.1,11.0 -19.1,-11.0" fill="#1d4ed8" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="19.1,-11.0 19.1,11.0 0,22 0,0" fill="#2563eb" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                      <g transform="translate(-19.1, 33.0)">
                        <polygon points="0,-22 19.1,-11.0 0,0 -19.1,-11.0" fill="#60a5fa" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,22 -19.1,11.0 -19.1,-11.0" fill="#1d4ed8" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="19.1,-11.0 19.1,11.0 0,22 0,0" fill="#2563eb" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                      <g transform="translate(0.0, 44.0)">
                        <polygon points="0,-22 19.1,-11.0 0,0 -19.1,-11.0" fill="#60a5fa" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,22 -19.1,11.0 -19.1,-11.0" fill="#1d4ed8" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="19.1,-11.0 19.1,11.0 0,22 0,0" fill="#2563eb" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                    </g>
                  </svg>
                </div>
                <div style={{ backgroundColor: '#fef08a', padding: '12px 24px', borderRadius: '16px', textAlign: 'center', color: '#1e3a8a', fontWeight: '800', fontSize: '1.2rem', lineHeight: '1.4' }}>
                  1 layer = 9 cubes<br />(3 × 3)
                </div>
              </div>

              {/* Middle Arrow 1 */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '160px', paddingBottom: '70px' }}>
                <svg width="40" height="30" viewBox="0 0 40 30">
                  <path d="M 0,10 L 20,10 L 20,0 L 40,15 L 20,30 L 20,20 L 0,20 Z" fill="#2563eb" />
                </svg>
              </div>

              {/* Middle Side: 2 layers */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                <div style={{ position: 'relative', width: '150px', height: '160px' }}>
                  <svg viewBox="-90 -80 180 160" width="100%" height="100%" style={{ overflow: 'visible' }}>
                    {/* Layer z=0 */}
                    <g transform="translate(0, -15)">
                      <g transform="translate(0.0, 0.0)">
                        <polygon points="0,-22 19.1,-11.0 0,0 -19.1,-11.0" fill="#60a5fa" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,22 -19.1,11.0 -19.1,-11.0" fill="#1d4ed8" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="19.1,-11.0 19.1,11.0 0,22 0,0" fill="#2563eb" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                      <g transform="translate(19.1, 11.0)">
                        <polygon points="0,-22 19.1,-11.0 0,0 -19.1,-11.0" fill="#60a5fa" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,22 -19.1,11.0 -19.1,-11.0" fill="#1d4ed8" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="19.1,-11.0 19.1,11.0 0,22 0,0" fill="#2563eb" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                      <g transform="translate(38.1, 22.0)">
                        <polygon points="0,-22 19.1,-11.0 0,0 -19.1,-11.0" fill="#60a5fa" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,22 -19.1,11.0 -19.1,-11.0" fill="#1d4ed8" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="19.1,-11.0 19.1,11.0 0,22 0,0" fill="#2563eb" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                      <g transform="translate(-19.1, 11.0)">
                        <polygon points="0,-22 19.1,-11.0 0,0 -19.1,-11.0" fill="#60a5fa" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,22 -19.1,11.0 -19.1,-11.0" fill="#1d4ed8" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="19.1,-11.0 19.1,11.0 0,22 0,0" fill="#2563eb" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                      <g transform="translate(0.0, 22.0)">
                        <polygon points="0,-22 19.1,-11.0 0,0 -19.1,-11.0" fill="#60a5fa" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,22 -19.1,11.0 -19.1,-11.0" fill="#1d4ed8" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="19.1,-11.0 19.1,11.0 0,22 0,0" fill="#2563eb" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                      <g transform="translate(19.1, 33.0)">
                        <polygon points="0,-22 19.1,-11.0 0,0 -19.1,-11.0" fill="#60a5fa" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,22 -19.1,11.0 -19.1,-11.0" fill="#1d4ed8" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="19.1,-11.0 19.1,11.0 0,22 0,0" fill="#2563eb" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                      <g transform="translate(-38.1, 22.0)">
                        <polygon points="0,-22 19.1,-11.0 0,0 -19.1,-11.0" fill="#60a5fa" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,22 -19.1,11.0 -19.1,-11.0" fill="#1d4ed8" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="19.1,-11.0 19.1,11.0 0,22 0,0" fill="#2563eb" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                      <g transform="translate(-19.1, 33.0)">
                        <polygon points="0,-22 19.1,-11.0 0,0 -19.1,-11.0" fill="#60a5fa" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,22 -19.1,11.0 -19.1,-11.0" fill="#1d4ed8" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="19.1,-11.0 19.1,11.0 0,22 0,0" fill="#2563eb" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                      <g transform="translate(0.0, 44.0)">
                        <polygon points="0,-22 19.1,-11.0 0,0 -19.1,-11.0" fill="#60a5fa" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,22 -19.1,11.0 -19.1,-11.0" fill="#1d4ed8" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="19.1,-11.0 19.1,11.0 0,22 0,0" fill="#2563eb" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                    </g>
                    {/* Layer z=1 */}
                    <g transform="translate(0, -37)">
                      <g transform="translate(0.0, 0.0)">
                        <polygon points="0,-22 19.1,-11.0 0,0 -19.1,-11.0" fill="#fbbf24" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,22 -19.1,11.0 -19.1,-11.0" fill="#d97706" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="19.1,-11.0 19.1,11.0 0,22 0,0" fill="#f59e0b" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                      <g transform="translate(19.1, 11.0)">
                        <polygon points="0,-22 19.1,-11.0 0,0 -19.1,-11.0" fill="#fbbf24" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,22 -19.1,11.0 -19.1,-11.0" fill="#d97706" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="19.1,-11.0 19.1,11.0 0,22 0,0" fill="#f59e0b" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                      <g transform="translate(38.1, 22.0)">
                        <polygon points="0,-22 19.1,-11.0 0,0 -19.1,-11.0" fill="#fbbf24" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,22 -19.1,11.0 -19.1,-11.0" fill="#d97706" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="19.1,-11.0 19.1,11.0 0,22 0,0" fill="#f59e0b" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                      <g transform="translate(-19.1, 11.0)">
                        <polygon points="0,-22 19.1,-11.0 0,0 -19.1,-11.0" fill="#fbbf24" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,22 -19.1,11.0 -19.1,-11.0" fill="#d97706" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="19.1,-11.0 19.1,11.0 0,22 0,0" fill="#f59e0b" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                      <g transform="translate(0.0, 22.0)">
                        <polygon points="0,-22 19.1,-11.0 0,0 -19.1,-11.0" fill="#fbbf24" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,22 -19.1,11.0 -19.1,-11.0" fill="#d97706" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="19.1,-11.0 19.1,11.0 0,22 0,0" fill="#f59e0b" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                      <g transform="translate(19.1, 33.0)">
                        <polygon points="0,-22 19.1,-11.0 0,0 -19.1,-11.0" fill="#fbbf24" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,22 -19.1,11.0 -19.1,-11.0" fill="#d97706" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="19.1,-11.0 19.1,11.0 0,22 0,0" fill="#f59e0b" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                      <g transform="translate(-38.1, 22.0)">
                        <polygon points="0,-22 19.1,-11.0 0,0 -19.1,-11.0" fill="#fbbf24" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,22 -19.1,11.0 -19.1,-11.0" fill="#d97706" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="19.1,-11.0 19.1,11.0 0,22 0,0" fill="#f59e0b" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                      <g transform="translate(-19.1, 33.0)">
                        <polygon points="0,-22 19.1,-11.0 0,0 -19.1,-11.0" fill="#fbbf24" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,22 -19.1,11.0 -19.1,-11.0" fill="#d97706" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="19.1,-11.0 19.1,11.0 0,22 0,0" fill="#f59e0b" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                      <g transform="translate(0.0, 44.0)">
                        <polygon points="0,-22 19.1,-11.0 0,0 -19.1,-11.0" fill="#fbbf24" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,22 -19.1,11.0 -19.1,-11.0" fill="#d97706" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="19.1,-11.0 19.1,11.0 0,22 0,0" fill="#f59e0b" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                    </g>
                  </svg>
                </div>
                <div style={{ backgroundColor: '#fef08a', padding: '12px 24px', borderRadius: '16px', textAlign: 'center', color: '#1e3a8a', fontWeight: '800', fontSize: '1.2rem', lineHeight: '1.4' }}>
                  2 layers = 18 cubes<br />(9 × 2)
                </div>
              </div>

              {/* Middle Arrow 2 */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '160px', paddingBottom: '70px' }}>
                <svg width="40" height="30" viewBox="0 0 40 30">
                  <path d="M 0,10 L 20,10 L 20,0 L 40,15 L 20,30 L 20,20 L 0,20 Z" fill="#2563eb" />
                </svg>
              </div>

              {/* Right Side: 3 layers */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                <div style={{ position: 'relative', width: '150px', height: '160px' }}>
                  <svg viewBox="-90 -80 180 160" width="100%" height="100%" style={{ overflow: 'visible' }}>
                    {/* Layer z=0 */}
                    <g transform="translate(0, -15)">
                      <g transform="translate(0.0, 0.0)">
                        <polygon points="0,-22 19.1,-11.0 0,0 -19.1,-11.0" fill="#60a5fa" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,22 -19.1,11.0 -19.1,-11.0" fill="#1d4ed8" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="19.1,-11.0 19.1,11.0 0,22 0,0" fill="#2563eb" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                      <g transform="translate(19.1, 11.0)">
                        <polygon points="0,-22 19.1,-11.0 0,0 -19.1,-11.0" fill="#60a5fa" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,22 -19.1,11.0 -19.1,-11.0" fill="#1d4ed8" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="19.1,-11.0 19.1,11.0 0,22 0,0" fill="#2563eb" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                      <g transform="translate(38.1, 22.0)">
                        <polygon points="0,-22 19.1,-11.0 0,0 -19.1,-11.0" fill="#60a5fa" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,22 -19.1,11.0 -19.1,-11.0" fill="#1d4ed8" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="19.1,-11.0 19.1,11.0 0,22 0,0" fill="#2563eb" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                      <g transform="translate(-19.1, 11.0)">
                        <polygon points="0,-22 19.1,-11.0 0,0 -19.1,-11.0" fill="#60a5fa" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,22 -19.1,11.0 -19.1,-11.0" fill="#1d4ed8" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="19.1,-11.0 19.1,11.0 0,22 0,0" fill="#2563eb" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                      <g transform="translate(0.0, 22.0)">
                        <polygon points="0,-22 19.1,-11.0 0,0 -19.1,-11.0" fill="#60a5fa" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,22 -19.1,11.0 -19.1,-11.0" fill="#1d4ed8" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="19.1,-11.0 19.1,11.0 0,22 0,0" fill="#2563eb" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                      <g transform="translate(19.1, 33.0)">
                        <polygon points="0,-22 19.1,-11.0 0,0 -19.1,-11.0" fill="#60a5fa" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,22 -19.1,11.0 -19.1,-11.0" fill="#1d4ed8" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="19.1,-11.0 19.1,11.0 0,22 0,0" fill="#2563eb" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                      <g transform="translate(-38.1, 22.0)">
                        <polygon points="0,-22 19.1,-11.0 0,0 -19.1,-11.0" fill="#60a5fa" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,22 -19.1,11.0 -19.1,-11.0" fill="#1d4ed8" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="19.1,-11.0 19.1,11.0 0,22 0,0" fill="#2563eb" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                      <g transform="translate(-19.1, 33.0)">
                        <polygon points="0,-22 19.1,-11.0 0,0 -19.1,-11.0" fill="#60a5fa" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,22 -19.1,11.0 -19.1,-11.0" fill="#1d4ed8" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="19.1,-11.0 19.1,11.0 0,22 0,0" fill="#2563eb" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                      <g transform="translate(0.0, 44.0)">
                        <polygon points="0,-22 19.1,-11.0 0,0 -19.1,-11.0" fill="#60a5fa" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,22 -19.1,11.0 -19.1,-11.0" fill="#1d4ed8" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="19.1,-11.0 19.1,11.0 0,22 0,0" fill="#2563eb" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                    </g>
                    {/* Layer z=1 */}
                    <g transform="translate(0, -37)">
                      <g transform="translate(0.0, 0.0)">
                        <polygon points="0,-22 19.1,-11.0 0,0 -19.1,-11.0" fill="#fbbf24" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,22 -19.1,11.0 -19.1,-11.0" fill="#d97706" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="19.1,-11.0 19.1,11.0 0,22 0,0" fill="#f59e0b" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                      <g transform="translate(19.1, 11.0)">
                        <polygon points="0,-22 19.1,-11.0 0,0 -19.1,-11.0" fill="#fbbf24" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,22 -19.1,11.0 -19.1,-11.0" fill="#d97706" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="19.1,-11.0 19.1,11.0 0,22 0,0" fill="#f59e0b" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                      <g transform="translate(38.1, 22.0)">
                        <polygon points="0,-22 19.1,-11.0 0,0 -19.1,-11.0" fill="#fbbf24" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,22 -19.1,11.0 -19.1,-11.0" fill="#d97706" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="19.1,-11.0 19.1,11.0 0,22 0,0" fill="#f59e0b" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                      <g transform="translate(-19.1, 11.0)">
                        <polygon points="0,-22 19.1,-11.0 0,0 -19.1,-11.0" fill="#fbbf24" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,22 -19.1,11.0 -19.1,-11.0" fill="#d97706" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="19.1,-11.0 19.1,11.0 0,22 0,0" fill="#f59e0b" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                      <g transform="translate(0.0, 22.0)">
                        <polygon points="0,-22 19.1,-11.0 0,0 -19.1,-11.0" fill="#fbbf24" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,22 -19.1,11.0 -19.1,-11.0" fill="#d97706" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="19.1,-11.0 19.1,11.0 0,22 0,0" fill="#f59e0b" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                      <g transform="translate(19.1, 33.0)">
                        <polygon points="0,-22 19.1,-11.0 0,0 -19.1,-11.0" fill="#fbbf24" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,22 -19.1,11.0 -19.1,-11.0" fill="#d97706" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="19.1,-11.0 19.1,11.0 0,22 0,0" fill="#f59e0b" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                      <g transform="translate(-38.1, 22.0)">
                        <polygon points="0,-22 19.1,-11.0 0,0 -19.1,-11.0" fill="#fbbf24" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,22 -19.1,11.0 -19.1,-11.0" fill="#d97706" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="19.1,-11.0 19.1,11.0 0,22 0,0" fill="#f59e0b" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                      <g transform="translate(-19.1, 33.0)">
                        <polygon points="0,-22 19.1,-11.0 0,0 -19.1,-11.0" fill="#fbbf24" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,22 -19.1,11.0 -19.1,-11.0" fill="#d97706" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="19.1,-11.0 19.1,11.0 0,22 0,0" fill="#f59e0b" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                      <g transform="translate(0.0, 44.0)">
                        <polygon points="0,-22 19.1,-11.0 0,0 -19.1,-11.0" fill="#fbbf24" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,22 -19.1,11.0 -19.1,-11.0" fill="#d97706" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="19.1,-11.0 19.1,11.0 0,22 0,0" fill="#f59e0b" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                    </g>
                    {/* Layer z=2 */}
                    <g transform="translate(0, -59)">
                      <g transform="translate(0.0, 0.0)">
                        <polygon points="0,-22 19.1,-11.0 0,0 -19.1,-11.0" fill="#4ade80" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,22 -19.1,11.0 -19.1,-11.0" fill="#15803d" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="19.1,-11.0 19.1,11.0 0,22 0,0" fill="#16a34a" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                      <g transform="translate(19.1, 11.0)">
                        <polygon points="0,-22 19.1,-11.0 0,0 -19.1,-11.0" fill="#4ade80" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,22 -19.1,11.0 -19.1,-11.0" fill="#15803d" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="19.1,-11.0 19.1,11.0 0,22 0,0" fill="#16a34a" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                      <g transform="translate(38.1, 22.0)">
                        <polygon points="0,-22 19.1,-11.0 0,0 -19.1,-11.0" fill="#4ade80" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,22 -19.1,11.0 -19.1,-11.0" fill="#15803d" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="19.1,-11.0 19.1,11.0 0,22 0,0" fill="#16a34a" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                      <g transform="translate(-19.1, 11.0)">
                        <polygon points="0,-22 19.1,-11.0 0,0 -19.1,-11.0" fill="#4ade80" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,22 -19.1,11.0 -19.1,-11.0" fill="#15803d" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="19.1,-11.0 19.1,11.0 0,22 0,0" fill="#16a34a" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                      <g transform="translate(0.0, 22.0)">
                        <polygon points="0,-22 19.1,-11.0 0,0 -19.1,-11.0" fill="#4ade80" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,22 -19.1,11.0 -19.1,-11.0" fill="#15803d" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="19.1,-11.0 19.1,11.0 0,22 0,0" fill="#16a34a" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                      <g transform="translate(19.1, 33.0)">
                        <polygon points="0,-22 19.1,-11.0 0,0 -19.1,-11.0" fill="#4ade80" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,22 -19.1,11.0 -19.1,-11.0" fill="#15803d" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="19.1,-11.0 19.1,11.0 0,22 0,0" fill="#16a34a" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                      <g transform="translate(-38.1, 22.0)">
                        <polygon points="0,-22 19.1,-11.0 0,0 -19.1,-11.0" fill="#4ade80" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,22 -19.1,11.0 -19.1,-11.0" fill="#15803d" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="19.1,-11.0 19.1,11.0 0,22 0,0" fill="#16a34a" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                      <g transform="translate(-19.1, 33.0)">
                        <polygon points="0,-22 19.1,-11.0 0,0 -19.1,-11.0" fill="#4ade80" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,22 -19.1,11.0 -19.1,-11.0" fill="#15803d" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="19.1,-11.0 19.1,11.0 0,22 0,0" fill="#16a34a" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                      <g transform="translate(0.0, 44.0)">
                        <polygon points="0,-22 19.1,-11.0 0,0 -19.1,-11.0" fill="#4ade80" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="0,0 0,22 -19.1,11.0 -19.1,-11.0" fill="#15803d" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                        <polygon points="19.1,-11.0 19.1,11.0 0,22 0,0" fill="#16a34a" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                      </g>
                    </g>
                  </svg>
                </div>
                <div style={{ backgroundColor: '#fef08a', padding: '12px 24px', borderRadius: '16px', textAlign: 'center', color: '#1e3a8a', fontWeight: '800', fontSize: '1.2rem', lineHeight: '1.4' }}>
                  3 layers = 27 cubes<br />(3 × 3 × 3)
                </div>
              </div>
            </div>
          </>
        )}


        {/* PAGE 26: 4x4 Cube Interactive */}
        {page === 26 && (
          <>
            {/* Top Left Badge */}
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '0', zIndex: 10 }}>
              <div style={{ backgroundColor: '#0f172a', color: 'white', padding: '8px 20px', borderRadius: '12px', fontSize: '1.4rem', fontWeight: '900', zIndex: 2, boxShadow: '2px 2px 8px rgba(0,0,0,0.2)' }}>
                D4
              </div>
              <div style={{ backgroundColor: '#fef08a', color: '#1e3a8a', padding: '8px 32px 8px 36px', borderRadius: '0 24px 24px 0', fontSize: '1.4rem', fontWeight: '800', marginLeft: '-16px', zIndex: 1, boxShadow: '2px 2px 8px rgba(0,0,0,0.1)' }}>
                Your turn – make 64
              </div>
            </div>

            {/* Boy Left Image (b4.png) */}
            <div style={{
              position: 'absolute', bottom: 0, left: '-4%',
              width: '25%', height: '45%', zIndex: 11, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start'
            }}>
              <img src={b4} alt="Boy" style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', objectPosition: 'left bottom', display: 'block' }} />
            </div>

            {/* Speech Bubble (s19.png) */}
            <div style={{ position: 'absolute', bottom: '25%', left: '16%', width: '20%', zIndex: 12 }}>
              <img src={s19} alt="Speech bubble" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
            </div>

            {/* Center Information Container */}
            <div style={{
              position: 'absolute',
              top: '55%',
              left: '42%',
              transform: 'translate(-50%, -50%)',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{ backgroundColor: '#e0e7ff', padding: '16px 32px', borderRadius: '16px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <div style={{ color: '#1e3a8a', fontWeight: '900', fontSize: '1.6rem' }}>4 × 4 = 16</div>
                <div style={{ color: '#3b82f6', fontWeight: '600', fontSize: '1.2rem' }}>in each layer</div>
              </div>
              <div style={{ backgroundColor: '#fce7f3', padding: '12px 32px', borderRadius: '16px', textAlign: 'center', color: '#be185d', fontWeight: '800', fontSize: '1.4rem', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '100%' }}>
                4 layers
              </div>
            </div>

            <div style={{ position: 'absolute', top: '55%', left: '55%', transform: 'translate(-50%, -50%)', zIndex: 10 }}>
              <svg width="40" height="30" viewBox="0 0 40 30">
                <path d="M 0,10 L 20,10 L 20,0 L 40,15 L 20,30 L 20,20 L 0,20 Z" fill="#2563eb" />
              </svg>
            </div>

            {/* Right Side: Interactive Cube */}
            <div style={{
              position: 'absolute',
              top: '55%',
              left: '75%',
              transform: 'translate(-50%, -50%)',
              width: '400px',
              height: '500px',
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(10px)',
              borderRadius: '32px',
              padding: '20px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              border: '2px solid rgba(255,255,255,1)',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start'
            }}>
              <InteractiveCube4x4 />
              <div style={{ backgroundColor: '#fef08a', padding: '12px 24px', borderRadius: '16px', textAlign: 'center', color: '#1e3a8a', fontWeight: '900', fontSize: '1.6rem', position: 'absolute', bottom: '10px' }}>
                4 × 4 × 4 = 64
              </div>
            </div>
          </>
        )}


        {/* PAGE 27: 5x5 Cube Predict */}
        {page === 27 && (
          <>
            {/* Top Left Badge */}
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '0', zIndex: 10 }}>
              <div style={{ backgroundColor: '#0f172a', color: 'white', padding: '8px 20px', borderRadius: '12px', fontSize: '1.4rem', fontWeight: '900', zIndex: 2, boxShadow: '2px 2px 8px rgba(0,0,0,0.2)' }}>
                D5
              </div>
              <div style={{ backgroundColor: '#fef08a', color: '#1e3a8a', padding: '8px 32px 8px 36px', borderRadius: '0 24px 24px 0', fontSize: '1.4rem', fontWeight: '800', marginLeft: '-16px', zIndex: 1, boxShadow: '2px 2px 8px rgba(0,0,0,0.1)' }}>
                Predict and build 125
              </div>
            </div>

            {/* Boy Left Image (b4.png) */}
            <div style={{
              position: 'absolute', bottom: 0, left: '-4%',
              width: '25%', height: '45%', zIndex: 11, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start'
            }}>
              <img src={b4} alt="Boy" style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', objectPosition: 'left bottom', display: 'block' }} />
            </div>

            {/* Speech Bubble (s20.png) */}
            <div style={{ position: 'absolute', bottom: '25%', left: '16%', width: '20%', zIndex: 12 }}>
              <img src={s20} alt="Speech bubble" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
            </div>

            {/* Center Information Container */}
            <div style={{
              position: 'absolute',
              top: '55%',
              left: '42%',
              transform: 'translate(-50%, -50%)',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{ backgroundColor: '#e0e7ff', padding: '16px 32px', borderRadius: '16px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <div style={{ color: '#1e3a8a', fontWeight: '900', fontSize: '1.6rem' }}>5 × 5 = 25</div>
                <div style={{ color: '#3b82f6', fontWeight: '600', fontSize: '1.2rem' }}>in each layer</div>
              </div>
              <div style={{ backgroundColor: '#fce7f3', padding: '12px 32px', borderRadius: '16px', textAlign: 'center', color: '#be185d', fontWeight: '800', fontSize: '1.4rem', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '100%' }}>
                5 layers
              </div>
            </div>

            <div style={{ position: 'absolute', top: '55%', left: '55%', transform: 'translate(-50%, -50%)', zIndex: 10 }}>
              <svg width="40" height="30" viewBox="0 0 40 30">
                <path d="M 0,10 L 20,10 L 20,0 L 40,15 L 20,30 L 20,20 L 0,20 Z" fill="#2563eb" />
              </svg>
            </div>

            {/* Right Side: Interactive Cube */}
            <div style={{
              position: 'absolute',
              top: '55%',
              left: '75%',
              transform: 'translate(-50%, -50%)',
              width: '400px',
              height: '500px',
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(10px)',
              borderRadius: '32px',
              padding: '20px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              border: '2px solid rgba(255,255,255,1)',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start'
            }}>
              <InteractiveCube5x5 />
              <div style={{ backgroundColor: '#fef08a', padding: '12px 24px', borderRadius: '16px', textAlign: 'center', color: '#1e3a8a', fontWeight: '900', fontSize: '1.6rem', position: 'absolute', bottom: '25px' }}>
                5 × 5 × 5 = 125
              </div>
            </div>
          </>
        )}


        {/* PAGE 28: Summary of Sequence */}
        {page === 28 && (
          <>
            {/* Top Left Badge */}
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '0', zIndex: 10 }}>
              <div style={{ backgroundColor: '#0f172a', color: 'white', padding: '8px 20px', borderRadius: '12px', fontSize: '1.4rem', fontWeight: '900', zIndex: 2, boxShadow: '2px 2px 8px rgba(0,0,0,0.2)' }}>
                D6
              </div>
              <div style={{ backgroundColor: '#fef08a', color: '#1e3a8a', padding: '8px 32px 8px 36px', borderRadius: '0 24px 24px 0', fontSize: '1.4rem', fontWeight: '800', marginLeft: '-16px', zIndex: 1, boxShadow: '2px 2px 8px rgba(0,0,0,0.1)' }}>
                Let's see the sequence
              </div>
            </div>

            {/* Boy Left Image (b6.png) */}
            <div style={{
              position: 'absolute', bottom: 0, left: '-4%',
              width: '25%', height: '45%', zIndex: 11, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start'
            }}>
              <img src={b6} alt="Boy" style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', objectPosition: 'left bottom', display: 'block' }} />
            </div>

            {/* Speech Bubble (s21.png) */}
            <div style={{ position: 'absolute', bottom: '25%', left: '16%', width: '20%', zIndex: 12 }}>
              <img src={s21} alt="Speech bubble" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
            </div>

            {/* Main Content Container */}
            <div style={{
              position: 'absolute',
              top: '36%',
              left: '52%',
              transform: 'translate(-50%, -50%)',
              width: '85%',
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(10px)',
              borderRadius: '32px',
              padding: '24px 32px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              border: '2px solid rgba(255,255,255,1)',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '24px'
            }}>

              {/* Header Ribbon */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                width: '100%', backgroundColor: '#eff6ff', borderRadius: '16px', padding: '12px 24px'
              }}>
                <div style={{ backgroundColor: '#bfdbfe', color: '#1e3a8a', padding: '8px 24px', borderRadius: '12px', fontWeight: '800', fontSize: '1.4rem' }}>
                  Cube Numbers
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', flex: 1, paddingLeft: '40px', color: '#1e3a8a', fontWeight: '900', fontSize: '1.8rem', letterSpacing: '2px' }}>
                  <span>1</span>
                  <span>8</span>
                  <span>27</span>
                  <span>64</span>
                  <span>125</span>
                  <span style={{ color: '#94a3b8' }}>...</span>
                </div>
              </div>

              {/* Cubes Row */}
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', width: '100%', height: '260px', paddingBottom: '10px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                  <SolidCube n={1} size={18} colorTheme={{ top: '#60a5fa', left: '#1d4ed8', right: '#2563eb' }} />
                  <div style={{ backgroundColor: '#fef08a', padding: '8px 16px', borderRadius: '12px', textAlign: 'center', color: '#1e3a8a', fontWeight: '800', fontSize: '1.1rem', lineHeight: '1.3' }}>
                    1 × 1 × 1<br />= 1
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                  <SolidCube n={2} size={18} colorTheme={{ top: '#fbbf24', left: '#d97706', right: '#f59e0b' }} />
                  <div style={{ backgroundColor: '#fef08a', padding: '8px 16px', borderRadius: '12px', textAlign: 'center', color: '#1e3a8a', fontWeight: '800', fontSize: '1.1rem', lineHeight: '1.3' }}>
                    2 × 2 × 2<br />= 8
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                  <SolidCube n={3} size={18} colorTheme={{ top: '#4ade80', left: '#15803d', right: '#16a34a' }} />
                  <div style={{ backgroundColor: '#fef08a', padding: '8px 16px', borderRadius: '12px', textAlign: 'center', color: '#1e3a8a', fontWeight: '800', fontSize: '1.1rem', lineHeight: '1.3' }}>
                    3 × 3 × 3<br />= 27
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                  <SolidCube n={4} size={18} colorTheme={{ top: '#a855f7', left: '#9333ea', right: '#7e22ce' }} />
                  <div style={{ backgroundColor: '#fef08a', padding: '8px 16px', borderRadius: '12px', textAlign: 'center', color: '#1e3a8a', fontWeight: '800', fontSize: '1.1rem', lineHeight: '1.3' }}>
                    4 × 4 × 4<br />= 64
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                  <SolidCube n={5} size={18} colorTheme={{ top: '#f472b6', left: '#db2777', right: '#be185d' }} />
                  <div style={{ backgroundColor: '#fef08a', padding: '8px 16px', borderRadius: '12px', textAlign: 'center', color: '#1e3a8a', fontWeight: '800', fontSize: '1.1rem', lineHeight: '1.3' }}>
                    5 × 5 × 5<br />= 125
                  </div>
                </div>
              </div>

            </div>
          </>
        )}


        {/* PAGE 29: What have we seen? */}
        {page === 29 && (
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: '95%', height: '75%',
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(12px)',
            borderRadius: '32px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
            border: '3px solid white',
            display: 'flex', alignItems: 'stretch', justifyContent: 'space-between',
            padding: '40px 30px',
            zIndex: 10
          }}>
            {/* Left text */}
            <div style={{ width: '22%', display: 'flex', flexDirection: 'column', gap: '24px', justifyContent: 'center' }}>
              <div style={{ backgroundColor: '#2563eb', color: 'white', padding: '20px 24px', borderRadius: '24px', fontWeight: '900', fontSize: '1.8rem', textAlign: 'center', boxShadow: '0 8px 16px rgba(37,99,235,0.3)' }}>
                What have we seen?
              </div>
              <div style={{ color: '#1e3a8a', fontSize: '1.4rem', fontWeight: '600', lineHeight: '1.5', padding: '0 10px' }}>
                Three special number sequences and the shapes they make
              </div>
            </div>

            {/* Center Cards */}
            <div style={{ display: 'flex', gap: '20px', width: '56%', justifyContent: 'center', alignItems: 'center' }}>
              {/* Card 1: Triangular */}
              <div style={{ border: '3px solid #bfdbfe', backgroundColor: '#eff6ff', borderRadius: '24px', padding: '24px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '32%', height: '90%', gap: '20px', boxShadow: '0 8px 16px rgba(0,0,0,0.05)' }}>
                <div style={{ color: '#1e40af', fontWeight: '900', fontSize: '1.2rem', textAlign: 'center' }}>Triangular Numbers</div>
                <div style={{ color: '#1e3a8a', fontWeight: '900', fontSize: '1.2rem', letterSpacing: '2px' }}>1 3 6 10 15 <span style={{ color: '#94a3b8' }}>...</span></div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {/* SVG for Triangle of Spheres */}
                  <svg width="120" height="120" viewBox="0 0 100 100">
                    <defs>
                      <radialGradient id="blueSphere" cx="30%" cy="30%" r="70%">
                        <stop offset="0%" stopColor="#60a5fa" />
                        <stop offset="100%" stopColor="#1d4ed8" />
                      </radialGradient>
                    </defs>
                    {/* Row 1 */}
                    <circle cx="50" cy="20" r="7" fill="url(#blueSphere)" />
                    {/* Row 2 */}
                    <circle cx="42" cy="34" r="7" fill="url(#blueSphere)" />
                    <circle cx="58" cy="34" r="7" fill="url(#blueSphere)" />
                    {/* Row 3 */}
                    <circle cx="34" cy="48" r="7" fill="url(#blueSphere)" />
                    <circle cx="50" cy="48" r="7" fill="url(#blueSphere)" />
                    <circle cx="66" cy="48" r="7" fill="url(#blueSphere)" />
                    {/* Row 4 */}
                    <circle cx="26" cy="62" r="7" fill="url(#blueSphere)" />
                    <circle cx="42" cy="62" r="7" fill="url(#blueSphere)" />
                    <circle cx="58" cy="62" r="7" fill="url(#blueSphere)" />
                    <circle cx="74" cy="62" r="7" fill="url(#blueSphere)" />
                    {/* Row 5 */}
                    <circle cx="18" cy="76" r="7" fill="url(#blueSphere)" />
                    <circle cx="34" cy="76" r="7" fill="url(#blueSphere)" />
                    <circle cx="50" cy="76" r="7" fill="url(#blueSphere)" />
                    <circle cx="66" cy="76" r="7" fill="url(#blueSphere)" />
                    <circle cx="82" cy="76" r="7" fill="url(#blueSphere)" />
                  </svg>
                </div>
                <div style={{ color: '#2563eb', fontWeight: '600', fontSize: '1.2rem' }}>(triangles)</div>
              </div>

              {/* Card 2: Square */}
              <div style={{ border: '3px solid #fde047', backgroundColor: '#fefce8', borderRadius: '24px', padding: '24px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '32%', height: '90%', gap: '20px', boxShadow: '0 8px 16px rgba(0,0,0,0.05)' }}>
                <div style={{ color: '#854d0e', fontWeight: '900', fontSize: '1.2rem', textAlign: 'center' }}>Square Numbers</div>
                <div style={{ color: '#1e3a8a', fontWeight: '900', fontSize: '1.2rem', letterSpacing: '2px' }}>1 4 9 16 25 <span style={{ color: '#94a3b8' }}>...</span></div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {/* SVG for 4x4 Square of Spheres */}
                  <svg width="120" height="120" viewBox="0 0 100 100">
                    {[0, 1, 2, 3].map(row =>
                      [0, 1, 2, 3].map(col => (
                        <circle key={`sq-${row}-${col}`} cx={26 + col * 16} cy={26 + row * 16} r="7" fill="url(#blueSphere)" />
                      ))
                    )}
                  </svg>
                </div>
                <div style={{ color: '#2563eb', fontWeight: '600', fontSize: '1.2rem' }}>(squares)</div>
              </div>

              {/* Card 3: Cube */}
              <div style={{ border: '3px solid #e9d5ff', backgroundColor: '#faf5ff', borderRadius: '24px', padding: '24px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '32%', height: '90%', gap: '20px', boxShadow: '0 8px 16px rgba(0,0,0,0.05)' }}>
                <div style={{ color: '#6b21a8', fontWeight: '900', fontSize: '1.2rem', textAlign: 'center' }}>Cube Numbers</div>
                <div style={{ color: '#1e3a8a', fontWeight: '900', fontSize: '1.2rem', letterSpacing: '2px' }}>1 8 27 64 125 <span style={{ color: '#94a3b8' }}>...</span></div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <SolidCube n={4} size={16} colorTheme={{ top: '#a855f7', left: '#9333ea', right: '#7e22ce' }} />
                </div>
                <div style={{ color: '#2563eb', fontWeight: '600', fontSize: '1.2rem' }}>(cubes)</div>
              </div>
            </div>

            {/* Right Sticky Note */}
            <div style={{
              width: '20%',
              backgroundColor: '#fef08a',
              padding: '30px 24px',
              borderRadius: '4px 20px 4px 20px',
              boxShadow: '4px 8px 16px rgba(0,0,0,0.1)',
              transform: 'rotate(-2deg)',
              display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center',
              color: '#1e3a8a',
              fontWeight: '700',
              fontSize: '1.3rem',
              lineHeight: '1.5',
              position: 'relative',
              alignSelf: 'center',
              height: '70%'
            }}>
              {/* Pin/Tape effect */}
              <div style={{ position: 'absolute', top: '15px', left: '50%', transform: 'translateX(-50%)', width: '50px', height: '14px', backgroundColor: 'rgba(255,255,255,0.6)', border: '1px solid rgba(0,0,0,0.1)', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}></div>

              <div style={{ marginTop: '20px' }}>Same numbers...</div>
              <div>Different shapes...</div>
              <div>Growing in 1D, 2D and 3D!</div>
              <svg width="100%" height="24" style={{ marginTop: '-10px', overflow: 'visible' }}>
                <path d="M 10,10 Q 50,-5 150,15" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        )}

        {page === 30 && (
          <>
            {/* Top Left Badge */}
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '0', zIndex: 10 }}>
              <div style={{
                backgroundColor: '#0f172a',
                color: 'white',
                padding: '8px 20px',
                borderRadius: '12px',
                fontSize: '1.4rem',
                fontWeight: '900',
                zIndex: 2,
                boxShadow: '2px 2px 8px rgba(0,0,0,0.2)'
              }}>
                T1
              </div>
            </div>

            {/* Boy and Speech Bubble */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: '-4%',
              width: '20%',
              height: '35%',
              zIndex: 5,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-start'
            }}>
              <img
                src={b4}
                alt="Boy"
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  objectPosition: 'left bottom',
                  display: 'block',
                }}
              />
            </div>
            <div style={{
              position: 'absolute',
              bottom: '22%',
              left: '12%',
              width: '22%',
              zIndex: 6
            }}>
              <img
                src={s22}
                alt="Speech bubble"
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />
            </div>

            {/* Three Cards */}
            <div style={{
              position: 'absolute',
              top: '38%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              gap: '40px',
              zIndex: 10,
              opacity: page30Step >= 1 ? 1 : 0,
              transition: 'opacity 0.8s ease-in-out'
            }}>
              {/* Triangular Card */}
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: '32px',
                padding: '32px',
                width: '260px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                border: '2px solid rgba(255,255,255,0.8)'
              }}>
                <div style={{ height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="140" height="140" viewBox="0 0 140 140">
                    <defs>
                      <radialGradient id="redBall" cx="30%" cy="30%" r="70%">
                        <stop offset="0%" stopColor="#fca5a5" />
                        <stop offset="100%" stopColor="#ef4444" />
                      </radialGradient>
                    </defs>
                    {[1, 2, 3, 4, 5].map((row) =>
                      Array.from({ length: row }).map((_, col) => (
                        <circle key={`t-${row}-${col}`} cx={70 + (col - (row - 1) / 2) * 22} cy={20 + row * 20} r="10" fill="url(#redBall)" />
                      ))
                    )}
                  </svg>
                </div>
                <div style={{ textAlign: 'center', color: '#1e1b4b', fontWeight: '800', fontSize: '1.6rem', margin: '24px 0', lineHeight: '1.4' }}>
                  1, 3, 6,<br />10, 15...
                </div>
                <div style={{ backgroundColor: '#fef08a', color: '#1e1b4b', padding: '12px 24px', borderRadius: '16px', fontWeight: '800', fontSize: '1.2rem', width: '100%', textAlign: 'center' }}>
                  Triangular<br />Numbers
                </div>
              </div>

              {/* Square Card */}
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: '32px',
                padding: '32px',
                width: '260px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                border: '2px solid rgba(255,255,255,0.8)'
              }}>
                <div style={{ height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="140" height="140" viewBox="0 0 140 140">
                    <defs>
                      <linearGradient id="blueSquare" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#60a5fa" />
                        <stop offset="100%" stopColor="#2563eb" />
                      </linearGradient>
                    </defs>
                    {Array.from({ length: 4 }).map((_, row) =>
                      Array.from({ length: 4 }).map((_, col) => (
                        <rect key={`s-${row}-${col}`} x={26 + col * 22} y={26 + row * 22} width="20" height="20" fill="url(#blueSquare)" rx="3" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                      ))
                    )}
                  </svg>
                </div>
                <div style={{ textAlign: 'center', color: '#1e1b4b', fontWeight: '800', fontSize: '1.6rem', margin: '24px 0', lineHeight: '1.4' }}>
                  1, 4, 9,<br />16, 25...
                </div>
                <div style={{ backgroundColor: '#fef08a', color: '#1e1b4b', padding: '12px 24px', borderRadius: '16px', fontWeight: '800', fontSize: '1.2rem', width: '100%', textAlign: 'center' }}>
                  Square<br />Numbers
                </div>
              </div>

              {/* Cube Card */}
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: '32px',
                padding: '32px',
                width: '260px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                border: '2px solid rgba(255,255,255,0.8)'
              }}>
                <div style={{ height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ marginTop: '-30px' }}>
                    <SolidCube n={3} size={30} colorTheme={{ top: '#4ade80', left: '#22c55e', right: '#16a34a' }} />
                  </div>
                </div>
                <div style={{ textAlign: 'center', color: '#1e1b4b', fontWeight: '800', fontSize: '1.6rem', margin: '24px 0', lineHeight: '1.4' }}>
                  1, 8, 27,<br />64, 125...
                </div>
                <div style={{ backgroundColor: '#fef08a', color: '#1e1b4b', padding: '12px 24px', borderRadius: '16px', fontWeight: '800', fontSize: '1.2rem', width: '100%', textAlign: 'center' }}>
                  Cube<br />Numbers
                </div>
              </div>
            </div>
          </>
        )}

        {page === 31 && (
          <>
            {/* Top Left Badge */}
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '0', zIndex: 10 }}>
              <div style={{
                backgroundColor: '#0f172a',
                color: 'white',
                padding: '8px 20px',
                borderRadius: '12px',
                fontSize: '1.4rem',
                fontWeight: '900',
                zIndex: 2,
                boxShadow: '2px 2px 8px rgba(0,0,0,0.2)'
              }}>
                T2
              </div>
            </div>

            {/* Boy */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: '2%',
              width: '22%',
              height: '40%',
              zIndex: 5,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-start'
            }}>
              <img
                src={b4}
                alt="Boy thinking"
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  objectPosition: 'left bottom',
                  display: 'block',
                }}
              />
            </div>

            {/* Speech bubble */}
            <div style={{
              position: 'absolute',
              top: '60%',
              left: '16%',
              width: '24%',
              zIndex: 6
            }}>
              <img
                src={s23}
                alt="Speech bubble"
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />
            </div>

            {/* Sequences list */}
            <div style={{
              position: 'absolute',
              top: '45%',
              left: '42%',
              transform: 'translateY(-50%)',
              backgroundColor: 'white',
              borderRadius: '48px',
              padding: '48px 64px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
              border: '4px solid #f8fafc',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              zIndex: 10,
              minWidth: '700px'
            }}>
              {/* Connector from bubble to boy's head */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '-24px',
                width: '30px',
                height: '30px',
                backgroundColor: 'white',
                borderRadius: '50%',
                boxShadow: '-2px 2px 5px rgba(0,0,0,0.05)'
              }}></div>
              <div style={{
                position: 'absolute',
                top: '65%',
                left: '-48px',
                width: '16px',
                height: '16px',
                backgroundColor: 'white',
                borderRadius: '50%',
                boxShadow: '-2px 2px 5px rgba(0,0,0,0.05)'
              }}></div>

              {/* Rows */}
              <div style={{ backgroundColor: '#fce7f3', color: '#831843', padding: '24px 48px', borderRadius: '32px', fontSize: '2.4rem', fontWeight: '800', textAlign: 'center' }}>
                1, 1, 1, 1, 1 ...
              </div>
              <div style={{ backgroundColor: '#e0f2fe', color: '#0369a1', padding: '24px 48px', borderRadius: '32px', fontSize: '2.4rem', fontWeight: '800', textAlign: 'center' }}>
                1, 2, 3, 4, 5 ...
              </div>
              <div style={{ backgroundColor: '#dcfce7', color: '#15803d', padding: '24px 48px', borderRadius: '32px', fontSize: '2.4rem', fontWeight: '800', textAlign: 'center' }}>
                1, 3, 5, 7, 9 ...
              </div>
              <div style={{ backgroundColor: '#fef08a', color: '#854d0e', padding: '24px 48px', borderRadius: '32px', fontSize: '2.4rem', fontWeight: '800', textAlign: 'center' }}>
                2, 4, 6, 8, 10 ...
              </div>
            </div>
          </>
        )}

        {page === 32 && (
          <>
            {/* Top Left Badge */}
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '0', zIndex: 10 }}>
              <div style={{
                backgroundColor: '#0f172a',
                color: 'white',
                padding: '8px 20px',
                borderRadius: '12px',
                fontSize: '1.4rem',
                fontWeight: '900',
                zIndex: 2,
                boxShadow: '2px 2px 8px rgba(0,0,0,0.2)'
              }}>
                T3
              </div>
            </div>

            {/* Boy */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: '2%',
              width: '22%',
              height: '40%',
              zIndex: 5,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-start'
            }}>
              <img
                src={b4}
                alt="Boy pointing"
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  objectPosition: 'left bottom',
                  display: 'block',
                }}
              />
            </div>

            {/* Speech bubble */}
            <div style={{
              position: 'absolute',
              top: '38%',
              left: '10%',
              width: '26%',
              zIndex: 6
            }}>
              <img
                src={s24}
                alt="Speech bubble"
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />
            </div>

            {/* Sequences list */}
            <div style={{
              position: 'absolute',
              top: '45%',
              left: '42%',
              transform: 'translateY(-50%)',
              backgroundColor: 'white',
              borderRadius: '48px',
              padding: '48px 64px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
              border: '4px solid #f8fafc',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              zIndex: 10,
              minWidth: '700px'
            }}>
              {/* Rows */}
              <div style={{ backgroundColor: '#fce7f3', color: '#831843', padding: '24px 48px', borderRadius: '32px', fontSize: '2.4rem', fontWeight: '800', textAlign: 'center' }}>
                1, 1, 1, 1, 1 ...
              </div>
              <div style={{ backgroundColor: '#e0f2fe', color: '#0369a1', padding: '24px 48px', borderRadius: '32px', fontSize: '2.4rem', fontWeight: '800', textAlign: 'center' }}>
                1, 2, 3, 4, 5 ...
              </div>
              <div style={{ backgroundColor: '#dcfce7', color: '#15803d', padding: '24px 48px', borderRadius: '32px', fontSize: '2.4rem', fontWeight: '800', textAlign: 'center' }}>
                1, 3, 5, 7, 9 ...
              </div>
              <div style={{ backgroundColor: '#fef08a', color: '#854d0e', padding: '24px 48px', borderRadius: '32px', fontSize: '2.4rem', fontWeight: '800', textAlign: 'center' }}>
                2, 4, 6, 8, 10 ...
              </div>
            </div>
          </>
        )}

        {page === 33 && (
          <>
            {/* Top Left Badge */}
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '0', zIndex: 10 }}>
              <div style={{
                backgroundColor: '#0f172a',
                color: 'white',
                padding: '8px 20px',
                borderRadius: '12px',
                fontSize: '1.4rem',
                fontWeight: '900',
                zIndex: 2,
                boxShadow: '2px 2px 8px rgba(0,0,0,0.2)'
              }}>
                T4
              </div>
            </div>

            {/* Boy */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: '-4%',
              width: '20%',
              height: '38%',
              zIndex: 5,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-start'
            }}>
              <img
                src={b13}
                alt="Boy pointing"
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  objectPosition: 'left bottom',
                  display: 'block',
                }}
              />
            </div>

            {/* Speech bubble */}
            <div style={{
              position: 'absolute',
              top: '38%',
              left: '10%',
              width: '26%',
              zIndex: 6
            }}>
              <img
                src={s25}
                alt="Speech bubble"
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />
            </div>

            {/* Big Blue Arrow */}
            <div style={{
              position: 'absolute',
              top: '55%',
              left: '28%',
              width: '180px',
              height: '180px',
              zIndex: 7
            }}>
              <svg viewBox="0 0 100 100" width="100%" height="100%">
                <path
                  d="M10,40 L55,40 L55,20 L95,50 L55,80 L55,60 L10,60 Z"
                  fill="#007bff"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinejoin="round"
                  style={{ filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.25))' }}
                />
              </svg>
            </div>
          </>
        )}

        {page === 34 && (
          <>
            {/* Top Left Badge */}
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '0', zIndex: 10 }}>
              <div style={{
                backgroundColor: '#0f172a',
                color: 'white',
                padding: '8px 20px',
                borderRadius: '12px 0 0 12px',
                fontSize: '1.4rem',
                fontWeight: '900',
                boxShadow: '2px 2px 8px rgba(0,0,0,0.2)'
              }}>
                E1
              </div>
              <div style={{
                backgroundColor: '#fef08a',
                color: '#1e1b4b',
                padding: '8px 20px',
                borderRadius: '0 12px 12px 0',
                fontSize: '1.4rem',
                fontWeight: '800',
                boxShadow: '2px 2px 8px rgba(0,0,0,0.2)'
              }}>
                All 1s
              </div>
            </div>

            {/* Boy */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: '-4%',
              width: '20%',
              height: '38%',
              zIndex: 5,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-start'
            }}>
              <img
                src={b4}
                alt="Boy"
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  objectPosition: 'left bottom',
                  display: 'block',
                }}
              />
            </div>

            {/* Speech bubble */}
            <div style={{
              position: 'absolute',
              top: '65%',
              left: '9%',
              width: '28%',
              zIndex: 6
            }}>
              <img
                src={s26}
                alt="Speech bubble"
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />
            </div>

            {/* Center Content: Pink Row and Cards */}
            <div style={{
              position: 'absolute',
              top: '8%',
              left: '52%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '32px',
              zIndex: 10,
              width: '55%'
            }}>
              {/* Pink Row */}
              <div style={{
                backgroundColor: '#fce7f3',
                color: '#831843',
                padding: '16px 48px',
                borderRadius: '24px',
                fontSize: '3rem',
                fontWeight: '900',
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
              }}>
                <span>1</span> <span>1</span> <span>1</span> <span>1</span> <span>1</span> <span>{selectedOptions[34] === 1 ? "1" : "..."}</span>
              </div>

              {/* Cards Row */}
              <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', width: '100%' }}>
                {[1, 2, 3, 4].map(i => (
                  <div key={i} style={{
                    flex: 1,
                    aspectRatio: '1',
                    backgroundColor: '#fafafa',
                    borderRadius: '24px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <div style={{
                      width: '40%',
                      height: '40%',
                      backgroundColor: '#dc2626',
                      borderRadius: '50%',
                      boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 0 4px 8px rgba(220,38,38,0.4)'
                    }}></div>
                  </div>
                ))}
                <div style={{
                  flex: 1,
                  aspectRatio: '1',
                  backgroundColor: '#fffdf6',
                  borderRadius: '24px',
                  border: '4px dashed #94a3b8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '4rem',
                  fontWeight: '900',
                  color: '#0f172a'
                }}>
                  {selectedOptions[34] === 1 ? (
                    <div style={{
                      width: '40%',
                      height: '40%',
                      backgroundColor: '#dc2626',
                      borderRadius: '50%',
                      boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 0 4px 8px rgba(220,38,38,0.4)'
                    }}></div>
                  ) : '?'}
                </div>
              </div>
            </div>
            {renderOptions(34, [1, 2, 3], 1)}
          </>
        )}

        {page === 35 && (
          <>
            {/* Top Left Badge */}
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '0', zIndex: 10 }}>
              <div style={{
                backgroundColor: '#0f172a',
                color: 'white',
                padding: '8px 20px',
                borderRadius: '12px 0 0 12px',
                fontSize: '1.4rem',
                fontWeight: '900',
                boxShadow: '2px 2px 8px rgba(0,0,0,0.2)'
              }}>
                E2
              </div>
              <div style={{
                backgroundColor: '#fef08a',
                color: '#1e1b4b',
                padding: '8px 20px',
                borderRadius: '0 12px 12px 0',
                fontSize: '1.4rem',
                fontWeight: '800',
                boxShadow: '2px 2px 8px rgba(0,0,0,0.2)'
              }}>
                Counting Numbers
              </div>
            </div>

            {/* Boy */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: '-4%',
              width: '20%',
              height: '38%',
              zIndex: 5,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-start'
            }}>
              <img
                src={b4}
                alt="Boy"
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  objectPosition: 'left bottom',
                  display: 'block',
                }}
              />
            </div>

            {/* Speech bubble */}
            <div style={{
              position: 'absolute',
              top: '65%',
              left: '9%',
              width: '28%',
              zIndex: 6
            }}>
              <img
                src={s27}
                alt="Speech bubble"
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />
            </div>

            {/* Center Content: Pink Row and Cards */}
            <div style={{
              position: 'absolute',
              top: '8%',
              left: '52%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '32px',
              zIndex: 10,
              width: '55%'
            }}>
              {/* Pink Row */}
              <div style={{
                backgroundColor: '#fce7f3',
                color: '#831843',
                padding: '16px 48px',
                borderRadius: '24px',
                fontSize: '3rem',
                fontWeight: '900',
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
              }}>
                <span>1</span> <span>2</span> <span>3</span> <span>4</span> <span>5</span> <span>{selectedOptions[35] === 6 ? "6" : "..."}</span>
              </div>

              {/* Cards Row */}
              <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', width: '100%' }}>
                {/* Card 1 */}
                <div style={{ flex: 1, aspectRatio: '1', backgroundColor: '#fafafa', borderRadius: '24px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '24px', height: '24px', backgroundColor: '#2563eb', borderRadius: '50%', boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 0 4px 8px rgba(37,99,235,0.4)' }}></div>
                </div>

                {/* Card 2 */}
                <div style={{ flex: 1, aspectRatio: '1', backgroundColor: '#fafafa', borderRadius: '24px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <div style={{ width: '24px', height: '24px', backgroundColor: '#2563eb', borderRadius: '50%', boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 0 4px 8px rgba(37,99,235,0.4)' }}></div>
                    <div style={{ width: '24px', height: '24px', backgroundColor: '#2563eb', borderRadius: '50%', boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 0 4px 8px rgba(37,99,235,0.4)' }}></div>
                  </div>
                </div>

                {/* Card 3 */}
                <div style={{ flex: 1, aspectRatio: '1', backgroundColor: '#fafafa', borderRadius: '24px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '24px', height: '24px', backgroundColor: '#2563eb', borderRadius: '50%', boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 0 4px 8px rgba(37,99,235,0.4)' }}></div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <div style={{ width: '24px', height: '24px', backgroundColor: '#2563eb', borderRadius: '50%', boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 0 4px 8px rgba(37,99,235,0.4)' }}></div>
                      <div style={{ width: '24px', height: '24px', backgroundColor: '#2563eb', borderRadius: '50%', boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 0 4px 8px rgba(37,99,235,0.4)' }}></div>
                    </div>
                  </div>
                </div>

                {/* Card 4 */}
                <div style={{ flex: 1, aspectRatio: '1', backgroundColor: '#fafafa', borderRadius: '24px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <div style={{ width: '24px', height: '24px', backgroundColor: '#2563eb', borderRadius: '50%', boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 0 4px 8px rgba(37,99,235,0.4)' }}></div>
                      <div style={{ width: '24px', height: '24px', backgroundColor: '#2563eb', borderRadius: '50%', boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 0 4px 8px rgba(37,99,235,0.4)' }}></div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <div style={{ width: '24px', height: '24px', backgroundColor: '#2563eb', borderRadius: '50%', boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 0 4px 8px rgba(37,99,235,0.4)' }}></div>
                      <div style={{ width: '24px', height: '24px', backgroundColor: '#2563eb', borderRadius: '50%', boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 0 4px 8px rgba(37,99,235,0.4)' }}></div>
                    </div>
                  </div>
                </div>

                <div style={{
                  flex: 1,
                  aspectRatio: '1',
                  backgroundColor: '#fffdf6',
                  borderRadius: '24px',
                  border: '4px dashed #94a3b8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '4rem',
                  fontWeight: '900',
                  color: '#0f172a'
                }}>
                  {selectedOptions[35] === 6 ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                      {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} style={{ width: '24px', height: '24px', backgroundColor: '#2563eb', borderRadius: '50%', boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 0 4px 8px rgba(37,99,235,0.4)' }}></div>
                      ))}
                    </div>
                  ) : '?'}
                </div>
              </div>
            </div>
            {renderOptions(35, [5, 6, 7], 6)}
          </>
        )}

        {page === 36 && (
          <>
            {/* Top Left Badge */}
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '0', zIndex: 10 }}>
              <div style={{
                backgroundColor: '#0f172a',
                color: 'white',
                padding: '8px 20px',
                borderRadius: '12px 0 0 12px',
                fontSize: '1.4rem',
                fontWeight: '900',
                boxShadow: '2px 2px 8px rgba(0,0,0,0.2)'
              }}>
                E3
              </div>
              <div style={{
                backgroundColor: '#fef08a',
                color: '#1e1b4b',
                padding: '8px 20px',
                borderRadius: '0 12px 12px 0',
                fontSize: '1.4rem',
                fontWeight: '800',
                boxShadow: '2px 2px 8px rgba(0,0,0,0.2)'
              }}>
                Odd Numbers
              </div>
            </div>

            {/* Boy */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: '-4%',
              width: '20%',
              height: '38%',
              zIndex: 5,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-start'
            }}>
              <img
                src={b4}
                alt="Boy"
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  objectPosition: 'left bottom',
                  display: 'block',
                }}
              />
            </div>

            {/* Speech bubble */}
            <div style={{
              position: 'absolute',
              top: '65%',
              left: '9%',
              width: '28%',
              zIndex: 6
            }}>
              <img
                src={s26}
                alt="Speech bubble"
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />
            </div>

            {/* Center Content: Pink Row and Cards */}
            <div style={{
              position: 'absolute',
              top: '8%',
              left: '52%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '32px',
              zIndex: 10,
              width: '55%'
            }}>
              {/* Pink Row */}
              <div style={{
                backgroundColor: '#fce7f3',
                color: '#831843',
                padding: '16px 48px',
                borderRadius: '24px',
                fontSize: '3rem',
                fontWeight: '900',
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
              }}>
                <span>1</span> <span>3</span> <span>5</span> <span>7</span> <span>9</span> <span>{selectedOptions[36] === 11 ? "11" : "..."}</span>
              </div>

              {/* Cards Row */}
              <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', width: '100%' }}>
                {/* Card 1 */}
                <div style={{ flex: 1, aspectRatio: '1', backgroundColor: '#fafafa', borderRadius: '24px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '24px', height: '24px', backgroundColor: '#9333ea', borderRadius: '50%', boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 0 4px 8px rgba(147,51,234,0.4)' }}></div>
                </div>

                {/* Card 2 */}
                <div style={{ flex: 1, aspectRatio: '1', backgroundColor: '#fafafa', borderRadius: '24px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <div style={{ width: '24px', height: '24px', backgroundColor: '#9333ea', borderRadius: '50%', boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 0 4px 8px rgba(147,51,234,0.4)' }}></div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <div style={{ width: '24px', height: '24px', backgroundColor: '#9333ea', borderRadius: '50%', boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 0 4px 8px rgba(147,51,234,0.4)' }}></div>
                      <div style={{ width: '24px', height: '24px', backgroundColor: '#9333ea', borderRadius: '50%', boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 0 4px 8px rgba(147,51,234,0.4)' }}></div>
                    </div>
                  </div>
                </div>

                {/* Card 3 */}
                <div style={{ flex: 1, aspectRatio: '1', backgroundColor: '#fafafa', borderRadius: '24px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <div style={{ width: '24px', height: '24px', backgroundColor: '#9333ea', borderRadius: '50%', boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 0 4px 8px rgba(147,51,234,0.4)' }}></div>
                      <div style={{ width: '24px', height: '24px', backgroundColor: '#9333ea', borderRadius: '50%', boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 0 4px 8px rgba(147,51,234,0.4)' }}></div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <div style={{ width: '24px', height: '24px', backgroundColor: '#9333ea', borderRadius: '50%', boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 0 4px 8px rgba(147,51,234,0.4)' }}></div>
                      <div style={{ width: '24px', height: '24px', backgroundColor: '#9333ea', borderRadius: '50%', boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 0 4px 8px rgba(147,51,234,0.4)' }}></div>
                      <div style={{ width: '24px', height: '24px', backgroundColor: '#9333ea', borderRadius: '50%', boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 0 4px 8px rgba(147,51,234,0.4)' }}></div>
                    </div>
                  </div>
                </div>

                {/* Card 4 */}
                <div style={{ flex: 1, aspectRatio: '1', backgroundColor: '#fafafa', borderRadius: '24px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <div style={{ width: '24px', height: '24px', backgroundColor: '#9333ea', borderRadius: '50%', boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 0 4px 8px rgba(147,51,234,0.4)' }}></div>
                      <div style={{ width: '24px', height: '24px', backgroundColor: '#9333ea', borderRadius: '50%', boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 0 4px 8px rgba(147,51,234,0.4)' }}></div>
                      <div style={{ width: '24px', height: '24px', backgroundColor: '#9333ea', borderRadius: '50%', boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 0 4px 8px rgba(147,51,234,0.4)' }}></div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <div style={{ width: '24px', height: '24px', backgroundColor: '#9333ea', borderRadius: '50%', boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 0 4px 8px rgba(147,51,234,0.4)' }}></div>
                      <div style={{ width: '24px', height: '24px', backgroundColor: '#9333ea', borderRadius: '50%', boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 0 4px 8px rgba(147,51,234,0.4)' }}></div>
                      <div style={{ width: '24px', height: '24px', backgroundColor: '#9333ea', borderRadius: '50%', boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 0 4px 8px rgba(147,51,234,0.4)' }}></div>
                      <div style={{ width: '24px', height: '24px', backgroundColor: '#9333ea', borderRadius: '50%', boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 0 4px 8px rgba(147,51,234,0.4)' }}></div>
                    </div>
                  </div>
                </div>

                <div style={{
                  flex: 1,
                  aspectRatio: '1',
                  backgroundColor: '#fffdf6',
                  borderRadius: '24px',
                  border: '4px dashed #94a3b8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '4rem',
                  fontWeight: '900',
                  color: '#0f172a'
                }}>
                  {selectedOptions[36] === 11 ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => (
                        <div key={i} style={{ width: '20px', height: '20px', backgroundColor: '#16a34a', borderRadius: '50%', boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 0 4px 8px rgba(22,163,74,0.4)' }}></div>
                      ))}
                    </div>
                  ) : '?'}
                </div>
              </div>
            </div>
            {renderOptions(36, [9, 10, 11, 12], 11)}
          </>
        )}

        {page === 37 && (
          <>
            {/* Top Left Badge */}
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '0', zIndex: 10 }}>
              <div style={{
                backgroundColor: '#0f172a',
                color: 'white',
                padding: '8px 20px',
                borderRadius: '12px 0 0 12px',
                fontSize: '1.4rem',
                fontWeight: '900',
                boxShadow: '2px 2px 8px rgba(0,0,0,0.2)'
              }}>
                E4
              </div>
              <div style={{
                backgroundColor: '#fef08a',
                color: '#1e1b4b',
                padding: '8px 20px',
                borderRadius: '0 12px 12px 0',
                fontSize: '1.4rem',
                fontWeight: '800',
                boxShadow: '2px 2px 8px rgba(0,0,0,0.2)'
              }}>
                Even Numbers
              </div>
            </div>

            {/* Boy */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: '-4%',
              width: '20%',
              height: '38%',
              zIndex: 5,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-start'
            }}>
              <img
                src={b4}
                alt="Boy"
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  objectPosition: 'left bottom',
                  display: 'block',
                }}
              />
            </div>

            {/* Speech bubble */}
            <div style={{
              position: 'absolute',
              top: '65%',
              left: '9%',
              width: '28%',
              zIndex: 6
            }}>
              <img
                src={s27}
                alt="Speech bubble"
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />
            </div>

            {/* Center Content: Pink Row and Cards */}
            <div style={{
              position: 'absolute',
              top: '8%',
              left: '52%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '32px',
              zIndex: 10,
              width: '55%'
            }}>
              {/* Pink Row */}
              <div style={{
                backgroundColor: '#fce7f3',
                color: '#831843',
                padding: '16px 48px',
                borderRadius: '24px',
                fontSize: '3rem',
                fontWeight: '900',
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
              }}>
                <span>2</span> <span>4</span> <span>6</span> <span>8</span> <span>10</span> <span>{selectedOptions[37] === 12 ? "12" : "..."}</span>
              </div>

              {/* Cards Row */}
              <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', width: '100%' }}>
                {/* Card 1 */}
                <div style={{ flex: 1, aspectRatio: '1', backgroundColor: '#fafafa', borderRadius: '24px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <div style={{ width: '24px', height: '24px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 0 4px 8px rgba(234,88,12,0.4)' }}></div>
                    <div style={{ width: '24px', height: '24px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 0 4px 8px rgba(234,88,12,0.4)' }}></div>
                  </div>
                </div>

                {/* Card 2 */}
                <div style={{ flex: 1, aspectRatio: '1', backgroundColor: '#fafafa', borderRadius: '24px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <div style={{ width: '24px', height: '24px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 0 4px 8px rgba(234,88,12,0.4)' }}></div>
                      <div style={{ width: '24px', height: '24px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 0 4px 8px rgba(234,88,12,0.4)' }}></div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <div style={{ width: '24px', height: '24px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 0 4px 8px rgba(234,88,12,0.4)' }}></div>
                      <div style={{ width: '24px', height: '24px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 0 4px 8px rgba(234,88,12,0.4)' }}></div>
                    </div>
                  </div>
                </div>

                {/* Card 3 */}
                <div style={{ flex: 1, aspectRatio: '1', backgroundColor: '#fafafa', borderRadius: '24px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <div style={{ width: '24px', height: '24px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 0 4px 8px rgba(234,88,12,0.4)' }}></div>
                      <div style={{ width: '24px', height: '24px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 0 4px 8px rgba(234,88,12,0.4)' }}></div>
                      <div style={{ width: '24px', height: '24px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 0 4px 8px rgba(234,88,12,0.4)' }}></div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <div style={{ width: '24px', height: '24px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 0 4px 8px rgba(234,88,12,0.4)' }}></div>
                      <div style={{ width: '24px', height: '24px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 0 4px 8px rgba(234,88,12,0.4)' }}></div>
                      <div style={{ width: '24px', height: '24px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 0 4px 8px rgba(234,88,12,0.4)' }}></div>
                    </div>
                  </div>
                </div>

                {/* Card 4 */}
                <div style={{ flex: 1, aspectRatio: '1', backgroundColor: '#fafafa', borderRadius: '24px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <div style={{ width: '24px', height: '24px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 0 4px 8px rgba(234,88,12,0.4)' }}></div>
                      <div style={{ width: '24px', height: '24px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 0 4px 8px rgba(234,88,12,0.4)' }}></div>
                      <div style={{ width: '24px', height: '24px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 0 4px 8px rgba(234,88,12,0.4)' }}></div>
                      <div style={{ width: '24px', height: '24px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 0 4px 8px rgba(234,88,12,0.4)' }}></div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <div style={{ width: '24px', height: '24px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 0 4px 8px rgba(234,88,12,0.4)' }}></div>
                      <div style={{ width: '24px', height: '24px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 0 4px 8px rgba(234,88,12,0.4)' }}></div>
                      <div style={{ width: '24px', height: '24px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 0 4px 8px rgba(234,88,12,0.4)' }}></div>
                      <div style={{ width: '24px', height: '24px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 0 4px 8px rgba(234,88,12,0.4)' }}></div>
                    </div>
                  </div>
                </div>

                <div style={{
                  flex: 1,
                  aspectRatio: '1',
                  backgroundColor: '#fffdf6',
                  borderRadius: '24px',
                  border: '4px dashed #94a3b8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '4rem',
                  fontWeight: '900',
                  color: '#0f172a'
                }}>
                  {selectedOptions[37] === 12 ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => (
                        <div key={i} style={{ width: '20px', height: '20px', backgroundColor: '#9333ea', borderRadius: '50%', boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 0 4px 8px rgba(147,51,234,0.4)' }}></div>
                      ))}
                    </div>
                  ) : '?'}
                </div>
              </div>
            </div>
            {renderOptions(37, [11, 12, 13, 14], 12)}
          </>
        )}

        {page === 38 && (
          <>
            <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: '85%', zIndex: 10 }}>
              {/* Tab */}
              <div style={{ backgroundColor: '#0f172a', color: 'white', padding: '16px 48px', borderRadius: '24px 24px 0 0', fontSize: '2.5rem', fontWeight: '800', display: 'inline-block' }}>
                What have we done so far?
              </div>

              {/* Main Container */}
              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '0 24px 24px 24px', padding: '40px', boxShadow: '0 10px 40px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', gap: '40px', border: '4px solid #bae6fd' }}>

                {/* Top Row: Tri, Square, Cube */}
                <div style={{ display: 'flex', gap: '24px', justifyContent: 'space-between' }}>
                  {/* Tri */}
                  <div style={{ flex: 1, backgroundColor: 'white', borderRadius: '24px', overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '4px solid #fef08a' }}>
                    <div style={{ backgroundColor: '#fef08a', padding: '16px', fontSize: '1.8rem', fontWeight: '800', color: '#1e1b4b', textAlign: 'center', lineHeight: 1.2 }}>Triangular<br />Numbers</div>
                    <div style={{ flex: 1, padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                        {[1, 2, 3, 4, 5].map(row => (
                          <div key={row} style={{ display: 'flex', gap: '4px' }}>
                            {Array.from({ length: row }).map((_, i) => (
                              <div key={i} style={{ width: '22px', height: '22px', backgroundColor: '#ef4444', borderRadius: '50%', boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 0 4px 8px rgba(239,68,68,0.4)' }}></div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Square */}
                  <div style={{ flex: 1, backgroundColor: 'white', borderRadius: '24px', overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '4px solid #fef08a' }}>
                    <div style={{ backgroundColor: '#fef08a', padding: '16px', fontSize: '1.8rem', fontWeight: '800', color: '#1e1b4b', textAlign: 'center', lineHeight: 1.2 }}>Square<br />Numbers</div>
                    <div style={{ flex: 1, padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2px', width: '120px', height: '120px' }}>
                        {Array.from({ length: 16 }).map((_, i) => (
                          <div key={i} style={{ backgroundColor: '#3b82f6', borderRadius: '2px', boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.2)' }}></div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Cube */}
                  <div style={{ flex: 1, backgroundColor: 'white', borderRadius: '24px', overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '4px solid #fef08a' }}>
                    <div style={{ backgroundColor: '#fef08a', padding: '16px', fontSize: '1.8rem', fontWeight: '800', color: '#1e1b4b', textAlign: 'center', lineHeight: 1.2 }}>Cube<br />Numbers</div>
                    <div style={{ flex: 1, padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg viewBox="-50 -50 100 100" width="130px" height="130px">
                        <path d="M0,0 L-40,-20 L-40,20 L0,40 Z" fill="#16a34a" />
                        <path d="M0,0 L40,-20 L40,20 L0,40 Z" fill="#22c55e" />
                        <path d="M0,0 L-40,-20 L0,-40 L40,-20 Z" fill="#4ade80" />
                        <g stroke="#064e3b" strokeWidth="1.5" strokeOpacity="0.4">
                          {[1, 2, 3].map(i => (
                            <React.Fragment key={`top-${i}`}>
                              <line x1={-10 * i} y1={-5 * i} x2={40 - 10 * i} y2={-20 - 5 * i} />
                              <line x1={10 * i} y1={-5 * i} x2={-40 + 10 * i} y2={-20 - 5 * i} />
                            </React.Fragment>
                          ))}
                          {[1, 2, 3].map(i => (
                            <React.Fragment key={`left-${i}`}>
                              <line x1={-10 * i} y1={-5 * i} x2={-10 * i} y2={40 - 5 * i} />
                              <line x1={0} y1={10 * i} x2={-40} y2={-20 + 10 * i} />
                            </React.Fragment>
                          ))}
                          {[1, 2, 3].map(i => (
                            <React.Fragment key={`right-${i}`}>
                              <line x1={10 * i} y1={-5 * i} x2={10 * i} y2={40 - 5 * i} />
                              <line x1={0} y1={10 * i} x2={40} y2={-20 + 10 * i} />
                            </React.Fragment>
                          ))}
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Middle Row: All 1s, Counting, Odd, Even */}
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'space-between' }}>
                  {/* All 1s */}
                  <div style={{ flex: 1, backgroundColor: '#fffdf6', borderRadius: '24px', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', border: '2px solid #fef08a' }}>
                    <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#1e1b4b', textAlign: 'center' }}>All 1s</div>
                    <div style={{ display: 'flex', gap: '8px', flex: 1, alignItems: 'flex-end', paddingBottom: '16px' }}>
                      {[1, 2, 3, 4, 5].map(i => <div key={i} style={{ width: '16px', height: '16px', backgroundColor: '#ef4444', borderRadius: '50%' }}></div>)}
                    </div>
                  </div>

                  {/* Counting Numbers */}
                  <div style={{ flex: 1, backgroundColor: '#fffdf6', borderRadius: '24px', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', border: '2px solid #fef08a' }}>
                    <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#1e1b4b', textAlign: 'center', lineHeight: 1.2 }}>Counting<br />Numbers</div>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', flex: 1, paddingBottom: '16px' }}>
                      <div style={{ width: '8px', height: '8px', backgroundColor: '#2563eb', borderRadius: '50%' }}></div>

                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                        <div style={{ width: '8px', height: '8px', backgroundColor: '#2563eb', borderRadius: '50%' }}></div>
                        <div style={{ display: 'flex', gap: '2px' }}><div style={{ width: '8px', height: '8px', backgroundColor: '#2563eb', borderRadius: '50%' }}></div><div style={{ width: '8px', height: '8px', backgroundColor: '#2563eb', borderRadius: '50%' }}></div></div>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                        <div style={{ width: '8px', height: '8px', backgroundColor: '#2563eb', borderRadius: '50%' }}></div>
                        <div style={{ display: 'flex', gap: '2px' }}><div style={{ width: '8px', height: '8px', backgroundColor: '#2563eb', borderRadius: '50%' }}></div><div style={{ width: '8px', height: '8px', backgroundColor: '#2563eb', borderRadius: '50%' }}></div></div>
                        <div style={{ display: 'flex', gap: '2px' }}><div style={{ width: '8px', height: '8px', backgroundColor: '#2563eb', borderRadius: '50%' }}></div><div style={{ width: '8px', height: '8px', backgroundColor: '#2563eb', borderRadius: '50%' }}></div><div style={{ width: '8px', height: '8px', backgroundColor: '#2563eb', borderRadius: '50%' }}></div></div>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                        <div style={{ width: '8px', height: '8px', backgroundColor: '#2563eb', borderRadius: '50%' }}></div>
                        <div style={{ display: 'flex', gap: '2px' }}><div style={{ width: '8px', height: '8px', backgroundColor: '#2563eb', borderRadius: '50%' }}></div><div style={{ width: '8px', height: '8px', backgroundColor: '#2563eb', borderRadius: '50%' }}></div></div>
                        <div style={{ display: 'flex', gap: '2px' }}><div style={{ width: '8px', height: '8px', backgroundColor: '#2563eb', borderRadius: '50%' }}></div><div style={{ width: '8px', height: '8px', backgroundColor: '#2563eb', borderRadius: '50%' }}></div><div style={{ width: '8px', height: '8px', backgroundColor: '#2563eb', borderRadius: '50%' }}></div></div>
                        <div style={{ display: 'flex', gap: '2px' }}><div style={{ width: '8px', height: '8px', backgroundColor: '#2563eb', borderRadius: '50%' }}></div><div style={{ width: '8px', height: '8px', backgroundColor: '#2563eb', borderRadius: '50%' }}></div><div style={{ width: '8px', height: '8px', backgroundColor: '#2563eb', borderRadius: '50%' }}></div><div style={{ width: '8px', height: '8px', backgroundColor: '#2563eb', borderRadius: '50%' }}></div></div>
                      </div>
                    </div>
                  </div>

                  {/* Odd Numbers */}
                  <div style={{ flex: 1, backgroundColor: '#fffdf6', borderRadius: '24px', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', border: '2px solid #fef08a' }}>
                    <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#1e1b4b', textAlign: 'center', lineHeight: 1.2 }}>Odd<br />Numbers</div>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', flex: 1, paddingBottom: '16px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                        <div style={{ width: '8px', height: '8px', backgroundColor: '#9333ea', borderRadius: '50%' }}></div>
                        <div style={{ display: 'flex', gap: '2px' }}><div style={{ width: '8px', height: '8px', backgroundColor: '#9333ea', borderRadius: '50%' }}></div><div style={{ width: '8px', height: '8px', backgroundColor: '#9333ea', borderRadius: '50%' }}></div></div>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                        <div style={{ display: 'flex', gap: '2px' }}><div style={{ width: '8px', height: '8px', backgroundColor: '#9333ea', borderRadius: '50%' }}></div><div style={{ width: '8px', height: '8px', backgroundColor: '#9333ea', borderRadius: '50%' }}></div></div>
                        <div style={{ display: 'flex', gap: '2px' }}><div style={{ width: '8px', height: '8px', backgroundColor: '#9333ea', borderRadius: '50%' }}></div><div style={{ width: '8px', height: '8px', backgroundColor: '#9333ea', borderRadius: '50%' }}></div><div style={{ width: '8px', height: '8px', backgroundColor: '#9333ea', borderRadius: '50%' }}></div></div>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                        <div style={{ display: 'flex', gap: '2px' }}><div style={{ width: '8px', height: '8px', backgroundColor: '#9333ea', borderRadius: '50%' }}></div><div style={{ width: '8px', height: '8px', backgroundColor: '#9333ea', borderRadius: '50%' }}></div><div style={{ width: '8px', height: '8px', backgroundColor: '#9333ea', borderRadius: '50%' }}></div></div>
                        <div style={{ display: 'flex', gap: '2px' }}><div style={{ width: '8px', height: '8px', backgroundColor: '#9333ea', borderRadius: '50%' }}></div><div style={{ width: '8px', height: '8px', backgroundColor: '#9333ea', borderRadius: '50%' }}></div><div style={{ width: '8px', height: '8px', backgroundColor: '#9333ea', borderRadius: '50%' }}></div><div style={{ width: '8px', height: '8px', backgroundColor: '#9333ea', borderRadius: '50%' }}></div></div>
                      </div>
                    </div>
                  </div>

                  {/* Even Numbers */}
                  <div style={{ flex: 1, backgroundColor: '#fffdf6', borderRadius: '24px', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', border: '2px solid #fef08a' }}>
                    <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#1e1b4b', textAlign: 'center', lineHeight: 1.2 }}>Even<br />Numbers</div>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', flex: 1, paddingBottom: '16px' }}>
                      <div style={{ display: 'flex', gap: '2px' }}><div style={{ width: '8px', height: '8px', backgroundColor: '#ea580c', borderRadius: '50%' }}></div><div style={{ width: '8px', height: '8px', backgroundColor: '#ea580c', borderRadius: '50%' }}></div></div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <div style={{ display: 'flex', gap: '2px' }}><div style={{ width: '8px', height: '8px', backgroundColor: '#ea580c', borderRadius: '50%' }}></div><div style={{ width: '8px', height: '8px', backgroundColor: '#ea580c', borderRadius: '50%' }}></div></div>
                        <div style={{ display: 'flex', gap: '2px' }}><div style={{ width: '8px', height: '8px', backgroundColor: '#ea580c', borderRadius: '50%' }}></div><div style={{ width: '8px', height: '8px', backgroundColor: '#ea580c', borderRadius: '50%' }}></div></div>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <div style={{ display: 'flex', gap: '2px' }}><div style={{ width: '8px', height: '8px', backgroundColor: '#ea580c', borderRadius: '50%' }}></div><div style={{ width: '8px', height: '8px', backgroundColor: '#ea580c', borderRadius: '50%' }}></div><div style={{ width: '8px', height: '8px', backgroundColor: '#ea580c', borderRadius: '50%' }}></div><div style={{ width: '8px', height: '8px', backgroundColor: '#ea580c', borderRadius: '50%' }}></div></div>
                        <div style={{ display: 'flex', gap: '2px' }}><div style={{ width: '8px', height: '8px', backgroundColor: '#ea580c', borderRadius: '50%' }}></div><div style={{ width: '8px', height: '8px', backgroundColor: '#ea580c', borderRadius: '50%' }}></div><div style={{ width: '8px', height: '8px', backgroundColor: '#ea580c', borderRadius: '50%' }}></div><div style={{ width: '8px', height: '8px', backgroundColor: '#ea580c', borderRadius: '50%' }}></div></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Message Banner */}
                <div style={{ backgroundColor: '#e0f2fe', color: '#1e3a8a', padding: '24px', borderRadius: '24px', fontSize: '2.4rem', fontWeight: '800', textAlign: 'center', border: '2px solid #bae6fd' }}>
                  We can see many number sequences as pictures.
                </div>
              </div>
            </div>
          </>
        )}

        {page === 39 && (
          <>
            {/* Top Left Badge */}
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '0', zIndex: 10 }}>
              <div style={{
                backgroundColor: '#0f172a',
                color: 'white',
                padding: '8px 24px',
                borderRadius: '12px 0 0 12px',
                fontSize: '1.6rem',
                fontWeight: '900',
                boxShadow: '2px 2px 8px rgba(0,0,0,0.2)'
              }}>
                1
              </div>
              <div style={{
                backgroundColor: '#fef08a',
                color: '#1e1b4b',
                padding: '8px 24px',
                borderRadius: '0 12px 12px 0',
                fontSize: '1.6rem',
                fontWeight: '800',
                boxShadow: '2px 2px 8px rgba(0,0,0,0.2)'
              }}>
                A new pattern appears
              </div>
            </div>

            {/* Boy */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: '-4%',
              width: '20%',
              height: '38%',
              zIndex: 5,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-start'
            }}>
              <img
                src={b4}
                alt="Boy"
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  objectPosition: 'left bottom',
                  display: 'block',
                }}
              />
            </div>

            {/* Speech bubble */}
            <div style={{
              position: 'absolute',
              top: '65%',
              left: '10%',
              width: '20%',
              zIndex: 6
            }}>
              <img
                src={s28}
                alt="Speech bubble"
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />
            </div>

            {/* Center Content: Hexagons */}
            <div style={{
              position: 'absolute',
              top: '40%',
              left: '60%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              alignItems: 'flex-end',
              gap: '24px',
              zIndex: 10,
              width: '65%'
            }}>

              {/* Card 1 (1) */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', opacity: page39Step >= 1 ? 1 : 0, transition: 'opacity 0.6s ease-in-out' }}>
                <div style={{ width: '100%', aspectRatio: '1', backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '24px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '20px', height: '20px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(234,88,12,0.4)' }}></div>
                </div>
                <div style={{ backgroundColor: '#fdf2f8', color: '#be185d', padding: '8px 24px', borderRadius: '12px', fontSize: '2rem', fontWeight: '900', border: '2px solid #fbcfe8', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '70%', textAlign: 'center' }}>
                  1
                </div>
              </div>

              {/* Card 2 (7) */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', opacity: page39Step >= 2 ? 1 : 0, transition: 'opacity 0.6s ease-in-out' }}>
                <div style={{ width: '100%', aspectRatio: '1', backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '24px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                    <div style={{ display: 'flex', gap: '4px' }}>{[1, 2].map(i => <div key={i} style={{ width: '20px', height: '20px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(234,88,12,0.4)' }}></div>)}</div>
                    <div style={{ display: 'flex', gap: '4px' }}>{[1, 2, 3].map(i => <div key={i} style={{ width: '20px', height: '20px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(234,88,12,0.4)' }}></div>)}</div>
                    <div style={{ display: 'flex', gap: '4px' }}>{[1, 2].map(i => <div key={i} style={{ width: '20px', height: '20px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(234,88,12,0.4)' }}></div>)}</div>
                  </div>
                </div>
                <div style={{ backgroundColor: '#fdf2f8', color: '#be185d', padding: '8px 24px', borderRadius: '12px', fontSize: '2rem', fontWeight: '900', border: '2px solid #fbcfe8', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '70%', textAlign: 'center' }}>
                  7
                </div>
              </div>

              {/* Card 3 (19) */}
              <div style={{ flex: 1.2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', opacity: page39Step >= 3 ? 1 : 0, transition: 'opacity 0.6s ease-in-out' }}>
                <div style={{ width: '100%', aspectRatio: '1', backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '24px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                    <div style={{ display: 'flex', gap: '4px' }}>{[1, 2, 3].map(i => <div key={i} style={{ width: '20px', height: '20px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(234,88,12,0.4)' }}></div>)}</div>
                    <div style={{ display: 'flex', gap: '4px' }}>{[1, 2, 3, 4].map(i => <div key={i} style={{ width: '20px', height: '20px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(234,88,12,0.4)' }}></div>)}</div>
                    <div style={{ display: 'flex', gap: '4px' }}>{[1, 2, 3, 4, 5].map(i => <div key={i} style={{ width: '20px', height: '20px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(234,88,12,0.4)' }}></div>)}</div>
                    <div style={{ display: 'flex', gap: '4px' }}>{[1, 2, 3, 4].map(i => <div key={i} style={{ width: '20px', height: '20px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(234,88,12,0.4)' }}></div>)}</div>
                    <div style={{ display: 'flex', gap: '4px' }}>{[1, 2, 3].map(i => <div key={i} style={{ width: '20px', height: '20px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(234,88,12,0.4)' }}></div>)}</div>
                  </div>
                </div>
                <div style={{ backgroundColor: '#fdf2f8', color: '#be185d', padding: '8px 24px', borderRadius: '12px', fontSize: '2rem', fontWeight: '900', border: '2px solid #fbcfe8', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '70%', textAlign: 'center' }}>
                  19
                </div>
              </div>

              {/* Card 4 (37) */}
              <div style={{ flex: 1.4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', opacity: page39Step >= 4 ? 1 : 0, transition: 'opacity 0.6s ease-in-out' }}>
                <div style={{ width: '100%', aspectRatio: '1', backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '24px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                    <div style={{ display: 'flex', gap: '4px' }}>{[1, 2, 3, 4].map(i => <div key={i} style={{ width: '20px', height: '20px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(234,88,12,0.4)' }}></div>)}</div>
                    <div style={{ display: 'flex', gap: '4px' }}>{[1, 2, 3, 4, 5].map(i => <div key={i} style={{ width: '20px', height: '20px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(234,88,12,0.4)' }}></div>)}</div>
                    <div style={{ display: 'flex', gap: '4px' }}>{[1, 2, 3, 4, 5, 6].map(i => <div key={i} style={{ width: '20px', height: '20px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(234,88,12,0.4)' }}></div>)}</div>
                    <div style={{ display: 'flex', gap: '4px' }}>{[1, 2, 3, 4, 5, 6, 7].map(i => <div key={i} style={{ width: '20px', height: '20px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(234,88,12,0.4)' }}></div>)}</div>
                    <div style={{ display: 'flex', gap: '4px' }}>{[1, 2, 3, 4, 5, 6].map(i => <div key={i} style={{ width: '20px', height: '20px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(234,88,12,0.4)' }}></div>)}</div>
                    <div style={{ display: 'flex', gap: '4px' }}>{[1, 2, 3, 4, 5].map(i => <div key={i} style={{ width: '20px', height: '20px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(234,88,12,0.4)' }}></div>)}</div>
                    <div style={{ display: 'flex', gap: '4px' }}>{[1, 2, 3, 4].map(i => <div key={i} style={{ width: '20px', height: '20px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(234,88,12,0.4)' }}></div>)}</div>
                  </div>
                </div>
                <div style={{ backgroundColor: '#fdf2f8', color: '#be185d', padding: '8px 24px', borderRadius: '12px', fontSize: '2rem', fontWeight: '900', border: '2px solid #fbcfe8', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '70%', textAlign: 'center' }}>
                  37
                </div>
              </div>

            </div>
          </>
        )}

        {page === 40 && (
          <>
            {/* Top Left Badge */}
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '0', zIndex: 10 }}>
              <div style={{
                backgroundColor: '#0f172a',
                color: 'white',
                padding: '8px 20px',
                borderRadius: '12px 0 0 12px',
                fontSize: '1.6rem',
                fontWeight: '900',
                boxShadow: '2px 2px 8px rgba(0,0,0,0.2)'
              }}>
                2
              </div>
              <div style={{
                backgroundColor: '#fef08a',
                color: '#1e1b4b',
                padding: '8px 20px',
                borderRadius: '0 12px 12px 0',
                fontSize: '1.6rem',
                fontWeight: '800',
                boxShadow: '2px 2px 8px rgba(0,0,0,0.2)'
              }}>
                Can you see the shape?
              </div>
            </div>

            {/* Boy */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: '-4%',
              width: '20%',
              height: '38%',
              zIndex: 5,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-start'
            }}>
              <img
                src={b4}
                alt="Boy"
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  objectPosition: 'left bottom',
                  display: 'block',
                }}
              />
            </div>

            {/* Speech bubble */}
            <div style={{
              position: 'absolute',
              top: '65%',
              left: '10%',
              width: '20%',
              zIndex: 6
            }}>
              <img
                src={s29}
                alt="Speech bubble"
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />
            </div>

            {/* Hexagon dots */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '60%',
              transform: 'translate(-50%, -50%)',
              zIndex: 5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              width: '400px',
              height: '400px',
              opacity: page40Step >= 1 ? 1 : 0,
              transition: 'opacity 0.8s ease-in-out'
            }}>
              <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }} viewBox="0 0 100 100">
                <polygon points="22,50 32,22 68,22 78,50 68,78 32,78" fill="none" stroke="#475569" strokeWidth="1" strokeDasharray="2,2" />
              </svg>

              <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                {[4, 5, 6, 7, 6, 5, 4].map((count, rowIdx) => (
                  <div key={rowIdx} style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                    {Array.from({ length: count }).map((_, colIdx) => (
                      <div key={colIdx} style={{
                        width: '20px',
                        height: '20px',
                        backgroundColor: '#f97316',
                        borderRadius: '50%',
                        boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.2), 0 2px 4px rgba(249,115,22,0.4)'
                      }}></div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom green box */}
            <div style={{
              position: 'absolute',
              bottom: '10%',
              left: '60%',
              transform: 'translateX(-50%)',
              backgroundColor: '#dcfce7',
              color: '#166534',
              padding: '16px 40px',
              borderRadius: '16px',
              fontSize: '2rem',
              fontWeight: '800',
              boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
              zIndex: 10,
              opacity: page40Step >= 1 ? 1 : 0,
              transition: 'opacity 0.8s ease-in-out 0.3s'
            }}>
              It looks like a hexagon!
            </div>
          </>
        )}

        {page === 41 && (
          <>
            {/* Top Left Badge */}
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '0', zIndex: 10 }}>
              <div style={{
                backgroundColor: '#0f172a',
                color: 'white',
                padding: '8px 24px',
                borderRadius: '12px 0 0 12px',
                fontSize: '1.6rem',
                fontWeight: '900',
                boxShadow: '2px 2px 8px rgba(0,0,0,0.2)'
              }}>
                3
              </div>
              <div style={{
                backgroundColor: '#fef08a',
                color: '#1e1b4b',
                padding: '8px 24px',
                borderRadius: '0 12px 12px 0',
                fontSize: '1.6rem',
                fontWeight: '800',
                boxShadow: '2px 2px 8px rgba(0,0,0,0.2)'
              }}>
                What comes next?
              </div>
            </div>

            {/* Boy */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: '-4%',
              width: '20%',
              height: '38%',
              zIndex: 5,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-start'
            }}>
              <img
                src={b4}
                alt="Boy"
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  objectPosition: 'left bottom',
                  display: 'block',
                }}
              />
            </div>

            {/* Speech bubble */}
            <div style={{
              position: 'absolute',
              top: '65%',
              left: '10%',
              width: '25%',
              zIndex: 6
            }}>
              <img
                src={s30}
                alt="Speech bubble"
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />
            </div>

            {/* Center Content: Hexagons */}
            <div style={{
              position: 'absolute',
              top: '40%',
              left: '55%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              alignItems: 'flex-end',
              gap: '16px',
              zIndex: 10,
              width: '75%'
            }}>

              {/* Card 1 (1) */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', opacity: page39Step >= 1 ? 1 : 0, transition: 'opacity 0.6s ease-in-out' }}>
                <div style={{ width: '100%', aspectRatio: '1', backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '24px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '16px', height: '16px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(234,88,12,0.4)' }}></div>
                </div>
                <div style={{ backgroundColor: '#fdf2f8', color: '#be185d', padding: '4px 12px', borderRadius: '12px', fontSize: '1.5rem', fontWeight: '900', border: '2px solid #fbcfe8', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '80%', textAlign: 'center' }}>
                  1
                </div>
              </div>

              {/* Card 2 (7) */}
              <div style={{ flex: 1.1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '100%', aspectRatio: '1', backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '24px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                    <div style={{ display: 'flex', gap: '4px' }}>{[1, 2].map(i => <div key={i} style={{ width: '16px', height: '16px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(234,88,12,0.4)' }}></div>)}</div>
                    <div style={{ display: 'flex', gap: '4px' }}>{[1, 2, 3].map(i => <div key={i} style={{ width: '16px', height: '16px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(234,88,12,0.4)' }}></div>)}</div>
                    <div style={{ display: 'flex', gap: '4px' }}>{[1, 2].map(i => <div key={i} style={{ width: '16px', height: '16px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(234,88,12,0.4)' }}></div>)}</div>
                  </div>
                </div>
                <div style={{ backgroundColor: '#fdf2f8', color: '#be185d', padding: '4px 12px', borderRadius: '12px', fontSize: '1.5rem', fontWeight: '900', border: '2px solid #fbcfe8', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '80%', textAlign: 'center' }}>
                  7
                </div>
              </div>

              {/* Card 3 (19) */}
              <div style={{ flex: 1.3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '100%', aspectRatio: '1', backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '24px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                    <div style={{ display: 'flex', gap: '4px' }}>{[1, 2, 3].map(i => <div key={i} style={{ width: '16px', height: '16px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(234,88,12,0.4)' }}></div>)}</div>
                    <div style={{ display: 'flex', gap: '4px' }}>{[1, 2, 3, 4].map(i => <div key={i} style={{ width: '16px', height: '16px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(234,88,12,0.4)' }}></div>)}</div>
                    <div style={{ display: 'flex', gap: '4px' }}>{[1, 2, 3, 4, 5].map(i => <div key={i} style={{ width: '16px', height: '16px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(234,88,12,0.4)' }}></div>)}</div>
                    <div style={{ display: 'flex', gap: '4px' }}>{[1, 2, 3, 4].map(i => <div key={i} style={{ width: '16px', height: '16px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(234,88,12,0.4)' }}></div>)}</div>
                    <div style={{ display: 'flex', gap: '4px' }}>{[1, 2, 3].map(i => <div key={i} style={{ width: '16px', height: '16px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(234,88,12,0.4)' }}></div>)}</div>
                  </div>
                </div>
                <div style={{ backgroundColor: '#fdf2f8', color: '#be185d', padding: '4px 12px', borderRadius: '12px', fontSize: '1.5rem', fontWeight: '900', border: '2px solid #fbcfe8', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '80%', textAlign: 'center' }}>
                  19
                </div>
              </div>

              {/* Card 4 (37) */}
              <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '100%', aspectRatio: '1', backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '24px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                    <div style={{ display: 'flex', gap: '4px' }}>{[1, 2, 3, 4].map(i => <div key={i} style={{ width: '16px', height: '16px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(234,88,12,0.4)' }}></div>)}</div>
                    <div style={{ display: 'flex', gap: '4px' }}>{[1, 2, 3, 4, 5].map(i => <div key={i} style={{ width: '16px', height: '16px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(234,88,12,0.4)' }}></div>)}</div>
                    <div style={{ display: 'flex', gap: '4px' }}>{[1, 2, 3, 4, 5, 6].map(i => <div key={i} style={{ width: '16px', height: '16px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(234,88,12,0.4)' }}></div>)}</div>
                    <div style={{ display: 'flex', gap: '4px' }}>{[1, 2, 3, 4, 5, 6, 7].map(i => <div key={i} style={{ width: '16px', height: '16px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(234,88,12,0.4)' }}></div>)}</div>
                    <div style={{ display: 'flex', gap: '4px' }}>{[1, 2, 3, 4, 5, 6].map(i => <div key={i} style={{ width: '16px', height: '16px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(234,88,12,0.4)' }}></div>)}</div>
                    <div style={{ display: 'flex', gap: '4px' }}>{[1, 2, 3, 4, 5].map(i => <div key={i} style={{ width: '16px', height: '16px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(234,88,12,0.4)' }}></div>)}</div>
                    <div style={{ display: 'flex', gap: '4px' }}>{[1, 2, 3, 4].map(i => <div key={i} style={{ width: '16px', height: '16px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(234,88,12,0.4)' }}></div>)}</div>
                  </div>
                </div>
                <div style={{ backgroundColor: '#fdf2f8', color: '#be185d', padding: '4px 12px', borderRadius: '12px', fontSize: '1.5rem', fontWeight: '900', border: '2px solid #fbcfe8', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '80%', textAlign: 'center' }}>
                  37
                </div>
              </div>

              {/* Card 5 (?) */}
              <div style={{ flex: 1.7, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '100%', aspectRatio: '1', backgroundColor: '#fffdf6', borderRadius: '24px', border: '4px dashed #94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {selectedOptions[41] === 61 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                      <div style={{ display: 'flex', gap: '4px' }}>{[1, 2, 3, 4, 5].map(i => <div key={i} style={{ width: '16px', height: '16px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(234,88,12,0.4)' }}></div>)}</div>
                      <div style={{ display: 'flex', gap: '4px' }}>{[1, 2, 3, 4, 5, 6].map(i => <div key={i} style={{ width: '16px', height: '16px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(234,88,12,0.4)' }}></div>)}</div>
                      <div style={{ display: 'flex', gap: '4px' }}>{[1, 2, 3, 4, 5, 6, 7].map(i => <div key={i} style={{ width: '16px', height: '16px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(234,88,12,0.4)' }}></div>)}</div>
                      <div style={{ display: 'flex', gap: '4px' }}>{[1, 2, 3, 4, 5, 6, 7, 8].map(i => <div key={i} style={{ width: '16px', height: '16px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(234,88,12,0.4)' }}></div>)}</div>
                      <div style={{ display: 'flex', gap: '4px' }}>{[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => <div key={i} style={{ width: '16px', height: '16px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(234,88,12,0.4)' }}></div>)}</div>
                      <div style={{ display: 'flex', gap: '4px' }}>{[1, 2, 3, 4, 5, 6, 7, 8].map(i => <div key={i} style={{ width: '16px', height: '16px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(234,88,12,0.4)' }}></div>)}</div>
                      <div style={{ display: 'flex', gap: '4px' }}>{[1, 2, 3, 4, 5, 6, 7].map(i => <div key={i} style={{ width: '16px', height: '16px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(234,88,12,0.4)' }}></div>)}</div>
                      <div style={{ display: 'flex', gap: '4px' }}>{[1, 2, 3, 4, 5, 6].map(i => <div key={i} style={{ width: '16px', height: '16px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(234,88,12,0.4)' }}></div>)}</div>
                      <div style={{ display: 'flex', gap: '4px' }}>{[1, 2, 3, 4, 5].map(i => <div key={i} style={{ width: '16px', height: '16px', backgroundColor: '#ea580c', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(234,88,12,0.4)' }}></div>)}</div>
                    </div>
                  ) : (
                    <div style={{ fontSize: '4rem', fontWeight: '900', color: '#0f172a' }}>?</div>
                  )}
                </div>
                <div style={{ backgroundColor: '#fdf2f8', color: '#be185d', padding: '4px 12px', borderRadius: '12px', fontSize: '1.5rem', fontWeight: '900', border: '2px solid #fbcfe8', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '80%', textAlign: 'center' }}>
                  {selectedOptions[41] === 61 ? '61' : '?'}
                </div>
              </div>

            </div>

            {renderOptions(41, [41, 61, 71], 61, '80%')}
          </>
        )}

        {page === 42 && (
          <>
            {/* Top Left Badge */}
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '0', zIndex: 10 }}>
              <div style={{
                backgroundColor: '#0f172a',
                color: 'white',
                padding: '8px 24px',
                borderRadius: '12px 0 0 12px',
                fontSize: '1.6rem',
                fontWeight: '900',
                boxShadow: '2px 2px 8px rgba(0,0,0,0.2)'
              }}>
                5
              </div>
              <div style={{
                backgroundColor: '#fef08a',
                color: '#1e1b4b',
                padding: '8px 24px',
                borderRadius: '0 12px 12px 0',
                fontSize: '1.6rem',
                fontWeight: '800',
                boxShadow: '2px 2px 8px rgba(0,0,0,0.2)'
              }}>
                Powers of 2 – Can you make the picture?
              </div>
            </div>

            {/* Boy */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: '-4%',
              width: '20%',
              height: '38%',
              zIndex: 5,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-start'
            }}>
              <img
                src={b4}
                alt="Boy"
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  objectPosition: 'left bottom',
                  display: 'block',
                }}
              />
            </div>

            {/* Speech bubble */}
            <div style={{
              position: 'absolute',
              top: '55%',
              left: '12%',
              width: '30%',
              zIndex: 6
            }}>
              <img
                src={s31}
                alt="Speech bubble"
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />
            </div>

            {/* Center Content: Number Pattern Box */}
            <div style={{
              position: 'absolute',
              top: '40%',
              left: '65%',
              transform: 'translate(-50%, -50%)',
              zIndex: 10,
              width: '45%',
              borderRadius: '24px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
              border: '6px solid white',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{
                backgroundColor: '#dbeafe',
                color: '#1e3a8a',
                padding: '16px',
                textAlign: 'center',
                fontSize: '2rem',
                fontWeight: '800',
                borderRadius: '16px 16px 0 0'
              }}>
                Powers of 2
              </div>
              <div style={{
                backgroundColor: '#fef9c3',
                color: '#1e1b4b',
                padding: '32px 16px',
                textAlign: 'center',
                fontSize: '3rem',
                fontWeight: '900',
                borderRadius: '0 0 16px 16px',
                letterSpacing: '8px'
              }}>
                1 2 4 8 16 ...
              </div>
            </div>

            {/* Bottom green box */}
            <div style={{
              position: 'absolute',
              bottom: '15%',
              left: '65%',
              transform: 'translateX(-50%)',
              backgroundColor: '#dcfce7',
              color: '#166534',
              padding: '24px 40px',
              borderRadius: '24px',
              fontSize: '1.8rem',
              fontWeight: '800',
              boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
              zIndex: 10,
              textAlign: 'center',
              width: '50%'
            }}>
              You can try using dots, boxes,<br />objects or any idea you like.
            </div>
          </>
        )}

        {page === 43 && (
          <>
            {/* Top Left Badge */}
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '0', zIndex: 10 }}>
              <div style={{
                backgroundColor: '#0f172a',
                color: 'white',
                padding: '8px 24px',
                borderRadius: '12px 0 0 12px',
                fontSize: '1.6rem',
                fontWeight: '900',
                boxShadow: '2px 2px 8px rgba(0,0,0,0.2)'
              }}>
                6
              </div>
              <div style={{
                backgroundColor: '#fef08a',
                color: '#1e1b4b',
                padding: '8px 24px',
                borderRadius: '0 12px 12px 0',
                fontSize: '1.6rem',
                fontWeight: '800',
                boxShadow: '2px 2px 8px rgba(0,0,0,0.2)'
              }}>
                One possible idea (example)
              </div>
            </div>

            {/* Center Content: Cards */}
            <div style={{
              position: 'absolute',
              top: '45%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              gap: '24px',
              zIndex: 10,
              width: '85%'
            }}>

              {/* Card 1 (1) */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', opacity: page39Step >= 1 ? 1 : 0, transition: 'opacity 0.6s ease-in-out' }}>
                <div style={{ width: '100%', aspectRatio: '1', backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '24px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '20px', height: '20px', backgroundColor: '#2563eb', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(37,99,235,0.4)' }}></div>
                </div>
                <div style={{ backgroundColor: '#fdf2f8', color: '#be185d', padding: '8px 24px', borderRadius: '12px', fontSize: '2rem', fontWeight: '900', border: '2px solid #fbcfe8', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '70%', textAlign: 'center' }}>
                  1
                </div>
              </div>

              {/* Card 2 (2) */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '100%', aspectRatio: '1', backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '24px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {[1, 2].map(i => <div key={i} style={{ width: '20px', height: '20px', backgroundColor: '#2563eb', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(37,99,235,0.4)' }}></div>)}
                  </div>
                </div>
                <div style={{ backgroundColor: '#fdf2f8', color: '#be185d', padding: '8px 24px', borderRadius: '12px', fontSize: '2rem', fontWeight: '900', border: '2px solid #fbcfe8', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '70%', textAlign: 'center' }}>
                  2
                </div>
              </div>

              {/* Card 3 (4) */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '100%', aspectRatio: '1', backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '24px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {[1, 2].map(row => (
                      <div key={row} style={{ display: 'flex', gap: '8px' }}>
                        {[1, 2].map(col => <div key={col} style={{ width: '20px', height: '20px', backgroundColor: '#2563eb', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(37,99,235,0.4)' }}></div>)}
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ backgroundColor: '#fdf2f8', color: '#be185d', padding: '8px 24px', borderRadius: '12px', fontSize: '2rem', fontWeight: '900', border: '2px solid #fbcfe8', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '70%', textAlign: 'center' }}>
                  4
                </div>
              </div>

              {/* Card 4 (8) */}
              <div style={{ flex: 1.1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '100%', aspectRatio: '1', backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '24px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {[1, 2, 3, 4].map(row => (
                      <div key={row} style={{ display: 'flex', gap: '8px' }}>
                        {[1, 2].map(col => <div key={col} style={{ width: '20px', height: '20px', backgroundColor: '#2563eb', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(37,99,235,0.4)' }}></div>)}
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ backgroundColor: '#fdf2f8', color: '#be185d', padding: '8px 24px', borderRadius: '12px', fontSize: '2rem', fontWeight: '900', border: '2px solid #fbcfe8', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '70%', textAlign: 'center' }}>
                  8
                </div>
              </div>

              {/* Card 5 (16) */}
              <div style={{ flex: 1.2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '100%', aspectRatio: '1', backgroundColor: '#fffdf6', borderRadius: '24px', border: '4px dashed #94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {selectedOptions[43] === 16 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {[1, 2, 3, 4].map(row => (
                        <div key={row} style={{ display: 'flex', gap: '8px' }}>
                          {[1, 2, 3, 4].map(col => <div key={col} style={{ width: '20px', height: '20px', backgroundColor: '#2563eb', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(37,99,235,0.4)' }}></div>)}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ fontSize: '4rem', fontWeight: '900', color: '#0f172a' }}>?</div>
                  )}
                </div>
                <div style={{ backgroundColor: '#fdf2f8', color: '#be185d', padding: '8px 24px', borderRadius: '12px', fontSize: '2rem', fontWeight: '900', border: '2px solid #fbcfe8', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '70%', textAlign: 'center' }}>
                  {selectedOptions[43] === 16 ? '16' : '?'}
                </div>
              </div>

            </div>

            {/* Bottom info box */}
            <div style={{
              position: 'absolute',
              top: '70%',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: '#dbeafe',
              color: '#1e3a8a',
              padding: '16px 40px',
              borderRadius: '16px',
              fontSize: '1.6rem',
              fontWeight: '700',
              border: '2px solid #bfdbfe',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              zIndex: 10,
              width: '50%',
              textAlign: 'center'
            }}>
              This shows the numbers doubling each time.
            </div>

            {renderOptions(43, [12, 16, 20], 16, '85%')}
          </>
        )}

        {page === 44 && (
          <>
            {/* Top Left Badge */}
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '0', zIndex: 10 }}>
              <div style={{
                backgroundColor: '#0f172a',
                color: 'white',
                padding: '8px 24px',
                borderRadius: '12px 0 0 12px',
                fontSize: '1.6rem',
                fontWeight: '900',
                boxShadow: '2px 2px 8px rgba(0,0,0,0.2)'
              }}>
                8
              </div>
              <div style={{
                backgroundColor: '#fef08a',
                color: '#1e1b4b',
                padding: '8px 24px',
                borderRadius: '0 12px 12px 0',
                fontSize: '1.6rem',
                fontWeight: '800',
                boxShadow: '2px 2px 8px rgba(0,0,0,0.2)'
              }}>
                Powers of 3 – Now your turn
              </div>
            </div>

            {/* Boy */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: '-4%',
              width: '20%',
              height: '38%',
              zIndex: 5,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-start'
            }}>
              <img
                src={b4}
                alt="Boy"
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  objectPosition: 'left bottom',
                  display: 'block',
                }}
              />
            </div>

            {/* Speech bubble */}
            <div style={{
              position: 'absolute',
              top: '55%',
              left: '12%',
              width: '30%',
              zIndex: 6
            }}>
              <img
                src={s32}
                alt="Speech bubble"
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />
            </div>

            {/* Center Content: Number Pattern Box */}
            <div style={{
              position: 'absolute',
              top: '40%',
              left: '65%',
              transform: 'translate(-50%, -50%)',
              zIndex: 10,
              width: '45%',
              borderRadius: '24px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
              border: '6px solid white',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{
                backgroundColor: '#dbeafe',
                color: '#1e3a8a',
                padding: '16px',
                textAlign: 'center',
                fontSize: '2rem',
                fontWeight: '800',
                borderRadius: '16px 16px 0 0'
              }}>
                Powers of 3
              </div>
              <div style={{
                backgroundColor: '#fef9c3',
                color: '#1e1b4b',
                padding: '32px 16px',
                textAlign: 'center',
                fontSize: '3rem',
                fontWeight: '900',
                borderRadius: '0 0 16px 16px',
                letterSpacing: '8px'
              }}>
                1 3 9 27 ...
              </div>
            </div>

            {/* Bottom green box */}
            <div style={{
              position: 'absolute',
              bottom: '15%',
              left: '65%',
              transform: 'translateX(-50%)',
              backgroundColor: '#dcfce7',
              color: '#166534',
              padding: '24px 40px',
              borderRadius: '24px',
              fontSize: '1.7rem',
              fontWeight: '800',
              boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
              zIndex: 10,
              textAlign: 'center',
              width: '55%'
            }}>
              Use dots, shapes, objects or another<br />idea. There can be many correct answers!
            </div>
          </>
        )}

        {page === 45 && (
          <>
            {/* Top Left Badge */}
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '0', zIndex: 10 }}>
              <div style={{
                backgroundColor: '#0f172a',
                color: 'white',
                padding: '8px 24px',
                borderRadius: '12px 0 0 12px',
                fontSize: '1.6rem',
                fontWeight: '900',
                boxShadow: '2px 2px 8px rgba(0,0,0,0.2)'
              }}>
                9
              </div>
              <div style={{
                backgroundColor: '#fef08a',
                color: '#1e1b4b',
                padding: '8px 24px',
                borderRadius: '0 12px 12px 0',
                fontSize: '1.6rem',
                fontWeight: '800',
                boxShadow: '2px 2px 8px rgba(0,0,0,0.2)'
              }}>
                One possible idea (example)
              </div>
            </div>

            {/* Center Content: Cards */}
            <div style={{
              position: 'absolute',
              top: '40%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              gap: '24px',
              zIndex: 10,
              width: '80%'
            }}>

              {/* Card 1 (1) */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', opacity: page39Step >= 1 ? 1 : 0, transition: 'opacity 0.6s ease-in-out' }}>
                <div style={{ width: '100%', aspectRatio: '1', backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '24px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '20px', height: '20px', backgroundColor: '#e11d48', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(225,29,72,0.4)' }}></div>
                </div>
                <div style={{ backgroundColor: '#fdf2f8', color: '#be185d', padding: '8px 24px', borderRadius: '12px', fontSize: '2rem', fontWeight: '900', border: '2px solid #fbcfe8', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '70%', textAlign: 'center' }}>
                  1
                </div>
              </div>

              {/* Card 2 (3) */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '100%', aspectRatio: '1', backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '24px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    {[1, 2].map((count, rowIdx) => (
                      <div key={rowIdx} style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        {Array.from({ length: count }).map((_, colIdx) => (
                          <div key={colIdx} style={{ width: '20px', height: '20px', backgroundColor: '#e11d48', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(225,29,72,0.4)' }}></div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ backgroundColor: '#fdf2f8', color: '#be185d', padding: '8px 24px', borderRadius: '12px', fontSize: '2rem', fontWeight: '900', border: '2px solid #fbcfe8', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '70%', textAlign: 'center' }}>
                  3
                </div>
              </div>

              {/* Card 3 (9) */}
              <div style={{ flex: 1.1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '100%', aspectRatio: '1', backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '24px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {[1, 2, 3].map(row => (
                      <div key={row} style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        {[1, 2, 3].map(col => <div key={col} style={{ width: '20px', height: '20px', backgroundColor: '#e11d48', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(225,29,72,0.4)' }}></div>)}
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ backgroundColor: '#fdf2f8', color: '#be185d', padding: '8px 24px', borderRadius: '12px', fontSize: '2rem', fontWeight: '900', border: '2px solid #fbcfe8', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '70%', textAlign: 'center' }}>
                  9
                </div>
              </div>

              {/* Card 4 (27) */}
              <div style={{ flex: 1.3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '100%', aspectRatio: '1', backgroundColor: '#fffdf6', borderRadius: '24px', border: '4px dashed #94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {selectedOptions[45] === 27 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {[4, 5, 6, 5, 4, 3].map((count, rowIdx) => (
                        <div key={rowIdx} style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                          {Array.from({ length: count }).map((_, colIdx) => (
                            <div key={colIdx} style={{ width: '18px', height: '18px', backgroundColor: '#e11d48', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(225,29,72,0.4)' }}></div>
                          ))}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ fontSize: '4rem', fontWeight: '900', color: '#0f172a' }}>?</div>
                  )}
                </div>
                <div style={{ backgroundColor: '#fdf2f8', color: '#be185d', padding: '8px 24px', borderRadius: '12px', fontSize: '2rem', fontWeight: '900', border: '2px solid #fbcfe8', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '70%', textAlign: 'center' }}>
                  {selectedOptions[45] === 27 ? '27' : '?'}
                </div>
              </div>

            </div>

            {/* Bottom info box */}
            <div style={{
              position: 'absolute',
              top: '70%',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: '#dbeafe',
              color: '#1e3a8a',
              padding: '16px 40px',
              borderRadius: '16px',
              fontSize: '1.6rem',
              fontWeight: '700',
              border: '2px solid #bfdbfe',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              zIndex: 10,
              width: '60%',
              textAlign: 'center'
            }}>
              Each picture has 3 times as many dots as the previous one.
            </div>

            {renderOptions(45, [18, 27, 36], 27, '85%')}
          </>
        )}

        {page === 46 && (
          <>
            {/* Top Left Badge */}
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '0', zIndex: 10 }}>
              <div style={{
                backgroundColor: '#0f172a',
                color: 'white',
                padding: '8px 24px',
                borderRadius: '12px 0 0 12px',
                fontSize: '1.6rem',
                fontWeight: '900',
                boxShadow: '2px 2px 8px rgba(0,0,0,0.2)'
              }}>
                11
              </div>
              <div style={{
                backgroundColor: '#fef08a',
                color: '#1e1b4b',
                padding: '8px 24px',
                borderRadius: '0 12px 12px 0',
                fontSize: '1.6rem',
                fontWeight: '800',
                boxShadow: '2px 2px 8px rgba(0,0,0,0.2)'
              }}>
                Some number patterns we explored
              </div>
            </div>

            {/* Center Content: Cards Grid */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gridTemplateRows: 'repeat(2, 1fr)',
              gap: '24px',
              zIndex: 10,
              width: '90%',
              height: '70%'
            }}>

              {/* Card 1: Triangular */}
              <div style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', border: '2px solid #f1f5f9' }}>
                <div style={{ backgroundColor: '#fef08a', padding: '12px', textAlign: 'center', fontWeight: '800', color: '#1e1b4b', fontSize: '1.3rem', lineHeight: '1.2' }}>
                  Triangular<br />Numbers
                </div>
                <div style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: '#fafaf9' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                    {[1, 2, 3, 4].map(count => (
                      <div key={count} style={{ display: 'flex', gap: '4px' }}>
                        {Array.from({ length: count }).map((_, i) => (
                          <div key={i} style={{ width: '16px', height: '16px', backgroundColor: '#ef4444', borderRadius: '50%', boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.2), 0 2px 4px rgba(239,68,68,0.4)' }}></div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card 2: Square */}
              <div style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', border: '2px solid #f1f5f9' }}>
                <div style={{ backgroundColor: '#fef08a', padding: '12px', textAlign: 'center', fontWeight: '800', color: '#1e1b4b', fontSize: '1.3rem', lineHeight: '1.2' }}>
                  Square<br />Numbers
                </div>
                <div style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: '#fafaf9' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    {[1, 2, 3, 4].map(row => (
                      <div key={row} style={{ display: 'flex', gap: '2px' }}>
                        {[1, 2, 3, 4].map(col => (
                          <div key={col} style={{ width: '16px', height: '16px', backgroundColor: '#3b82f6', borderRadius: '2px', boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.2), 0 2px 4px rgba(59,130,246,0.4)' }}></div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card 3: Cube */}
              <div style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', border: '2px solid #f1f5f9' }}>
                <div style={{ backgroundColor: '#fef08a', padding: '12px', textAlign: 'center', fontWeight: '800', color: '#1e1b4b', fontSize: '1.3rem', lineHeight: '1.2' }}>
                  Cube<br />Numbers
                </div>
                <div style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: '#fafaf9' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                    {[4, 5, 6, 5, 4, 3].map((count, rowIdx) => (
                      <div key={rowIdx} style={{ display: 'flex', gap: '1px', justifyContent: 'center' }}>
                        {Array.from({ length: count }).map((_, colIdx) => (
                          <div key={colIdx} style={{ width: '12px', height: '12px', backgroundColor: '#22c55e', borderRadius: '2px', boxShadow: 'inset -1px -1px 2px rgba(0,0,0,0.2)' }}></div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card 4: All 1s */}
              <div style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', border: '2px solid #f1f5f9' }}>
                <div style={{ backgroundColor: '#fef08a', padding: '12px', textAlign: 'center', fontWeight: '800', color: '#1e1b4b', fontSize: '1.3rem', lineHeight: '1.2', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '62px' }}>
                  All 1s
                </div>
                <div style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: '#fafaf9' }}>
                  <div style={{ width: '32px', height: '32px', backgroundColor: '#ef4444', borderRadius: '50%', boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 0 4px 8px rgba(239,68,68,0.4)' }}></div>
                </div>
              </div>

              {/* Card 5: Counting Numbers */}
              <div style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', border: '2px solid #f1f5f9' }}>
                <div style={{ backgroundColor: '#fef08a', padding: '12px', textAlign: 'center', fontWeight: '800', color: '#1e1b4b', fontSize: '1.3rem', lineHeight: '1.2' }}>
                  Counting<br />Numbers
                </div>
                <div style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: '#fafaf9' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} style={{ width: '16px', height: '16px', backgroundColor: '#3b82f6', borderRadius: '50%', boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.2), 0 2px 4px rgba(59,130,246,0.4)' }}></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card 6: Odd Numbers */}
              <div style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', border: '2px solid #f1f5f9' }}>
                <div style={{ backgroundColor: '#fef08a', padding: '12px', textAlign: 'center', fontWeight: '800', color: '#1e1b4b', fontSize: '1.3rem', lineHeight: '1.2' }}>
                  Odd<br />Numbers
                </div>
                <div style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: '#fafaf9' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                    {[1, 3, 5, 7].map(count => (
                      <div key={count} style={{ display: 'flex', gap: '4px' }}>
                        {Array.from({ length: count }).map((_, i) => (
                          <div key={i} style={{ width: '12px', height: '12px', backgroundColor: '#a855f7', borderRadius: '50%', boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.2), 0 2px 4px rgba(168,85,247,0.4)' }}></div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card 7: Even Numbers */}
              <div style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', border: '2px solid #f1f5f9' }}>
                <div style={{ backgroundColor: '#fef08a', padding: '12px', textAlign: 'center', fontWeight: '800', color: '#1e1b4b', fontSize: '1.3rem', lineHeight: '1.2' }}>
                  Even<br />Numbers
                </div>
                <div style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: '#fafaf9' }}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-end' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {[1, 2].map(r => <div key={r} style={{ display: 'flex', gap: '4px' }}>{[1, 2, 3].map(c => <div key={c} style={{ width: '12px', height: '12px', backgroundColor: '#f97316', borderRadius: '50%', boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.2), 0 2px 4px rgba(249,115,22,0.4)' }}></div>)}</div>)}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {[1, 2, 3].map(r => <div key={r} style={{ display: 'flex', gap: '4px' }}>{[1, 2, 3, 4].map(c => <div key={c} style={{ width: '12px', height: '12px', backgroundColor: '#f97316', borderRadius: '50%', boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.2), 0 2px 4px rgba(249,115,22,0.4)' }}></div>)}</div>)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 8: Hexagonal Numbers */}
              <div style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', border: '2px solid #f1f5f9' }}>
                <div style={{ backgroundColor: '#fef08a', padding: '12px', textAlign: 'center', fontWeight: '800', color: '#1e1b4b', fontSize: '1.3rem', lineHeight: '1.2' }}>
                  Hexagonal<br />Numbers
                </div>
                <div style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: '#fafaf9' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    {[3, 4, 5, 4, 3].map((count, rowIdx) => (
                      <div key={rowIdx} style={{ display: 'flex', gap: '2px', justifyContent: 'center' }}>
                        {Array.from({ length: count }).map((_, colIdx) => (
                          <div key={colIdx} style={{ width: '10px', height: '10px', backgroundColor: '#f97316', borderRadius: '50%', boxShadow: 'inset -1px -1px 2px rgba(0,0,0,0.2), 0 1px 2px rgba(249,115,22,0.4)' }}></div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card 9: Powers of 2 */}
              <div style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', border: '2px solid #f1f5f9' }}>
                <div style={{ backgroundColor: '#fef08a', padding: '12px', textAlign: 'center', fontWeight: '800', color: '#1e1b4b', fontSize: '1.3rem', lineHeight: '1.2' }}>
                  Powers of 2
                </div>
                <div style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: '#fafaf9' }}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-end' }}>
                    <div style={{ width: '12px', height: '12px', backgroundColor: '#3b82f6', borderRadius: '50%', boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.2), 0 2px 4px rgba(59,130,246,0.4)' }}></div>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      {[1, 2].map(i => <div key={i} style={{ width: '12px', height: '12px', backgroundColor: '#3b82f6', borderRadius: '50%', boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.2), 0 2px 4px rgba(59,130,246,0.4)' }}></div>)}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {[1, 2].map(r => <div key={r} style={{ display: 'flex', gap: '4px' }}>{[1, 2].map(c => <div key={c} style={{ width: '12px', height: '12px', backgroundColor: '#3b82f6', borderRadius: '50%', boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.2), 0 2px 4px rgba(59,130,246,0.4)' }}></div>)}</div>)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 10: Powers of 3 */}
              <div style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', border: '2px solid #f1f5f9' }}>
                <div style={{ backgroundColor: '#fef08a', padding: '12px', textAlign: 'center', fontWeight: '800', color: '#1e1b4b', fontSize: '1.3rem', lineHeight: '1.2' }}>
                  Powers of 3
                </div>
                <div style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: '#fafaf9' }}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-end' }}>
                    <div style={{ width: '12px', height: '12px', backgroundColor: '#e11d48', borderRadius: '50%', boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.2), 0 2px 4px rgba(225,29,72,0.4)' }}></div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                      <div style={{ width: '12px', height: '12px', backgroundColor: '#e11d48', borderRadius: '50%', boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.2), 0 2px 4px rgba(225,29,72,0.4)' }}></div>
                      <div style={{ display: 'flex', gap: '4px' }}>{[1, 2].map(i => <div key={i} style={{ width: '12px', height: '12px', backgroundColor: '#e11d48', borderRadius: '50%', boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.2), 0 2px 4px rgba(225,29,72,0.4)' }}></div>)}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {[1, 2, 3].map(r => <div key={r} style={{ display: 'flex', gap: '4px' }}>{[1, 2, 3].map(c => <div key={c} style={{ width: '12px', height: '12px', backgroundColor: '#e11d48', borderRadius: '50%', boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.2), 0 2px 4px rgba(225,29,72,0.4)' }}></div>)}</div>)}
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </>
        )}

        {page === 47 && (
          <>
            {/* Top Left Badge */}
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '0', zIndex: 10 }}>
              <div style={{
                backgroundColor: '#0f172a',
                color: 'white',
                padding: '8px 24px',
                borderRadius: '12px 0 0 12px',
                fontSize: '1.6rem',
                fontWeight: '900',
                boxShadow: '2px 2px 8px rgba(0,0,0,0.2)'
              }}>
                12
              </div>
              <div style={{
                backgroundColor: '#fef08a',
                color: '#1e1b4b',
                padding: '8px 24px',
                borderRadius: '0 12px 12px 0',
                fontSize: '1.6rem',
                fontWeight: '800',
                boxShadow: '2px 2px 8px rgba(0,0,0,0.2)'
              }}>
                What next?
              </div>
            </div>

            {/* Boy */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: '-4%',
              width: '25%',
              height: '45%',
              zIndex: 5,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-start'
            }}>
              <img
                src={b4}
                alt="Boy"
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  objectPosition: 'left bottom',
                  display: 'block',
                }}
              />
            </div>

            {/* Speech bubble */}
            <div style={{
              position: 'absolute',
              top: '40%',
              left: '20%',
              width: '55%',
              zIndex: 6
            }}>
              <img
                src={s34}
                alt="Speech bubble"
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />
            </div>

            {/* Big Blue Next Arrow Visual */}
            <div style={{
              position: 'absolute',
              bottom: '15%',
              right: '5%',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
              animation: 'bounceRight 2s infinite'
            }}>
              <style>
                {`
                  @keyframes bounceRight {
                    0%, 100% { transform: translateX(0); }
                    50% { transform: translateX(10px); }
                  }
                `}
              </style>
              <div style={{
                width: '60px',
                height: '40px',
                backgroundColor: '#0066ff',
                border: '4px solid white',
                borderRight: 'none',
              }}></div>
              <div style={{
                width: '0',
                height: '0',
                borderTop: '40px solid transparent',
                borderBottom: '40px solid transparent',
                borderLeft: '40px solid white',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-32px',
                  left: '-38px',
                  width: '0',
                  height: '0',
                  borderTop: '32px solid transparent',
                  borderBottom: '32px solid transparent',
                  borderLeft: '32px solid #0066ff'
                }}></div>
              </div>
            </div>
          </>
        )}

        {page === 48 && (
          <>
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '0', zIndex: 10 }}>
              <div style={{ backgroundColor: '#0f172a', color: 'white', padding: '8px 24px', borderRadius: '12px 0 0 12px', fontSize: '1.6rem', fontWeight: '900', boxShadow: '2px 2px 8px rgba(0,0,0,0.2)' }}>F1</div>
              <div style={{ backgroundColor: '#fef08a', color: '#1e1b4b', padding: '8px 24px', borderRadius: '0 12px 12px 0', fontSize: '1.6rem', fontWeight: '800', boxShadow: '2px 2px 8px rgba(0,0,0,0.2)' }}>Can you see 36 as a shape?</div>
            </div>
            <div style={{ position: 'absolute', bottom: 0, left: '-4%', width: '25%', height: '45%', zIndex: 5, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start' }}>
              <img src={b4} alt="Boy" style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', objectPosition: 'left bottom', display: 'block' }} />
            </div>
            <div style={{ position: 'absolute', top: '58%', left: '16%', width: '22%', zIndex: 6 }}>
              <img src={s35} alt="Speech bubble" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
            </div>

            <div style={{ position: 'absolute', top: '45%', left: '60%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px', zIndex: 10, width: '50%' }}>

              <div style={{ backgroundColor: 'white', color: '#0f172a', padding: '16px 48px', borderRadius: '24px', fontSize: '4rem', fontWeight: '900', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
                36
              </div>

              <div style={{ position: 'relative', width: '100%', height: '200px', backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: '100px', boxShadow: '0 0 40px rgba(255,255,255,0.8)' }}>
                <div key={0} style={{ position: 'absolute', left: '9%', top: '16%', width: '24px', height: '24px', backgroundColor: '#ef4444', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(239,68,68,0.4)' }}></div>
                <div key={1} style={{ position: 'absolute', left: '22%', top: '21%', width: '24px', height: '24px', backgroundColor: '#ef4444', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(239,68,68,0.4)' }}></div>
                <div key={2} style={{ position: 'absolute', left: '31%', top: '24%', width: '24px', height: '24px', backgroundColor: '#ef4444', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(239,68,68,0.4)' }}></div>
                <div key={3} style={{ position: 'absolute', left: '42%', top: '17%', width: '24px', height: '24px', backgroundColor: '#ef4444', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(239,68,68,0.4)' }}></div>
                <div key={4} style={{ position: 'absolute', left: '52%', top: '15%', width: '24px', height: '24px', backgroundColor: '#ef4444', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(239,68,68,0.4)' }}></div>
                <div key={5} style={{ position: 'absolute', left: '60%', top: '25%', width: '24px', height: '24px', backgroundColor: '#ef4444', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(239,68,68,0.4)' }}></div>
                <div key={6} style={{ position: 'absolute', left: '71%', top: '21%', width: '24px', height: '24px', backgroundColor: '#ef4444', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(239,68,68,0.4)' }}></div>
                <div key={7} style={{ position: 'absolute', left: '77%', top: '22%', width: '24px', height: '24px', backgroundColor: '#ef4444', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(239,68,68,0.4)' }}></div>
                <div key={8} style={{ position: 'absolute', left: '89%', top: '15%', width: '24px', height: '24px', backgroundColor: '#ef4444', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(239,68,68,0.4)' }}></div>
                <div key={9} style={{ position: 'absolute', left: '10%', top: '36%', width: '24px', height: '24px', backgroundColor: '#ef4444', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(239,68,68,0.4)' }}></div>
                <div key={10} style={{ position: 'absolute', left: '19%', top: '37%', width: '24px', height: '24px', backgroundColor: '#ef4444', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(239,68,68,0.4)' }}></div>
                <div key={11} style={{ position: 'absolute', left: '33%', top: '42%', width: '24px', height: '24px', backgroundColor: '#ef4444', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(239,68,68,0.4)' }}></div>
                <div key={12} style={{ position: 'absolute', left: '41%', top: '38%', width: '24px', height: '24px', backgroundColor: '#ef4444', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(239,68,68,0.4)' }}></div>
                <div key={13} style={{ position: 'absolute', left: '53%', top: '40%', width: '24px', height: '24px', backgroundColor: '#ef4444', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(239,68,68,0.4)' }}></div>
                <div key={14} style={{ position: 'absolute', left: '58%', top: '40%', width: '24px', height: '24px', backgroundColor: '#ef4444', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(239,68,68,0.4)' }}></div>
                <div key={15} style={{ position: 'absolute', left: '69%', top: '38%', width: '24px', height: '24px', backgroundColor: '#ef4444', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(239,68,68,0.4)' }}></div>
                <div key={16} style={{ position: 'absolute', left: '78%', top: '43%', width: '24px', height: '24px', backgroundColor: '#ef4444', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(239,68,68,0.4)' }}></div>
                <div key={17} style={{ position: 'absolute', left: '88%', top: '39%', width: '24px', height: '24px', backgroundColor: '#ef4444', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(239,68,68,0.4)' }}></div>
                <div key={18} style={{ position: 'absolute', left: '13%', top: '62%', width: '24px', height: '24px', backgroundColor: '#ef4444', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(239,68,68,0.4)' }}></div>
                <div key={19} style={{ position: 'absolute', left: '23%', top: '64%', width: '24px', height: '24px', backgroundColor: '#ef4444', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(239,68,68,0.4)' }}></div>
                <div key={20} style={{ position: 'absolute', left: '32%', top: '55%', width: '24px', height: '24px', backgroundColor: '#ef4444', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(239,68,68,0.4)' }}></div>
                <div key={21} style={{ position: 'absolute', left: '39%', top: '63%', width: '24px', height: '24px', backgroundColor: '#ef4444', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(239,68,68,0.4)' }}></div>
                <div key={22} style={{ position: 'absolute', left: '52%', top: '64%', width: '24px', height: '24px', backgroundColor: '#ef4444', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(239,68,68,0.4)' }}></div>
                <div key={23} style={{ position: 'absolute', left: '60%', top: '58%', width: '24px', height: '24px', backgroundColor: '#ef4444', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(239,68,68,0.4)' }}></div>
                <div key={24} style={{ position: 'absolute', left: '72%', top: '59%', width: '24px', height: '24px', backgroundColor: '#ef4444', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(239,68,68,0.4)' }}></div>
                <div key={25} style={{ position: 'absolute', left: '82%', top: '63%', width: '24px', height: '24px', backgroundColor: '#ef4444', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(239,68,68,0.4)' }}></div>
                <div key={26} style={{ position: 'absolute', left: '87%', top: '59%', width: '24px', height: '24px', backgroundColor: '#ef4444', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(239,68,68,0.4)' }}></div>
                <div key={27} style={{ position: 'absolute', left: '11%', top: '76%', width: '24px', height: '24px', backgroundColor: '#ef4444', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(239,68,68,0.4)' }}></div>
                <div key={28} style={{ position: 'absolute', left: '21%', top: '76%', width: '24px', height: '24px', backgroundColor: '#ef4444', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(239,68,68,0.4)' }}></div>
                <div key={29} style={{ position: 'absolute', left: '33%', top: '78%', width: '24px', height: '24px', backgroundColor: '#ef4444', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(239,68,68,0.4)' }}></div>
                <div key={30} style={{ position: 'absolute', left: '38%', top: '76%', width: '24px', height: '24px', backgroundColor: '#ef4444', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(239,68,68,0.4)' }}></div>
                <div key={31} style={{ position: 'absolute', left: '48%', top: '84%', width: '24px', height: '24px', backgroundColor: '#ef4444', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(239,68,68,0.4)' }}></div>
                <div key={32} style={{ position: 'absolute', left: '61%', top: '80%', width: '24px', height: '24px', backgroundColor: '#ef4444', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(239,68,68,0.4)' }}></div>
                <div key={33} style={{ position: 'absolute', left: '71%', top: '84%', width: '24px', height: '24px', backgroundColor: '#ef4444', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(239,68,68,0.4)' }}></div>
                <div key={34} style={{ position: 'absolute', left: '81%', top: '77%', width: '24px', height: '24px', backgroundColor: '#ef4444', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(239,68,68,0.4)' }}></div>
                <div key={35} style={{ position: 'absolute', left: '90%', top: '80%', width: '24px', height: '24px', backgroundColor: '#ef4444', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(239,68,68,0.4)' }}></div>

              </div>

            </div>

            <div style={{ position: 'absolute', bottom: '15%', left: '60%', transform: 'translateX(-50%)', backgroundColor: '#fef08a', color: '#1e1b4b', padding: '16px 40px', borderRadius: '16px', fontSize: '1.6rem', fontWeight: '700', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', zIndex: 10, textAlign: 'center', width: '55%' }}>
              Here are 36 dots.<br />Can you arrange them into a shape you already know?
            </div>
          </>
        )}

        {page === 49 && (
          <>
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '0', zIndex: 10 }}>
              <div style={{ backgroundColor: '#0f172a', color: 'white', padding: '8px 24px', borderRadius: '12px 0 0 12px', fontSize: '1.6rem', fontWeight: '900', boxShadow: '2px 2px 8px rgba(0,0,0,0.2)' }}>F2</div>
              <div style={{ backgroundColor: '#fef08a', color: '#1e1b4b', padding: '8px 24px', borderRadius: '0 12px 12px 0', fontSize: '1.6rem', fontWeight: '800', boxShadow: '2px 2px 8px rgba(0,0,0,0.2)' }}>Make a familiar shape</div>
            </div>
            <div style={{ position: 'absolute', bottom: 0, left: '-4%', width: '25%', height: '45%', zIndex: 5, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start' }}>
              <img src={b4} alt="Boy" style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', objectPosition: 'left bottom', display: 'block' }} />
            </div>
            <div style={{ position: 'absolute', top: '58%', left: '16%', width: '22%', zIndex: 6 }}>
              <img src={s36} alt="Speech bubble" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
            </div>

            <div style={{ position: 'absolute', top: '45%', left: '60%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', zIndex: 10, width: '50%', opacity: page49Step >= 1 ? 1 : 0, transition: 'opacity 0.8s ease-in-out' }}>

              <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '24px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[1, 2, 3, 4, 5, 6].map(row => (
                    <div key={row} style={{ display: 'flex', gap: '8px' }}>
                      {[1, 2, 3, 4, 5, 6].map(col => (
                        <div key={col} style={{ width: '24px', height: '24px', backgroundColor: '#ef4444', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(239,68,68,0.4)' }}></div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ backgroundColor: '#fdf2f8', color: '#be185d', padding: '12px 48px', borderRadius: '16px', fontSize: '2rem', fontWeight: '900', border: '2px solid #fbcfe8', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                6 × 6 = 36
              </div>

            </div>

            <div style={{ position: 'absolute', bottom: '15%', left: '60%', transform: 'translateX(-50%)', backgroundColor: '#dcfce7', color: '#166534', padding: '16px 40px', borderRadius: '16px', fontSize: '1.8rem', fontWeight: '800', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', zIndex: 10, textAlign: 'center', width: '50%', opacity: page49Step >= 1 ? 1 : 0, transition: 'opacity 0.8s ease-in-out 0.3s' }}>
              36 is a Square Number.
            </div>
          </>
        )}

        {page === 50 && (
          <>
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '0', zIndex: 10 }}>
              <div style={{ backgroundColor: '#0f172a', color: 'white', padding: '8px 24px', borderRadius: '12px 0 0 12px', fontSize: '1.6rem', fontWeight: '900', boxShadow: '2px 2px 8px rgba(0,0,0,0.2)' }}>F3</div>
              <div style={{ backgroundColor: '#fef08a', color: '#1e1b4b', padding: '8px 24px', borderRadius: '0 12px 12px 0', fontSize: '1.6rem', fontWeight: '800', boxShadow: '2px 2px 8px rgba(0,0,0,0.2)' }}>Is that the only way?</div>
            </div>
            <div style={{ position: 'absolute', bottom: 0, left: '-4%', width: '25%', height: '45%', zIndex: 5, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start' }}>
              <img src={b4} alt="Boy" style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', objectPosition: 'left bottom', display: 'block' }} />
            </div>
            <div style={{ position: 'absolute', top: '58%', left: '16%', width: '22%', zIndex: 6 }}>
              <img src={s37} alt="Speech bubble" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
            </div>

            <div style={{ position: 'absolute', top: '45%', left: '60%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', zIndex: 10, width: '50%' }}>

              <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '24px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(count => (
                    <div key={count} style={{ display: 'flex', gap: '8px' }}>
                      {Array.from({ length: count }).map((_, i) => (
                        <div key={i} style={{ width: '24px', height: '24px', backgroundColor: '#ef4444', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(239,68,68,0.4)' }}></div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

            </div>

            <div style={{ position: 'absolute', bottom: '15%', left: '60%', transform: 'translateX(-50%)', backgroundColor: '#fef08a', color: '#1e1b4b', padding: '16px 40px', borderRadius: '16px', fontSize: '1.6rem', fontWeight: '800', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', zIndex: 10, textAlign: 'center', width: '55%' }}>
              Can these same 36 dots<br />make another familiar shape?
            </div>
          </>
        )}

        {page === 51 && (
          <>
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '0', zIndex: 10 }}>
              <div style={{ backgroundColor: '#0f172a', color: 'white', padding: '8px 24px', borderRadius: '12px 0 0 12px', fontSize: '1.6rem', fontWeight: '900', boxShadow: '2px 2px 8px rgba(0,0,0,0.2)' }}>F4</div>
              <div style={{ backgroundColor: '#fef08a', color: '#1e1b4b', padding: '8px 24px', borderRadius: '0 12px 12px 0', fontSize: '1.6rem', fontWeight: '800', boxShadow: '2px 2px 8px rgba(0,0,0,0.2)' }}>Make another shape</div>
            </div>
            <div style={{ position: 'absolute', bottom: 0, left: '-4%', width: '25%', height: '45%', zIndex: 5, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start' }}>
              <img src={b4} alt="Boy" style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', objectPosition: 'left bottom', display: 'block' }} />
            </div>
            <div style={{ position: 'absolute', top: '58%', left: '16%', width: '22%', zIndex: 6 }}>
              <img src={s38} alt="Speech bubble" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
            </div>

            <div style={{ position: 'absolute', top: '40%', left: '60%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', zIndex: 10, width: '50%' }}>

              <div style={{ backgroundColor: 'white', padding: '24px 40px', borderRadius: '24px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(count => (
                    <div key={count} style={{ display: 'flex', alignItems: 'center', gap: '16px', opacity: page51Step >= count ? 1 : 0, transition: 'opacity 0.4s ease-in-out' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        {Array.from({ length: count }).map((_, i) => (
                          <div key={i} style={{ width: '24px', height: '24px', backgroundColor: '#ef4444', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(239,68,68,0.4)' }}></div>
                        ))}
                      </div>
                      <div style={{ color: '#1e3a8a', fontSize: '1.6rem', fontWeight: '900', width: '20px' }}>{count}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ backgroundColor: '#fdf2f8', color: '#be185d', padding: '12px 48px', borderRadius: '16px', fontSize: '1.8rem', fontWeight: '900', border: '2px solid #fbcfe8', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', opacity: page51Step >= 9 ? 1 : 0, transition: 'opacity 0.6s ease-in-out' }}>
                1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 = 36
              </div>

            </div>

            <div style={{ position: 'absolute', bottom: '8%', left: '60%', transform: 'translateX(-50%)', backgroundColor: '#dcfce7', color: '#166534', padding: '16px 40px', borderRadius: '16px', fontSize: '1.8rem', fontWeight: '800', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', zIndex: 10, textAlign: 'center', width: '50%', opacity: page51Step >= 10 ? 1 : 0, transition: 'opacity 0.6s ease-in-out' }}>
              36 is also a Triangular Number.
            </div>
          </>
        )}

        {page === 52 && (
          <>
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '0', zIndex: 10 }}>
              <div style={{ backgroundColor: '#0f172a', color: 'white', padding: '8px 24px', borderRadius: '12px 0 0 12px', fontSize: '1.6rem', fontWeight: '900', boxShadow: '2px 2px 8px rgba(0,0,0,0.2)' }}>F5</div>
              <div style={{ backgroundColor: '#fef08a', color: '#1e1b4b', padding: '8px 24px', borderRadius: '0 12px 12px 0', fontSize: '1.6rem', fontWeight: '800', boxShadow: '2px 2px 8px rgba(0,0,0,0.2)' }}>The same number, two shapes</div>
            </div>
            <div style={{ position: 'absolute', bottom: 0, left: '-4%', width: '25%', height: '45%', zIndex: 5, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start' }}>
              <img src={b4} alt="Boy" style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', objectPosition: 'left bottom', display: 'block' }} />
            </div>
            <div style={{ position: 'absolute', top: '58%', left: '16%', width: '22%', zIndex: 6 }}>
              <img src={s39} alt="Speech bubble" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
            </div>

            <div style={{ position: 'absolute', top: '42%', left: '60%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px', zIndex: 10, width: '70%' }}>

              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>

                {/* 36 Pill */}
                <div style={{ backgroundColor: '#fffdf6', color: '#1e1b4b', padding: '12px 48px', borderRadius: '16px', fontSize: '3rem', fontWeight: '900', border: '3px solid #fef08a', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', zIndex: 2 }}>
                  36
                </div>

                {/* SVG Arrows */}
                <svg width="400" height="80" style={{ position: 'absolute', top: '30px', left: '50%', transform: 'translateX(-50%)', zIndex: 1, overflow: 'visible' }}>
                  <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
                    </marker>
                  </defs>
                  <path d="M 180 20 Q 100 20 80 80" fill="none" stroke="#3b82f6" strokeWidth="8" markerEnd="url(#arrow)" />
                  <path d="M 220 20 Q 300 20 320 80" fill="none" stroke="#3b82f6" strokeWidth="8" markerEnd="url(#arrow)" />
                </svg>

                {/* Shapes Row */}
                <div style={{ display: 'flex', gap: '60px', marginTop: '50px', width: '100%', justifyContent: 'center' }}>

                  {/* Square Box */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                    <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '24px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {[1, 2, 3, 4, 5, 6].map(row => (
                          <div key={row} style={{ display: 'flex', gap: '6px' }}>
                            {[1, 2, 3, 4, 5, 6].map(col => (
                              <div key={col} style={{ width: '18px', height: '18px', backgroundColor: '#ef4444', borderRadius: '50%', boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.2), 0 3px 5px rgba(239,68,68,0.4)' }}></div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div style={{ backgroundColor: '#fdf2f8', color: '#be185d', padding: '8px 24px', borderRadius: '12px', fontSize: '1.4rem', fontWeight: '900', border: '2px solid #fbcfe8' }}>
                      6 × 6 = 36
                    </div>
                    <div style={{ backgroundColor: '#fef08a', color: '#1e1b4b', padding: '8px 24px', borderRadius: '12px', fontSize: '1.2rem', fontWeight: '800' }}>
                      Square Number
                    </div>
                  </div>

                  {/* Triangle Box */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                    <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '24px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(count => (
                          <div key={count} style={{ display: 'flex', gap: '6px' }}>
                            {Array.from({ length: count }).map((_, i) => (
                              <div key={i} style={{ width: '18px', height: '18px', backgroundColor: '#ef4444', borderRadius: '50%', boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.2), 0 3px 5px rgba(239,68,68,0.4)' }}></div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div style={{ backgroundColor: '#fdf2f8', color: '#be185d', padding: '8px 24px', borderRadius: '12px', fontSize: '1.4rem', fontWeight: '900', border: '2px solid #fbcfe8' }}>
                      1 + 2 + ... + 8 = 36
                    </div>
                    <div style={{ backgroundColor: '#fef08a', color: '#1e1b4b', padding: '8px 24px', borderRadius: '12px', fontSize: '1.2rem', fontWeight: '800' }}>
                      Triangular Number
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <div style={{ position: 'absolute', bottom: '10%', left: '60%', transform: 'translateX(-50%)', backgroundColor: '#dcfce7', color: '#166534', padding: '16px 40px', borderRadius: '16px', fontSize: '1.8rem', fontWeight: '800', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', zIndex: 10, textAlign: 'center', width: '55%' }}>
              36 is both a Square Number<br />and a Triangular Number!
            </div>
          </>
        )}

        {page === 53 && (
          <>
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '0', zIndex: 10 }}>
              <div style={{ backgroundColor: '#0f172a', color: 'white', padding: '8px 24px', borderRadius: '12px 0 0 12px', fontSize: '1.6rem', fontWeight: '900', boxShadow: '2px 2px 8px rgba(0,0,0,0.2)' }}>F6</div>
              <div style={{ backgroundColor: '#fef08a', color: '#1e1b4b', padding: '8px 24px', borderRadius: '0 12px 12px 0', fontSize: '1.6rem', fontWeight: '800', boxShadow: '2px 2px 8px rgba(0,0,0,0.2)' }}>Think further</div>
            </div>
            <div style={{ position: 'absolute', bottom: 0, left: '-4%', width: '25%', height: '45%', zIndex: 5, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start' }}>
              <img src={b4} alt="Boy" style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', objectPosition: 'left bottom', display: 'block' }} />
            </div>
            <div style={{ position: 'absolute', top: '58%', left: '16%', width: '22%', zIndex: 6 }}>
              <img src={s40} alt="Speech bubble" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
            </div>

            <div style={{ position: 'absolute', top: '40%', left: '60%', transform: 'translate(-50%, -50%)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10, width: '50%' }}>

              <div style={{
                fontSize: '25rem',
                fontWeight: '900',
                color: '#3b82f6',
                filter: 'drop-shadow(0 15px 30px rgba(59,130,246,0.5)) drop-shadow(0 0 20px white) drop-shadow(0 0 40px white)',
                lineHeight: 1
              }}>
                ?
              </div>

            </div>

            <div style={{ position: 'absolute', bottom: '5%', left: '60%', transform: 'translateX(-50%)', backgroundColor: '#fef08a', color: '#1e1b4b', padding: '20px 48px', borderRadius: '16px', fontSize: '1.8rem', fontWeight: '800', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', zIndex: 10, textAlign: 'center', width: '55%' }}>
              Can you think of any other numbers<br />that might have more than one<br />visual pattern?
            </div>
          </>
        )}











        {/* Previous Button (Not on Page 1) */}
        {page > 1 && (
          <button
            onClick={handlePrev}
            style={{
              position: 'absolute',
              bottom: '24px',
              left: '24px',
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#0a369d',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '3px solid white',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              zIndex: 20
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <ChevronLeft size={36} strokeWidth={3} />
          </button>
        )}

        {/* Next Button */}
        <button
          onClick={handleNext}
          style={{
            position: 'absolute',
            bottom: '24px',
            right: '24px',
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: '#0a369d',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '3px solid white',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            zIndex: 20
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <ChevronRight size={36} strokeWidth={3} />
        </button>

      </main>
    </div>
  );
}
