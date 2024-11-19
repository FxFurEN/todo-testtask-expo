import { FetchError } from './fetch-error'
import type { RequestOptions, TypeSearchParams } from './fetch-types'

export class FetchClient {
	private baseUrl: string
	public headers?: Record<string, string>
	public params?: TypeSearchParams
	public options?: RequestOptions

	constructor(init: {
		baseUrl: string
		headers?: Record<string, string>
		params?: TypeSearchParams
		options?: RequestOptions
	}) {
		this.baseUrl = init.baseUrl
		this.headers = init.headers
		this.params = init.params
		this.options = init.options
	}

	private createSearchParams(params: TypeSearchParams) {
		const searchParams = new URLSearchParams()

		for (const key in { ...this.params, ...params }) {
			const value = params[key]
			if (Array.isArray(value)) {
				value.forEach(
					currentValue =>
						currentValue && searchParams.append(key, currentValue.toString())
				)
			} else if (value !== undefined) {
				searchParams.set(key, value.toString())
			}
		}

		return `?${searchParams.toString()}`
	}

	private async request<T>(
		endpoint: string,
		method: RequestInit['method'],
		options: RequestOptions = {}
	) {
		let url = `${this.baseUrl}/${endpoint}`

		if (options.params) {
			url += this.createSearchParams(options.params)
		}

		const config: RequestInit = {
			...this.options,
			...options,
			method,
			headers: {
				...this.headers,
				...options.headers,
			},
		}

		const response: Response = await fetch(url, config)

		if (!response.ok) {
			const error = await response.json().catch(() => null)
			throw new FetchError(
				response.status,
				error?.message || response.statusText
			)
		}

		if (response.headers.get('Content-Type')?.includes('application/json')) {
			return (await response.json()) as T
		}

		return (await response.text()) as unknown as T
	}

	public get<T>(endpoint: string, options: Omit<RequestOptions, 'body'> = {}) {
		return this.request<T>(endpoint, 'GET', options)
	}

	public post<T>(endpoint: string, body?: any, options: RequestOptions = {}) {
		return this.request<T>(endpoint, 'POST', {
			...options,
			headers: { 'Content-Type': 'application/json', ...options.headers },
			body: JSON.stringify(body),
		})
	}

	public put<T>(endpoint: string, body?: any, options: RequestOptions = {}) {
		return this.request<T>(endpoint, 'PUT', {
			...options,
			headers: { 'Content-Type': 'application/json', ...options.headers },
			body: JSON.stringify(body),
		})
	}

	public delete<T>(
		endpoint: string,
		options: Omit<RequestOptions, 'body'> = {}
	) {
		return this.request<T>(endpoint, 'DELETE', options)
	}

	public patch<T>(endpoint: string, body?: any, options: RequestOptions = {}) {
		return this.request<T>(endpoint, 'PATCH', {
			...options,
			headers: { 'Content-Type': 'application/json', ...options.headers },
			body: JSON.stringify(body),
		})
	}
}
