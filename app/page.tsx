"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Globe, ChevronDown, Check, X } from "lucide-react";
import { programmingSkills, cvmlSkills, toolsSkills, type SkillItem } from "./data/skills";
import { experiences, type ExperienceItem } from "./data/experience";

type SiteLanguage = "en" | "zh";
type SiteMode = "work" | "life";

const LOCALES: { code: SiteLanguage; label: string; short: string }[] = [
  { code: "en", label: "English", short: "EN" },
  { code: "zh", label: "简体中文", short: "ZH" },
];

const translations = {
  en: {
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
      heading: "This is for you to know who I am.",
      description:
        "NUS Master's student working on computer vision, AI research, and content creation. I also create content that reflects study life, travel, and personal growth in Singapore.",
      explore: "Explore Projects",
      contact: "Contact Me",
    },
    lifeHero: {
      topLabel: "Xinyu Tian | Phoenix",
      heading: "This is for you to know what I like.",
      description:
        "This mode showcases my self-media direction, travel documentation, and personal reflections while keeping one consistent personal brand.",
      explore: "Explore Media",
      contact: "Contact Me",
    },
    about: {
      label: "About Me",
      heading: "NUS Master's student exploring computer vision, AI, and digital storytelling",
      body:
        "I enjoy building data-driven vision systems for industrial imaging, and I care deeply about turning research into working solutions. Outside of engineering, I create travel and study content that reflects growth and life in Singapore.",
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
    projects: [
      {
        title: "SEM Image Defect Detection",
        description:
          "Semantic segmentation and defect detection for industrial SEM imagery, focusing on robustness and deployment-ready design.",
        tags: ["Computer Vision", "PyTorch", "U-Net"],
        href: "#",
      },
      {
        title: "Logistics Analytics Dashboard",
        description:
          "A data pipeline and dashboard for logistics tracking, KPI visualization, and operational insights.",
        tags: ["Data Analytics", "Python", "Visualization"],
        href: "#",
      },
      {
        title: "NUS Life & Travel Vlogs",
        description:
          "Short-form video content documenting campus life, Singapore culture, and travel stories.",
        tags: ["Content Creation", "Video", "Storytelling"],
        href: "#",
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
          description: "Research focus on computer vision, semantic segmentation, and AI-driven solutions for industrial imaging systems.",
        },
        {
          degree: "Bachelor of Science",
          field: "Applied Physics",
          institution: "Southwest Jiaotong University",
          period: "Sep 2021 – Jun 2025",
          location: "Chengdu, China",
          description: "Focused on applied physics research and practice during undergraduate studies, building a solid theoretical foundation and experimental skills.",
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
        { name: "Mandarin Chinese", level: "Native" },
        { name: "English", level: "Professional" },
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
        { name: "X", role: "Short thoughts, updates, and AI/life snippets" },
        { name: "Instagram", role: "Visual storytelling and travel moments" },
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
  },
  zh: {
    nav: {
      about: "关于",
      projects: "项目",
      education: "教育经历",
      experience: "实习经历",
      skills: "技能",
      life: "生活",
      contact: "联系方式",
      media: "自媒体",
      travel: "旅行",
    },
    modeSwitch: {
      work: "工作",
      life: "生活",
    },
    hero: {
      topLabel: "Xinyu Tian | Phoenix",
      heading: "现在你知道我是谁了。",
      description:
        "NUS 硕士生，专注于计算机视觉，AI研究，同时兼顾自媒体创作、旅行与个人成长的内容。",
      explore: "探索",
      contact: "联系方式",
    },
    lifeHero: {
      topLabel: "Xinyu Tian | Phoenix",
      heading: "你将知道我喜欢什么。",
      description:
        "该模式展示我的自媒体方向、旅行内容和个人反思，同时保持统一的个人品牌风格。",
      explore: "探索媒体",
      contact: "联系方式",
    },
    about: {
      label: "关于我",
      heading: "NUS 硕士生，探索计算机视觉、人工智能与数字叙事",
      body:
        "我喜欢为工业成像构建数据驱动的视觉系统，并重视将研究转化为可用的解决方案。工程之外，我创作旅行与学习内容，记录新加坡的成长与生活。",
    },
    focusAreas: [
      {
        title: "计算机视觉",
        description: "构建用于分割、异常检测和工业图像分析的模型。",
      },
      {
        title: "AI 研究",
        description: "开发兼具可靠性与可解释性的实用 AI 解决方案。",
      },
      {
        title: "生活与故事",
        description: "通过多媒体分享学习生活、旅行体验和个人感悟。",
      },
    ],
    projects: [
      {
        title: "SEM 图像缺陷检测",
        description: "面向工业 SEM 图像的语义分割与缺陷检测，强调鲁棒性和可部署性。",
        tags: ["计算机视觉", "PyTorch", "U-Net"],
        href: "#",
      },
      {
        title: "RGBD多模态图像识别",
        description: "基于RGBD图像的物体识别与分类，强调多模态融合与场景理解。",
        tags: ["计算机视觉", "PyTorch", "多模态"],
        href: "#",
      },
      {
        title: "NUS 生活与旅行短片",
        description: "记录校园生活、新加坡文化与旅行故事的视频内容。",
        tags: ["内容创作", "视频", "叙事"],
        href: "#",
      },
    ],
    projectBadge: "案例",
    projectsHeading: "精选作品与研究亮点",
    viewDetails: "查看详情 ->",
    education: {
      label: "教育经历",
      heading: "学术背景与学历资质",
      entries: [
        {
          degree: "理学硕士",
          field: "技术物理学",
          institution: "新加坡国立大学",
          period: "2025年8月 – 2027年1月",
          location: "新加坡",
          description: "研究方向为计算机视觉、语义分割以及工业成像系统的AI解决方案。",
        },
        {
          degree: "理学学士",
          field: "应用物理学",
          institution: "西南交通大学",
          period: "2021年9月 – 2025年6月",
          location: "中国，成都",
          description: "本科阶段专注于应用物理学的研究与实践，积累了扎实的理论基础和实验技能。",
        },
      ],
    },
    experience: {
      label: "实习经历",
      heading: "实习与职业经历",
    },
    skills: {
      label: "技能",
      heading: "技术技能与语言",
      groups: {
        programming: "编程",
        cvml: "计算机视觉与机器学习",
        tools: "工具",
        languages: "语言",
      },
      languages: [
        { name: "Mandarin Chinese", level: "母语" },
        { name: "English", level: "专业" },
      ],
    },
    gallery: {
      label: "生活与旅行",
      heading: "来自校园、新加坡与远方的故事",
      description: "这是展示博客、视频或反映你个性与旅程的内容的绝佳位置。",
    },
    lifeHighlights: [
      "NUS 学习生活与研究感悟",
      "新加坡美食、文化与城市故事",
      "来自亚洲及更远地区的旅行灵感",
    ],
    media: {
      label: "媒体",
      heading: "媒体品牌矩阵与热门视频展示",
      description: "用于展示你的媒体生态，并将流量导向不同平台。",
      matrix: [
        { name: "YouTube", role: "长视频：学习、生活与旅行内容" },
        { name: "X", role: "短观点、动态更新与AI/生活片段" },
        { name: "Instagram", role: "视觉化内容与旅行瞬间" },
        { name: "小红书", role: "生活方式与城市指南" },
      ],
      featuredLabel: "热门视频",
      featuredMain: {
        title: "NUS 学习周：新加坡真实日常",
        description: "用于放置当前代表性的热门视频内容。",
      },
      clipsLabel: "精彩集锦",
      clips: ["60秒新加坡校园日常", "新加坡创作拍摄点TOP5", "每周成长反思Vlog"],
    },
    travel: {
      label: "旅行",
      heading: "可左右滑动的旅行画廊",
      description: "用于展示目的地、故事片段和代表性画面。",
      cards: [
        { title: "新加坡城市漫步", subtitle: "城市肌理与日常节奏" },
        { title: "东南亚短途旅行", subtitle: "短旅程也有强叙事" },
        { title: "海岸放空", subtitle: "慢节奏与重置" },
        { title: "山野周末", subtitle: "自然、节奏与反思" },
      ],
    },
    contact: {
      label: "联系",
      heading: "让我们保持联系",
      description:
        "我愿意合作、实习机会和关于计算机视觉与 AI 的研究交流。如果你想一起工作或讨论想法，请与我联系。",
      emailLabel: "电子邮件",
      connectLabel: "联系方式",
      back: "回到顶部",
    },
    contactCard: {
      title: "联系",
      email: "xinyu.tian.phoenix@gmail.com",
    },
    languageToggle: {
      switchToZh: "简体中文",
      switchToEn: "English",
    },
    devBanner: "本网站仍在开发中",
  },
} as const;

type Translation = (typeof translations)[SiteLanguage];

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/xinyu-tian-phoenix",
    icon: (
      <svg viewBox="0 0 24 24" fill="#0077B5" className="h-5 w-5" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/Phoenix-XinyuTian",
    icon: (
      <svg viewBox="0 0 24 24" fill="#000000" className="h-5 w-5" aria-hidden="true">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@Phoenix_Tian",
    icon: (
      <svg viewBox="0 0 24 24" fill="#FF0000" className="h-5 w-5" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/phoenixtian.vlog/",
    icon: (
      <svg viewBox="0 0 24 24" fill="url(#instagram-gradient)" className="h-5 w-5" aria-hidden="true">
        <defs>
          <linearGradient id="instagram-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#833ab4", stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: "#fd1d1d", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#fcb045", stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "X",
    href: "https://x.com/Xinyu_Tian_AI",
    icon: (
      <svg viewBox="0 0 24 24" fill="#000000" className="h-5 w-5" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/share/1EWvuK1fBZ/?mibextid=wwXIfr",
    icon: (
      <svg viewBox="0 0 24 24" fill="#1877F2" className="h-5 w-5" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
] as const;

const educationGalleryImages = [
  [
    "/images/1.jpg",
    "/images/2.jpeg",
    "/images/3.jpeg",
  ],
  [
    "/images/11.jpeg",
    "/images/12.jpeg",
    "/images/13.jpeg",
    "/images/14.jpeg",
    "/images/15.jpeg",
    "/images/16.jpeg",
  ],
] as const;

const educationLogoAssets = [
  {
    src: null,
    alt: "National University of Singapore logo",
    fallback: "NUS",
    bgClass: "bg-[#F36F21]/12",
    textClass: "text-[#F36F21]",
    borderClass: "border-[#F36F21]/25",
  },
  {
    src: null,
    alt: "Southwest Jiaotong University logo",
    fallback: "SWJTU",
    bgClass: "bg-[#0C78C3]/12",
    textClass: "text-[#0C78C3]",
    borderClass: "border-[#0C78C3]/25",
  },
] as const;


function EntityLogo({
  src,
  alt,
  fallback,
  bgClass,
  textClass,
  borderClass,
  className,
}: {
  src: string | null;
  alt: string;
  fallback: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
  className?: string;
}) {
  return (
    <div className={`flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border ${borderClass} ${bgClass} shadow-sm ${className ?? ""}`}>
      {src ? (
        <Image src={src} alt={alt} width={64} height={64} className="h-full w-full object-contain p-2" />
      ) : (
        <span className={`text-sm font-bold uppercase tracking-[0.12em] ${textClass}`}>{fallback}</span>
      )}
    </div>
  );
}

function AboutSection({
  t,
  focusAreas,
  mode,
}: {
  t: Translation;
  focusAreas: Translation["focusAreas"];
  mode: SiteMode;
}) {
  return (
    <section id="about" className={`border-t py-20 ${mode === "life" ? "border-amber-200/50 bg-amber-50/50" : "border-slate-200/80 bg-slate-50"}`}>
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="mb-10">
          <p className={`text-sm uppercase tracking-[0.32em] ${mode === "life" ? "text-amber-600" : "text-sky-600"}`}>{t.about.label}</p>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">{t.about.heading}</h2>
          <p className="mt-6 text-pretty text-base leading-8 text-slate-600">{t.about.body}</p>
        </div>

        <div className="grid w-full grid-cols-1 items-start gap-8 sm:grid-cols-2 lg:gap-14">
          <div className="min-w-0">
            <div className="grid grid-cols-1 gap-4">
              {focusAreas.map((area) => (
                <div key={area.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-950">{area.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{area.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full shrink-0 overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm lg:mt-1">
            <Image src="/images/portrait.jpeg" alt="Xinyu Tian portrait" width={600} height={600} className="h-full w-full object-cover" priority />
          </div>
        </div>
      </div>
    </section>
  );
}

function LanguageDropdown({
  language,
  onSelect,
}: {
  language: SiteLanguage;
  onSelect: (lang: SiteLanguage) => void;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const current = LOCALES.find((l) => l.code === language) ?? LOCALES[0]!;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    const onMouseDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onMouseDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onMouseDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative shrink-0">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 font-semibold text-slate-950 transition hover:border-slate-300 hover:bg-slate-100"
      >
        <Globe className="h-[14px] w-[14px] shrink-0 text-slate-500" strokeWidth={1.8} />
        <span>{current.short}</span>
        <ChevronDown
          className={`h-3 w-3 shrink-0 text-slate-400 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
          strokeWidth={2.5}
        />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Select language"
          className="absolute right-0 top-full z-50 mt-1.5 min-w-[9rem] rounded-2xl border border-slate-200 bg-white py-1 shadow-lg [animation:lang-dropdown-in_0.13s_ease-out]"
        >
          {LOCALES.map((locale) => {
            const isCurrent = locale.code === language;
            return (
              <button
                key={locale.code}
                role="option"
                aria-selected={isCurrent}
                type="button"
                disabled={isCurrent}
                onClick={() => { onSelect(locale.code); setOpen(false); }}
                className={`flex w-full items-center gap-2 px-3 py-2 text-sm transition ${
                  isCurrent
                    ? "cursor-default font-semibold text-sky-600"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span className="flex h-4 w-4 shrink-0 items-center justify-center text-sky-600">
                  {isCurrent && <Check className="h-3.5 w-3.5" strokeWidth={2.5} />}
                </span>
                {locale.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function SkillChip({ skill }: { skill: SkillItem }) {
  return (
    <div className="inline-flex cursor-default items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 shadow-sm transition hover:scale-105 hover:shadow-md sm:px-3 sm:py-1.5 sm:text-sm">
      {skill.path && skill.hex && (
        <svg
          role="img"
          viewBox="0 0 24 24"
          aria-label={skill.name}
          className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5"
          style={{ fill: `#${skill.hex}` }}
        >
          <path d={skill.path} />
        </svg>
      )}
      <span>{skill.name}</span>
    </div>
  );
}

function SkillsSection({ t }: { t: Translation }) {
  const groups = [
    { key: "programming", label: t.skills.groups.programming, skills: programmingSkills },
    { key: "cvml", label: t.skills.groups.cvml, skills: cvmlSkills },
    { key: "tools", label: t.skills.groups.tools, skills: toolsSkills },
  ] as const;

  return (
    <section id="skills" className="border-t border-slate-200/80 bg-slate-50 px-6 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm uppercase tracking-[0.32em] text-sky-600">{t.skills.label}</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          {t.skills.heading}
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {groups.map((group) => (
            <div key={group.key} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-sky-600">
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <SkillChip key={skill.name} skill={skill} />
                ))}
              </div>
            </div>
          ))}

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-sky-600">
              {t.skills.groups.languages}
            </h3>
            <div className="flex flex-wrap gap-2">
              {t.skills.languages.map((lang) => (
                <div
                  key={lang.name}
                  className="inline-flex cursor-default items-center rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 shadow-sm transition hover:scale-105 hover:shadow-md sm:px-3 sm:py-1.5 sm:text-sm"
                >
                  {lang.name} · {lang.level}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkSections({ t, language }: { t: Translation; language: SiteLanguage }) {
  return (
    <>
      <ExperienceSection t={t} language={language} />
      <SkillsSection t={t} />

      <section id="projects" className="px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-sky-600">{t.nav.projects}</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">{t.projectsHeading}</h2>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {t.projects.map((project) => (
              <article
                key={project.title}
                className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-xl font-semibold text-slate-950">{project.title}</h3>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                    {t.projectBadge}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-600">{project.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700">
                      {tag}
                    </span>
                  ))}
                </div>
                <a href={project.href} className="mt-6 inline-flex text-sm font-semibold text-sky-600 transition hover:text-sky-800">
                  {t.viewDetails}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <EducationSection t={t} />
    </>
  );
}

function LifeSections({ t }: { t: Translation }) {
  return (
    <>
      <section id="media" className="px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm uppercase tracking-[0.32em] text-amber-600">{t.media.label}</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">{t.media.heading}</h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">{t.media.description}</p>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
            <div className="grid gap-4">
              {t.media.matrix.map((item) => (
                <div key={item.name} className="rounded-3xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
                  <p className="text-base font-semibold text-slate-950">{item.name}</p>
                  <p className="mt-2 text-sm text-slate-600">{item.role}</p>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-600">{t.media.featuredLabel}</p>
              <div className="mt-4 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-6 text-white">
                <p className="text-xl font-semibold">{t.media.featuredMain.title}</p>
                <p className="mt-3 text-sm text-slate-200">{t.media.featuredMain.description}</p>
              </div>

              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.24em] text-amber-600">{t.media.clipsLabel}</p>
              <div className="mt-4 space-y-3">
                {t.media.clips.map((clip, idx) => (
                  <div key={clip} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                      {idx + 1}
                    </span>
                    <p className="text-sm text-slate-700">{clip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="travel" className="border-t border-slate-200/80 bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <p className="text-sm uppercase tracking-[0.32em] text-amber-600">{t.travel.label}</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">{t.travel.heading}</h2>
          <p className="mt-5 text-base leading-8 text-slate-600">{t.travel.description}</p>

          <div className="mt-8 overflow-x-auto pb-2">
            <div className="flex w-max gap-5 pr-6">
              {t.travel.cards.map((card) => (
                <div
                  key={card.title}
                  className="w-[270px] shrink-0 snap-start rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:w-[320px]"
                >
                  <div className="h-44 rounded-2xl bg-gradient-to-br from-sky-200 via-cyan-100 to-amber-100" />
                  <p className="mt-4 text-lg font-semibold text-slate-950">{card.title}</p>
                  <p className="mt-2 text-sm text-slate-600">{card.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="life" className="py-20 px-6 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm uppercase tracking-[0.32em] text-amber-600">{t.gallery.label}</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">{t.gallery.heading}</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {t.lifeHighlights.map((item) => (
              <div key={item} className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
                <p className="text-base font-semibold text-slate-950">{item}</p>
                <p className="mt-4 text-sm leading-7 text-slate-600">{t.gallery.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function EducationSection({ t }: { t: Translation }) {
  const [educationCarouselStates, setEducationCarouselStates] = useState(
    () => t.education.entries.map(() => ({ current: 0, previous: null as number | null, direction: 1 as 1 | -1, animating: false })),
  );
  const [educationCarouselPaused, setEducationCarouselPaused] = useState(
    () => t.education.entries.map(() => false),
  );
  const [mobileCarouselStates, setMobileCarouselStates] = useState(() =>
    t.education.entries.map((_, entryIndex) => {
      const imageCount = (educationGalleryImages[entryIndex] ?? []).length;

      return {
        logicalIndex: 0,
        trackIndex: imageCount > 0 ? imageCount : 0,
        transitionEnabled: true,
        dragOffsetPx: 0,
        dragging: false,
      };
    }),
  );
  const animationTimeoutsRef = useRef<Array<ReturnType<typeof setTimeout> | null>>([]);
  const touchStartXRef = useRef<number[]>([]);
  const mobileTrackWidthsRef = useRef<number[]>([]);

  const getWrappedLogicalIndex = useCallback((logicalIndex: number, imageCount: number) => {
    if (imageCount <= 0) return 0;
    return ((logicalIndex % imageCount) + imageCount) % imageCount;
  }, []);

  const getMiddleBandTrackIndex = useCallback((logicalIndex: number, imageCount: number) => {
    if (imageCount <= 1) return 0;
    return imageCount + getWrappedLogicalIndex(logicalIndex, imageCount);
  }, [getWrappedLogicalIndex]);

  const normalizeMobileCarouselTrack = useCallback((entryIndex: number, imageCount: number) => {
    if (imageCount <= 1) return;

    let shouldReEnableTransition = false;

    setMobileCarouselStates((prev) => {
      const next = [...prev];
      const state = next[entryIndex];
      if (!state) return prev;

      if (state.trackIndex < imageCount || state.trackIndex >= imageCount * 2) {
        next[entryIndex] = {
          ...state,
          trackIndex: getMiddleBandTrackIndex(state.logicalIndex, imageCount),
          transitionEnabled: false,
          dragOffsetPx: 0,
          dragging: false,
        };
        shouldReEnableTransition = true;
      }

      return next;
    });

    if (shouldReEnableTransition) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setMobileCarouselStates((prev) => {
            const next = [...prev];
            const state = next[entryIndex];
            if (!state) return prev;

            next[entryIndex] = {
              ...state,
              transitionEnabled: true,
            };

            return next;
          });
        });
      });
    }
  }, [getMiddleBandTrackIndex]);

  const moveMobileCarousel = useCallback((entryIndex: number, direction: 1 | -1) => {
    const images = educationGalleryImages[entryIndex] ?? [];
    if (images.length <= 1) return;

    setMobileCarouselStates((prev) => {
        const next = [...prev];
      const state = next[entryIndex];
      if (!state) return prev;

      next[entryIndex] = {
        ...state,
        logicalIndex: getWrappedLogicalIndex(state.logicalIndex + direction, images.length),
        trackIndex: state.trackIndex + direction,
        transitionEnabled: true,
        dragOffsetPx: 0,
        dragging: false,
      };

      return next;
    });
  }, [getWrappedLogicalIndex]);

  useEffect(() => {
    const animationTimeouts = animationTimeoutsRef.current;

    const interval = setInterval(() => {
      setEducationCarouselStates((prev) =>
        prev.map((state, entryIndex) => {
          const images = educationGalleryImages[entryIndex] ?? [];
          if (images.length <= 1 || educationCarouselPaused[entryIndex]) return state;

          if (animationTimeouts[entryIndex]) {
            clearTimeout(animationTimeouts[entryIndex]);
          }

          const nextState = {
            current: (state.current + 1) % images.length,
            previous: state.current,
            direction: 1 as const,
            animating: true,
          };

          animationTimeouts[entryIndex] = setTimeout(() => {
            setEducationCarouselStates((currentStates) => {
              const updatedStates = [...currentStates];
              const targetState = updatedStates[entryIndex];
              if (!targetState) return currentStates;
              updatedStates[entryIndex] = {
                ...targetState,
                previous: null,
                animating: false,
              };
              return updatedStates;
            });
            animationTimeouts[entryIndex] = null;
          }, 450);

          return nextState;
        }),
      );
    }, 3000);

    return () => {
      clearInterval(interval);
      animationTimeouts.forEach((timeoutId) => {
        if (timeoutId) clearTimeout(timeoutId);
      });
    };
  }, [educationCarouselPaused]);

  useEffect(() => {
    const mobileInterval = setInterval(() => {
      setMobileCarouselStates((prev) => {
        const next = [...prev];
        t.education.entries.forEach((_, entryIndex) => {
          const images = educationGalleryImages[entryIndex] ?? [];
          if (images.length <= 1 || educationCarouselPaused[entryIndex]) return;

          const state = next[entryIndex];
          if (!state) return;

          next[entryIndex] = {
            ...state,
            logicalIndex: getWrappedLogicalIndex(state.logicalIndex + 1, images.length),
            trackIndex: state.trackIndex + 1,
            transitionEnabled: true,
            dragOffsetPx: 0,
            dragging: false,
          };
        });
        return next;
      });
    }, 3000);

    return () => {
      clearInterval(mobileInterval);
    };
  }, [educationCarouselPaused, getWrappedLogicalIndex, t.education.entries]);

  const handleMobileTrackTransitionEnd = (entryIndex: number, imageCount: number) => {
    if (imageCount <= 1) return;

    const trackIndex = mobileCarouselStates[entryIndex]?.trackIndex ?? imageCount;
    if (trackIndex >= imageCount && trackIndex < imageCount * 2) return;

    normalizeMobileCarouselTrack(entryIndex, imageCount);
  };

  const showPrevImage = (entryIndex: number) => {
    setEducationCarouselStates((prev) => {
      const images = educationGalleryImages[entryIndex] ?? [];
      if (images.length <= 1) return prev;

      if (animationTimeoutsRef.current[entryIndex]) {
        clearTimeout(animationTimeoutsRef.current[entryIndex]);
      }

      const next = [...prev];
      const currentState = next[entryIndex];
      if (!currentState) return prev;

      next[entryIndex] = {
        current: (currentState.current - 1 + images.length) % images.length,
        previous: currentState.current,
        direction: -1,
        animating: true,
      };

      animationTimeoutsRef.current[entryIndex] = setTimeout(() => {
        setEducationCarouselStates((currentStates) => {
          const updatedStates = [...currentStates];
          const targetState = updatedStates[entryIndex];
          if (!targetState) return currentStates;
          updatedStates[entryIndex] = {
            ...targetState,
            previous: null,
            animating: false,
          };
          return updatedStates;
        });
        animationTimeoutsRef.current[entryIndex] = null;
      }, 450);

      return next;
    });
  };

  const showNextImage = (entryIndex: number) => {
    setEducationCarouselStates((prev) => {
      const images = educationGalleryImages[entryIndex] ?? [];
      if (images.length <= 1) return prev;

      if (animationTimeoutsRef.current[entryIndex]) {
        clearTimeout(animationTimeoutsRef.current[entryIndex]);
      }

      const next = [...prev];
      const currentState = next[entryIndex];
      if (!currentState) return prev;

      next[entryIndex] = {
        current: (currentState.current + 1) % images.length,
        previous: currentState.current,
        direction: 1,
        animating: true,
      };

      animationTimeoutsRef.current[entryIndex] = setTimeout(() => {
        setEducationCarouselStates((currentStates) => {
          const updatedStates = [...currentStates];
          const targetState = updatedStates[entryIndex];
          if (!targetState) return currentStates;
          updatedStates[entryIndex] = {
            ...targetState,
            previous: null,
            animating: false,
          };
          return updatedStates;
        });
        animationTimeoutsRef.current[entryIndex] = null;
      }, 450);

      return next;
    });
  };

  return (
    <section id="education" className="border-t border-slate-200/80 bg-slate-50 py-20">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <p className="text-sm uppercase tracking-[0.32em] text-sky-600">{t.education.label}</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          {t.education.heading}
        </h2>
        <div className="mt-10 space-y-6">
          {t.education.entries.map((entry, index) => (
            <div
              key={entry.institution + entry.period}
              className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
            >
              <div className="absolute left-0 top-0 h-full w-1 bg-sky-500" />
              <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start lg:gap-8">
                <div className="flex items-start gap-3 sm:gap-5">
                  <EntityLogo {...educationLogoAssets[index]} className="h-12 w-12 rounded-xl sm:h-16 sm:w-16 sm:rounded-2xl" />

                  <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                    <div>
                      <span className="inline-block rounded-full bg-sky-50 px-2.5 py-1 text-[11px] font-semibold text-sky-700 sm:px-3 sm:text-xs">
                        {entry.period}
                      </span>
                      <h3 className="mt-2 text-sm font-semibold text-slate-950 sm:mt-3 sm:text-xl">
                        {entry.institution}
                      </h3>
                      <p className="mt-1 text-xs font-medium text-slate-700 sm:text-base">
                        {entry.degree} · {entry.field}
                      </p>
                      <p className="mt-1 text-xs text-slate-500 sm:text-sm">{entry.location}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-xs leading-6 text-slate-600 sm:mt-4 sm:text-sm sm:leading-7">{entry.description}</p>
                  </div>
                </div>

                <div
                  className="relative mt-5 touch-pan-y lg:hidden"
                  onTouchStart={(event) => {
                    const images = educationGalleryImages[index] ?? [];
                    if (images.length > 1) {
                      setMobileCarouselStates((prev) => {
                        const next = [...prev];
                        const state = next[index];
                        if (!state) return prev;

                        next[index] = {
                          ...state,
                          trackIndex: getMiddleBandTrackIndex(state.logicalIndex, images.length),
                          transitionEnabled: false,
                          dragOffsetPx: 0,
                          dragging: true,
                        };

                        return next;
                      });
                    }

                    touchStartXRef.current[index] = event.touches[0]?.clientX ?? 0;
                    mobileTrackWidthsRef.current[index] = event.currentTarget.getBoundingClientRect().width;

                    setEducationCarouselPaused((prev) => {
                      const next = [...prev];
                      next[index] = true;
                      return next;
                    });

                    setMobileCarouselStates((prev) => {
                      const next = [...prev];
                      const state = next[index];
                      if (!state) return prev;

                      next[index] = {
                        ...state,
                        dragOffsetPx: 0,
                        dragging: true,
                      };

                      return next;
                    });
                  }}
                  onTouchMove={(event) => {
                    const currentX = event.touches[0]?.clientX ?? touchStartXRef.current[index] ?? 0;
                    const startX = touchStartXRef.current[index] ?? currentX;
                    const deltaX = currentX - startX;

                    setMobileCarouselStates((prev) => {
                      const next = [...prev];
                      const state = next[index];
                      if (!state) return prev;

                      next[index] = {
                        ...state,
                        dragOffsetPx: deltaX,
                      };

                      return next;
                    });
                  }}
                  onTouchEnd={(event) => {
                    const touchEndX = event.changedTouches[0]?.clientX ?? 0;
                    const touchStartX = touchStartXRef.current[index] ?? touchEndX;
                    const deltaX = touchEndX - touchStartX;
                    const trackWidth = mobileTrackWidthsRef.current[index] ?? 1;
                    const switchThreshold = Math.max(trackWidth * 0.16, 40);

                    if (Math.abs(deltaX) > switchThreshold) {
                      if (deltaX > 0) {
                        moveMobileCarousel(index, -1);
                      } else {
                        moveMobileCarousel(index, 1);
                      }
                    } else {
                      setMobileCarouselStates((prev) => {
                        const next = [...prev];
                        const state = next[index];
                        if (!state) return prev;

                        next[index] = {
                          ...state,
                          transitionEnabled: true,
                          dragOffsetPx: 0,
                          dragging: false,
                        };

                        return next;
                      });
                    }

                    setEducationCarouselPaused((prev) => {
                      const next = [...prev];
                      next[index] = false;
                      return next;
                    });
                  }}
                  onTouchCancel={() => {
                    setMobileCarouselStates((prev) => {
                      const next = [...prev];
                      const state = next[index];
                      if (!state) return prev;

                      next[index] = {
                        ...state,
                        transitionEnabled: true,
                        dragOffsetPx: 0,
                        dragging: false,
                      };

                      return next;
                    });

                    setEducationCarouselPaused((prev) => {
                      const next = [...prev];
                      next[index] = false;
                      return next;
                    });
                  }}
                >
                  {(() => {
                    const images = educationGalleryImages[index] ?? ["/images/portrait.jpeg"];
                    const loopedImages = images.length > 1 ? [...images, ...images, ...images] : images;
                    const carouselState = mobileCarouselStates[index] ?? {
                      logicalIndex: 0,
                      trackIndex: images.length,
                      transitionEnabled: true,
                      dragOffsetPx: 0,
                      dragging: false,
                    };
                    const rawTrackIndex = carouselState.trackIndex;
                    const maxRenderableIndex = Math.max(loopedImages.length - 1, 0);
                    const trackIndex = Math.min(Math.max(rawTrackIndex, 0), maxRenderableIndex);
                    const transitionEnabled = carouselState.transitionEnabled;
                    const dragOffsetPx = carouselState.dragOffsetPx;
                    const isDragging = carouselState.dragging;

                    return (
                      <div
                        className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100"
                        onTransitionEnd={() => handleMobileTrackTransitionEnd(index, images.length)}
                      >
                        <div
                          className="flex h-full"
                          style={{
                            transform: `translateX(calc(-${trackIndex * 100}% + ${dragOffsetPx}px))`,
                            transition: !isDragging && transitionEnabled ? "transform 500ms ease-out" : "none",
                          }}
                        >
                          {loopedImages.map((src, imageIndex) => (
                            <div
                              key={`${entry.institution}-mobile-track-${imageIndex}`}
                              className="relative h-full w-full shrink-0"
                            >
                              <Image
                                src={src}
                                alt={`${entry.institution} mobile gallery image ${imageIndex + 1}`}
                                fill
                                sizes="(max-width: 1023px) 100vw, 0px"
                                className="object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })()}
                </div>

                <div
                  className="relative hidden lg:block"
                  onMouseEnter={() => {
                    setEducationCarouselPaused((prev) => {
                      const next = [...prev];
                      next[index] = true;
                      return next;
                    });
                  }}
                  onMouseLeave={() => {
                    setEducationCarouselPaused((prev) => {
                      const next = [...prev];
                      next[index] = false;
                      return next;
                    });
                  }}
                >
                  {(() => {
                    const images = educationGalleryImages[index] ?? ["/images/portrait.jpeg"];
                    const carouselState = educationCarouselStates[index] ?? {
                      current: 0,
                      previous: null,
                      direction: 1 as const,
                      animating: false,
                    };
                    const currentSrc = images[carouselState.current] ?? images[0];
                    const previousSrc = carouselState.previous !== null ? (images[carouselState.previous] ?? images[0]) : null;

                    return (
                  <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                    {previousSrc && carouselState.animating && (
                      <Image
                        key={`${entry.institution}-previous-${carouselState.previous}`}
                        src={previousSrc}
                        alt={`${entry.institution} desktop gallery image ${(carouselState.previous ?? 0) + 1}`}
                        fill
                        sizes="288px"
                        className="object-cover"
                        style={{
                          animation: carouselState.direction === 1 ? "education-slide-out-left 450ms ease forwards" : "education-slide-out-right 450ms ease forwards",
                        }}
                      />
                    )}
                    <Image
                      key={`${entry.institution}-current-${carouselState.current}`}
                      src={currentSrc}
                      alt={`${entry.institution} desktop gallery image ${carouselState.current + 1}`}
                      fill
                      sizes="288px"
                      className="object-cover"
                      style={{
                        animation: carouselState.animating
                          ? carouselState.direction === 1
                            ? "education-slide-in-right 450ms ease forwards"
                            : "education-slide-in-left 450ms ease forwards"
                          : undefined,
                      }}
                    />
                  </div>
                    );
                  })()}

                  <button
                    type="button"
                    onClick={() => showPrevImage(index)}
                    className="absolute left-2 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/50 text-slate-700 shadow-sm opacity-50 transition hover:bg-white/70 hover:opacity-80"
                    aria-label={`Show previous image for ${entry.institution}`}
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={() => showNextImage(index)}
                    className="absolute right-2 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/50 text-slate-700 shadow-sm opacity-50 transition hover:bg-white/70 hover:opacity-80"
                    aria-label={`Show next image for ${entry.institution}`}
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes education-slide-in-right {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes education-slide-in-left {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes education-slide-out-left {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          }
        }

        @keyframes education-slide-out-right {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(100%);
          }
        }
      `}</style>
    </section>
  );
}

function ExperienceCard({
  item,
  lang,
  onOpenLightbox,
}: {
  item: ExperienceItem;
  lang: SiteLanguage;
  onOpenLightbox: (src: string) => void;
}) {
  const local = item.i18n[lang];
  const hasMedia = item.media.length > 0;

  return (
    <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-8">
      {/* Header */}
      <div className="flex items-start gap-4 border-b border-slate-100 pb-5">
        {item.logoSrc ? (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50 sm:h-14 sm:w-14">
            <img src={item.logoSrc} alt={local.company} className="h-9 w-9 object-contain sm:h-10 sm:w-10" />
          </div>
        ) : (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-sky-200 bg-sky-50 sm:h-14 sm:w-14">
            <span className="text-xs font-bold uppercase tracking-[0.1em] text-sky-700 sm:text-sm">{item.fallback}</span>
          </div>
        )}
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-slate-950 sm:text-xl">{local.title}</h3>
          <p className="mt-0.5 text-sm text-slate-700 sm:text-base">{local.company}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
              {item.startDate} – {item.endDate}
            </span>
            <span className="text-xs text-slate-500 sm:text-sm">{local.location}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className={`mt-5 ${hasMedia ? "grid gap-6 lg:grid-cols-[3fr_2fr]" : ""}`}>
        {/* Bullets */}
        <ul className="space-y-3">
          {local.bullets.map((bullet, i) =>
            bullet.highlight ? (
              <li key={i} className="border-l-2 border-sky-400 pl-3 text-sm font-medium leading-7 text-slate-800">
                {bullet.text}
              </li>
            ) : (
              <li key={i} className="flex items-start gap-2.5 text-sm leading-7 text-slate-600">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-300" />
                {bullet.text}
              </li>
            )
          )}
        </ul>

        {/* Media */}
        {hasMedia && (
          <div className="space-y-4">
            {item.media.map((m, i) => {
              if (m.type === "image") {
                return (
                  <div
                    key={i}
                    className="group relative cursor-zoom-in overflow-hidden rounded-xl border border-slate-200"
                    onClick={() => onOpenLightbox(m.src)}
                  >
                    <div className="aspect-[4/3] bg-slate-100">
                      <img src={m.src} alt={m.alt} className="h-full w-full object-cover" />
                    </div>
                    {m.caption && (
                      <div className="absolute inset-x-0 bottom-0 translate-y-full bg-black/60 px-3 py-2 text-xs text-white transition-transform duration-200 group-hover:translate-y-0">
                        {m.caption}
                      </div>
                    )}
                  </div>
                );
              }
              if (m.type === "metric") {
                return (
                  <div key={i} className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{m.label}</p>
                    <p className="mt-1 text-3xl font-bold text-sky-600">{m.value}</p>
                    {m.sublabel && <p className="mt-0.5 text-xs text-slate-500">{m.sublabel}</p>}
                  </div>
                );
              }
              return null;
            })}
          </div>
        )}
      </div>

      {/* Tech tags */}
      {item.techStack.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-1.5 border-t border-slate-100 pt-5">
          {item.techStack.map((tag) => (
            <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-medium text-slate-600">
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}

function ExperienceSection({ t, language }: { t: Translation; language: SiteLanguage }) {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!lightboxSrc) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightboxSrc(null); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightboxSrc]);

  return (
    <section id="experience" className="px-6 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm uppercase tracking-[0.32em] text-sky-600">{t.experience.label}</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          {t.experience.heading}
        </h2>
        <div className="mt-10 space-y-6">
          {experiences.map((item) => (
            <ExperienceCard key={item.id} item={item} lang={language} onOpenLightbox={setLightboxSrc} />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 [animation:lang-dropdown-in_0.15s_ease-out]"
          onClick={() => setLightboxSrc(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
        >
          <img
            src={lightboxSrc}
            alt=""
            className="max-h-[90vh] max-w-full rounded-xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            onClick={() => setLightboxSrc(null)}
            className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/30"
            aria-label="Close preview"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}
    </section>
  );
}

function ContactSection({ t, mode }: { t: Translation; mode: SiteMode }) {
  return (
    <section id="contact" className="px-6 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl rounded-[2rem] border border-slate-200 bg-white p-10 shadow-xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className={`text-sm uppercase tracking-[0.32em] ${mode === "life" ? "text-amber-600" : "text-sky-600"}`}>{t.contact.label}</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">{t.contact.heading}</h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600">{t.contact.description}</p>
          </div>

          <div className="space-y-6 text-sm text-slate-600">
            <div>
              <p className="mb-4 font-semibold text-slate-950">{t.contact.emailLabel}</p>
              <a href="mailto:xinyu.tian.phoenix@gmail.com" className={mode === "life" ? "text-amber-600 hover:text-amber-800" : "text-sky-600 hover:text-sky-800"}>
                {t.contactCard.email}
              </a>
            </div>

            <div>
              <p className="mb-4 font-semibold text-slate-950">{t.contact.connectLabel}</p>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </a>
                ))}
              </div>
            </div>

            <a
              href="#top"
              className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              {t.contact.back}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [language, setLanguage] = useState<SiteLanguage>("en");
  const [mode, setMode] = useState<SiteMode>("work");
  const [displayedMode, setDisplayedMode] = useState<SiteMode>("work");
  const [contentVisible, setContentVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const transitionRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleModeChange = (newMode: SiteMode) => {
    if (newMode === mode) return;
    if (transitionRef.current) clearTimeout(transitionRef.current);
    setMode(newMode);
    setContentVisible(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
    transitionRef.current = setTimeout(() => {
      setDisplayedMode(newMode);
      setContentVisible(true);
    }, 320);
  };

  useEffect(() => {
    return () => {
      if (transitionRef.current) {
        clearTimeout(transitionRef.current);
      }
    };
  }, []);

  const t = translations[language];

  const navLinks =
    displayedMode === "work"
      ? [
          { href: "#about", label: t.nav.about },
          { href: "#experience", label: t.nav.experience },
          { href: "#skills", label: t.nav.skills },
          { href: "#projects", label: t.nav.projects },
          { href: "#education", label: t.nav.education },
          { href: "#contact", label: t.nav.contact },
        ]
      : [
          { href: "#about", label: t.nav.about },
          { href: "#media", label: t.nav.media },
          { href: "#travel", label: t.nav.travel },
          { href: "#life", label: t.nav.life },
          { href: "#contact", label: t.nav.contact },
        ];

  const heroContent = displayedMode === "work" ? t.hero : t.lifeHero;

  const isLife = mode === "life";

  return (
    <main className={`min-h-screen text-slate-950 transition-colors duration-500 selection:bg-sky-300 selection:text-slate-950 ${isLife ? "bg-[#faf8f4]" : "bg-white"}`}>
      <header className={`sticky top-0 z-30 border-b backdrop-blur transition-colors duration-500 ${isLife ? "border-amber-200/60 bg-[#faf8f4]/95" : "border-slate-200/80 bg-white/95"}`}>
        {/* Desktop Header (lg+) */}
        <div className="hidden items-center px-[clamp(1.5rem,4vw,4rem)] py-4 lg:grid lg:grid-cols-[1fr_auto_1fr]">
          <a href="#top" className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-900 lg:justify-self-start">
            Xinyu Tian | Phoenix
          </a>

          {/* Mode toggle with sliding indicator */}
          <div className="relative mx-auto inline-flex shrink-0 rounded-full bg-slate-100 p-1 shadow-inner ring-1 ring-slate-200/80 lg:mx-0">
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute inset-y-1 rounded-full shadow-sm transition-all duration-300 ease-in-out ${
                mode === "life" ? "bg-amber-300" : "bg-sky-400"
              }`}
              style={{
                width: "calc(50% - 4px)",
                left: "4px",
                transform: mode === "work" ? "translateX(0)" : "translateX(100%)",
              }}
            />
            <button
              type="button"
              onClick={() => handleModeChange("work")}
              className={`relative z-10 px-5 py-2 text-sm font-semibold transition-colors duration-300 ${
                mode === "work" ? "text-white" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {t.modeSwitch.work}
            </button>
            <button
              type="button"
              onClick={() => handleModeChange("life")}
              className={`relative z-10 px-5 py-2 text-sm font-semibold transition-colors duration-300 ${
                mode === "life" ? "text-white" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {t.modeSwitch.life}
            </button>
          </div>

          <div className="flex flex-nowrap items-center gap-[clamp(0.5rem,0.8vw,1rem)] text-[clamp(0.75rem,1.2vw,0.875rem)] text-slate-600 lg:justify-self-end">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="whitespace-nowrap transition hover:text-slate-900">
                {link.label}
              </a>
            ))}
            <LanguageDropdown language={language} onSelect={setLanguage} />
          </div>
        </div>

        {/* Mobile Header (sm and below) */}
        <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-6 py-4 sm:px-8 lg:hidden">
          {/* Mobile Brand - Shortened */}
          <a href="#top" className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-900">
            {mode === "work" ? "XINYU" : "PHOENIX"}
          </a>

          {/* Mode toggle - Compact */}
          <div className="relative inline-flex rounded-full bg-slate-100 p-1 shadow-inner ring-1 ring-slate-200/80">
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute inset-y-1 rounded-full shadow-sm transition-all duration-300 ease-in-out ${
                mode === "life" ? "bg-amber-300" : "bg-sky-400"
              }`}
              style={{
                width: "calc(50% - 4px)",
                left: "4px",
                transform: mode === "work" ? "translateX(0)" : "translateX(100%)",
              }}
            />
            <button
              type="button"
              onClick={() => handleModeChange("work")}
              className={`relative z-10 px-2 py-1 text-xs font-semibold transition-colors duration-300 ${
                mode === "work" ? "text-white" : "text-slate-500"
              }`}
            >
              {t.modeSwitch.work}
            </button>
            <button
              type="button"
              onClick={() => handleModeChange("life")}
              className={`relative z-10 px-2 py-1 text-xs font-semibold transition-colors duration-300 ${
                mode === "life" ? "text-white" : "text-slate-500"
              }`}
            >
              {t.modeSwitch.life}
            </button>
          </div>

          {/* Mobile Menu & Language Buttons */}
          <div className="flex items-center justify-self-end gap-2">
            <LanguageDropdown language={language} onSelect={setLanguage} />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`inline-flex h-9 w-9 items-center justify-center rounded-full transition ${
                mobileMenuOpen
                  ? isLife ? "bg-amber-300" : "bg-sky-400"
                  : "border border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-100"
              }`}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <svg
                className={`h-5 w-5 transition-transform ${mobileMenuOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <div
          className={`border-t lg:hidden ${isLife ? "border-amber-200 bg-amber-50" : "border-slate-200 bg-slate-50"} ${
            mobileMenuOpen ? "px-6 py-4 sm:px-8 [animation:menu-in_0.2s_ease-out]" : "h-0 overflow-hidden"
          }`}
        >
          <nav className="space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`block rounded-lg px-4 py-2 text-sm font-medium transition ${
                  isLife
                    ? "text-amber-900 hover:bg-amber-100"
                    : "text-slate-700 hover:bg-white"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <div className={`transition-opacity duration-300 ${contentVisible ? "opacity-100" : "opacity-0"}`}>
      <div className="border-b border-amber-200 bg-amber-50 px-6 py-2 text-center text-sm text-amber-700">
        🚧 {t.devBanner}
      </div>

      <section id="top" className="relative overflow-hidden px-6 py-20 sm:px-8">
        {displayedMode === "work" ? (
          <>
            <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.14),_transparent_28%)]" />
            <div className="pointer-events-none absolute right-[-6rem] top-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(132,204,22,0.18),transparent_44%)] opacity-90" />
            <div className="pointer-events-none absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(248,113,113,0.08),transparent_48%)]" />
          </>
        ) : (
          <>
            <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.18),_transparent_28%)]" />
            <div className="pointer-events-none absolute right-[-6rem] top-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(251,146,60,0.15),transparent_44%)] opacity-90" />
            <div className="pointer-events-none absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(251,191,36,0.10),transparent_48%)]" />
          </>
        )}
        <div className="mx-auto max-w-6xl">
          <p className={`text-sm uppercase tracking-[0.32em] ${displayedMode === "life" ? "text-amber-600" : "text-sky-600"}`}>{heroContent.topLabel}</p>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 sm:text-6xl">{heroContent.heading}</h1>
        </div>
      </section>

      <AboutSection t={t} focusAreas={t.focusAreas} mode={displayedMode} />

      {displayedMode === "work" ? <WorkSections t={t} language={language} /> : <LifeSections t={t} />}

      <ContactSection t={t} mode={displayedMode} />
      </div>
    </main>
  );
}
