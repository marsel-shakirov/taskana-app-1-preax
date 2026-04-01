import { ICONS } from '@/constants'

import { Button } from '@/components'

import styles from './prioritySelector.module.css'

const PRIORITY_ICONS = [ICONS.MINUS, ICONS.CHEVRON_TOP, ICONS.ARROW]

export const PrioritySelector = ({ onClick, priorityActive }) => {
	return (
		<div className={styles.priority}>
			<div className={styles.priorityInner}>
				<h2 className={styles.priorityHeading}>Приоритет</h2>
				{PRIORITY_ICONS.map((element, index) => {
					const priorityIndex = index + 1

					return (
						<Button
							key={`${element}_${index}`}
							onClick={() => onClick(priorityIndex)}
							icons={[{ name: element }]}
							title={`Поставить приоритет задачи на ${priorityIndex}`}
							titleHidden={true}
							classes={[
								'priorityButton',
								`priority${element}`,
								priorityActive === priorityIndex ? 'active' : '',
							]}
						/>
					)
				})}
			</div>
		</div>
	)
}
