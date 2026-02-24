import { useTasks } from '@/contexts'

import { clsx } from '@/utils'

import styles from './taskList.module.css'

const PRIORITY_STYLE = {
	0: 'checkmarkDefault',
	1: 'checkmarkSecond',
	2: 'checkmarkThird',
}

export const TaskList = () => {
	const { tasks } = useTasks()

	return (
		<ul className={styles.taskList}>
			{tasks.map(({ id, title, priority }) => {
				return (
					<li key={id} className={styles.taskItem} tabIndex={0}>
						<div className={styles.taskItemWrap}>
							<label className={styles.checkboxLabel}>
								<input type="checkbox" className={styles.checkbox} />
								<span
									className={clsx(
										styles,
										'checkmark',
										PRIORITY_STYLE[priority]
									)}
								></span>
							</label>
							<span className={styles.checkboxTitle}>{title}</span>
						</div>
					</li>
				)
			})}
		</ul>
	)
}
