import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { sounds } from '../utils/soundEffects';
import {
  RotateCw,
  ZoomIn,
  ZoomOut,
  Sparkles,
  Eye,
  Info,
  CheckCircle2,
  RefreshCw,
  Camera,
  Layers,
  Maximize2,
  Volume2
} from 'lucide-react';

class BotanicalErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error('Botanical 3D Render Error:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#09150e',
          color: '#a7f3d0',
          padding: '1rem',
          textAlign: 'center'
        }}>
          <p style={{ fontWeight: 700 }}>Botanical 3D Viewport encountered a display reset.</p>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false })}
            style={{
              background: '#10b981',
              color: '#ffffff',
              border: 'none',
              padding: '6px 14px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 700
            }}
          >
            Reload Specimen
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// ============================================================================
// HIGH-PRECISION BOTANICAL PROCEDURAL TEXTURE & BUMP GENERATORS
// ============================================================================

// 1. Organic Tree & Shrub Bark Texture with natural vertical fissures and grain
function createBarkTexture(baseColor = '#3a2215', fissureColor = '#170c06', highlightColor = '#523420') {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, 512, 512);

  // Micro vertical wood fibers
  for (let x = 0; x < 512; x += 2) {
    const shade = Math.sin(x * 0.3) * 0.5 + 0.5;
    ctx.fillStyle = shade > 0.55 ? highlightColor : baseColor;
    ctx.globalAlpha = 0.3 + Math.random() * 0.25;
    ctx.fillRect(x, 0, 1.5, 512);
  }

  // Deep longitudinal fissures and bark ridges
  ctx.globalAlpha = 0.85;
  for (let f = 0; f < 38; f++) {
    const startX = Math.random() * 512;
    ctx.strokeStyle = fissureColor;
    ctx.lineWidth = 2 + Math.random() * 4.5;
    ctx.beginPath();
    ctx.moveTo(startX, 0);
    let curX = startX;
    for (let y = 0; y < 512; y += 24) {
      curX += (Math.random() - 0.5) * 14;
      ctx.lineTo(curX, y);
    }
    ctx.stroke();
  }

  // Weathered lichen & lenticel spots
  ctx.globalAlpha = 0.45;
  for (let s = 0; s < 180; s++) {
    const rx = Math.random() * 512;
    const ry = Math.random() * 512;
    ctx.fillStyle = Math.random() > 0.6 ? '#6a7d65' : '#22140a';
    ctx.beginPath();
    ctx.ellipse(rx, ry, 2 + Math.random() * 4, 1 + Math.random() * 2, Math.random(), 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalAlpha = 1.0;
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 4);
  return texture;
}

// Bark Bump Map for tangible 3D wood relief
function createBarkBumpMap() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, 256, 256);

  ctx.strokeStyle = '#202020';
  ctx.lineWidth = 3;
  for (let f = 0; f < 25; f++) {
    const startX = Math.random() * 256;
    ctx.beginPath();
    ctx.moveTo(startX, 0);
    let curX = startX;
    for (let y = 0; y < 256; y += 20) {
      curX += (Math.random() - 0.5) * 10;
      ctx.lineTo(curX, y);
    }
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 4);
  return texture;
}

