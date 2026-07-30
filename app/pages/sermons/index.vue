<script setup lang="ts">
//import { useAuthStore } from '../../stores/auth'
import { usePayloadApi } from '../../composables/usePayloadApi'
import type { SermonResponse } from '../../types/sermon'
import { useRoute, useLazyAsyncData } from '#app'
import { ref, computed } from 'vue'
import SermonCard from '../../components/sermons/SermonCard.vue'

const route = useRoute()
const search = ref('')

const selectedSpeaker = ref('')
const selectedSeries = ref('')

const payloadApi = usePayloadApi()

/*const authStore = useAuthStore()
const user = await authStore.login('amou32@yahoo.fr', 'Xwy7n7i915!w')
console.log(user)*/

const filters = computed(() => ({
    page: route.query.page ?? 1,
    search: search.value,
    speaker: selectedSpeaker.value,
    series: selectedSeries.value,
}))

const {
    pending,
    error,
    status,
    data: sermons,
} = await useLazyAsyncData(
    'sermons',
    () =>
        payloadApi<SermonResponse>('/sermons', {
            params: filters.value,
        }),
    {
        watch: [filters],
    }
)
//const sermons = await payloadApi('/sermons')
console.log(sermons)
//console.log(pending)
</script>

<template>
    <UContainer class="py-16">
        <div class="max-w-2xl mb-10">
            <h1 class="text-4xl font-bold mb-4">Sermons</h1>

            <UInput
                v-model="search"
                icon="i-lucide-search"
                placeholder="Search sermons..."
            />
        </div>

        <div v-if="pending" class="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            <USkeleton v-for="i in 6" :key="i" class="h-96" />
        </div>
        <div v-if="status === 'pending'">Loading...</div>
        <div v-else-if="status === 'error'">
            Error loading sermons. {{ error?.message || 'Unknown error' }}
        </div>

        <div v-else class="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            <SermonCard
                v-for="sermon in sermons?.docs"
                :key="sermon.id"
                :sermon="sermon"
            />
        </div>

        <div class="mt-12 flex justify-center">
            <UPagination
                :page="sermons?.page ?? 1"
                :total="sermons?.totalDocs ?? 0"
                :items-per-page="10"
            />
        </div>
    </UContainer>
</template>
