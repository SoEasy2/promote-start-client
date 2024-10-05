<template>
    <div class="px-4 pt-4.5 gap-y-0.5 grid">
        <div
            class="py-1.5 gap-x-2 flex items-center border-b-1 border-white-500 dark:border-gray-760"
            v-for="item in list"
            :key="item.label"
            @click="goToNext(item)"
        >
            <component
                class="text-gray-200 dark:text-white"
                :is="item.icon"
            />

            <div class="text-xs text-gray-280 dark:text-white">
                {{ item.label }}
            </div>

            <div class="ml-auto gap-x-2 flex items-center text-gray-200">
                <div class="text-xxs">
                    {{ item.description }}
                </div>

                <ArrowSelect class="w-3 rotate-270"/>
            </div>
        </div>
    </div>
</template>

<script setup>

import { computed } from 'vue'

import FilterIcon from '@/components/icons/filterTable/FilterIcon.vue'
import SortIcon from '@/components/icons/filterTable/SortIcon.vue'
import SettingIcon from '@/components/icons/navigations/SettingIcon.vue'
import ArrowSelect from '@/components/icons/ArrowSelect.vue'

import { getNoun } from '@/helpers/app-helper'

import { VIEWS_TABLE_MOBILE_DIALOG } from '@/constants/viewsTableMobileDialog'
import { useSettingsHeaderTableStore } from '@/store/settingsHaderTableStore'

const props = defineProps({
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
})

const emits = defineEmits(['goToNextView'])

const settingsHeaderTableStore = useSettingsHeaderTableStore()

const countFilter = computed(() => getNoun(filterLength.value, 'filter', 'filters', 'filters'))
const countSorting = computed(() => getNoun(props.selectedSorting.length, 'sort', 'sorts', 'sorts'))
const countSettings = computed(() => getNoun(settingsLength.value, 'setting', 'settings', 'settings'))

const headerTable = computed(() => settingsHeaderTableStore.getHeadersTable(props.headerType))

const filterLength = computed(() => props.selectedFilters.length)

const settingsLength = computed(() => {
    const { headers = [], activeColumns = [] } = headerTable.value
    const headersWithoutDisabled = headers.filter((h) => !h.disabled)

    const items = []

    activeColumns.forEach((key) => {
        const findItem = headersWithoutDisabled.find((h) => h.value === key)
        if (findItem) {
            items.push(findItem)
        }
    })

    return items.length
})

const list = computed(() => {
    const list = []

    if (!props.hideFilter) {
        const filter = {
            label: 'Filter',
            icon: FilterIcon,
            description: `${filterLength.value} ${countFilter.value}`,
            view: VIEWS_TABLE_MOBILE_DIALOG.filter,
        }

        list.push(filter)
    }

    if (!props.hideSort) {
        const sorting = {
            label: 'Sorting',
            icon: SortIcon,
            description: `${props.selectedSorting.length} ${countSorting.value}`,
            view: VIEWS_TABLE_MOBILE_DIALOG.sorting,
        }

        list.push(sorting)
    }

    if (!props.hideSettings) {
        const settings = {
            label: 'Settings',
            icon: SettingIcon,
            description: `${settingsLength.value} ${countSettings.value}`,
            view: VIEWS_TABLE_MOBILE_DIALOG.settings,
        }

        list.push(settings)
    }

    return list
})

function goToNext({ view }) {
    emits('goToNextView', view)
}

</script>
