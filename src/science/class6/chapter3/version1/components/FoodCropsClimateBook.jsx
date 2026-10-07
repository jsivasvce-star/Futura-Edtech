import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, BookOpen, CheckCircle2, 
  X, Sparkles, MapPin, Droplets, Sun, Wheat, 
  Layers, Compass, Award, ExternalLink, HelpCircle,
  Eye, EyeOff
} from 'lucide-react';

// Import the cinematic realistic 4K images
import punjabFeastImg from '../assets/crops/punjab_feast.jpg';
import karnatakaImg from '../assets/crops/karnataka_feast.jpg';
import tamilNaduImg from '../assets/crops/tamilnadu_feast.jpg';
import manipurImg from '../assets/crops/manipur_feast.jpg';
import rajasthanImg from '../assets/crops/rajasthan_feast.jpg';
import himachalImg from '../assets/crops/himachal_feast.jpg';
import gujaratImg from '../assets/crops/gujarat_feast.jpg';
import mpImg from '../assets/crops/mp_feast.jpg';
import biharImg from '../assets/crops/bihar_feast.jpg';
import bengalImg from '../assets/crops/west_bengal_feast.jpg';
import assamImg from '../assets/crops/assam.jpg';
import keralaImg from '../assets/crops/kerala_feast.jpg';
import coverBgImg from '../assets/crops_cover_background.jpg';

