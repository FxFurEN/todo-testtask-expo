import React, { useState } from 'react'
import {
	Alert,
	FlatList,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native'
import { Button, Card, Checkbox, Text } from 'react-native-paper'
import { TasksService } from '../services/tasks.service'
import { Task, TaskListProps } from '../types'

const TaskList: React.FC<TaskListProps> = ({
	tasks,
	router,
	onTasksChange,
}) => {
	const [taskList, setTaskList] = useState<Task[]>(tasks)

	const updateTaskStatus = async (id: string, completed: boolean) => {
		try {
			await TasksService.updateTaskStatus(id, completed)
			const updatedTasks = taskList.map(task =>
				task.id === id ? { ...task, completed } : task
			)
			setTaskList(updatedTasks)
			onTasksChange(updatedTasks)
		} catch (error) {
			console.error('Ошибка обновления статуса задачи:', error)
		}
	}

	const deleteTask = (id: string) => {
		Alert.alert('Удаление', 'Вы уверены, что хотите удалить задачу?', [
			{ text: 'Отмена', style: 'cancel' },
			{
				text: 'Удалить',
				style: 'destructive',
				onPress: async () => {
					try {
						await TasksService.deleteTask(id)
						const updatedTasks = taskList.filter(task => task.id !== id)
						setTaskList(updatedTasks)
						onTasksChange(updatedTasks)
					} catch (error) {
						console.error('Ошибка удаления задачи:', error)
					}
				},
			},
		])
	}

	const handleTaskPress = (id: number) => {
		const taskToEdit = taskList.find(task => task.id === id)
		if (taskToEdit) {
			router.push({
				pathname: '/(stacks)/create-task',
				params: { task: JSON.stringify(taskToEdit) },
			})
		}
	}

	const renderItem = ({ item }: { item: Task }) => (
		<TouchableOpacity onPress={() => handleTaskPress(item.id)}>
			<Card style={styles.taskCard}>
				<Card.Content style={styles.cardContent}>
					<Checkbox
						status={item.completed ? 'checked' : 'unchecked'}
						onPress={() => updateTaskStatus(item.id, !item.completed)}
					/>
					<View style={styles.taskInfo}>
						<Text variant='titleMedium'>{item.title}</Text>
						<Text variant='bodySmall'>{item.description}</Text>
					</View>
					<Button mode='text' onPress={() => deleteTask(item.id)} color='red'>
						Удалить
					</Button>
				</Card.Content>
			</Card>
		</TouchableOpacity>
	)

	return (
		<FlatList
			data={taskList}
			keyExtractor={item => item.id}
			renderItem={renderItem}
		/>
	)
}

const styles = StyleSheet.create({
	taskCard: {
		margin: 10,
	},
	cardContent: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	taskInfo: {
		flex: 1,
		marginLeft: 8,
	},
})

export default TaskList
