/**
 * Default Data for All Features
 * Contains mock data for development and testing
 */

// ==================== AUTH DEFAULTS ====================
export const DEFAULT_AUTH_DATA = {
  authUser: null,
  loginStatus: {
    isLoading: false,
    failureReason: "",
    success: false,
  },
  registerState: {
    isLoading: false,
    failureReason: "",
    success: false,
  },
  deleteState: {
    isLoading: false,
    failureReason: "",
    success: false,
  },
  logoutState: {
    isLoading: false,
    failureReason: "",
    success: false,
  },
  premiumStatus: {
    isLoading: false,
    failureReason: "",
    success: false,
  },
  isCheckingAuth: false,
};

export const MOCK_USER = {
  id: "user_001",
  email: "user@example.com",
  firstName: "John",
  lastName: "Doe",
  profilePicture: "https://via.placeholder.com/150",
  bio: "Software Engineer | Interview Ready",
  role: "student",
  subscription: null,
  totalXp: 1200,
  badges: ["first-interview", "100-questions"],
  createdAt: new Date().toISOString(),
};

// ==================== MOCK INTERVIEW DEFAULTS ====================
export const DEFAULT_INTERVIEW_DATA = {
  isLoading: false,
  interviewData: {},
};

export const MOCK_INTERVIEW_QUESTIONS = [
  {
    id: 1,
    question: "What is React and why do we use it?",
    category: "React",
    difficulty: "beginner",
    answer:
      "React is a JavaScript library for building user interfaces with reusable components. We use it for its component-based architecture, virtual DOM, and efficient state management.",
  },
  {
    id: 2,
    question: "Explain the difference between state and props in React.",
    category: "React",
    difficulty: "intermediate",
    answer:
      "State is mutable data managed within a component, while props are immutable data passed from parent to child components.",
  },
  {
    id: 3,
    question: "What is the event loop in JavaScript?",
    category: "JavaScript",
    difficulty: "advanced",
    answer:
      "The event loop continuously checks if the call stack is empty and moves callbacks from the callback queue to the call stack.",
  },
  {
    id: 4,
    question: "Explain closures in JavaScript.",
    category: "JavaScript",
    difficulty: "intermediate",
    answer:
      "Closures are functions that have access to variables from another function's scope even after that function has returned.",
  },
  {
    id: 5,
    question: "What is a RESTful API?",
    category: "Backend",
    difficulty: "beginner",
    answer:
      "A RESTful API is an application programming interface that adheres to REST principles and uses HTTP requests for CRUD operations.",
  },
];

export const MOCK_INTERVIEW_SESSION = {
  sessionId: "session_001",
  candidateId: "user_001",
  interviewTitle: "React Developer Interview",
  startTime: new Date().toISOString(),
  endTime: null,
  duration: 0,
  status: "not-started",
  totalQuestions: 5,
  answeredQuestions: 0,
  score: 0,
  questions: MOCK_INTERVIEW_QUESTIONS,
  feedback: [],
};

// ==================== RECRUITER/JOBS DEFAULTS ====================
export const DEFAULT_JOB_STORE = {
  jobs: [],
  publicJobs: [],
  loading: false,
  error: null,
};

