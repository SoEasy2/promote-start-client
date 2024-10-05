<template>
    <div class="pt-4 pb-8 grid custom-scroll-y">
        <template v-if="selectedSorting.length">
            <SortingList
                :selectedSorting="selectedSorting"
                @onSelectedSorting="onSelectedSorting"
                @goToNextView="goToNextView"
                @onChangeItem="onChangeItem"
            />

            <CustomDivider class="mt-4 mb-1 w-full" />
        </template>

        <TableMobileDialogButtons
            addButtonName="add sort"
            :hideClearButton="!selectedSorting.length"
            :hideActionButton="hideActionButton"
            @onClear="onClear"
            @onAdd="onAdd"
        />
    </div>
</template>

<script setup>
import { computed } from 'vue'

import TableMobileDialogButtons from '@/components/table/tableDialog/TableMobileDialogButtons.vue'
import SortingList from '@/components/table/tableList/SortingList.vue'
import CustomDivider from '@/components/divider/CustomDivider.vue'

import { VIEWS_TABLE_MOBILE_DIALOG } from '@/constants/viewsTableMobileDialog'

const props = defineProps({
    selectedSorting: {
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

const emits = defineEmits(['onSelectedSorting', 'goToNextView', 'changeActiveColumn'])

const selectedItem = defineModel('selectedItem', { type: Object, default: () => ({}) })

const hideActionButton = computed(() => {
    const { sorting = [] } = props.controlsParams
    return sorting.length === props.selectedSorting.length
})

function onClear() {
    emits('onSelectedSorting', {}, 'deleteAll')
}

function onAdd() {
    selectedItem.value = null
    goToNextView()
}

function onChangeItem(item) {
    selectedItem.value = item
    goToNextView()
}

function onSelectedSorting(payload, type) {
    emits('onSelectedSorting', payload, type)
}

function goToNextView() {
    emits('goToNextView', VIEWS_TABLE_MOBILE_DIALOG.sortingStepAdd)
}
</script>
