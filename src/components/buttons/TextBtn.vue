<template>
    <div
        class="flex items-center justify-center text-xs whitespace-nowrap select-none transition-colors"
        :class="[
            loading ? 'cursor-wait' : 'cursor-pointer',
            padding,
            text
        ]"
    >
        <slot name="default"></slot>
    </div>
</template>

<script setup>

defineProps({
    loading: {
        type: Boolean,
        default: false,
    },
    padding: {
        type: [String, Boolean],
        default: 'py-1 px-5',
    },
    text: {
        type: String,
        default: 'text-gray-370 dark:text-white hover:text-purple dark:hover:text-purple',
    },
    height: {
        type: String,
        default: 'h-9.5',
    },
})
</script>
