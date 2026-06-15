// Comprehensive roadmap generator database and logic for PathFinder.
// This file exports functions to synthesize a custom, interactive step-by-step roadmap.

// Predefined career tracks to match user goals or keywords
export const CAREER_TRACKS = {
  software_engineering: {
    id: "software_engineering",
    title: "Software Engineering (Full-Stack / Core)",
    skills: ["HTML/CSS", "JavaScript", "React/Vue/Angular", "Node.js", "Python", "SQL", "Git", "Data Structures", "Algorithms", "System Design"],
    resources: [
      { name: "MDN Web Docs", url: "https://developer.mozilla.org" },
      { name: "freeCodeCamp", url: "https://www.freecodecamp.org" },
      { name: "NeetCode (Algorithms)", url: "https://neetcode.io" },
      { name: "Full Stack Open", url: "https://fullstackopen.com/en" }
    ],
    milestones: [
      {
        phase: "Fundamentals",
        title: "Master Programming & CS Core",
        description: "Learn fundamental programming concepts (variables, loops, logic) and core data structures (arrays, linked lists, hash maps).",
        actions: ["Learn Git & GitHub for version control", "Build 3 simple command-line applications", "Solve 50 basic coding challenges"]
      },
      {
        phase: "Technical Depth",
        title: "Build Frontend & Backend Skills",
        description: "Dive deep into web technologies, database design, and building APIs.",
        actions: ["Build a full-stack CRUD application", "Learn relational (SQL) and non-relational (NoSQL) databases", "Deploy your application to a cloud provider"]
      },
      {
        phase: "Portfolio & Projects",
        title: "Develop Real-World Projects",
        description: "Collaborate with others or build complex solo projects to showcase your practical skills.",
        actions: ["Contribute to an open-source project", "Build a high-performance system or complex app", "Optimize database queries and set up unit testing"]
      },
      {
        phase: "Career Launch",
        title: "Technical Interviewing & Job Hunt",
        description: "Focus on resume polishing, technical interviews, and system design.",
        actions: ["Practice 100+ LeetCode problems (focus on patterns)", "Prepare behavioral stories", "Apply to 5 jobs/internships per week"]
      }
    ]
  },
  ai_data_science: {
    id: "ai_data_science",
    title: "Data Science & AI/ML Engineering",
    skills: ["Python", "R", "SQL", "Pandas & NumPy", "Scikit-Learn", "TensorFlow/PyTorch", "Statistics", "Machine Learning", "Deep Learning", "Data Visualization"],
    resources: [
      { name: "Kaggle Learn", url: "https://www.kaggle.com/learn" },
      { name: "Andrew Ng's Machine Learning Specialization", url: "https://www.coursera.org/specializations/machine-learning-introduction" },
      { name: "Fast.ai (Practical Deep Learning)", url: "https://www.fast.ai" },
      { name: "DataCamp", url: "https://www.datacamp.com" }
    ],
    milestones: [
      {
        phase: "Fundamentals",
        title: "Foundational Math & Python",
        description: "Strengthen linear algebra, calculus, probability, statistics, and clean Python programming.",
        actions: ["Master NumPy, Pandas, and Matplotlib libraries", "Analyze 3 exploratory data analysis (EDA) projects on Kaggle", "Solve statistics problems and understand distributions"]
      },
      {
        phase: "Technical Depth",
        title: "Classical Machine Learning",
        description: "Learn regression, classification, clustering, evaluation metrics, and feature engineering.",
        actions: ["Implement basic algorithms from scratch (linear regression, KNN)", "Build models using Scikit-Learn on real-world datasets", "Participate in a Kaggle playground competition"]
      },
      {
        phase: "Portfolio & Projects",
        title: "Deep Learning & NLP/Vision",
        description: "Explore neural networks, transfer learning, and deploying models to production.",
        actions: ["Train a convolutional neural network (CNN) or transformers using PyTorch/TensorFlow", "Deploy an ML model as an API (FastAPI) and wrap it in a Streamlit interface", "Write a blog post explaining an AI concept or project"]
      },
      {
        phase: "Career Launch",
        title: "Portfolio Prep & Case Studies",
        description: "Prepare for data engineering pipelines, system design, and mathematical interviews.",
        actions: ["Build a robust GitHub portfolio with at least 3 deep ML/data projects", "Practice explaining model trade-offs (e.g. bias-variance, overfitting)", "Network with ML/Data Science professionals on LinkedIn"]
      }
    ]
  },
  product_management: {
    id: "product_management",
    title: "Product Management (PM)",
    skills: ["Product Strategy", "Agile Methodologies", "User Research", "Wireframing/Prototyping", "Data Analytics", "Roadmapping", "A/B Testing", "Market Research", "SQL", "Product Sense"],
    resources: [
      { name: "Product School Resources", url: "https://productschool.com/resources" },
      { name: "Product Management Exercises", url: "https://www.productmanagementexercises.com" },
      { name: "Lenny's Newsletter", url: "https://www.lennysnewsletter.com" },
      { name: "SVPG (Silicon Valley Product Group)", url: "https://www.svpg.com" }
    ],
    milestones: [
      {
        phase: "Fundamentals",
        title: "Core Product Frameworks",
        description: "Learn product lifecycle, user personas, agile methodologies, and backlog management.",
        actions: ["Read 'Inspired' by Marty Cagan", "Deconstruct a favorite product and write a product tear-down report", "Learn to design wireframes using Figma"]
      },
      {
        phase: "Technical Depth",
        title: "Data Analytics & User Research",
        description: "Learn to query data, analyze metrics (AARRR, HEART), run A/B tests, and conduct user interviews.",
        actions: ["Learn basic SQL to query database tables", "Conduct 5 user interviews for a mock product feature", "Create a product requirements document (PRD) for a new feature"]
      },
      {
        phase: "Portfolio & Projects",
        title: "Product Launch & Leadership",
        description: "Demonstrate cross-functional leadership by launching a small project or organizing teams.",
        actions: ["Run a small project (like a website or app) with a team of students", "Design a roadmap using tools like Jira or Productboard", "Conduct competitive analysis for a hot tech market"]
      },
      {
        phase: "Career Launch",
        title: "Product Case Prep & Networking",
        description: "Prepare for product design, estimation, metrics, and behavioral interview questions.",
        actions: ["Solve 30+ product case questions from Product Management Exercises", "Apply for Associate Product Manager (APM) programs", "Find APM mentors through tech communities"]
      }
    ]
  },
  ui_ux_design: {
    id: "ui_ux_design",
    title: "UI/UX & Product Design",
    skills: ["Figma/Adobe XD", "Wireframing", "User Interface Design", "User Experience (UX) Research", "Design Systems", "Prototyping", "Typography & Color Theory", "Information Architecture", "Interaction Design", "HTML/CSS Basics"],
    resources: [
      { name: "UX Collective", url: "https://uxdesign.cc" },
      { name: "Law of UX", url: "https://lawsofux.com" },
      { name: "Figma Learn", url: "https://help.figma.com/hc/en-us/categories/360002051614-Learn-Figma" },
      { name: "Interaction Design Foundation", url: "https://www.interaction-design.org" }
    ],
    milestones: [
      {
        phase: "Fundamentals",
        title: "Visual Design & Figma Core",
        description: "Learn key visual hierarchies, typography, color palettes, and Figma tools.",
        actions: ["Master auto-layout and components in Figma", "Redesign 3 popular mobile screens focusing on alignment", "Study 10 core Laws of UX"]
      },
      {
        phase: "Technical Depth",
        title: "UX Research & Wireframing",
        description: "Understand user flows, site mapping, persona creation, and low-fidelity sketching.",
        actions: ["Conduct user testing on an existing app and identify friction points", "Create wireframes and mockups for a multi-screen app", "Build an interactive clickable high-fidelity prototype"]
      },
      {
        phase: "Portfolio & Projects",
        title: "Case Studies & Design Systems",
        description: "Document your problem-solving process from research to final design in detailed case studies.",
        actions: ["Create a custom design system (buttons, inputs, variants) for a mock project", "Write 2 end-to-end case studies detailing UX decisions", "Build your design portfolio website using Webflow, Framer, or simple portfolio platforms"]
      },
      {
        phase: "Career Launch",
        title: "Design Reviews & Pitching",
        description: "Prepare to present your design decisions, review design exercises, and apply to jobs.",
        actions: ["Practice a 20-minute portfolio presentation", "Participate in design critiques or communities", "Apply to design roles at product-led companies"]
      }
    ]
  },
  finance_consulting: {
    id: "finance_consulting",
    title: "Finance & Investment Banking / Consulting",
    skills: ["Financial Modeling", "Valuation (DCF, Comps)", "Excel (Advanced)", "PowerPoint", "Accounting", "Corporate Finance", "Market Analysis", "Case Interviewing", "Data Analysis", "Macroeconomics"],
    resources: [
      { name: "Investopedia", url: "https://www.investopedia.com" },
      { name: "Corporate Finance Institute (CFI)", url: "https://corporatefinanceinstitute.com" },
      { name: "Case Interview Prep (LOMS)", url: "https://www.caseinterview.com" },
      { name: "Mergers & Inquisitions", url: "https://mergersandinquisitions.com" }
    ],
    milestones: [
      {
        phase: "Fundamentals",
        title: "Financial Accounting & Excel Core",
        description: "Understand three financial statements, general ledger accounting, and advanced Excel formulas.",
        actions: ["Master Excel shortcuts (no mouse usage)", "Reconstruct balance sheets and income statements from public filings", "Complete an introductory course in corporate finance"]
      },
      {
        phase: "Technical Depth",
        title: "Valuation & Modeling",
        description: "Learn Discounted Cash Flow (DCF), Comparable Companies, and LBO modeling.",
        actions: ["Build a fully integrated 3-statement model in Excel", "Perform a valuation analysis on a chosen public company", "Learn slide design rules and build a pitch deck outline"]
      },
      {
        phase: "Portfolio & Projects",
        title: "Stock Pitch & Case Competitions",
        description: "Participate in real competitions or compile research analysis reports on specific industries.",
        actions: ["Draft a 3-page equity research report (Buy/Sell pitch)", "Participate in a business plan or case study competition", "Stay updated daily on market movements (Wall Street Journal, Bloomberg)"]
      },
      {
        phase: "Career Launch",
        title: "Technical Mock Interviews",
        description: "Practice accounting, valuation, and behavioral interview templates, or case study frameworks.",
        actions: ["Run 20+ mock case interviews or technical finance drills", "Network aggressively with alumni in investment banking/consulting", "Apply to summer analyst positions"]
      }
    ]
  },
  digital_marketing: {
    id: "digital_marketing",
    title: "Digital Marketing & Growth",
    skills: ["SEO (Search Engine Optimization)", "SEM & PPC (Google/Meta Ads)", "Content Strategy", "Google Analytics 4", "Copywriting", "Email Marketing", "Social Media Strategy", "A/B Testing", "Conversion Rate Optimization (CRO)", "Brand Building"],
    resources: [
      { name: "HubSpot Academy", url: "https://academy.hubspot.com" },
      { name: "Google Skillshop", url: "https://skillshop.google.com" },
      { name: "Ahrefs Academy", url: "https://ahrefs.com/academy" },
      { name: "Moz SEO Guide", url: "https://moz.com/beginners-guide-to-seo" }
    ],
    milestones: [
      {
        phase: "Fundamentals",
        title: "Marketing Core & Copywriting",
        description: "Learn marketing funnels (AIDA), audience targeting, and emotional/persuasive copywriting.",
        actions: ["Write 5 mock ad copy variations for a popular product", "Get Google Analytics 4 (GA4) certified", "Complete HubSpot Content Marketing Certification"]
      },
      {
        phase: "Technical Depth",
        title: "Paid Ads & SEO Optimization",
        description: "Understand bid strategies, ad creatives, keyword research, backlink structures, and technical SEO.",
        actions: ["Conduct a keyword audit for a local business and identify 10 low-hanging opportunities", "Set up a mock campaign in Google Ads/Facebook Ads Manager", "Understand pixel installations and event tracking code"]
      },
      {
        phase: "Portfolio & Projects",
        title: "Launch a Campaign & Growth Project",
        description: "Get hands-on experience by driving organic/paid traffic to a real website or blog.",
        actions: ["Launch a blog, rank 3 articles on Google page 1, and track via Search Console", "Run email campaigns using Mailchimp or Substack to grow a small audience", "Analyze performance metrics and draft a conversion optimization plan"]
      },
      {
        phase: "Career Launch",
        title: "Client Case Studies & Portfolio",
        description: "Put your results into concise client sheets showing ROI, traffic lifts, and conversions.",
        actions: ["Create a portfolio presenting 3 growth projects with screenshots and charts", "Apply to marketing agencies or early-stage startups", "Build a personal brand on LinkedIn by sharing marketing insights"]
      }
    ]
  }
};

