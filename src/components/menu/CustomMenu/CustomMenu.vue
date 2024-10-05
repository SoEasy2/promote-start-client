<template>
    <div :class="wrapperStyle" ref="activatorRef">
        <slot name="activator"></slot>
    </div>

    <teleport to="body">
        <transition :name="transitionType">
            <div
                v-if="show"
                class="fixed w-screen h-screen inset-0"
                :style="bodyStyle"
                @click.stop="closeMenu"
            >
                <div
                    class="fixed"
                    :class="{ 'inset-0 h-fit ': isMbView && fullScreen }"
                    :style="isMbView && fullScreen ? {} : styles"
                    @click.stop="checkPersistent"
                    @mousedown="mousedown"
                    @mouseup="mouseup"
                >
                    <div
                        class="absolute"
                        :class="[
                            dropDownInset,
                            { 'inset-0 h-fit': isMbView && fullScreen },
                            customClass,
                        ]"
                        :style="isMbView && fullScreen ? {} : slotStyles"
                    >
                        <slot name="dropdown"></slot>
                    </div>
                </div>
            </div>
        </transition>
    </teleport>

    <slot name="dialogs"></slot>
</template>

<script setup>
import {
    ref, watch, reactive, computed, inject,
} from 'vue'

import { viewPorts } from '@/constants/viewPorts'

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false,
    },
    showTimeout: {
        type: Number,
        default: 0,
    },
    persistent: {
        type: Boolean,
        default: false,
    },
    positionsCustom: {
        type: Object,
        default: () => ({}),
    },
    bodyStyle: {
        type: Object,
        default: () => ({
            zIndex: 100,
        }),
    },
    menuOffsetY: {
        type: Number,
        default: 8,
    },
    maxHeight: {
        type: [Number, String],
        default: 300,
    },
    menuWidth: {
        type: [Number, String],
        default: null,
    },
    right: {
        type: Boolean,
        default: false,
    },
    fullScreen: {
        type: Boolean,
        default: false,
    },
    wrapperStyle: {
        type: String,
        default: '',
    },
    hideTransitionSlider: {
        type: Boolean,
        default: false,
    },
    customClass: {
        type: String,
        default: '',
    },
    dropDownInset: {
        type: String,
        default: 'inset-x-0',
    },
})

const emits = defineEmits(['update:modelValue', 'click', 'onClose'])

const currentViewSize = inject('currentViewSize')

const activatorRef = ref(null)
const show = ref(false)
const dontClose = ref(false)

const isRight = ref(props.right)

const slotStyles = reactive({})

const position = reactive({
    x: 0,
    y: 0,
    width: 0,
})

const isMbView = computed(() => viewPorts.mb >= currentViewSize.value)
const isMobView = computed(() => viewPorts.mob === currentViewSize.value)

const styles = computed(() => ({
    top: `${position.y}px`,
    left: isRight.value ? null : `${position.x}px`,
    right: isRight.value ? `${position.x}px` : null,
    width: `${props.menuWidth ? props.menuWidth : position.width}px`,
}))

const transitionType = computed(() => {
    if (!props.hideTransitionSlider && isMobView.value) {
        return props.modelValue ? 'slide-left-filter-mobile' : 'slide-right-filter-mobile'
    }

    return 'show'
})

function closeMenu() {
    if (dontClose.value) {
        dontClose.value = false
    } else {
        emits('update:modelValue', false)
        emits('onClose')
    }
}

function checkPersistent(e) {
    dontClose.value = false

    if (!props.persistent) {
        closeMenu()
    }

    emits('click', e)
}

function showMenu() {
    setTimeout(() => {
        show.value = true

        getPosition()
    }, props.showTimeout)
}

function getPosition() {
    if (props.positionsCustom.x) {
        const { x, y, height } = props.positionsCustom
        position.x = x
        position.y = y + height
        return
    }

    const windowHeight = window.innerHeight
    const windowWidth = window.innerWidth
    const pos = activatorRef.value.getBoundingClientRect()

    const left = (pos.x + props.menuWidth) < windowWidth
    isRight.value = props.right ? true : !left

    position.x = isRight.value ? windowWidth - pos.x - pos.width : pos.x
    position.y = pos.y + pos.height
    position.width = pos.width

    const heightAboveActivator = pos.top - 2 * props.menuOffsetY
    const heightUnderActivator = windowHeight - pos.bottom - 2 * props.menuOffsetY

    slotStyles['max-height'] = `${props.maxHeight}px`

    if (heightUnderActivator > props.maxHeight) {
        slotStyles.bottom = 'unset'
        slotStyles.top = `${props.menuOffsetY}px`

        return
    }

    if (heightAboveActivator > props.maxHeight) {
        slotStyles.top = 'unset'
        slotStyles.bottom = `${pos.height + props.menuOffsetY}px`

        return
    }

    // if (heightUnderActivator > heightAboveActivator) {
    //     slotStyles.bottom = 'unset'
    //     slotStyles.top = `${props.menuOffsetY}px`
    //     slotStyles['max-height'] = heightUnderActivator + 'px'
    // } else {
    slotStyles.top = 'unset'
    slotStyles.top = `${props.menuOffsetY - pos.bottom}px`
    slotStyles['max-height'] = `${heightAboveActivator}px`
    // }
}

function mousedown() {
    dontClose.value = true
}

function mouseup() {
    dontClose.value = false
}

watch(() => props.modelValue, (value) => {
    if (value) {
        showMenu()
    } else {
        show.value = false
    }
}, { immediate: true })

watch(() => props.maxHeight, () => {
    getPosition()
})
</script>
