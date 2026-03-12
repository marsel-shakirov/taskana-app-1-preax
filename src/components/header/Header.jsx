import { useTaskEditorActions } from '@/hooks'

import { ICONS } from '@/constants'

import { Button, Logo, ThemeSwitcher } from '@/components'

import styles from './header.module.css'

export const Header = () => {
	const { pendingAction, openEditorWithDelay } = useTaskEditorActions(1000)

	return (
		<header className={styles.header}>
			<Logo />
			<div className={styles.headerInner}>
				<Button
					onClick={openEditorWithDelay}
					isLoading={pendingAction}
					icons={[{ name: ICONS.PLUS, color: '#fff' }]}
					title="Создать"
					classes={['createButton']}
				></Button>
				<ThemeSwitcher />
			</div>
		</header>
	)
}