export const MOCK_JOBS = [
  {
    id: "job_001",
    title: "Senior React Developer",
    company: "Tech Corp",
    location: "San Francisco, CA",
    salary: "$120,000 - $160,000",
    description:
      "We are looking for an experienced React developer to join our team. Work on cutting-edge web applications with modern technologies.",
    requirements: [
      "5+ years of React experience",
      "Strong JavaScript knowledge",
      "Experience with Redux",
      "Strong understanding of REST APIs",
      "Git proficiency",
    ],
    responsibilities: [
      "Develop and maintain high-quality React components",
      "Collaborate with design and backend teams",
      "Participate in code reviews",
      "Optimize performance and fix bugs",
    ],
    jobType: "Full-time",
    experience: "5+ years",
    postedDate: new Date().toISOString(),
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    applicants: 45,
    status: "open",
    tags: ["React", "JavaScript", "Frontend"],
    Company: { name: "Tech Corp", logo: "https://via.placeholder.com/100" },
  },
  {
    id: "job_002",
    title: "Full Stack Developer",
    company: "StartUp Inc",
    location: "New York, NY",
    salary: "$90,000 - $130,000",
    description:
      "Looking for a passionate full-stack developer to build amazing products. Join a fast-growing startup.",
    requirements: [
      "3+ years of full-stack experience",
      "Node.js knowledge",
      "MongoDB experience",
      "React or Vue.js skills",
      "AWS familiarity",
    ],
    responsibilities: [
      "Build full-stack features end-to-end",
      "Design and implement APIs",
      "Database design and optimization",
      "Collaborate with product team",
    ],
    jobType: "Full-time",
    experience: "3+ years",
    postedDate: new Date().toISOString(),
    deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
    applicants: 32,
    status: "open",
    tags: ["Node.js", "React", "MongoDB"],
    Company: { name: "StartUp Inc", logo: "https://via.placeholder.com/100" },
  },
  {
    id: "job_003",
    title: "Backend Engineer",
    company: "Cloud Systems",
    location: "Remote",
    salary: "$100,000 - $150,000",
    description:
      "Build scalable backend systems and APIs for our cloud platform. Work with distributed systems.",
    requirements: [
      "4+ years of backend development",
      "Java or Python expertise",
      "Microservices architecture knowledge",
      "Docker and Kubernetes experience",
      "SQL and NoSQL databases",
    ],
    responsibilities: [
      "Design and build scalable microservices",
      "Optimize database queries and performance",
      "Implement CI/CD pipelines",
      "Mentor junior developers",
    ],
    jobType: "Full-time",
    experience: "4+ years",
    postedDate: new Date().toISOString(),
    deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
    applicants: 58,
    status: "open",
    tags: ["Java", "Python", "Microservices"],
    Company: { name: "Cloud Systems", logo: "https://via.placeholder.com/100" },
  },
  {
    id: "job_004",
    title: "UI/UX Designer",
    company: "Design Studio",
    location: "Europe, Remote",
    salary: "€50,000 - €75,000",
    description:
      "Create beautiful and functional user interfaces for mobile and web applications.",
    requirements: [
      "3+ years of UI/UX design experience",
      "Figma expertise",
      "Understanding of design systems",
      "User research knowledge",
    ],
    responsibilities: [
      "Design user interfaces and experiences",
      "Conduct user research and testing",
      "Create prototypes and wireframes",
      "Collaborate with developers",
    ],
    jobType: "Full-time",
    experience: "3+ years",
    postedDate: new Date().toISOString(),
    deadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
    applicants: 28,
    status: "open",
    tags: ["Figma", "Design", "UX"],
    Company: { name: "Design Studio", logo: "https://via.placeholder.com/100" },
  },
  {
    id: "job_005",
    title: "DevOps Engineer",
    company: "Tech Infrastructure",
    location: "Singapore",
    salary: "SGD 120,000 - 160,000",
    description:
      "Manage and optimize our cloud infrastructure. Work with AWS, Docker, and Kubernetes.",
    requirements: [
      "3+ years of DevOps experience",
      "AWS and Docker knowledge",
      "CI/CD pipeline experience",
      "Linux administration",
    ],
    responsibilities: [
      "Manage cloud infrastructure",
      "Implement CI/CD pipelines",
      "Monitor system performance",
      "Ensure security and compliance",
    ],
    jobType: "Full-time",
    experience: "3+ years",
    postedDate: new Date().toISOString(),
    deadline: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000).toISOString(),
    applicants: 22,
    status: "open",
    tags: ["DevOps", "AWS", "Docker"],
    Company: { name: "Tech Infrastructure", logo: "https://via.placeholder.com/100" },
  },
];

// ==================== SESSION MANAGEMENT DEFAULTS ====================
export const DEFAULT_SESSION_DATA = {
  isLoading: false,
  sessionData: [],
  participants: [],
  groupsData: [],
  isSendSessionLoading: false,
  isScheduleSessionLoading: false,
  isCreateGroupLoading: false,
  isUpdateSessionLoading: false,
  isremoveSessionLoading: false,
  isPublishSessionLoading: false,
  participantLoading: false,
  groupLoading: false,
};

export const MOCK_SESSION = {
  id: "session_001",
  title: "React Fundamentals Workshop",
  description: "Learn React basics with live coding session",
  instructor: {
    id: "teacher_001",
    name: "Jane Smith",
    avatar: "https://via.placeholder.com/150",
  },
  startTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  duration: 120,
  participants: 25,
  maxParticipants: 50,
  status: "scheduled",
  topics: ["React Hooks", "State Management", "Component Lifecycle"],
};

