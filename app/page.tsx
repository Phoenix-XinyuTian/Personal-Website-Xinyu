"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const translations = {
  en: {
    nav: {
      about: 'About',
      projects: 'Projects',
      life: 'Life',
      contact: 'Contact',
    },
    hero: {
      topLabel: 'Xinyu Tian ｜ Phoenix',
      heading: ' My journey in AI Technology&Research also sharing life abroad.',
      description:
        'NUS Master’s student working on industrial imaging, semantic segmentation, and AI research. I also create content that reflects study life, travel, and personal growth in Singapore.',
      explore: 'Explore Projects',
      contact: 'Contact Me',
    },
    about: {
      label: 'About Me',
      heading: 'NUS Master’s student exploring computer vision, AI, and digital storytelling.',
      body:
        'I enjoy building data-driven vision systems for industrial imaging, and I care deeply about turning research into working solutions. Outside of engineering, I create travel and study content that reflects growth and life in Singapore.',
    },
    focusAreas: [
      {
        title: 'Computer Vision',
        description: 'Building models for segmentation, anomaly detection, and industrial image analysis.',
      },
      {
        title: 'AI Research',
        description: 'Developing practical AI solutions with a strong emphasis on reliability and explainability.',
      },
      {
        title: 'Life & Storytelling',
        description: 'Sharing study life, travel experiences, and personal reflections through multimedia.',
      },
    ],
    projects: [
      {
        title: 'SEM Image Defect Detection',
        description:
          'Semantic segmentation and defect detection for industrial SEM imagery, focusing on robustness and deployment-ready design.',
        tags: ['Computer Vision', 'PyTorch', 'U-Net'],
        href: '#',
      },
      {
        title: 'Logistics Analytics Dashboard',
        description:
          'A data pipeline and dashboard for logistics tracking, KPI visualization, and operational insights.',
        tags: ['Data Analytics', 'Python', 'Visualization'],
        href: '#',
      },
      {
        title: 'NUS Life & Travel Vlogs',
        description:
          'Short-form video content documenting campus life, Singapore culture, and travel stories.',
        tags: ['Content Creation', 'Video', 'Storytelling'],
        href: '#',
      },
    ],
    projectBadge: 'Case study',
    projectsHeading: 'Selected work and research highlights.',
    viewDetails: 'View details →',
    gallery: {
      label: 'Life & Travel',
      heading: 'Stories from campus, Singapore, and beyond.',
      description: 'This section is a great place to link to blog posts, videos, or reflections that show your personality and journey.',
    },
    lifeHighlights: [
      'NUS study life and research reflections',
      'Singapore food, culture, and city stories',
      'Travel ideas from Asia and beyond',
    ],
    contact: {
      label: 'Contact',
      heading: "Let's connect.",
      description:
        "I'm open to collaboration, internship opportunities, and research conversations in computer vision and AI. Reach out if you want to work together or discuss ideas.",
      emailLabel: 'Email',
      connectLabel: 'Connect with me',
      back: 'Back to top',
    },
    contactCard: {
      title: 'Contact me',
      email: 'xinyu.tian.phoenix@gmail.com',
    },
    languageToggle: {
      switchToZh: '简体中文',
      switchToEn: 'English',
    },
  },
  zh: {
    nav: {
      about: '关于',
      projects: '项目',
      life: '生活',
      contact: '联系方式',
    },
    hero: {
      topLabel: 'Xinyu Tian ｜ Phoenix',
      heading: '我的AI技术经历与研究并分享海外生活。',
      description:
        'NUS 硕士生，专注于工业成像、语义分割与 AI 研究，同时创作反映新加坡学习生活、旅行与个人成长的内容。',
      explore: '探索',
      contact: '联系方式',
    },
    about: {
      label: '关于我',
      heading: 'NUS 硕士生，探索计算机视觉、人工智能与数字叙事。',
      body:
        '我喜欢为工业成像构建数据驱动的视觉系统，并重视将研究转化为可用的解决方案。工程之外，我创作旅行与学习内容，记录新加坡的成长与生活。',
    },
    focusAreas: [
      {
        title: '计算机视觉',
        description: '构建用于分割、异常检测和工业图像分析的模型。',
      },
      {
        title: 'AI 研究',
        description: '开发兼具可靠性与可解释性的实用 AI 解决方案。',
      },
      {
        title: '生活与故事',
        description: '通过多媒体分享学习生活、旅行体验和个人感悟。',
      },
    ],
    projects: [
      {
        title: 'SEM 图像缺陷检测',
        description:
          '面向工业 SEM 图像的语义分割与缺陷检测，强调鲁棒性和可部署性。',
        tags: ['计算机视觉', 'PyTorch', 'U-Net'],
        href: '#',
      },
      {
        title: '物流分析仪表盘',
        description:
          '用于物流跟踪、关键指标可视化和运营洞察的数据管道与仪表盘。',
        tags: ['数据分析', 'Python', '可视化'],
        href: '#',
      },
      {
        title: 'NUS 生活与旅行短片',
        description:
          '记录校园生活、新加坡文化与旅行故事的短视频内容。',
        tags: ['内容创作', '视频', '叙事'],
        href: '#',
      },
    ],
    projectBadge: '案例',
    projectsHeading: '精选作品与研究亮点。',
    viewDetails: '查看详情 →',
    gallery: {
      label: '生活与旅行',
      heading: '来自校园、新加坡与远方的故事。',
      description: '这是展示博客、视频或反映你个性与旅程的内容的绝佳位置。',
    },
    lifeHighlights: [
      'NUS 学习生活与研究感悟',
      '新加坡美食、文化与城市故事',
      '来自亚洲及更远地区的旅行灵感',
    ],
    contact: {
      label: '联系',
      heading: '让我们保持联系。',
      description:
        '我愿意合作、实习机会和关于计算机视觉与 AI 的研究交流。如果你想一起工作或讨论想法，请与我联系。',
      emailLabel: '电子邮件',
      connectLabel: '联系方式',
      back: '回到顶部',
    },
    contactCard: {
      title: '联系',
      email: 'xinyu.tian.phoenix@gmail.com',
    },
    languageToggle: {
      switchToZh: '简体中文',
      switchToEn: 'English',
    },
  },
};

