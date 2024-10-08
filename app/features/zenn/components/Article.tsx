'use client'

import { useEffect, useState } from 'react'
import Spinner from '@/app/components/elements/Spinner/Spinner'

// Zenn Tech Trendの記事を取得して表示する

interface ArticleData {
	id: number
	title: string
	slug: string
	emoji: string
	user: { name: string }
	path: string
	likedCount: number
}

interface ArticleProps {
	apiUrl: string
}

const Article = ({ apiUrl }: ArticleProps) => {
	const [articles, setArticles] = useState<ArticleData[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchArticles = async () => {
			try {
				const response = await fetch(apiUrl)
				if (!response.ok) {
					throw new Error('APIリクエストに失敗しました')
				}
				const data = await response.json()
				setArticles(data.slice(0, 20))
			} catch (error) {
				console.error('記事の取得に失敗しました:', error)
				setError('記事の取得に失敗しました')
			} finally {
				setIsLoading(false)
			}
		}
		fetchArticles()
	}, [apiUrl])

	if (isLoading) {
		return <Spinner />
	}

	if (error) {
		return <div className='text-red-500'>{error}</div>
	}

	return (
		<div>
			{articles.map((article) => (
				<div
					key={article.id}
					className='pb-4 mb-4 border-b last:border-none last:mb-0 border-slate-300'
				>
					<a
						href={`https://zenn.dev/${article.path}`}
						target='_blank'
						rel='noopener noreferrer'
						className='text-blue-500 text-lg hover:underline'
					>
						<span className='mr-2'>{article.emoji}</span>
						{article.title}
					</a>
					<p className='text-sm text-gray-500'>{article.user.name}</p>
					<p>{article.likedCount}</p>
				</div>
			))}
		</div>
	)
}

export default Article
