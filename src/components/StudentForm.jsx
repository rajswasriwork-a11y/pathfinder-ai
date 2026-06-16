import React, { useState } from 'react';
import { Plus, X, ArrowLeft, Zap, Sparkles } from 'lucide-react';

const SUGGESTED_SKILLS_BY_DEGREE = {
  computer_science: ["Python", "Java", "JavaScript", "SQL", "Git", "C++"],
  data_science: ["Python", "SQL", "R", "Excel", "Tableau", "Pandas"],
  business_finance: ["Excel", "PowerPoint", "Accounting", "Data Analysis", "Valuation"],
  engineering: ["MATLAB", "CAD", "Project Management", "Python", "SolidWorks"],
  marketing_comm: ["Copywriting", "SEO", "Google Analytics", "Social Media", "Canva"],
  other: ["Research", "Public Speaking", "Project Management", "Communication"]
};

const SUGGESTED_INTERESTS_BY_DEGREE = {
  computer_science: ["Web Development", "AI/ML", "Cybersecurity", "Game Dev", "Cloud Computing"],
  data_science: ["Big Data", "Predictive Modeling", "Bioinformatics", "Data Viz", "Neural Networks"],
  business_finance: ["Stock Market", "Venture Capital", "Consulting", "Real Estate", "Startups"],
  engineering: ["Robotics", "Renewable Energy", "Aerospace", "IoT", "Automation"],
  marketing_comm: ["E-commerce", "Brand Building", "Growth Hacking", "Video Editing", "Content Creation"],
  other: ["UI/UX", "Product Strategy", "Management", "Education", "Sustainability"]
};

