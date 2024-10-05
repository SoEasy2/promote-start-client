<template>
    <div
        class="flex sticky"
        :class="right"
    >
        <div class="flex items-center gap-x-2.5 max-mob:gap-x-4">
            <SearchControl
                v-if="!hideSearch"
                :searchTimeout="searchTimeout"
                :mainBg="mainBg"
                :searchValue="searchValue"
                @onSearch="onSearch"
            />

            <ActionsTableControlMobile
                v-if="isMobView"
                :hideSort="hideSort"
                :hideFilter="hideFilter"
                :hideReload="hideReload"
                :hideSettings="hideSettings"
                :headerType="headerType"
                :selectedSorting="selectedSorting"
                :selectedFilters="selectedFilters"
                :controlsParams="controlsParams"
                :keysForFilterListEmpty="keysForFilterListEmpty"
                :keysForFilterStringEmpty="keysForFilterStringEmpty"
                @onSelectedSorting="onSelectedSorting"
                @onSelectedFilters="onSelectedFilters"
                @onReload="onReload"
            />

            <ActionsTableControlDesktop
                v-else
                :hideSort="hideSort"
                :hideFilter="hideFilter"
                :hideReload="hideReload"
                :hideSettings="hideSettings"
                :headerType="headerType"
                :selectedSorting="selectedSorting"
                :selectedFilters="selectedFilters"
                :controlsParams="controlsParams"
                @onSelectedSorting="onSelectedSorting"
                @onReload="onReload"
            />
        </div>

        <ExportBtn
            v-if="!hideExport"
            class="ml-5 max-mob:ml-4"
            :loading="loadingExport"
            :outlined="outlinedExportBtn"
            @onExport="onExport"
        />

        <slot name="actionBtn">
            <PrimaryBtn
                v-if="!hideButton"
                class="ml-5 max-mob:ml-4"
                :height="buttonHeight"
                :loading="buttonLoading"
                @click="onAdd"
            >
                {{ buttonName }}
            </PrimaryBtn>
        </slot>
    </div>
</template>

<script setup>
import SearchControl from '@/components/table/controls/ActionsTableControl/SearchControl.vue'
import ExportBtn from '@/components/buttons/ExportBtn.vue'
import PrimaryBtn from '@/components/buttons/PrimaryBtn.vue'
import ActionsTableControlDesktop from '@/components/table/controls/ActionsTableControl/ActionsTableControlDesktop.vue'
import ActionsTableControlMobile from '@/components/table/controls/ActionsTableControl/ActionsTableControlMobile.vue'

defineProps({
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
    headerType: {
        type: String,
        default: '',
    },
    hideExport: {
        type: Boolean,
        default: false,
    },
    hideButton: {
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
    buttonLoading: {
        type: Boolean,
        default: false,
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
    isMobView: {
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
})

const emits = defineEmits(['onAdd', 'onSelectedSorting', 'onSelectedFilters', 'onSearch', 'onReload', 'onExport'])

function onSelectedSorting(payload, type) {
    emits('onSelectedSorting', payload, type)
}

function onSelectedFilters(filters) {
    emits('onSelectedFilters', filters)
}

function onAdd() {
    emits('onAdd')
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
