import Parser from 'rss-parser'
import { withApiErrorHandling, validateApiResponse } from '@/app/lib/apiUtils'
import { QiitaArticlesSchema } from '@/app/lib/schemas'

// APIルートをダイナミックに設定してキャッシュを無効化
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
	return withApiErrorHandling(async () => {
		const parser = new Parser()
		
		// RSS URLに現在時刻をクエリパラメータとして追加してキャッシュを回避
		const timestamp = Date.now()
		const rssUrl = `https://qiita.com/popular-items/feed?_t=${timestamp}`
		
		const feed = await parser.parseURL(rssUrl)
		const articles = feed.items.map((item) => ({
			title: item.title || 'タイトル不明',
			link: item.link || '',
			author: item.author || '作者不明',
			pubDate: item.pubDate || '',
		}))
		
		// データの妥当性を検証
		const validation = validateApiResponse(articles, QiitaArticlesSchema)
		if (!validation.success) {
			throw new Error(`データの妥当性検証に失敗: ${validation.error}`)
		}
		
		return validation.data
	}, 'Qiitaトレンドの取得に失敗しました')
}
