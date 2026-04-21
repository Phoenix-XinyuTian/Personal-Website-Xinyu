# Site Audit — xinyutian.me

> Phase 1 only. Zero code changes. All findings reference specific file locations.
> Generated: 2026-04-22

---

## 1. 代码与架构

### 1-A. God File — 1674 行的 page.tsx
- **位置**: `app/page.tsx`
- **问题**: 翻译对象(380 行)、社交链接、图片数组、Logo 资产、7 个子组件函数、主 Home 组件，全部压缩在一个文件里。任何内容改动都需要在 400+ 行 JSX 中定位。
- **为什么是问题**: 不可测试、不可复用、协作困难；IDE 导航崩溃；单个 diff 会跨越无关逻辑。
- **方案**:
  - A: 翻译 → `lib/i18n/`，组件 → `components/home/`，零依赖引入。Trade-off: 简单但仍为手动 key 管理。
  - B: 引入 `next-intl`，JSON 驱动翻译，路由级 i18n。Trade-off: 需要重构路由结构，L 级工作量，但可扩展性最好。
- **估算**: S(翻译抽离) + M(组件拆分)

---

### 1-B. 整页 `"use client"` 无法 SSR
- **位置**: `app/page.tsx:1`
- **问题**: 整个 page 是 Client Component，导致 Next.js App Router 的 RSC/SSG 优势全部失效，首次 HTML 返回空壳再客户端渲染，LCP 变差。
- **为什么是问题**: Education、Experience、Contact 等静态内容完全不需要客户端状态，被无谓地客户端化。
- **方案**:
  - A: 提取一个薄 `<ClientShell>` 只包裹 Header（mode/language state），其余 section 保持 RSC。Trade-off: 需要将 mode/language props drilling 或 Context 传下去。M 级。
  - B: 将 mode/language 改为 URL search params (`?mode=work&lang=en`)，实现真正 SSR。Trade-off: URL 会带参数，且需要处理 hydration 闪烁。L 级。
- **估算**: M-L

---

### 1-C. Tailwind v4 + 无效的 v3 配置文件
- **位置**: `tailwind.config.mjs:1-14`
- **问题**: 项目使用 Tailwind v4（`@tailwindcss/postcss` v4.2.2），v4 采用 CSS-first 配置方式（`globals.css` 中的 `@theme` 块）。但仓库里保留了 v3 格式的 `tailwind.config.mjs`，该文件在 v4 下**完全被忽略**。
- **为什么是问题**: 任何写进 `tailwind.config.mjs` 的自定义（颜色 token、breakpoint 等）都会静默失效，造成误导。
- **方案**: 删除 `tailwind.config.mjs`，将定制化移入 `globals.css` 的 `@theme` 块。
- **估算**: S

---

### 1-D. globals.css 中的死代码
- **位置**: `app/globals.css:11-12`, `app/globals.css:20-29`
- **问题 1**: `@theme inline` 块引用了 `--font-geist-sans` 和 `--font-geist-mono`，但 `layout.tsx` 加载的是 Manrope 和 Cormorant，Geist 字体从未引入。
- **问题 2**: `body` 的 font-family 是 `Arial, Helvetica, sans-serif`（第 18 行），完全覆盖了 Manrope 变量 — 网站当前实际以 Arial 渲染。
- **问题 3**: `html.dark textarea/input` 的深色模式 CSS（第 20-29 行）存在，但网站没有深色模式切换，是彻底的死代码。
- **为什么是问题**: 字体加载了却没使用，用户看到的是 Arial 而非设计字体；深色模式 CSS 增加了维护混乱。
- **方案**: 删除死代码，将 `body { font-family: var(--font-manrope), sans-serif; }` 写入 globals.css。
- **估算**: S

---

