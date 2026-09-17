import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  RefreshCw,
  X,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Award,
  Volume2,
  VolumeX,
  Check,
  Star,
  Lock,
  Play,
  ArrowRight,
  Maximize2,
  Minimize2,
  Sparkles,
  Heart,
  Filter,
  Activity,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useTheme } from '../../../../ThemeContext.jsx';
import { sounds } from '../VirtualBiodiversityExplorer/utils/soundEffects';
import natureForestAudio from '../../../../assets/nature_forest_sound.mp3';
import EcosystemAnimationOverlay from './EcosystemAnimationOverlay.jsx';
import natureRiverBg from '../../../../assets/nature_reflection_river_8k.jpg';
import ecosystemTableBg from '../../../../assets/ecosystem_table_bg_8k.jpg';

import tulsiImg from '../../../../assets/specimens/tulsi.png';
import roseImg from '../../../../assets/specimens/rose.png';
import grassImg from '../../../../assets/specimens/grass.png';
import neemImg from '../../../../assets/specimens/neem.png';
import peepalImg from '../../../../assets/specimens/peepal.png';
import jasmineImg from '../../../../assets/specimens/jasmine.png';

import tulsiWideImg from '../../../../assets/specimens_wide/tulsi_wide.jpg';
import roseWideImg from '../../../../assets/specimens_wide/rose_wide.jpg';
import grassWideImg from '../../../../assets/specimens_wide/grass_wide.jpg';
import neemWideImg from '../../../../assets/specimens_wide/neem_wide.jpg';
import peepalWideImg from '../../../../assets/specimens_wide/peepal_wide.jpg';
import jasmineWideImg from '../../../../assets/specimens_wide/jasmine_wide.jpg';

import crowImg from '../../../../assets/crow.png';
import cowImg from '../../../../assets/brown_cow.png';
import frogImg from '../../../../assets/frog.png';
import squirrelImg from '../../../../assets/squirrel.png';
import antImg from '../../../../assets/ant.png';
import sparrowImg from '../../../../assets/sparrow.png';

import crowWideImg from '../../../../assets/specimens_wide/crow_wide.jpg';
import cowWideImg from '../../../../assets/specimens_wide/cow_wide.jpg';
import frogWideImg from '../../../../assets/specimens_wide/frog_wide.jpg';
import squirrelWideImg from '../../../../assets/specimens_wide/squirrel_wide.jpg';
import antWideImg from '../../../../assets/specimens_wide/ant_wide.jpg';
import sparrowWideImg from '../../../../assets/specimens_wide/sparrow_wide.jpg';

import quizQ1Img from '../../../../assets/quiz_scenes/q1_high_biodiversity_8k.jpg';
import quizQ2Img from '../../../../assets/quiz_scenes/q2_flowering_pollinators_8k.jpg';
import quizQ3Img from '../../../../assets/quiz_scenes/q3_seed_dispersal_bird_8k.jpg';
import quizQ4Img from '../../../../assets/quiz_scenes/q4_school_garden_8k.jpg';
import quizQ5Img from '../../../../assets/quiz_scenes/q5_insect_pollination_8k.jpg';
import quizQ6Img from '../../../../assets/quiz_scenes/q6_interdependence_8k.jpg';
import quizQ7Img from '../../../../assets/quiz_scenes/q7_wetland_park_8k.jpg';
import quizQ8Img from '../../../../assets/quiz_scenes/q8_food_chain_8k.jpg';

const PLANTS = ['Tulsi', 'Rose', 'Grass', 'Neem', 'Peepal', 'Jasmine'];
const ANIMALS = ['Crow', 'Cow', 'Frog', 'Squirrel', 'Ant', 'Sparrow'];

const PLANT_EMOJIS = { Tulsi: '🌿', Rose: '🌹', Grass: '🌱', Neem: '🌳', Peepal: '🌲', Jasmine: '🤍' };
const ANIMAL_EMOJIS = { Crow: '🐦‍⬛', Cow: '🐄', Frog: '🐸', Squirrel: '🐿️', Ant: '🐜', Sparrow: '🐦' };

// Botanical & Zoological Scientific Binomials
const SCIENTIFIC_NAMES = {
  Tulsi: 'Ocimum tenuiflorum',
  Rose: 'Rosa indica',
  Grass: 'Cynodon dactylon',
  Neem: 'Azadirachta indica',
  Peepal: 'Ficus religiosa',
  Jasmine: 'Jasminum officinale',
  Crow: 'Corvus splendens',
  Cow: 'Bos indicus',
  Frog: 'Hoplobatrachus tigerinus',
  Squirrel: 'Funambulus palmarum',
  Ant: 'Camponotus compressus',
  Sparrow: 'Passer domesticus'
};

const PLANT_IMAGES = {
  Tulsi: tulsiImg,
  Rose: roseImg,
  Grass: grassImg,
  Neem: neemImg,
  Peepal: peepalImg,
  Jasmine: jasmineImg
};

const PLANT_WIDE_IMAGES = {
  Tulsi: tulsiWideImg,
  Rose: roseWideImg,
  Grass: grassWideImg,
  Neem: neemWideImg,
  Peepal: peepalWideImg,
  Jasmine: jasmineWideImg
};

const ANIMAL_IMAGES = {
  Crow: crowImg,
  Cow: cowImg,
  Frog: frogImg,
  Squirrel: squirrelImg,
  Ant: antImg,
  Sparrow: sparrowImg
};

const ANIMAL_WIDE_IMAGES = {
  Crow: crowWideImg,
  Cow: cowWideImg,
  Frog: frogWideImg,
  Squirrel: squirrelWideImg,
  Ant: antWideImg,
  Sparrow: sparrowWideImg
};

const PLANT_DESCRIPTIONS = {
  Tulsi: 'Medicinal Herb · Tender Green Stem',
  Rose: 'Flowering Shrub · Thorny Woody Stems',
  Grass: 'Ground Lawn Herb · Fibrous Roots',
  Neem: 'Evergreen Shade Tree · Broad Canopy',
  Peepal: 'Sacred Fig Tree · Spreading Branches',
  Jasmine: 'Fragrant Shrub · Sweet White Blooms'
};

const ANIMAL_DESCRIPTIONS = {
  Crow: 'Aerial Canopy Flyer · Social Bird',
  Cow: 'Meadow Walker · Gentle Herbivore',
  Frog: 'Freshwater Amphibian · Swimmer & Leaper',
  Squirrel: 'Agile Tree Climber · Quick Forager',
  Ant: 'Ground Soil Crawler · Social Colony',
  Sparrow: 'Garden Songbird · Fast Winged Flyer'
};

export const PLANT_BADGES = {
  Tulsi: {
    role: 'Medicinal Herb',
    gift: 'Fresh O₂ & Aroma',
    ecoIcon: '🌿',
    themeColor: '#059669',
    badgeBg: '#D1FAE5',
    tag: 'Medicinal Herb'
  },
  Rose: {
    role: 'Flowering Shrub',
    gift: 'Nectar for Pollinators',
    ecoIcon: '🌸',
    themeColor: '#E11D48',
    badgeBg: '#FFE4E6',
    tag: 'Flowering Shrub'
  },
  Grass: {
    role: 'Ground Lawn Herb',
    gift: 'Soil Binder & Forage',
    ecoIcon: '🌱',
    themeColor: '#16A34A',
    badgeBg: '#DCFCE7',
    tag: 'Ground Herb'
  },
  Neem: {
    role: 'Canopy Shade Tree',
    gift: 'Pest Barrier & Nesting',
    ecoIcon: '🌳',
    themeColor: '#047857',
    badgeBg: '#D1FAE5',
    tag: 'Canopy Tree'
  },
  Peepal: {
    role: 'Sacred Fig Tree',
    gift: 'Keystone Bird Sanctuary',
    ecoIcon: '🌲',
    themeColor: '#0F766E',
    badgeBg: '#CCFBF1',
    tag: 'Keystone Tree'
  },
  Jasmine: {
    role: 'Fragrant Shrub',
    gift: 'Moist Microclimate',
    ecoIcon: '🤍',
    themeColor: '#4F46E5',
    badgeBg: '#E0E7FF',
    tag: 'Fragrant Shrub'
  }
};

export const ANIMAL_BADGES = {
  Crow: {
    role: 'Aerial Canopy Flyer',
    gift: 'Seed Disperser & Scavenger',
    ecoIcon: '🐦‍⬛',
    themeColor: '#334155',
    badgeBg: '#E2E8F0',
    tag: 'Canopy Flyer'
  },
  Cow: {
    role: 'Meadow Herbivore',
    gift: 'Soil Nutrient Recycler',
    ecoIcon: '🐄',
    themeColor: '#B45309',
    badgeBg: '#FEF3C7',
    tag: 'Gentle Herbivore'
  },
  Frog: {
    role: 'Freshwater Amphibian',
    gift: 'Insect Population Balancer',
    ecoIcon: '🐸',
    themeColor: '#059669',
    badgeBg: '#D1FAE5',
    tag: 'Amphibian'
  },
  Squirrel: {
    role: 'Arboreal Climber',
    gift: 'Seed Planter & Cacher',
    ecoIcon: '🐿️',
    themeColor: '#C2410C',
    badgeBg: '#FFEDD5',
    tag: 'Arboreal Climber'
  },
  Ant: {
    role: 'Ground Excavator',
    gift: 'Subterranean Root Aerator',
    ecoIcon: '🐜',
    themeColor: '#78350F',
    badgeBg: '#FEF3C7',
    tag: 'Soil Crawler'
  },
  Sparrow: {
    role: 'Garden Songbird',
    gift: 'Pest & Insect Controller',
    ecoIcon: '🐦',
    themeColor: '#1D4ED8',
    badgeBg: '#DBEAFE',
    tag: 'Garden Songbird'
  }
};

const ECOLOGICAL_ROLES = {
  Tulsi: 'Medicinal Herb · Oxygen & Aroma Provider',
  Rose: 'Flowering Shrub · Nectar & Pollinator Host',
  Grass: 'Ground Cover Herb · Soil Binder & Herbivore Food',
  Neem: 'Canopy Shade Tree · Natural Pest Deterrent',
  Peepal: 'Sacred Fig Tree · Keystone Oxygen & Bird Shelter',
  Jasmine: 'Aromatic Shrub · Night Pollinator Haven',
  Crow: 'Canopy Omnivore · Seed Disperser & Scavenger',
  Cow: 'Meadow Herbivore · Soil Nutrient Recycler',
  Frog: 'Freshwater Amphibian · Insect Population Balancer',
  Squirrel: 'Arboreal Climber · Seed Cacher & Forest Planter',
  Ant: 'Ground Excavator · Soil Aeration & Organic Recycler',
  Sparrow: 'Garden Songbird · Insect Controller & Seed Consumer'
};

// Comprehensive 36-pair Mutualism Knowledge Base for NCERT Class 6 Chapter 2
const ALL_INTERDEPENDENCE = {
  'Neem-Crow': { interaction: 'Shelter & Seed Dispersal', badge: 'Canopy Mutualism', detail: 'Neem branches provide secure high-canopy nesting for crows, while crows eat ripe neem fruits and disperse viable seeds across the garden landscape.' },
  'Neem-Cow': { interaction: 'Natural Pest Barrier & Shade', badge: 'Thermoregulation Shade', detail: 'Neem canopy emits natural insect-repelling aromas keeping flies away from resting cows, while cattle manure provides rich nitrogen for neem roots.' },
  'Neem-Frog': { interaction: 'Moist Fallen Leaf Litter', badge: 'Forest Floor Refuge', detail: 'Neem leaf mulch on the soil retains dew for frogs, while frogs devour beetles and grasshoppers around the tree base.' },
  'Neem-Squirrel': { interaction: 'Bark Highway & Fruit Nibbles', badge: 'Arboreal Highway', detail: 'Neem trunk provides a safe climbing highway for squirrels, while squirrels prune dry bark and distribute seeds.' },
  'Neem-Ant': { interaction: 'Trunk Protection & Soil Tillage', badge: 'Arboreal Patrol', detail: 'Tree ants patrol neem bark hunting bark-boring pests, while neem resin offers safe nesting sites.' },
  'Neem-Sparrow': { interaction: 'Parasite-Free Songbird Nest', badge: 'Herbal Protection', detail: 'Sparrows weave nests among neem twigs because natural neem compounds deter mites and feather lice.' },

  'Peepal-Crow': { interaction: 'Keystone Fig Feast & Dispersal', badge: 'Avian Seed Dispersal', detail: 'Peepal produces thousands of tiny nutritious figs that feed crow flocks, which deposit digested seeds atop distant walls and rocks.' },
  'Peepal-Cow': { interaction: 'Sacred Grove Canopy & Fodder', badge: 'Sanctuary Shade', detail: 'Spreading peepal branches provide cool communal shade during peak afternoon heat, while cattle fertilize the surrounding soil.' },
  'Peepal-Frog': { interaction: 'Root Buttress Moisture Sanctuary', badge: 'Keystone Base Refuge', detail: 'Deep cavernous peepal buttress roots stay cool and moist through hot days, offering vital sanctuary for ground frogs.' },
  'Peepal-Squirrel': { interaction: 'Hollow Living & Fig Caching', badge: 'Seed Caching Mutualism', detail: 'Peepal tree hollows shelter squirrels, while squirrels hide fig seeds in crevices and ground soil, planting future trees.' },
  'Peepal-Ant': { interaction: 'Trunk Crevice Habitat', badge: 'Arboreal Colony', detail: 'Peepal bark crevices house industrious ant colonies that protect tree foliage from sap-sucking scale insects.' },
  'Peepal-Sparrow': { interaction: 'High Roosting & Twig Collection', badge: 'Canopy Songbird Nook', detail: 'Dense peepal crowns offer wind-safe roosting perches for sparrows, while sparrows pick off caterpillars from leaf stems.' },

  'Grass-Crow': { interaction: 'Open Foraging & Grub Hunting', badge: 'Meadow Scavenging', detail: 'Open grass lawns allow crows to spot beetle larvae and worms, preventing insect overpopulation on garden grounds.' },
  'Grass-Cow': { interaction: 'Herbivory & Organic Fertilization', badge: 'Nutrient Cycle', detail: 'Grass serves as dietary forage for cows. Cows return organic manure rich in nitrogen and minerals that revitalizes topsoil for vigorous grass regrowth.' },
  'Grass-Frog': { interaction: 'Dew Camouflage & Moisture', badge: 'Moist Meadow Corridor', detail: 'Lush grass clumps trap morning dew allowing amphibians to traverse between ponds without drying out.' },
  'Grass-Squirrel': { interaction: 'Fallen Seed Foraging', badge: 'Ground Foraging', detail: 'Grass beds catch falling seeds and nuts, which foraging squirrels uncover while lightly aerating topsoil with their paws.' },
  'Grass-Ant': { interaction: 'Seed Harvesting & Soil Tillage', badge: 'Granivory & Tillage', detail: 'Ground ants gather loose grass seeds into underground chambers, aerating soil around fibrous grass root mats.' },
  'Grass-Sparrow': { interaction: 'Grass Seed Banquet', badge: 'Seed Eating Mutualism', detail: 'Sparrows flock over grass patches to feed on fallen seedheads, regulating weed spread across the garden.' },

  'Rose-Crow': { interaction: 'Shrub Lookout & Pest Removal', badge: 'Thicket Lookout', detail: 'Sturdy rose bushes offer high lookout perches for crows, which spot and pluck large hornworms from stems.' },
  'Rose-Cow': { interaction: 'Protective Spiny Hedgerow', badge: 'Hedgerow Buffer', detail: 'Thorny rose branches act as a living natural fence, while cattle manure enriches soil for vibrant flower blooms.' },
  'Rose-Frog': { interaction: 'Damp Petal Understory Refuge', badge: 'Damp Petal Canopy', detail: 'Shaded soil under rose bushes retains watering moisture for frogs, which hunt nocturnal slugs and aphids.' },
  'Rose-Squirrel': { interaction: 'Rose Hip Vitamin Exchange', badge: 'Fruit Nutrient Exchange', detail: 'Squirrels nibble vitamin C-rich rose hips during dry seasons and carry seeds to fertile corners.' },
  'Rose-Ant': { interaction: 'Extrafloral Nectar & Aphid Guard', badge: 'Guard Alliance', detail: 'Garden ants protect tender rose buds from caterpillar damage while harvesting microscopic sweet nectar droplets.' },
  'Rose-Sparrow': { interaction: 'Aphid & Caterpillar Regulation', badge: 'Insect Regulation', detail: 'House sparrows actively hunt caterpillars, beetles, and aphids off thorny rose stems, protecting flower buds from damage.' },

  'Tulsi-Crow': { interaction: 'Medicinal Garden Patrol', badge: 'Medicinal Forage', detail: 'Crows forage ground grubs around aromatic tulsi beds without harming the aromatic medicinal leaves.' },
  'Tulsi-Cow': { interaction: 'Traditional Herb Sanctuary', badge: 'Pasture Edge Harmony', detail: 'Fragrant tulsi plants border home meadows, while organic compost supports lush medicinal foliage.' },
  'Tulsi-Frog': { interaction: 'Cool Leaf Micro-Habitat', badge: 'Understory Refuge', detail: 'Low-growing bushy tulsi branches create a humid pocket near garden water pots where frogs rest by day.' },
  'Tulsi-Squirrel': { interaction: 'Aromatic Seed Foraging', badge: 'Herb Seed Caching', detail: 'Squirrels collect mature dry tulsi nutlets from flower spikes, inadvertently dispersing seeds along stone borders.' },
  'Tulsi-Ant': { interaction: 'Subterranean Root Aeration', badge: 'Subterranean Aeration', detail: 'Ground ants dig intricate underground tunnels around tulsi roots that loosen hard soil, allowing rainwater and oxygen to reach roots.' },
  'Tulsi-Sparrow': { interaction: 'Caterpillar Defense Patrol', badge: 'Songbird Pest Control', detail: 'Sparrows inspect aromatic tulsi leaves for tiny green caterpillars, keeping the medicinal herb thriving and green.' },

  'Jasmine-Crow': { interaction: 'Aromatic Understory Patrol', badge: 'Shrub Understory Forage', detail: 'Crows scour the soft mulched soil beneath jasmine bushes for beetles, keeping garden pests in check.' },
  'Jasmine-Cow': { interaction: 'Fragrant Garden Border', badge: 'Pasture Perimeter', detail: 'Jasmine hedges define natural garden boundaries, while cow compost supplies organic phosphorus for abundant blossoms.' },
  'Jasmine-Frog': { interaction: 'Moist Microclimate & Night Hunt', badge: 'Microclimate Refuge', detail: 'Dense shaded ground under jasmine bushes stays cool and moist for amphibians. In return, frogs hunt nocturnal snails and moths.' },
  'Jasmine-Squirrel': { interaction: 'Dense Shrub Highway', badge: 'Canopy Understory Highway', detail: 'Intertwined jasmine vine branches give squirrels a safe aerial walkway connecting bushes to trees.' },
  'Jasmine-Ant': { interaction: 'Sweet Floral Nectar Highway', badge: 'Nectar Trail Mutualism', detail: 'Ground ants climb jasmine stems to access flower nectar and drive away leaf-chewing beetle larvae.' },
  'Jasmine-Sparrow': { interaction: 'Thicket Nest Concealment', badge: 'Thicket Nest Sanctuary', detail: 'Tightly woven jasmine runners offer songbirds a secluded, fragrant nesting spot safe from hawks and predators.' }
};

const INTERDEPENDENCE_PAIRS = Object.entries(ALL_INTERDEPENDENCE).map(([key, val]) => {
  const [source, target] = key.split('-');
  return { source, target, ...val };
});

