export const en = {
  nav: {
    about: "About",
    projects: "Projects",
    education: "Education",
    experience: "Experience",
    skills: "Skills",
    life: "Life",
    contact: "Contact",
    media: "Media",
    travel: "Travel",
  },
  modeSwitch: {
    work: "Work",
    life: "Life",
  },
  hero: {
    topLabel: "Xinyu Tian | Phoenix",
    heading: "This is for you to know who I am",
    description:
      "NUS Master's student working on computer vision, AI research, and content creation. I also create content that reflects study life, travel, and personal growth in Singapore.",
    explore: "Explore Projects",
    contact: "Contact Me",
  },
  lifeHero: {
    topLabel: "Xinyu Tian | Phoenix",
    heading: "This is for you to know what I like",
    description:
      "This mode showcases my self-media direction, travel documentation, and personal reflections while keeping one consistent personal brand.",
    explore: "Explore Media",
    contact: "Contact Me",
  },
  about: {
    label: "About Me",
    heading: "NUS Master's student exploring computer vision, AI, and digital storytelling",
    body: "I enjoy building data-driven vision systems for industrial imaging, and I care deeply about turning research into working solutions. Outside of engineering, I create travel and study content that reflects growth and life in Singapore.",
  },
  focusAreas: [
    {
      title: "Computer Vision",
      description: "Building models for segmentation, anomaly detection, and industrial image analysis.",
    },
    {
      title: "AI Research",
      description: "Developing practical AI solutions with a strong emphasis on reliability and explainability.",
    },
    {
      title: "Life & Storytelling",
      description: "Sharing study life, travel experiences, and personal reflections through multimedia.",
    },
  ],
  projectBadge: "Case study",
  projectsHeading: "Selected work and research highlights",
  viewDetails: "View details ->",
  education: {
    label: "Education",
    heading: "Academic background and qualifications",
    entries: [
      {
        degree: "Master of Physics for Technology",
        field: "Science",
        institution: "National University of Singapore",
        period: "Aug 2025 – Jan 2027",
        location: "Singapore",
        website: "https://www.nus.edu.sg",
        description:
          "Research focus on computer vision, semantic segmentation, and AI-driven solutions for industrial imaging systems.",
        bullets: [
          "Researching deep learning-based semantic segmentation and anomaly detection for industrial SEM imaging.",
          "Developing end-to-end CV pipelines with PyTorch for deployment-ready prototypes.",
          "Collaborating with research groups on AI-driven solutions for advanced manufacturing quality control.",
        ],
        skills: ["Computer Vision", "Deep Learning", "Machine Learning", "Python", "PyTorch", "OpenCV"],
      },
      {
        degree: "Bachelor of Science",
        field: "Applied Physics",
        institution: "Southwest Jiaotong University",
        period: "Sep 2021 – Jun 2025",
        location: "Chengdu, China",
        website: "https://www.swjtu.edu.cn",
        description:
          "Focused on applied physics research and practice during undergraduate studies, building a solid theoretical foundation and experimental skills.",
        bullets: [
          "Completed coursework in optics, electromagnetism, quantum mechanics, and computational physics.",
          "Conducted experimental research in laboratory settings, developing strong data analysis and instrumentation skills.",
          "Graduated with honours, building a foundation for graduate-level research in applied sciences.",
        ],
        skills: ["C", "C++", "Python", "MATLAB", "NumPy", "Public Speaking"],
      },
    ],
  },
  experience: {
    label: "Experience",
    heading: "Internships and professional experience",
  },
  skills: {
    label: "Skills",
    heading: "Technical skills and languages",
    groups: {
      programming: "Programming",
      cvml: "Computer Vision & ML",
      tools: "Tools",
      languages: "Languages",
    },
    languages: [
      { name: "Mandarin", level: "Native", flag: "🇨🇳" },
      { name: "English", level: "Professional", flag: "🇬🇧" },
      { name: "Cantonese", level: "Beginner", flag: "🇭🇰" },
      { name: "Japanese", level: "Beginner", flag: "🇯🇵" },
    ],
  },
  gallery: {
    label: "Life & Travel",
    heading: "Stories from campus, Singapore, and beyond",
    description:
      "This section is a great place to link to blog posts, videos, or reflections that show your personality and journey.",
  },
  lifeHighlights: [
    "NUS study life and research reflections",
    "Singapore food, culture, and city stories",
    "Travel ideas from Asia and beyond",
  ],
  media: {
    label: "Media",
    heading: "Media brand matrix and featured video highlights",
    description:
      "Use this module to present your creator ecosystem and route traffic across different media channels.",
    matrix: [
      { name: "YouTube", role: "Long-form vlogs and study/life episodes" },
      { name: "Instagram", role: "Visual storytelling and travel moments" },
      { name: "X", role: "Short thoughts, updates, and AI/life snippets" },
      { name: "RedNote", role: "Lifestyle and city guides" },
    ],
    featuredLabel: "Featured Videos",
    featuredMain: {
      title: "NUS Study Week: Real Routines in Singapore",
      description: "A representative video slot for your current most popular content.",
    },
    clipsLabel: "Highlights",
    clips: [
      "Singapore campus day in 60 seconds",
      "Top 5 creator spots in Singapore",
      "Weekly growth reflection vlog",
    ],
  },
  travel: {
    label: "Travel",
    heading: "A swipeable travel gallery",
    description: "A horizontal gallery for destinations, stories, and memorable frames.",
    cards: [
      { title: "Singapore City Walk", subtitle: "Urban textures and daily rhythm" },
      { title: "Southeast Asia Trip", subtitle: "Short journey, strong visual story" },
      { title: "Coastline Escape", subtitle: "Slow moments and reset" },
      { title: "Mountain Weekend", subtitle: "Nature, pace, and reflection" },
    ],
  },
  contact: {
    label: "Contact",
    heading: "Let's connect",
    description:
      "I'm open to collaboration, internship opportunities, and research conversations in computer vision and AI. Reach out if you want to work together or discuss ideas.",
    emailLabel: "Email",
    connectLabel: "Connect with me",
    back: "Back to top",
  },
  contactCard: {
    title: "Contact me",
    email: "xinyu.tian.phoenix@gmail.com",
  },
  languageToggle: {
    switchToZh: "简体中文",
    switchToEn: "English",
  },
  devBanner: "This website is still under development",
};

export type Translation = typeof en;
