'use client'

import { useEffect, useState, useCallback } from 'react'
import Spinner from '@/app/components/elements/Spinner/Spinner'
import ErrorState from '@/app/components/ui/ErrorState/ErrorState'
import EmptyState from '@/app/components/ui/EmptyState/EmptyState'
import { Heart } from 'lucide-react'
import { formatDate } from '@/app/utils/dateUtils'
import { ZennArticle } from '@/app/lib/schemas'

// Zenn Tech Trendの記事を取得して表示する

type ArticleData = ZennArticle

interface ArticleProps {
	apiUrl: string
}

const Article = ({ apiUrl }: ArticleProps) => {
	const [articles, setArticles] = useState<ArticleData[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	const fetchArticles = useCallback(async () => {
		setIsLoading(true)
		setError(null)
		try {
			const response = await fetch(apiUrl)
			if (!response.ok) {
				throw new Error(`HTTPエラー: ${response.status}`)
			}
			const data = await response.json()
			// Zenn APIのレスポンスは外部APIなので基本的なエラーハンドリングのみ実施
			setArticles(data.slice(0, 20))
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Zenn記事の取得に失敗しました'
			setError(errorMessage)
			console.error('ZennArticle fetch error:', error)
		} finally {
			setIsLoading(false)
		}
	}, [apiUrl])

	useEffect(() => {
		fetchArticles()
	}, [fetchArticles])

	if (isLoading) {
		return <Spinner />
	}

	if (error) {
		return (
			<ErrorState
				message={error}
				details='Zennからの記事取得でエラーが発生しました。外部APIの状態を確認してください。'
				onRetry={fetchArticles}
			/>
		)
	}

	if (articles.length === 0) {
		return (
			<EmptyState
				message='現在表示できるZenn記事がありません'
				showRetry
				onRetry={fetchArticles}
			/>
		)
	}

	return (
		<div>
			{articles.map((article) => (
				<div
					key={article.id}
					className='flex flex-col gap-2 pb-4 mb-4 border-b last:border-none last:mb-0 border-slate-300'
				>
					<a
						href={`https://zenn.dev/${article.path}`}
						target='_blank'
						rel='noopener noreferrer'
						className='text-blue-500 text-lg hover:underline'
					>
						{article.emoji && <span className='mr-2'>{article.emoji}</span>}
						{article.title}
					</a>
					<div className='flex flex-col gap-2'>
						<p className='text-sm text-gray-500'>{article.user.name}</p>
						<div className='flex gap-2 items-center'>
							<p className='text-sm text-gray-500'>
								{formatDate(article.publishedAt)}
							</p>
							<p className='text-sm text-gray-500 flex gap-0.5 items-center'>
								<Heart size={16} />
								{article.likedCount}
							</p>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}

export default Article