const getMutualismPair = (plant, animal) => {
  const key = `${plant}-${animal}`;
  if (ALL_INTERDEPENDENCE[key]) {
    return {
      source: plant,
      target: animal,
      ...ALL_INTERDEPENDENCE[key]
    };
  }
  return {
    source: plant,
    target: animal,
    interaction: 'Habitat Coexistence & O₂ Cycle',
    badge: 'Ecosystem Harmony',
    detail: `${plant} purifies the air and provides shelter, while ${animal} aids in insect regulation and soil nutrient turnover across the shared habitat.`
  };
};

const CLASSMATES = [
  { name: 'Tamizh', plant: 'Neem', animal: 'Crow' },
  { name: 'Gopal', plant: 'Tulsi', animal: 'Cow' },
  { name: 'Priya', plant: 'Rose', animal: 'Frog' },
  { name: 'Vijay', plant: 'Peepal', animal: 'Squirrel' },
  { name: 'Lavanya', plant: 'Grass', animal: 'Sparrow' },
  { name: 'Iniyan', plant: 'Jasmine', animal: 'Ant' }
];

const QUIZ_QUESTIONS = [
  {
    q: 'A region has many different plants and animals living together. What is the BEST conclusion?',
    habitat: '🌳 Forest Sanctuary & Canopy',
    sceneImg: quizQ1Img,
    animType: 'quiz_q1_biodiversity',
    ecoTruth: '🌿 High Biodiversity Equilibrium: In this lush multi-canopy forest, Neem and Peepal provide microclimates, shelter, and nutrient cycles that allow sparrows, squirrels, and insects to flourish in stable natural balance.',
    specimens: [
      { name: 'Neem', img: neemImg },
      { name: 'Peepal', img: peepalImg },
      { name: 'Sparrow', img: sparrowImg },
      { name: 'Squirrel', img: squirrelImg }
    ],
    sim: {
      actionPrompt: 'Test Monoculture vs Diversity',
      normalLabel: 'Coexisting Species Web',
      normalDesc: '🌿 Thriving Equilibrium: 12+ plant and animal species share shade, food, and soil nutrients.',
      perturbedLabel: 'Single-Species Monoculture',
      perturbedDesc: '⚠️ Monoculture Alert: When 11 species vanish, resilience drops and pests wipe out the habitat!'
    },
    opts: [
      { label: 'A', text: 'The region has high biodiversity.', badge: '🌿 Rich Web' },
      { label: 'B', text: 'Only one type of plant grows there.', badge: '🌱 Monoculture' },
      { label: 'C', text: 'No animals depend on plants.', badge: '🚫 Isolated' },
      { label: 'D', text: 'All living things are exactly alike.', badge: '🔄 Identical' }
    ],
    correct: 0,
    explain: 'A place with many different kinds of plants and animals has high biodiversity, making the ecosystem richer, healthier, and more resilient.'
  },
  {
    q: 'Imagine all flowering plants disappear from a garden. Which living thing is MOST likely to be affected first?',
    habitat: '🌸 Floral Glade & Nectar Meadow',
    sceneImg: quizQ2Img,
    animType: 'quiz_q2_pollinators',
    ecoTruth: '🌸 Floral Nectar & Pollination Lifeline: Rose and Jasmine blossoms produce sweet nectar and rich pollen. Nectar feeders like butterflies depend on these blooms for daily survival and simultaneously fertilise the plants.',
    specimens: [
      { name: 'Rose', img: roseImg },
      { name: 'Jasmine', img: jasmineImg },
      { name: 'Ant', img: antImg }
    ],
    sim: {
      actionPrompt: 'Test Flower Disappearance',
      normalLabel: 'Blooming Flora Paradise',
      normalDesc: '🌸 Nectar Wealth: Rose and Jasmine blossoms continuously feed bees, butterflies, and insects.',
      perturbedLabel: 'Zero Flowering Blossoms',
      perturbedDesc: '⚠️ Nectar Starvation: Flowering blossoms vanish! Nectar-dependent pollinators face immediate famine.'
    },
    opts: [
      { label: 'A', text: 'Butterflies & nectar feeders.', badge: '🦋 Pollinators' },
      { label: 'B', text: 'Garden rocks and boulders.', badge: '🪨 Minerals' },
      { label: 'C', text: 'Passing rain clouds.', badge: '☁️ Atmosphere' },
      { label: 'D', text: 'Dry footpath gravel and sand.', badge: '🪨 Ground' }
    ],
    correct: 0,
    explain: 'Butterflies depend on flowers for sweet nectar. Without flowering plants, they immediately lose an essential food source.'
  },
  {
    q: 'A bird eats a fruit and later drops its seeds in another place. What is the bird helping the plant to do?',
    habitat: '🌾 Canopy Woodland Margin',
    sceneImg: quizQ3Img,
    animType: 'quiz_q3_seed_dispersal',
    ecoTruth: '🌱 Mutualistic Seed Dispersal: Frugivorous songbirds eat ripe Peepal figs. As they fly across habitats, they deposit seeds in fertile droppings far from the parent tree, enabling forest regeneration.',
    specimens: [
      { name: 'Peepal', img: peepalImg },
      { name: 'Sparrow', img: sparrowImg },
      { name: 'Crow', img: crowImg }
    ],
    sim: {
      actionPrompt: 'Test Seed Dispersal Journey',
      normalLabel: 'Frugivore Foraging',
      normalDesc: '🍒 Fruit Gathering: Birds feed on ripe Peepal figs and sweet tree berries in the canopy.',
      perturbedLabel: 'Long-Distance Seed Spread',
      perturbedDesc: '🌱 Active Dispersal: The bird flies afar, depositing fertile seeds in moist soil to sprout new saplings!'
    },
    opts: [
      { label: 'A', text: 'Change leaf colour overnight.', badge: '🎨 Pigment' },
      { label: 'B', text: 'Grow 10 feet taller instantly.', badge: '⚡ Rapid Growth' },
      { label: 'C', text: 'Spread seeds to new fertile grounds.', badge: '🌱 Seed Dispersal' },
      { label: 'D', text: 'Force instant flower blossoms.', badge: '🌸 Quick Bloom' }
    ],
    correct: 2,
    explain: 'Animals assist plants through seed dispersal, carrying seeds across long distances so new plant generations can thrive in fresh soil.'
  },
  {
    q: 'A student says, "Our school garden has high biodiversity." Which observation BEST supports this statement?',
    habitat: '🏫 School Biosphere & Botanical Patch',
    sceneImg: quizQ4Img,
    animType: 'quiz_q4_school_garden',
    ecoTruth: '🏫 Multi-Tier Campus Sanctuary: A garden holding herbs (Tulsi), tall shade trees (Neem), climbers, songbirds, and ground dwellers exhibits high biological diversity, boosting ecosystem resilience.',
    specimens: [
      { name: 'Tulsi', img: tulsiImg },
      { name: 'Neem', img: neemImg },
      { name: 'Squirrel', img: squirrelImg },
      { name: 'Sparrow', img: sparrowImg }
    ],
    sim: {
      actionPrompt: 'Test Garden Census Survey',
      normalLabel: 'Varied Multi-Species Campus',
      normalDesc: '🌿 Multi-Tier Sanctuary: Herbs, trees, insects, and songbirds all recorded living together.',
      perturbedLabel: 'Paved Concrete Yard',
      perturbedDesc: '⚠️ Single-Tree Landscape: Only 1 solitary tree in asphalt — minimal ecological variety.'
    },
    opts: [
      { label: 'A', text: 'Only one tree stands in the yard.', badge: '🌳 Single Plant' },
      { label: 'B', text: 'Diverse trees, birds, ants & squirrels thrive.', badge: '🦋 Rich Variety' },
      { label: 'C', text: 'The field has identical metal benches.', badge: '🪑 Artificial' },
      { label: 'D', text: 'Students play soccer on the grass.', badge: '⚽ Human Sport' }
    ],
    correct: 1,
    explain: 'A rich assortment of diverse plants and animals coexisting in the same environment is direct evidence of high biodiversity.'
  },
  {
    q: 'A garden has many plants but no insects. Which effect is MOST likely?',
    habitat: '🌺 Orchard & Blossom Pollination Zone',
    sceneImg: quizQ5Img,
    animType: 'quiz_q5_insect_pollination',
    ecoTruth: '🐝 Pollinator Dependency: Flowering herbs like Jasmine and Rose rely on insects transferring pollen grains between flowers. Without insect activity, blossoms wither unfertilised and seed production halts.',
    specimens: [
      { name: 'Jasmine', img: jasmineImg },
      { name: 'Rose', img: roseImg },
      { name: 'Ant', img: antImg }
    ],
    sim: {
      actionPrompt: 'Test Pollinator Depletion',
      normalLabel: 'Active Insect Pollination',
      normalDesc: '🌸 Natural Fertilisation: Insects carry pollen grain between flowers so fruits and seeds develop.',
      perturbedLabel: 'Complete Insect Absence',
      perturbedDesc: '⚠️ Stagnant Pollen: Without insects, blossoms drop unfertilised and cannot yield viable seeds.'
    },
    opts: [
      { label: 'A', text: 'Plants have severe difficulty producing seeds.', badge: '🌱 No Seeds' },
      { label: 'B', text: 'All garden shrubs petrify into rocks.', badge: '🪨 Transformation' },
      { label: 'C', text: 'Tree trunks shrink and disappear overnight.', badge: '🌲 Shrinkage' },
      { label: 'D', text: 'The underground soil evaporates.', badge: '💨 Evaporation' }
    ],
    correct: 0,
    explain: 'Many insects serve as pollinators, transferring pollen between blossoms which is essential for plant fertilisation and seed development.'
  },
  {
    q: 'Which statement BEST explains why plants and animals are called interdependent?',
    habitat: '🌿 Meadow Pasture & Woodland Web',
    sceneImg: quizQ6Img,
    animType: 'quiz_q6_interdependence',
    ecoTruth: '🤝 Symbiotic Interdependence: Flora and fauna are woven together. Plants provide oxygen, nourishment, and shelter; herbivores recycle minerals back into soil; birds control insect numbers.',
    specimens: [
      { name: 'Grass', img: grassImg },
      { name: 'Cow', img: cowImg },
      { name: 'Neem', img: neemImg },
      { name: 'Crow', img: crowImg }
    ],
    sim: {
      actionPrompt: 'Test Symbiotic Web Ties',
      normalLabel: 'Mutual Support Network',
      normalDesc: '🔄 Mutual Reliance: Plants give food & oxygen; animals enrich soil & disperse seeds.',
      perturbedLabel: 'Severed Interdependence',
      perturbedDesc: '⚠️ Isolated Organisms: Cutting ties causes nutrient starvation and breakdown of food webs.'
    },
    opts: [
      { label: 'A', text: 'They live completely isolated without contact.', badge: '🚫 Isolated' },
      { label: 'B', text: 'They support each other via food, shelter & seeds.', badge: '🤝 Mutual Aid' },
      { label: 'C', text: 'Every creature eats identical food items.', badge: '🥣 Identical Diet' },
      { label: 'D', text: 'They never cross paths in the wild.', badge: '🚫 No Contact' }
    ],
    correct: 1,
    explain: 'Plants and animals rely on one another: plants provide food and oxygen, while animals aid pollination, seed transport, and nutrient cycles.'
  },
  {
    q: 'Which park environment is healthier and supports the greatest variety of life?',
    habitat: '💧 Bio-Diverse Water & Woodland Park',
    sceneImg: quizQ7Img,
    animType: 'quiz_q7_wetland_park',
    ecoTruth: '💧 Freshwater & Canopy Reserve: A pristine park with rich plant tiers, water pools, frogs, and squirrels maintains natural food webs and thermal balance far exceeding sterile urban hardscapes.',
    specimens: [
      { name: 'Tulsi', img: tulsiImg },
      { name: 'Neem', img: neemImg },
      { name: 'Frog', img: frogImg },
      { name: 'Squirrel', img: squirrelImg }
    ],
    sim: {
      actionPrompt: 'Test Green Park vs Concrete Lot',
      normalLabel: 'Multi-Layer Nature Reserve',
      normalDesc: '🌿 High Biodiversity: 15+ flora species, water ponds, birds, and frogs create stable balance.',
      perturbedLabel: 'Paved Urban Concrete Lot',
      perturbedDesc: '⚠️ Monolithic Concrete: Artificial surface prevents plant root growth and shelters no fauna.'
    },
    opts: [
      { label: 'A', text: 'A paved concrete yard with steel benches.', badge: '🏢 Concrete' },
      { label: 'B', text: 'A green park with 15 plant species & diverse fauna.', badge: '🌳 Thriving Flora' },
      { label: 'C', text: 'A barren gravel field with one lone tree.', badge: '🪨 Gravel' },
      { label: 'D', text: 'An indoor room with artificial plastic plants.', badge: '🛋️ Artificial' }
    ],
    correct: 1,
    explain: 'A habitat rich in diverse plant and animal species is far more resilient, vibrant, and capable of sustaining thriving life.'
  },
  {
    q: 'A farmer removes every insect from his field. Which is the BEST ecological prediction?',
    habitat: '🌾 Crop Agro-Ecosystem Field',
    sceneImg: quizQ8Img,
    animType: 'quiz_q8_food_chain',
    ecoTruth: '🌾 Foundation Food Web: Soil excavators (ants) and field insects form the vital base of the terrestrial food web. Eradicating them deprives sparrows and songbirds of food, triggering trophic collapse.',
    specimens: [
      { name: 'Ant', img: antImg },
      { name: 'Sparrow', img: sparrowImg },
      { name: 'Crow', img: crowImg }
    ],
    sim: {
      actionPrompt: 'Test Insect Eradication Impact',
      normalLabel: 'Living Food Chain',
      normalDesc: '🦗 Insect Base: Plentiful insects cycle ground soil and supply crucial protein to birds.',
      perturbedLabel: 'Chemical Insect Eradication',
      perturbedDesc: '⚠️ Food Web Disruption: Zero insects! Sparrows and songbirds suffer catastrophic starvation.'
    },
    opts: [
      { label: 'A', text: 'Insect-eating birds face severe food shortages.', badge: '🦅 Bird Hunger' },
      { label: 'B', text: 'Fruit trees abruptly shrink in physical size.', badge: '📉 Tree Shrink' },
      { label: 'C', text: 'The sun begins shining twice as intensely.', badge: '☀️ Solar Shift' },
      { label: 'D', text: 'Underground natural streams evaporate.', badge: '💧 Evaporation' }
    ],
    correct: 0,
    explain: 'Many birds rely directly on insects for nutrition. Eliminating all insects breaks this food chain and deprives birds of prey.'
  }
];

// ============================================================================
// BOTANICAL SLOGAN PAGE ORNAMENTS (MATCHING SLOGAN DESIGN LANGUAGE)
// ============================================================================

// Leafy Vine Branch extending outwards flanking the main title
const TitleVineBranch = ({ side = 'left' }) => (
  <svg
    width="54"
    height="26"
    viewBox="0 0 80 32"
    fill="none"
    style={{
      transform: side === 'right' ? 'scaleX(-1)' : 'none',
      flexShrink: 0,
      opacity: 0.95
    }}
  >
    <path
      d="M75 16 C55 14, 35 8, 8 2"
      stroke="#14452F"
      strokeWidth="2.8"
      strokeLinecap="round"
    />
    <path d="M12 4 C16 1, 24 3, 26 8 C26 12, 20 14, 16 12 C12 10, 10 7, 12 4 Z" fill="#14452F" />
    <path d="M28 7 C34 4, 42 7, 43 13 C43 17, 37 19, 33 16 C29 13, 26 10, 28 7 Z" fill="#2D6A4F" />
    <path d="M46 11 C52 9, 60 12, 61 17 C61 21, 55 23, 51 20 C47 17, 44 14, 46 11 Z" fill="#10B981" />
    <path d="M22 14 C26 18, 25 24, 21 26 C17 28, 13 25, 14 20 C15 16, 19 13, 22 14 Z" fill="#14452F" />
    <path d="M40 18 C44 22, 43 27, 39 29 C35 31, 31 28, 32 23 C33 20, 37 17, 40 18 Z" fill="#2D6A4F" />
  </svg>
);

// Botanical Sprout Motif directly beneath the title in the center
const TitleSprout = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '-2px' }}>
    <svg width="28" height="16" viewBox="0 0 32 20" fill="none">
      <path d="M16 20 C16 12, 16 4, 16 2" stroke="#14452F" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M16 8 C11 5, 4 8, 3 13 C4 17, 10 17, 14 13 C16 11, 16 9, 16 8 Z" fill="#14452F" />
      <path d="M16 8 C21 5, 28 8, 29 13 C28 17, 22 17, 18 13 C16 11, 16 9, 16 8 Z" fill="#2D6A4F" />
      <path d="M16 3 C14 1, 15 0, 16 0 C17 0, 18 1, 16 3 Z" fill="#10B981" />
    </svg>
  </div>
);

// Top Hanging Tree Foliage in corners (subtle ambient background)
const TopCornerFoliage = ({ side = 'left' }) => (
  <div style={{
    position: 'absolute',
    top: 0,
    [side]: 0,
    width: '70px',
    height: '35px',
    pointerEvents: 'none',
    zIndex: 1,
    overflow: 'hidden',
    transform: side === 'right' ? 'scaleX(-1)' : 'none',
    opacity: 0.28
  }}>
    <svg width="100%" height="100%" viewBox="0 0 200 110" preserveAspectRatio="none" fill="none">
      <path d="M0 0 C45 22, 100 38, 155 32 C175 30, 192 24, 200 18" stroke="#14452F" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M65 28 C88 50, 122 66, 150 70" stroke="#14452F" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M35 16 C50 38, 72 65, 88 86" stroke="#14452F" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M38 12 C54 2, 74 10, 80 24 C68 31, 48 26, 38 12 Z" fill="#2D6A4F" />
      <path d="M75 22 C96 14, 118 22, 124 38 C110 45, 88 38, 75 22 Z" fill="#14452F" />
      <path d="M118 28 C140 20, 162 27, 168 43 C154 50, 132 43, 118 28 Z" fill="#2D6A4F" />
      <path d="M150 28 C172 22, 188 30, 194 43 C180 49, 164 43, 150 28 Z" fill="#10B981" />
      <path d="M55 33 C72 27, 88 38, 90 52 C76 57, 60 49, 55 33 Z" fill="#10B981" />
      <path d="M92 44 C108 38, 125 48, 126 62 C112 67, 97 59, 92 44 Z" fill="#2D6A4F" />
      <path d="M125 54 C142 48, 158 58, 160 72 C146 77, 131 69, 125 54 Z" fill="#10B981" />
      <path d="M60 60 C76 55, 90 68, 90 82 C76 86, 64 76, 60 60 Z" fill="#14452F" />
      <path d="M22 34 C36 28, 50 36, 52 50 C38 54, 26 46, 22 34 Z" fill="#2D6A4F" />
    </svg>
  </div>
);

// Soft Mountain Silhouette Backdrop behind the header
const TopMountainBackdrop = () => (
  <div style={{
    position: 'absolute',
    top: 0,
    left: '8%',
    right: '8%',
    height: '75px',
    pointerEvents: 'none',
    zIndex: 1,
    opacity: 0.12,
    overflow: 'hidden'
  }}>
    <svg width="100%" height="75" viewBox="0 0 1000 75" preserveAspectRatio="none" fill="none">
      <path d="M0 68 Q160 32 260 52 T520 28 T760 48 T1000 35 L1000 75 L0 75 Z" fill="#10B981" />
      <path d="M100 72 Q290 35 440 56 T720 38 T1000 52 L1000 75 L0 75 Z" fill="#14452F" />
    </svg>
  </div>
);

