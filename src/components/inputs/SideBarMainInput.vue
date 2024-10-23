<template>
    <div
        class="group h-11.5 py-2 flex items-center transition-all overflow-hidden"
        :class="classes"
        @mousedown="mousedown"
        @mouseup="mouseup"
        @click="onEditField"
        v-click-outside="onReadonlyField"
    >
        <slot name="icon-left"></slot>

        <div
            v-if="countryCode"
            class="flex items-center justify-center -translate-y-1 mr-2.5"
        >
            <CountryFlag
                class="rounded-0.5"
                :country="countryCode"
            />
        </div>

        <div
            v-if="readonly"
            class="min-w-10 bg-transparent whitespace-nowrap truncate"
            :class="[
                countryCode ? 'max-w-157.5' : 'max-w-166.5',
                inputValue ? 'text-purple-200 dark:text-white' : 'text-gray-200',
                fontSize
            ]"
        >
            {{ getLabel }}
        </div>

        <input
            v-else
            class="min-w-10 w-full text-purple-200 dark:text-white bg-transparent whitespace-nowrap overflow-hidden"
            :class="[
                countryCode ? 'max-w-162' : 'max-w-171',
                fontSize
            ]"
            :value="inputValue"
            ref="inputRef"
            @input="onInput"
            @keydown.enter.stop="onReadonlyField"
            @blur="onBlurInput"
        />

        <div
            v-if="!onlyRead"
            class="w-6"
        >
            <PencilIcon
                v-if="readonly && !loading"
                class="text-gray-200"
            />
        </div>

        <div class="pl-2">
            <slot
                v-if="readonly && !loading"
                name="icon"
            >
            </slot>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

import PencilIcon from '@/components/icons/PencilIcon.vue'

const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
    countryCode: {
        type: [String, Number],
        default: null,
    },
    loading: {
        type: Boolean,
        default: false,
    },
    fontSize: {
        type: String,
        default: 'text-xxl',
    },
    placeholder: {
        type: String,
        default: 'TYPE NAME',
    },
    emptyEnabled: {
        type: Boolean,
        default: false,
    },
    autoFocus: {
        type: Boolean,
        default: false,
    },
    onlyRead: {
        type: Boolean,
        default: false,
    },
    enabledBlurInput: {
        type: Boolean,
        default: false,
    },
})

const emits = defineEmits(['update:modelValue', 'onBlur', 'update:autoFocus'])

const inputValue = ref(' ')

const inputRef = ref(null)
const readonly = ref(true)
const dontClose = ref(false)

const getLabel = computed(() => {
    if (props.loading) {
        return ''
    }

    if (inputValue.value) {
        return inputValue.value
    }

    return props.placeholder
})

const classes = computed(() => {
    if (props.loading) {
        return 'animate-pulse w-100 rounded-custom max-mob:rounded-none border-purple dark:border-purple bg-purple-60 dark:bg-gray-780'
    }

    if (!readonly.value) {
        return 'w-full px-2 rounded-custom max-mob:rounded-none border-purple dark:border-purple bg-purple-60 dark:bg-gray-780'
    }

    return [
        'w-full',
        { 'cursor-pointer': !props.onlyRead },
    ]
})

function onInput({ target }) {
    inputValue.value = target.value
}

function onReadonlyField() {
    if (dontClose.value) {
        dontClose.value = false

        return
    }

    readonly.value = true

    if (props.loading) {
        return
    }

    if (props.modelValue === inputValue.value) {
        return
    }

    if (!props.emptyEnabled && !inputValue.value) {
        inputValue.value = props.modelValue

        return
    }

    emits('update:modelValue', inputValue.value)
    emits('onBlur')
}

function onBlurInput() {
    if (props.enabledBlurInput) {
        onReadonlyField()
    }
}

function onEditField() {
    if (props.onlyRead) {
        return
    }

    if (readonly.value) {
        setFocus()
    }

    readonly.value = false
}

function mousedown() {
    dontClose.value = true
}

function mouseup() {
    dontClose.value = false
}

function setFocus() {
    if (!inputValue.value) {
        setTimeout(() => {
            inputRef.value.focus()
        })
    }

    setTimeout(() => {
        inputRef.value.focus()
    }, 100)
}

function autoOpenInput() {
    emits('update:autoFocus', false)

    setTimeout(() => {
        onEditField()
    })
}

watch(() => props.modelValue, (value) => {
    inputValue.value = value

    if (inputRef.value) {
        inputRef.value.value = value
    }
}, { immediate: true })

watch(() => ({ autoFocus: props.autoFocus, value: props.modelValue }), ({ autoFocus, value }) => {
    if (autoFocus && value) {
        autoOpenInput()
    }
}, { immediate: true })
</script>
