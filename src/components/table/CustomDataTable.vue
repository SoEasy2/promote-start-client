<template>
    <div>
        <table
            class="relative "
            :class="items.length ?  tableWidth : 'w-full'"
        >
            <thead>
            <tr
                class="h-10"
                :class="{ 'sticky': !props.offSticky }"
            >
                <th
                    v-if="showSelect"
                    class="pl-4 w-10 relative z-10 bg-gray-80 dark:bg-blue-780"
                    :class="onlyBorderTop ? 'first:rounded-tl-1.25' : 'first:rounded-l-1.25'"
                >
                    <CustomCheckBox
                        :checked="allItemsSelected"
                        @onChangeCheck="changeHeaderCheckbox"
                    />
                </th>

                <th
                    class="text-left text-purple-150 dark:text-white uppercase text-xs leading-tight font-normal px-3 select-none whitespace-nowrap bg-gray-80 dark:bg-blue-780"
                    :class="[
                        'table-col-' + index,
                        head.align && `text-${head.align}`,
                        !!head.sortSettings && !!items.length && 'cursor-pointer',
                        { 'sticky': head.sticky },
                        onlyBorderTop ? 'first:rounded-tl-1.25 last:rounded-tr-1.25' : 'first:rounded-l-1.25 last:rounded-r-1.25'
                    ]"
                    :style="[
                        head.hasOwnProperty('width') ? { width: `${head.width}px`,  minWidth: `${head.width}px` } : {},
                        head.hasOwnProperty('right') ? { right: `${head.right}rem` } : {},
                    ]"
                    v-for="(head, index) in headers"
                    :key="index"
                    @click="onColumnClick(head, index)"
                    @mouseenter="onMouseColumn(index)"
                    @mouseleave="onMouseColumn(-1)"
                >
                    <SortFilterTableMenu
                        :menu="sortFilterMenu === index"
                        :head="head"
                        :index="index"
                        :hoverIndex="hoverIndex"
                        @update:menu="showContextMenu"
                        @addSorting="addSorting"
                        @addFilter="addFilter"
                    >
                        <template v-for="(_, slot) of $slots" v-slot:[slot]="scope">
                            <slot :name="slot" v-bind="scope" />
                        </template>
                    </SortFilterTableMenu>
                </th>

                <ProgressLine :loading="loading"/>
            </tr>
            </thead>

            <tbody>
            <tr class="h-1.5"></tr>

            <template
                v-for="(item, rowIndex) in items"
                :key="rowKey ? item[rowKey] : `tr-${rowIndex}`"
            >
                <CustomDataTableRow
                    :headers="headers"
                    v-model:selected="selected"
                    v-model:activeRow="activeRowLocal"
                    :item="item"
                    :rowIndex="rowIndex"
                    :isLastRowIndexChild="item[propChildrenTable] && !item[propChildrenTable].length"
                    :activeChildrenTableIndex="activeChildrenTableIndex"
                    :clickableRow="clickableRow"
                    :showSelect="showSelect"
                    :mainBg="mainBg"
                    :mainBgChildren="mainBgChildren"
                    :itemKey="itemKey"
                    :selectCheckboxByClickRow="selectCheckboxByClickRow"
                    :disabledEventClickRow="disabledEventClickRow"
                >
                    <template v-for="(_, slot) of $slots" v-slot:[slot]="scope">
                        <slot :name="slot" v-bind="scope" />
                    </template>
                </CustomDataTableRow>

                <template
                    v-for="(itemChild, rowIndexChild) in item[propChildrenTable]"
                    :key="`tr-${rowIndexChild}`"
                >
                    <CustomDataTableRow
                        v-if="activeChildrenTableIndex === rowIndex && propChildrenTable"
                        :headers="headers"
                        v-model:selected="selected"
                        :item="itemChild"
                        :rowIndex="rowIndex"
                        :rowIndexChild="rowIndexChild"
                        :isLastRowIndexChild="rowIndexChild === item[propChildrenTable].length - 1"
                        :activeChildrenTableIndex="activeChildrenTableIndex"
                        :clickableRow="clickableRow"
                        :showSelect="showSelect"
                        :hideSelectChild="hideSelectChild"
                        :mainBg="mainBg"
                        :mainBgChildren="mainBgChildren"
                        :itemKey="itemKey"
                        :selectCheckboxByClickRow="selectCheckboxByClickRow"
                        :disabledEventClickRow="disabledEventClickRow"
                        isChild
                    >
                        <template v-for="(_, slot) of $slots" v-slot:[slot]="scope">
                            <slot :name="slot" v-bind="scope" />
                        </template>
                    </CustomDataTableRow>
                </template>
            </template>

            <CustomDataTableLoading
                v-if="loading && !items.length"
                :colspan="colspan"
            />

            <NoDataAvailable
                v-if="!loading && !items.length"
                :colspan="colspan"
            />
            </tbody>
        </table>

        <slot name="dialogs"></slot>
    </div>

    <TablePagination
        v-if="!hidePagination && total > 1"
        v-model:page="currentPage"
        :width="widthPagination"
        :padding="paddingPagination"
        :loading="loading"
        :totalCount="total"
    />
