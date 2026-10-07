import React, { useState, useEffect } from 'react';

// Chapter 3 Components
import Chapter3CoverPage from './components/Chapter3CoverPage';
import Chapter3SloganPage from './components/Chapter3SloganPage';
import Chapter3VideoIntroPage from './components/Chapter3VideoIntroPage';
import MealTrackerActivity from './components/MealTrackerActivity';
import Activity32RegionalFoodPage from './components/Activity32RegionalFoodPage';
import FoodCropsClimateBook from './components/FoodCropsClimateBook';
import ChulhaTraditionalStovePage from './components/ChulhaTraditionalStovePage';
import ModernGasStovePage from './components/ModernGasStovePage';
import SilBattaPage from './components/SilBattaPage';
import ElectricalGrinderPage from './components/ElectricalGrinderPage';
import Activity33VideoPage from './components/Activity33VideoPage';
import CulinaryPracticesEvolutionPage from './components/CulinaryPracticesEvolutionPage';
import ComponentsOfFoodIntroPage from './components/ComponentsOfFoodIntroPage';
import FoodFestivalScene1Page from './components/FoodFestivalScene1Page';
import FoodFestivalScene2Page from './components/FoodFestivalScene2Page';
import FoodFestivalScene3Page from './components/FoodFestivalScene3Page';
import FoodFestivalScene3MoreToKnowPage from './components/FoodFestivalScene3MoreToKnowPage';
import FoodFestivalScene4Page from './components/FoodFestivalScene4Page';
import Case1ScurvyPage from './components/Case1ScurvyPage';
import Case2GoitrePage from './components/Case2GoitrePage';
import Case2MoreToKnowSaltPage from './components/Case2MoreToKnowSaltPage';
import Activity34IntroPage from './components/Activity34IntroPage';
import Activity34SurveyPage from './components/Activity34SurveyPage';
import Activity34VitaminAPage from './components/Activity34VitaminAPage';
import Activity34VitaminB1Page from './components/Activity34VitaminB1Page';
import Activity34VitaminCPage from './components/Activity34VitaminCPage';
import Activity34VitaminDPage from './components/Activity34VitaminDPage';
import Activity34CalciumPage from './components/Activity34CalciumPage';
import Activity34IodinePage from './components/Activity34IodinePage';
import Activity34IronPage from './components/Activity34IronPage';
import NutrientsProtectivePage from './components/NutrientsProtectivePage';
import RawCookedVegetablesPage from './components/RawCookedVegetablesPage';
import NutrientsOriginSaltSunlightPage from './components/NutrientsOriginSaltSunlightPage';
import RoughageDietaryFibresPage from './components/RoughageDietaryFibresPage';
import WaterHydrationPage from './components/WaterHydrationPage';
import KnowScientistGopalanPage from './components/KnowScientistGopalanPage';
import BalancedThaliBuilder from './components/BalancedThaliBuilder';
import FoodLabelDetective from './components/FoodLabelDetective';
import Chapter3Challenge from './components/Chapter3Challenge';

// Virtual Chemistry Labs (Activities 3.5, 3.6, 3.7)
import Activity35 from '../Activity35';
import FatTestingActivity from '../FatTesting';
import ProteinTestingActivity from '../ProteinTesting';

