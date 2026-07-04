<!-- BEGIN:nextjs-agent-rules -->
# 这不是你记忆中的 Next.js

本项目使用的 Next.js 版本带有破坏性变化；API、约定和文件结构都可能不同于你的训练数据。写任何代码前，必须先阅读 `node_modules/next/dist/docs/` 里的相关指南，并注意弃用提示。
<!-- END:nextjs-agent-rules -->

## 双域名审查规则

这个网站是一个双域名个人品牌资产。凡是审查、审计、测试或优化网站，都要同时考虑两个生产域名：

- `https://xinyutian.me`：面向专业身份 Xinyu Tian。
- `https://phoenixtian.com`：面向创作者身份 Phoenix Tian。

除非用户明确把任务范围限定到某一个域名，否则 SEO、Open Graph / Twitter cards、canonical URLs、favicons、metadata、导航、外部链接、analytics 和上线准备检查都必须同时验证两个域名。

## 项目定位

这是 Xinyu Tian / Phoenix Tian 的双身份个人网站，不是一次性的 portfolio，而是专业身份、创作者身份、搜索资产和长期内容资产的统一入口。

- Work / Xinyu Tian：服务于职业发展、研究经历、Computer Vision、Machine Learning、AI Applications、工程实践、简历、LinkedIn、GitHub 和 Google Scholar 等专业资产。
- Life / Phoenix Tian：服务于内容创作、旅行记录、双语表达、YouTube / Instagram / TikTok / 小红书 / Bilibili / Douyin 等平台资产。
- 长期叙事要保持“双身份的总入口和长期品牌资产”这个定位，不能退化成普通作品集页面。

## 技术栈

- Next.js `16.2.2`，App Router。
- React `19.2.4`。
- TypeScript，`strict: true`。
- Tailwind CSS v4，通过 `@tailwindcss/postcss` 接入。
- 主要依赖包括 `@vercel/analytics`、`lucide-react`、`maplibre-gl`、`react-medium-image-zoom`、`simple-icons`、`country-flag-icons` 和 `sharp`。
- 测试与验证工具包括 ESLint、TypeScript 编译链和 Playwright 依赖。

## 常用命令

- `npm run dev`：启动本地开发服务器。
- `npm run build`：生产构建。
- `npm run start`：运行生产构建。
- `npm run lint`：运行 ESLint。

如果修改页面、组件、样式、metadata、路由、图片或 API，至少运行与改动相关的检查；影响上线体验时优先跑 `npm run build`。

## 当前架构

- `app/page.tsx` 是 Server Component。它读取 `searchParams.mode` 和请求 hostname，决定首屏默认 `work` 或 `life` 模式。
- `app/HomeClient.tsx` 是客户端交互壳，负责 Work / Life 模式切换、语言切换、滚动锚点、淡入淡出过渡和 section 组合。
- `app/site-host.ts` 封装服务端 hostname 读取逻辑；`phoenixtian` hostname 默认进入 Life 模式，其他域名和 localhost 默认进入 Work 模式。
- `app/layout.tsx` 负责字体、全局 metadata、动态 canonical、Open Graph、Twitter card、favicon、robots 配置、JSON-LD、Vercel Analytics 和 Google Analytics。
- `app/opengraph-image.tsx`、`app/twitter-image.tsx` 和 `app/og-card.tsx` 生成域名感知的 1200x630 社交分享图。
- `app/sitemap.ts` 和 `app/robots.ts` 会根据当前 hostname 输出对应域名的 sitemap / robots 信息。

## 组件地图

- 通用组件在 `app/components/`：`Header`、`HeroSection`、`AboutSection`、`NewsSection`、`ContactSection`、`Footer`。
- Work 模式组件在 `app/components/work/`：`ExperienceSection`、`SkillsSection`、`ProjectsSection`、`EducationSection`。
- Life 模式组件在 `app/components/life/`：`MediaSection`、`YoutubeGallery`、`TravelSection`、`LanguageSection`。
- UI 小组件在 `app/components/ui/`：`EntityLogo`、`LanguageDropdown`、`SkillChip`。
- `app/components/life/LifeSection.tsx` 仍存在，但当前主页面组合没有直接使用它。

## 数据与内容来源