</template>

<script setup>
import { computed, ref, watch } from 'vue'

import TablePagination from '@/components/table/TablePagination.vue'
import ProgressLine from '@/components/progress/ProgressLine.vue'
import CustomCheckBox from '@/components/inputs/CustomCheckBox.vue'
import SortFilterTableMenu from '@/components/table/tableMenu/SortFilterTableMenu.vue'
import NoDataAvailable from '@/components/table/NoDataAvailable.vue'
import CustomDataTableLoading from '@/components/table/CustomDataTableLoading.vue'
import CustomDataTableRow from '@/components/table/CustomDataTableRow.vue'

import { ASC, DESC } from '@/constants/sortRules'

const props = defineProps({
    headers: {
        type: Array,
        default: () => [],
    },
    items: {
        type: Array,
        default: () => [],
    },
    loading: {
        type: Boolean,
        default: false,
    },
    hidePagination: {
        type: Boolean,
        default: false,
    },
    showSelect: {
        type: Boolean,
        default: false,
    },
    selectCheckboxByClickRow: {
        type: Boolean,
        default: false,
    },
    hideSelectChild: {
        type: Boolean,
        default: false,
    },
    disabledEventClickRow: {
        type: Boolean,
        default: false,
    },
    activeChildrenTableIndex: {
        type: Number,
        default: -1,
    },
    total: {
        type: Number,
        default: 1,
    },
    itemKey: {
        type: String,
        default: 'slug',
    },
    tableWidth: {
        type: [String, Number, Boolean],
        default: 'w-full',
    },
    clickableRow: {
        type: Boolean,
        default: false,
    },
    offSticky: {
        type: Boolean,
        default: false,
    },
    onlyBorderTop: {
        type: Boolean,
        default: false,
    },
    propChildrenTable: {
        type: String,
        default: '',
    },
    mainBg: {
        type: String,
        default: 'bg-white dark:bg-blue-800',
    },
    mainBgChildren: {
        type: String,
        default: 'bg-gray-80 dark:bg-blue-780',
    },
    paddingPagination: {
        type: String,
        default: '',
    },
    widthPagination: {
        type: String,
        default: 'max-mb:w-screen-filter-mob',
    },
    activeRow: {
        type: Number,
        default: -1,
    },
    rowKey: {
        type: String,
        default: null,
    },
})

const selected = defineModel('selected', { type: Object, default: () => [] })
const currentPage = defineModel('page', { type: Number, default: 1 })

const emits = defineEmits(['addSorting', 'addFilter'])

const sortFilterMenu = ref(false)
const activeRowLocal = ref(-1)
const hoverIndex = ref(-1)

const colspan = computed(() => (props.showSelect ? props.headers.length + 1 : props.headers.length))

const allItemsSelected = computed(() => {
    if (!props.items.length) {
        return false
    }

    return selected.value.length === props.items.length
})

const page = computed(() => props.page)

function addSorting(item) {
    emits('addSorting', item)
}

function addFilter(item) {
    emits('addFilter', item)
}

function onMouseColumn(value) {
    hoverIndex.value = value
}

function onSort(head) {
    if (props.loading) {
        return
    }

    const { sortSettings = {} } = head

    let key

    if (sortSettings.key === DESC) {
        key = ASC
    } else if (sortSettings.key === ASC) {
        key = ''
    } else {
        key = DESC
    }

    addSorting({
        ...head,
        value: { key },
    })
}

function onColumnClick(head, index) {
    const { sortSettings } = head
    if (!sortSettings) {
        return
    }

    if (sortSettings.onlySort) {
        onSort(head)
    } else {
        showContextMenu(index)
    }
}

function showContextMenu(index) {
    sortFilterMenu.value = sortFilterMenu.value === index ? null : index
}

function clearSelectedItems() {
    selected.value = []
}

function changeHeaderCheckbox() {
    if (allItemsSelected.value) {
        clearSelectedItems()
    } else {
        selected.value = props.items.map((i) => i)
    }
}

function setActiveRowLocal(index) {
    activeRowLocal.value = index
}

watch(page, () => {
    clearSelectedItems()
    setActiveRowLocal(-1)
})

watch(() => props.activeRow, setActiveRowLocal)
</script>
