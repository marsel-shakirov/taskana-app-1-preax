import { useCallback, useRef, useState } from 'react'

import { useTasks } from '@/contexts'

import { useOutsideInteraction } from '@/hooks'

import { clsx } from '@/utils'

import { DROPDOWN_ICONS, ICONS } from '@/constants'

import { Button, Icon } from '@/components'

import { DropdownItem } from './'

import styles from './Dropdown.module.css'

export const Dropdown = () => {
	const [isDialogOpen, setIsDialogOpen] = useState(false)

	const { filterSelected, setFilterSelected } = useTasks()

	const dropdownRef = useRef(null)
	const dialogRef = useRef(null)

	const dialogButtonTitle = DROPDOWN_ICONS[filterSelected].title

	const closeDialog = useCallback(() => {
		setIsDialogOpen(false)
		setTimeout(() => dialogRef.current?.close(), 200)
	}, [])

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

	useOutsideInteraction({
		isOpen: isDialogOpen,
		refs: [dropdownRef, dialogRef],
		onDismiss: closeDialog,
	})

	return (
		<div
			ref={dropdownRef}
			className={clsx(styles, 'dropdown', { open: isDialogOpen })}
		>
			<Button
				icons={[
					{ name: DROPDOWN_ICONS[filterSelected].name },
					{ name: ICONS.CHEVRON_DOWN },
				]}
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
