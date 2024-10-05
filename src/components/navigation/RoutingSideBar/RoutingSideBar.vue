<template>
    <div class="flex flex-col gap-y-0.5">
        <div
            v-for="route in menu"
            :key="route.id"
        >
            <CustomRouterLink
                class="px-4"
                :class="menuStyle(route)"
                :style="customStyle(route)"
                :route="route"
                :mini="mini"
                :simpleRote="!route.subMenu && !!route.routeName"
                @click.stop="onOpenSubMenu(route)"
                @mouseenter="onMouseenter(route, $event)"
                @mouseleave="onMouseleave"
            >
                <div
                    class="flex items-center flex-nowrap gap-x-3 group"
                    :class="[route.isOpenSub && !mini && 'mb-2.5']"
                >
<!--                    <div class="w-5">-->
<!--                        <component :is="route.icon()" />-->
<!--                    </div>-->

                    <template v-if="!mini">
                        <div class="text-center font-medium text-xs whitespace-nowrap">
                            {{ t(route.name) }}
                        </div>

                        <div
                            v-if="route.subMenu"
                            class="flex items-center justify-center ml-auto"
                        >
                            <ArrowChevronBottomIcon
                                class="w-5 h-5 transform duration-100"
                                :class="{ 'rotate-180': route.isOpenSub }"
                            />
                        </div>
                    </template>
                </div>

                <RoutingSideBarMini
                    v-if="mini && isShowPopup === route.id"
                    :route="route"
                    :popupPosition="popupPosition"
                    :checkCurrentLink="checkCurrentLink"
                    @onMouseenter="mouseenter"
                    @onMouseleave="mouseleave"
                />

                <RoutingSideBarBig
                    v-if="!mini"
                    :route="route"
                    :checkCurrentLink="checkCurrentLink"
                />
            </CustomRouterLink>
        </div>
    </div>
</template>
<script setup>
import {
    computed, ref, watch, inject, onMounted,
} from 'vue'
import { useRoute, useRouter } from 'vue-router'

import CustomRouterLink from '@/components/navigation/CustomRouterLink.vue'
import RoutingSideBarBig from '@/components/navigation/RoutingSideBar/RoutingSideBarBig.vue'
import RoutingSideBarMini from '@/components/navigation/RoutingSideBar/RoutingSideBarMini.vue'
import ArrowChevronBottomIcon from '@/components/icons/arrow/20x20/ArrowChevronBottomIcon.vue'

import { useAuthorizationStore } from '@/store/authorizationStore'

import { viewPorts } from '@/constants/viewPorts'
import {useI18n} from "vue-i18n";

const props = defineProps({
    mini: {
        type: Boolean,
        default: false,
    },
    showMobileSideBars: {
        type: Boolean,
        default: false,
    },
    menu: {
        type: Array,
        default: () => []
    }
})

const { t } = useI18n()
const authorizationStore = useAuthorizationStore()

const router = useRouter()
const route = useRoute()

const currentViewSize = inject('currentViewSize')

const popupPosition = ref({})
const isShowPopup = ref(-1)

const timerId = ref(null)

const isMbView = computed(() => viewPorts.mb >= currentViewSize.value)

const menu = ref([])


function menuStyle(route) {
    const { isOpenSub, subMenu } = route

    const active = checkCurrentLink(route, subMenu)

    const classes = ['before:absolute before:right-0 before:top-0 before:w-0.75 before:h-0 before:bg-purple-140 py-2 transition-all cursor-pointer relative before:transition-all']

    if (!subMenu) {
        classes.push('flex')
    }

    if (isOpenSub && !props.mini) {
        classes.push(
            'dark:hover:bg-transparent text-gray-370 dark:text-white',
        )
    } else {
        classes.push(
            'hover:bg-menu-purple70 dark:hover:bg-menu-blue770',
            props.mini ? 'flex items-center justify-center' : '',
            active ? 'before:h-9 bg-menu-purple70 dark:bg-menu-blue770 border-purple dark:border-transparent text-purple dark:text-purple-140' : 'border-transparent dark:text-white text-gray-370 dark:hover:text-white',
        )
    }

    return classes.join(' ')
}

function customStyle({ isOpenSub, subMenu }) {
    if (props.mini) {
        return { height: '36px' }
    }

    if (subMenu) {
        return { height: isOpenSub ? `${46 + (32 * subMenu.length)}px` : '36px' }
    }
}

function checkCurrentLink(parent, subMenu) {
    const { routeName, isFirstLoad } = parent

    if (subMenu) {
        const isActive = subMenu.some((el) => el.routeName === route.meta.reference)

        if (isActive && isFirstLoad) {
            parent.isOpenSub = isActive
            parent.isFirstLoad = false
        }

        return isActive
    }
    console.log('this')
    return route.meta.reference === routeName
}

function handleRouteMini({ routeName, paramsNames }) {
    if (!props.mini) return

    isShowPopup.value = -1
    router.push({ name: routeName })
}

function onOpenSubMenu(route) {
    const { isOpenSub, subMenu } = route

    if (subMenu) {
        route.isOpenSub = !isOpenSub
    }

    handleRouteMini(route)

    const foundElement = menu.value.find((el) => el.name !== route.name && el.isOpenSub)

    if (foundElement) {
        foundElement.isOpenSub = false
    }

    navigationActionHandler(route)
}

function navigationActionHandler(route) {
    if (!route.hasOwnProperty('action')) {
        return
    }
}

function onMouseenter(route, event) {
    const { subMenu } = route
    if (!props.mini || !subMenu || isMbView.value) {
        return
    }
    openPopupSubMenu(route, event)
}

function openPopupSubMenu({ id }, { target }) {
    clearTimeout(timerId.value)
    isShowPopup.value = id

    const { left, top, width } = target.getBoundingClientRect()

    popupPosition.value = {
        position: 'fixed',
        left: `${left - (width / 2) + 85}px`,
        top: `${top}px`,
    }
}

function mouseenter(id) {
    clearTimeout(timerId.value)
    isShowPopup.value = id
}

function mouseleave() {
    clearTimeout(timerId.value)
    isShowPopup.value = -1
}

function onMouseleave() {
    timerId.value = setTimeout(() => {
        isShowPopup.value = -1
    }, 100)
}

function resetActiveMenu() {
    menu.value.forEach((el) => {
        if (el.isOpenSub) {
            el.isOpenSub = false
        }
    })
}

watch(route, () => {
    popupPosition.value = {}
})

onMounted(() => {
    menu.value = props.menu
})
</script>