// Map degree choices to relevant coursework modules
const DEGREE_COURSES = {
  computer_science: ["Data Structures & Algorithms", "Operating Systems", "Object-Oriented Programming", "Database Management Systems", "Software Engineering Principles", "Discrete Mathematics", "Computer Networks"],
  data_science: ["Introduction to Statistics", "Linear Algebra for Data", "Probability Theory", "Data Mining & Databases", "Machine Learning Fundamentals", "Statistical Modeling", "Applied Regression Analysis"],
  business_finance: ["Financial Accounting", "Managerial Economics", "Corporate Finance", "Investment Analysis", "Business Analytics", "Strategic Management", "Microeconomics & Macroeconomics"],
  engineering: ["Engineering Mathematics", "Physics & Calculus", "Systems Engineering", "CAD & Prototyping", "Project Management", "Numerical Methods", "Circuits or Applied Mechanics"],
  marketing_comm: ["Marketing Principles", "Consumer Behavior", "Public Relations & Media", "Market Research Methods", "Advertising Strategy", "Creative Copywriting", "Digital Media Analytics"],
  other: ["Research Methodologies", "Critical Thinking & Analysis", "Professional Communication", "Project Management", "Creative Writing", "Introduction to Statistics"]
};

// Generates steps tailored to the student's current year and degree structure
function getAcademicMilestones(degree, currentYear) {
  const courses = DEGREE_COURSES[degree] || DEGREE_COURSES.other;
  
  // Format based on year
  switch (currentYear.toLowerCase()) {
    case "freshman":
    case "1st year":
      return {
        title: "Academic Alignment: Build Foundations",
        description: `Use your first year to build GPA and cover core prerequisites for ${degree.replace('_', ' ')}.`,
        actions: [
          `Target core subjects: ${courses[0]} and ${courses[1]}.`,
          "Aim for a high GPA (3.5+) to keep research and competitive programs open.",
          "Join 1-2 student societies or clubs related to your major."
        ]
      };
    case "sophomore":
    case "2nd year":
      return {
        title: "Academic Alignment: Intermediate Specialization",
        description: "Shift focus towards intermediate coursework and building faculty connections.",
        actions: [
          `Focus on standard subjects: ${courses[2]} and ${courses[3]}.`,
          "Identify professors doing research in your target field and attend office hours.",
          "Secure a leadership position or executive role in a student organization."
        ]
      };
    case "junior":
    case "3rd year":
      return {
        title: "Academic Alignment: Advanced Electives & Focus",
        description: "Junior year is critical for technical specialization and internship preparation.",
        actions: [
          `Take advanced classes: ${courses[4]} and ${courses[5]}.`,
          "Utilize career centers to optimize resumes for summer internships.",
          "Enroll in independent study, capstone projects, or university lab research."
        ]
      };
    case "senior":
    case "4th year":
    default:
      return {
        title: "Academic Alignment: Capstone & Transition",
        description: "Maximize your final year to wrap up degree requirements and transition into industry.",
        actions: [
          `Complete your senior capstone project or final thesis related to your career goal.`,
          `Ensure you finish remaining electives: ${courses[courses.length - 1]}.`,
          "Engage heavily with university alumni networks for direct referrals."
        ]
      };
  }
}

