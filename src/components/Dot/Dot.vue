<template>
    <div
        class="rounded-full"
        :class="[$attrs, width, height, customClass]"
    />
</template>

<script setup>
defineProps({
    width: {
        type: String,
        default: 'w-1.5'
    },
    height: {
        type: String,
        default: 'h-1.5'
    },
    customClass: {
        type: String,
        default: '',
    }
})
</script>
