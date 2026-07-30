//import type { UseFetchOptions } from 'nuxt/app'
import { useRuntimeConfig } from 'nuxt/app'
//import { useAuthStore } from '../stores/auth'

/*export function usePayloadApi<T>(
    url: string | (() => string),
    options: UseFetchOptions<T> = {}
) {
    return useFetch(url, {
        ...options,
        $fetch: useNuxtApp().$payloadApi as typeof $fetch,
    })
}*/

export const usePayloadApi = () => {
    const config = useRuntimeConfig()

    /*const authStore = useAuthStore()
    if (authStore.isAuthenticated) {
        // Ensure we have the latest user info on app load
        authStore.fetchCurrentUser()
    } else {
        // Optionally, you could attempt to fetch the user if a token exists but user is null
        // This can handle page refresh scenarios where the store is reset but cookie persists
        const token = useCookie<string | null>('payload-token')
        if (token.value) {
            authStore.fetchCurrentUser()
        } else {
            console.warn(
                'No authentication token found, user is not authenticated'
            )
            authStore.logout()
        }
    }*/
    //const token = useCookie<string | null>('payload-token')
    //const user = await authStore.login('amou32@yahoo.fr', 'Xwy7n7i915!w')

    return $fetch.create({
        baseURL: `${config.public.payloadUrl}/api`,
        onRequest({ options }) {
            //if (token.value) {
            options.headers = new Headers(options.headers)
            //options.headers.set('Authorization', `JWT ${token.value}`)
            options.headers.set(
                'Authorization',
                `users API-Key ${config.public.payloadApiKey}`
            )
            //}
        },
    })
}

/*export function usePayloadApi<T>(url: string, options?: UseFetchOptions<T>): AsyncData<T, Error | null> {
    const { $payloadApi } = useNuxtApp()
    // Convert URL string or reactive function into a stable string key for Nuxt caching
    const stringUrl = typeof url === 'function' ? url() : url
    const cacheKey = options?.key || `payload:${stringUrl}`
    const {
        method,
        query,
        body,
        headers,
        key: _key,
        default: _default,
        ...asyncDataOptions
    } = options || {}

    return useAsyncData<T>(
        cacheKey,
        () => {
            return $payloadApi<T>(stringUrl, {
                method: method || 'GET',
                query,
                body,
                headers,
            } as any)
        },
        {
            // Pass along Nuxt data-fetching features like immediate, watch, etc.
            ...asyncDataOptions,
        }
    )
}
*/
