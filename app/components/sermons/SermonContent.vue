<script setup lang="ts">
import type { Sermon } from '../../types/sermon'

defineProps<{
    content: Sermon['content']
}>()

const classConfig = [
    { tag: 'p', class: 'mb-5 leading-8 text-gray-800' },
    { tag: 'ul', class: 'mb-5 list-disc space-y-2 pl-6' },
    { tag: 'ol', class: 'mb-5 list-decimal space-y-2 pl-6' },
    { tag: 'li', class: 'leading-8 text-gray-800' },
    { tag: 'a', class: 'font-medium text-primary underline underline-offset-4' },
    { tag: 'strong', class: 'font-semibold text-gray-950' },
    { tag: 'em', class: 'italic' },
    {
        tag: 'code',
        class: 'rounded bg-gray-100 px-1.5 py-0.5 text-sm text-gray-900',
    },
]
</script>

<template>
    <article class="max-w-none text-base md:text-lg">
        <RenderContent :content="content" :class-config="classConfig" />
    </article>
</template>
