<template>
    <teleport to="body">
        <transition name="show">
            <div
                v-if="modelValue"
                class="fixed inset-0 flex justify-center "
                :class="[position, backgroundContainer, zIndex]"
                id="custom-dialog-id"
                @click.stop.self="checkPersistentBeforeCloseDialog"
                @scroll.stop.prevent
            >
                <div
                    class="relative flex flex-col overflow-hidden z-110 rounded-1.25  max-mob:rounded-none shadow-customDialog"
                    :class="[width, border, background, height]"
                    ref="containerRef"
                    @mousedown="mousedown"
                    @mouseup="mouseup"
                    @keydown.enter="handlerEnter"
                    tabindex="0"
                >
                    <div
                        v-if="!hideCloseIcon"
                        class="absolute top-7.25 right-7.25 max-mob:top-4 max-mob:right-4 z-110"
                    >
                        <CloseIconMini class="cursor-pointer text-gray-200" @click="closeDialog" />
                    </div>

                    <div
                        v-if="!hideHeader"
                        class="flex-none bg-white dark:bg-blue-840"
                        :class="[headerPadding]"
                    >
                        <div class="pb-4 border-b border-gray-100 dark:border-blue-720">
                            <slot name="header"></slot>
                        </div>
                    </div>

                    <div
                        :class="scrollClass"
                        ref="scrollRef"
                        @scroll="mousedown"
                    >
                        <slot></slot>
                    </div>

                    <slot name="withoutScroll"></slot>

                    <div
                        v-if="!hideFooter"
                        class="flex-none pb-7.5 px-7.5 max-mob:pb-24 max-mob:px-4 bg-white dark:bg-blue-840 z-110"
                    >
                        <div class="pt-4 border-t border-gray-100 dark:border-blue-720">
                            <slot name="footer"></slot>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </teleport>
</template>

<script setup>
import {
    watch, onBeforeUnmount, computed, ref, nextTick,
} from 'vue'

import CloseIconMini from '@/components/icons/CloseIconMini.vue'

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false,
    },
    persistent: {
        type: Boolean,
        default: false,
    },
    fullScreen: {
        type: Boolean,
        default: false,
    },
    hideCloseIcon: {
        type: Boolean,
        default: false,
    },
    hideHeader: {
        type: Boolean,
        default: false,
    },
    hideFooter: {
        type: Boolean,
        default: false,
    },
    width: {
        type: String,
        default: 'max-mob:w-full w-min',
    },
    height: {
        type: String,
        default: 'h-fit max-mob:h-full max-mob:max-h-screen-100 max-h-screen-90',
    },
    position: {
        type: String,
        default: 'items-center',
    },
    border: {
        type: String,
        default: 'border border-gray-100 dark:border-blue-720 max-mob:border-0',
    },
    background: {
        type: String,
        default: 'bg-white dark:bg-blue-840',
    },
    backgroundContainer: {
        type: String,
        default: 'bg-black-900/40 dark:bg-black-900/30',
    },
    scrollClass: {
        type: String,
        default: 'custom-scroll-y',
    },
    headerPadding: {
        type: String,
        default: 'pt-7.5 px-7.5 max-mob:pt-4 max-mob:px-4',
    },
    zIndex: {
        type: String,
        default: 'z-100',
    },
})

const emits = defineEmits(['update:modelValue', 'handlerEnter'])

const bottomScroll = defineModel('bottomScroll', { type: Boolean, default: false })

const dontClose = ref(false)

const containerRef = ref(null)
const scrollRef = ref(null)

const show = computed(() => props.modelValue)

function mousedown() {
    dontClose.value = true
}

function mouseup() {
    dontClose.value = false
}

function checkPersistentBeforeCloseDialog() {
    if (dontClose.value) {
        dontClose.value = false
        return
    }

    if (props.persistent) {
        return
    }

    closeDialog()
}

function closeDialog() {
    emits('update:modelValue', false)
}

function stopScroll(value) {
    if (value) {
        document.documentElement.style.overflow = 'hidden'
    } else {
        document.documentElement.style.overflow = 'auto'
    }
}

function onScrollToBottom() {
    if (!scrollRef.value) {
        return
    }

    const { scrollHeight, clientHeight } = scrollRef.value

    scrollRef.value.scrollTop = scrollHeight - clientHeight
}

function handlerEnter() {
    emits('handlerEnter')
}

function setFocus() {
    containerRef.value.focus()
}

watch(bottomScroll, (bottom) => {
    if (bottom) {
        onScrollToBottom()
        bottomScroll.value = false
    }
})

watch(show, (value) => {
    if (value) {
        stopScroll(value)

        nextTick(() => {
            setFocus()
        })
    }
})

onBeforeUnmount(() => {
    stopScroll(false)
})
</script>
