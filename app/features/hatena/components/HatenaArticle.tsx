'use client'
import { useState, useEffect } from 'react'
import Spinner from '@/app/components/elements/Spinner/Spinner'

// 相対時間をフォーマットする関数
const formatDate = (dateString: string) => {
	// pubDateがundefinedまたは無効な場合の処理
	if (!dateString) {
		console.warn('HatenaArticle: pubDate is undefined or empty')
		return '投稿時間不明'
	}

	const publishedDate = new Date(dateString)
	const now = new Date()

	// 無効な日付の場合の処理
	if (Number.isNaN(publishedDate.getTime())) {
		console.warn('HatenaArticle: Invalid date format:', dateString)
		return '投稿時間不明'
	}

	const diffInMs = now.getTime() - publishedDate.getTime()
	const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
	const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
	const diffInMinutes = Math.floor(diffInMs / (1000 * 60))

	if (diffInDays >= 1) {
		return `${diffInDays}日前`
	}
	if (diffInHours >= 1) {
		return `約${diffInHours}時間前`
	}
	if (diffInMinutes >= 1) {
		return `${diffInMinutes}分前`
	}
	return 'たった今'
}

interface Article {
	title: string
	link: string
	bookmarkCount: number
	pubDate?: string
}

const HatenaArticle = () => {
	const [articles, setArticles] = useState<Article[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

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
								{formatDate(article.pubDate || '')}
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
