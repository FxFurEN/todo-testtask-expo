import { FetchClient } from '../utils'

export const api = new FetchClient({
	baseUrl: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5000',
})