// Enhances roadmap steps with workarounds based on constraints
function getConstraintAdvice(constraints) {
  const advices = [];
  if (!constraints || constraints.length === 0) return advices;

  if (constraints.includes("financial")) {
    advices.push({
      type: "Financial Workaround",
      title: "Zero-Cost Learning Blueprint",
      tip: "Leverage financial aid, library sponsorships, and open-source materials.",
      actions: [
        "Apply for Coursera Financial Aid (100% discount on certificates; takes 14 days to process).",
        "Use local library credentials to access free LinkedIn Learning and Udemy Business.",
        "Focus on building high-value projects using free open-source tools instead of expensive certifications."
      ]
    });
  }

  if (constraints.includes("time")) {
    advices.push({
      type: "Time Commitment",
      title: "Micro-Learning Strategy",
      tip: "If you have limited hours per week, structure learning into 30-minute daily micro-sessions.",
      actions: [
        "Adopt the 'Pomodoro' technique: two 25-minute study intervals daily.",
        "Emphasize project-based learning (building things directly teaches faster than watching long tutorials).",
        "Use GitHub or calendar checklists to track small daily wins, maintaining momentum."
      ]
    });
  }

  if (constraints.includes("remote")) {
    advices.push({
      type: "Location Constraint",
      title: "Remote/Virtual-First Networking",
      tip: "Geographic distance should not limit opportunities. Focus on virtual presence.",
      actions: [
        "Optimize your LinkedIn profile for searchability (include remote keywords and clear headlines).",
        "Participate in virtual hackathons, open source contributions, or remote freelance platforms.",
        "Apply to virtual-first companies and target 'remote student internship' opportunities."
      ]
    });
  }

  if (constraints.includes("no_programming")) {
    advices.push({
      type: "Non-Technical Optimization",
      title: "No-Code & Strategy Adaptation",
      tip: "Focus on strategy, design, and product management, avoiding intensive software construction.",
      actions: [
        "Master no-code tools (Webflow, Framer, Airtable, Zapier) to build prototypes quickly.",
        "Hone visual design, user empathy, or copywriting skills to offer immediate value.",
        "Position yourself as a strategic/functional manager who bridges the gap between technology and business."
      ]
    });
  }

  return advices;
}

