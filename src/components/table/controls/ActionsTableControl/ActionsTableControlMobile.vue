<template>
    <UpdateIcon
        v-if="!hideReload"
        class="text-gray-200 cursor-pointer"
        @click="onReload"
    />

    <div
        v-if="!hideUnionIcon"
        class="w-6 h-6 flex items-center justify-center cursor-pointer"
        :class="isActive ? 'text-purple' : 'text-gray-200'"
        @click="openDialog"
    >
        <UnionFilterIcon />
    </div>

    <TableMobileDialog
        v-if="!hideUnionIcon"
        v-model="showDialog"
        :headerType="headerType"
        :hideSort="hideSort"
        :hideFilter="hideFilter"
        :hideSettings="hideSettings"
        :selectedFilters="selectedFilters"
        :selectedSorting="selectedSorting"
        :controlsParams="controlsParams"
        :keysForFilterListEmpty="keysForFilterListEmpty"
        :keysForFilterStringEmpty="keysForFilterStringEmpty"
        @onSelectedSorting="onSelectedSorting"
        @onSelectedFilters="onSelectedFilters"
    />
</template>
<script setup>
import { computed, ref, watch } from 'vue'

import UnionFilterIcon from '@/components/icons/UnionFilterIcon.vue'
import UpdateIcon from '@/components/icons/filterTable/UpdateIcon.vue'
import TableMobileDialog from '@/components/table/tableDialog/TableMobileDialog.vue'

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

const emits = defineEmits(['onSelectedSorting', 'onSelectedFilters', 'onReload'])

const sortFilterTableStore = useSortFilterTableStore()

const hideUnionIcon = computed(() => props.hideSort && props.hideFilter && props.hideSettings)

const isActive = computed(() => !![...props.selectedSorting, ...props.selectedFilters].length)

const showDialog = ref(false)

const storeDialog = computed({
    get() {
        return sortFilterTableStore.checkFilter(props.headerType)
    },
    set(value) {
        sortFilterTableStore.openCloseDialog(value)
    },
})

function onReload() {
    emits('onReload')
}

function openDialog() {
    showDialog.value = true
}

function onSelectedSorting(payload, type) {
    emits('onSelectedSorting', payload, type)
}

function onSelectedFilters(filters) {
    emits('onSelectedFilters', filters)
}

watch(storeDialog, (show) => {
    if (show) {
        showDialog.value = show
        storeDialog.value = props.headerType
    }
})
</script>
