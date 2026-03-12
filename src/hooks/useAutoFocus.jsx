import { useEffect } from 'react'

export const useAutoFocus = (ref, isActive, delay = 0) => {
	useEffect(() => {
		if (!isActive || !ref.current) return
		const timer = setTimeout(() => ref.current.focus(), delay)

		return () => clearTimeout(timer)
	}, [isActive, ref, delay])
}
