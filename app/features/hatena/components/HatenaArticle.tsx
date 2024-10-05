'use client'
import { useState, useEffect } from 'react'

interface Article {
	title: string
	link: string
	bookmarkCount: number
}

const QiitaArticle = () => {
	const [articles, setArticles] = useState<Article[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<Error | null>(null)

	useEffect(() => {
		const fetchArticles = async () => {
			try {
				const response = await fetch('/api/hatena-trends')
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
	/*
	if (isLoading) return <div>読み込み中...</div>
	*/

	if (error) return <div>エラーが発生しました: {error.message}</div>

	return (
		<div>
			<div className=''>
				{articles.map((article, index) => (
					<div
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						key={index}
						className='pb-4 mb-4 border-b last:border-none last:mb-0 border-slate-300'
					>
						<p className='text-sm text-gray-500'>
							{article.bookmarkCount}
							<span className='pl-1'>USERS</span>
						</p>
						<a
							href={article.link}
							target='_blank'
							rel='noopener noreferrer'
							className='text-blue-500 text-lg hover:underline'
						>
							{article.title}
						</a>
					</div>
				))}
			</div>
		</div>
	)
}

export default QiitaArticle