- 双语文案在 `app/data/i18n/en.ts` 和 `app/data/i18n/zh.ts`。修改公开文案时，优先同步维护英文和中文。
- 社交平台链接在 `app/data/social.tsx`，同时服务 About、Contact、Media 和结构化数据相关叙事。
- 经历数据在 `app/data/experience.ts`，当前重点经历是 A*STAR Computer Vision Research Intern。
- 项目数据在 `app/data/projects.ts`；当前三个项目的 `href` 仍是 `"#"`，这是上线前需要处理的内容缺口。
- 技能数据在 `app/data/skills.ts`，使用 `simple-icons` 和本地 logo 资产。
- 教育图片和学校 logo 在 `app/data/education.ts`。
- 旅行地图、地点、行程和相册数据在 `app/data/travel.ts`。
- `notion-import/` 里是未来导入 Notion 的旅行地点和 Trips CSV 种子，不是当前页面的直接数据源。

## 静态资产

- 公开图片、头像、简历和图标位于 `public/`。
- 关键头像包括 `public/images/Xinyu-Tian.jpg` 和 `public/images/Phoenix-Tian.jpg`。
- 公开简历是 `public/Xinyu-Tian-Resume-Public.pdf`。
- 学校、公司、AI 工具和社交平台 logo 位于 `public/logos/`。
- `public/project/` 中有项目相关图片资产。

## 环境变量和外部服务

- `YOUTUBE_API_KEY`：供 `app/api/youtube/route.ts` 调用 YouTube Data API，获取 `Phoenix_Tian` 频道最新视频、播放量和时长。不要在文档、日志或回答中泄露真实值。
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`：如果存在，`app/layout.tsx` 会加载 Google Analytics。
- `@vercel/analytics` 始终在 layout 中挂载。
- `next.config.ts` 允许开发来源 `192.168.1.246`，并允许 `i.ytimg.com` 与 `img.youtube.com` 作为远程图片来源。

## 样式与设计注意事项

- 全局样式入口是 `app/globals.css`，Tailwind v4 通过 CSS-first / PostCSS 工作。
- `tailwind.config.mjs` 仍是旧式 Tailwind v3 风格配置，维护时不要误以为所有设计 token 都从这里生效。
- 当前界面使用 Work / Life 双模式，但整体背景、Header、Hero、About、Cards、旅行地图和画廊都共享同一个页面系统。
- `layout.tsx` 加载 Manrope 与 Cormorant Garamond；`globals.css` 当前仍有默认 Arial 与旧 Geist token 残留，改字体时要一起核对。

## SEO 与双身份规则

- `layout.tsx` 中的 `SEO_CONFIG` 分别定义 Phoenix 与 Xinyu 两套 title、description、canonical、siteName、icon、image、keywords 和 brandRole。
- JSON-LD 使用同一个 Person `@id`，把 Xinyu Tian、Tian Xinyu、田新宇、Phoenix Tian、Phoenix 蓝色火焰以及所有平台链接合并为同一个人，避免搜索引擎把双域名理解成两个不同实体。
- `xinyutian.me` 要优先强调 Computer Vision、AI Applications、NUS、职业发展和专业可信度。
- `phoenixtian.com` 要优先强调 Creator Brand、Tech / Travel / Life、Singapore、双语内容和平台链接。
- 改 metadata、OG 图、favicon、sitemap、robots、structured data 或平台链接时，必须同时检查两个域名的输出，除非任务明确只改一个域名。

## 文档现状

- `docs/website-roadmap.md` 是长期路线图，中文为主，保留必要英文关键词。
- `README.md` 描述了项目基础信息，但部分内容可能落后于当前源码；例如当前内容已经拆到 `app/data/` 与 `app/components/`，不再是所有文案都集中在 `app/page.tsx`。
- `AUDIT.md` 是 2026-04-22 的阶段性审计记录，其中不少问题已经被当前源码改过；引用前必须重新核对现状。
- `CLAUDE.md` 只指向 `@AGENTS.md`。

## 维护边界

- 用户如果明确要求只改某个文件或某类文档，必须严格遵守范围，不要顺手修改页面代码、组件、样式或配置。
- 不要自动 commit、push，除非用户明确要求。
- 处理网站审查、优化、上线准备或 SEO 任务时，必须把两个域名一起纳入检查。
- 修改 Next.js 相关 API、路由、metadata、image、headers、server / client component 边界前，先阅读 `node_modules/next/dist/docs/` 中对应版本文档。
- 不要把 `.env.local`、`.next/`、`node_modules/`、`tsconfig.tsbuildinfo`、`.DS_Store` 或其他生成/本地文件纳入提交。