// Content strictly follows NCERT Class 6 Chapter 3 (Section 3.1.1, Activity 3.2, Table 3.2) & Reference PDF
const CROP_STATES = [
  {
    id: 'punjab',
    state: 'Punjab',
    hindi: 'पंजाब',
    subtitle: 'Northern Plains • NCERT Table 3.2',
    tag: 'NORTHERN FERTILE ALLUVIAL PLAINS',
    image: punjabFeastImg,
    caption: 'Golden Temple, wheat fields, yellow mustard blossoms, corn cobs, sarson da saag, makki di roti, and lassi',
    summary: 'Cold winters, hot summers, and rich alluvial soil fed by Himalayan rivers make Punjab ideal for cultivating wheat, mustard, chickpeas, and maize.',
    soilClimate: 'Cold Winters & Fertile Alluvial Soil',
    crops: 'Maize, wheat, chickpea, pulses', // Word-for-word NCERT Table 3.2
    food: 'Makki di roti, sarson da saag, chhole bhature, parantha, halwa, kheer', // Word-for-word NCERT Table 3.2
    beverages: 'Lassi, chhach (buttermilk), milk, tea', // Word-for-word NCERT Table 3.2
    whyFood: 'Alluvial soil produces abundant wheat and mustard; butter-rich meals provide warmth and energy for farmers during cold northern winters!'
  },
  {
    id: 'karnataka',
    state: 'Karnataka',
    hindi: 'कर्नाटक',
    subtitle: 'Deccan Plateau • NCERT Table 3.2',
    tag: 'TROPICAL PLATEAU & RED LOAMY SOIL',
    image: karnatakaImg,
    caption: 'Hampi Virupaksha temple, Tungabhadra river, crispy masala dosa, fluffy idlis, potato palya, sambar, coconut chutney, and South Indian filter coffee in a brass davarah',
    summary: 'A warm tropical climate and nutrient-dense red loamy soil support thriving coconut palms, iron-rich ragi millets, urad dal, and rice.',
    soilClimate: 'Tropical Warm Climate & Red Loamy Soil',
    crops: 'Rice, ragi, urad, coconut', // Word-for-word NCERT Table 3.2
    food: 'Benne Dosa, Thatte Idli, Sambar, Coconut Chutney, Aloo Palya, Ragi Mudde', // Word-for-word NCERT Table 3.2
    beverages: 'South Indian Filter Coffee (Kaapi), Majjige (Buttermilk), Tea', // Word-for-word NCERT Table 3.2
    whyFood: 'Warm climate favors fermented, easily-digestible ragi mudde, idli, and cooling coconut chutney for sustained farming energy!'
  },
  {
    id: 'manipur',
    state: 'Manipur',
    hindi: 'मणिपुर',
    subtitle: 'North-Eastern Hill Valley • NCERT Table 3.2',
    tag: 'SUB-HIMALAYAN PEATY HILL VALLEY',
    image: manipurImg,
    caption: 'Loktak Lake with stilt huts, steamed white rice, kangsoi vegetable stew, spicy singju salad, eromba chutney, baked fish, tender bamboo shoots, and herbal tea',
    summary: 'Subtropical mountain climate, abundant monsoons, and rich valley soils produce fragrant sticky rice, protein-rich soya bean, and tender bamboo.',
    soilClimate: 'Misty Monsoons & Rich Peaty Loam',
    crops: 'Rice, bamboo, soya bean', // Word-for-word NCERT Table 3.2
    food: 'Rice, eromba (chutney), utti (yellow peas & green onion curry), singju, kangsoi', // Word-for-word NCERT Table 3.2
    beverages: 'Traditional Black Tea, Bamboo Herbal Tea', // Word-for-word NCERT Table 3.2
    whyFood: 'Steamed rice, boiled medicinal herbs (kangsoi), and fermented bamboo chutney protect gut health and stamina in misty hill weather!'
  },
  {
    id: 'tamil_nadu',
    state: 'Tamil Nadu',
    hindi: 'तमिलनाडु',
    subtitle: 'Cauvery Delta & Coromandel Coast • Southern Region',
    tag: 'TROPICAL COASTAL & ALLUVIAL DELTA',
    image: tamilNaduImg,
    caption: 'Historic temple gopuram, coconut palms, crispy dosa, fluffy idlis, fresh chutneys, aromatic sambar, and coconut',
    summary: 'Warm tropical sunshine, monsoon rains, and fertile Cauvery river delta soils produce bountiful paddy rice, coconut palms, urad dal, and aromatic spices.',
    soilClimate: 'Tropical Monsoons & Fertile River Delta Loam',
    crops: 'Paddy (Rice), Coconut, Urad Dal, Spices, Banana',
    food: 'Crispy Dosa, Steamed Idli with Sambar, Coconut Chutney, Rasam, Pongal',
    beverages: 'Filter Coffee (Kaapi), Tender Coconut Water, Buttermilk',
    whyFood: 'Fermented rice & black gram batters create easily digestible idlis and dosas; cooling coconut and lentils balance nourishment in a warm tropical climate!'
  },
  {
    id: 'rajasthan',
    state: 'Rajasthan',
    hindi: 'राजस्थान',
    subtitle: 'Great Thar Desert • NCERT Additional State',
    tag: 'ARID DESERT & SANDY SOIL',
    image: rajasthanImg,
    caption: 'Desert sand dunes, grand sandstone fort, camel, pearl millet stalks, raw bajra & moth beans, ker sangri, dal baati churma, and spiced chaas',
    summary: 'Low rainfall and dry sandy soil require drought-resistant pearl millet (bajra), hardy moth beans, and wild desert shrub berries.',
    soilClimate: 'Low Rainfall & Sandy Desert Soil',
    crops: 'Bajra, Jowar, Moth Beans, Guar',
    food: 'Dal Baati Churma, Ker Sangri, Bajre ki Roti',
    beverages: 'Chaas with Roasted Jeera, Millet Raab',
    whyFood: 'Bajra thrives on minimal water; ghee and dried desert beans preserve nutrition for months without spoiling in desert heat!'
  },
  {
    id: 'himachal',
    state: 'Himachal Pradesh',
    hindi: 'हिमाचल प्रदेश',
    subtitle: 'Himalayan Terraces • NCERT Additional State',
    tag: 'COOL MOUNTAIN SLOPES & ORCHARDS',
    image: himachalImg,
    caption: 'Snowy Himalayan peaks, stepped terrace orchards, ripe red apples, barley, rajma beans, steamed siddu with desi ghee, and madra curry',
    summary: 'Cool mountain air, snowy winters, and terrace farming foster barley, kidney beans, and sweet apple orchards.',
    soilClimate: 'Snowy Winters & Stepped Mountain Slopes',
    crops: 'Barley, Apples, Rajma (Kidney Beans), Buckwheat',
    food: 'Siddu with Ghee, Madra, Rajma Chawal',
    beverages: 'Herbal Pahadi Tea, Buttermilk, Kahwa',
    whyFood: 'Steamed wheat siddu and protein-rich rajma provide deep warmth and sustained energy in freezing mountain weather!'
  },
  {
    id: 'gujarat',
    state: 'Gujarat',
    hindi: 'गुजरात',
    subtitle: 'Vibrant Farmlands • NCERT Additional State',
    tag: 'SEMI-ARID & COASTAL PLAINS',
    image: gujaratImg,
    caption: 'Historic stepwell lake, fresh groundnut plants, harvested in-shell peanuts, steamed yellow dhokla, and spiced masala chaas',
    summary: 'Warm sunshine and well-drained loamy soils make Gujarat India leader in groundnuts, sesame seeds, and nutritious millets.',
    soilClimate: 'Dry Warm Climate & Well-Drained Soil',
    crops: 'Groundnut, Bajra, Sesame, Cotton',
    food: 'Thepla, Dhokla, Undhiyu, Khandvi',
    beverages: 'Masala Chaas, Salted Cumin Buttermilk',
    whyFood: 'Groundnut oil and steamed fermented batters provide light, energy-dense meals suited for a warm, bustling commercial climate!'
  },
  {
    id: 'madhya_pradesh',
    state: 'Madhya Pradesh',
    hindi: 'मध्य प्रदेश',
    subtitle: 'Black Soil Heartland • NCERT Additional State',
    tag: 'FERTILE REGUR BLACK SOIL',
    image: mpImg,
    caption: 'Dhuandhar falls, lush green soybean plantations, Indori poha with sev & peanuts, dal bafla, fresh corn, and buttermilk',
    summary: 'Deep black cotton soil holds monsoon moisture, producing premium golden Sharbati wheat, soybeans, and sweet golden corn.',
    soilClimate: 'Moderate Rainfall & Deep Black Soil',
    crops: 'Sharbati Wheat, Soybean, Gram, Corn',
    food: 'Poha with Sev, Dal Bafla, Bhutte ka Kees',
    beverages: 'Spiced Buttermilk, Sugarcane Juice',
    whyFood: 'Rich black soil produces tender sweet wheat and corn, creating comforting, hearty staples for central farming families!'
  },
  {
    id: 'bihar',
    state: 'Bihar',
    hindi: 'बिहार',
    subtitle: 'Gangetic Basin • NCERT Additional State',
    tag: 'RIVER GANGA ALLUVIAL FLOODPLAIN',
    image: biharImg,
    caption: 'River Ganga, ancient riverside temple, golden paddy fields, roasted litti chokha, sattu sharbat, and puffed makhana',
    summary: 'Abundant river water and silt nourish sprawling rice paddy fields, roasted gram sattu, and unique wetland water lily seeds known as makhana.',
    soilClimate: 'Tropical Humid & Gangetic Silt Soil',
    crops: 'Paddy Rice, Wheat, Makhana (Foxnuts), Gram',
    food: 'Litti Chokha with Sattu, Dal Pitha, Chana Ghugni',
    beverages: 'Cooling Sattu Sharbat, Bel Cooler',
    whyFood: 'Roasted gram flour sattu is an instant natural protein cooler that keeps farmers energized in humid summer heat!'
  },
  {
    id: 'west_bengal',
    state: 'West Bengal',
    hindi: 'पश्चिम बंगाल',
    subtitle: 'Land of Rivers & Rice • NCERT Additional State',
    tag: 'MOIST GANGETIC DELTA',
    image: bengalImg,
    caption: 'Victoria Memorial, golden paddy fields, steamed rice (bhaat), macher jhol (fish curry), aloo posto, fresh saag, and sweet mishti doi',
    summary: 'Heavy rainfall and river silt make Bengal ideal for two to three annual harvests of golden paddy rice and mustard.',
    soilClimate: 'Heavy Rains & Fertile River Delta',
    crops: 'Paddy Rice, Mustard, Potato, Jute',
    food: 'Bhaat with Macher Jhol, Shukto, Posto',
    beverages: 'Sweet Milk Tea, Fresh Green Daab Water',
    whyFood: 'Abundant freshwater channels supply fresh fish and rice; mustard oil and bitter shukto aid tropical digestion!'
  },
  {
    id: 'kerala',
    state: 'Kerala',
    hindi: 'केरल',
    subtitle: 'The Spice Coast • NCERT Additional State',
    tag: 'TROPICAL COAST & BACKWATERS',
    image: keralaImg,
    caption: 'Alappuzha houseboats, backwaters, Matta red rice, crispy Karimeen fish, fish curry, avial, thoran, moru curry, and Nendran bananas',
    summary: 'Warm tropical rains and laterite soil nurture tall coconut palms, hardy tapioca roots, black pepper vines, and cardamom.',
    soilClimate: 'Tropical Monsoons & Coastal Laterite',
    crops: 'Coconut, Tapioca, Black Pepper, Paddy',
    food: 'Matta Rice, Karimeen Pollichathu, Fish Curry, Avial, Thoran, Puttu',
    beverages: 'Elaneer Tender Coconut Water, Sambharam',
    whyFood: 'Plentiful coconuts and tapioca provide energy; cooling coconut water restores body electrolytes under coastal heat!'
  }
];