// Subtle Botanical Corner Flourish - scaled so it does NOT overlap text
const CardCornerLeaves = ({ position = 'top-left' }) => {
  const transforms = {
    'top-left': 'scale(1, 1)',
    'top-right': 'scale(-1, 1)',
    'bottom-left': 'scale(1, -1)',
    'bottom-right': 'scale(-1, -1)'
  };
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 96 96"
      fill="none"
      style={{
        position: 'absolute',
        top: position.includes('top') ? '2px' : 'auto',
        bottom: position.includes('bottom') ? '2px' : 'auto',
        left: position.includes('left') ? '2px' : 'auto',
        right: position.includes('right') ? '2px' : 'auto',
        transform: transforms[position],
        opacity: 0.22,
        pointerEvents: 'none',
        zIndex: 1
      }}
    >
      <path d="M4 4 C24 14, 48 30, 62 54 C74 72, 82 86, 88 94" stroke="#14452F" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M4 22 C18 30, 38 46, 48 66 C56 80, 60 90, 62 94" stroke="#2D6A4F" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M22 4 C30 18, 46 38, 66 48 C80 56, 90 60, 94 62" stroke="#2D6A4F" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M14 6 C26 2, 36 8, 38 18 C26 24, 16 18, 14 6 Z" fill="#14452F" />
      <path d="M6 14 C2 26, 8 36, 18 38 C24 26, 18 16, 6 14 Z" fill="#2D6A4F" />
      <path d="M30 16 C44 10, 56 18, 56 30 C42 36, 32 28, 30 16 Z" fill="#10B981" />
      <path d="M16 30 C10 44, 18 56, 30 56 C36 42, 28 32, 16 30 Z" fill="#2D6A4F" />
      <path d="M46 32 C60 26, 72 36, 70 48 C56 54, 46 44, 46 32 Z" fill="#14452F" />
      <path d="M32 46 C26 60, 36 72, 48 70 C54 56, 44 46, 32 46 Z" fill="#10B981" />
      <path d="M60 52 C74 48, 84 58, 80 70 C68 74, 58 64, 60 52 Z" fill="#2D6A4F" />
      <path d="M52 60 C48 74, 58 84, 70 80 C74 68, 64 58, 52 60 Z" fill="#14452F" />
      <path d="M72 70 C84 70, 92 80, 88 90 C78 92, 72 82, 72 70 Z" fill="#10B981" />
    </svg>
  );
};

// Rich background botanical leaves pattern visibly spreading across the box interior
const SpreadingLeavesWatermark = () => (
  <div style={{
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    overflow: 'hidden',
    zIndex: 0,
    opacity: 0.12
  }}>
    <svg width="100%" height="100%" viewBox="0 0 400 620" preserveAspectRatio="none" fill="none">
      <g transform="translate(250, 10) rotate(22)">
        <path d="M70 0 C60 70, 25 150, -60 210" stroke="#14452F" strokeWidth="3.2" strokeLinecap="round" />
        <path d="M60 30 C84 22, 106 38, 98 64 C72 72, 54 54, 60 30 Z" fill="#14452F" />
        <path d="M48 72 C22 66, 4 84, 10 110 C34 116, 54 98, 48 72 Z" fill="#2D6A4F" />
        <path d="M34 114 C58 108, 80 124, 72 150 C46 158, 28 138, 34 114 Z" fill="#10B981" />
      </g>
      <g transform="translate(-15, 220) rotate(-12)">
        <path d="M0 70 C60 58, 130 54, 210 80" stroke="#14452F" strokeWidth="3" strokeLinecap="round" />
        <path d="M50 62 C60 36, 88 28, 106 48 C98 72, 72 80, 50 62 Z" fill="#2D6A4F" />
        <path d="M94 56 C110 30, 138 24, 154 44 C144 68, 118 76, 94 56 Z" fill="#10B981" />
        <path d="M138 58 C158 34, 188 32, 202 54 C188 78, 160 82, 138 58 Z" fill="#14452F" />
      </g>
    </svg>
  </div>
);

