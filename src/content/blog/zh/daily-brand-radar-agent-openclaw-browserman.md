---
title: "用 OpenClaw 和 BrowserMan 搭一个每天 8 点汇报的品牌雷达 Agent"
description: "一篇可执行教程：用 ClawMama 或 OpenClaw、BrowserMan 真实浏览器、Google 搜索和定时 prompt，搭建每天自动汇报品牌、竞品和社媒动态的 AI agent。"
lang: zh
translationKey: daily-brand-radar-agent-openclaw-browserman
pubDate: 2026-04-28
heroImage: ../../../assets/og/daily-brand-radar-agent-openclaw-browserman.png
---

很多品牌监控其实不是缺方法，而是缺一个每天稳定执行的人。

你可能会打开 Google，搜品牌名；再看小红书、微博、知乎、抖音、B 站；再去看竞品官网、价格页、淘宝/天猫店铺、评论区、公众号文章。看完以后，复制几个链接，写几条判断。第二天又要重来一遍。

这类工作很适合交给 AI agent。

不是因为 agent 比运营或市场负责人更懂品牌，而是因为这个流程天然重复、依赖浏览器、依赖证据：搜索、打开、判断、保存链接、对比变化、汇报重点。

这篇文章给一个可以落地的方案：用 OpenClaw / ClawMama 加 BrowserMan，搭一个每天早上 8 点给你汇报的品牌雷达 agent。

中文读者可以把例子换成：消费品牌、跨境电商品牌、AI 产品、独立开发产品、服务商、MCN、出海工具。流程一样，只是监控的网站不同。

## 这个 agent 要做什么

每天早上，它应该能完成这些事：

1. 用 Google 搜索你的品牌和竞品。
2. 找到官网、博客、价格页、文档、社媒账号和第三方提及。
3. 检查最近 24-48 小时有没有新内容、新评价、新讨论。
4. 查看竞品官网、活动页、价格页、更新日志和社媒动态。
5. 保存来源链接和简短摘录。
6. 早上 8 点给你一份简短报告。

理想输出不是泛泛的 AI 总结，而是这样：

```text
每日品牌雷达 — 2026-04-29

1. 重要提及
- ...

2. 竞品变化
- ...

3. 社媒/用户信号
- ...

4. 今日机会
- ...

5. 建议动作
- ...
```

## 第一步：选择 OpenClaw 部署方式

你需要一个 agent 运行环境。

### 方案 A：推荐用 ClawMama 快速部署

