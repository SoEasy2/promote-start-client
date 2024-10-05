<template>
    <CustomMenu
        v-model="menu"
        :showTimeout="150"
        persistent
    >
        <template #activator>
            <div
                class="max-w-60 h-8 px-2 flex items-center cursor-pointer hover:bg-purple-50 dark:hover:bg-purple-800 rounded-custom border hover:border-purple dark:hover:border-purple transition-colors"
                :class="menu ? 'bg-purple-50 dark:bg-purple-800 border-purple' : 'border-gray-100 dark:border-blue-720'"
                @click="menuHandler"
            >
                <CleanIcon
                    class="mr-2 min-w-4 min-h-4 text-gray-200 dark:text-blue-770"
                    @click="onDeleteAll"
                />

                <div class="pr-1.5 text-gray-370 dark:text-white text-xs select-none truncate">
                    {{ label }}
                </div>

                <ArrowSelect
                    class="text-gray-200 dark:text-white transform duration-100"
                    :class="{ 'rotate-180': menu }"
                />
            </div>
        </template>

        <template #dropdown>
            <div class="w-70 p-2.5 absolute top-2 bg-white dark:bg-blue-840 border border-gray-100 dark:border-blue-720 rounded-1.25 z-100">
                <div
                    class="flex items-center gap-x-2.5 pb-1.25"
                    v-for="item in selectedSorting"
                    :key="item.label"
                >
                    <MoreSelect
                        v-model="isOpenSelect[item.label]"
                        :selectItem="item"
                        :controlsParams="controlsParams"
                        :width="107"
                        activator
                        @update="onUpdate"
                    />

                    <FormSelect
                        :modelValue="item.value"
                        :items="SORT_RULES"
                        :menuWidth="144"
                        class="w-26.75"
                        itemText="label"
                        itemValue="key"
                        returnObject
                        mini
                        disableSearch
                        valueClass
                        isTransparent
                        @update:modelValue="onChangeValue($event, item)"
                    />

                    <div
                        class="w-6 h-6 flex items-center justify-center"
                        @click="onDelete(item)"
                    >
                        <CrossIcon class="cursor-pointer text-gray-200"/>
                    </div>
                </div>

                <SortMenu
                    v-model:menu="sortingMenu"
                    :controlsParams="controlsParams"
                    @addSort="addSort"
                >
                    <div
                        class="h-7 flex items-center gap-x-2 cursor-pointer transition-colors group text-xs"
                        ref="sortRef"
                        @click="sortingMenuHandler"
                    >
                        <PlusIcon class="text-gray-280 group-hover:text-purple dark:group-hover:text-purple"/>

                        <span class="text-gray-370 font-medium dark:text-white group-hover:text-purple dark:group-hover:text-purple">Add sort</span>
                    </div>
                </SortMenu>
            </div>
        </template>
    </CustomMenu>
</template>

<script setup>
import {
    computed, onUnmounted, ref, watch,
} from 'vue'

import CustomMenu from '@/components/menu/CustomMenu/CustomMenu.vue'
import ArrowSelect from '@/components/icons/ArrowSelect.vue'
import SortMenu from '@/components/table/tableMenu/sortMenu.vue'
import PlusIcon from '@/components/icons/PlusIcon.vue'
import FormSelect from '@/components/selects/FormSelect/FormSelect.vue'
import MoreSelect from '@/components/selects/MoreSelect.vue'
import CrossIcon from '@/components/icons/CrossIcon.vue'

import { SORT_RULES } from '@/constants/sortRules'
import { useSortFilterTableStore } from '@/store/sortFilterTableStore'
import CleanIcon from '@/components/icons/CleanIcon.vue'

const props = defineProps({
    controlsParams: {
        type: Object,
        default: () => ({
            filters: [],
            statuses: [],
            sorting: [],
        }),
    },
    selectedSorting: {
        type: Array,
        default: () => [],
    },
})

const emits = defineEmits(['onSelectedSorting'])

const sortFilterTableStore = useSortFilterTableStore()

const menu = ref(false)
const sortingMenu = ref(false)

const isOpenSelect = ref({})

const label = computed(() => {
    const count = props.selectedSorting.length

    if (count !== 1) {
        return `${count} sorts`
    }

    const [first = {}] = props.selectedSorting
    return first.label
})

function menuHandler() {
    menu.value = !menu.value
}

function sortingMenuHandler() {
    sortingMenu.value = !sortingMenu.value
}

function onUpdate({ item, selectItem }) {
    const { sorting } = props.controlsParams

    const findItem = sorting.find((el) => el.key === selectItem.key)
    findItem.hideSelect = false

    selectItem.key = item.key
    selectItem.label = item.label

    item.hideSelect = true
    isOpenSelect.value = {}

    emits('onSelectedSorting', item, 'update')
}

function onChangeValue(value, item) {
    if (value.key !== item.value.key) {
        item.value = value
        emits('onSelectedSorting', {}, 'update')
    }
}

function onDelete(item) {
    emits('onSelectedSorting', item, 'delete')
}

function onDeleteAll() {
    emits('onSelectedSorting', {}, 'deleteAll')
}

function addSort(item) {
    sortingMenu.value = false
    emits('onSelectedSorting', item)
}

watch(menu, () => {
    if (!props.selectedSorting.length) {
        sortFilterTableStore.openCloseSorting(false)
    }
})

watch(() => sortFilterTableStore.showTableSortMenu, (value) => {
    menu.value = value
}, { immediate: true })

onUnmounted(() => {
    sortFilterTableStore.openCloseTableSortMenu(false)
})

</script>
