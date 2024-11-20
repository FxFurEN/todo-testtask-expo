export interface Task {
	id: number
	title: string
	description: string
	completed: boolean
}

export interface TaskListProps {
	tasks: Task[]
	fetchTasks: () => Promise<void>
	router: any
}

export interface TasksBlockProps {
	tasks: Task[]
	filter: 'all' | 'active' | 'completed'
	fetchTasks: () => Promise<void>
	router: any
}

export interface TaskFormProps {
	tasks: Task[]
	setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}
