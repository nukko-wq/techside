import { NextResponse } from 'next/server'
import Parser from 'rss-parser'

interface CustomItem extends Parser.Item {
	title?: string
	link?: string
	'hatena:bookmarkcount'?: string
}

export async function GET() {
	try {
		const parser = new Parser<CustomItem>({
			customFields: {
				item: ['hatena:bookmarkcount'],
			},
		})
		const feed = await parser.parseURL('https://b.hatena.ne.jp/hotentry/it.rss')
		const articles = feed.items.map((item) => ({
			title: item.title,
			link: item.link,
			bookmarkCount: item['hatena:bookmarkcount']
				? Number.parseInt(item['hatena:bookmarkcount'])
				: 0,
			pubDate: item.pubDate || item.isoDate,
		}))
		const response = NextResponse.json(articles)
		response.headers.set('Cache-Control', 'no-store, max-age=0')
		return response
	} catch (error) {
		console.error('RSSフィードの取得に失敗しました', error)
		return NextResponse.json(
			{ error: 'RSSフィードの取得に失敗しました' },
			{ status: 500 },
		)
	}
}
