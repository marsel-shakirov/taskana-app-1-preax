import { useTaskEditorActions } from '@/hooks'

import { ICONS } from '@/constants'

import { Button, Logo, ThemeSwitcher } from '@/components'

import styles from './header.module.css'

export const Header = () => {
	const { pendingAction, openEditorWithDelay } = useTaskEditorActions(500)

	return (
		<header className={styles.header}>
			<Logo />
			<div className={styles.headerInner}>
				<Button
					onClick={() => openEditorWithDelay('create')}
					isLoading={pendingAction}
					icons={[{ name: ICONS.PLUS, color: '#fff' }]}
					title="Создать"
					classes={['createButton']}
				/>
				<ThemeSwitcher />
			</div>
		</header>
	)
}
