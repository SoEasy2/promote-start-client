<template>
    <component
        :is="getComponent"
        :filter="selectedItem"
        :bodyFetch="bodyFetch"
        :keysForFilterListEmpty="keysForFilterListEmpty"
        :keysForFilterStringEmpty="keysForFilterStringEmpty"
        @deleteFilter="deleteFilter"
        @updateFilter="updateFilter"
    />
</template>

<script setup>
import {
    computed, markRaw, onMounted, watch,
} from 'vue'

import BooleanDropdown from '@/components/table/dropdowns/BooleanDropdown.vue'
import StringDropdown from '@/components/table/dropdowns/StringDropdown.vue'
import ListDropdown from '@/components/table/dropdowns/ListDropdown.vue'
import NumberDropdown from '@/components/table/dropdowns/NumberDropdown.vue'
import SelectDropdown from '@/components/table/dropdowns/SelectDropdown.vue'

import { FILTERS_TABLE } from '@/constants/filtersTable'

const selectedItem = defineModel('selectedItem', { type: Object, default: () => ({}) })

const props = defineProps({
    selectedFilters: {
        type: Array,
        default: () => [],
    },
    bodyFetch: {
        type: Object,
        default: () => ({}),
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

const emits = defineEmits(['update:selectedFilters', 'selectedFilters', 'goBack'])

const lookup = {
    [FILTERS_TABLE.string]: StringDropdown,
    [FILTERS_TABLE.string_with_empty]: StringDropdown,
    [FILTERS_TABLE.number]: NumberDropdown,
    [FILTERS_TABLE.number_with_empty]: NumberDropdown,
    [FILTERS_TABLE.list]: ListDropdown,
    [FILTERS_TABLE.list_with_empty]: ListDropdown,
    [FILTERS_TABLE.boolean]: BooleanDropdown,
    [FILTERS_TABLE.select]: SelectDropdown,
    [FILTERS_TABLE.select_with_empty]: SelectDropdown,
}

const getComponent = computed(() => {
    const { type } = selectedItem.value
    return lookup.hasOwnProperty(type) ? markRaw(lookup[type]) : null
})

function deleteFilter(key) {
    const filters = props.selectedFilters.filter((f) => f.key !== key)

    emits('update:selectedFilters', filters)
    emits('goBack')
}

function updateFilter({ rule = {}, value }) {
    selectedItem.value.rule = rule
    selectedItem.value.value = value
}

let serverSortInterval = null

function addSelectedFilterFromTable() {
    const { key, fromTable } = selectedItem.value

    if (!fromTable) {
        return
    }

    selectedItem.value = props.selectedFilters.find((item) => item.key === key)
}

function setIntervalForSendFilter() {
    clearInterval(serverSortInterval)

    serverSortInterval = setTimeout(() => {
        clearInterval(serverSortInterval)
        emits('update:selectedFilters', props.selectedFilters)
    }, 500)
}

watch(selectedItem, setIntervalForSendFilter, { deep: true })

onMounted(addSelectedFilterFromTable)
</script>
