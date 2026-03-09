import { useEffect, useId, useRef, useState } from 'react'

import { useTasks } from '@/contexts'

import { clsx, createTask, generateId } from '@/utils'

import { Button, EditorInput, PrioritySelector } from '@/components'

import styles from './TaskEditor.module.css'

export const TaskEditor = () => {
	const { isEditorTaskOpen, setIsEditorTaskOpen, tasks, setTasks } = useTasks()

	const inputRef = useRef(null)

	const [inputFormValue, setInputFormValue] = useState('')
	const [priorityActive, setPriorityActive] = useState(0)
	const [pendingAction, setPendingAction] = useState(null)

	const formId = useId()

	const handleFormChange = (event) => {
		const value = event.target.value
		const cleaned = value.trim()

		if (cleaned !== '') {
			setInputFormValue(value)
		} else {
			setInputFormValue('')
		}
	}

	const handleFormReset = () => {
		inputRef.current?.focus()
		setInputFormValue('')
	}

	const handlePriorityChange = (index) => {
		setPriorityActive(index)
	}

	const handleCloseTaskEditor = () => {
		setPendingAction('close')
		setTimeout(() => {
			setPendingAction(null)
			setIsEditorTaskOpen(false)
		}, 1000)
	}

	const handleCreateTasks = (event) => {
		event.preventDefault()
		setPendingAction('create')
		setTimeout(() => {
			setTasks([
				createTask(generateId, inputFormValue, priorityActive),
				...tasks,
			])
			setPendingAction(null)
			setIsEditorTaskOpen(false)
		}, 1000)
	}

	useEffect(() => {
		if (isEditorTaskOpen && inputRef.current) {
			setTimeout(() => inputRef.current.focus(), 400)
		}
		setPriorityActive(0)
		setInputFormValue('')
	}, [isEditorTaskOpen])

	return (
		<aside
			className={clsx(styles, 'taskEditor', {
				taskEditorOpen: isEditorTaskOpen,
			})}
		>
			<form id={formId} action="" className={styles.taskEditorForm}>
				<EditorInput
					formId={formId}
					isEditorTaskOpen={isEditorTaskOpen}
					inputRef={inputRef}
					onChange={handleFormChange}
					onClick={handleFormReset}
					value={inputFormValue}
				/>
				<PrioritySelector
					isEditorTaskOpen={isEditorTaskOpen}
					onClick={handlePriorityChange}
					priorityActive={priorityActive}
				/>
			</form>
			<div className={styles.taskFooter}>
				<Button
					isLoading={pendingAction === 'create'}
					onClick={handleCreateTasks}
					isDisabled={!inputFormValue}
					form={formId}
					type="submit"
					classes={['taskEditorButton', 'taskSubmitButton']}
					title="Создать"
				/>
				<Button
					isDisabled={!isEditorTaskOpen}
					type="button"
					onClick={handleCloseTaskEditor}
					isLoading={pendingAction === 'close'}
					classes={['taskEditorButton', 'taskResetButton']}
					title="Отмена"
				/>
			</div>
		</aside>
	)
}
