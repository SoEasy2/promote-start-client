<template>
    <CustomMenu
        v-model="menu"
        :menuWidth="144"
        :fullScreen="isMobView"
        :persistent="isMobView"
    >
        <template #activator>
            <div class="relative">
                <slot :name="`header.${head.name}`" :head="head" :index="index">
                    {{ head.name }}
                </slot>

                <ArrowTopIcon
                    v-if="showArrow && !onlySort"
                    class="inline-block absolute text-purple transition-all duration-300"
                    :class="{ 'rotate-180':  head.sortSettings && head.sortSettings.key === 'desc' }"
                />

                <ArrowBottomIcon
                    v-if="onlySort"
                    class="inline-block absolute text-purple transition-all duration-300"
                    :class="[
                        isHoverActiveItem || showArrow ? 'opacity-100' : 'opacity-0',
                        { 'rotate-180': head.sortSettings.key === 'asc' }
                    ]"
                />
            </div>
        </template>

        <template #dropdown>
            <div class="max-mob:h-screen max-mob:w-screen relative z-50 bg-white dark:bg-blue-840">
                <CustomMenuHeaderMobile
                    v-if="isMobView"
                    :backArrowTitle="backArrowTitle"
                    disableSearch
                    @closeMenu="closeDialog"
                />

                <ColumnsDropdown :head="head" @onSelectedItem="changeCurrentItem"/>
            </div>
        </template>
    </CustomMenu>
</template>

<script setup>
import { computed, inject } from 'vue'

import { useRoute } from 'vue-router'

import CustomMenu from '@/components/menu/CustomMenu/CustomMenu.vue'
import ArrowTopIcon from '@/components/icons/arrow/ArrowTopIcon.vue'
import ArrowBottomIcon from '@/components/icons/arrow/ArrowBottomIcon.vue'
import ColumnsDropdown from '@/components/table/dropdowns/ColumnsDropdown.vue'
import CustomMenuHeaderMobile from '@/components/menu/CustomMenu/CustomMenuHeaderMobile.vue'

import { splitString } from '@/helpers/app-helper'

import { viewPorts } from '@/constants/viewPorts'
import { useSortFilterTableStore } from '@/store/sortFilterTableStore'

const props = defineProps({
    head: {
        type: Object,
        default: () => ({}),
    },
    index: {
        type: Number,
        default: -1,
    },
    hoverIndex: {
        type: Number,
        default: -1,
    },
})

const emits = defineEmits(['addSorting', 'addFilter'])

const menu = defineModel('menu', { type: Boolean, default: false })

const sortFilterTableStore = useSortFilterTableStore()

const route = useRoute()

const currentViewSize = inject('currentViewSize')

const isMobView = computed(() => viewPorts.mob >= currentViewSize.value)

const isHoverActiveItem = computed(() => props.hoverIndex === props.index)

const onlySort = computed(() => {
    const { sortSettings = {} } = props.head
    const { onlySort } = sortSettings
    return onlySort
})

const showArrow = computed(() => {
    const { sortSettings = {} } = props.head
    const { key } = sortSettings
    return key
})

const backArrowTitle = computed(() => {
    const title = splitString(route.name)
    return `Back to ${title}`
})

function changeCurrentItem(item) {
    if (!item.type) {
        return
    }

    actionMobile(item)
    updateFilterSort(item)
    closeDialog()
}

function updateFilterSort(item) {
    const { type } = item
    const newItem = { ...props.head, value: item }

    if (type === 'sort') {
        emits('addSorting', newItem)
    }

    if (type === 'filter') {
        emits('addFilter', newItem)
    }
}

function actionMobile({ type, view }) {
    if (!isMobView.value) {
        return
    }

    sortFilterTableStore.openCloseDialog(true)
    sortFilterTableStore.changeCurrentView(view)

    if (type === 'filter') {
        const { filterSettings } = props.head

        sortFilterTableStore.onSelectedItem({
            ...filterSettings,
            fromTable: true,
        })
    }
}

function closeDialog() {
    menu.value = false
}
</script>
