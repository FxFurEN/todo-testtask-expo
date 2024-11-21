import React from 'react'
import { TasksBlockProps } from '../types'
import TaskList from './TaskList'

const TasksBlock: React.FC<TasksBlockProps> = ({
	tasks,
	router,
	onTasksChange,
}) => {
	return (
		<TaskList tasks={tasks} router={router} onTasksChange={onTasksChange} />
	)
}

export default TasksBlock
