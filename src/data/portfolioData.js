// All portfolio content lives here, separate from presentation logic.
// Everything below is carried over from the previous version of the site (descriptions,
// links, dates, tech lists) or is a short condensation of those same descriptions.
import resumeUrl from "../assets/resume 2.pdf";

export const profile = {
  name: "Samriddhi Tripathi",
  initials: "ST",
  role: "Full-stack developer",
  headline:
    "Full-stack developer building real-world applications, AI-powered experiences, and creative digital products.",
  photo: "/profile.jpg",
  bio: [
    "I'm Samriddhi Tripathi, a full-stack developer pursuing a B.Tech in Information Technology at Shree Ramswaroop Memorial College of Engineering.",
    "I'm currently a Full Stack Development Fellow at APYX, working on real product features, contributing to product design, and building intuitive, functional user experiences.",
    "I enjoy designing beautiful user interfaces while building efficient backend systems — from role-based ERP platforms and multi-agent AI products to Underdraw, the image-to-vector studio Team Cookies built for GDG Bit N Build '26.",
  ],
  availability:
    "I'm currently looking for internship opportunities, exciting projects and collaborations.",
  location: "Uttar Pradesh, India",
  email: "tripathisamriddhi20@gmail.com",
  phone: "+91 95808 83197",
  github: "https://github.com/samyyy25",
  linkedin: "https://www.linkedin.com/in/samriddhi-tripathi-b41029341",
  resume: resumeUrl,
  resumeFilename: "Samriddhi-Tripathi-Resume.pdf",
};

// Accent topics. Colours are defined in CSS (--accent-<topic>) so each theme can tune them.
export const topics = {
  ai: { label: "AI-powered experiences" },
  interface: { label: "Crafting digital interfaces" },
  foundation: { label: "Building foundations" },
  journey: { label: "My journey" },
  neutral: { label: "Explore" },
};

