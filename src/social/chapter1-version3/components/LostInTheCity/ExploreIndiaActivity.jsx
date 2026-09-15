import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronRight, CheckCircle, MapPin, Award, Navigation, 
  Map as MapIcon, Compass, HelpCircle, Sparkles, Plane, 
  Train, Landmark, Wind, Thermometer, Radio, ShieldCheck,
  Volume2, VolumeX, Eye, Gauge, Compass as CompassIcon,
  Mic, Volume1, Clock, Sun, Moon, ArrowUpRight, Check
} from 'lucide-react';
import IndiaSVGMap from './IndiaSVGMap';
import ChapterBackFooter from '../ChapterBackFooter';

// Ultra-Realistic Web Audio API Synthesizer for Authentic Aviation & Train Soundscapes
class SoundEngine {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  }

  // Authentic Airbus / Boeing style 2-Tone Cabin "Ding-Dong" Chime
  playCabinChime() {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();

      const now = this.ctx.currentTime;

      // Note 1: High tone (F5 - 698.46 Hz)
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(698.46, now);
      gain1.gain.setValueAtTime(0.18, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.55);

      // Note 2: Low tone (Db5 - 554.37 Hz)
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(554.37, now + 0.3);
      gain2.gain.setValueAtTime(0.001, now);
      gain2.gain.setValueAtTime(0.18, now + 0.3);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 1.1);

      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now + 0.3);
      osc2.stop(now + 1.1);
    } catch (e) {}
  }

  // Realistic Twin-Turbofan Jet Engine Soundscape (Roar + Turbine Blade Whine + Sub-Bass)
  playPlaneSound() {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();

      this.playCabinChime();

      const now = this.ctx.currentTime + 0.25;
      const duration = 2.4;

      // 1. Turbofan Jet Roar (Filtered White Noise)
      const bufferSize = this.ctx.sampleRate * duration;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Brown/Pink noise integration
        output[i] = (lastOut + (0.04 * white)) / 1.04;
        lastOut = output[i];
        output[i] *= 3.5;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'lowpass';
      noiseFilter.frequency.setValueAtTime(320, now);
      noiseFilter.frequency.exponentialRampToValueAtTime(1100, now + 1.0);
      noiseFilter.frequency.exponentialRampToValueAtTime(500, now + duration);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.01, now);
      noiseGain.gain.linearRampToValueAtTime(0.15, now + 0.5);
      noiseGain.gain.linearRampToValueAtTime(0.18, now + 1.2);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      whiteNoise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);
      whiteNoise.start(now);
      whiteNoise.stop(now + duration);

      // 2. High-Bypass Turbine Compressor Whine (Resonant turbine blade spin)
      const whineOsc = this.ctx.createOscillator();
      const whineGain = this.ctx.createGain();
      whineOsc.type = 'triangle';
      whineOsc.frequency.setValueAtTime(680, now);
      whineOsc.frequency.exponentialRampToValueAtTime(1450, now + 1.0);
      whineOsc.frequency.exponentialRampToValueAtTime(820, now + duration);

      whineGain.gain.setValueAtTime(0.01, now);
      whineGain.gain.linearRampToValueAtTime(0.05, now + 0.6);
      whineGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      whineOsc.connect(whineGain);
      whineGain.connect(this.ctx.destination);
      whineOsc.start(now);
      whineOsc.stop(now + duration);

      // 3. Deep Cabin Sub-bass Rumble (65Hz body)
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(65, now);
      subOsc.frequency.linearRampToValueAtTime(85, now + 1.0);
      subOsc.frequency.linearRampToValueAtTime(55, now + duration);

      subGain.gain.setValueAtTime(0.01, now);
      subGain.gain.linearRampToValueAtTime(0.12, now + 0.4);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      subOsc.connect(subGain);
      subGain.connect(this.ctx.destination);
      subOsc.start(now);
      subOsc.stop(now + duration);

    } catch (e) {}
  }

  // Realistic High-Speed Express Train / Vande Bharat (Dual Air Horn + Rail Track Clickety-Clack + Inverter Whine)
  playTrainSound() {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();

      const now = this.ctx.currentTime;
      const duration = 2.4;

      // 1. Authentic Dual-Tone Indian Railways / Vande Bharat Express Air Horn Chord (Eb4 311Hz + F#4 370Hz)
      const hornFrequencies = [311.13, 369.99];
      hornFrequencies.forEach((freq) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.09, now + 0.08);
        gain.gain.setValueAtTime(0.09, now + 0.55);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);

        const hornFilter = this.ctx.createBiquadFilter();
        hornFilter.type = 'lowpass';
        hornFilter.frequency.setValueAtTime(1400, now);

        osc.connect(hornFilter);
        hornFilter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.85);
      });

      // 2. Electric Traction Motor VVVF Inverter Whine (Acceleration harmonics)
      const invOsc = this.ctx.createOscillator();
      const invGain = this.ctx.createGain();
      invOsc.type = 'triangle';
      invOsc.frequency.setValueAtTime(220, now + 0.2);
      invOsc.frequency.exponentialRampToValueAtTime(950, now + 1.5);
      invOsc.frequency.linearRampToValueAtTime(700, now + duration);

      invGain.gain.setValueAtTime(0.001, now + 0.2);
      invGain.gain.linearRampToValueAtTime(0.06, now + 0.7);
      invGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      invOsc.connect(invGain);
      invGain.connect(this.ctx.destination);
      invOsc.start(now + 0.2);
      invOsc.stop(now + duration);

      // 3. Rhythmic Rail Track Wheel Clickety-Clack ("Clack-clack... clack-clack")
      const clackTimes = [0.35, 0.45, 0.85, 0.95, 1.35, 1.45, 1.85, 1.95];
      clackTimes.forEach((tOffset) => {
        const clackTime = now + tOffset;
        const clackOsc = this.ctx.createOscillator();
        const clackGain = this.ctx.createGain();
        const clackFilter = this.ctx.createBiquadFilter();

        clackOsc.type = 'triangle';
        clackOsc.frequency.setValueAtTime(140, clackTime);
        clackOsc.frequency.exponentialRampToValueAtTime(45, clackTime + 0.06);

        clackFilter.type = 'bandpass';
        clackFilter.frequency.setValueAtTime(450, clackTime);
        clackFilter.Q.setValueAtTime(3.0, clackTime);

        clackGain.gain.setValueAtTime(0.12, clackTime);
        clackGain.gain.exponentialRampToValueAtTime(0.001, clackTime + 0.07);

        clackOsc.connect(clackFilter);
        clackFilter.connect(clackGain);
        clackGain.connect(this.ctx.destination);

        clackOsc.start(clackTime);
        clackOsc.stop(clackTime + 0.08);
      });

    } catch (e) {}
  }

  // Victory Fanfare
  playFanfare() {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();

      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const start = this.ctx.currentTime + i * 0.12;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.2, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.6);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(start);
        osc.stop(start + 0.6);
      });
    } catch (e) {}
  }
}

