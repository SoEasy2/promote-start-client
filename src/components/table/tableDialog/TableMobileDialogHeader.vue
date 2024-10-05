<template>
    <div class="p-4 flex items-center justify-between border-b-1 border-gray-100 dark:border-blue-720">
        <div
            class="gap-x-1 flex items-center text-purple"
            @click="goBack"
        >
            <ArrowRightLongIcon class="rotate-180"/>

            <div class="text-xs font-medium">
                {{ title }}
            </div>
        </div>

        <slot name="action">
            <CloseIconMini
                class="text-gray-200"
                @click="closeDialog"
            />
        </slot>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

import ArrowRightLongIcon from '@/components/icons/arrow/ArrowRightLongIcon.vue'
import CloseIconMini from '@/components/icons/CloseIconMini.vue'

import { splitString } from '@/helpers/app-helper'

const props = defineProps({
    isFirstStep: {
        type: Boolean,
        default: false,
    },
})

const emits = defineEmits(['closeDialog', 'goBack'])

const route = useRoute()

const title = computed(() => {
    if (props.isFirstStep) {
        const title = splitString(route.name)
        return `Back to ${title}`
    }

    return 'Back'
})

function closeDialog() {
    emits('closeDialog')
}

function goBack() {
    if (props.isFirstStep) {
        closeDialog()
    } else {
        emits('goBack')
    }
}
</script>
