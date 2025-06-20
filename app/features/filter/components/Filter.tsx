'use client'

// biome-ignore lint/style/useImportType: React is needed for JSX and context provider runtime
import React, { createContext, useState, useContext } from 'react'

export type FilterType = 'all' | 'zenn' | 'qiita' | 'hatena'

type FilterContextType = {
	filter: FilterType
	setFilter: (filter: FilterType) => void
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
	const [filter, setFilter] = useState<FilterType>('all')

	return (
		<FilterContext.Provider value={{ filter, setFilter }}>
			{children}
		</FilterContext.Provider>
	)
}

export const useFilter = () => {
	const context = useContext(FilterContext)
	if (context === undefined) {
		throw new Error('useFilter must be used within a FilterProvider')
	}
	return context
}
