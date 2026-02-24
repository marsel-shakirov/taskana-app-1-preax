import { TasksContext } from './TasksContext.jsx'

import { useContext } from 'react'

export function useTasks() {
	return useContext(TasksContext)
}
