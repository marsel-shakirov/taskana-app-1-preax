import { DROPDOWN_ICONS } from '@/mock/data'

import { useEffect, useRef, useState } from 'react'

import { useTasks } from '@/contexts'

import { clsx } from '@/utils'

import { ICONS } from '@/constants'

import { Button, Icon } from '@/components'

import { DropdownItem } from './'

import styles from './Dropdown.module.css'

export const Dropdown = () => {
	const [isDialogOpen, setIsDialogOpen] = useState(false)

	const { filterSelected, setFilterSelected } = useTasks()

	const dialogRef = useRef(null)

	const dialogButtonTitle = DROPDOWN_ICONS[filterSelected].title

	const closeDialog = () => {
		setIsDialogOpen(false)
		setTimeout(() => dialogRef.current.close(), 200)
	}

	const openDialog = () => {
		dialogRef.current.show()
		setIsDialogOpen(true)
	}

	const handleToggleDialog = () => {
		if (!dialogRef.current) return

		isDialogOpen ? closeDialog() : openDialog()
	}

	const handleFilterSelect = (index) => {
		setFilterSelected(index)
		closeDialog()
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
	}, [isDialogOpen])

	return (
		<div className={clsx(styles, 'dropdown', { open: isDialogOpen })}>
			<Button
				icons={[{ name: ICONS.CREATE_DOWN }, { name: ICONS.CHEVRON_DOWN }]}
				title={`По ${dialogButtonTitle.toLowerCase()}`}
				classes={['dialogButton']}
				onClick={handleToggleDialog}
			/>

			<dialog
				ref={dialogRef}
				aria-label="Выберите параметры сортировки задач"
				className={clsx(styles, 'dropdownDialog', {
					openDialog: isDialogOpen,
				})}
			>
				<div className={styles.dropdownHeader}>
					<Icon name={ICONS.FILTER} />
					<h3 className={styles.dropdownTitle}>Сортировка по:</h3>
				</div>

				<ul className={styles.dropdownList}>
					{DROPDOWN_ICONS.map((item, index) => (
						<DropdownItem
							filterSelected={filterSelected}
							onClick={() => handleFilterSelect(index)}
							key={`${item.name}_${index}`}
							index={index}
							{...item}
						/>
					))}
				</ul>
			</dialog>
		</div>
	)
}
