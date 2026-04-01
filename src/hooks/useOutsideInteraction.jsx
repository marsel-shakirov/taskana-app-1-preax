import { useEffect } from 'react'

export const useOutsideInteraction = ({ isOpen, refs, onDismiss }) => {
	useEffect(() => {
		if (!isOpen) return

		const isInsideRefs = (target) =>
			refs.some((ref) => ref.current?.contains(target))

		const handlePointerDown = (event) => {
			if (!isInsideRefs(event.target)) {
				onDismiss()
			}
		}

		const handleFocusIn = (event) => {
			if (!isInsideRefs(event.target)) {
				onDismiss()
			}
		}

		const handleKeyDown = (event) => {
			if (event.key === 'Escape') {
				onDismiss()
			}
		}

		document.addEventListener('pointerdown', handlePointerDown)
		document.addEventListener('focusin', handleFocusIn)
		document.addEventListener('keydown', handleKeyDown)

		return () => {
			document.removeEventListener('pointerdown', handlePointerDown)
			document.removeEventListener('focusin', handleFocusIn)
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [isOpen, onDismiss, refs])
}
