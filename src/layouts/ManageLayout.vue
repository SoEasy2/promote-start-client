<template>
    <div
        class="h-full pb-24 transition-all custom-scroll"
        :class="paddingLayout"
    >
        <div
            :class="[containerStyle]"
        >
            <div class="sticky left-0 w-fit mt-8.75 max-mob:mt-6 pb-2.5 text-xxxl max-mob:text-xl text-gray-370 whitespace-nowrap">
                {{ title }}
            </div>

            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import { computed, inject } from 'vue'

defineProps({
    title: {
        type: String,
        default: '',
    },
    containerStyle: {
        type: String,
        default: 'relative w-max min-w-full',
    },
})

const paddingLayout = computed(() => {

    return 'px-18'
})
</script>
