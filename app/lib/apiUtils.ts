import { NextResponse } from 'next/server'
import { ZodSchema } from 'zod'

export interface ApiConfig {
	enableCaching?: boolean
	cacheMaxAge?: number
}

export const defaultApiConfig: ApiConfig = {
	enableCaching: false,
	cacheMaxAge: 0,
}

export function createApiResponse<T>(
	data: T,
	config: ApiConfig = defaultApiConfig
): NextResponse {
	const response = NextResponse.json(data)

	if (!config.enableCaching) {
		// キャッシュ無効化ヘッダーを設定
		response.headers.set(
			'Cache-Control',
			'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0'
		)
		response.headers.set('Pragma', 'no-cache')
		response.headers.set('Expires', '0')
	} else if (config.cacheMaxAge && config.cacheMaxAge > 0) {
		response.headers.set('Cache-Control', `max-age=${config.cacheMaxAge}`)
	}

	return response
}

export function createErrorResponse(
	message: string,
	status: number = 500,
	details?: string
): NextResponse {
	console.error(`API Error (${status}):`, message, details ? `- ${details}` : '')
	
	const errorData = {
		error: message,
		...(details && { details }),
	}

	return NextResponse.json(errorData, { status })
}

export function validateApiResponse<T>(
	data: unknown,
	schema: ZodSchema<T>
): { success: true; data: T } | { success: false; error: string } {
	try {
		const validatedData = schema.parse(data)
		return { success: true, data: validatedData }
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : 'Validation failed'
		return { success: false, error: errorMessage }
	}
}

export async function withApiErrorHandling<T>(
	apiCall: () => Promise<T>,
	errorMessage: string = 'APIリクエストに失敗しました'
): Promise<NextResponse> {
	try {
		const result = await apiCall()
		return createApiResponse(result)
	} catch (error) {
		const details = error instanceof Error ? error.message : 'Unknown error'
		return createErrorResponse(errorMessage, 500, details)
	}
}