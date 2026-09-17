import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

// Missing imports commented out to fix build
const crowImgSrc = '';
const sparrowImgSrc = '';
const cowImgSrc = '';
const frogImgSrc = '';
const squirrelImgSrc = '';

import antImgSrc from '../../../../../assets/ant.png';

import crowFrame1 from '../../../../../assets/anim_frames/crow_flight_frame_1.png';
import crowFrame2 from '../../../../../assets/anim_frames/crow_flight_frame_2.png';
import crowFrame3 from '../../../../../assets/anim_frames/crow_flight_frame_3.png';
import crowFrame4 from '../../../../../assets/anim_frames/crow_flight_frame_4.png';
import crowFrame5 from '../../../../../assets/anim_frames/crow_flight_frame_5.png';

/**
 * EcosystemAnimationOverlay
 * High-fidelity, GPU-accelerated canvas animation overlay.
 *
 * 1. BOTANICAL RAIN (Plants):
 *    Exclusively rains the leaf or flower petal of the selected tree or flower:
 *    - Neem: Realistic Neem leaflets
 *    - Peepal: Realistic Peepal leaves with drip-tip
 *    - Tulsi: Realistic Tulsi holy basil leaves
 *    - Jasmine: Realistic Jasmine star blossoms & white petals
 *    - Rose: Realistic velvety Rose petals
 *    - Minimal amount, runs for 10 seconds then stops automatically.
 *
 * 2. ANIMAL & BIRD ANIMATION (Animals):
 *    Exclusively animates the locomotion of the chosen animal or bird:
 *    - Crow: Realistic Indian Crow soaring across the screen with flapping wings & aerodynamic glides
 *    - Sparrow: Realistic House Sparrow with fast flutter wing-beats & undulating wave flight
 *    - Cow: Realistic Indian Zebu cow walking with 4-legged quadruped gait, head bob & swishing tail
 *    - Frog: Realistic Indian bullfrog hopping with spring-loaded ballistic jump arc & webbed toes
 *    - Squirrel: Realistic Indian palm squirrel with 3 white back stripes, arched bushy tail, rapid scurrying & inquisitive pause
 *    - Ant: Realistic black worker ant marching with 6-legged articulated alternating tripod gait & twitching antennae
 *    - Prominently visible in center stage, runs for exactly 10 seconds then stops automatically.
 */

const LEAF_COLORS = [
  { main: '#10B981', light: '#34D399', dark: '#047857', vein: '#6EE7B7' },
  { main: '#15803D', light: '#4ADE80', dark: '#14532D', vein: '#86EFAC' },
  { main: '#84CC16', light: '#A3E635', dark: '#4D7C0F', vein: '#BEF264' },
  { main: '#059669', light: '#10B981', dark: '#064E3B', vein: '#A7F3D0' }
];

const BUTTERFLY_SPECIES = [
  { name: 'Swallowtail', primary: '#10B981', secondary: '#047857', accent: '#6EE7B7', edge: '#064E3B' },
  { name: 'Monarch', primary: '#F97316', secondary: '#C2410C', accent: '#FFEDD5', edge: '#0F172A' },
  { name: 'Azure', primary: '#0284C7', secondary: '#0369A1', accent: '#7DD3FC', edge: '#0F172A' },
  { name: 'Sulphur', primary: '#F59E0B', secondary: '#D97706', accent: '#FEF08A', edge: '#78350F' }
];

const getBotanicalTypesForPlant = (plantName) => {
  if (!plantName) return [];
  const p = plantName.toLowerCase().trim();
  if (p.includes('neem')) return ['neem'];
  if (p.includes('peepal')) return ['peepal'];
  if (p.includes('tulsi')) return ['tulsi'];
  if (p.includes('jasmine')) return ['jasmine', 'jasmine_petal'];
  if (p.includes('rose')) return ['rose_petal'];
  if (p.includes('grass')) return ['tulsi'];
  return ['neem', 'peepal', 'tulsi', 'jasmine', 'rose_petal'];
};

// Preload all photographic assets immediately when bundle loads so they are 100% available without delay
const PRELOADED_ASSETS = {};
const preloadAsset = (key, src) => {
  if (typeof window !== 'undefined') {
    const img = new Image();
    img.onload = () => {
      PRELOADED_ASSETS[key] = img;
    };
    img.src = src;
    if (img.complete && img.naturalWidth > 0) {
      PRELOADED_ASSETS[key] = img;
    }
  }
};
preloadAsset('crow', crowImgSrc);
preloadAsset('sparrow', sparrowImgSrc);
preloadAsset('cow', cowImgSrc);
preloadAsset('frog', frogImgSrc);
preloadAsset('squirrel', squirrelImgSrc);
preloadAsset('ant', antImgSrc);
preloadAsset('crow_f1', crowFrame1);
preloadAsset('crow_f2', crowFrame2);
preloadAsset('crow_f3', crowFrame3);
preloadAsset('crow_f4', crowFrame4);
preloadAsset('crow_f5', crowFrame5);

