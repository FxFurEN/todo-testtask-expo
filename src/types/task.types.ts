export interface Task {
	id: string
	title: string
	description: string
	completed: boolean
}

export interface TaskListProps {
	tasks: Task[]
	router: any
	onTasksChange: (tasks: Task[]) => void
}

export interface TasksBlockProps {
	tasks: Task[]
	filter: 'all' | 'active' | 'completed'
	router: any
	onTasksChange: (tasks: Task[]) => void
}

export interface TaskFormProps {
	tasks: Task[]
	setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}
