import React, { useState, useEffect } from 'react';
import { 
  CheckSquare, Square, Download, Share2, Printer, 
  RotateCcw, Plus, Trash2, ArrowRight, ExternalLink, Award 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RoadmapView({ initialRoadmapData, formData, onReset }) {
  const [roadmap, setRoadmap] = useState(initialRoadmapData);
  const [customMilestoneTitle, setCustomMilestoneTitle] = useState('');
  const [toast, setToast] = useState('');

  // Toast auto-dismiss
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Calculate overall checklist stats
  const getAllActions = () => {
    return roadmap.milestones.flatMap(m => m.actions);
  };

  const getCompletedCount = () => {
    return getAllActions().filter(a => a.completed).length;
  };

  const getTotalCount = () => {
    return getAllActions().length;
  };

  const calculateProgress = () => {
    const total = getTotalCount();
    if (total === 0) return 0;
    return Math.round((getCompletedCount() / total) * 100);
  };

  const progressPercent = calculateProgress();

  // Trigger confetti when hitting 100%
  useEffect(() => {
    if (progressPercent === 100 && getTotalCount() > 0) {
      try {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#6366f1', '#a855f7', '#14b8a6']
        });
      } catch (e) {
        console.warn("Confetti failed to run", e);
      }
      setToast("🏆 Congratulations! You completed your entire roadmap!");
    }
  }, [progressPercent]);

  // Toggle checklist item
  const toggleAction = (milestoneId, actionIndex) => {
    const updatedMilestones = roadmap.milestones.map(m => {
      if (m.id === milestoneId) {
        const updatedActions = m.actions.map((act, idx) => {
          if (idx === actionIndex) {
            return { ...act, completed: !act.completed };
          }
          return act;
        });
        return { ...m, actions: updatedActions };
      }
      return m;
    });
    setRoadmap({ ...roadmap, milestones: updatedMilestones });
  };

  // Add a custom milestone
  const addCustomMilestone = (e) => {
    e.preventDefault();
    if (!customMilestoneTitle.trim()) return;

    const newMilestone = {
      id: `custom_${Date.now()}`,
      phase: "Custom Phase",
      title: customMilestoneTitle,
      description: "Custom milestone added by user to target specific goals.",
      actions: [
        { text: "Define custom tasks to achieve this goal", completed: false }
      ],
      skillsTargeted: ["Personal Goal"]
    };

    setRoadmap({
      ...roadmap,
      milestones: [...roadmap.milestones, newMilestone]
    });
    setCustomMilestoneTitle('');
    setToast("➕ Custom milestone added to your timeline!");
  };

  // Delete a milestone (specifically custom ones or any)
  const removeMilestone = (milestoneId) => {
    const updated = roadmap.milestones.filter(m => m.id !== milestoneId);
    setRoadmap({ ...roadmap, milestones: updated });
    setToast("🗑️ Milestone removed.");
  };

  // Export JSON file
  const exportJSON = () => {
    try {
      const dataStr = JSON.stringify({ roadmap, formData, exportDate: new Date().toISOString() }, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = 'pathfinder-roadmap.json';
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      setToast("💾 Roadmap exported as JSON!");
    } catch (e) {
      setToast("❌ Failed to export JSON.");
    }
  };

  // Print function (triggers system PDF/print print dialg)
  const handlePrint = () => {
    window.print();
  };

  // Check if a skill in the roadmap is already owned by the user
  const isSkillMatched = (skill) => {
    return formData.skills.some(s => s.toLowerCase() === skill.toLowerCase());
  };

  // Check if an interest matches
  const isInterestMatched = (interest) => {
    return formData.interests.some(i => i.toLowerCase() === interest.toLowerCase());
  };

  // SVG Radial stroke calculation
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div className="dashboard-container">
      <div className="dashboard-grid">
        
        {/* Profile Sidebar */}
        <aside className="dashboard-sidebar">
          
          <div className="glass-card profile-card">
            <div className="profile-header">
              <h3>{formData.careerGoal}</h3>
              <span>Target Career Goal</span>
            </div>
            
            <div className="profile-meta-list">
              <div className="meta-item">
                <span className="meta-item-label">Degree Major</span>
                <span className="meta-item-value">{formData.degree.replace('_', ' ').toUpperCase()}</span>
              </div>

              <div className="meta-item">
                <span className="meta-item-label">Academic Year</span>
                <span className="meta-item-value">{formData.academicYear}</span>
              </div>

              <div className="meta-item">
                <span className="meta-item-label">My Current Skills</span>
                <div className="tag-list-inline">
                  {formData.skills.length > 0 ? (
                    formData.skills.map((s, i) => (
                      <span key={i} className="tag-badge-mini">{s}</span>
                    ))
                  ) : (
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-dark)' }}>No skills added</span>
                  )}
                </div>
              </div>

              <div className="meta-item">
                <span className="meta-item-label">My Interests</span>
                <div className="tag-list-inline">
                  {formData.interests.length > 0 ? (
                    formData.interests.map((s, i) => (
                      <span key={i} className="tag-badge-mini">{s}</span>
                    ))
                  ) : (
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-dark)' }}>No interests added</span>
                  )}
                </div>
              </div>

              {formData.constraints.length > 0 && (
                <div className="meta-item">
                  <span className="meta-item-label">Constraints Applied</span>
                  <div className="tag-list-inline">
                    {formData.constraints.map((c, i) => (
                      <span key={i} className="tag-badge-mini constraint">{c.replace('_', ' ')}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Radial Progress Gauge */}
          <div className="glass-card progress-widget">
            <h4>Overall Progress</h4>
            
            <div className="radial-progress-wrapper">
              <svg className="radial-svg" viewBox="0 0 140 140">
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--primary)" />
                    <stop offset="100%" stopColor="var(--accent)" />
                  </linearGradient>
                </defs>
                <circle className="radial-track" cx="70" cy="70" r={radius} />
                <circle 
                  className="radial-fill" 
                  cx="70" 
                  cy="70" 
                  r={radius} 
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                />
              </svg>
              <div className="radial-text-box">
                <span className="radial-num">{progressPercent}%</span>
                <span className="radial-lbl">Done</span>
              </div>
            </div>
            
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Completed {getCompletedCount()} of {getTotalCount()} actions
            </p>
          </div>

        </aside>

        {/* Timeline details */}
        <section className="dashboard-panel">
          
          <div className="dashboard-panel-header">
            <div className="dash-title-group">
              <h2>My Roadmap: {roadmap.careerTitle}</h2>
              <p>Custom educational and practical milestones based on your major & preferences.</p>
            </div>
            
            <div className="dashboard-actions">
              <button className="btn btn-secondary btn-sm" onClick={handlePrint}>
                <Printer size={16} /> Print/PDF
              </button>
              <button className="btn btn-secondary btn-sm" onClick={exportJSON}>
                <Download size={16} /> Export JSON
              </button>
              <button className="btn btn-outline btn-sm" onClick={onReset}>
                <RotateCcw size={16} /> Reset
              </button>
            </div>
          </div>

          {/* Vertical Timeline */}
          <div className="timeline-track-vertical">
            {roadmap.milestones.map((m) => {
              const completedActions = m.actions.filter(a => a.completed).length;
              const isMilestoneCompleted = completedActions === m.actions.length && m.actions.length > 0;
              const isMilestoneActive = completedActions > 0 && completedActions < m.actions.length;

              return (
                <div 
                  key={m.id} 
                  className={`timeline-node ${isMilestoneCompleted ? 'completed' : ''} ${isMilestoneActive ? 'active' : ''}`}
                >
                  <div className="timeline-indicator">
                    <div className="timeline-indicator-inner"></div>
                  </div>

                  <div className="timeline-card-content">
                    <div className="timeline-node-header">
                      <div className="node-title-area">
                        <span className="node-phase">{m.phase}</span>
                        <h3 className="node-title">{m.title}</h3>
                      </div>
                      
                      <div className="node-actions-meta">
                        {completedActions}/{m.actions.length} Done
                      </div>
                    </div>

                    <p className="node-desc">{m.description}</p>

                    {/* Action Items List */}
                    <div className="checklist-container">
                      {m.actions.map((act, aIdx) => (
                        <div 
                          key={aIdx} 
                          className={`checklist-item ${act.completed ? 'checked' : ''}`}
                          onClick={() => toggleAction(m.id, aIdx)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              toggleAction(m.id, aIdx);
                            }
                          }}
                          tabIndex={0}
                          role="checkbox"
                          aria-checked={act.completed}
                        >
                          <span className="chk-box">
                            {act.completed ? '✓' : ''}
                          </span>
                          <span className="chk-text">{act.text}</span>
                        </div>
                      ))}
                    </div>

                    {/* Associated Skills Badges */}
                    {m.skillsTargeted && m.skillsTargeted.length > 0 && (
                      <div className="node-footer-tags">
                        {m.skillsTargeted.map((skill, sIdx) => {
                          const hasSkill = isSkillMatched(skill);
                          return (
                            <span 
                              key={sIdx} 
                              className={`tag-target`}
                              style={{
                                background: hasSkill ? 'rgba(20, 184, 166, 0.15)' : 'rgba(99, 102, 241, 0.1)',
                                color: hasSkill ? 'var(--accent)' : 'var(--primary)',
                                border: hasSkill ? '1px solid rgba(20, 184, 166, 0.3)' : 'none'
                              }}
                            >
                              {skill} {hasSkill ? '✓' : ''}
                            </span>
                          );
                        })}
                      </div>
                    )}

                    {/* Delete Custom Milestone trigger */}
                    {m.id.startsWith('custom_') && (
                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                        <button 
                          className="btn btn-secondary btn-sm" 
                          style={{ color: 'var(--danger)', borderColor: 'rgba(239, 68, 68, 0.2)' }}
                          onClick={() => removeMilestone(m.id)}
                        >
                          <Trash2 size={12} /> Remove Milestone
                        </button>
                      </div>
                    )}

                  </div>
                </div>
              );
            })}
          </div>

          {/* Add custom milestone option */}
          <div className="custom-milestone-box">
            <h4>Add Custom Milestone</h4>
            <form className="custom-milestone-form" onSubmit={addCustomMilestone}>
              <input 
                type="text" 
                placeholder="e.g. Master React Native / Secure Google Internship"
                value={customMilestoneTitle}
                onChange={(e) => setCustomMilestoneTitle(e.target.value)}
              />
              <button type="submit" className="btn btn-primary btn-sm">
                <Plus size={16} /> Add to Timeline
              </button>
            </form>
          </div>

          {/* Suggested Resources */}
          {roadmap.resources && roadmap.resources.length > 0 && (
            <div className="resources-panel">
              <h3>Recommended Resources</h3>
              <div className="resources-grid">
                {roadmap.resources.map((res, idx) => (
                  <a 
                    key={idx} 
                    href={res.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="resource-card"
                  >
                    <div className="resource-icon-box">
                      <ExternalLink size={16} />
                    </div>
                    <div className="resource-info">
                      <h4>{res.name}</h4>
                      <span>Open link in new tab</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

        </section>

      </div>

      {/* Pop up toast message */}
      {toast && (
        <div className="toast-msg" role="alert" aria-live="polite">
          <Award size={18} style={{ color: 'var(--accent)' }} />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}
