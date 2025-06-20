import Parser from 'rss-parser'
import { withApiErrorHandling, validateApiResponse } from '@/app/lib/apiUtils'
import { HatenaArticlesSchema } from '@/app/lib/schemas'

// APIルートをダイナミックに設定してキャッシュを無効化
export const dynamic = 'force-dynamic'
export const revalidate = 0

interface CustomItem extends Parser.Item {
	title?: string
	link?: string
	'hatena:bookmarkcount'?: string
}

export async function GET() {
	return withApiErrorHandling(async () => {
		const parser = new Parser<CustomItem>({
			customFields: {
				item: ['hatena:bookmarkcount'],
			},
		})
		
		const feed = await parser.parseURL('https://b.hatena.ne.jp/hotentry/it.rss')
		const articles = feed.items.map((item) => ({
			title: item.title || 'タイトル不明',
			link: item.link || '',
			bookmarkCount: item['hatena:bookmarkcount']
				? Number.parseInt(item['hatena:bookmarkcount'])
				: 0,
			pubDate: item.pubDate || item.isoDate,
		}))
		
		// データの妥当性を検証
		const validation = validateApiResponse(articles, HatenaArticlesSchema)
		if (!validation.success) {
			throw new Error(`データの妥当性検証に失敗: ${validation.error}`)
		}
		
		return validation.data
	}, 'はてなブックマークの取得に失敗しました')
}
