import { api } from '../api'
import { Task } from '../types'

export class TasksService {
	static async getAllTasks() {
		try {
			const response = await api.get<{ result: Task[] }>('api/tasks')
			return response
		} catch (error) {
			console.error('Ошибка получения задач:', error)
			throw error
		}
	}

	static async updateTask(id: string, updatedData: Partial<Task>) {
		try {
			await api.put(`api/tasks/${id}`, updatedData)
		} catch (error) {
			console.error('Ошибка обновления задачи:', error)
			throw error
		}
	}

	static async updateTaskStatus(id: string, completed: boolean) {
		try {
			await api.put(`api/tasks/status/${id}`, { completed })
		} catch (error) {
			console.error('Ошибка обновления статуса задачи:', error)
			throw error
		}
	}

	static async deleteTask(id: string) {
		try {
			await api.delete(`api/tasks/${id}`)
		} catch (error) {
			console.error('Ошибка удаления задачи:')
			throw error
		}
	}

	static async createTask(task: Task) {
		try {
			const response = await api.post('api/tasks', task)
			return response
		} catch (error) {
			console.error('Ошибка создания задачи:', error)
			throw error
		}
	}
}
