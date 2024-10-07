import { useFilter } from '@/app/features/filter/components/Filter'

const Sidebar = () => {
	const { filter, setFilter } = useFilter()
	return (
		<div className='hidden md:flex md:w-2/12 lg:w-1/12 bg-slate-900 shadow-xl'>
			<div className='mx-auto mt-4'>
				<div className='flex flex-col gap-1'>
					<button
						type='button'
						onClick={() => setFilter('all')}
						className={`flex text-white rounded-t-md p-2 ${filter === 'all' ? 'bg-slate-700' : ''}`}
					>
						<h2 className='text-slate-50'>All</h2>
					</button>
					<button
						type='button'
						onClick={() => setFilter('zenn')}
						className={`flex text-white rounded-t-md p-2 ${filter === 'zenn' ? 'bg-slate-700' : ''}`}
					>
						<h2 className='text-slate-50'>Zenn</h2>
					</button>
					<button
						type='button'
						onClick={() => setFilter('qiita')}
						className={`flex text-white rounded-t-md p-2 ${filter === 'qiita' ? 'bg-slate-700' : ''}`}
					>
						<h2 className='text-slate-50'>Qiita</h2>
					</button>
					<button
						type='button'
						onClick={() => setFilter('hatena')}
						className={`flex text-white rounded-t-md p-2 ${filter === 'hatena' ? 'bg-slate-700' : ''}`}
					>
						<h2 className='text-slate-50'>Hatena</h2>
					</button>
				</div>
			</div>
		</div>
	)
}

export default Sidebar