export const MOCK_SESSION_PARTICIPANTS = [
  {
    id: "user_001",
    name: "John Doe",
    email: "john@example.com",
    joinTime: new Date().toISOString(),
    status: "active",
  },
  {
    id: "user_002",
    name: "Jane Johnson",
    email: "jane@example.com",
    joinTime: new Date().toISOString(),
    status: "active",
  },
  {
    id: "user_003",
    name: "Bob Wilson",
    email: "bob@example.com",
    joinTime: new Date().toISOString(),
    status: "inactive",
  },
];

// ==================== STUDY SPACES DEFAULTS ====================
export const DEFAULT_STUDY_SPACE_DATA = {
  studySpace: [],
  studySpaceAdmin: null,
  allStudySpaces: [],
  publicStudySpaces: [],
  status: {
    checkStudySpace: { isLoading: false, error: null },
    create: { isLoading: false, error: null },
    fetchStudySpaceAdmin: { isLoading: false, error: null },
    exitSpace: { isLoading: false, error: null },
  },
};

export const MOCK_STUDY_SPACES = [
  {
    id: "space_001",
    name: "JavaScript Mastery",
    description: "A study space for JavaScript enthusiasts",
    admin: {
      id: "user_admin_001",
      name: "Admin User",
      avatar: "https://via.placeholder.com/150",
    },
    members: 150,
    maxMembers: 500,
    category: "Programming",
    visibility: "public",
    createdAt: new Date().toISOString(),
    avatar: "https://via.placeholder.com/200",
    coverImage: "https://via.placeholder.com/400x200",
    rules: ["Be respectful", "No spamming", "Share resources"],
  },
  {
    id: "space_002",
    name: "Web Development Community",
    description: "Learn web development with peers",
    admin: {
      id: "user_admin_002",
      name: "Dev Admin",
      avatar: "https://via.placeholder.com/150",
    },
    members: 320,
    maxMembers: 1000,
    category: "Web Development",
    visibility: "public",
    createdAt: new Date().toISOString(),
    avatar: "https://via.placeholder.com/200",
    coverImage: "https://via.placeholder.com/400x200",
    rules: ["Collaborate", "Help others", "Share knowledge"],
  },
];

// ==================== POSTS DEFAULTS ====================
export const DEFAULT_POST_DATA = {
  posts: [],
  status: {
    uploading: { error: null, loading: false },
    fetching: { error: null, loading: false },
  },
};

