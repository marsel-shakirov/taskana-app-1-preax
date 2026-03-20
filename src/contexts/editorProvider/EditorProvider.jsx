import { EditorContext } from './EditorContext.jsx'

import { useState } from 'react'

export const EditorProvider = ({ children }) => {
	const [editorMode, setEditorMode] = useState(null)
	const [editingTaskId, setEditingTaskId] = useState(null)

	return (
		<EditorContext
			value={{
				editorMode,
				editingTaskId,
				setEditorMode,
				setEditingTaskId,
			}}
		>
			{children}
		</EditorContext>
	)
}