### 1-E. `educationLogoAssets[index]` 无边界守护
- **位置**: `app/page.tsx:983`
- **问题**: `{...educationLogoAssets[index]}` — 如果 `education.entries` 超过 2 条，index 会越界，返回 `undefined`，spread 会运行时报错。相同逻辑在 `experienceLogoAssets` 里有 `?? experienceLogoAssets[0]` 守护（第 1320 行），但 education 没有。
- **为什么是问题**: 低概率但会 crash，且违反一致性。
- **方案**: 添加 `?? educationLogoAssets[0]` 守护。
- **估算**: S

---

### 1-F. `portrait.png` 是一个 JPEG 文件
- **位置**: `public/images/portrait.png`
- **问题**: `file` 命令确认该文件实际是 JPEG 格式，文件扩展名错误。`page.tsx` 引用的是 `portrait.jpeg`（正确），所以 `.png` 版本是孤立的未使用文件。
- **方案**: 删除 `public/images/portrait.png`。
- **估算**: S

---

### 1-G. 图片中含有 GPS Exif 数据
- **位置**: `public/images/portrait.jpeg`, `public/images/3.jpeg`, `public/images/16.jpeg`
- **问题**: `file` 命令输出显示这三张图片包含 GPS 坐标数据（"GPS-Data"）。这些图片对所有访问者公开，任何人都可以从图片 Exif 中提取拍摄地点。
- **为什么是问题**: 隐私风险，会泄露你的住所或常出没地点。
- **方案**: 部署前用 `exiftool -all= public/images/*.jpeg public/images/*.jpg` 批量清除 Exif。
- **估算**: S

---

## 2. 设计与视觉

### 2-A. Work/Life 模式差异不足
- **位置**: `app/page.tsx` 全局
- **问题**: Work 模式：白色背景 + sky blue 强调色；Life 模式：`#faf8f4`（微暖白）+ amber 强调色。背景色差异极其细微，两种模式的布局、排版、卡片形状完全相同。
- **为什么是问题**: 访客切换模式后感知不到"进入了另一个世界"。Work/Life 双模式是网站核心差异点，视觉上应该有更强的区分感才能让这个设计决定成立。
- **方案**:
  - A: Life 模式使用不同排版（用 Cormorant Garamond 做大字展示标题）+ 暖色系 editorial 布局（类杂志）；Work 模式保持现有的简洁科技感。Trade-off: 工作量 L，但品牌感受最强。
  - B: 更强的背景色差（Life 用 `#fdf6e3` 暖奶油色 + amber 边框卡片）+ Life 专属 section 使用满宽图片区块。Trade-off: M 级，无需重写布局，改动集中在颜色和少量 section 结构。
- **估算**: M（方案B）或 L（方案A）

---

### 2-B. Cormorant Garamond 已加载但从未使用
- **位置**: `app/layout.tsx:10-14`
- **问题**: 4 个字重的 Cormorant Garamond 已通过 `next/font/google` 加载（产生 80-160KB 字体请求），但没有任何元素应用了 `font-[family-name:var(--font-cormorant)]` 类。
- **为什么是问题**: 白白增加了字体加载开销；同时也是一个被浪费的设计机会，Cormorant 用于 hero 标题可以立即提升视觉质感。
- **方案**:
  - A: 将 Cormorant 用于 H1/H2 展示标题，尤其在 Life 模式下，制造 serif/sans-serif 对比。(S)
  - B: 如果暂不使用，直接从 layout.tsx 中移除以节省资源。(S)
- **估算**: S

---

### 2-C. Hero 区联系卡片位置不合理（Work 模式）
- **位置**: `app/page.tsx:1633-1660`
- **问题**: 首屏 Hero 区域在展示完 3 行文字后，立即呈现一张包含邮件 + 6 个社交平台链接的联系卡片。访客连一个项目都没见到就被引导去"联系我"。
- **为什么是问题**: 招聘方在找能力证明，首屏的社交链接矩阵更像 Life 模式内容。Work 模式首屏应该引导向 Projects/Experience。
- **方案**: Hero 区保留 2 个 CTA 按钮（"Explore Projects" / "Contact Me"），联系卡片内容保留在页底 Contact Section 即可。联系卡片可以在 Life 模式 Hero 中保留（符合内容创作者的自我呈现逻辑）。
- **估算**: M

