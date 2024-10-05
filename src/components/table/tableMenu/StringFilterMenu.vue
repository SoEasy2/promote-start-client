<template>
    <CustomMenu
        v-model="menu"
        persistent
        :showTimeout="showTimeout"
        :menuWidth="320"
    >
        <template #activator>
            <div
                class="max-w-60 h-8 px-2 flex items-center cursor-pointer hover:bg-purple-50 dark:hover:bg-purple-800 rounded-custom border hover:border-purple dark:hover:border-purple transition-colors"
                :class="menu ? 'bg-purple-50 dark:bg-purple-800 border-purple' : 'border-gray-100 dark:border-blue-720'"
                @click="menuHandler"
            >
                <CleanIcon
                    class="mr-2 min-w-4 min-h-4 text-gray-200 dark:text-blue-770"
                    @click="deleteFilter(filter.key)"
                />

                <div class="pr-1.5 text-gray-370 dark:text-white text-xs select-none truncate">
                    {{ filter.label }}: <span class="text-purple">{{ getFilterPreview }}</span>
                </div>

                <div class="w-2.5">
                    <ArrowSelect class="text-gray-200 dark:text-white" />
                </div>
            </div>
        </template>

        <template #dropdown>
            <StringDropdown
                :filter="filter"
                :keysForFilterStringEmpty="keysForFilterStringEmpty"
                autoFocus
                @deleteFilter="deleteFilter"
                @updateFilter="updateFilter"
            />
        </template>
    </CustomMenu>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

import CustomMenu from '@/components/menu/CustomMenu/CustomMenu.vue'
import ArrowSelect from '@/components/icons/ArrowSelect.vue'
import StringDropdown from '@/components/table/dropdowns/StringDropdown.vue'
import CleanIcon from '@/components/icons/CleanIcon.vue'

const props = defineProps({
    filter: {
        type: Object,
        default: () => ({
            key: '',
            label: '',
            type: '',
            value: '',
            rule: null,
            values: [],
        }),
    },
    autoOpen: {
        type: Boolean,
        default: false,
    },
    showTimeout: {
        type: Number,
        default: 0,
    },
    bodyFetch: {
        type: Object,
        default: () => ({}),
    },
    keysForFilterListEmpty: {
        type: Array,
        default: () => [],
    },
    keysForFilterStringEmpty: {
        type: Array,
        default: () => [],
    },
})

const emits = defineEmits(['updateFilter', 'deleteFilter'])

const menu = ref(false)

const getFilterPreview = computed(() => {
    const { rule = {}, value = '' } = props.filter
    const { onlyPrefix, prefix } = rule

    if (onlyPrefix) {
        return prefix
    }

    if (!value) {
        return
    }

    return `${prefix} ${value}`
})

function menuHandler() {
    menu.value = !menu.value
}

function deleteFilter(key) {
    emits('deleteFilter', key)
}

function updateFilter(filter) {
    emits('updateFilter', filter)
}

watch(() => props.autoOpen, (value) => {
    if (value) {
        menu.value = true
    }
}, { immediate: true })
</script>
