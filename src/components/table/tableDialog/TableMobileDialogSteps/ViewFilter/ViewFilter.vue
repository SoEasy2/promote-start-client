<template>
    <div class="pt-4 pb-8 grid custom-scroll-y">
        <template v-if="showFilterActivatorList">
            <FilterActivatorList
                :items="selectedFilters"
                @openFilter="openFilter"
                @removeFilter="removeFilter"
            />

            <CustomDivider class="mt-4 mb-1 w-full"/>
        </template>

        <TableMobileDialogButtons
            addButtonName="add filter"
            :hideClearButton="!showFilterActivatorList"
            :hideActionButton="hideActionButton"
            @onClear="onClear"
            @onAdd="onAdd"
        />
    </div>
</template>

<script setup>
import { computed } from 'vue'

import TableMobileDialogButtons from '@/components/table/tableDialog/TableMobileDialogButtons.vue'
import CustomDivider from '@/components/divider/CustomDivider.vue'
import FilterActivatorList from '@/components/table/tableList/FilterActivatorList/FilterActivatorList.vue'

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

const emits = defineEmits(['goToNextView', 'update:selectedFilters', 'clearFilter'])

const selectedItem = defineModel('selectedItem', { type: Object, default: () => ({}) })

const hideActionButton = computed(() => {
    const { filters = [] } = props.controlsParams
    return filters.length === props.selectedFilters.length
})

const showFilterActivatorList = computed(() => props.selectedFilters.length)

function onClear() {
    emits('update:selectedFilters', [])
    emits('clearFilter')
}

function onAdd() {
    selectedItem.value = null
    emits('goToNextView', VIEWS_TABLE_MOBILE_DIALOG.filterStepAdd)
}

function openFilter(item) {
    selectedItem.value = item
    emits('goToNextView', VIEWS_TABLE_MOBILE_DIALOG.filterStepContent)
}

function removeFilter({ key }) {
    const filters = props.selectedFilters.filter((f) => f.key !== key)
    emits('update:selectedFilters', filters)
}

</script>
