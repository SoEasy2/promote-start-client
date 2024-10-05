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

        <FormInput
            v-if="showInput"
            class="px-5 max-mob:px-4"
            v-model="inputValue"
            :showCleanIcon="!!inputValue"
            :prefix="currentOption.label"
        />
    </div>
</template>

<script setup>
import { computed, watch } from 'vue'

import FormSelect from '@/components/selects/FormSelect/FormSelect.vue'
import DeleteIcon from '@/components/icons/DeleteIcon.vue'
import FormInput from '@/components/inputs/FormInput.vue'

import { FILTER_NUMBER_RULES, FILTER_NUMBER_RULES_WITH_EMPTY } from '@/constants/filterRules'

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
    keysForFilterStringEmpty: {
        type: Array,
        default: () => [],
    },
})

const emits = defineEmits(['updateFilter', 'deleteFilter'])

const filterList = computed(() => (props.keysForFilterStringEmpty.includes(props.filter.key) ? FILTER_NUMBER_RULES_WITH_EMPTY : FILTER_NUMBER_RULES))

const showInput = computed(() => {
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

watch(showInput, (value) => {
    if (!value) {
        inputValue.value = ''
    }
})
</script>
