<template>
    <div>
        <CustomTableControls
            :controlsParams="controlsParams"
            :selectedFilters="selectedFilters"
            :headerType="headerType"
            class="max-mob:px-0 pb-2 px-5 pt-4"
            hideButton
            hideExport
            :hideFilter="hideFilter"
            hideSettings
            hideReload
            hideSort
            mainBg="bg-white dark:bg-transparent"
            @onSelectedFilters="onSelectedFilters"
            @onSearch="onSearch"
            @clearSortFilter="clearSortFilter"
        >
            <template #actionBtn>
                <div class="flex gap-x-4">
                    <OnPageSelect
                        v-model="onPage"
                        height="h-8.5"
                        class="ml-5"
                    />

                    <PrimaryBtn
                        v-if="showBuy"
                        height="h-8.5"
                        @click="onBuyNumber"
                    >
                        Create Number Pool
                    </PrimaryBtn>
                </div>
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
                v-model:selected="localSelectedNumbers"
                v-model:page="dataPagination.page"
                :total="dataPagination.total"
                showSelect
                selectCheckboxByClickRow
                mainBg="bg-white dark:bg-blue-840"
            >
                <template #item.name="{ item }">
                    <div class="max-w-50 truncate">
                        {{ item.name ? item.name : '-//-' }}
                    </div>
                </template>

                <template #item.country="{ item }">
                    <div class="max-w-50 truncate">
                        {{ item.country ? item.country.name : '-//-' }}
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
            </CustomDataTable>
        </WrapTableScroll>
    </div>
</template>

<script setup>
import {
    computed, reactive, ref, watch,
} from 'vue'

import CustomTableControls from '@/components/table/controls/CustomTableControls.vue'
import OnPageSelect from '@/components/selects/OnPageSelect.vue'
import WrapTableScroll from '@/components/scroll/WrapTableScroll.vue'
import CustomDataTable from '@/components/table/CustomDataTable.vue'
import PrimaryBtn from '@/components/buttons/PrimaryBtn.vue'

import { localSearch, removeFirstPlusForSearch } from '@/helpers/app-helper'
import { getOnPageByName, setOnPageByName } from '@/helpers/on-page-helper'

import { STATUS_IDS } from '@/constants/statusIds'

const props = defineProps({
    controlsParams: {
        type: Object,
        default: () => ({}),
    },
    selectedFilters: {
        type: Array,
        default: () => [],
    },
    items: {
        type: Array,
        default: () => [],
    },
    selectedNumbers: {
        type: Array,
        default: () => [],
    },
    loading: {
        type: Boolean,
        default: false,
    },
    showBuy: {
        type: Boolean,
        default: false,
    },
    headerType: {
        type: String,
        default: '',
    },
    hideFilter: {
        type: Boolean,
        default: false,
    },
})

const emits = defineEmits(['update:selectedNumbers', 'onBuyNumber', 'onSelectedFilters', 'onClearSortFilter'])

const searchFieldNames = ['number', 'name']
const searchValue = ref('')

const onPageName = 'addNumberPool'

const onPage = ref(getOnPageByName(onPageName))

const headers = reactive([
    { name: 'Number', value: 'name' },
    { name: 'Country', value: 'country' },
    { name: 'Pool Size', value: 'numbers_count' },
    { name: 'Status', value: 'status', align: 'center' },
])

const localSelectedNumbers = computed({
    get() {
        return props.selectedNumbers
    },
    set(numbers) {
        emits('update:selectedNumbers', numbers)
    },
})

const dataPagination = reactive({
    page: 1,
    total: 1,
})

const localItems = computed(() => localSearch(props.items, removeFirstPlusForSearch(searchValue.value), searchFieldNames))

const displayedItems = computed(() => {
    const startIndex = (dataPagination.page - 1) * onPage.value
    const endIndex = startIndex + onPage.value

    return localItems.value.slice(startIndex, endIndex)
})

function onSearch(search) {
    searchValue.value = search
    localSelectedNumbers.value = []
    setDataPagination()
}

function onBuyNumber() {
    emits('onBuyNumber')
}

function setDataPagination() {
    setOnPageByName(onPageName, onPage.value)
    dataPagination.page = 1
    dataPagination.total = Math.ceil(localItems.value.length / onPage.value)
}
function onSelectedFilters(payload) {
    emits('onSelectedFilters', payload)
}

function clearSortFilter() {
    emits('onClearSortFilter')
}

watch(onPage, () => {
    localSelectedNumbers.value = []
    setDataPagination()
})

watch(() => props.items, () => {
    localSelectedNumbers.value = []
    setDataPagination()
}, { immediate: true })
</script>
