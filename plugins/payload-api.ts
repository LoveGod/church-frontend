export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()
    const token = useCookie<string | null>('payload-token')

    const payloadApi = $fetch.create({
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
            payloadApi,
        },
    }
})
