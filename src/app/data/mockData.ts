// ═══════════════════════════════════════════════
//  RSIC Mock Data & LocalStorage Utilities
// ═══════════════════════════════════════════════

export const BRAND = {
  name: 'Rizqara Science & Innovation Club',
  shortName: 'RSIC',
  tagline: 'Building Future Innovators Through Science & Technology',
  email: 'rizqarascienceandinnovationclub@gmail.com',
  phone: '0134-3042761',
  location: 'Dhaka, Bangladesh',
  founded: '2023',
  social: {
    facebook: 'https://facebook.com/rizqara',
    twitter: 'https://twitter.com/rizqara',
    instagram: 'https://instagram.com/rizqara',
    linkedin: 'https://linkedin.com/company/rizqara',
    youtube: 'https://youtube.com/@rizqara',
    github: 'https://github.com/rizqara',
  },
};

export const STATS = [
  { label: 'Digital Projects Built', value: 10, suffix: '+', icon: 'FolderOpen' },
  { label: 'Students Impacted', value: 500, suffix: '+', icon: 'Users' },
  { label: 'National Awards Won', value: 1, suffix: '+', icon: 'Trophy' },
  { label: 'Countries Reached', value: 5, suffix: '+', icon: 'Globe' },
];

export const PROJECTS = [
  {
    id: 'admission-bondu',
    name: 'Admission Bondu',
    tagline: 'Your Ultimate Digital Admission Guide',
    shortDesc: 'An AI-powered admission guidance platform that simplifies university applications for students across Bangladesh.',
    description: 'Admission Bondu is a comprehensive digital admission support platform designed to guide students through the complex university admission process in Bangladesh. It provides real-time updates, AI-powered recommendations, document checklists, and personalized guidance.',
    problem: 'Every year, millions of students in Bangladesh struggle with confusing and fragmented admission information. Students miss deadlines, submit wrong documents, and face unnecessary stress due to lack of organized guidance.',
    solution: 'Admission Bondu centralizes all admission-related information into one intelligent platform. It provides AI-driven personalized guidance, real-time notifications, deadline tracking, and community support.',
    features: [
      'AI-powered university recommendations',
      'Real-time admission updates & notifications',
      'Smart document checklist system',
      'Deadline tracker & calendar',
      'Community Q&A platform',
      'Mobile-responsive design',
      'Multi-language support (EN + BN)',
    ],
    impact: 'Helped over 10,000 students navigate their admission journey with 95% success rate. Recognized as the best innovation at Science & Technology Fair 2026.',
    category: 'Education Technology',
    tags: ['AI', 'Education', 'Web App', 'Bangladesh'],
    status: 'Live',
    year: 2026,
    award: '1st Prize — Science & Technology Fair 2026',
    image: '/projects/admission-bondu.png',
    screenshots: [
      'https://images.unsplash.com/photo-1759505017950-25e0733b9e68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
      'https://images.unsplash.com/photo-1772272935464-2e90d8218987?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    ],
    team: ['Rizqara Core Team', 'AI Division'],
    link: 'https://admissionbondu.com',
    color: '#800020',
  },
  {
    id: 'elevate-cv',
    name: 'Elevate CV',
    tagline: 'Professional CV Builder for the Modern World',
    shortDesc: 'A smart CV and resume builder platform that helps students and professionals craft standout applications.',
    description: 'Elevate CV is a professional resume and CV builder platform that combines intelligent templates with AI-powered content suggestions to help students and professionals create compelling job applications.',
    problem: 'Many talented students and graduates fail to land opportunities simply because they cannot effectively communicate their skills and experiences on paper.',
    solution: 'Elevate CV provides premium, ATS-optimized templates, AI writing assistance, and industry-specific guidance to help users create resumes that stand out.',
    features: [
      'ATS-optimized templates library',
      'AI content suggestions',
      'PDF & DOCX export',
      'LinkedIn integration',
      'Real-time preview',
      'Multiple language support',
      'Portfolio section builder',
    ],
    impact: 'Over 5,000 CVs created with an average 40% increase in interview callback rates reported by users.',
    category: 'Career Development',
    tags: ['AI', 'Career', 'Web App', 'Productivity'],
    status: 'Live',
    year: 2025,
    image: '/projects/elevate-cv.png',
    screenshots: [
      'https://images.unsplash.com/photo-1766297247924-6638d54e7c89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
      'https://images.unsplash.com/photo-1759505017950-25e0733b9e68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    ],
    team: ['Rizqara Dev Team', 'Design Division'],
    link: 'https://elevatecv.rizqara.org',
    color: '#1a4a7a',
  },
  {
    id: 'pengu',
    name: 'Pengu',
    tagline: 'Learn Programming the Fun Way',
    shortDesc: 'A gamified coding learning platform designed to make programming accessible and enjoyable for beginners.',
    description: 'Pengu is an interactive gamified programming education platform that teaches coding through challenges, projects, and rewards. Built to make programming accessible to all ages.',
    problem: 'Traditional programming courses are dry and intimidating for beginners, leading to high dropout rates and low completion.',
    solution: 'Pengu uses game mechanics, interactive challenges, visual feedback, and a mascot-driven experience to keep learners motivated.',
    features: [
      'Interactive code challenges',
      'Gamified progress system',
      'Visual coding for beginners',
      'Multi-language support (Python, JS, C++)',
      'Achievement badges & certificates',
      'Live code editor',
      'Community leaderboard',
    ],
    impact: 'Onboarded 2,000+ students in beta, with 85% course completion rate — significantly higher than industry average.',
    category: 'Educational Gaming',
    tags: ['Education', 'Gamification', 'Programming', 'Kids'],
    status: 'Beta',
    year: 2025,
    image: '/projects/pengu.png',
    screenshots: [
      'https://images.unsplash.com/photo-1724986211720-87b06808fe90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    ],
    team: ['Rizqara Dev Team', 'Education Division'],
    link: 'https://pengu.rizqara.org',
    color: '#2d6a4f',
  },
  {
    id: 'voca-messenger',
    name: 'Voca Messenger',
    tagline: 'Communicate Smarter, Connect Better',
    shortDesc: 'A privacy-focused intelligent messaging platform with voice recognition and smart replies.',
    description: 'Voca Messenger is a next-generation communication platform that combines traditional messaging with AI-powered features like voice recognition, smart replies, and real-time translation.',
    problem: 'Existing messaging apps lack privacy, intelligent assistance, and language barriers prevent global communication.',
    solution: 'Voca Messenger offers end-to-end encryption, AI-powered communication features, and built-in translation for 20+ languages.',
    features: [
      'End-to-end encryption',
      'AI smart replies',
      'Voice-to-text messaging',
      'Real-time translation (20+ languages)',
      'Group collaboration tools',
      'File sharing & cloud backup',
      'Cross-platform (iOS, Android, Web)',
    ],
    impact: 'In private beta with 500+ users. Pioneering privacy-first communication in the region.',
    category: 'Communication',
    tags: ['AI', 'Communication', 'Privacy', 'Mobile App'],
    status: 'Development',
    year: 2025,
    image: '/projects/voca-messenger.png',
    screenshots: [
      'https://images.unsplash.com/photo-1765133469414-02f4e445df19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    ],
    team: ['Rizqara Dev Team', 'Security Division'],
    link: '#',
    color: '#6b2d5e',
  },
  {
    id: 'jeevita',
    name: 'Jeevita',
    tagline: 'Healthcare Intelligence at Your Fingertips',
    shortDesc: 'An AI-driven health companion that provides personalized wellness guidance and medical information.',
    description: 'Jeevita is a comprehensive digital health companion that uses AI to provide personalized wellness advice, symptom checking, medication reminders, and connect users with healthcare professionals.',
    problem: 'Access to reliable healthcare information and professional guidance is limited and expensive, especially in developing regions.',
    solution: 'Jeevita democratizes healthcare access through AI-powered symptom assessment, telemedicine integration, and preventive health education.',
    features: [
      'AI symptom checker',
      'Personalized wellness plans',
      'Medication tracking & reminders',
      'Telemedicine integration',
      'Mental health support',
      'Diet & nutrition guidance',
      'Emergency contact system',
    ],
    impact: 'Addressing healthcare gaps for underserved communities. Pilot program helping 200+ families with preventive care.',
    category: 'Healthcare Technology',
    tags: ['AI', 'Healthcare', 'Mobile App', 'Social Impact'],
    status: 'Pilot',
    year: 2026,
    image: '/projects/jeevita.png',
    screenshots: [
      'https://images.unsplash.com/photo-1775185172785-4bbd6b0fc8f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    ],
    team: ['Rizqara Dev Team', 'Healthcare Division'],
    link: '#',
    color: '#1a5276',
  },
];

export const PROGRAMS = [
  {
    id: 'programming',
    category: 'Programming',
    icon: 'Code2',
    color: '#800020',
    image: '/projects/admission-bondu.png',
    description: 'Master the art of programming from fundamentals to advanced concepts. Build real-world applications.',
    courses: [
      {
        id: 'python-basics',
        name: 'Python Fundamentals',
        duration: '8 Weeks',
        level: 'Beginner',
        skills: ['Variables & Data Types', 'Control Flow', 'Functions', 'OOP', 'File Handling'],
        certificate: true,
        description: 'Learn Python from scratch. Build automation scripts, data tools, and web apps.',
        students: 342,
        rating: 4.9,
      },
      {
        id: 'web-dev',
        name: 'Full-Stack Web Development',
        duration: '12 Weeks',
        level: 'Intermediate',
        skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'Database Design'],
        certificate: true,
        description: 'Build complete web applications with modern frameworks and best practices.',
        students: 218,
        rating: 4.8,
      },
      {
        id: 'app-dev',
        name: 'Mobile App Development',
        duration: '10 Weeks',
        level: 'Intermediate',
        skills: ['React Native', 'UI/UX for Mobile', 'APIs', 'App Deployment', 'Testing'],
        certificate: true,
        description: 'Create cross-platform mobile applications for iOS and Android.',
        students: 156,
        rating: 4.7,
      },
    ],
  },
  {
    id: 'robotics-iot',
    category: 'Robotics & IoT',
    icon: 'Cpu',
    color: '#1a4a7a',
    image: '/projects/jeevita.png',
    description: 'Explore the physical-digital frontier with robotics, Arduino programming, and IoT systems.',
    courses: [
      {
        id: 'arduino-basics',
        name: 'Arduino & Microcontrollers',
        duration: '6 Weeks',
        level: 'Beginner',
        skills: ['Arduino Programming', 'Circuit Design', 'Sensors', 'Actuators', 'Prototyping'],
        certificate: true,
        description: 'Build your first robots and smart devices using Arduino platforms.',
        students: 189,
        rating: 4.8,
      },
      {
        id: 'iot-systems',
        name: 'IoT Systems Design',
        duration: '8 Weeks',
        level: 'Intermediate',
        skills: ['IoT Protocols', 'Cloud Connectivity', 'Data Analytics', 'Security', 'Automation'],
        certificate: true,
        description: 'Design and deploy connected IoT solutions for smart environments.',
        students: 134,
        rating: 4.7,
      },
      {
        id: 'robotics-advanced',
        name: 'Advanced Robotics',
        duration: '10 Weeks',
        level: 'Advanced',
        skills: ['ROS Framework', 'Computer Vision', 'Machine Learning Integration', 'Autonomous Navigation'],
        certificate: true,
        description: 'Build intelligent autonomous robots using cutting-edge technologies.',
        students: 89,
        rating: 4.9,
      },
    ],
  },
  {
    id: 'artificial-intelligence',
    category: 'Artificial Intelligence',
    icon: 'Brain',
    color: '#2d6a4f',
    image: '/projects/voca-messenger.png',
    description: 'Dive into machine learning, deep learning, and AI tools that are transforming every industry.',
    courses: [
      {
        id: 'learn-ai',
        name: 'Learn AI Essentials',
        duration: '4 Weeks',
        level: 'Beginner',
        skills: ['AI Foundations', 'Neural Networks', 'Prompt Engineering', 'AI Tools', 'Ethics'],
        certificate: true,
        description: 'A comprehensive starter course for anyone looking to enter the world of AI. Complete the quiz and earn your official RSIC certificate.',
        students: 512,
        rating: 5.0,
      },
      {
        id: 'ml-basics',
        name: 'Machine Learning Fundamentals',
        duration: '10 Weeks',
        level: 'Intermediate',
        skills: ['Statistics', 'Supervised Learning', 'Neural Networks', 'Model Evaluation', 'Scikit-learn'],
        certificate: true,
        description: 'Understand and implement core machine learning algorithms.',
        students: 267,
        rating: 4.9,
      },
      {
        id: 'ai-tools',
        name: 'AI Tools & Applications',
        duration: '6 Weeks',
        level: 'Beginner',
        skills: ['Prompt Engineering', 'AI APIs', 'ChatGPT', 'Automation', 'AI Ethics'],
        certificate: true,
        description: 'Leverage modern AI tools to boost productivity and create applications.',
        students: 445,
        rating: 4.8,
      },
      {
        id: 'data-science',
        name: 'Data Science & Analytics',
        duration: '12 Weeks',
        level: 'Intermediate',
        skills: ['Python/Pandas', 'Data Visualization', 'Statistical Analysis', 'Big Data', 'Reporting'],
        certificate: true,
        description: 'Transform raw data into actionable insights and compelling visualizations.',
        students: 198,
        rating: 4.7,
      },
    ],
  },
  {
    id: 'design-innovation',
    category: 'Design & Innovation',
    icon: 'Palette',
    color: '#6b2d5e',
    image: '/projects/elevate-cv.png',
    description: 'Master the art of human-centered design, product thinking, and creative problem solving.',
    courses: [
      {
        id: 'ui-ux',
        name: 'UI/UX Design Mastery',
        duration: '8 Weeks',
        level: 'Beginner',
        skills: ['Design Principles', 'Figma', 'User Research', 'Prototyping', 'Usability Testing'],
        certificate: true,
        description: 'Design beautiful and intuitive digital experiences users love.',
        students: 312,
        rating: 4.9,
      },
      {
        id: 'product-design',
        name: 'Product Design & Strategy',
        duration: '10 Weeks',
        level: 'Intermediate',
        skills: ['Product Thinking', 'Design Systems', 'Brand Identity', 'User Journey Mapping', 'Launch Strategy'],
        certificate: true,
        description: 'Build products from concept to market-ready with strategic design.',
        students: 178,
        rating: 4.8,
      },
    ],
  },
  {
    id: 'research-stem',
    category: 'Research & STEM',
    icon: 'FlaskConical',
    color: '#7d4e00',
    image: '/projects/pengu.png',
    description: 'Conduct rigorous scientific research, participate in competitions, and advance STEM education.',
    courses: [
      {
        id: 'research-methods',
        name: 'Scientific Research Methods',
        duration: '8 Weeks',
        level: 'Intermediate',
        skills: ['Research Design', 'Data Collection', 'Analysis', 'Academic Writing', 'Presentation'],
        certificate: true,
        description: 'Master the fundamentals of conducting and communicating scientific research.',
        students: 145,
        rating: 4.8,
      },
      {
        id: 'innovation-lab',
        name: 'Innovation Lab & Competitions',
        duration: '12 Weeks',
        level: 'Advanced',
        skills: ['Problem Identification', 'Solution Design', 'Prototype Building', 'Pitching', 'Competition Strategy'],
        certificate: true,
        description: 'Develop competition-winning innovations with hands-on project guidance.',
        students: 112,
        rating: 4.9,
      },
    ],
  },
];

export const ACHIEVEMENTS = [
  {
    id: 'stf-2026',
    title: '1st Prize — Science & Technology Fair 2026',
    project: 'Admission Bondu',
    date: 'March 15, 2026',
    event: 'National Science & Technology Fair 2026',
    organizer: 'Ministry of Education, Bangladesh',
    location: 'Dhaka, Bangladesh',
    description: 'Recognized for outstanding innovation in educational technology. Admission Bondu stood out among 200+ competing projects for its real-world impact, technical excellence, and innovative approach to solving the admission guidance crisis in Bangladesh.',
    category: 'National Award',
    image: '/rsic-club/award.png',
    certificateImage: '/rsic-club/certificte.png',
    eventImage: '/rsic-club/po2.png',
    level: 'National',
    prize: '1st Place Trophy + Certificate + ৳50,000 Grant',
  },
  {
    id: 'innovation-summit-2025',
    title: 'Innovation Excellence Award',
    project: 'Elevate CV',
    date: 'November 10, 2025',
    event: 'Bangladesh Digital Innovation Summit 2025',
    organizer: 'ICT Division, Bangladesh',
    location: 'Dhaka, Bangladesh',
    description: 'Elevate CV received recognition for its exceptional contribution to career development technology for youth in Bangladesh.',
    category: 'Innovation Award',
    image: '/projects/elevate-cv.png',
    certificateImage: '/projects/elevate-cv.png',
    level: 'National',
    prize: 'Excellence Award + Certificate',
  },
  {
    id: 'youth-tech-2025',
    title: 'Best Student Innovation Team',
    project: 'RSIC Overall',
    date: 'September 5, 2025',
    event: 'Youth Technology Symposium 2025',
    organizer: 'BUET & DIU Consortium',
    location: 'Dhaka, Bangladesh',
    description: 'RSIC was honored as the best student innovation team for consistently delivering impactful digital solutions and fostering a culture of innovation among young Bangladeshi students.',
    category: 'Institutional Award',
    image: '/projects/admission-bondu.png',
    certificateImage: '/projects/admission-bondu.png',
    level: 'University',
    prize: 'Best Team Award + Certificate',
  },
];

export const TEAM = [
  {
    id: 1,
    name: 'Md. Rizqul Islam',
    role: 'President & Founder',
    bio: 'A visionary student leader and technology enthusiast who founded RSIC to bridge the gap between academic learning and real-world innovation. Specializes in AI and full-stack development.',
    image: 'https://images.unsplash.com/photo-1657551856874-d492ef8ecba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    expertise: ['Leadership', 'AI/ML', 'Full-Stack Dev', 'Strategy'],
    social: { linkedin: '#', github: '#', twitter: '#' },
    email: 'rizqul@rizqara.org',
  },
  {
    id: 2,
    name: 'Nadia Hossain',
    role: 'Vice President',
    bio: 'An accomplished researcher and educator dedicated to expanding RSIC\'s global reach. Expert in research methodology, program development, and international partnerships.',
    image: 'https://images.unsplash.com/photo-1743836798811-6208a08233c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    expertise: ['Research', 'Program Dev', 'International Relations', 'Education'],
    social: { linkedin: '#', github: '#', twitter: '#' },
    email: 'nadia@rizqara.org',
  },
  {
    id: 3,
    name: 'Arif Rahman',
    role: 'Chief Technology Officer',
    bio: 'Full-stack developer and AI specialist who leads all technical projects at RSIC. Architect behind Admission Bondu and Elevate CV. Passionate about accessible technology.',
    image: 'https://images.unsplash.com/photo-1758518731468-98e90ffd7430?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    expertise: ['Backend Dev', 'AI Systems', 'Cloud', 'DevOps'],
    social: { linkedin: '#', github: '#', twitter: '#' },
    email: 'arif@rizqara.org',
  },
  {
    id: 4,
    name: 'Fatima Khan',
    role: 'Head of Design & Innovation',
    bio: 'Award-winning UI/UX designer who crafts the visual identity and user experiences for all RSIC products. Believes great design changes behavior and improves lives.',
    image: 'https://images.unsplash.com/photo-1743836798811-6208a08233c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    expertise: ['UI/UX', 'Brand Design', 'Product Strategy', 'User Research'],
    social: { linkedin: '#', github: '#', twitter: '#' },
    email: 'fatima@rizqara.org',
  },
  {
    id: 5,
    name: 'Prof. Dr. Karim',
    role: 'Academic Mentor',
    bio: 'Professor of Computer Science with 20+ years experience. Provides academic guidance, research mentorship, and institutional connections to support RSIC\'s mission.',
    image: 'https://images.unsplash.com/photo-1657551856874-d492ef8ecba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    expertise: ['Computer Science', 'Research', 'Academia', 'Mentorship'],
    social: { linkedin: '#', github: '#', twitter: '#' },
    email: 'drkarim@rizqara.org',
  },
  {
    id: 6,
    name: 'Sakib Ahmed',
    role: 'Robotics & IoT Lead',
    bio: 'Hardware engineer and robotics enthusiast leading RSIC\'s physical computing initiatives. Specializes in Arduino, Raspberry Pi, and embedded systems.',
    image: 'https://images.unsplash.com/photo-1657551856874-d492ef8ecba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    expertise: ['Robotics', 'IoT', 'Embedded Systems', 'Electronics'],
    social: { linkedin: '#', github: '#', twitter: '#' },
    email: 'sakib@rizqara.org',
  },
  {
    id: 7,
    name: 'Tahira Begum',
    role: 'Community & Events Coordinator',
    bio: 'Social innovator and community builder who manages RSIC\'s events, outreach programs, and global community engagement. Expert in event management and communications.',
    image: 'https://images.unsplash.com/photo-1743836798811-6208a08233c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    expertise: ['Event Management', 'Communications', 'Community Building', 'PR'],
    social: { linkedin: '#', github: '#', twitter: '#' },
    email: 'tahira@rizqara.org',
  },
  {
    id: 8,
    name: 'Imran Hossain',
    role: 'Research & Development Lead',
    bio: 'Data scientist and researcher driving RSIC\'s innovation pipeline. Leads the R&D division, coordinating student research projects and competition entries.',
    image: 'https://images.unsplash.com/photo-1657551856874-d492ef8ecba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    expertise: ['Data Science', 'Research', 'Machine Learning', 'Analytics'],
    social: { linkedin: '#', github: '#', twitter: '#' },
    email: 'imran@rizqara.org',
  },
];

export const EVENTS = [
  {
    id: 'science-workshop-2026',
    title: 'Science & Innovation Workshop 2026',
    type: 'Workshop',
    date: '2026-05-15',
    endDate: '2026-05-16',
    time: '9:00 AM - 5:00 PM',
    location: 'RSIC Innovation Hub, Dhaka',
    description: 'A two-day intensive workshop covering the latest trends in science, technology, and innovation. Featuring hands-on sessions, expert talks, and project showcases.',
    image: 'https://images.unsplash.com/photo-1724986211720-87b06808fe90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    capacity: 100,
    registered: 67,
    speakers: ['Prof. Dr. Karim', 'Md. Rizqul Islam', 'Tech Industry Expert'],
    tags: ['Workshop', 'Innovation', 'STEM'],
    status: 'Upcoming',
    price: 'Free',
    color: '#800020',
  },
  {
    id: 'hackathon-2026',
    title: 'RSIC National Hackathon 2026',
    type: 'Competition',
    date: '2026-06-20',
    endDate: '2026-06-22',
    time: '9:00 AM - All Night',
    location: 'National Convention Center, Dhaka',
    description: '48-hour hackathon bringing together 200+ students to build innovative solutions for real-world problems. Prize pool worth ৳200,000.',
    image: 'https://images.unsplash.com/photo-1582774907432-bf1bc986cf47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    capacity: 200,
    registered: 145,
    speakers: ['Industry Judges', 'Tech Leaders', 'Startup Mentors'],
    tags: ['Hackathon', 'Competition', 'Innovation', 'Prize'],
    status: 'Upcoming',
    price: '৳500',
    color: '#1a4a7a',
  },
  {
    id: 'ai-bootcamp-2026',
    title: 'AI & Machine Learning Bootcamp',
    type: 'Training',
    date: '2026-04-25',
    endDate: '2026-04-26',
    time: '10:00 AM - 4:00 PM',
    location: 'RSIC Digital Lab, Dhaka',
    description: 'Intensive 2-day bootcamp on AI and machine learning fundamentals. Learn by building real ML models with Python. Certificate provided.',
    image: 'https://images.unsplash.com/photo-1775185172785-4bbd6b0fc8f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    capacity: 50,
    registered: 48,
    speakers: ['Imran Hossain', 'AI Guest Instructor'],
    tags: ['AI', 'Machine Learning', 'Python', 'Certificate'],
    status: 'Almost Full',
    price: '৳1,000',
    color: '#2d6a4f',
  },
  {
    id: 'robotics-fair-2025',
    title: 'Robotics & IoT Fair 2025',
    type: 'Science Fair',
    date: '2025-12-10',
    endDate: '2025-12-11',
    time: '9:00 AM - 6:00 PM',
    location: 'Dhaka Science Museum',
    description: 'Students showcased their robotics and IoT projects to judges, industry professionals, and the public. Featured 30+ student projects.',
    image: 'https://images.unsplash.com/photo-1655088651367-f9f4e1328f08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    capacity: 500,
    registered: 500,
    speakers: ['Sakib Ahmed', 'BUET Professors', 'Industry Experts'],
    tags: ['Robotics', 'IoT', 'Showcase', 'Fair'],
    status: 'Completed',
    price: 'Free',
    color: '#6b2d5e',
  },
  {
    id: 'coding-contest-2025',
    title: 'RSIC Coding Contest Season 2',
    type: 'Competition',
    date: '2025-11-05',
    endDate: '2025-11-05',
    time: '10:00 AM - 4:00 PM',
    location: 'Online (HackerRank Platform)',
    description: 'Second season of our popular coding competition. Students solved algorithmic challenges across multiple difficulty levels. 300+ participants.',
    image: 'https://images.unsplash.com/photo-1723987135977-ae935608939e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    capacity: 500,
    registered: 312,
    speakers: ['Arif Rahman'],
    tags: ['Coding', 'Competition', 'Algorithms', 'Online'],
    status: 'Completed',
    price: 'Free',
    color: '#7d4e00',
  },
  {
    id: 'design-sprint-2025',
    title: 'Design Innovation Sprint',
    type: 'Workshop',
    date: '2025-10-20',
    endDate: '2025-10-20',
    time: '9:00 AM - 5:00 PM',
    location: 'RSIC Creative Studio, Dhaka',
    description: 'Full-day design sprint workshop teaching UI/UX principles, Figma, and product design methodology. Certificate provided.',
    image: 'https://images.unsplash.com/photo-1772272935464-2e90d8218987?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    capacity: 30,
    registered: 30,
    speakers: ['Fatima Khan', 'UX Industry Expert'],
    tags: ['Design', 'UI/UX', 'Figma', 'Sprint'],
    status: 'Completed',
    price: '৳500',
    color: '#800020',
  },
];

export const BLOG_POSTS = [
  {
    id: 'future-of-ai-bangladesh',
    title: 'The Future of Artificial Intelligence in Bangladesh',
    excerpt: 'Bangladesh is at a pivotal moment in its tech revolution. How AI is reshaping education, healthcare, and business across the country.',
    content: 'Bangladesh is experiencing a technological renaissance...',
    author: 'Md. Rizqul Islam',
    authorRole: 'President, RSIC',
    authorImage: 'https://images.unsplash.com/photo-1657551856874-d492ef8ecba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100',
    date: '2026-04-01',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1775185172785-4bbd6b0fc8f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    tags: ['AI', 'Bangladesh', 'Technology', 'Future'],
    readTime: '8 min read',
    featured: true,
  },
  {
    id: 'robotics-education-guide',
    title: 'Complete Guide to Starting Robotics Education',
    excerpt: 'Everything you need to know to start your journey in robotics — from choosing the right tools to building your first robot.',
    content: 'Robotics education is transforming how students learn...',
    author: 'Sakib Ahmed',
    authorRole: 'Robotics Lead, RSIC',
    authorImage: 'https://images.unsplash.com/photo-1657551856874-d492ef8ecba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100',
    date: '2026-03-20',
    category: 'Education',
    image: 'https://images.unsplash.com/photo-1655088651367-f9f4e1328f08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    tags: ['Robotics', 'Education', 'Arduino', 'Beginners'],
    readTime: '12 min read',
    featured: false,
  },
  {
    id: 'admission-bondu-success-story',
    title: 'How Admission Bondu Won 1st Prize at National Science Fair',
    excerpt: 'The inside story of how RSIC built, iterated, and launched an award-winning educational technology platform in under six months.',
    content: 'It started with a simple observation...',
    author: 'Arif Rahman',
    authorRole: 'CTO, RSIC',
    authorImage: 'https://images.unsplash.com/photo-1758518731468-98e90ffd7430?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100',
    date: '2026-03-10',
    category: 'Success Story',
    image: 'https://images.unsplash.com/photo-1764408721535-2dcb912db83e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    tags: ['Admission Bondu', 'Award', 'Success', 'Innovation'],
    readTime: '10 min read',
    featured: false,
  },
  {
    id: 'student-career-stem',
    title: '10 Career Paths in STEM You Should Explore in 2026',
    excerpt: 'Discover the most exciting and in-demand STEM careers for the next decade, with a focus on emerging technology roles.',
    content: 'The STEM job market is evolving rapidly...',
    author: 'Nadia Hossain',
    authorRole: 'VP, RSIC',
    authorImage: 'https://images.unsplash.com/photo-1743836798811-6208a08233c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100',
    date: '2026-02-28',
    category: 'Career',
    image: 'https://images.unsplash.com/photo-1766297248160-87aca6fa59ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    tags: ['Career', 'STEM', '2026', 'Jobs'],
    readTime: '7 min read',
    featured: false,
  },
  {
    id: 'ux-design-beginners',
    title: 'UX Design for Beginners: Where to Start in 2026',
    excerpt: 'A comprehensive roadmap for students who want to break into UX design — tools, resources, and practical projects to build your portfolio.',
    content: 'User experience design is one of the most rewarding careers...',
    author: 'Fatima Khan',
    authorRole: 'Head of Design, RSIC',
    authorImage: 'https://images.unsplash.com/photo-1743836798811-6208a08233c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100',
    date: '2026-02-15',
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1772272935464-2e90d8218987?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    tags: ['UX Design', 'Beginners', 'Career', 'Figma'],
    readTime: '9 min read',
    featured: false,
  },
  {
    id: 'data-science-in-healthcare',
    title: 'Data Science Is Revolutionizing Healthcare in South Asia',
    excerpt: 'How machine learning models and big data analytics are improving patient outcomes across South Asian hospitals and clinics.',
    content: 'Healthcare in South Asia is undergoing a digital transformation...',
    author: 'Imran Hossain',
    authorRole: 'R&D Lead, RSIC',
    authorImage: 'https://images.unsplash.com/photo-1657551856874-d492ef8ecba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100',
    date: '2026-01-30',
    category: 'Research',
    image: 'https://images.unsplash.com/photo-1766297247924-6638d54e7c89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    tags: ['Data Science', 'Healthcare', 'South Asia', 'ML'],
    readTime: '11 min read',
    featured: false,
  },
];

export const GALLERY_ITEMS = [
  { id: 1, image: '/projects/admission-bondu.png', title: 'Innovation Lab Session', category: 'Workshops', date: '2026-03' },
  { id: 2, image: '/projects/jeevita.png', title: 'Robotics Project Demo', category: 'Projects', date: '2025-12' },
  { id: 3, image: '/projects/admission-bondu.png', title: 'Science Fair Award Ceremony', category: 'Achievements', date: '2026-03' },
  { id: 4, image: '/projects/pengu.png', title: 'STEM Learning Workshop', category: 'Workshops', date: '2025-11' },
  { id: 5, image: '/projects/voca-messenger.png', title: 'National Hackathon 2025', category: 'Events', date: '2025-10' },
  { id: 6, image: '/projects/jeevita.png', title: 'AI Research Presentation', category: 'Projects', date: '2025-09' },
  { id: 7, image: '/projects/elevate-cv.png', title: 'Design Innovation Sprint', category: 'Workshops', date: '2025-10' },
  { id: 8, image: '/projects/admission-bondu.png', title: 'Coding Bootcamp Session', category: 'Workshops', date: '2025-08' },
  { id: 9, image: '/projects/voca-messenger.png', title: 'Annual Conference 2025', category: 'Events', date: '2025-11' },
  { id: 10, image: '/projects/pengu.png', title: 'Team Strategy Meeting', category: 'Team', date: '2026-01' },
  { id: 11, image: '/projects/elevate-cv.png', title: 'Data Science Lab', category: 'Projects', date: '2025-12' },
  { id: 12, image: '/projects/admission-bondu.png', title: 'App Development Workshop', category: 'Workshops', date: '2025-07' },
];

// ═══════════════════════════════════════════════
//  LocalStorage Utilities
// ═══════════════════════════════════════════════

export interface Member {
  id: string;
  name: string;
  email: string;
  password: string;
  country: string;
  school: string;
  interests: string[];
  whatsapp?: string;
  joinDate: string;
  role: 'member' | 'admin';
  enrolledCourses: string[];
  completedCourses: string[];
  certificates: string[];
  activityLog: ActivityEntry[];
}

export interface ActivityEntry {
  id: string;
  type: 'enrollment' | 'completion' | 'achievement' | 'event' | 'login';
  description: string;
  date: string;
}

export interface EventRegistration {
  memberId: string;
  eventId: string;
  date: string;
  name: string;
  email: string;
}

export interface DonationRecord {
  id: string;
  name: string;
  email: string;
  country: string;
  amount: number;
  currency: string;
  message: string;
  option: string;
  date: string;
  paymentMethod: string;
}

const LS_KEYS = {
  MEMBERS: 'rsic_members',
  CURRENT_USER: 'rsic_current_user',
  EVENT_REGS: 'rsic_event_registrations',
  DONATIONS: 'rsic_donations',
};

function getFromLS<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch { return defaultValue; }
}

function saveToLS(key: string, value: unknown) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

// Members
export function getMembers(): Member[] {
  return getFromLS<Member[]>(LS_KEYS.MEMBERS, []);
}

export function registerMember(data: Omit<Member, 'id' | 'joinDate' | 'role' | 'enrolledCourses' | 'completedCourses' | 'certificates' | 'activityLog'>): { success: boolean; message: string } {
  const members = getMembers();
  if (members.find(m => m.email === data.email)) {
    return { success: false, message: 'An account with this email already exists.' };
  }
  const newMember: Member = {
    ...data,
    id: `member_${Date.now()}`,
    joinDate: new Date().toISOString(),
    role: 'member',
    enrolledCourses: [],
    completedCourses: [],
    certificates: [],
    activityLog: [{ id: `act_${Date.now()}`, type: 'login', description: 'Joined RSIC Community', date: new Date().toISOString() }],
  };
  members.push(newMember);
  saveToLS(LS_KEYS.MEMBERS, members);
  return { success: true, message: 'Registration successful!' };
}

export function loginMember(email: string, password: string): { success: boolean; member?: Member; message: string } {
  const members = getMembers();
  const member = members.find(m => m.email === email && m.password === password);
  if (!member) return { success: false, message: 'Invalid email or password.' };
  saveToLS(LS_KEYS.CURRENT_USER, member);
  return { success: true, member, message: 'Login successful!' };
}

export function getCurrentUser(): Member | null {
  return getFromLS<Member | null>(LS_KEYS.CURRENT_USER, null);
}

export function logoutUser() {
  localStorage.removeItem(LS_KEYS.CURRENT_USER);
}

export function enrollInCourse(memberId: string, courseId: string): boolean {
  const members = getMembers();
  const idx = members.findIndex(m => m.id === memberId);
  if (idx === -1) return false;
  if (!members[idx].enrolledCourses.includes(courseId)) {
    members[idx].enrolledCourses.push(courseId);
    members[idx].activityLog.push({ id: `act_${Date.now()}`, type: 'enrollment', description: `Enrolled in course: ${courseId}`, date: new Date().toISOString() });
    saveToLS(LS_KEYS.MEMBERS, members);
    saveToLS(LS_KEYS.CURRENT_USER, members[idx]);
  }
  return true;
}

export function updateMember(memberId: string, updates: Partial<Member>): Member | null {
  const members = getMembers();
  const idx = members.findIndex(m => m.id === memberId);
  if (idx === -1) return null;
  members[idx] = { ...members[idx], ...updates };
  saveToLS(LS_KEYS.MEMBERS, members);
  saveToLS(LS_KEYS.CURRENT_USER, members[idx]);
  return members[idx];
}

// Event Registrations
export function getEventRegistrations(): EventRegistration[] {
  return getFromLS<EventRegistration[]>(LS_KEYS.EVENT_REGS, []);
}

export function registerForEvent(data: EventRegistration): { success: boolean; message: string } {
  const regs = getEventRegistrations();
  if (regs.find(r => r.memberId === data.memberId && r.eventId === data.eventId)) {
    return { success: false, message: 'You are already registered for this event.' };
  }
  regs.push(data);
  saveToLS(LS_KEYS.EVENT_REGS, regs);
  return { success: true, message: 'Successfully registered for the event!' };
}

// Donations
export function saveDonation(data: DonationRecord) {
  const donations = getFromLS<DonationRecord[]>(LS_KEYS.DONATIONS, []);
  donations.push(data);
  saveToLS(LS_KEYS.DONATIONS, donations);
}

export function getDonations(): DonationRecord[] {
  return getFromLS<DonationRecord[]>(LS_KEYS.DONATIONS, []);
}

// ═══════════════════════════════════════════════
//  Contact Messages
// ═══════════════════════════════════════════════

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

export function saveContactMessage(data: Omit<ContactMessage, 'id' | 'date' | 'read'>): void {
  const messages = getContactMessages();
  messages.push({ ...data, id: `msg_${Date.now()}`, date: new Date().toISOString(), read: false });
  saveToLS('rsic_contact_messages', messages);
}

export function getContactMessages(): ContactMessage[] {
  return getFromLS<ContactMessage[]>('rsic_contact_messages', []);
}

export function markMessageRead(id: string): void {
  const messages = getContactMessages();
  const idx = messages.findIndex(m => m.id === id);
  if (idx !== -1) { messages[idx].read = true; saveToLS('rsic_contact_messages', messages); }
}

export function deleteContactMessage(id: string): void {
  const msgs = getContactMessages().filter(m => m.id !== id);
  saveToLS('rsic_contact_messages', msgs);
}

// ═══════════════════════════════════════════════
//  Admin Auth
// ═══════════════════════════════════════════════

export const ADMIN_CREDENTIALS = {
  email: 'admin@rizqara.org',
  password: 'rizqara878',
  name: 'RSIC Super Admin',
};

export interface AdminSession {
  email: string;
  name: string;
  loginTime: string;
}

export function loginAdmin(email: string, password: string): boolean {
  if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
    const session: AdminSession = { email, name: ADMIN_CREDENTIALS.name, loginTime: new Date().toISOString() };
    saveToLS('rsic_admin_session', session);
    return true;
  }
  return false;
}

export function getAdminSession(): AdminSession | null {
  return getFromLS<AdminSession | null>('rsic_admin_session', null);
}

export function logoutAdmin(): void {
  localStorage.removeItem('rsic_admin_session');
}

export function isAdminLoggedIn(): boolean {
  return getAdminSession() !== null;
}

// ═══════════════════════════════════════════════
//  Admin Member Management
// ═══════════════════════════════════════════════

export function deleteMember(memberId: string): boolean {
  const members = getMembers().filter(m => m.id !== memberId);
  saveToLS(LS_KEYS.MEMBERS, members);
  return true;
}

// ═══════════════════════════════════════════════
//  Admin CRUD — Programs, Projects, Achievements, Events, Blog, Gallery
// ═══════════════════════════════════════════════

const CRUD_KEYS = {
  PROGRAMS: 'rsic_admin_programs',
  PROJECTS: 'rsic_admin_projects',
  ACHIEVEMENTS: 'rsic_admin_achievements',
  EVENTS: 'rsic_admin_events',
  BLOG: 'rsic_admin_blog',
  GALLERY: 'rsic_admin_gallery',
};

// ── Programs ──────────────────────────────────
export type Course = (typeof PROGRAMS[0]['courses'][0]) & { _id?: string; customId?: string; id?: string };
export type Program = (typeof PROGRAMS[0]) & { _id?: string; customId?: string; courses: Course[] };
export function getAdminPrograms(): Program[] { return getFromLS<Program[]>(CRUD_KEYS.PROGRAMS, PROGRAMS); }
export function saveAdminPrograms(items: Program[]) { saveToLS(CRUD_KEYS.PROGRAMS, items); }
export function addAdminProgram(p: Program) { saveAdminPrograms([...getAdminPrograms(), p]); }
export function updateAdminProgram(id: string, u: Partial<Program>) { saveAdminPrograms(getAdminPrograms().map(p => p.id === id ? { ...p, ...u } : p)); }
export function deleteAdminProgram(id: string) { saveAdminPrograms(getAdminPrograms().filter(p => p.id !== id)); }

// ── Projects ──────────────────────────────────
export type Project = typeof PROJECTS[0] & { _id?: string, customId?: string };
export function getAdminProjects(): Project[] { return getFromLS<Project[]>(CRUD_KEYS.PROJECTS, PROJECTS); }
export function saveAdminProjects(items: Project[]) { saveToLS(CRUD_KEYS.PROJECTS, items); }
export function addAdminProject(p: Project) { saveAdminProjects([...getAdminProjects(), p]); }
export function updateAdminProject(id: string, u: Partial<Project>) { saveAdminProjects(getAdminProjects().map(p => p.id === id ? { ...p, ...u } : p)); }
export function deleteAdminProject(id: string) { saveAdminProjects(getAdminProjects().filter(p => p.id !== id)); }

// ── Achievements ──────────────────────────────
export type Achievement = typeof ACHIEVEMENTS[0] & { _id?: string, customId?: string };
export function getAdminAchievements(): Achievement[] { return getFromLS<Achievement[]>(CRUD_KEYS.ACHIEVEMENTS, ACHIEVEMENTS); }
export function saveAdminAchievements(items: Achievement[]) { saveToLS(CRUD_KEYS.ACHIEVEMENTS, items); }
export function addAdminAchievement(a: Achievement) { saveAdminAchievements([...getAdminAchievements(), a]); }
export function updateAdminAchievement(id: string, u: Partial<Achievement>) { saveAdminAchievements(getAdminAchievements().map(a => a.id === id ? { ...a, ...u } : a)); }
export function deleteAdminAchievement(id: string) { saveAdminAchievements(getAdminAchievements().filter(a => a.id !== id)); }

// ── Events ────────────────────────────────────
export type RSICEvent = typeof EVENTS[0] & { _id?: string, customId?: string };
export function getAdminEvents(): RSICEvent[] { return getFromLS<RSICEvent[]>(CRUD_KEYS.EVENTS, EVENTS); }
export function saveAdminEvents(items: RSICEvent[]) { saveToLS(CRUD_KEYS.EVENTS, items); }
export function addAdminEvent(e: RSICEvent) { saveAdminEvents([...getAdminEvents(), e]); }
export function updateAdminEvent(id: string, u: Partial<RSICEvent>) { saveAdminEvents(getAdminEvents().map(e => e.id === id ? { ...e, ...u } : e)); }
export function deleteAdminEvent(id: string) { saveAdminEvents(getAdminEvents().filter(e => e.id !== id)); }

// ── Blog Posts ────────────────────────────────
export type BlogPost = typeof BLOG_POSTS[0] & { _id?: string, customId?: string };
export function getAdminBlogPosts(): BlogPost[] { return getFromLS<BlogPost[]>(CRUD_KEYS.BLOG, BLOG_POSTS); }
export function saveAdminBlogPosts(items: BlogPost[]) { saveToLS(CRUD_KEYS.BLOG, items); }
export function addAdminBlogPost(p: BlogPost) { saveAdminBlogPosts([...getAdminBlogPosts(), p]); }
export function updateAdminBlogPost(id: string, u: Partial<BlogPost>) { saveAdminBlogPosts(getAdminBlogPosts().map(p => p.id === id ? { ...p, ...u } : p)); }
export function deleteAdminBlogPost(id: string) { saveAdminBlogPosts(getAdminBlogPosts().filter(p => p.id !== id)); }

// ── Gallery ───────────────────────────────────
export type GalleryItem = typeof GALLERY_ITEMS[0];
export function getAdminGallery(): GalleryItem[] { return getFromLS<GalleryItem[]>(CRUD_KEYS.GALLERY, GALLERY_ITEMS); }
export function saveAdminGallery(items: GalleryItem[]) { saveToLS(CRUD_KEYS.GALLERY, items); }
export function addAdminGalleryItem(item: GalleryItem) { saveAdminGallery([...getAdminGallery(), item]); }
export function updateAdminGalleryItem(id: number, u: Partial<GalleryItem>) { saveAdminGallery(getAdminGallery().map(i => i.id === id ? { ...i, ...u } : i)); }
export function deleteAdminGalleryItem(id: number) { saveAdminGallery(getAdminGallery().filter(i => i.id !== id)); }