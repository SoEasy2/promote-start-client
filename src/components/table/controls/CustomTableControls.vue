<template>
    <div :class="width">
        <div class="flex justify-between gap-x-12">
            <div
                class="flex sticky"
                :class="left"
            >
                <div
                    v-if="showMultipleActions"
                    class="flex items-center space-x-2.5 mx-4 max-mob:hidden"
                >
                    <slot name="multipleActions"></slot>
                </div>
            </div>

            <ActionsTableControl
                :isMobView="isMobView"
                :headerType="headerType"
                :searchTimeout="searchTimeout"
                :searchValue="searchValue"
                :buttonHeight="buttonHeight"
                :buttonName="buttonName"
                :hideSearch="hideSearch"
                :hideSort="hideSort"
                :hideFilter="hideFilter"
                :hideReload="hideReload"
                :hideSettings="hideSettings"
                :hideExport="hideExport"
                :hideButton="hideButton"
                :outlinedExportBtn="outlinedExportBtn"
                :loadingExport="loadingExport"
                :selectedSorting="selectedSorting"
                :selectedFilters="selectedFilters"
                :controlsParams="controlsParams"
                :keysForFilterListEmpty="keysForFilterListEmpty"
                :keysForFilterStringEmpty="keysForFilterStringEmpty"
                :mainBg="mainBg"
                :right="right"
                :buttonLoading="buttonLoading"
                @onAdd="onAdd"
                @onSelectedSorting="onSelectedSorting"
                @onSelectedFilters="onSelectedFilters"
                @onSearch="onSearch"
                @onReload="onReload"
                @onExport="onExport"
            >
                <template #actionBtn>
                    <slot name="actionBtn"></slot>
                </template>
            </ActionsTableControl>
        </div>

        <div class="flex min-mob:hidden">
            <div class="left-0 sticky">
                <div
                    v-if="showMultipleActions"
                    class="flex items-center space-x-2.5 mx-4"
                >
                    <slot name="multipleActions"></slot>
                </div>
            </div>

            <div class="right-0 sticky"/>
        </div>

        <SortingFilterPanelTable
            v-if="showPanel"
            :headerType="headerType"
            :selectedSorting="selectedSorting"
            :selectedFilters="selectedFilters"
            :controlsParams="controlsParams"
            :keysForFilterListEmpty="keysForFilterListEmpty"
            :keysForFilterStringEmpty="keysForFilterStringEmpty"
            @onSelectedSorting="onSelectedSorting"
            @onSelectedFilters="onSelectedFilters"
            @clearSortFilter="clearSortFilter"
        />

        <slot name="dialogs"></slot>
    </div>
</template>

<script setup>
import { computed, inject } from 'vue'

import ActionsTableControl from '@/components/table/controls/ActionsTableControl/ActionsTableControl.vue'
import SortingFilterPanelTable from '@/components/table/controls/SortingFilterPanelTable/SortingFilterPanelTable.vue'

import { viewPorts } from '@/constants/viewPorts'

const props = defineProps({
    hideSearch: {
        type: Boolean,
        default: false,
    },
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
    hideExport: {
        type: Boolean,
        default: false,
    },
    hideButton: {
        type: Boolean,
        default: false,
    },
    showMultipleActions: {
        type: Boolean,
        default: false,
    },
    outlinedExportBtn: {
        type: Boolean,
        default: false,
    },
    loadingExport: {
        type: Boolean,
        default: false,
    },
    buttonLoading: {
        type: Boolean,
        default: false,
    },
    searchTimeout: {
        type: Number,
        default: 500,
    },
    searchValue: {
        type: String,
        default: '',
    },
    buttonName: {
        type: String,
        default: 'Create',
    },
    buttonHeight: {
        type: String,
        default: 'h-9.5',
    },
    headerType: {
        type: String,
        default: '',
    },
    width: {
        type: String,
        default: 'w-full',
    },
    left: {
        type: String,
        default: 'left-0',
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
    mainBg: {
        type: String,
        default: 'bg-white dark:bg-blue-800',
    },
    right: {
        type: String,
        default: 'right-0',
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

const emits = defineEmits(['onAdd', 'onSelectedSorting', 'clearSortFilter', 'onSelectedFilters', 'onExport', 'onReload', 'onSearch'])

const currentViewSize = inject('currentViewSize')

const isMobView = computed(() => viewPorts.mob >= currentViewSize.value)

const showPanel = computed(() => {
    if (isMobView.value) {
        return false
    }

    return !props.hideSort || !props.hideFilter
})

function onAdd() {
    emits('onAdd')
}

function onSelectedSorting(payload, type) {
    emits('onSelectedSorting', payload, type)
}

function onSelectedFilters(filters) {
    emits('onSelectedFilters', filters)
}

function clearSortFilter() {
    emits('clearSortFilter')
}

function onReload() {
    emits('onReload')
}

function onExport() {
    emits('onExport')
}

function onSearch(searchValue) {
    emits('onSearch', searchValue)
}
</script>
