import { useAsyncData } from '#app'
import type { Ref } from 'vue'
import { usePayloadApi } from './usePayloadApi'
import { useSermons, type SermonFeedBlock } from './useSermons'
import type { Sermon } from '../types/sermon'

export interface HomepageSermonFeedBlock extends SermonFeedBlock {
    blockType: 'sermon-feed'
    id?: string | null
    heading?: string | null
    description?: string | null
    cta?: {
        label?: string | null
        url?: string | null
    } | null
    sermons?: Sermon[]
}

export interface HomepageBlock {
    blockType: string
    id?: string | null
    [key: string]: unknown
}

export interface HomepageLayout {
    id: string
    heroTitle: string
    heroSubtitle?: string | null
    sections?: HomepageBlock[] | null
}

export interface PreparedHomepageLayout extends Omit<HomepageLayout, 'sections'> {
    sections: HomepageBlock[]
}

interface UsePagesResult {
    getHomepageLayout: () => Promise<PreparedHomepageLayout | null>
    homepage: Ref<PreparedHomepageLayout | null | undefined>
    pending: Ref<boolean>
    error: Ref<Error | undefined>
    refresh: () => Promise<void>
}

export const usePages = (): UsePagesResult => {
    const payloadApi = usePayloadApi()
    const { getSermonFeedData } = useSermons()

    const prepareBlock = async (block: HomepageBlock): Promise<HomepageBlock> => {
        if (block.blockType !== 'sermon-feed') {
            return block
        }

        const sermonFeed = block as HomepageSermonFeedBlock
        const response = await getSermonFeedData(sermonFeed)

        return {
            ...sermonFeed,
            sermons: Array.isArray(response) ? [] : response.docs,
        }
    }

    const getHomepageLayout = async (): Promise<PreparedHomepageLayout | null> => {
        try {
            const homepage = await payloadApi<HomepageLayout>(
                '/globals/homepage-layout',
                {
                    query: {
                        depth: 2,
                        draft: false,
                        locale: 'en',
                        trash: false,
                    },
                }
            )

            return {
                ...homepage,
                sections: await Promise.all(
                    (homepage.sections ?? []).map(prepareBlock)
                ),
            }
        } catch (err) {
            console.error('Error fetching homepage layout:', err)
            return null
        }
    }

    const { data: homepage, pending, error, refresh } = useAsyncData(
        'homepage-layout',
        getHomepageLayout
    )

    return {
        getHomepageLayout,
        homepage,
        pending,
        error,
        refresh,
    }
}
