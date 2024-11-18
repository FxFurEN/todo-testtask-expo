import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Button, Card, FAB, Text } from 'react-native-paper'

interface Task {
	id: number
	title: string
	description: string
	completed: boolean
}

const tasksData: Task[] = [
	{
		id: 1,
		title: 'Task 1',
		description: 'Description for task 1',
		completed: false,
	},
	{
		id: 2,
		title: 'Task 2',
		description: 'Description for task 2',
		completed: true,
	},
	{
		id: 3,
		title: 'Task 3',
		description: 'Description for task 3',
		completed: false,
	},
	// Добавь сюда дополнительные задачи для теста
]

export default function HomeScreen() {
	const [tasks, setTasks] = useState<Task[]>(tasksData)
	const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')
	const router = useRouter()

	// Фильтрация задач по статусу
	const filteredTasks = tasks.filter(task => {
		if (filter === 'all') return true
		if (filter === 'active') return !task.completed
		if (filter === 'completed') return task.completed
		return false
	})

	// Отображение задачи
	const renderItem = ({ item }: { item: Task }) => (
		<Card style={styles.taskCard}>
			<Card.Content>
				<Text variant='titleMedium'>{item.title}</Text>
				<Text variant='bodySmall'>{item.description}</Text>
				<Text variant='bodyMedium' style={{ marginTop: 8 }}>
					Статус: {item.completed ? 'Выполнена' : 'Не выполнена'}
				</Text>
			</Card.Content>
		</Card>
	)

	return (
		<View style={styles.container}>
			{/* Фильтрация */}
			<View style={styles.filterContainer}>
				<Button
					mode={filter === 'all' ? 'contained' : 'outlined'}
					onPress={() => setFilter('all')}
					style={styles.filterButton}
				>
					Все
				</Button>
				<Button
					mode={filter === 'active' ? 'contained' : 'outlined'}
					onPress={() => setFilter('active')}
					style={styles.filterButton}
				>
					Активные
				</Button>
				<Button
					mode={filter === 'completed' ? 'contained' : 'outlined'}
					onPress={() => setFilter('completed')}
					style={styles.filterButton}
				>
					Выполненные
				</Button>
			</View>

			{/* Список задач */}
			<FlatList
				data={filteredTasks}
				keyExtractor={item => item.id.toString()}
				renderItem={renderItem}
				style={styles.taskList}
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
		padding: 16,
	},
	filterContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginBottom: 16,
	},
	filterButton: {
		flex: 1,
		marginHorizontal: 4,
	},
	taskList: {
		flex: 1,
	},
	taskCard: {
		marginBottom: 12,
	},
	fab: {
		position: 'absolute',
		bottom: 16,
		right: 16,
	},
})
