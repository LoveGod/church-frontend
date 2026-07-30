<script setup lang="ts">
import type { HomepageSermonFeedBlock } from '../../composables/usePages'

defineProps<{
    block: HomepageSermonFeedBlock
}>()
</script>

<template>
    <LayoutSection>
        <LayoutContainer>
            <div v-if="block.heading || block.description" class="mb-8 max-w-2xl">
                <h2 v-if="block.heading" class="text-3xl font-bold">
                    {{ block.heading }}
                </h2>
                <p v-if="block.description" class="mt-3 text-muted">
                    {{ block.description }}
                </p>
            </div>

            <div v-if="block.sermons?.length" class="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                <SermonsSermonCard
                    v-for="sermon in block.sermons"
                    :key="sermon.id"
                    :sermon="sermon"
                />
            </div>

            <UButton
                v-if="block.cta?.label && block.cta.url"
                :to="block.cta.url"
                class="mt-8"
            >
                {{ block.cta.label }}
            </UButton>
        </LayoutContainer>
    </LayoutSection>
</template>
