import { useState } from 'react'

import { useTasks } from '@/contexts'

import { ICONS } from '@/constants'

import { Button, Logo, ThemeSwitcher } from '@/components'

import styles from './header.module.css'

export const Header = () => {
	const [isLoading, setLoading] = useState(false)
	const { setIsEditorTaskOpen } = useTasks()

	const handleCreateTask = () => {
		setLoading(true)
		setTimeout(() => {
			setLoading(false)
			setIsEditorTaskOpen(true)
		}, 1000)
	}

	return (
		<header className={styles.header}>
			<Logo />
			<div className={styles.headerInner}>
				<Button
					onClick={handleCreateTask}
					isLoading={isLoading}
					icons={[{ name: ICONS.PLUS, color: '#fff' }]}
					title="Создать"
					classes={['createButton']}
				></Button>
				<ThemeSwitcher />
			</div>
		</header>
	)
}
