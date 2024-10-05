<template>
    <div class="gap-y-3 grid">
        <div
            v-for="sort in SORT_RULES"
            :key="sort.key"
            @click="onChange(sort)"
        >
            <div class="py-1.5 flex items-center justify-between">
                <div class="text-xs text-gray-280 dark:text-white select-none">
                    {{ sort.label }}
                </div>

                <OkLongIcon
                    v-if="isActive(sort)"
                    class="text-gray-200"
                />
            </div>

            <CustomDivider class="w-full" color="border-white-500 dark:border-gray-760"/>
        </div>
    </div>
</template>

<script setup>
import CustomDivider from '@/components/divider/CustomDivider.vue'
import OkLongIcon from '@/components/icons/OkLongIcon.vue'

import { SORT_RULES } from '@/constants/sortRules'

const props = defineProps({
    item: {
        type: Object,
        default: () => ({}),
    },
})

const emits = defineEmits(['onChange'])

function isActive({ key }) {
    const { value = {} } = props.item
    return key === value.key
}

function onChange(sort) {
    emits('onChange', sort)
}
</script>
