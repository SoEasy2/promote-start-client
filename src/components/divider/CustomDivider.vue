<template>
    <div>
        <div
            class="w-full border-t"
            :class="classes"
        ></div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    color: {
        type: String,
        default: 'border-gray-100 dark:border-blue-720',
    },
})

const classes = computed(() => `${props.color}`)
</script>
