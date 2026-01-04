import { Children } from "react";
import {
  HtmlIcon,
  CssIcon,
  JavascriptIcon,
  CodeIcon,
  ReactIcon,
  VueIcon,
  StorageIcon,
  NodeIcon,
  KotlinIcon,
  AndroidIcon,
  TailwindIcon,
  BootstrapIcon,
  GitHubIcon,
  GitIcon,
  FirebaseIcon,
  CloudIcon,
  WebIcon,
} from "../icons/index";
import { FileType } from "lucide-react";

const INITIAL_Z_INDEX = 100; // starting z-index

// Navigation items
const navItems = [
  { id: 1, title: "About", type: "about" },
  { id: 2, title: "Contact", type: "contact" },
  { id: 3, title: "Resume", type: "resume" },
];

// Status icons (battery, Wi-Fi, etc.)
const navIcons = [
  { id: 1, img: "/images/battery.png" },
  { id: 2, img: "/images/wi-fi.png" },
  { id: 3, img: "/images/search.png" },
  { id: 4, img: "/images/switch.png" },
];

// Dock applications
const dockApps = [
  { id: "finder", name: "Portfolio", icon: "Finder.png", canOpen: true },
  { id: "videos", name: "Videos", icon: "VideoFolder.png", canOpen: true },
  { id: "safari", name: "Video", icon: "Safari.png", canOpen: true },
  { id: "terminal", name: "Skills", icon: "Terminal.png", canOpen: true },
  { id: "gallery", name: "Gallery", icon: "Photos.png", canOpen: true },
  { id: "contact", name: "Contact", icon: "Contact.png", canOpen: true },
  { id: "trash", name: "Archive", icon: "Trash.png", canOpen: true },
];

const Skills = {
  frontend: [
    { id: 1, title: "HTML5", icon: HtmlIcon },
    { id: 2, title: "CSS3", icon: CssIcon },
    { id: 3, title: "JavaScript", icon: JavascriptIcon },
    { id: 4, title: "React JS", icon: ReactIcon },
    { id: 5, title: "Vite JS", icon: VueIcon },
    { id: 6, title: "Tailwind CSS", icon: TailwindIcon },
    { id: 7, title: "Bootstrap", icon: BootstrapIcon },
    { id: 8, title: "React Native", icon: ReactIcon },
    { id: 9, title: "Netlify", icon: CloudIcon },
  ],
  backend: [
    { id: 10, title: "Node JS", icon: NodeIcon },
    { id: 11, title: "Express JS", icon: WebIcon },
    { id: 12, title: "PHP", icon: CodeIcon },
  ],
  database: [
    { id: 13, title: "SQL", icon: StorageIcon },
    { id: 14, title: "MongoDB", icon: StorageIcon },
    { id: 15, title: "Firebase", icon: FirebaseIcon },
  ],
  mobile: [
    { id: 16, title: "Kotlin Multiplatform", icon: KotlinIcon },
    { id: 17, title: "Android", icon: AndroidIcon },
  ],
  versionControl: [
    { id: 18, title: "Git VCS", icon: GitIcon },
    { id: 19, title: "GitHub", icon: GitHubIcon },
  ],
  languages: [
    { id: 20, title: "C", icon: CodeIcon },
    { id: 21, title: "C++", icon: CodeIcon },

    { id: 22, title: "Java", icon: CodeIcon },
  ],
};

// Window configuration
const WINDOW_CONFIG = {
  finder: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  videos: {
    isOpen: false,
    minimized: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
  },
    about: { isOpen: false },

  safari: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  terminal: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  photos: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  contact: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  trash: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  resume: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  txtfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  imgfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  images: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  gallery: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null }, // <- Add this
};

