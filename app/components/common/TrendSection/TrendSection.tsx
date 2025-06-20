import { tv } from 'tailwind-variants'

const trendStyle = tv({
	slots: {
		container: 'flex flex-col rounded-md md:h-[calc(100vh-(--spacing(28)))]',
		header: 'flex justify-center bg-slate-600 text-white rounded-t-md py-1',
		title: 'text-xl lg:text-2xl font-bold',
		content:
			'p-4 bg-slate-100 rounded-b-md md:overflow-y-auto md:overflow-x-hidden flex grow flex-col',
	},
})

interface TrendSectionProps {
	title: string
	children: React.ReactNode
}

const TrendSection = ({ title, children }: TrendSectionProps) => {
	const { container, header, title: titleClass, content } = trendStyle()
	
	return (
		<div className={container()}>
			<div className={header()}>
				<h2 className={titleClass()}>{title}</h2>
			</div>
			<div className={content()}>{children}</div>
		</div>
	)
}

export default TrendSection