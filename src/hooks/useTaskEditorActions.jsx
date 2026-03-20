import { useState } from 'react'

import { useEditor, useTasks } from '@/contexts'

import { createTask, generateId } from '@/utils'

export const useTaskEditorActions = (delay = 1000) => {
	const { setTasks } = useTasks()
	const { setEditorMode, setEditingTaskId } = useEditor()
	const [pendingAction, setPendingAction] = useState(null)

	const closeEditor = (editor = null, id = null) => {
		setPendingAction(null)
		setEditorMode(editor)
		setEditingTaskId(id)
	}

	const createTaskWithDelay = (title, priority) => {
		if (!title) return
		setPendingAction('create')
		setTimeout(() => {
			setTasks((prev) => [createTask(generateId, title, priority), ...prev])
			closeEditor()
		}, delay)
	}

	const updateTaskWithDelay = (title, priority, id) => {
		if (pendingAction) return
		setPendingAction('create')
		setTimeout(() => {
			setTasks((prevTasks) =>
				prevTasks.map((task) =>
					task.id === id
						? { ...task, title, priority, updateAt: new Date().toISOString() }
						: task
				)
			)
			closeEditor()
		}, delay)
	}

	const deleteTask = (id) => {
		setTasks((prev) => prev.filter((task) => task.id !== id))
		closeEditor()
	}

	const closeEditorWithDelay = () => {
		setPendingAction('close')
		setTimeout(() => {
			closeEditor()
		}, delay)
	}

	const openEditorWithDelay = (editor = 'create', id) => {
		if (pendingAction) return
		setPendingAction('create')
		setTimeout(() => {
			closeEditor(editor, id)
		}, delay)
	}

	return {
		pendingAction,
		createTaskWithDelay,
		updateTaskWithDelay,
		deleteTask,
		closeEditorWithDelay,
		openEditorWithDelay,
	}
}
