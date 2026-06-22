<script setup lang="ts">
import type { Sermon } from '../../types/sermon'
defineProps<{
    sermon: Sermon
}>()
</script>

<template>
    <section class="relative">
        <NuxtImg
            v-if="sermon.featuredImage"
            :src="sermon.featuredImage.url"
            :alt="sermon.featuredImage.alt"
            class="h-[420px] w-full object-cover"
        />

        <div class="absolute inset-0 bg-black/50" />

        <div class="absolute inset-0 flex items-end">
            <UContainer class="pb-12 text-white">
                <div class="max-w-4xl">
                    <p
                        v-if="sermon.series"
                        class="mb-3 text-sm uppercase tracking-widest"
                    >
                        {{ sermon.series?.title }}
                    </p>

                    <h1 class="text-4xl md:text-6xl font-bold">
                        {{ sermon.title }}
                    </h1>

                    <div class="mt-4 flex flex-wrap gap-4 text-sm">
                        <span>
                            {{ sermon.speaker?.name }}
                        </span>

                        <span>
                            {{
                                new Date(
                                    sermon.publishedDate
                                ).toLocaleDateString()
                            }}
                        </span>
                    </div>
                </div>
            </UContainer>
        </div>
    </section>
</template>
