import React, { useEffect, useState } from 'react'
import {
	Alert,
	FlatList,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native'
import { Button, Card, Checkbox, Text } from 'react-native-paper'
import { Task, TaskListProps } from '../types'

const TaskList: React.FC<TaskListProps> = ({ tasks, fetchTasks, router }) => {
	const [taskList, setTaskList] = useState<Task[]>(tasks)

	useEffect(() => {
		setTaskList(tasks)
	}, [tasks])

	const updateTaskStatus = (id: number, completed: boolean) => {
		const updatedTasks = taskList.filter(task => task.id !== id)
		setTaskList(updatedTasks)
		/*try {
			await TasksService.updateTaskStatus(id, completed)
			fetchTasks()
		} catch (error) {
			console.error('Ошибка обновления статуса задачи:', error)
		} */
	}

	const deleteTask = (id: number) => {
		Alert.alert('Удаление', 'Вы уверены, что хотите удалить задачу?', [
			{ text: 'Отмена', style: 'cancel' },
			{
				text: 'Удалить',
				style: 'destructive',
				onPress: () => {
					const updatedTasks = taskList.filter(task => task.id !== id)
					setTaskList(updatedTasks)
					/* try {
						await TasksService.deleteTask(id)
						fetchTasks()
					} catch (error) {
						console.error('Ошибка удаления задачи:', error)
					} */
				},
			},
		])
	}
	const handleTaskPress = (id: number) => {
		router.push({
			pathname: '/(stacks)/edit-task',
			params: { id },
		})
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
			keyExtractor={item => item.id.toString()}
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
