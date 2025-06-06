import { NextResponse } from 'next/server'
import Parser from 'rss-parser'

// APIルートをダイナミックに設定してキャッシュを無効化
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
	try {
		const parser = new Parser()
		
		// RSS URLに現在時刻をクエリパラメータとして追加してキャッシュを回避
		const timestamp = Date.now()
		const rssUrl = `https://qiita.com/popular-items/feed?_t=${timestamp}`
		
		const feed = await parser.parseURL(rssUrl)
		const articles = feed.items.map((item) => ({
			title: item.title,
			link: item.link,
			author: item.author,
			pubDate: item.pubDate,
		}))

		const response = NextResponse.json(articles)
		// より強力なキャッシュ無効化ヘッダーを設定
		response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0')
		response.headers.set('Pragma', 'no-cache')
		response.headers.set('Expires', '0')
		return response
	} catch (error) {
		console.error('RSSフィードの取得に失敗しました', error)
		return NextResponse.json(
			{ error: 'RSSフィードの取得に失敗しました' },
			{ status: 500 },
		)
	}
}
