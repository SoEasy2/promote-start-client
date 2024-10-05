<template>
    <CustomDialog
        v-model="showDialog"
        hideHeader
        hideFooter
        hideCloseIcon
    >
        <template #withoutScroll>
            <TableMobileDialogHeader
                :isFirstStep="isFirstStep"
                @closeDialog="closeDialog"
                @goBack="goBack"
            >
                <template #action>
                    <TextBtn
                        v-if="showButtonDone"
                        padding
                        height="h-full"
                        @click="onDoneSettings"
                    >
                        Done
                    </TextBtn>
                </template>
            </TableMobileDialogHeader>

            <transition :name="transitionType">
                <component
                    :is="setupView"
                    v-model:selectedItem="selectedItem"
                    v-model:settingsColumns="settingsColumns"
                    :selectedFilters="selectedFilters"
                    :headerType="headerType"
                    :hideSort="hideSort"
                    :hideFilter="hideFilter"
                    :hideSettings="hideSettings"
                    :selectedSorting="selectedSorting"
                    :controlsParams="controlsParams"
                    :bodyFetch="bodyFetch"
                    :keysForFilterListEmpty="keysForFilterListEmpty"
                    :keysForFilterStringEmpty="keysForFilterStringEmpty"
                    @goToNextView="goToNextView"
                    @goBack="goBack"
                    @onSelectedSorting="onSelectedSorting"
                    @changeActiveColumn="changeActiveColumn"
                    @clearFilter="clearFilter"
                    @update:selectedFilters="onSelectedFilters"
                />
            </transition>
        </template>
    </CustomDialog>
</template>

<script setup>
import {
    computed, markRaw, reactive, ref, watch,
} from 'vue'

import CustomDialog from '@/components/dialogs/CustomDialog.vue'
import TableMobileDialogHeader from '@/components/table/tableDialog/TableMobileDialogHeader.vue'
import ViewMain from '@/components/table/tableDialog/TableMobileDialogSteps/ViewMain.vue'
import ViewFilter from '@/components/table/tableDialog/TableMobileDialogSteps/ViewFilter/ViewFilter.vue'
import ViewFilterStepAdd from '@/components/table/tableDialog/TableMobileDialogSteps/ViewFilter/ViewFilterStepAdd.vue'
import ViewFilterStepContent from '@/components/table/tableDialog/TableMobileDialogSteps/ViewFilter/ViewFilterStepContent.vue'
import ViewSorting from '@/components/table/tableDialog/TableMobileDialogSteps/ViewSorting/ViewSorting.vue'
import ViewSortingStepAdd from '@/components/table/tableDialog/TableMobileDialogSteps/ViewSorting/ViewSortingStepAdd.vue'
import ViewSettings from '@/components/table/tableDialog/TableMobileDialogSteps/ViewSettings/ViewSettings.vue'
import ViewSettingsStepAdd from '@/components/table/tableDialog/TableMobileDialogSteps/ViewSettings/ViewSettingsStepAdd.vue'
import TextBtn from '@/components/buttons/TextBtn.vue'

import { checkEqualsArrays } from '@/helpers/app-helper'
import { setActiveColumnsHeader } from '@/helpers/settings-header-table-helper'

import { VIEWS_TABLE_MOBILE_DIALOG } from '@/constants/viewsTableMobileDialog'
import { useSettingsHeaderTableStore } from '@/store/settingsHaderTableStore'
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
    hideSettings: {
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
    headerType: {
        type: String,
        default: '',
    },
    controlsParams: {
        type: Object,
        default: () => ({
            filters: [],
            sorting: [],
        }),
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

const showDialog = defineModel('modelValue', { type: Boolean, default: false })

const emits = defineEmits(['onSelectedSorting', 'onSelectedFilters', 'clearFilter'])

const settingsHeaderTableStore = useSettingsHeaderTableStore()
const sortFilterTableStore = useSortFilterTableStore()

const isRightTransition = ref(false)

const settingsColumns = reactive({
    headers: [],
    activeColumns: [],
})

const currentView = computed({
    get() {
        return sortFilterTableStore.currentView
    },
    set(view) {
        sortFilterTableStore.changeCurrentView(view)
    },
})

const selectedItem = computed({
    get() {
        return sortFilterTableStore.selectedItem
    },
    set(item) {
        sortFilterTableStore.onSelectedItem(item)
    },
})

const isFirstStep = computed(() => !currentView.value.prevView)
const isSettingsStepAdd = computed(() => currentView.value.view === VIEWS_TABLE_MOBILE_DIALOG.settingsStepAdd.view)

const setupView = computed(() => {
    const { view } = currentView.value

    const lookup = {
        [VIEWS_TABLE_MOBILE_DIALOG.main.view]: ViewMain,
        [VIEWS_TABLE_MOBILE_DIALOG.settings.view]: ViewSettings,
        [VIEWS_TABLE_MOBILE_DIALOG.settingsStepAdd.view]: ViewSettingsStepAdd,
        [VIEWS_TABLE_MOBILE_DIALOG.filter.view]: ViewFilter,
        [VIEWS_TABLE_MOBILE_DIALOG.filterStepAdd.view]: ViewFilterStepAdd,
        [VIEWS_TABLE_MOBILE_DIALOG.filterStepContent.view]: ViewFilterStepContent,
        [VIEWS_TABLE_MOBILE_DIALOG.sorting.view]: ViewSorting,
        [VIEWS_TABLE_MOBILE_DIALOG.sortingStepAdd.view]: ViewSortingStepAdd,
    }

    return lookup.hasOwnProperty(view) ? markRaw(lookup[view]) : null
})

const transitionType = computed(() => (isRightTransition.value ? 'slide-right-filter-mobile' : 'slide-left-filter-mobile'))

const headerTable = computed(() => settingsHeaderTableStore.getHeadersTable(props.headerType))

const showButtonDone = computed(() => {
    if (!isSettingsStepAdd.value) {
        return false
    }

    return !checkEqualsArrays(settingsColumns.activeColumns, headerTable.value.activeColumns)
})

function changeTransition() {
    isRightTransition.value = !isRightTransition.value
}

function goToNextView(newView) {
    currentView.value = newView
}

async function goBack() {
    if (isSettingsStepAdd.value) {
        setSettingsColumns()
    }

    const { prevView } = currentView.value

    currentView.value = VIEWS_TABLE_MOBILE_DIALOG[prevView]

    await changeTransition()
    changeTransition()
}

function closeDialog() {
    showDialog.value = false
}

function onSelectedSorting(payload, type) {
    emits('onSelectedSorting', payload, type)
}

function onSelectedFilters(filters) {
    emits('onSelectedFilters', filters)
}

function clearFilter() {
    emits('clearFilter')
}

function changeActiveColumn() {
    setActiveColumnsHeader(settingsColumns.activeColumns, props.headerType)
    headerTable.value.action(settingsColumns.activeColumns)
}

function onDoneSettings() {
    changeActiveColumn()
    goBack()
}

function setSettingsColumns() {
    if (props.hideSettings) {
        return
    }

    const { headers = [], activeColumns = [] } = headerTable.value

    settingsColumns.headers = headers
    settingsColumns.activeColumns = [...activeColumns]
}

watch(showDialog, (newVal) => {
    if (newVal) {
        setSettingsColumns()
    } else {
        currentView.value = VIEWS_TABLE_MOBILE_DIALOG.main
    }
})
</script>