export default function StudentForm({ onSubmit, onBack }) {
  const [degree, setDegree] = useState('computer_science');
  const [academicYear, setAcademicYear] = useState('Freshman');
  
  // Tag Inputs
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState([]);
  
  const [interestInput, setInterestInput] = useState('');
  const [interests, setInterests] = useState([]);
  
  const [careerGoal, setCareerGoal] = useState('');
  const [constraints, setConstraints] = useState([]);
  
  // Validation State
  const [errors, setErrors] = useState({});

  // Add tag functions
  const addSkill = (skill) => {
    const trimmed = skill.trim();
    const normalized = trimmed.toLowerCase();
    if (trimmed && !skills.some((existing) => existing.toLowerCase() === normalized)) {
      setSkills((current) => [...current, trimmed]);
    }
    setSkillInput('');
  };

  const removeSkill = (index) => {
    setSkills((current) => current.filter((_, i) => i !== index));
  };

  const addInterest = (interest) => {
    const trimmed = interest.trim();
    const normalized = trimmed.toLowerCase();
    if (trimmed && !interests.some((existing) => existing.toLowerCase() === normalized)) {
      setInterests((current) => [...current, trimmed]);
    }
    setInterestInput('');
  };

  const removeInterest = (index) => {
    setInterests(interests.filter((_, i) => i !== index));
  };

  // Toggle constraint
  const toggleConstraint = (val) => {
    if (constraints.includes(val)) {
      setConstraints(constraints.filter(item => item !== val));
    } else {
      setConstraints([...constraints, val]);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!degree) newErrors.degree = "Please select a degree.";
    if (!careerGoal.trim()) newErrors.careerGoal = "Please define your career goal.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit({
      degree,
      academicYear,
      skills,
      interests,
      careerGoal,
      constraints
    });
  };

  return (
    <div className="form-view-container">
      <div className="form-header-box">
        <h2>Personalize Your Pathway</h2>
        <p>Fill out the profile details below and our engine will craft a custom roadmap for you.</p>
      </div>

      <form className="glass-card" onSubmit={handleSubmit} id="student-path-form">
        <div className="form-grid">
          
          {/* Degree Selector */}
          <div className="form-group">
            <label htmlFor="degree-select">Degree / Major</label>
            <select 
              id="degree-select" 
              aria-label="Select your degree or major"
              aria-describedby={errors.degree ? 'degree-error' : undefined}
              value={degree} 
              onChange={(e) => setDegree(e.target.value)}
              className={errors.degree ? 'error' : ''}
            >
              <option value="computer_science">Computer Science</option>
              <option value="data_science">Data Science / Analytics</option>
              <option value="business_finance">Business / Finance / Econ</option>
              <option value="engineering">Engineering (Mechanical/Electrical/etc.)</option>
              <option value="marketing_comm">Marketing & Communications</option>
              <option value="other">Other / Multi-disciplinary</option>
            </select>
            {errors.degree && <span className="error-text" id="degree-error" role="alert">{errors.degree}</span>}
          </div>

          {/* Academic Year Selection */}
          <div className="form-group">
            <label>Academic Year</label>
            <div className="year-options">
              {['Freshman', 'Sophomore', 'Junior', 'Senior'].map((year) => (
                <label 
                  key={year} 
                  className={`year-card ${academicYear === year ? 'selected' : ''}`}
                >
                  <input 
                    type="radio" 
                    name="academicYear" 
                    value={year}
                    checked={academicYear === year}
                    onChange={() => setAcademicYear(year)}
                  />
                  <span>{year}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Skills Tag Input */}
          <div className="form-group col-span-2">
            <label>Skills You Already Have</label>
            <div className="tags-wrapper">
              <div className="tags-input-row">
                <input 
                  type="text" 
                  placeholder="e.g. Python, Public Speaking, Figma (Press Add)" 
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSkill(skillInput);
                    }
                  }}
                />
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => addSkill(skillInput)}>
                  <Plus size={16} /> Add
                </button>
              </div>
              
              {skills.length > 0 && (
                <div className="tags-container">
                  {skills.map((skill, index) => (
                    <span key={index} className="tag">
                      {skill}
                      <button type="button" onClick={() => removeSkill(index)}>
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Suggestions */}
              <div className="suggested-tags">
                <span className="suggested-tags-label">Quick Add:</span>
                {SUGGESTED_SKILLS_BY_DEGREE[degree]?.map((item) => (
                  <button 
                    key={item} 
                    type="button" 
                    className="tag-btn-suggested"
                    onClick={() => addSkill(item)}
                    disabled={skills.includes(item)}
                  >
                    +{item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Interests Tag Input */}
          <div className="form-group col-span-2">
            <label>Interests & Topics You Want to Learn</label>
            <div className="tags-wrapper">
              <div className="tags-input-row">
                <input 
                  type="text" 
                  placeholder="e.g. Robotics, Stock Markets, Startups (Press Add)" 
                  value={interestInput}
                  onChange={(e) => setInterestInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addInterest(interestInput);
                    }
                  }}
                />
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => addInterest(interestInput)}>
                  <Plus size={16} /> Add
                </button>
              </div>
              
              {interests.length > 0 && (
                <div className="tags-container">
                  {interests.map((interest, index) => (
                    <span key={index} className="tag">
                      {interest}
                      <button type="button" onClick={() => removeInterest(index)}>
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Suggestions */}
              <div className="suggested-tags">
                <span className="suggested-tags-label">Quick Add:</span>
                {SUGGESTED_INTERESTS_BY_DEGREE[degree]?.map((item) => (
                  <button 
                    key={item} 
                    type="button" 
                    className="tag-btn-suggested"
                    onClick={() => addInterest(item)}
                    disabled={interests.includes(item)}
                  >
                    +{item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Career Goal */}
          <div className="form-group col-span-2">
            <label htmlFor="goal-input">Career Goal / Dream Job</label>
            <input 
              type="text" 
              id="goal-input" 
              aria-describedby={errors.careerGoal ? 'goal-error' : undefined}
              placeholder="e.g. Software Engineer, AI Research Scientist, Investment Banker, UI/UX Designer" 
              value={careerGoal}
              onChange={(e) => setCareerGoal(e.target.value)}
              className={errors.careerGoal ? 'error' : ''}
              required
            />
            {errors.careerGoal && <span className="error-text" id="goal-error" role="alert" style={{color: 'var(--danger)', fontSize: '0.8rem'}}>{errors.careerGoal}</span>}
          </div>

          {/* Constraints Multi-Select */}
          <div className="form-group col-span-2">
            <label>Constraints & Preferences</label>
            <div className="constraints-grid">
              
              <div 
                className={`constraint-checkbox-card ${constraints.includes('financial') ? 'checked' : ''}`}
                onClick={() => toggleConstraint('financial')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleConstraint('financial');
                  }
                }}
                tabIndex={0}
                role="checkbox"
                aria-checked={constraints.includes('financial')}
              >
                <div className="custom-checkbox-indicator">✓</div>
                <div className="constraint-text-group">
                  <span className="constraint-title">Financial Limit</span>
                  <span className="constraint-desc">Prioritize free resources and certifications</span>
                </div>
              </div>

              <div 
                className={`constraint-checkbox-card ${constraints.includes('time') ? 'checked' : ''}`}
                onClick={() => toggleConstraint('time')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleConstraint('time');
                  }
                }}
                tabIndex={0}
                role="checkbox"
                aria-checked={constraints.includes('time')}
              >
                <div className="custom-checkbox-indicator">✓</div>
                <div className="constraint-text-group">
                  <span className="constraint-title">Time Constraints</span>
                  <span className="constraint-desc">Optimize for part-time/micro-learning speeds</span>
                </div>
              </div>

              <div 
                className={`constraint-checkbox-card ${constraints.includes('remote') ? 'checked' : ''}`}
                onClick={() => toggleConstraint('remote')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleConstraint('remote');
                  }
                }}
                tabIndex={0}
                role="checkbox"
                aria-checked={constraints.includes('remote')}
              >
                <div className="custom-checkbox-indicator">✓</div>
                <div className="constraint-text-group">
                  <span className="constraint-title">Remote Only</span>
                  <span className="constraint-desc">Highlight virtual events and remote internships</span>
                </div>
              </div>

              <div 
                className={`constraint-checkbox-card ${constraints.includes('no_programming') ? 'checked' : ''}`}
                onClick={() => toggleConstraint('no_programming')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleConstraint('no_programming');
                  }
                }}
                tabIndex={0}
                role="checkbox"
                aria-checked={constraints.includes('no_programming')}
              >
                <div className="custom-checkbox-indicator">✓</div>
                <div className="constraint-text-group">
                  <span className="constraint-title">No Intensive Programming</span>
                  <span className="constraint-desc">Focus on management, design, or visual builders</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Navigation Action Buttons */}
        <div className="form-actions-bar">
          <button type="button" className="btn btn-secondary" onClick={onBack}>
            <ArrowLeft size={16} /> Back
          </button>
          
          <button type="submit" className="btn btn-primary" id="btn-submit-form">
            <Sparkles size={16} /> Generate Roadmap
          </button>
        </div>
      </form>
    </div>
  );
}
