import { api } from '../api'
import { Task } from '../types'

export class TasksService {
	static async getAllTasks() {
		try {
			const response = await api.get<{ result: Task[] }>('/tasks')
			return response
		} catch (error) {
			console.error('Ошибка получения задач:', error)
			throw error
		}
	}

	static async updateTaskStatus(id: number, completed: boolean) {
		try {
			await api.put(`/tasks/${id}`, { completed })
		} catch (error) {
			console.error('Ошибка обновления статуса задачи:', error)
			throw error
		}
	}

	static async deleteTask(id: number) {
		try {
			await api.delete(`/tasks/${id}`)
		} catch (error) {
			console.error('Ошибка удаления задачи:', error)
			throw error
		}
	}
}
