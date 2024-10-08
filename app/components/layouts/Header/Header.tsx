'use client'

import Link from 'next/link'
import { useFilter } from '@/app/features/filter/components/Filter'
import MobileMenu from '@/app/components/layouts/MobileMenu/MobileMenu'

const Header = () => {
	const { setFilter } = useFilter()

	return (
		<header className='px-4 py-2 sticky top-0 backdrop-blur-[5px] shadow-custom z-50 border-b border-slate-200'>
			<MobileMenu />
			<div className='text-slate-600 text-2xl font-bold text-center md:text-left'>
				<Link href='/' onClick={() => setFilter('all')}>
					Tech Side
				</Link>
			</div>
		</header>
	)
}

export default Header
