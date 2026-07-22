<script setup lang="ts">
import type { Sermon } from '../../types/sermon'
import { useRuntimeConfig } from 'nuxt/app'

interface Props {
    sermon: Sermon
}

const config = useRuntimeConfig()

defineProps<Props>()
</script>

<template>
    <UCard
        :ui="{
            body: 'p-0',
        }"
    >
        <NuxtLink :to="`/sermons/${sermon.slug}`">
            <NuxtImg
                v-if="sermon.featuredImage"
                :src="`${config.public.payloadUrl}${sermon.featuredImage.url}`"
                :alt="sermon.featuredImage.alt"
                class="h-56 w-full object-cover"
            />

            <div class="p-5 space-y-3">
                <h3 class="font-semibold text-lg">
                    {{ sermon.title }}
                </h3>

                <p
                    v-if="sermon.excerpt"
                    class="text-sm text-muted line-clamp-3"
                >
                    {{ sermon.excerpt }}
                </p>

                <div class="flex items-center gap-2 text-sm text-muted">
                    <UIcon name="i-lucide-user" />
                    {{ sermon.speaker?.name }}
                </div>

                <div class="flex items-center gap-2 text-sm text-muted">
                    <UIcon name="i-lucide-calendar" />
                    {{ new Date(sermon.publishedDate).toLocaleDateString() }}
                </div>

                <div v-if="sermon.topics?.length" class="flex flex-wrap gap-2">
                    <UBadge
                        v-for="topic in sermon.topics"
                        :key="topic.id"
                        color="neutral"
                        variant="soft"
                    >
                        {{ topic.title }}
                    </UBadge>
                </div>
            </div>
        </NuxtLink>
    </UCard>
</template>
