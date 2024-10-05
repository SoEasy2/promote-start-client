<template>
    <router-link
        v-if="simpleRote"
        v-bind="$attrs"
        :to="to"
        :key="to.name"
        v-tippy="getTippyContent()"
    >
        <slot></slot>
    </router-link>

    <div
        v-else
        v-bind="$attrs"
        v-tippy="getTippyContent()"
    >
        <slot></slot>
    </div>
</template>

<script setup>
import { computed } from 'vue'

import { useAuthorizationStore } from '@/store/authorizationStore'

import { getTippySidebar } from '@/helpers/tippy-helper'

const props = defineProps({
    simpleRote: {
        type: Boolean,
        default: true,
    },
    mini: {
        type: Boolean,
        default: false,
    },
    route: {
        type: Object,
        required: true,
    },
    classes: {
        type: String,
        default: '',
    },
    styles: {
        type: Object,
        default: () => ({}),
    },
})

const authorizationStore = useAuthorizationStore()

const to = computed(() => ({ name: props.route.routeName }))

function getTippyContent() {
    if (!props.mini) {
        return ''
    }

    return getTippySidebar(props.route.tippy ? props.route.tippy : props.route.name)
}
</script>
