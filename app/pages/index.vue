<script setup lang="ts">
import { usePages } from '../composables/usePages'

const { homepage, pending, error } = usePages()
</script>

<template>
    <main>
        <LayoutSection v-if="homepage?.heroTitle">
            <LayoutContainer>
                <h1 class="text-4xl font-bold">{{ homepage.heroTitle }}</h1>
                <p v-if="homepage.heroSubtitle" class="mt-4 text-lg text-muted">
                    {{ homepage.heroSubtitle }}
                </p>
            </LayoutContainer>
        </LayoutSection>

        <div v-else-if="pending">Loading homepage…</div>
        <div v-else-if="error">Unable to load the homepage.</div>

        <BlocksHomepageBlocks :blocks="homepage?.sections ?? []" />
    </main>
</template>