// Ornate Botanical Divider in Card (matching slogan page)
const CardLeafDivider = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    width: '100%',
    margin: '8px 0 10px 0'
  }}>
    <div style={{ flex: 1, height: '1.5px', background: 'linear-gradient(90deg, transparent, #14452F)' }} />
    <svg width="28" height="15" viewBox="0 0 40 22" fill="none">
      <path d="M20 20 C20 12, 20 4, 20 2" stroke="#14452F" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 10 C14 7, 7 10, 6 15 C7 19, 13 19, 18 15 C20 13, 20 11, 20 10 Z" fill="#2D6A4F" />
      <path d="M20 10 C26 7, 33 10, 34 15 C33 19, 27 19, 22 15 C20 13, 20 11, 20 10 Z" fill="#10B981" />
    </svg>
    <div style={{ flex: 1, height: '1.5px', background: 'linear-gradient(90deg, #14452F, transparent)' }} />
  </div>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function AppreciatingBiodiversityActivity({ onBackToDashboard, onNextActivity, subStep, onSubStepChange }) {
  const { theme } = useTheme();

  // Tabs and general phases
  const [activeTab, setActiveTab] = useState(subStep === 'quiz' ? 'quiz' : 'board'); // board | quiz
  const [phase, setPhase] = useState(subStep === 'board' ? 'board' : (subStep === 'pick' ? 'pick' : 'timer')); // timer | pick | board | completed

  const [timer, setTimer] = useState(10);
  const [timerRunning, setTimerRunning] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState('Tulsi');
  const [selectedAnimal, setSelectedAnimal] = useState('');
  const [pickStep, setPickStep] = useState(1); // 1 = Select Plant, 2 = Select Animal
  const [plantPage, setPlantPage] = useState(0); // 0 = Page 1 (1-2), 1 = Page 2 (3-4), 2 = Page 3 (5-6)
  const [animalPage, setAnimalPage] = useState(0); // 0 = Page 1 (1-2), 1 = Page 2 (3-4), 2 = Page 3 (5-6)
  const [pickMode, setPickMode] = useState('stepper'); // 'stepper' only
  const [boardCards, setBoardCards] = useState((subStep === 'board' || subStep === 'quiz') ? [{ name: 'You', plant: 'Tulsi', animal: 'Crow', isMe: true }, ...CLASSMATES] : []);
  const [boardPage, setBoardPage] = useState(1);
  const [boardFilter, setBoardFilter] = useState('all'); // all | me
  const [cardLikes, setCardLikes] = useState({
    'You': 8,
    'Tamizh': 6,
    'Gopal': 5,
    'Priya': 7,
    'Vijay': 9,
    'Lavanya': 4,
    'Iniyan': 6
  });
  const [activeLivingAnimal, setActiveLivingAnimal] = useState(null);
  const [inspectCard, setInspectCard] = useState(null);
  const [previewSpecimen, setPreviewSpecimen] = useState(null);

  // Sound & Fullscreen states
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Quiz state
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [quizChecked, setQuizChecked] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [simToggled, setSimToggled] = useState(false);

  const timerRef = useRef(null);
  const natureAudioRef = useRef(null);
  const ecosystemFxRef = useRef(null);

  useEffect(() => {
    if (subStep === 'board') {
      setActiveTab('board');
      setPhase('board');
      setBoardCards(prev => prev.length > 0 ? prev : [{ name: 'You', plant: selectedPlant || 'Tulsi', animal: selectedAnimal || 'Crow', isMe: true }, ...CLASSMATES]);
    } else if (subStep === 'quiz') {
      setActiveTab('quiz');
      setPhase('board');
      setBoardCards(prev => prev.length > 0 ? prev : [{ name: 'You', plant: selectedPlant || 'Tulsi', animal: selectedAnimal || 'Crow', isMe: true }, ...CLASSMATES]);
    } else if (subStep === 'appreciate') {
      setActiveTab('board');
      if (phase === 'board') setPhase('timer');
    }
  }, [subStep]);

  // Handle Reflection Countdown with audible ticks & nature soundscape
  useEffect(() => {
    if (timerRunning && timer > 0) {
      timerRef.current = setTimeout(() => {
        setTimer(t => {
          const next = t - 1;
          if (!isMuted && next > 0) {
            sounds.playPop();
          }
          return next;
        });
      }, 1000);
    } else if (timerRunning && timer === 0) {
      setTimerRunning(false);
      if (natureAudioRef.current) natureAudioRef.current.pause();
      if (!isMuted) {
        sounds.playStar();
      }
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.55 } });
      setPhase('pick');
    }
    return () => clearTimeout(timerRef.current);
  }, [timerRunning, timer, isMuted]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => { });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => { });
      setIsFullscreen(false);
    }
  };

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    sounds.setMuted(next);
    if (natureAudioRef.current) {
      if (next) {
        natureAudioRef.current.pause();
      } else if (timerRunning) {
        natureAudioRef.current.play().catch(() => { });
      }
    }
  };

  const handleStartTimer = () => {
    if (!isMuted) sounds.playClick();
    setTimer(10);
    setTimerRunning(true);
    if (natureAudioRef.current && !isMuted) {
      natureAudioRef.current.currentTime = 0;
      natureAudioRef.current.volume = 0.5;
      natureAudioRef.current.play().catch(() => { });
    }
  };

  const handleSkipTimer = () => {
    if (!isMuted) sounds.playClick();
    setTimerRunning(false);
    clearTimeout(timerRef.current);
    if (natureAudioRef.current) natureAudioRef.current.pause();
    setPhase('pick');
  };

  const handleSelectPlant = (p) => {
    if (!isMuted) sounds.playClick();
    setSelectedPlant(p);
    if (selectedAnimal && !isMuted) {
      sounds.playStar();
    }
    // Realistic rain animation of neem, peepal, tulsi and flower rain jasmine, rose petals
    if (p === 'Neem') {
      ecosystemFxRef.current?.trigger({ type: 'neem_rain' });
    } else if (p === 'Peepal') {
      ecosystemFxRef.current?.trigger({ type: 'peepal_rain' });
    } else if (p === 'Tulsi') {
      ecosystemFxRef.current?.trigger({ type: 'tulsi_rain' });
    } else if (p === 'Jasmine') {
      ecosystemFxRef.current?.trigger({ type: 'jasmine_rain' });
    } else if (p === 'Rose') {
      ecosystemFxRef.current?.trigger({ type: 'rose_rain' });
    } else {
      ecosystemFxRef.current?.trigger({ type: 'botanical_rain' });
    }
  };

  const handleSelectAnimal = (a) => {
    if (!isMuted) {
      if (a === 'Frog') {
        sounds.playWaterSplash();
      } else if (a === 'Crow' || a === 'Sparrow' || a === 'Squirrel') {
        sounds.playBirdChirp();
      } else {
        sounds.playClick();
      }
    }
    setSelectedAnimal(a);
    if (selectedPlant && !isMuted) {
      sounds.playStar();
    }
  };

  const handleAddToBoard = () => {
    if (!selectedPlant || !selectedAnimal) return;
    if (!isMuted) sounds.playSuccess();
    const myCard = { name: 'You', plant: selectedPlant, animal: selectedAnimal, isMe: true };
    const all = [myCard, ...CLASSMATES];
    setBoardCards(all);
    setPhase('board');
    if (onSubStepChange) onSubStepChange('board');
    confetti({ particleCount: 110, spread: 75, origin: { y: 0.6 } });
  };

  const handleLikeCard = (cardName, e) => {
    if (e) e.stopPropagation();
    if (!isMuted) sounds.playStar();
    setCardLikes(prev => ({
      ...prev,
      [cardName]: (prev[cardName] || 0) + 1
    }));
    const clientX = e?.clientX || (typeof window !== 'undefined' ? window.innerWidth / 2 : 500);
    const clientY = e?.clientY || (typeof window !== 'undefined' ? window.innerHeight / 2 : 400);
    confetti({
      particleCount: 22,
      spread: 45,
      origin: {
        x: clientX / (typeof window !== 'undefined' ? window.innerWidth : 1000),
        y: clientY / (typeof window !== 'undefined' ? window.innerHeight : 800)
      },
      colors: ['#10B981', '#34D399', '#F59E0B', '#FBBF24']
    });
  };

  const handleTriggerLivingLocomotion = (animalName, plantName, e) => {
    if (e) e.stopPropagation();
    if (!isMuted) {
      if (animalName === 'Frog') {
        sounds.playWaterSplash();
      } else if (animalName === 'Crow' || animalName === 'Sparrow' || animalName === 'Squirrel') {
        sounds.playBirdChirp();
      } else {
        sounds.playPop();
      }
    }
    setActiveLivingAnimal(animalName);
    if (plantName) {
      ecosystemFxRef.current?.setSpecimen(plantName);
    }
    setTimeout(() => {
      setActiveLivingAnimal(prev => prev === animalName ? null : prev);
    }, 4000);
  };

  const handleReset = () => {
    if (!isMuted) sounds.playClick();
    setTimer(10);
    setTimerRunning(false);
    clearTimeout(timerRef.current);
    setSelectedPlant('');
    setSelectedAnimal('');
    setPickStep(1);
    setPlantPage(0);
    setAnimalPage(0);
    setBoardCards([]);
    setCurrentQIndex(0);
    setSelectedOpt(null);
    setQuizChecked(false);
    setQuizAnswers({});
    setSimToggled(false);
    setPhase('timer');
    setActiveTab('board');
  };

  const handleCheckAnswer = () => {
    const correct = QUIZ_QUESTIONS[currentQIndex].correct;
    const isCorrect = selectedOpt === correct;
    setQuizChecked(true);
    setQuizAnswers(prev => ({
      ...prev,
      [currentQIndex]: isCorrect
    }));

    if (!isMuted) {
      if (isCorrect) {
        sounds.playSuccess();
      } else {
        sounds.playWrong();
      }
    }

    // Trigger realistic animation effect according to the answer clicked
    if (isCorrect) {
      const effectType = QUIZ_QUESTIONS[currentQIndex]?.animType || 'quiz_q1_biodiversity';
      ecosystemFxRef.current?.trigger({ type: effectType });
    } else {
      // Gentle calming autumn leaf drift on incorrect answer
      ecosystemFxRef.current?.trigger({ type: 'gentle_autumn' });
    }
  };

  const handlePrevQuestion = () => {
    if (!isMuted) sounds.playClick();
    if (currentQIndex > 0) {
      setCurrentQIndex(currentQIndex - 1);
      setSelectedOpt(null);
      setQuizChecked(false);
      setSimToggled(false);
    } else {
      setActiveTab('board');
    }
  };

  const handleNextQuestion = () => {
    if (!isMuted) sounds.playClick();
    setSelectedOpt(null);
    setQuizChecked(false);
    setSimToggled(false);
    if (currentQIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      setPhase('completed');
      if (!isMuted) sounds.playStar();
      confetti({ particleCount: 160, spread: 85, origin: { y: 0.6 } });
      ecosystemFxRef.current?.trigger({ type: 'quiz_q1_biodiversity', count: 40 });
    }
  };

  const handleSelectAnswer = (idx, evt) => {
    if (!quizChecked) {
      if (!isMuted) sounds.playClick();
      setSelectedOpt(idx);

      const isCorrect = idx === QUIZ_QUESTIONS[currentQIndex]?.correct;
      const animType = QUIZ_QUESTIONS[currentQIndex]?.animType || 'quiz_q1_biodiversity';

      // Origin point of click for dynamic physical trajectory
      const rect = evt?.currentTarget?.getBoundingClientRect();
      const origin = rect ? {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      } : null;

      if (isCorrect) {
        // Trigger question-specific realistic biological animation immediately upon selecting correct answer
        ecosystemFxRef.current?.trigger({ type: animType, origin });
      } else {
        // Micro click burst reaction with subtle leaf drift on wrong/other option
        ecosystemFxRef.current?.trigger({ type: 'click_burst', origin });
      }
    }
  };

  // Stats calculation
  const uniquePlants = [...new Set(boardCards.map(c => c.plant))].length;
  const uniqueAnimals = [...new Set(boardCards.map(c => c.animal))].length;
  const totalCards = boardCards.length;

  // Filtered Cards for Class Board
  const filteredBoardCards = boardCards.filter(card => {
    if (boardFilter === 'me') return card.isMe;
    return true;
  });

  // Dynamic Reflection Prompt text
  const getReflectionPrompt = () => {
    if (!timerRunning && timer === 10) {
      return "Close your eyes, breathe calmly, and reflect on the beautiful variety of plants and animals you discovered on the nature walk.";
    }
    if (timer >= 8) {
      return "🌿 Breathe in gently... Picture the lush neem trees, sweet jasmine, and tender herbs in the sun.";
    }
    if (timer >= 4) {
      return "🍃 Listen to the gentle breeze... Recall the cheerful sparrows, cows, ants, and pond frogs.";
    }
    return "✨ Observe nature's harmony... Plants and animals live together and support each other's survival.";
  };

  // --------------------------------------------------------------------------
  // UNIFIED GLOBAL BOTTOM NAVIGATION LOGIC (Back & Next)
  // --------------------------------------------------------------------------
  const getBackLabel = () => {
    if (activeTab === 'quiz') {
      if (phase === 'completed') return 'Back to Memory Wall';
      if (currentQIndex > 0) return 'Previous Question';
      return 'Back to Memory Wall';
    }
    if (phase === 'board') return 'Back to Specimen Picker';
    if (phase === 'pick') {
      if (pickMode === 'stepper' && pickStep === 2) return 'Back to Plant Picker';
      return 'Back to Reflection';
    }
    return 'Back to Activity 2.1';
  };

  const getNextLabel = () => {
    if (activeTab === 'quiz') {
      if (phase === 'completed') return 'Next: Activity 2.3';
      if (selectedOpt !== null && !quizChecked) return 'Verify & Next';
      if (currentQIndex === QUIZ_QUESTIONS.length - 1) return 'Finish Quiz';
      return 'Next Question';
    }
    if (phase === 'board') return 'Next: Ecosystem Quiz';
    if (phase === 'pick') {
      if (pickMode === 'stepper' && pickStep === 1) return 'Next: Select Animal';
      return 'Next: Class Memory Wall';
    }
    return 'Next: Specimen Picker';
  };

  const getStageIndicator = () => {
    if (activeTab === 'quiz') {
      if (phase === 'completed') return 'Quiz Completed';
      return `Question ${currentQIndex + 1} / ${QUIZ_QUESTIONS.length}`;
    }
    if (phase === 'board') return 'Stage 3 / 3 · Class Board';
    if (phase === 'pick') return 'Stage 2 / 3 · Specimen Picker';
    return 'Stage 1 / 3 · Ecosystem Timer';
  };

  const handleGlobalPrev = () => {
    if (!isMuted) sounds.playClick();

    // 1. If inside Quiz
    if (activeTab === 'quiz') {
      if (phase === 'completed') {
        setPhase('board');
        setActiveTab('quiz');
        setCurrentQIndex(QUIZ_QUESTIONS.length - 1);
        return;
      }
      if (currentQIndex > 0) {
        setCurrentQIndex(prev => prev - 1);
        setSelectedOpt(null);
        setQuizChecked(false);
        setSimToggled(false);
        return;
      }
      // Return from Q0 to Memory Wall
      setActiveTab('board');
      setPhase('board');
      return;
    }

    // 2. If in Class Memory Wall
    if (activeTab === 'board' && phase === 'board') {
      setPhase('pick');
      return;
    }

    // 3. If in Specimen Picker
    if (activeTab === 'board' && phase === 'pick') {
      if (pickMode === 'stepper' && pickStep === 2) {
        setPickStep(1);
        return;
      }
      setPhase('timer');
      return;
    }
  };

  const handleGlobalBack = () => {
    if (!isMuted) sounds.playClick();
    if (onBackToDashboard) {
      onBackToDashboard(false);
    }
  };

  const handleGlobalNext = () => {
    if (!isMuted) sounds.playClick();

    // 1. If in Reflection (Phase 1) -> advance to Specimen Picker
    if (activeTab === 'board' && phase === 'timer') {
      setTimerRunning(false);
      clearTimeout(timerRef.current);
      if (natureAudioRef.current) natureAudioRef.current.pause();
      setPhase('pick');
      return;
    }

    // 2. If in Specimen Picker (Phase 2)
    if (activeTab === 'board' && phase === 'pick') {
      if (pickMode === 'stepper' && pickStep === 1) {
        if (!selectedPlant) setSelectedPlant('Tulsi');
        setPickStep(2);
        return;
      }
      // Ensure defaults if not explicitly tapped so student can always advance smoothly
      const plantToUse = selectedPlant || 'Tulsi';
      const animalToUse = selectedAnimal || 'Crow';
      setSelectedPlant(plantToUse);
      setSelectedAnimal(animalToUse);
      const myCard = { name: 'You', plant: plantToUse, animal: animalToUse, isMe: true };
      setBoardCards([myCard, ...CLASSMATES]);
      setPhase('board');
      if (onSubStepChange) onSubStepChange('board');
      if (!isMuted) sounds.playSuccess();
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
      return;
    }

    // 3. If in Class Memory Wall (Phase 3) -> advance to Quiz
    if (activeTab === 'board' && phase === 'board') {
      setActiveTab('quiz');
      setCurrentQIndex(0);
      setSelectedOpt(null);
      setQuizChecked(false);
      setSimToggled(false);
      if (onSubStepChange) onSubStepChange('quiz');
      return;
    }

    // 4. If in Quiz (Phase 4)
    if (activeTab === 'quiz') {
      if (phase === 'completed') {
        if (onNextActivity) onNextActivity();
        else if (onBackToDashboard) onBackToDashboard('next_activity');
        return;
      }

      // If student selected an answer and it's not verified yet, verify first
      if (selectedOpt !== null && !quizChecked) {
        handleCheckAnswer();
        return;
      }

      // Next question
      handleNextQuestion();
      return;
    }
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      minHeight: 0,
      backgroundImage: `url(${natureRiverBg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      fontFamily: '"Outfit", "Plus Jakarta Sans", sans-serif',
      color: '#A7F3D0', textShadow: '0 1px 3px rgba(0,0,0,0.8)',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Keyframe animations for slogan atmosphere */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&display=swap');
        .content-box {
          background: rgba(255, 255, 255, 0.08) !important;
          backdrop-filter: blur(4px) !important;
          -webkit-backdrop-filter: blur(5px) !important;
        }

        .forest-panel {
          background: linear-gradient(175deg, rgba(10, 61, 32, 0.76) 0%, rgba(5, 40, 20, 0.82) 100%) !important;
          backdrop-filter: blur(8px) !important;
          -webkit-backdrop-filter: blur(8px) !important;
          border: 1.5px solid rgba(250, 204, 21, 0.5) !important;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.15) !important;
        }

        .font-blur-area {
          background: rgba(15, 23, 42, 0.28) !important;
          backdrop-filter: blur(8px) !important;
          -webkit-backdrop-filter: blur(8px) !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.22) !important;
          border-radius: 18px !important;
        }

        .right-transparent-panel {
          background: rgba(255, 255, 255, 0.02) !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          border: 1.5px solid rgba(255, 255, 255, 0.4) !important;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15) !important;
        }

        /* Text Justification & Font Size Constraint */
        p, .biodiversity-desc, .modal-text {
          text-align: justify !important;
          text-justify: inter-word !important;
          hyphens: auto;
        }

        /* Dedicated Blurry Shade for Font Area (Visible Separately, No Whole-Box Blur) */
        .font-blurry-shade {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.22) 0%, rgba(10, 36, 20, 0.55) 100%) !important;
          backdrop-filter: blur(12px) !important;
          -webkit-backdrop-filter: blur(12px) !important;
          border: 1.5px solid rgba(255, 255, 255, 0.6) !important;
          border-radius: 24px !important;
          padding: 16px 36px !important;
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.35), 0 0 20px rgba(255, 255, 255, 0.12), inset 0 1px 2px rgba(255, 255, 255, 0.4) !important;
          max-width: 560px !important;
          width: fit-content !important;
          margin: 0 auto !important;
          text-align: center !important;
        }

        .font-blurry-shade h2 {
          text-align: center !important;
          text-justify: none !important;
          hyphens: none !important;
          -webkit-hyphens: none !important;
          word-break: normal !important;
          overflow-wrap: normal !important;
          filter: blur(0.65px) !important;
          -webkit-filter: blur(0.65px) !important;
        }

        .font-blurry-shade p {
          text-align: center !important;
          text-justify: none !important;
          hyphens: none !important;
          -webkit-hyphens: none !important;
          word-break: normal !important;
          overflow-wrap: normal !important;
          filter: blur(0.5px) !important;
          -webkit-filter: blur(0.5px) !important;
        }

        @keyframes reflectionPulse {
          0% { transform: scale(0.96); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.5); }
          50% { transform: scale(1.04); box-shadow: 0 0 0 18px rgba(16, 185, 129, 0); }
          100% { transform: scale(0.96); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.5); }
        }

        @keyframes timerSonarRing {
          0% { transform: scale(0.92); opacity: 0.9; }
          100% { transform: scale(1.48); opacity: 0; }
        }

        @keyframes timerGlowBreathe {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 12px rgba(56, 189, 248, 0.45)); }
          50% { transform: scale(1.035); filter: drop-shadow(0 0 26px rgba(16, 185, 129, 0.8)); }
        }

        @keyframes leafSway1 {
          0%, 100% { transform: rotate(-35deg) translateY(0px) scale(1); }
          50% { transform: rotate(-22deg) translateY(-6px) scale(1.18); }
        }

        @keyframes leafSway2 {
          0%, 100% { transform: rotate(35deg) scaleX(-1) translateY(0px) scale(1); }
          50% { transform: rotate(48deg) scaleX(-1) translateY(-6px) scale(1.18); }
        }

        @keyframes leafSway3 {
          0%, 100% { transform: rotate(-75deg) translateY(0px) scale(1); }
          50% { transform: rotate(-62deg) translateY(4px) scale(1.15); }
        }

        @keyframes leafSway4 {
          0%, 100% { transform: rotate(75deg) scaleX(-1) translateY(0px) scale(1); }
          50% { transform: rotate(88deg) scaleX(-1) translateY(4px) scale(1.15); }
        }

        @keyframes numberTick {
          0% { transform: scale(1.3); color: #2563EB; }
          60% { transform: scale(0.96); }
          100% { transform: scale(1); color: #0F172A; }
        }
      `}</style>

      {phase === 'timer' ? (
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '0.4rem 1.4rem',
          boxSizing: 'border-box',
          position: 'relative',
          zIndex: 10,
          overflow: 'hidden'
        }}>
          {/* ==================================================================== */}
          {/* TOP HEADER BAR: RUSTIC WOOD-CARVED SIGN & AMBER PILLS (ACTIVITY 2.2) */}
          {/* ==================================================================== */}
          <div style={{
            position: 'relative',
            width: '100%',
            padding: '0.4rem 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
            boxSizing: 'border-box',
            zIndex: 20,
            gap: '12px'
          }}>
            {/* Left: NCERT Lab Badge in dark amber glass */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0, position: 'relative', zIndex: 10 }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '16px',
                fontWeight: '800',
                color: '#FEF3C7',
                background: 'rgba(28, 18, 10, 0.85)',
                padding: '6px 18px',
                borderRadius: '20px',
                border: '1.5px solid rgba(245, 158, 11, 0.6)',
                boxShadow: '0 4px 14px rgba(0,0,0,0.35)',
                fontFamily: '"Outfit", sans-serif'
              }}>
                <span style={{ fontSize: '18px' }}>🌿</span>
                <span>NCERT Lab</span>
              </div>
            </div>



            {/* Right: Reset Button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0, position: 'relative', zIndex: 10 }}>
              <button
                type="button"
                onClick={handleReset}
                style={{
                  background: 'rgba(28, 18, 10, 0.85)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  border: '1.5px solid rgba(245, 158, 11, 0.6)',
                  borderRadius: '20px',
                  color: '#FEF3C7',
                  padding: '6px 18px',
                  fontSize: '16px',
                  fontWeight: 800,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.35)',
                  fontFamily: '"Outfit", sans-serif',
                  transition: 'all 0.18s ease'
                }}
              >
                <RefreshCw size={16} strokeWidth={2.4} color="#FBBF24" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* ==================================================================== */}
          {/* TWO PANEL CONTAINER: Left Forest Green Box + Right Transparent Blur  */}
          {/* ==================================================================== */}
          <div style={{
            flex: 1,
            minHeight: 0,
            display: 'grid',
            gridTemplateColumns: 'clamp(320px, 30vw, 380px) minmax(0, 1fr)',
            padding: '0.5rem 0',
            gap: '1rem',
            overflow: 'hidden',
            boxSizing: 'border-box'
          }}>
            {/* LEFT PANEL: Forest Green Box Panel */}
            <div style={{
              position: 'relative',
              background: 'linear-gradient(180deg, rgba(6, 44, 28, 0.94) 0%, rgba(3, 30, 18, 0.96) 100%)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1.8px solid rgba(110, 231, 183, 0.5)',
              borderRadius: '20px',
              padding: '16px 20px',
              boxShadow: '0 16px 40px rgba(0, 0, 0, 0.5), 0 0 24px rgba(16, 185, 129, 0.2)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '10px',
              overflowY: 'auto',
              boxSizing: 'border-box'
            }}>
              {/* Header: Subtitle & Title */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#6EE7B7',
                  fontWeight: 900,
                  fontSize: '16px',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  fontFamily: '"Outfit", sans-serif'
                }}>
                  <span>🌿</span>
                  <span>ACTIVITY 2.2 • LET US APPRECIATE</span>
                </div>

                <h2 style={{
                  fontFamily: '"Fraunces", Georgia, serif',
                  color: '#FFFBEB',
                  fontWeight: 900,
                  fontSize: '24px',
                  margin: '2px 0 0 0',
                  lineHeight: 1.15,
                  textShadow: '0 2px 6px rgba(0,0,0,0.95)'
                }}>
                  Ecosystem Appreciation 🍃
                </h2>
              </div>

              {/* Leaf Divider */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '4px 0', opacity: 0.85 }}>
                <div style={{ flex: 1, height: '1px', background: 'rgba(110, 231, 183, 0.4)' }} />
                <span style={{ fontSize: '18px' }}>🍃</span>
                <div style={{ flex: 1, height: '1px', background: 'rgba(110, 231, 183, 0.4)' }} />
              </div>

              {/* Narrative Text */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <p style={{
                  margin: 0,
                  fontSize: '16px',
                  lineHeight: '1.45',
                  color: '#D1FAE5',
                  fontFamily: '"Outfit", sans-serif',
                  fontWeight: 600,
                  textShadow: '0 1px 3px rgba(0,0,0,0.9)'
                }}>
                  Appreciating and conserving biodiversity is vital for life. Every organism in an ecosystem is interconnected.
                </p>
                <p style={{
                  margin: 0,
                  fontSize: '16px',
                  lineHeight: '1.45',
                  color: '#D1FAE5',
                  fontFamily: '"Outfit", sans-serif',
                  fontWeight: 600,
                  textShadow: '0 1px 3px rgba(0,0,0,0.9)'
                }}>
                  During our nature walk, different students discover different plants and animals. Together, our class observations reveal nature's grand living tapestry!
                </p>
              </div>

              {/* Highlight Challenge Box */}
              <div style={{
                background: 'rgba(4, 26, 16, 0.85)',
                border: '1.2px solid rgba(110, 231, 183, 0.4)',
                borderRadius: '14px',
                padding: '10px 14px',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.35)',
                color: '#FEF08A',
                fontSize: '16px',
                lineHeight: 1.45,
                fontFamily: '"Outfit", sans-serif'
              }}>
                <span style={{ marginRight: '6px' }}>✏️</span>
                <strong style={{ fontWeight: 900, color: '#FDE047' }}>Reflection challenge:</strong>{' '}
                Close your eyes for 10 seconds. Think of one plant and one animal from your walk, then add them to the virtual class board.
              </div>

              {/* Bottom Tag */}
              <div style={{
                textAlign: 'center',
                color: '#A7F3D0',
                fontSize: '16px',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontFamily: '"Outfit", sans-serif',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                textShadow: '0 1px 3px rgba(0,0,0,0.8)'
              }}>
                <span style={{ fontSize: '18px' }}>🍀</span>
                <span>NATURE CONNECTS US ALL</span>
              </div>
            </div>

            {/* RIGHT PANEL: Transparent Glass Box with Blur in Font Area */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: 0,
              minWidth: 0,
              flex: 1,
              width: '100%',
              maxWidth: '100%',
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'none',
              WebkitBackdropFilter: 'none',
              border: '1.5px solid rgba(255, 255, 255, 0.35)',
              borderRadius: '24px',
              padding: '14px 20px',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
              overflow: 'hidden',
              position: 'relative',
              justifyContent: 'space-between'
            }}>
              {/* Top Tab Pill */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                flexShrink: 0
              }}>
                <div className="font-blur-area" style={{
                  background: 'rgba(6, 40, 25, 0.75)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1.2px solid rgba(167, 243, 208, 0.45)',
                  borderRadius: '14px',
                  padding: '6px 18px',
                  color: '#6EE7B7',
                  fontSize: '16px',
                  fontWeight: 900,
                  fontFamily: '"Outfit", sans-serif',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)'
                }}>
                  <span>⏱️</span>
                  <span>10-Second Mindful Reflection</span>
                </div>
              </div>

              {/* Center Content: Circular Timer & Reflection Controls */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                gap: '14px',
                flex: 1,
                padding: '8px 0'
              }}>
                <div style={{
                  position: 'relative',
                  width: '148px',
                  height: '148px',
                  animation: timerRunning ? 'timerGlowBreathe 2s ease-in-out infinite' : 'none',
                  transition: 'transform 0.3s ease'
                }}>
                  {/* Outer halo */}
                  <div style={{
                    position: 'absolute',
                    inset: '-10px',
                    borderRadius: '50%',
                    background: timerRunning
                      ? 'radial-gradient(circle, rgba(167, 243, 208, 0.8) 0%, rgba(56, 189, 248, 0.55) 45%, transparent 70%)'
                      : 'radial-gradient(circle, rgba(167, 243, 208, 0.6) 0%, rgba(56, 189, 248, 0.35) 45%, transparent 70%)',
                    filter: 'blur(10px)',
                    pointerEvents: 'none',
                    transition: 'all 0.5s ease'
                  }} />

                  {timerRunning && (
                    <>
                      <div style={{
                        position: 'absolute',
                        inset: '-10px',
                        borderRadius: '50%',
                        border: '2px solid rgba(56, 189, 248, 0.75)',
                        animation: 'timerSonarRing 2s cubic-bezier(0.1, 0.2, 0.7, 1) infinite',
                        pointerEvents: 'none'
                      }} />
                      <div style={{
                        position: 'absolute',
                        inset: '-10px',
                        borderRadius: '50%',
                        border: '2px solid rgba(16, 185, 129, 0.75)',
                        animation: 'timerSonarRing 2s cubic-bezier(0.1, 0.2, 0.7, 1) infinite 1s',
                        pointerEvents: 'none'
                      }} />
                    </>
                  )}

                  {/* Leaf accents */}
                  <div style={{ position: 'absolute', top: '4px', left: '-12px', fontSize: '24px', transform: 'rotate(-35deg)', animation: timerRunning ? 'leafSway1 2.2s ease-in-out infinite' : 'none' }}>🍃</div>
                  <div style={{ position: 'absolute', top: '4px', right: '-12px', fontSize: '24px', transform: 'rotate(35deg) scaleX(-1)', animation: timerRunning ? 'leafSway2 2.2s ease-in-out infinite' : 'none' }}>🍃</div>
                  <div style={{ position: 'absolute', bottom: '16px', left: '-14px', fontSize: '20px', transform: 'rotate(-75deg)', animation: timerRunning ? 'leafSway3 2.5s ease-in-out infinite' : 'none' }}>🌿</div>
                  <div style={{ position: 'absolute', bottom: '16px', right: '-14px', fontSize: '20px', transform: 'rotate(75deg) scaleX(-1)', animation: timerRunning ? 'leafSway4 2.5s ease-in-out infinite' : 'none' }}>🌿</div>

                  {/* Inner Frosted Disc */}
                  <div style={{
                    position: 'absolute',
                    inset: '10px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(6, 40, 25, 0.95) 0%, rgba(3, 24, 15, 0.92) 100%)',
                    boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.35)',
                    border: '1.5px solid rgba(110, 231, 183, 0.4)'
                  }} />

                  {/* SVG Progress Circle */}
                  <svg width="148" height="148" viewBox="0 0 148 148" style={{ position: 'relative', zIndex: 2, transform: 'rotate(-90deg)' }}>
                    <defs>
                      <linearGradient id="timerRingGradientV2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#34D399" />
                        <stop offset="60%" stopColor="#10B981" />
                        <stop offset="100%" stopColor="#F59E0B" />
                      </linearGradient>
                    </defs>
                    <circle cx="74" cy="74" r="60" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="8" fill="none" />
                    <circle
                      cx="74"
                      cy="74"
                      r="60"
                      stroke="url(#timerRingGradientV2)"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={376.99}
                      strokeDashoffset={376.99 - (376.99 * timer) / 10}
                      strokeLinecap="round"
                      style={{ transition: 'stroke-dashoffset 0.8s linear' }}
                    />
                  </svg>

                  {/* Center Text with Live Countdown */}
                  <div
                    key={timer}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      zIndex: 3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px',
                      fontWeight: 900,
                      color: '#FFFFFF',
                      textShadow: '0 2px 8px rgba(0,0,0,0.95)',
                      fontFamily: '"Outfit", sans-serif',
                      letterSpacing: '-0.02em',
                      animation: timerRunning ? 'numberTick 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'none'
                    }}
                  >
                    {timer}s
                  </div>
                </div>

                {/* Heading & Subtitle in Font Blur Area */}
                <div className="font-blur-area" style={{
                  background: 'rgba(6, 40, 25, 0.75)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  borderRadius: '20px',
                  padding: '14px 28px',
                  border: '1.2px solid rgba(167, 243, 208, 0.45)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
                  maxWidth: '540px',
                  width: 'fit-content',
                  margin: '0 auto',
                  textAlign: 'center'
                }}>
                  <h3 style={{
                    margin: '0 0 4px 0',
                    fontFamily: '"Fraunces", Georgia, serif',
                    fontSize: '24px',
                    fontWeight: 900,
                    color: '#FFFFFF',
                    textShadow: '0 2px 6px rgba(0,0,0,0.95)',
                    lineHeight: 1.2,
                    textAlign: 'center'
                  }}>
                    10-Second Nature Reflection
                  </h3>
                  <p style={{
                    margin: 0,
                    fontSize: '16px',
                    color: '#D1FAE5',
                    textShadow: '0 1px 3px rgba(0,0,0,0.9)',
                    maxWidth: '480px',
                    lineHeight: 1.5,
                    fontFamily: '"Outfit", sans-serif',
                    fontWeight: 600,
                    textAlign: 'center'
                  }}>
                    Close your eyes and reflect on the plants and animals you saw on the nature walk.
                  </p>
                </div>

                {/* Primary Action Button: Start Reflection */}
                <div>
                  {!timerRunning ? (
                    <button
                      type="button"
                      onClick={handleStartTimer}
                      style={{
                        background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                        color: '#FFFFFF',
                        border: '1.8px solid #FDE68A',
                        borderRadius: '16px',
                        padding: '10px 32px',
                        fontSize: '18px',
                        fontWeight: 900,
                        fontFamily: '"Outfit", sans-serif',
                        cursor: 'pointer',
                        boxShadow: '0 6px 18px rgba(217, 119, 6, 0.45)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px',
                        transition: 'all 0.18s ease'
                      }}
                    >
                      <Play size={20} fill="#FFFFFF" />
                      <span>Start Reflection</span>
                    </button>
                  ) : (
                    <div style={{
                      background: 'rgba(6, 40, 25, 0.9)',
                      border: '1.8px solid #34D399',
                      borderRadius: '16px',
                      padding: '10px 28px',
                      fontSize: '18px',
                      fontWeight: 900,
                      color: '#A7F3D0',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 6px 18px rgba(16, 185, 129, 0.35)',
                      animation: 'reflectionPulse 1.8s infinite ease-in-out'
                    }}>
                      <span>🌿 Mindful Reflection: {timer}s left</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ==================================================================== */}
          {/* BOTTOM GLOBAL NAVIGATION BAR                                         */}
          {/* ==================================================================== */}
          <div style={{
            position: 'relative',
            width: '100%',
            padding: '0.4rem 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
            boxSizing: 'border-box',
            zIndex: 20
          }}>
            {/* Left Button: Back / Exit */}
            <div>
              <button
                type="button"
                className="bio-nav-btn"
                onClick={handleGlobalBack}
                aria-label="Back to Activity 2.1"
              >
                ← Back
              </button>
            </div>



            {/* Right Button: Next: Specimen Picker */}
            <div>
              <button
                type="button"
                className="bio-cta-btn"
                onClick={handleGlobalNext}
                aria-label="Next: Specimen Picker"
              >
                <span>{getNextLabel()}</span>
                <ArrowRight size={17} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      ) : phase === 'pick' ? (
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 'clamp(8px, 1.4vh, 18px) clamp(16px, 2vw, 32px)',
          boxSizing: 'border-box',
          position: 'relative',
          zIndex: 10,
          overflow: 'hidden'
        }}>
          {/* TOP BAR: Rustic Wooden Sign, Exit Button, Reset Button, and Cursive Slogan */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            width: '100%',
            flexShrink: 0
          }}>
            {/* Top Left: Wooden Plank Badge & Exit Button */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{
                background: 'linear-gradient(180deg, #7A4B23 0%, #543114 100%)',
                border: '2px solid #38200C',
                borderRadius: '8px',
                boxShadow: '0 4px 14px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.25)',
                padding: '6px 14px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#FEF3C7',
                fontFamily: '"Outfit", sans-serif',
                fontWeight: 800,
                fontSize: '15px',
                textShadow: '0 1px 3px rgba(0,0,0,0.9)'
              }}>
                <span style={{ fontSize: '17px' }}>🌿</span>
                <span>Activity 2.2 — Let us appreciate</span>
                <span style={{
                  background: '#38200C',
                  color: '#F1F5F9', textShadow: '0 1px 3px rgba(0,0,0,0.9)',
                  fontSize: '12px',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontWeight: 700
                }}>p.13</span>
              </div>

              <button
                type="button"
                onClick={() => { if (onBackToDashboard) onBackToDashboard(); }}
                style={{
                  background: 'rgba(15, 23, 42, 0.65)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  border: '1.2px solid rgba(255, 255, 255, 0.4)',
                  borderRadius: '20px',
                  color: '#ffffff',
                  padding: '5px 14px',
                  fontSize: '14px',
                  fontWeight: 800,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
                  fontFamily: '"Outfit", sans-serif',
                  alignSelf: 'flex-start',
                  transition: 'all 0.18s ease'
                }}
              >
                <ArrowLeft size={15} />
                <span>Exit Activity</span>
              </button>
            </div>

            {/* Top Right: Reset Button & Cursive Script */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
              <button
                type="button"
                onClick={handleReset}
                style={{
                  background: 'rgba(255, 255, 255, 0.88)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  border: '1.5px solid rgba(255, 255, 255, 0.7)',
                  borderRadius: '20px',
                  color: '#FFFFFF', textShadow: '0 1px 4px rgba(0,0,0,0.9)',
                  padding: '5px 14px',
                  fontSize: '14px',
                  fontWeight: 800,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  fontFamily: '"Outfit", sans-serif',
                  transition: 'all 0.18s ease'
                }}
              >
                <RefreshCw size={14} color="#1F2937" strokeWidth={2.4} />
                <span>Reset Activity</span>
              </button>

              <div style={{
                fontFamily: '"Caveat", "Dancing Script", cursive',
                fontSize: '22px',
                fontWeight: 700,
                color: '#FFFFFF',
                lineHeight: 1.15,
                textAlign: 'right',
                textShadow: '0 1px 4px rgba(0, 0, 0, 0.95)'
              }}>
                Small Observations<br />A Greener Tomorrow
              </div>
            </div>
          </div>

          {/* CENTER: Main Frosted Glass Board Container */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            flex: 1,
            minHeight: 0,
            justifyContent: 'center',
            padding: '2px 0'
          }}>
            {/* Tabs above the Card */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              width: 'min(94vw, 1140px)',
              marginBottom: '6px',
              justifyContent: 'flex-start'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                color: '#ffffff',
                borderRadius: '14px',
                padding: '7px 20px',
                fontSize: '14px',
                fontWeight: 800,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)',
                fontFamily: '"Outfit", sans-serif'
              }}>
                <span>👥</span>
                <span>Class Board (Pending)</span>
              </div>

              <button
                type="button"
                onClick={() => { setActiveTab('quiz'); }}
                style={{
                  background: 'rgba(255, 255, 255, 0.45)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1.2px solid rgba(255, 255, 255, 0.65)',
                  borderRadius: '14px',
                  padding: '7px 18px',
                  fontSize: '14px',
                  fontWeight: 800,
                  color: '#374151',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  fontFamily: '"Outfit", sans-serif',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                }}
              >
                <span>🌱</span>
                <span>Ecosystem Quiz</span>
                <Lock size={13} color="#6B7280" />
              </button>
            </div>

            {/* Completely Transparent Card */}
            <div className="content-box" style={{
              width: 'min(94vw, 1140px)',
              background: 'transparent',
              backdropFilter: 'none',
              WebkitBackdropFilter: 'none',
              border: '1.5px solid rgba(255, 255, 255, 0.35)',
              borderRadius: '24px',
              padding: 'clamp(10px, 1.4vh, 16px) clamp(14px, 1.8vw, 24px)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 'clamp(6px, 1vh, 10px)',
              position: 'relative',
              boxSizing: 'border-box',
              overflow: 'hidden'
            }}>
              {/* Card Header with Font Blur Area */}
              <div className="font-blur-area" style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                zIndex: 2,
                position: 'relative',
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(8px)',
                borderRadius: '14px',
                border: '1.2px solid rgba(255, 255, 255, 0.35)',
                padding: '8px 14px'
              }}>
                <div>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '12px',
                    fontWeight: 900,
                    color: '#FEF08A',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    fontFamily: '"Outfit", sans-serif',
                    textShadow: '0 1px 3px rgba(0,0,0,0.85)'
                  }}>
                    <span>🌱</span>
                    <span>GOAL</span>
                  </div>
                  <h2 style={{
                    margin: '2px 0 0',
                    fontFamily: '"Outfit", sans-serif',
                    fontSize: 'clamp(20px, 2.2vw, 24px)',
                    fontWeight: 900,
                    color: '#FFFFFF',
                    textShadow: '0 2px 8px rgba(0,0,0,0.9)',
                    lineHeight: 1.15
                  }}>
                    Ecosystem Reflection: Pick 1 Plant &amp; 1 Animal
                  </h2>
                  <div style={{
                    fontSize: '13px',
                    color: '#F1F5F9',
                    textShadow: '0 1px 4px rgba(0,0,0,0.85)',
                    fontWeight: 500,
                    marginTop: '2px',
                    fontFamily: '"Outfit", sans-serif'
                  }}>
                    Choose the specimens you observed during your nature walk to contribute to the shared Class Board.
                  </div>
                </div>

                <div style={{
                  fontFamily: '"Caveat", "Dancing Script", cursive',
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  textShadow: '0 1px 4px rgba(0,0,0,0.9)',
                  textAlign: 'right',
                  lineHeight: 1.1,
                  paddingRight: '6px'
                }}>
                  Different lives.<br />A shared home.
                </div>
              </div>

              {/* Card Body: Two Side-by-Side Columns */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 'clamp(10px, 1.4vw, 16px)',
                zIndex: 2,
                position: 'relative'
              }}>
                {/* Left Column: Select a Plant */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.12)',
                  backdropFilter: 'blur(6px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  border: '1.2px solid rgba(255, 255, 255, 0.35)',
                  borderRadius: '16px',
                  padding: 'clamp(8px, 1vh, 12px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <span style={{ fontSize: '15px', fontWeight: 900, color: '#A7F3D0', textShadow: '0 1px 3px rgba(0,0,0,0.8)', fontFamily: '"Outfit", sans-serif' }}>
                      🌱 Select a Plant
                    </span>
                    <span style={{ fontSize: '12px', color: '#CBD5E1', textShadow: '0 1px 3px rgba(0,0,0,0.8)', fontStyle: 'italic', fontFamily: '"Outfit", sans-serif' }}>
                      Plants make our world greener and healthier.
                    </span>
                  </div>

                  {/* 3x2 Grid of 6 Plants */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gridTemplateRows: 'repeat(2, 1fr)',
                    gap: '8px'
                  }}>
                    {PLANTS.map(p => {
                      const isSelected = selectedPlant === p;
                      return (
                        <div
                          key={`pl-${p}`}
                          onClick={() => handleSelectPlant(p)}
                          style={{
                            position: 'relative',
                            height: 'clamp(80px, 10.5vh, 105px)',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            border: isSelected ? '2.5px solid #10B981' : '1.5px solid rgba(255, 255, 255, 0.65)',
                            boxShadow: isSelected ? '0 0 14px rgba(16, 185, 129, 0.45)' : '0 2px 8px rgba(0,0,0,0.1)',
                            cursor: 'pointer',
                            transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                            transition: 'all 0.18s ease',
                            background: '#042F2E'
                          }}
                        >
                          <img
                            src={PLANT_WIDE_IMAGES[p] || PLANT_IMAGES[p]}
                            alt={p}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                          />

                          {/* Pill badge at bottom with emoji and name */}
                          <div style={{
                            position: 'absolute',
                            bottom: '5px',
                            left: '6px',
                            background: isSelected ? 'rgba(6, 78, 59, 0.92)' : 'rgba(15, 23, 42, 0.85)',
                            color: isSelected ? '#FEF08A' : '#ffffff',
                            padding: '2px 8px',
                            borderRadius: '10px',
                            fontSize: '11px',
                            fontWeight: 800,
                            fontFamily: '"Outfit", sans-serif',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.35)',
                            pointerEvents: 'none'
                          }}>
                            <span>{PLANT_EMOJIS[p]}</span>
                            <span>{p}</span>
                          </div>

                          {/* Info Button in top-left */}
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); setPreviewSpecimen({ name: p, type: 'plant' }); }}
                            title={`Inspect ${p}`}
                            style={{
                              position: 'absolute',
                              top: '5px',
                              left: '6px',
                              width: '22px',
                              height: '22px',
                              borderRadius: '50%',
                              background: 'rgba(15, 23, 42, 0.75)',
                              backdropFilter: 'blur(4px)',
                              border: '1px solid rgba(255, 255, 255, 0.4)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#ffffff',
                              fontSize: '11px',
                              fontWeight: 900,
                              cursor: 'pointer',
                              zIndex: 3
                            }}
                          >
                            ℹ
                          </button>

                          {/* Checkmark in top-right */}
                          {isSelected && (
                            <div style={{
                              position: 'absolute',
                              top: '5px',
                              right: '6px',
                              width: '22px',
                              height: '22px',
                              borderRadius: '50%',
                              background: '#10B981',
                              color: '#ffffff',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '13px',
                              fontWeight: 900,
                              boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
                              zIndex: 3
                            }}>
                              ✓
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right Column: Select an Animal */}
                <div style={{
                  background: 'rgba(255, 250, 240, 0.45)',
                  border: '1.2px solid rgba(255, 255, 255, 0.75)',
                  borderRadius: '16px',
                  padding: 'clamp(8px, 1vh, 12px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <span style={{ fontSize: '15px', fontWeight: 900, color: '#FEF08A', textShadow: '0 1px 3px rgba(0,0,0,0.85)', fontFamily: '"Outfit", sans-serif' }}>
                      🐾 Select an Animal
                    </span>
                    <span style={{ fontSize: '12px', color: '#CBD5E1', textShadow: '0 1px 3px rgba(0,0,0,0.8)', fontStyle: 'italic', fontFamily: '"Outfit", sans-serif' }}>
                      Animals keep ecosystems balanced and alive.
                    </span>
                  </div>

                  {/* 3x2 Grid of 6 Animals */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gridTemplateRows: 'repeat(2, 1fr)',
                    gap: '8px'
                  }}>
                    {ANIMALS.map(a => {
                      const isSelected = selectedAnimal === a;
                      return (
                        <div
                          key={`an-${a}`}
                          onClick={() => handleSelectAnimal(a)}
                          style={{
                            position: 'relative',
                            height: 'clamp(80px, 10.5vh, 105px)',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            border: isSelected ? '2.5px solid #10B981' : '1.5px solid rgba(255, 255, 255, 0.65)',
                            boxShadow: isSelected ? '0 0 14px rgba(16, 185, 129, 0.45)' : '0 2px 8px rgba(0,0,0,0.1)',
                            cursor: 'pointer',
                            transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                            transition: 'all 0.18s ease',
                            background: '#1C1917'
                          }}
                        >
                          <img
                            src={ANIMAL_WIDE_IMAGES[a] || ANIMAL_IMAGES[a]}
                            alt={a}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                          />

                          {/* Pill badge at bottom with emoji and name */}
                          <div style={{
                            position: 'absolute',
                            bottom: '5px',
                            left: '6px',
                            background: isSelected ? 'rgba(6, 78, 59, 0.92)' : 'rgba(15, 23, 42, 0.85)',
                            color: isSelected ? '#FEF08A' : '#ffffff',
                            padding: '2px 8px',
                            borderRadius: '10px',
                            fontSize: '11px',
                            fontWeight: 800,
                            fontFamily: '"Outfit", sans-serif',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.35)',
                            pointerEvents: 'none'
                          }}>
                            <span>{ANIMAL_EMOJIS[a]}</span>
                            <span>{a}</span>
                          </div>

                          {/* Info Button in top-left */}
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); setPreviewSpecimen({ name: a, type: 'animal' }); }}
                            title={`Inspect ${a}`}
                            style={{
                              position: 'absolute',
                              top: '5px',
                              left: '6px',
                              width: '22px',
                              height: '22px',
                              borderRadius: '50%',
                              background: 'rgba(15, 23, 42, 0.75)',
                              backdropFilter: 'blur(4px)',
                              border: '1px solid rgba(255, 255, 255, 0.4)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#ffffff',
                              fontSize: '11px',
                              fontWeight: 900,
                              cursor: 'pointer',
                              zIndex: 3
                            }}
                          >
                            ℹ
                          </button>

                          {/* Checkmark in top-right */}
                          {isSelected && (
                            <div style={{
                              position: 'absolute',
                              top: '5px',
                              right: '6px',
                              width: '22px',
                              height: '22px',
                              borderRadius: '50%',
                              background: '#10B981',
                              color: '#ffffff',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '13px',
                              fontWeight: 900,
                              boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
                              zIndex: 3
                            }}>
                              ✓
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Card Footer: Nature quote & Add to Class Board button */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '4px',
                zIndex: 2,
                position: 'relative'
              }}>
                <div style={{
                  fontSize: '13px',
                  color: '#A7F3D0', textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                  fontStyle: 'italic',
                  fontWeight: 600,
                  fontFamily: '"Outfit", sans-serif'
                }}>
                  — 🌱 Nature is a story we all belong to. —
                </div>

                <button
                  type="button"
                  onClick={handleAddToBoard}
                  disabled={!selectedPlant || !selectedAnimal}
                  style={{
                    background: (selectedPlant && selectedAnimal)
                      ? 'linear-gradient(135deg, #14452F 0%, #064E3B 100%)'
                      : 'rgba(20, 69, 47, 0.4)',
                    color: '#ffffff',
                    border: '1.5px solid #10B981',
                    borderRadius: '20px',
                    padding: '8px 22px',
                    fontSize: '14px',
                    fontWeight: 900,
                    fontFamily: '"Outfit", sans-serif',
                    cursor: (selectedPlant && selectedAnimal) ? 'pointer' : 'not-allowed',
                    boxShadow: (selectedPlant && selectedAnimal) ? '0 4px 14px rgba(20, 69, 47, 0.35)' : 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.2s ease',
                    opacity: (selectedPlant && selectedAnimal) ? 1 : 0.65
                  }}
                >
                  <span>Add to Class Board</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>

          {/* ==================================================================== */}
          {/* TOP HEADER BAR: CLEAN BOTANICAL ALIGNED DESIGN                      */}
          {/* ==================================================================== */}
          <div style={{
            position: 'relative',
            width: '100%',
            padding: '0.45rem 1.4rem',
            background: 'rgba(250, 248, 242, 0.55)',
            borderBottom: '2.5px solid #14452F',
            boxShadow: '0 4px 14px rgba(20, 69, 47, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
            boxSizing: 'border-box',
            zIndex: 20,
            gap: '12px'
          }}>
            {/* Hanging Lush Corner Foliage (subtle ambient) */}
            <TopCornerFoliage side="left" />
            <TopCornerFoliage side="right" />
            <TopMountainBackdrop />

            {/* Left: Academic Lab Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0, position: 'relative', zIndex: 10 }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '16px',
                fontWeight: '900',
                color: '#A7F3D0', textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                background: '#E2ECE6',
                padding: '0.45rem 1rem',
                borderRadius: '12px',
                border: '1.5px solid #14452F',
                fontFamily: '"Outfit", sans-serif'
              }}>
                <span>🌿</span>
                <span>NCERT Lab</span>
              </div>
            </div>



            {/* Right: Reset Control */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0, position: 'relative', zIndex: 10 }}>
              <button
                onClick={handleReset}
                title="Reset Activity"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '17px',
                  padding: '0.5rem 1.15rem',
                  borderRadius: '12px',
                  border: '2px solid rgba(20, 69, 47, 0.5)',
                  background: 'rgba(250, 248, 242, 0.55)',
                  cursor: 'pointer',
                  color: '#A7F3D0', textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                  fontWeight: '900',
                  fontFamily: '"Outfit", sans-serif',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                  transition: 'all 0.18s ease'
                }}
              >
                <RefreshCw size={18} color="#14452F" strokeWidth={2.4} />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* ==================================================================== */}
          {/* MAIN TWO-COLUMN SPLIT WORKSPACE                                      */}
          {/* ==================================================================== */}
          <div style={{
            flex: 1,
            minHeight: 0,
            display: 'grid',
            gridTemplateColumns: (phase === 'pick' || activeTab === 'quiz') ? '1fr' : 'clamp(290px, 25vw, 340px) minmax(0, 1fr)',
            padding: '0.5rem 1rem',
            gap: '0.85rem',
            overflow: 'hidden',
            boxSizing: 'border-box'
          }}>

            {/* ================================================================== */}
            {/* LEFT COLUMN: CONTEXT & STATS (FOREST GREEN COLOR)                  */}
            {/* ================================================================== */}
            {(phase !== 'pick' && activeTab !== 'quiz') && (
              <div style={{
                position: 'relative',
                background: 'linear-gradient(180deg, rgba(6, 44, 28, 0.65) 0%, rgba(3, 30, 18, 0.72) 100%)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1.8px solid rgba(110, 231, 183, 0.5)',
                borderRadius: '20px',
                padding: '16px',
                boxShadow: '0 16px 40px rgba(0, 0, 0, 0.5), 0 0 24px rgba(16, 185, 129, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '10px',
                overflow: 'hidden',
                boxSizing: 'border-box'
              }}>
                {/* Subtle Corner Botanical Flourishes */}
                <CardCornerLeaves position="top-left" />
                <CardCornerLeaves position="top-right" />
                <CardCornerLeaves position="bottom-left" />
                <CardCornerLeaves position="bottom-right" />
                <SpreadingLeavesWatermark />

                <div style={{ position: 'relative', zIndex: 5 }}>
                  <div style={{
                    color: '#A7F3D0', textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                    fontWeight: '900',
                    fontSize: '16px',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    fontFamily: '"Outfit", sans-serif',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <span>🌿</span>
                    <span>NCERT Activity 2.2</span>
                  </div>

                  <h2 style={{
                    fontFamily: '"Fraunces", Georgia, serif',
                    color: '#A7F3D0', textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                    fontWeight: '900',
                    fontSize: '22px',
                    margin: '0.2rem 0 0.35rem 0',
                    lineHeight: 1.15
                  }}>
                    Nature Walk Reflections
                  </h2>

                  <CardLeafDivider />

                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.35rem',
                    fontSize: '16px',
                    color: '#D1FAE5',
                    textShadow: '0 1px 3px rgba(0,0,0,0.9)',
                    lineHeight: '1.45',
                    fontWeight: '600',
                    fontFamily: '"Outfit", sans-serif'
                  }}>
                    <p style={{ margin: 0, textAlign: 'left', letterSpacing: '0.01em' }}>
                      Appreciating and conserving biodiversity is vital for life. Every organism in an ecosystem is interconnected.
                    </p>
                    <p style={{ margin: 0, textAlign: 'left', letterSpacing: '0.01em' }}>
                      Together, our class observations reveal nature's grand living tapestry!
                    </p>
                  </div>
                </div>

                {/* Middle Section: Statistics or Reflection Challenge */}
                <div style={{ position: 'relative', zIndex: 5 }}>
                  {boardCards.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                      <span style={{
                        fontSize: '16px',
                        fontWeight: '900',
                        color: '#A7F3D0', textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        fontFamily: '"Outfit", sans-serif'
                      }}>
                        📊 Class Observations Summary
                      </span>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                        <div style={{
                          background: 'rgba(4, 26, 16, 0.85)',
                          border: '1.2px solid rgba(110, 231, 183, 0.4)',
                          borderRadius: '12px',
                          padding: '8px 12px',
                          boxShadow: '0 3px 10px rgba(0,0,0,0.3)'
                        }}>
                          <div style={{ color: '#A7F3D0', textShadow: '0 1px 3px rgba(0,0,0,0.8)', fontWeight: '800', fontSize: '16px' }}>Total Logs</div>
                          <div style={{ color: '#FFFFFF', textShadow: '0 1px 4px rgba(0,0,0,0.95)', fontWeight: '900', fontSize: '24px', fontFamily: '"Outfit", sans-serif', lineHeight: 1.1 }}>
                            6
                          </div>
                          <div style={{ color: '#6EE7B7', fontWeight: '700', fontSize: '16px' }}>Class notes</div>
                        </div>

                        <div style={{
                          background: 'rgba(4, 26, 16, 0.50)',
                          backdropFilter: 'blur(8px)',
                          WebkitBackdropFilter: 'blur(8px)',
                          border: '1.2px solid rgba(110, 231, 183, 0.4)',
                          borderRadius: '12px',
                          padding: '8px 12px',
                          boxShadow: '0 3px 10px rgba(0,0,0,0.3)'
                        }}>
                          <div style={{ color: '#A7F3D0', textShadow: '0 1px 3px rgba(0,0,0,0.8)', fontWeight: '800', fontSize: '16px' }}>Biodiversity</div>
                          <div style={{ color: '#FFFFFF', textShadow: '0 1px 4px rgba(0,0,0,0.95)', fontWeight: '900', fontSize: '24px', fontFamily: '"Outfit", sans-serif', lineHeight: 1.1 }}>
                            6
                          </div>
                          <div style={{ color: '#6EE7B7', fontWeight: '700', fontSize: '16px' }}>P: {uniquePlants} | A: {uniqueAnimals}</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div style={{
                      background: 'rgba(250, 248, 242, 0.55)',
                      border: '2px solid rgba(20, 69, 47, 0.5)',
                      borderLeftWidth: '6px',
                      borderLeftColor: '#10B981',
                      borderRadius: '16px 4px 16px 4px',
                      padding: '1.15rem',
                      fontFamily: '"Outfit", sans-serif',
                      boxShadow: '0 4px 14px rgba(20, 69, 47, 0.08)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <span style={{ fontSize: '20px' }}>✍️</span>
                        <span style={{ color: '#A7F3D0', textShadow: '0 1px 3px rgba(0,0,0,0.8)', fontSize: '19px', fontWeight: '900', fontFamily: '"Outfit", sans-serif' }}>
                          Reflection Challenge:
                        </span>
                      </div>
                      <div style={{
                        color: '#2D5A43',
                        fontSize: '18px',
                        fontWeight: '700',
                        lineHeight: '1.6',
                        textAlign: 'left'
                      }}>
                        Close your eyes for 10 seconds, then choose one plant and one animal from your nature walk to contribute to the memory wall.
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Progress Notification */}
                <div style={{ position: 'relative', zIndex: 5, borderTop: '2px solid #14452F', paddingTop: '0.85rem' }}>
                  {phase === 'completed' ? (
                    <div style={{
                      background: '#F0FDF4',
                      border: '2px solid #10B981',
                      borderRadius: '14px',
                      padding: '0.95rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.4rem'
                    }}>
                      <span style={{ fontSize: '20px', fontWeight: '900', color: '#A7F3D0', textShadow: '0 1px 3px rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        🎉 Activity Completed!
                      </span>
                      <span style={{ fontSize: '17px', color: '#2D5A43', fontWeight: '700' }}>
                        You mastered the Ecosystem Interdependence Checkup! Click "Next" below to advance.
                      </span>
                    </div>
                  ) : (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '18px',
                      fontWeight: '800',
                      color: '#A7F3D0', textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                      fontFamily: '"Outfit", sans-serif'
                    }}>
                      <span>🌱</span>
                      <span>Activity 2.2: Learning to Appreciate</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ================================================================== */}
            {/* RIGHT COLUMN: INTERACTIVE TABS & WORKSPACE (TRANSPARENT GLASS)    */}
            {/* ================================================================== */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: 0,
              minWidth: 0,
              flex: 1,
              width: '100%',
              maxWidth: '100%',
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'none',
              WebkitBackdropFilter: 'none',
              border: '1.5px solid rgba(255, 255, 255, 0.35)',
              borderRadius: '24px',
              padding: '12px 18px',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
              overflow: 'hidden',
              position: 'relative'
            }}>
              {/* Subtle Corner Botanical Leaves */}
              <CardCornerLeaves position="top-left" />
              <CardCornerLeaves position="top-right" />
              <CardCornerLeaves position="bottom-left" />
              <CardCornerLeaves position="bottom-right" />
              <SpreadingLeavesWatermark />

              {/* Top Tabs Bar - Slogan Botanical Theme */}
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                marginBottom: '0.45rem',
                flexShrink: 0,
                position: 'relative',
                zIndex: 10
              }}>
                <button
                  onClick={() => {
                    if (!isMuted) sounds.playClick();
                    setActiveTab('board');
                    if (onSubStepChange) onSubStepChange('board');
                  }}
                  className="font-blur-area"
                  style={{
                    flex: 1,
                    padding: '8px 16px',
                    fontSize: '18px',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '8px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '14px',
                    border: '1.2px solid rgba(167, 243, 208, 0.45)',
                    background: 'rgba(6, 40, 25, 0.72)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    color: '#6EE7B7',
                    fontWeight: '900',
                    fontFamily: '"Outfit", sans-serif',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.3)',
                    transition: 'all 0.18s ease'
                  }}
                >
                  <span>🖼️ Class Memory Wall {boardCards.length > 0 ? `(6)` : ''}</span>
                </button>

                <button
                  onClick={() => {
                    if (boardCards.length === 0) {
                      alert('Please submit your reflection card first to unlock the Interdependence Quiz!');
                    } else {
                      if (!isMuted) sounds.playClick();
                      setActiveTab('quiz');
                      if (onSubStepChange) onSubStepChange('quiz');
                    }
                  }}
                  style={{
                    flex: 1,
                    padding: '8px 16px',
                    fontSize: '18px',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '8px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '12px 4px 12px 4px',
                    border: activeTab === 'quiz' ? '2.5px solid #14452F' : '2px solid #14452F',
                    background: activeTab === 'quiz' ? 'linear-gradient(135deg, #14452F 0%, #064E3B 100%)' : 'rgba(250, 248, 242, 0.55)',
                    color: activeTab === 'quiz' ? '#ffffff' : '#14452F',
                    fontWeight: '900',
                    fontFamily: '"Outfit", sans-serif',
                    cursor: boardCards.length === 0 ? 'not-allowed' : 'pointer',
                    opacity: boardCards.length === 0 ? 0.65 : 1,
                    boxShadow: activeTab === 'quiz' ? '0 4px 16px rgba(20, 69, 47, 0.35)' : 'none',
                    transition: 'all 0.18s ease'
                  }}
                >
                  <span>🔬 Ecosystem Quiz</span>
                  {boardCards.length === 0 && <Lock size={20} color={activeTab === 'quiz' ? '#ffffff' : '#14452F'} />}
                </button>
              </div>

              {/* ================================================================ */}
              {/* TAB 1: BOARD WORKSPACE (TIMER / PICKER / BOARD)                  */}
              {/* ================================================================ */}
              {activeTab === 'board' && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, position: 'relative', zIndex: 10 }}>
                  <style>{`
                @keyframes bondPulse {
                  0%, 100% { transform: scale(1); }
                  50% { transform: scale(1.05); }
                }
              `}</style>

                  {/* PHASE 1: 10-SECOND REFLECTION TIMER (ANIMATED & INTERACTIVE) */}
                  {boardCards.length === 0 && phase === 'timer' && (
                    <div style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '1.5rem',
                      padding: '1rem',
                      textAlign: 'center',
                      width: '100%',
                      maxWidth: '660px',
                      margin: 'auto'
                    }}>
                      {/* Calming Breathing Animated Ring */}
                      <div style={{
                        position: 'relative',
                        width: '150px',
                        height: '150px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        background: 'rgba(250, 248, 242, 0.55)',
                        boxShadow: timerRunning
                          ? '0 0 28px rgba(16, 185, 129, 0.55)'
                          : '0 8px 24px rgba(20, 69, 47, 0.15)',
                        animation: timerRunning ? 'reflectionPulse 2.4s infinite ease-in-out' : 'none'
                      }}>
                        <svg width="150" height="150" viewBox="0 0 150 150" style={{ transform: 'rotate(-90deg)' }}>
                          <circle
                            cx="75"
                            cy="75"
                            r="62"
                            fill="transparent"
                            stroke="#EDE7D8"
                            strokeWidth="10"
                          />
                          <circle
                            cx="75"
                            cy="75"
                            r="62"
                            fill="transparent"
                            stroke="#14452F"
                            strokeWidth="10"
                            strokeDasharray={2 * Math.PI * 62}
                            strokeDashoffset={(2 * Math.PI * 62) - (timer / 10) * (2 * Math.PI * 62)}
                            strokeLinecap="round"
                            style={{ transition: timerRunning ? 'stroke-dashoffset 1s linear' : 'none' }}
                          />
                        </svg>

                        <div style={{
                          position: 'absolute',
                          fontSize: '24px',
                          fontWeight: '900',
                          color: '#A7F3D0', textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                          fontFamily: '"Outfit", sans-serif',
                          letterSpacing: '-1px'
                        }}>
                          {timer}s
                        </div>
                      </div>

                      {/* Reflection Guidance Prompt */}
                      <div style={{ textAlign: 'center' }}>
                        <div style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          background: 'linear-gradient(135deg, #14452F 0%, #064E3B 100%)',
                          color: '#ffffff',
                          padding: '5px 18px',
                          borderRadius: '20px',
                          fontSize: '18px',
                          fontWeight: '900',
                          fontFamily: '"Outfit", sans-serif',
                          marginBottom: '0.6rem',
                          border: '1.2px solid #10B981'
                        }}>
                          <Sparkles size={18} color="#34D399" />
                          <span>MINDFUL BOTANICAL REFLECTION</span>
                        </div>

                        <h3 style={{
                          fontFamily: '"Fraunces", Georgia, serif',
                          color: '#A7F3D0', textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                          margin: '0 0 0.65rem 0',
                          fontSize: '24px',
                          fontWeight: '900'
                        }}>
                          10-Second Nature Reflection
                        </h3>

                        <p style={{
                          fontSize: '20px',
                          color: '#2D5A43',
                          maxWidth: '580px',
                          margin: '0 auto',
                          lineHeight: '1.55',
                          fontWeight: '700',
                          fontFamily: '"Outfit", sans-serif',
                          minHeight: '62px'
                        }}>
                          {getReflectionPrompt()}
                        </p>
                      </div>

                      {/* Centered Start Reflection Action Control */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginTop: '0.8rem', justifyContent: 'center' }}>
                        {!timerRunning ? (
                          <button
                            onClick={handleStartTimer}
                            style={{
                              padding: '0.9rem 2.8rem',
                              borderRadius: '14px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '12px',
                              fontSize: '20px',
                              fontWeight: '900',
                              background: 'linear-gradient(135deg, #14452F 0%, #064E3B 100%)',
                              color: '#ffffff',
                              border: '2px solid #10B981',
                              boxShadow: '0 6px 18px rgba(16, 185, 129, 0.35)',
                              cursor: 'pointer',
                              fontFamily: '"Outfit", sans-serif',
                              transition: 'all 0.18s ease'
                            }}
                          >
                            <Play size={22} fill="#ffffff" />
                            <span>Start Reflection</span>
                          </button>
                        ) : (
                          <div style={{
                            padding: '0.9rem 2.5rem',
                            borderRadius: '14px',
                            background: '#F0FDF4',
                            border: '2px solid #10B981',
                            color: '#064E3B',
                            fontSize: '20px',
                            fontWeight: '900',
                            fontFamily: '"Outfit", sans-serif',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            boxShadow: '0 4px 14px rgba(16, 185, 129, 0.2)'
                          }}>
                            <span>🌿 Mindful Pause: {timer}s left</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* PHASE 2: DUAL-MODE SPECIMEN PICKER (SIDE-BY-SIDE ECO-LINKER + STEP-BY-STEP JOURNAL) */}
                  {boardCards.length === 0 && phase === 'pick' && (
                    <div style={{
                      width: '100%',
                      height: '100%',
                      flex: 1,
                      minHeight: 0,
                      background: 'rgba(250, 248, 242, 0.55)',
                      padding: 'clamp(10px, 1.2vh, 16px) clamp(12px, 1.4vw, 20px)',
                      borderRadius: '20px 4px 20px 4px',
                      border: '2px solid rgba(20, 69, 47, 0.5)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: 'clamp(8px, 1vh, 12px)',
                      textAlign: 'left',
                      boxShadow: '0 8px 24px rgba(20, 69, 47, 0.08)',
                      boxSizing: 'border-box',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        flex: 1,
                        minHeight: 0,
                        gap: '8px',
                        position: 'relative',
                        zIndex: 5
                      }}>
                        {/* Step Switcher Navigation Bar */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          background: 'rgba(250, 248, 242, 0.55)',
                          padding: '6px 12px',
                          borderRadius: '12px',
                          border: '1.5px solid #14452F',
                          flexShrink: 0
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <button
                              type="button"
                              onClick={() => { if (!isMuted) sounds.playClick(); setPickStep(1); }}
                              style={{
                                padding: '6px 14px',
                                borderRadius: '10px',
                                border: pickStep === 1 ? '2px solid #14452F' : '1.5px solid #CBD5E1',
                                background: pickStep === 1 ? 'linear-gradient(135deg, #14452F 0%, #064E3B 100%)' : '#ffffff',
                                color: pickStep === 1 ? '#ffffff' : '#14452F',
                                fontWeight: 900,
                                fontSize: '16px',
                                fontFamily: '"Outfit", sans-serif',
                                cursor: 'pointer'
                              }}
                            >
                              1. Select Plant {selectedPlant ? '✓' : ''}
                            </button>

                            <ChevronRight size={18} color="#14452F" />

                            <button
                              type="button"
                              disabled={!selectedPlant}
                              onClick={() => { if (!isMuted) sounds.playClick(); setPickStep(2); }}
                              style={{
                                padding: '6px 14px',
                                borderRadius: '10px',
                                border: pickStep === 2 ? '2px solid #14452F' : '1.5px solid #CBD5E1',
                                background: pickStep === 2 ? 'linear-gradient(135deg, #14452F 0%, #064E3B 100%)' : '#ffffff',
                                color: pickStep === 2 ? '#ffffff' : '#14452F',
                                fontWeight: 900,
                                fontSize: '16px',
                                fontFamily: '"Outfit", sans-serif',
                                cursor: !selectedPlant ? 'not-allowed' : 'pointer',
                                opacity: !selectedPlant ? 0.5 : 1
                              }}
                            >
                              2. Select Animal {selectedAnimal ? '✓' : ''}
                            </button>
                          </div>

                          {selectedPlant && selectedAnimal && (
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              background: '#D1FAE5',
                              border: '1.2px solid #10B981',
                              padding: '3px 10px',
                              borderRadius: '10px',
                              fontSize: '16px',
                              fontWeight: 900,
                              color: '#065F46',
                              fontFamily: '"Outfit", sans-serif'
                            }}>
                              <span>✨ Ecological Pair Selected</span>
                            </div>
                          )}
                        </div>

                        {/* STEP 1: PLANTS (ALL 6 IMAGES IN SINGLE PAGE 3x2 GRID) */}
                        {pickStep === 1 && (
                          <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            flex: 1,
                            minHeight: 0,
                            gap: '10px'
                          }}>
                            {/* 6 Images in 3x2 Grid on single page */}
                            <div style={{
                              display: 'grid',
                              gridTemplateColumns: 'repeat(3, 1fr)',
                              gridTemplateRows: 'repeat(2, 1fr)',
                              gap: '12px',
                              flex: 1,
                              minHeight: 0,
                              width: '100%',
                              alignItems: 'stretch'
                            }}>
                              {PLANTS.map(p => {
                                const isSelected = selectedPlant === p;
                                return (
                                  <button
                                    key={`st1-${p}`}
                                    type="button"
                                    onClick={() => handleSelectPlant(p)}
                                    style={{
                                      position: 'relative',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      width: '100%',
                                      height: '100%',
                                      padding: '5px',
                                      borderRadius: '16px',
                                      border: isSelected ? '3.5px solid #10B981' : '2px solid rgba(20, 69, 47, 0.45)',
                                      background: isSelected ? '#ECFDF5' : 'rgba(250, 248, 242, 0.65)',
                                      cursor: 'pointer',
                                      transition: 'all 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                      transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                                      boxShadow: isSelected
                                        ? '0 8px 24px rgba(16, 185, 129, 0.4), inset 0 0 12px rgba(16, 185, 129, 0.2)'
                                        : '0 4px 12px rgba(20, 69, 47, 0.1)',
                                      boxSizing: 'border-box',
                                      overflow: 'hidden'
                                    }}
                                  >
                                    <div style={{
                                      width: '100%',
                                      height: '100%',
                                      borderRadius: '12px',
                                      overflow: 'hidden',
                                      background: '#14452F',
                                      position: 'relative',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center'
                                    }}>
                                      <img
                                        src={PLANT_WIDE_IMAGES[p] || PLANT_IMAGES[p]}
                                        style={{
                                          width: '100%',
                                          height: '100%',
                                          objectFit: 'cover',
                                          objectPosition: 'center',
                                          display: 'block'
                                        }}
                                        alt={p}
                                      />

                                      {/* Specimen Name Tag Badge */}
                                      <div style={{
                                        position: 'absolute',
                                        bottom: '8px',
                                        left: '8px',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '5px',
                                        background: isSelected ? 'rgba(6, 78, 59, 0.95)' : 'rgba(15, 23, 42, 0.85)',
                                        backdropFilter: 'blur(8px)',
                                        color: isSelected ? '#FEF08A' : '#ffffff',
                                        border: isSelected ? '1.5px solid #10B981' : '1px solid rgba(255, 255, 255, 0.35)',
                                        borderRadius: '14px',
                                        padding: '3px 10px',
                                        fontSize: '13px',
                                        fontWeight: 800,
                                        fontFamily: '"Outfit", sans-serif',
                                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.35)',
                                        pointerEvents: 'none'
                                      }}>
                                        <span>{PLANT_EMOJIS[p]}</span>
                                        <span>{p}</span>
                                      </div>
                                    </div>
                                    {isSelected && (
                                      <div style={{
                                        position: 'absolute',
                                        top: '10px',
                                        right: '10px',
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.35), 0 0 0 2px #ffffff',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#ffffff',
                                        fontSize: '18px',
                                        fontWeight: 900,
                                        zIndex: 2
                                      }}>
                                        ✓
                                      </div>
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* STEP 2: ANIMALS (ALL 6 IMAGES IN SINGLE PAGE 3x2 GRID) */}
                        {pickStep === 2 && (
                          <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            flex: 1,
                            minHeight: 0,
                            gap: '10px'
                          }}>
                            {/* 6 Images in 3x2 Grid on single page */}
                            <div style={{
                              display: 'grid',
                              gridTemplateColumns: 'repeat(3, 1fr)',
                              gridTemplateRows: 'repeat(2, 1fr)',
                              gap: '12px',
                              flex: 1,
                              minHeight: 0,
                              width: '100%',
                              alignItems: 'stretch'
                            }}>
                              {ANIMALS.map(a => {
                                const isSelected = selectedAnimal === a;
                                return (
                                  <button
                                    key={`st2-${a}`}
                                    type="button"
                                    onClick={() => handleSelectAnimal(a)}
                                    style={{
                                      position: 'relative',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      width: '100%',
                                      height: '100%',
                                      padding: '5px',
                                      borderRadius: '16px',
                                      border: isSelected ? '3.5px solid #10B981' : '2px solid rgba(20, 69, 47, 0.45)',
                                      background: isSelected ? '#ECFDF5' : 'rgba(250, 248, 242, 0.65)',
                                      cursor: 'pointer',
                                      transition: 'all 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                      transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                                      boxShadow: isSelected
                                        ? '0 8px 24px rgba(16, 185, 129, 0.4), inset 0 0 12px rgba(16, 185, 129, 0.2)'
                                        : '0 4px 12px rgba(20, 69, 47, 0.1)',
                                      boxSizing: 'border-box',
                                      overflow: 'hidden'
                                    }}
                                  >
                                    <div style={{
                                      width: '100%',
                                      height: '100%',
                                      borderRadius: '12px',
                                      overflow: 'hidden',
                                      background: '#14452F',
                                      position: 'relative',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center'
                                    }}>
                                      <img
                                        src={ANIMAL_WIDE_IMAGES[a] || ANIMAL_IMAGES[a]}
                                        style={{
                                          width: '100%',
                                          height: '100%',
                                          objectFit: 'cover',
                                          objectPosition: 'center',
                                          display: 'block'
                                        }}
                                        alt={a}
                                      />

                                      {/* Specimen Name Tag Badge */}
                                      <div style={{
                                        position: 'absolute',
                                        bottom: '8px',
                                        left: '8px',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '5px',
                                        background: isSelected ? 'rgba(6, 78, 59, 0.95)' : 'rgba(15, 23, 42, 0.85)',
                                        backdropFilter: 'blur(8px)',
                                        color: isSelected ? '#FEF08A' : '#ffffff',
                                        border: isSelected ? '1.5px solid #10B981' : '1px solid rgba(255, 255, 255, 0.35)',
                                        borderRadius: '14px',
                                        padding: '3px 10px',
                                        fontSize: '13px',
                                        fontWeight: 800,
                                        fontFamily: '"Outfit", sans-serif',
                                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.35)',
                                        pointerEvents: 'none'
                                      }}>
                                        <span>{ANIMAL_EMOJIS[a]}</span>
                                        <span>{a}</span>
                                      </div>
                                    </div>
                                    {isSelected && (
                                      <div style={{
                                        position: 'absolute',
                                        top: '10px',
                                        right: '10px',
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.35), 0 0 0 2px #ffffff',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#ffffff',
                                        fontSize: '18px',
                                        fontWeight: 900,
                                        zIndex: 2
                                      }}>
                                        ✓
                                      </div>
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Stepper Status Bar */}
                        <div style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexShrink: 0,
                          paddingTop: '6px',
                          borderTop: '1.5px solid #14452F'
                        }}>
                          <span style={{ fontSize: '17px', fontWeight: 800, color: '#A7F3D0', textShadow: '0 1px 3px rgba(0,0,0,0.8)', fontFamily: '"Outfit", sans-serif' }}>
                            {pickStep === 1
                              ? (selectedPlant ? '✓ Specimen selected! Proceed to Animal Selection' : 'Please pick 1 plant specimen image')
                              : (selectedAnimal ? '✓ Specimen selected! Click Next to create memory card' : 'Please pick 1 animal specimen image')}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}


                  {/* PHASE 3: CLASS MEMORY WALL — 6 SPECIMENS WITH TAMIL CLASSMATE NAMES */}
                  {boardCards.length > 0 && (() => {
                    const chosenPlant = selectedPlant || 'Neem';
                    const chosenAnimal = selectedAnimal || 'Cow';
                    const otherPlants = ['Tulsi', 'Rose', 'Peepal', 'Jasmine', 'Grass'].filter(p => p !== chosenPlant);
                    const otherAnimals = ['Crow', 'Squirrel', 'Frog', 'Sparrow', 'Ant'].filter(a => a !== chosenAnimal);

                    const wallItems = [
                      { studentName: 'Tamizh', name: chosenPlant, plant: chosenPlant, animal: chosenAnimal, img: PLANT_WIDE_IMAGES[chosenPlant] || PLANT_IMAGES[chosenPlant] },
                      { studentName: 'Gopal', name: chosenAnimal, plant: chosenPlant, animal: chosenAnimal, img: ANIMAL_WIDE_IMAGES[chosenAnimal] || ANIMAL_IMAGES[chosenAnimal] },
                      { studentName: 'Priya', name: otherPlants[0] || 'Tulsi', plant: otherPlants[0] || 'Tulsi', animal: otherAnimals[0] || 'Crow', img: PLANT_WIDE_IMAGES[otherPlants[0]] || PLANT_IMAGES[otherPlants[0] || 'Tulsi'] },
                      { studentName: 'Vijay', name: otherAnimals[0] || 'Crow', plant: otherPlants[0] || 'Tulsi', animal: otherAnimals[0] || 'Crow', img: ANIMAL_WIDE_IMAGES[otherAnimals[0]] || ANIMAL_IMAGES[otherAnimals[0] || 'Crow'] },
                      { studentName: 'Lavanya', name: otherPlants[1] || 'Rose', plant: otherPlants[1] || 'Rose', animal: otherAnimals[1] || 'Squirrel', img: PLANT_WIDE_IMAGES[otherPlants[1]] || PLANT_IMAGES[otherPlants[1] || 'Rose'] },
                      { studentName: 'Iniyan', name: otherAnimals[1] || 'Squirrel', plant: otherPlants[1] || 'Rose', animal: otherAnimals[1] || 'Squirrel', img: ANIMAL_WIDE_IMAGES[otherAnimals[1]] || ANIMAL_IMAGES[otherAnimals[1] || 'Squirrel'] }
                    ];

                    return (
                      <div style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: 0,
                        gap: '6px',
                        overflow: 'hidden'
                      }}>
                        <style>{`
                          .memory-wall-img-card {
                            transition: transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.28s ease;
                          }
                          .memory-wall-img-card:hover {
                            transform: scale(1.035);
                            box-shadow: 0 8px 28px rgba(16, 185, 129, 0.35), 0 0 0 2.5px #34D399 !important;
                            z-index: 5;
                          }
                        `}</style>

                        {/* 6-Image Grid: 3 columns x 2 rows */}
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(3, 1fr)',
                          gap: '12px',
                          flex: 1,
                          minHeight: 0,
                          alignContent: 'center',
                          overflow: 'auto',
                          padding: '6px 2px'
                        }}>
                          {wallItems.map((specimen, idx) => (
                            <div
                              key={`mem-wall-${specimen.name}-${idx}`}
                              className="memory-wall-img-card"
                              style={{
                                borderRadius: '16px',
                                overflow: 'hidden',
                                border: '2px solid rgba(167, 243, 208, 0.45)',
                                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.25)',
                                background: '#0F2922',
                                aspectRatio: '16 / 10',
                                position: 'relative',
                                cursor: 'pointer'
                              }}
                              onClick={() => {
                                if (!isMuted) sounds.playClick();
                                setInspectCard({
                                  name: specimen.studentName,
                                  plant: specimen.plant,
                                  animal: specimen.animal
                                });
                              }}
                            >
                              <img
                                src={specimen.img}
                                alt={specimen.name}
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover',
                                  display: 'block'
                                }}
                              />

                              {/* Overlaid Tamil Classmate Name Badge */}
                              <div style={{
                                position: 'absolute',
                                top: '10px',
                                left: '10px',
                                background: 'rgba(6, 44, 28, 0.82)',
                                backdropFilter: 'blur(8px)',
                                WebkitBackdropFilter: 'blur(8px)',
                                border: '1.2px solid rgba(110, 231, 183, 0.7)',
                                borderRadius: '20px',
                                padding: '4px 12px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
                                zIndex: 4,
                                pointerEvents: 'none'
                              }}>
                                <span style={{ fontSize: '13px' }}>👤</span>
                                <span style={{
                                  color: '#FEF3C7',
                                  fontWeight: 800,
                                  fontSize: '15px',
                                  fontFamily: '"Outfit", sans-serif',
                                  letterSpacing: '0.02em',
                                  textShadow: '0 1px 3px rgba(0,0,0,0.9)'
                                }}>
                                  {specimen.studentName}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* ================================================================ */}
              {/* TAB 2: INTERDEPENDENCE QUIZ (SLOGAN FRAMED)                     */}
              {/* ================================================================ */}
              {activeTab === 'quiz' && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, justifyContent: 'space-between', overflow: 'hidden', position: 'relative', zIndex: 10 }}>
                  {phase === 'completed' ? (
                    <div style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      gap: '1.4rem',
                      padding: '1.5rem'
                    }}>
                      <div style={{
                        padding: '1.5rem',
                        background: 'rgba(250, 248, 242, 0.55)',
                        borderRadius: '50%',
                        border: '3.5px solid #10B981',
                        boxShadow: '0 8px 26px rgba(16, 185, 129, 0.28)'
                      }}>
                        <Award size={64} color="#10B981" />
                      </div>

                      <div>
                        <h3 style={{
                          margin: 0,
                          fontFamily: '"Fraunces", Georgia, serif',
                          color: '#A7F3D0', textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                          fontSize: '24px',
                          fontWeight: '900'
                        }}>
                          Ecosystem Quiz Completed!
                        </h3>

                        <p style={{
                          fontSize: '22px',
                          color: '#A7F3D0', textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                          fontWeight: '900',
                          margin: '0.75rem 0 0.45rem',
                          fontFamily: '"Fraunces", serif'
                        }}>
                          Score: {Object.values(quizAnswers).filter(Boolean).length} / {QUIZ_QUESTIONS.length} Questions Correct
                        </p>

                        <p style={{
                          fontSize: '19px',
                          color: '#2D5A43',
                          margin: '0.45rem 0 0',
                          lineHeight: 1.55,
                          fontWeight: '700',
                          maxWidth: '560px',
                          fontFamily: '"Outfit", sans-serif'
                        }}>
                          Outstanding work reflecting on biodiversity and discovering how plants, birds, insects, and mammals live together in delicate balance.
                        </p>
                      </div>

                      <div style={{ display: 'flex', gap: '1.2rem', marginTop: '1rem', justifyContent: 'center' }}>
                        <button
                          onClick={() => {
                            if (!isMuted) sounds.playClick();
                            setCurrentQIndex(0);
                            setSelectedOpt(null);
                            setQuizChecked(false);
                            setQuizAnswers({});
                            setSimToggled(false);
                            setPhase('board');
                          }}
                          style={{
                            padding: '0.85rem 2.2rem',
                            borderRadius: '12px',
                            border: '2px solid rgba(20, 69, 47, 0.5)',
                            color: '#A7F3D0', textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                            fontWeight: '900',
                            fontSize: '18px',
                            cursor: 'pointer',
                            background: 'rgba(250, 248, 242, 0.55)',
                            fontFamily: '"Outfit", sans-serif',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            boxShadow: '0 2px 8px rgba(20, 69, 47, 0.08)'
                          }}
                        >
                          <RefreshCw size={18} />
                          <span>Retake Quiz</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div style={{
                      flex: 1,
                      display: 'grid',
                      gridTemplateColumns: '70% 30%',
                      gap: '14px',
                      minHeight: 0,
                      height: '100%',
                      overflow: 'hidden',
                      boxSizing: 'border-box'
                    }}>
                      {/* LEFT 70%: REALISTIC HABITAT IMAGE - CLEAN WITHOUT WORDS ON IMAGE */}
                      <div style={{
                        position: 'relative',
                        borderRadius: '18px',
                        border: '2.5px solid rgba(20, 69, 47, 0.5)',
                        overflow: 'hidden',
                        background: '#0D2818',
                        boxShadow: '0 8px 24px rgba(20, 69, 47, 0.18)',
                        minHeight: 0,
                        height: '100%'
                      }}>
                        {/* Realistic Background Habitat Image */}
                        <img
                          src={QUIZ_QUESTIONS[currentQIndex].sceneImg}
                          alt={QUIZ_QUESTIONS[currentQIndex].habitat}
                          style={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center',
                            imageRendering: '-webkit-optimize-contrast',
                            transform: 'translateZ(0)',
                            backfaceVisibility: 'hidden',
                            filter: simToggled ? 'saturate(0.45) contrast(1.1) brightness(0.85)' : 'none',
                            transition: 'filter 0.5s ease'
                          }}
                        />
                      </div>

                      {/* RIGHT 30%: QUESTIONS & ANSWERS INTERACTIVE PANEL */}
                      <div style={{
                        background: 'rgba(250, 248, 242, 0.55)',
                        border: '2.5px solid rgba(20, 69, 47, 0.5)',
                        borderRadius: '18px',
                        padding: '12px 14px',
                        boxShadow: '0 8px 24px rgba(20, 69, 47, 0.12)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        minHeight: 0,
                        height: '100%',
                        overflowY: 'auto',
                        boxSizing: 'border-box'
                      }}>
                        {/* Top Row: Question Counter & Score Badge */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '8px',
                          borderBottom: '2px solid #14452F',
                          paddingBottom: '8px',
                          flexShrink: 0
                        }}>
                          <span style={{
                            fontSize: '16px',
                            fontWeight: '900',
                            color: '#A7F3D0', textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                            background: '#EAE5D5',
                            padding: '4px 10px',
                            borderRadius: '8px',
                            border: '1.5px solid #14452F',
                            fontFamily: '"Outfit", sans-serif'
                          }}>
                            Question {currentQIndex + 1} of {QUIZ_QUESTIONS.length}
                          </span>
                          <span style={{
                            fontSize: '16px',
                            fontWeight: '900',
                            color: '#065F46',
                            background: '#D1FAE5',
                            padding: '4px 10px',
                            borderRadius: '8px',
                            border: '1.5px solid #10B981',
                            fontFamily: '"Outfit", sans-serif'
                          }}>
                            🏆 Score: {Object.values(quizAnswers).filter(Boolean).length} / {QUIZ_QUESTIONS.length}
                          </span>
                        </div>

                        {/* Question Prompt */}
                        <div style={{
                          background: '#FFFFFF',
                          border: '2px solid rgba(20, 69, 47, 0.5)',
                          borderRadius: '12px',
                          padding: '10px 12px',
                          boxShadow: '0 2px 6px rgba(20, 69, 47, 0.06)',
                          flexShrink: 0
                        }}>
                          <p style={{
                            margin: 0,
                            fontSize: '18px',
                            fontWeight: '900',
                            color: '#A7F3D0', textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                            lineHeight: '1.38',
                            fontFamily: '"Fraunces", Georgia, serif'
                          }}>
                            Q{currentQIndex + 1}. {QUIZ_QUESTIONS[currentQIndex].q}
                          </p>
                        </div>

                        {/* 4 Interactive Vertical Options */}
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '8px',
                          flexShrink: 0
                        }}>
                          {QUIZ_QUESTIONS[currentQIndex].opts.map((opt, i) => {
                            let border = '2px solid #14452F';
                            let bg = '#FFFFFF';
                            let textColor = '#14452F';
                            let badgeBg = '#14452F';
                            let badgeColor = '#FFFFFF';
                            let boxShadow = '0 2px 6px rgba(20, 69, 47, 0.06)';

                            if (quizChecked) {
                              if (i === QUIZ_QUESTIONS[currentQIndex].correct) {
                                border = '2.8px solid #10B981';
                                bg = '#D1FAE5';
                                textColor = '#065F46';
                                badgeBg = '#10B981';
                                boxShadow = '0 4px 14px rgba(16, 185, 129, 0.35)';
                              } else if (i === selectedOpt) {
                                border = '2.8px solid #EF4444';
                                bg = '#FEE2E2';
                                textColor = '#991B1B';
                                badgeBg = '#EF4444';
                                boxShadow = '0 4px 14px rgba(239, 68, 68, 0.35)';
                              }
                            } else if (selectedOpt === i) {
                              border = '2.8px solid #14452F';
                              bg = '#EAE5D5';
                              textColor = '#14452F';
                              boxShadow = '0 4px 12px rgba(20, 69, 47, 0.2)';
                            }

                            return (
                              <button
                                key={i}
                                disabled={quizChecked}
                                onClick={(e) => handleSelectAnswer(i, e)}
                                style={{
                                  textAlign: 'left',
                                  padding: '8px 12px',
                                  borderRadius: '12px',
                                  border,
                                  background: bg,
                                  color: textColor,
                                  fontSize: '16px',
                                  lineHeight: '1.35',
                                  cursor: quizChecked ? 'default' : 'pointer',
                                  width: '100%',
                                  fontWeight: '800',
                                  boxShadow,
                                  transition: 'all 0.15s ease',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '10px',
                                  fontFamily: '"Outfit", sans-serif',
                                  boxSizing: 'border-box'
                                }}
                              >
                                <span style={{
                                  width: '28px',
                                  height: '28px',
                                  borderRadius: '8px',
                                  background: badgeBg,
                                  color: badgeColor,
                                  fontSize: '16px',
                                  fontWeight: '900',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flexShrink: 0
                                }}>
                                  {opt.label}
                                </span>
                                <span style={{ flex: 1, fontSize: '16px', fontWeight: '800' }}>{opt.text}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Feedback / Explanation Card */}
                        {quizChecked && (
                          <div style={{
                            background: selectedOpt === QUIZ_QUESTIONS[currentQIndex].correct ? '#F0FDF4' : '#FEF2F2',
                            border: selectedOpt === QUIZ_QUESTIONS[currentQIndex].correct ? '2px solid #10B981' : '2px solid #EF4444',
                            borderLeftWidth: '5px',
                            padding: '10px 12px',
                            borderRadius: '10px',
                            fontSize: '16px',
                            color: selectedOpt === QUIZ_QUESTIONS[currentQIndex].correct ? '#166534' : '#991B1B',
                            lineHeight: 1.35,
                            fontWeight: '700',
                            fontFamily: '"Outfit", sans-serif',
                            flexShrink: 0
                          }}>
                            <strong style={{ color: selectedOpt === QUIZ_QUESTIONS[currentQIndex].correct ? '#15803D' : '#B91C1C', fontSize: '16px' }}>
                              {selectedOpt === QUIZ_QUESTIONS[currentQIndex].correct ? '✓ Correct!' : '✗ Recheck:'}
                            </strong> {QUIZ_QUESTIONS[currentQIndex].explain}
                          </div>
                        )}

                        {/* Action Button: Verify Answer or Next Question */}
                        <div style={{
                          marginTop: 'auto',
                          paddingTop: '8px',
                          borderTop: '1.5px solid #14452F',
                          flexShrink: 0
                        }}>
                          {!quizChecked ? (
                            <button
                              disabled={selectedOpt === null}
                              onClick={handleCheckAnswer}
                              style={{
                                width: '100%',
                                padding: '10px 16px',
                                fontSize: '17px',
                                borderRadius: '12px',
                                opacity: selectedOpt === null ? 0.5 : 1,
                                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                                color: '#FFFFFF',
                                fontWeight: '900',
                                border: 'none',
                                boxShadow: '0 4px 14px rgba(217, 119, 6, 0.35)',
                                cursor: selectedOpt === null ? 'not-allowed' : 'pointer',
                                fontFamily: '"Outfit", sans-serif',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px'
                              }}
                            >
                              <CheckCircle2 size={18} />
                              <span>Verify Answer</span>
                            </button>
                          ) : (
                            <button
                              onClick={handleNextQuestion}
                              style={{
                                width: '100%',
                                padding: '10px 16px',
                                fontSize: '17px',
                                borderRadius: '12px',
                                background: currentQIndex < QUIZ_QUESTIONS.length - 1
                                  ? 'linear-gradient(135deg, #14452F 0%, #064E3B 100%)'
                                  : 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                                color: '#FFFFFF',
                                fontWeight: '900',
                                border: 'none',
                                boxShadow: '0 4px 14px rgba(20, 69, 47, 0.35)',
                                cursor: 'pointer',
                                fontFamily: '"Outfit", sans-serif',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px'
                              }}
                            >
                              <span>{currentQIndex < QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'Complete Quiz 🏆'}</span>
                              <ArrowRight size={18} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

            </div>

          </div>

          {/* ==================================================================== */}
          {/* PERSISTENT GLOBAL BOTTOM NAVIGATION BAR (Matching Slogan Page)       */}
          {/* ==================================================================== */}
          <div style={{
            width: '100%',
            padding: '0.65rem 1.6rem',
            background: 'rgba(250, 248, 242, 0.55)',
            borderTop: '2.5px solid #14452F',
            boxShadow: '0 -4px 16px rgba(20, 69, 47, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
            zIndex: 30,
            boxSizing: 'border-box',
            gap: '16px'
          }}>
            <style>{`
          .bio-nav-btn {
            background: #14452F;
            color: #D1FAE5;
            border: 1.5px solid #2D6A4F;
            border-radius: 10px;
            padding: 8px 20px;
            font-size: 16px;
            font-weight: 800;
            font-family: 'Outfit', sans-serif;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            transition: all 0.2s ease;
            box-shadow: 0 3px 10px rgba(20, 69, 47, 0.25);
            position: relative;
            z-index: 10;
          }
          .bio-nav-btn:hover:not(:disabled) {
            background: #1B5E3C;
            color: #FFFFFF;
            border-color: #10B981;
            transform: translateY(-1px);
            box-shadow: 0 5px 14px rgba(20, 69, 47, 0.35);
          }
          .bio-nav-btn:active:not(:disabled) {
            transform: translateY(1px);
          }
          .bio-nav-btn:disabled {
            opacity: 0.32;
            cursor: not-allowed;
            box-shadow: none;
          }
          .bio-cta-btn {
            background: linear-gradient(135deg, #14452F 0%, #064E3B 100%);
            color: #FFFFFF;
            border: 1.5px solid #10B981;
            border-radius: 10px;
            padding: 8px 24px;
            font-size: 16px;
            font-weight: 900;
            font-family: 'Outfit', sans-serif;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            transition: all 0.2s ease;
            box-shadow: 0 4px 14px rgba(6, 78, 59, 0.32);
            position: relative;
            z-index: 10;
          }
          .bio-cta-btn:hover {
            background: linear-gradient(135deg, #1B5E3C 0%, #047857 100%);
            border-color: #34D399;
            transform: translateY(-1px);
            box-shadow: 0 6px 18px rgba(6, 78, 59, 0.42);
          }
        `}</style>

            {/* Left Navigation Buttons: Back & Previous Page */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                type="button"
                className="bio-nav-btn"
                onClick={handleGlobalBack}
                aria-label="Back to Activity 2.1"
              >
                ← Back
              </button>

              <button
                type="button"
                className="bio-nav-btn"
                disabled={activeTab === 'board' && phase === 'timer'}
                onClick={handleGlobalPrev}
                aria-label="Previous Page"
              >
                ← Previous Page
              </button>
            </div>



            {/* Right Navigation Button: Next Page */}
            <div>
              <button
                type="button"
                className="bio-cta-btn"
                onClick={handleGlobalNext}
                aria-label={getNextLabel()}
              >
                <span>{getNextLabel()}</span>
                <ArrowRight size={17} strokeWidth={2.5} />
              </button>
            </div>
          </div>

        </>
      )}

      {/* Background Sanctuary Nature Audio Element */}
      <audio ref={natureAudioRef} src={natureForestAudio} loop preload="auto" />

      {/* Realistic Ecosystem Animation Overlay (Botanical Rain) */}
      <EcosystemAnimationOverlay
        ref={ecosystemFxRef}
        selectedPlant={selectedPlant}
      />

      {/* Naturalist Specimen Field Journal Inspect Modal */}
      {inspectCard && (
        <div
          onClick={() => setInspectCard(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(15, 23, 42, 0.72)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            padding: '1rem'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#FAF7EE',
              backgroundImage: 'radial-gradient(#14452F 0.55px, transparent 0.55px)',
              backgroundSize: '16px 16px',
              border: '3px solid #14452F',
              borderRadius: '24px 8px 24px 8px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35), 0 0 0 6px rgba(16, 185, 129, 0.25)',
              width: '100%',
              maxWidth: '820px',
              maxHeight: '92vh',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            {/* Top Naturalist Washi Tape */}
            <div style={{
              position: 'absolute',
              top: '-8px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '120px',
              height: '20px',
              background: 'rgba(217, 119, 6, 0.45)',
              border: '1.5px dashed #B45309',
              borderRadius: '3px',
              zIndex: 5
            }} />

            {/* Modal Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 20px',
              borderBottom: '2px solid #14452F',
              background: 'linear-gradient(135deg, #14452F 0%, #064E3B 100%)',
              color: '#ffffff'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: '#10B981',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: '18px'
                }}>
                  {inspectCard.name.charAt(0)}
                </div>
                <div>
                  <h3 style={{
                    margin: 0,
                    fontSize: '20px',
                    fontFamily: '"Fraunces", Georgia, serif',
                    fontWeight: 900,
                    color: '#ffffff'
                  }}>
                    {inspectCard.name}'s Field Journal Log {inspectCard.isMe && '⭐'}
                  </h3>
                  <span style={{ fontSize: '13px', color: '#A7F3D0', fontWeight: 700, fontFamily: '"Outfit", sans-serif' }}>
                    📍 NCERT Class 6 Nature Walk · Specimen Record #2.2
                  </span>
                </div>
              </div>

              <button
                type="button"
                id="btn-close-journal-modal"
                onClick={() => setInspectCard(null)}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: '1.5px solid rgba(255, 255, 255, 0.4)',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  padding: 0
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(239, 68, 68, 0.85)';
                  e.currentTarget.style.borderColor = '#EF4444';
                  e.currentTarget.style.transform = 'scale(1.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                aria-label="Close Journal Log"
                title="Close"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', pointerEvents: 'none' }}>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div style={{
              padding: '18px 20px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              {/* Dual High-Res Specimen Showcase */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {/* Plant Card */}
                <div style={{
                  background: '#ffffff',
                  border: '2px solid rgba(20, 69, 47, 0.5)',
                  borderRadius: '16px',
                  padding: '10px',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}>
                  <div style={{
                    height: '130px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    position: 'relative',
                    background: '#14452F'
                  }}>
                    <img
                      src={PLANT_WIDE_IMAGES[inspectCard.plant] || PLANT_IMAGES[inspectCard.plant]}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      alt={inspectCard.plant}
                    />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                      <h4 style={{ margin: 0, fontSize: '20px', color: '#A7F3D0', textShadow: '0 1px 3px rgba(0,0,0,0.8)', fontWeight: 900 }}>
                        {PLANT_EMOJIS[inspectCard.plant]} {inspectCard.plant}
                      </h4>
                      <span style={{ fontStyle: 'italic', color: '#047857', fontSize: '16px', fontWeight: 700 }}>
                        {SCIENTIFIC_NAMES[inspectCard.plant]}
                      </span>
                    </div>
                    <p style={{ margin: '4px 0 0 0', fontSize: '16px', color: '#475569', lineHeight: 1.3 }}>
                      {PLANT_DESCRIPTIONS[inspectCard.plant]}
                    </p>
                    {PLANT_BADGES[inspectCard.plant] && (
                      <div style={{ marginTop: '6px', display: 'inline-flex', gap: '6px', fontSize: '16px', background: '#D1FAE5', color: '#065F46', padding: '2px 8px', borderRadius: '6px', fontWeight: 800 }}>
                        <span>Gift: {PLANT_BADGES[inspectCard.plant].gift}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Animal Card */}
                <div style={{
                  background: '#ffffff',
                  border: '2px solid rgba(20, 69, 47, 0.5)',
                  borderRadius: '16px',
                  padding: '10px',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}>
                  <div style={{
                    height: '130px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    position: 'relative',
                    background: '#451A03'
                  }}>
                    <img
                      src={ANIMAL_WIDE_IMAGES[inspectCard.animal] || ANIMAL_IMAGES[inspectCard.animal]}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      alt={inspectCard.animal}
                    />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                      <h4 style={{ margin: 0, fontSize: '20px', color: '#A7F3D0', textShadow: '0 1px 3px rgba(0,0,0,0.8)', fontWeight: 900 }}>
                        {ANIMAL_EMOJIS[inspectCard.animal]} {inspectCard.animal}
                      </h4>
                      <span style={{ fontStyle: 'italic', color: '#B45309', fontSize: '16px', fontWeight: 700 }}>
                        {SCIENTIFIC_NAMES[inspectCard.animal]}
                      </span>
                    </div>
                    <p style={{ margin: '4px 0 0 0', fontSize: '16px', color: '#475569', lineHeight: 1.3 }}>
                      {ANIMAL_DESCRIPTIONS[inspectCard.animal]}
                    </p>
                  </div>
                </div>
              </div>

              {/* The Mutualism Bond & Observation Section */}
              {(() => {
                const pair = getMutualismPair(inspectCard.plant, inspectCard.animal);
                return (
                  <div style={{
                    background: '#ffffff',
                    border: '2px solid #10B981',
                    borderRadius: '16px',
                    padding: '14px 16px',
                    boxShadow: '0 4px 16px rgba(16, 185, 129, 0.12)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '22px' }}>🔗</span>
                        <span style={{ fontSize: '20px', fontWeight: 900, color: '#065F46', fontFamily: '"Fraunces", serif' }}>
                          Mutualism Bond: {pair.interaction}
                        </span>
                      </div>
                      <span style={{
                        background: '#D1FAE5',
                        border: '1.2px solid #10B981',
                        color: '#065F46',
                        fontSize: '16px',
                        fontWeight: 900,
                        padding: '2px 10px',
                        borderRadius: '10px'
                      }}>
                        {pair.badge}
                      </span>
                    </div>

                    <blockquote style={{
                      margin: 0,
                      padding: '10px 14px',
                      background: '#F0FDF4',
                      borderLeft: '4px solid #10B981',
                      borderRadius: '0 8px 8px 0',
                      fontSize: '16px',
                      color: '#1E293B',
                      lineHeight: 1.5,
                      fontStyle: 'italic',
                      fontFamily: '"Outfit", sans-serif'
                    }}>
                      "{pair.detail}"
                    </blockquote>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '16px',
                      color: '#A7F3D0', textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                      fontWeight: 800,
                      marginTop: '4px'
                    }}>
                      <span>💡 NCERT Takeaway:</span>
                      <span>Both species depend on one another. Removing one harms the entire living web!</span>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Modal Footer Controls */}
            <div style={{
              padding: '12px 20px',
              borderTop: '1.5px solid #14452F',
              background: 'rgba(250, 248, 242, 0.55)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '10px'
            }}>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  type="button"
                  onClick={(e) => handleLikeCard(inspectCard.name, e)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: '#ECFDF5',
                    border: '1.5px solid #10B981',
                    color: '#065F46',
                    padding: '8px 14px',
                    borderRadius: '10px',
                    fontWeight: 900,
                    fontSize: '16px',
                    cursor: 'pointer',
                    fontFamily: '"Outfit", sans-serif'
                  }}
                >
                  <span>🌿 Appreciate ({cardLikes[inspectCard.name] || 5})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setInspectCard(null)}
                  style={{
                    background: '#EDE7D8',
                    border: '1.5px solid #14452F',
                    color: '#A7F3D0', textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                    padding: '8px 16px',
                    borderRadius: '10px',
                    fontWeight: 900,
                    fontSize: '16px',
                    cursor: 'pointer',
                    fontFamily: '"Outfit", sans-serif'
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* ==================================================================== */}
      {/* SPECIMEN DETAIL POPUP (Translucent Frosted Glass: 15% Opacity, Blur 8px) */}
      {/* ==================================================================== */}
      {previewSpecimen && (
        <div
          onClick={() => setPreviewSpecimen(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.50)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            padding: '16px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 'min(92vw, 440px)',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: '1.5px solid rgba(255, 255, 255, 0.50)',
              borderRadius: '24px',
              padding: 'clamp(14px, 2vh, 20px)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.45), inset 0 1px 2px rgba(255, 255, 255, 0.60)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              boxSizing: 'border-box',
              animation: 'fadeIn 0.22s ease-out',
              color: '#FFFFFF'
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(255, 255, 255, 0.18)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                color: '#FEF3C7',
                border: '1.2px solid rgba(255, 255, 255, 0.45)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: 800,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                fontFamily: '"Outfit", sans-serif',
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)'
              }}>
                <span>{previewSpecimen.type === 'plant' ? PLANT_EMOJIS[previewSpecimen.name] : ANIMAL_EMOJIS[previewSpecimen.name]}</span>
                <span>NCERT 2.2 • {previewSpecimen.name.toUpperCase()}</span>
              </div>

              <button
                type="button"
                onClick={() => setPreviewSpecimen(null)}
                style={{
                  background: 'rgba(255, 255, 255, 0.12)',
                  border: '1.2px solid rgba(255, 255, 255, 0.35)',
                  borderRadius: '10px',
                  width: '32px',
                  height: '32px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  transition: 'all 0.18s ease'
                }}
              >
                <X size={17} strokeWidth={2.5} />
              </button>
            </div>

            {/* Large Specimen Image */}
            <div style={{
              width: '100%',
              height: '190px',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1.5px solid rgba(255, 255, 255, 0.35)',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.35)',
              position: 'relative',
              background: '#042F2E'
            }}>
              <img
                src={previewSpecimen.type === 'plant' ? (PLANT_WIDE_IMAGES[previewSpecimen.name] || PLANT_IMAGES[previewSpecimen.name]) : (ANIMAL_WIDE_IMAGES[previewSpecimen.name] || ANIMAL_IMAGES[previewSpecimen.name])}
                alt={previewSpecimen.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Titles */}
            <div>
              <h3 style={{
                margin: 0,
                fontSize: '24px',
                fontWeight: 900,
                fontFamily: '"Outfit", sans-serif',
                color: '#FFFFFF',
                textShadow: '0 2px 8px rgba(0,0,0,0.9)'
              }}>
                {previewSpecimen.name}
              </h3>
              <div style={{
                fontSize: '15px',
                color: '#FEF3C7',
                fontStyle: 'italic',
                fontWeight: 600,
                textShadow: '0 1px 4px rgba(0,0,0,0.8)',
                marginTop: '2px'
              }}>
                {SCIENTIFIC_NAMES[previewSpecimen.name]}
              </div>
            </div>

            {/* Detail Cards (16px) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{
                background: 'rgba(0, 0, 0, 0.32)',
                border: '1.2px solid rgba(255, 255, 255, 0.25)',
                borderLeft: '4px solid #10B981',
                borderRadius: '10px',
                padding: '8px 12px'
              }}>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#A7F3D0', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                  🌿 Role in Ecosystem
                </div>
                <div style={{ fontSize: '16px', color: '#F0FDF4', fontWeight: 600, marginTop: '2px', lineHeight: 1.35, textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                  {previewSpecimen.type === 'plant' ? ECOLOGICAL_ROLES[previewSpecimen.name] : (ANIMAL_DESCRIPTIONS[previewSpecimen.name] || '')}
                </div>
              </div>

              <div style={{
                background: 'rgba(0, 0, 0, 0.32)',
                border: '1.2px solid rgba(255, 255, 255, 0.25)',
                borderLeft: '4px solid #F59E0B',
                borderRadius: '10px',
                padding: '8px 12px'
              }}>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#FDE68A', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                  ✨ NCERT Class 6 Observation
                </div>
                <div style={{ fontSize: '16px', color: '#FEF3C7', fontWeight: 600, marginTop: '2px', lineHeight: 1.35, textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                  {previewSpecimen.type === 'plant'
                    ? (PLANT_DESCRIPTIONS[previewSpecimen.name] + ' • Contributes clean air and shade to the school habitat.')
                    : (ANIMAL_DESCRIPTIONS[previewSpecimen.name] + ' • Observed interacting with plants during field walk.')}
                </div>
              </div>
            </div>

            {/* Select Button */}
            <button
              type="button"
              onClick={() => {
                if (previewSpecimen.type === 'plant') handleSelectPlant(previewSpecimen.name);
                else handleSelectAnimal(previewSpecimen.name);
                setPreviewSpecimen(null);
              }}
              style={{
                marginTop: '4px',
                padding: '10px',
                borderRadius: '12px',
                border: 'none',
                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                color: '#FFFFFF',
                fontSize: '16px',
                fontWeight: 900,
                fontFamily: '"Outfit", sans-serif',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)',
                transition: 'all 0.18s ease'
              }}
            >
              Select this {previewSpecimen.type === 'plant' ? 'Plant' : 'Animal'} ✓
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

