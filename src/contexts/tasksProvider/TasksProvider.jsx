import { TasksContext } from './TasksContext.jsx'

import { useState } from 'react'

export const TasksProvider = ({ children }) => {
	const [isEditorTaskOpen, setIsEditorTaskOpen] = useState(false)
	const [tasks, setTasks] = useState([
		{
			id: 'RNxLySLN',
			title: 'а',
			priority: 2,
			createAt: '2026-03-08T08:28:13.563Z',
			updateAt: '2026-03-08T08:28:13.563Z',
		},

		{
			id: '1HKNsIha',
			title: 'вб',
			priority: 0,
			createAt: '2026-03-08T08:28:06.331Z',
			updateAt: '2026-03-08T08:28:06.331Z',
		},
		{
			id: 'NqQgN4mJ',
			title: 'В',
			priority: 1,
			createAt: '2026-03-08T08:28:01.127Z',
			updateAt: '2026-03-08T08:28:01.127Z',
		},
	])

	return (
		<TasksContext
			value={{
				isEditorTaskOpen,
				tasks,
				setIsEditorTaskOpen,
				setTasks,
			}}
		>
			{children}
		</TasksContext>
	)
}
