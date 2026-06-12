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
            payloadUrl: process.env.PAYLOAD_URL || 'http://localhost:3000',
        },
    },
    modules: ['@nuxtjs/tailwindcss', '@nuxt/eslint', '@pinia/nuxt'],
}

const nuxtConfig: NuxtConfig = defineNuxtConfig(config)

export default nuxtConfig
