import { defineStore } from 'pinia'
import type { LoginResponse, User } from '../types/auth'
import { useCookie } from 'nuxt/app'
import { computed, ref } from 'vue'
import { usePayloadApi } from '../composables/usePayloadApi'

export const useAuthStore = defineStore('auth', () => {
    const token = useCookie<string | null>('payload-token', {
        maxAge: 60 * 60 * 24 * 7, // 1 week
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
    })

    const payloadApi = usePayloadApi()

    const user = ref<User | null>(null)

    const isAuthenticated = computed(() => {
        return !!token.value && !!user.value
    })

    async function login(email: string, password: string) {
        //const { $payloadApi } = useNuxtApp()
        try {
            const response = await payloadApi<LoginResponse>('/users/login', {
                method: 'POST',
                body: {
                    email,
                    password,
                },
            })

            /*const response = await $payloadApi<LoginResponse>('/users/login', {
                method: 'POST',
                body: {
                    email,
                    password,
                },
            })*/

            token.value = response.token
            user.value = response.user

            return response.user
        } catch (error) {
            console.error('Login failed', error)
            return null
        }
    }

    async function fetchCurrentUser() {
        if (!token.value) {
            user.value = null
            return null
        }

        try {
            //const { $payloadApi } = useNuxtApp()

            const response = await payloadApi<{
                user: User
            }>('/users/me')

            user.value = response.user

            return response.user
        } catch {
            token.value = null
            user.value = null

            return null
        }
    }

    async function logout() {
        token.value = null
        user.value = null

        //await navigateTo('/login')
    }

    return {
        user,
        token,
        isAuthenticated,
        login,
        logout,
        fetchCurrentUser,
    }
})
