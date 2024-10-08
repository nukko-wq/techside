'use client'
import { useState, useEffect } from 'react'
import Spinner from '@/app/components/elements/Spinner/Spinner'

interface Article {
	title: string
	link: string
	pubDate: string
	author: string
}

const QiitaArticle = () => {
	const [articles, setArticles] = useState<Article[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

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
				setError('記事の取得に失敗しました')
				console.error(err)
			} finally {
				setIsLoading(false)
			}
		}

		fetchArticles()
	}, [])

	if (isLoading) return <Spinner />

	if (error) return <div className='text-red-500'>{error}</div>

	return (
		<div>
			<div className=''>
				{articles.map((article, index) => (
					<div
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						key={index}
						className='pb-4 mb-4 border-b last:border-none last:mb-0 border-slate-300'
					>
						<a
							href={article.link}
							target='_blank'
							rel='noopener noreferrer'
							className='text-blue-500 text-lg hover:underline'
						>
							{article.title}
						</a>
						<p className='text-sm text-gray-500'>{article.author}</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default QiitaArticle
