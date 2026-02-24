import { ThemeContext } from './ThemeContext.jsx'

import { useContext } from 'react'

export function useTheme() {
	return useContext(ThemeContext)
}
