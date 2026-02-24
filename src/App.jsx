import { TasksProvider, ThemeProvider } from './contexts'

import { AppLayout } from '@/layouts'

export const App = () => {
	return (
		<ThemeProvider>
			<TasksProvider>
				<AppLayout />
			</TasksProvider>
		</ThemeProvider>
	)
}
