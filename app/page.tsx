'use client'

import Spinner from '@/app/components/elements/Spinner/Spinner'
import dynamic from 'next/dynamic'
import Sidebar from '@/app/components/layouts/Sidebar/Sidebar'
import { useFilter } from '@/app/features/filter/components/Filter'

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

export default function Home() {
	const { filter } = useFilter()

	const renderContent = () => {
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
	}
	return (
		<div className='flex flex-row'>
			<Sidebar />
			<div className='w-full md:w-10/12 lg:w-11/12 px-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 py-4 md:overflow-hidden'>
				{renderContent()}
			</div>
		</div>
	)
}

const ZennTechTrend = () => (
	<div className='flex flex-col rounded-md md:h-[calc(100vh-theme(spacing.28))]'>
		<div className='flex justify-center bg-slate-600 text-white rounded-t-md'>
			<h2 className='text-xl lg:text-2xl font-bold'>Zenn Tech Trend</h2>
		</div>
		<div className='p-4 bg-slate-100 rounded-b-md md:overflow-y-auto md:overflow-x-hidden flex flex-grow flex-col'>
			<DynamicArticle apiUrl='https://zenn-api.vercel.app/api/trendTech' />
		</div>
	</div>
)

const ZennIdeaTrend = () => (
	<div className='flex flex-col rounded-md md:h-[calc(100vh-theme(spacing.28))]'>
		<div className='flex justify-center bg-slate-600 text-white rounded-t-md'>
			<h2 className='text-xl lg:text-2xl font-bold'>Zenn Ideas Trend</h2>
		</div>
		<div className='p-4 bg-slate-100 rounded-b-md md:overflow-y-auto md:overflow-x-hidden flex flex-grow flex-col'>
			<DynamicArticle apiUrl='https://zenn-api.vercel.app/api/trendIdea' />
		</div>
	</div>
)

const ZennBooksTrend = () => (
	<div className='flex flex-col rounded-md md:h-[calc(100vh-theme(spacing.28))]'>
		<div className='flex justify-center bg-slate-600 text-white rounded-t-md'>
			<h2 className='text-xl lg:text-2xl font-bold'>Zenn Books Trend</h2>
		</div>
		<div className='p-4 bg-slate-100 rounded-b-md md:overflow-y-auto md:overflow-x-hidden flex flex-grow flex-col'>
			<DynamicArticle apiUrl='https://zenn-api.vercel.app/api/trendBook' />
		</div>
	</div>
)

const QiitaTrend = () => (
	<div className='flex flex-col rounded-md md:h-[calc(100vh-theme(spacing.28))]'>
		<div className='flex justify-center bg-slate-600 text-white rounded-t-md'>
			<h2 className='text-xl lg:text-2xl font-bold'>Qiita Trend</h2>
		</div>
		<div className='p-4 bg-slate-100 rounded-b-md md:overflow-y-auto md:overflow-x-hidden flex flex-grow flex-col'>
			<DynamicQiitaArticle />
		</div>
	</div>
)

const HatenaTrend = () => (
	<div className='flex flex-col rounded-md md:h-[calc(100vh-theme(spacing.28))]'>
		<div className='flex justify-center bg-slate-600 text-white rounded-t-md'>
			<h2 className='text-xl lg:text-2xl font-bold'>Hatena Bookmark IT</h2>
		</div>
		<div className='p-4 bg-slate-100 rounded-b-md md:overflow-y-auto md:overflow-x-hidden flex flex-grow flex-col'>
			<DynamicHatenaArticle />
		</div>
	</div>
)
