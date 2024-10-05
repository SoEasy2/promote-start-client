<template>
    <div
        class="fixed flex flex-col justify-between bg-menu-white300 dark:bg-menu-black370 h-full pb-5 transition-width custom-scroll-y"
        :class="[
            mini ? 'w-side-bar-main-mini' : 'w-side-bar-main',
            showMobileSideBars ? 'z-100' : '-left-offset-side-bar-main min-mb:left-0'
        ]"
        v-touch:swipe.left="swipeLeft"
    >
        <div>
            <div
                v-if="mini && !isMbView"
                class="flex group w-6 h-6 mx-auto mb-2 items-center justify-center rounded-1.25 hover:bg-menu-purple70 dark:hover:bg-menu-blue770 cursor-pointer"
                @click="changeMini"
            >
                <DoubleArrowIcon class="text-gray-200 dark:text-gray-400 dark:group-hover:text-gray-200" />
            </div>

            <div>
                <div>
                    Главная
                </div>

                <div>
                    <template
                        v-for="route in MENU_MAIN"
                        :key="route.id"
                    >
                        <CustomRouterLink
                            class="relative h-9 px-4 flex items-center gap-x-1.25 cursor-pointer before:absolute before:right-0 before:top-0 before:h-0 before:w-0.75 before:bg-purple-140 transition-colors before:transition-all"
                            :class="menuStyle(route)"
                            :route="route"
                            :simpleRote="!!route.routeName"
                            :mini="mini"
                        >
                            <div class="w-5 flex item-center justify-center">
                                <!--                            <component :is="route.icon()" />-->
                            </div>

                            <div
                                v-if="!mini"
                                class="text-center font-medium text-xs whitespace-nowrap"
                            >
                                {{ t(route.name) }}
                            </div>
                        </CustomRouterLink>
                    </template>

                </div>
            </div>

            <div>
                <div>
                    Дашборды
                </div>

                <div>
                    <RoutingSideBar
                        :menu="MENU_DASHBOARDS"
                        :mini="mini"
                        :showMobileSideBars="showMobileSideBars"
                    />

                </div>
            </div>

            <CustomDivider
                :class="mini ? 'mx-2' : 'mx-4'"
                class="my-2"
                color="border-gray-100 dark:border-gray-760"
            />

            <div>
                <div>
                    Рекламы
                </div>

                <div>
                    <RoutingSideBar
                        :menu="MIDDLE_MENU"
                        :mini="mini"
                        :showMobileSideBars="showMobileSideBars"
                    />

                </div>
            </div>

            <CustomDivider
                :class="mini ? 'mx-2' : 'mx-4'"
                class="my-2"
                color="border-gray-100 dark:border-gray-760"
            />
        </div>

        <div>
            <CustomDivider
                :class="mini ? 'mx-2' : 'mx-4'"
                class="my-2"
                color="border-gray-100 dark:border-gray-760"
            />

<!--            <div-->
<!--                class="flex flex-col gap-y-0.5 text-gray-370 dark:text-gray-200"-->
<!--                :class="[ mini && 'items-center' ]"-->
<!--            >-->
<!--                <template-->
<!--                    v-for="route in BOTTOM_MENU_ACCOUNT"-->
<!--                    :key="route.id"-->
<!--                >-->
<!--                    <CustomRouterLink-->
<!--                        class="relative h-9 px-4 flex items-center gap-x-2 hover:bg-menu-purple70 dark:hover:bg-menu-blue770 transition-colors cursor-pointer"-->
<!--                        :route="route"-->
<!--                        :simpleRote="!!route.routeName"-->
<!--                        :mini="mini"-->
<!--                        @click="navigationActionHandler(route)"-->
<!--                    >-->
<!--                        <button-->
<!--                            v-if="route.action === NAVIGATION_ACTIONS.last_changes"-->
<!--                            data-featurebase-changelog-->
<!--                            class="flex items-center"-->
<!--                        >-->
<!--                            <span class="w-5 flex item-center justify-center text-gray-200">-->
<!--                                <component :is="route.icon()" />-->
<!--                            </span>-->

<!--                            <span-->
<!--                                v-if="!mini"-->
<!--                                class="pl-2 text-center text-xs font-medium whitespace-nowrap text-gray-200"-->
<!--                            >-->
<!--                                {{ route.name }}-->
<!--                            </span>-->

<!--                            <span id="fb-update-badge"></span>-->
<!--                        </button>-->

<!--                        <template v-else>-->
<!--                            <div class="w-5 flex item-center justify-center text-gray-200">-->
<!--                                <component :is="route.icon()" />-->
<!--                            </div>-->

<!--                            <div-->
<!--                                v-if="!mini"-->
<!--                                class="text-center text-xs font-medium whitespace-nowrap text-gray-200"-->
<!--                            >-->
<!--                                {{ route.name }}-->
<!--                            </div>-->
<!--                        </template>-->
<!--                    </CustomRouterLink>-->
<!--                </template>-->
<!--            </div>-->

<!--            <CustomDivider-->
<!--                :class="mini ? 'mx-2' : 'mx-4'"-->
<!--                class="mt-2 mb-4"-->
<!--                color="border-gray-100 dark:border-gray-760"-->
<!--            />-->

<!--            <SideBarAccountMenu :mini="mini" />-->
        </div>

    </div>
</template>

<script setup>
import { computed, inject, ref } from 'vue'
import { useRoute } from 'vue-router'

// import SideBarAccountMenu from '@/components/navigation/SideBar/SideBarAccountMenu.vue'
import CustomRouterLink from '@/components/CustomRouterLink/CustomRouterLink.vue'
import DoubleArrowIcon from '@/components/icons/arrow/DoubleArrowIcon.vue'
import RoutingSideBar from '@/components/navigation/RoutingSideBar/RoutingSideBar.vue'
import CustomDivider from '@/components/divider/CustomDivider.vue'


import {
    MENU_DASHBOARDS, MENU_MAIN, MIDDLE_MENU,
} from '@/constants/menu'
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
})

const emits = defineEmits(['update:mini', 'update:showMobileSideBars'])

const currentViewSize = inject('currentViewSize')

const { t } = useI18n()

const route = useRoute()

const isMbView = computed(() => viewPorts.mb >= currentViewSize.value)

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
    return route.meta.reference === routeName
}

function menuStyle(route) {
    const { subMenu } = route

    const active = checkCurrentLink(route, subMenu)

    return active
        ? 'before:h-9 bg-menu-purple70 dark:bg-menu-blue770 border-purple dark:border-transparent text-purple dark:text-purple-140'
        : 'hover:bg-menu-purple70 hover:text-gray-370 dark:hover:text-white dark:hover:bg-menu-blue770'
}

function swipeLeft() {
    emits('update:showMobileSideBars', false)
}

function changeMini() {
    emits('update:mini', !props.mini)
}
</script>
