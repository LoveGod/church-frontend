<script setup lang="ts">
import type { Component } from 'vue'
import type { HomepageBlock } from '../../composables/usePages'
import SermonFeedBlock from './SermonFeedBlock.vue'

defineProps<{
    blocks: HomepageBlock[]
}>()

const blockComponents: Record<string, Component> = {
    'sermon-feed': SermonFeedBlock,
}
</script>

<template>
    <component
        :is="blockComponents[block.blockType]"
        v-for="block in blocks"
        :key="block.id ?? `${block.blockType}-${blocks.indexOf(block)}`"
        :block="block"
    />
</template>
