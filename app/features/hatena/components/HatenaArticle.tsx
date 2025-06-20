'use client'
import { useState, useEffect, useCallback } from 'react'
import Spinner from '@/app/components/elements/Spinner/Spinner'
import ErrorState from '@/app/components/ui/ErrorState/ErrorState'
import EmptyState from '@/app/components/ui/EmptyState/EmptyState'
import { formatDate } from '@/app/utils/dateUtils'
import { HatenaArticle as HatenaArticleType } from '@/app/lib/schemas'

type Article = HatenaArticleType

const HatenaArticle = () => {
	const [articles, setArticles] = useState<Article[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	const fetchArticles = useCallback(async () => {
		setIsLoading(true)
		setError(null)
		try {
			const response = await fetch('/api/hatena-trends')
			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}))
				throw new Error(errorData.error || `HTTPエラー: ${response.status}`)
			}
			const data = await response.json()
			setArticles(data)
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'はてなブックマーク記事の取得に失敗しました'
			setError(errorMessage)
			console.error('HatenaArticle fetch error:', err)
		} finally {
			setIsLoading(false)
		}
	}, [])

	useEffect(() => {
		fetchArticles()
	}, [fetchArticles])
	if (isLoading) return <Spinner />

	if (error) {
		return (
			<ErrorState
				message={error}
				details='はてなブックマークからの記事取得でエラーが発生しました。ネットワーク接続を確認してください。'
				onRetry={fetchArticles}
			/>
		)
	}

	if (articles.length === 0) {
		return (
			<EmptyState
				message='現在表示できるはてなブックマーク記事がありません'
				showRetry
				onRetry={fetchArticles}
			/>
		)
	}

	return (
		<div>
			<div className=''>
				{articles.map((article) => (
					<div
						key={article.link}
						className='flex flex-col gap-2 pb-4 mb-4 border-b last:border-none last:mb-0 border-slate-300'
					>
						<a
							href={article.link}
							target='_blank'
							rel='noopener noreferrer'
							className='text-blue-500 text-lg hover:underline'
						>
							{article.title}
						</a>
						<div className='flex gap-4 items-center'>
							<p className='text-sm text-gray-500'>
								{formatDate(article.pubDate)}
							</p>
							<p className='text-sm text-gray-500'>
								{article.bookmarkCount}
								<span className='pl-1'>USERS</span>
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default HatenaArticle
