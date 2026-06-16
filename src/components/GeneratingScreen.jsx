import React, { useEffect, useState } from 'react';
import { ShieldCheck } from 'lucide-react';

const LOADING_MESSAGES = [
  'Analyzing your background...',
  'Mapping the best path for your goals...',
  'Identifying your skill gaps...',
  'Building your personalized roadmap...'
];

export default function GeneratingScreen({ onComplete }) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex(prev => Math.min(prev + 1, LOADING_MESSAGES.length - 1));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentMessageIndex === LOADING_MESSAGES.length - 1) {
      const timer = setTimeout(() => onComplete(), 1800);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [currentMessageIndex, onComplete]);

  const progressPercent = Math.round(((currentMessageIndex + 1) / LOADING_MESSAGES.length) * 100);
  const currentMessage = LOADING_MESSAGES[currentMessageIndex];

  return (
    <div className="generating-container">
      <div className="generating-icon-wrapper">
        <div className="generating-scanner"></div>
        <div className="generating-laser"></div>
        <ShieldCheck size={40} style={{ color: 'var(--primary)', filter: 'drop-shadow(0 0 10px var(--primary-glow))' }} />
      </div>

      <h3 className="generating-title">Compiling Custom Roadmap</h3>
      <p className="generating-subtitle">
        {currentMessage}
      </p>

      <div className="generating-progress-bar" aria-hidden="true">
        <div className="generating-progress-fill" style={{ width: `${progressPercent}%` }} />
      </div>
      <span className="generating-progress-label">{progressPercent}% complete</span>
    </div>
  );
}