export const projects = [
  {
    id: "underdraw",
    title: "Underdraw",
    subtitle: "Image-to-vector reconstruction studio · formerly TraceCraft",
    meta: "AI/ML · Computer Vision · Creative Developer Tools",
    featured: true,
    image: "/projects/underdraw.jpg",
    thumb: "/projects/underdraw-thumb.jpg",
    imageSize: [1280, 770],
    tagline:
      "Turns raster images into editable vector artwork, then lets you replay how each shape draws the picture.",
    overview:
      "Underdraw is an AI-powered creative platform that transforms raster images and sketches into editable vector artwork using geometric shapes, polygons, and Bézier curves. It reconstructs images through layered drawing sequences, enabling users to explore the creative process through interactive editing, animation playback, and SVG exports.",
    problem:
      "Traditional image tracing produces SVGs that look accurate but are hard to edit: too many anchor points, overlapping paths, jagged curves, confusing layers, and no insight into how the artwork was rebuilt.",
    solution:
      "Underdraw rebuilds an image as independent, editable vector shapes, infers a plausible background-to-foreground drawing order, and lets you inspect, edit, compare and replay the reconstruction before exporting it.",
    features: [
      "Image-to-vector reconstruction of PNG, JPG and WebP images",
      "Geometric decomposition into independent filled shapes made of Bézier paths, each with a stable id",
      "Three detail levels: Simple, Balanced and Detailed",
      "Editable SVG artwork: recolour, move, resize, rotate, group, hide, lock and reorder shapes",
      "Shape layering with an inferred drawing order that respects overlaps",
      "Interactive editor with anchor and Bézier control-point editing, plus undo and redo",
      "Step-by-step reconstruction playback: play, pause, scrub and replay at up to 16× speed",
      "Image enhancement and preprocessing: straightening, lighting and contrast clean-up, denoising and classical sharpening",
      "Before/after comparison: side by side, slider and overlay",
      "Quality measurement with SSIM, PSNR and exact shape and anchor counts",
      "Export to SVG, PNG and MP4 (MP4 needs a Chromium-based browser)",
      "3D layer explorer built with Three.js",
      "Rules-based Copilot for plain-English shape edits (not a language model)",
      "Handwriting restoration, with an optional local TrOCR model for automatic reading",
    ],
    outcomes: [
      "Built for GDG Bit N Build '26 as Team Cookies: 2nd position at the Uttar Pradesh state-level round, then recognized among the Top 10 Best Performing Teams in Round 2.",
      "On a 502-shape character illustration, the Balanced reconstruction measured SSIM 0.94 against the original: visual similarity, not an editability score.",
      "Backed by an automated test suite: 177 backend tests, 216 frontend unit tests and a 160-test Playwright end-to-end suite (project status document, 1 Nov 2026).",
    ],
    quote: "Every image, drawn back stroke by stroke.",
    tech: ["React", "TypeScript", "Python", "FastAPI", "VTracer", "Three.js", "Tailwind CSS", "Vite"],
    techIds: [
      "react",
      "typescript",
      "vite",
      "tailwind",
      "threejs",
      "python",
      "fastapi",
      "vtracer",
      "computervision",
      "aiml",
      "render",
    ],
    github: "https://github.com/Samyyy25/Cookies_Final-Round",
    live: "https://underdraw.onrender.com/",
  },
  {
    id: "scholarly",
    title: "Scholarly",
    subtitle: "School ERP Management System",
    meta: "Full-stack web app",
    image: "/projects/scholarly.jpg",
    thumb: "/projects/scholarly-thumb.jpg",
    imageSize: [1024, 484],
    tagline:
      "One role-based platform for attendance, exams, fees and everyday school operations.",
    overview:
      "A production-ready, role-based School ERP platform with dedicated dashboards for Admins, Faculty, and Students to efficiently manage attendance, exams, marks, timetables, assignments, fees, notices, and academic records. Includes secure authentication, role-specific access, centralized student and staff management, real-time academic insights, and a streamlined interface for managing everyday school operations.",
    features: [
      "Dedicated dashboards for Admins, Faculty and Students",
      "Attendance, exams, marks, timetables and assignments",
      "Fees, notices and academic records",
      "Secure authentication with role-specific access",
      "Centralized student and staff management",
      "Real-time academic insights",
    ],
    outcomes: [
      "Production-ready platform with three role-based dashboards (Admin, Faculty, Student).",
    ],
    tech: ["Next.js 14", "PostgreSQL", "Prisma ORM", "NextAuth.js", "Tailwind CSS"],
    techIds: ["nextjs", "postgres", "prisma", "nextauth", "tailwind", "vercel"],
    github: "https://github.com/samyyy25/school-erp",
    live: "https://scholarlyerp.vercel.app/",
  },
  {
    id: "smritisetu",
    title: "SmritiSetu",
    subtitle: "Memory Bridge & Assistive Cognitive Care",
    meta: "Full-stack + AI engine",
    image: "/projects/smritisetu.jpg",
    thumb: "/projects/smritisetu-thumb.jpg",
    imageSize: [1280, 602],
    tagline:
      "A memory bridge for dementia patients and the family caregivers who support them.",
    overview:
      "A full-stack platform that helps dementia and memory-impaired patients preserve memories and reinforce daily routines, while giving family caregivers a dashboard to track progress. Patients use a simple memory app with live system health monitoring, and caregivers get metrics and alerts. A Python AI engine generates synthetic recall-interaction logs and scores them into a Cognitive Health Index (CHI) for cognitive health analytics.",
    problem:
      "Dementia and memory-impaired patients need help preserving memories and reinforcing daily routines, and their family caregivers need a way to track progress.",
    solution:
      "A simple memory app for patients with live system health monitoring, paired with a caregiver dashboard that surfaces metrics and alerts. A Python AI engine scores recall interactions into a Cognitive Health Index.",
    features: [
      "Simple memory app for patients",
      "Live system health monitoring",
      "Caregiver dashboard with metrics and alerts",
      "Python AI engine generating synthetic recall-interaction logs",
      "Cognitive Health Index (CHI) scoring for cognitive health analytics",
    ],
    tech: ["React", "Vite", "Tailwind CSS", "Node.js", "Express", "PostgreSQL", "Prisma", "Python"],
    techIds: ["react", "vite", "tailwind", "nodejs", "express", "postgres", "prisma", "python", "vercel"],
    github: "https://github.com/samyyy25/smritisetu",
    live: "https://smritisetu-phi.vercel.app/",
  },
  {
    id: "squawk",
    title: "SQUAWK",
    subtitle: "AI-Powered Aircraft Recovery System",
    meta: "AI agents",
    image: "/projects/squawk.jpg",
    thumb: "/projects/squawk-thumb.jpg",
    imageSize: [1024, 490],
    tagline:
      "Three collaborating AI agents turn an aircraft defect report into a vetted recovery plan in minutes.",
    overview:
      "When an aircraft is grounded (AOG), every minute of downtime costs an airline money. SQUAWK replaces the slow, manual 7-step recovery process with three collaborating AI agents — Sourcing, Documentation, and Logistics — plus a Validator that cross-checks pricing, compliance, and risk. It turns a defect report into a vetted recovery plan in minutes, with a human always making the final airworthiness call. \"AI suggests. Human decides.\"",
    problem:
      "When an aircraft is grounded (AOG), every minute of downtime costs an airline money — and the 7-step recovery process is slow and manual.",
    solution:
      "Three collaborating AI agents — Sourcing, Documentation and Logistics — plus a Validator that cross-checks pricing, compliance and risk. A human always makes the final airworthiness call.",
    features: [
      "Sourcing, Documentation and Logistics agents",
      "Validator cross-checking pricing, compliance and risk",
      "Defect report to vetted recovery plan",
      "Human-in-the-loop final airworthiness decision",
    ],
    outcomes: [
      "Turns a defect report into a vetted recovery plan in minutes, replacing a slow, manual 7-step process.",
    ],
    quote: "AI suggests. Human decides.",
    tech: ["AI Agents", "Python", "FastAPI", "Next.js", "Risk Validation"],
    techIds: ["aiagents", "aiint", "python", "fastapi", "nextjs", "render"],
    github: "https://github.com/samyyy25/squawk",
    live: "https://squawk-aog-recovery.onrender.com/",
  },
  {
    id: "relay",
    title: "RELAY",
    subtitle: "AI Emergency Interpreter",
    meta: "Real-time voice AI",
    image: "/projects/relay.jpg",
    thumb: "/projects/relay-thumb.jpg",
    imageSize: [1024, 444],
    tagline:
      "Real-time voice AI that keeps people and responders talking when everything else fails.",
    overview:
      "An AI-powered emergency communication platform that helps people communicate with responders during high-stress situations. Combines real-time voice AI, AI video triage (detects accidents, falls, injuries, drowsiness), multilingual translation, live GPS sharing, nearest hospital/police finder, and a responder bridge that shares incident summaries and context in real time. \"RELAY ensures communication doesn't fail when everything else does.\"",
    problem:
      "People struggle to communicate with responders during high-stress situations.",
    solution:
      "Real-time voice AI, AI video triage, multilingual translation and live GPS sharing, with a responder bridge that shares incident summaries and context in real time.",
    features: [
      "Real-time voice AI",
      "AI video triage — detects accidents, falls, injuries and drowsiness",
      "Multilingual translation",
      "Live GPS sharing",
      "Nearest hospital and police finder",
      "Responder bridge sharing incident summaries and context in real time",
    ],
    quote: "RELAY ensures communication doesn't fail when everything else does.",
    tech: ["Real-time Voice AI", "Video Triage", "GPS Tracking", "Next.js", "FastAPI"],
    techIds: ["voiceai", "aiint", "nextjs", "fastapi"],
    github: "https://github.com/samyyy25/Relay",
    live: "",
  },
  {
    id: "salespilot",
    title: "SalesPilot AI",
    subtitle: "Autonomous AI Sales Employee",
    meta: "Hackathon build",
    image: "/projects/salespilot.jpg",
    thumb: "/projects/salespilot-thumb.jpg",
    imageSize: [1024, 487],
    tagline:
      "A nine-agent AI sales employee, from lead sourcing to outreach to a live CRM pipeline.",
    overview:
      "A multi-agent AI sales employee built with LangGraph and FastAPI. It interviews you about your business, sources and qualifies leads, writes personalized outreach, runs simulated voice calls and WhatsApp conversations, manages a Kanban-style CRM pipeline, and reports on performance — all through a 9-agent pipeline orchestrated end to end. Built at a team hackathon (Team Cookies) as a fully working demo requiring zero setup.",
    features: [
      "Interviews you about your business",
      "Sources and qualifies leads",
      "Writes personalized outreach",
      "Simulated voice calls and WhatsApp conversations",
      "Kanban-style CRM pipeline",
      "Performance reporting",
    ],
    outcomes: [
      "9-agent pipeline orchestrated end to end.",
      "Built at a team hackathon (Team Cookies) as a fully working demo requiring zero setup.",
    ],
    tech: ["LangGraph", "FastAPI", "Python", "Anthropic", "OpenAI", "Groq"],
    techIds: ["langgraph", "aiagents", "aiint", "fastapi", "python"],
    github: "https://github.com/samyyy25/SalesPilot-AI",
    live: "",
  },
  {
    id: "vintner",
    title: "Vintner Finance",
    subtitle: "Voice-Powered AI Finance Assistant",
    meta: "Voice AI",
    image: "/projects/vintner.jpg",
    thumb: "/projects/vintner-thumb.jpg",
    imageSize: [800, 381],
    tagline:
      "Talk to your finances: a voice AI assistant on top of a live spending dashboard.",
    overview:
      "Vintner Finance is a voice-powered AI finance assistant designed to make personal financial management more conversational and accessible. It combines an interactive financial dashboard with voice-driven interactions, expense tracking, financial insights, and a modern user experience.",
    features: [
      "A conversational voice assistant, FinAssist, built on LiveKit Agents with Deepgram speech-to-text, Google Gemini and Murf Falcon text-to-speech",
      "Replies in the language you speak: English, Hindi or Hinglish",
      "Hands-free money tracking by voice: log spends and receipts, set a monthly salary, and ask for your balance and recent transactions, all synced live to the dashboard",
      "Interactive dashboard with total balance, spend today and this month, spend by category and a recent-transactions list",
      "Insights view with a category donut chart, monthly spending trend, share of income spent and a potential-savings estimate",
      "Savings tip card with general guidance (not personalised financial advice)",
      "Government-schemes tracker, with a hand-off to a scheme-specialist voice agent",
      "Consent-based caller memory and human escalation",
    ],
    tech: ["Next.js", "Python", "LiveKit Agents", "Murf Falcon TTS", "Deepgram", "Google Gemini", "Supabase", "Tailwind CSS", "TypeScript"],
    techIds: ["nextjs", "typescript", "tailwind", "python", "voiceai", "aiint"],
    github: "https://github.com/samyyy25/VINTNER-FINANCE",
    live: "",
  },
  {
    id: "fittyfit",
    title: "FittyFit",
    subtitle: "Fitness & wellness platform",
    meta: "Hackathon build",
    image: "/projects/fittyfit.jpg",
    thumb: "/projects/fittyfit-thumb.jpg",
    imageSize: [1280, 710],
    tagline: "A fitness dashboard with personalized guidance and progress tracking.",
    overview:
      "A smart fitness and wellness platform designed to help users track and manage their fitness journey. Users can monitor their health and fitness activities through an interactive dashboard, access personalized workout and nutrition guidance, track progress, and get insights to stay consistent with their goals. Includes an intuitive fitness dashboard, personalized recommendations, progress tracking, and tools to support a healthier lifestyle.",
    features: [
      "Interactive fitness dashboard",
      "Personalized workout and nutrition guidance",
      "Progress tracking and insights",
      "Personalized recommendations",
    ],
    outcomes: ["4th position among 50 teams at the Inter College Hackathon."],
    tech: ["React", "Bootstrap", "JavaScript", "CSS"],
    techIds: ["react", "bootstrap", "javascript", "vercel"],
    github: "",
    live: "https://fittyfitt.vercel.app/",
  },
  {
    id: "pulse",
    title: "Pulse",
    subtitle: "Task Management System",
    meta: "Full-stack web app",
    image: "/projects/pulse.jpg",
    thumb: "/projects/pulse-thumb.jpg",
    imageSize: [800, 628],
    tagline: "Full-stack task management for companies and employees.",
    overview:
      "Pulse – Task Management System is a full-stack web application designed for companies and employees to efficiently manage daily tasks and improve team productivity. It features secure authentication, task creation, updates, deletion, and tracking through an intuitive interface. Built with React, Node.js, Express.js, PostgreSQL, and Tailwind CSS, the application is deployed using Vercel, Render, and Railway, providing hands-on experience in full-stack development, REST APIs, authentication, and cloud deployment.",
    features: [
      "Secure authentication",
      "Task creation, updates, deletion and tracking",
      "Intuitive interface for companies and employees",
    ],
    outcomes: ["Deployed using Vercel, Render and Railway."],
    tech: ["React", "Node.js", "Express.js", "PostgreSQL", "Tailwind CSS"],
    techIds: ["react", "nodejs", "express", "postgres", "tailwind", "restapi", "vercel", "render", "railway"],
    github: "https://github.com/samyyy25/pulse-task-management",
    live: "https://pulse-task-management-82rn.vercel.app/",
  },
  {
    id: "logbook",
    title: "LogBook",
    subtitle: "Tech Blogging Platform",
    meta: "Full-stack web app",
    image: "/projects/logbook.jpg",
    thumb: "/projects/logbook-thumb.jpg",
    imageSize: [800, 648],
    tagline: "A full-stack tech blogging platform with secure authentication.",
    overview:
      "LogBook is a full-stack tech blogging platform that enables users to read, create, edit, and manage blog posts through a secure authentication system. Built with Next.js, TypeScript, PostgreSQL, Prisma ORM, and NextAuth.js, it features responsive design, protected routes, RESTful architecture, and efficient database management. The application is deployed on Vercel and provides hands-on experience in full-stack development, authentication, database integration, and modern web technologies.",
    features: [
      "Read, create, edit and manage blog posts",
      "Secure authentication with protected routes",
      "Responsive design",
      "RESTful architecture and efficient database management",
    ],
    outcomes: ["Deployed on Vercel."],
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma ORM", "NextAuth.js", "Tailwind CSS"],
    techIds: ["nextjs", "typescript", "postgres", "prisma", "nextauth", "tailwind", "restapi", "vercel"],
    github: "https://github.com/samyyy25/blog",
    live: "https://blog-six-zeta-35.vercel.app/",
  },
];

