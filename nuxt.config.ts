// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    css: ['~/assets/css/main.css'],
    devServer: {
        host: '0.0.0.0', // Required for DDEV networking
        port: 3000,
    },
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
    modules: ['@nuxtjs/tailwindcss', '@nuxt/eslint'],
})
