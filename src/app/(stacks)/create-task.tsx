import { Task, TaskFormProps } from '@/src/types'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'

const TaskFormScreen: React.FC<TaskFormProps> = ({ tasks, setTasks }) => {
	const router = useRouter()
	const { task } = useLocalSearchParams()
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [isEditMode, setIsEditMode] = useState(false)

	useEffect(() => {
		if (task) {
			const parsedTask = JSON.parse(task as string) as Task
			setTitle(parsedTask.title)
			setDescription(parsedTask.description)
			setIsEditMode(true)
		}
	}, [task])

	const handleSubmit = () => {
		if (isEditMode) {
			const updatedTasks = tasks.map(task =>
				task.id === Number(task.id) ? { ...task, title, description } : task
			)
			setTasks(updatedTasks)
		} else {
			const newTask: Task = {
				id: tasks.length + 1,
				title,
				description,
				completed: false,
			}
			setTasks([...tasks, newTask])
		}
		router.push('/')
	}

	return (
		<View style={styles.container}>
			<TextInput
				label='Название'
				value={title}
				onChangeText={setTitle}
				style={styles.input}
			/>
			<TextInput
				label='Описание'
				value={description}
				onChangeText={setDescription}
				style={styles.input}
				multiline
			/>
			<Button mode='contained' onPress={handleSubmit} style={styles.button}>
				{isEditMode ? 'Сохранить изменения' : 'Добавить задачу'}
			</Button>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
	input: {
		marginBottom: 16,
	},
	button: {
		marginBottom: 8,
	},
})

export default TaskFormScreen
