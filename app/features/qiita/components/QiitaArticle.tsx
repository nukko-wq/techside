'use client'
import { useState, useEffect } from 'react'

interface Article {
	title: string
	link: string
	pubDate: string
}

const QiitaArticle = () => {
	const [articles, setArticles] = useState<Article[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<Error | null>(null)

	useEffect(() => {
		const fetchArticles = async () => {
			try {
				const response = await fetch('/api/qiita-trends')
				if (!response.ok) {
					throw new Error('APIリクエストに失敗しました')
				}
				const data = await response.json()
				setArticles(data)
			} catch (err) {
				setError(new Error('記事の取得に失敗しました'))
				console.error(err)
			} finally {
				setIsLoading(false)
			}
		}

		fetchArticles()
	}, [])

	if (isLoading) return <div>読み込み中...</div>
	if (error) return <div>エラーが発生しました: {error.message}</div>

	return (
		<div>
			<h1>Qiitaトレンド記事</h1>
			<ul>
				{articles.map((article, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<li key={index}>
						<a href={article.link} target='_blank' rel='noopener noreferrer'>
							{article.title}
						</a>
					</li>
				))}
			</ul>
		</div>
	)
}

export default QiitaArticle
