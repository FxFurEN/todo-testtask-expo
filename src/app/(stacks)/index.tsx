import TasksBlock from '@/src/components/TasksBlock'
import { Task } from '@/src/types'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, FAB } from 'react-native-paper'

export default function HomeScreen() {
	const [tasks, setTasks] = useState<Task[]>([])
	const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')
	const router = useRouter()

	useEffect(() => {
		const dummyTasks = [
			{
				id: 1,
				title: 'Задача 1',
				completed: false,
				description: 'Описание задачи 1',
			},
			{
				id: 2,
				title: 'Задача 2',
				completed: true,
				description: 'Описание задачи 2',
			},
			{
				id: 3,
				title: 'Задача 3',
				completed: false,
				description: 'Описание задачи 3',
			},
		]
		setTasks(dummyTasks)
	}, [])

	const fetchTasks = async () => {}

	const getFilteredTasks = () => {
		switch (filter) {
			case 'active':
				return tasks.filter(task => !task.completed)
			case 'completed':
				return tasks.filter(task => task.completed)
			default:
				return tasks
		}
	}

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
			<TasksBlock
				tasks={getFilteredTasks()}
				fetchTasks={fetchTasks}
				router={router}
			/>
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
	fab: {
		position: 'absolute',
		bottom: 16,
		right: 16,
	},
})
