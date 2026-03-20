import { ICONS } from '@/constants'

import { Button } from '@/components'

import styles from './prioritySelector.module.css'

const PRIORITY_ICONS = [ICONS.MINUS, ICONS.CHEVRON_TOP, ICONS.ARROW]

export const PrioritySelector = ({
	isTaskEditorOpen,
	onClick,
	priorityActive,
}) => {
	return (
		<div className={styles.priority}>
			<div className={styles.priorityInner}>
				<h2 className={styles.priorityHeading}>Приоритет</h2>
				{PRIORITY_ICONS.map((element, index) => {
					return (
						<Button
							isDisabled={!isTaskEditorOpen}
							key={`${element}_${index}`}
							onClick={() => onClick(index)}
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
	)
}