const blogPost = [
  {
    id: 1,
    title: "C Programming Full Playlist (Assamese Language)",
    date: "Oct 2024",
    image:
      "https://images.unsplash.com/photo-1635775017492-1eb935a082a4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://youtu.be/OCPDkc2yx84?si=sKmkEuneiKJd937Q",
  },

  {
    id: 2,
    title: "Educational Guide – Complete Learning Playlist",
    date: "Nov 2024",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
    link: "https://youtube.com/playlist?list=PLiiXfeQDiXr6bn67pg-bZ2gTPV4jV2snY&si=GimmAmvdP33KMa4N",
  },
  {
    id: 3,
    title: "How to become a web developer in Assamese",
    date: "Nov 2024",

    image:
      "https://images.unsplash.com/photo-1590608897129-79da98d15969?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://youtu.be/7B1k1WJe5tk?si=4ZPj7N-Y_PccIUmd",
  },
];
//Projects
const WORK_LOCATION = {
  id: 1,
  type: "work",
  name: "Work",
  icon: "/Text.png",
  kind: "folder",
  children: [
    // StayMark
    {
      id: 1,
      name: "StayMark Web App",
      icon: "/Text.png",
      kind: "folder",
      position: "top-10 left-5",
      windowPosition: "top-[15vh] right-20",
      children: [
        {
          id: 1,
          name: "StayMark Web App",
          icon: "/Text.png",
          kind: "file",
          filetype: "text",
          position: "top-5 left-10",

          // ★ NEW FIELDS
          image: "StayMarks.png",
          live: "https://staymark-1.onrender.com",
          github: "https://github.com/Jayanta111/StayMark",

          description: [
            "StayMark is a room-listing platform built with EJS, Node.js, HTML, and Bootstrap.",
            "Authentication and session management implemented using Passport.js with signup/login flows.",
            "Supports role-based listings and access control (hosts can create listings; users can browse and inquire).",
            "Features: create/manage room listings, upload images, booking inquiries, and role-based UI.",
          ],
        },
      ],
    },

    // Find Your Driver
    {
      id: 2,
      name: "Find Your Driver",
      icon: "/Text.png",
      kind: "folder",
      position: "top-28 left-16",
      windowPosition: "top-[20vh] right-[15vw]",
      children: [
        {
          id: 1,
          name: "FindYourDriver.txt",
          icon: "/Text.png",
          kind: "file",
          filetype: "text",
          position: "top-5 left-8",

          // ★ NEW FIELDS
          image: "FYD.jpeg",
          live: "https://findyourdriver-demo.vercel.app",
          github: "https://github.com/your/find-your-driver",

          description: [
            "Find Your Driver is an on-demand driver booking system similar to Ola/Uber.",
            "Users can hire drivers for daily, hourly, or long trips.",
            "Features: real-time availability, driver verification, booking history, secure login.",
            "Tech: MERN Stack with JWT auth, MongoDB, and Firebase OTP integration.",
            "Admin dashboard for driver onboarding and trip management.",
          ],
        },
      ],
    },

    // AI Teachers
    {
      id: 3,
      name: "AI Teachers",
      icon: "/Text.png",
      kind: "folder",
      position: "top-52 left-20",
      windowPosition: "top-[25vh] right-[18vw]",
      children: [
        {
          id: 1,
          name: "AITeachers.txt",
          icon: "/Text.png",
          kind: "file",
          filetype: "text",
          position: "top-5 left-8",

          // ★ NEW FIELDS
          image: "AI.png",
          live: "https://personalaiteacher.netlify.app/",
          github: "https://github.com/Jayanta111/Personal-AI",

          description: [
            "AI Teachers is an AI-powered teaching assistant that explains concepts, generates notes, quizzes, and examples.",
            "Built for students preparing for exams, assignments, and learning new topics.",
            "Tech: HTML + Gemini API + Tailwind.",
            "Use cases: quick revision, topic breakdown, MCQ generation, study guides.",
          ],
        },
      ],
    },

    // Vionex (Video Conferencing)
    {
      id: 4,
      name: "Vionex (Video Conferencing)",
      icon: "/Text.png",
      kind: "folder",
      position: "top-5 left-56",
      windowPosition: "top-[18vh] right-[26vw]",
      children: [
        {
          id: 1,
          name: "Vionex.txt",
          icon: "/Text.png",
          kind: "file",
          filetype: "text",
          position: "top-5 left-8",

          image: "Vionex.png",
          live: "https://frontend-vl8p.vercel.app/286730",
          github: "https://github.com/Jayanta111/frontend",

          description: [
            "Vionex is a modern, high-performance video-conferencing platform designed for seamless communication.",
            "Built for creators, teams, startups, and classrooms with instant connection and HD streaming.",
            "Key Features:",
            "• HD video & echo-free audio",
            "• One-click meeting rooms",
            "• End-to-end encryption",
            "• Screen sharing & collaboration tools",
            "• Real-time chat + meeting notes",
            "• Works on Web, Mobile & Desktop",
            "• Low bandwidth optimization",
            "Tech: React + WebRTC + Node.js signaling server + Tailwind + Firebase/Auth.",
          ],
        },
      ],
    },

    // FinWare (KMP App)
    {
      id: 5,
      name: "FinWare",
      icon: "/Text.png",
      kind: "folder",
      position: "top-40 left-56",
      windowPosition: "top-[22vh] right-[10vw]",
      children: [
        {
          id: 1,
          name: "FinWare.txt",
          icon: "/Text.png",
          kind: "file",
          filetype: "text",
          position: "top-5 left-8",

          // ★ NEW FIELDS
          image: "/projects/finware.png",
          live: "https://finware-app-demo.com",
          github: "https://github.com/your/finware",

          description: [
            "FinWare is a cross-platform Kotlin Multiplatform app for Financial Literacy & Fraud Awareness.",
            "Modules: Learning Center, Fraud Simulator, Behavioral Alerts, OTP Login, Admin CMS.",
            "Firebase Auth, Firestore, Storage, Cloud Functions fully integrated.",
            "Admin panel uses Gemini AI to auto-generate multilingual content (Hindi, English, Punjabi).",
          ],
        },
      ],
    },
  ],
};

