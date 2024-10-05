<template>
    <div class="p-1.25 max-mob:px-4 max-mob:pt-0 max-mob:pb-4 grid gap-y-0.5 rounded-1.25 border max-mob:border-none border-gray-100 dark:border-blue-720">
        <div
            class="py-1.5 gap-x-2 flex items-center"
            :class="customClass"
            v-for="item in sortRulesTable"
            :key="item.key"
            @click="onSelectedItem(item)"
        >
            <div class="text-gray-200 dark:text-white">
                <component :is="item.icon()" class="w-3.5 h-3.5 max-mob:w-6 max-mob:h-6" />
            </div>

            <div class="text-xs font-medium max-mob:font-normal text-gray-370 dark:text-white select-none">
                {{ item.label }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, inject } from 'vue'

import { SORT_RULES_TABLE, SORT_RULES } from '@/constants/sortRules'
import { viewPorts } from '@/constants/viewPorts'

const props = defineProps({
    head: {
        type: Object,
        default: () => ({}),
    },
})

const emits = defineEmits(['onSelectedItem'])

const currentViewSize = inject('currentViewSize')

const isMobView = computed(() => viewPorts.mob >= currentViewSize.value)

const customClass = computed(() => {
    if (isMobView.value) {
        return [
            'py-1.5 border-b border-white-500 dark:border-gray-760',
        ]
    }

    return 'px-2.5 hover:bg-gray-80 dark:hover:bg-blue-770 rounded-1.25 cursor-pointer'
})

const sortRulesTable = computed(() => {
    if (props.head.hasOwnProperty('filterSettings')) {
        return SORT_RULES_TABLE
    }

    return SORT_RULES
})

function onSelectedItem(item) {
    emits('onSelectedItem', item)
}
</script>