// Technologies, grouped by the topic cluster they sit in on the graph.
export const tech = [
  { id: "react", label: "React", topic: "interface" },
  { id: "nextjs", label: "Next.js", topic: "interface" },
  { id: "javascript", label: "JavaScript", topic: "interface" },
  { id: "typescript", label: "TypeScript", topic: "interface" },
  { id: "tailwind", label: "Tailwind CSS", topic: "interface" },
  { id: "vite", label: "Vite", topic: "interface" },
  { id: "bootstrap", label: "Bootstrap", topic: "interface" },
  { id: "threejs", label: "Three.js", topic: "interface" },

  { id: "nodejs", label: "Node.js", topic: "foundation" },
  { id: "express", label: "Express.js", topic: "foundation" },
  { id: "postgres", label: "PostgreSQL", topic: "foundation" },
  { id: "prisma", label: "Prisma ORM", topic: "foundation" },
  { id: "nextauth", label: "NextAuth.js", topic: "foundation" },
  { id: "restapi", label: "REST APIs", topic: "foundation" },
  { id: "mysql", label: "MySQL", topic: "foundation" },
  { id: "flask", label: "Flask", topic: "foundation" },
  { id: "vercel", label: "Vercel", topic: "foundation" },
  { id: "render", label: "Render", topic: "foundation" },
  { id: "railway", label: "Railway", topic: "foundation" },

  { id: "python", label: "Python", topic: "ai" },
  { id: "fastapi", label: "FastAPI", topic: "ai" },
  { id: "aiagents", label: "AI Agents", topic: "ai" },
  { id: "langgraph", label: "LangGraph", topic: "ai" },
  { id: "voiceai", label: "Voice AI & Conversational Interfaces", topic: "ai" },
  { id: "aiint", label: "AI Integrations", topic: "ai" },
  { id: "aiml", label: "AI / ML", topic: "ai" },
  { id: "computervision", label: "Computer Vision", topic: "ai" },
  { id: "vtracer", label: "VTracer", topic: "ai" },
];