const socialLinks = [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/xinyu-tian-phoenix',
      icon: (
        <svg viewBox="0 0 24 24" fill="#0077B5" className="h-5 w-5" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
    {
      name: 'GitHub',
      href: 'https://github.com/Phoenix-XinyuTian',
      icon: (
        <svg viewBox="0 0 24 24" fill="#000000" className="h-5 w-5" aria-hidden="true">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
    },
    {
      name: 'X',
      href: 'https://x.com/Xinyu_Tian_AI',
      icon: (
        <svg viewBox="0 0 24 24" fill="#000000" className="h-5 w-5" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: 'https://www.youtube.com/@Phoenix_Tian',
      icon: (
        <svg viewBox="0 0 24 24" fill="#FF0000" className="h-5 w-5" aria-hidden="true">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/phoenixtian.vlog/',
      icon: (
        <svg viewBox="0 0 24 24" fill="url(#instagram-gradient)" className="h-5 w-5" aria-hidden="true">
          <defs>
            <linearGradient id="instagram-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor:'#833ab4',stopOpacity:1}} />
              <stop offset="50%" style={{stopColor:'#fd1d1d',stopOpacity:1}} />
              <stop offset="100%" style={{stopColor:'#fcb045',stopOpacity:1}} />
            </linearGradient>
          </defs>
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/share/1EWvuK1fBZ/?mibextid=wwXIfr',
      icon: (
        <svg viewBox="0 0 24 24" fill="#1877F2" className="h-5 w-5" aria-hidden="true">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
    },
  ];

export default function Home() {
  const [language, setLanguage] = useState<'en' | 'zh'>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const t = translations[language];
  const projects = t.projects;
  const focusAreas = t.focusAreas;
  const lifeHighlights = t.lifeHighlights;

  return (
    <main className="min-h-screen bg-white text-slate-950 selection:bg-sky-300 selection:text-slate-950">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
          <a href="#top" className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-900">
            Xinyu Tian | Phoenix
          </a>
          <nav className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
            <a href="#about" className="transition hover:text-slate-900">{t.nav.about}</a>
            <a href="#projects" className="transition hover:text-slate-900">{t.nav.projects}</a>
            <a href="#gallery" className="transition hover:text-slate-900">{t.nav.life}</a>
            <a href="#contact" className="transition hover:text-slate-900">{t.nav.contact}</a>
            <button
              type="button"
              onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
              className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:border-slate-300 hover:bg-slate-100"
            >
              {language === 'en' ? t.languageToggle.switchToZh : t.languageToggle.switchToEn}
            </button>
          </nav>
        </div>
      </header>

      <section id="top" className="relative overflow-hidden px-6 py-20 sm:px-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.14),_transparent_28%)]" />
        <div className="pointer-events-none absolute right-[-6rem] top-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(132,204,22,0.18),transparent_44%)] opacity-90" />
        <div className="pointer-events-none absolute left-1/4 bottom-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(248,113,113,0.08),transparent_48%)]" />
        <div className="mx-auto max-w-6xl">
          <p className="text-sm uppercase tracking-[0.32em] text-sky-600">{t.hero.topLabel}</p>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
            {t.hero.heading}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            {t.hero.description}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="inline-flex items-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              {t.hero.explore}
            </a>
            <a
              href="#contact"
              className="inline-flex items-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              {t.hero.contact}
            </a>
          </div>

          <div className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:backdrop-blur">
            <p className="text-sm uppercase tracking-[0.32em] text-sky-600">{t.contactCard.title}</p>
            <div className="mt-6 space-y-6 text-sm text-slate-600">
              <div>
                <p className="font-semibold text-slate-950 mb-3">{t.contact.emailLabel}</p>
                <a
                  href="mailto:xinyu.tian.phoenix@gmail.com"
                  className="text-sky-600 hover:text-sky-800"
                >
                  {t.contactCard.email}
                </a>
              </div>

              <div>
                <p className="font-semibold text-slate-950 mb-4">{t.contact.connectLabel}</p>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="border-t border-slate-200/80 bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <div className="mb-10">
            <p className="text-sm uppercase tracking-[0.32em] text-sky-600">{t.about.label}</p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              {t.about.heading}
            </h2>
            <p className="mt-6 text-pretty text-base leading-8 text-slate-600">
              {t.about.body}
            </p>
          </div>

          <div className="about-split">
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

            <div className="about-split__photo shrink-0 overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm lg:mt-1">
              <Image
                src="/images/portrait.jpeg"
                alt="Xinyu Tian portrait"
                width={600}
                height={600}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="py-20 px-6 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-sky-600">{t.nav.projects}</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                {t.projectsHeading || 'Selected work and research highlights.'}
              </h2>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {projects.map((project) => (
              <article key={project.title} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
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
                <a
                  href={project.href}
                  className="mt-6 inline-flex text-sm font-semibold text-sky-600 transition hover:text-sky-800"
                >
                  {t.viewDetails}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="border-t border-slate-200/80 bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <p className="text-sm uppercase tracking-[0.32em] text-sky-600">{t.gallery.label}</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            {t.gallery.heading}
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {lifeHighlights.map((item) => (
              <div key={item} className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
                <p className="text-base font-semibold text-slate-950">{item}</p>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {t.gallery.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-6 sm:px-8">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-slate-200 bg-white p-10 shadow-xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-sky-600">{t.contact.label}</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                {t.contact.heading}
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600">
                {t.contact.description}
              </p>
            </div>

            <div className="space-y-6 text-sm text-slate-600">
              <div>
                <p className="font-semibold text-slate-950 mb-4">{t.contact.connectLabel}</p>
                <a href="mailto:xinyu.tian.phoenix@gmail.com" className="text-sky-600 hover:text-sky-800">
                  xinyu.tian.phoenix@gmail.com
                </a>
              </div>

              <div>
                <p className="font-semibold text-slate-950 mb-4">{t.contact.connectLabel}</p>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    {socialLinks.slice(0, 3).map((item) => (
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
                  <div className="flex flex-wrap gap-3">
                    {socialLinks.slice(3).map((item) => (
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
    </main>
  );
}
