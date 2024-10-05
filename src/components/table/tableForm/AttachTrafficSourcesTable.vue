<template>
    <div>
        <CustomTableControls
            :headerType="headerType"
            :controlsParams="controlsParams"
            :selectedFilters="selectedFilters"
            :showMultipleActions="false"
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
                        Create Traffic Source
                    </PrimaryBtn>
                </div>
            </template>

            <template #dialogs>
                <CreateTrafficSourceDialog
                    v-model="showCreateDialog"
                    withCreateCustom
                    @createdSuccessfully="reloadAvailableTrafficSources"
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
                v-model:page="dataPagination.page"
                :total="dataPagination.total"
                selectCheckboxByClickRow
                mainBg="bg-white dark:bg-blue-840"
            >
                <template #item.name="{ item }">
                    <div class="max-w-85 truncate">
                        {{ item.name }}
                    </div>
                </template>

                <template #item.integration="{ item }">
                    <div
                        v-if="item.integration"
                        class="gap-x-1 flex items-center"
                    >
                        <component :is="getIntegrationIcon(item).icon()"/> {{ getIntegrationName(item) }}
                    </div>

                    <div v-else>
                        -//-
                    </div>
                </template>

                <template #item.event="{ item }">
                    {{ item.event ? item.event.name : '-//-' }}
                </template>

                <template #item.actions="{ item }">
                    <div class="flex justify-center space-x-1.5">
                        <TableButton
                            class="w-19.5"
                            @click="selectTrafficSource(item)"
                        >
                            Add
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
import CreateTrafficSourceDialog from '@/views/call-tracking/traffic-sources/components/dialogs/CreateTrafficSourceDialog.vue'

import { localSearch } from '@/helpers/app-helper'
import { getOnPageByName, setOnPageByName } from '@/helpers/on-page-helper'
import { findIntegrationById } from '@/helpers/integration-hepler'

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

const emits = defineEmits(['selectTrafficSource', 'onSelectedFilters', 'onResetSortFilter', 'reloadAvailableDestinations'])

const dataPagination = reactive({
    page: 1,
    total: 1,
})

const searchValue = ref('')

const showCreateDialog = ref(false)

const onPageName = 'addTrafficSource'

const onPage = ref(getOnPageByName(onPageName))

const searchFieldNames = ['name']

const localItems = computed(() => localSearch(props.items, searchValue.value, searchFieldNames))

const displayedItems = computed(() => {
    const startIndex = (dataPagination.page - 1) * onPage.value
    const endIndex = startIndex + onPage.value

    return localItems.value.slice(startIndex, endIndex)
})

function onSearch(search) {
    searchValue.value = search
    setDataPagination()
}

function setDataPagination() {
    setOnPageByName(onPageName, onPage.value)
    dataPagination.page = 1
    dataPagination.total = Math.ceil(localItems.value.length / onPage.value)
}

function getIntegrationIcon({ integration = {} }) {
    const { type_id } = integration
    return findIntegrationById(type_id)
}

function getIntegrationName({ integration = {} }) {
    const { type = {} } = integration
    const { name } = type
    return name
}

function openCreateDialog() {
    showCreateDialog.value = true
}

function reloadAvailableTrafficSources() {
    emits('reloadAvailableTrafficSources')
}

function selectTrafficSource(trafficSource) {
    emits('selectTrafficSource', trafficSource)
}

function onSelectedFilters(payload) {
    emits('onSelectedFilters', payload)
}

function resetSortFilter() {
    emits('onResetSortFilter')
}

watch(onPage, () => {
    setDataPagination()
})

watch(() => props.items, () => {
    setDataPagination()
}, { immediate: true })
</script>
