<template>
    <div
        class="transition-all"
        :class="[
            { 'absolute': !noAbsolute },
            message ? 'mt-2 -translate-y-0.5' : '-translate-y-1',
            position
        ]"
    >
        <div
            v-show="!!message"
            class="flex h-4"
        >
            <ErrorIcon class="min-w-4 text-red-700 dark:text-red" />

            <div class="text-red-700 dark:text-red whitespace-nowrap text-xs pl-2">
                {{ message }}
            </div>
        </div>
    </div>
</template>

<script setup>
import ErrorIcon from '@/components/icons/ErrorIcon.vue'

defineProps({
    message: {
        type: [String, Number],
        default: '',
    },
    position: {
        type: String,
        default: 'min-mob:-bottom-5.5 max-mob:-bottom-5',
    },
    noAbsolute: {
        type: Boolean,
        default: false,
    },
})
</script>
