<template>
    <div>
        <CustomTableControls
            :controlsParams="controlsParams"
            :selectedFilters="selectedFilters"
            :headerType="headerType"
            class="max-mob:px-0 pb-2 px-5 pt-4"
            :hideFilter="hideFilter"
            hideButton
            hideExport
            hideSettings
            hideReload
            hideSort
            mainBg="bg-white dark:bg-transparent"
            @onSearch="onSearch"
            @onSelectedFilters="onSelectedFilters"
            @clearSortFilter="clearSortFilter"
        >
            <template #actionBtn>
                <OnPageSelect
                    v-model="onPage"
                    class="ml-5"
                />
            </template>
        </CustomTableControls>

        <WrapTableScroll
            classBody="w-full min-w-min pb-2"
            classWrap="max-mob:px-0 px-5 min-w-min"
            space="max-mob:px-4 max-mob:-mx-4"
        >
            <CustomDataTable
                :headers="headers"
                :items="displayedItems"
                :loading="loading"
                v-model:selected="localSelectedGroups"
                v-model:page="dataPagination.page"
                :total="dataPagination.total"
                :showSelect="showSelect"
                selectCheckboxByClickRow
                mainBg="bg-white dark:bg-blue-840"
            >
                <template #item.name="{ item }">
                    <div class="max-w-100 truncate">
                        {{ item.name }}
                    </div>
                </template>

                <template #item.status="{ item }">
                    <div class="flex justify-center">
                        <div
                            class="h-3.5 w-3.5 rounded-0.5"
                            :class="item['status_id'] === STATUS_IDS.active ? 'bg-green' : 'bg-yellow'"
                        ></div>
                    </div>
                </template>

                <template #item.actions="{ item }">
                    <div class="flex justify-center space-x-1.5">
                        <TableButton
                            class="w-19.5"
                            @click="selectGroup(item)"
                        >
                            Select
                        </TableButton>
                    </div>
                </template>
            </CustomDataTable>
        </WrapTableScroll>
    </div>
</template>

<script setup>
import {
    computed, reactive, ref, watch,
} from 'vue'

import CustomTableControls from '@/components/table/controls/CustomTableControls.vue'
import WrapTableScroll from '@/components/scroll/WrapTableScroll.vue'
import OnPageSelect from '@/components/selects/OnPageSelect.vue'
import CustomDataTable from '@/components/table/CustomDataTable.vue'
import TableButton from '@/components/buttons/TableButton.vue'

import { STATUS_IDS } from '@/constants/statusIds'

import { localSearch } from '@/helpers/app-helper'
import { getOnPageByName, setOnPageByName } from '@/helpers/on-page-helper'

const props = defineProps({
    controlsParams: {
        type: Object,
        default: () => ({}),
    },
    headers: {
        type: Array,
        default: () => [],
    },
    selectedFilters: {
        type: Array,
        default: () => [],
    },
    items: {
        type: Array,
        default: () => [],
    },
    selectedGroups: {
        type: Array,
        default: () => [],
    },
    loading: {
        type: Boolean,
        default: false,
    },
    menuView: {
        type: Boolean,
        default: false,
    },
    hideFilter: {
        type: Boolean,
        default: false,
    },
    headerType: {
        type: String,
        default: '',
    },
})

const emits = defineEmits(['update:selectedGroups', 'selectGroup', 'onSelectedFilters', 'onClearSortFilter'])

const dataPagination = reactive({
    page: 1,
    total: 1,
})

const searchValue = ref('')

const onPageName = 'addDestinations'

const onPage = ref(getOnPageByName(onPageName))

const searchFieldNames = ['name']

const showSelect = computed(() => !props.menuView)

const localSelectedGroups = computed({
    get() {
        return props.selectedGroups
    },
    set(numbers) {
        emits('update:selectedGroups', numbers)
    },
})

const localItems = computed(() => localSearch(props.items, searchValue.value, searchFieldNames))

const displayedItems = computed(() => {
    const startIndex = (dataPagination.page - 1) * onPage.value
    const endIndex = startIndex + onPage.value

    return localItems.value.slice(startIndex, endIndex)
})

function onSearch(search) {
    searchValue.value = search
    localSelectedGroups.value = []
    setDataPagination()
}

function setDataPagination() {
    setOnPageByName(onPageName, onPage.value)
    dataPagination.page = 1
    dataPagination.total = Math.ceil(localItems.value.length / onPage.value)
}

function selectGroup(group) {
    emits('selectGroup', group)
}

function onSelectedFilters(payload) {
    emits('onSelectedFilters', payload)
}

function clearSortFilter() {
    emits('onClearSortFilter')
}

watch(onPage, () => {
    localSelectedGroups.value = []
    setDataPagination()
})

watch(() => props.items, () => {
    localSelectedGroups.value = []
    setDataPagination()
}, { immediate: true })
</script>
