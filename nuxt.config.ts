// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
import type { NuxtConfig } from 'nuxt/schema'

const config: NuxtConfig = {
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    css: ['~/assets/css/main.css'],
    vite: {
        server: {
            allowedHosts: ['.ddev.site'], // Allow DDEV hostnames
        },
    },
    typescript: {
        // customize tsconfig.app.json
        strict: true,
        typeCheck: true,
        tsConfig: {
            compilerOptions: {
                strict: true,
                noImplicitAny: true,
                strictNullChecks: true,
                noUncheckedIndexedAccess: true,
                moduleResolution: 'bundler',
                types: ['node'],
            },
        },
    },
    runtimeConfig: {
        public: {
            payloadUrl: process.env.PAYLOAD_URL || 'http://localhost:3001',
            payloadApiKey: process.env.PAYLOAD_API_KEY,
        },
    },
    modules: ['@nuxt/eslint', '@pinia/nuxt', '@nuxt/ui', '@nuxt/image'],
    /*image: {
        provider: 'twicpics',
        twicpics: {
            baseURL: 'http://localhost:3001/',
        },
    },*/
}

const nuxtConfig: NuxtConfig = defineNuxtConfig(config)

export default nuxtConfig
