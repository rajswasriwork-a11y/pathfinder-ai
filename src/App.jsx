import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import StudentForm from './components/StudentForm';
import GeneratingScreen from './components/GeneratingScreen';
import RoadmapView from './components/RoadmapView';
import { generateRoadmap } from './data/roadmapTemplates';
import { Compass } from 'lucide-react';

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
    setView('roadmap');
  };

  const handleReset = () => {
    setRoadmapData(null);
    setView('landing');
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
          <LandingPage onStart={handleStart} />
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
