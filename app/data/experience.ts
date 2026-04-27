export interface BulletItem {
  text: string;
  highlight?: boolean;
}

export type MediaItem =
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "metric"; label: string; value: string; sublabel?: string };

export interface ExperienceLocalized {
  title: string;
  company: string;
  location: string;
  bullets: BulletItem[];
}

export interface ExperienceItem {
  id: string;
  logoSrc?: string;
  fallback: string;
  startDate: string;
  endDate: string;
  techStack: string[];
  media: MediaItem[];
  i18n: { en: ExperienceLocalized; zh: ExperienceLocalized };
}

export const experiences: ExperienceItem[] = [
  {
    id: "astar-2024",
    logoSrc: undefined,
    fallback: "A*",
    startDate: "Jun 2024",
    endDate: "Aug 2024",
    techStack: ["Python", "PyTorch", "OpenCV", "CVAT", "ResNet", "UNet"],
    media: [],
    i18n: {
      en: {
        title: "Computer Vision Research Intern",
        company: "A*STAR — Agency for Science, Technology and Research",
        location: "Singapore · On-site",
        bullets: [
          { text: "Built an end-to-end CNN-based defect detection pipeline for AOG identification on wafer SEM images." },
          { text: "Curated and pixel-annotated 288 high-resolution SEM images using CVAT to construct the training set." },
          { text: "Benchmarked classical intensity baseline, plain UNet, and ResNet34-UNet — improved IoU, Dice, and F1 under identical settings.", highlight: true },
          { text: "Deployed the model as an application prototype reporting defect count, location, area, and batch-level statistical charts.", highlight: true },
        ],
      },
      zh: {
        title: "计算机视觉研究实习生",
        company: "A*STAR — 新加坡科学、技术与研究局",
        location: "新加坡 · 线下",
        bullets: [
          { text: "构建端到端 CNN 缺陷检测流水线，用于晶圆 SEM 表面图像中 AOG 的识别。" },
          { text: "通过 SEM 设备手动采集并使用 CVAT 进行像素级标注，构建包含 288 张高分辨率图像的训练集。" },
          { text: "对比经典灰度基线、纯 UNet 和 ResNet34-UNet，在相同设置下提升了 IoU、Dice 和 F1 指标。", highlight: true },
          { text: "将模型部署为应用原型，自动输出缺陷数量、位置、面积及批次统计图表，支持更快速客观的材料表征。", highlight: true },
        ],
      },
    },
  },
];
