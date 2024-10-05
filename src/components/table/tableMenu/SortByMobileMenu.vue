<template>
    <CustomMenu
        v-model="menu"
        persistent
        fullScreen
        wrapperStyle="min-w-27.5"
    >
        <template #activator>
            <div
                class="px-2 h-8 w-full flex items-center justify-between bg-purple-60 dark:bg-blue-770 border border-gray-100 dark:border-blue-720 rounded-custom"
                @click="menuHandler"
            >
                <div class="text-xs text-gray-370 dark:text-white">
                    {{ item.value.label }}
                </div>

                <ArrowSelect class="text-gray-200 dark:text-white"/>
            </div>
        </template>

        <template #dropdown>
            <div class="p-4 w-full h-screen bg-white dark:bg-blue-840">
                <div class="pb-4 mb-5 flex items-center justify-between border-b border-gray-100 dark:border-blue-720">
                    <div class="text-gray-370 dark:text-white font-medium text-lg uppercase select-none">
                        sort by
                    </div>

                    <CloseIconMini
                        class="cursor-pointer text-gray-200 hover:text-gray-370 dark:hover:text-white transition-colors"
                        @click="menuHandler"
                    />
                </div>

                <SortByList
                    :item="item"
                    @onChange="onChange"
                />
            </div>
        </template>
    </CustomMenu>
</template>

<script setup>
import { ref } from 'vue'

import CustomMenu from '@/components/menu/CustomMenu/CustomMenu.vue'
import ArrowSelect from '@/components/icons/ArrowSelect.vue'
import CloseIconMini from '@/components/icons/CloseIconMini.vue'
import SortByList from '@/components/table/tableList/SortByList.vue'

defineProps({
    item: {
        type: Object,
        default: () => ({}),
    },
})

const emits = defineEmits(['onChange'])

const menu = ref(false)

function menuHandler() {
    menu.value = !menu.value
}

function onChange(sort) {
    emits('onChange', sort)
    menuHandler()
}
</script>
