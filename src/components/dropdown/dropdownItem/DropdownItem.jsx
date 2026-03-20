import { clsx } from '@/utils'

import { ICONS } from '@/constants'

import { Button } from '@/components'

import styles from './dropdownItem.module.css'

export const DropdownItem = ({
	name,
	title,
	index,
	onClick,
	filterSelected,
}) => {
	return (
		<li
			onClick={onClick}
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
	)
}
