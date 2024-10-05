<template>
    <component
        v-for="(filter, index) of selectedFiltersLocal"
        :key="'string' + filter.key"
        :keysForFilterListEmpty="keysForFilterListEmpty"
        :keysForFilterStringEmpty="keysForFilterStringEmpty"
        :is="getFilterComponentByType(filter.type)"
        :autoOpen="checkAutoOpen(index)"
        :filter="filter"
        :showTimeout="showTimeout"
        :bodyFetch="bodyFetch"
        @updateFilter="updateFilter"
        @deleteFilter="deleteFilter"
    />

    <slot></slot>

    <AddFilterMenu
        v-if="localFilters.length && !hideAddMenu"
        :filters="localFilters"
        :autoOpenIndex="autoOpenIndex[headerType]"
        @selectFilter="selectFilter"
    />
</template>

<script setup>
import {
    computed, markRaw, ref, watch,
} from 'vue'

import AddFilterMenu from '@/components/table/tableMenu/AddFilterMenu.vue'
import StringFilterMenu from '@/components/table/tableMenu/StringFilterMenu.vue'
import NumberFilterMenu from '@/components/table/tableMenu/NumberFilterMenu.vue'
import ListFilterMenu from '@/components/table/tableMenu/ListFilterMenu.vue'
import BooleanFilterMenu from '@/components/table/tableMenu/BooleanFilterMenu.vue'
import SelectFilterMenu from '@/components/table/tableMenu/SelectFilterMenu.vue'

import { checkEqualsFilter } from '@/helpers/filters-sorting-header-table-helper'

import { FILTERS_TABLE } from '@/constants/filtersTable'
import { useSortFilterTableStore } from '@/store/sortFilterTableStore'

const props = defineProps({
    controlsParams: {
        type: Object,
        default: () => ({
            filters: [],
            sorting: [],
        }),
    },
    selectedFilters: {
        type: Array,
        default: () => [],
    },
    bodyFetch: {
        type: Object,
        default: () => ({}),
    },
    hideAddMenu: {
        type: Boolean,
        default: false,
    },
    keysForFilterListEmpty: {
        type: Array,
        default: () => [],
    },
    keysForFilterStringEmpty: {
        type: Array,
        default: () => [],
    },
    headerType: {
        type: String,
        default: '',
    },
})

const emits = defineEmits(['update:selectedFilters', 'deleteFilter'])

const sortFilterTableStore = useSortFilterTableStore()

const lookup = {
    [FILTERS_TABLE.string]: StringFilterMenu,
    [FILTERS_TABLE.string_with_empty]: StringFilterMenu,
    [FILTERS_TABLE.number]: NumberFilterMenu,
    [FILTERS_TABLE.number_with_empty]: NumberFilterMenu,
    [FILTERS_TABLE.list]: ListFilterMenu,
    [FILTERS_TABLE.list_with_empty]: ListFilterMenu,
    [FILTERS_TABLE.boolean]: BooleanFilterMenu,
    // [FILTERS_TABLE.date]: DateFilterMenu,
    [FILTERS_TABLE.select]: SelectFilterMenu,
    [FILTERS_TABLE.select_with_empty]: SelectFilterMenu,
}

const showTimeout = ref(150)

const isParameterSelected = ref(false)

function getFilterComponentByType(type) {
    return lookup.hasOwnProperty(type) ? markRaw(lookup[type]) : null
}

const localFilters = computed(() => props.controlsParams.filters.filter((f) => props.selectedFilters.every((sf) => sf.key !== f.key)))

const selectedFiltersLocal = computed({
    get() {
        return props.selectedFilters
    },
    set(filters) {
        emits('update:selectedFilters', filters)
    },
})

const autoOpenIndex = computed({
    get() {
        return sortFilterTableStore.indexOpenFilter
    },
    set(index) {
        sortFilterTableStore.changeIndexOpen(props.headerType, index)
    },
})

function selectFilter(filter) {
    showTimeout.value = 0
    autoOpenIndex.value[props.headerType] = selectedFiltersLocal.value.length

    isParameterSelected.value = filter.type === FILTERS_TABLE.parameters

    selectedFiltersLocal.value.push(filter)
}

function updateFilter(filter) {
    const index = selectedFiltersLocal.value.findIndex((f) => f.key === filter.key)

    if (index === -1) {
        return
    }

    if (!checkEqualsFilter(selectedFiltersLocal.value[index], filter)) {
        selectedFiltersLocal.value[index] = filter
    }
}

function deleteFilter(key) {
    const index = selectedFiltersLocal.value.findIndex((f) => f.key === key)

    if (index !== -1) {
        selectedFiltersLocal.value.splice(index, 1)
    }
}

function checkAutoOpen(index) {
    return index === autoOpenIndex.value[props.headerType]
}

let serverSortInterval = null

function setIntervalForSendFilter(newFilter) {
    if (isParameterSelected.value) {
        isParameterSelected.value = false
        return
    }

    if (selectedFiltersLocal.value.length) {
        clearInterval(serverSortInterval)

        serverSortInterval = setTimeout(() => {
            clearInterval(serverSortInterval)
            selectedFiltersLocal.value = newFilter
        }, 500)
    } else {
        clearInterval(serverSortInterval)
        selectedFiltersLocal.value = newFilter
    }
}

watch(selectedFiltersLocal, setIntervalForSendFilter, { deep: true })
</script>