const EcosystemAnimationOverlay = forwardRef(({ selectedPlant, selectedAnimal }, ref) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animalEntityRef = useRef(null);
  const animFrameIdRef = useRef(null);
  const isRunningRef = useRef(false);
  const activeTypesRef = useRef(getBotanicalTypesForPlant(selectedPlant));
  const plantStopTimerRef = useRef(null);
  const animalStopTimerRef = useRef(null);
  const lastAnimalSpawnRef = useRef({ name: '', time: 0 });
  const loadedImagesRef = useRef({});

  const getAsset = (key) => {
    return PRELOADED_ASSETS[key] || loadedImagesRef.current[key];
  };

  // Preload photographic assets for instantaneous, zero-flicker 60fps rendering
  useEffect(() => {
    const imagesToLoad = {
      crow: crowImgSrc,
      sparrow: sparrowImgSrc,
      cow: cowImgSrc,
      frog: frogImgSrc,
      squirrel: squirrelImgSrc,
      ant: antImgSrc,
      crow_f1: crowFrame1,
      crow_f2: crowFrame2,
      crow_f3: crowFrame3,
      crow_f4: crowFrame4,
      crow_f5: crowFrame5,
    };

    Object.entries(imagesToLoad).forEach(([key, src]) => {
      const img = new Image();
      img.onload = () => {
        loadedImagesRef.current[key] = img;
        PRELOADED_ASSETS[key] = img;
      };
      img.src = src;
      if (img.complete && img.naturalWidth > 0) {
        loadedImagesRef.current[key] = img;
        PRELOADED_ASSETS[key] = img;
      }
    });
  }, []);

  // React to prop changes (animal animation removed)
  useEffect(() => {
    animalEntityRef.current = null;
  }, [selectedAnimal]);

  useEffect(() => {
    if (selectedPlant) {
      setSpecimenRain(selectedPlant);
    }
  }, [selectedPlant]);

  const getDPR = () => Math.min(window.devicePixelRatio || 1, 2);

  // Resize handler with High-DPI support across full viewport
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = getDPR();
    const w = typeof window !== 'undefined' ? window.innerWidth : 1280;
    const h = typeof window !== 'undefined' ? window.innerHeight : 720;

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    }
  };

  // Helper to construct a single realistic botanical particle
  const createBotanicalParticle = (botanicalType, width, height, isAmbient = false, origin = null) => {
    const startX = origin ? origin.x + (Math.random() - 0.5) * 80 : Math.random() * width;
    const startY = origin
      ? origin.y + (Math.random() - 0.5) * 30
      : (isAmbient ? Math.random() * (height + 60) - 30 : -35 - Math.random() * 80);

    let size = 20 + Math.random() * 8;
    if (botanicalType === 'peepal') size = 24 + Math.random() * 10;
    if (botanicalType === 'neem') size = 22 + Math.random() * 8;
    if (botanicalType === 'tulsi') size = 19 + Math.random() * 7;
    if (botanicalType === 'jasmine') size = 18 + Math.random() * 7;
    if (botanicalType === 'jasmine_petal') size = 14 + Math.random() * 6;
    if (botanicalType === 'rose_petal') size = 20 + Math.random() * 8;

    return {
      type: 'botanical',
      botanicalType,
      x: startX,
      y: startY,
      size,
      
      // Aerodynamic flight dynamics (Kirchhoff-Euler fluid glide & flutter)
      glideAngle: 0,
      glideSpeed: 1.1 + Math.random() * 0.7,
      baseDescent: 0.95 + Math.random() * 0.45,
      flutterPhase: Math.random() * Math.PI * 2,
      flutterSpeed: 0.026 + Math.random() * 0.018,
      flutterAmp: 0.42 + Math.random() * 0.22,
      
      // 3D rotations (roll around longitudinal axis, pitch camber, heading yaw)
      rollPhase: Math.random() * Math.PI * 2,
      rollSpeed: 0.02 + Math.random() * 0.024,
      pitchPhase: Math.random() * Math.PI * 2,
      pitchSpeed: 0.032 + Math.random() * 0.02,
      yawAngle: (Math.random() - 0.5) * 0.35,
      
      // Horizontal drift & velocity blending
      driftVx: (Math.random() - 0.5) * 0.35,
      vx: (Math.random() - 0.5) * 0.6,
      vy: 1.0 + Math.random() * 0.5,
      
      // Parallax optical depth (0.85 = deeper layer, 1.15 = foreground)
      depth: 0.88 + Math.random() * 0.28,
      
      opacity: 1,
      isAmbient,
      life: 0,
      maxLife: isAmbient ? 999999 : 280 + Math.random() * 90
    };
  };

  // Switch rain to ONLY the selected tree or flower in minimal amount (7-8 particles)
  // Automatically stops animation after 10 seconds
  const setSpecimenRain = (plantName) => {
    resizeCanvas();
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (plantStopTimerRef.current) {
      clearTimeout(plantStopTimerRef.current);
      plantStopTimerRef.current = null;
    }

    if (!plantName) {
      particlesRef.current = [];
      activeTypesRef.current = [];
      return;
    }

    const dpr = getDPR();
    const width = canvas.width / dpr || window.innerWidth;
    const height = canvas.height / dpr || window.innerHeight;
    const types = getBotanicalTypesForPlant(plantName);
    activeTypesRef.current = types;

    if (types.length === 0) {
      particlesRef.current = [];
      return;
    }

    const minimalCount = 8;
    const newParticles = [];
    for (let i = 0; i < minimalCount; i++) {
      const chosenType = types[Math.floor(Math.random() * types.length)];
      newParticles.push(createBotanicalParticle(chosenType, width, height, true));
    }

    particlesRef.current = newParticles;
    startAnimationLoop();

    // Automatically stop animation after exactly 10 seconds
    plantStopTimerRef.current = setTimeout(() => {
      particlesRef.current.forEach(p => {
        p.isAmbient = false;
        p.life = Math.max(p.life, p.maxLife - 60);
      });
      setTimeout(() => {
        particlesRef.current = [];
        activeTypesRef.current = [];
      }, 1500);
    }, 10000);
  };

  // Animal locomotion animation removed as requested
  const setSpecimenAnimal = () => {
    animalEntityRef.current = null;
    if (animalStopTimerRef.current) {
      clearTimeout(animalStopTimerRef.current);
      animalStopTimerRef.current = null;
    }
  };

  // Dedicated Realistic Ecosystem Quiz Answer Animation Burst
  // Spawns exactly 3 to 6 leaves, 3 to 6 flower petals, and 3 to 6 realistic butterflies tailored to the question answer!
  const triggerQuizEcosystemBurst = ({
    leafTypes = ['peepal', 'neem'],
    leafCount = 4,
    petalTypes = ['rose_petal', 'jasmine_petal'],
    petalCount = 4,
    butterflyCount = 4,
    butterflySpecies = BUTTERFLY_SPECIES,
    origin = null
  }) => {
    resizeCanvas();
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (plantStopTimerRef.current) {
      clearTimeout(plantStopTimerRef.current);
      plantStopTimerRef.current = null;
    }

    const dpr = getDPR();
    const width = canvas.width / dpr || window.innerWidth;
    const height = canvas.height / dpr || window.innerHeight;

    // Reset particles cleanly to showcase the dedicated 3-6 items burst
    particlesRef.current = [];
    const newParticles = [];

    // 1. Exactly 3 to 6 Realistic Leaves (Peepal, Neem, Tulsi)
    const finalLeafCount = Math.min(6, Math.max(3, leafCount));
    if (leafTypes && leafTypes.length > 0) {
      for (let i = 0; i < finalLeafCount; i++) {
        const leafType = leafTypes[i % leafTypes.length];
        const p = createBotanicalParticle(leafType, width, height, false, origin);
        // Distribute gracefully across the screen
        p.x = origin 
          ? origin.x + (Math.random() - 0.5) * 140 
          : width * 0.12 + (i / Math.max(1, finalLeafCount - 1)) * (width * 0.76) + (Math.random() - 0.5) * 50;
        p.y = origin ? origin.y + (Math.random() - 0.5) * 50 : -25 - Math.random() * 80;
        p.size = (p.size || 22) * (1.0 + Math.random() * 0.2);
        p.glideSpeed = 1.1 + Math.random() * 0.5;
        p.baseDescent = 0.85 + Math.random() * 0.4;
        p.maxLife = 320 + Math.random() * 60;
        p.isAmbient = false;
        newParticles.push(p);
      }
    }

    // 2. Exactly 3 to 6 Realistic Flower Petals / Blossoms (Rose, Jasmine)
    const finalPetalCount = Math.min(6, Math.max(3, petalCount));
    if (petalTypes && petalTypes.length > 0) {
      for (let i = 0; i < finalPetalCount; i++) {
        const petalType = petalTypes[i % petalTypes.length];
        const p = createBotanicalParticle(petalType, width, height, false, origin);
        p.x = origin 
          ? origin.x + (Math.random() - 0.5) * 160 
          : width * 0.1 + (i / Math.max(1, finalPetalCount - 1)) * (width * 0.8) + (Math.random() - 0.5) * 60;
        p.y = origin ? origin.y + (Math.random() - 0.5) * 60 : -30 - Math.random() * 70;
        p.size = (p.size || 18) * (1.05 + Math.random() * 0.25);
        p.flutterSpeed = 0.038 + Math.random() * 0.02;
        p.flutterAmp = 0.52 + Math.random() * 0.2;
        p.baseDescent = 0.75 + Math.random() * 0.35; // Petals drift more gently
        p.maxLife = 340 + Math.random() * 60;
        p.isAmbient = false;
        newParticles.push(p);
      }
    }

    // 3. Exactly 3 to 6 Realistic Fluttering Butterflies
    const finalButterflyCount = Math.min(6, Math.max(3, butterflyCount));
    for (let i = 0; i < finalButterflyCount; i++) {
      const species = butterflySpecies[i % butterflySpecies.length];
      const startX = origin 
        ? origin.x + (Math.random() - 0.5) * 120 
        : width * 0.15 + (i / Math.max(1, finalButterflyCount - 1)) * (width * 0.7) + (Math.random() - 0.5) * 70;
      const startY = origin 
        ? origin.y + (Math.random() - 0.5) * 60 
        : height * 0.65 + (Math.random() - 0.5) * (height * 0.3);

      newParticles.push({
        type: 'butterfly',
        species,
        x: startX,
        y: startY,
        vx: (Math.random() - 0.5) * 2.2,
        vy: -1.3 - Math.random() * 1.4,
        wingSpan: 24 + Math.random() * 8,
        flapPhase: (i * Math.PI / 2) + Math.random() * 0.4,
        flapSpeed: 0.24 + Math.random() * 0.12,
        swoopPhase: Math.random() * Math.PI * 2,
        swoopSpeed: 0.032 + Math.random() * 0.02,
        opacity: 1,
        life: 0,
        maxLife: 320 + Math.random() * 60
      });
    }

    particlesRef.current = newParticles;
    startAnimationLoop();
  };

  const spawnButterflies = (count = 5, origin = null) => {
    triggerQuizEcosystemBurst({
      leafTypes: [],
      leafCount: 0,
      petalTypes: ['rose_petal', 'jasmine_petal'],
      petalCount: 4,
      butterflyCount: Math.min(6, Math.max(3, count)),
      origin
    });
  };

  // Public Imperative API
  useImperativeHandle(ref, () => ({
    setSpecimen: (plantName) => {
      setSpecimenRain(plantName);
    },
    setAnimal: (animalName) => {
      setSpecimenAnimal(animalName);
    },
    trigger: ({ type = 'botanical_rain', count, origin } = {}) => {
      resizeCanvas();
      switch (type) {
        case 'neem_rain':
          setSpecimenRain('Neem');
          break;
        case 'peepal_rain':
          setSpecimenRain('Peepal');
          break;
        case 'tulsi_rain':
          setSpecimenRain('Tulsi');
          break;
        case 'jasmine_rain':
          setSpecimenRain('Jasmine');
          break;
        case 'rose_rain':
          setSpecimenRain('Rose');
          break;
        case 'crow_fly':
          setSpecimenAnimal('Crow');
          break;
        case 'sparrow_fly':
          setSpecimenAnimal('Sparrow');
          break;
        case 'cow_walk':
          setSpecimenAnimal('Cow');
          break;
        case 'frog_hop':
          setSpecimenAnimal('Frog');
          break;
        case 'squirrel_scamper':
          setSpecimenAnimal('Squirrel');
          break;
        case 'ant_march':
          setSpecimenAnimal('Ant');
          break;
        case 'butterfly_swarm':
          spawnButterflies(count || 5, origin);
          break;

        // -------------------------------------------------------------
        // QUESTION-SPECIFIC REALISTIC ECOSYSTEM QUIZ ANIMATIONS
        // Exactly 3 to 6 leaves, 3 to 6 flower petals, and 3 to 6 butterflies
        // Perfectly related to each question's ecological answer!
        // -------------------------------------------------------------
        case 'quiz_q1_biodiversity':
        case 'biodiversity_celebration':
          // Answer: The region has high biodiversity
          // 4 diverse forest leaves (Peepal & Neem) + 4 flower petals + 4 multi-species butterflies
          triggerQuizEcosystemBurst({
            leafTypes: ['peepal', 'neem'],
            leafCount: 4,
            petalTypes: ['jasmine_petal', 'rose_petal'],
            petalCount: 4,
            butterflyCount: 4,
            origin
          });
          break;

        case 'quiz_q2_pollinators':
        case 'petal_shower':
          // Answer: Butterflies & nectar feeders affected first
          // 3 leaves + 5 fragrant flower petals & blossoms + 5 butterflies visiting for nectar
          triggerQuizEcosystemBurst({
            leafTypes: ['tulsi'],
            leafCount: 3,
            petalTypes: ['rose_petal', 'jasmine', 'jasmine_petal'],
            petalCount: 5,
            butterflyCount: 5,
            origin
          });
          break;

        case 'quiz_q3_seed_dispersal':
        case 'seed_dispersal':
          // Answer: Spread seeds to new fertile grounds
          // 5 aerodynamic glider leaves (Peepal & Neem) + 3 petals + 4 guiding butterflies
          triggerQuizEcosystemBurst({
            leafTypes: ['peepal', 'neem'],
            leafCount: 5,
            petalTypes: ['jasmine_petal'],
            petalCount: 3,
            butterflyCount: 4,
            origin
          });
          break;

        case 'quiz_q4_school_garden':
        case 'garden_wildlife_rush':
          // Answer: Diverse campus garden (Tulsi, Neem, Rose, Butterflies)
          // 4 school garden leaves (Tulsi & Neem) + 4 fresh flower petals + 4 cheerful butterflies
          triggerQuizEcosystemBurst({
            leafTypes: ['tulsi', 'neem'],
            leafCount: 4,
            petalTypes: ['rose_petal', 'jasmine'],
            petalCount: 4,
            butterflyCount: 4,
            origin
          });
          break;

        case 'quiz_q5_insect_pollination':
          // Answer: Insect pollination transferring pollen for seeds
          // 3 floral leaves + 5 blooming Jasmine flowers & Rose petals + 5 pollinators
          triggerQuizEcosystemBurst({
            leafTypes: ['tulsi'],
            leafCount: 3,
            petalTypes: ['jasmine', 'rose_petal'],
            petalCount: 5,
            butterflyCount: 5,
            origin
          });
          break;

        case 'quiz_q6_interdependence':
        case 'meadow_interdependence':
          // Answer: Mutual interdependence (Food, shelter, seeds)
          // 4 symbiotic leaves + 4 velvety petals + 4 butterflies swirling in harmony
          triggerQuizEcosystemBurst({
            leafTypes: ['neem', 'peepal'],
            leafCount: 4,
            petalTypes: ['rose_petal', 'jasmine_petal'],
            petalCount: 4,
            butterflyCount: 4,
            origin
          });
          break;

        case 'quiz_q7_wetland_park':
        case 'wetland_frog_hop':
          // Answer: Green park with 15 plant species & diverse life
          // 4 moisture-fresh leaves (Peepal & Tulsi) + 4 rose/jasmine petals + 4 azure & emerald butterflies
          triggerQuizEcosystemBurst({
            leafTypes: ['peepal', 'tulsi'],
            leafCount: 4,
            petalTypes: ['rose_petal', 'jasmine_petal'],
            petalCount: 4,
            butterflyCount: 4,
            origin
          });
          break;

        case 'quiz_q8_food_chain':
        case 'insect_food_web':
          // Answer: Insect-eating birds face food shortages (protecting insect base)
          // 4 resilient canopy leaves + 3 flower petals + 5 butterflies soaring upward
          triggerQuizEcosystemBurst({
            leafTypes: ['neem', 'peepal'],
            leafCount: 4,
            petalTypes: ['jasmine_petal', 'rose_petal'],
            petalCount: 3,
            butterflyCount: 5,
            origin
          });
          break;

        case 'click_burst':
        case 'gentle_autumn':
          // Micro gentle organic flutter on option selection
          triggerQuizEcosystemBurst({
            leafTypes: ['tulsi', 'neem'],
            leafCount: 3,
            petalTypes: ['jasmine_petal'],
            petalCount: 3,
            butterflyCount: 3,
            origin
          });
          break;

        case 'leaf_rain':
          setSpecimenRain('Neem');
          break;
        default:
          if (activeTypesRef.current && activeTypesRef.current.length > 0) {
            setSpecimenRain(selectedPlant);
          }
          break;
      }
    }
  }));

  // Watch for selectedPlant changes
  useEffect(() => {
    if (selectedPlant) {
      setSpecimenRain(selectedPlant);
    } else {
      particlesRef.current = [];
      activeTypesRef.current = [];
    }
  }, [selectedPlant]);

  // Watch for selectedAnimal changes (animal animation removed)
  useEffect(() => {
    animalEntityRef.current = null;
    if (animalStopTimerRef.current) {
      clearTimeout(animalStopTimerRef.current);
      animalStopTimerRef.current = null;
    }
  }, [selectedAnimal]);

  // ==========================================================================
  // REALISTIC BOTANICAL DRAWING FUNCTIONS
  // ==========================================================================

  // 1. NEEM LEAFLET (Azadirachta indica): Asymmetric falcate sickle blade, serrated teeth, angled veins
  const drawNeemLeaflet = (ctx, size, isUnderside = false, visualRoll = 1) => {
    ctx.save();
    const h = size * 1.5;
    const w = size * 0.58;

    ctx.beginPath();
    ctx.moveTo(0, h * 0.5);

    // Serrated curved outer margin
    const teeth = 9;
    for (let i = 1; i <= teeth; i++) {
      const t = i / teeth;
      const py = h * 0.5 - t * h;
      const widthFactor = Math.sin(t * Math.PI) * w * 1.12;
      const tooth = (i < teeth) ? size * 0.08 : 0;
      ctx.lineTo(widthFactor + tooth, py);
    }
    ctx.lineTo(w * 0.15, -h * 0.55); // Curved sickle apex

    // Inner smooth concave margin
    ctx.bezierCurveTo(-w * 0.18, -h * 0.25, -w * 0.32, h * 0.2, 0, h * 0.5);
    ctx.closePath();

    if (!isUnderside) {
      const grad = ctx.createLinearGradient(-w * 0.2, -h * 0.5, w * 0.8, h * 0.5);
      grad.addColorStop(0, '#10B981');
      grad.addColorStop(0.35, '#059669');
      grad.addColorStop(0.75, '#047857');
      grad.addColorStop(1, '#064E3B');
      ctx.fillStyle = grad;
      ctx.fill();

      // Soft sun sheen across convex sickle curve
      const sheen = ctx.createLinearGradient(0, -h * 0.3, w * 0.8, 0);
      sheen.addColorStop(0, 'rgba(255, 255, 255, 0.22)');
      sheen.addColorStop(0.6, 'rgba(110, 231, 183, 0.08)');
      sheen.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = sheen;
      ctx.fill();

      ctx.strokeStyle = 'rgba(4, 120, 87, 0.45)';
      ctx.lineWidth = 0.55;
      ctx.stroke();

      // Curved central midrib
      ctx.beginPath();
      ctx.moveTo(0, h * 0.5);
      ctx.quadraticCurveTo(w * 0.18, 0, w * 0.15, -h * 0.55);
      ctx.strokeStyle = '#6EE7B7';
      ctx.lineWidth = Math.max(0.85, size * 0.05);
      ctx.stroke();

      // Fine secondary veins
      ctx.strokeStyle = 'rgba(167, 243, 208, 0.4)';
      ctx.lineWidth = 0.5;
      for (let i = 1; i <= 6; i++) {
        const t = i / 7;
        const my = h * 0.5 - t * h;
        const mx = (w * 0.18) * (1 - Math.abs(t - 0.5) * 2);
        ctx.beginPath();
        ctx.moveTo(mx, my);
        ctx.lineTo(mx + w * 0.45 * Math.sin(t * Math.PI), my - h * 0.06);
        ctx.stroke();
      }
    } else {
      // Underside: Paler sage green
      const underGrad = ctx.createLinearGradient(-w * 0.2, -h * 0.5, w * 0.8, h * 0.5);
      underGrad.addColorStop(0, '#34D399');
      underGrad.addColorStop(0.5, '#10B981');
      underGrad.addColorStop(1, '#059669');
      ctx.fillStyle = underGrad;
      ctx.fill();

      ctx.strokeStyle = 'rgba(5, 150, 105, 0.35)';
      ctx.lineWidth = 0.55;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, h * 0.5);
      ctx.quadraticCurveTo(w * 0.18, 0, w * 0.15, -h * 0.55);
      ctx.strokeStyle = '#A7F3D0';
      ctx.lineWidth = Math.max(0.9, size * 0.055);
      ctx.stroke();
    }
    ctx.restore();
  };

  // 2. PEEPAL LEAF (Ficus religiosa): Iconic cordate heart base with long, slender drip-tip tail & reticulate veins
  const drawPeepalLeaf = (ctx, size, isUnderside = false, visualRoll = 1) => {
    ctx.save();
    const h = size * 1.5;
    const w = size * 1.05;

    ctx.beginPath();
    ctx.moveTo(0, h * 0.38); // Base cleft

    // Right lobe
    ctx.bezierCurveTo(w * 0.55, h * 0.42, w * 0.92, h * 0.08, w * 0.68, -h * 0.18);
    // Tapering into delicate drip-tip tail
    ctx.bezierCurveTo(w * 0.42, -h * 0.38, w * 0.14, -h * 0.62, 0, -h * 0.82);

    // Left lobe
    ctx.bezierCurveTo(-w * 0.14, -h * 0.62, -w * 0.42, -h * 0.38, -w * 0.68, -h * 0.18);
    ctx.bezierCurveTo(-w * 0.92, h * 0.08, -w * 0.55, h * 0.42, 0, h * 0.38);
    ctx.closePath();

    if (!isUnderside) {
      // Topside: Fresh sacred fig green
      const grad = ctx.createRadialGradient(0, -h * 0.1, 2, 0, 0, h * 0.75);
      grad.addColorStop(0, '#34D399');
      grad.addColorStop(0.38, '#15803D');
      grad.addColorStop(0.82, '#14532D');
      grad.addColorStop(1, '#064E3B');
      ctx.fillStyle = grad;
      ctx.fill();

      // Soft sun sheen
      const sheen = ctx.createLinearGradient(-w * 0.5, -h * 0.4, w * 0.5, h * 0.4);
      sheen.addColorStop(0, 'rgba(255, 255, 255, 0.22)');
      sheen.addColorStop(0.5, 'rgba(255, 255, 255, 0.04)');
      sheen.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = sheen;
      ctx.fill();

      ctx.strokeStyle = 'rgba(5, 46, 22, 0.45)';
      ctx.lineWidth = 0.6;
      ctx.stroke();

      // Pale central midrib extending into the long drip-tip
      ctx.beginPath();
      ctx.moveTo(0, h * 0.38);
      ctx.quadraticCurveTo(w * 0.02, -h * 0.15, 0, -h * 0.8);
      ctx.strokeStyle = '#86EFAC';
      ctx.lineWidth = Math.max(1.0, size * 0.06);
      ctx.stroke();

      // Curving lateral secondary veins
      ctx.strokeStyle = 'rgba(167, 243, 208, 0.5)';
      ctx.lineWidth = 0.55;
      const offsets = [-0.1, 0.05, 0.18];
      for (let i = 0; i < offsets.length; i++) {
        const vy = h * offsets[i];
        const span = w * (0.6 - Math.abs(offsets[i]) * 0.5);
        ctx.beginPath();
        ctx.moveTo(0, vy);
        ctx.bezierCurveTo(span * 0.4, vy - h * 0.06, span * 0.8, vy - h * 0.02, span, vy + h * 0.04);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, vy);
        ctx.bezierCurveTo(-span * 0.4, vy - h * 0.06, -span * 0.8, vy - h * 0.02, -span, vy + h * 0.04);
        ctx.stroke();
      }

      // Slender petiole
      ctx.beginPath();
      ctx.moveTo(0, h * 0.38);
      ctx.quadraticCurveTo(-w * 0.04, h * 0.52, -w * 0.02, h * 0.64);
      ctx.strokeStyle = '#4B7B4B';
      ctx.lineWidth = Math.max(0.9, size * 0.05);
      ctx.stroke();
    } else {
      // Underside: Paler celadon tone
      const underGrad = ctx.createLinearGradient(0, -h * 0.6, 0, h * 0.4);
      underGrad.addColorStop(0, '#4ADE80');
      underGrad.addColorStop(0.5, '#22C55E');
      underGrad.addColorStop(1, '#16A34A');
      ctx.fillStyle = underGrad;
      ctx.fill();

      ctx.strokeStyle = 'rgba(20, 83, 45, 0.35)';
      ctx.lineWidth = 0.6;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, h * 0.38);
      ctx.quadraticCurveTo(w * 0.02, -h * 0.15, 0, -h * 0.8);
      ctx.strokeStyle = '#BBF7D0';
      ctx.lineWidth = Math.max(1.1, size * 0.065);
      ctx.stroke();
    }
    ctx.restore();
  };

  // 3. TULSI LEAF (Ocimum tenuiflorum / sanctum): Ovate blade, delicate crenate teeth, rich botanical green & fine pinnate veins
  const drawTulsiLeaf = (ctx, size, isUnderside = false, visualRoll = 1) => {
    ctx.save();
    const h = size * 1.5;
    const w = size * 0.78;

    // Organic ovate leaf outline with subtle crenate margin
    ctx.beginPath();
    ctx.moveTo(0, h * 0.5);

    // Right leaf margin with gentle serrated lobes
    ctx.bezierCurveTo(w * 0.45, h * 0.46, w * 0.95, h * 0.15, w * 0.92, -h * 0.08);
    ctx.bezierCurveTo(w * 0.88, -h * 0.28, w * 0.52, -h * 0.48, 0, -h * 0.55); // Leaf tip

    // Left leaf margin
    ctx.bezierCurveTo(-w * 0.52, -h * 0.48, -w * 0.88, -h * 0.28, -w * 0.92, -h * 0.08);
    ctx.bezierCurveTo(-w * 0.95, h * 0.15, -w * 0.45, h * 0.46, 0, h * 0.5);
    ctx.closePath();

    if (!isUnderside) {
      // TOPSIDE: Rich, lush botanical emerald green with subtle depth gradient
      const bladeGrad = ctx.createLinearGradient(-w * 0.3, -h * 0.5, w * 0.5, h * 0.5);
      bladeGrad.addColorStop(0, '#1E5E3A');    // Vibrant leaf tip
      bladeGrad.addColorStop(0.35, '#2D7A4D'); // Mid blade
      bladeGrad.addColorStop(0.7, '#185333');  // Deeper body
      bladeGrad.addColorStop(1, '#114026');    // Base attachment
      ctx.fillStyle = bladeGrad;
      ctx.fill();

      // Soft sun sheen across left convex curve
      const sheenGrad = ctx.createLinearGradient(-w * 0.6, -h * 0.2, w * 0.2, h * 0.2);
      sheenGrad.addColorStop(0, 'rgba(167, 243, 208, 0.28)');
      sheenGrad.addColorStop(0.5, 'rgba(110, 231, 183, 0.1)');
      sheenGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = sheenGrad;
      ctx.fill();

      ctx.strokeStyle = 'rgba(15, 60, 35, 0.4)';
      ctx.lineWidth = 0.6;
      ctx.stroke();

      // Subtle 3D midrib (curved, tapered, soft light-green with warm natural petiole)
      ctx.beginPath();
      ctx.moveTo(0, h * 0.52);
      ctx.quadraticCurveTo(w * 0.04, 0, 0, -h * 0.52);
      ctx.strokeStyle = '#6EE7B7';
      ctx.lineWidth = Math.max(0.9, size * 0.05);
      ctx.stroke();

      // Delicate secondary veins (pinnate branching at 45°)
      ctx.lineWidth = 0.55;
      ctx.strokeStyle = 'rgba(167, 243, 208, 0.42)';
      const veinPairs = [-0.35, -0.15, 0.08, 0.28];
      for (let i = 0; i < veinPairs.length; i++) {
        const vy = h * veinPairs[i];
        const span = w * (0.65 - Math.abs(veinPairs[i]) * 0.45);
        // Right vein
        ctx.beginPath();
        ctx.moveTo(0, vy);
        ctx.quadraticCurveTo(span * 0.4, vy - h * 0.04, span * 0.85, vy - h * 0.08);
        ctx.stroke();
        // Left vein
        ctx.beginPath();
        ctx.moveTo(0, vy);
        ctx.quadraticCurveTo(-span * 0.4, vy - h * 0.04, -span * 0.85, vy - h * 0.08);
        ctx.stroke();
      }

      // Natural short petiole (leaf stalk) at base with subtle herbal warm olive
      ctx.beginPath();
      ctx.moveTo(0, h * 0.5);
      ctx.quadraticCurveTo(w * 0.03, h * 0.58, w * 0.02, h * 0.64);
      ctx.strokeStyle = '#4A6B3D';
      ctx.lineWidth = Math.max(1.1, size * 0.065);
      ctx.stroke();
    } else {
      // UNDERSIDE: Paler, soft matte sage/mint tone
      const underGrad = ctx.createLinearGradient(-w * 0.3, -h * 0.5, w * 0.5, h * 0.5);
      underGrad.addColorStop(0, '#4B8863');
      underGrad.addColorStop(0.5, '#5CA278');
      underGrad.addColorStop(1, '#3A7050');
      ctx.fillStyle = underGrad;
      ctx.fill();

      ctx.strokeStyle = 'rgba(30, 75, 45, 0.35)';
      ctx.lineWidth = 0.6;
      ctx.stroke();

      // Raised paler midrib on underside
      ctx.beginPath();
      ctx.moveTo(0, h * 0.52);
      ctx.quadraticCurveTo(w * 0.04, 0, 0, -h * 0.52);
      ctx.strokeStyle = '#A7F3D0';
      ctx.lineWidth = Math.max(1.0, size * 0.06);
      ctx.stroke();

      // Raised secondary veins
      ctx.lineWidth = 0.65;
      ctx.strokeStyle = 'rgba(209, 250, 229, 0.55)';
      const veinPairs = [-0.35, -0.15, 0.08, 0.28];
      for (let i = 0; i < veinPairs.length; i++) {
        const vy = h * veinPairs[i];
        const span = w * (0.65 - Math.abs(veinPairs[i]) * 0.45);
        ctx.beginPath();
        ctx.moveTo(0, vy);
        ctx.quadraticCurveTo(span * 0.4, vy - h * 0.04, span * 0.85, vy - h * 0.08);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, vy);
        ctx.quadraticCurveTo(-span * 0.4, vy - h * 0.04, -span * 0.85, vy - h * 0.08);
        ctx.stroke();
      }

      // Petiole
      ctx.beginPath();
      ctx.moveTo(0, h * 0.5);
      ctx.quadraticCurveTo(w * 0.03, h * 0.58, w * 0.02, h * 0.64);
      ctx.strokeStyle = '#5B7C4F';
      ctx.lineWidth = Math.max(1.1, size * 0.065);
      ctx.stroke();
    }
    ctx.restore();
  };

  // 4. JASMINE FLOWER (Jasminum): Silky ivory 5-star blossom with warm sunny stamen eye
  const drawJasmineFlower = (ctx, size, isUnderside = false, visualRoll = 1) => {
    ctx.save();
    const petalCount = 5;
    for (let i = 0; i < petalCount; i++) {
      const rot = (i * 2 * Math.PI) / petalCount;
      ctx.save();
      ctx.rotate(rot);

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(size * 0.22, -size * 0.35, size * 0.24, -size * 0.75, 0, -size);
      ctx.bezierCurveTo(-size * 0.24, -size * 0.75, -size * 0.22, -size * 0.35, 0, 0);
      ctx.closePath();

      const pGrad = ctx.createLinearGradient(0, 0, 0, -size);
      pGrad.addColorStop(0, '#FEF3C7');
      pGrad.addColorStop(0.3, '#FFFFFF');
      pGrad.addColorStop(0.85, '#F8FAFC');
      pGrad.addColorStop(1, '#E2E8F0');
      ctx.fillStyle = pGrad;
      ctx.fill();

      ctx.strokeStyle = 'rgba(203, 213, 225, 0.4)';
      ctx.lineWidth = 0.5;
      ctx.stroke();

      ctx.restore();
    }

    // Golden-amber floral eye
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.16, 0, Math.PI * 2);
    ctx.fillStyle = '#F59E0B';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(0, 0, size * 0.08, 0, Math.PI * 2);
    ctx.fillStyle = '#D97706';
    ctx.fill();

    ctx.restore();
  };

  // 5. JASMINE PETAL: Silky white-cream petal with translucent curl
  const drawJasminePetal = (ctx, size, isUnderside = false, visualRoll = 1) => {
    ctx.save();
    const h = size * 1.2;
    const w = size * 0.55;

    ctx.beginPath();
    ctx.moveTo(0, h * 0.45);
    ctx.bezierCurveTo(w * 0.55, h * 0.2, w * 0.55, -h * 0.25, 0, -h * 0.5);
    ctx.bezierCurveTo(-w * 0.55, -h * 0.25, -w * 0.55, h * 0.2, 0, h * 0.45);
    ctx.closePath();

    const pGrad = ctx.createLinearGradient(0, h * 0.45, 0, -h * 0.5);
    pGrad.addColorStop(0, '#FEF08A');
    pGrad.addColorStop(0.25, '#FFFFFF');
    pGrad.addColorStop(0.85, '#F8FAFC');
    pGrad.addColorStop(1, '#CBD5E1');
    ctx.fillStyle = pGrad;
    ctx.fill();

    ctx.strokeStyle = 'rgba(203, 213, 225, 0.45)';
    ctx.lineWidth = 0.5;
    ctx.stroke();

    ctx.restore();
  };

  // 6. ROSE PETAL (Rosa): Velvety cupped crimson-ruby petal with warm amber base attachment
  const drawRosePetal = (ctx, size, isUnderside = false, visualRoll = 1) => {
    ctx.save();
    const h = size * 1.3;
    const w = size * 1.05;

    ctx.beginPath();
    ctx.moveTo(0, h * 0.48); // Narrow claw/attachment base
    ctx.bezierCurveTo(w * 0.42, h * 0.38, w * 0.85, h * 0.12, w * 0.72, -h * 0.22);
    ctx.bezierCurveTo(w * 0.55, -h * 0.45, w * 0.22, -h * 0.52, 0, -h * 0.46); // Subtle central notch
    ctx.bezierCurveTo(-w * 0.22, -h * 0.52, -w * 0.55, -h * 0.45, -w * 0.72, -h * 0.22);
    ctx.bezierCurveTo(-w * 0.85, h * 0.12, -w * 0.42, h * 0.38, 0, h * 0.48);
    ctx.closePath();

    const radGrad = ctx.createRadialGradient(0, 0, 1, 0, -h * 0.05, h * 0.7);
    if (!isUnderside) {
      radGrad.addColorStop(0, '#E11D48');    // Velvety crimson center
      radGrad.addColorStop(0.45, '#BE123C'); // Deep rich rose red
      radGrad.addColorStop(0.82, '#881337'); // Burgundy depth
      radGrad.addColorStop(1, '#4C0519');    // Velvet rim
    } else {
      radGrad.addColorStop(0, '#FB7185');
      radGrad.addColorStop(0.5, '#F43F5E');
      radGrad.addColorStop(1, '#9F1239');
    }
    ctx.fillStyle = radGrad;
    ctx.fill();

    // Velvety sheen along petal curl
    const sheen = ctx.createLinearGradient(-w * 0.4, -h * 0.4, w * 0.4, h * 0.4);
    sheen.addColorStop(0, 'rgba(255, 255, 255, 0.22)');
    sheen.addColorStop(0.4, 'rgba(255, 255, 255, 0.04)');
    sheen.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = sheen;
    ctx.fill();

    // Pale golden-cream petal claw at base attachment
    ctx.beginPath();
    ctx.ellipse(0, h * 0.44, w * 0.15, h * 0.07, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(254, 240, 138, 0.45)';
    ctx.fill();

    ctx.restore();
  };

  const drawButterfly = (ctx, p) => {
    const { species, wingSpan, flapPhase } = p;
    ctx.save();
    const flapWidth = Math.cos(flapPhase);
    const absFlap = Math.max(0.12, Math.abs(flapWidth));

    // Butterfly body: segmented thorax and abdomen
    ctx.beginPath();
    ctx.ellipse(0, 0, wingSpan * 0.07, wingSpan * 0.38, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#0F172A';
    ctx.fill();

    // Head
    ctx.beginPath();
    ctx.arc(0, -wingSpan * 0.38, wingSpan * 0.08, 0, Math.PI * 2);
    ctx.fillStyle = '#1E293B';
    ctx.fill();

    // Delicate antennae with curved tips
    ctx.strokeStyle = '#0F172A';
    ctx.lineWidth = 0.9;
    ctx.beginPath();
    ctx.moveTo(0, -wingSpan * 0.42);
    ctx.quadraticCurveTo(-wingSpan * 0.12, -wingSpan * 0.65, -wingSpan * 0.22, -wingSpan * 0.7);
    ctx.moveTo(0, -wingSpan * 0.42);
    ctx.quadraticCurveTo(wingSpan * 0.12, -wingSpan * 0.65, wingSpan * 0.22, -wingSpan * 0.7);
    ctx.stroke();

    // Antenna clubs
    ctx.fillStyle = '#0F172A';
    ctx.beginPath();
    ctx.arc(-wingSpan * 0.22, -wingSpan * 0.7, 1.3, 0, Math.PI * 2);
    ctx.arc(wingSpan * 0.22, -wingSpan * 0.7, 1.3, 0, Math.PI * 2);
    ctx.fill();

    // Double wings with realistic curvature, veins and margin accents
    const drawHalfWings = (dir) => {
      ctx.save();
      ctx.scale(dir * flapWidth, 1);

      // 1. Hindwing (lower wing)
      ctx.beginPath();
      ctx.moveTo(0, wingSpan * 0.05);
      ctx.bezierCurveTo(wingSpan * 0.38, wingSpan * 0.12, wingSpan * 0.65, wingSpan * 0.42, wingSpan * 0.48, wingSpan * 0.68);
      ctx.bezierCurveTo(wingSpan * 0.28, wingSpan * 0.75, wingSpan * 0.08, wingSpan * 0.52, 0, wingSpan * 0.22);
      ctx.closePath();

      const hindGrad = ctx.createRadialGradient(0, wingSpan * 0.2, 1, wingSpan * 0.3, wingSpan * 0.4, wingSpan * 0.65);
      hindGrad.addColorStop(0, species.accent || '#FDE68A');
      hindGrad.addColorStop(0.48, species.primary);
      hindGrad.addColorStop(1, species.edge || '#0F172A');
      ctx.fillStyle = hindGrad;
      ctx.fill();
      ctx.strokeStyle = species.edge || '#0F172A';
      ctx.lineWidth = 0.6;
      ctx.stroke();

      // 2. Forewing (upper curved leading edge)
      ctx.beginPath();
      ctx.moveTo(0, -wingSpan * 0.12);
      ctx.bezierCurveTo(wingSpan * 0.38, -wingSpan * 0.78, wingSpan * 0.98, -wingSpan * 0.58, wingSpan * 0.88, -wingSpan * 0.06);
      ctx.bezierCurveTo(wingSpan * 0.72, wingSpan * 0.22, wingSpan * 0.26, wingSpan * 0.16, 0, wingSpan * 0.06);
      ctx.closePath();

      const foreGrad = ctx.createRadialGradient(0, -wingSpan * 0.1, 2, wingSpan * 0.42, -wingSpan * 0.28, wingSpan * 0.88);
      foreGrad.addColorStop(0, species.accent || '#FEF08A');
      foreGrad.addColorStop(0.42, species.primary);
      foreGrad.addColorStop(0.82, species.secondary || species.primary);
      foreGrad.addColorStop(1, species.edge || '#0F172A');
      ctx.fillStyle = foreGrad;
      ctx.fill();
      ctx.strokeStyle = species.edge || '#0F172A';
      ctx.lineWidth = 0.7;
      ctx.stroke();

      // Delicate natural wing veins
      ctx.strokeStyle = 'rgba(15, 23, 42, 0.35)';
      ctx.lineWidth = 0.55;
      ctx.beginPath();
      ctx.moveTo(0, -wingSpan * 0.1);
      ctx.quadraticCurveTo(wingSpan * 0.38, -wingSpan * 0.32, wingSpan * 0.78, -wingSpan * 0.16);
      ctx.moveTo(0, -wingSpan * 0.1);
      ctx.quadraticCurveTo(wingSpan * 0.42, -wingSpan * 0.48, wingSpan * 0.68, -wingSpan * 0.52);
      ctx.stroke();

      // Crisp margin spots for Monarch and Swallowtail authenticity
      if (species.name === 'Monarch' || species.name === 'Swallowtail') {
        ctx.fillStyle = '#FFFFFF';
        for (let s = 1; s <= 3; s++) {
          const t = s / 4;
          const sx = wingSpan * (0.7 + t * 0.14);
          const sy = -wingSpan * (0.12 + t * 0.32);
          ctx.beginPath();
          ctx.arc(sx, sy, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.restore();
    };

    drawHalfWings(1);
    drawHalfWings(-1);
    ctx.restore();
  };

  // ==========================================================================
  // REALISTIC ANIMAL & BIRD DRAWING FUNCTIONS (PHOTOGRAPHIC SPRITES)
  // ==========================================================================

  // 1. CROW: Photographic avian flight with thermal soaring, banking tilt, and motion blur trail
  const drawCrow = (ctx, e) => {
    ctx.save();
    const size = e.size;

    // Multi-frame wing flap cycle
    const flapCycle = ['crow_f1', 'crow_f2', 'crow_f3', 'crow_f4', 'crow_f5', 'crow_f4', 'crow_f3', 'crow_f2'];
    const glideBlend = e.glideTransition || 0;
    const effectiveFlapSpeed = e.flapSpeed * (1 - glideBlend * 0.85);
    const frameIdx = Math.floor(e.flapPhase * 2.2) % flapCycle.length;
    const frameKey = flapCycle[frameIdx];
    const glideFrame = getAsset('crow_f3');
    const flapFrame = getAsset(frameKey);
    const img = (glideBlend > 0.7 ? glideFrame : flapFrame) || getAsset('crow');

    // Realistic banking tilt — smoothly interpolated
    const bankAngle = (e.bankAngle || 0) * e.direction;
    // Lift oscillation from wing beats (reduced during glide)
    const flapLift = Math.cos(e.flapPhase) * 6 * (1 - glideBlend * 0.8);
    // Thermal altitude wave
    const thermalLift = Math.sin(e.thermalPhase || 0) * 12;

    ctx.scale(e.direction, 1);
    ctx.rotate(bankAngle);

    if (img && img.complete && img.naturalWidth > 0) {
      const aspect = img.naturalHeight / img.naturalWidth;
      const w = size;
      const h = size * aspect;

      // Dynamic ground shadow — shrinks at higher altitude, stretches during banking
      ctx.save();
      const shadowSpread = w * 0.32 + Math.abs(bankAngle) * 30;
      const shadowY = 220 - thermalLift * 0.5;
      ctx.beginPath();
      ctx.ellipse(0, shadowY, shadowSpread, 10 + Math.abs(thermalLift) * 0.2, bankAngle * 0.3, 0, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(20, 69, 47, ${0.08 + Math.abs(thermalLift) * 0.002})`;
      ctx.fill();
      ctx.restore();

      // Motion blur trail — 2 semi-transparent afterimages
      if (e.trailPositions && e.trailPositions.length >= 2) {
        for (let ti = 0; ti < Math.min(2, e.trailPositions.length); ti++) {
          ctx.save();
          ctx.globalAlpha = 0.08 - ti * 0.03;
          const trail = e.trailPositions[ti];
          const dx = (trail.x - e.x) * e.direction;
          const dy = trail.y - e.y;
          ctx.translate(dx * 0.15, dy * 0.15);
          ctx.drawImage(img, -w / 2, -h / 2 + flapLift + thermalLift, w, h);
          ctx.restore();
        }
      }

      ctx.drawImage(img, -w / 2, -h / 2 + flapLift + thermalLift, w, h);
    } else {
      ctx.beginPath();
      ctx.ellipse(0, flapLift, size * 0.38, size * 0.2, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#111827';
      ctx.fill();
    }
    ctx.restore();
  };

  // 2. SPARROW: Burst-glide flight with rapid flutter, undulating wave path, and head bob
  const drawSparrow = (ctx, e) => {
    ctx.save();
    const size = e.size;
    const img = getAsset('sparrow');

    // Burst-glide: during 'flap' burst, wings beat rapidly with body pitch down
    // during 'coast', wings mostly still and body pitches up in ballistic arc
    const isBursting = e.burstPhase === 'flap';
    const burstIntensity = isBursting ? 1.0 : 0.15;

    // Pitch along wave flight path — steeper during active flapping
    const pitch = Math.cos(e.waveTimer * 3.2) * (isBursting ? 0.22 : 0.12);
    // Wing beat deformation — pronounced during bursts, subtle during coast
    const flapScaleY = 0.85 + Math.cos(e.flapPhase) * 0.25 * burstIntensity;
    const flapScaleX = 1.06 - Math.cos(e.flapPhase) * 0.1 * burstIntensity;
    // Head bob during active flight
    const headBobY = isBursting ? Math.abs(Math.sin(e.flapPhase * 1.5)) * 3 : 0;

    ctx.scale(e.direction * flapScaleX, flapScaleY);
    ctx.rotate(pitch * e.direction);

    if (img && img.complete && img.naturalWidth > 0) {
      const aspect = img.naturalHeight / img.naturalWidth;
      const w = size;
      const h = size * aspect;

      // Soft ground shadow beneath
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(0, 190, w * 0.3, 8, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(20, 69, 47, 0.07)';
      ctx.fill();
      ctx.restore();

      // Motion blur trail for fast burst phase
      if (isBursting && e.trailPositions && e.trailPositions.length > 0) {
        ctx.save();
        ctx.globalAlpha = 0.06;
        const trail = e.trailPositions[0];
        const dx = (trail.x - e.x) * e.direction * 0.12;
        ctx.translate(dx, 0);
        ctx.drawImage(img, -w / 2, -h / 2 - headBobY, w, h);
        ctx.restore();
      }

      ctx.drawImage(img, -w / 2, -h / 2 - headBobY, w, h);
    } else {
      ctx.beginPath();
      ctx.ellipse(0, 0, size * 0.35, size * 0.22, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#92400E';
      ctx.fill();
    }
    ctx.restore();
  };

  // 3. COW: 4-phase quadruped gait with head sway, breathing, torso heave, and dust puffs
  const drawCow = (ctx, e) => {
    ctx.save();
    const size = e.size;
    const img = getAsset('cow');

    // 4-phase quadruped stride cycle: lift-swing-plant-push
    const stridePhase = e.stridePhase || 0;
    const walkBob = Math.abs(Math.sin(stridePhase * 2)) * 8;
    const walkPitch = Math.sin(stridePhase) * 0.025;

    // Breathing expansion
    const breathScale = 1 + Math.sin(e.breathPhase || 0) * 0.012;
    const walkSquash = breathScale + Math.sin(stridePhase * 2) * 0.018;

    // Head sway — independent of body, slightly delayed
    const headOffsetX = Math.sin(stridePhase * 0.8 + 0.5) * 3;
    const headOffsetY = Math.abs(Math.sin(stridePhase * 1.6)) * 3;

    ctx.scale(e.direction * walkSquash, (2 - walkSquash));
    ctx.rotate(walkPitch * e.direction);

    if (img && img.complete && img.naturalWidth > 0) {
      const aspect = img.naturalHeight / img.naturalWidth;
      const w = size;
      const h = size * aspect;

      // Dynamic ground contact shadow — stretches during stride push phase
      ctx.save();
      const shadowStretch = w * 0.46 + Math.sin(stridePhase * 2) * 6;
      ctx.beginPath();
      ctx.ellipse(0, h * 0.42, shadowStretch, 16 + Math.abs(Math.sin(stridePhase)) * 4, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(20, 69, 47, 0.3)';
      ctx.fill();
      ctx.restore();

      // Dust puff particles on stride impact
      if (e.dustParticles && e.dustParticles.length > 0) {
        for (const dp of e.dustParticles) {
          ctx.save();
          ctx.globalAlpha = dp.opacity;
          ctx.beginPath();
          ctx.arc(dp.x - e.x * (1 - e.direction) * 0.5, dp.y + h * 0.38, dp.size, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(180, 160, 120, 0.35)';
          ctx.fill();
          ctx.restore();
        }
      }

      ctx.drawImage(img, -w / 2 + headOffsetX * 0.15, -h / 2 - walkBob - headOffsetY * 0.2, w, h);
    } else {
      ctx.beginPath();
      ctx.ellipse(0, -walkBob, size * 0.4, size * 0.25, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#78350F';
      ctx.fill();
    }
    ctx.restore();
  };

  // 4. FROG: Coil-spring anticipation, ballistic arc with apex hang, landing squash with bounce recovery
  const drawFrog = (ctx, e) => {
    ctx.save();
    const size = e.size;
    const img = getAsset('frog');

    let scaleX = 1;
    let scaleY = 1;
    let tilt = 0;

    if (e.state === 'idle') {
      // Resting breathing with throat pulse
      const breath = Math.sin(e.pulsePhase || 0) * 0.035;
      const throat = Math.abs(Math.sin((e.throatPulse || 0) * 3)) * 0.02;
      scaleX = 1.02 - breath + throat;
      scaleY = 0.98 + breath;
    } else if (e.state === 'coil') {
      // Anticipation squash — progressive compression before launch
      const coil = e.coilProgress || 0;
      scaleX = 1 + coil * 0.25;
      scaleY = 1 - coil * 0.22;
    } else if (e.state === 'leap') {
      // Airborne stretch — elongated body along trajectory
      const speed = Math.sqrt((e.vx || 0) ** 2 + (e.vy || 0) ** 2);
      const stretchFactor = Math.min(0.3, speed * 0.035);
      scaleX = 0.8 - stretchFactor * 0.3;
      scaleY = 1.2 + stretchFactor;
      tilt = Math.atan2(e.vy, Math.abs(e.vx) || 1) * 0.6;
    } else if (e.state === 'land') {
      // Landing squash with bounce recovery
      const bounce = e.landBounce || 0;
      scaleX = 1.2 - bounce * 0.15;
      scaleY = 0.78 + bounce * 0.18;
    }

    ctx.scale(e.direction * scaleX, scaleY);
    ctx.rotate(tilt * e.direction);

    if (img && img.complete && img.naturalWidth > 0) {
      const aspect = img.naturalHeight / img.naturalWidth;
      const w = size;
      const h = size * aspect;

      // Dynamic ground shadow — shrinks at apex, expands with squash on landing
      ctx.save();
      const heightAboveGround = Math.max(0, (e.groundY || 0) - e.y);
      const shadowScale = Math.max(0.25, 1 - heightAboveGround / 150);
      const shadowY = heightAboveGround + h * 0.36;
      ctx.beginPath();
      ctx.ellipse(0, shadowY, w * 0.42 * shadowScale, 14 * shadowScale, 0, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(20, 69, 47, ${0.3 * shadowScale})`;
      ctx.fill();
      ctx.restore();

      // Dust puff on landing
      if (e.dustParticles && e.dustParticles.length > 0) {
        for (const dp of e.dustParticles) {
          ctx.save();
          ctx.globalAlpha = dp.opacity;
          ctx.beginPath();
          ctx.arc(dp.x, dp.y + h * 0.34, dp.size, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(140, 130, 100, 0.4)';
          ctx.fill();
          ctx.restore();
        }
      }

      ctx.drawImage(img, -w / 2, -h / 2, w, h);
    } else {
      ctx.beginPath();
      ctx.ellipse(0, 0, size * 0.38, size * 0.28, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#15803D';
      ctx.fill();
    }
    ctx.restore();
  };

  // 5. SQUIRREL: Gallop rhythm with spine arch, nervous pauses with head turns, bushy tail counter-sway
  const drawSquirrel = (ctx, e) => {
    ctx.save();
    const size = e.size;
    const img = getAsset('squirrel');

    let bobY = 0;
    let flexX = 1;
    let flexY = 1;
    let tilt = 0;

    if (e.isPaused) {
      // Alert upright pose with nervous head turn
      tilt = -0.14 + Math.sin(e.tailPhase * 2.5) * 0.025;
      const headTurnEffect = (e.headTurn || 0) * 0.04;
      tilt += headTurnEffect;
      bobY = Math.sin(e.tailPhase * 3) * 1.5;
    } else {
      // Gallop: fast-fast-float rhythm
      const gallopWave = Math.sin(e.gallopPhase || 0);
      bobY = Math.abs(gallopWave) * 12;
      
      // Spine arch/flatten cycle
      const spineArch = e.spineArch || 0;
      flexX = 1 + spineArch * 0.15;
      flexY = 1 - spineArch * 0.1;
      tilt = 0.08 + spineArch * 0.04;
    }

    ctx.scale(e.direction * flexX, flexY);
    ctx.rotate(tilt * e.direction);

    if (img && img.complete && img.naturalWidth > 0) {
      const aspect = img.naturalHeight / img.naturalWidth;
      const w = size;
      const h = size * aspect;

      // Ground contact shadow — lifts during gallop bounce
      ctx.save();
      const shadowLift = e.isPaused ? 0 : bobY * 0.3;
      ctx.beginPath();
      ctx.ellipse(0, h * 0.42 + shadowLift, w * 0.4 - shadowLift * 0.5, 13 - shadowLift * 0.4, 0, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(20, 69, 47, ${0.27 - shadowLift * 0.008})`;
      ctx.fill();
      ctx.restore();

      // Dust puff during gallop
      if (e.dustParticles && e.dustParticles.length > 0) {
        for (const dp of e.dustParticles) {
          ctx.save();
          ctx.globalAlpha = dp.opacity;
          ctx.beginPath();
          ctx.arc(dp.x - e.x * 0.1, dp.y + h * 0.38, dp.size, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(180, 160, 120, 0.3)';
          ctx.fill();
          ctx.restore();
        }
      }

      ctx.drawImage(img, -w / 2, -h / 2 - bobY, w, h);
    } else {
      ctx.beginPath();
      ctx.ellipse(0, -bobY, size * 0.38, size * 0.24, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#92400E';
      ctx.fill();
    }
    ctx.restore();
  };

  // 6. ANT: Tripod gait body wobble, antennae sweep, and curving path
  const drawAnt = (ctx, e) => {
    ctx.save();
    const size = e.size;
    const img = getAsset('ant');

    // Tripod gait: alternating 3-leg groups create a visible body rock
    const tripodRock = Math.sin((e.tripodPhase || 0) * 2) * 0.06;
    const bodyRock = Math.sin((e.bodyRock || 0)) * 1.8;
    const yaw = Math.sin(e.walkPhase * 1.8) * 0.05;

    ctx.scale(e.direction, 1);
    ctx.rotate((yaw + tripodRock) * e.direction);

    if (img && img.complete && img.naturalWidth > 0) {
      const aspect = img.naturalHeight / img.naturalWidth;
      const w = size;
      const h = size * aspect;

      // Ground shadow
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(0, h * 0.38, w * 0.42, 8, yaw * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(20, 69, 47, 0.22)';
      ctx.fill();
      ctx.restore();

      ctx.drawImage(img, -w / 2, -h / 2 + bodyRock, w, h);
    } else {
      ctx.beginPath();
      ctx.ellipse(0, bodyRock, size * 0.38, size * 0.2, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#18181B';
      ctx.fill();
    }
    ctx.restore();
  };

  // ==========================================================================
  // MAIN ANIMATION & UPDATE LOOP
  // ==========================================================================

  const updateAndRender = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      isRunningRef.current = false;
      return;
    }

    const ctx = canvas.getContext('2d');
    const dpr = getDPR();
    const width = canvas.width / dpr || window.innerWidth;
    const height = canvas.height / dpr || window.innerHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(dpr, dpr);

    const activeParticles = [];
    const currentTypes = activeTypesRef.current;

    // 1. UPDATE & RENDER BOTANICAL PARTICLES (AERODYNAMIC FLUTTER & GLIDE)
    const nowSec = Date.now() * 0.001;
    const ambientBreeze = Math.sin(nowSec * 0.7) * 0.35 + 0.18;

    for (let i = 0; i < particlesRef.current.length; i++) {
      const p = particlesRef.current[i];
      p.life++;

      if (p.type === 'botanical') {
        p.flutterPhase += p.flutterSpeed;
        p.rollPhase += p.rollSpeed;
        p.pitchPhase += p.pitchSpeed;

        // Aerodynamic pendulum banking tilt
        const tilt = Math.sin(p.flutterPhase) * p.flutterAmp;
        p.glideAngle = tilt;

        // Aerodynamic horizontal lift along tilt direction
        const horizontalLift = -Math.sin(tilt) * p.glideSpeed * 1.6;
        const targetVx = horizontalLift + ambientBreeze + p.driftVx;
        p.vx = (p.vx || 0) * 0.93 + targetVx * 0.07;

        // Vertical descent: air resistance is higher when broadside, lower when edge-on
        const rollCosine = Math.cos(p.rollPhase);
        const flatness = Math.abs(rollCosine);
        const dragFactor = 0.85 + (1 - flatness) * 0.95;
        const targetVy = p.baseDescent * dragFactor;
        p.vy = (p.vy || 0) * 0.92 + targetVy * 0.08;

        p.x += p.vx * p.depth;
        p.y += p.vy * p.depth;

        // Edge wrapping / natural respawn
        if (p.isAmbient) {
          if (p.y > height + 45) {
            p.y = -35 - Math.random() * 40;
            p.x = Math.random() * width;
            p.flutterPhase = Math.random() * Math.PI * 2;
            p.rollPhase = Math.random() * Math.PI * 2;
            p.pitchPhase = Math.random() * Math.PI * 2;
            p.opacity = 1;
            if (currentTypes && currentTypes.length > 0) {
              p.botanicalType = currentTypes[Math.floor(Math.random() * currentTypes.length)];
            }
          }
          if (p.x < -60) p.x = width + 40;
          if (p.x > width + 60) p.x = -40;
        } else {
          if (p.life > p.maxLife - 40) {
            p.opacity = Math.max(0, (p.maxLife - p.life) / 40);
          }
        }

        if (p.opacity > 0 && p.y < height + 50) {
          ctx.save();
          ctx.translate(p.x, p.y);

          // Realistic heading: leaf turns naturally into its glide trajectory
          const heading = tilt * 0.65 + p.yawAngle + Math.sin(p.pitchPhase) * 0.12;
          ctx.rotate(heading);

          // 3D perspective projection (roll around midrib, pitch along length)
          const isUnderside = rollCosine < 0;
          const visualRoll = Math.sign(rollCosine || 1) * Math.max(0.14, Math.abs(rollCosine));
          const visualPitch = 1.0 - Math.abs(Math.sin(p.pitchPhase)) * 0.14;

          ctx.scale(visualRoll * p.depth, visualPitch * p.depth);
          ctx.globalAlpha = p.opacity;

          // Soft volumetric 3D ambient shadow onto the scene behind the leaf
          ctx.shadowColor = 'rgba(15, 55, 30, 0.14)';
          ctx.shadowBlur = 9 * p.depth;
          ctx.shadowOffsetX = 3 * p.depth;
          ctx.shadowOffsetY = 6 * p.depth;

          if (p.botanicalType === 'neem') {
            drawNeemLeaflet(ctx, p.size, isUnderside, visualRoll);
          } else if (p.botanicalType === 'peepal') {
            drawPeepalLeaf(ctx, p.size, isUnderside, visualRoll);
          } else if (p.botanicalType === 'tulsi') {
            drawTulsiLeaf(ctx, p.size, isUnderside, visualRoll);
          } else if (p.botanicalType === 'jasmine') {
            drawJasmineFlower(ctx, p.size, isUnderside, visualRoll);
          } else if (p.botanicalType === 'jasmine_petal') {
            drawJasminePetal(ctx, p.size, isUnderside, visualRoll);
          } else if (p.botanicalType === 'rose_petal') {
            drawRosePetal(ctx, p.size, isUnderside, visualRoll);
          }

          ctx.restore();
          activeParticles.push(p);
        }
      } else if (p.type === 'butterfly') {
        p.swoopPhase += p.swoopSpeed;
        p.flapPhase += p.flapSpeed;
        p.x += p.vx + Math.sin(p.swoopPhase) * 1.8;
        p.y += p.vy;

        if (p.life > p.maxLife - 40) {
          p.opacity = Math.max(0, (p.maxLife - p.life) / 40);
        }

        if (p.opacity > 0 && p.y > -60 && p.x > -60 && p.x < width + 60) {
          ctx.save();
          ctx.translate(p.x, p.y);
          const flightAngle = Math.atan2(p.vy, p.vx + Math.sin(p.swoopPhase) * 1.8) + Math.PI / 2;
          ctx.rotate(flightAngle * 0.35);
          ctx.globalAlpha = p.opacity;

          drawButterfly(ctx, p);
          ctx.restore();
          activeParticles.push(p);
        }
      }
    }

    particlesRef.current = activeParticles;

    // 2. UPDATE & RENDER REALISTIC ANIMAL/BIRD LOCOMOTION
    const animal = animalEntityRef.current;
    if (animal) {
      if (animal.exiting) {
        animal.opacity = Math.max(0, animal.opacity - 0.035);
      }

      ctx.save();
      ctx.globalAlpha = animal.opacity;

      if (animal.species === 'crow') {
        // --- CROW: Thermal soaring with smooth banking transitions ---
        animal.thermalPhase = (animal.thermalPhase || 0) + 0.018;
        animal.swoopPhase += 0.03;
        
        // Thermal altitude wave — slow undulation simulating thermals
        animal.altitudeWave = Math.sin(animal.thermalPhase) * 15;
        animal.y = animal.baseY + animal.altitudeWave + Math.sin(animal.swoopPhase * 1.5) * 3;

        // Glide/flap state machine with smooth transitions
        animal.glideCountdown--;
        if (animal.glideCountdown <= 0) {
          animal.isGliding = !animal.isGliding;
          animal.glideCountdown = animal.isGliding ? 70 + Math.random() * 30 : 50 + Math.random() * 20;
          // Set target bank angle on state change
          animal.targetBankAngle = (Math.random() - 0.5) * 0.12;
        }

        // Smooth glide transition blend (0 = full flap, 1 = full glide)
        if (animal.isGliding) {
          animal.glideTransition = Math.min(1, (animal.glideTransition || 0) + 0.04);
        } else {
          animal.glideTransition = Math.max(0, (animal.glideTransition || 0) - 0.06);
        }

        // Flap speed modulated by glide blend
        const effectiveFlapSpeed = animal.flapSpeed * (1 - (animal.glideTransition || 0) * 0.85);
        animal.flapPhase += effectiveFlapSpeed;

        // Smooth banking interpolation
        animal.bankAngle = (animal.bankAngle || 0) + ((animal.targetBankAngle || 0) - (animal.bankAngle || 0)) * 0.03;

        // Variable speed — slightly faster during flapping
        const glideSpeedMod = 1 - (animal.glideTransition || 0) * 0.15;
        animal.x += animal.vx * glideSpeedMod;

        // Trail positions for motion blur
        if (!animal.trailPositions) animal.trailPositions = [];
        animal.trailPositions.unshift({ x: animal.x, y: animal.y });
        if (animal.trailPositions.length > 4) animal.trailPositions.pop();

        if (!animal.exiting) {
          if (animal.direction === 1 && animal.x > width + 150) {
            animal.x = -130;
          } else if (animal.direction === -1 && animal.x < -150) {
            animal.x = width + 130;
          }
        }

        ctx.translate(animal.x, animal.y);
        drawCrow(ctx, animal);

      } else if (animal.species === 'sparrow') {
        // --- SPARROW: Burst-glide flight with rapid flutter bursts ---
        animal.waveTimer += 0.06;
        
        // Burst-glide state machine
        if (animal.burstPhase === 'flap') {
          animal.burstFlapCount = (animal.burstFlapCount || 0) + 1;
          animal.flapPhase += animal.flapSpeed;
          animal.headBob = Math.abs(Math.sin(animal.flapPhase * 1.5)) * 3;
          
          // Nose-down pitch during active flapping, lose altitude
          animal.vy = 0.3;
          
          if (animal.burstFlapCount > 18 + Math.random() * 8) {
            animal.burstPhase = 'coast';
            animal.burstFlapCount = 0;
            animal.burstTimer = 0;
          }
        } else {
          // Coast phase — wings mostly still, ballistic rise
          animal.burstTimer = (animal.burstTimer || 0) + 1;
          animal.flapPhase += animal.flapSpeed * 0.15;
          animal.headBob *= 0.9;
          
          // Pitch up during coast, gain altitude
          animal.vy = -0.4;
          
          if (animal.burstTimer > 12 + Math.random() * 6) {
            animal.burstPhase = 'flap';
            animal.burstTimer = 0;
          }
        }

        animal.x += animal.vx;
        animal.y += animal.vy;
        // Undulating wave pattern overlay
        animal.y += Math.sin(animal.waveTimer * 3.0) * 0.6;
        // Clamp y to flight corridor
        animal.y = Math.max(animal.baseY - 35, Math.min(animal.baseY + 35, animal.y));

        // Trail for motion blur
        if (!animal.trailPositions) animal.trailPositions = [];
        animal.trailPositions.unshift({ x: animal.x, y: animal.y });
        if (animal.trailPositions.length > 3) animal.trailPositions.pop();

        if (!animal.exiting) {
          if (animal.direction === 1 && animal.x > width + 100) {
            animal.x = -80;
          } else if (animal.direction === -1 && animal.x < -100) {
            animal.x = width + 80;
          }
        }

        ctx.translate(animal.x, animal.y);
        drawSparrow(ctx, animal);

      } else if (animal.species === 'cow') {
        // --- COW: 4-phase quadruped gait with dust and breathing ---
        animal.x += animal.vx;
        animal.stridePhase = (animal.stridePhase || 0) + animal.walkSpeed;
        animal.walkPhase += animal.walkSpeed;
        animal.tailPhase += 0.06;
        animal.headPhase += 0.065;
        animal.breathPhase = (animal.breathPhase || 0) + 0.025;
        animal.earFlickTimer = (animal.earFlickTimer || 0) + 1;

        // Head sway — delayed pendulum motion
        animal.headSwayX = Math.sin(animal.headPhase * 0.7 + 0.5) * 3;
        animal.headSwayY = Math.abs(Math.sin(animal.headPhase * 1.4)) * 2.5;

        // Spawn dust particles on stride impact (when sin crosses zero going positive)
        if (!animal.dustParticles) animal.dustParticles = [];
        const prevStride = Math.sin((animal.stridePhase - animal.walkSpeed) * 2);
        const currStride = Math.sin(animal.stridePhase * 2);
        if (prevStride < 0 && currStride >= 0) {
          for (let di = 0; di < 3; di++) {
            animal.dustParticles.push({
              x: (Math.random() - 0.5) * 30,
              y: (Math.random() - 0.5) * 5,
              vx: (Math.random() - 0.5) * 1.5,
              vy: -Math.random() * 0.8,
              size: 3 + Math.random() * 4,
              opacity: 0.4 + Math.random() * 0.2,
              life: 0
            });
          }
        }
        // Update dust particles
        animal.dustParticles = animal.dustParticles.filter(dp => {
          dp.x += dp.vx;
          dp.y += dp.vy;
          dp.vy += 0.02;
          dp.size *= 1.02;
          dp.life++;
          dp.opacity -= 0.015;
          return dp.opacity > 0 && dp.life < 30;
        });

        if (!animal.exiting) {
          if (animal.x > width + 180) {
            animal.x = -180;
          }
        }

        ctx.translate(animal.x, animal.y);
        drawCow(ctx, animal);

      } else if (animal.species === 'frog') {
        // --- FROG: idle → coil → leap → land state machine ---
        animal.pulsePhase = (animal.pulsePhase || 0) + 0.08;
        animal.throatPulse = (animal.throatPulse || 0) + 0.06;

        if (animal.state === 'idle') {
          // Breathing, waiting for next jump
          animal.stateTimer--;
          if (animal.stateTimer <= 0) {
            animal.state = 'coil';
            animal.coilProgress = 0;
            animal.stateTimer = 18;
          }
        } else if (animal.state === 'coil') {
          // Anticipation squash — progressively compresses before launch
          animal.coilProgress = Math.min(1, (animal.coilProgress || 0) + 0.06);
          animal.stateTimer--;
          if (animal.stateTimer <= 0) {
            // Launch!
            animal.state = 'leap';
            animal.vy = -7.5 - Math.random() * 1.5;
            animal.vx = 4.5 + Math.random() * 2;
          }
        } else if (animal.state === 'leap') {
          // Ballistic arc with gravity
          animal.x += animal.vx;
          animal.y += animal.vy;
          animal.vy += 0.34;

          if (animal.y >= animal.groundY) {
            animal.y = animal.groundY;
            animal.state = 'land';
            animal.landBounce = 1.0;
            animal.landBounceVel = -0.12;
            animal.vx = 0;
            animal.vy = 0;
            animal.jumpCount = (animal.jumpCount || 0) + 1;

            // Spawn landing dust
            if (!animal.dustParticles) animal.dustParticles = [];
            for (let di = 0; di < 5; di++) {
              animal.dustParticles.push({
                x: (Math.random() - 0.5) * 20,
                y: (Math.random() - 0.5) * 4,
                vx: (Math.random() - 0.5) * 2,
                vy: -Math.random() * 1.2,
                size: 2 + Math.random() * 4,
                opacity: 0.5 + Math.random() * 0.2,
                life: 0
              });
            }
          }
        } else if (animal.state === 'land') {
          // Landing squash with bounce recovery (spring damping)
          animal.landBounce += animal.landBounceVel;
          animal.landBounceVel += (0 - animal.landBounce) * 0.15;
          animal.landBounceVel *= 0.85;

          if (Math.abs(animal.landBounce) < 0.02 && Math.abs(animal.landBounceVel) < 0.01) {
            animal.state = 'idle';
            animal.stateTimer = 25 + Math.random() * 20;
          }
        }

        // Update dust particles
        if (animal.dustParticles) {
          animal.dustParticles = animal.dustParticles.filter(dp => {
            dp.x += dp.vx;
            dp.y += dp.vy;
            dp.vy += 0.03;
            dp.size *= 1.03;
            dp.life++;
            dp.opacity -= 0.02;
            return dp.opacity > 0 && dp.life < 25;
          });
        }

        if (!animal.exiting) {
          if (animal.x > width + 100) {
            animal.x = -50;
          }
        }

        ctx.translate(animal.x, animal.y);
        drawFrog(ctx, animal);

      } else if (animal.species === 'squirrel') {
        // --- SQUIRREL: Gallop rhythm with pauses and nervous head turns ---
        if (animal.isPaused) {
          animal.pauseDuration--;
          animal.tailPhase += 0.12;
          
          // Nervous head turn during pause
          animal.headTurn = (animal.headTurn || 0) + ((animal.headTurnTarget || 0) - (animal.headTurn || 0)) * 0.08;
          if (Math.abs(animal.headTurn - (animal.headTurnTarget || 0)) < 0.1) {
            animal.headTurnTarget = (Math.random() - 0.5) * 2;
          }

          if (animal.pauseDuration <= 0) {
            animal.isPaused = false;
            animal.pauseTimer = 70 + Math.random() * 60;
            animal.headTurn = 0;
            animal.headTurnTarget = 0;
          }
        } else {
          animal.x += animal.vx;
          animal.runPhase += animal.runSpeed;
          animal.tailPhase += 0.22;
          animal.pauseTimer--;

          // Gallop phase — asymmetric bounce (fast-fast-float)
          animal.gallopPhase = (animal.gallopPhase || 0) + 0.38;
          // Spine arch cycles with gallop
          animal.spineArch = Math.sin(animal.gallopPhase * 0.8) * 0.5 + 0.5;

          // Spawn dust on gallop impact
          if (!animal.dustParticles) animal.dustParticles = [];
          const gallopWave = Math.sin(animal.gallopPhase);
          const prevGallop = Math.sin(animal.gallopPhase - 0.38);
          if (prevGallop > 0 && gallopWave <= 0) {
            animal.dustParticles.push({
              x: (Math.random() - 0.5) * 15,
              y: (Math.random() - 0.5) * 3,
              vx: -animal.vx * 0.2 + (Math.random() - 0.5),
              vy: -Math.random() * 0.6,
              size: 2 + Math.random() * 3,
              opacity: 0.3 + Math.random() * 0.15,
              life: 0
            });
          }

          if (animal.pauseTimer <= 0) {
            animal.isPaused = true;
            animal.pauseDuration = 35 + Math.random() * 25;
            animal.spineArch = 0;
          }
        }

        // Update dust particles
        if (animal.dustParticles) {
          animal.dustParticles = animal.dustParticles.filter(dp => {
            dp.x += dp.vx;
            dp.y += dp.vy;
            dp.vy += 0.02;
            dp.size *= 1.015;
            dp.life++;
            dp.opacity -= 0.012;
            return dp.opacity > 0 && dp.life < 25;
          });
        }

        if (!animal.exiting) {
          if (animal.x > width + 120) {
            animal.x = -100;
          }
        }

        ctx.translate(animal.x, animal.y);
        drawSquirrel(ctx, animal);

      } else if (animal.species === 'ant') {
        // --- ANT: Curving path with tripod gait body wobble ---
        animal.walkPhase += animal.walkSpeed;
        animal.antennaPhase = (animal.antennaPhase || 0) + 0.18;
        animal.tripodPhase = (animal.tripodPhase || 0) + animal.walkSpeed * 1.5;
        animal.bodyRock = (animal.bodyRock || 0) + 0.2;

        // Path curvature — ants don't walk perfectly straight
        animal.pathCurveTimer = (animal.pathCurveTimer || 0) + 1;
        if (animal.pathCurveTimer > 40 + Math.random() * 30) {
          animal.pathCurveTarget = (Math.random() - 0.5) * 0.6;
          animal.pathCurveTimer = 0;
        }
        animal.pathCurve = (animal.pathCurve || 0) + ((animal.pathCurveTarget || 0) - (animal.pathCurve || 0)) * 0.03;

        animal.x += animal.vx;
        animal.y = (animal.baseY || animal.y) + Math.sin(animal.walkPhase * 0.5) * 4 + animal.pathCurve * 15;

        if (!animal.exiting) {
          if (animal.x > width + 70) {
            animal.x = -60;
          }
        }

        ctx.translate(animal.x, animal.y);
        drawAnt(ctx, animal);
      }

      ctx.restore();

      if (animal.opacity <= 0) {
        animalEntityRef.current = null;
      }
    }

    ctx.restore();

    if (activeParticles.length > 0 || animalEntityRef.current) {
      animFrameIdRef.current = requestAnimationFrame(updateAndRender);
    } else {
      isRunningRef.current = false;
    }
  };

  const startAnimationLoop = () => {
    if (!isRunningRef.current) {
      isRunningRef.current = true;
      animFrameIdRef.current = requestAnimationFrame(updateAndRender);
    }
  };

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      if (plantStopTimerRef.current) clearTimeout(plantStopTimerRef.current);
      if (animalStopTimerRef.current) clearTimeout(animalStopTimerRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999
      }}
    />
  );
});

export default EcosystemAnimationOverlay;
