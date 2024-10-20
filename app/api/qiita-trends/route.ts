import { NextResponse } from 'next/server'
import Parser from 'rss-parser'

export async function GET() {
	try {
		const parser = new Parser()
		const feed = await parser.parseURL('https://qiita.com/popular-items/feed')
		const articles = feed.items.map((item) => ({
			title: item.title,
			link: item.link,
			author: item.author,
			pubDate: item.pubDate,
		}))

		const response = NextResponse.json(articles)
		response.headers.set('Cache-Control', 'max-age=0')
		return response
	} catch (error) {
		console.error('RSSフィードの取得に失敗しました', error)
		return NextResponse.json(
			{ error: 'RSSフィードの取得に失敗しました' },
			{ status: 500 },
		)
	}
}
