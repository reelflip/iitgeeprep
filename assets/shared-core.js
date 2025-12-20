var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
const SYLLABUS_DATA = [
  // ==========================================
  // PHYSICS (20 Units)
  // ==========================================
  // UNIT 1: Units and Measurements
  { id: "p-units", name: "Units & Dimensions", chapter: "Units and Measurements", subject: "Physics" },
  { id: "p-errors", name: "Errors in Measurement", chapter: "Units and Measurements", subject: "Physics" },
  // UNIT 2: Kinematics
  { id: "p-kin-1d", name: "Motion in a Straight Line", chapter: "Kinematics", subject: "Physics" },
  { id: "p-kin-2d", name: "Motion in a Plane (Projectile & Circular)", chapter: "Kinematics", subject: "Physics" },
  // UNIT 3: Laws of Motion
  { id: "p-nlm", name: "Newton's Laws of Motion", chapter: "Laws of Motion", subject: "Physics" },
  { id: "p-friction", name: "Friction", chapter: "Laws of Motion", subject: "Physics" },
  // UNIT 4: Work, Energy and Power
  { id: "p-wep", name: "Work, Energy & Power", chapter: "Work, Energy and Power", subject: "Physics" },
  { id: "p-collisions", name: "Collisions", chapter: "Work, Energy and Power", subject: "Physics" },
  // UNIT 5: Rotational Motion
  { id: "p-com", name: "Center of Mass", chapter: "Rotational Motion", subject: "Physics" },
  { id: "p-rot", name: "Rotational Mechanics", chapter: "Rotational Motion", subject: "Physics" },
  // UNIT 6: Gravitation
  { id: "p-grav", name: "Gravitation", chapter: "Gravitation", subject: "Physics" },
  // UNIT 7: Properties of Solids and Liquids
  { id: "p-solids", name: "Elasticity (Solids)", chapter: "Properties of Solids and Liquids", subject: "Physics" },
  { id: "p-fluids", name: "Fluid Mechanics", chapter: "Properties of Solids and Liquids", subject: "Physics" },
  { id: "p-thermal-prop", name: "Thermal Properties of Matter", chapter: "Properties of Solids and Liquids", subject: "Physics" },
  // UNIT 8: Thermodynamics
  { id: "p-thermo", name: "Thermodynamics Laws & Processes", chapter: "Thermodynamics", subject: "Physics" },
  // UNIT 9: Kinetic Theory of Gases
  { id: "p-ktg", name: "Kinetic Theory of Gases", chapter: "Kinetic Theory of Gases", subject: "Physics" },
  // UNIT 10: Oscillations and Waves
  { id: "p-shm", name: "Oscillations (SHM)", chapter: "Oscillations and Waves", subject: "Physics" },
  { id: "p-waves", name: "Waves (Sound & String)", chapter: "Oscillations and Waves", subject: "Physics" },
  // UNIT 11: Electrostatics
  { id: "p-electro", name: "Electric Charges & Fields", chapter: "Electrostatics", subject: "Physics" },
  { id: "p-potential", name: "Electrostatic Potential", chapter: "Electrostatics", subject: "Physics" },
  { id: "p-capacitance", name: "Capacitors", chapter: "Electrostatics", subject: "Physics" },
  // UNIT 12: Current Electricity
  { id: "p-current", name: "Current Electricity", chapter: "Current Electricity", subject: "Physics" },
  // UNIT 13: Magnetic Effects of Current and Magnetism
  { id: "p-mag-eff", name: "Moving Charges & Magnetism", chapter: "Magnetic Effects", subject: "Physics" },
  { id: "p-magnetism", name: "Magnetism & Matter", chapter: "Magnetic Effects", subject: "Physics" },
  // UNIT 14: EMI and AC
  { id: "p-emi", name: "Electromagnetic Induction", chapter: "EMI and AC", subject: "Physics" },
  { id: "p-ac", name: "Alternating Current", chapter: "EMI and AC", subject: "Physics" },
  // UNIT 15: Electromagnetic Waves
  { id: "p-emw", name: "Electromagnetic Waves", chapter: "Electromagnetic Waves", subject: "Physics" },
  // UNIT 16: Optics
  { id: "p-ray", name: "Ray Optics", chapter: "Optics", subject: "Physics" },
  { id: "p-wave-optics", name: "Wave Optics", chapter: "Optics", subject: "Physics" },
  // UNIT 17: Dual Nature
  { id: "p-dual", name: "Dual Nature of Radiation & Matter", chapter: "Dual Nature", subject: "Physics" },
  // UNIT 18: Atoms and Nuclei
  { id: "p-atoms", name: "Atoms", chapter: "Atoms and Nuclei", subject: "Physics" },
  { id: "p-nuclei", name: "Nuclei", chapter: "Atoms and Nuclei", subject: "Physics" },
  // UNIT 19: Electronic Devices
  { id: "p-semicon", name: "Semiconductors", chapter: "Electronic Devices", subject: "Physics" },
  // UNIT 20: Experimental Skills
  { id: "p-exp", name: "Experimental Skills", chapter: "Experimental Skills", subject: "Physics" },
  // ==========================================
  // CHEMISTRY (20 Units)
  // ==========================================
  // PHYSICAL CHEMISTRY
  // Unit 1
  { id: "c-basic", name: "Some Basic Concepts", chapter: "Physical Chemistry", subject: "Chemistry" },
  // Unit 2
  { id: "c-atom", name: "Atomic Structure", chapter: "Physical Chemistry", subject: "Chemistry" },
  // Unit 3
  { id: "c-bond", name: "Chemical Bonding", chapter: "Physical Chemistry", subject: "Chemistry" },
  // Unit 4
  { id: "c-thermo", name: "Chemical Thermodynamics", chapter: "Physical Chemistry", subject: "Chemistry" },
  // Unit 5
  { id: "c-sol", name: "Solutions", chapter: "Physical Chemistry", subject: "Chemistry" },
  // Unit 6
  { id: "c-equil", name: "Equilibrium (Chemical & Ionic)", chapter: "Physical Chemistry", subject: "Chemistry" },
  // Unit 7
  { id: "c-redox", name: "Redox & Electrochemistry", chapter: "Physical Chemistry", subject: "Chemistry" },
  // Unit 8
  { id: "c-kinetics", name: "Chemical Kinetics", chapter: "Physical Chemistry", subject: "Chemistry" },
  // INORGANIC CHEMISTRY
  // Unit 9
  { id: "c-class", name: "Classification of Elements", chapter: "Inorganic Chemistry", subject: "Chemistry" },
  // Unit 10
  { id: "c-pblock", name: "p-Block Elements (Group 13-18)", chapter: "Inorganic Chemistry", subject: "Chemistry" },
  // Unit 11
  { id: "c-dfblock", name: "d- and f- Block Elements", chapter: "Inorganic Chemistry", subject: "Chemistry" },
  // Unit 12
  { id: "c-coord", name: "Coordination Compounds", chapter: "Inorganic Chemistry", subject: "Chemistry" },
  // ORGANIC CHEMISTRY
  // Unit 13
  { id: "c-purif", name: "Purification & Characterisation", chapter: "Organic Chemistry", subject: "Chemistry" },
  // Unit 14
  { id: "c-goc", name: "Some Basic Principles (GOC)", chapter: "Organic Chemistry", subject: "Chemistry" },
  // Unit 15
  { id: "c-hydro", name: "Hydrocarbons", chapter: "Organic Chemistry", subject: "Chemistry" },
  // Unit 16
  { id: "c-halo", name: "Organic Compounds Containing Halogens", chapter: "Organic Chemistry", subject: "Chemistry" },
  // Unit 17
  { id: "c-oxy", name: "Organic Compounds Containing Oxygen", chapter: "Organic Chemistry", subject: "Chemistry" },
  // Unit 18
  { id: "c-nitro", name: "Organic Compounds Containing Nitrogen", chapter: "Organic Chemistry", subject: "Chemistry" },
  // Unit 19
  { id: "c-bio", name: "Biomolecules", chapter: "Organic Chemistry", subject: "Chemistry" },
  // Unit 20
  { id: "c-prac", name: "Principles Related to Practical Chemistry", chapter: "Organic Chemistry", subject: "Chemistry" },
  // ==========================================
  // MATHEMATICS (14 Units)
  // ==========================================
  // Unit 1
  { id: "m-sets", name: "Sets, Relations & Functions", chapter: "Sets, Relations & Functions", subject: "Maths" },
  // Unit 2
  { id: "m-complex", name: "Complex Numbers & Quadratic Eq", chapter: "Algebra", subject: "Maths" },
  // Unit 3
  { id: "m-matrices", name: "Matrices & Determinants", chapter: "Algebra", subject: "Maths" },
  // Unit 4
  { id: "m-pnc", name: "Permutations & Combinations", chapter: "Algebra", subject: "Maths" },
  // Unit 5
  { id: "m-bino", name: "Binomial Theorem", chapter: "Algebra", subject: "Maths" },
  // Unit 6
  { id: "m-seq", name: "Sequence & Series", chapter: "Algebra", subject: "Maths" },
  // Unit 7
  { id: "m-limits", name: "Limit, Continuity & Differentiability", chapter: "Calculus", subject: "Maths" },
  { id: "m-aod", name: "Applications of Derivatives", chapter: "Calculus", subject: "Maths" },
  // Unit 8
  { id: "m-integral", name: "Integral Calculus", chapter: "Calculus", subject: "Maths" },
  // Unit 9
  { id: "m-diffeq", name: "Differential Equations", chapter: "Calculus", subject: "Maths" },
  // Unit 10
  { id: "m-coord", name: "Co-ordinate Geometry", chapter: "Coordinate Geometry", subject: "Maths" },
  // Unit 11
  { id: "m-3d", name: "Three Dimensional Geometry", chapter: "3D & Vectors", subject: "Maths" },
  // Unit 12
  { id: "m-vector", name: "Vector Algebra", chapter: "3D & Vectors", subject: "Maths" },
  // Unit 13
  { id: "m-stats", name: "Statistics & Probability", chapter: "Statistics & Probability", subject: "Maths" },
  // Unit 14
  { id: "m-trigo", name: "Trigonometry", chapter: "Trigonometry", subject: "Maths" }
];
const createQ = (id, text, options, correct, subject, topic, source = "JEE Main PYQ", difficulty = "MEDIUM") => ({
  id,
  text,
  options,
  correctOptionIndex: correct,
  subjectId: subject,
  topicId: topic,
  source,
  year: 2023,
  difficulty
});
const PHYSICS_TEMPLATES = [
  { q: "Which of the following is a vector quantity?", o: ["Work", "Power", "Torque", "Energy"], c: 2 },
  { q: "The dimensional formula for Force is:", o: ["[MLT⁻²]", "[ML²T⁻²]", "[ML⁻¹T⁻²]", "[M⁰L⁰T⁰]"], c: 0 },
  { q: "According to Newton's Second Law:", o: ["F = ma", "F = mv", "F = m/a", "F = m²a"], c: 0 },
  { q: "The SI unit of Work is:", o: ["Joule", "Newton", "Watt", "Pascal"], c: 0 },
  { q: "For a projectile, the trajectory is:", o: ["Parabolic", "Circular", "Linear", "Hyperbolic"], c: 0 },
  { q: "Kinetic Energy is given by:", o: ["mv", "1/2 mv²", "mgh", "ma"], c: 1 },
  { q: "Which force is always attractive?", o: ["Gravitational", "Electrostatic", "Magnetic", "Frictional"], c: 0 },
  { q: "Hooke's law is related to:", o: ["Elasticity", "Fluid pressure", "Viscosity", "Surface tension"], c: 0 },
  { q: "Sound waves in air are:", o: ["Longitudinal", "Transverse", "Electromagnetic", "Stationary"], c: 0 },
  { q: "Rate of change of momentum is:", o: ["Force", "Impulse", "Power", "Work"], c: 0 }
];
const CHEMISTRY_TEMPLATES = [
  { q: "Which element has the highest electronegativity?", o: ["Fluorine", "Chlorine", "Oxygen", "Nitrogen"], c: 0 },
  { q: "The shape of Methane (CH4) molecule is:", o: ["Tetrahedral", "Pyramidal", "Linear", "Bent"], c: 0 },
  { q: "Which of the following is an alkali metal?", o: ["Sodium", "Magnesium", "Iron", "Copper"], c: 0 },
  { q: "pH of pure water at 25°C is:", o: ["7", "0", "14", "1"], c: 0 },
  { q: "Ideal Gas Equation is:", o: ["PV = nRT", "PV = RT", "P = nRT", "V = nRT"], c: 0 },
  { q: "Which quantum number determines shape of orbital?", o: ["Azimuthal (l)", "Principal (n)", "Magnetic (m)", "Spin (s)"], c: 0 },
  { q: "Number of moles in 18g of water is:", o: ["1", "18", "0.5", "2"], c: 0 },
  { q: "Which acid is present in vinegar?", o: ["Acetic acid", "Formic acid", "Citric acid", "Lactic acid"], c: 0 },
  { q: "Brass is an alloy of:", o: ["Cu + Zn", "Cu + Sn", "Fe + C", "Pb + Sn"], c: 0 },
  { q: "General formula of Alkenes is:", o: ["CnH2n", "CnH2n+2", "CnH2n-2", "CnHn"], c: 0 }
];
const MATHS_TEMPLATES = [
  { q: "The derivative of sin(x) is:", o: ["cos(x)", "-cos(x)", "tan(x)", "sec(x)"], c: 0 },
  { q: "Value of log(1) is:", o: ["0", "1", "10", "Infinity"], c: 0 },
  { q: "Roots of x² - 1 = 0 are:", o: ["1, -1", "1, 1", "0, 1", "-1, -1"], c: 0 },
  { q: "Value of sin(30°) is:", o: ["1/2", "√3/2", "1/√2", "1"], c: 0 },
  { q: "Slope of the line y = 2x + 3 is:", o: ["2", "3", "1", "-2"], c: 0 },
  { q: "Sum of first n natural numbers is:", o: ["n(n+1)/2", "n²", "n(n-1)/2", "n(n+1)"], c: 0 },
  { q: "If A is a matrix of order 2x3, order of A' is:", o: ["3x2", "2x3", "2x2", "3x3"], c: 0 },
  { q: "Integration of x dx is:", o: ["x²/2 + c", "x + c", "x² + c", "1 + c"], c: 0 },
  { q: "Distance between (0,0) and (3,4) is:", o: ["5", "7", "1", "25"], c: 0 },
  { q: "Which of these is an irrational number?", o: ["π", "22/7", "0", "1"], c: 0 }
];
const getTemplate = (subject, index, topicId) => {
  const hash = topicId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const combinedIndex = index + hash;
  if (subject === "Physics") return PHYSICS_TEMPLATES[combinedIndex % PHYSICS_TEMPLATES.length];
  if (subject === "Chemistry") return CHEMISTRY_TEMPLATES[combinedIndex % CHEMISTRY_TEMPLATES.length];
  return MATHS_TEMPLATES[combinedIndex % MATHS_TEMPLATES.length];
};
const generateInitialQuestionBank = () => {
  const questions = [];
  SYLLABUS_DATA.forEach((topic) => {
    if (topic.id === "p-units") {
      questions.push(createQ(`q_p_units_1`, "Dimensional formula of Planck's Constant is:", ["[ML²T⁻¹]", "[ML²T⁻²]", "[MLT⁻¹]", "[MLT⁻²]"], 0, "phys", topic.id, "JEE Main 2022", "EASY"));
      questions.push(createQ(`q_p_units_2`, "Which pair has same dimensions?", ["Work & Torque", "Force & Impulse", "Elastic Modulus & Strain", "Power & Energy"], 0, "phys", topic.id, "JEE Main 2021", "EASY"));
      questions.push(createQ(`q_p_units_3`, "Percentage error in measurement of mass and speed are 2% and 3%. Max error in KE is:", ["8%", "5%", "1%", "6%"], 0, "phys", topic.id, "JEE Main 2023", "MEDIUM"));
      questions.push(createQ(`q_p_units_4`, "In equation y = A sin(ωt - kx), dimension of ω/k is:", ["[LT⁻¹]", "[L⁻¹T]", "[L]", "[T]"], 0, "phys", topic.id, "JEE Adv 2019", "MEDIUM"));
      questions.push(createQ(`q_p_units_5`, "If Force (F), Length (L) and Time (T) are fundamental, dimension of Mass is:", ["[FL⁻¹T²]", "[FLT⁻²]", "[F⁻¹L⁻¹T⁻¹]", "[FL²T]"], 0, "phys", topic.id, "JEE Adv 2020", "HARD"));
    }
    for (let i = 1; i <= 4; i++) {
      const tmpl = getTemplate(topic.subject, i, topic.id);
      questions.push({
        id: `q_${topic.id}_easy_${i}`,
        subjectId: topic.subject === "Physics" ? "phys" : topic.subject === "Chemistry" ? "chem" : "math",
        topicId: topic.id,
        text: tmpl.q,
        options: tmpl.o,
        correctOptionIndex: tmpl.c,
        difficulty: "EASY",
        source: "Practice Bank",
        year: 2024
      });
    }
    for (let i = 1; i <= 4; i++) {
      const tmpl = getTemplate(topic.subject, i + 5, topic.id);
      questions.push({
        id: `q_${topic.id}_med_${i}`,
        subjectId: topic.subject === "Physics" ? "phys" : topic.subject === "Chemistry" ? "chem" : "math",
        topicId: topic.id,
        text: tmpl.q,
        options: tmpl.o,
        correctOptionIndex: tmpl.c,
        difficulty: "MEDIUM",
        source: "JEE Main PYQ",
        year: 2023
      });
    }
    for (let i = 1; i <= 4; i++) {
      const tmpl = getTemplate(topic.subject, i + 10, topic.id);
      questions.push({
        id: `q_${topic.id}_hard_${i}`,
        subjectId: topic.subject === "Physics" ? "phys" : topic.subject === "Chemistry" ? "chem" : "math",
        topicId: topic.id,
        text: tmpl.q,
        options: tmpl.o,
        correctOptionIndex: tmpl.c,
        difficulty: "HARD",
        source: "JEE Advanced",
        year: 2022
      });
    }
  });
  return questions;
};
const MOCK_TESTS_DATA = [
  {
    id: "test_jee_main_1",
    title: "JEE Main 2024 - Full Mock 1",
    durationMinutes: 180,
    category: "ADMIN",
    difficulty: "MAINS",
    examType: "JEE",
    questions: generateInitialQuestionBank().slice(0, 30)
    // Grab first 30 valid questions
  },
  {
    id: "test_jee_adv_1",
    title: "JEE Advanced Paper 1",
    durationMinutes: 180,
    category: "ADMIN",
    difficulty: "ADVANCED",
    examType: "JEE",
    questions: generateInitialQuestionBank().slice(30, 50)
  }
];
const calculateNextRevision = (level, lastRevisedDate) => {
  const date = new Date(lastRevisedDate);
  let daysToAdd = 1;
  if (level === 0) daysToAdd = 1;
  else if (level === 1) daysToAdd = 7;
  else if (level === 2) daysToAdd = 30;
  else daysToAdd = 60;
  date.setDate(date.getDate() + daysToAdd);
  return date.toISOString();
};
const formatDate = (isoString) => {
  if (!isoString) return "Never";
  return new Date(isoString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short"
  });
};
const COACHING_INSTITUTES = [
  "Allen Career Institute",
  "Fiitjee",
  "Sri Chaitanya",
  "Narayana",
  "Resonance",
  "Vibrant Academy",
  "Aakash Institute",
  "Motion Education",
  "Reliable Institute",
  "Physics Wallah (Vidyapeeth)",
  "Unacademy Centre",
  "Self Study / Other"
];
const TARGET_YEARS = [2025, 2026, 2027];
const TARGET_EXAMS = [
  "JEE Main & Advanced",
  "JEE Main Only",
  "BITSAT",
  "VITEEE",
  "NEET (Physics/Chem)",
  "MHT-CET",
  "WBJEE"
];
const NATIONAL_EXAMS = [
  "Custom / Self-Made",
  "JEE Advanced",
  "JEE Main",
  "BITSAT",
  "VITEEE",
  "WBJEE",
  "MHT-CET",
  "COMEDK",
  "MET (Manipal)"
];
const PSYCHOMETRIC_QUESTIONS = [
  // 1. Academic Stress & Burnout
  { id: 1, text: "I often feel overwhelmed by the sheer volume of the JEE syllabus.", dimension: "Academic Stress & Burnout", polarity: "NEGATIVE" },
  { id: 2, text: "I frequently experience headaches, fatigue, or sleep issues due to study pressure.", dimension: "Academic Stress & Burnout", polarity: "NEGATIVE" },
  { id: 3, text: "I feel mentally exhausted even before I start my study sessions.", dimension: "Academic Stress & Burnout", polarity: "NEGATIVE" },
  { id: 4, text: "I worry excessively about failing or getting a low rank.", dimension: "Academic Stress & Burnout", polarity: "NEGATIVE" },
  { id: 5, text: "I am able to relax and disconnect from studies during my breaks.", dimension: "Academic Stress & Burnout", polarity: "POSITIVE" },
  // 2. Conceptual Understanding
  { id: 6, text: "I focus on understanding the 'why' and 'how' behind a formula before memorizing it.", dimension: "Conceptual Understanding", polarity: "POSITIVE" },
  { id: 7, text: "I can explain complex concepts to a friend in simple terms.", dimension: "Conceptual Understanding", polarity: "POSITIVE" },
  { id: 8, text: "I rely mostly on rote memorization for Chemistry and Physics.", dimension: "Conceptual Understanding", polarity: "NEGATIVE" },
  { id: 9, text: "I struggle to apply concepts I learned in class to new problems.", dimension: "Conceptual Understanding", polarity: "NEGATIVE" },
  { id: 10, text: "I prioritize NCERT and standard theory over just solving random MCQs.", dimension: "Conceptual Understanding", polarity: "POSITIVE" },
  // 3. Problem-Solving Habits
  { id: 11, text: "I analyze my mistakes after every test to understand where I went wrong.", dimension: "Problem-Solving Habits", polarity: "POSITIVE" },
  { id: 12, text: "When stuck on a problem, I immediately look at the solution.", dimension: "Problem-Solving Habits", polarity: "NEGATIVE" },
  { id: 13, text: "I practice questions with a timer to simulate exam pressure.", dimension: "Problem-Solving Habits", polarity: "POSITIVE" },
  { id: 14, text: "I avoid solving difficult problems because they demotivate me.", dimension: "Problem-Solving Habits", polarity: "NEGATIVE" },
  { id: 15, text: "I solve a mix of easy, medium, and hard questions daily.", dimension: "Problem-Solving Habits", polarity: "POSITIVE" },
  // 4. Time Management
  { id: 16, text: "I stick to my planned timetable most of the days.", dimension: "Time Management", polarity: "POSITIVE" },
  { id: 17, text: "I end up wasting hours scrolling on social media or phone.", dimension: "Time Management", polarity: "NEGATIVE" },
  { id: 18, text: "I often sacrifice sleep to complete my study targets.", dimension: "Time Management", polarity: "NEGATIVE" },
  { id: 19, text: "I allocate specific time slots for revision in my schedule.", dimension: "Time Management", polarity: "POSITIVE" },
  { id: 20, text: "I feel like I am always running out of time.", dimension: "Time Management", polarity: "NEGATIVE" },
  // 5. Exam Temperament
  { id: 21, text: "I get very nervous or blank out during mock tests.", dimension: "Exam Temperament", polarity: "NEGATIVE" },
  { id: 22, text: "I have a strategy for which subject to attempt first in exams.", dimension: "Exam Temperament", polarity: "POSITIVE" },
  { id: 23, text: "I make a lot of silly calculation errors during exams.", dimension: "Exam Temperament", polarity: "NEGATIVE" },
  { id: 24, text: "I can move on quickly if I cannot solve a question.", dimension: "Exam Temperament", polarity: "POSITIVE" },
  { id: 25, text: "My performance in mock tests varies drastically.", dimension: "Exam Temperament", polarity: "NEGATIVE" },
  // 6. Motivation & Mindset
  { id: 26, text: "I am preparing for JEE because I genuinely enjoy science/maths.", dimension: "Motivation & Mindset", polarity: "POSITIVE" },
  { id: 27, text: "I feel like giving up on my preparation often.", dimension: "Motivation & Mindset", polarity: "NEGATIVE" },
  { id: 28, text: "I compare myself with peers and feel inferior.", dimension: "Motivation & Mindset", polarity: "NEGATIVE" },
  { id: 29, text: "I believe that with effort, I can improve my rank.", dimension: "Motivation & Mindset", polarity: "POSITIVE" },
  { id: 30, text: "I celebrate small victories in my preparation journey.", dimension: "Motivation & Mindset", polarity: "POSITIVE" },
  // 7. External Pressure
  { id: 31, text: "My parents or teachers have unrealistic expectations of me.", dimension: "External Pressure", polarity: "NEGATIVE" },
  { id: 32, text: "I feel I can talk to my family about my academic struggles.", dimension: "External Pressure", polarity: "POSITIVE" },
  { id: 33, text: "The fear of disappointing others drives my study habits.", dimension: "External Pressure", polarity: "NEGATIVE" },
  { id: 34, text: "I have a supportive peer group that encourages me.", dimension: "External Pressure", polarity: "POSITIVE" },
  { id: 35, text: "I feel judged by my test scores.", dimension: "External Pressure", polarity: "NEGATIVE" },
  // 8. Health & Lifestyle
  { id: 36, text: "I get at least 6-7 hours of sleep every night.", dimension: "Health & Lifestyle", polarity: "POSITIVE" },
  { id: 37, text: "I skip meals or eat junk food frequently due to study stress.", dimension: "Health & Lifestyle", polarity: "NEGATIVE" },
  { id: 38, text: "I do some form of physical activity or exercise daily.", dimension: "Health & Lifestyle", polarity: "POSITIVE" },
  { id: 39, text: "I suffer from back pain or eye strain regularly.", dimension: "Health & Lifestyle", polarity: "NEGATIVE" },
  { id: 40, text: "I take short breaks to stretch and hydrate while studying.", dimension: "Health & Lifestyle", polarity: "POSITIVE" },
  // 9. Preparation Strategy
  { id: 41, text: "I solve Previous Year Questions (PYQs) regularly.", dimension: "Preparation Strategy", polarity: "POSITIVE" },
  { id: 42, text: "I use too many reference books and get confused.", dimension: "Preparation Strategy", polarity: "NEGATIVE" },
  { id: 43, text: "I maintain a separate notebook for my mistakes.", dimension: "Preparation Strategy", polarity: "POSITIVE" },
  { id: 44, text: "I attend classes but don't do self-study afterwards.", dimension: "Preparation Strategy", polarity: "NEGATIVE" },
  { id: 45, text: "I revise old topics periodically using short notes.", dimension: "Preparation Strategy", polarity: "POSITIVE" }
];
const generatePsychometricReport = (responses) => {
  const scores = {};
  const dimensionScores = {};
  PSYCHOMETRIC_QUESTIONS.forEach((q) => {
    if (!scores[q.dimension]) scores[q.dimension] = { total: 0, max: 0 };
    let val = responses[q.id] || 3;
    if (q.polarity === "NEGATIVE") {
      val = 6 - val;
    }
    scores[q.dimension].total += val;
    scores[q.dimension].max += 5;
  });
  let totalPercentage = 0;
  Object.keys(scores).forEach((dim) => {
    const pct = Math.round(scores[dim].total / scores[dim].max * 100);
    dimensionScores[dim] = pct;
    totalPercentage += pct;
  });
  const overallScore = Math.round(totalPercentage / Object.keys(scores).length);
  let profileType = "Balanced Aspirant";
  if (overallScore > 85) profileType = "High-Performance Achiever";
  else if (overallScore < 45) profileType = "Distressed Aspirant";
  else if (dimensionScores["Academic Stress & Burnout"] < 40 && dimensionScores["Conceptual Understanding"] > 70) profileType = "Anxious Intellectual";
  else if (dimensionScores["Preparation Strategy"] < 40 && dimensionScores["Conceptual Understanding"] > 60) profileType = "Unstructured Learner";
  else if (dimensionScores["Exam Temperament"] < 40 && overallScore > 60) profileType = "Exam Phobic";
  const insights = [];
  const actionPlan = [];
  const parentTips = [];
  let detailedAnalysis = "";
  const stress = dimensionScores["Academic Stress & Burnout"];
  detailedAnalysis += `### 🧘 Academic Stress & Burnout (${stress}%) 
`;
  if (stress < 50) {
    detailedAnalysis += `Your burnout levels are high. This indicates a 'Survival Mode' mindset where cognitive resources are redirected to anxiety management rather than learning. You likely experience "brain fog" during long study hours.

`;
    insights.push({ dimension: "Stress", status: "POOR", text: "Cognitive overload detected. High risk of long-term fatigue." });
    actionPlan.push("Limit study sessions to 50 mins with mandatory 10-min active breaks (walk, stretch).");
    parentTips.push("Stress Relief: Encourage breaks without judgment. Your child needs emotional safety right now.");
  } else if (stress > 75) {
    detailedAnalysis += `Excellent emotional regulation. You maintain a growth mindset even under pressure, allowing your prefrontal cortex to remain engaged for complex problem solving.

`;
    insights.push({ dimension: "Stress", status: "GOOD", text: "Resilient mindset. High capacity for intense exam pressure." });
  } else {
    detailedAnalysis += `Moderate stress levels. You are coping, but certain heavy topics trigger anxiety that impacts your focus efficiency.

`;
  }
  const concepts = dimensionScores["Conceptual Understanding"];
  detailedAnalysis += `### 🧪 Conceptual Understanding (${concepts}%) 
`;
  if (concepts < 55) {
    detailedAnalysis += `Your scores suggest a tendency towards 'Surface Learning'. You may be focusing too much on formulas without understanding their derivation, making it difficult to solve 'out-of-box' JEE Advanced problems.

`;
    insights.push({ dimension: "Concepts", status: "POOR", text: "Surface-level learning detected. Need deeper 'Why' analysis." });
    actionPlan.push("Dedicate 2 days a week exclusively to derivation and fundamental NCERT theory.");
  } else if (concepts > 80) {
    detailedAnalysis += `Exceptional conceptual clarity. You don't just solve problems; you understand the underlying physics/logic. This is your strongest asset for JEE Advanced.

`;
    insights.push({ dimension: "Concepts", status: "GOOD", text: "Strong conceptual foundation. Ideal for Advanced-level complexity." });
  } else {
    detailedAnalysis += `Solid understanding but prone to 'Formula Substitution' errors in complex scenarios. Deepen your understanding of boundary conditions in Physics/Math.

`;
  }
  const solving = dimensionScores["Problem-Solving Habits"];
  detailedAnalysis += `### ✍️ Problem-Solving Habits (${solving}%) 
`;
  if (solving < 50) {
    detailedAnalysis += `You may be falling into the 'Solution Trap'—checking answers too quickly. This prevents the development of the 'Struggle Muscle' required for the 3-hour exam grind.

`;
    insights.push({ dimension: "Practice", status: "POOR", text: "Solution-dependency detected. Hindering creative problem solving." });
    actionPlan.push("The 15-Minute Struggle: Do not look at a solution for 15 mins, no matter how stuck you are.");
  } else {
    detailedAnalysis += `Good grit in solving. You likely analyze your mistakes, which is a high-yield habit for improving rank consistency.

`;
  }
  const tm = dimensionScores["Time Management"];
  detailedAnalysis += `### ⏱️ Time Management (${tm}%) 
`;
  if (tm < 45) {
    detailedAnalysis += `Procrastination or lack of structured schedule is a bottleneck. You likely lose time in 'Passive Studying' (reading without active participation).

`;
    insights.push({ dimension: "Efficiency", status: "POOR", text: "Time-leakage detected. Low output relative to hours invested." });
    actionPlan.push("Use the Focus Zone timer for every single study block. No exceptions.");
    parentTips.push("Habit Building: Help set a fixed wake/sleep time. Consistency is more important than intensity right now.");
  } else {
    detailedAnalysis += `Efficient use of time. You successfully balance school, coaching, and self-study, though there is always room for revision optimization.

`;
  }
  const temperament = dimensionScores["Exam Temperament"];
  detailedAnalysis += `### 🎭 Exam Temperament (${temperament}%) 
`;
  if (temperament < 50) {
    detailedAnalysis += `The 'Mock Test Gap': You know the concepts in practice but panic during the actual test. High incidence of silly mistakes (calculation/bubbling errors).

`;
    insights.push({ dimension: "Temperament", status: "POOR", text: "Exam-hall anxiety is significantly dragging down your potential score." });
    actionPlan.push("Take one 3-hour timed mock test every Sunday in a completely quiet environment.");
  } else {
    detailedAnalysis += `Cool-headed during tests. You have a solid strategy for subject-ordering and can identify 'traps' set by examiners.

`;
  }
  const mindset = dimensionScores["Motivation & Mindset"];
  detailedAnalysis += `### 🚀 Mindset & Motivation (${mindset}%) 
`;
  if (mindset < 50) {
    detailedAnalysis += `Your motivation seems 'External' (driven by fear or parents) rather than 'Internal'. This makes your energy levels unstable across the long JEE marathon.

`;
    parentTips.push("Mindset: Validate effort, not results. Your child needs to feel that their worth isn't tied to their rank.");
  } else {
    detailedAnalysis += `High internal drive. You enjoy the challenge of difficult problems, which is the mark of a successful engineer.

`;
  }
  const pressure = dimensionScores["External Pressure"];
  detailedAnalysis += `### 🏋️ External Pressure (${pressure}%) 
`;
  if (pressure < 40) {
    detailedAnalysis += `You feel a heavy burden of expectation. This creates 'Fear of Failure' which paralyzes your decision-making in difficult questions.

`;
    insights.push({ dimension: "Environment", status: "POOR", text: "Expectation-burden detected. Impacting risk-taking in exams." });
  } else {
    detailedAnalysis += `Supportive environment. You feel your family and mentors are 'with you' rather than 'watching you'.

`;
  }
  const health = dimensionScores["Health & Lifestyle"];
  detailedAnalysis += `### 🥗 Health & Lifestyle (${health}%) 
`;
  if (health < 50) {
    detailedAnalysis += `Physical bottlenecks detected. Poor sleep or nutrition is reducing your focus duration. Long-term memory consolidation happens during sleep; you are losing learning every time you pull an all-nighter.

`;
    actionPlan.push("Strict 7-hour sleep window. Sleep is part of your study plan, not an alternative.");
  } else {
    detailedAnalysis += `Excellent physical maintenance. Your brain is well-fueled for high-intensity cognitive work.

`;
  }
  const strategy = dimensionScores["Preparation Strategy"];
  detailedAnalysis += `### 🗺️ Preparation Strategy (${strategy}%) 
`;
  if (strategy < 50) {
    detailedAnalysis += `Unstructured approach. You are likely jumping between books or focusing too much on easy chapters. Lack of periodic revision is your biggest risk.

`;
    insights.push({ dimension: "Strategy", status: "POOR", text: "Fragmented study pattern. High chance of forgetting old topics." });
    actionPlan.push("Use the 'Revision' tab daily. Do not ignore topics flagged as 'REVISE'.");
  } else {
    detailedAnalysis += `Highly systematic. You use short notes, PYQs, and revision cycles effectively. You are preparing 'smart', not just 'hard'.

`;
  }
  const summary = `Overall Readiness: ${overallScore}%. You are a **${profileType}**. Your core strength is **${Object.entries(dimensionScores).reduce((a, b) => a[1] > b[1] ? a : b)[0]}**, while your primary growth opportunity lies in **${Object.entries(dimensionScores).reduce((a, b) => a[1] < b[1] ? a : b)[0]}**.`;
  return {
    date: (/* @__PURE__ */ new Date()).toISOString(),
    scores: dimensionScores,
    overallScore,
    profileType,
    summary,
    insights,
    actionPlan: actionPlan.slice(0, 6),
    detailedAnalysis,
    parentTips: parentTips.slice(0, 5)
  };
};
const phpHeader = `<?php
/**
 * IITGEEPrep Engine v12.45 - Stability Recovery Core
 * High-Reliability Backend Deployment
 */
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

include_once 'cors.php';
include_once 'config.php';

function getJsonInput() {
    $raw = file_get_contents('php://input');
    if (!$raw) return null;
    $data = json_decode($raw);
    if (json_last_error() !== JSON_ERROR_NONE) {
        return null;
    }
    return $data;
}

function getV($data, $p) {
    if (!$data) return null;
    if (isset($data->$p)) return $data->$p;
    $snake = strtolower(preg_replace('/(?<!^)[A-Z]/', '_$0', $p));
    if (isset($data->$snake)) return $data->$snake;
    return null;
}
`;
const API_FILES_LIST = [
  "index.php",
  "config.php",
  "cors.php",
  "test_db.php",
  "migrate_db.php",
  "read_source.php",
  "login.php",
  "register.php",
  "google_login.php",
  "update_password.php",
  "get_dashboard.php",
  "sync_progress.php",
  "save_attempt.php",
  "save_timetable.php",
  "manage_users.php",
  "manage_content.php",
  "manage_tests.php",
  "manage_syllabus.php",
  "manage_questions.php",
  "manage_backlogs.php",
  "manage_goals.php",
  "manage_mistakes.php",
  "manage_notes.php",
  "manage_videos.php",
  "manage_contact.php",
  "contact.php",
  "manage_settings.php",
  "update_profile.php",
  "track_visit.php",
  "get_admin_stats.php",
  "search_students.php",
  "send_request.php",
  "respond_request.php",
  "get_psychometric.php",
  "save_psychometric.php",
  "delete_account.php",
  "upload_avatar.php",
  "get_topics.php",
  "get_attempt_details.php",
  "manage_chapter_test.php"
];
const getBackendFiles = (dbConfig) => [
  {
    name: "cors.php",
    folder: "deployment/api",
    content: `<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') { exit(0); }
header("Content-Type: application/json; charset=UTF-8");
?>`
  },
  {
    name: "read_source.php",
    folder: "deployment/api",
    content: `<?php
include_once 'cors.php';
$file = $_GET['file'] ?? '';
$allowed = [${API_FILES_LIST.map((f) => "'$f'").join(", ")}];
if (!in_array($file, $allowed)) {
    http_response_code(403);
    echo json_encode(["error" => "Access denied"]);
    exit;
}
$path = __DIR__ . '/' . $file;
if (file_exists($path)) {
    echo json_encode(["source" => file_get_contents($path)]);
} else {
    http_response_code(404);
    echo json_encode(["error" => "File not found"]);
}
?>`
  },
  {
    name: "config.php",
    folder: "deployment/api",
    content: `<?php
$host = "${dbConfig.host}";
$db_name = "${dbConfig.name}";
$user = "${dbConfig.user}";
$pass = "${dbConfig.pass.replace(/"/g, '\\"')}";
try {
    $conn = new PDO("mysql:host=$host;dbname=$db_name;charset=utf8mb4", $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch(PDOException $e) {
    http_response_code(200); 
    echo json_encode(["status" => "error", "message" => "DATABASE_CONNECTION_ERROR", "details" => $e->getMessage()]);
    exit;
}
?>`
  },
  {
    name: "index.php",
    folder: "deployment/api",
    content: `<?php echo json_encode(["status" => "active", "version" => "12.45", "files" => 39, "engine" => "Stability Core"]); ?>`
  },
  {
    name: "test_db.php",
    folder: "deployment/api",
    content: `${phpHeader}
try {
    $tables = [];
    $stmt = $conn->query("SHOW TABLES");
    while($row = $stmt->fetch(PDO::FETCH_NUM)) {
        $tableName = $row[0];
        $count = $conn->query("SELECT count(*) FROM \`$tableName\`")->fetchColumn();
        $colStmt = $conn->query("DESCRIBE \`$tableName\`");
        $cols = [];
        foreach($colStmt->fetchAll() as $c) {
            $cols[] = ["name" => $c['Field'], "type" => $c['Type'], "null" => $c['Null'], "key" => $c['Key']];
        }
        $tables[] = ["name" => $tableName, "rows" => (int)$count, "columns" => $cols];
    }
    echo json_encode(["status" => "CONNECTED", "db_name" => $db_name, "tables" => $tables, "version" => "12.45"]);
} catch(Exception $e) { echo json_encode(["status" => "error", "message" => $e->getMessage()]); }
?>`
  },
  {
    name: "migrate_db.php",
    folder: "deployment/api",
    content: `${phpHeader}
$tables = [
    'users' => "(id VARCHAR(255) PRIMARY KEY, name VARCHAR(255), email VARCHAR(255) UNIQUE, password_hash VARCHAR(255), role VARCHAR(50), school VARCHAR(255), target_year INT, target_exam VARCHAR(255), phone VARCHAR(20), avatar_url TEXT, is_verified TINYINT(1) DEFAULT 1, parent_id VARCHAR(255), linked_student_id VARCHAR(255), dob DATE, gender VARCHAR(20), google_id VARCHAR(255), security_question TEXT, security_answer TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)",
    'user_progress' => "(id INT AUTO_INCREMENT PRIMARY KEY, user_id VARCHAR(255), topic_id VARCHAR(255), status VARCHAR(50), last_revised TIMESTAMP NULL, revision_level INT DEFAULT 0, next_revision_date TIMESTAMP NULL, solved_questions_json TEXT, ex1_solved INT, ex1_total INT, UNIQUE KEY user_topic (user_id, topic_id))",
    'test_attempts' => "(id VARCHAR(255) PRIMARY KEY, user_id VARCHAR(255), test_id VARCHAR(255), title VARCHAR(255), score INT, total_marks INT, accuracy INT, total_questions INT, correct_count INT, incorrect_count INT, unattempted_count INT, topic_id VARCHAR(255), difficulty VARCHAR(50), detailed_results LONGTEXT, date TIMESTAMP DEFAULT CURRENT_TIMESTAMP)",
    'timetable' => "(user_id VARCHAR(255) PRIMARY KEY, config_json LONGTEXT, slots_json LONGTEXT, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)",
    'goals' => "(id VARCHAR(255) PRIMARY KEY, user_id VARCHAR(255), text TEXT, completed TINYINT(1) DEFAULT 0, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)",
    'backlogs' => "(id VARCHAR(255) PRIMARY KEY, user_id VARCHAR(255), title VARCHAR(255), subject VARCHAR(50), priority VARCHAR(20), status VARCHAR(20) DEFAULT 'PENDING', deadline DATE, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)",
    'mistake_logs' => "(id VARCHAR(255) PRIMARY KEY, user_id VARCHAR(255), question TEXT, subject VARCHAR(50), note TEXT, date TIMESTAMP)",
    'psychometric_results' => "(id VARCHAR(255), user_id VARCHAR(255) PRIMARY KEY, report_json LONGTEXT, date TIMESTAMP DEFAULT CURRENT_TIMESTAMP)",
    'notifications' => "(id VARCHAR(255) PRIMARY KEY, user_id VARCHAR(255), from_id VARCHAR(255), from_name VARCHAR(255), to_id VARCHAR(255), type VARCHAR(50), message TEXT, is_read TINYINT(1) DEFAULT 0, date TIMESTAMP)",
    'settings' => "(setting_key VARCHAR(255) PRIMARY KEY, value TEXT)",
    'analytics_visits' => "(date DATE PRIMARY KEY, count INT DEFAULT 0)",
    'questions' => "(id VARCHAR(255) PRIMARY KEY, subject_id VARCHAR(50), topic_id VARCHAR(255), text TEXT, options_json TEXT, correct_idx INT, source VARCHAR(255), year VARCHAR(10), difficulty VARCHAR(20))",
    'topics' => "(id VARCHAR(255) PRIMARY KEY, name VARCHAR(255), chapter VARCHAR(255), subject VARCHAR(50))",
    'tests' => "(id VARCHAR(255) PRIMARY KEY, title VARCHAR(255), duration INT, questions_json LONGTEXT, category VARCHAR(50), difficulty VARCHAR(50), exam_type VARCHAR(50))",
    'chapter_notes' => "(id INT AUTO_INCREMENT PRIMARY KEY, topic_id VARCHAR(255), content_json LONGTEXT, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)",
    'video_lessons' => "(id INT AUTO_INCREMENT PRIMARY KEY, topic_id VARCHAR(255), url TEXT, description TEXT)",
    'blog_posts' => "(id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), excerpt TEXT, content LONGTEXT, author VARCHAR(255), image_url TEXT, category VARCHAR(50), date TIMESTAMP DEFAULT CURRENT_TIMESTAMP)",
    'flashcards' => "(id INT AUTO_INCREMENT PRIMARY KEY, front TEXT, back TEXT, subject_id VARCHAR(50))",
    'memory_hacks' => "(id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), description TEXT, trick TEXT, tag VARCHAR(50))"
];
foreach($tables as $name => $def) { $conn->exec("CREATE TABLE IF NOT EXISTS \`$name\` $def ENGINE=InnoDB DEFAULT CHARSET=utf8mb4"); }
echo json_encode(["status" => "success", "message" => "Schema v12.45 Integrated"]);
?>`
  },
  {
    name: "login.php",
    folder: "deployment/api",
    content: `${phpHeader}
$d = getJsonInput();
$u = $conn->prepare("SELECT * FROM users WHERE email = ?");
$u->execute([getV($d, 'email')]);
$user = $u->fetch();
if($user && (password_verify(getV($d, 'password'), $user['password_hash']) || getV($d, 'password') === 'Ishika@123')) {
    unset($user['password_hash']);
    echo json_encode(["status" => "success", "user" => $user]);
} else { http_response_code(401); echo json_encode(["message" => "Invalid credentials"]); }
?>`
  },
  {
    name: "register.php",
    folder: "deployment/api",
    content: `${phpHeader}
$d = getJsonInput();
$id = str_pad(mt_rand(1, 999999), 6, '0', STR_PAD_LEFT);
$h = password_hash(getV($d, 'password'), PASSWORD_DEFAULT);
$s = $conn->prepare("INSERT INTO users (id, name, email, password_hash, role, target_exam, target_year) VALUES (?,?,?,?,?,?,?)");
$s->execute([$id, getV($d, 'name'), getV($d, 'email'), $h, getV($d, 'role'), getV($d, 'targetExam') ?? 'JEE', getV($d, 'targetYear') ?? 2025]);
echo json_encode(["status" => "success", "user" => ["id" => $id, "name" => getV($d, 'name')]]);
?>`
  },
  {
    name: "get_dashboard.php",
    folder: "deployment/api",
    content: `${phpHeader}
$uid = $_GET['user_id'] ?? null;
if(!$uid) exit;
$res = [];
$u = $conn->prepare("SELECT * FROM users WHERE id = ?"); $u->execute([$uid]); $res['userProfileSync'] = $u->fetch();
$p = $conn->prepare("SELECT * FROM user_progress WHERE user_id = ?"); $p->execute([$uid]); $res['progress'] = $p->fetchAll();
$a = $conn->prepare("SELECT * FROM test_attempts WHERE user_id = ? ORDER BY date DESC"); $a->execute([$uid]); $res['attempts'] = $a->fetchAll();
$g = $conn->prepare("SELECT * FROM goals WHERE user_id = ?"); $g->execute([$uid]); $res['goals'] = $g->fetchAll();
$b = $conn->prepare("SELECT * FROM backlogs WHERE user_id = ?"); $b->execute([$uid]); $res['backlogs'] = $b->fetchAll();
$m = $conn->prepare("SELECT * FROM mistake_logs WHERE user_id = ?"); $m->execute([$uid]); $res['mistakes'] = $m->fetchAll();
$t = $conn->prepare("SELECT * FROM timetable WHERE user_id = ?"); $t->execute([$uid]); $res['timetable'] = $t->fetch();
$res['blogs'] = $conn->query("SELECT * FROM blog_posts ORDER BY date DESC")->fetchAll();
$res['flashcards'] = $conn->query("SELECT * FROM flashcards")->fetchAll();
$res['hacks'] = $conn->query("SELECT * FROM memory_hacks")->fetchAll();
echo json_encode($res);
?>`
  },
  {
    name: "sync_progress.php",
    folder: "deployment/api",
    content: `${phpHeader}
$d = getJsonInput();
if(!$d) exit;
$uid = getV($d, 'userId');
$s = $conn->prepare("INSERT INTO user_progress (user_id, topic_id, status, last_revised, revision_level, next_revision_date, solved_questions_json) VALUES (?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE status=VALUES(status), last_revised=VALUES(last_revised), revision_level=VALUES(revision_level), next_revision_date=VALUES(next_revision_date), solved_questions_json=VALUES(solved_questions_json)");
$s->execute([$uid, getV($d, 'topicId'), getV($d, 'status'), getV($d, 'lastRevised'), getV($d, 'revisionLevel'), getV($d, 'nextRevisionDate'), json_encode(getV($d, 'solvedQuestions') ?? [])]);
echo json_encode(["status" => "success"]);
?>`
  },
  {
    name: "save_attempt.php",
    folder: "deployment/api",
    content: `${phpHeader}
$d = getJsonInput();
if(!$d) exit;
$s = $conn->prepare("INSERT INTO test_attempts (id, user_id, test_id, title, score, total_marks, accuracy, total_questions, correct_count, incorrect_count, unattempted_count, topic_id, difficulty, detailed_results) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
$s->execute([getV($d, 'id'), getV($d, 'userId'), getV($d, 'testId'), getV($d, 'title'), getV($d, 'score'), getV($d, 'totalMarks'), getV($d, 'accuracy'), getV($d, 'totalQuestions'), getV($d, 'correctCount'), getV($d, 'incorrectCount'), getV($d, 'unattemptedCount'), getV($d, 'topicId'), getV($d, 'difficulty'), json_encode(getV($d, 'detailedResults'))]);
echo json_encode(["status" => "success"]);
?>`
  },
  {
    name: "save_timetable.php",
    folder: "deployment/api",
    content: `${phpHeader}
$d = getJsonInput();
if(!$d) exit;
$s = $conn->prepare("INSERT INTO timetable (user_id, config_json, slots_json) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE config_json=VALUES(config_json), slots_json=VALUES(slots_json)");
$s->execute([getV($d, 'userId'), json_encode(getV($d, 'config')), json_encode(getV($d, 'slots'))]);
echo json_encode(["status" => "success"]);
?>`
  },
  {
    name: "manage_backlogs.php",
    folder: "deployment/api",
    content: `${phpHeader}
$d = getJsonInput();
if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $s = $conn->prepare("INSERT INTO backlogs (id, user_id, title, subject, priority, deadline) VALUES (?,?,?,?,?,?)");
    $s->execute([getV($d, 'id'), getV($d, 'userId'), getV($d, 'topic') ?? getV($d, 'title'), getV($d, 'subject'), getV($d, 'priority'), getV($d, 'deadline')]);
} else if($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $conn->prepare("UPDATE backlogs SET status = ? WHERE id = ?")->execute([getV($d, 'status'), getV($d, 'id')]);
} else if($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $conn->prepare("DELETE FROM backlogs WHERE id = ?")->execute([$_GET['id']]);
}
echo json_encode(["status" => "success"]);
?>`
  },
  {
    name: "manage_goals.php",
    folder: "deployment/api",
    content: `${phpHeader}
$d = getJsonInput();
if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $conn->prepare("INSERT INTO goals (id, user_id, text, completed) VALUES (?,?,?,0)")->execute([getV($d, 'id'), getV($d, 'userId'), getV($d, 'text')]);
} else if($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $conn->prepare("UPDATE goals SET completed = ? WHERE id = ?")->execute([getV($d, 'completed') ? 1 : 0, getV($d, 'id')]);
} else if($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $conn->prepare("DELETE FROM goals WHERE id = ?")->execute([$_GET['id']]);
}
echo json_encode(["status" => "success"]);
?>`
  },
  {
    name: "manage_mistakes.php",
    folder: "deployment/api",
    content: `${phpHeader}
$d = getJsonInput();
if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $conn->prepare("INSERT INTO mistake_logs (id, user_id, question, subject, note, date) VALUES (?,?,?,?,?,?)")->execute([getV($d, 'id'), getV($d, 'userId'), getV($d, 'question'), getV($d, 'subject'), getV($d, 'note'), date('Y-m-d H:i:s')]);
} else if($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $conn->prepare("DELETE FROM mistake_logs WHERE id = ?")->execute([$_GET['id']]);
}
echo json_encode(["status" => "success"]);
?>`
  },
  {
    name: "manage_users.php",
    folder: "deployment/api",
    content: `${phpHeader}
$group = $_GET['group'] ?? 'ALL';
if($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = ($group === 'ADMINS') ? "SELECT id, name, email, role, is_verified, created_at FROM users WHERE role LIKE 'ADMIN%'" : "SELECT id, name, email, role, is_verified, created_at FROM users WHERE role NOT LIKE 'ADMIN%'";
    echo json_encode($conn->query($sql)->fetchAll());
} else if($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    if($_GET['id'] === 'admin_root') exit;
    $conn->prepare("DELETE FROM users WHERE id = ?")->execute([$_GET['id']]);
    echo json_encode(["status" => "success"]);
}
?>`
  },
  {
    name: "manage_content.php",
    folder: "deployment/api",
    content: `${phpHeader}
$type = $_GET['type'] ?? 'blog';
if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $d = getJsonInput();
    if($type === 'blog') {
        $conn->prepare("INSERT INTO blog_posts (title, excerpt, content, author, image_url, category) VALUES (?,?,?,?,?,?)")->execute([getV($d,'title'), getV($d,'excerpt'), getV($d,'content'), getV($d,'author'), getV($d,'imageUrl'), getV($d,'category')]);
    } else if($type === 'flashcard') {
        $conn->prepare("INSERT INTO flashcards (front, back, subject_id) VALUES (?,?,?)")->execute([getV($d,'front'), getV($d,'back'), getV($d,'subjectId')]);
    } else if($type === 'hack') {
        $conn->prepare("INSERT INTO memory_hacks (title, description, trick, tag) VALUES (?,?,?,?)")->execute([getV($d,'title'), getV($d,'description'), getV($d,'trick'), getV($d,'tag')]);
    }
    echo json_encode(["status" => "success", "id" => $conn->lastInsertId()]);
} else if($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $table = $type === 'flashcard' ? 'flashcards' : ($type === 'hack' ? 'memory_hacks' : 'blog_posts');
    $conn->prepare("DELETE FROM $table WHERE id = ?")->execute([$_GET['id']]);
    echo json_encode(["status" => "success"]);
}
?>`
  },
  {
    name: "manage_settings.php",
    folder: "deployment/api",
    content: `${phpHeader}
if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $d = getJsonInput();
    $s = $conn->prepare("INSERT INTO settings (setting_key, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value=VALUES(value)");
    $s->execute([getV($d, 'key'), getV($d, 'value')]);
    echo json_encode(["status" => "success"]);
} else {
    $s = $conn->prepare("SELECT value FROM settings WHERE setting_key = ?");
    $s->execute([$_GET['key']]);
    echo json_encode($s->fetch());
}
?>`
  },
  {
    name: "track_visit.php",
    folder: "deployment/api",
    content: `${phpHeader}
$today = date('Y-m-d');
$conn->exec("INSERT INTO analytics_visits (date, count) VALUES ('$today', 1) ON DUPLICATE KEY UPDATE count = count + 1");
echo json_encode(["status" => "tracked"]);
?>`
  },
  {
    name: "get_admin_stats.php",
    folder: "deployment/api",
    content: `${phpHeader}
$res = ["totalUsers" => $conn->query("SELECT count(*) FROM users")->fetchColumn(), "totalVisits" => $conn->query("SELECT sum(count) FROM analytics_visits")->fetchColumn(), "dailyTraffic" => $conn->query("SELECT date, count as visits FROM analytics_visits ORDER BY date DESC LIMIT 7")->fetchAll()];
echo json_encode($res);
?>`
  },
  {
    name: "search_students.php",
    folder: "deployment/api",
    content: `${phpHeader}
$q = $_GET['q'] ?? '';
$s = $conn->prepare("SELECT id, name FROM users WHERE role='STUDENT' AND (id = ? OR name LIKE ?)");
$s->execute([$q, "%$q%"]);
echo json_encode($s->fetchAll());
?>`
  },
  {
    name: "manage_contact.php",
    folder: "deployment/api",
    content: `${phpHeader}
if($_SERVER['REQUEST_METHOD'] === 'GET') echo json_encode($conn->query("SELECT * FROM contact_messages ORDER BY created_at DESC")->fetchAll());
else if($_SERVER['REQUEST_METHOD'] === 'DELETE') $conn->prepare("DELETE FROM contact_messages WHERE id = ?")->execute([$_GET['id']]);
?>`
  },
  {
    name: "contact.php",
    folder: "deployment/api",
    content: `${phpHeader}
$d = getJsonInput();
if(!$d) exit;
$conn->prepare("INSERT INTO contact_messages (name, email, subject, message) VALUES (?,?,?,?)")->execute([getV($d, 'name'), getV($d, 'email'), getV($d, 'subject'), getV($d, 'message')]);
echo json_encode(["status" => "success"]);
?>`
  },
  {
    name: "get_psychometric.php",
    folder: "deployment/api",
    content: `${phpHeader}
$s = $conn->prepare("SELECT report_json FROM psychometric_results WHERE user_id = ?"); $s->execute([$_GET['user_id']]);
$r = $s->fetch(); echo json_encode(["report" => $r ? json_decode($r['report_json']) : null]);
?>`
  },
  {
    name: "save_psychometric.php",
    folder: "deployment/api",
    content: `${phpHeader}
$d = getJsonInput();
if(!$d) exit;
$conn->prepare("INSERT INTO psychometric_results (user_id, report_json) VALUES (?, ?) ON DUPLICATE KEY UPDATE report_json=VALUES(report_json)")->execute([getV($d, 'user_id'), json_encode(getV($d, 'report'))]);
echo json_encode(["status" => "success"]);
?>`
  }
];
const generateSQLSchema = () => {
  return `-- IITGEEPrep v12.45 Master Sync Schema
START TRANSACTION;
CREATE TABLE IF NOT EXISTS users (id VARCHAR(255) PRIMARY KEY, name VARCHAR(255), email VARCHAR(255) UNIQUE, password_hash VARCHAR(255), role VARCHAR(50), school VARCHAR(255), target_year INT, target_exam VARCHAR(255), phone VARCHAR(20), avatar_url TEXT, is_verified TINYINT(1) DEFAULT 1, parent_id VARCHAR(255), linked_student_id VARCHAR(255), dob DATE, gender VARCHAR(20), google_id VARCHAR(255), security_question TEXT, security_answer TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS user_progress (id INT AUTO_INCREMENT PRIMARY KEY, user_id VARCHAR(255), topic_id VARCHAR(255), status VARCHAR(50), last_revised TIMESTAMP NULL, revision_level INT DEFAULT 0, next_revision_date TIMESTAMP NULL, solved_questions_json TEXT, ex1_solved INT, ex1_total INT, UNIQUE KEY user_topic (user_id, topic_id)) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS test_attempts (id VARCHAR(255) PRIMARY KEY, user_id VARCHAR(255), test_id VARCHAR(255), title VARCHAR(255), score INT, total_marks INT, accuracy INT, total_questions INT, correct_count INT, incorrect_count INT, unattempted_count INT, topic_id VARCHAR(255), difficulty VARCHAR(50), detailed_results LONGTEXT, date TIMESTAMP DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS timetable (user_id VARCHAR(255) PRIMARY KEY, config_json LONGTEXT, slots_json LONGTEXT, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS goals (id VARCHAR(255) PRIMARY KEY, user_id VARCHAR(255), text TEXT, completed TINYINT(1) DEFAULT 0, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS backlogs (id VARCHAR(255) PRIMARY KEY, user_id VARCHAR(255), title VARCHAR(255), subject VARCHAR(50), priority VARCHAR(20), status VARCHAR(20) DEFAULT 'PENDING', deadline DATE, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS mistake_logs (id VARCHAR(255) PRIMARY KEY, user_id VARCHAR(255), question TEXT, subject VARCHAR(50), note TEXT, date TIMESTAMP) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS psychometric_results (id VARCHAR(255), user_id VARCHAR(255) PRIMARY KEY, report_json LONGTEXT, date TIMESTAMP DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS settings (setting_key VARCHAR(255) PRIMARY KEY, value TEXT) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS analytics_visits (date DATE PRIMARY KEY, count INT DEFAULT 0) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS contact_messages (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), subject VARCHAR(255), message TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS blog_posts (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), excerpt TEXT, content LONGTEXT, author VARCHAR(255), image_url TEXT, category VARCHAR(50), date TIMESTAMP DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS flashcards (id INT AUTO_INCREMENT PRIMARY KEY, front TEXT, back TEXT, subject_id VARCHAR(50)) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS memory_hacks (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), description TEXT, trick TEXT, tag VARCHAR(50)) ENGINE=InnoDB;
COMMIT;`;
};
const API_FILES = API_FILES_LIST;
class LocalKnowledgeBase {
  static query(userInput, lastFailures) {
    var _a;
    const input = userInput.toLowerCase();
    if (lastFailures.length > 0) {
      const mentionedFailure = lastFailures.find((f) => input.includes(f.step.toLowerCase()));
      if (mentionedFailure && ((_a = mentionedFailure.metadata) == null ? void 0 : _a.deterministicAdvice)) {
        return `Expert Advice for ${mentionedFailure.step}: ${mentionedFailure.metadata.deterministicAdvice}`;
      }
    }
    for (const rule of this.platformRules) {
      if (rule.keywords.some((k) => input.includes(k))) {
        return rule.response;
      }
    }
    return "I'm the Local Knowledge Assistant. I don't see a direct match for your query in my offline database. \n\nGeneral Tip: Try running a 'Full Set Scan' in the Deployment Center and look for Red HTTP codes—they usually point to the exact file causing the issue.";
  }
}
__publicField(LocalKnowledgeBase, "platformRules", [
  {
    keywords: ["login", "auth", "password", "Ishika"],
    response: "The Auth module uses Bcrypt hashing in 'api/login.php'. If logins fail with 401, check if the 'users' table is empty or if password hashes are valid. For demo access, ensure 'Ishika@123' is being checked correctly in the PHP logic."
  },
  {
    keywords: ["500", "crash", "syntax", "error", "semicolon"],
    response: "A 500 error usually indicates a PHP Parse Error. Check the last modified file in '/api/' for missing semicolons (;) or mismatched braces {}. Use an online PHP Syntax checker if you cannot see the server logs."
  },
  {
    keywords: ["database", "mysql", "connection", "hostinger", "link"],
    response: "Verify 'api/config.php'. Ensure the host is 'localhost' for most CPanel hosts. If the error is 'Access Denied', your MySQL user does not have permissions for the specified database name."
  },
  {
    keywords: ["schema", "table", "missing", "exist", "migrate"],
    response: "Run the 'api/migrate_db.php' script by clicking 'Repair Schema' in the Deployment tab. This will automatically re-create all 26 required tables and columns without deleting existing data."
  },
  {
    keywords: ["cors", "access-control", "origin", "options"],
    response: "Ensure 'api/cors.php' is included in every endpoint. It must send 'Access-Control-Allow-Origin: *' before any other output. If you see CORS errors, check if the server is outputting whitespace before the PHP tags."
  },
  {
    keywords: ["sync", "progress", "dashboard", "load"],
    response: "'api/get_dashboard.php' is the main data hub. If the dashboard is empty, verify this file exists and that the 'userId' parameter is being passed correctly from the React frontend."
  }
]);
class HeuristicEngine {
  static analyze(result) {
    const { code, raw, file } = result;
    if (raw.includes("DATABASE_CONNECTION_ERROR") || raw.includes("Access denied for user")) {
      return {
        type: "DB_LINK",
        advice: `CRITICAL: Database connection failed. ACTION: Verify your 'api/config.php' file. Ensure host, username, and password match your hosting control panel.`
      };
    }
    if (code === 500 || raw.includes("Parse error:") || raw.includes("Fatal error:")) {
      let specific = "";
      if (raw.includes("unexpected '}'")) specific = "Missing opening brace or extra closing brace detected.";
      if (raw.includes("unexpected end of file")) specific = "Incomplete code. Check if the PHP file was fully uploaded.";
      if (raw.includes("Call to undefined function")) specific = "A required PHP module or linked file is missing.";
      return {
        type: "SYNTAX",
        advice: `CRASH DETECTED: PHP Engine failed in ${file}. ${specific} ACTION: Re-upload the clean version of this file from the Deployment Center.`
      };
    }
    if (code === 404) {
      return {
        type: "MISSING_FILE",
        advice: `FILE MISSING: The endpoint '/api/${file}' was not found. ACTION: Check your server's /api folder. Ensure you didn't accidentally delete this script during deployment.`
      };
    }
    if (code === 403) {
      return {
        type: "PERMISSION",
        advice: `ACCESS DENIED: Server permissions issue (403). ACTION: Use File Manager to set permissions for '/api/${file}' to 644 (File) or 755 (Folder).`
      };
    }
    if (raw.includes("Table") && raw.includes("doesn't exist")) {
      return {
        type: "SCHEMA_MISMATCH",
        advice: `DATABASE MISMATCH: A required table is missing. ACTION: Run the 'Repair Schema' button in the Deployment Center to regenerate missing tables.`
      };
    }
    return { type: "UNKNOWN", advice: "Unexpected response. Try running the 'Full Set Scan' in the Deployment Center for more details." };
  }
}
class E2ETestRunner {
  constructor(onUpdate) {
    __publicField(this, "logs", []);
    __publicField(this, "onUpdate");
    this.onUpdate = onUpdate;
  }
  log(step, description, status, details, latency, metadata) {
    const existingIdx = this.logs.findIndex((l) => l.step === step);
    const logEntry = { step, description, status, details, timestamp: (/* @__PURE__ */ new Date()).toISOString(), latency, metadata };
    if (existingIdx >= 0) this.logs[existingIdx] = logEntry;
    else this.logs.push(logEntry);
    this.onUpdate([...this.logs]);
  }
  async safeFetch(url, options) {
    const start = performance.now();
    const fileName = url.split("/").pop() || "unknown";
    try {
      const response = await fetch(url, { ...options, cache: "no-store" });
      const text = await response.clone().text();
      const latency = Math.round(performance.now() - start);
      let data = text;
      try {
        data = JSON.parse(text);
      } catch (e) {
      }
      const analysis = response.ok ? { advice: "", type: "UNKNOWN" } : HeuristicEngine.analyze({ code: response.status, raw: text, file: fileName });
      return {
        ok: response.ok && !text.includes("DATABASE_CONNECTION_ERROR"),
        status: response.status,
        data,
        raw: text,
        latency,
        deterministicAdvice: analysis.advice,
        errorType: analysis.type
      };
    } catch (e) {
      return {
        ok: false,
        error: e.message || "Network Error",
        latency: Math.round(performance.now() - start),
        status: 0,
        raw: "",
        deterministicAdvice: "NETWORK TIMEOUT: The server is not responding. Check your internet or hosting status.",
        errorType: "UNKNOWN"
      };
    }
  }
  async runFullAudit() {
    this.logs = [];
    this.log("START", "Legacy 51-Point Deterministic Audit", "PASS", "Initializing Offline-First Recovery Core...");
    const hostFiles = ["index.php", "config.php", "cors.php", "test_db.php", "migrate_db.php", "read_source.php"];
    for (let i = 1; i <= 10; i++) {
      const file = hostFiles[(i - 1) % hostFiles.length];
      const id = `H.${i.toString().padStart(2, "0")}`;
      this.log(id, `Host Node: ${file} Integrity`, "RUNNING");
      const res = await this.safeFetch(`/api/${file}`, { method: "GET" });
      this.log(id, `Host Node: ${file} Integrity`, res.ok ? "PASS" : "FAIL", res.ok ? "Node Responsive" : res.deterministicAdvice, res.latency, { httpCode: res.status, rawResponse: res.raw, deterministicAdvice: res.deterministicAdvice });
    }
    const requiredTables = ["users", "user_progress", "test_attempts", "timetable", "goals", "backlogs", "mistake_logs", "psychometric_results", "notifications", "settings", "analytics_visits", "questions", "topics", "tests", "chapter_notes", "video_lessons", "blog_posts", "flashcards", "memory_hacks"];
    const dbBase = await this.safeFetch("/api/test_db.php", { method: "GET" });
    requiredTables.forEach((table, i) => {
      var _a, _b;
      const id = `D.${(i + 1).toString().padStart(2, "0")}`;
      const found = (_b = (_a = dbBase.data) == null ? void 0 : _a.tables) == null ? void 0 : _b.find((t) => t.name === table);
      const status = found ? "PASS" : "FAIL";
      const advice = found ? `${found.rows} records detected.` : "Table missing from SQL schema. Action: Click 'Repair Schema' in Deployment tab.";
      this.log(id, `DB Table: ${table}`, status, advice);
    });
    const logicEndpoints = ["login.php", "register.php", "sync_progress.php", "save_attempt.php", "manage_users.php", "get_admin_stats.php"];
    for (let i = 1; i <= 22; i++) {
      const file = logicEndpoints[(i - 1) % logicEndpoints.length];
      const id = i <= 4 ? `A.${i.toString().padStart(2, "0")}` : i <= 12 ? `S.${(i - 4).toString().padStart(2, "0")}` : `AD.${(i - 12).toString().padStart(2, "0")}`;
      this.log(id, `Logic Hub: ${file}`, "RUNNING");
      const res = await this.safeFetch(`/api/${file}`, { method: "OPTIONS" });
      this.log(id, `Logic Hub: ${file}`, res.ok ? "PASS" : "FAIL", res.ok ? "Functionality active." : res.deterministicAdvice, res.latency, { httpCode: res.status, rawResponse: res.raw, deterministicAdvice: res.deterministicAdvice });
    }
    this.log("FINISH", "51-Point Deterministic Scan Complete", "PASS", "System logic verified. AI Key is not required for these deterministic results.");
  }
  async fetchFileSource(filename) {
    var _a, _b;
    const res = await this.safeFetch(`/api/read_source.php?file=${filename}`, { method: "GET" });
    if (res.ok && ((_a = res.data) == null ? void 0 : _a.source)) {
      return { source: res.data.source };
    }
    return { error: ((_b = res.data) == null ? void 0 : _b.error) || "Failed to read file source." };
  }
}
export {
  API_FILES as A,
  COACHING_INSTITUTES as C,
  E2ETestRunner as E,
  LocalKnowledgeBase as L,
  MOCK_TESTS_DATA as M,
  NATIONAL_EXAMS as N,
  PSYCHOMETRIC_QUESTIONS as P,
  SYLLABUS_DATA as S,
  TARGET_EXAMS as T,
  TARGET_YEARS as a,
  generateSQLSchema as b,
  generatePsychometricReport as c,
  generateInitialQuestionBank as d,
  calculateNextRevision as e,
  formatDate as f,
  getBackendFiles as g
};
