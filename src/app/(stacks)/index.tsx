import TasksBlock from '@/src/components/TasksBlock'
import { Task } from '@/src/types'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { FAB } from 'react-native-paper'

export default function HomeScreen() {
	const [tasks, setTasks] = useState<Task[]>([])
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
				completed: false,
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

	return (
		<View style={styles.container}>
			<TasksBlock tasks={tasks} fetchTasks={fetchTasks} router={router} />
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
	fab: {
		position: 'absolute',
		bottom: 16,
		right: 16,
	},
})
