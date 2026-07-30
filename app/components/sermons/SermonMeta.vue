<script setup lang="ts">
import type { Sermon } from '../../types/sermon'
defineProps<{
    sermon: Sermon
}>()
</script>

<template>
    <UCard>
        <template #header> Details </template>

        <div class="space-y-5">
            <div>
                <p class="font-medium">Speaker</p>

                <p class="text-muted">
                    {{ sermon.speaker?.name }}
                </p>
            </div>

            <div v-if="sermon.series">
                <p class="font-medium">Series</p>

                <NuxtLink :to="`/series/${sermon.series?.slug}`">
                    {{ sermon.series?.title }}
                </NuxtLink>
            </div>

            <div v-if="sermon.topics?.length" class="flex flex-wrap gap-2">
                <UBadge
                    v-for="topic in sermon.topics"
                    :key="topic.id"
                    color="primary"
                    variant="soft"
                >
                    {{ topic.title }}
                </UBadge>
            </div>

            <div v-if="sermon.tags?.length" class="flex flex-wrap gap-2">
                <UBadge
                    v-for="tag in sermon.tags"
                    :key="tag.id"
                    color="neutral"
                    variant="outline"
                >
                    {{ tag.title }}
                </UBadge>
            </div>
        </div>
    </UCard>
</template>
