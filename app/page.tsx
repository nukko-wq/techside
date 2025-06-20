'use client'

import { useMemo } from 'react'
import Sidebar from '@/app/components/layouts/Sidebar/Sidebar'
import { useFilter } from '@/app/features/filter/components/Filter'
import { tv } from 'tailwind-variants'
import Article from '@/app/features/zenn/components/Article'
import QiitaArticle from '@/app/features/qiita/components/QiitaArticle'
import HatenaArticle from '@/app/features/hatena/components/HatenaArticle'
import TrendSection from '@/app/components/common/TrendSection/TrendSection'

const homeStyle = tv({
	slots: {
		container: 'flex flex-row bg-slate-200',
		content: 'w-full px-4 grid gap-4 py-4 md:overflow-hidden',
	},
	variants: {
		filter: {
			zenn: {
				content: 'grid-cols-1 md:grid-cols-3 md:w-10/12 lg:w-11/12',
			},
			qiita: {
				content: 'grid-cols-1 lg:w-4/5 mx-auto',
			},
			hatena: {
				content: 'grid-cols-1 lg:w-4/5 mx-auto',
			},
			default: {
				content:
					'md:w-10/12 lg:w-11/12 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
			},
		},
	},
	defaultVariants: {
		filter: 'default',
	},
})


export default function Home() {
	const { filter } = useFilter()
	
	const filterVariant = useMemo(() => {
		return (['zenn', 'qiita', 'hatena'] as const).includes(filter as any) ? filter as 'zenn' | 'qiita' | 'hatena' : 'default'
	}, [filter])
	
	const { container, content } = homeStyle({ filter: filterVariant })

	return (
		<div className={container()}>
			<Sidebar />
			<div className={content()}>
				{(filter === 'zenn' || filter === 'all') && (
					<>
						<TrendSection title='Zenn Tech Trend'>
							<Article apiUrl='https://zenn-api.vercel.app/api/trendTech' />
						</TrendSection>
						<TrendSection title='Zenn Ideas Trend'>
							<Article apiUrl='https://zenn-api.vercel.app/api/trendIdea' />
						</TrendSection>
						<TrendSection title='Zenn Books Trend'>
							<Article apiUrl='https://zenn-api.vercel.app/api/trendBook' />
						</TrendSection>
					</>
				)}
				{(filter === 'qiita' || filter === 'all') && (
					<TrendSection title='Qiita Trend'>
						<QiitaArticle />
					</TrendSection>
				)}
				{(filter === 'hatena' || filter === 'all') && (
					<TrendSection title='Hatena Bookmark IT'>
						<HatenaArticle />
					</TrendSection>
				)}
			</div>
		</div>
	)
}

