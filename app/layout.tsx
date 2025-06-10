import type { Metadata } from 'next'
import './globals.css'
import Footer from '@/app/components/layouts/Footer/Footer'
import Header from '@/app/components/layouts/Header/Header'
import { FilterProvider } from '@/app/features/filter/components/Filter'

export const metadata: Metadata = {
	title: 'Tech Side',
	description: 'Tech Side',
	robots: {
		index: false,
		follow: false,
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ja'>
			<body>
				<FilterProvider>
					<div className='flex flex-col min-h-screen bg-gray-50'>
						<Header />
						<main className='grow'>{children}</main>
						<Footer />
					</div>
				</FilterProvider>
			</body>
		</html>
	)
}
