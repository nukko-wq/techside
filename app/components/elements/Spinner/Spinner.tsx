import React from 'react'

const Spinner = () => {
	return (
		<div className='flex grow justify-center items-center gap-6'>
			<div className='animate-spin rounded-full h-10 w-10 border-[5px] border-t-transparent border-blue-500' />
			<p className='text-lg font-bold text-blue-500'>Loading...</p>
		</div>
	)
}

export default Spinner
