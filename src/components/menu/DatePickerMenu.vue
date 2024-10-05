<template>
    <div :class="$attrs.classes">
        <CustomMenu
            v-model="menu"
            :maxHeight="maxHeight"
            :menuWidth="menuWidth"
            :fullScreen="isMobView"
            persistent
        >
            <template #activator>
                <div
                    class="px-4 max-mob:px-3 border rounded-1.25 transition-all cursor-pointer"
                    :class="[
                        isError ? 'border-red-730' : 'border-gray-100 dark:border-blue-720',
                        activatorClass
                    ]"
                    @click.stop="menuHandler"
                >
                    <div class="flex items-center justify-between h-full">
                        <div class="text-xs font-medium whitespace-nowrap select-none text-gray-370 dark:text-white truncate">
                            <slot name="default">
                                {{ getRange }}
                            </slot>
                        </div>

                        <ArrowSelect
                            class="w-3 transition-transform"
                            :class="[
                                { 'rotate-180': menu },
                                isError ? 'text-red-730' : 'text-gray-280 dark:text-white ',
                            ]"
                        />
                    </div>
                </div>
            </template>

            <template #dropdown>
                <div class="max-mob:h-screen max-mob:w-screen bg-white dark:bg-blue-750 border max-mob:border-none border-gray-100 dark:border-gray-700 rounded-1.25">
                    <CustomMenuHeaderMobile
                        v-if="isMobView"
                        disableSearch
                        @closeMenu="closeMenu"
                    />

                    <div class="p-5 max-mob:px-4 max-mob:pb-4 max-mob:pt-0 grid gap-y-5 max-mob:gap-y-4">
                        <FormSelect
                            v-model="currentPreset"
                            :items="presets"
                            itemText="name"
                            itemValue="key"
                            :label="labelPreset"
                            returnObject
                            disableSearch
                            mini
                            typeWithoutArrow
                            backArrowTitle="value"
                            @clickItem="selectPreset"
                        />

                        <CustomDatePicker
                            :range="currentRange"
                            :timezoneOffset="timezoneOffset"
                            :maxDate="maxDateLocal"
                            :minDate="minDate"
                            :isRangePicker="isRangePicker"
                            @update:range="updateRange"
                            @closeMenu="menuHandler"
                        />
                    </div>
                </div>
            </template>
        </CustomMenu>
    </div>
</template>

<script setup>
import {
    ref, computed, watch, inject,
} from 'vue'

import ArrowSelect from '@/components/icons/ArrowSelect.vue'
import CustomMenu from '@/components/menu/CustomMenu/CustomMenu.vue'
import FormSelect from '@/components/selects/FormSelect/FormSelect.vue'
import CustomDatePicker from '@/components/pickers/CustomDatePicker.vue'
import CustomMenuHeaderMobile from '@/components/menu/CustomMenu/CustomMenuHeaderMobile.vue'

import { getPresets, formatDateByTzOffset } from '@/helpers/date-helper'

import { viewPorts } from '@/constants/viewPorts'
import { useAppStore } from '@/store/appStore'

const props = defineProps({
    range: {
        type: Array,
        default: () => [],
    },
    loading: {
        type: Boolean,
        default: false,
    },
    isRangePicker: {
        type: Boolean,
        default: true,
    },
    timezoneId: {
        type: [String, Number],
        default: 46,
    },
    menuWidth: {
        type: [Number, String],
        default: 286,
    },
    maxHeight: {
        type: [Number, String],
        default: 408,
    },
    activatorClass: {
        type: String,
        default: 'h-11.5 max-mob:h-9',
    },
    minDate: {
        type: [String, Date],
        default: '1970',
    },
    maxDate: {
        type: [String, Date],
        default: null,
    },
    isMaxDate: {
        type: Boolean,
        default: false,
    },
    isError: {
        type: Boolean,
        default: false,
    },
    labelPreset: {
        type: String,
        default: 'Custom Range',
    },
    presetType: {
        type: String,
        default: '',
    },
})

const emits = defineEmits(['click', 'update:range'])

const currentViewSize = inject('currentViewSize')

const appStore = useAppStore()

const menu = ref(false)
const currentPreset = ref(null)

const timezoneOffset = computed(() => appStore.getTimezoneOffsetById(props.timezoneId))
const isMobView = computed(() => viewPorts.mob >= currentViewSize.value)

const defaultRange = ref([
    formatDateByTzOffset(timezoneOffset.value),
    formatDateByTzOffset(timezoneOffset.value),
])

const currentDate = computed(() => formatDateByTzOffset(timezoneOffset.value))

const maxDateLocal = computed(() => (props.isMaxDate ? props.maxDate : currentDate.value))

const presets = computed(() => getPresets(timezoneOffset.value, props.presetType))

const currentRange = computed({
    get() {
        return props.range
    },
    set(range) {
        emits('update:range', range)
    },
})

const getRange = computed(() => {
    if (props.isRangePicker) {
        return props.range.length ? `${props.range[0]} ~ ${props.range[1]}` : `${defaultRange.value[0]} ~ ${defaultRange.value[1]}`
    }

    return props.range.length ? props.range[1] : defaultRange.value[1]
})

function menuHandler() {
    menu.value = !menu.value
}

function closeMenu() {
    menu.value = false
}

function selectPreset(preset) {
    if (!preset.hasOwnProperty('range')) {
        return
    }

    const { range } = preset

    updateRange(range)
}

function updateRange(range) {
    setUpdatedRange(range)
}

function setUpdatedRange(range) {
    currentRange.value = range

    closeMenu()
}

function checkPresets(presets) {
    if (currentPreset.value) {
        const rangeForUpdate = currentPreset.value.hasOwnProperty('range')
            ? presets.find((preset) => preset.key === currentPreset.value.key).range
            : currentRange.value

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
})

watch(currentRange, (range) => {
    checkCurrentPreset(range)
})

watch(menu, (menu) => {
    if (menu) {
        checkCurrentPreset(currentRange.value)
    }
})
</script>
