<template>
    <div
        class="bg-gray-80 dark:bg-blue-770 relative rounded-1.25 overflow-hidden"
        :class="[width, customStyle, height]"
    >
        <div class="skeleton-loader"></div>
    </div>
</template>

<script setup>

defineProps({
    width: {
        type: String,
        default: '',
    },
    height: {
        type: String,
        default: '',
    },
    customStyle: {
        type: String,
        default: '',
    },
})

</script>
