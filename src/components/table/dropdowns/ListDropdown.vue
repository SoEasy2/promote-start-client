<template>
    <div class="filter">
        <div class="px-5 max-mob:px-4 gap-x-4 flex justify-between items-center">
            <div class="gap-x-3 flex items-center">
                <div class="max-w-20.5 max-mob:max-w-screen-name-filter text-purple-200 dark:text-white text-xs select-none truncate">
                    {{ filter.label }}
                </div>

                <FormSelect
                    v-model="currentOption"
                    :items="filterList"
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

        <div
            v-if="showList"
            class="px-5 max-mob:px-4"
        >
            <InputSearch
                v-model:searchValue="searchValue"
                customClass="px-3 h-9 border border-gray-100 dark:border-blue-720 rounded-custom"
            />
        </div>

        <SelectList
            v-if="filter.values.length && showList"
            :filter="filter"
            :searchValue="searchValue"
            class="px-5 max-mob:px-4"
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
import { computed, ref, watch } from 'vue'

import FormSelect from '@/components/selects/FormSelect/FormSelect.vue'
import SelectList from '@/components/lists/SelectList.vue'
import InputSearch from '@/components/inputs/InputSearch.vue'
import DeleteIcon from '@/components/icons/DeleteIcon.vue'

import { FILTER_LIST_RULES, FILTER_LIST_RULES_WITH_EMPTY } from '@/constants/filterRules'

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
    keysForFilterListEmpty: {
        type: Array,
        default: () => [],
    },
})

const emits = defineEmits(['updateFilter', 'deleteFilter'])

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

const filterList = computed(() => (props.keysForFilterListEmpty.includes(props.filter.key) ? FILTER_LIST_RULES_WITH_EMPTY : FILTER_LIST_RULES))

function deleteFilter() {
    emits('deleteFilter', props.filter.key)
}

watch(showList, (value) => {
    if (!value) {
        emits('updateFilter', { ...props.filter, value: [] })
    }
})
</script>
