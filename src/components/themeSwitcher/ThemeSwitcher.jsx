import { useEffect, useState } from 'react'

import { ICONS } from '@/constants'

import { Button } from '@/components'

import styles from './themeSwitcher.module.css'

export const ThemeSwitcher = () => {
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

	const nextTheme = theme === 'light' ? 'тёмную' : 'светлую'

	return (
		<div className={styles.themeSwitcher}>
			<Button
				onClick={handleSwitchTheme}
				icons={[
					{ name: ICONS.SUN, size: '32' },
					{ name: ICONS.MOON, size: '32' },
				]}
				classes={['themeButton']}
			>
				<span className={`${styles.active} ${styles[theme]}`}>
					Переключить на {nextTheme} тему
				</span>
			</Button>
		</div>
	)
}