// 2. Botanical Leaf Texture with midrib, lateral veins, and reticulations
function createLeafTexture(mainColor = '#15803d', veinColor = '#86efac', marginColor = '#14532d', isParallel = false) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Leaf lamina background gradient with waxy cuticle sheen
  const grad = ctx.createLinearGradient(0, 0, 512, 0);
  grad.addColorStop(0, marginColor);
  grad.addColorStop(0.28, mainColor);
  grad.addColorStop(0.5, '#1e9b4b');
  grad.addColorStop(0.72, mainColor);
  grad.addColorStop(1, marginColor);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  if (isParallel) {
    ctx.lineWidth = 1.2;
    for (let x = 12; x < 512; x += 10) {
      const isMidrib = Math.abs(x - 256) < 6;
      ctx.strokeStyle = isMidrib ? veinColor : 'rgba(167, 243, 208, 0.4)';
      ctx.lineWidth = isMidrib ? 3.5 : 1.0;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 512);
      ctx.stroke();
    }
  } else {
    // Primary midrib
    ctx.strokeStyle = veinColor;
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(256, 512);
    ctx.quadraticCurveTo(256, 256, 256, 0);
    ctx.stroke();

    // Secondary lateral veins
    ctx.lineWidth = 2.2;
    ctx.strokeStyle = 'rgba(167, 243, 208, 0.7)';
    for (let y = 40; y < 500; y += 35) {
      ctx.beginPath();
      ctx.moveTo(256, y);
      ctx.quadraticCurveTo(150, y - 22, 25, y - 48);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(256, y + 8);
      ctx.quadraticCurveTo(362, y - 14, 487, y - 40);
      ctx.stroke();

      // Tertiary anastomosing reticulations
      ctx.lineWidth = 0.75;
      ctx.strokeStyle = 'rgba(134, 239, 172, 0.32)';
      for (let t = 0; t < 3; t++) {
        ctx.beginPath();
        ctx.moveTo(200 - t * 40, y - 10);
        ctx.lineTo(210 - t * 40, y - 32);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(312 + t * 40, y);
        ctx.lineTo(322 + t * 40, y - 22);
        ctx.stroke();
      }
      ctx.lineWidth = 2.2;
      ctx.strokeStyle = 'rgba(167, 243, 208, 0.7)';
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// Leaf Bump Map for tactile venation relief
function createLeafBumpMap(isParallel = false) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, 256, 256);

  if (isParallel) {
    for (let x = 8; x < 256; x += 8) {
      const isMid = Math.abs(x - 128) < 4;
      ctx.strokeStyle = isMid ? '#ffffff' : '#b0b0b0';
      ctx.lineWidth = isMid ? 2.5 : 1;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 256);
      ctx.stroke();
    }
  } else {
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(128, 256);
    ctx.lineTo(128, 0);
    ctx.stroke();

    ctx.strokeStyle = '#c8c8c8';
    ctx.lineWidth = 1.8;
    for (let y = 25; y < 250; y += 24) {
      ctx.beginPath();
      ctx.moveTo(128, y);
      ctx.lineTo(15, y - 25);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(128, y);
      ctx.lineTo(240, y - 25);
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// 3. Flower Petal Texture with velvety radial striations & dark throat gradient
function createHibiscusPetalTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Petal gradient from dark crimson base (throat) to rich scarlet margin
  const grad = ctx.createRadialGradient(256, 512, 10, 256, 200, 480);
  grad.addColorStop(0, '#58080d'); // Deep ruby-black throat
  grad.addColorStop(0.2, '#991219');
  grad.addColorStop(0.65, '#dc2626'); // Vivid scarlet corolla
  grad.addColorStop(1, '#ef4444');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  // Micro radial velvet petal veins
  ctx.strokeStyle = '#b91c1c';
  ctx.lineWidth = 1.2;
  ctx.globalAlpha = 0.55;
  for (let angle = -0.7; angle <= 0.7; angle += 0.035) {
    ctx.beginPath();
    ctx.moveTo(256, 500);
    const endX = 256 + Math.sin(angle) * 460;
    const endY = 500 - Math.cos(angle) * 460;
    ctx.quadraticCurveTo(
      256 + Math.sin(angle) * 230 + (Math.random() - 0.5) * 16,
      500 - Math.cos(angle) * 230,
      endX,
      endY
    );
    ctx.stroke();
  }

  ctx.globalAlpha = 1.0;
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// 4. Vogel Fibonacci Spiral Generator for Sunflower Central Disc
function createSunflowerDiscTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#201107';
  ctx.fillRect(0, 0, 512, 512);

  const centerX = 256;
  const centerY = 256;
  const c = 9.4;
  const phi = 137.507764 * (Math.PI / 180);

  for (let n = 0; n < 480; n++) {
    const r = c * Math.sqrt(n);
    if (r > 242) break;
    const theta = n * phi;
    const x = centerX + r * Math.cos(theta);
    const y = centerY + r * Math.sin(theta);

    const ratio = r / 242;
    if (ratio < 0.32) {
      ctx.fillStyle = '#160a04';
    } else if (ratio < 0.72) {
      ctx.fillStyle = '#3d1d08';
    } else {
      ctx.fillStyle = Math.random() > 0.35 ? '#d97706' : '#78350f';
    }

    ctx.beginPath();
    ctx.arc(x, y, 2.0 + ratio * 2.2, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// 5. Potting Soil Loam Texture
function createSoilTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#1c1008';
  ctx.fillRect(0, 0, 256, 256);

  for (let i = 0; i < 750; i++) {
    const x = Math.random() * 256;
    const y = Math.random() * 256;
    const r = 1 + Math.random() * 2.8;
    const val = Math.random();
    ctx.fillStyle = val > 0.88 ? '#7c624d' : val > 0.5 ? '#120904' : '#27150c';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);
  return texture;
}

// 6. Aged Terracotta Planter Texture
function createTerracottaTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#8b4a2b';
  ctx.fillRect(0, 0, 256, 256);

  for (let y = 0; y < 256; y += 4) {
    ctx.fillStyle = Math.random() > 0.5 ? '#9c5432' : '#7a3e23';
    ctx.globalAlpha = 0.25;
    ctx.fillRect(0, y, 256, 3);
  }

  ctx.globalAlpha = 0.15;
  for (let i = 0; i < 90; i++) {
    ctx.fillStyle = '#e2d9d2';
    ctx.beginPath();
    ctx.arc(Math.random() * 256, Math.random() * 256, 1 + Math.random() * 3, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalAlpha = 1.0;
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  return texture;
}

// ============================================================================
// BOTANICALLY REALISTIC 3D GEOMETRY BUILDERS
// ============================================================================

function createCurvedLeafMesh(length, width, mat, curvature = 0.25, tipDroop = 0.18, serrations = 0) {
  const geom = new THREE.PlaneGeometry(width, length, 12, 16);
  const pos = geom.attributes.position;

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);

    const normX = x / (width * 0.5);
    const normY = (y + length * 0.5) / length;

    const contour = Math.sin(normY * Math.PI) * Math.pow(Math.max(0.01, 1.05 - normY * 0.35), 0.55);
    let shapedX = x * Math.max(0.08, contour);

    if (serrations > 0 && Math.abs(normX) > 0.65 && normY > 0.15 && normY < 0.85) {
      const serr = Math.sin(normY * serrations * Math.PI * 2) * (width * 0.045);
      shapedX += normX > 0 ? serr : -serr;
    }
    pos.setX(i, shapedX);

    const keel = -Math.abs(normX) * (width * 0.22 * curvature);
    const droop = -Math.pow(normY, 2.2) * (length * tipDroop);
    pos.setZ(i, keel + droop);
  }

  geom.computeVertexNormals();
  const mesh = new THREE.Mesh(geom, mat);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function createCurvedPetalMesh(width, length, mat, cupDepth = 0.3, reflex = 0.25) {
  const geom = new THREE.PlaneGeometry(width, length, 12, 12);
  const pos = geom.attributes.position;

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const normX = x / (width * 0.5);
    const normY = (y + length * 0.5) / length;

    const contour = Math.sin(normY * Math.PI * 0.85) * (1.1 - normY * 0.2);
    pos.setX(i, x * Math.max(0.1, contour));

    const cup = -Math.sin(normY * Math.PI) * (width * cupDepth);
    const curl = Math.pow(Math.max(0, normY - 0.6) / 0.4, 2.0) * (length * reflex);
    pos.setZ(i, cup + curl);
  }

  geom.computeVertexNormals();
  const mesh = new THREE.Mesh(geom, mat);
  mesh.castShadow = true;
  return mesh;
}

function createThornMesh(mat) {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.bezierCurveTo(0.06, 0.02, 0.08, 0.08, 0.02, 0.16);
  shape.bezierCurveTo(0.01, 0.08, -0.04, 0.02, 0, 0);

  const extrudeSettings = { steps: 2, depth: 0.04, bevelEnabled: true, bevelThickness: 0.01, bevelSize: 0.01, bevelSegments: 2 };
  const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geo.center();
  const mesh = new THREE.Mesh(geo, mat);
  mesh.castShadow = true;
  return mesh;
}

function createGrassBladeMesh(length, baseWidth, mat) {
  const geom = new THREE.PlaneGeometry(baseWidth, length, 4, 14);
  const pos = geom.attributes.position;

  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i);
    const normY = (y + length * 0.5) / length;
    const x = pos.getX(i);

    const taper = Math.max(0.02, 1.0 - normY * 0.95);
    pos.setX(i, x * taper);

    const arch = -Math.pow(normY, 2.4) * (length * 0.45);
    pos.setZ(i, arch);
  }

  geom.computeVertexNormals();
  const mesh = new THREE.Mesh(geom, mat);
  mesh.castShadow = true;
  return mesh;
}