export const experience = [
  {
    id: "apyx",
    short: "APYX Fellowship",
    type: "Fellowship",
    date: "August 2026 – Present",
    current: true,
    title: "Full Stack Development Fellow",
    org: "APYX",
    place: "Remote · Project-Based Fellowship",
    tagline: "Project-based remote fellowship building real product features.",
    description:
      "Selected as a Fellow for the APYX Fellowship 2026, a project-based remote fellowship focused on hands-on full-stack development experience. Working on real product features, contributing to product design, building intuitive and functional user experiences, creating wireframes and prototypes, and collaborating with the core team to improve usability and product quality.",
    techIds: [],
    projectIds: ["scholarly"],
  },
  {
    id: "murf-voice-agents",
    short: "Murf AI Voice Agents",
    type: "Certification",
    badge: "Challenge Completed",
    icon: "waveform",
    date: "August 2026",
    title: "10 Days of Voice Agents — Challenge Completion",
    org: "Murf AI",
    place: "AI Learning Experience",
    learningLabel: "Murf AI Voice Agents Challenge",
    tagline: "Completed Murf AI's 10-day voice-agent challenge, learning that connects to Vintner Finance.",
    description:
      "Successfully completed Murf AI's 10 Days of Voice Agents challenge in August 2026, strengthening my understanding of conversational AI, voice-agent workflows, and voice-driven user experiences. This learning aligns with my interest in building intelligent, accessible applications, including Vintner Finance, my voice-powered AI finance assistant.",
    relation: {
      projectId: "vintner",
      summary:
        "Voice-agent and conversational-AI learning that connects to Vintner Finance, my voice-powered finance assistant.",
      action: "Explore Related Project",
    },
    certificate: {
      src: "/certificates/murf-voice-agents-2026.png",
      filename: "murf-voice-agents-2026.png",
      alt: "Murf AI certificate of completion for the 10 Days of Voice Agents challenge, awarded to Samriddhi Tripathi, August 2026",
      issuer: "Murf AI",
      recipient: "Samriddhi Tripathi",
      program: "10 Days of Voice Agents",
      completion: "August 2026",
    },
    techIds: ["voiceai"],
    projectIds: ["vintner"],
  },
  {
    id: "srdt-2026",
    short: "SRDT Summer Training",
    type: "Training",
    date: "July 2026",
    title: "Software Development Summer Trainee",
    org: "Shri Ramswaroop Digital Technologies Pvt. Ltd.",
    tagline: "10-day full-stack training across Python, Flask, Next.js, React and PostgreSQL.",
    description:
      "Completed 10 Days Software Development Summer Training focused on Full Stack Development. Working with Python, Flask, MySQL, Git, GitHub, Bootstrap, Node.js, Next.js, React.js, PostgreSQL, Railway, Render, Vercel and modern frontend technologies while building real-world applications.",
    techIds: ["python", "flask", "mysql", "nodejs", "nextjs", "react", "postgres"],
  },
  {
    id: "outskill",
    short: "GenAI Mastermind",
    type: "Program",
    date: "July 2026",
    title: "Generative AI Mastermind",
    org: "Outskill",
    tagline: "Two-day, 16+ hour intensive on generative AI, LLMs and prompt engineering.",
    description:
      "Completed a 2-day Generative AI Mastermind by Outskill, where I explored Generative AI tools, prompt engineering, AI-powered marketing, SEO automation, and image/video generation. Through over 16 hours of intensive learning, I gained practical knowledge of Large Language Models, including tokenization, embeddings, self-attention, and response generation, while learning how to apply AI effectively in software development and productivity workflows.",
    techIds: ["aiint"],
  },
  {
    id: "ibm",
    short: "IBM Internship",
    type: "Internship",
    date: "July 2025",
    title: "IBM Developer Skills Network",
    org: "Virtual Internship",
    tagline: "Virtual internship in full-stack web development, mobile development and digital marketing.",
    description:
      "Completed IBM's Virtual Internship on Full Stack Web Development, Mobile Development and Digital Marketing. Learned frontend, backend integration, responsive UI and deployment.",
    techIds: [],
  },
  {
    id: "srdt-2025",
    short: "SRDT Training",
    type: "Training",
    date: "Aug 2025",
    title: "Full-Stack Development Summer Trainee",
    org: "Shri Ramswaroop Digital Technologies Pvt. Ltd. (SRDT Pvt. Ltd.)",
    tagline: "Full-stack summer training focused on Python and modern web technologies.",
    description:
      "Completed a Full-Stack Development Summer Training focused on Python and modern web technologies. Developed frontend components, backend logic, and basic API integrations while strengthening practical skills in database management, version control (Git & GitHub), and responsive UI development.",
    techIds: ["python"],
  },
  {
    id: "btech",
    short: "B.Tech, IT",
    type: "Education",
    date: "2024 – 2028",
    title: "Bachelor of Technology",
    org: "Shree Ramswaroop Memorial College of Engineering",
    tagline: "Pursuing a B.Tech in Information Technology.",
    description:
      "Currently pursuing B.Tech in Information Technology while continuously improving programming and software development skills.",
    techIds: [],
  },
];

