import { clsx } from '@/utils'

import { ICONS } from '@/constants'

import { Button } from '@/components'

import styles from './editorInput.module.css'

export const EditorInput = ({
	isEditMode,
	inputRef,
	onChange,
	value,
	onClick,
}) => {
	const heading = isEditMode ? 'Редактирование' : 'Создание задачи'

	return (
		<div className={styles.editorInput}>
			<h2 className={styles.inputHeading}>{heading}</h2>
			<div className={styles.inputInner}>
				<span className={styles.inputTitle}>Название</span>
				<label className={styles.inputLabel}>
					<span className="visually-hidden">Название задачи</span>
					<input
						ref={inputRef}
						onChange={onChange}
						name="title"
						placeholder="Название задачи"
						type="text"
						value={value}
						className={clsx(styles, 'input', {
							closeHidden: value,
						})}
					/>
					<Button
						onClick={onClick}
						type="button"
						icons={[{ name: ICONS.DELETE }]}
						title="Очистить поле"
						titleHidden={true}
						classes={['resetFormInput']}
					/>
				</label>
			</div>
		</div>
	)
}
