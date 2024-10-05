<template>
    <div
        class="group rounded-1.25 transition-all"
        :class="wrapClasses"
        @click.stop="onClick"
    >
        <div
            class="flex items-center h-full w-full"
            :class="{ 'relative': loading }"
        >
            <div
                v-if="loading"
                class="absolute inset-0 flex justify-center items-center"
            >
                <PreLoader :class="outlined ? 'text-purple' : 'text-white'" />
            </div>

            <div
                class="h-7 w-full px-5 flex items-center justify-center text-xs leading-4 whitespace-nowrap select-none transition-colors"
                :class="textClasses"
            >
                <slot name="default"></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

import PreLoader from '@/components/icons/preloaders/PreLoader.vue'

const props = defineProps({
    loading: {
        type: Boolean,
        default: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    outlined: {
        type: Boolean,
        default: false,
    },
    borderOutlinedStyle: {
        type: String,
        default: 'border-purple dark:border-white',
    },
    textOutlinedStyle: {
        type: String,
        default: 'text-purple dark:text-white',
    },
    height: {
        type: String,
        default: 'h-9.5',
    },
})

const emits = defineEmits(['click'])

const wrapClasses = computed(() => {
    let classes = `${props.height}`

    if (props.disabled) {
        return `${classes} bg-gray-360 dark:bg-purple-700`
    }

    if (!props.loading) {
        classes += ' hover:shadow-primaryBtn cursor-pointer'
    }

    classes += ' active:bg-active-gradient'

    if (props.outlined) {
        return [
            'dark:bg-transparent border dark:hover:border-purple dark:hover:bg-purple-800 dark:active:bg-active-gradient dark:active:border-transparent',
            classes,
            props.borderOutlinedStyle,
        ]
    }
    return `${classes} bg-primary-gradient hover:bg-hover-gradient dark:bg-purple dark:hover:bg-purple-450 dark:active:bg-purple-500`
})

const textClasses = computed(() => {
    if (props.loading) {
        return 'opacity-0'
    }

    if (props.outlined && !props.disabled) {
        return [
            props.textOutlinedStyle,
            'dark:group-hover:text-purple group-active:text-white dark:group-active:text-white',
        ]
    }

    return 'text-white'
})

function onClick() {
    if (props.loading || props.disabled) {
        return
    }

    emits('click')
}
</script>
