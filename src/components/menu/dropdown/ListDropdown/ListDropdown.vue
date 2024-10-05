<template>
    <div class="max-h-inherit max-mob:max-h-screen-100 max-mob:h-screen flex flex-col overflow-hidden w-full rounded-1.25 border max-mob:border-none border-gray-100 dark:border-blue-720 bg-white dark:bg-blue-840 transition-all z-20">
        <CustomMenuHeaderMobile
            v-if="isMobView"
            :searchValue="search"
            :disableSearch="disableSearch"
            :typeWithoutArrow="typeWithoutArrow"
            :backArrowTitle="backArrowTitle"
            :defaultValue="defaultValue"
            @closeMenu="closeMenu"
            @onSearch="onSearch"
            @handleClick="focusInput"
        >
            <slot name="action"></slot>
        </CustomMenuHeaderMobile>

        <slot name="header"></slot>

        <ListDropdownBody
            v-if="selectItems.length"
            v-model:currentItemLocal="currentItemLocal"
            :selectItems="selectItems"
            :disabledItems="disabledItems"
            :isCountry="isCountry"
            :multiple="multiple"
            :itemValue="itemValue"
            :returnObject="returnObject"
            :mini="mini"
            :itemText="itemText"
            :center="center"
            :isMobView="isMobView"
            :search="searchLocal"
            @clickItem="clickItem"
            @focusInput="focusInput"
            @closeMenu="closeMenu"
        />

        <div
            v-else
            class="p-4 text-xs font-medium whitespace-nowrap text-gray-370 dark:text-white block truncate select-none"
        >
            {{ emptyMessage }}
        </div>

        <slot name="footer" :closeMenu="closeMenu"></slot>
    </div>
</template>

<script setup>
import {
    computed, inject, ref, watch,
} from 'vue'

import CustomMenuHeaderMobile from '@/components/menu/CustomMenu/CustomMenuHeaderMobile.vue'
import ListDropdownBody from '@/components/menu/dropdown/ListDropdown/ListDropdownBody.vue'

import { viewPorts } from '@/constants/viewPorts'

const props = defineProps({
    menu: {
        type: Boolean,
        default: false,
    },
    items: {
        type: Array,
        default: () => [],
    },
    disabledItems: {
        type: Array,
        default: () => [],
    },
    search: {
        type: String,
        default: '',
    },
    emptyMessage: {
        type: String,
        default: 'No data available',
    },
    currentItem: {
        type: [String, Number, Object, Array],
        default: null,
    },
    returnObject: {
        type: Boolean,
        default: false,
    },
    multiple: {
        type: Boolean,
        default: false,
    },
    mini: {
        type: Boolean,
        default: false,
    },
    itemText: {
        type: String,
        default: 'name',
    },
    itemValue: {
        type: String,
        default: 'id',
    },
    isCountry: {
        type: Boolean,
        default: false,
    },
    center: {
        type: Boolean,
        default: false,
    },
    defaultValue: {
        type: String,
        default: '',
    },
    disableSearch: {
        type: Boolean,
        default: false,
    },
    backArrowTitle: {
        type: String,
        default: 'Back',
    },
    typeWithoutArrow: {
        type: Boolean,
        default: false,
    },
})

const emits = defineEmits(['changeMenu', 'update:currentItem', 'focusInput', 'clickItem', 'closeMenu'])

const menu = computed({
    get() {
        return props.menu
    },
    set(value) {
        emits('closeMenu', value)
    },
})

const currentViewSize = inject('currentViewSize')

const isMobView = computed(() => viewPorts.mob >= currentViewSize.value)

const searchLocal = ref('')

const currentItemLocal = computed({
    get() {
        return props.currentItem
    },
    set(value) {
        emits('update:currentItem', value)
    },
})

const selectItems = computed(() => filterItems(props.items, searchLocal.value))

function filterItems(items, searchValue) {
    if (!searchValue.trim()) {
        return items
    }

    return items.filter((i) => !i.hasOwnProperty(props.itemText) || i[props.itemText].toLowerCase().includes(searchValue.trim().toLowerCase()))
}

function closeMenu() {
    menu.value = false
}

function clickItem(item) {
    emits('clickItem', item)
}

function focusInput() {
    emits('focusInput')
}

function onSearch(value) {
    searchLocal.value = value
}

watch(() => props.search, (value) => {
    onSearch(value)
})
</script>
