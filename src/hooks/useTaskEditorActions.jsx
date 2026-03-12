import { useState } from 'react'

import { useTasks } from '@/contexts'

import { createTask, generateId } from '@/utils'

export const useTaskEditorActions = (delay = 1000) => {
	const { tasks, setTasks, setIsEditorTaskOpen } = useTasks()
	const [pendingAction, setPendingAction] = useState(null)

	const createTaskWithDelay = (title, priority) => {
		if (!title) return
		setPendingAction('create')
		setTimeout(() => {
			setTasks([createTask(generateId, title, priority), ...tasks])
			setPendingAction(null)
			setIsEditorTaskOpen(false)
		}, delay)
	}

	const closeEditorWithDelay = () => {
		setPendingAction('close')
		setTimeout(() => {
			setPendingAction(null)
			setIsEditorTaskOpen(false)
		}, delay)
	}

	const openEditorWithDelay = () => {
		if (pendingAction) return
		setPendingAction('create')
		setTimeout(() => {
			setPendingAction(null)
			setIsEditorTaskOpen(true)
		}, delay)
	}

	return {
		pendingAction,
		createTaskWithDelay,
		closeEditorWithDelay,
		openEditorWithDelay,
	}
}
