# Website Roadmap

> 本文档用于记录 Xinyu Tian / Phoenix Tian 个人网站的长期建设路线图，并作为后续规划、实施与复盘的维护基准。

## 1. 网站定位

这个网站不是一次性的 portfolio，而是专业身份、个人品牌与长期内容资产的统一入口。

网站需要同时承载两套相互关联但叙事清晰的身份：

- **专业身份：Xinyu Tian**
  - 服务于求职与职业发展。
  - 展示 AI、Computer Vision、Machine Learning、Applied AI 与工程实践能力。
  - 建设 LinkedIn、GitHub、Google Scholar 与 Google Search 等专业搜索资产。
- **个人品牌身份：Phoenix Tian / Phoenix 蓝色火焰**
  - 服务于内容创作与个人品牌建设。
  - 承载 Gallery、Journal、旅行经历、成长记录与个人表达。
  - 建立具有辨识度、可持续积累的个人品牌形象。

长期目标：

- 建立专业、可信的个人主页。
- 承接 LinkedIn、GitHub、Google Scholar、X、YouTube、Instagram 等平台流量。
- 同时服务职业发展与个人品牌建设。
- 让访问者快速理解：我是谁、我做什么、我能提供什么价值、如何联系我。
- 将网站建设为 Xinyu / Phoenix 双身份的总入口和长期品牌资产。

## 2. 当前阶段目标

当前阶段不追求复杂特效，优先将基础体验打磨到稳定、专业、可信。

优先级：

1. Desktop Experience
2. Mobile Experience
3. Tablet Testing
4. SEO Metadata
5. Open Graph / Social Preview
6. Performance
7. Accessibility

## 3. 成功标准

如果做到以下几点，网站已经达到优秀个人网站水平：

- Desktop 完整优化。
- Mobile 完整优化。
- iPad / Tablet 无错位、无溢出、无布局崩坏。
- Google SEO 正常。
- Open Graph 社交分享预览正常。
- 页面加载速度稳定。
- 主要 CTA 清晰，包括 Resume、GitHub、LinkedIn、Contact。
- Work Mode 与 Life Mode 的身份叙事清晰区分。

## 4. Phase 1：基础体验完善

### Desktop

目标设备：

- MacBook
- Windows laptop
- 外接显示器

检查重点：

- Hero section 是否清晰。
- About、Experience、Projects 等模块是否有良好视觉层级。
- 图片是否清晰且比例正常。
- CTA 按钮是否醒目。
- 页面滚动节奏是否自然。

### Mobile

目标设备：

- iPhone
- Android phone

检查重点：

- 导航是否好用。
- 字号是否舒适。
- 卡片是否适配窄屏。
- 按钮是否容易点击。
- 图片是否不会压缩变形。
- Work / Life mode 切换是否顺畅。

### Tablet

目标设备：

- iPad Air / iPad Pro 竖屏
- iPad Air / iPad Pro 横屏

目标不是单独设计一套 iPad 页面，而是确保：

- 无错位。
- 无溢出。
- 无布局崩坏。
- 视觉密度合理。

## 5. Phase 2：搜索与传播资产

### SEO

需要完善：

- `metadata.title`
- `metadata.description`
- `sitemap`
- `robots.txt`
- Canonical URL
- Favicon / icon / Apple icon

重点搜索词：

- Xinyu Tian
- Xinyu Tian NUS
- Xinyu Tian Computer Vision
- Xinyu Tian AI
- Xinyu Tian Singapore
- Phoenix Tian
- Phoenix 蓝色火焰

长期目标：

- 搜索 Xinyu Tian 时，个人网站、LinkedIn、GitHub、Google Scholar 能稳定出现在首页。
- 搜索 Phoenix Tian 时，个人网站和内容平台逐渐建立关联。

### Open Graph

需要确保网站链接分享到以下平台时有良好预览：

- LinkedIn
- X / Twitter
- WhatsApp
- Telegram
- Discord
- WeChat

理想预览内容：

- **标题：** Xinyu Tian | Phoenix Tian
- **简介：** Computer Vision, AI Engineering, and personal storytelling.
- **图片：** 清晰、专业、有品牌感的 OG image。

## 6. Phase 3：内容资产建设

### Projects

目标：

- 展示最能代表技术能力的项目。
- 不只是列项目，而是讲清楚问题、方法、结果和技术栈。

优先展示：

- Computer Vision
- Machine Learning
- Applied AI
- Industrial Imaging
- AI tools / demos
- Personal website itself as a build-and-ship project

### Gallery

目标：

- 展示 Phoenix 的生活审美、旅行经历、国际视野和个人品牌气质。

内容方向：

- 旅行照片
- 城市记录
- 学校与活动
- 高质量生活片段
- 科技会议 / 展会 / meetup

原则：

- 不做杂乱相册。
- 不做低质量朋友圈。
- 用 Gallery 强化个人品牌，而不是削弱专业形象。

### Journal

目标：

- 记录成长、学习、旅行、技术思考和个人品牌建设。
- 逐渐形成可被搜索、可被分享、可长期积累的内容资产。

可能栏目：

- Learning Notes
- Travel Notes
- Tech Reflections
- Building in Public
- Personal Growth

## 7. Phase 4：视觉与交互升级

在基础体验、SEO 和内容结构稳定后，再逐步加入高级视觉体验。

优先级：

1. Hero 入场动画
2. Card hover 微交互
3. Section scroll reveal
4. Navbar blur / sticky effect
5. Smooth scroll
6. Page transition
7. Gallery animation

原则：

- 克制、高级、流畅。
- 不为了炫技而牺牲可读性。
- 不影响移动端体验。
- 不显著拖慢加载速度。
- 每次只新增一个特效，便于测试和回滚。

## 8. Phase 5：长期系统能力

### Dark Mode

未来可以支持：

- Light
- Dark
- Auto

Dark Mode 适合科技感个人网站，但不应早于基础体验和内容建设。

### CMS / 手机内容更新

未来如果 Gallery / Journal 更新频率提高，可以考虑接入内容后台，让手机端可以：

- 上传照片。
- 编辑 Gallery。
- 发布 Journal。
- 修改旅行感悟。
- 保存草稿。

可选方案：

- Headless CMS
- Notion / Airtable as content source
- 自建轻量内容后台

### PWA

未来可以考虑让网站支持：

- Add to Home Screen
- App-like experience
- 更适合 Phoenix Gallery / Journal 长期访问

## 9. 不优先投入的方向

当前阶段不需要重点优化：

- TV
- Apple Vision Pro
- 折叠屏专项设计
- 超复杂 WebGL / 3D 特效
- 过度动画化的 Apple-style storytelling

原因：

这些方向对当前求职、搜索曝光、个人品牌初期积累的边际收益，低于 Desktop、Mobile、SEO、Open Graph 和内容资产建设。

## 10. 长期原则

网站建设优先级：

> 内容清晰 > 信息可信 > 搜索可见 > 传播友好 > 视觉高级 > 特效复杂

长期目标不是一次性做出完美网站，而是持续迭代成：

- 专业可信的 portfolio。
- 可搜索的个人品牌主页。
- 多平台身份总入口。
- Phoenix / Xinyu 双身份的长期数字资产。
