import { Stack } from 'expo-router'
import React from 'react'
import { Platform } from 'react-native'

export default function StackLayout() {
	return (
		<Stack
			screenOptions={{
				headerTitleStyle: {
					fontWeight: 'bold',
				},
				gestureEnabled: true,
				animation: Platform.select({
					ios: 'default',
					android: 'slide_from_right',
				}),
			}}
		>
			<Stack.Screen
				name='index'
				options={{
					title: 'Home',
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name='create-task'
				options={({ route }) => {
					const task = route?.params?.task
					return {
						title: task ? 'Редактировать задачу' : 'Добавить задачу',
					}
				}}
			/>
		</Stack>
	)
}
