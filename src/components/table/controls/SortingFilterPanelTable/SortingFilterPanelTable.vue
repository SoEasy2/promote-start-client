<template>
    <div
        class="relative transition-all flex border-gray-100 dark:border-blue-720"
        :class="visiblePanel ? 'min-h-10 border-t mt-1.5 pt-3' : 'min-h-0'"
    >
        <div
            v-if="visiblePanel"
            class="w-full flex items-center justify-between"
        >
            <div class="flex items-center space-x-3">
                <TableSorting
                    v-if="sortFilterTableStore.enableSorting"
                    :controlsParams="controlsParams"
                    :selectedSorting="selectedSorting"
                    @onSelectedSorting="onSelectedSorting"
                />

                <div
                    v-if="visibleDivider"
                    class="w-1px h-7.5 bg-gray-100 dark:bg-gray-700"
                />

                <TableFilters
                    v-if="enabledFilter"
                    :controlsParams="controlsParams"
                    :selectedFilters="selectedFilters"
                    :keysForFilterListEmpty="keysForFilterListEmpty"
                    :keysForFilterStringEmpty="keysForFilterStringEmpty"
                    :headerType="headerType"
                    @update:selectedFilters="onSelectedFilters"
                />

            </div>

            <div
                class="ml-3 px-2 py-1.5 text-gray-200 dark:text-white hover:text-purple dark:hover:text-purple text-xs border border-gray-100 dark:border-blue-720 rounded-custom cursor-pointer"
                @click="clearSortFilter"
            >
                Clear all
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

import TableFilters from '@/components/table/controls/SortingFilterPanelTable/TableFilters.vue'
import TableSorting from '@/components/table/controls/SortingFilterPanelTable/TableSorting.vue'

import { useSortFilterTableStore } from '@/store/sortFilterTableStore'

const props = defineProps({
    headerType: {
        type: String,
        default: '',
    },
    selectedSorting: {
        type: Array,
        default: () => [],
    },
    selectedFilters: {
        type: Array,
        default: () => [],
    },
    controlsParams: {
        type: Object,
        default: () => ({
            filters: [],
            statuses: [],
            sorting: [],
        }),
    },
    keysForFilterListEmpty: {
        type: Array,
        default: () => [],
    },
    keysForFilterStringEmpty: {
        type: Array,
        default: () => [],
    },
})

const emits = defineEmits(['onSelectedSorting', 'onSelectedFilters', 'clearSortFilter'])

const sortFilterTableStore = useSortFilterTableStore()

const enabledFilter = computed(() => sortFilterTableStore.checkFilter(props.headerType))

const visiblePanel = computed(() => enabledFilter.value || sortFilterTableStore.enableSorting)

const visibleDivider = computed(() => enabledFilter.value && sortFilterTableStore.enableSorting)

function onSelectedSorting(payload, type) {
    emits('onSelectedSorting', payload, type)
}

function onSelectedFilters(filters) {
    emits('onSelectedFilters', filters)
}

function clearSortFilter() {
    sortFilterTableStore.openCloseFilter(props.headerType)
    sortFilterTableStore.openCloseSorting(false)
    emits('clearSortFilter')
}

</script>
