import { EditorProvider, TasksProvider } from './contexts'

import { AppLayout } from '@/layouts'

export const App = () => {
	return (
		<EditorProvider>
			<TasksProvider isMockData={true}>
				<AppLayout />
			</TasksProvider>
		</EditorProvider>
	)
}
