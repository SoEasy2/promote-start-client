<template>
    <div>
        <CustomTableControls
            :headerType="headerType"
            :controlsParams="controlsParams"
            :selectedFilters="selectedFilters"
            class="max-mob:px-0 pb-2 px-5 pt-4"
            :hideFilter="hideFilter"
            hideButton
            hideSort
            hideExport
            hideSettings
            hideReload
            mainBg="bg-white dark:bg-transparent"
            @onSelectedFilters="onSelectedFilters"
            @onSearch="onSearch"
            @clearSortFilter="resetSortFilter"
        >
            <template v-if="!hideActionBtn" #actionBtn>
                <div class="flex gap-x-4">
                    <OnPageSelect
                        v-model="onPage"
                        class="ml-5"
                        height="h-8.5"
                    />

                    <PrimaryBtn
                        v-if="showCreate"
                        height="h-8.5"
                        @click="openCreateDialog"
                    >
                        Create
                    </PrimaryBtn>
                </div>
            </template>

            <template #dialogs>
                <CreateDestinationDialog
                    v-model="showCreateDialog"
                    @createSuccessful="reloadAvailableDestinations"
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
                v-model:selected="localSelectedDestinations"
                v-model:page="dataPagination.page"
                :total="dataPagination.total"
                :showSelect="showSelect"
                selectCheckboxByClickRow
                mainBg="bg-white dark:bg-blue-840"
            >
                <template #item.type="{ item }">
                    <DestinationTypeChips :typeId="item.type_id" />
                </template>

                <template #item.name="{ item }">
                    <div class="max-w-36 truncate">
                        {{ item.name }}
                    </div>
                </template>

                <template #item.number="{ item }">
                    <div class="max-w-50 truncate">
                        {{ item.destination ? `+${item.destination}` : item.sip_point ? item.sip_point : 'Dynamic' }}
                    </div>
                </template>

                <template #item.buyer="{ item }">
                    <div class="max-w-50 truncate">
                        {{ item.buyer ? item.buyer.name : '-//-' }}
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
                            @click="selectDestination(item)"
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
import PrimaryBtn from '@/components/buttons/PrimaryBtn.vue'
import CreateDestinationDialog from '@/views/call-tracking/campaigns/components/dialogs/CreateDestinationDialog.vue'
import DestinationTypeChips from '@/components/chips/DestinationTypeChips.vue'

import { localSearch, removeFirstPlusForSearch } from '@/helpers/app-helper'
import { getOnPageByName, setOnPageByName } from '@/helpers/on-page-helper'

import { STATUS_IDS } from '@/constants/statusIds'

const props = defineProps({
    headers: {
        type: Array,
        default: () => [],
    },
    hideFilter: {
        type: Boolean,
        default: false,
    },
    items: {
        type: Array,
        default: () => [],
    },
    selectedDestinations: {
        type: Array,
        default: () => [],
    },
    loading: {
        type: Boolean,
        default: false,
    },
    hideActionBtn: {
        type: Boolean,
        default: false,
    },
    menuView: {
        type: Boolean,
        default: false,
    },
    showCreate: {
        type: Boolean,
        default: false,
    },
    controlsParams: {
        type: Object,
        default: () => ({}),
    },
    selectedFilters: {
        type: Array,
        default: () => [],
    },
    headerType: {
        type: String,
        default: '',
    },
})

const emits = defineEmits(['update:selectedDestinations', 'selectDestination', 'onSelectedFilters', 'onResetSortFilter', 'reloadAvailableDestinations'])

const dataPagination = reactive({
    page: 1,
    total: 1,
})

const searchValue = ref('')

const showCreateDialog = ref(false)

const onPageName = 'addDestinations'

const onPage = ref(getOnPageByName(onPageName))

const searchFieldNames = ['destination', 'name']

const showSelect = computed(() => !props.menuView)

const localSelectedDestinations = computed({
    get() {
        return props.selectedDestinations
    },
    set(numbers) {
        emits('update:selectedDestinations', numbers)
    },
})

const localItems = computed(() => localSearch(props.items, removeFirstPlusForSearch(searchValue.value), searchFieldNames))

const displayedItems = computed(() => {
    const startIndex = (dataPagination.page - 1) * onPage.value
    const endIndex = startIndex + onPage.value

    return localItems.value.slice(startIndex, endIndex)
})

function onSearch(search) {
    searchValue.value = search
    localSelectedDestinations.value = []
    setDataPagination()
}

function setDataPagination() {
    setOnPageByName(onPageName, onPage.value)
    dataPagination.page = 1
    dataPagination.total = Math.ceil(localItems.value.length / onPage.value)
}

function openCreateDialog() {
    showCreateDialog.value = true
}

function reloadAvailableDestinations() {
    emits('reloadAvailableDestinations')
}

function selectDestination(destination) {
    emits('selectDestination', destination)
}

function onSelectedFilters(payload) {
    emits('onSelectedFilters', payload)
}

function resetSortFilter() {
    emits('onResetSortFilter')
}

watch(onPage, () => {
    localSelectedDestinations.value = []
    setDataPagination()
})

watch(() => props.items, () => {
    localSelectedDestinations.value = []
    setDataPagination()
}, { immediate: true })
</script>
