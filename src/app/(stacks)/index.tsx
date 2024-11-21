import TasksBlock from '@/src/components/TasksBlock'
import { TasksService } from '@/src/services/tasks.service'
import { Task } from '@/src/types'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, FAB } from 'react-native-paper'

export default function HomeScreen() {
	const [tasks, setTasks] = useState<Task[]>([])
	const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')
	const router = useRouter()

	useEffect(() => {
		const fetchTasks = async () => {
			try {
				const tasksData = await TasksService.getAllTasks()
				setTasks(tasksData)
			} catch (error) {
				console.error('Ошибка при получении задач:', error)
			}
		}
		fetchTasks()
	}, [])

	// хз почему но даже при явном объявлении boolean он не работе, в бд тоже boolean, на всякий случай указал и строку
	const getFilteredTasks = () => {
		switch (filter) {
			case 'active':
				return tasks.filter(
					task => task.completed === false || task.completed === 'false'
				)
			case 'completed':
				return tasks.filter(
					task => task.completed === true || task.completed === 'true'
				)
			default:
				return tasks
		}
	}

	const filteredTasks = getFilteredTasks()

	return (
		<View style={styles.container}>
			<View style={styles.filterContainer}>
				<Button
					mode={filter === 'all' ? 'contained' : 'outlined'}
					onPress={() => setFilter('all')}
				>
					Все
				</Button>
				<Button
					mode={filter === 'active' ? 'contained' : 'outlined'}
					onPress={() => setFilter('active')}
				>
					Активные
				</Button>
				<Button
					mode={filter === 'completed' ? 'contained' : 'outlined'}
					onPress={() => setFilter('completed')}
				>
					Выполненные
				</Button>
			</View>

			{filteredTasks.length === 0 ? (
				<View style={styles.noTasksContainer}>
					<Text>Нет задач</Text>
				</View>
			) : (
				<TasksBlock
					tasks={filteredTasks}
					router={router}
					onTasksChange={setTasks}
				/>
			)}

			<FAB
				style={styles.fab}
				icon='plus'
				onPress={() => router.push('/(stacks)/create-task')}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 30,
		padding: 16,
	},
	filterContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 16,
	},
	noTasksContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	fab: {
		position: 'absolute',
		bottom: 16,
		right: 16,
	},
})