export const ABOUT_LOCATION = {
  id: 1,
  type: "about",
  name: "About Me",
  icon: "/Profile.jpg",
  kind: "file",
  filetype: "markdown",
  position: "top-10 left-10",
  windowPosition: "top-[12vh] left-[20vw]",
  description: [
    " 👋 Hey, I'm Jayanta Chungkrang",
    "MERN Stack Developer",
    "I'm a passionate MERN Stack Developer currently pursuing a B.Tech in Computer Science and Engineering. I love turning ideas into impactful web applications and crafting seamless digital experiences.",
    " 💻 What I Do",
    "I specialize in building dynamic, end-to-end web applications using:",
    "- MongoDB",
    "- Express.js",
    "- React.js",
    "- Node.js",
  ],
};
 const educationData = [
  {
    id: 1,
    title: "B.Tech (CSE)",
    institution: "Punjab Technical University",
    year: "2024 - Present",
    image: "/PTU.jpg",
  },
  {
    id: 2,
    title: "Diploma in Computer Engineering",
    institution: "Nowgong Polytechnic, Assam",
    year: "2021 - 2024",
    image: "/Nowgong Poly.jpg",
  },
   {
    id: 2,
    title: " 12th Standard",
    institution: "Dhemaji  College, Assam",
    year: "2017 - 2019",
    image: "/Dhemaji College.jpeg",
  },
];

 const achievementData = [
  {
    id: 1,
    title: "Former Elected General Secretary of Nowgong Polytechnic Student Union",
    image:"/GS.jpg",
    description:
      "As a former GS, I developed strong leadership and organizational skills by managing student activities, coordinating events, and representing student interests. This experience enhanced my ability to work in a team, communicate effectively, and handle responsibilities under pressure.",
  },
  
  {
    id: 2,
    title: "Full Stack MERN Developer",
    image:"MERN-Stack-Development.png",
    description:
      "Developed full MERN projects including booking systems & admin dashboards.",
  },
];

//Location
const locations = {
  work: WORK_LOCATION,
  about: ABOUT_LOCATION,
  // resume:RESUME_LOCATION,
  // trash:TRASH_LOCATION,
};
const images = [
  { id: 1, src: "/StayMarks.png", title: "StayMark Web App" },
  { id: 2, src: "/AI.png", title: "AI Teacher" },
  { id: 3, src: "/Vionex.png", title: "Vionex" },
  { id: 4, src: "/FYD.jpeg", title: "Find Your Driver" },
  { id: 5, src: "/Recipe Finder.png", title: "Recipe Finder" },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80",
    title: "Sunset",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=400&q=80",
    title: "Books",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1485217988980-11786ced9454?auto=format&fit=crop&w=400&q=80",
    title: "Coffee",
  },
];
 const videos = [
  {
    id: 1,
    title: "StayMarks Video",
    url: "https://player.cloudinary.com/embed/?cloud_name=dwr5flpva&public_id=StayMarks_ozllmo&profile=cld-default",
   thumbnail:"/StayMarks.png"
  },
  {
    id: 2,
    title: "Recipe Finder ",
    url: "https://player.cloudinary.com/embed/?cloud_name=dwr5flpva&public_id=Recipe%20Finder&profile=cld-default",
     thumbnail:"/Recipe Finder.png"

  }
];
export const socialLinks = [
  {
    id: 1,
    name: "YouTube",
    url: "https://www.youtube.com/@jayantachungkrang",
    icon: "youtube",
  },
  {
    id: 2,
    name: "GitHub",
    url: "https://github.com/jayanta111",
    icon: "github",
  },
  {
    id: 3,
    name: "Instagram",
    url: "https://www.instagram.com/jayanta__019/",
    icon: "instagram",
  },
  {
    id: 4,
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/jayanta-chungkrang/",
    icon: "linkedin",
  },
  {
    id: 5,
    name: "LeetCode",
    url: "https://leetcode.com/jayanta111/",
    icon: "leetcode",
  },
  {
    id: 6,
    name: "BuyMeACoffee",
    url: "https://buymeacoffee.com/jayanta/e/424372",
    icon: "buymeacoffee",
  },
];


export {
  navItems,
  navIcons,
  dockApps,
  WINDOW_CONFIG,
  INITIAL_Z_INDEX,
  Skills,
  blogPost,
  locations,
  images,
  videos,
  educationData,
  achievementData,
};
