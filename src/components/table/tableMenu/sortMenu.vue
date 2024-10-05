<template>
    <CustomMenu
        v-model="menu"
        :positionsCustom="position"
        :menuWidth="isMbView ? 200 : 280"
    >
        <template #activator>
            <slot></slot>
        </template>

        <template #dropdown>
            <div
                class="w-70 max-mb:w-50 p-2.5 max-mb:p-2 max-mb:mt-2 space-y-1.25 absolute bg-white dark:bg-blue-840 border border-gray-100 dark:border-blue-720 rounded-1.25"
                :class="customClass"
                @click.stop
            >
                <FormInput
                    v-model="searchValue"
                    placeholder="Sort by"
                    mini
                    isTransparent
                />

                <MoreList
                    :items="localItems"
                    v-model:maxShow="maxShow"
                    @onHandlerItem="onHandlerItem"
                />
            </div>
        </template>
    </CustomMenu>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

import CustomMenu from '@/components/menu/CustomMenu/CustomMenu.vue'
import FormInput from '@/components/inputs/FormInput.vue'
import MoreList from '@/components/lists/MoreList.vue'

import { localSearch } from '@/helpers/app-helper'

const props = defineProps({
    controlsParams: {
        type: Object,
        default: () => ({
            filters: [],
            statuses: [],
            sorting: [],
        }),
    },
    position: {
        type: Object,
        default: () => ({}),
    },
    isMbView: {
        type: Boolean,
        default: false,
    },
    customClass: {
        type: [String, Array],
        default: '',
    },
})

const emits = defineEmits(['addSort'])

const menu = defineModel('menu', { type: Boolean, default: false })

const maxShow = ref(5)

const searchValue = ref(null)

const localItems = computed(() => localSearch(notUseItems.value, searchValue.value, ['label']))

const notUseItems = computed(() => {
    const { sorting } = props.controlsParams
    return sorting.filter((el) => !el.hideSelect)
})

function onHandlerItem(item) {
    emits('addSort', item)
}

watch(menu, () => {
    maxShow.value = 5
})
</script>
