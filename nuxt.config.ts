// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  typescript: {
    // customize tsconfig.app.json
    tsConfig: {
     "compilerOptions": {
        "strict": true,
        "noImplicitAny": true,
        "strictNullChecks": true,
        "noUncheckedIndexedAccess": true,
        "moduleResolution": "bundler",
        "types": [
         "node"
        ]
      }
    }
  },
  modules: [
    '@nuxtjs/tailwindcss',
  ],
})
