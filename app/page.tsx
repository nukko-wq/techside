'use client'

import Spinner from '@/app/components/elements/Spinner/Spinner'
import dynamic from 'next/dynamic'
import Sidebar from '@/app/components/layouts/Sidebar/Sidebar'
import { useFilter } from '@/app/features/filter/components/Filter'
import { useMemo } from 'react'
import { tv } from 'tailwind-variants'

const DynamicArticle = dynamic(
	() => import('@/app/features/zenn/components/Article'),
	{
		loading: () => <Spinner />,
		ssr: false,
	},
)

const DynamicQiitaArticle = dynamic(
	() => import('@/app/features/qiita/components/QiitaArticle'),
	{
		loading: () => <Spinner />,
		ssr: false,
	},
)

const DynamicHatenaArticle = dynamic(
	() => import('@/app/features/hatena/components/HatenaArticle'),
	{
		loading: () => <Spinner />,
		ssr: false,
	},
)

const homeStyle = tv({
	slots: {
		container: 'flex flex-row bg-slate-200',
		content: 'w-full px-4 grid gap-4 py-4 md:overflow-hidden',
	},
	variants: {
		filter: {
			zenn: {
				content: 'grid-cols-1 md:grid-cols-3',
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

const trendStyle = tv({
	slots: {
		container: 'flex flex-col rounded-md md:h-[calc(100vh-theme(spacing.28))]',
		header: 'flex justify-center bg-slate-600 text-white rounded-t-md py-1',
		title: 'text-xl lg:text-2xl font-bold',
		content:
			'p-4 bg-slate-100 rounded-b-md md:overflow-y-auto md:overflow-x-hidden flex flex-grow flex-col',
	},
})

export default function Home() {
	const { filter } = useFilter()
	const { container, content } = homeStyle({
		filter:
			filter === 'zenn'
				? 'zenn'
				: filter === 'qiita'
					? 'qiita'
					: filter === 'hatena'
						? 'hatena'
						: 'default',
	})

	const contentComponent = useMemo(() => {
		switch (filter) {
			case 'zenn':
				return (
					<>
						<ZennTechTrend />
						<ZennIdeaTrend />
						<ZennBooksTrend />
					</>
				)
			case 'qiita':
				return <QiitaTrend />
			case 'hatena':
				return <HatenaTrend />
			default:
				return (
					<>
						<ZennTechTrend />
						<ZennIdeaTrend />
						<ZennBooksTrend />
						<QiitaTrend />
						<HatenaTrend />
					</>
				)
		}
	}, [filter])

	return (
		<div className={container()}>
			<Sidebar />
			<div className={content()}>{contentComponent}</div>
		</div>
	)
}

const ZennTechTrend = () => {
	const { container, header, title, content } = trendStyle()
	return (
		<div className={container()}>
			<div className={header()}>
				<h2 className={title()}>Zenn Tech Trend</h2>
			</div>
			<div className={content()}>
				<DynamicArticle apiUrl='https://zenn-api.vercel.app/api/trendTech' />
			</div>
		</div>
	)
}

const ZennIdeaTrend = () => {
	const { container, header, title, content } = trendStyle()
	return (
		<div className={container()}>
			<div className={header()}>
				<h2 className={title()}>Zenn Ideas Trend</h2>
			</div>
			<div className={content()}>
				<DynamicArticle apiUrl='https://zenn-api.vercel.app/api/trendIdea' />
			</div>
		</div>
	)
}

const ZennBooksTrend = () => {
	const { container, header, title, content } = trendStyle()
	return (
		<div className={container()}>
			<div className={header()}>
				<h2 className={title()}>Zenn Books Trend</h2>
			</div>
			<div className={content()}>
				<DynamicArticle apiUrl='https://zenn-api.vercel.app/api/trendBook' />
			</div>
		</div>
	)
}

const QiitaTrend = () => {
	const { container, header, title, content } = trendStyle()
	return (
		<div className={container()}>
			<div className={header()}>
				<h2 className={title()}>Qiita Trend</h2>
			</div>
			<div className={content()}>
				<DynamicQiitaArticle />
			</div>
		</div>
	)
}

const HatenaTrend = () => {
	const { container, header, title, content } = trendStyle()
	return (
		<div className={container()}>
			<div className={header()}>
				<h2 className={title()}>Hatena Bookmark IT</h2>
			</div>
			<div className={content()}>
				<DynamicHatenaArticle />
			</div>
		</div>
	)
}
