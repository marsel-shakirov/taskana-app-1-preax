import { useId, useMemo, useRef } from 'react'

import { useEditor, useTasks } from '@/contexts'

import { useAutoFocus, useTaskEditorActions, useTaskForm } from '@/hooks'

import { clsx } from '@/utils'

import { ICONS } from '@/constants'

import { Button } from '@/components'

import { EditorInput, PrioritySelector } from './'

import styles from './TaskEditor.module.css'

export const TaskEditor = () => {
	const { tasks } = useTasks()
	const { editorMode, editingTaskId } = useEditor()

	const inputRef = useRef(null)
	const formId = useId()

	const currentTask = useMemo(
		() => tasks.find((task) => task.id === editingTaskId),
		[tasks, editingTaskId]
	)
	const isTaskEditorOpen = editorMode !== null
	const isEditMode = editorMode === 'edit'

	const { formState, updateField, resetForm, isValid, isDirty } = useTaskForm(
		currentTask,
		editorMode
	)

	const {
		pendingAction,
		createTaskWithDelay,
		deleteTask,
		closeEditorWithDelay,
		updateTaskWithDelay,
	} = useTaskEditorActions(1000)

	const isSubmitDisabled = isEditMode ? !isValid || !isDirty : !isValid

	const handleFormReset = () => {
		inputRef.current?.focus()
		resetForm()
	}

	const handleCloseTaskEditor = (event) => {
		event.preventDefault()
		closeEditorWithDelay()
	}

	const handleCreateTasks = (event) => {
		event.preventDefault()

		const title = formState.title.trim()

		if (isEditMode) {
			updateTaskWithDelay(title, formState.priority, editingTaskId)
		} else {
			createTaskWithDelay(title, formState.priority)
		}
	}

	useAutoFocus(inputRef, editorMode, editingTaskId, 400)

	return (
		<aside
			className={clsx(styles, 'taskEditor', {
				taskEditorOpen: isTaskEditorOpen,
			})}
		>
			<form
				onSubmit={handleCreateTasks}
				id={formId}
				action=""
				className={styles.taskEditorForm}
			>
				<EditorInput
					isEditMode={isEditMode}
					formId={formId}
					isTaskEditorOpen={isTaskEditorOpen}
					inputRef={inputRef}
					onChange={(e) => updateField('title', e.target.value)}
					onClick={handleFormReset}
					value={formState.title}
				/>
				<PrioritySelector
					isTaskEditorOpen={isTaskEditorOpen}
					priorityActive={formState.priority}
					onClick={(index) => updateField('priority', index)}
				/>
			</form>
			<div className={clsx(styles, 'taskFooter', { taskEdit: isEditMode })}>
				<Button
					isLoading={pendingAction === 'create'}
					isDisabled={isSubmitDisabled}
					form={formId}
					type="submit"
					classes={['taskEditorButton', 'taskSubmitButton']}
					title={isEditMode ? 'Сохранить' : 'Создать'}
				/>
				<Button
					onClick={handleCloseTaskEditor}
					isDisabled={!isTaskEditorOpen}
					type="button"
					isLoading={pendingAction === 'close'}
					classes={['taskEditorButton', 'taskResetButton']}
					title="Отмена"
				/>
				{isEditMode && (
					<Button
						onClick={() => deleteTask(currentTask.id)}
						icons={[{ name: ICONS.TRASH }]}
						classes={['taskEditorButton', 'taskEditButton']}
					/>
				)}
			</div>
		</aside>
	)
}
