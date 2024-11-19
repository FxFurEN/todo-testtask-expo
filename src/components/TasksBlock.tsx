import React from 'react'
import { TasksBlockProps } from '../types'
import TaskList from './TaskList'

const TasksBlock: React.FC<TasksBlockProps> = ({
	tasks,
	fetchTasks,
	router,
}) => {
	return <TaskList tasks={tasks} fetchTasks={fetchTasks} router={router} />
}

export default TasksBlock
