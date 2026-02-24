import { useEffect, useId, useRef, useState } from 'react'

import { useTasks } from '@/contexts'

import { clsx, generateId } from '@/utils'

import { ICONS } from '@/constants'

import { Button } from '@/components'

import styles from './TaskEditor.module.css'

const PRIORITY_ICONS = [ICONS.MINUS, ICONS.CHEVRON, ICONS.ARROW]

export const TaskEditor = () => {
	const { isEditorTaskOpen, setIsEditorTaskOpen, tasks, setTasks } = useTasks()

	const inputRef = useRef(null)

	const [inputFormValue, setInputFormValue] = useState('')
	const [priorityActive, setPriorityActive] = useState(0)
	const [pendingAction, setPendingAction] = useState(null)

	const formId = useId()

	const createTask = () => {
		const date = new Date()
		return {
			id: generateId(),
			title: inputFormValue,
			priority: priorityActive,
			createAt: date.toISOString(),
			updateAt: date.toISOString(),
		}
	}

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
			setTasks([...tasks, createTask()].reverse())
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
			<div className={styles.taskEditorInner}>
				<div className={styles.taskHeader}>
					<h2 className={styles.taskHeading}>Создание задачи</h2>
					<form id={formId} action="" className={styles.formEditor}>
						<span className={styles.formEditorHeading}>Название</span>
						<label className={styles.formEditorLabel}>
							<span className="visually-hidden">Название задачи</span>
							<input
								disabled={!isEditorTaskOpen}
								ref={inputRef}
								onChange={handleFormChange}
								name="title"
								placeholder="Название задачи"
								type="text"
								value={inputFormValue}
								className={clsx(styles, 'formEditorInput', {
									closeHidden: inputFormValue,
								})}
							/>
							<Button
								onClick={handleFormReset}
								type="button"
								icons={[{ name: ICONS.DELETE }]}
								title="Очистить поле"
								titleHidden={true}
								classes={['resetFormInput']}
							/>
						</label>
					</form>
				</div>
				<div className={styles.taskPriority}>
					<div className={styles.taskPriorityInner}>
						<h2 className={styles.priorityHeading}>Приоритет</h2>
						{PRIORITY_ICONS.map((element, index) => {
							return (
								<Button
									isDisabled={!isEditorTaskOpen}
									key={`${element}_${index}`}
									onClick={() => handlePriorityChange(index)}
									icons={[{ name: element }]}
									title={`Поставить приоритет задачи на ${index}`}
									titleHidden={true}
									classes={[
										'priorityButton',
										`priority${element}`,
										priorityActive === index ? 'active' : '',
									]}
								/>
							)
						})}
					</div>
				</div>
			</div>
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
