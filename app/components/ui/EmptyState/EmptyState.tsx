import { FileText, RefreshCw } from 'lucide-react'

interface EmptyStateProps {
	title?: string
	message: string
	icon?: React.ReactNode
	onRetry?: () => void
	showRetry?: boolean
}

const EmptyState = ({ 
	title = 'データがありません',
	message, 
	icon,
	onRetry, 
	showRetry = false 
}: EmptyStateProps) => {
	return (
		<div className='flex flex-col items-center justify-center p-8 text-center bg-gray-50 rounded-lg border border-gray-200'>
			{icon || <FileText className='w-12 h-12 text-gray-400 mb-4' />}
			<h3 className='text-lg font-semibold text-gray-700 mb-2'>
				{title}
			</h3>
			<p className='text-gray-600 mb-4'>{message}</p>
			{showRetry && onRetry && (
				<button
					type='button'
					onClick={onRetry}
					className='flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors'
				>
					<RefreshCw className='w-4 h-4' />
					再読み込み
				</button>
			)}
		</div>
	)
}

export default EmptyState