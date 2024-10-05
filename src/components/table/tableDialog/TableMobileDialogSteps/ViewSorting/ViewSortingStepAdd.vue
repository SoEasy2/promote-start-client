<template>
    <div class="pt-4 pb-8 gap-y-5 grid custom-scroll-y">
        <div class="px-4">
            <InputSearch
                v-model:searchValue="searchValue"
                customClass="h-9 px-3 border border-gray-100 dark:border-blue-720 rounded-custom"
                placeholder="Sort by"
            />
        </div>

        <MobileList
            class="px-4"
            :items="localItems"
            @onSelectItem="onSelectItem"
        />
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'

import InputSearch from '@/components/inputs/InputSearch.vue'
import MobileList from '@/components/table/tableList/MobileList.vue'

import { localSearch } from '@/helpers/app-helper'

const props = defineProps({
    controlsParams: {
        type: Object,
        default: () => ({
            filters: [],
            sorting: [],
        }),
    },
    selectedSorting: {
        type: Array,
        default: () => [],
    },
})

const emits = defineEmits(['onSelectedSorting', 'goBack'])

const selectedItem = defineModel('selectedItem', { type: Object, default: () => ({}) })

const searchValue = ref(null)

const localItems = computed(() => localSearch(notUseItems.value, searchValue.value, ['label']))

const notUseItems = computed(() => {
    const { sorting } = props.controlsParams
    return sorting.filter((el) => !el.hideSelect)
})

function onSelectItem(item) {
    if (selectedItem.value) {
        updateSelectedItem(item)
    } else {
        emits('onSelectedSorting', item)
    }

    emits('goBack')
}

function updateSelectedItem(item) {
    const { sorting } = props.controlsParams

    const findItem = sorting.find((el) => el.key === selectedItem.value.key)
    findItem.hideSelect = false

    selectedItem.value.key = item.key
    selectedItem.value.label = item.label

    item.hideSelect = true

    emits('onSelectedSorting', {}, 'update')
}
</script>
