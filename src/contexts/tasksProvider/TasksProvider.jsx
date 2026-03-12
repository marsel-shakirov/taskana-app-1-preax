import { TasksContext } from './TasksContext.jsx'

import { useState } from 'react'

export const TasksProvider = ({ children }) => {
	const [isEditorTaskOpen, setIsEditorTaskOpen] = useState(false)
	const [tasks, setTasks] = useState([
		{
			id: 'RNxLySLN',
			title:
				'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo numquam totam ipsam ratione sint doloremque. Ab recusandae nihil aliquam? Ipsum, eos! Nulla quae rem eius modi sunt suscipit ea aperiam? Animi aut optio dolor quasi nesciunt pariatur itaque aspernatur corporis provident maiores molestiae modi debitis officiis iusto nisi, nostrum laudantium eos molestias qui dolorum consequuntur. Velit debitis dignissimos accusantium dolorem?',
			priority: 2,
			createAt: '2026-03-08T08:28:13.563Z',
			updateAt: '2026-03-08T08:28:13.563Z',
		},

		{
			id: '1HKNsIha',
			title: 'Поиск и устранение ошибок',
			priority: 0,
			createAt: '2026-03-08T08:28:06.331Z',
			updateAt: '2026-03-08T08:28:06.331Z',
		},
		{
			id: 'NqQgN4mJ',
			title:
				'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo numquam totam ipsam ratione sint doloremque ipsam ratione sint doloremque',
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
