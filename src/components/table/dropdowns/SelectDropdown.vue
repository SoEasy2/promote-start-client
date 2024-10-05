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
            <FormSelect
                v-model="inputValue"
                :items="items"
                returnObject
                showCleanIcon
            />
        </div>
    </div>
</template>

<script setup>
import {
    computed, ref, watch,
} from 'vue'

import FormSelect from '@/components/selects/FormSelect/FormSelect.vue'
import DeleteIcon from '@/components/icons/DeleteIcon.vue'


import { FILTER_SELECT_RULES_WITH_EMPTY, FILTER_SELECT_RULES } from '@/constants/filterRules'

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
    autoFocus: {
        type: Boolean,
        default: false,
    },
    bodyFetch: {
        type: Object,
        default: () => ({}),
    },
    keysForFilterListEmpty: {
        type: Array,
        default: () => [],
    },
})

const emits = defineEmits(['updateFilter', 'deleteFilter'])

const items = ref([])

const filterList = computed(() => (props.keysForFilterListEmpty.includes(props.filter.key) ? FILTER_SELECT_RULES_WITH_EMPTY : FILTER_SELECT_RULES))

const showList = computed(() => {
    if (currentOption.value) {
        return !currentOption.value.onlyPrefix
    }

    return true
})

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

function deleteFilter() {
    emits('deleteFilter', props.filter.key)
}


watch(showList, (value) => {
    if (!value) {
        inputValue.value = ''
    }
})

</script>
