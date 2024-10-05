<template>
    <div
        class="flex items-center gap-x-3 py-1 transition-all"
        :class="[
            wrapperSubMenu,
            route.isOpenSub ? 'opacity-1 h-8': 'opacity-0 h-0 -z-10 relative pointer-events-none',
        ]"
        v-for="(sub, index) in route.subMenu"
        :key="sub.name"
    >
        <div class="h-6 relative">
            <LineCircleIcon
                v-if="index === 0"
                class="text-gray-100 dark:text-blue-720 absolute -top-1.5"
            />

            <LineCircleLongIcon
                v-else
                class="text-gray-100 dark:text-blue-720 absolute -top-8.25"
            />
        </div>

        <router-link
            :to="{ name: sub.routeName }"
            class="w-full py-2 px-3 mr-2 font-medium text-xs rounded-custom whitespace-nowrap transition-colors"
            :class="[
                checkCurrentLink(sub) ? 'text-purple dark:text-purple-140' : 'text-gray-370 dark:text-white hover:text-gray-600 hover:bg-menu-purple70 dark:hover:bg-menu-blue770'
            ]"
            @click.stop="onLinkCLick"
        >
            {{ t(sub.name) }}
        </router-link>
    </div>
</template>

<script setup>
import LineCircleIcon from '@/components/icons/LineCircleIcon.vue'
import LineCircleLongIcon from '@/components/icons/LineCircleLongIcon.vue'

import { useAuthorizationStore } from '@/store/authorizationStore'
import {useI18n} from "vue-i18n";

defineProps({
    route: {
        type: Object,
        default: () => ({}),
    },
    checkCurrentLink: {
        type: Function,
        default: () => (() => {}),
    },
    wrapperSubMenu: {
        type: String,
        default: 'ml-2',
    },
})

const emits = defineEmits(['onLinkCLick'])

const { t } = useI18n()
const authorizationStore = useAuthorizationStore()

function onLinkCLick() {
    emits('onLinkCLick')
}
</script>