// Fallback generator for custom career goals not in pre-defined tracks
function generateCustomTrack(careerGoal, userSkills, userInterests) {
  // Analyze career goal for keywords
  const goalLower = careerGoal.toLowerCase();
  
  let baseTitle = careerGoal;
  let defaultSkills = [...userSkills];
  if (defaultSkills.length === 0) {
    if (goalLower.includes("dev") || goalLower.includes("program") || goalLower.includes("code")) {
      defaultSkills = ["Git", "Programming", "Problem Solving", "APIs"];
    } else {
      defaultSkills = ["Communication", "Project Management", "Data Analysis", "Critical Thinking"];
    }
  }

  return {
    id: "custom_track",
    title: baseTitle,
    skills: [...new Set([...defaultSkills, ...userSkills])],
    resources: [
      { name: "Google & YouTube Guides", url: "https://google.com" },
      { name: "EdX / Coursera Open Courses", url: "https://www.coursera.org" },
      { name: "LinkedIn Learning", url: "https://www.linkedin.com/learning" }
    ],
    milestones: [
      {
        phase: "Fundamentals",
        title: `Core Fundamentals for ${careerGoal}`,
        description: `Establish the foundational knowledge base and mental models required for a career as a ${careerGoal}.`,
        actions: [
          "Identify and read the top 3 industry blogs/books in this domain.",
          "Follow 5 thought leaders in this space on LinkedIn or Twitter.",
          "Document your baseline understanding and map out core industry terms."
        ]
      },
      {
        phase: "Technical Depth",
        title: `Skill Building & Specialization`,
        description: `Acquire the specialized technical competencies and credentials to make you competitive.`,
        actions: [
          "Select a core tool/framework and dedicate 4 weeks to intensive practice.",
          "Find online communities (Reddit, Discord, Slack) where professionals in this role chat.",
          "Build mini-experiments or write analyses applying this skill."
        ]
      },
      {
        phase: "Portfolio & Projects",
        title: `Independent Projects & Case Studies`,
        description: "Prove you can do the work by compiling a publicly visible folder or website of projects.",
        actions: [
          "Construct a capstone project that solves a genuine problem in this industry.",
          "Document your project process in a detailed case study or write-up.",
          "Get constructive feedback from peers or mentors on your work."
        ]
      },
      {
        phase: "Career Launch",
        title: `Positioning & Strategic Job Hunt`,
        description: "Format your resume, build reference sheets, and start pitching to potential employers.",
        actions: [
          `Optimize your resume specifically for: '${careerGoal}' keywords.`,
          "Reach out to 10 alumni in this role for informational interviews.",
          "Send personalized cold outreach pitches to 5 target hiring managers."
        ]
      }
    ]
  };
}