---

### 2-D. 开发中横幅颜色硬编码为 amber（与 Work 模式不协调）
- **位置**: `app/page.tsx:1610`
- **问题**: Dev banner 始终使用 `border-amber-200 bg-amber-50 text-amber-700`，无论当前是 Work 还是 Life 模式。在 Work（sky blue）模式下，amber 横幅像是 Life 模式元素的意外泄漏。
- **方案**: 跟随 `isLife` 变量切换颜色，Work 模式用 sky 系。
- **估算**: S

---

### 2-E. 颜色系统无中央 token
- **位置**: `app/page.tsx` 全局，约 30+ 处 `text-sky-600`、`bg-amber-300` 等
- **问题**: 强调色分散在所有组件的 className 中，无中央管理。若要将 Work 模式从 sky 换为另一种颜色，需逐一 grep 替换约 30 处。
- **方案**:
  - A: 在 `globals.css` 的 `@theme` 块中定义 `--color-work`, `--color-life` CSS 变量，Tailwind v4 原生支持。(M)
  - B: 不引入变量，但维持现状并注释说明色彩系统规则。(S，但无扩展性)
- **估算**: M（A 方案）

---

## 3. 移动端

### 3-A. 锚点链接未偏移固定 Header 高度
- **位置**: `app/page.tsx:1589-1605`（移动端 nav 链接）
- **问题**: 所有 section id 上没有 `scroll-mt-*` 类。点击移动端菜单中的锚点链接后，目标 section 顶部会被粘性 Header（约 56-60px）遮挡。
- **方案**: 给每个 `<section id="...">` 添加 `scroll-mt-20`（80px，覆盖 header 高度留 buffer）。
- **估算**: S

---

### 3-B. Travel 横向滚动缺少 scroll-snap 容器属性
- **位置**: `app/page.tsx:668-683`
- **问题**: 旅行画廊的卡片有 `snap-start` 但父容器 `overflow-x-auto` 没有 `scroll-snap-type: x mandatory`（Tailwind: `snap-x snap-mandatory`）。移动端划动时不会卡位，体验散乱。
- **方案**: 在 `<div className="mt-8 overflow-x-auto pb-2">` 上添加 `snap-x snap-mandatory`。
- **估算**: S

---

### 3-C. About section 图片在移动端尺寸未优化
- **位置**: `app/page.tsx:563-565`
- **问题**: `portrait.jpeg`（886×886px）没有 `sizes` 属性。Next.js 默认按 100vw 决策尺寸，在移动端可能导致比实际显示尺寸大得多的图片被下载。
- **方案**: 添加 `sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"`。
- **估算**: S

---

### 3-D. Education 画廊移动端 `sizes` 属性覆盖不精确
- **位置**: `app/page.tsx:1164`
- **问题**: `sizes="(max-width: 1023px) 100vw, 0px"` — 告诉浏览器在桌面端该图片宽度为 0，在移动端为 100vw。100vw 会导致 Next.js 在移动端选择最大分辨率变体。实际上 mobile carousel 宽度是 card 宽（约 340px）而非全屏。
- **方案**: 改为 `sizes="(max-width: 1023px) calc(100vw - 48px), 288px"`（参考 `max-w-6xl px-6` 的实际容器宽度）。
- **估算**: S

---

### 3-E. 移动端 Header 品牌名截断为 XINYU/PHOENIX，可能令人困惑
- **位置**: `app/page.tsx:1514-1515`
- **问题**: 移动端品牌名根据 mode 切换显示 `"XINYU"` 或 `"PHOENIX"`。对于第一次到访的用户，看到一个随着模式变化的品牌名可能造成"这是两个网站"的误解。
- **方案**: 固定显示 `"XINYU"` 或始终显示 `"X.T"` 等缩写，不随 mode 变化。
- **估算**: S

