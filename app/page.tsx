import Article from '@/app/features/article/components/Article'

export default function Home() {
	return (
		<div className='flex-grow px-4 grid grid-cols-1 md:grid-cols-3 gap-4 py-4 max-w-7xl mx-auto'>
			<div className='rounded-md bg-slate-100'>
				<div className='flex justify-center bg-slate-600 text-white rounded-t-md'>
					<h2 className='text-2xl font-bold'>Zenn Tech Trend</h2>
				</div>
				<div className='p-4'>
					<Article apiUrl='https://zenn-api.vercel.app/api/trendTech' />
				</div>
			</div>
			<div className='flex flex-col rounded-md'>
				<div className='flex justify-center bg-slate-600 text-white rounded-t-md'>
					<h2 className='text-2xl font-bold'>Zenn Ideas Trend</h2>
				</div>
				<div className='p-4 bg-slate-100 rounded-b-md'>
					<Article apiUrl='https://zenn-api.vercel.app/api/trendIdea' />
				</div>
			</div>
			<div className='flex flex-col rounded-md'>
				<div className='flex justify-center bg-slate-600 text-white rounded-t-md'>
					<h2 className='text-2xl font-bold'>Zenn Books Trend</h2>
				</div>
				<div className='p-4 bg-slate-100 rounded-b-md'>
					<Article apiUrl='https://zenn-api.vercel.app/api/trendBook' />
				</div>
			</div>
		</div>
	)
}