const sounds = new SoundEngine();

// Speech synthesis narration helper
const speakText = (text) => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.05;
    window.speechSynthesis.speak(utterance);
  }
};

const MISSIONS = [
  {
    id: 'ka',
    stateName: 'Karnataka',
    destination: 'Bengaluru',
    fact: 'The Garden City on the Deccan Plateau (920m high).',
    landmark: 'Vidhana Soudha & Lalbagh Gardens',
    landmarkIcon: '🏛️',
    type: 'direction',
    story: 'We start from the coast of Chennai in Tamil Nadu.\nOur first stop is the garden city of Bengaluru in Karnataka.',
    question: 'Which main direction should we travel from Chennai to reach Bengaluru?',
    options: ['West', 'North', 'South', 'East'],
    correct: 'West',
    bearing: 268,
    bearingLabel: '268° West',
    distance: 350,
    flightTime: '45 mins',
    trainTime: '4h 15m',
    altitude: '18,000 ft',
    mach: 'Mach 0.74',
    weather: 'Sunny • 24°C',
    wind: '12 km/h W',
    feedbackWrong: 'Look at the compass: Bengaluru is directly to the left (West) of Chennai.',
    feedbackSuccess: 'Spot on! Bengaluru lies directly West (268°) of Chennai on the elevated Deccan Plateau.',
    learning: '🧭 Main directions (N, S, E, W) help us find our way across big regions.',
    direction: 'West',
    highlightTerm: 'Deccan Plateau',
    windowScene: '⛰️ Flying over the rugged Eastern Ghats hills into the elevated granite Deccan plateau.'
  },
  {
    id: 'mh',
    stateName: 'Maharashtra',
    destination: 'Mumbai',
    fact: 'A big city on the Arabian Sea coast, home to the Gateway of India.',
    landmark: 'Gateway of India & Marine Drive',
    landmarkIcon: '🏙️',
    type: 'distance',
    story: 'Next, we travel to Mumbai in Maharashtra by the Arabian Sea.\nLet\'s compare this long trip to our first flight to Bengaluru.',
    question: 'Looking at the map, which place is farther from Chennai?',
    options: ['Mumbai (Much farther)', 'Bengaluru (Closer)', 'Both are at equal distance'],
    correct: 'Mumbai (Much farther)',
    bearing: 318,
    bearingLabel: '318° North-West',
    distance: 1300,
    flightTime: '1h 50m',
    trainTime: '21h 30m',
    altitude: '32,000 ft',
    mach: 'Mach 0.78',
    weather: 'Coastal Breeze • 29°C',
    wind: '18 km/h NW',
    feedbackWrong: 'Compare the lines: Mumbai is much farther away than Bengaluru.',
    feedbackSuccess: 'Correct! Mumbai is much farther. Maps help us measure distances easily.',
    learning: '📏 Map scales help us find distances between places.',
    direction: 'North-West',
    highlightTerm: 'Arabian Sea Coast',
    windowScene: '🌊 Descending past the Western Ghats (Sahyadri) over the sparkling Arabian Sea shoreline.'
  },
  {
    id: 'ap',
    stateName: 'Andhra Pradesh',
    destination: 'Amaravati',
    fact: 'An old city in the fertile Krishna River delta.',
    landmark: 'Amaravati Temple & Krishna River',
    landmarkIcon: '☸️',
    type: 'direction',
    story: 'Now let\'s head to our neighbor, Andhra Pradesh.\nAmaravati sits just above Tamil Nadu on the map.',
    question: 'Which direction should we travel from Chennai to reach Amaravati?',
    options: ['North', 'South', 'East', 'West'],
    correct: 'North',
    bearing: 358,
    bearingLabel: '358° North',
    distance: 450,
    flightTime: '1h 05m',
    trainTime: '6h 00m',
    altitude: '22,000 ft',
    mach: 'Mach 0.75',
    weather: 'Clear Skies • 31°C',
    wind: '10 km/h N',
    feedbackWrong: 'Amaravati is directly up (North) from Chennai on the map.',
    feedbackSuccess: 'Excellent! Amaravati is straight North of Chennai.',
    learning: '🧭 Maps help us find our neighbor states.',
    direction: 'North',
    highlightTerm: 'Krishna River',
    windowScene: '🌾 Flying over emerald rice paddy fields and the wide flowing waters of the Krishna River.'
  },
  {
    id: 'wb',
    stateName: 'West Bengal',
    destination: 'Kolkata',
    fact: 'Known as the City of Joy, famous for the Howrah Bridge.',
    landmark: 'Howrah Bridge & Hooghly River',
    landmarkIcon: '🌉',
    type: 'direction',
    story: 'We now travel up the east coast to West Bengal.\nKolkata is in the upper-right part of the map by the sea.',
    question: 'Which direction should we travel from Chennai to reach Kolkata?',
    options: ['North-East', 'North-West', 'South-East', 'South-West'],
    correct: 'North-East',
    bearing: 38,
    bearingLabel: '038° North-East',
    distance: 1650,
    flightTime: '2h 15m',
    trainTime: '26h 00m',
    altitude: '34,000 ft',
    mach: 'Mach 0.80',
    weather: 'Humid • 28°C',
    wind: '15 km/h NE',
    feedbackWrong: 'Kolkata is between North and East (upper-right). That is North-East.',
    feedbackSuccess: 'Perfect! Kolkata is in the North-East direction.',
    learning: '🗺 In-between directions (NE, NW, SE, SW) help us point to exact locations.',
    direction: 'North-East',
    highlightTerm: 'Ganga River',
    windowScene: '🌉 Overflying the vast mangrove Sundarbans delta and the iconic Howrah Bridge.'
  },
  {
    id: 'rj',
    stateName: 'Rajasthan',
    destination: 'Jaipur',
    fact: 'The Pink City near the Thar Desert, famous for Hawa Mahal.',
    landmark: 'Hawa Mahal & Old Forts',
    landmarkIcon: '🏰',
    type: 'direction',
    story: 'Next, we travel to the desert state of Rajasthan.\nJaipur is in the upper-left part of the India map.',
    question: 'Which direction should we travel to reach Jaipur?',
    options: ['North-West', 'North-East', 'South-West', 'South-East'],
    correct: 'North-West',
    bearing: 338,
    bearingLabel: '338° North-West',
    distance: 2100,
    flightTime: '2h 45m',
    trainTime: '34h 00m',
    altitude: '36,000 ft',
    mach: 'Mach 0.81',
    weather: 'Dry & Sunny • 33°C',
    wind: '20 km/h NW',
    feedbackWrong: 'Jaipur is in the upper-left, between North and West (North-West).',
    feedbackSuccess: 'Brilliant! Jaipur is in the North-West direction from Chennai.',
    learning: '🧭 Knowing all directions helps us travel anywhere.',
    direction: 'North-West',
    highlightTerm: 'Thar Desert & Aravalli',
    windowScene: '🏜️ Golden desert sands, ancient Aravalli hill ranges, and terracotta pink palace domes.'
  },
  {
    id: 'as',
    stateName: 'Assam',
    destination: 'Assam (Dispur)',
    fact: 'Famous for its beautiful tea gardens and the Brahmaputra River.',
    landmark: 'Tea Gardens & Brahmaputra Valley',
    landmarkIcon: '🍵',
    type: 'direction',
    story: 'Our final stop is in the beautiful eastern corner of India.\nAssam is in the green hills near the big Brahmaputra River.',
    question: 'Which direction is Assam from Chennai on the map?',
    options: ['North-East', 'North-West', 'South-East', 'West'],
    correct: 'North-East',
    bearing: 48,
    bearingLabel: '048° North-East',
    distance: 2500,
    flightTime: '3h 10m',
    trainTime: '42h 00m',
    altitude: '35,000 ft',
    mach: 'Mach 0.79',
    weather: 'Lush Mist • 22°C',
    wind: '14 km/h NE',
    feedbackWrong: 'Assam is in the far upper-right corner of India (North-East).',
    feedbackSuccess: 'Outstanding! Assam is in the far North-East of India.',
    learning: '🗺 Maps are amazing tools that guide explorers across the world.',
    direction: 'North-East',
    highlightTerm: 'Brahmaputra River',
    windowScene: '🍵 Rolling green tea plantations, morning clouds, and the vast Brahmaputra River.'
  }
];