export const achievements = [
  {
    id: "bit-n-build",
    short: "GDG Bit N Build '26",
    featured: true,
    team: "Team Cookies",
    badge: "2nd — State Level",
    badges: ["2nd — State Level", "Top 10 — Round 2"],
    date: "",
    place: "International hackathon",
    title: "GDG Bit N Build '26 — International Hackathon",
    tagline:
      "Team Cookies placed 2nd at the Uttar Pradesh state level, then was recognized among the Top 10 Best Performing Teams in Round 2.",
    description:
      "Competed in GDG Bit N Build '26, an international hackathon, as part of Team Cookies. Secured 2nd position in the Uttar Pradesh state-level round and advanced to the next stage, where our team was recognized among the Top 10 Best Performing Teams. Led the development of Underdraw, an AI-powered creative platform, while working through intensive development, testing, debugging, and product refinement under tight deadlines.",
    journey: [
      {
        label: "Round 1",
        title: "Uttar Pradesh state-level selection",
        result: "Secured 2nd position",
      },
      {
        label: "Advanced",
        title: "From the state-level selection to the international hackathon stage",
        result: "Advanced to compete internationally",
      },
      {
        label: "Round 2",
        title: "Best Performing Teams",
        result: "Recognized among the Top 10",
      },
    ],
    projectIds: ["underdraw"],
  },
  {
    id: "nerds-room",
    short: "Nerds Room Launch Hacks",
    badge: "2nd position",
    date: "Aug 19",
    place: "AIMT, Lucknow",
    title: "Nerds Room: Launch Hacks",
    tagline: "Built and pitched an AI Sales Agent platform in a single day.",
    description:
      "A full-day hackathon by Nerds Room, supported by FlutterFlow. Built an AI Sales Agent platform to help businesses handle leads through AI-powered voice calls and WhatsApp conversations — all in one place. Built and pitched the entire product in a single day, including last-minute fixes before presenting.",
    projectIds: ["salespilot"],
  },
  {
    id: "tnx",
    short: "TNX Codathon",
    badge: "2nd runner-up · ₹2000 prize",
    date: "Sep 16",
    place: "SRMCEM, Lucknow",
    title: "TNX Codathon",
    tagline: "2nd runner-up as Team Cookies among the event's top-performing teams.",
    description:
      "Secured 2nd Runner-Up at the TNX CODATHON held at SRMCEM, Lucknow, as part of Team Cookies. Worked collaboratively on developing and refining our solution within a limited time frame, contributing to the product development, UI design, feature integration, testing, and final presentation. The hackathon challenged us to turn our idea into a working solution while solving problems under time constraints and adapting quickly to feedback from mentors and judges. Our efforts earned us a place among the top-performing teams at the event.",
    projectIds: ["relay"],
  },
  {
    id: "hackwithup",
    short: "HackWithUP 2.0",
    badge: "5th position · $100 prize",
    date: "",
    place: "Lucknow",
    title: "HackWithUP 2.0 — RocketRide Buildathon",
    tagline: "Team TECHDIVAS reached the Grand Finale out of 500+ teams.",
    description:
      "Competed as Team TECHDIVAS against 500+ teams; advanced to the Grand Finale as one of the top 50+ teams.",
    projectIds: ["squawk"],
  },
  {
    id: "inter-college",
    short: "Inter College Hackathon",
    badge: "4th of 50 teams",
    date: "",
    place: "Lucknow",
    title: "Inter College Hackathon",
    tagline: "Built FittyFit with a team of collaborators and placed 4th among 50 teams.",
    description: "Built FittyFit, an innovative fitness platform, with a team of collaborators.",
    projectIds: ["fittyfit"],
  },
];

export const exploreEntries = [
  {
    id: "resume",
    title: "Resume",
    tagline: "Download my resume as a PDF.",
    action: { label: "Download resume", href: profile.resume, download: profile.resumeFilename },
  },
  {
    id: "github",
    title: "GitHub",
    tagline: "github.com/samyyy25",
    action: { label: "Open GitHub", href: profile.github, external: true },
  },
  {
    id: "linkedin",
    title: "LinkedIn",
    tagline: "Samriddhi Tripathi on LinkedIn.",
    action: { label: "Open LinkedIn", href: profile.linkedin, external: true },
  },
  {
    id: "contact",
    title: "Contact",
    tagline: "Let's build something amazing together.",
    action: { label: "Email me", href: `mailto:${profile.email}` },
  },
];

// Focus-mode categories (top-left selector). `accents` drive the legend dots.
export const focusCategories = [
  { id: "projects", label: "Projects", accents: ["neutral"] },
  { id: "skills", label: "Skills", accents: ["interface", "foundation", "ai"] },
  { id: "experience", label: "Experience", accents: ["journey"] },
  { id: "achievements", label: "Achievements", accents: ["journey"] },
  { id: "about", label: "About me", accents: ["neutral"] },
];
