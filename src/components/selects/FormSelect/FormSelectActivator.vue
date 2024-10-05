<template>
    <div class="relative">
        <div
            class="relative flex justify-between items-center overflow-hidden cursor-pointer"
            :class="styles"
            @click="menuHandler"
        >
            <div
                class="w-full block text-gray-370 dark:text-white truncate"
                :class="[
                   { 'caret-purple': !!modelValue && valid },
                   { 'text-red-700 dark:text-red border-red-700 dark:border-red': !valid },
                ]"
            >
                <input
                    v-if="menu && !disableSearch && !isMobView"
                    v-model="search"
                    ref="selectInput"
                    class="w-full bg-transparent text-gray-370 dark:text-white text-xs"
                    @click.stop
                    @focus="onFocus"
                    @mousedown="inputMouseDown"
                />

                <div
                    v-else
                    class="text-xs whitespace-nowrap truncate overflow-hidden"
                    :class="[
                       getValue !== label ? 'text-gray-370 dark:text-white' : label && 'text-gray-190 dark:text-gray-280',
                       valueClass
                    ]"
                >
                    {{ getValue }}
                </div>
            </div>

            <div
                class="flex items-center"
                :class="[mini ? 'ml-2.5' : 'ml-3']"
            >
                <div
                    v-if="isCleanIcon"
                    class="w-6 h-6 flex justify-between items-center"
                >
                    <CleanIcon
                        class="text-gray-200 dark:text-gray-700 cursor-pointer"
                        @click.stop="cleanValue"
                    />
                </div>

                <ArrowSelect
                    class="w-3 z-20 transform duration-300"
                    :class="menu ? 'rotate-180 text-purple dark:text-white' : 'text-gray-280 dark:text-white'"
                />
            </div>

            <ProgressLine
                class="inset-x-0 bottom-0"
                :loading="loading"
            />
        </div>

        <ErrorBlock :message="message" />

        <div
            class="absolute inset-x-0 min-mob:-bottom-5.5 max-mob:-bottom-5 text-gray-400 text-xs pt-1 transition-all"
            :class="subMessage ? 'translate-y-0' : '-translate-y-1'"
        >
            {{ subMessage }}
        </div>
    </div>
</template>

<script setup>
import { computed, inject, watch } from 'vue'

import ErrorBlock from '@/components/errorBlock/ErrorBlock.vue'
import ArrowSelect from '@/components/icons/ArrowSelect.vue'
import ProgressLine from '@/components/progress/ProgressLine.vue'
import CleanIcon from '@/components/icons/CleanIcon.vue'

import { viewPorts } from '@/constants/viewPorts'

const props = defineProps({
    label: {
        type: String,
        default: '',
    },
    isTransparent: {
        type: Boolean,
        default: false,
    },
    textInput: {
        type: Boolean,
        default: false,
    },
    mini: {
        type: Boolean,
        default: false,
    },
    valid: {
        type: Boolean,
        default: true,
    },
    loading: {
        type: Boolean,
        default: false,
    },
    disableSearch: {
        type: Boolean,
        default: false,
    },
    showCleanIcon: {
        type: Boolean,
        default: false,
    },
    multiple: {
        type: Boolean,
        default: false,
    },
    readonly: {
        type: Boolean,
        default: false,
    },
    modelValue: {
        type: [String, Number, Object, Array],
        default: null,
    },
    defaultClasses: {
        type: String,
        default: 'px-6 max-mob:px-4 h-11.5',
    },
    valueClass: {
        type: [String, Boolean],
        default: 'font-medium',
    },
    itemValue: {
        type: String,
        default: 'id',
    },
    itemText: {
        type: String,
        default: 'name',
    },
    itemTextLabel: {
        type: String,
        default: null,
    },
    prefix: {
        type: String,
        default: '',
    },
    subMessage: {
        type: String,
        default: null,
    },
    returnObject: {
        type: Boolean,
        default: false,
    },
    currentItem: {
        type: [Object, String, Number, Array],
        default: null,
    },
    rules: {
        type: Array,
        default: () => [],
    },
    items: {
        type: Array,
        default: () => [],
    },
    menu: {
        type: Boolean,
        default: false,
    },
})

const emits = defineEmits(['inputMouseDown', 'cleanValue', 'updateValid', 'changeMenu'])

const currentViewSize = inject('currentViewSize')

const search = defineModel('search', { type: String, default: '' })
const selectInput = defineModel('selectInput', { type: Object, default: () => ({}) })

const isMobView = computed(() => viewPorts.mob === currentViewSize.value)

const styles = computed(() => {
    const bg = props.isTransparent ? 'bg-transparent' : 'bg-purple-60 dark:bg-gray-750 '

    return [
        { 'border rounded-1.25 ': !props.textInput },
        { 'border-red-700 dark:border-red bg-red-100 dark:bg-red-900': !props.valid },
        { 'bg-purple-60 dark:bg-gray-750 border-purple': props.menu && props.valid && !props.textInput },
        { 'border-gray-100 dark:border-blue-720 hover:border-purple dark:hover:border-purple': !props.menu && props.valid && !props.textInput },
        !props.menu && props.valid && !props.textInput ? bg : undefined,
        props.textInput ? 'px-2.5 h-4' : props.mini ? 'px-2.5 h-8' : props.defaultClasses,
        props.readonly && 'pointer-events-none',
    ]
})

const getItemTextLabel = computed(() => (props.itemTextLabel ? props.itemTextLabel : props.itemText))

const getValue = computed(() => {
    if (props.returnObject && !props.multiple) {
        return props.modelValue ? props.modelValue[props.itemText] : props.label
    }

    return getName(props.modelValue, props.currentItem)
})

function getName(value) {
    if (!value) {
        return props.label
    }

    if (props.multiple && value?.length) {
        return value.length === 1
            ? props.returnObject ? value[0][props.itemText] : getNameById(value[0])
            : `${value.length} ${props.label}`
    }

    const currentItem = props.items.find((item) => item[props.itemValue] === value)

    if (!currentItem) {
        return props.label
    }

    return `${props.prefix}${currentItem.hasOwnProperty(getItemTextLabel.value) ? currentItem[getItemTextLabel.value] : currentItem}`
}

function getNameById(id) {
    const item = props.items.find((i) => i[props.itemValue] === id)

    return item ? item[props.itemText] : ''
}

const isCleanIcon = computed(() => {
    if (!props.showCleanIcon) {
        return false
    }

    if (props.modelValue === null) {
        return false
    }

    if (typeof props.modelValue === 'object') {
        return !!Object.keys(props.modelValue).length
    }

    return !!props.modelValue
})

const message = computed(() => {
    let message = null

    props.rules.forEach((r) => {
        if (!message) {
            const valid = props.multiple
                ? props.modelValue ? !!props.modelValue.length : props.modelValue
                : props.modelValue
            message = typeof r(valid) !== 'boolean' ? r(valid) : null
        }
    })

    return message
})

function menuHandler() {
    if (props.readonly) {
        return
    }

    emits('changeMenu', !props.menu)
}

function onFocus(event) {
    event.target.select()
}

function cleanValue() {
    emits('cleanValue')
}

function inputMouseDown() {
    emits('inputMouseDown')
}

watch(message, () => {
    emits('updateValid', !message.value)
}, { immediate: true })
</script>