// Creates an organic unopened flower bud (green calyx with swirled scarlet apex)
function createFlowerBudMesh(calyxMat, petalMat) {
  const budGroup = new THREE.Group();

  // Green calyx cup & epicalyx bracts
  const calyxGeo = new THREE.ConeGeometry(0.12, 0.32, 8);
  const calyx = new THREE.Mesh(calyxGeo, calyxMat);
  calyx.position.y = 0.1;
  budGroup.add(calyx);

  // 5 epicalyx bracts
  for (let b = 0; b < 5; b++) {
    const brGeo = new THREE.CylinderGeometry(0.01, 0.02, 0.22, 4);
    const br = new THREE.Mesh(brGeo, calyxMat);
    br.position.set(Math.cos((b / 5) * Math.PI * 2) * 0.1, 0.05, Math.sin((b / 5) * Math.PI * 2) * 0.1);
    br.rotation.z = Math.sin((b / 5) * Math.PI * 2) * 0.3;
    br.rotation.x = Math.cos((b / 5) * Math.PI * 2) * 0.3;
    budGroup.add(br);
  }

  // Tightly swirled crimson petal cone tip
  const petalConeGeo = new THREE.ConeGeometry(0.1, 0.36, 8);
  const petalCone = new THREE.Mesh(petalConeGeo, petalMat);
  petalCone.position.y = 0.28;
  budGroup.add(petalCone);

  return budGroup;
}

// ============================================================================
// MAIN REALISTIC BOTANICAL 3D COMPONENT
// ============================================================================

