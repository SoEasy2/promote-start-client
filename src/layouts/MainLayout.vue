<template>
    <div class="flex h-full w-full">
       <div>
           HEADER
       </div>

        <SideBar
            v-model:mini="mini"
            v-model:showMobileSideBars="showMobileSideBars"
        />

        <div
            class="bg-white dark:bg-blue-800 w-full overflow-hidden transition-spacing"
            :class="marginClass"
            @click="hideSideBars"
        >
            <div
                class="relative w-full transition-all"
                :class="mainClass"
            >
                <router-view v-slot="{ Component, route }">
                    <transition name="fade">
                        <div class="h-full" :key="route.id">
                            <component :is="Component" />
                        </div>
                    </transition>
                </router-view>

                <transition name="fade">
                    <div
                        v-if="routeIsLoading"
                        class="absolute top-0 w-full h-full flex items-center justify-center z-120 bg-black/4"
                    >
                        <MainLoader />
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script setup>
import {
    ref, computed, provide, onMounted, watch, inject,
} from 'vue'
import { useRoute } from 'vue-router'

import MainLoader from '@/components/mainLoader/MainLoader.vue'
import SideBar from '@/components/Sidebar/Sidebar.vue'

import { getBarsPositions, setBarsPositions, addEventListenerStorage } from '@/helpers/app-local-storage-helper'

import { viewPorts } from '@/constants/viewPorts'
import { useAuthorizationStore } from '@/store/authorizationStore'
import { useBreadCrumbsStore } from '@/store/breadCrumbsStore'
import { useAppStore } from '@/store/appStore'

const route = useRoute()

const breadCrumbsStore = useBreadCrumbsStore()
const appStore = useAppStore()
const authorizationStore = useAuthorizationStore()

const currentViewSize = inject('currentViewSize')

const mini = ref(false)

const showMobileSideBars = ref(false)

provide('mini', mini)
provide('showMobileSideBars', showMobileSideBars)

const isMbView = computed(() => viewPorts.mb >= currentViewSize.value)

const marginClass = computed(() => [
    mini.value && 'min-mb:ml-from-side-bars-min',
    !mini.value && 'min-mb:ml-from-side-bars-max',
])

const mainClass = computed(() => {
    return breadCrumbsStore.showMobileBC && isMbView
        ? 'mt-from-app-bar-with-bc h-main-container-with-bc'
        : 'mt-from-app-bar h-main-container'
})

const routeIsLoading = computed(() => appStore.routeIsLoading)


onMounted(() => {
    getSideBarsPositions()
    addEventListenerStorage()
})

function getSideBarsPositions() {
    const positions = getBarsPositions()

    mini.value = positions.mini
}

function showSideBars() {
    mini.value = false

    showMobileSideBars.value = true
}

function hideSideBars() {
    showMobileSideBars.value = false
}

watch(() => ({ mini: mini.value }), (positions) => {
    setBarsPositions(positions)
})

watch(route, () => {
    hideSideBars()
})
</script>
