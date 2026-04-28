import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_TITLE } from '../../consts';
import { getPostUrl } from '../../lib/i18n';

export async function GET(context) {
	const posts = (await getCollection('blog', ({ data }) => data.lang === 'zh'))
		.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
	return rss({
		title: `${SITE_TITLE} 中文`,
		description: 'BrowserMan 中文文章。',
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			link: getPostUrl(post),
		})),
	});
}
