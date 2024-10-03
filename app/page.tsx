import Article from '@/app/features/article/components/Article'

export default function Home() {
	return (
		<div className='flex-grow px-4 grid grid-cols-3 gap-4 py-4 max-w-7xl mx-auto'>
			<div className='bg-slate-100 p-4 rounded-md'>
				<h2 className='text-2xl font-bold'>Zenn Tech Trend</h2>
				<Article apiUrl='https://zenn-api.vercel.app/api/trendTech' />
			</div>
			<div className='bg-slate-100 p-4 rounded-md'>
				<h2 className='text-2xl font-bold'>Zenn Ideas Trend</h2>
				<Article apiUrl='https://zenn-api.vercel.app/api/trendIdea' />
			</div>
			<div className='bg-slate-100 p-4 rounded-md'>
				<h2 className='text-2xl font-bold'>Zenn Books Trend</h2>
				<Article apiUrl='https://zenn-api.vercel.app/api/trendBook' />
			</div>
		</div>
	)
}
