const Sidebar = () => {
	return (
		<div className='hidden md:flex md:w-2/12 lg:w-1/12 bg-slate-900 shadow-xl'>
			<div className='mx-auto mt-4'>
				<div className='flex flex-col gap-1'>
					<div className='flex text-white rounded-t-md p-2'>
						<h2 className='text-slate-50'>Zenn</h2>
					</div>
					<div className='flex text-white rounded-t-md p-2'>
						<h2 className='text-slate-50'>Qiita</h2>
					</div>
					<div className='flex text-white rounded-t-md p-2'>
						<h2 className='text-slate-50'>Hatena</h2>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Sidebar
