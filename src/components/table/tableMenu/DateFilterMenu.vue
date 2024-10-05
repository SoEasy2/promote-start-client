<template>
    <CustomMenu v-model="menu" persistent :showTimeout="showTimeout" :menuWidth="300" :maxHeight="478">
        <template #activator>
            <div
                class="max-w-50 h-8 px-2.5 flex items-center cursor-pointer hover:bg-purple-50 dark:hover:bg-purple-800 rounded-custom border hover:border-purple dark:hover:border-purple transition-colors"
                :class="menu ? 'bg-purple-50 dark:bg-purple-800 border-purple' : 'border-gray-100 dark:border-blue-720'"
                @click="menuHandler"
            >
                <div class="pr-1.5 text-gray-370 dark:text-white text-xs select-none truncate">
                    {{ filter.label }}: <span class="text-purple">{{ getFilterPreview }}</span>
                </div>

                <div class="w-2.5">
                    <ArrowSelect class="text-gray-200 dark:text-white"/>
                </div>
            </div>
        </template>

        <template #dropdown>
            <div class="max-mob:fixed max-mob:left-4 w-75 max-mob:w-screen-filter-mob p-4 space-y-4 bg-white dark:bg-blue-840 border border-gray-100 dark:border-blue-720 rounded-custom">
                <div class="flex justify-between items-center space-x-3.5">
                    <div class="flex items-center space-x-3.5 text-purple-200 dark:text-white text-xs select-none truncate">
                        {{ filter.label }}
                    </div>

                    <div class="w-6 h-6">
                        <DeleteIcon
                            class="text-gray-200 hover:text-purple transition-colors cursor-pointer"
                            @click="deleteFilter"
                        />
                    </div>
                </div>

                <FormSelect
                    v-model="currentPreset"
                    :items="presets"
                    itemText="name"
                    itemValue="key"
                    label="Custom Range"
                    returnObject
                    disableSearch
                    isTransparent
                    mini
                    @clickItem="selectPreset"
                />

                <CustomDatePicker
                    :range="range"
                    :timezoneOffset="timezoneOffset"
                    :maxDate="currentDate"
                    @update:range="updateRange"
                    @closeMenu="menuHandler"
                />
            </div>
        </template>
    </CustomMenu>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

import CustomMenu from '@/components/menu/CustomMenu/CustomMenu.vue'
import ArrowSelect from '@/components/icons/ArrowSelect.vue'
import DeleteIcon from '@/components/icons/DeleteIcon.vue'
import FormSelect from '@/components/selects/FormSelect/FormSelect.vue'
import CustomDatePicker from '@/components/pickers/CustomDatePicker.vue'

import { formatDateByTzOffset, getPresets } from '@/helpers/date-helper'
import { useAppStore } from '@/store/appStore'

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
    autoOpen: {
        type: Boolean,
        default: false,
    },
    showTimeout: {
        type: Number,
        default: 0,
    },
    bodyFetch: {
        type: Object,
        default: () => ({}),
    },
})

const emits = defineEmits(['updateFilter', 'deleteFilter'])

const appStore = useAppStore()

const menu = ref(false)

const currentPreset = ref(null)
const range = ref([])

const timezoneOffset = computed(() => appStore.getTimezoneOffsetById(46))
const currentDate = computed(() => formatDateByTzOffset(timezoneOffset.value))
const presets = computed(() => getPresets(timezoneOffset.value))

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

const getFilterPreview = computed(() => currentOption.value.prefix)

function menuHandler() {
    menu.value = !menu.value
}

function selectPreset(preset) {
    if (!preset.hasOwnProperty('range')) {
        return
    }

    const { range } = preset

    updateRange(range)
}

function deleteFilter() {
    emits('deleteFilter', props.filter.key)
}

function updateRange(newRange) {
    range.value = newRange

    menu.value = false
}

function checkPresets(presets) {
    if (currentPreset.value) {
        const rangeForUpdate = currentPreset.value.hasOwnProperty('range')
            ? presets.find((preset) => preset.key === currentPreset.value.key).range
            : range.value

        checkCurrentPreset(rangeForUpdate)

        updateRange(rangeForUpdate)

        return
    }

    currentPreset.value = presets[0]

    updateRange(presets[0].range)
}

function checkCurrentPreset(range) {
    currentPreset.value = presets.value.find((preset) => {
        if (!preset.hasOwnProperty('range')) {
            return true
        }

        return preset.range[0] === range[0] && preset.range[1] === range[1]
    })
}

watch(presets, (presets) => {
    if (!presets && !presets.length) {
        return
    }

    checkPresets(presets)
}, { immediate: true })

watch(() => props.autoOpen, (value) => {
    if (value) {
        menu.value = true
    }
}, { immediate: true })

watch(range, () => {
    inputValue.value = range.value
})
</script>
