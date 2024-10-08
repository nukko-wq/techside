import { useFilter } from '@/app/features/filter/components/Filter'
import { FILTER_OPTIONS } from '@/app/features/filter/constants/filterOptions'

const Sidebar = () => {
	const { filter, setFilter } = useFilter()
	return (
		<div className='hidden md:flex md:w-2/12 lg:w-1/12 bg-slate-900 shadow-xl'>
			<div className='mx-auto mt-4 w-3/4'>
				<div className='flex flex-col gap-1'>
					{FILTER_OPTIONS.map((item) => (
						<button
							key={item}
							type='button'
							onClick={() => setFilter(item)}
							className={`flex text-white rounded-md px-4 py-2 ${filter === item ? 'bg-slate-700' : ''}`}
						>
							<h2 className='text-slate-50'>
								{item.charAt(0).toUpperCase() + item.slice(1)}
							</h2>
						</button>
					))}
				</div>
			</div>
		</div>
	)
}

export default Sidebar
