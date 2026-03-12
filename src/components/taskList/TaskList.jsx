import { TaskItem } from '../taskItem/TaskItem'

import { useTasks } from '@/contexts'

import styles from './taskList.module.css'

export const TaskList = () => {
	const { tasks } = useTasks()

	return (
		<ul className={styles.taskList}>
			{tasks.map((item) => {
				return <TaskItem key={item.id} {...item} />
			})}
		</ul>
	)
}
