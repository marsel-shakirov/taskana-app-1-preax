export const createTask = (generateId, inputValue, prioryValue) => {
	const date = new Date()
	return {
		id: generateId(),
		title: inputValue,
		priority: prioryValue,
		createAt: date.toISOString(),
		updateAt: date.toISOString(),
	}
}
