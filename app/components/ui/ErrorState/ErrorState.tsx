import { AlertCircle, RefreshCw } from 'lucide-react'

interface ErrorStateProps {
	message: string
	details?: string
	onRetry?: () => void
	showRetry?: boolean
}

const ErrorState = ({ 
	message, 
	details, 
	onRetry, 
	showRetry = true 
}: ErrorStateProps) => {
	return (
		<div className='flex flex-col items-center justify-center p-8 text-center bg-red-50 rounded-lg border border-red-200'>
			<AlertCircle className='w-12 h-12 text-red-500 mb-4' />
			<h3 className='text-lg font-semibold text-red-800 mb-2'>
				エラーが発生しました
			</h3>
			<p className='text-red-600 mb-2'>{message}</p>
			{details && (
				<p className='text-sm text-red-500 mb-4'>{details}</p>
			)}
			{showRetry && onRetry && (
				<button
					type='button'
					onClick={onRetry}
					className='flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors'
				>
					<RefreshCw className='w-4 h-4' />
					再試行
				</button>
			)}
		</div>
	)
}

export default ErrorState