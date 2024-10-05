<template>
    <div
        class="animate-spin"
        :class="mini ? 'loader-line-mask-mini': 'loader-line-mask'"
    >
        <div :class="mini ? 'loader-line-mini' : 'loader-line'"/>
    </div>
</template>

<script setup>

defineProps({
    mini: {
        type: Boolean,
        default: false,
    },
})
</script>
