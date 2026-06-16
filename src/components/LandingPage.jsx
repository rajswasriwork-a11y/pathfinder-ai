import React from 'react';
import { Compass, Sparkles, BookOpen, Layers, CheckSquare, ArrowRight, Shield, Award } from 'lucide-react';

export default function LandingPage({ onStart, savedRoadmap, onViewSavedRoadmap, onClearSavedRoadmap }) {
  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="landing-hero">
        <div className="hero-info">
          <div className="hero-badge">
            <Sparkles size={14} />
            <span></span> Powered by PathFinder Engine
          </div>
          <h1>Know exactly what to learn next — and in what order.</h1>
          <p>
            Tell us your degree, skills, and dream role. PathFinder builds your personalized step-by-step roadmap in seconds.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={onStart} id="btn-hero-start">
              <span>Build My Roadmap →</span>
            </button>
            {savedRoadmap && (
              <div className="saved-roadmap-actions">
                <button className="btn btn-secondary" onClick={onViewSavedRoadmap}>
                  View Previous Roadmap
                </button>
                <button className="btn btn-outline" onClick={onClearSavedRoadmap}>
                  Clear Saved Roadmap
                </button>
              </div>
            )}
          </div>

          {!savedRoadmap && (
            <div className="saved-empty-state">
              <div className="empty-state-icon">🧭</div>
              <div>
                <p className="empty-state-title">No saved roadmaps yet. Build your first one!</p>
                <button className="btn btn-secondary" onClick={onStart}>
                  Start Building
                </button>
              </div>
            </div>
          )}

          {savedRoadmap && (
            <div className="saved-roadmap-banner">
              <p>Last saved roadmap: {new Date(savedRoadmap.savedAt).toLocaleString()}</p>
            </div>
          )}
        </div>

        <div className="hero-visuals">
          <div className="visual-sphere"></div>
          {/* Floating interactive mockup cards */}
          <div className="floating-card fc-1">
            <div className="fc-title">Career Goal</div>
            <div className="fc-text">AI/ML Engineer</div>
            <div className="fc-badge active">Recommended track</div>
          </div>
          
          <div className="floating-card fc-2">
            <div className="fc-title">Target Milestone</div>
            <div className="fc-text">Fullstack Portfolio</div>
            <div className="fc-badge">Phase 3 Project</div>
          </div>

          <div className="floating-card fc-3">
            <div className="fc-title">Skill Match</div>
            <div className="fc-text">React & Node.js</div>
            <div className="fc-badge active">Verified</div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="features-section">
        <div className="section-header">
          <h2>Why Students Choose PathFinder</h2>
          <p>We synthesize academic curricula, industry demands, and personal constraints into a single actionable timeline.</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-box">
              <Compass size={24} />
            </div>
            <h3>Personalized Timelines</h3>
            <p>Roadmaps adapt automatically to your academic year (Freshman to Senior) and specific study speed preferences.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-box">
              <BookOpen size={24} />
            </div>
            <h3>Curriculum Alignment</h3>
            <p>Recommends high-value academic electives and courses matching your major and targets.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-box">
              <Layers size={24} />
            </div>
            <h3>Constraint Filtering</h3>
            <p>Whether you need zero-cost options, remote-only tracks, or non-technical pathways, we adapt the roadmap.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-box">
              <CheckSquare size={24} />
            </div>
            <h3>Interactive Tracking</h3>
            <p>Save progress, add custom tasks, verify milestones, and export the finalized path for sharing.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
