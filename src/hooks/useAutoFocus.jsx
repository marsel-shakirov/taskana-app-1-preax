import { useEffect } from 'react'

export const useAutoFocus = (ref, isActive, editingTaskId, delay = 0) => {
	useEffect(() => {
		if (!isActive || !ref.current) return
		const timer = setTimeout(() => ref.current.focus(), delay)

		return () => clearTimeout(timer)
	}, [ref, isActive, editingTaskId, delay])
}