---

## 4. 内容与文案

### 4-A. 实习经历完全是占位文本 ⚠️
- **位置**: `app/page.tsx:113-135`（en），`app/page.tsx:300-322`（zh）
- **问题**: 两条实习记录的 company 分别是 `"Company Name"` 和 `"none"`，location 为空，bullets 是模板提示语（"Describe your core project..."）。这是招聘方必看的模块。
- **为什么是问题**: 如果网站已经对外可访问，这是最严重的内容空缺，直接影响专业感。
- **方案**: 填写真实内容（见 `CONTENT_TODO.md`）。
- **估算**: Content（需要你提供）

---

### 4-B. 项目链接全部指向 `#`
- **位置**: `app/page.tsx:68`、`74`、`80`（en），`253`、`259`、`265`（zh）
- **问题**: 三个项目的 `href: "#"` 让"View details ->"按钮毫无意义，点击只会滚回顶部。
- **为什么是问题**: 招聘方点击后发现没有内容，会认为项目不真实存在。
- **方案**:
  - A: 链接真实 GitHub repo 或 case study 页（Content 工作）。
  - B: 暂时移除"View details"链接，等内容准备好再加回来。(S)
- **估算**: S（移除）或 Content（真实链接）

---

### 4-C. Work 模式 Hero Headline 不够强
- **位置**: `app/page.tsx:28`（en）
- **问题**: "My journey in AI technology & research, while sharing life abroad" — 这是个人叙事视角，不是价值主张。"my journey" 和 "while sharing life" 对于招聘方来说是弱信号。
- **建议**: "Computer Vision Engineer | Industrial Imaging & AI Research at NUS" 或类似的角色+专长+机构三段式。
- **估算**: S（内容改动）

---

### 4-D. 中文联系描述语法不自然
- **位置**: `app/page.tsx:368`
- **问题**: "我愿意合作、实习机会和关于计算机视觉与 AI 的研究交流" — "愿意合作、实习机会" 结构混乱（动词+名词并列），是翻译腔。
- **建议**: "欢迎合作邀约、实习机会，以及关于计算机视觉与 AI 的研究讨论，欢迎随时联系。"
- **估算**: S

---

### 4-E. About Section 中 Work 模式显示"Life & Storytelling"焦点
- **位置**: `app/page.tsx:58-60`（en focusAreas 第 3 项）
- **问题**: focusAreas 第 3 条 "Life & Storytelling" 在 Work 模式下显示，稀释了给招聘方的专业信号。
- **方案**: 用 mode 参数区分 focusAreas，Work 模式显示 3 个技术方向，Life 模式显示内容创作相关。
- **估算**: S

---

### 4-F. Life 模式内容基本都是占位符
- **位置**: `app/page.tsx:620-699`（LifeSections 组件）
- **问题**: 
  - Media section：视频条目均为占位文字，travel cards 显示灰色渐变色块而无真实图片
  - Gallery section：3 个 highlight 共享相同的 `t.gallery.description` 占位说明
- **方案**: 填充真实媒体内容（见 `CONTENT_TODO.md`）。
- **估算**: Content（需要你提供）

---

## 5. 性能与 SEO

### 5-A. OG/Twitter 描述语没有信息量
- **位置**: `app/layout.tsx:22`、`29`、`35`
- **问题**: `description: "Dual-mode personal brand website for Xinyu Tian | Phoenix"` — 描述了网站结构而非人物价值。在 LinkedIn/Slack 上分享时，预览卡片的副标题会是这句话。
- **建议**: "NUS Physics Master's student · Computer Vision & AI Research · Singapore"
- **估算**: S

---

