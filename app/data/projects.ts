export interface ProjectItem {
  id: string;
  href: string;
  i18n: {
    en: { title: string; description: string; tags: readonly string[] };
    zh: { title: string; description: string; tags: readonly string[] };
  };
}

export const projects: ProjectItem[] = [
  {
    id: "sem-defect",
    href: "#",
    i18n: {
      en: {
        title: "SEM Image Defect Detection",
        description:
          "Semantic segmentation and defect detection for industrial SEM imagery, focusing on robustness and deployment-ready design.",
        tags: ["Computer Vision", "PyTorch", "U-Net"],
      },
      zh: {
        title: "SEM 图像缺陷检测",
        description: "面向工业 SEM 图像的语义分割与缺陷检测，强调鲁棒性和可部署性。",
        tags: ["计算机视觉", "PyTorch", "U-Net"],
      },
    },
  },
  {
    id: "analytics",
    href: "#",
    i18n: {
      en: {
        title: "Logistics Analytics Dashboard",
        description:
          "A data pipeline and dashboard for logistics tracking, KPI visualization, and operational insights.",
        tags: ["Data Analytics", "Python", "Visualization"],
      },
      zh: {
        title: "RGBD多模态图像识别",
        description: "基于RGBD图像的物体识别与分类，强调多模态融合与场景理解。",
        tags: ["计算机视觉", "PyTorch", "多模态"],
      },
    },
  },
  {
    id: "vlog",
    href: "#",
    i18n: {
      en: {
        title: "NUS Life & Travel Vlogs",
        description:
          "Short-form video content documenting campus life, Singapore culture, and travel stories.",
        tags: ["Content Creation", "Video", "Storytelling"],
      },
      zh: {
        title: "NUS 生活与旅行短片",
        description: "记录校园生活、新加坡文化与旅行故事的视频内容。",
        tags: ["内容创作", "视频", "叙事"],
      },
    },
  },
];
