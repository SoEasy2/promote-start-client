<template>
    <div class="p-5 max-mob:px-4 max-mob:pt-4 max-mob:pb-8 w-100 max-mob:w-full gap-y-5 max-mob:gap-y-4 grid bg-white dark:bg-blue-840 border max-mob:border-none border-gray-100 dark:border-blue-720 rounded-1.25">
        <div class="flex justify-between items-center gap-x-4">
            <div class="max-w-20.5 max-mob:max-w-screen-name-filter text-purple-200 dark:text-white text-xs select-none truncate">
                {{ filter.label }}
            </div>

            <div class="w-6 h-6">
                <DeleteIcon
                    class="text-gray-200 hover:text-purple transition-colors cursor-pointer"
                    @click="deleteFilter"
                />
            </div>
        </div>

        <div class="gap-x-5 max-mob:gap-y-3 flex items-center max-mob:flex-col max-mob:items-start">
            <div class="min-w-20.25 text-xs font-medium text-purple-200 dark:text-white">Data Name</div>

            <FormSelect
                v-model="selectKey"
                :loading="loadingCallersKeys"
                :items="callersKeys"
                returnObject
                showCleanIcon
                class="w-64.25 max-mob:w-full"
                @changeValue="onChangeKey"
            />
        </div>

        <div class="gap-x-5 max-mob:gap-y-3 flex items-center max-mob:flex-col max-mob:items-start">
            <div class="min-w-20.25 text-xs font-medium text-purple-200 dark:text-white">Value</div>

            <FormSelect
                v-model="selectValue"
                :loading="loading"
                :items="items"
                returnObject
                showCleanIcon
                class="w-64.25 max-mob:w-full"
            />
        </div>

        <div>
            <PrimaryBtn
                class="w-max ml-auto"
                :disabled="!selectValue.id"
                @click="addCallerProfile"
            >
                Add
            </PrimaryBtn>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

import DeleteIcon from '@/components/icons/DeleteIcon.vue'
import FormSelect from '@/components/selects/FormSelect/FormSelect.vue'
import PrimaryBtn from '@/components/buttons/PrimaryBtn.vue'

import { parseTheFilterData } from '@/helpers/reporting-helper'

import { useReportingStore } from '@/store/call-tracking/reportingStore'

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

const selectKey = ref({})
const selectValue = ref({})

const items = ref([])

const inputValue = computed({
    get() {
        return props.filter.value
    },
    set(value) {
        emits('updateFilter', {
            ...props.filter,
            value,
        })
    },
})

const loading = computed(() => reportingStore.loadingFilterValues)
const loadingCallersKeys = computed(() => reportingStore.loadingCallersKeys)
const filterValues = computed(() => reportingStore.filterValues)
const callersKeys = computed(() => reportingStore.callersKeys)

function setKey() {
    if (!inputValue.value) {
        return
    }

    const { key } = inputValue.value
    const findKey = callersKeys.value.find((item) => item.id === key)

    if (findKey) {
        selectKey.value = findKey
    }
}

function setValue() {
    if (!inputValue.value) {
        return
    }

    const { value } = inputValue.value

    const findValue = items.value.find((item) => item.id === value)

    if (findValue) {
        selectValue.value = findValue
    }
}

function resetSelectValue() {
    selectValue.value = {}
    items.value = []
}

function addCallerProfile() {
    inputValue.value = {
        key: selectKey.value.id,
        value: selectValue.value.id,
    }
}

function onChangeKey(value) {
    resetSelectValue()

    selectKey.value = value

    if (Object.keys(value).length) {
        getFilterValues(value)
    }
}

function deleteFilter() {
    emits('deleteFilter', props.filter.key)
}

async function getFilterValues({ id }) {
    const { success } = await reportingStore.goToLoadCallsFilterValues({
        params: {
            callerKey: id,
            ...props.bodyFetch,
        },
        filter: props.filter.key,
    })

    if (success) {
        items.value = parseTheFilterData(filterValues.value)
        setValue()
    }
}

onMounted(setKey)
</script>
