<template>
    <div class="pt-4 pb-8 gap-y-5 grid custom-scroll-y">
        <div class="px-4">
            <InputSearch
                v-model:searchValue="searchValue"
                customClass="h-9 px-3 border border-gray-100 dark:border-blue-720 rounded-custom"
                placeholder="Search by Filters"
            />
        </div>

        <MobileList
            class="px-4"
            :items="localItems"
            @onSelectItem="onSelectItem"
        />
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'

import InputSearch from '@/components/inputs/InputSearch.vue'
import MobileList from '@/components/table/tableList/MobileList.vue'

import { localSearch } from '@/helpers/app-helper'
import { FILTER_RULES } from '@/constants/filterRules'
import { VIEWS_TABLE_MOBILE_DIALOG } from '@/constants/viewsTableMobileDialog'

const props = defineProps({
    selectedFilters: {
        type: Array,
        default: () => [],
    },
    controlsParams: {
        type: Object,
        default: () => ({
            filters: [],
            sorting: [],
        }),
    },
})

const emits = defineEmits(['goToNextView', 'update:selectedFilters', 'update:selectedItem'])

const searchValue = ref(null)

const localFilters = computed(() => props.controlsParams.filters.filter((f) => props.selectedFilters.every((sf) => sf.key !== f.key)))

const localItems = computed(() => localSearch(localFilters.value, searchValue.value, ['label']))

const selectedFiltersLocal = computed({
    get() {
        return props.selectedFilters
    },
    set(filters) {
        emits('update:selectedFilters', filters)
    },
})

function onSelectItem(filter) {
    const { type } = filter

    const newItem = {
        ...filter,
        rule: FILTER_RULES[type][0],
    }

    selectedFiltersLocal.value = [...selectedFiltersLocal.value, newItem]

    emits('update:selectedItem', newItem)
    emits('goToNextView', VIEWS_TABLE_MOBILE_DIALOG.filterStepContent)
}
</script>
