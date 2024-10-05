<template>
    <div class="filter">
        <div class="px-5 max-mob:px-4 gap-x-4 flex justify-between items-center">
            <div class="gap-x-3 flex items-center">
                <div class="max-w-20.5 max-mob:max-w-screen-name-filter text-purple-200 dark:text-white text-xs select-none truncate">
                    {{ filter.label }}
                </div>

                <FormSelect
                    v-model="currentOption"
                    :items="FILTER_TAGS_RULES"
                    class="w-38"
                    :menuWidth="152"
                    itemText="label"
                    itemValue="key"
                    returnObject
                    mini
                    disableSearch
                    isTransparent
                    typeWithoutArrow
                    backArrowTitle="Value"
                />
            </div>

            <div class="w-6 h-6">
                <DeleteIcon
                    class="text-gray-200 hover:text-purple transition-colors cursor-pointer"
                    @click="deleteFilter"
                />
            </div>
        </div>

        <div class="px-5 max-mob:px-4">
            <InputSearch
                v-model:searchValue="searchValue"
                customClass="px-3 h-9 border border-gray-100 dark:border-blue-720 rounded-custom"
            />
        </div>

        <TagsList
            v-if="localItems.length && showList"
            :items="localItems"
            :activeItems="activeItems"
            class="px-5 max-mob:px-4"
            @changeSelectedItem="changeSelectedItem"
        />

        <div
            v-else-if="showList"
            class="px-5 max-mob:px-4 text-purple-200 dark:text-white text-xs"
        >
            No data available
        </div>
    </div>
</template>

<script setup>
import {
    computed, onMounted, ref, watch,
} from 'vue'

import FormSelect from '@/components/selects/FormSelect/FormSelect.vue'
import InputSearch from '@/components/inputs/InputSearch.vue'
import DeleteIcon from '@/components/icons/DeleteIcon.vue'

import { localSearch } from '@/helpers/app-helper'

import { useReportingStore } from '@/store/call-tracking/reportingStore'

import { FILTER_TAGS_RULES } from '@/constants/filterRules'

const props = defineProps({
    filter: {
        type: Object,
        default: () => ({
            key: '',
            label: '',
            type: '',
            value: '',
            rule: null,
            values: [],
        }),
    },
    bodyFetch: {
        type: Object,
        default: () => ({}),
    },
})

const emits = defineEmits(['updateFilter', 'deleteFilter'])

const reportingStore = useReportingStore()

const searchValue = ref(null)

const showList = computed(() => {
    if (currentOption.value) {
        return !currentOption.value.onlyPrefix
    }

    return true
})

const currentOption = computed({
    get() {
        return props.filter.rule
    },
    set(rule) {
        emits('updateFilter', {
            ...props.filter,
            rule,
        })
    },
})

const localItems = computed(() => localSearch(reportingStore.filterValues, searchValue.value, ['name']))

const activeItems = computed(() => {
    const { value = [] } = props.filter
    return value || []
})

const tagValue = computed({
    get() {
        return activeItems.value
    },
    set(value) {
        emits('updateFilter', {
            ...props.filter,
            value,
        })
    },
})

function changeSelectedItem(item) {
    if (!tagValue.value) {
        tagValue.value = [item.slug]
        return
    }

    const findItem = tagValue.value.find((el) => el === item.slug)

    if (findItem === undefined) {
        tagValue.value = [...tagValue.value, item.slug]
    } else {
        tagValue.value = tagValue.value.filter((el) => el !== findItem)
    }
}

function deleteFilter() {
    emits('deleteFilter', props.filter.key)
}

function getFilterValues() {
    reportingStore.goToLoadCallsFilterValues({
        params: props.bodyFetch,
        filter: props.filter.key,
    })
}

watch(showList, (value) => {
    if (!value) {
        emits('updateFilter', { ...props.filter, value: [] })
    }
})

onMounted(getFilterValues)
</script>