### 5-B. 没有 OG 图片
- **位置**: `app/layout.tsx:26-33`
- **问题**: `openGraph` 没有 `images` 字段，社交分享时无缩略图。`twitter.images: ["/favicon.ico"]` 用 favicon 作为 Twitter Card 图片，32×32px 不满足 `summary_large_image` 的 600×314px 最小要求。
- **方案**: 制作一张 1200×630px 的 OG 图（包含姓名、头像、职位简介），放到 `public/` 并更新 metadata。
- **估算**: M（设计+配置）

---

### 5-C. `<html lang="en">` 硬编码，不随语言切换
- **位置**: `app/layout.tsx:48`
- **问题**: 无论用户选择中文还是英文，`<html lang="en">` 不变。屏幕阅读器和搜索引擎会始终把页面当英语处理。
- **方案**:
  - A: 在 `Home` 组件中用 `useEffect(() => { document.documentElement.lang = language; }, [language])` 更新（S，hack 但有效）。
  - B: 用 Next.js App Router 的 i18n routing (`/en/`, `/zh/`)，`layout.tsx` 接收 `params.lang`（L，正确方案）。
- **估算**: S（方案A）或 L（方案B）

---

### 5-D. 缺少 sitemap.xml 和 robots.txt
- **位置**: `app/` 目录下无 `sitemap.ts` 或 `robots.ts`
- **问题**: 没有 sitemap，搜索引擎爬取效率低；没有 robots.txt，爬虫行为不受控制。
- **方案**: 分别创建 `app/sitemap.ts` 和 `app/robots.ts`（Next.js App Router 内置支持，自动生成）。
- **估算**: S

---

### 5-E. `sharp` 位于 devDependencies
- **位置**: `package.json:19`
- **问题**: `sharp` 是 Next.js 图片优化的运行时依赖，放在 `devDependencies` 在 Vercel 构建时没问题，但在自托管 Node.js 环境（如 Docker）中 `npm install --production` 会跳过它，导致运行时报错。
- **方案**: 移至 `dependencies`。
- **估算**: S

---

## 6. 可维护性

### 6-A. 内容与代码高度耦合
- **位置**: `app/page.tsx:9-383`（翻译对象）、`61-82`（projects）、`87-135`（education/experience）
- **问题**: 所有简历内容（简介、项目描述、教育经历、实习 bullets）都嵌在 React 文件中，修改文案需要编辑组件代码。
- **方案**:
  - A: 抽取至 `lib/i18n/en.ts` 和 `lib/i18n/zh.ts`（S，无新依赖，最快）。
  - B: 使用 JSON 文件 + 简单 `useTranslation` hook（S-M，稍好的可读性）。
  - C: 接入 Contentlayer 或 Sanity（L，适合内容频繁更新时再考虑）。
- **估算**: S（方案A/B）

---

### 6-B. i18n 无正式类型契约
- **位置**: `app/page.tsx:385`
- **问题**: `type Translation = (typeof translations)[SiteLanguage]` 依赖两个语言版本在同一对象里来保证 key 对等。一旦将 en/zh 拆分为独立文件，这个类型保障就消失了。
- **方案**: 定义显式接口 `interface SiteTranslations { nav: {...}; hero: {...}; ... }` 并对两个语言版本做类型断言。
- **估算**: S

---

### 6-C. 无 CI/CD 流水线
- **位置**: 项目根目录，无 `.github/workflows/`
- **问题**: 没有自动化 lint + build 检查，push 坏代码不会被发现直到手动构建。
- **方案**: 添加 GitHub Actions workflow：`npm run lint && npm run build`，在每次 PR 时自动运行。
- **估算**: S

---

### 6-D. `app/home` 目录不存在，`components/home` 为空
- **位置**: `components/home/`（空目录）
- **问题**: 有占位目录但没有文件。7 个子组件都放在 `page.tsx` 中而不是这里。
- **方案**: 与 1-A（组件拆分）一起处理。
- **估算**: M（结合 1-A）

---

## 优先级总表

### 🔴 Critical（必须修）

