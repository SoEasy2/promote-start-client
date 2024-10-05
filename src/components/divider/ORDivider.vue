<template>
    <div class="flex items-center">
        <CustomDivider
            v-if="isMobView"
            class="grow"
            color="border-black/5 dark:border-blue-720/40"
        />

        <div
            class="flex-0 pr-2 text-gray-280 text-xs font-medium select-none"
            :class="{ 'pl-2': isMobView }"
        >
            OR
        </div>

        <CustomDivider
            class="grow"
            color="border-black/5 dark:border-blue-720/40"
        />
    </div>
</template>

<script setup>
import { computed, inject } from 'vue'

import CustomDivider from '@/components/divider/CustomDivider.vue'

import { viewPorts } from '@/constants/viewPorts'

const currentViewSize = inject('currentViewSize')

const isMobView = computed(() => viewPorts.mob === currentViewSize.value)
</script>
