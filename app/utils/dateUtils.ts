export const formatDate = (dateString: string | undefined): string => {
	if (!dateString) {
		console.warn('formatDate: dateString is undefined or empty')
		return '投稿時間不明'
	}

	const publishedDate = new Date(dateString)
	const now = new Date()

	if (Number.isNaN(publishedDate.getTime())) {
		console.warn('formatDate: Invalid date format:', dateString)
		return '投稿時間不明'
	}

	const diffInMs = now.getTime() - publishedDate.getTime()
	const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
	const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
	const diffInMinutes = Math.floor(diffInMs / (1000 * 60))

	if (diffInDays >= 1) {
		return `${diffInDays}日前`
	}
	if (diffInHours >= 1) {
		return `約${diffInHours}時間前`
	}
	if (diffInMinutes >= 1) {
		return `${diffInMinutes}分前`
	}
	return 'たった今'
}