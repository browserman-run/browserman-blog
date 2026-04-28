import type { CollectionEntry } from 'astro:content';
import { SITE_URL } from '../consts';

export const languages = ['en', 'zh'] as const;
export type Lang = (typeof languages)[number];
export const defaultLang: Lang = 'en';

export const langLabels: Record<Lang, string> = {
  en: 'English',
  zh: '中文',
};

export function getSlugFromId(id: string) {
  return id.replace(/^en\//, '').replace(/^zh\//, '');
}

export function getLocalizedBlogUrl(lang: Lang, slug: string) {
  return lang === defaultLang ? `/blog/${slug}/` : `/${lang}/blog/${slug}/`;
}

export function getLocalizedHomeUrl(lang: Lang) {
  return lang === defaultLang ? '/' : `/${lang}/`;
}

export function getLocalizedArchiveUrl(lang: Lang) {
  return lang === defaultLang ? '/blog/' : `/${lang}/blog/`;
}

export function getLocalizedAboutUrl(lang: Lang) {
  return lang === defaultLang ? '/about/' : `/${lang}/about/`;
}

export function getPostUrl(post: CollectionEntry<'blog'>) {
  return getLocalizedBlogUrl(post.data.lang, getSlugFromId(post.id));
}

export function findTranslation(
  posts: CollectionEntry<'blog'>[],
  post: CollectionEntry<'blog'>,
  targetLang: Lang
) {
  const key = post.data.translationKey;
  if (!key) return undefined;
  return posts.find((candidate) => (
    candidate.data.lang === targetLang &&
    candidate.data.translationKey === key
  ));
}

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}