const COMPASS_DIRECTIONS = [
  { dir: 'N', label: 'North', deg: 0, states: 'Delhi, Punjab, Himachal Pradesh, Jammu & Kashmir' },
  { dir: 'NE', label: 'North-East', deg: 45, states: 'Assam, Meghalaya, Sikkim, West Bengal' },
  { dir: 'E', label: 'East', deg: 90, states: 'Bay of Bengal, Andaman & Nicobar' },
  { dir: 'SE', label: 'South-East', deg: 135, states: 'Southern Bay of Bengal, Sri Lanka' },
  { dir: 'S', label: 'South', deg: 180, states: 'Kanyakumari, Indian Ocean' },
  { dir: 'SW', label: 'South-West', deg: 225, states: 'Kerala, Lakshadweep Islands' },
  { dir: 'W', label: 'West', deg: 270, states: 'Karnataka (Bengaluru), Arabian Sea' },
  { dir: 'NW', label: 'North-West', deg: 315, states: 'Maharashtra (Mumbai), Rajasthan (Jaipur), Gujarat' }
];

export default function ExploreIndiaActivity({ onBeginChapter, onBack }) {
  const [missionIndex, setMissionIndex] = useState(-1);
  const [feedback, setFeedback] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  const [mapStyle, setMapStyle] = useState('satellite');
  const [travelMode, setTravelMode] = useState('plane');
  const [activeRoute, setActiveRoute] = useState(null);
  
  const [liveDistance, setLiveDistance] = useState(0);
  const [liveSpeed, setLiveSpeed] = useState(0);
  const [selectedCompassDir, setSelectedCompassDir] = useState(null);

  const handleStart = () => {
    if (soundEnabled) sounds.playCabinChime();
    setMissionIndex(0);
  };

  const handleAnswer = (option) => {
    if (animating) return;
    const mission = MISSIONS[missionIndex];
    
    if (option === mission.correct) {
      if (soundEnabled) {
        if (travelMode === 'plane') {
          sounds.playPlaneSound();
        } else {
          sounds.playTrainSound();
        }
      }
      setFeedback({ type: 'success', text: mission.feedbackSuccess });
      setAnimating(true);
      
      setActiveRoute({ 
        to: mission.id, 
        showBoth: mission.type === 'distance' 
      });

      const targetDist = mission.distance;
      const targetSpeed = travelMode === 'plane' ? 840 : 160;
      let start = Date.now();
      const dur = 2400;

      const tTimer = setInterval(() => {
        const p = Math.min(1, (Date.now() - start) / dur);
        setLiveDistance(Math.round(p * targetDist));
        setLiveSpeed(Math.round(p * targetSpeed));
        if (p >= 1) clearInterval(tTimer);
      }, 30);

      setTimeout(() => {
        setAnimating(false);
        setLiveSpeed(0);
        if (soundEnabled && missionIndex === MISSIONS.length - 1) {
          sounds.playFanfare();
        }
      }, 2600);
      
    } else {
      setFeedback({ type: 'error', text: mission.feedbackWrong, picked: option });
    }
  };

  const handleNextMission = () => {
    if (soundEnabled) sounds.playCabinChime();
    setFeedback(null);
    setActiveRoute(null);
    setLiveDistance(0);
    setMissionIndex(prev => prev + 1);
  };

  const renderBreadcrumbBar = () => {
    return (
      <div style={{
        padding: '6px 14px',
        background: '#FFF9F0',
        borderBottom: '1.5px solid #F2DFBC',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
        gap: '8px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', overflowX: 'auto', scrollbarWidth: 'none' }}>
          <span style={{ fontSize: '11px', fontWeight: 900, color: '#166534', background: '#DCFCE7', padding: '3px 7px', borderRadius: '6px', border: '1.2px solid #86EFAC', display: 'flex', alignItems: 'center', gap: '3px' }}>
            <CheckCircle size={11} color="#16A34A" /> Chennai
          </span>
          
          {MISSIONS.map((m, idx) => {
            const isPast = idx < missionIndex || missionIndex >= MISSIONS.length;
            const isCur = idx === missionIndex;
            
            let bg = '#FFFFFF';
            let border = '1.2px solid #E2D2B8';
            let color = '#475569';

            if (isPast) {
              bg = '#DCFCE7';
              border = '1.2px solid #86EFAC';
              color = '#166534';
            } else if (isCur) {
              bg = '#FEF3C7';
              border = '1.5px solid #D97706';
              color = '#92400E';
            }
            
            return (
              <React.Fragment key={m.id}>
                <span style={{ color: '#D97706', fontSize: '10px', fontWeight: 900 }}>→</span>
                <span style={{
                  fontSize: '11px',
                  fontWeight: isCur ? 900 : 700,
                  color,
                  background: bg,
                  border,
                  padding: '2px 7px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px',
                  boxShadow: isCur ? '0 2px 4px rgba(217,119,6,0.18)' : 'none',
                  whiteSpace: 'nowrap'
                }}>
                  {isPast && <CheckCircle size={10} color="#16A34A" />}
                  <span>{m.landmarkIcon}</span>
                  {m.destination}
                </span>
              </React.Fragment>
            );
          })}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            background: '#FEF3C7',
            padding: '3px 8px',
            borderRadius: '6px',
            border: '1.2px solid #FDE68A',
            fontSize: '10.5px',
            fontWeight: 800,
            color: '#92400E'
          }}>
            <Plane size={12} color="#D97706" /> Flight
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            background: '#E0F2FE',
            padding: '3px 8px',
            borderRadius: '6px',
            border: '1.2px solid #BAE6FD',
            fontSize: '10.5px',
            fontWeight: 800,
            color: '#0369A1'
          }}>
            <span style={{ fontSize: '11px' }}>🛰️</span> Satellite
          </div>
        </div>
      </div>
    );
  };

  const renderIntro = () => (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      background: 'linear-gradient(160deg, #FFF9F0 0%, #FBF3E3 100%)',
      border: '2px solid #F2DFBC',
      borderRadius: '16px',
      padding: '32px 36px',
      boxShadow: '0 6px 20px rgba(60, 40, 20, 0.06)',
      boxSizing: 'border-box',
      overflow: 'hidden'
    }}>
      {/* Top Header */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <h2 style={{ fontFamily: '"Fraunces", serif', color: '#78350F', fontSize: '32px', fontWeight: 900, margin: '8px 0 16px 0', lineHeight: 1.15 }}>
          Travel Across India!
        </h2>
        
        <p style={{ margin: 0, fontFamily: '"Space Grotesk", sans-serif', color: '#3D2E24', fontSize: '16.5px', fontWeight: 600, lineHeight: 1.5, textAlign: 'justify', textJustify: 'inter-word' }}>
          Learn how a compass points to <span style={{ color: '#92400E', background: '#FEF3C7', padding: '2px 6px', borderRadius: '6px', fontWeight: 800, border: '1.5px solid #FDE68A' }}>Main Directions (N, S, E, W)</span> and <span style={{ color: '#1D4ED8', background: '#DBEAFE', padding: '2px 6px', borderRadius: '6px', fontWeight: 800, border: '1.5px solid #BFDBFE' }}>In-Between Directions (NE, NW, SE, SW)</span> by travelling to 6 real places across India, starting from Chennai.
        </p>
      </div>

      {/* 6 Missions Roadmap Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '16px', fontWeight: 900, color: '#78350F', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Journey Plan (6 Stops)</span>
          <span style={{ fontSize: '14px', fontWeight: 700, color: '#166534', background: '#DCFCE7', padding: '4px 10px', borderRadius: '6px' }}>Total ~8,350 km</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          {MISSIONS.map((m, idx) => (
            <div key={m.id} style={{
              background: '#FFFFFF',
              border: '2px solid #F2DFBC',
              borderRadius: '12px',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0 2px 8px rgba(60,40,20,0.04)'
            }}>
              <span style={{ fontSize: '28px' }}>{m.landmarkIcon}</span>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '2px' }}>
                  {idx + 1}. {m.destination}
                </div>
                <div style={{ fontSize: '14px', color: '#92400E', fontWeight: 700 }}>
                  {m.direction} • {m.distance} km
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* Start Button */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button 
          onClick={handleStart}
          style={{
            background: 'linear-gradient(135deg, #16A34A 0%, #15803D 100%)',
            color: '#FFFFFF',
            border: 'none',
            padding: '14px 32px',
            borderRadius: '32px',
            fontSize: '18px',
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: '0 6px 20px rgba(22, 163, 74, 0.35)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            fontFamily: '"Space Grotesk", sans-serif',
            transition: 'all 0.2s'
          }}
        >
          Begin Journey (6 Missions) <ChevronRight size={20} strokeWidth={3} />
        </button>
      </div>
    </div>
  );

  const renderMission = () => {
    const mission = MISSIONS[missionIndex];

    return (
      <div style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: 'linear-gradient(160deg, #FFF9F0 0%, #FBF3E3 100%)',
        border: '2px solid #F2DFBC',
        borderRadius: '16px',
        padding: '14px 16px',
        boxShadow: '0 6px 20px rgba(60,40,20,0.06)',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: '#FEF3C7',
              border: '1.2px solid #FDE68A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              flexShrink: 0
            }}>
              {mission.landmarkIcon}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ color: '#92400E', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', background: '#FEF3C7', padding: '1px 6px', borderRadius: '4px', border: '1px solid #FDE68A' }}>
                  Mission {missionIndex + 1} of 6
                </span>
                <span style={{ fontSize: '13px', color: '#166534', fontWeight: 800, background: '#DCFCE7', padding: '1px 5px', borderRadius: '4px' }}>
                  ~{mission.distance} km
                </span>
              </div>
              <h3 style={{ fontFamily: '"Fraunces", serif', color: '#78350F', fontSize: '20px', margin: '2px 0 0 0', fontWeight: 900, lineHeight: 1.15 }}>
                {mission.destination}
              </h3>
            </div>
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>

        {animating ? (
          <div style={{
            background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
            border: '1.5px solid #38BDF8',
            padding: '10px 12px',
            borderRadius: '12px',
            color: '#F8FAFC',
            boxShadow: '0 4px 14px rgba(15,23,42,0.4)',
            flexShrink: 0
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#38BDF8', fontSize: '12px', fontWeight: 900 }}>
                {travelMode === 'plane' ? <Plane size={15} color="#38BDF8" /> : <Train size={15} color="#38BDF8" />}
                <span>{travelMode === 'plane' ? '✈️ AIRBUS A350 EN ROUTE' : '🚆 VANDE BHARAT EXPRESS EN ROUTE'}</span>
              </div>
              <div style={{ fontSize: '11.5px', color: '#FDE047', fontWeight: 900 }}>
                Heading: {mission.bearing}° {mission.direction} • {mission.altitude}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px', textAlign: 'center', marginBottom: '6px' }}>
              <div style={{ background: 'rgba(255,255,255,0.08)', padding: '5px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: '10px', color: '#93C5FD', fontWeight: 800, letterSpacing: '0.5px' }}>DISTANCE</div>
                <div style={{ fontSize: '15px', fontWeight: 900, color: '#38BDF8' }}>{liveDistance} km</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.08)', padding: '5px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: '10px', color: '#93C5FD', fontWeight: 800, letterSpacing: '0.5px' }}>SPEED</div>
                <div style={{ fontSize: '15px', fontWeight: 900, color: '#34D399' }}>{liveSpeed} km/h</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.08)', padding: '5px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: '10px', color: '#93C5FD', fontWeight: 800, letterSpacing: '0.5px' }}>EST. TIME</div>
                <div style={{ fontSize: '14.5px', fontWeight: 900, color: '#FBBF24' }}>
                  {travelMode === 'plane' ? mission.flightTime : mission.trainTime}
                </div>
              </div>
            </div>

            <div style={{
              background: 'rgba(0, 0, 0, 0.5)',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              borderRadius: '6px',
              padding: '6px 10px',
              fontSize: '12px',
              color: '#F0F9FF',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span style={{ fontSize: '14px' }}>🪟</span>
              <span><strong style={{ color: '#38BDF8' }}>Window View:</strong> {mission.windowScene}</span>
            </div>
          </div>
        ) : (
          <div style={{ flexShrink: 0, marginTop: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#78350F', fontSize: '22px', fontWeight: 900, marginBottom: '20px', fontFamily: '"Space Grotesk", sans-serif', lineHeight: 1.3 }}>
              <HelpCircle size={28} color="#D97706" style={{ flexShrink: 0 }} /> {mission.question}
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {mission.options.map((opt, optIdx) => {
                let isSelectedCorrect = feedback?.type === 'success' && opt === mission.correct;
                let isSelectedWrong = feedback?.type === 'error' && feedback.picked === opt;
                
                let optBg = '#FFFFFF';
                let optBorder = '#CBD5E1';
                let optColor = '#0F172A';

                if (isSelectedCorrect) {
                  optBg = '#DCFCE7';
                  optBorder = '#16A34A';
                  optColor = '#15803D';
                } else if (isSelectedWrong) {
                  optBg = '#FEE2E2';
                  optBorder = '#EF4444';
                  optColor = '#991B1B';
                }

                const isSpanned = mission.options.length === 3 && optIdx === 2;

                return (
                  <button 
                    key={opt}
                    onClick={() => !animating && !feedback?.type && handleAnswer(opt)}
                    disabled={!!feedback?.type || animating}
                    style={{
                      gridColumn: isSpanned ? 'span 2' : 'span 1',
                      padding: '16px 20px',
                      background: optBg,
                      border: `2px solid ${optBorder}`,
                      borderRadius: '12px',
                      fontSize: '18px',
                      fontWeight: 900,
                      color: optColor,
                      cursor: (!!feedback?.type || animating) ? 'default' : 'pointer',
                      transition: 'all 0.15s',
                      textAlign: 'center',
                      fontFamily: '"Space Grotesk", sans-serif',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                    }}
                  >
                    <span style={{ fontSize: '22px' }}>🧭</span> {opt}
                  </button>
                );
              })}
            </div>

            {/* Insert Mission Tip here */}
            {!animating && !feedback?.type && (
              <div style={{
                marginTop: '16px',
                background: '#FFFDF9',
                border: '1.2px solid #FDE68A',
                borderRadius: '12px',
                padding: '16px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                boxShadow: '0 2px 8px rgba(60,40,20,0.03)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#78350F', fontSize: '14px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  💡 MISSION TIP
                </div>
                
                <div style={{ color: '#3D2E24', fontSize: '15.5px', lineHeight: 1.4, fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600 }}>
                  <div style={{ marginBottom: '6px' }}>"Look at the map, not the distance."</div>
                  <div>"Find <strong style={{ color: '#15803D' }}>Chennai</strong> and <strong style={{ color: '#1D4ED8' }}>{mission.destination}</strong>, then compare where {mission.destination} lies relative to Chennai."</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '6px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{ fontSize: '14px', fontWeight: 800, color: '#15803D' }}>📍 Chennai</div>
                      <div style={{ fontSize: '10px', fontWeight: 800, color: '#64748B', letterSpacing: '0.05em' }}>START</div>
                    </div>
                    
                    <div style={{ flex: 1, height: '1.2px', background: '#D1D5DB', position: 'relative', margin: '0 8px', top: '-6px' }} />

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{ fontSize: '14px', fontWeight: 800, color: '#1D4ED8' }}>📍 {mission.destination}</div>
                      <div style={{ fontSize: '10px', fontWeight: 800, color: '#64748B', letterSpacing: '0.05em' }}>DESTINATION</div>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '8px' }}>
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: '26px 26px 26px', 
                      gridTemplateRows: '26px 26px 26px', 
                      alignItems: 'center', 
                      justifyItems: 'center',
                      fontSize: '13px',
                      fontWeight: 900,
                      color: '#78350F',
                      opacity: 0.8
                    }}>
                      <div style={{ gridColumn: 2, gridRow: 1 }}>N</div>
                      <div style={{ gridColumn: 2, gridRow: 1, transform: 'translateY(14px)', fontSize: '11px' }}>↑</div>
                      
                      <div style={{ gridColumn: 1, gridRow: 2 }}>W</div>
                      <div style={{ gridColumn: 1, gridRow: 2, transform: 'translateX(14px)', fontSize: '11px' }}>←</div>
                      
                      <div style={{ gridColumn: 3, gridRow: 2 }}>E</div>
                      <div style={{ gridColumn: 3, gridRow: 2, transform: 'translateX(-14px)', fontSize: '11px' }}>→</div>

                      <div style={{ gridColumn: 2, gridRow: 3, transform: 'translateY(-14px)', fontSize: '11px' }}>↓</div>
                      <div style={{ gridColumn: 2, gridRow: 3 }}>S</div>
                    </div>
                </div>
              </div>
            )}
          </div>
        )}

        {feedback && (
          <div style={{ 
            background: feedback.type === 'success' ? '#F0FDF4' : '#FEF2F2', 
            border: `1.2px solid ${feedback.type === 'success' ? '#86EFAC' : '#FECACA'}`, 
            padding: '10px 14px', 
            borderRadius: '8px',
            marginBottom: '4px',
            flexShrink: 0
          }}>
            <div style={{ color: feedback.type === 'success' ? '#166534' : '#991B1B', fontWeight: 800, fontSize: '13.5px', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
              {feedback.type === 'success' ? <Award size={18} color="#16A34A" style={{ flexShrink: 0, marginTop: '2px' }} /> : <Navigation size={18} color="#EF4444" style={{ flexShrink: 0, transform: 'rotate(180deg)', marginTop: '2px' }} />}
              <div style={{ whiteSpace: 'pre-line', lineHeight: 1.45, fontFamily: '"Space Grotesk", sans-serif', textAlign: 'justify', textJustify: 'inter-word' }}>
                {feedback.text}
              </div>
            </div>
            
            {feedback.type === 'error' && (
              <button onClick={() => setFeedback(null)} style={{ marginTop: '8px', background: '#EF4444', color: '#FFFFFF', border: 'none', padding: '5px 12px', borderRadius: '5px', fontSize: '12px', fontWeight: 800, cursor: 'pointer' }}>
                Try Another Option
              </button>
            )}
          </div>
        )}
        
        </div>

      </div>
    );
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      width: '100%', 
      height: '100%', 
      minHeight: 0,
      overflow: 'hidden',
      fontFamily: '"Space Grotesk", system-ui, sans-serif',
      background: 'linear-gradient(160deg, #F7F1E2 0%, #EFE6D2 100%)'
    }}>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', flex: 1, minHeight: 0, padding: '10px 14px', gap: '12px', overflow: 'hidden' }}>
        
        {/* LEFT PANEL: Realistic Interactive India Map */}
        <div style={{ 
          minWidth: 0,
          display: 'flex', 
          flexDirection: 'column',
          background: mapStyle === 'satellite' ? '#030712' : 'linear-gradient(160deg, #FFF9F0 0%, #FBF3E3 100%)',
          border: '2px solid #F2DFBC',
          borderRadius: '16px',
          boxShadow: '0 6px 20px rgba(60,40,20,0.06)',
          overflow: 'hidden',
          position: 'relative',
          height: '100%',
          boxSizing: 'border-box'
        }}>
          <IndiaSVGMap 
            activeRoute={activeRoute}
            animating={animating}
            missionIndex={missionIndex}
            missions={MISSIONS}
            mapStyle={mapStyle}
            travelMode={travelMode}
            soundEnabled={soundEnabled}
            onToggleSound={() => setSoundEnabled(!soundEnabled)}
            onSelectCity={() => {}}
          />
        </div>

        {/* RIGHT PANEL: Mission Controls */}
        <div style={{ 
          minWidth: 0,
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: 0,
          height: '100%',
          overflow: 'hidden',
          boxSizing: 'border-box'
        }}>
          {missionIndex === -1 && renderIntro()}
          {missionIndex >= 0 && renderMission()}
        </div>

      </div>

      <ChapterBackFooter
        onBack={onBack}
        nextLabel={
          missionIndex === -1
            ? 'Start Journey (Mission 1)'
            : missionIndex === MISSIONS.length - 1
              ? 'Next Activity'
              : 'Next Destination'
        }
        onNext={
          missionIndex === -1
            ? () => setMissionIndex(0)
            : missionIndex === MISSIONS.length - 1
              ? onBeginChapter
              : handleNextMission
        }
        nextVariant={missionIndex === MISSIONS.length - 1 ? 'green' : 'navy'}
      />
    </div>
  );
}
