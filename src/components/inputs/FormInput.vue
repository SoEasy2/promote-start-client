<template>
    <div
        class="relative"
        :class="$attrs.classes"
    >
        <div
            class="relative flex items-center border rounded-1.25 w-full transition-colors overflow-hidden"
            :class="styles"
        >
            <div
                class="flex justify-between items-center w-full"
                :class="[ mini ? 'px-2.5' : 'px-5' ]"
            >
                <div
                    v-if="prefix"
                    class="mr-1 text-xs"
                    :class="color"
                >
                    {{ prefix }}
                </div>

                <input
                    ref="inputRef"
                    class="leading-5 w-full text-xs transition-colors bg-transparent dark:placeholder:text-gray-280"
                    :class="[
                        disabled ? 'placeholder:text-gray-100' : 'placeholder:text-gray-280',
                        disabled ? 'text-gray-100 dark:text-gray-280' : color,
                        mini ? 'py-1.25' : 'py-3 font-medium',
                    ]"
                    v-bind="inputAttrs"
                    :value="inputValue"
                    :disabled="disabled"
                    :readonly="readonly"
                    :type="inputType"
                    :autocomplete="autocomplete"
                    @focus="focusInput"
                    @blur="blurInput"
                    @input="onInput"
                    @keypress="checkIsOnlyNumbers"
                />

                <div
                    v-if="showCleanIcon"
                    class="flex justify-between items-center ml-3"
                >
                    <CleanIcon
                        class="text-gray-200 dark:text-gray-700 cursor-pointer"
                        @click="cleanValue"
                    />
                </div>

                <div
                    v-if="isPasswordType"
                    class="flex justify-between items-center ml-3 h-6 w-6"
                    @click="setFocusOnInput"
                >
                    <HideIcon
                        class="text-gray-200 hover:text-purple dark:hover:text-purple cursor-pointer"
                        @mouseover="hideIconOnFocus"
                        @mouseleave="hideIconOnBlur"
                    />
                </div>
            </div>

            <ProgressLine
                class="inset-x-0"
                :loading="loading"
            />
        </div>

        <ErrorBlock :message="message"/>
    </div>
</template>

<script setup>
import {
    ref, computed, useAttrs, watch,
} from 'vue'

import CleanIcon from '@/components/icons/CleanIcon.vue'
import HideIcon from '@/components/icons/HideIcon.vue'
import ProgressLine from '@/components/progress/ProgressLine.vue'
import ErrorBlock from '@/components/errorBlock/ErrorBlock.vue'

import { onlyNumbers } from '@/helpers/app-helper'

const props = defineProps({
    modelValue: {
        type: [String, Number],
        default: '',
    },
    valid: {
        type: Boolean,
        default: true,
    },
    rules: {
        type: Array,
        default: () => [],
    },
    loading: {
        type: Boolean,
        default: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    readonly: {
        type: Boolean,
        default: false,
    },
    showCleanIcon: {
        type: Boolean,
        default: false,
    },
    prefix: {
        type: String,
        default: '',
    },
    color: {
        type: String,
        default: 'text-gray-370 dark:text-white',
    },
    autoFocus: {
        type: Boolean,
        default: false,
    },
    mini: {
        type: Boolean,
        default: false,
    },
    inputTimeout: {
        type: Number,
        default: 0,
    },
    type: {
        type: String,
        default: 'text',
    },
    autocomplete: {
        type: String,
        default: '',
    },
    numberInput: {
        type: Boolean,
        default: false,
    },
    setTimeoutAutoFocus: {
        type: Number,
        default: 0,
    },
})

const emits = defineEmits(['update:modelValue', 'update:valid', 'onBlur'])

const attrs = useAttrs()

const inputRef = ref(null)

const isFocus = ref(false)

const notChanged = ref(true)
const oldValue = ref(null)

const emptySearch = ref(true)

const hideIconFocused = ref(false)

const inputAttrs = computed(() => ({ ...attrs, class: {} }))

const inputValue = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emits('update:modelValue', value)
    },
})

const isPasswordType = computed(() => props.type === 'password')

const inputType = computed(() => {
    if (isPasswordType.value) {
        return hideIconFocused.value ? 'text' : 'password'
    }
    return props.type
})

const message = computed(() => {
    let message = null

    props.rules.forEach((r) => {
        if (!message) {
            message = typeof r(props.modelValue) !== 'boolean' ? r(props.modelValue) : null
        }
    })

    return message
})

const styles = computed(() => {
    if (props.disabled) {
        return 'pointer-events-none border-gray-100 dark:border-gray-700 bg-transparent'
    }

    return [
        { 'border-red-700 dark:border-red bg-red-100 dark:bg-red-900': !props.valid },
        { 'border-purple dark:border-purple bg-purple-60 dark:bg-gray-780': isFocus.value && props.valid },
        { 'bg-purple-60 dark:bg-gray-750 border-gray-100 dark:border-gray-700 hover:border-purple dark:hover:border-purple': props.valid && !isFocus.value },
        { 'pointer-events-none': props.readonly },
    ]
})

let serverSearchInterval = null

function checkIsOnlyNumbers(event) {
    if (props.numberInput) {
        onlyNumbers(event)
    }
}

function hideIconOnFocus() {
    hideIconFocused.value = true
}
function hideIconOnBlur() {
    hideIconFocused.value = false
}

function serverSearch(value) {
    if (!emptySearch.value || value && value.length) {
        emptySearch.value = !value

        clearInterval(serverSearchInterval)

        serverSearchInterval = setInterval(() => {
            clearInterval(serverSearchInterval)
            inputValue.value = value
        }, props.inputTimeout)
    }
}

function onInput({ target }) {
    const value = target.value.trim()

    if (props.inputTimeout) {
        serverSearch(value)
    } else {
        inputValue.value = value
    }
}

function focusInput() {
    isFocus.value = true
}

function blurInput() {
    isFocus.value = false

    if (oldValue.value !== inputValue.value) {
        emits('onBlur')

        oldValue.value = inputValue.value
    }
}

function cleanValue() {
    inputValue.value = ''
}

function setFocusOnInput() {
    setTimeout(() => {
        inputRef.value.focus()
    }, props.setTimeoutAutoFocus)
}

watch(inputValue, (value, old) => {
    emits('update:valid', !message.value)

    if (notChanged.value) {
        notChanged.value = false
        oldValue.value = value
    } else {
        oldValue.value = old
    }
})

watch(message, () => {
    emits('update:valid', !message.value)
}, { immediate: true })

watch(() => props.loading, (loading) => {
    if (loading) {
        notChanged.value = true
    }
})

watch(() => props.autoFocus + inputRef.value, () => {
    if (props.autoFocus && inputRef.value) {
        setFocusOnInput()
    }
}, { immediate: true })
</script>
