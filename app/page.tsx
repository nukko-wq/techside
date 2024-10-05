import Spinner from '@/app/components/elements/Spinner/Spinner'
import dynamic from 'next/dynamic'

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
	return (
		<div className='px-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 py-4 max-w-7xl lg:max-w-full mx-auto md:overflow-hidden'>
			<div className='flex flex-col rounded-md md:h-[calc(100vh-theme(spacing.28))]'>
				<div className='flex justify-center bg-slate-600 text-white rounded-t-md'>
					<h2 className='text-2xl font-bold'>Zenn Tech Trend</h2>
				</div>
				<div className='p-4 bg-slate-100 rounded-b-md md:overflow-y-auto md:overflow-x-hidden flex flex-grow flex-col'>
					<DynamicArticle apiUrl='https://zenn-api.vercel.app/api/trendTech' />
				</div>
			</div>
			<div className='flex flex-col rounded-md md:h-[calc(100vh-theme(spacing.28))]'>
				<div className='flex justify-center bg-slate-600 text-white rounded-t-md'>
					<h2 className='text-2xl font-bold'>Zenn Ideas Trend</h2>
				</div>
				<div className='p-4 bg-slate-100 rounded-b-md md:overflow-y-auto md:overflow-x-hidden flex flex-grow flex-col'>
					<DynamicArticle apiUrl='https://zenn-api.vercel.app/api/trendIdea' />
				</div>
			</div>
			<div className='flex flex-col rounded-md md:h-[calc(100vh-theme(spacing.28))]'>
				<div className='flex justify-center bg-slate-600 text-white rounded-t-md'>
					<h2 className='text-2xl font-bold'>Zenn Books Trend</h2>
				</div>
				<div className='p-4 bg-slate-100 rounded-b-md md:overflow-y-auto md:overflow-x-hidden flex flex-grow flex-col'>
					<DynamicArticle apiUrl='https://zenn-api.vercel.app/api/trendBook' />
				</div>
			</div>
			{/* Qiitaの記事を表示する */}
			<div className='flex flex-col rounded-md md:h-[calc(100vh-theme(spacing.28))]'>
				<div className='flex justify-center bg-slate-600 text-white rounded-t-md'>
					<h2 className='text-2xl font-bold'>Qiita Trend</h2>
				</div>
				<div className='p-4 bg-slate-100 rounded-b-md md:overflow-y-auto md:overflow-x-hidden flex flex-grow flex-col'>
					<DynamicQiitaArticle />
				</div>
			</div>
			{/* はてなの記事を表示する */}
			<div className='flex flex-col rounded-md md:h-[calc(100vh-theme(spacing.28))]'>
				<div className='flex justify-center bg-slate-600 text-white rounded-t-md'>
					<h2 className='text-2xl font-bold'>Hatena Bookmark IT</h2>
				</div>
				<div className='p-4 bg-slate-100 rounded-b-md md:overflow-y-auto md:overflow-x-hidden flex flex-grow flex-col'>
					<DynamicHatenaArticle />
				</div>
			</div>
		</div>
	)
}