export const MOCK_POSTS = [
  {
    id: "post_001",
    spaceId: "space_001",
    author: {
      id: "user_001",
      name: "John Doe",
      avatar: "https://via.placeholder.com/150",
    },
    title: "Understanding JavaScript Promises",
    content:
      "Today I learned about promises and how they work with async/await. Let me share my insights...",
    attachments: [],
    likes: 24,
    comments: 5,
    reposts: 2,
    createdAt: new Date().toISOString(),
  },
  {
    id: "post_002",
    spaceId: "space_001",
    author: {
      id: "user_002",
      name: "Jane Johnson",
      avatar: "https://via.placeholder.com/150",
    },
    title: "React Hooks Best Practices",
    content:
      "Here are some best practices I follow when using React Hooks in production applications...",
    attachments: [
      {
        type: "image",
        url: "https://via.placeholder.com/300",
      },
    ],
    likes: 45,
    comments: 12,
    reposts: 8,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
];

// ==================== CHAT DEFAULTS ====================
export const DEFAULT_CHAT_DATA = {
  chatMessages: {},
  connectionStatus: {},
  sockets: {},
};

export const MOCK_CHAT_MESSAGES = {
  space_001: [
    {
      id: "msg_001",
      senderId: "user_001",
      senderName: "John Doe",
      senderAvatar: "https://via.placeholder.com/150",
      message: "Hey everyone! Just started learning JavaScript.",
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      type: "text",
    },
    {
      id: "msg_002",
      senderId: "user_002",
      senderName: "Jane Johnson",
      senderAvatar: "https://via.placeholder.com/150",
      message: "Welcome! Feel free to ask any questions.",
      timestamp: new Date(Date.now() - 3 * 60 * 1000).toISOString(),
      type: "text",
    },
    {
      id: "msg_003",
      senderId: "user_003",
      senderName: "Bob Wilson",
      senderAvatar: "https://via.placeholder.com/150",
      message: "Don't forget to check the resources pinned in the space!",
      timestamp: new Date(Date.now() - 1 * 60 * 1000).toISOString(),
      type: "text",
    },
  ],
};

// ==================== MEET DEFAULTS ====================
export const DEFAULT_MEET_DATA = {
  meets: {},
  meetState: { isLoading: false, errorMeg: null },
  fetchMeetState: { isLoading: false, errorMeg: null },
  joinState: { isLoading: false, errorMeg: null },
  createMeetState: { isLoading: false, errorMeg: null },
};

export const MOCK_MEET = {
  meetId: "meet_001",
  spaceId: "space_001",
  creatorId: "user_001",
  title: "Group Study Session",
  description: "Let's study React together",
  members: [
    {
      userId: "user_001",
      name: "John Doe",
      avatar: "https://via.placeholder.com/150",
      status: "active",
      mediaState: { video: true, audio: true, screen: false },
    },
    {
      userId: "user_002",
      name: "Jane Johnson",
      avatar: "https://via.placeholder.com/150",
      status: "active",
      mediaState: { video: true, audio: true, screen: false },
    },
  ],
  startTime: new Date().toISOString(),
  endTime: null,
  status: "active",
  maxParticipants: 10,
};

// ==================== RESOURCES DEFAULTS ====================
export const DEFAULT_RESOURCE_DATA = {
  resources: [],
  studySpaceResources: {},
  currentResource: null,
  loading: false,
  error: null,
  uploadProgress: 0,
  stats: null,
};

export const MOCK_RESOURCES = [
  {
    id: "resource_001",
    spaceId: "space_001",
    title: "JavaScript Fundamentals PDF",
    description: "Complete guide to JavaScript basics",
    type: "pdf",
    url: "https://example.com/js-fundamentals.pdf",
    fileSize: 2048576,
    uploadedBy: {
      id: "user_admin_001",
      name: "Admin User",
    },
    uploadedAt: new Date().toISOString(),
    downloads: 156,
    rating: 4.5,
  },
  {
    id: "resource_002",
    spaceId: "space_001",
    title: "React Hooks Video Tutorial",
    description: "Video series on React Hooks",
    type: "video",
    url: "https://example.com/react-hooks-tutorial.mp4",
    fileSize: 512 * 1024 * 1024,
    uploadedBy: {
      id: "user_001",
      name: "John Doe",
    },
    uploadedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    downloads: 89,
    rating: 4.8,
  },
  {
    id: "resource_003",
    spaceId: "space_002",
    title: "Web Development Roadmap",
    description: "Complete roadmap for web developers",
    type: "image",
    url: "https://example.com/web-dev-roadmap.png",
    fileSize: 5 * 1024 * 1024,
    uploadedBy: {
      id: "user_admin_002",
      name: "Dev Admin",
    },
    uploadedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    downloads: 245,
    rating: 4.7,
  },
];

// ==================== THEME DEFAULTS ====================
export const DEFAULT_THEME_DATA = {
  mode: "light",
  colors: {
    primary: "#3B82F6",
    secondary: "#1F2937",
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
    info: "#0EA5E9",
  },
};

// ==================== MEET EVENTS DEFAULTS ====================
export const MOCK_MEET_EVENTS = {
  EMIT: {
    MEET_CREATE: "meet-create",
    MEET_JOIN: "meet-join",
    MEET_LEFT: "meet-left",
    MEET_ENDED: "meet-ended",
    JOIN_MEET_ROOM: "join-meet-room",
    LEAVE_MEET_ROOM: "leave-meet-room",
    WEBRTC_OFFER: "webrtc-offer",
    WEBRTC_ANSWER: "webrtc-answer",
    WEBRTC_ICE_CANDIDATE: "webrtc-ice-candidate",
    WEBRTC_MEDIA_STATE: "webrtc-media-state",
    WEBRTC_SCREEN_SHARE: "webrtc-screen-share",
    CREATE_POOL: "create-pool",
    ADD_VOTE: "add-vote",
  },
  ON: {
    MEET_CREATED: "meet-created",
    NEW_MEET: "new-meet",
    MEET_JOINED: "meet-joined",
    MEET_LEFT: "meet-left",
    MEET_ENDED: "meet-ended",
    MEET_ERROR: "meet-error",
    JOIN_ERROR: "join-error",
    PARTICIPANT_JOINED: "participant-joined",
    PARTICIPANT_LEFT: "participant-left",
    WEBRTC_OFFER: "webrtc-offer",
    WEBRTC_ANSWER: "webrtc-answer",
    WEBRTC_ICE_CANDIDATE: "webrtc-ice-candidate",
    WEBRTC_MEDIA_STATE: "webrtc-media-state",
    WEBRTC_SCREEN_SHARE: "webrtc-screen-share",
    NEW_POOL: "new-pool",
  },
};

// ==================== ADMIN DEFAULTS ====================
export const DEFAULT_ADMIN_DATA = {
  users: [],
  spaces: [],
  jobs: [],
  reports: [],
  loading: false,
  error: null,
};

export const MOCK_ADMIN_DASHBOARD = {
  totalUsers: 1250,
  activeUsers: 890,
  totalSpaces: 45,
  totalJobs: 156,
  newSignups: 23,
  revenue: 45000,
};

// ==================== TEACHER DEFAULTS ====================
export const DEFAULT_TEACHER_DATA = {
  courses: [],
  students: [],
  assignments: [],
  loading: false,
  error: null,
};

export const MOCK_TEACHER_COURSE = {
  id: "course_001",
  title: "Advanced JavaScript",
  description: "Master advanced JavaScript concepts",
  instructor: {
    id: "teacher_001",
    name: "Jane Smith",
    avatar: "https://via.placeholder.com/150",
  },
  students: 45,
  modules: 12,
  progress: 65,
  startDate: new Date().toISOString(),
  endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
  status: "active",
};

// ==================== CERTIFICATE DEFAULTS ====================
export const DEFAULT_CERTIFICATE_DATA = {
  certificates: [],
  verifiedCertificates: [],
  loading: false,
  error: null,
};

export const MOCK_CERTIFICATE = {
  id: "cert_001",
  recipientName: "John Doe",
  recipientEmail: "john@example.com",
  title: "Advanced React Developer",
  issueDate: new Date().toISOString(),
  expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
  certificateCode: "MN-REACT-2024-001",
  issuer: "Learnova.ai",
  verified: true,
  verificationLink: "https://verify.Learnova.ai.com/cert/MN-REACT-2024-001",
};

// ==================== LEARN HUB DEFAULTS ====================
export const DEFAULT_LEARN_HUB_DATA = {
  courses: [],
  tutorials: [],
  loading: false,
  error: null,
};

export const MOCK_LEARN_HUB_COURSE = {
  id: "lh_course_001",
  title: "Python for Data Science",
  description:
    "Learn Python programming with focus on data science and machine learning",
  instructor: {
    id: "instructor_001",
    name: "Dr. Alice Cooper",
    avatar: "https://via.placeholder.com/150",
  },
  level: "intermediate",
  duration: "4 weeks",
  lessons: 24,
  students: 1230,
  rating: 4.8,
  price: 49.99,
  category: "Data Science",
  image: "https://via.placeholder.com/300x200",
};

// ==================== HACKATHON DEFAULTS ====================
export const DEFAULT_HACKATHON_DATA = {
  hackathons: [],
  loading: false,
  error: null,
};

export const MOCK_HACKATHONS = [
  {
    id: "hack_001",
    title: "CodeStorm 2025",
    organizer: "IIT Chennai",
    description: "Build innovative solutions for real-world problems using cutting-edge technology",
    longDescription:
      "Join CodeStorm 2025 - a global 48-hour hackathon bringing together developers, designers, and innovators. Compete for exciting prizes, learn from industry mentors, and build the next big thing!",
    image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=250&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=1200&h=400&fit=crop",
    logo: "https://via.placeholder.com/120",
    status: "Open",
    type: "In-Person",
    location: "Chennai, India",
    startDate: "2025-03-15",
    endDate: "2025-03-17",
    registrationDeadline: "2025-03-10",
    duration: "48 hours",
    participants: 450,
    maxParticipants: 500,
    prizePool: "₹5,00,000",
    minTeamSize: 1,
    maxTeamSize: 4,
    tags: ["Web Development", "AI/ML", "Mobile Apps"],
    themes: ["Sustainability", "Education", "Healthcare"],
    difficulty: "Intermediate",
    eligibility: "Open to all students and professionals",
    rules: "Teams must submit projects before the deadline. All code must be original.",
    websiteUrl: "https://www.codestorm.com",
    discordUrl: "https://discord.gg/codestorm",
    featured: true,
    trending: true,
  },
  {
    id: "hack_002",
    title: "AI Innovation Challenge",
    organizer: "Microsoft India",
    description: "Develop AI-powered solutions to solve healthcare challenges in rural India",
    longDescription:
      "This 72-hour hackathon focuses on using AI to solve healthcare challenges. Collaborate with healthcare professionals, access free Azure credits, and compete for prizes worth ₹3,00,000.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=400&fit=crop",
    logo: "https://via.placeholder.com/120",
    status: "Open",
    type: "Virtual",
    location: "Online",
    startDate: "2025-04-01",
    endDate: "2025-04-03",
    registrationDeadline: "2025-03-25",
    duration: "72 hours",
    participants: 234,
    maxParticipants: 300,
    prizePool: "₹3,00,000",
    minTeamSize: 1,
    maxTeamSize: 5,
    tags: ["AI/ML", "Healthcare", "Data Science", "Python"],
    themes: ["Healthcare", "Social Impact"],
    difficulty: "Advanced",
    eligibility: "Students and professionals worldwide",
    rules: "Original code only. Use of public APIs allowed.",
    websiteUrl: "https://www.ai-innovation.com",
    discordUrl: "https://discord.gg/aiinnovation",
    featured: true,
    trending: false,
  },
  {
    id: "hack_003",
    title: "FinTech Revolution",
    organizer: "Razorpay",
    description: "Create the next generation of financial technology solutions",
    longDescription:
      "Build innovative fintech solutions in this 48-hour hackathon. Access fintech APIs, mentorship from industry experts, and compete for amazing prizes!",
    image: "https://images.unsplash.com/photo-1559526324-593bc073d938?w=400&h=250&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1559526324-593bc073d938?w=1200&h=400&fit=crop",
    logo: "https://via.placeholder.com/120",
    status: "Open",
    type: "Hybrid",
    location: "Bangalore, India",
    startDate: "2025-03-22",
    endDate: "2025-03-24",
    registrationDeadline: "2025-03-18",
    duration: "48 hours",
    participants: 189,
    maxParticipants: 400,
    prizePool: "₹4,00,000",
    minTeamSize: 2,
    maxTeamSize: 4,
    tags: ["FinTech", "Blockchain", "APIs", "Payment"],
    themes: ["Payments", "Lending", "Investments"],
    difficulty: "Intermediate",
    eligibility: "Engineers and designers with 1+ year experience",
    rules: "Team members must be above 18 years.",
    websiteUrl: "https://www.fintech-revolution.com",
    discordUrl: "https://discord.gg/fintech",
    featured: true,
    trending: true,
  },
  {
    id: "hack_004",
    title: "WebAssembly Performance",
    organizer: "Mozilla Foundation",
    description: "Build high-performance web applications using WebAssembly and modern web APIs",
    longDescription:
      "Explore the power of WebAssembly in this 36-hour hackathon. Learn from Mozilla engineers and build blazing-fast web applications.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=250&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=1200&h=400&fit=crop",
    logo: "https://via.placeholder.com/120",
    status: "Open",
    type: "Virtual",
    location: "Online",
    startDate: "2025-03-20",
    endDate: "2025-03-21",
    registrationDeadline: "2025-03-18",
    duration: "36 hours",
    participants: 156,
    maxParticipants: 250,
    prizePool: "₹1,50,000",
    minTeamSize: 1,
    maxTeamSize: 3,
    tags: ["WebAssembly", "JavaScript", "Web Performance", "Rust"],
    themes: ["Performance", "Web Technologies"],
    difficulty: "Advanced",
    eligibility: "Intermediate to advanced developers",
    rules: "All projects must include WebAssembly components.",
    websiteUrl: "https://www.wasm-hack.com",
    discordUrl: "https://discord.gg/wasm",
    featured: false,
    trending: false,
  },
  {
    id: "hack_005",
    title: "Green Tech Innovation",
    organizer: "Google Climate Action",
    description: "Build sustainable technology solutions for environmental challenges",
    longDescription:
      "Use technology to tackle climate change. This 48-hour hackathon focuses on sustainable solutions. Mentorship from climate tech pioneers included!",
    image: "https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?w=400&h=250&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?w=1200&h=400&fit=crop",
    logo: "https://via.placeholder.com/120",
    status: "Open",
    type: "Hybrid",
    location: "San Francisco, USA",
    startDate: "2025-04-15",
    endDate: "2025-04-17",
    registrationDeadline: "2025-04-10",
    duration: "48 hours",
    participants: 312,
    maxParticipants: 500,
    prizePool: "$10,000 (USD)",
    minTeamSize: 1,
    maxTeamSize: 5,
    tags: ["Sustainability", "Climate Tech", "IoT", "Data Analytics"],
    themes: ["Climate", "Energy", "Waste Management"],
    difficulty: "Beginner to Intermediate",
    eligibility: "All skill levels welcome",
    rules: "Solutions must focus on environmental impact.",
    websiteUrl: "https://www.greentech-hack.com",
    discordUrl: "https://discord.gg/greentech",
    featured: true,
    trending: false,
  },
  {
    id: "hack_006",
    title: "Mobile App Blitz",
    organizer: "Flutter Community",
    description: "Build innovative mobile apps in just 24 hours!",
    longDescription:
      "A fast-paced 24-hour hackathon for mobile developers. Build with Flutter, React Native, or native platforms. Prizes for the most creative apps!",
    image: "https://images.unsplash.com/photo-1526374965328-7f5118342e3d?w=400&h=250&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1526374965328-7f5118342e3d?w=1200&h=400&fit=crop",
    logo: "https://via.placeholder.com/120",
    status: "Upcoming",
    type: "Virtual",
    location: "Online",
    startDate: "2025-05-01",
    endDate: "2025-05-02",
    registrationDeadline: "2025-04-28",
    duration: "24 hours",
    participants: 0,
    maxParticipants: 200,
    prizePool: "₹2,00,000",
    minTeamSize: 1,
    maxTeamSize: 3,
    tags: ["Flutter", "Mobile", "React Native", "iOS", "Android"],
    themes: ["Lifestyle", "Productivity", "Entertainment"],
    difficulty: "Beginner to Intermediate",
    eligibility: "All mobile developers",
    rules: "Must ship a working app.",
    websiteUrl: "https://www.mobile-blitz.com",
    discordUrl: "https://discord.gg/mobileblitz",
    featured: false,
    trending: true,
  },
];

// ==================== COMPOSITE DEFAULT STORE ====================
export const FULL_DEFAULT_DATA = {
  auth: DEFAULT_AUTH_DATA,
  interview: DEFAULT_INTERVIEW_DATA,
  jobs: DEFAULT_JOB_STORE,
  sessions: DEFAULT_SESSION_DATA,
  studySpaces: DEFAULT_STUDY_SPACE_DATA,
  posts: DEFAULT_POST_DATA,
  chat: DEFAULT_CHAT_DATA,
  meets: DEFAULT_MEET_DATA,
  resources: DEFAULT_RESOURCE_DATA,
  theme: DEFAULT_THEME_DATA,
  admin: DEFAULT_ADMIN_DATA,
  teacher: DEFAULT_TEACHER_DATA,
  certificates: DEFAULT_CERTIFICATE_DATA,
  learnHub: DEFAULT_LEARN_HUB_DATA,
  hackathons: DEFAULT_HACKATHON_DATA,
};

// ==================== COMBINED MOCK DATA ====================
export const FULL_MOCK_DATA = {
  users: [MOCK_USER],
  interviewQuestions: MOCK_INTERVIEW_QUESTIONS,
  interviewSessions: [MOCK_INTERVIEW_SESSION],
  jobs: MOCK_JOBS,
  hackathons: MOCK_HACKATHONS,
  sessions: [MOCK_SESSION],
  participants: MOCK_SESSION_PARTICIPANTS,
  studySpaces: MOCK_STUDY_SPACES,
  posts: MOCK_POSTS,
  chatMessages: MOCK_CHAT_MESSAGES,
  meets: [MOCK_MEET],
  resources: MOCK_RESOURCES,
  meetEvents: MOCK_MEET_EVENTS,
  adminDashboard: MOCK_ADMIN_DASHBOARD,
  teacherCourse: MOCK_TEACHER_COURSE,
  certificates: [MOCK_CERTIFICATE],
  learnHubCourses: [MOCK_LEARN_HUB_COURSE],
};

export default FULL_DEFAULT_DATA;