如果你不想折腾服务器，我建议从 [ClawMama](https://clawmama.run/) 开始。

ClawMama 是托管版 OpenClaw。你可以从 Telegram 创建一个 OpenClaw bot，不需要自己管理服务器、运行时、存储、睡眠唤醒和部署流程。

典型流程：

1. 打开 [clawmama.run](https://clawmama.run/)。
2. 在 Telegram 里启动 ClawMama bot。
3. 用 [BotFather](https://t.me/BotFather) 创建一个 Telegram bot token。
4. 给 ClawMama 发送 `/create`。
5. 粘贴 BotFather token。
6. 选择模板。
7. 等 ClawMama 自动部署你的 OpenClaw bot。

对于市场、增长、运营、创始人来说，这条路径更适合：先把 agent 跑起来，再慢慢优化。

### 方案 B：自己安装 OpenClaw

如果你想自己控制运行环境，可以直接安装 OpenClaw。

参考：

- OpenClaw: [https://openclaw.ai](https://openclaw.ai)
- 文档: [https://docs.openclaw.ai](https://docs.openclaw.ai)
- GitHub: [https://github.com/openclaw/openclaw](https://github.com/openclaw/openclaw)

自部署适合需要更强控制的人：模型供应商、运行环境、存储、安全策略、部署方式都可以自己决定。

## 第二步：安装 BrowserMan 插件并连接真实浏览器

接下来要让 agent 能使用真实浏览器。

打开 [browserman.run](https://browserman.run/)，安装 BrowserMan Chrome extension，并把你的 Chrome 浏览器连接上。

这一步很关键。品牌雷达不是只读一个静态网页，它经常要看：

- Google 搜索结果，
- 小红书/微博/知乎/抖音/B 站等平台页面，
- X、LinkedIn、Reddit，
- 竞品官网、价格页、文档和更新日志，
- 淘宝、天猫、京东、Amazon 等电商页面，
- 需要登录态的后台或工具。

BrowserMan 的思路是 delegated access：

- agent 可以获得有范围的浏览器访问权限，
- cookies 留在你的浏览器里，
- 不需要把账号密码粘贴给 AI，
- 你可以审计它做了什么，
- 不想用了可以撤销授权。

连接后，可以用 CLI 检查：

```bash
npm install -g browserman-cli
browserman setup
browserman doctor
browserman browser ping --json
```

或者不用全局安装，直接用 `npx`：

```bash
npx -y browserman-cli setup
npx -y browserman-cli doctor
npx -y browserman-cli browser ping --json
```

## 第三步：在 OpenClaw 里加入 BrowserMan 能力

OpenClaw 通过 skills 教 agent 如何使用外部工具。

你可以用 [ClawHub](https://clawhub.com/) 或 OpenClaw 的 skills 系统查找和安装相关 skill：

```bash
npx -y clawhub search browserman
npx -y clawhub install <browserman-skill-slug>
openclaw skills list
openclaw skills check
```

如果你的 OpenClaw 工作区已经带了 BrowserMan skill，也可以直接使用。

关键不是某一个固定命令，而是 agent 要知道 BrowserMan 的工作规则：

- 先检查 BrowserMan 支持哪些脚本，
- 确认浏览器在线，
- 有现成脚本就用脚本，
- 没有脚本再用低层浏览器控制，
- 不要向用户索要密码或 cookie，
- 对外发布、提交、删除等动作要可审计、可确认。

BrowserMan 连接正常时，应该能通过：

```bash
browserman browser ping --json
```

如果要让 agent 通过 Google 搜索，可以使用类似模式：

```bash
browserman script run \
  --site google.com \
  --action search \
  --text "某品牌 官网 小红书 微博 知乎" \
  --wait \
  --json
```

## 第四步：第一个 prompt —— 找出品牌官网和社媒矩阵

先不要让 agent 直接写报告。第一步是让它建立“品牌足迹地图”。

如果你是消费品牌、电商品牌或出海品牌，可以用这个 prompt：

```text
你是我的品牌雷达 agent。

品牌：[品牌名]
官网：如果未知就写 unknown
品类：[美妆 / 食品饮料 / 服饰 / AI 产品 / 跨境电商 / 服务商]
主要市场：[中国 / 北美 / 东南亚 / 全球]
已知竞品：[可选]

任务：
使用 BrowserMan 和 Google 搜索，找出这个品牌的官方网站、天猫/淘宝/京东/Amazon 店铺、博客或新闻页，以及主要社交媒体账号。

请搜索：
1. "[品牌名] 官网"
2. "[品牌名] 小红书"
3. "[品牌名] 微博"
4. "[品牌名] 抖音"
5. "[品牌名] B站"
6. "[品牌名] 知乎"
7. "[品牌名] 天猫"
8. "[品牌名] 淘宝"
9. "[品牌名] Amazon"
10. "[品牌名] 竞品"

输出一个表格：
- 来源类型
- 标题
- URL
- 可信度 high / medium / low
- 为什么判断它是官方或相关链接
- 备注

规则：
- 先保存原始搜索结果，再总结。
- 不要编造链接。
- 把官方链接和第三方提及分开。
- 不确定就标记 uncertain，不要猜。
```

输出应该像这样：

| 类型 | URL | 可信度 | 备注 |
|---|---|---|---|
| 官网 | ... | high | 域名和品牌一致 |
| 天猫店 | ... | medium | 店铺名匹配，需要确认 |
| 小红书 | ... | high | 认证账号 |
| 微博 | ... | medium | 名称匹配但未认证 |
| 第三方报道 | ... | low | 可作为舆情来源 |

这张表就是后续每日监控的基础。

## 第五步：第二个 prompt —— 找竞品和要监控的网站

有了品牌足迹后，再让 agent 扩展竞品和监控源。

```text
基于上一轮找到的品牌足迹，请建立竞品和信号源地图。

请用 Google Search 和 BrowserMan 查找：
1. 直接竞品。
2. 搜索结果里经常一起出现的替代品牌。
3. 对比文章、评测文章、榜单文章。
4. 淘宝/天猫/Amazon 等电商搜索结果。
5. 小红书、微博、知乎、抖音、B 站上的讨论入口。
6. 竞品官网、价格页、活动页、新闻页。
7. 用户评价、投诉、种草/拔草内容。

优先监控会变化的页面：
- 价格页
- 活动页
- 新品页
- 店铺首页
- 小红书账号
- 微博账号
- 抖音账号
- 评论页
- 对比页

输出：
1. 竞品表格。
2. 每天要看的 watchlist。
3. 每天重复执行的搜索 query。
4. 噪音来源和注意事项。

规则：
- 每个判断都保留来源 URL。
- 不要把 SEO 榜单当成事实，要交叉验证。
- 把竞品标记为 direct / adjacent / noisy。
```

竞品表可以是：

| 竞品 | 类型 | 证据 | 每日监控页面 | 为什么重要 |
|---|---|---|---|---|
| A 品牌 | direct | 多篇对比文章同时出现 | 天猫店、小红书、官网 | 同价格带 |
| B 品牌 | adjacent | 小红书用户经常一起比较 | 小红书、抖音 | 同人群 |
| C 品牌 | noisy | 只在 SEO 榜单出现 | 暂不监控 | 弱信号 |

## 第六步：第三个 prompt —— 每天早上 8 点汇报

最后，把它变成定时任务。

如果你的 OpenClaw / ClawMama 环境支持定时 prompt 或 heartbeat，就创建一个每天 8 点的任务。

```text
每天早上 8:00（时区：[你的时区]），运行我的每日品牌雷达。

品牌：[品牌名]
官网：[URL]
已知社媒：
- 小红书：[URL]
- 微博：[URL]
- 抖音：[URL]
- B站：[URL]
- X/LinkedIn/Reddit：[如果有]

重点竞品：
- [竞品 1]
- [竞品 2]
- [竞品 3]

每日任务：
1. 用 BrowserMan 跑 Google 搜索，查找最近 24-48 小时的新提及。
2. 检查品牌官网、博客、新闻页、活动页、店铺页和社媒账号。
3. 检查竞品的官网、活动页、价格页、店铺页和社媒账号。
4. 发现新的对比、投诉、种草、拔草、促销、新品、价格变化和用户问题。
5. 保存来源 URL 和一句摘录。
6. 给我一份简短报告。

报告格式：
每日品牌雷达 — [日期]

1. 重要提及
- 附 URL 和为什么重要。

2. 竞品变化
- 包括新品、价格、活动、内容、渠道变化。

3. 用户/社媒信号
- 重复出现的问题、抱怨、需求、购买理由、种草语言。

4. 今日机会
- 可以回复的内容、可写的文章、可调整的页面、可跟进的竞品动作。

5. 今日建议动作
- 只给一个最具体的动作。

规则：
- 不要编造变化。
- 没有重要变化就说“无重要变化”。
- 每条结论都要有链接。
- 报告要短。
- 公开发帖、回复、删除、提交表单前必须先问我，除非我明确授权。
```

第一周不要监控太多。三个竞品、五到十个稳定页面就够了。先让系统稳定，再逐步加源。

## 第七步：让 agent 越跑越准

每天的品牌雷达不能只做“当天搜索”。它要有记忆。

建议让 agent 保存这些内容：

- 官方链接，
- 已确认社媒账号，
- 重点竞品，
- 每天重复搜索的 query，
- 高质量信号源，
- 噪音来源，
- 昨天的报告，
- 已经采取过的动作。

可以加一条长期规则：

```text
写今天的报告前，先读昨天的报告和 watchlist。不要重复昨天已经汇报过的旧内容，除非出现了新变化。如果某个来源连续三天没有价值，就降低优先级。
```

这样 agent 才不是一次性搜索工具，而是一个真正的日常运营助手。

## 不同类型品牌应该监控什么

### 消费品牌 / 电商品牌

重点看：

- 淘宝、天猫、京东、Amazon 搜索结果，
- 小红书种草和拔草笔记，
- 抖音/B 站视频评论，
- 店铺活动和价格变化，
- 用户差评，
- 竞品新品，
- 季节性关键词。

### AI 产品 / SaaS / 开发者工具

重点看：

- 竞品官网和 pricing，
- docs 和 changelog，
- GitHub release，
- Product Hunt，
- X / Reddit / Hacker News 讨论，
- comparison pages，
- 用户抱怨和替代品搜索。

### 服务商 / Agency / 出海团队

重点看：

- 竞品案例页，
- LinkedIn/X 内容，
- 行业关键词，
- 搜索广告落地页，
- 客户评价，
- 招聘页，
- 行业 newsletter。

核心逻辑不变：先定 source map，再让 agent 每天重复执行。

## 为什么这里需要 BrowserMan

每日品牌雷达不是让 AI 坐在聊天框里编建议。

它需要像人一样使用浏览器：

- 搜 Google，
- 打开结果，
- 判断是不是官方链接，
- 看社媒页面，
- 看动态网页，
- 必要时使用登录态，
- 保存证据，
- 汇总报告。

BrowserMan 让 agent 能使用真实浏览器，同时不需要你把密码交给 agent。OpenClaw 提供 agent 的工作区、文件、记忆和定时任务模式。ClawMama 则让不想部署服务器的人也能快速用上 OpenClaw。

这个组合的价值很简单：

> 每天早上，替我读一遍真实互联网，然后告诉我有什么值得行动。

这比让 AI 从空白 prompt 里生成“品牌建议”要有用得多。
