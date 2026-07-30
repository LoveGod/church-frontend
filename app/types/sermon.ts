export interface Sermon {
    id: string
    title: string
    slug: string
    excerpt?: string
    publishedDate: string

    featuredImage?: {
        url: string
        alt?: string
        thumbnailURL?: string
    }

    speaker?: {
        id: string
        name: string
        slug: string
    }

    series?: {
        id: string
        title: string
        slug: string
    }

    topics?: Array<{
        id: string
        title: string
        slug: string
    }>

    tags?: Array<{
        id: string
        title: string
        slug: string
    }>

    content: {
        root: {
            children: ContentNode[]
            direction: null | string
            format: string
            indent: number
            type: string
            version: number
        }
    }
}

interface ChildContent {
    detail: number
    format: number
    mode: string
    style: string
    text: string
    type: string
    version: number
}

interface ContentNode {
    children: ChildContent[]
    direction: null | string
    format: string
    indent: number
    type: string
    version: number
    textFormat?: number
    textStyle?: string
}

export interface SermonResponse {
    docs: Sermon[]
    totalDocs: number
    totalPages: number
    page: number
    hasNextPage: boolean
}
