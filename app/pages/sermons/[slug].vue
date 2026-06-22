<script setup lang="ts">
import { useSermons } from '../../composables/useSermons'
import SermonHero from '../../components/sermons/SermonHero.vue'
//import SermonMediaPlayer from '../../components/sermons/SermonMediaPlayer.vue'
import SermonContent from '../../components/sermons/SermonContent.vue'
import SermonMeta from '../../components/sermons/SermonMeta.vue'
//import SermonSeriesSection from '../../components/sermons/SermonSeriesSection.vue'
//import RelatedSermons from '../../components/sermons/RelatedSermons.vue'
import { useRoute } from 'vue-router'
const { findBySlug } = useSermons()
const route = useRoute()
const sermon = await findBySlug(route.params.slug as string)
</script>

<template>
    <div v-if="sermon">
        <SermonHero :sermon="sermon" />

        <UContainer class="py-10">
            <div class="grid gap-12 lg:grid-cols-[1fr_320px]">
                <main class="space-y-10">
                    <!-- <SermonMediaPlayer :sermon="sermon" /> -->

                    <SermonContent :content="sermon.content" />
                </main>

                <aside class="space-y-6">
                    <SermonMeta :sermon="sermon" />
                </aside>
            </div>

            <SermonSeriesSection
                v-if="sermon.series"
                :series-id="sermon.series.id"
                :current-id="sermon.id"
            />

            <RelatedSermons :topics="sermon.topics" :current-id="sermon.id" />
        </UContainer>
    </div>
</template>
