import { usePayloadApi } from './usePayloadApi'
import type { SermonResponse } from '../types/sermon'
import { useAsyncData } from '#app'

export const useSermons = () => {
    //const config = useRuntimeConfig()

    const payloadApi = usePayloadApi()

    const getSermons = async (params?: Record<string, unknown>) => {
        try {
            const sermons = await payloadApi<SermonResponse>('/sermons', params)
            return sermons || []
        } catch (err) {
            console.error('Error fetching sermons:', err)
            return []
        }
    }

    const findBySlug = async (slug: string) => {
        const params = {
            query: {
                where: {
                    slug: {
                        equals: slug,
                    },
                },
                depth: 2,
                limit: 1,
            },
        }

        try {
            const sermon = await payloadApi<SermonResponse>('/sermons', params)
            return sermon?.docs?.[0] || null
        } catch (err) {
            console.error('Error fetching sermon by slug:', err)
            return null
        }
    }

    const {
        data: sermons,
        pending,
        error,
    } = useAsyncData('sermons', getSermons)

    return {
        findBySlug,
        getSermons,
        sermons,
        pending,
        error,
    }
}

/* Example usage in a page or component:
<script setup lang="ts">
const { sermons, pending, error, findBySlug, getSermons } = useSermons()
</script>
*/
