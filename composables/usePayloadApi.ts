import type { UseFetchOptions } from '#app'

export function usePayloadApi<T>(url: string, options?: UseFetchOptions<T>) {
    const { $payloadApi } = useNuxtApp()
    // Convert URL string or reactive function into a stable string key for Nuxt caching
    const stringUrl = typeof url === 'function' ? url() : url
    const cacheKey = options?.key || `payload:${stringUrl}`

    return useAsyncData<T>(
        cacheKey,
        () => {
            return $payloadApi<T>(stringUrl, {
                method: options?.method || 'GET',
                query: options?.query,
                body: options?.body,
                headers: options?.headers,
            } as any)
        },
        {
            // Pass along Nuxt data-fetching features like immediate, watch, etc.
            ...options,
        }
    )
}
