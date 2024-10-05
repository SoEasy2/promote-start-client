<template>
    <div
        class="w-3.5 h-3.5 flex items-center justify-center border rounded-0.75 cursor-pointer transition-all"
        :class="wrapClass"
        @click="onChangeCheck"
    >
        <CheckerIcon
            v-if="checked"
            class="transition-opacity"
            :class="disabled ? 'text-white dark:text-gray-200' : 'text-white'"
        />
    </div>
</template>

<script setup>

import { computed } from 'vue'
import CheckerIcon from '@/components/icons/theme/CheckerIcon.vue'

const props = defineProps({
    checked: {
        type: Boolean,
        default: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    hidden: {
        type: Boolean,
        default: false,
    },
})

const emits = defineEmits(['update:checked', 'onChangeCheck'])

const isCheck = computed({
    get() {
        return props.checked
    },
    set(data) {
        emits('update:checked', data)
        emits('onChangeCheck', data)
    },
})

function onChangeCheck() {
    isCheck.value = !isCheck.value
}

const wrapClass = computed(() => {
    if (props.disabled) {
        return 'border-gray-200 bg-gray-200 dark:border-gray-370 dark:bg-gray-370 opacity-50 dark:opacity-30'
    }

    const classes = []

    if (props.hidden && !props.checked) {
        classes.push('min-mb:opacity-0 min-mb:group-hover/row:opacity-100')
    }

    if (props.checked) {
        classes.push('border-purple bg-purple')
    } else {
        classes.push('border-gray-200')
    }

    return classes.join(' ')
})
</script>
