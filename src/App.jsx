import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import StudentForm from './components/StudentForm';
import GeneratingScreen from './components/GeneratingScreen';
import RoadmapView from './components/RoadmapView';
import { generateRoadmap } from './data/roadmapTemplates';
import { Compass } from 'lucide-react';

const STORAGE_KEY = 'pathfinder-ai.latestRoadmap';

export default function App() {
  const [view, setView] = useState('landing'); // 'landing' | 'form' | 'generating' | 'roadmap'
  const [formData, setFormData] = useState({
    degree: 'computer_science',
    academicYear: 'Freshman',
    skills: [],
    interests: [],
    careerGoal: '',
    constraints: []
  });
  const [roadmapData, setRoadmapData] = useState(null);
  const [savedRoadmap, setSavedRoadmap] = useState(null);

  useEffect(() => {
    try {
      const persisted = localStorage.getItem(STORAGE_KEY);
      if (persisted) {
        const parsed = JSON.parse(persisted);
        if (parsed?.formData && parsed?.roadmapData) {
          setSavedRoadmap(parsed);
        }
      }
    } catch (error) {
      localStorage.removeItem(STORAGE_KEY);
      setSavedRoadmap(null);
    }
  }, []);

  const saveRoadmapToStorage = (savedFormData, savedRoadmapData) => {
    try {
      const payload = {
        formData: savedFormData,
        roadmapData: savedRoadmapData,
        savedAt: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      setSavedRoadmap(payload);
    } catch (error) {
      console.warn('Unable to save roadmap locally.', error);
    }
  };

  const handleStart = () => {
    setView('form');
  };

  const handleFormBack = () => {
    setView('landing');
  };

  const handleFormSubmit = (submittedData) => {
    setFormData(submittedData);
    setView('generating');
  };

  const handleGenerationComplete = () => {
    const generated = generateRoadmap(formData);
    setRoadmapData(generated);
    saveRoadmapToStorage(formData, generated);
    setView('roadmap');
  };

  const handleReset = () => {
    setRoadmapData(null);
    setView('landing');
  };

  const handleViewSavedRoadmap = () => {
    if (!savedRoadmap) return;
    setFormData(savedRoadmap.formData);
    setRoadmapData(savedRoadmap.roadmapData);
    setView('roadmap');
  };

  const handleClearSavedRoadmap = () => {
    localStorage.removeItem(STORAGE_KEY);
    setSavedRoadmap(null);
  };

  return (
    <div className="app-wrapper">
      {/* Background visual spheres */}
      <div className="background-glow">
        <div className="glow-sphere-1"></div>
        <div className="glow-sphere-2"></div>
      </div>

      {/* Header */}
      <header>
        <div className="nav-container">
          <a href="#" className="logo" onClick={(e) => { e.preventDefault(); handleReset(); }}>
            <Compass size={28} />
            <span>PathFinder</span>
            <span className="badge">AI Engine</span>
          </a>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="main-content">
        {view === 'landing' && (
          <LandingPage 
            onStart={handleStart} 
            savedRoadmap={savedRoadmap}
            onViewSavedRoadmap={handleViewSavedRoadmap}
            onClearSavedRoadmap={handleClearSavedRoadmap}
          />
        )}

        {view === 'form' && (
          <StudentForm onSubmit={handleFormSubmit} onBack={handleFormBack} />
        )}

        {view === 'generating' && (
          <GeneratingScreen onComplete={handleGenerationComplete} />
        )}

        {view === 'roadmap' && roadmapData && (
          <RoadmapView 
            initialRoadmapData={roadmapData} 
            formData={formData} 
            onReset={handleReset} 
          />
        )}
      </main>

      {/* Footer */}
      <footer>
        <p>&copy; {new Date().getFullYear()} PathFinder AI. Empowering academic and career journeys. Responsive & Modern Design.</p>
      </footer>
    </div>
  );
}
