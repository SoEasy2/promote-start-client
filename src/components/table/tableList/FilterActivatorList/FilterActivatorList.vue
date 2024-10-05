<template>
    <div class="px-4 gap-3 flex flex-wrap">
        <div
            class="px-2 max-w-60 h-8 flex items-center rounded-custom border border-gray-100 dark:border-blue-720"
            v-for="item in items"
            :key="item.label"
            @click="openFilter(item)"
        >
            <CleanIcon
                class="mr-2 min-w-4 min-h-4 text-gray-200 dark:text-blue-770"
                @click.stop="onRemove(item)"
            />

            <FilterActivatorListItem :item="item"/>

            <div class="w-3">
                <ArrowSelect class="text-gray-200 dark:text-white"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import ArrowSelect from '@/components/icons/ArrowSelect.vue'
import CleanIcon from '@/components/icons/CleanIcon.vue'
import FilterActivatorListItem from '@/components/table/tableList/FilterActivatorList/FilterActivatorListItem.vue'

defineProps({
    items: {
        type: Array,
        default: () => ([]),
    },
})

const emits = defineEmits(['openFilter', 'removeFilter'])

function onRemove(item) {
    emits('removeFilter', item)
}

function openFilter(item) {
    emits('openFilter', item)
}
</script>
