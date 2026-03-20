import { DROPDOWN_ICONS } from '@/mock/data'

import { useMemo } from 'react'

import { useTasks } from '@/contexts'

import { sortItems } from '@/utils'

import { TaskItem } from './'

import styles from './taskList.module.css'

export const TaskList = () => {
	const { tasks, filterSelected } = useTasks()

	const sortedTasks = useMemo(() => {
		return sortItems(tasks, filterSelected, DROPDOWN_ICONS)
	}, [tasks, filterSelected])

	return (
		<ul className={styles.taskList}>
			{sortedTasks.map((item) => {
				return <TaskItem key={item.id} {...item} />
			})}
		</ul>
	)
}
