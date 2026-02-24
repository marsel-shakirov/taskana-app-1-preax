import { clsx } from '@/utils'

import { ICONS } from '@/constants'

import { Button } from '@/components'

import styles from './editorInput.module.css'

export const EditorInput = ({
	isEditorTaskOpen,
	inputRef,
	onChange,
	value,
	onClick,
}) => {
	return (
		<div className={styles.editorInput}>
			<h2 className={styles.inputHeading}>Создание задачи</h2>
			<div className={styles.inputInner}>
				<span className={styles.inputTitle}>Название</span>
				<label className={styles.inputLabel}>
					<span className="visually-hidden">Название задачи</span>
					<input
						disabled={!isEditorTaskOpen}
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
