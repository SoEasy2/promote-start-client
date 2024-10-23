<template>
    <div
        class="h-full w-full max-mob:px-0 px-4 max-mob:pt-0 pt-7.5 pb-24 transition-all custom-scroll"
        v-touch:swipe.top="swipeTop"
        v-touch:swipe.bottom="swipeBottom"
        v-esc="goBack"
    >
        <div class="relative max-w-232 mx-auto w-full">
            <SkeletonView v-if="loading" />

            <div v-else>
                <div class="max-mob:py-4 pb-7.5">

                    <div
                        class="flex w-fit items-center text-xs max-mob:px-4 font-medium text-purple dark:text-gray-200 dark:hover:text-purple cursor-pointer transition-colors"
                        @click="goBack"
                    >
                        <ArrowRightLongIcon class="rotate-180" />

                        {{ title }}
                    </div>
                </div>

                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
import { inject, computed } from 'vue'

import ArrowRightLongIcon from '@/components/icons/arrow/ArrowRightLongIcon.vue'
import SkeletonView from '@/components/skeletonBlock/SkeletonView.vue'

import { useBreadCrumbsStore } from '@/store/breadCrumbsStore'

import { viewPorts } from '@/constants/viewPorts'

const props = defineProps({
    title: {
        type: String,
        default: '',
    },
    confirmation: {
        type: Boolean,
        default: false,
    },
    loading: {
        type: Boolean,
        default: false,
    },
})

const emits = defineEmits(['goBack', 'openConfirmationDialog'])

const breadCrumbsStore = useBreadCrumbsStore()

const currentViewSize = inject('currentViewSize')

const isMbView = computed(() => viewPorts.mb >= currentViewSize.value)

function swipeTop() {
    if (isMbView.value) {
        breadCrumbsStore.changeShowMobileBC(false)
    }
}
function swipeBottom() {
    if (isMbView.value) {
        breadCrumbsStore.changeShowMobileBC(true)
    }
}

function goBack() {
    if (props.confirmation) {
        emits('openConfirmationDialog')
    } else {
        emits('goBack')
    }
}
</script>
