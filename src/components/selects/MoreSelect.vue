<template>
    <CustomMenu
        v-model="show"
        :persistent="persistent"
        :positionsCustom="positions"
    >
        <template
            v-if="activator"
            #activator
        >
            <div
                class="h-8 px-2.5 flex items-center justify-between cursor-pointer rounded-1.25 border transition-colors"
                :class="show
                    ? 'bg-purple-50 dark:bg-purple-800 border-purple'
                    : 'border-gray-100 dark:border-blue-720 hover:border-purple dark:hover:border-purple'"
                :style="styles"
                @click="menuHandler"
            >
                <span class="text-xs text-gray-370 dark:text-white truncate whitespace-nowrap">
                    {{ selectItem.label }}
                </span>

                <div class="w-3 ml-2.5 flex">
                    <ArrowSelect
                        class="text-gray-200 dark:text-white transform duration-100"
                        :class="{ 'rotate-180': show }"
                    />
                </div>
            </div>
        </template>

        <template #dropdown>
            <div
                class="absolute w-70 max-mb:w-50 p-2.5 space-y-1.25 bg-white dark:bg-blue-840 border border-gray-100 dark:border-blue-720 rounded-1.25"
                :class="[ activator ? 'top-2' : 'top-4' ]"
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
import ArrowSelect from '@/components/icons/ArrowSelect.vue'

import { localSearch } from '@/helpers/app-helper'

const props = defineProps({
    persistent: {
        type: Boolean,
        default: true,
    },
    modelValue: {
        type: [Boolean, Object],
        default: null,
    },
    positions: {
        type: Object,
        default: () => ({}),
    },
    selectedSort: {
        type: Array,
        default: () => [],
    },
    controlsParams: {
        type: Object,
        default: () => ({
            filters: [],
            sorting: [],
        }),
    },
    activator: {
        type: Boolean,
        default: false,
    },
    selectItem: {
        type: Object,
        default: () => ({}),
    },
    width: {
        type: [Number, String],
        default: 280,
    },
})

const emits = defineEmits(['update:modelValue', 'addSort', 'update'])

const searchValue = ref(null)

const maxShow = ref(5)

const show = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emits('update:modelValue', value)
    },
})

const styles = computed(() => ({
    width: `${props.width}px`,
}))

const localItems = computed(() => localSearch(notUseItems.value, searchValue.value, ['label']))

const notUseItems = computed(() => {
    const { sorting } = props.controlsParams

    return sorting.filter((el) => !el.hideSelect)
})

function onHandlerItem(item) {
    if (props.activator) {
        emits('update', { item, selectItem: props.selectItem })
        show.value = false
    } else {
        item.hideSelect = true
        item.isOpen = false
        emits('addSort', item)
    }
}

function menuHandler() {
    show.value = !show.value
}

watch(show, () => {
    maxShow.value = 5
})
</script>
