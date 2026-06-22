/*import { defineNuxtPlugin, useCookie, useRuntimeConfig } from 'nuxt/app'
import type { $Fetch } from 'ofetch'

//type PayloadApi = ReturnType<typeof $fetch.create>

export default defineNuxtPlugin<{ payloadApi: $Fetch }>(() => {
    const config = useRuntimeConfig()
    const token = useCookie<string | null>('payload-token')

    const $payloadApi: $Fetch = $fetch.create({
        baseURL: `${config.public.payloadUrl}/api`,

        onRequest({ options }) {
            if (token.value) {
                options.headers = new Headers(options.headers)

                options.headers.set('Authorization', `JWT ${token.value}`)
            }
        },
        onResponseError({ response }) {
            if (response.status === 401) {
                // Handle global logout / token expiry here if needed
                token.value = null
                // navigateTo('/login')
            }
        },
    })

    return {
        provide: {
            payloadApi: $payloadApi,
        },
    }
})
*/
