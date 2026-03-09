// import { useTasks } from '@/contexts'
import { DROPDOWN_ICONS } from '@/mock/data'

import { useEffect, useRef, useState } from 'react'

import { useTasks } from '@/contexts'

import { clsx, sortItems } from '@/utils'

import { ICONS } from '@/constants'

import { Button, Icon } from '@/components'

import styles from './Dropdown.module.css'

export const Dropdown = () => {
	const [filterSelected, setFilterSelected] = useState(4)
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [dialogButtonTitle, setDialogButtonTitle] = useState(
		DROPDOWN_ICONS[filterSelected].title
	)
	const { tasks, setTasks } = useTasks()

	const dialogRef = useRef(null)

	console.log(tasks)

	const openDialog = () => {
		dialogRef.current.classList.add(styles.openDialog)
		dialogRef.current?.show()
		setIsDialogOpen(true)
	}

	const closeDialog = () => {
		dialogRef.current.classList.remove(styles.openDialog)
		setTimeout(() => {
			setIsDialogOpen(false)
			dialogRef.current.close()
		}, 200)
	}

	const handleFilterSelect = (index) => {
		const tasksFiltered = sortItems(tasks, index, DROPDOWN_ICONS)

		setDialogButtonTitle(DROPDOWN_ICONS[index].title)
		setTasks(tasksFiltered)
		setFilterSelected(index)
		closeDialog()
	}

	const handleShowDialog = () => {
		if (isDialogOpen) {
			closeDialog()
		} else {
			openDialog()
		}
	}

	useEffect(() => {
		if (!isDialogOpen) return

		const handleKeyDown = (event) => {
			if (event.key === 'Escape') {
				closeDialog()
			}
		}

		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [isDialogOpen, filterSelected])

	return (
		<div className={clsx(styles, 'dropdown', { open: isDialogOpen })}>
			<Button
				icons={[{ name: ICONS.CREATE_DOWN }, { name: ICONS.CHEVRON_DOWN }]}
				title={`По ${dialogButtonTitle.toLowerCase()}`}
				classes={['dialogButton']}
				onClick={handleShowDialog}
			/>

			<dialog
				ref={dialogRef}
				aria-label="Выберите параметры сортировки задач"
				className={styles.dropdownDialog}
			>
				<div className={styles.dropdownHeader}>
					<Icon name={ICONS.FILTER} />
					<h3 className={styles.dropdownTitle}>Сортировка по:</h3>
				</div>

				<ul className={styles.dropdownList}>
					{DROPDOWN_ICONS.map(({ name, title }, index) => (
						<li
							key={`${name}_${index}`}
							onClick={() => handleFilterSelect(index)}
							className={clsx(
								styles,
								'dropdownItem',
								filterSelected === index ? 'selected' : ''
							)}
						>
							<Button
								icons={[{ name }, { name: ICONS.CHECK }]}
								classes={['dropdownButton']}
								title={title}
							/>
						</li>
					))}
				</ul>
			</dialog>
		</div>
	)
}
