<template>
    <SortMenu
        v-if="!hideSort"
        v-model:menu="sortingMenu"
        :controlsParams="controlsParams"
        @addSort="addSort"
    >
        <SortIcon
            class="transition-colors cursor-pointer"
            :class="sortFilterTableStore.enableSorting || sortingMenu || selectedSorting.length ? 'text-purple' : 'text-gray-200 hover:text-purple'"
            @click="sortingMenuHandler"
        />
    </SortMenu>

    <FilterIcon
        v-if="!hideFilter"
        class="transition-colors cursor-pointer"
        :class="sortFilterTableStore.checkFilter(headerType) || selectedFilters.length ? 'text-purple' : 'text-gray-200 hover:text-purple'"
        @click="onFilter"
    />

    <UpdateIcon
        v-if="!hideReload"
        class="text-gray-200 hover:text-purple transition-colors cursor-pointer"
        @click="onReload"
    />

    <SettingsTableMenu
        v-if="!hideSettings"
        v-model:menu="settingsMenu"
        :headerType="headerType"
    />
</template>

<script setup>
import { ref } from 'vue'

import SettingsTableMenu from '@/components/table/tableMenu/SettingsTableMenu.vue'
import SortMenu from '@/components/table/tableMenu/sortMenu.vue'
import FilterIcon from '@/components/icons/filterTable/FilterIcon.vue'
import UpdateIcon from '@/components/icons/filterTable/UpdateIcon.vue'
import SortIcon from '@/components/icons/filterTable/SortIcon.vue'

import { useSortFilterTableStore } from '@/store/sortFilterTableStore'

const props = defineProps({
    hideSort: {
        type: Boolean,
        default: false,
    },
    hideFilter: {
        type: Boolean,
        default: false,
    },
    hideReload: {
        type: Boolean,
        default: false,
    },
    hideSettings: {
        type: Boolean,
        default: false,
    },
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
})

const emits = defineEmits(['onSelectedSorting', 'onReload'])

const sortFilterTableStore = useSortFilterTableStore()

const sortingMenu = ref(false)
const settingsMenu = ref(false)

function sortingMenuHandler() {
    if (props.selectedSorting.length) {
        openCloseSort()
    } else {
        sortingMenu.value = !sortingMenu.value
    }

    sortFilterTableStore.openCloseTableSortMenu(true)
}

function addSort(item) {
    sortingMenu.value = false
    emits('onSelectedSorting', item)
    openCloseSort()
}

function openCloseSort() {
    sortFilterTableStore.openCloseSorting(!sortFilterTableStore.enableSorting)
}

function onFilter() {
    sortFilterTableStore.changeIndexOpen(props.headerType, -1)
    sortFilterTableStore.openCloseFilter(props.headerType)
}

function onReload() {
    emits('onReload')
}
</script>