export default function FoodCropsClimateBook({ onBack, onNext }) {
  // viewMode: 'cover' | 'reading'
  const [viewMode, setViewMode] = useState('cover');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  // Automatically make popup visible after 4 seconds of entering reading mode or switching states
  useEffect(() => {
    if (viewMode === 'reading') {
      setShowPopup(false);
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [viewMode, currentIndex]);

  const currentItem = CROP_STATES[currentIndex];

  const handleNextPage = () => {
    if (currentIndex < CROP_STATES.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Completed all states
      if (onNext) {
        onNext();
      } else {
        setViewMode('cover');
      }
    }
  };

  const handlePrevPage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      setViewMode('cover');
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: '#041F17',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Outfit', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        boxSizing: 'border-box',
        userSelect: 'none',
      }}
    >
      <AnimatePresence mode="wait">
        {viewMode === 'cover' ? (
          /* =========================================================
             1. BOOK COVER VIEW (Matching Screenshot 1 & NCERT Page 36)
             ========================================================= */
          <motion.div
            key="cover_view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            style={{
              position: 'relative',
              width: '100vw',
              height: '100vh',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxSizing: 'border-box',
            }}
          >
            {/* Fullscreen Photorealistic Scenic Background */}
            <img
              src={coverBgImg}
              alt="Crops and Landscape of India"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                zIndex: 1,
                pointerEvents: 'none',
              }}
            />

            {/* Ambient Contrast Overlay for Legibility */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, transparent 55%)',
                zIndex: 2,
                pointerEvents: 'none',
              }}
            />

            {/* Main Content Row */}
            <div
              style={{
                position: 'relative',
                zIndex: 10,
                width: '94vw',
                maxWidth: '1440px',
                height: '92vh',
                maxHeight: '860px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '36px',
                padding: '16px 36px',
                boxSizing: 'border-box',
              }}
            >
              {/* Left Side: Information & Exploration Missions */}
              <div
                style={{
                  flex: '1 1 52%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                  maxHeight: '100%',
                  paddingRight: '12px',
                  boxSizing: 'border-box',
                }}
              >
                {/* Header Group */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {/* Pill Tag */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{
                        background: 'rgba(2, 44, 32, 0.75)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        border: '2px solid #34D399',
                        borderRadius: '999px',
                        padding: '4px 18px',
                        color: '#6EE7B7',
                        fontSize: '22px',
                        fontWeight: 800,
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.35)',
                      }}
                    >
                      <Wheat size={20} color="#34D399" />
                      3.1.1 FOOD IN DIFFERENT REGIONS • ACTIVITY 3.2
                    </span>
                  </div>

                  {/* Title */}
                  <h1
                    style={{
                      fontSize: '28px',
                      fontWeight: 900,
                      color: '#FEF08A',
                      margin: '4px 0 0 0',
                      lineHeight: '1.25',
                      letterSpacing: '-0.01em',
                      textShadow: '0 2px 10px rgba(0,0,0,0.85), 0 0 16px rgba(254, 240, 138, 0.25)',
                    }}
                  >
                    Table 3.2: Food, Crops & Climate Across India
                  </h1>

                  {/* Subtitle / Overview */}
                  <p
                    style={{
                      fontSize: '22px',
                      color: '#FFFFFF',
                      margin: '4px 0 0 0',
                      lineHeight: '1.35',
                      fontWeight: 500,
                      textShadow: '0 1px 6px rgba(0,0,0,0.8)',
                    }}
                  >
                    Find out the types of food traditionally consumed and crops grown across different states of India. Discover how soil types, climate, and cultivation shape regional dietary diversity.
                  </p>
                </div>

                {/* Missions Container */}
                <div
                  style={{
                    background: 'rgba(2, 38, 28, 0.72)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '2px solid rgba(52, 211, 153, 0.45)',
                    borderRadius: '18px',
                    padding: '16px 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    boxSizing: 'border-box',
                    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.45), inset 0 1px 2px rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      color: '#FEF08A',
                      fontSize: '22px',
                      fontWeight: 900,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      textShadow: '0 1px 4px rgba(0,0,0,0.7)',
                    }}
                  >
                    <Compass size={22} color="#FEF08A" />
                    YOUR LEARNING MISSIONS
                  </div>

                  {/* Mission Card 1 */}
                  <div
                    style={{
                      background: 'rgba(4, 47, 36, 0.65)',
                      border: '1.5px solid rgba(52, 211, 153, 0.35)',
                      borderRadius: '12px',
                      padding: '10px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      color: '#ECFDF5',
                      fontSize: '22px',
                      fontWeight: 600,
                      textShadow: '0 1px 3px rgba(0,0,0,0.6)',
                    }}
                  >
                    <CheckCircle2 size={22} color="#34D399" style={{ flexShrink: 0 }} />
                    <span>Explore Table 3.2: Punjab, Karnataka, Manipur, Tamil Nadu & More States</span>
                  </div>

                  {/* Mission Card 2 */}
                  <div
                    style={{
                      background: 'rgba(4, 47, 36, 0.65)',
                      border: '1.5px solid rgba(52, 211, 153, 0.35)',
                      borderRadius: '12px',
                      padding: '10px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      color: '#ECFDF5',
                      fontSize: '22px',
                      fontWeight: 600,
                      textShadow: '0 1px 3px rgba(0,0,0,0.6)',
                    }}
                  >
                    <CheckCircle2 size={22} color="#34D399" style={{ flexShrink: 0 }} />
                    <span>Discover Soil & Weather Links with Local Crops</span>
                  </div>

                  {/* Mission Card 3 */}
                  <div
                    style={{
                      background: 'rgba(4, 47, 36, 0.65)',
                      border: '1.5px solid rgba(52, 211, 153, 0.35)',
                      borderRadius: '12px',
                      padding: '10px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      color: '#ECFDF5',
                      fontSize: '22px',
                      fontWeight: 600,
                      textShadow: '0 1px 3px rgba(0,0,0,0.6)',
                    }}
                  >
                    <CheckCircle2 size={22} color="#34D399" style={{ flexShrink: 0 }} />
                    <span>Understand Why Traditional Diets Reflect Local Agriculture</span>
                  </div>
                </div>

                {/* Bottom Action Row */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    paddingTop: '6px',
                  }}
                >
                  {/* Back to Activity 3.2 button */}
                  <motion.button
                    type="button"
                    onClick={onBack}
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    style={{
                      background: 'rgba(2, 38, 28, 0.85)',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      border: '2px solid rgba(52, 211, 153, 0.5)',
                      color: '#A7F3D0',
                      fontSize: '22px',
                      fontWeight: 800,
                      padding: '10px 24px',
                      borderRadius: '14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      boxShadow: '0 6px 18px rgba(0, 0, 0, 0.45)',
                    }}
                  >
                    <ArrowLeft size={22} color="#A7F3D0" />
                    Activity 3.2
                  </motion.button>

                  {/* Open Book Button */}
                  <motion.button
                    type="button"
                    onClick={() => {
                      setCurrentIndex(0);
                      setViewMode('reading');
                    }}
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    style={{
                      background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                      border: '2px solid #6EE7B7',
                      color: '#FFFFFF',
                      fontSize: '22px',
                      fontWeight: 900,
                      padding: '10px 28px',
                      borderRadius: '14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      boxShadow: '0 6px 22px rgba(5, 150, 105, 0.55)',
                    }}
                  >
                    <BookOpen size={24} color="#FFFFFF" />
                    Open Interactive Book
                    <ArrowRight size={22} color="#FFFFFF" />
                  </motion.button>
                </div>
              </div>

              {/* Right Side: Interactive Clickable Book Zone */}
              <div
                onClick={() => {
                  setCurrentIndex(0);
                  setViewMode('reading');
                }}
                style={{
                  flex: '1 1 48%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  cursor: 'pointer',
                  position: 'relative',
                }}
                title="Click Book to Open Interactive Journey"
              />
            </div>
          </motion.div>
        ) : (
          /* =========================================================
             2. FULL SCREEN CINEMATIC IMAGE WITH 8PX BLUR TRANSPARENT POPUP
             ========================================================= */
          <motion.div
            key="reading_view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'relative',
              width: '100vw',
              height: '100vh',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#021811',
            }}
          >
            {/* Ambient Blurred Backdrop to fill ultra-wide/tall viewports smoothly */}
            <img
              src={currentItem.image}
              alt=""
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'blur(22px) brightness(0.55)',
                transform: 'scale(1.08)',
                pointerEvents: 'none',
                zIndex: 1,
              }}
            />

            {/* Main Full-Screen Cinematic 4K Image Without Overlap on Left & Right */}
            <img
              src={currentItem.image}
              alt={currentItem.state}
              style={{
                position: 'relative',
                width: '100vw',
                height: '100vh',
                objectFit: 'contain',
                objectPosition: 'center',
                display: 'block',
                zIndex: 2,
              }}
            />

            {/* Subtle Vignette Overlay for Depth */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse at center, transparent 65%, rgba(2, 20, 14, 0.45) 100%)',
                pointerEvents: 'none',
                zIndex: 3,
              }}
            />

            {/* Floating Top Controls (Visible whether popup is open or minimized) */}
            <div
              style={{
                position: 'absolute',
                top: '16px',
                left: '24px',
                right: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                zIndex: 30,
                pointerEvents: 'none',
              }}
            >
              {/* Left: Current State Badge */}
              <div
                style={{
                  pointerEvents: 'auto',
                  background: 'rgba(0, 0, 0, 0.5)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  border: '1.5px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '999px',
                  padding: '4px 18px',
                  color: '#FEF08A',
                  fontSize: '22px',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
                }}
              >
                <Wheat size={22} color="#FDE047" />
                <span>{currentItem.state} ({currentItem.hindi})</span>
              </div>

              {/* Right: Close to Book Cover (Show Details button removed) */}
              <div style={{ pointerEvents: 'auto' }}>
                <motion.button
                  type="button"
                  onClick={() => setViewMode('cover')}
                  whileHover={{ scale: 1.08, rotate: 90 }}
                  whileTap={{ scale: 0.92 }}
                  style={{
                    background: 'rgba(0, 0, 0, 0.45)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    border: '1.5px solid rgba(255, 255, 255, 0.3)',
                    color: '#FEF08A',
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
                  }}
                  title="Close to Book Cover"
                >
                  <X size={24} color="#FEF08A" />
                </motion.button>
              </div>
            </div>

            {/* Small Floating Icon on Left Center to Toggle Popup */}
            <motion.button
              type="button"
              onClick={() => setShowPopup(prev => !prev)}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.9 }}
              animate={!showPopup ? {
                scale: [1, 1.08, 1],
                boxShadow: [
                  '0 0 10px rgba(255, 255, 255, 0.3)',
                  '0 0 22px rgba(250, 204, 21, 0.8)',
                  '0 0 10px rgba(255, 255, 255, 0.3)',
                ],
              } : {}}
              transition={!showPopup ? { repeat: Infinity, duration: 2.2, ease: 'easeInOut' } : {}}
              style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 40,
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'rgba(0, 0, 0, 0.48)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '2px solid rgba(255, 255, 255, 0.35)',
                color: '#FEF08A',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.65)',
              }}
              title={showPopup ? 'Hide Details' : 'Show Details'}
            >
              <Wheat size={24} color="#FEF08A" />
            </motion.button>

            {/* VERTICAL POPUP CONTENT WITH PURE TRANSPARENT 8PX BLUR PANEL (NO GREEN SHADE) */}
            <AnimatePresence>
              {showPopup && (
                <motion.div
                  initial={{ opacity: 0, x: -30, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -30, scale: 0.98 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  style={{
                    position: 'absolute',
                    left: '76px',
                    top: '20px',
                    bottom: '84px',
                    width: '540px',
                    maxWidth: 'calc(100vw - 96px)',
                    zIndex: 35,
                    background: 'rgba(0, 0, 0, 0.45)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    border: '1.5px solid rgba(255, 255, 255, 0.25)',
                    borderRadius: '22px',
                    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.65), inset 0 1px 2px rgba(255, 255, 255, 0.15)',
                    padding: '16px 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    overflow: 'hidden',
                    boxSizing: 'border-box',
                  }}
                >
                  {/* Top Bar inside Vertical Popup: Tag + Minimize Button */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '10px',
                      paddingBottom: '4px',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.18)',
                    }}
                  >
                    <span
                      style={{
                        background: 'rgba(255, 255, 255, 0.12)',
                        border: '1px solid rgba(255, 255, 255, 0.25)',
                        borderRadius: '999px',
                        padding: '4px 14px',
                        color: '#FEF08A',
                        fontSize: '20px',
                        fontWeight: 800,
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <Wheat size={20} color="#FDE047" />
                      {currentItem.tag}
                    </span>

                    {/* Minimize Popup Button */}
                    <button
                      type="button"
                      onClick={() => setShowPopup(false)}
                      style={{
                        background: 'rgba(255, 255, 255, 0.12)',
                        border: '1px solid rgba(255, 255, 255, 0.25)',
                        color: '#FEF08A',
                        borderRadius: '10px',
                        padding: '4px 12px',
                        fontSize: '20px',
                        fontWeight: 800,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        flexShrink: 0,
                      }}
                      title="Minimize to view full image"
                    >
                      <EyeOff size={18} color="#FEF08A" />
                      <span>Minimize</span>
                    </button>
                  </div>

                  {/* State Title & Subtitle Header */}
                  <div>
                    <h2
                      style={{
                        fontSize: '24px',
                        fontWeight: 900,
                        color: '#FEF08A',
                        margin: 0,
                        letterSpacing: '-0.01em',
                        lineHeight: '1.2',
                        textShadow: '0 2px 8px rgba(0,0,0,0.8)',
                      }}
                    >
                      {currentItem.state}
                    </h2>
                    <div
                      style={{
                        fontSize: '20px',
                        color: '#E2E8F0',
                        fontWeight: 700,
                        marginTop: '2px',
                      }}
                    >
                      {currentItem.hindi} • {currentItem.subtitle}
                    </div>
                  </div>

                  {/* Summary Text from NCERT & Reference PDF */}
                  <p
                    style={{
                      fontSize: '20px',
                      color: '#F8FAFC',
                      margin: 0,
                      lineHeight: '1.35',
                      fontWeight: 700,
                      textShadow: '0 1px 4px rgba(0,0,0,0.7)',
                    }}
                  >
                    {currentItem.summary}
                  </p>

                  {/* 4 Information Blocks Stacked Vertically */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                      boxSizing: 'border-box',
                    }}
                  >
                    {/* Tile 1: Climate & Soil */}
                    <div
                      style={{
                        background: 'rgba(0, 0, 0, 0.35)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255, 255, 255, 0.16)',
                        borderRadius: '12px',
                        padding: '6px 12px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px',
                      }}
                    >
                      <div
                        style={{
                          color: '#FDE047',
                          fontSize: '20px',
                          fontWeight: 800,
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                        }}
                      >
                        🌤️ CLIMATE & SOIL
                      </div>
                      <div
                        style={{
                          color: '#FFFFFF',
                          fontSize: '20px',
                          fontWeight: 700,
                        }}
                      >
                        {currentItem.soilClimate}
                      </div>
                    </div>

                    {/* Tile 2: Locally Grown Crops */}
                    <div
                      style={{
                        background: 'rgba(0, 0, 0, 0.35)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255, 255, 255, 0.16)',
                        borderRadius: '12px',
                        padding: '6px 12px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px',
                      }}
                    >
                      <div
                        style={{
                          color: '#FDE047',
                          fontSize: '20px',
                          fontWeight: 800,
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                        }}
                      >
                        🌾 LOCALLY GROWN CROPS
                      </div>
                      <div
                        style={{
                          color: '#FFFFFF',
                          fontSize: '20px',
                          fontWeight: 700,
                        }}
                      >
                        {currentItem.crops}
                      </div>
                    </div>

                    {/* Tile 3: Traditional Foods Eaten */}
                    <div
                      style={{
                        background: 'rgba(0, 0, 0, 0.35)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255, 255, 255, 0.16)',
                        borderRadius: '12px',
                        padding: '6px 12px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px',
                      }}
                    >
                      <div
                        style={{
                          color: '#FDE047',
                          fontSize: '20px',
                          fontWeight: 800,
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                        }}
                      >
                        🍲 TRADITIONAL FOODS EATEN
                      </div>
                      <div
                        style={{
                          color: '#FFFFFF',
                          fontSize: '20px',
                          fontWeight: 700,
                        }}
                      >
                        {currentItem.food}
                      </div>
                    </div>

                    {/* Tile 4: Regional Beverages */}
                    <div
                      style={{
                        background: 'rgba(0, 0, 0, 0.35)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255, 255, 255, 0.16)',
                        borderRadius: '12px',
                        padding: '6px 12px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px',
                      }}
                    >
                      <div
                        style={{
                          color: '#FDE047',
                          fontSize: '20px',
                          fontWeight: 800,
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                        }}
                      >
                        🥛 REGIONAL BEVERAGES
                      </div>
                      <div
                        style={{
                          color: '#FFFFFF',
                          fontSize: '20px',
                          fontWeight: 700,
                        }}
                      >
                        {currentItem.beverages}
                      </div>
                    </div>
                  </div>

                  {/* NCERT Analysis Card */}
                  <div
                    style={{
                      background: 'rgba(0, 0, 0, 0.42)',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      border: '1.5px solid rgba(250, 204, 21, 0.55)',
                      borderRadius: '12px',
                      padding: '8px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <Sparkles size={24} color="#FCD34D" style={{ flexShrink: 0 }} />
                    <div style={{ color: '#FEF08A', fontSize: '20px', fontWeight: 700, lineHeight: '1.25' }}>
                      <strong style={{ color: '#FCD34D', textTransform: 'uppercase', marginRight: '6px', fontSize: '20px', fontWeight: 900 }}>
                        NCERT Analysis:
                      </strong>
                      {currentItem.whyFood}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Left Bottom Corner: Back Navigation Button */}
            <motion.button
              type="button"
              onClick={handlePrevPage}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              style={{
                position: 'absolute',
                bottom: '24px',
                left: '24px',
                zIndex: 45,
                background: 'rgba(0, 0, 0, 0.55)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '2px solid rgba(255, 255, 255, 0.35)',
                color: '#FFFFFF',
                fontSize: '20px',
                fontWeight: 800,
                padding: '8px 24px',
                borderRadius: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.6)',
              }}
            >
              <ArrowLeft size={22} color="#FFFFFF" />
              <span>{currentIndex === 0 ? 'Cover' : 'Back'}</span>
            </motion.button>

            {/* Bottom Center: State Dots */}
            <div
              style={{
                position: 'absolute',
                bottom: '28px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 40,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(0, 0, 0, 0.45)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                padding: '6px 14px',
                borderRadius: '999px',
                border: '1.5px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              {CROP_STATES.map((st, idx) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  title={st.state}
                  style={{
                    width: currentIndex === idx ? '26px' : '10px',
                    height: '10px',
                    borderRadius: '5px',
                    background: currentIndex === idx ? '#FCD34D' : 'rgba(255, 255, 255, 0.35)',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                  }}
                />
              ))}
            </div>

            {/* Right Bottom Corner: Next Navigation Button */}
            <motion.button
              type="button"
              onClick={handleNextPage}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              style={{
                position: 'absolute',
                bottom: '24px',
                right: '24px',
                zIndex: 45,
                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                border: '2px solid #FEF08A',
                color: '#FFFFFF',
                fontSize: '20px',
                fontWeight: 900,
                padding: '8px 26px',
                borderRadius: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 8px 25px rgba(217, 119, 6, 0.55), inset 0 1px 2px rgba(255, 255, 255, 0.35)',
              }}
            >
              <span>{currentIndex === CROP_STATES.length - 1 ? 'Continue' : 'Next'}</span>
              <ArrowRight size={22} color="#FFFFFF" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
