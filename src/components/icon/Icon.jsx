const iconModules = import.meta.glob('./icons/*.jsx', { eager: true })

const icons = Object.entries(iconModules).reduce((icons, [path, module]) => {
	const componentName = path.split('/').pop().replace('.jsx', '')
	icons[componentName] = module.default || module[componentName]
	return icons
}, {})

export const Icon = ({ name, size = 24, color = 'currentColor', ...props }) => {
	const IconComponent = icons[name]

	// if (!IconComponent) {
	// 	console.warn(`Icon '${name}' not found in available icons`)
	// 	return null
	// }

	return <IconComponent className={name} size={size} color={color} {...props} />
}
