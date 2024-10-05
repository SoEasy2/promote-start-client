<template>
    <div class="grow flex flex-col gap-y-4 max-mob:gap-y-3 custom-scroll-y">
        <div
            class="max-mob:py-1 flex items-center gap-x-3 cursor-pointer border-white-500 dark:border-gray-760"
            :class="[
                { 'pointer-events-none': item.disabled },
                { 'border-b': isBorder }
            ]"
            v-for="(item, index) in localItems"
            :key="index"
            @click="changeSelectedItem(item)"
        >
            <CustomCheckBox
                :checked="checkIncludingItem(item)"
                :disabled="item.disabled"
            />

            <div
                class="w-10/12 truncate text-xs"
                :class="item.disabled ? 'text-gray-370' : 'text-gray-370 dark:text-white'"
            >
                {{ item[titleProp] }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

import CustomCheckBox from '@/components/inputs/CustomCheckBox.vue'

import { localSearch } from '@/helpers/app-helper'

const props = defineProps({
    filter: {
        type: Object,
        default: () => ({}),
    },
    prop: {
        type: String,
        default: 'id',
    },
    titleProp: {
        type: String,
        default: 'name',
    },
    isBorder: {
        type: Boolean,
        default: false,
    },
    searchValue: {
        type: String,
        default: '',
    },
})

const items = computed(() => props.filter.values)

const localItems = computed(() => localSearch(items.value, props.searchValue, [props.titleProp]))

function checkIncludingItem(item) {
    const { value } = props.filter
    return value ? value.some((el) => el === item[props.prop]) : false
}

function changeSelectedItem(item) {
    if (item.disabled) {
        return
    }

    const { value } = props.filter

    if (!value) {
        props.filter.value = [item[props.prop]]
        return
    }

    const findItem = value.find((el) => el === item[props.prop])

    if (findItem === undefined) {
        props.filter.value = [...props.filter.value, item[props.prop]]
    } else {
        props.filter.value = props.filter.value.filter((el) => el !== findItem)
    }
}
</script>
