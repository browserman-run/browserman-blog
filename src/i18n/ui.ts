import type { Lang } from '../lib/i18n';

export const UI: Record<Lang, Record<string, string>> = {
  en: {
    writing: 'Writing',
    about: 'About',
    rss: 'RSS',
    latest: 'Latest',
    archive: 'Archive',
    archiveTitle: 'All writing from BrowserMan.',
    empty: 'Nothing published yet. The first post is on its way.',
    archiveEmpty: 'Nothing published yet.',
    allWriting: 'All writing',
    read: 'Read',
    minRead: 'min read',
    updated: 'Updated',
    posts: 'posts',
    post: 'post',
    heroKicker: 'BrowserMan · Writing',
    heroTitle: 'AI agent browser automation.',
    heroLede: 'Guides, product updates, and practical notes for teams using AI agents to automate real browser workflows.',
  },
  zh: {
    writing: '文章',
    about: '关于',
    rss: 'RSS',
    latest: '最新',
    archive: '归档',
    archiveTitle: 'BrowserMan 的全部文章。',
    empty: '还没有发布文章。第一篇正在路上。',
    archiveEmpty: '还没有发布文章。',
    allWriting: '全部文章',
    read: '阅读',
    minRead: '分钟阅读',
    updated: '更新于',
    posts: '篇文章',
    post: '篇文章',
    heroKicker: 'BrowserMan · 写作',
    heroTitle: '面向 AI Agent 的真实浏览器自动化。',
    heroLede: '关于 AI agent、真实浏览器工作流、产品更新和实践经验的文章。',
  },
};

export function t(lang: Lang, key: string) {
  return UI[lang][key] ?? UI.en[key] ?? key;
}
