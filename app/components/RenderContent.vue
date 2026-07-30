<script lang="ts">
import { defineComponent, h, resolveComponent, type PropType, type VNodeChild } from 'vue'

const IS_BOLD = 1
const IS_ITALIC = 1 << 1
const IS_STRIKETHROUGH = 1 << 2
const IS_UNDERLINE = 1 << 3
const IS_CODE = 1 << 4
const IS_SUBSCRIPT = 1 << 5
const IS_SUPERSCRIPT = 1 << 6

interface ClassConfig {
    tag: string
    class: string
}

interface LexicalNode {
    type: string
    children?: LexicalNode[]
    text?: string
    format?: number | string | null
    tag?: string
    listType?: string
    fields?: {
        url?: string
        linkType?: string
        newTab?: boolean
        rel?: string
        sponsored?: boolean
        nofollow?: boolean
        doc?: {
            relationTo?: string
            value?: {
                slug?: string
            }
        }
    }
    value?: {
        url?: string
        alt?: string
        description?: string
        mimeType?: string
    }
}

interface LexicalContent {
    root?: LexicalNode
}

const getClassForTag = (tag: string, classes: ClassConfig[]) => {
    return classes.find((classConfig) => classConfig.tag === tag)?.class ?? ''
}

const getAlignmentClass = (node: LexicalNode, classes: ClassConfig[]) => {
    const baseClass = node.tag ? getClassForTag(node.tag, classes) : ''

    if (node.format === 'center') {
        return `${baseClass} text-center`.trim()
    }

    if (node.format === 'right') {
        return `${baseClass} text-right`.trim()
    }

    return baseClass
}

const withTextFormatting = (
    text: string,
    format: number | string | null | undefined,
    classes: ClassConfig[]
): VNodeChild => {
    if (typeof format !== 'number' || format === 0) {
        return text
    }

    let formattedText: VNodeChild = text

    if (format & IS_CODE) {
        formattedText = h('code', { class: getClassForTag('code', classes) }, formattedText)
    }

    if (format & IS_BOLD) {
        formattedText = h('strong', { class: getClassForTag('strong', classes) }, formattedText)
    }

    if (format & IS_ITALIC) {
        formattedText = h('em', { class: getClassForTag('em', classes) }, formattedText)
    }

    if (format & IS_STRIKETHROUGH) {
        formattedText = h('span', { class: 'line-through' }, formattedText)
    }

    if (format & IS_UNDERLINE) {
        formattedText = h('span', { class: 'underline' }, formattedText)
    }

    if (format & IS_SUBSCRIPT) {
        formattedText = h('sub', { class: getClassForTag('sub', classes) }, formattedText)
    }

    if (format & IS_SUPERSCRIPT) {
        formattedText = h('sup', { class: getClassForTag('sup', classes) }, formattedText)
    }

    return formattedText
}

const renderNodes = (nodes: LexicalNode[] | undefined, classes: ClassConfig[]) => {
    return nodes?.map((node) => renderNode(node, classes)).filter(Boolean) ?? []
}

const renderLink = (node: LexicalNode, children: VNodeChild[], classes: ClassConfig[]) => {
    const target = node.fields?.newTab ? '_blank' : undefined
    const rel = [
        node.fields?.rel,
        node.fields?.sponsored ? 'sponsored' : '',
        node.fields?.nofollow ? 'nofollow' : '',
    ]
        .filter(Boolean)
        .join(' ')

    if (node.fields?.linkType === 'custom') {
        return h(
            'a',
            {
                href: node.fields.url,
                target,
                rel: rel || undefined,
                class: getClassForTag('a', classes),
            },
            children
        )
    }

    const NuxtLink = resolveComponent('NuxtLink')
    const relationTo = node.fields?.doc?.relationTo
    const slug = node.fields?.doc?.value?.slug ?? node.fields?.url ?? ''
    const to = relationTo && slug ? `/${relationTo}/${slug}` : slug

    return h(NuxtLink, { to, class: getClassForTag('a', classes) }, () => children)
}

const renderUpload = (node: LexicalNode) => {
    if (!node.value?.url || !node.value.mimeType?.startsWith('image')) {
        return null
    }

    const NuxtImg = resolveComponent('NuxtImg')

    return h(NuxtImg, {
        src: node.value.url,
        alt: node.value.alt ?? node.value.description ?? '',
        class: 'my-8 w-full rounded object-cover',
    })
}

const renderNode = (node: LexicalNode, classes: ClassConfig[]): VNodeChild | null => {
    const children = renderNodes(node.children, classes)
    const alignmentClass = getAlignmentClass(node, classes)

    switch (node.type) {
        case 'root':
            return h('div', children)
        case 'paragraph':
            return h('p', { class: `${getClassForTag('p', classes)} ${alignmentClass}`.trim() }, children)
        case 'text':
            return withTextFormatting(node.text ?? '', node.format, classes)
        case 'linebreak':
            return h('br')
        case 'link':
            return renderLink(node, children, classes)
        case 'list': {
            const tag = node.listType === 'number' ? 'ol' : 'ul'
            return h(tag, { class: getClassForTag(tag, classes) }, children)
        }
        case 'listitem':
            return h('li', { class: getClassForTag('li', classes) }, children)
        case 'heading': {
            const tag = node.tag || 'h2'
            return h(tag, { class: getClassForTag(tag, classes) || alignmentClass }, children)
        }
        case 'quote':
            return h('blockquote', { class: getClassForTag('blockquote', classes) }, children)
        case 'upload':
            return renderUpload(node)
        default:
            return children.length > 0 ? h('div', { class: alignmentClass || undefined }, children) : null
    }
}

export default defineComponent({
    name: 'RenderContent',
    props: {
        content: {
            type: Object as PropType<LexicalContent>,
            required: true,
        },
        classConfig: {
            type: Array as PropType<ClassConfig[]>,
            default: () => [],
        },
    },
    setup(props) {
        return () => {
            if (!props.content.root) {
                return null
            }

            return renderNode(props.content.root, props.classConfig)
        }
    },
})
</script>
