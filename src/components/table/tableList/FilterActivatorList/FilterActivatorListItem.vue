<template>
    <div class="pr-1.5 gap-x-1 flex items-center text-gray-370 dark:text-white text-xs select-none truncate">
        {{ item.label }}:

        <div
            v-if="getFilterPreview"
            class="text-purple"
        >
            {{ rule.prefix }}
        </div>

        <template v-if="!rule.onlyPrefix">
            <div class="text-purple truncate">
                {{ getFilterPreview }}
            </div>
        </template>
    </div>
</template>

<script setup>
import { computed } from 'vue'

import { FILTERS_TABLE } from '@/constants/filtersTable'

const props = defineProps({
    item: {
        type: Object,
        default: () => ({}),
    },
})


const rule = computed(() => {
    const { rule = {} } = props.item
    return rule
})

const getFilterPreview = computed(() => {
    const { value = '', type } = props.item

    switch (type) {
    case FILTERS_TABLE.parameters:
    case FILTERS_TABLE.caller_profile:
        return ''
    case FILTERS_TABLE.boolean:
        return getPreviewBoolean(props.item)
    case FILTERS_TABLE.list:
    case FILTERS_TABLE.list_with_empty:
        return getPreviewList(props.item)
    case FILTERS_TABLE.select:
    case FILTERS_TABLE.select_with_empty:
        return getSelect(value)
    default:
        return value || ''
    }
})

function getPreviewBoolean({ values, value }) {
    if (value) {
        const labels = value.map((v) => values.find((el) => el.value === v).label)
        return labels.join(', ')
    }
}

function getPreviewList({ values, value }) {
    if (value) {
        const labels = value.map((v) => values.find((el) => el.id === v).name)
        return labels.join(', ')
    }
}

function getSelect(value) {
    if (value) {
        return value.name
    }
}
</script>
