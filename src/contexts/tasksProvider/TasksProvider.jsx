import { TasksContext } from './TasksContext.jsx'

import { useState } from 'react'

export const TasksProvider = ({ children }) => {
	const [filterSelected, setFilterSelected] = useState(4)
	const [tasks, setTasks] = useState([])

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
