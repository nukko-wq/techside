'use client'
import { useState } from 'react'
import {
	type FilterType,
	useFilter,
} from '@/app/features/filter/components/Filter'
import { tv } from 'tailwind-variants'

const mobileMenuStyle = tv({
	slots: {
		nav: 'flex flex-col fixed top-0 bottom-0 w-[240px] h-svh bg-slate-100 transition-all duration-500 overflow-x-hidden overflow-y-auto',
		menuItem:
			'block w-full text-left py-4 hover:bg-slate-300 active:bg-slate-300 duration-200 pl-4',
		toggleButton:
			'block fixed z-30 w-[30px] h-[30px] cursor-pointer transition-all duration-500',
		toggleSpan:
			'block absolute left-0 w-[30px] h-[2px] rounded-[4px] transition-all duration-500',
		overlay:
			'fixed inset-0 bg-black bg-opacity-80 z-20 cursor-pointer transition-all duration-500 h-svh',
	},
	variants: {
		isOpen: {
			true: {
				nav: 'left-0 z-30',
				toggleButton: 'left-[260px]',
			},
			false: {
				nav: '-left-[240px]',
				toggleButton: 'left-4',
			},
		},
	},
})

const MobileMenu = () => {
	const [isOpen, setIsOpen] = useState(false)
	const { nav, menuItem, toggleButton, toggleSpan, overlay } = mobileMenuStyle({
		isOpen,
	})

	const toggleMenu = () => {
		setIsOpen(!isOpen)
	}

	const filterOptions: FilterType[] = ['all', 'zenn', 'qiita', 'hatena']

	const { setFilter } = useFilter()

	const handleFilterClick = (item: FilterType) => {
		setFilter(item)
		setIsOpen(false)
	}

	return (
		<>
			<div className='md:hidden relative'>
				<nav className={nav()}>
					<div className='p-[25px]'>
						<ul>
							{filterOptions.map((item) => (
								<li key={item} className='border-b border-gray-300 relative'>
									<button
										type='button'
										className={menuItem()}
										onClick={() => handleFilterClick(item)}
									>
										{item.charAt(0).toUpperCase() + item.slice(1)}
									</button>
								</li>
							))}
						</ul>
					</div>
				</nav>
				<button onClick={toggleMenu} className={toggleButton()} type='button'>
					<span
						className={toggleSpan({
							class: isOpen
								? 'translate-y-[10px] rotate-[-315deg] bg-white top-[4px]'
								: 'top-[4px] bg-gray-600',
						})}
					/>
					<span
						className={toggleSpan({
							class: isOpen
								? 'opacity-0 bg-white top-[14px]'
								: 'top-[14px] opacity-100 bg-gray-600',
						})}
					/>
					<span
						className={toggleSpan({
							class: isOpen
								? 'translate-y-[-10px] rotate-[315deg] bg-white bottom-[4px]'
								: 'bottom-[4px] bg-gray-600',
						})}
					/>
				</button>

				{isOpen && (
					<div
						className={overlay()}
						onClick={toggleMenu}
						onKeyDown={(e) => e.key === 'Enter' && toggleMenu()}
					/>
				)}
			</div>
		</>
	)
}

export default MobileMenu
