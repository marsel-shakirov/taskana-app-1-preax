const sortByCreateAt = (items, order) => {
	return [...items].sort((a, b) => {
		const dateA = new Date(a.createAt)
		const dateB = new Date(b.createAt)

		return order === 'asc' ? dateA - dateB : dateB - dateA
	})
}

const sortByUpdateAt = (items, order) => {
	return [...items].sort((a, b) => {
		const dateA = new Date(a.updateAt)
		const dateB = new Date(b.updateAt)

		return order === 'asc' ? dateA - dateB : dateB - dateA
	})
}

const sortByAlphabet = (items, order) => {
	return [...items].sort((a, b) => {
		const comparison = a.title.localeCompare(b.title, 'ru', {
			sensitivity: 'base',
			ignorePunctuation: true,
		})

		return order === 'asc' ? comparison : -comparison
	})
}

const sortByPriority = (items, order = 'asc') => {
	return [...items].sort((a, b) => {
		return order === 'asc' ? a.priority - b.priority : b.priority - a.priority
	})
}

export const sortItems = (items, index, dropdownData) => {
	if (!dropdownData || index < 0 || index >= dropdownData.length) {
		console.warn('Invalid index for dropdownData')
		return [...items]
	}

	const sortConfig = dropdownData[index]

	if (!sortConfig || !sortConfig.sort || !sortConfig.sortOrder) {
		console.warn('Missing sort or sortOrder in dropdownData item')
		return [...items]
	}

	const { sort, sortOrder } = sortConfig

	switch (sort) {
		case 'priority':
			return sortByPriority(items, sortOrder)
		case 'create':
			return sortByCreateAt(items, sortOrder)
		case 'alphabet':
			return sortByAlphabet(items, sortOrder)
		case 'update':
			return sortByUpdateAt(items, sortOrder)
		default:
			return [...items]
	}
}
