import React, { useEffect, useState } from 'react';
import { ShieldCheck } from 'lucide-react';

const STEPS = [
  "Analyzing academic profile and coursework...",
  "Querying career trajectory databases...",
  "Applying constraint adaptation filters...",
  "Synthesizing customized action milestones...",
  "Compiling visual dashboard interface..."
];

export default function GeneratingScreen({ onComplete }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    if (currentStepIndex < STEPS.length) {
      const timer = setTimeout(() => {
        setCurrentStepIndex(prev => prev + 1);
      }, 700); // 700ms per step
      return () => clearTimeout(timer);
    } else {
      const completeTimer = setTimeout(() => {
        onComplete();
      }, 300);
      return () => clearTimeout(completeTimer);
    }
  }, [currentStepIndex, onComplete]);

  return (
    <div className="generating-container">
      <div className="generating-icon-wrapper">
        <div className="generating-scanner"></div>
        <div className="generating-laser"></div>
        <ShieldCheck size={40} style={{ color: 'var(--primary)', filter: 'drop-shadow(0 0 10px var(--primary-glow))' }} />
      </div>

      <h3 className="generating-title">Compiling Custom Roadmap</h3>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Please wait while our synthesis engine aggregates courses, skills, and timelines.
      </p>

      <div className="generating-steps">
        {STEPS.map((step, index) => {
          let status = 'pending';
          if (index === currentStepIndex) {
            status = 'active';
          } else if (index < currentStepIndex) {
            status = 'done';
          }

          return (
            <div key={index} className={`gen-step ${status}`}>
              <div className="gen-step-dot"></div>
              <span>{step}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
