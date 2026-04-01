import { TasksContext } from './TasksContext.jsx'
import { tasksData } from '@/mocks/tasks.mock.js'

import { useEffect, useState } from 'react'

export const TasksProvider = ({ children, isMockData }) => {
	const [filterSelected, setFilterSelected] = useState(4)
	const [tasks, setTasks] = useState([])

	useEffect(() => {
		if (isMockData) {
			setTasks(tasksData)
		}
	}, [isMockData])

	return (
		<TasksContext
			value={{
				filterSelected,
				tasks,
				setFilterSelected,
				setTasks,
			}}
		>
			{children}
		</TasksContext>
	)
}