| ID | 问题 | 文件 | 估算 |
|----|------|------|------|
| 4-A | 实习经历全是占位文本，Company 为"none"，对外可见 | page.tsx:113-135 | Content |
| 4-B | 所有项目"View details"链接指向 `#`，点击无效果 | page.tsx:68,74,80 | S |
| 1-G | 三张图片含 GPS Exif 数据，泄露位置隐私 | public/images/ | S |
| 1-D | body 字体实际是 Arial，Manrope 未生效 | globals.css:18 | S |
| 3-A | 锚点导航被固定 Header 遮挡，移动端 UX 破损 | page.tsx:1589 | S |

### 🟡 Important（强烈建议，影响招聘方观感）

| ID | 问题 | 文件 | 估算 |
|----|------|------|------|
| 2-A | Work/Life 双模式视觉差异过弱，核心设计理念无法感知 | page.tsx 全局 | M |
| 2-C | Hero 区联系卡片位置前置，Work 模式首屏未展示任何能力证明 | page.tsx:1633 | M |
| 4-C | Work Hero Headline 是叙事视角而非价值主张 | page.tsx:28 | S |
| 2-B | Cormorant 字体加载但从未使用，浪费资源且错失设计机会 | layout.tsx:10 | S |
| 5-A | OG 描述无信息量，社交分享预览质量差 | layout.tsx:22 | S |
| 5-B | 无 OG 图片，社交分享无缩略图（Twitter card 用 favicon） | layout.tsx:26 | M |
| 5-C | `<html lang>` 不随语言切换，屏幕阅读器/SEO 异常 | layout.tsx:48 | S |
| 5-D | 缺少 sitemap.xml 和 robots.txt | app/ | S |
| 4-D | 中文联系描述语法不自然（翻译腔） | page.tsx:368 | S |
| 4-E | Work 模式 focusAreas 显示"Life & Storytelling"，稀释专业信号 | page.tsx:58 | S |
| 2-D | Dev banner 在 Work 模式下硬编码 amber 色，视觉不一致 | page.tsx:1610 | S |
| 1-C | tailwind.config.mjs 在 v4 下无效，存在误导风险 | tailwind.config.mjs | S |

### 🟢 Nice-to-have（锦上添花）

| ID | 问题 | 文件 | 估算 |
|----|------|------|------|
| 1-A | page.tsx 过大，翻译/组件应拆分至独立文件 | page.tsx | M |
| 1-B | 整页 `"use client"` 阻碍 SSR，静态内容无法预渲染 | page.tsx:1 | M-L |
| 2-E | 颜色系统无中央 token，全局换色成本高 | page.tsx 全局 | M |
| 3-B | Travel 横向滚动缺少 `snap-x snap-mandatory` | page.tsx:668 | S |
| 3-C/D | 图片缺少精确 `sizes` 属性，可能导致过大图片下载 | page.tsx:563, 1164 | S |
| 3-E | 移动端品牌名随 mode 变化可能造成"两个网站"困惑 | page.tsx:1514 | S |
| 1-E | `educationLogoAssets[index]` 无边界守护 | page.tsx:983 | S |
| 1-F | `portrait.png` 扩展名错误（实为 JPEG） | public/images/ | S |
| 5-E | `sharp` 放在 devDependencies | package.json:19 | S |
| 6-A | 内容与代码耦合，更新简历需改 React 文件 | page.tsx:9-383 | S-M |
| 6-C | 无 GitHub Actions CI/CD | — | S |

---

## 内容待补充清单

见 `CONTENT_TODO.md`（将在确认 Phase 2 后单独生成）。主要缺口：
- 实习公司名称、地点、职责描述（有量化成果最佳）
- 项目的真实 GitHub/案例链接
- Life 模式的媒体频道链接和真实视频
- Travel section 真实照片
- 一张 1200×630 OG 图

---

*Phase 1 完成。等你确认后再进入 Phase 2。*
