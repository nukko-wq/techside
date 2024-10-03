'use client'

import { useEffect, useState } from 'react'

// Zenn Tech Trendの記事を取得して表示する

interface ArticleData {
	id: number
	title: string
	slug: string
	emoji: string
	user: { name: string }
}

interface ArticleProps {
	apiUrl: string
}

const Article = ({ apiUrl }: ArticleProps) => {
	const [articles, setArticles] = useState<ArticleData[]>([])

	useEffect(() => {
		const fetchArticles = async () => {
			try {
				const response = await fetch(apiUrl)
				const data = await response.json()
				setArticles(data.slice(0, 20))
			} catch (error) {
				console.error('記事の取得に失敗しました:', error)
			}
		}
		fetchArticles()
	}, [apiUrl])

	return (
		<div>
			{articles.map((article) => (
				<div key={article.id} className='mb-4'>
					<a
						href={`https://zenn.dev/${article.user.name}/${article.slug}`}
						target='_blank'
						rel='noopener noreferrer'
						className='text-blue-500 text-lg hover:underline'
					>
						<span className='mr-2'>{article.emoji}</span>
						{article.title}
					</a>
					<p className='text-sm text-gray-500'>{article.user.name}</p>
				</div>
			))}
		</div>
	)
}

export default Article
