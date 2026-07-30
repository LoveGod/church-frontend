import { usePayloadApi } from './usePayloadApi'
import type { SermonResponse } from '../types/sermon'
import { useAsyncData } from '#app'

type SermonFeedMode = 'recent' | 'featured' | 'series' | 'speaker' | 'topic'

type SermonFeedRelationship = string | { id: string } | null | undefined

export interface SermonFeedBlock {
    mode?: SermonFeedMode | null
    limit?: number | null
    series?: SermonFeedRelationship
    speaker?: SermonFeedRelationship
    topic?: SermonFeedRelationship
}

const getRelationshipId = (relationship: SermonFeedRelationship) =>
    typeof relationship === 'string' ? relationship : relationship?.id

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

    const getRecentSermons = async (limit = 6) => {
        const params = {
            query: {
                where: {
                    _status: {
                        equals: 'published',
                    },
                },
                sort: '-publishedDate',
                limit,
                depth: 2,
            },
        }

        try {
            const recentSermons = await payloadApi<SermonResponse>(
                '/sermons',
                params
            )
            return recentSermons || []
        } catch (err) {
            console.error('Error fetching recent sermons:', err)
            return []
        }
    }

    const getSermonFeedData = async (block: SermonFeedBlock) => {
        const mode = block.mode ?? 'recent'
        const limit = block.limit ?? 6
        const where: Record<string, unknown> = {
            _status: {
                equals: 'published',
            },
        }

        const relationshipId =
            mode === 'series'
                ? getRelationshipId(block.series)
                : mode === 'speaker'
                  ? getRelationshipId(block.speaker)
                  : mode === 'topic'
                    ? getRelationshipId(block.topic)
                    : undefined

        if (mode === 'series' || mode === 'speaker' || mode === 'topic') {
            if (!relationshipId) {
                console.warn(`Sermon feed mode "${mode}" requires a selection.`)
                return []
            }

            where[mode === 'topic' ? 'topics' : mode] = {
                [mode === 'topic' ? 'contains' : 'equals']: relationshipId,
            }
        }

        // The CMS has no separate featured flag; a sermon is featured when it
        // has a featured image.
        if (mode === 'featured') {
            where.featuredImage = {
                exists: true,
            }
        }

        try {
            return await payloadApi<SermonResponse>('/sermons', {
                query: {
                    where,
                    sort: '-publishedDate',
                    limit,
                    depth: 2,
                },
            })
        } catch (err) {
            console.error('Error fetching sermon feed data:', err)
            return []
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
        getRecentSermons,
        getSermonFeedData,
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