// Core function: Entry point to compile the final roadmap
export function generateRoadmap(formData) {
  const { degree, academicYear, skills = [], interests = [], careerGoal = "", constraints = [] } = formData;
  
  // 1. Identify closest career track
  let track = null;
  const goalLower = careerGoal.toLowerCase();
  
  if (goalLower.includes("software") || goalLower.includes("web dev") || goalLower.includes("frontend") || goalLower.includes("backend") || goalLower.includes("programmer") || goalLower.includes("developer")) {
    track = JSON.parse(JSON.stringify(CAREER_TRACKS.software_engineering));
  } else if (goalLower.includes("ai") || goalLower.includes("machine learning") || goalLower.includes("data scientist") || goalLower.includes("data science") || goalLower.includes("analyst")) {
    track = JSON.parse(JSON.stringify(CAREER_TRACKS.ai_data_science));
  } else if (goalLower.includes("product manager") || goalLower.includes("pm") || goalLower.includes("product management")) {
    track = JSON.parse(JSON.stringify(CAREER_TRACKS.product_management));
  } else if (goalLower.includes("design") || goalLower.includes("ui") || goalLower.includes("ux") || goalLower.includes("creative") || goalLower.includes("artist")) {
    track = JSON.parse(JSON.stringify(CAREER_TRACKS.ui_ux_design));
  } else if (goalLower.includes("finance") || goalLower.includes("bank") || goalLower.includes("consult") || goalLower.includes("invest")) {
    track = JSON.parse(JSON.stringify(CAREER_TRACKS.finance_consulting));
  } else if (goalLower.includes("market") || goalLower.includes("seo") || goalLower.includes("social media") || goalLower.includes("growth")) {
    track = JSON.parse(JSON.stringify(CAREER_TRACKS.digital_marketing));
  } else {
    // If no direct track is found, dynamically create a custom track
    track = generateCustomTrack(careerGoal || "Professional Career", skills, interests);
  }

  // 2. Build personalized milestones
  const milestones = [];

  // Mile 0: Academic Year / Degree specific milestone (usually inject first or second)
  const academicMilestone = getAcademicMilestones(degree, academicYear);

  // Parse track milestones and construct
  // Milestone 1: Fundamentals (injecting user's existing skills / interests hints if applicable)
  const baseM1 = track.milestones[0];
  milestones.push({
    id: "m_fundamentals",
    phase: baseM1.phase,
    title: baseM1.title,
    description: baseM1.description,
    actions: baseM1.actions.map(act => ({ text: act, completed: false })),
    skillsTargeted: track.skills.slice(0, 3)
  });

  // Inject Academic milestone in the sequence
  milestones.push({
    id: "m_academic",
    phase: "Academic Track",
    title: academicMilestone.title,
    description: academicMilestone.description,
    actions: academicMilestone.actions.map(act => ({ text: act, completed: false })),
    skillsTargeted: DEGREE_COURSES[degree]?.slice(0, 2) || ["Domain Studies"]
  });

  // Milestone 2: Technical Depth
  const baseM2 = track.milestones[1];
  // If user has skills relevant to this, customize action
  const m2Actions = [...baseM2.actions];
  if (skills.length > 0) {
    m2Actions.unshift(`Leverage your existing skill in ${skills[0]} to speed up this phase.`);
  }
  milestones.push({
    id: "m_depth",
    phase: baseM2.phase,
    title: baseM2.title,
    description: baseM2.description,
    actions: m2Actions.map(act => ({ text: act, completed: false })),
    skillsTargeted: track.skills.slice(3, 6)
  });

  // Milestone 3: Portfolio & Projects
  const baseM3 = track.milestones[2];
  const m3Actions = [...baseM3.actions];
  if (interests.length > 0) {
    m3Actions.push(`Incorporate your interest in ${interests[0]} into your portfolio projects.`);
  }
  milestones.push({
    id: "m_portfolio",
    phase: baseM3.phase,
    title: baseM3.title,
    description: baseM3.description,
    actions: m3Actions.map(act => ({ text: act, completed: false })),
    skillsTargeted: track.skills.slice(6, 9)
  });

  // Milestone 4: Constraint workarounds (if any)
  const constraintAdvices = getConstraintAdvice(constraints);
  constraintAdvices.forEach((advice, index) => {
    milestones.push({
      id: `m_constraint_${index}`,
      phase: "Constraint Strategy",
      title: advice.title,
      description: advice.tip,
      actions: advice.actions.map(act => ({ text: act, completed: false })),
      skillsTargeted: [advice.type]
    });
  });

  // Milestone 5: Career Launch
  const baseM4 = track.milestones[3];
  milestones.push({
    id: "m_launch",
    phase: baseM4.phase,
    title: baseM4.title,
    description: baseM4.description,
    actions: baseM4.actions.map(act => ({ text: act, completed: false })),
    skillsTargeted: [track.skills[track.skills.length - 1] || "Job Placement", "Networking"]
  });

  // Compile final dashboard data
  return {
    careerTitle: track.title,
    skillsNeeded: track.skills,
    resources: track.resources,
    milestones: milestones,
    progressPercent: 0
  };
}
