declare module '#app' {
    interface NuxtApp {
        $payloadApi: typeof $fetch
    }
}

export {}
