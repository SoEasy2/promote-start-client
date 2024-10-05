<template>
    <CustomMenu
        v-model="menu"
        :showTimeout="showTimeout"
        :menuWidth="184"
    >
        <template #activator>
            <div
                class="flex items-center cursor-pointer"
                @click="menuHandler"
            >
                <div class="text-purple-200 dark:text-white hover:text-purple dark:hover:text-purple text-xs select-none transition-colors whitespace-nowrap">
                    + Add filter
                </div>
            </div>
        </template>

        <template #dropdown>
            <div class="w-46 py-2.5 space-y-4 bg-white dark:bg-blue-840 border border-gray-100 dark:border-blue-720 rounded-1.25">
                <div class="px-2.5 max-h-65 custom-scroll">
                    <div
                        class="py-1.5 px-2.5 rounded-1.25 hover:bg-gray-80 dark:hover:bg-blue-770 cursor-pointer"
                        v-for="(filter, index) of filters"
                        :key="filter.key + index"
                        @click="selectFilter(filter)"
                    >
                        <div class="text-xs text-purple-200 dark:text-white truncate">
                            {{ filter.label }}
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </CustomMenu>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'

import CustomMenu from '@/components/menu/CustomMenu/CustomMenu.vue'

import { FILTER_RULES } from '@/constants/filterRules'

const props = defineProps({
    filters: {
        type: Array,
        default: () => [],
    },
    autoOpenIndex: {
        type: Number,
        default: null,
    },
})

const emits = defineEmits(['selectFilter'])

const menu = ref(false)
const showTimeout = ref(150)

function menuHandler() {
    menu.value = !menu.value
}

function selectFilter(filter) {
    const { type } = filter

    emits('selectFilter', {
        ...filter,
        rule: FILTER_RULES[type][0],
    })
}

watch(menu, (value) => {
    if (!value) {
        showTimeout.value = 0
    }
})

onMounted(() => {
    menu.value = props.autoOpenIndex === -1
})
</script>
