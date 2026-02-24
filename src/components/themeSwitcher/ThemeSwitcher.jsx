import { useTheme } from '@/contexts'

import { ICONS } from '@/constants'

import { Button } from '@/components'

import styles from './themeSwitcher.module.css'

export const ThemeSwitcher = () => {
	const { theme, handleSwitchTheme } = useTheme()

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
