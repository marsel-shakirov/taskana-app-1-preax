import { useTaskEditorActions } from '@/hooks'

import { clsx } from '@/utils'

import { ICONS } from '@/constants'

import { Button } from '@/components'

import styles from './TaskItem.module.css'

const PRIORITY_STYLE = {
	0: 'checkmarkDefault',
	1: 'checkmarkSecond',
	2: 'checkmarkThird',
}

export const TaskItem = ({ title, priority }) => {
	const { pendingAction, openEditorWithDelay } = useTaskEditorActions(1000)

	return (
		<li className={styles.taskItem} tabIndex={0}>
			<div className={styles.taskItemWrap}>
				<label className={styles.checkboxLabel}>
					<input type="checkbox" className={styles.checkbox} />
					<span
						className={clsx(styles, 'checkmark', PRIORITY_STYLE[priority])}
					></span>
				</label>
				<span className={styles.checkboxTitle}>{title}</span>
			</div>

			<Button
				onClick={openEditorWithDelay}
				isLoading={pendingAction}
				icons={[{ name: ICONS.EDIT }]}
				classes={['buttonEditTask']}
			/>
		</li>
	)
}
