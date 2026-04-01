import { EditorProvider, TasksProvider } from './contexts'

import { AppLayout } from '@/layouts'

export const App = () => {
	return (
		<EditorProvider>
			<TasksProvider isMockData={false}>
				<AppLayout />
			</TasksProvider>
		</EditorProvider>
	)
}