export default function Chapter3LearningLab({ onBack, onHeaderVisibilityChange }) {
  const [stage, setStage] = useState('cover');

  useEffect(() => {
    // Notify parent to hide global headers for immersive full-screen experience
    onHeaderVisibilityChange?.(false);
    return () => {
      onHeaderVisibilityChange?.(true);
    };
  }, [onHeaderVisibilityChange]);

  const renderCurrentStage = () => {
    switch (stage) {
      case 'cover':
        return (
          <Chapter3CoverPage
            onBack={onBack}
            onNext={() => setStage('slogan')}
          />
        );

      case 'slogan':
        return (
          <Chapter3SloganPage
            onBack={() => setStage('cover')}
            onEnterLab={() => setStage('video')}
          />
        );

      case 'video':
        return (
          <Chapter3VideoIntroPage
            onBack={() => setStage('slogan')}
            onNext={() => setStage('activity_3_1')}
          />
        );

      case 'activity_3_1':
        return (
          <MealTrackerActivity
            onBack={() => setStage('video')}
            onNext={() => setStage('activity_3_2_image')}
            onBackToDashboard={() => setStage('video')}
          />
        );

      case 'activity_3_2_image':
        return (
          <Activity32RegionalFoodPage
            onBack={() => setStage('activity_3_1')}
            onNext={() => setStage('crops_book')}
          />
        );

      case 'crops_book':
        return (
          <FoodCropsClimateBook
            onBack={() => setStage('activity_3_2_image')}
            onNext={() => setStage('chulha_traditional_stove')}
          />
        );

      case 'chulha_traditional_stove':
        return (
          <ChulhaTraditionalStovePage
            onBack={() => setStage('crops_book')}
            onNext={() => setStage('modern_gas_stove')}
          />
        );

      case 'modern_gas_stove':
        return (
          <ModernGasStovePage
            onBack={() => setStage('chulha_traditional_stove')}
            onNext={() => setStage('sil_batta')}
          />
        );

      case 'sil_batta':
        return (
          <SilBattaPage
            onBack={() => setStage('modern_gas_stove')}
            onNext={() => setStage('electrical_grinder')}
          />
        );

      case 'electrical_grinder':
        return (
          <ElectricalGrinderPage
            onBack={() => setStage('sil_batta')}
            onNext={() => setStage('activity_3_3_video')}
          />
        );

      case 'activity_3_3_video':
        return (
          <Activity33VideoPage
            onBack={() => setStage('electrical_grinder')}
            onNext={() => setStage('culinary_practices_evolution')}
          />
        );

      case 'culinary_practices_evolution':
        return (
          <CulinaryPracticesEvolutionPage
            onBack={() => setStage('activity_3_3_video')}
            onNext={() => setStage('components_of_food_intro')}
          />
        );

      case 'components_of_food_intro':
        return (
          <ComponentsOfFoodIntroPage
            onBack={() => setStage('culinary_practices_evolution')}
            onNext={() => setStage('food_festival_scene_1')}
          />
        );

      case 'food_festival_scene_1':
        return (
          <FoodFestivalScene1Page
            onBack={() => setStage('components_of_food_intro')}
            onNext={() => setStage('food_festival_scene_2')}
          />
        );

      case 'food_festival_scene_2':
        return (
          <FoodFestivalScene2Page
            onBack={() => setStage('food_festival_scene_1')}
            onNext={() => setStage('food_festival_scene_3')}
          />
        );

      case 'food_festival_scene_3':
        return (
          <FoodFestivalScene3Page
            onBack={() => setStage('food_festival_scene_2')}
            onNext={() => setStage('food_festival_scene_3_more_to_know')}
          />
        );

      case 'food_festival_scene_3_more_to_know':
        return (
          <FoodFestivalScene3MoreToKnowPage
            onBack={() => setStage('food_festival_scene_3')}
            onNext={() => setStage('food_festival_scene_4')}
          />
        );

      case 'food_festival_scene_4':
        return (
          <FoodFestivalScene4Page
            onBack={() => setStage('food_festival_scene_3_more_to_know')}
            onNext={() => setStage('case_1_scurvy')}
          />
        );

      case 'case_1_scurvy':
        return (
          <Case1ScurvyPage
            onBack={() => setStage('food_festival_scene_4')}
            onNext={() => setStage('case_2_goitre')}
          />
        );

      case 'case_2_goitre':
        return (
          <Case2GoitrePage
            onBack={() => setStage('case_1_scurvy')}
            onNext={() => setStage('case_2_more_to_know_salt')}
          />
        );

      case 'case_2_more_to_know_salt':
        return (
          <Case2MoreToKnowSaltPage
            onBack={() => setStage('case_2_goitre')}
            onNext={() => setStage('activity_3_4_intro')}
          />
        );

      case 'activity_3_4_intro':
        return (
          <Activity34IntroPage
            onBack={() => setStage('case_2_more_to_know_salt')}
            onNext={() => setStage('activity_3_4_survey')}
          />
        );

      case 'activity_3_4_survey':
        return (
          <Activity34SurveyPage
            onBack={() => setStage('activity_3_4_intro')}
            onNext={() => setStage('activity_3_4')}
          />
        );

      case 'activity_3_4':
        return (
          <Activity34VitaminAPage
            onBack={() => setStage('activity_3_4_survey')}
            onNext={() => setStage('activity_3_4_vitamin_b1')}
          />
        );

      case 'activity_3_4_vitamin_b1':
        return (
          <Activity34VitaminB1Page
            onBack={() => setStage('activity_3_4')}
            onNext={() => setStage('activity_3_4_vitamin_c')}
          />
        );

      case 'activity_3_4_vitamin_c':
        return (
          <Activity34VitaminCPage
            onBack={() => setStage('activity_3_4_vitamin_b1')}
            onNext={() => setStage('activity_3_4_vitamin_d')}
          />
        );

      case 'activity_3_4_vitamin_d':
        return (
          <Activity34VitaminDPage
            onBack={() => setStage('activity_3_4_vitamin_c')}
            onNext={() => setStage('activity_3_4_calcium')}
          />
        );

      case 'activity_3_4_calcium':
        return (
          <Activity34CalciumPage
            onBack={() => setStage('activity_3_4_vitamin_d')}
            onNext={() => setStage('activity_3_4_iodine')}
          />
        );

      case 'activity_3_4_iodine':
        return (
          <Activity34IodinePage
            onBack={() => setStage('activity_3_4_calcium')}
            onNext={() => setStage('activity_3_4_iron')}
          />
        );

      case 'activity_3_4_iron':
        return (
          <Activity34IronPage
            onBack={() => setStage('activity_3_4_iodine')}
            onNext={() => setStage('nutrients_protective')}
          />
        );

      case 'nutrients_protective':
        return (
          <NutrientsProtectivePage
            onBack={() => setStage('activity_3_4_iron')}
            onNext={() => setStage('raw_cooked_vegetables')}
          />
        );

      case 'raw_cooked_vegetables':
        return (
          <RawCookedVegetablesPage
            onBack={() => setStage('nutrients_protective')}
            onNext={() => setStage('nutrients_origin_salt_sunlight')}
          />
        );

      case 'nutrients_origin_salt_sunlight':
        return (
          <NutrientsOriginSaltSunlightPage
            onBack={() => setStage('raw_cooked_vegetables')}
            onNext={() => setStage('roughage_dietary_fibres')}
          />
        );

      case 'roughage_dietary_fibres':
        return (
          <RoughageDietaryFibresPage
            onBack={() => setStage('nutrients_origin_salt_sunlight')}
            onNext={() => setStage('water_hydration')}
          />
        );

      case 'water_hydration':
        return (
          <WaterHydrationPage
            onBack={() => setStage('roughage_dietary_fibres')}
            onNext={() => setStage('know_scientist_gopalan')}
          />
        );

      case 'know_scientist_gopalan':
        return (
          <KnowScientistGopalanPage
            onBack={() => setStage('water_hydration')}
            onNext={() => setStage('activity_3_5')}
          />
        );

      case 'activity_3_5':
        return (
          <Activity35
            onBack={() => setStage('know_scientist_gopalan')}
            onBackToDashboard={() => setStage('know_scientist_gopalan')}
            onNext={() => setStage('activity_3_6')}
          />
        );

      case 'activity_3_6':
        return (
          <FatTestingActivity
            onBack={() => setStage('activity_3_5')}
            onBackToDashboard={() => setStage('activity_3_5')}
            onNext={() => setStage('activity_3_7')}
          />
        );

      case 'activity_3_7':
        return (
          <ProteinTestingActivity
            onBack={() => setStage('activity_3_6')}
            onBackToDashboard={() => setStage('activity_3_6')}
            onNext={() => setStage('activity_3_8')}
          />
        );

      case 'activity_3_8':
        return (
          <BalancedThaliBuilder
            onBack={() => setStage('activity_3_7')}
            onBackToDashboard={() => setStage('activity_3_7')}
            onNext={() => setStage('activity_3_9')}
          />
        );

      case 'activity_3_9':
        return (
          <FoodLabelDetective
            onBack={() => setStage('activity_3_8')}
            onBackToDashboard={() => setStage('activity_3_8')}
            onNext={() => setStage('activity_3_10')}
          />
        );

      case 'activity_3_10':
        return (
          <Chapter3Challenge
            onBack={() => setStage('activity_3_9')}
            onBackToDashboard={() => setStage('activity_3_9')}
            onNext={onBack}
          />
        );

      default:
        return (
          <Chapter3CoverPage
            onBack={onBack}
            onNext={() => setStage('slogan')}
          />
        );
    }
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {renderCurrentStage()}
    </div>
  );
}
