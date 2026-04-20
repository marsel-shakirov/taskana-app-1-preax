import { useTaskEditorActions } from '@/hooks'

import { clsx } from '@/utils'

import { ICONS } from '@/constants'

import { Button } from '@/components'

import styles from './taskItem.module.css'

const PRIORITY_STYLE = {
	1: 'checkmarkDefault',
	2: 'checkmarkSecond',
	3: 'checkmarkThird',
}

export const TaskItem = ({
	id,
	title,
	priority,
	isActive,
	handleChangeIndex,
}) => {
	const { pendingAction, openEditorWithDelay } = useTaskEditorActions(500)

	const handleEditTask = () => {
		handleChangeIndex()
		openEditorWithDelay('edit', id)
	}

	return (
		<li
			className={clsx(styles, 'taskItem', {
				taskActive: isActive,
				loading: pendingAction,
			})}
			tabIndex={0}
		>
			<div className={styles.taskItemWrap}>
				<label className={styles.checkboxLabel}>
					<input type="checkbox" className={styles.checkbox} />
					<span
						className={clsx(styles, 'checkmark', PRIORITY_STYLE[priority])}
					></span>
				</label>
				<p className={styles.checkboxTitle}>{title}</p>
			</div>

			<Button
				onClick={handleEditTask}
				title={`Редактировать задачу "${title}"`}
				titleHidden={true}
				isLoading={pendingAction}
				icons={[{ name: ICONS.EDIT }]}
				classes={['buttonEditTask']}
			/>
		</li>
	)
}
