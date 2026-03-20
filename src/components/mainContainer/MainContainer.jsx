import { useTasks } from '@/contexts'

import { Dropdown, TaskList, TaskOrganizationStatus } from '@/components'

import styles from './MainContainer.module.css'

export const MainContainer = () => {
	const { tasks } = useTasks()

	return (
		<main className={styles.main}>
			<h1 className="visually-hidden">
				Taskana — ваш персональный планировщик задач
			</h1>
			<section className={styles.mainSection}>
				<div className={styles.mainTitleContainer}>
					<h2 className={styles.mainTitle}>Входящие</h2>
					{tasks.length === 0 ? null : <Dropdown />}
				</div>
				{tasks.length === 0 ? <TaskOrganizationStatus /> : <TaskList />}
			</section>
		</main>
	)
}