function RealisticBotanicalModel3DInner({
  plant,
  activeHotspot,
  onSelectHotspot,
  onStemTested,
  onLeafInspected,
  onFlowerInspected
}) {
  const mountRef = useRef(null);
  const [bendForce, setBendForce] = useState(0);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [activeFocus, setActiveFocus] = useState('overview'); // 'overview', 'leaf', 'stem', 'root', 'corolla', 'stamen', 'bud'
  const [viewMode, setViewMode] = useState('3d'); // '3d' or 'reference'

  const targetCameraPos = useRef(new THREE.Vector3(0, 3.2, 7.8));
  const targetLookAt = useRef(new THREE.Vector3(0, 1.7, 0));

  const plantId = plant?.id || 'hibiscus';

  // Botanical classification details
  const specimenBio = useMemo(() => {
    switch (plantId) {
      case 'grass':
        return {
          type: 'Herb',
          latinName: 'Cynodon dactylon (L.) Pers.',
          classification: 'Herb (Annual / Perennial Graminoid)',
          stemTitle: 'Thin, Hollow & Flexible Culm',
          stemDesc: 'Soft, green, photosynthetic culm with visible solid nodes. Bends with high elasticity (up to 45°).',
          maxFlex: 0.65,
          leafTitle: 'Linear Parallel-Veined Blades',
          leafDesc: 'Long narrow leaf blades emerging alternately with parallel veins and distinct sheath joints.',
          flowerTitle: 'Feathery Wind Spikelets',
          flowerDesc: 'Reduced spikelets adapted for wind pollination without brightly colored petals.'
        };
      case 'tulsi':
        return {
          type: 'Herb (Sub-Shrub Base)',
          latinName: 'Ocimum tenuiflorum L.',
          classification: 'Herb / Medicinal Aromatic Sub-Shrub',
          stemTitle: 'Quadrangular Herbaceous Stem',
          stemDesc: 'Characteristic 4-angled stem with purple anthocyanin pigmentation. Flexible near crown, woody at base.',
          maxFlex: 0.35,
          leafTitle: 'Opposite Decussate Leaf Pairs',
          leafDesc: 'Pairs of ovate aromatic leaves arranged at right angles (90°) at each successive node.',
          flowerTitle: 'Purple Verticillaster Spikes',
          flowerDesc: 'Tiered whorls of small bilabiate purple-white blossoms along terminal inflorescence spikes.'
        };
      case 'neem':
        return {
          type: 'Tree',
          latinName: 'Azadirachta indica A. Juss.',
          classification: 'Perennial Broadleaf Tree',
          stemTitle: 'Thick, Hard Brown Woody Trunk',
          stemDesc: 'Massive unbending trunk covered in rough fissured gray-brown bark. Branches begin high up.',
          maxFlex: 0.02,
          leafTitle: 'Imparipinnate Compound Leaves',
          leafDesc: 'Slender rachis carrying 9–15 asymmetric sickle-shaped (falcate) serrated leaflets.',
          flowerTitle: 'Drooping White Panicles',
          flowerDesc: 'Branched clusters of star-shaped white blossoms with sweet honey scent.'
        };
      case 'rose':
        return {
          type: 'Shrub',
          latinName: 'Rosa gallica / Rosa damascena',
          classification: 'Thorny Flowering Shrub',
          stemTitle: 'Prickly Woody Branches',
          stemDesc: 'Stiff woody stems branching near the base armed with sharp curved prickles (thorns).',
          maxFlex: 0.14,
          leafTitle: 'Odd-Pinnate Serrated Leaflets',
          leafDesc: 'Compound leaves of 3–5 serrated oval leaflets with persistent paired stipules at the base.',
          flowerTitle: 'Layered Rosette Bloom',
          flowerDesc: 'Concentric spiral whorls of velvety fragrant petals centered over an urn-shaped green hypanthium.'
        };
      case 'sunflower':
        return {
          type: 'Herb (Tall)',
          latinName: 'Helianthus annuus L.',
          classification: 'Tall Annual Herb',
          stemTitle: 'Stout, Bristly Herbaceous Stem',
          stemDesc: 'Tall solid green stem covered in tiny bristly hairs (trichomes) and vertical ribs. Stiff yet herbaceous.',
          maxFlex: 0.22,
          leafTitle: 'Broad Cordate (Heart) Leaves',
          leafDesc: 'Large rough-textured triangular leaves with 3 prominent basilar veins and wavy margins.',
          flowerTitle: 'Fibonacci Disc & Golden Rays',
          flowerDesc: 'Hundreds of dark disc florets spiraling at 137.5° surrounded by radiant golden ray petals.'
        };
      case 'hibiscus':
      default:
        return {
          type: 'Shrub',
          latinName: 'Hibiscus rosa-sinensis L.',
          classification: 'Flowering Woody Shrub',
          stemTitle: 'Woody Stem & Nodal Architecture',
          stemDesc: 'Woody cylindrical stem with rough brown-grey bark at the base, transitioning to green shoots. Nodes carry petiole junctions and axillary stipules.',
          maxFlex: 0.12,
          leafTitle: 'Glossy Serrated Reticulate Leaf',
          leafDesc: 'Dark green ovate leaves with prominent sunken primary midrib, arching secondary veins, acute tooth serrations, and waxy protective cuticle.',
          flowerTitle: 'Showy Crimson Velvet Corolla',
          flowerDesc: 'Five large overlapping velvety scarlet petals with ruffled margins radiating from a deep ruby throat, adapted to attract pollinators.',
          stamenTitle: 'Staminal Column & Reproductive Organs',
          stamenDesc: 'Monadelphous staminal tube fused around the style, densely studded with golden pollen anthers, topped by 5 velvety crimson stigma lobes.',
          budTitle: 'Swirled Flower Bud & Calyx',
          budDesc: 'Conical green calyx and epicalyx enclosing and protecting tightly swirled young crimson petals prior to anthesis.',
          rootTitle: 'Taproot & Lateral Root Anchor',
          rootDesc: 'Deep anchoring central taproot with extensive lateral rootlets embedded in dark organic soil for moisture and mineral absorption.'
        };
    }
  }, [plantId]);

  // Handle focus switching with smooth camera interpolation
  const handleFocusChange = (focusId) => {
    setActiveFocus(focusId);
    sounds.playPop();

    if (focusId === 'overview') {
      targetCameraPos.current.set(0, 3.2, 7.8);
      targetLookAt.current.set(0, 1.7, 0);
      onSelectHotspot(null);
    } else if (focusId === 'leaf') {
      targetCameraPos.current.set(-0.75, 2.1, 2.1);
      targetLookAt.current.set(-0.6, 1.8, 0.3);
      onSelectHotspot('leaf');
      onLeafInspected();
    } else if (focusId === 'stem') {
      targetCameraPos.current.set(0.2, 1.2, 2.4);
      targetLookAt.current.set(0.0, 1.0, 0);
      onSelectHotspot('stem');
      onStemTested();
    } else if (focusId === 'root') {
      targetCameraPos.current.set(0, 0.45, 2.8);
      targetLookAt.current.set(0, -0.2, 0);
      onSelectHotspot('stem');
      onStemTested();
    } else if (focusId === 'corolla') {
      targetCameraPos.current.set(0.42, 3.1, 2.5);
      targetLookAt.current.set(0.35, 2.7, 0.2);
      onSelectHotspot('flower');
      onFlowerInspected();
    } else if (focusId === 'stamen') {
      targetCameraPos.current.set(0.35, 2.8, 1.75);
      targetLookAt.current.set(0.35, 2.7, 0.7);
      onSelectHotspot('flower');
      onFlowerInspected();
    } else if (focusId === 'bud') {
      targetCameraPos.current.set(-0.25, 3.2, 2.0);
      targetLookAt.current.set(-0.15, 2.9, 0.15);
      onSelectHotspot('flower');
      onFlowerInspected();
    }
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 480;
    const height = container.clientHeight || 360;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#f0fdf4'); // Light green theme botanical conservatory
    scene.fog = new THREE.FogExp2('#f0fdf4', 0.012);

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.copy(targetCameraPos.current);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.22;

    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.maxPolarAngle = Math.PI / 2 - 0.04;
    controls.minDistance = 1.2;
    controls.maxDistance = 14;
    controls.target.copy(targetLookAt.current);

    // 2. Realistic Cinematic Lighting
    const keySun = new THREE.DirectionalLight('#fffcf0', 2.4);
    keySun.position.set(4.5, 11, 5.5);
    keySun.castShadow = true;
    keySun.shadow.mapSize.width = 1024;
    keySun.shadow.mapSize.height = 1024;
    keySun.shadow.camera.near = 0.5;
    keySun.shadow.camera.far = 28;
    keySun.shadow.camera.left = -5.5;
    keySun.shadow.camera.right = 5.5;
    keySun.shadow.camera.top = 5.5;
    keySun.shadow.camera.bottom = -5.5;
    keySun.shadow.bias = -0.0003;
    keySun.shadow.radius = 2.2;
    scene.add(keySun);

    const skyFill = new THREE.HemisphereLight('#dcfce7', '#062615', 0.9);
    scene.add(skyFill);

    const rimLight = new THREE.DirectionalLight('#86efac', 1.3);
    rimLight.position.set(-5, 6, -5.5);
    scene.add(rimLight);

    const tableBounce = new THREE.DirectionalLight('#fed7aa', 0.45);
    tableBounce.position.set(0, -3, 3);
    scene.add(tableBounce);

    // 3. Exhibition Pedestal & Contact Shadow Floor
    const tableGeo = new THREE.CylinderGeometry(5.2, 5.2, 0.25, 48);
    const tableMat = new THREE.MeshStandardMaterial({
      color: '#0e2417',
      roughness: 0.85,
      metalness: 0.1
    });
    const tableMesh = new THREE.Mesh(tableGeo, tableMat);
    tableMesh.position.y = -1.35;
    tableMesh.receiveShadow = true;
    scene.add(tableMesh);

    const shadowGeo = new THREE.CircleGeometry(2.6, 32);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: '#030805',
      transparent: true,
      opacity: 0.65
    });
    const contactShadow = new THREE.Mesh(shadowGeo, shadowMat);
    contactShadow.rotation.x = -Math.PI / 2;
    contactShadow.position.y = -1.22;
    scene.add(contactShadow);

    // 4. Exhibition Planter & Soil Bed
    const potGroup = new THREE.Group();

    const terracottaTex = createTerracottaTexture();
    const potMat = new THREE.MeshStandardMaterial({
      color: '#8c4828',
      map: terracottaTex,
      roughness: 0.78,
      metalness: 0.05
    });

    const potGeo = new THREE.CylinderGeometry(2.35, 1.75, 1.25, 36);
    const potMesh = new THREE.Mesh(potGeo, potMat);
    potMesh.position.y = -0.6;
    potMesh.receiveShadow = true;
    potMesh.castShadow = true;
    potGroup.add(potMesh);

    const rimGeo = new THREE.CylinderGeometry(2.52, 2.4, 0.18, 36);
    const potRim = new THREE.Mesh(rimGeo, potMat);
    potRim.position.y = 0.01;
    potRim.receiveShadow = true;
    potRim.castShadow = true;
    potGroup.add(potRim);

    const soilTexture = createSoilTexture();
    const soilMat = new THREE.MeshStandardMaterial({
      color: '#2a170a',
      roughness: 0.95,
      metalness: 0.02,
      map: soilTexture,
      bumpMap: soilTexture,
      bumpScale: 0.03
    });
    const soilGeo = new THREE.CylinderGeometry(2.3, 2.3, 0.1, 32);
    const soilMesh = new THREE.Mesh(soilGeo, soilMat);
    soilMesh.position.y = -0.04;
    soilMesh.receiveShadow = true;
    potGroup.add(soilMesh);

    // Specimen Brass Plaque
    const tagGeo = new THREE.PlaneGeometry(1.35, 0.42);
    const tagMat = new THREE.MeshStandardMaterial({
      color: '#d4af37',
      metalness: 0.88,
      roughness: 0.28
    });
    const tagMesh = new THREE.Mesh(tagGeo, tagMat);
    tagMesh.position.set(0, -0.55, 2.18);
    tagMesh.rotation.x = -0.16;
    potGroup.add(tagMesh);

    scene.add(potGroup);

    // 5. Botanical Specimen Group
    const plantRoot = new THREE.Group();
    scene.add(plantRoot);

    const stemGroup = new THREE.Group();
    plantRoot.add(stemGroup);

    const hotspots = [];

    // Shared procedural textures (kept for legacy/fallback purposes as per preservation rules)
    const barkTexShrub = createBarkTexture('#4d3320', '#21130a', '#69472e');
    const barkBumpShrub = createBarkBumpMap();
    const leafTexDicot = createLeafTexture('#15803d', '#86efac', '#14532d', false);
    const leafBumpDicot = createLeafBumpMap(false);
    const hibiscusPetalTex = createHibiscusPetalTexture();

    // ========================================================================
    // SPECIMEN: HIGH-FIDELITY PHOTOREALISTIC GLTF MODEL
    // ========================================================================
    const loader = new GLTFLoader();
    // Load the specific photorealistic model for this plant, mapped to public/models/
    loader.load(
      `/models/${plantId}.glb`,
      (gltf) => {
        const model = gltf.scene;
        // Scale and center the realistic model to fit inside the 3D exhibition pot
        // Scale factor may need adjustment depending on the dataset's native scale
        model.scale.set(6, 6, 6);
        model.position.set(0, 0, 0);

        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            // Enhance physical realism
            if (child.material) {
              child.material.roughness = Math.max(0.3, child.material.roughness || 0);
              child.material.envMapIntensity = 1.2;
              child.material.needsUpdate = true;
            }
          }
        });

        stemGroup.add(model);
      },
      undefined,
      (error) => {
        console.error('Error loading realistic 3D model:', error);
      }
    );

    // Interactive Hotspots (Adjusted coordinates to frame the new realistic model)
    hotspots.push({ id: 'stem', pos: new THREE.Vector3(0.05, 1.2, 0.3), label: 'Stem & Nodes' });
    hotspots.push({ id: 'leaf', pos: new THREE.Vector3(-0.65, 1.8, 0.35), label: 'Leaf Anatomy' });
    hotspots.push({ id: 'flower', pos: new THREE.Vector3(0.35, 2.85, 0.4), label: 'Flower Corolla' });


    // 7. Refined Scientific 3D Hotspot Focus Reticles
    const hotspotMeshes = [];
    hotspots.forEach(h => {
      const pinGroup = new THREE.Group();
      pinGroup.position.copy(h.pos);
      pinGroup.userData = { id: h.id, label: h.label };

      const reticleGeo = new THREE.RingGeometry(0.14, 0.19, 32);
      const reticleMat = new THREE.MeshBasicMaterial({
        color: '#34d399',
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.92
      });
      const reticleMesh = new THREE.Mesh(reticleGeo, reticleMat);
      pinGroup.add(reticleMesh);

      const lensGeo = new THREE.CircleGeometry(0.13, 24);
      const lensMat = new THREE.MeshBasicMaterial({
        color: '#064e3b',
        transparent: true,
        opacity: 0.55
      });
      const lensMesh = new THREE.Mesh(lensGeo, lensMat);
      pinGroup.add(lensMesh);

      const dotGeo = new THREE.CircleGeometry(0.05, 16);
      const dotMat = new THREE.MeshBasicMaterial({ color: '#ffffff' });
      const dotMesh = new THREE.Mesh(dotGeo, dotMat);
      pinGroup.add(dotMesh);

      scene.add(pinGroup);
      hotspotMeshes.push(pinGroup);
    });

    // 8. Animation Loop with Smooth Camera Gliding
    let clock = new THREE.Clock();
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera interpolation towards target focus
      camera.position.lerp(targetCameraPos.current, 0.06);
      controls.target.lerp(targetLookAt.current, 0.06);

      // Make hotspot pins face camera
      hotspotMeshes.forEach(hm => {
        hm.lookAt(camera.position);
      });

      // Stem bending deflection physics
      const targetBend = bendForce * specimenBio.maxFlex;
      stemGroup.rotation.z = targetBend;

      // Subtle botanical wind sway when in overview mode
      if (bendForce === 0 && activeFocus === 'overview') {
        stemGroup.rotation.z = Math.sin(elapsedTime * 1.3) * (specimenBio.maxFlex * 0.08);
        stemGroup.rotation.x = Math.cos(elapsedTime * 1.0) * (specimenBio.maxFlex * 0.05);
      }

      // Smooth auto-rotation only when overview and unpaused
      if (isAutoRotate && bendForce === 0 && activeFocus === 'overview') {
        plantRoot.rotation.y += 0.003;
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // 9. Raycasting for hotspot clicks
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(hotspotMeshes, true);

      if (intersects.length > 0) {
        const topHit = intersects[0].object.parent;
        if (topHit && topHit.userData && topHit.userData.id) {
          sounds.playPop();
          const hid = topHit.userData.id;
          if (hid === 'stem') handleFocusChange('stem');
          if (hid === 'leaf') handleFocusChange('leaf');
          if (hid === 'flower') handleFocusChange('corolla');
        }
      }
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('pointerdown', handlePointerDown);

    // 10. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      domEl.removeEventListener('pointerdown', handlePointerDown);
      controls.dispose();
      renderer.dispose();
      if (container.contains(domEl)) {
        container.removeChild(domEl);
      }
    };
  }, [plantId, specimenBio, isAutoRotate, bendForce, activeFocus]);

  // 6 Interactive Macro Insets (Direct 1:1 Match to User's Reference Image!)
  const referenceCards = [
    {
      id: 'leaf',
      title: 'Macro Leaf Anatomy',
      subtitle: 'Serrated Margins & Reticulate Veins',
      side: 'left',
      bgPos: '2% 5%',
      desc: 'Dark green ovate leaf with prominent sunken primary midrib, arching secondary web veins, acute tooth serrations, and waxy protective cuticle.'
    },
    {
      id: 'stem',
      title: 'Stem & Nodal Junction',
      subtitle: 'Woody Base & Petiole Nodes',
      side: 'left',
      bgPos: '2% 52%',
      desc: 'Sturdy woody stem with rough brown bark at the base, visible swollen nodes, petiole attachments, and tiny axillary stipules.'
    },
    {
      id: 'root',
      title: 'Taproot & Lateral Soil Anchor',
      subtitle: 'Deep Root System in Moist Loam',
      side: 'left',
      bgPos: '2% 98%',
      desc: 'Thick woody taproot with branching lateral rootlets anchoring the shrub firmly in dark organic soil for water and mineral absorption.'
    },
    {
      id: 'corolla',
      title: 'Showy Flower Corolla',
      subtitle: '5 Velvety Petals & Dark Throat',
      side: 'right',
      bgPos: '98% 5%',
      desc: 'Five large overlapping velvety crimson petals with wavy ruffled margins radiating from a deep ruby throat to attract bird & insect pollinators.'
    },
    {
      id: 'stamen',
      title: 'Staminal Column & Pistil',
      subtitle: 'Golden Anthers & 5 Stigma Lobes',
      side: 'right',
      bgPos: '98% 52%',
      desc: 'Monadelphous staminal tube fused around the style, densely studded with bright yellow pollen-bearing anthers and topped by 5 velvety crimson stigma lobes.'
    },
    {
      id: 'bud',
      title: 'Unopened Flower Bud',
      subtitle: 'Protective Epicalyx & Calyx',
      side: 'right',
      bgPos: '98% 98%',
      desc: 'Conical green calyx and epicalyx bracts enclosing and protecting the tightly swirled young crimson petals before anthesis.'
    }
  ];

  const activeCardInfo = referenceCards.find(c => c.id === activeFocus);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      borderRadius: '16px',
      overflow: 'hidden',
      border: '1.5px solid #a7f3d0',
      background: 'linear-gradient(160deg, #f0fdf4 0%, #ecfdf5 100%)',
      boxShadow: '0 4px 16px rgba(6, 78, 59, 0.06)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* View Mode Toggle: Interactive 3D vs Photographic Reference */}
      {viewMode === 'reference' ? (
        <div style={{
          flex: 1,
          minHeight: 0,
          width: '100%',
          position: 'relative',
          background: '#f0fdf4',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}>
          <img
            src="/hibiscus_reference_specimen.jpg"
            alt="Botanical Reference Specimen - Hibiscus rosa-sinensis"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block'
            }}
          />
        </div>
      ) : (
        /* 3D WebGL Canvas Mount */
        <div ref={mountRef} style={{ flex: 1, minHeight: 0, width: '100%', position: 'relative', cursor: 'grab' }} />
      )}

      {/* Top Overlay Bar: Specimen Scientific Name, Rotation & View Mode Controls */}
      <div style={{
        position: 'absolute',
        top: '8px',
        left: '10px',
        right: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        pointerEvents: 'none',
        zIndex: 20
      }}>
        <div style={{
          background: '#ffffff',
          backdropFilter: 'blur(2px)',
          border: '1.5px solid #a7f3d0',
          borderRadius: '10px',
          padding: '4px 10px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          pointerEvents: 'auto',
          boxShadow: '0 2px 8px rgba(6, 78, 59, 0.08)'
        }}>
          <span style={{ fontSize: '1.3rem' }}>{plant?.emoji}</span>
          <div>
            <div style={{ color: '#064e3b', fontWeight: 800, fontSize: '12.5px', lineHeight: 1.1 }}>
              {plant?.popupName || plant?.name}
              <span style={{ fontStyle: 'italic', fontWeight: 600, color: '#047857', marginLeft: '6px', fontSize: '11px' }}>
                ({specimenBio.latinName})
              </span>
            </div>
            <div style={{ color: '#059669', fontSize: '10.5px', fontWeight: 700 }}>
              {specimenBio.classification}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '6px', pointerEvents: 'auto' }}>
          {/* Overview Camera Reset */}
          <button
            type="button"
            onClick={() => handleFocusChange('overview')}
            style={{
              background: activeFocus === 'overview' ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : '#ffffff',
              color: activeFocus === 'overview' ? '#ffffff' : '#064e3b',
              border: '1.5px solid #a7f3d0',
              borderRadius: '8px',
              padding: '5px 9px',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              boxShadow: '0 2px 6px rgba(6, 78, 59, 0.08)'
            }}
            title="Reset to Full Overview View"
          >
            <RefreshCw size={12} />
            <span>Full View</span>
          </button>

          {/* Reference Image Toggle */}
          <button
            type="button"
            onClick={() => {
              setViewMode(m => m === '3d' ? 'reference' : '3d');
              sounds.playPop();
            }}
            style={{
              background: viewMode === 'reference' ? '#d97706' : '#ffffff',
              color: viewMode === 'reference' ? '#ffffff' : '#064e3b',
              border: '1.5px solid #a7f3d0',
              borderRadius: '8px',
              padding: '5px 9px',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              boxShadow: '0 2px 6px rgba(6, 78, 59, 0.08)'
            }}
            title="Toggle Photographic Reference Specimen"
          >
            <Camera size={12} />
            <span>{viewMode === 'reference' ? 'Back to 3D' : 'Photo Specimen'}</span>
          </button>

          {/* 360 Auto-Rotate Toggle */}
          {viewMode === '3d' && (
            <button
              type="button"
              onClick={() => setIsAutoRotate(r => !r)}
              style={{
                background: isAutoRotate ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : '#ffffff',
                color: isAutoRotate ? '#ffffff' : '#064e3b',
                border: '1.5px solid #a7f3d0',
                borderRadius: '8px',
                padding: '5px 9px',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                boxShadow: '0 2px 6px rgba(6, 78, 59, 0.08)'
              }}
              title="Toggle 360° Botanical Rotation"
            >
              <RotateCw size={12} />
              <span>{isAutoRotate ? '360° On' : 'Paused'}</span>
            </button>
          )}
        </div>
      </div>

      {/* LEFT COLUMN: 3 Macro Inset Cards (Matching User's Reference Poster: Leaf, Stem, Root) */}
      <div style={{
        position: 'absolute',
        top: '48px',
        bottom: '48px',
        left: '8px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        pointerEvents: 'none',
        zIndex: 15,
        width: '88px'
      }}>
        {referenceCards.filter(c => c.side === 'left').map(card => {
          const isSelected = activeFocus === card.id;
          return (
            <button
              key={card.id}
              type="button"
              onClick={() => handleFocusChange(card.id)}
              style={{
                pointerEvents: 'auto',
                width: '84px',
                height: '76px',
                borderRadius: '10px',
                border: isSelected ? '2px solid #10b981' : '1.5px solid #a7f3d0',
                boxShadow: isSelected ? '0 0 14px rgba(16, 185, 129, 0.5)' : '0 2px 8px rgba(6, 78, 59, 0.08)',
                background: '#ffffff',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.2s ease',
                transform: isSelected ? 'scale(1.05)' : 'scale(1.0)'
              }}
              title={`Examine ${card.title}`}
            >
              {/* Photographic Inset Slice */}
              <div style={{
                flex: 1,
                width: '100%',
                backgroundImage: 'url(/hibiscus_reference_specimen.jpg)',
                backgroundSize: '400% 400%',
                backgroundPosition: card.bgPos,
                filter: isSelected ? 'brightness(1.05)' : 'brightness(0.95)'
              }} />
              {/* Inset Label Badge */}
              <div style={{
                background: isSelected ? '#059669' : '#f0fdf4',
                color: isSelected ? '#ffffff' : '#064e3b',
                fontSize: '9px',
                fontWeight: 800,
                textAlign: 'center',
                padding: '2px 3px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {card.title.replace('Macro ', '')}
              </div>
            </button>
          );
        })}
      </div>

      {/* RIGHT COLUMN: 3 Macro Inset Cards (Matching User's Reference Poster: Flower, Stamen, Bud) */}
      <div style={{
        position: 'absolute',
        top: '48px',
        bottom: '48px',
        right: '8px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        pointerEvents: 'none',
        zIndex: 15,
        width: '88px',
        alignItems: 'flex-end'
      }}>
        {referenceCards.filter(c => c.side === 'right').map(card => {
          const isSelected = activeFocus === card.id;
          return (
            <button
              key={card.id}
              type="button"
              onClick={() => handleFocusChange(card.id)}
              style={{
                pointerEvents: 'auto',
                width: '84px',
                height: '76px',
                borderRadius: '10px',
                border: isSelected ? '2px solid #10b981' : '1.5px solid #a7f3d0',
                boxShadow: isSelected ? '0 0 14px rgba(16, 185, 129, 0.5)' : '0 2px 8px rgba(6, 78, 59, 0.08)',
                background: '#ffffff',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.2s ease',
                transform: isSelected ? 'scale(1.05)' : 'scale(1.0)'
              }}
              title={`Examine ${card.title}`}
            >
              {/* Photographic Inset Slice */}
              <div style={{
                flex: 1,
                width: '100%',
                backgroundImage: 'url(/hibiscus_reference_specimen.jpg)',
                backgroundSize: '400% 400%',
                backgroundPosition: card.bgPos,
                filter: isSelected ? 'brightness(1.05)' : 'brightness(0.95)'
              }} />
              {/* Inset Label Badge */}
              <div style={{
                background: isSelected ? '#059669' : '#f0fdf4',
                color: isSelected ? '#ffffff' : '#064e3b',
                fontSize: '9px',
                fontWeight: 800,
                textAlign: 'center',
                padding: '2px 3px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {card.title.replace('Showy ', '')}
              </div>
            </button>
          );
        })}
      </div>

      {/* Center Botanical Inspection Card (When any anatomical card is active) */}
      {activeCardInfo && activeFocus !== 'overview' && (
        <div style={{
          position: 'absolute',
          bottom: '50px',
          left: '104px',
          right: '104px',
          background: '#ffffff',
          border: '1.5px solid #10b981',
          borderRadius: '12px',
          padding: '8px 14px',
          zIndex: 18,
          color: '#064e3b',
          boxShadow: '0 8px 24px rgba(6, 78, 59, 0.12)',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '13px' }}>🔬</span>
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#047857', textTransform: 'uppercase' }}>
                {activeCardInfo.title}
              </span>
              <span style={{ fontSize: '10.5px', color: '#64748b', fontStyle: 'italic' }}>
                — {activeCardInfo.subtitle}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button
                type="button"
                onClick={() => sounds.speak(`${activeCardInfo.title}. ${activeCardInfo.desc}`)}
                style={{
                  background: '#f0fdf4',
                  border: '1px solid #86efac',
                  borderRadius: '6px',
                  color: '#047857',
                  padding: '2px 6px',
                  fontSize: '10px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
                title="Hear Scientific Explanation"
              >
                <Volume2 size={11} />
                <span>Listen</span>
              </button>
              <button
                type="button"
                onClick={() => handleFocusChange('overview')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#64748b',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: 'bold',
                  padding: '0 4px'
                }}
                title="Return to Overview"
              >
                ✕
              </button>
            </div>
          </div>
          <p style={{
            margin: 0,
            fontSize: '11px',
            color: '#166534',
            lineHeight: 1.35,
            textAlign: 'justify',
            textJustify: 'inter-word'
          }}>
            {activeCardInfo.desc}
          </p>
        </div>
      )}

      {/* Bottom Tactile STEM BENDABILITY TESTER */}
      <div style={{
        background: '#ffffff',
        borderTop: '1.5px solid #a7f3d0',
        padding: '5px 12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '10px',
        zIndex: 20
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '13px' }}>🧪</span>
          <div>
            <div style={{ color: '#064e3b', fontWeight: 800, fontSize: '11.5px', lineHeight: 1.1 }}>
              Tactile Stem Bendability Test
            </div>
            <div style={{ color: '#166534', fontSize: '10px', fontWeight: 600 }}>
              {specimenBio.type.includes('Herb')
                ? 'Soft & tender: bends with high elasticity'
                : specimenBio.type === 'Shrub'
                ? 'Hard woody base: branches near ground level'
                : 'Thick woody trunk: rigid & unbending'}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, maxWidth: '200px' }}>
          <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 700 }}>Flex</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={bendForce}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              setBendForce(val);
              if (val > 0.4) {
                onStemTested();
              }
            }}
            style={{
              flex: 1,
              accentColor: '#10b981',
              cursor: 'pointer',
              height: '4px'
            }}
          />
          <span style={{
            fontSize: '10.5px',
            color: '#047857',
            fontWeight: 800,
            minWidth: '24px',
            textAlign: 'right'
          }}>
            {Math.round(bendForce * 100)}%
          </span>
        </div>

        <button
          type="button"
          onClick={() => {
            setBendForce(0.75);
            onStemTested();
            sounds.playPop();
            setTimeout(() => setBendForce(0), 1200);
          }}
          style={{
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            padding: '4px 10px',
            fontSize: '11px',
            fontWeight: 800,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            boxShadow: '0 2px 6px rgba(16, 185, 129, 0.3)'
          }}
        >
          Quick Flex Test
        </button>
      </div>
    </div>
  );
}

export default function RealisticBotanicalModel3D(props) {
  return (
    <BotanicalErrorBoundary>
      <RealisticBotanicalModel3DInner {...props} />
    </BotanicalErrorBoundary>
  );
}
