import { ThemeContext } from './ThemeContext.jsx'

import { useEffect, useState } from 'react'

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState('light')

	useEffect(() => {
		const prefersDark = window.matchMedia(
			'(prefers-color-scheme: dark)'
		).matches
		setTheme(prefersDark ? 'dark' : 'light')
	}, [])

	useEffect(() => {
		document.body.style.colorScheme = theme
		document.body.setAttribute('data-theme', theme)
	}, [theme])

	const handleSwitchTheme = () => {
		setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
	}

	return (
		<ThemeContext
			value={{
				theme,
				handleSwitchTheme,
			}}
		>
			{children}
		</ThemeContext>
	)
}
