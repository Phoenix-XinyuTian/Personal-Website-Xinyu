import type { Translation } from "./en";

export const zh: Translation = {
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
    heading: "现在你知道我是谁了",
    description:
      "NUS 硕士生，专注于计算机视觉，AI研究，同时兼顾自媒体创作、旅行与个人成长的内容。",
    explore: "探索",
    contact: "联系方式",
  },
  lifeHero: {
    topLabel: "Xinyu Tian | Phoenix",
    heading: "你将知道我喜欢什么",
    description:
      "该模式展示我的自媒体方向、旅行内容和个人反思，同时保持统一的个人品牌风格。",
    explore: "探索媒体",
    contact: "联系方式",
  },
  about: {
    label: "关于我",
    heading: "NUS 硕士生，探索计算机视觉、人工智能与数字叙事",
    body: "我喜欢为工业成像构建数据驱动的视觉系统，并重视将研究转化为可用的解决方案。工程之外，我创作旅行与学习内容，记录新加坡的成长与生活。",
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
        website: "https://www.nus.edu.sg",
        description: "研究方向为计算机视觉、语义分割以及工业成像系统的AI解决方案。",
        bullets: [
          "研究基于深度学习的语义分割与异常检测技术，应用于工业SEM成像领域。",
          "使用 PyTorch 开发端到端计算机视觉流程，构建可部署的原型系统。",
          "与科研团队合作，推进AI驱动的先进制造质量检测解决方案。",
        ],
        skills: ["计算机视觉", "深度学习", "机器学习", "Python", "PyTorch", "OpenCV"],
      },
      {
        degree: "理学学士",
        field: "应用物理学",
        institution: "西南交通大学",
        period: "2021年9月 – 2025年6月",
        location: "中国，成都",
        website: "https://www.swjtu.edu.cn",
        description: "本科阶段专注于应用物理学的研究与实践，积累了扎实的理论基础和实验技能。",
        bullets: [
          "系统学习光学、电磁学、量子力学及计算物理等核心课程。",
          "参与实验室科研项目，掌握数据分析与仪器操作技能。",
          "以优异成绩毕业，为研究生阶段的深度研究奠定坚实基础。",
        ],
        skills: ["C", "C++", "Python", "MATLAB", "NumPy", "公共演讲"],
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
      { name: "普通话", level: "母语", flag: "🇨🇳" },
      { name: "英语", level: "专业", flag: "🇬🇧" },
      { name: "粤语", level: "初学者", flag: "🇭🇰" },
      { name: "日语", level: "初学者", flag: "🇯🇵" },
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
      { name: "Instagram", role: "视觉化内容与旅行瞬间" },
      { name: "X", role: "短观点、动态更新与AI/生活片段" },
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
};
